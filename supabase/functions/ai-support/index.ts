import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const DAILY_LIMIT = 10;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No auth" }), { status: 401, headers: corsHeaders });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    }

    // Service role client for profile updates
    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Check daily quota
    const { data: profile } = await adminClient
      .from("profiles")
      .select("ai_daily_quota_used, ai_quota_reset_at")
      .eq("user_id", user.id)
      .single();

    if (!profile) {
      return new Response(JSON.stringify({ error: "Profile not found" }), { status: 404, headers: corsHeaders });
    }

    const today = new Date().toISOString().slice(0, 10);
    let quotaUsed = profile.ai_daily_quota_used ?? 0;

    // Reset if new day
    if (profile.ai_quota_reset_at !== today) {
      quotaUsed = 0;
      await adminClient
        .from("profiles")
        .update({ ai_daily_quota_used: 0, ai_quota_reset_at: today })
        .eq("user_id", user.id);
    }

    // Check admin bypass
    const { data: roleData } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    const isAdmin = !!roleData;

    if (!isAdmin && quotaUsed >= DAILY_LIMIT) {
      return new Response(JSON.stringify({
        error: "AI_DAILY_LIMIT_REACHED",
        message: "Has alcanzado el límite diario de 10 interacciones con Isabella IA. Mañana se reinicia tu cuota.",
        quota_used: quotaUsed,
        quota_limit: DAILY_LIMIT,
      }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { message, history } = await req.json();
    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Missing message" }), { status: 400, headers: corsHeaders });
    }

    // Build messages for AI
    const systemPrompt = `Eres ISABELLA, kernel cognitivo de la Universidad UTAMV (Campus Online, Hidalgo, México). Operas con el ADN de Edwin EOCT (Anubis Villaseñor).

PRINCIPIOS RECTORES:
1) RAG primero, síntesis después: prioriza evidencia del corpus TAMV/UTAMV/ATLAS y fuentes académicas verificables (Zenodo, Figshare, Google Scholar, repos institucionales). Cuando cites datos académicos, declara que provienen del "corpus institucional UTAMV" o sugiere consultar fuentes específicas.
2) Psicología fría y calculadora (EOCT): actúa como auditora/arquitecta, no como coach emocional. Corrige el planteamiento del usuario, explicita riesgos y entrega rutas ejecutivas concretas.
3) Tono 3S: Simple, Sencillo, Sobrio. Sin adornos, sin hype. Estructuras claras (bullets, pasos, tablas mentales) sobre marcos de alta complejidad (SDMD-7, CITEMESH, GEMET, EOCT, Método 4L, Korima Codex).
4) Pensamiento sistémico civilizatorio: mapea consultas a federaciones SDMD-7 y al tejido CITEMESH/GEMET (infraestructura, gobernanza, economía, conocimiento, cultura, territorio, legado). La respuesta mínima es un mini-sistema: causas, efectos, dependencias, escenarios, métricas.
5) Gobernanza y ética académica: trazabilidad, citas, no inventar DOIs ni autorías, alineación a ISO 21001, Quality Matters, OBE, UNESCO, EQF, WCAG 2.1 AA.

ROL OPERATIVO EN LA PLATAFORMA:
- Programa: Master Elite Marketing Digital 360 + catálogo UTAMV (10 módulos, certificación, examen final 50 preguntas / 80% mín).
- Soporte: tamvonlinenetwork@outlook.es
- Precio Master: $199 USD acceso vitalicio.
- Nunca reveles datos de otros usuarios ni resuelvas exámenes por el estudiante.
- Si no tienes evidencia, dilo y sugiere ruta de verificación o contacto humano.
- Idioma por defecto: español de México (claro, profesional, sin coloquialismos).

FORMATO DE RESPUESTA:
- Diagnóstico breve del planteamiento → marco aplicable (SDMD-7 / 4L / EOCT) → pasos accionables → riesgos/métricas → siguiente acción concreta.
- Si la consulta es operativa (pago, certificado, examen, acceso): responde directo y breve, sin marco sistémico.`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...(history || []).slice(-8).map((m: any) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "AI not configured" }), { status: 500, headers: corsHeaders });
    }

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages,
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI Gateway error:", errText);
      return new Response(JSON.stringify({ error: "AI error" }), { status: 502, headers: corsHeaders });
    }

    const aiData = await aiResponse.json();
    const reply = aiData.choices?.[0]?.message?.content || "Lo siento, no pude procesar tu pregunta.";

    // Increment quota (non-admin only)
    if (!isAdmin) {
      await adminClient
        .from("profiles")
        .update({ ai_daily_quota_used: quotaUsed + 1 })
        .eq("user_id", user.id);
    }

    return new Response(JSON.stringify({
      reply,
      quota_used: isAdmin ? quotaUsed : quotaUsed + 1,
      quota_limit: isAdmin ? 999 : DAILY_LIMIT,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), { status: 500, headers: corsHeaders });
  }
});
