import { markdownLessonIndex, type MarkdownCourseKey } from './markdownLessonIndex';

// Vite: importar todos los .md de institutional/uploads como string crudo
const files = import.meta.glob('/institutional/uploads/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export type LoadOptions = {
  courseKey: MarkdownCourseKey;
  blockId: string;
};

export function loadMarkdownBlock({ courseKey, blockId }: LoadOptions): string {
  const course = markdownLessonIndex[courseKey];
  if (!course) {
    console.warn('[markdownLessonLoader] curso desconocido', courseKey);
    return '';
  }

  const blockConfig = (course as Record<string, { file: string; startMarker: string; endMarker?: string }>)[blockId];
  if (!blockConfig) {
    console.warn('[markdownLessonLoader] bloque desconocido', courseKey, blockId);
    return '';
  }

  const { file, startMarker, endMarker } = blockConfig;
  const entry = Object.entries(files).find(([path]) => path.endsWith(`/${file}`));
  if (!entry) {
    console.error('[markdownLessonLoader] archivo no encontrado', file, Object.keys(files));
    return '';
  }

  const content = entry[1];
  const lines = content.split('\n');
  const startIndex = lines.findIndex((line) => line.includes(startMarker));
  if (startIndex === -1) {
    console.warn('[markdownLessonLoader] startMarker no encontrado', startMarker);
    return '';
  }

  let endIndex = lines.length;
  if (endMarker) {
    const found = lines.findIndex((line, i) => i > startIndex && line.includes(endMarker));
    if (found !== -1) endIndex = found;
  }

  return lines.slice(startIndex, endIndex).join('\n').trim();
}
