import { useEffect, useState } from 'react';

import StudentLogin from '@/components/StudentLogin';
import { useStudentAuth } from '@/hooks/useStudentAuth';

import AppShell from './AppShell';
import type { AppSession } from './types';

interface StudentFlowProps {
  onTeacherLogin: () => void;
}

const StudentFlow = ({ onTeacherLogin }: StudentFlowProps) => {
  const { student, loading, logout: studentLogout } = useStudentAuth();
  const [session, setSession] = useState<AppSession | null>(null);

  // Build app session when student logs in - load saved level from localStorage
  useEffect(() => {
    if (!student) {
      setSession(null);
      return;
    }

    const studentName = student.display_name || student.first_name;
    const progressKey = `studentProgress_${studentName.toLowerCase()}`;
    const savedProgress = localStorage.getItem(progressKey);
    let savedLevel = 1;

    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        if (progress.currentLevel && typeof progress.currentLevel === 'number') {
          savedLevel = progress.currentLevel;
        }
      } catch {
        // ignore
      }
    }

    setSession({
      username: studentName,
      level: savedLevel,
      isTeacher: false,
      studentId: student.id,
    });
  }, [student]);

  const handleLogout = async () => {
    await studentLogout();
    setSession(null);
  };

  if (loading && !student && !session) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session) {
    return <StudentLogin onLoginSuccess={() => {}} onTeacherLogin={onTeacherLogin} />;
  }

  return <AppShell session={session} onSessionChange={setSession} onLogout={handleLogout} />;
};

export default StudentFlow;
