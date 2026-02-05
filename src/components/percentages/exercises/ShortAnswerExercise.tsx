// Composant pour les exercices à réponse courte
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Exercise } from '@/data/percentagesCircuit/types';

interface ShortAnswerExerciseProps {
  exercise: Exercise;
  isAnswered: boolean;
  isCorrect: boolean | null;
  onSubmit: (answer: string) => void;
  mustRetry?: boolean;
}

const ShortAnswerExercise: React.FC<ShortAnswerExerciseProps> = ({
  exercise,
  isAnswered,
  isCorrect,
  onSubmit,
  mustRetry,
}) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && answer.trim() && !isAnswered) {
      handleSubmit();
    }
  };

  // Réinitialiser le champ si on doit réessayer
  React.useEffect(() => {
    if (mustRetry === false && !isAnswered) {
      setAnswer('');
    }
  }, [mustRetry, isAnswered]);

  // Extraire la question avec le placeholder
  const questionParts = exercise.question.split('___');
  
  return (
    <div className="space-y-6">
      {/* Question avec champ intégré */}
      <div className="text-lg sm:text-xl font-medium text-center p-6 bg-muted/30 rounded-xl">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {questionParts[0]}
          <div className="relative inline-block">
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isAnswered}
              className={`w-24 sm:w-32 text-center text-lg font-bold inline-block ${
                isAnswered
                  ? isCorrect
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-destructive bg-destructive/10'
                  : 'border-primary'
              }`}
              placeholder="?"
              autoFocus
            />
            {exercise.unit && (
              <span className="ml-1 font-medium">{exercise.unit}</span>
            )}
          </div>
          {questionParts[1]}
        </div>
      </div>

      {/* Bouton valider */}
      {!isAnswered && (
        <Button
          onClick={handleSubmit}
          disabled={!answer.trim()}
          className="w-full py-6 text-lg"
        >
          🏁 Valider ma réponse
        </Button>
      )}

      {/* Indicateur succès */}
      {isAnswered && isCorrect && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <span className="text-4xl">🎉</span>
        </motion.div>
      )}
    </div>
  );
};

export default ShortAnswerExercise;
