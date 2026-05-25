// Tipos para el currículo dinámico nutrido desde Markdown
// No reemplaza src/data/coursesData.ts (legacy); coexiste de forma aditiva.

export type MarkdownLessonRef = {
  type: 'markdown';
  blockId: string;
  title: string;
  slug: string;
  order: number;
  estimatedMinutes?: number;
};

export type StaticLesson = {
  type: 'static';
  title: string;
  slug: string;
  order: number;
  content: string;
  estimatedMinutes?: number;
};

export type CurriculumLesson = MarkdownLessonRef | StaticLesson;

export type CurriculumModule = {
  id: string;
  title: string;
  slug: string;
  order: number;
  description?: string;
  lessons: CurriculumLesson[];
};

export type CurriculumCourse = {
  id: string;
  slug: string;
  title: string;
  level: 'maestria' | 'master' | 'diplomado' | 'certificacion';
  description: string;
  sourceKey: string; // clave del índice de markdown (markdownLessonIndex)
  modules: CurriculumModule[];
};
