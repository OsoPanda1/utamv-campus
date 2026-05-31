# Análisis integral UTAMV / Método 4L para cierre curricular

## Alcance del barrido

Se revisó el repositorio operativo disponible en `/workspace/utamv-campus` y sus carpetas académicas, institucionales y de aplicación. En el entorno actual solo existe un repositorio Git detectado para UTAMV/4L: `utamv-campus`.

## Fuentes absorbidas para completar cursos

| Fuente | Uso curricular |
|---|---|
| `institutional/metodo4l/framework/metodologia-tamv-4l-apex-eoct.md` | Marco rector de diseño, intervención, pedagogía y evaluación. |
| `institutional/metodo4l/framework/metodo-4l.md` y `utamv-os/core/metodo-4l.md` | Secuencia Landscape, Leverage, Loop, Learn. |
| `institutional/metodo4l/framework/eoct.md` y `utamv-os/core/eoct.md` | Métricas económicas, operativas, científicas y transaccionales. |
| `institutional/metodo4l/framework/etica-y-soberania-tecnologica.md` | Límites de IA, privacidad, dependencia y autonomía. |
| `institutional/metodo4l/docs/arquitectura-academica-utamv.md` | Regla de consistencia: hipótesis, ciclo 4L, evidencia EOCT, iteración y defensa. |
| `institutional/metodo4l/docs/matriz-estandar-utamv-por-ruta.md` | Gramática modular reusable por ruta. |
| `institutional/metodo4l/aplicacion/*` | Traducción a vida personal, profesional, empresa y clientes. |
| `institutional/uploads/*` | Contexto macro TAMV, territorialidad digital, RDM Digital, gemelos digitales, gobernanza y economía territorial. |
| `src/data/courseContent.ts` y `src/data/coursesData.ts` | Referencia del campus comercial y formato de experiencia educativa. |

## Diagnóstico inicial

El curso `curso-tamv-arquitectura-digital` tenía un Módulo 1 completo, un Módulo 5 con piezas avanzadas y varios módulos declarados solo como estructura base. La brecha principal no era conceptual sino editorial-operativa: faltaban objetivos, lecciones, casos, ejercicios, entregables y rúbricas para que cada módulo fuera defendible bajo el estándar UTAMV.

## Criterio de completitud aplicado

Cada módulo queda alineado con cinco condiciones institucionales:

1. **Hipótesis explícita**: el estudiante debe formular qué cambio espera producir.
2. **Ciclo 4L completo**: Landscape, Leverage, Loop y Learn aparecen como práctica, no solo como teoría.
3. **Evidencia EOCT**: toda entrega debe producir evidencia económica, operativa, científica o transaccional.
4. **Documentación transferible**: el resultado debe poder leerse, auditarse y reutilizarse.
5. **Defensa profesional**: el estudiante debe explicar límites, riesgos, decisiones y aprendizajes.

## Integración RDM Digital / SOT

La especificación aportada de **RDM Digital — Sistema Operativo Territorial** se incorporó como caso integrador de arquitectura territorial para el Proyecto Final. El caso permite conectar infraestructura, identidad, economía, IA, gobernanza, comercio, pagos, datos y experiencia en una arquitectura defendible, sin convertir el repositorio actual de Vite en una migración forzada a Next.js. La implementación curricular queda preparada para que una fase posterior cree un paquete `rdm-digital` Vercel-ready si se decide separar producto de campus.

## Resultado curricular

Se completaron los módulos 2, 3, 4, 6, 7, 8, 9 y 10 con el patrón editorial estándar:

- objetivos,
- lecciones,
- casos,
- ejercicios,
- entregable,
- rúbrica.

El curso ahora puede operar como ruta completa de arquitectura digital TAMV: de lectura sistémica inicial a proyecto final defendible.
