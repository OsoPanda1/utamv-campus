import type { CurriculumCourse } from '@/types/curriculum';

// Currículo dinámico nutrido desde Markdown (institutional/uploads/*.md)
// Curso piloto: TAMV Online - SDMD™ (mapea cursocompleto1.md)
export const curriculumCourses: CurriculumCourse[] = [
  {
    id: 'tamv-online-sdmd',
    slug: 'tamv-online-sdmd',
    sourceKey: 'cursocompleto1',
    title: 'TAMV ONLINE — SDMD™: Arquitectura y Dominio de Mercados Digitales',
    level: 'maestria',
    description:
      'Programa base UTAMV: pensamiento sistémico, diseño de arquitecturas digitales y construcción de ventaja competitiva sostenible.',
    modules: [
      {
        id: 'm1-marco',
        slug: 'modulo-1-marco-programa',
        title: 'Módulo 1: Marco del Programa',
        order: 1,
        description: 'Definición, propósito, objetivos y resultados de aprendizaje del programa SDMD™.',
        lessons: [
          { type: 'markdown', blockId: 'definicion-programa', title: 'Definición del Programa', slug: 'definicion', order: 1, estimatedMinutes: 12 },
          { type: 'markdown', blockId: 'proposito', title: 'Propósito', slug: 'proposito', order: 2, estimatedMinutes: 8 },
          { type: 'markdown', blockId: 'objetivos', title: 'Objetivos (Goals)', slug: 'objetivos', order: 3, estimatedMinutes: 10 },
          { type: 'markdown', blockId: 'resultados-aprendizaje', title: 'Resultados de Aprendizaje', slug: 'resultados', order: 4, estimatedMinutes: 10 },
        ],
      },
      {
        id: 'm2-estructura',
        slug: 'modulo-2-estructura-metodologia',
        title: 'Módulo 2: Estructura y Metodología',
        order: 2,
        description: 'Estructura del programa, metodología SDMD™ y resultados esperados.',
        lessons: [
          { type: 'markdown', blockId: 'estructura-programa', title: 'Estructura del Programa', slug: 'estructura', order: 1, estimatedMinutes: 18 },
          { type: 'markdown', blockId: 'metodologia', title: 'Metodología', slug: 'metodologia', order: 2, estimatedMinutes: 15 },
          { type: 'markdown', blockId: 'resultado-final', title: 'Resultado Final', slug: 'resultado-final', order: 3, estimatedMinutes: 10 },
          { type: 'markdown', blockId: 'certificacion', title: 'Certificación', slug: 'certificacion', order: 4, estimatedMinutes: 8 },
        ],
      },
      {
        id: 'm3-fundamentos',
        slug: 'modulo-3-fundamentos-doctrinales',
        title: 'Módulo 3: Fundamentos Doctrinales',
        order: 3,
        description: 'Diferenciador, principio central y desarrollo lección por lección.',
        lessons: [
          { type: 'markdown', blockId: 'diferenciador', title: 'Diferenciador del Programa', slug: 'diferenciador', order: 1, estimatedMinutes: 10 },
          { type: 'markdown', blockId: 'principio-central', title: 'Principio Central', slug: 'principio-central', order: 2, estimatedMinutes: 8 },
          { type: 'markdown', blockId: 'desarrollo-leccion-por-leccion', title: 'Desarrollo Lección por Lección', slug: 'desarrollo', order: 3, estimatedMinutes: 60 },
          { type: 'markdown', blockId: 'principio-final', title: 'Principio Final', slug: 'principio-final', order: 4, estimatedMinutes: 6 },
        ],
      },
      {
        id: 'm4-nivel-0',
        slug: 'modulo-4-nivel-0-despertar',
        title: 'Módulo 4: Nivel 0 — Despertar de Realidad',
        order: 4,
        description: 'Desinstalación del enfoque táctico y ruptura cognitiva fundacional.',
        lessons: [
          { type: 'markdown', blockId: 'nivel-0-despertar', title: 'Nivel 0 — Despertar de Realidad', slug: 'nivel-0', order: 1, estimatedMinutes: 45 },
        ],
      },
    ],
  },
  {
    id: 'tamv-enciclopedia',
    slug: 'tamv-enciclopedia',
    sourceKey: 'enciclopediatamv',
    title: 'Enciclopedia TAMV — Soberanía y Root of Trust',
    level: 'master',
    description:
      'Compendio doctrinal sobre interpretación internacional, reducción de riesgo jurídico e inmutabilidad de legado.',
    modules: [
      {
        id: 'm1-intro-tamv',
        slug: 'modulo-1-introduccion-tamv',
        title: 'Módulo 1: Introducción a la Enciclopedia TAMV',
        order: 1,
        lessons: [
          { type: 'markdown', blockId: 'introduccion', title: 'Introducción al Territorio TAMV', slug: 'introduccion', order: 1, estimatedMinutes: 30 },
        ],
      },
      {
        id: 'm2-clausulas',
        slug: 'modulo-2-clausulas-soberania',
        title: 'Módulo 2: Cláusulas de Soberanía',
        order: 2,
        lessons: [
          { type: 'markdown', blockId: 'clausula-interpretacion', title: 'Cláusula de Interpretación Internacional', slug: 'clausula-interpretacion', order: 1, estimatedMinutes: 15 },
          { type: 'markdown', blockId: 'root-of-trust', title: 'Root of Trust e Inmutabilidad de Legado', slug: 'root-of-trust', order: 2, estimatedMinutes: 20 },
        ],
      },
    ],
  },
];

export function findCurriculumCourse(slug: string) {
  return curriculumCourses.find((c) => c.slug === slug);
}
