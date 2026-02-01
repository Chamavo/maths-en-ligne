-- Create a profiles table to extend auth.users
-- This table will store role information and display names
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role text NOT NULL CHECK (role IN ('teacher', 'student')),
  first_name text,
  last_name text,
  display_name text,
  is_active boolean DEFAULT true,
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

-- Teachers can update profiles (e.g. deactivate students)
CREATE POLICY "Teachers can update profiles" 
ON public.profiles FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.profiles p 
  WHERE p.id = auth.uid() 
  AND p.role = 'teacher'
));

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Create student_progression table
-- This table is the Source of Truth for the student's journey
CREATE TABLE public.student_progression (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  current_level INTEGER NOT NULL DEFAULT 1,
  
  -- Status: 
  -- 'active': Normal learning mode
  -- 'blocked': Failed too many times, needs revision
  -- 'revision': Currently in a revision module
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'blocked', 'revision')),
  
  -- Track consecutive failures to trigger blocking
  consecutive_failures INTEGER NOT NULL DEFAULT 0,
  
  -- If blocked, which specific revision module ID is required?
  required_revision_module TEXT,
  
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on student_progression
ALTER TABLE public.student_progression ENABLE ROW LEVEL SECURITY;

-- Policies for progression
-- Students can view their own progression
CREATE POLICY "Students can view own progression" 
ON public.student_progression FOR SELECT 
USING (auth.uid() = user_id);

-- Teachers can view all students' progression
CREATE POLICY "Teachers can view all progression" 
ON public.student_progression FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'teacher'
));

-- Teachers can update progression
CREATE POLICY "Teachers can update progression" 
ON public.student_progression FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'teacher'
));

-- Function to handle new user signup (Trigger)
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role, first_name, last_name, display_name, is_active)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'role', 'student'),
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'display_name',
    COALESCE((new.raw_user_meta_data->>'is_active')::boolean, true)
  );

  -- If it's a student, initialize their progression
  IF COALESCE(new.raw_user_meta_data->>'role', 'student') = 'student' THEN
    INSERT INTO public.student_progression (user_id, current_level)
    VALUES (new.id, 1);
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function on auth.users insert
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
