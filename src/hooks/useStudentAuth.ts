import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Student } from '@/types/student';
import { toast } from 'sonner';
import { generateStudentEmail } from '@/utils/auth';

export const useStudentAuth = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchStudentProfile(session.user.id);
      else setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchStudentProfile(session.user.id);
      else {
        setStudent(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchStudentProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;

      // We also need the progression to fully hydrate the student object
      const { data: progression } = await supabase
        .from('student_progression')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (data) {
        const profileData = data as any;
        const progressionData = progression as any;

        setStudent({
          id: profileData.id,
          first_name: profileData.first_name || '',
          last_name: profileData.last_name || '',
          display_name: profileData.display_name || '',
          // Use progression data if available, else defaults
          level: progressionData?.current_level || 1,
          // Legacy fields mapping
          username: profileData.first_name || '', // simplified
          password_hash: '',
          is_active: true,
          created_at: data.created_at,
          updated_at: data.created_at,
          created_by: null
        });
      }
    } catch (error) {
      console.error('Error fetching student profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback(async (firstName: string, password: string): Promise<boolean> => {
    try {
      const email = generateStudentEmail(firstName);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        toast.error("Nom d'utilisateur ou mot de passe incorrect");
        return false;
      }

      toast.success("Bon retour, " + firstName + " !");

      // Update last login
      // We don't block UI for this, it's fire-and-forget
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          supabase.from('profiles')
            .update({ last_login_at: new Date().toISOString() })
            .eq('id', user.id)
            .then();
        }
      });

      return true;
    } catch (e) {
      console.error('Login exception:', e);
      toast.error("Erreur de connexion");
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setStudent(null);
    toast.info("À bientôt !");
  }, []);

  return {
    student,
    loading,
    login,
    logout,
    session,
    isLoggedIn: !!student
  };
};

export const useStudentManagement = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsLoading(false);
        return;
      }

      // We should eventually replace this with direct DB query if we have permissions
      // But for now, keeping the edge function call is safer if RLS is complex
      // However, since we are moving to standard Auth, we might want to query 'profiles'

      const { data, error } = await supabase.functions.invoke('student-auth', {
        body: { action: 'list' }
      });

      if (!error && data.students) {
        setStudents(data.students);
      }
    } catch (e) {
      console.error('Fetch students error:', e);
    }
    setIsLoading(false);
  }, []);

  const createStudent = useCallback(async (
    firstName: string,
    password: string,
    displayName?: string
  ): Promise<{ success: boolean; error?: string; student?: any }> => {
    try {
      // NOTE: We rely on the Edge Function to create the Auth User because we can't do it from client
      // (unless we are logged in as admin, which we are not, we are just a 'teacher')
      const { data, error } = await supabase.functions.invoke('student-auth', {
        body: { action: 'create', firstName, password, displayName }
      });

      if (error) {
        return { success: false, error: 'Erreur de création' };
      }

      if (data.error) {
        return { success: false, error: data.error };
      }

      await fetchStudents();
      return { success: true, student: data.student };
    } catch (e) {
      console.error('Create student error:', e);
      return { success: false, error: 'Erreur de création' };
    }
  }, [fetchStudents]);

  const updatePassword = useCallback(async (
    studentId: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.functions.invoke('student-auth', {
        body: { action: 'update-password', studentId, newPassword }
      });

      if (error || data.error) {
        return { success: false, error: data?.error || 'Erreur de mise à jour' };
      }

      return { success: true };
    } catch (e) {
      console.error('Update password error:', e);
      return { success: false, error: 'Erreur de mise à jour' };
    }
  }, []);

  const toggleActive = useCallback(async (
    studentId: string,
    isActive: boolean
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.functions.invoke('student-auth', {
        body: { action: 'toggle-active', studentId, isActive }
      });

      if (error || data.error) {
        return { success: false, error: data?.error || 'Erreur de mise à jour' };
      }

      await fetchStudents();
      return { success: true };
    } catch (e) {
      console.error('Toggle active error:', e);
      return { success: false, error: 'Erreur de mise à jour' };
    }
  }, [fetchStudents]);

  const generatePassword = useCallback((): string => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let password = '';
    for (let i = 0; i < 6; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }, []);

  return {
    students,
    isLoading,
    fetchStudents,
    createStudent,
    updatePassword,
    toggleActive,
    generatePassword
  };
};