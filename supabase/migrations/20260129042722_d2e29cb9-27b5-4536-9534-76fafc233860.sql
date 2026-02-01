-- Fix: Remove overly permissive SELECT policy that exposes password_hash
-- The current policy "Anyone can check student existence" with USING(true) exposes all columns including password_hash

-- Drop the vulnerable policy
DROP POLICY IF EXISTS "Anyone can check student existence" ON public.students;

-- Create a more restrictive policy that only allows public access to check if a student exists by first_name
-- but does NOT expose the password_hash column
-- Note: The edge function uses service role which bypasses RLS, so login will still work

-- For student existence check (used during login), we need a secure approach:
-- The edge function already uses service_role_key which bypasses RLS
-- So we don't need any public SELECT policy at all for normal operation

-- Only teachers should be able to SELECT students
-- The existing "Teachers can manage students" policy handles this for teachers