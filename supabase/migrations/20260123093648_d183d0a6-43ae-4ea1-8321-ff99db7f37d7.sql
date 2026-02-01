-- Table pour stocker l'historique des questions posées à chaque élève
CREATE TABLE public.student_question_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  level NUMERIC NOT NULL,
  question_enonce TEXT NOT NULL,
  attempt_number INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index pour optimiser les requêtes
CREATE INDEX idx_student_question_history_user_level ON public.student_question_history(user_id, level);
CREATE INDEX idx_student_question_history_attempt ON public.student_question_history(user_id, level, attempt_number);

-- Enable RLS
ALTER TABLE public.student_question_history ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own question history"
ON public.student_question_history
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own question history"
ON public.student_question_history
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own question history"
ON public.student_question_history
FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Teachers can view all question history"
ON public.student_question_history
FOR SELECT
USING (has_role(auth.uid(), 'teacher'::app_role));

CREATE POLICY "Teachers can delete question history"
ON public.student_question_history
FOR DELETE
USING (has_role(auth.uid(), 'teacher'::app_role));