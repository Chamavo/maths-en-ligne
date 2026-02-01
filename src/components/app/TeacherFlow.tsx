import { useEffect, useState } from 'react';

import { supabase } from '@/integrations/supabase/client';
import type { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

import TeacherLogin from '@/components/TeacherLogin';

import AppShell from './AppShell';
import type { AppSession } from './types';

interface TeacherFlowProps {
  onBack: () => void;
}

const TeacherFlow = ({ onBack }: TeacherFlowProps) => {
  const [authSession, setAuthSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [roleChecked, setRoleChecked] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [session, setSession] = useState<AppSession | null>(null);

  useEffect(() => {
    // Listener MUST stay synchronous; role checks happen in a separate effect
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setAuthSession(nextSession);
      setUser(nextSession?.user ?? null);
      setLoading(false);
      setRoleChecked(false);
      setIsTeacher(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setSession(null);
      setRoleChecked(false);
      setIsTeacher(false);
      return;
    }

    let cancelled = false;
    const checkRole = async () => {
      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'teacher')
          .maybeSingle();

        if (cancelled) return;

        const ok = !error && !!data;
        setIsTeacher(ok);
        setRoleChecked(true);

        if (ok) {
          setSession({
            username: user.email?.split('@')[0] || 'Enseignant',
            level: 21,
            isTeacher: true,
          });
        } else {
          toast.error("Ce compte n'a pas les droits enseignant");
          await supabase.auth.signOut();
        }
      } catch {
        if (cancelled) return;
        setRoleChecked(true);
        setIsTeacher(false);
        toast.error("Impossible de vérifier les droits enseignant");
      }
    };

    checkRole();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setAuthSession(null);
    setUser(null);
    setRoleChecked(false);
    setIsTeacher(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || !authSession) {
    return <TeacherLogin onLoginSuccess={() => {}} onBack={onBack} />;
  }

  if (!roleChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isTeacher || !session) {
    // Not teacher: we've already signed out (or role check failed)
    return <TeacherLogin onLoginSuccess={() => {}} onBack={onBack} />;
  }

  return <AppShell session={session} onSessionChange={setSession} onLogout={handleLogout} />;
};

export default TeacherFlow;
