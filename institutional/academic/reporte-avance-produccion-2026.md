# Reporte de Avance Real — UTAMV Campus Virtual
**Fecha:** 2026-06-01 · **Versión:** 1.0 · **Destino:** producción y despliegue público

## 1. Estado global

| Bloque | Avance | Estado | Bloqueantes |
|--------|--------|--------|-------------|
| Identidad institucional (branding, logo, hero) | 95% | ✅ Listo | Pulir contraste botones secundarios |
| Autenticación + roles (RLS, founder bypass) | 88% | 🟡 En revisión | Hardening RLS (ver §4) |
| Campus + Control Escolar | 85% | ✅ Funcional | Métricas avanzadas pendientes |
| Cursos desde Markdown (pipeline `.md → viewer`) | 80% | ✅ Activo | 6 cursos del corpus pendientes de mapear |
| Isabella IA (Gemini 3 Flash, quota 10/día) | 92% | ✅ Producción | Telemetría UI faltante |
| Pagos Stripe (checkout + webhook) | 90% | ✅ Producción | Rate limiting por minuto |
| Certificados PDF + QR + validación | 85% | ✅ Funcional | Cron de integridad activo |
| Integraciones académicas (ORCID, Zenodo sandbox, Figshare, OpenAIRE, ISNI) | 78% | ✅ Funcional | Migrar Zenodo a producción (no sandbox) |
| Admin · Colaboraciones (`/admin/colaboraciones`) | 100% | ✅ Listo | — |
| SEO / GEO / AEO (`llms.txt`, sitemap, robots) | 95% | ✅ Listo | Agregar JSON-LD a páginas de programa |
| Reclutamiento (`/colabora`) | 100% | ✅ Listo | — |
| **Master IA Aplicada — Bibliotecas ML** (nuevo) | 100% corpus + ruta, viewer activo | ✅ Listo | Quizzes y ejercicios prácticos |

**Avance global ponderado: 89%**

## 2. Lo entregado en esta iteración

1. **Corpus ML integrado** (`institutional/uploads/ml_libraries_isabella.md`):
   intro, bibliotecas generales (NumPy, TensorFlow, Keras, PyTorch,
   scikit-learn, XGBoost), especializadas (pandas, matplotlib/seaborn,
   MLflow, Hugging Face, Stable-Baselines3), ruta Master 10 módulos y
   principios UTAMV de ML responsable.
2. **Nuevo curso en currículo dinámico**: `utamv-ml-libraries` con 5
   módulos mapeados al pipeline Markdown → Viewer (`/curso/utamv-ml-libraries`).
3. **Isabella IA actualizada**: system prompt amplía el principio 6 para
   citar el corpus ML y orientar elección de framework (PyTorch
   investigación, TensorFlow despliegue, sklearn prototipado, XGBoost
   tabular).
4. **Índice de bloques Markdown** extendido (`markdownLessonIndex.ts`)
   con la clave `ml_libraries`.

## 3. Catálogo de cursos en producción

| Slug | Programa | Origen |
|------|----------|--------|
| `tamv-online-sdmd` | TAMV ONLINE — SDMD™ | `cursocompleto1.md` |
| `tamv-enciclopedia` | Enciclopedia TAMV — Soberanía | `enciclopediatamv.md` |
| `utamv-ml-libraries` | **Master IA Aplicada — Bibliotecas ML** | `ml_libraries_isabella.md` |

## 4. Hallazgos de seguridad pendientes (críticos para despliegue)

Los siguientes findings del scanner deben resolverse **antes del go-live
público**:

1. **`has_course_access` ignora `course_id`** → migrar a chequeo por
   `enrollments(user_id, course_id, status='active')`.
2. **Policies "deny_anon_*" PERMISSIVE** en `profiles`, `payments`,
   `certificates`, `support_tickets`, `quiz_*`, `lesson_progress`,
   `module_progress`, `user_roles`, `chat_messages_read_all`: convertir a
   RESTRICTIVE sobre rol `anon` y eliminar versión permisiva.
3. **Profiles "Admins full access" por email hardcoded** y
   `auto_assign_founder_admin` trigger: reemplazar por `has_role()`.
4. **Answers visibles antes del intento de examen**: condicionar a
   `quiz_attempts.submitted_at IS NOT NULL`.
5. **Realtime sin RLS por canal**: añadir policies sobre
   `realtime.messages`.
6. **Rate limiting en edge functions**: invocar `check_rate_limit()` en
   `create-checkout-session`, `ai-support`, `stripe-webhook`.

> Recomendación: bloque único de migración "Hardening RLS pre-lanzamiento"
> + parche de tres edge functions. Estimado: 1 iteración.

## 5. Roadmap inmediato (próximas 2 iteraciones)

**Iteración A — Hardening (obligatoria pre-launch)**
- Aplicar las 6 correcciones de §4.
- Implementar recuperación de contraseña funcional.
- Sanitizar logs del webhook de Stripe.

**Iteración B — Contenido + comunidad**
- Mapear los 6 `.md` restantes del corpus al currículo dinámico.
- Banco de preguntas para examen final del Master IA (50 preguntas, 80%).
- Telemetría UI de Isabella + visualización de quota.
- JSON-LD `Course` y `EducationalOrganization` en páginas de programa.

## 6. Métricas de despliegue propuestas

- **TTFB** < 1.2s en Campus.
- **LCP** < 2.5s en Hero.
- **Cobertura RLS**: 100% tablas `public` con policy explícita anon-deny.
- **AI cost guardrail**: 10 msg/día/usuario · alertas Slack al 80% de
  quota global mensual.
- **Webhook Stripe**: 99.5% éxito, retry exponencial.

## 7. Conclusión

La plataforma está en **89%** de readiness. El stack académico, el motor
de cursos Markdown, Isabella IA y las integraciones ORCID/Zenodo/Figshare
están operativos. El bloqueo real para lanzar al mundo es **el bloque de
hardening RLS** (§4), técnicamente acotado y resoluble en una iteración.
Tras eso, el campus es desplegable a producción global.

— Generado por el kernel Lovable + Isabella, 2026-06-01.
