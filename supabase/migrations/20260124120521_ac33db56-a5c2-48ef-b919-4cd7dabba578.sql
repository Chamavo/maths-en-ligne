-- Table pour stocker les évaluations des étudiants
CREATE TABLE public.student_evaluations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  username TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  note_sur_20 NUMERIC(4,1) NOT NULL,
  time_spent_seconds INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour stocker les erreurs de chaque évaluation
CREATE TABLE public.evaluation_errors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  evaluation_id UUID NOT NULL REFERENCES public.student_evaluations(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  user_answer TEXT,
  correct_answer TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.student_evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluation_errors ENABLE ROW LEVEL SECURITY;

-- RLS policies pour student_evaluations
CREATE POLICY "Users can view their own evaluations"
ON public.student_evaluations
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own evaluations"
ON public.student_evaluations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Teachers can view all evaluations"
ON public.student_evaluations
FOR SELECT
USING (has_role(auth.uid(), 'teacher'::app_role));

-- RLS policies pour evaluation_errors
CREATE POLICY "Users can view their own evaluation errors"
ON public.evaluation_errors
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.student_evaluations se
    WHERE se.id = evaluation_id AND se.user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert their own evaluation errors"
ON public.evaluation_errors
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.student_evaluations se
    WHERE se.id = evaluation_id AND se.user_id = auth.uid()
  )
);

CREATE POLICY "Teachers can view all evaluation errors"
ON public.evaluation_errors
FOR SELECT
USING (has_role(auth.uid(), 'teacher'::app_role));

-- Index pour améliorer les performances
CREATE INDEX idx_student_evaluations_user_id ON public.student_evaluations(user_id);
CREATE INDEX idx_student_evaluations_completed_at ON public.student_evaluations(completed_at DESC);
CREATE INDEX idx_evaluation_errors_evaluation_id ON public.evaluation_errors(evaluation_id);