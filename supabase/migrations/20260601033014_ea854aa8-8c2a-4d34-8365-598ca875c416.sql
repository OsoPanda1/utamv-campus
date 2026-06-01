
-- =========================================================
-- UTAMV — Hardening total RLS (junio 2026)
-- =========================================================

-- 1) has_course_access real: valida matrícula activa por curso
CREATE OR REPLACE FUNCTION public.has_course_access(p_user_id uuid, p_course_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    public.has_role(p_user_id, 'admin'::public.app_role)
    OR EXISTS (
      SELECT 1
      FROM public.enrollments e
      WHERE e.user_id = p_user_id
        AND e.course_id = p_course_id
        AND e.status = 'active'
    );
$$;

-- 2) profiles: quitar política permisiva y bloquear auto-escalada
DROP POLICY IF EXISTS "deny_anon_profiles_select" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can update own profile (safe)"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id
  AND is_paid IS NOT DISTINCT FROM (SELECT p.is_paid FROM public.profiles p WHERE p.user_id = auth.uid())
  AND role    IS NOT DISTINCT FROM (SELECT p.role    FROM public.profiles p WHERE p.user_id = auth.uid())
  AND stripe_customer_id IS NOT DISTINCT FROM (SELECT p.stripe_customer_id FROM public.profiles p WHERE p.user_id = auth.uid())
);

-- 3) answers: solo después de enviar intento
DROP POLICY IF EXISTS "answers_user_select" ON public.answers;
DROP POLICY IF EXISTS "Paid users can view answers" ON public.answers;

CREATE POLICY "answers_after_attempt"
ON public.answers
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.quiz_attempts qa
    JOIN public.questions q ON q.quiz_id = qa.quiz_id
    WHERE q.id = answers.question_id
      AND qa.user_id = auth.uid()
      AND qa.submitted_at IS NOT NULL
  )
  OR public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- 4) questions / quizzes: quitar SELECT global
DROP POLICY IF EXISTS "questions_user_select" ON public.questions;
DROP POLICY IF EXISTS "quizzes_user_select" ON public.quizzes;

-- 5) chat_messages: quitar lectura global
DROP POLICY IF EXISTS "chat_messages_read_all" ON public.chat_messages;

-- 6) payments: quitar permisiva anon-deny
DROP POLICY IF EXISTS "deny_anon_payments_select" ON public.payments;

-- 7) support_tickets: quitar permisiva
DROP POLICY IF EXISTS "deny_anon_tickets_select" ON public.support_tickets;

-- 8) quiz_scores
DROP POLICY IF EXISTS "deny_anon_quiz_scores" ON public.quiz_scores;

-- 9) progress
DROP POLICY IF EXISTS "deny_anon_lesson_progress" ON public.lesson_progress;
DROP POLICY IF EXISTS "deny_anon_module_progress" ON public.module_progress;

-- 10) certificates
DROP POLICY IF EXISTS "deny_anon_certificates_select" ON public.certificates;

-- 11) quiz_attempts
DROP POLICY IF EXISTS "deny_anon_quiz_attempts" ON public.quiz_attempts;

-- 12) user_roles: convertir deny_anon en RESTRICTIVE real
DROP POLICY IF EXISTS "deny_anon_user_roles" ON public.user_roles;

CREATE POLICY "user_roles_deny_anon_restrictive"
ON public.user_roles
AS RESTRICTIVE
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- 13) Revocar EXECUTE público de funciones SECURITY DEFINER sensibles
REVOKE EXECUTE ON FUNCTION public.has_course_access(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_course_access(uuid, uuid) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
