import { useEffect, useState } from 'react';

import { supabase } from '@/integrations/supabase/client';

import StudentFlow from '@/components/app/StudentFlow';
import TeacherFlow from '@/components/app/TeacherFlow';

type AuthMode = 'student' | 'teacher';

const MentalCalcTrainer = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('student');

  // If an existing authenticated session belongs to a teacher, prefer teacher mode.
  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user || cancelled) return;

      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'teacher')
        .maybeSingle();

      if (!cancelled && data) setAuthMode('teacher');
    };

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  if (authMode === 'teacher') {
    return <TeacherFlow onBack={() => setAuthMode('student')} />;
  }

  return <StudentFlow onTeacherLogin={() => setAuthMode('teacher')} />;
};

export default MentalCalcTrainer;