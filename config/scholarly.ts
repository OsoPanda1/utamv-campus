export const SCHOLARLY_SECRET_NAMES = {
  isniApiKey: 'ISNI_API_KEY',
  orcidClientId: 'ORCID_CLIENT_ID',
  orcidClientSecret: 'ORCID_API_KEY',
  zenodoAccessToken: 'ZENODO_ACCESS_TOKEN',
  zenodoApiKey: 'ZENODO_API_KEY',
  figshareConsumerId: 'FIGSHARE_CONSUMER_ID',
  figshareConsumerSecret: 'FIGSHARE_CONSUMER_SECRET',
  figshareToken: 'FIGSHARE_TOKEN',
  openaireAccessToken: 'OPENAIRE_ACCESS_TOKEN',
} as const;

export const SCHOLARLY_ENDPOINTS = {
  orcidAuthorize: 'https://orcid.org/oauth/authorize',
  orcidToken: 'https://orcid.org/oauth/token',
  orcidPublicApi: 'https://pub.orcid.org/v3.0',
  zenodoSandboxApi: 'https://sandbox.zenodo.org/api',
  figshareApi: 'https://api.figshare.com/v2',
  isniApi: 'https://isni.org/isni',
  openaireApi: 'https://api.openaire.eu',
} as const;

export type ScholarlySecretName = (typeof SCHOLARLY_SECRET_NAMES)[keyof typeof SCHOLARLY_SECRET_NAMES];

export function readScholarlySecret(env: Pick<Record<string, string | undefined>, ScholarlySecretName>, name: ScholarlySecretName) {
  return env[name];
}
