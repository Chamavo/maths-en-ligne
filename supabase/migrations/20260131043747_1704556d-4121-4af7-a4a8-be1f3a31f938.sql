-- Fix RLS policies on world_question_responses to prevent public exposure
-- The current policies allow unauthenticated SELECT which exposes student data

-- Drop the existing policies that allow unauthenticated access
DROP POLICY IF EXISTS "Users and students can view their own world responses" ON public.world_question_responses;
DROP POLICY IF EXISTS "Users and students can insert world responses" ON public.world_question_responses;

-- Create new restrictive policies that properly check authentication

-- Policy for authenticated Supabase users to view their own responses
CREATE POLICY "Authenticated users can view their own world responses" 
ON public.world_question_responses 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy for authenticated Supabase users to insert their own responses  
CREATE POLICY "Authenticated users can insert their own world responses" 
ON public.world_question_responses 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Policy for teachers to view all responses (they need this for the dashboard)
-- This policy already exists as "Teachers can view all world responses", keeping it