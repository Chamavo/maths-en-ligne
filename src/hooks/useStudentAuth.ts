import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Student {
  id: string;
  firstName: string;
  displayName: string;
}

interface StudentSession {
  student: Student;
  loggedInAt: string;
}

const SESSION_KEY = 'student_session';
const AUTH_CHANGED_EVENT = 'student-auth-changed';

export const useStudentAuth = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSessionFromStorage = useCallback(() => {
    const savedSession = localStorage.getItem(SESSION_KEY);
    if (!savedSession) {
      setStudent(null);
      return;
    }

    try {
      const session: StudentSession = JSON.parse(savedSession);
      setStudent(session.student);
    } catch {
      localStorage.removeItem(SESSION_KEY);
      setStudent(null);
    }
  }, []);

  // Restaurer la session au chargement + se synchroniser entre plusieurs composants
  useEffect(() => {
    loadSessionFromStorage();

    // Note: l'événement "storage" ne se déclenche pas dans le même onglet.
    // On écoute donc aussi un événement custom dispatché après login/logout.
    const onAuthChanged = () => loadSessionFromStorage();
    window.addEventListener(AUTH_CHANGED_EVENT, onAuthChanged);

    return () => {
      window.removeEventListener(AUTH_CHANGED_EVENT, onAuthChanged);
    };
  }, [loadSessionFromStorage]);

  const login = useCallback(async (firstName: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke('student-auth', {
        body: { action: 'login', firstName, password }
      });

      if (invokeError) {
        console.error('Login invoke error:', invokeError);
        setError('Erreur de connexion');
        setIsLoading(false);
        return false;
      }

      if (data.error) {
        setError(data.error);
        setIsLoading(false);
        return false;
      }

      const studentData: Student = data.student;
      
      // Sauvegarder la session AVANT de mettre à jour l'état
      const session: StudentSession = {
        student: studentData,
        loggedInAt: new Date().toISOString()
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
      
      // Mettre à jour l'état et arrêter le loading AVANT de retourner
      setStudent(studentData);
      setIsLoading(false);
      
      return true;
    } catch (e) {
      console.error('Login error:', e);
      setError('Erreur de connexion');
      setIsLoading(false);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setStudent(null);
    localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    student,
    isLoading,
    error,
    login,
    logout,
    clearError,
    isLoggedIn: !!student
  };
};

// Fonctions pour la gestion des élèves (enseignant)
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

  // Générer un mot de passe aléatoire
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