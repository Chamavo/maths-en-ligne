-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Users can insert their own world responses" ON public.world_question_responses;

-- Create a new INSERT policy that allows:
-- 1. Teachers/authenticated users via auth.uid()
-- 2. Students via student_id (when student_id matches an active student)
CREATE POLICY "Users and students can insert world responses"
ON public.world_question_responses
FOR INSERT
WITH CHECK (
  -- Allow authenticated Supabase users
  (auth.uid() = user_id)
  OR
  -- Allow students with valid student_id
  (student_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.students 
    WHERE students.id = world_question_responses.student_id 
    AND students.is_active = true
  ))
);

-- Also update SELECT policy to allow students to view their own responses
DROP POLICY IF EXISTS "Users can view their own world responses" ON public.world_question_responses;

CREATE POLICY "Users and students can view their own world responses"
ON public.world_question_responses
FOR SELECT
USING (
  (auth.uid() = user_id)
  OR
  (student_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.students 
    WHERE students.id = world_question_responses.student_id 
    AND students.is_active = true
  ))
);