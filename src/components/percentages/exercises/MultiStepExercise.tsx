// Composant pour les exercices multi-étapes
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, ArrowRight } from 'lucide-react';
import type { Exercise } from '@/data/percentagesCircuit/types';

interface MultiStepExerciseProps {
  exercise: Exercise;
  isAnswered: boolean;
  isCorrect: boolean | null;
  onSubmit: (answer: string) => void;
  mustRetry?: boolean;
}

const MultiStepExercise: React.FC<MultiStepExerciseProps> = ({
  exercise,
  isAnswered,
  isCorrect,
  onSubmit,
  mustRetry,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepAnswers, setStepAnswers] = useState<string[]>([]);
  const [finalAnswer, setFinalAnswer] = useState('');

  const steps = exercise.steps || [];
  const totalSteps = steps.length;

  // Réinitialiser si on doit réessayer
  useEffect(() => {
    if (mustRetry === false && !isAnswered) {
      setCurrentStep(0);
      setStepAnswers([]);
      setFinalAnswer('');
    }
  }, [mustRetry, isAnswered]);

  const handleStepComplete = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleFinalSubmit = () => {
    if (finalAnswer.trim()) {
      onSubmit(finalAnswer.trim());
    }
  };

  return (
    <div className="space-y-6">
      {/* Question principale */}
      <div className="text-lg sm:text-xl font-medium text-center p-4 bg-muted/30 rounded-xl">
        {exercise.question}
      </div>

      {/* Étapes de guidage */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          🛠️ Stratégie en {totalSteps} étapes :
        </p>
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center gap-3 p-3 rounded-lg border ${
              index <= currentStep
                ? 'border-primary/50 bg-primary/5'
                : 'border-muted opacity-50'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
              index < currentStep
                ? 'bg-green-500 text-white'
                : index === currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
            }`}>
              {index < currentStep ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                index + 1
              )}
            </div>
            <span className={index <= currentStep ? 'font-medium' : 'text-muted-foreground'}>
              {step}
            </span>
            {index === currentStep && index < totalSteps - 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleStepComplete}
                className="ml-auto"
              >
                Fait <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Zone de réponse finale */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: currentStep >= totalSteps - 1 ? 1 : 0.5, y: 0 }}
        className="space-y-3"
      >
        <p className="text-sm font-medium">
          📝 Ta réponse finale :
        </p>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={finalAnswer}
            onChange={(e) => setFinalAnswer(e.target.value)}
            disabled={isAnswered || currentStep < totalSteps - 1}
            className={`text-lg text-center ${
              isAnswered
                ? isCorrect
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-destructive bg-destructive/10'
                : ''
            }`}
            placeholder="Écris ta réponse..."
          />
          {exercise.unit && (
            <span className="font-medium text-lg">{exercise.unit}</span>
          )}
        </div>
      </motion.div>

      {/* Bouton valider */}
      {!isAnswered && (
        <Button
          onClick={handleFinalSubmit}
          disabled={!finalAnswer.trim() || currentStep < totalSteps - 1}
          className="w-full py-6 text-lg"
        >
          🏁 Valider ma réponse
        </Button>
      )}
    </div>
  );
};

export default MultiStepExercise;
