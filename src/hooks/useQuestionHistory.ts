import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface QuestionHistoryEntry {
  question_enonce: string;
  attempt_number: number;
}

export const useQuestionHistory = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Récupérer les questions du dernier essai pour un niveau donné
  const getLastAttemptQuestions = useCallback(async (
    userId: string,
    level: number
  ): Promise<Set<string>> => {
    try {
      // Trouver le numéro du dernier essai
      const { data: lastAttempt, error: lastError } = await supabase
        .from('student_question_history')
        .select('attempt_number')
        .eq('user_id', userId)
        .eq('level', level)
        .order('attempt_number', { ascending: false })
        .limit(1);

      if (lastError) {
        console.error('Erreur récupération dernier essai:', lastError);
        return new Set();
      }

      if (!lastAttempt || lastAttempt.length === 0) {
        return new Set();
      }

      const lastAttemptNumber = lastAttempt[0].attempt_number;

      // Récupérer toutes les questions du dernier essai
      const { data: questions, error: questionsError } = await supabase
        .from('student_question_history')
        .select('question_enonce')
        .eq('user_id', userId)
        .eq('level', level)
        .eq('attempt_number', lastAttemptNumber);

      if (questionsError) {
        console.error('Erreur récupération questions:', questionsError);
        return new Set();
      }

      return new Set(questions?.map(q => q.question_enonce) || []);
    } catch (error) {
      console.error('Erreur getLastAttemptQuestions:', error);
      return new Set();
    }
  }, []);

  // Enregistrer les questions d'un nouvel essai
  const saveAttemptQuestions = useCallback(async (
    userId: string,
    level: number,
    questions: string[]
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Trouver le prochain numéro d'essai
      const { data: lastAttempt, error: lastError } = await supabase
        .from('student_question_history')
        .select('attempt_number')
        .eq('user_id', userId)
        .eq('level', level)
        .order('attempt_number', { ascending: false })
        .limit(1);

      if (lastError) {
        console.error('Erreur récupération dernier essai:', lastError);
        setIsLoading(false);
        return false;
      }

      const nextAttemptNumber = lastAttempt && lastAttempt.length > 0 
        ? lastAttempt[0].attempt_number + 1 
        : 1;

      // Insérer toutes les questions de cet essai
      const entries = questions.map(q => ({
        user_id: userId,
        level,
        question_enonce: q,
        attempt_number: nextAttemptNumber
      }));

      const { error: insertError } = await supabase
        .from('student_question_history')
        .insert(entries);

      if (insertError) {
        console.error('Erreur insertion questions:', insertError);
        setIsLoading(false);
        return false;
      }

      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Erreur saveAttemptQuestions:', error);
      setIsLoading(false);
      return false;
    }
  }, []);

  // Nettoyer l'historique ancien (garder seulement les 2 derniers essais)
  const cleanupOldHistory = useCallback(async (
    userId: string,
    level: number
  ): Promise<void> => {
    try {
      // Trouver le numéro du dernier essai
      const { data: lastAttempt } = await supabase
        .from('student_question_history')
        .select('attempt_number')
        .eq('user_id', userId)
        .eq('level', level)
        .order('attempt_number', { ascending: false })
        .limit(1);

      if (!lastAttempt || lastAttempt.length === 0) return;

      const lastAttemptNumber = lastAttempt[0].attempt_number;

      // Supprimer les essais antérieurs à l'avant-dernier
      if (lastAttemptNumber > 2) {
        await supabase
          .from('student_question_history')
          .delete()
          .eq('user_id', userId)
          .eq('level', level)
          .lt('attempt_number', lastAttemptNumber - 1);
      }
    } catch (error) {
      console.error('Erreur cleanupOldHistory:', error);
    }
  }, []);

  return {
    getLastAttemptQuestions,
    saveAttemptQuestions,
    cleanupOldHistory,
    isLoading
  };
};
