export type ScholarlyProvider = 'orcid' | 'zenodo' | 'figshare' | 'isni' | 'openaire';

export interface ScholarlyCoursePayload {
  id: string;
  slug?: string | null;
  title: string;
  description?: string | null;
  instructor_name?: string | null;
  zenodo_record_id?: string | null;
  zenodo_doi?: string | null;
  figshare_article_id?: string | null;
  figshare_doi?: string | null;
  openaire_project_id?: string | null;
  academic_publication_status?: string | null;
}

export interface ScholarlyOperationResult {
  provider: ScholarlyProvider;
  ok: boolean;
  status: 'draft' | 'ready' | 'submitted' | 'published' | 'failed';
  externalId?: string;
  doi?: string;
  conceptDoi?: string;
  message: string;
  raw?: unknown;
}
