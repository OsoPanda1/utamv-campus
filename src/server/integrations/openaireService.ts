import type { ScholarlyOperationResult } from './scholarlyTypes';

export function buildOpenAireBadgeUrl(projectId: string) {
  return `https://explore.openaire.eu/search/project?projectId=${encodeURIComponent(projectId)}`;
}

export function openAireLinkedResult(projectId: string): ScholarlyOperationResult {
  return {
    provider: 'openaire',
    ok: true,
    status: 'published',
    externalId: projectId,
    message: 'Proyecto OpenAIRE vinculado a la ficha académica.',
  };
}
