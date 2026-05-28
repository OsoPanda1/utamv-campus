import { createClient } from 'npm:@supabase/supabase-js@2';
import { z } from 'npm:zod@3.23.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? Deno.env.get('SUPABASE_PUBLISHABLE_KEY') ?? '';

const BodySchema = z.discriminatedUnion('operation', [
  z.object({ operation: z.literal('health') }),
  z.object({ operation: z.literal('prepare_course'), courseId: z.string().uuid(), notes: z.string().max(2000).optional() }),
  z.object({ operation: z.literal('publish_zenodo'), courseId: z.string().uuid(), publish: z.boolean().optional().default(false) }),
  z.object({ operation: z.literal('sync_figshare'), courseId: z.string().uuid() }),
  z.object({ operation: z.literal('link_openaire'), courseId: z.string().uuid(), projectId: z.string().min(2).max(200) }),
  z.object({ operation: z.literal('orcid_start'), redirectUri: z.string().url() }),
  z.object({ operation: z.literal('orcid_callback'), code: z.string().min(4), redirectUri: z.string().url() }),
]);

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function hasSecret(name: string) {
  return Boolean(Deno.env.get(name));
}

async function requireAdmin(authHeader: string) {
  if (!supabaseUrl || !anonKey || !serviceRoleKey) throw new Error('Backend académico no configurado.');

  const userClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } } });
  const { data: userData, error: userError } = await userClient.auth.getUser();
  if (userError || !userData.user) return { error: json({ error: 'UNAUTHORIZED' }, 401), user: null, admin: null };

  const adminClient = createClient(supabaseUrl, serviceRoleKey);
  const { data: role } = await adminClient
    .from('user_roles')
    .select('role')
    .eq('user_id', userData.user.id)
    .eq('role', 'admin')
    .maybeSingle();

  if (!role) return { error: json({ error: 'FORBIDDEN_ADMIN_ONLY' }, 403), user: userData.user, admin: adminClient };
  return { error: null, user: userData.user, admin: adminClient };
}

async function requireUser(authHeader: string) {
  if (!supabaseUrl || !anonKey || !serviceRoleKey) throw new Error('Backend académico no configurado.');
  const userClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } } });
  const { data: userData, error: userError } = await userClient.auth.getUser();
  if (userError || !userData.user) return { error: json({ error: 'UNAUTHORIZED' }, 401), user: null, admin: null };
  return { error: null, user: userData.user, admin: createClient(supabaseUrl, serviceRoleKey) };
}

async function fetchCourse(admin: ReturnType<typeof createClient>, courseId: string) {
  const { data, error } = await admin
    .from('courses')
    .select('id,title,description,slug,instructor_name,zenodo_record_id,zenodo_doi,figshare_article_id,figshare_doi,openaire_project_id,academic_publication_status')
    .eq('id', courseId)
    .maybeSingle();
  if (error) throw new Error(`No se pudo leer el curso: ${error.message}`);
  if (!data) throw new Error('Curso no encontrado.');
  return data;
}

function zenodoMetadata(course: Awaited<ReturnType<typeof fetchCourse>>) {
  return {
    metadata: {
      title: `UTAMV · ${course.title}`,
      upload_type: 'lesson',
      description: course.description || `Programa académico UTAMV: ${course.title}`,
      creators: [{ name: course.instructor_name || 'UTAMV Campus Académico', affiliation: 'UTAMV' }],
      access_right: 'open',
      license: 'cc-by-4.0',
      keywords: ['UTAMV', 'educación digital', 'marketing digital', 'inteligencia artificial', 'Latinoamérica'],
      notes: 'Registro académico generado desde el kernel institucional UTAMV. No sustituye RVOE ni reconocimiento oficial externo.',
    },
  };
}

async function publishZenodo(admin: ReturnType<typeof createClient>, courseId: string, shouldPublish: boolean) {
  const token = Deno.env.get('ZENODO_ACCESS_TOKEN') || Deno.env.get('ZENODO_API_KEY');
  if (!token) return json({ error: 'ZENODO_ACCESS_TOKEN_NOT_CONFIGURED' }, 500);

  const course = await fetchCourse(admin, courseId);
  const base = 'https://sandbox.zenodo.org/api';
  let recordId = course.zenodo_record_id;
  let conceptDoi: string | undefined;
  let doi: string | undefined = course.zenodo_doi ?? undefined;

  if (!recordId) {
    const created = await fetch(`${base}/deposit/depositions?access_token=${encodeURIComponent(token)}`, { method: 'POST' });
    const createdText = await created.text();
    if (!created.ok) return json({ error: 'ZENODO_CREATE_FAILED', details: createdText }, 502);
    const payload = JSON.parse(createdText);
    recordId = String(payload.id);
    conceptDoi = payload.metadata?.prereserve_doi?.doi;
  }

  const metadataResponse = await fetch(`${base}/deposit/depositions/${recordId}?access_token=${encodeURIComponent(token)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(zenodoMetadata(course)),
  });
  const metadataText = await metadataResponse.text();
  if (!metadataResponse.ok) return json({ error: 'ZENODO_METADATA_FAILED', details: metadataText }, 502);
  const metadataPayload = JSON.parse(metadataText);
  conceptDoi = metadataPayload.metadata?.prereserve_doi?.doi || conceptDoi;

  if (shouldPublish) {
    const published = await fetch(`${base}/deposit/depositions/${recordId}/actions/publish?access_token=${encodeURIComponent(token)}`, { method: 'POST' });
    const publishedText = await published.text();
    if (!published.ok) return json({ error: 'ZENODO_PUBLISH_FAILED', details: publishedText }, 502);
    const publishedPayload = JSON.parse(publishedText);
    doi = publishedPayload.doi || publishedPayload.metadata?.doi || conceptDoi;
  }

  const { error } = await admin
    .from('courses')
    .update({
      zenodo_record_id: recordId,
      zenodo_doi: doi ?? null,
      zenodo_concept_doi: conceptDoi ?? null,
      academic_publication_status: shouldPublish ? 'published' : 'submitted',
      academic_publication_notes: shouldPublish ? 'Depósito Zenodo sandbox publicado.' : 'Depósito Zenodo sandbox creado con metadatos UTAMV.',
      academic_published_at: shouldPublish ? new Date().toISOString() : null,
    })
    .eq('id', courseId);
  if (error) throw new Error(`No se pudo guardar Zenodo: ${error.message}`);

  return json({ ok: true, provider: 'zenodo', recordId, doi, conceptDoi, status: shouldPublish ? 'published' : 'submitted' });
}

async function syncFigshare(admin: ReturnType<typeof createClient>, courseId: string) {
  const token = Deno.env.get('FIGSHARE_TOKEN');
  if (!token) return json({ error: 'FIGSHARE_TOKEN_NOT_CONFIGURED' }, 500);
  const course = await fetchCourse(admin, courseId);

  const response = await fetch('https://api.figshare.com/v2/account/articles', {
    method: 'POST',
    headers: { Authorization: `token ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: `UTAMV · ${course.title}`,
      description: course.description || `Programa académico UTAMV: ${course.title}`,
      defined_type: 'dataset',
      keywords: ['UTAMV', 'educación digital', 'IA aplicada'],
      categories: [1],
    }),
  });
  const text = await response.text();
  if (!response.ok) return json({ error: 'FIGSHARE_CREATE_FAILED', details: text }, 502);
  const payload = JSON.parse(text);
  const articleId = String(payload.entity_id || payload.location?.split('/').pop() || payload.id || '');

  const { error } = await admin
    .from('courses')
    .update({
      figshare_article_id: articleId,
      figshare_doi: payload.doi ?? null,
      academic_publication_status: payload.doi ? 'published' : 'submitted',
      academic_publication_notes: 'Artículo Figshare creado desde Control Escolar.',
    })
    .eq('id', courseId);
  if (error) throw new Error(`No se pudo guardar Figshare: ${error.message}`);

  return json({ ok: true, provider: 'figshare', articleId, doi: payload.doi ?? null });
}

async function connectOrcid(admin: ReturnType<typeof createClient>, userId: string, code: string, redirectUri: string) {
  const clientId = Deno.env.get('ORCID_CLIENT_ID');
  const clientSecret = Deno.env.get('ORCID_API_KEY');
  if (!clientId || !clientSecret) return json({ error: 'ORCID_SECRETS_NOT_CONFIGURED' }, 500);

  const response = await fetch('https://orcid.org/oauth/token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  });
  const text = await response.text();
  if (!response.ok) return json({ error: 'ORCID_TOKEN_FAILED', details: text }, 502);
  const payload = JSON.parse(text);
  const orcid = String(payload.orcid || '').trim();
  if (!orcid) return json({ error: 'ORCID_ID_NOT_RETURNED' }, 502);

  const { error } = await admin
    .from('profiles')
    .update({ orcid_id: orcid, orcid_connected: true, orcid_access_granted_at: new Date().toISOString() })
    .eq('user_id', userId);
  if (error) throw new Error(`No se pudo guardar ORCID: ${error.message}`);
  return json({ ok: true, provider: 'orcid', orcid });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'METHOD_NOT_ALLOWED' }, 405);

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'UNAUTHORIZED' }, 401);

    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) return json({ error: 'INVALID_BODY', details: parsed.error.flatten().fieldErrors }, 400);

    const body = parsed.data;
    const requiresOnlyUser = body.operation === 'orcid_start' || body.operation === 'orcid_callback';
    const { error, user, admin } = requiresOnlyUser ? await requireUser(authHeader) : await requireAdmin(authHeader);
    if (error || !user || !admin) return error;

    if (body.operation === 'health') {
      return json({
        ok: true,
        secrets: {
          ORCID_CLIENT_ID: hasSecret('ORCID_CLIENT_ID'),
          ORCID_API_KEY: hasSecret('ORCID_API_KEY'),
          ZENODO_ACCESS_TOKEN: hasSecret('ZENODO_ACCESS_TOKEN') || hasSecret('ZENODO_API_KEY'),
          FIGSHARE_TOKEN: hasSecret('FIGSHARE_TOKEN'),
          ISNI_API_KEY: hasSecret('ISNI_API_KEY'),
          OPENAIRE_ACCESS_TOKEN: hasSecret('OPENAIRE_ACCESS_TOKEN'),
        },
      });
    }

    if (body.operation === 'prepare_course') {
      const { error: updateError } = await admin
        .from('courses')
        .update({ academic_publication_status: 'ready', academic_publication_notes: body.notes || 'Curso marcado como listo para publicación académica.' })
        .eq('id', body.courseId);
      if (updateError) throw new Error(updateError.message);
      return json({ ok: true, status: 'ready' });
    }

    if (body.operation === 'publish_zenodo') return await publishZenodo(admin, body.courseId, body.publish);
    if (body.operation === 'sync_figshare') return await syncFigshare(admin, body.courseId);

    if (body.operation === 'link_openaire') {
      const badgeUrl = `https://explore.openaire.eu/search/project?projectId=${encodeURIComponent(body.projectId)}`;
      const { error: updateError } = await admin
        .from('courses')
        .update({ openaire_project_id: body.projectId, openaire_badge_url: badgeUrl })
        .eq('id', body.courseId);
      if (updateError) throw new Error(updateError.message);
      return json({ ok: true, provider: 'openaire', projectId: body.projectId, badgeUrl });
    }

    if (body.operation === 'orcid_start') {
      const clientId = Deno.env.get('ORCID_CLIENT_ID');
      if (!clientId) return json({ error: 'ORCID_CLIENT_ID_NOT_CONFIGURED' }, 500);
      const url = new URL('https://orcid.org/oauth/authorize');
      url.searchParams.set('client_id', clientId);
      url.searchParams.set('response_type', 'code');
      url.searchParams.set('scope', '/authenticate');
      url.searchParams.set('redirect_uri', body.redirectUri);
      url.searchParams.set('state', `${user.id}.${crypto.randomUUID()}`);
      return json({ ok: true, authUrl: url.toString() });
    }

    if (body.operation === 'orcid_callback') return await connectOrcid(admin, user.id, body.code, body.redirectUri);

    return json({ error: 'UNSUPPORTED_OPERATION' }, 400);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return json({ error: 'SCHOLARLY_INTEGRATION_FAILED', message }, 500);
  }
});
