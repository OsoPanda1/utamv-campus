// Índice de bloques: mapea (cursoKey, blockId) -> ubicación dentro de un .md
// Estrategia: línea que contiene `startMarker` hasta la línea que contiene `endMarker`
// (sin incluir endMarker). Si no hay endMarker, va hasta el final del archivo.

export type MarkdownBlockConfig = {
  file: string; // relativo al directorio institutional/uploads/
  startMarker: string; // string que debe APARECER en una línea para iniciar el bloque
  endMarker?: string; // opcional, marca fin (línea que lo contiene se excluye)
};

export const markdownLessonIndex = {
  cursocompleto1: {
    'definicion-programa': {
      file: 'cursocompleto1.md',
      startMarker: 'I. DEFINICIÓN DEL PROGRAMA',
      endMarker: 'II. PROPÓSITO',
    },
    'proposito': {
      file: 'cursocompleto1.md',
      startMarker: 'II. PROPÓSITO',
      endMarker: 'III. GOALS',
    },
    'objetivos': {
      file: 'cursocompleto1.md',
      startMarker: 'III. GOALS (OBJETIVOS DEL PROGRAMA)',
      endMarker: 'IV. LEARNING OBJECTIVES',
    },
    'resultados-aprendizaje': {
      file: 'cursocompleto1.md',
      startMarker: 'IV. LEARNING OBJECTIVES',
      endMarker: 'V. ESTRUCTURA DEL PROGRAMA',
    },
    'estructura-programa': {
      file: 'cursocompleto1.md',
      startMarker: 'V. ESTRUCTURA DEL PROGRAMA',
      endMarker: 'VI. METODOLOGÍA',
    },
    'metodologia': {
      file: 'cursocompleto1.md',
      startMarker: 'VI. METODOLOGÍA',
      endMarker: 'VII. RESULTADO FINAL',
    },
    'resultado-final': {
      file: 'cursocompleto1.md',
      startMarker: 'VII. RESULTADO FINAL',
      endMarker: 'VIII. CERTIFICACIÓN',
    },
    'certificacion': {
      file: 'cursocompleto1.md',
      startMarker: 'VIII. CERTIFICACIÓN',
      endMarker: 'IX. DIFERENCIADOR',
    },
    'diferenciador': {
      file: 'cursocompleto1.md',
      startMarker: 'IX. DIFERENCIADOR DEL PROGRAMA',
      endMarker: 'X. PRINCIPIO CENTRAL',
    },
    'principio-central': {
      file: 'cursocompleto1.md',
      startMarker: 'X. PRINCIPIO CENTRAL',
      endMarker: 'XI. DESARROLLO COMPLETO',
    },
    'desarrollo-leccion-por-leccion': {
      file: 'cursocompleto1.md',
      startMarker: 'XI. DESARROLLO COMPLETO DEL PROGRAMA',
      endMarker: 'XII. PRINCIPIO FINAL',
    },
    'principio-final': {
      file: 'cursocompleto1.md',
      startMarker: 'XII. PRINCIPIO FINAL',
      endMarker: 'NIVEL 0 — DESPERTAR DE REALIDAD',
    },
    'nivel-0-despertar': {
      file: 'cursocompleto1.md',
      startMarker: 'NIVEL 0 — DESPERTAR DE REALIDAD',
    },
  },
  enciclopediatamv: {
    'introduccion': {
      file: 'enciclopediatamv.md',
      startMarker: '# enciclopediatamv',
      endMarker: '### VI. Cláusula',
    },
    'clausula-interpretacion': {
      file: 'enciclopediatamv.md',
      startMarker: '### VI. Cláusula de interpretación internacional',
      endMarker: '### VII. Cláusula',
    },
    'root-of-trust': {
      file: 'enciclopediatamv.md',
      startMarker: '### VII. Cláusula de Root of Trust',
      endMarker: '# =========================================================================',
    },
  },
  ml_libraries: {
    'intro-ml': {
      file: 'ml_libraries_isabella.md',
      startMarker: '## I. INTRODUCCION A ML',
      endMarker: '## II. BIBLIOTECAS GENERALES',
    },
    'bibliotecas-generales': {
      file: 'ml_libraries_isabella.md',
      startMarker: '## II. BIBLIOTECAS GENERALES',
      endMarker: '## III. BIBLIOTECAS ESPECIALIZADAS',
    },
    'bibliotecas-especializadas': {
      file: 'ml_libraries_isabella.md',
      startMarker: '## III. BIBLIOTECAS ESPECIALIZADAS',
      endMarker: '## IV. RUTA UTAMV',
    },
    'ruta-master-ia': {
      file: 'ml_libraries_isabella.md',
      startMarker: '## IV. RUTA UTAMV',
      endMarker: '## V. PRINCIPIOS UTAMV',
    },
    'principios-ml-responsable': {
      file: 'ml_libraries_isabella.md',
      startMarker: '## V. PRINCIPIOS UTAMV',
      endMarker: '## VI. REFERENCIAS DE ISABELLA',
    },
  },
} as const satisfies Record<string, Record<string, MarkdownBlockConfig>>;

export type MarkdownCourseKey = keyof typeof markdownLessonIndex;
