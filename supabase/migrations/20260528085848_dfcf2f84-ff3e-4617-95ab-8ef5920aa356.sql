ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS orcid_id text,
  ADD COLUMN IF NOT EXISTS orcid_connected boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS orcid_access_granted_at timestamptz,
  ADD COLUMN IF NOT EXISTS isni_id text;

ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS zenodo_record_id text,
  ADD COLUMN IF NOT EXISTS zenodo_doi text,
  ADD COLUMN IF NOT EXISTS zenodo_concept_doi text,
  ADD COLUMN IF NOT EXISTS figshare_article_id text,
  ADD COLUMN IF NOT EXISTS figshare_doi text,
  ADD COLUMN IF NOT EXISTS openaire_project_id text,
  ADD COLUMN IF NOT EXISTS openaire_badge_url text,
  ADD COLUMN IF NOT EXISTS academic_publication_status text NOT NULL DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS academic_publication_notes text,
  ADD COLUMN IF NOT EXISTS academic_published_at timestamptz;

ALTER TABLE public.courses
  DROP CONSTRAINT IF EXISTS courses_academic_publication_status_check;
ALTER TABLE public.courses
  ADD CONSTRAINT courses_academic_publication_status_check
  CHECK (academic_publication_status IN ('draft', 'ready', 'submitted', 'published', 'failed'));

CREATE INDEX IF NOT EXISTS idx_profiles_orcid_id ON public.profiles (orcid_id);
CREATE INDEX IF NOT EXISTS idx_courses_zenodo_doi ON public.courses (zenodo_doi);
CREATE INDEX IF NOT EXISTS idx_courses_academic_publication_status ON public.courses (academic_publication_status);

CREATE TABLE IF NOT EXISTS public.institutional_scholarly_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_name text NOT NULL DEFAULT 'Universidad de Tecnología Avanzada, Marketing y Versatilidad',
  institution_slug text NOT NULL UNIQUE DEFAULT 'utamv',
  isni_id text,
  orcid_org_id text,
  openaire_project_id text,
  zenodo_community text,
  figshare_group_id text,
  repository_policy_url text,
  updated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.institutional_scholarly_config TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.institutional_scholarly_config TO authenticated;
GRANT ALL ON public.institutional_scholarly_config TO service_role;

ALTER TABLE public.institutional_scholarly_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read institutional scholarly metadata" ON public.institutional_scholarly_config;
CREATE POLICY "Public can read institutional scholarly metadata"
  ON public.institutional_scholarly_config
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admins manage institutional scholarly metadata" ON public.institutional_scholarly_config;
CREATE POLICY "Admins manage institutional scholarly metadata"
  ON public.institutional_scholarly_config
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP TRIGGER IF EXISTS update_institutional_scholarly_config_updated_at ON public.institutional_scholarly_config;
CREATE TRIGGER update_institutional_scholarly_config_updated_at
  BEFORE UPDATE ON public.institutional_scholarly_config
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();