-- Supprimer la policy trop permissive
DROP POLICY IF EXISTS "Public can insert login history" ON public.student_login_history;

-- Recréer avec une vérification que l'étudiant existe
CREATE POLICY "Insert login history for existing students"
ON public.student_login_history FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.students 
    WHERE id = student_login_history.student_id 
    AND is_active = true
  )
);