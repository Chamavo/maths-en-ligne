-- Create app_role type if it doesn't exist (it seems it is used in policies)
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('teacher', 'student');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = _user_id
    AND role = _role::text
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Also create a text version for flexibility if needed by RPC calls passing text
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role text)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = _user_id
    AND role = _role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
