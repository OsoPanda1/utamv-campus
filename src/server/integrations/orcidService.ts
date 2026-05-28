import type { ScholarlyOperationResult } from './scholarlyTypes';

export interface OrcidAuthorizationRequest {
  clientId: string;
  redirectUri: string;
  state: string;
  scope?: string;
}

export function buildOrcidAuthorizationUrl({ clientId, redirectUri, state, scope = '/authenticate' }: OrcidAuthorizationRequest) {
  const url = new URL('https://orcid.org/oauth/authorize');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', scope);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('state', state);
  return url.toString();
}

export function normalizeOrcidId(orcid: string) {
  return orcid.replace('https://orcid.org/', '').trim();
}

export function orcidConnectedResult(orcid: string): ScholarlyOperationResult {
  return {
    provider: 'orcid',
    ok: true,
    status: 'published',
    externalId: normalizeOrcidId(orcid),
    message: 'ORCID conectado al perfil académico.',
  };
}
