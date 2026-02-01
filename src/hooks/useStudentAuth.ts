import { useState, useCallback, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Student } from '@/types/student';
import { toast } from 'sonner';
import { generateStudentEmail } from '@/utils/auth';

/**
 * Checks if the given user has the 'teacher' role.
 * Returns true if teacher, false otherwise.
 */
const checkIsTeacher = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'teacher')
      .maybeSingle();
    return !error && !!data;
  } catch {
    return false;
  }
};

export const useStudentAuth = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  // Track if we've confirmed the user is NOT a teacher to avoid race conditions
  const isTeacherRef = useRef<boolean | null>(null);

  useEffect(() => {
    const handleSession = async (authSession: any) => {
      setSession(authSession);
      if (!authSession) {
        setStudent(null);
        isTeacherRef.current = null;
        setLoading(false);
        return;
      }

      // CRITICAL: Check teacher role FIRST before attempting student profile load
      const isTeacher = await checkIsTeacher(authSession.user.id);
      isTeacherRef.current = isTeacher;

      if (isTeacher) {
        // Teacher detected - do NOT set student state
        setStudent(null);
        setLoading(false);
        return;
      }

      // Not a teacher - proceed to load student profile
      fetchStudentProfile(authSession.user.id);
    };

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchStudentProfile = async (userId: string) => {
    try {
      // Double-check: if teacher was already detected, bail out
      if (isTeacherRef.current === true) {
        setStudent(null);
        setLoading(false);
        return;
      }

      // First, try to get from profiles table
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (profileData) {
        const profile = profileData as any;
        setStudent({
          id: profile.id,
          first_name: profile.display_name?.split(' ')[0] || '',
          last_name: '',
          display_name: profile.display_name || '',
          level: 1,
          username: profile.display_name || '',
          password_hash: '',
          is_active: true,
          created_at: profile.created_at,
          updated_at: profile.updated_at,
          created_by: null
        });
      } else {
        // Fallback: Use auth.user metadata if no profile exists
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const displayName = user.user_metadata?.display_name || 
                             user.email?.split('@')[0] || 
                             'Élève';
          setStudent({
            id: user.id,
            first_name: displayName.split(' ')[0] || displayName,
            last_name: '',
            display_name: displayName,
            level: 1,
            username: displayName,
            password_hash: '',
            is_active: true,
            created_at: user.created_at,
            updated_at: user.updated_at || user.created_at,
            created_by: null
          });
        }
      }
    } catch (error) {
      console.error('Error fetching student profile:', error);
      // Even on error, try to use auth user as fallback
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const displayName = user.user_metadata?.display_name || 
                             user.email?.split('@')[0] || 
                             'Élève';
          setStudent({
            id: user.id,
            first_name: displayName.split(' ')[0] || displayName,
            last_name: '',
            display_name: displayName,
            level: 1,
            username: displayName,
            password_hash: '',
            is_active: true,
            created_at: user.created_at,
            updated_at: user.updated_at || user.created_at,
            created_by: null
          });
        }
      } catch (fallbackError) {
        console.error('Fallback auth also failed:', fallbackError);
      }
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