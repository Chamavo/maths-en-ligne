import { useEffect, useState } from 'react';

import { supabase } from '@/integrations/supabase/client';

import StudentFlow from '@/components/app/StudentFlow';
import TeacherFlow from '@/components/app/TeacherFlow';

type AuthMode = 'loading' | 'student' | 'teacher';

const MentalCalcTrainer = () => {
  // Start in loading so we don't mount the student flow (and thus useStudentAuth)
  // while an already-authenticated teacher session is being detected.
  const [authMode, setAuthMode] = useState<AuthMode>('loading');

  // If an existing authenticated session belongs to a teacher, prefer teacher mode.
  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (cancelled) return;

      // No existing auth session => default to student flow (login screen)
      if (!session?.user) {
        setAuthMode('student');
        return;
      }

      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'teacher')
        .maybeSingle();

      if (cancelled) return;
      setAuthMode(data ? 'teacher' : 'student');
    };

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  if (authMode === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (authMode === 'teacher') {
    return <TeacherFlow onBack={() => setAuthMode('student')} />;
  }

  return <StudentFlow onTeacherLogin={() => setAuthMode('teacher')} />;
};

export default MentalCalcTrainer;