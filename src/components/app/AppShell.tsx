import { useEffect, useMemo, useState } from 'react';

import LearnerHome from '@/components/LearnerHome';
import TeacherHome from '@/components/TeacherHome';
import ProgressionSection from '@/components/ProgressionSection';
import RevisionsSection, {
  defaultRevisionCategories,
  type RevisionCategory,
} from '@/components/RevisionsSection';
import RevisionQuiz from '@/components/RevisionQuiz';
import SujetsSection from '@/components/SujetsSection';
import ProblemesSection from '@/components/ProblemesSection';
import ComprendreLeMondeSection from '@/components/ComprendreLeMondeSection';
import NewTeacherDashboard from '@/components/dashboard/NewTeacherDashboard';
import FloatingDashboardButton from '@/components/FloatingDashboardButton';

import type { AppSession, AppView } from './types';

interface RevisionProgress {
  categoryId: number;
  sessionsCompleted: number;
  bestScore: number;
  mastered: boolean;
}

interface AppShellProps {
  session: AppSession;
  onSessionChange: (next: AppSession) => void;
  onLogout: () => void | Promise<void>;
}

const AppShell = ({ session, onSessionChange, onLogout }: AppShellProps) => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [showTeacherDashboard, setShowTeacherDashboard] = useState(false);
  const [selectedRevisionCategory, setSelectedRevisionCategory] = useState<number | null>(null);
  const [revisionProgress, setRevisionProgress] = useState<RevisionProgress[]>([]);

  // Load revision progress
  useEffect(() => {
    if (!session?.username) return;
    const savedProgress = localStorage.getItem(`revisionProgress_${session.username.toLowerCase()}`);
    if (savedProgress) {
      try {
        setRevisionProgress(JSON.parse(savedProgress));
      } catch {
        // ignore
      }
    }
  }, [session?.username]);

  const categoriesWithProgress: RevisionCategory[] = useMemo(() => {
    return defaultRevisionCategories.map((cat) => {
      const progress = revisionProgress.find((p) => p.categoryId === cat.id);
      return {
        ...cat,
        completedQuestions: progress?.mastered ? 50 : (progress?.sessionsCompleted || 0) * 25,
      };
    });
  }, [revisionProgress]);

  const handleLogout = async () => {
    await onLogout();
    setCurrentView('home');
    setShowTeacherDashboard(false);
  };

  // Session update handler - also save level to localStorage
  const handleUpdateSession = (updatedSession: AppSession) => {
    onSessionChange(updatedSession);

    // Sauvegarder le niveau dans localStorage pour les élèves
    if (!updatedSession.isTeacher && updatedSession.username) {
      const progressKey = `studentProgress_${updatedSession.username.toLowerCase()}`;
      const existing = localStorage.getItem(progressKey);
      let progress: any;

      if (existing) {
        try {
          progress = JSON.parse(existing);
        } catch {
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

  const handleSelectRevisionCategory = (categoryId: number) => {
    setSelectedRevisionCategory(categoryId);
    setCurrentView('revision-quiz');
  };

  const handleRevisionComplete = (score: number, _total: number) => {
    if (!session) return;
    const categoryId = selectedRevisionCategory!;
    const currentProgress = revisionProgress.find((p) => p.categoryId === categoryId);

    const newProgress: RevisionProgress = {
      categoryId,
      sessionsCompleted: (currentProgress?.sessionsCompleted || 0) + (score >= 45 ? 1 : 0),
      bestScore: Math.max(currentProgress?.bestScore || 0, score),
      mastered: (currentProgress?.sessionsCompleted || 0) >= 1 && score >= 45,
    };

    const updatedProgress = revisionProgress.filter((p) => p.categoryId !== categoryId);
    updatedProgress.push(newProgress);
    setRevisionProgress(updatedProgress);

    localStorage.setItem(`revisionProgress_${session.username.toLowerCase()}`, JSON.stringify(updatedProgress));
  };

  const renderFloatingButton = () => {
    if (session.isTeacher && currentView !== 'home') {
      return <FloatingDashboardButton onClick={() => setShowTeacherDashboard(true)} />;
    }
    return null;
  };

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
            categories={categoriesWithProgress}
          />
        );

      case 'revision-quiz': {
        const selectedCat = defaultRevisionCategories.find((c) => c.id === selectedRevisionCategory);
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
      }

      case 'sujets':
        return (
          <SujetsSection username={session.username} onBack={() => setCurrentView('home')} onLogout={handleLogout} />
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
      <NewTeacherDashboard isOpen={showTeacherDashboard} onClose={() => setShowTeacherDashboard(false)} />
    </>
  );
};

export default AppShell;
