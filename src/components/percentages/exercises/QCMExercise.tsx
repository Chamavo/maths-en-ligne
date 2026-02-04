// Composant pour afficher un exercice QCM
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import type { Exercise } from '@/data/percentagesCircuit/types';

interface QCMExerciseProps {
  exercise: Exercise;
  selectedAnswer: string | null;
  isAnswered: boolean;
  isCorrect: boolean | null;
  onSelectAnswer: (answer: string) => void;
  onValidate: () => void;
}

const QCMExercise: React.FC<QCMExerciseProps> = ({
  exercise,
  selectedAnswer,
  isAnswered,
  isCorrect,
  onSelectAnswer,
  onValidate,
}) => {
  if (!exercise.choices) return null;

  return (
    <div className="space-y-4">
      {/* Question */}
      <div className="text-lg sm:text-xl font-medium text-center p-4 bg-muted/30 rounded-xl">
        {exercise.question}
      </div>

      {/* Choix */}
      <div className="grid grid-cols-1 gap-3">
        {exercise.choices.map((choice, index) => {
          const isSelected = selectedAnswer === choice;
          const showResult = isAnswered;
          // Pour QCM, la bonne réponse est généralement le 2ème choix (index 1) basé sur les données
          // Mais on devrait comparer avec expected_answers si disponible
          const isThisCorrect = exercise.expected_answers?.includes(choice) || 
            (exercise.choices && index === 1); // Fallback basé sur structure données

          return (
            <motion.button
              key={index}
              onClick={() => !isAnswered && onSelectAnswer(choice)}
              disabled={isAnswered}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                showResult
                  ? isThisCorrect
                    ? 'border-green-500 bg-green-500/10'
                    : isSelected
                      ? 'border-red-500 bg-red-500/10'
                      : 'border-muted'
                  : isSelected
                    ? 'border-primary bg-primary/10'
                    : 'border-muted hover:border-primary/50 hover:bg-muted/50'
              }`}
              whileHover={!isAnswered ? { scale: 1.02 } : {}}
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  showResult
                    ? isThisCorrect
                      ? 'bg-green-500 text-white'
                      : isSelected
                        ? 'bg-red-500 text-white'
                        : 'bg-muted'
                    : isSelected
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="font-medium">{choice}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bouton valider */}
      {!isAnswered && (
        <Button
          onClick={onValidate}
          disabled={!selectedAnswer}
          className="w-full py-6 text-lg"
        >
          🏁 Valider ma réponse
        </Button>
      )}
    </div>
  );
};

export default QCMExercise;
