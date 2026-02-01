import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import StudentLogin from '@/components/StudentLogin';
import LearnerHome from '@/components/LearnerHome';
import TeacherHome from '@/components/TeacherHome';
import ProgressionSection from '@/components/ProgressionSection';
import RevisionsSection, { defaultRevisionCategories, RevisionCategory } from '@/components/RevisionsSection';
import RevisionQuiz from '@/components/RevisionQuiz';
import SujetsSection from '@/components/SujetsSection';
import ProblemesSection from '@/components/ProblemesSection';
import ComprendreLeMondeSection from '@/components/ComprendreLeMondeSection';
import TeacherDashboard from '@/components/TeacherDashboard';
import NewTeacherDashboard from '@/components/dashboard/NewTeacherDashboard';
import FloatingDashboardButton from '@/components/FloatingDashboardButton';
import TeacherLogin from '@/components/TeacherLogin';
import { useStudentAuth } from '@/hooks/useStudentAuth';

interface AppSession {
  username: string;
  level: number;
  isTeacher?: boolean;
  studentId?: string; // UUID from students table
}

type AppView = 'home' | 'calcul' | 'revisions' | 'revision-quiz' | 'sujets' | 'problemes' | 'monde';
type AuthMode = 'student' | 'teacher';

interface RevisionProgress {
  categoryId: number;
  sessionsCompleted: number;
  bestScore: number;
  mastered: boolean;
}

const MentalCalcTrainer = () => {
  // Auth state
  const [authMode, setAuthMode] = useState<AuthMode>('student');
  const [teacherUser, setTeacherUser] = useState<User | null>(null);
  const [teacherSession, setTeacherSession] = useState<Session | null>(null);
  const [isTeacherLoading, setIsTeacherLoading] = useState(true);

  // Student auth hook
  const { student, logout: studentLogout, isLoggedIn: isStudentLoggedIn } = useStudentAuth();

  // App state
  const [session, setSession] = useState<AppSession | null>(null);
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [showTeacherDashboard, setShowTeacherDashboard] = useState(false);
  const [selectedRevisionCategory, setSelectedRevisionCategory] = useState<number | null>(null);
  const [revisionProgress, setRevisionProgress] = useState<RevisionProgress[]>([]);

  // Check teacher auth on mount
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setTeacherSession(session);
        setTeacherUser(session?.user ?? null);
        setIsTeacherLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setTeacherSession(session);
      setTeacherUser(session?.user ?? null);
      setIsTeacherLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Set session when student logs in - load saved level from localStorage
  useEffect(() => {
    if (student) {
      // Charger le niveau sauvegardé depuis localStorage
      const progressKey = `studentProgress_${(student.displayName || student.firstName).toLowerCase()}`;
      const savedProgress = localStorage.getItem(progressKey);
      let savedLevel = 1;

      if (savedProgress) {
        try {
          const progress = JSON.parse(savedProgress);
          if (progress.currentLevel && typeof progress.currentLevel === 'number') {
            savedLevel = progress.currentLevel;
          }
        } catch (e) {
          console.error('Error loading saved level:', e);
        }
      }

      setSession({
        username: student.displayName || student.firstName,
        level: savedLevel,
        isTeacher: false,
        studentId: student.id,
      });
    }
  }, [student]);

  // Set session when teacher logs in
  useEffect(() => {
    if (teacherUser) {
      // Check if user has teacher role
      setTimeout(() => {
        setTimeout(async () => {
          // Direct query to profiles table instead of RPC to avoid migration issues
          const { data: profileRaw } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', teacherUser.id)
            .single();

          const profile = profileRaw as any;
          const isTeacher = profile?.role === 'teacher' || teacherUser.user_metadata?.role === 'teacher';

          if (isTeacher) {
            setSession({
              username: teacherUser.email?.split('@')[0] || 'Enseignant',
              level: 21,
              isTeacher: true,
            });
          }
        }, 0);
      }, 0);
    }
  }, [teacherUser]);

  // Load revision progress
  useEffect(() => {
    if (session?.username) {
      const savedProgress = localStorage.getItem(`revisionProgress_${session.username.toLowerCase()}`);
      if (savedProgress) {
        setRevisionProgress(JSON.parse(savedProgress));
      }
    }
  }, [session?.username]);

  // Get categories with progress
  const getCategoriesWithProgress = (): RevisionCategory[] => {
    return defaultRevisionCategories.map(cat => {
      const progress = revisionProgress.find(p => p.categoryId === cat.id);
      return {
        ...cat,
        completedQuestions: progress?.mastered ? 50 : (progress?.sessionsCompleted || 0) * 25,
      };
    });
  };

  // Logout handler
  const handleLogout = async () => {
    if (session?.isTeacher) {
      await supabase.auth.signOut();
      setTeacherUser(null);
      setTeacherSession(null);
    } else {
      studentLogout();
    }
    setSession(null);
    setCurrentView('home');
    setShowTeacherDashboard(false);
    setAuthMode('student');
  };

  // Session update handler - also save level to localStorage
  const handleUpdateSession = (updatedSession: AppSession) => {
    setSession(updatedSession);

    // Sauvegarder le niveau dans localStorage pour les élèves
    if (!updatedSession.isTeacher && updatedSession.username) {
      const progressKey = `studentProgress_${updatedSession.username.toLowerCase()}`;
      const existing = localStorage.getItem(progressKey);
      let progress;

      if (existing) {
        try {
          progress = JSON.parse(existing);
        } catch (e) {
          progress = {};
        }
      } else {
        progress = {
          username: updatedSession.username,
          totalAttempts: 0,
          lastActivity: new Date().toISOString(),
          attempts: [],
          errorStats: {},
        };
      }

      progress.currentLevel = updatedSession.level;
      progress.lastActivity = new Date().toISOString();
      localStorage.setItem(progressKey, JSON.stringify(progress));
    }
  };

  // Revision category selection
  const handleSelectRevisionCategory = (categoryId: number) => {
    setSelectedRevisionCategory(categoryId);
    setCurrentView('revision-quiz');
  };

  // Revision completion
  const handleRevisionComplete = (score: number, total: number) => {
    if (!session) return;

    const categoryId = selectedRevisionCategory!;
    const currentProgress = revisionProgress.find(p => p.categoryId === categoryId);

    const newProgress: RevisionProgress = {
      categoryId,
      sessionsCompleted: (currentProgress?.sessionsCompleted || 0) + (score >= 45 ? 1 : 0),
      bestScore: Math.max(currentProgress?.bestScore || 0, score),
      mastered: (currentProgress?.sessionsCompleted || 0) >= 1 && score >= 45,
    };

    const updatedProgress = revisionProgress.filter(p => p.categoryId !== categoryId);
    updatedProgress.push(newProgress);
    setRevisionProgress(updatedProgress);

    localStorage.setItem(
      `revisionProgress_${session.username.toLowerCase()}`,
      JSON.stringify(updatedProgress)
    );
  };

  // Handle student login success - force session creation immediately
  const handleStudentLoginSuccess = () => {
    // Le useEffect sur 'student' va créer la session, mais on force un re-check immédiat
    // pour éviter que le bouton reste en loading
  };

  // Handle teacher login success
  const handleTeacherLoginSuccess = () => {
    // Session will be set by the useEffect watching teacherUser
    setAuthMode('student');
  };

  // Loading state
  if (isTeacherLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  // Auth screens
  if (!session) {
    if (authMode === 'teacher') {
      return (
        <TeacherLogin
          onLoginSuccess={handleTeacherLoginSuccess}
          onBack={() => setAuthMode('student')}
        />
      );
    }

    return (
      <StudentLogin
        onLoginSuccess={handleStudentLoginSuccess}
        onTeacherLogin={() => setAuthMode('teacher')}
      />
    );
  }

  // Floating dashboard button for teachers
  const renderFloatingButton = () => {
    if (session.isTeacher && currentView !== 'home') {
      return <FloatingDashboardButton onClick={() => setShowTeacherDashboard(true)} />;
    }
    return null;
  };

  // Main content
  const renderContent = () => {
    switch (currentView) {
      case 'calcul':
        return (
          <ProgressionSection
            session={session}
            onBack={() => setCurrentView('home')}
            onLogout={handleLogout}
            onUpdateSession={handleUpdateSession}
          />
        );

      case 'revisions':
        return (
          <RevisionsSection
            username={session.username}
            onBack={() => setCurrentView('home')}
            onLogout={handleLogout}
            onSelectCategory={handleSelectRevisionCategory}
            categories={getCategoriesWithProgress()}
          />
        );

      case 'revision-quiz':
        const selectedCat = defaultRevisionCategories.find(c => c.id === selectedRevisionCategory);
        return (
          <RevisionQuiz
            categoryId={selectedRevisionCategory!}
            categoryTitle={selectedCat?.title || 'Révision'}
            username={session.username}
            onBack={() => setCurrentView('revisions')}
            onLogout={handleLogout}
            onComplete={handleRevisionComplete}
          />
        );

      case 'sujets':
        return (
          <SujetsSection
            username={session.username}
            onBack={() => setCurrentView('home')}
            onLogout={handleLogout}
          />
        );

      case 'problemes':
        return (
          <ProblemesSection
            username={session.username}
            onBack={() => setCurrentView('home')}
            onLogout={handleLogout}
          />
        );

      case 'monde':
        return (
          <ComprendreLeMondeSection
            username={session.username}
            onBack={() => setCurrentView('home')}
            onLogout={handleLogout}
          />
        );

      default:
        if (session.isTeacher) {
          return (
            <TeacherHome
              username={session.username}
              onSelectCalcul={() => setCurrentView('calcul')}
              onSelectRevisions={() => setCurrentView('revisions')}
              onSelectSujets={() => setCurrentView('sujets')}
              onSelectProblemes={() => setCurrentView('problemes')}
              onSelectMonde={() => setCurrentView('monde')}
              onSelectDashboard={() => setShowTeacherDashboard(true)}
              onLogout={handleLogout}
            />
          );
        }
        return (
          <LearnerHome
            username={session.username}
            onSelectCalcul={() => setCurrentView('calcul')}
            onSelectRevisions={() => setCurrentView('revisions')}
            onSelectSujets={() => setCurrentView('sujets')}
            onSelectProblemes={() => setCurrentView('problemes')}
            onSelectMonde={() => setCurrentView('monde')}
            onLogout={handleLogout}
          />
        );
    }
  };

  return (
    <>
      {renderContent()}
      {renderFloatingButton()}
      <NewTeacherDashboard
        isOpen={showTeacherDashboard}
        onClose={() => setShowTeacherDashboard(false)}
      />
    </>
  );
};

export default MentalCalcTrainer;