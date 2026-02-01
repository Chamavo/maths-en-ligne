-- Create table for storing student responses to "Comprendre le monde" questions
CREATE TABLE public.world_question_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  username TEXT NOT NULL,
  question_id INTEGER NOT NULL,
  response_date DATE NOT NULL DEFAULT CURRENT_DATE,
  choice TEXT NOT NULL CHECK (choice IN ('A', 'B', 'C', 'D')),
  justification TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- One response per user per day
  UNIQUE (user_id, response_date)
);

-- Enable Row Level Security
ALTER TABLE public.world_question_responses ENABLE ROW LEVEL SECURITY;

-- Students can insert their own responses
CREATE POLICY "Users can insert their own world responses"
ON public.world_question_responses
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Students can view their own responses
CREATE POLICY "Users can view their own world responses"
ON public.world_question_responses
FOR SELECT
USING (auth.uid() = user_id);

-- Teachers can view all responses
CREATE POLICY "Teachers can view all world responses"
ON public.world_question_responses
FOR SELECT
USING (has_role(auth.uid(), 'teacher'::app_role));

-- Create index for efficient queries
CREATE INDEX idx_world_responses_user_date ON public.world_question_responses(user_id, response_date);
CREATE INDEX idx_world_responses_date ON public.world_question_responses(response_date);