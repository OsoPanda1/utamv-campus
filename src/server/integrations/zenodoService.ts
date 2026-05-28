import type { ScholarlyCoursePayload, ScholarlyOperationResult } from './scholarlyTypes';

export function buildZenodoDraftMetadata(course: ScholarlyCoursePayload) {
  return {
    metadata: {
      title: `UTAMV · ${course.title}`,
      upload_type: 'lesson',
      description: course.description || `Programa académico UTAMV: ${course.title}`,
      creators: [{ name: course.instructor_name || 'UTAMV Campus Académico', affiliation: 'UTAMV' }],
      access_right: 'open',
      keywords: ['UTAMV', 'educación digital', 'marketing digital', 'inteligencia artificial', 'Latinoamérica'],
    },
  };
}

export function zenodoDraftResult(recordId: string, doi?: string, conceptDoi?: string): ScholarlyOperationResult {
  return {
    provider: 'zenodo',
    ok: true,
    status: doi ? 'published' : 'submitted',
    externalId: recordId,
    doi,
    conceptDoi,
    message: doi ? 'Depósito Zenodo con DOI registrado.' : 'Depósito sandbox de Zenodo creado y pendiente de publicación final.',
  };
}
