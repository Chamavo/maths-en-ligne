-- Ajouter des politiques UPDATE et DELETE restrictives sur user_roles
-- Seuls les enseignants (teachers) peuvent modifier/supprimer des rôles

-- Policy pour UPDATE : seulement les teachers peuvent modifier les rôles
CREATE POLICY "Only teachers can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'teacher'::app_role))
WITH CHECK (has_role(auth.uid(), 'teacher'::app_role));

-- Policy pour DELETE : seulement les teachers peuvent supprimer des rôles  
CREATE POLICY "Only teachers can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'teacher'::app_role));