import { supabase } from '@/integrations/supabase/client';

export type AcademicPublicationStatus = 'draft' | 'ready' | 'submitted' | 'published' | 'failed';

export interface AcademicCourseMetadata {
  id: string;
  slug: string | null;
  title: string;
  zenodo_record_id: string | null;
  zenodo_doi: string | null;
  zenodo_concept_doi: string | null;
  figshare_article_id: string | null;
  figshare_doi: string | null;
  openaire_project_id: string | null;
  openaire_badge_url: string | null;
  academic_publication_status: AcademicPublicationStatus;
  academic_publication_notes: string | null;
  academic_published_at: string | null;
}

export async function fetchAcademicCourseMetadata(slug: string): Promise<AcademicCourseMetadata | null> {
  const { data, error } = await (supabase as any)
    .from('courses')
    .select('id,slug,title,zenodo_record_id,zenodo_doi,zenodo_concept_doi,figshare_article_id,figshare_doi,openaire_project_id,openaire_badge_url,academic_publication_status,academic_publication_notes,academic_published_at')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.warn('No se pudo cargar metadato académico del curso:', error.message);
    return null;
  }

  return data as AcademicCourseMetadata | null;
}

export async function invokeScholarlyIntegration<T>(body: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke('scholarly-integrations', { body });
  if (error) throw error;
  return data as T;
}

export function doiUrl(doi: string) {
  return `https://doi.org/${doi.replace(/^https?:\/\/(dx\.)?doi\.org\//, '')}`;
}
