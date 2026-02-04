// Hook pour l'IA tuteur du module Pourcentages
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  getFeedbacksBySeason, 
  getRandomSuccessFeedback, 
  getEncouragementFeedback 
} from '@/data/percentagesCircuit/aiFeedbacks';

interface PercentageAIRequest {
  type: 'percentage_help';
  exercise_question: string;
  exercise_type: string;
  user_answer: string;
  correct_answers?: string[];
  season_id: number;
  ai_feedback_focus?: string;
}

export const usePercentageAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeAnswer = async (request: PercentageAIRequest): Promise<string | null> => {
    setIsLoading(true);
    setError(null);
    setAiMessage(null);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke('ai-tutor', {
        body: {
          type: 'percentage_help',
          question: request.exercise_question,
          exerciseType: request.exercise_type,
          userAnswer: request.user_answer,
          correctAnswers: request.correct_answers,
          seasonId: request.season_id,
          feedbackFocus: request.ai_feedback_focus,
        },
      });

      if (invokeError) {
        throw new Error(invokeError.message);
      }

      if (data?.success && data?.message) {
        setAiMessage(data.message);
        return data.message;
      } else {
        // Fallback : utiliser les feedbacks locaux
        const localFeedback = getEncouragementFeedback();
        setAiMessage(localFeedback);
        return localFeedback;
      }
    } catch (err) {
      console.error('Percentage AI error:', err);
      // Fallback en cas d'erreur
      const localFeedback = getEncouragementFeedback();
      setAiMessage(localFeedback);
      return localFeedback;
    } finally {
      setIsLoading(false);
    }
  };

  const getSuccessFeedback = (): string => {
    const feedback = getRandomSuccessFeedback();
    setAiMessage(feedback);
    return feedback;
  };

  const clearMessage = () => {
    setAiMessage(null);
    setError(null);
  };

  return {
    analyzeAnswer,
    getSuccessFeedback,
    isLoading,
    aiMessage,
    error,
    clearMessage,
  };
};
