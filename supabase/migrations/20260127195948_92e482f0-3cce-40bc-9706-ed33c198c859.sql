-- Table pour les comptes élèves avec authentification sécurisée
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  display_name TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id)
);

-- Historique des connexions élèves
CREATE TABLE public.student_login_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  logged_in_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT
);

-- Lier les sessions d'apprentissage aux élèves
ALTER TABLE public.learning_sessions 
ADD COLUMN student_id UUID REFERENCES public.students(id) ON DELETE SET NULL;

-- Lier les évaluations aux élèves
ALTER TABLE public.student_evaluations 
ADD COLUMN student_id UUID REFERENCES public.students(id) ON DELETE SET NULL;

-- Lier l'historique des questions aux élèves
ALTER TABLE public.student_question_history
ADD COLUMN student_id UUID REFERENCES public.students(id) ON DELETE SET NULL;

-- Lier les réponses monde aux élèves
ALTER TABLE public.world_question_responses
ADD COLUMN student_id UUID REFERENCES public.students(id) ON DELETE SET NULL;

-- Index pour les performances
CREATE INDEX idx_students_first_name ON public.students(first_name);
CREATE INDEX idx_student_login_history_student_id ON public.student_login_history(student_id);
CREATE INDEX idx_learning_sessions_student_id ON public.learning_sessions(student_id);
CREATE INDEX idx_student_evaluations_student_id ON public.student_evaluations(student_id);

-- Trigger pour updated_at
CREATE TRIGGER update_students_updated_at
BEFORE UPDATE ON public.students
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- RLS pour students
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Seuls les enseignants peuvent gérer les élèves
CREATE POLICY "Teachers can manage students"
ON public.students FOR ALL
USING (has_role(auth.uid(), 'teacher'::app_role))
WITH CHECK (has_role(auth.uid(), 'teacher'::app_role));

-- Lecture publique pour la connexion (vérification du prénom)
CREATE POLICY "Anyone can check student existence"
ON public.students FOR SELECT
USING (true);

-- RLS pour l'historique de connexion
ALTER TABLE public.student_login_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers can view login history"
ON public.student_login_history FOR ALL
USING (has_role(auth.uid(), 'teacher'::app_role));

CREATE POLICY "Public can insert login history"
ON public.student_login_history FOR INSERT
WITH CHECK (true);