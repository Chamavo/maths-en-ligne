-- Table pour persister la progression des élèves (indépendante des mises à jour de l'application)
CREATE TABLE public.student_progression (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  mode TEXT NOT NULL DEFAULT 'progression',
  current_level INTEGER NOT NULL DEFAULT 1,
  fail_count INTEGER NOT NULL DEFAULT 0,
  is_blocked BOOLEAN NOT NULL DEFAULT false,
  required_correct_streak INTEGER NOT NULL DEFAULT 10,
  current_correct_streak INTEGER NOT NULL DEFAULT 0,
  level_in_progress BOOLEAN DEFAULT false,
  level_started_at TIMESTAMP WITH TIME ZONE,
  extra_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, student_name, mode)
);

-- Enable RLS
ALTER TABLE public.student_progression ENABLE ROW LEVEL SECURITY;

-- Policies: Users can manage their own progression
CREATE POLICY "Users can view their own progression"
  ON public.student_progression FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progression"
  ON public.student_progression FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progression"
  ON public.student_progression FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own progression"
  ON public.student_progression FOR DELETE
  USING (auth.uid() = user_id);

-- Teachers can view all progressions
CREATE POLICY "Teachers can view all progressions"
  ON public.student_progression FOR SELECT
  USING (has_role(auth.uid(), 'teacher'::app_role));

-- Teachers can update student progressions (for manual corrections)
CREATE POLICY "Teachers can update student progressions"
  ON public.student_progression FOR UPDATE
  USING (has_role(auth.uid(), 'teacher'::app_role));

-- Teachers can delete progressions (reset)
CREATE POLICY "Teachers can delete progressions"
  ON public.student_progression FOR DELETE
  USING (has_role(auth.uid(), 'teacher'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_student_progression_updated_at
  BEFORE UPDATE ON public.student_progression
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();