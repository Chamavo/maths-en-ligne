-- Fix RLS for world_question_responses: avoid referencing protected students table directly in policies
-- by using a SECURITY DEFINER helper.

CREATE OR REPLACE FUNCTION public.is_active_student(_student_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.students s
    WHERE s.id = _student_id
      AND s.is_active = true
  );
$$;

-- Restrict who can execute the helper (still callable from RLS policies)
REVOKE ALL ON FUNCTION public.is_active_student(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_active_student(uuid) TO anon, authenticated;

-- Replace policies that referenced public.students directly (blocked by RLS)
DROP POLICY IF EXISTS "Users and students can insert world responses" ON public.world_question_responses;
DROP POLICY IF EXISTS "Users and students can view their own world responses" ON public.world_question_responses;

-- Students (custom auth, anon role) can only act on rows where user_id == student_id
-- and student_id is an active student.
CREATE POLICY "Users and students can insert world responses"
ON public.world_question_responses
FOR INSERT
WITH CHECK (
  (auth.uid() = user_id)
  OR (
    auth.uid() IS NULL
    AND student_id IS NOT NULL
    AND user_id = student_id
    AND public.is_active_student(student_id)
  )
);

CREATE POLICY "Users and students can view their own world responses"
ON public.world_question_responses
FOR SELECT
USING (
  (auth.uid() = user_id)
  OR (
    auth.uid() IS NULL
    AND student_id IS NOT NULL
    AND user_id = student_id
    AND public.is_active_student(student_id)
  )
);
