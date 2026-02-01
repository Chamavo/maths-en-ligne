-- Function to record the result of a level attempt
-- Called when a student finishes a level (Pass or Fail)
CREATE OR REPLACE FUNCTION public.record_level_result(
  p_level integer,
  p_success boolean
) 
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id uuid;
  v_progression public.student_progression%ROWTYPE;
  v_new_failures int;
  v_result jsonb;
BEGIN
  v_user_id := auth.uid();
  
  -- Get current progression or create if missing
  SELECT * INTO v_progression 
  FROM public.student_progression 
  WHERE user_id = v_user_id;

  IF NOT FOUND THEN
    INSERT INTO public.student_progression (user_id, current_level) 
    VALUES (v_user_id, 1) 
    RETURNING * INTO v_progression;
  END IF;

  -- Logic
  IF p_success THEN
    -- Level Passed
    UPDATE public.student_progression
    SET 
      consecutive_failures = 0,
      status = 'active',
      -- Optional: Auto-advance level if it's the current one?
      -- The frontend usually asks to "START" the next level, 
      -- but we should probably support auto-advance here to be safe.
      -- For now, we trust the frontend to call explicit advance or start.
      -- But let's at least clear the block.
      updated_at = now()
    WHERE user_id = v_user_id;

    v_result := jsonb_build_object(
      'status', 'active',
      'failures', 0,
      'level_blocked', false
    );
  ELSE
    -- Level Failed
    v_new_failures := v_progression.consecutive_failures + 1;
    
    -- Check threshold (3 failures)
    -- If already blocked, stay blocked (unless success above clears it)
    
    IF v_new_failures >= 3 THEN
      UPDATE public.student_progression
      SET 
        status = 'blocked',
        consecutive_failures = v_new_failures,
        required_revision_module = 'revision_auto', -- Can be specific later
        updated_at = now()
      WHERE user_id = v_user_id;
      
      v_result := jsonb_build_object(
        'status', 'blocked', 
        'failures', v_new_failures,
        'level_blocked', true
      );
    ELSE
      UPDATE public.student_progression
      SET 
        consecutive_failures = v_new_failures,
        updated_at = now()
      WHERE user_id = v_user_id;
      
      v_result := jsonb_build_object(
        'status', 'warning', 
        'failures', v_new_failures,
        'level_blocked', false
      );
    END IF;
  END IF;

  RETURN v_result;
END;
$$;

-- Function to get blocking info from DB
CREATE OR REPLACE FUNCTION public.get_blocking_info(p_level integer)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_progression public.student_progression%ROWTYPE;
BEGIN
  SELECT * INTO v_progression 
  FROM public.student_progression 
  WHERE user_id = auth.uid();
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('isBlocked', false, 'failCount', 0);
  END IF;

  RETURN jsonb_build_object(
    'isBlocked', v_progression.status = 'blocked', 
    'failCount', v_progression.consecutive_failures,
    'requiredRevision', v_progression.required_revision_module
  );
END;
$$;
