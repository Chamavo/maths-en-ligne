import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type ProblemHelpType = 
  | 'incomprehension' 
  | 'comment_commencer' 
  | 'bloque' 
  | 'verifier_raisonnement' 
  | 'apres_erreur' 
  | 'correction_finale';

interface ProblemHelpRequest {
  probleme: string;
  niveau: number;
  reponseEleve?: string;
  helpType: ProblemHelpType;
  indicesDejaVus?: number;
  tentatives?: number;
  raisonnementEleve?: string;
  reponseCorrecte?: string | number | (string | number)[];
  unite?: string;
}

export const useProblemAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const askForHelp = async (request: ProblemHelpRequest): Promise<string | null> => {
    setIsLoading(true);
    setError(null);
    setAiMessage(null);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke('ai-tutor', {
        body: {
          type: 'problem_help',
          ...request,
        },
      });

      if (invokeError) {
        throw new Error(invokeError.message);
      }

      if (data?.success && data?.message) {
        setAiMessage(data.message);
        return data.message;
      } else {
        throw new Error(data?.error || 'Failed to get AI response');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Problem AI error:', errorMessage);
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessage = () => {
    setAiMessage(null);
    setError(null);
  };

  return {
    askForHelp,
    isLoading,
    aiMessage,
    error,
    clearMessage,
  };
};
