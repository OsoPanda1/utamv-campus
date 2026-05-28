import type { ScholarlyCoursePayload, ScholarlyOperationResult } from './scholarlyTypes';

export function buildFigshareArticlePayload(course: ScholarlyCoursePayload) {
  return {
    title: `UTAMV · ${course.title}`,
    description: course.description || `Programa académico UTAMV: ${course.title}`,
    keywords: ['UTAMV', 'educación digital', 'IA aplicada'],
    categories: [1],
    defined_type: 'dataset',
  };
}

export function figshareArticleResult(articleId: string, doi?: string): ScholarlyOperationResult {
  return {
    provider: 'figshare',
    ok: true,
    status: doi ? 'published' : 'submitted',
    externalId: articleId,
    doi,
    message: doi ? 'Artículo Figshare con DOI sincronizado.' : 'Artículo Figshare creado y pendiente de reserva DOI.',
  };
}
