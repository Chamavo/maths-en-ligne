// Composant pour les exercices à réponse libre (texte)
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles } from 'lucide-react';
import type { Exercise } from '@/data/percentagesCircuit/types';

interface FreeTextExerciseProps {
  exercise: Exercise;
  isAnswered: boolean;
  isLoading: boolean;
  aiMessage: string | null;
  onSubmit: (answer: string) => void;
}

const FreeTextExercise: React.FC<FreeTextExerciseProps> = ({
  exercise,
  isAnswered,
  isLoading,
  aiMessage,
  onSubmit,
}) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim().length >= 10) {
      onSubmit(answer.trim());
    }
  };

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-lg sm:text-xl font-medium text-center p-4 bg-muted/30 rounded-xl">
        {exercise.question}
      </div>

      {/* Zone de réponse */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          📻 Explique ton raisonnement à l'équipe :
        </p>
        <Textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={isAnswered}
          placeholder="Écris ta réponse et ton explication ici..."
          className="min-h-[120px] text-base"
        />
        <p className="text-xs text-muted-foreground text-right">
          {answer.length} caractères (min. 10)
        </p>
      </div>

      {/* Feedback IA */}
      {(isLoading || aiMessage) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              {isLoading ? (
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5 text-primary" />
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-primary mb-1">
                📻 Message de l'ingénieur
              </h4>
              {isLoading ? (
                <p className="text-muted-foreground">Analyse en cours...</p>
              ) : (
                <p className="text-foreground/90 whitespace-pre-wrap">{aiMessage}</p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Bouton valider */}
      {!isAnswered && (
        <Button
          onClick={handleSubmit}
          disabled={answer.trim().length < 10 || isLoading}
          className="w-full py-6 text-lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyse en cours...
            </>
          ) : (
            '🏁 Envoyer ma réponse'
          )}
        </Button>
      )}
    </div>
  );
};

export default FreeTextExercise;
