-- Enable DELETE on learning_sessions for teachers to reset student counters
CREATE POLICY "Teachers can delete sessions to reset students"
ON public.learning_sessions
FOR DELETE
USING (has_role(auth.uid(), 'teacher'::app_role));