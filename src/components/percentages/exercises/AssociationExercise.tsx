// Composant pour les exercices d'association (drag & drop simplifié)
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import type { Exercise, AssociationPair } from '@/data/percentagesCircuit/types';

interface AssociationExerciseProps {
  exercise: Exercise;
  isAnswered: boolean;
  isCorrect: boolean | null;
  onSubmit: (matches: Record<string, string>) => void;
  mustRetry?: boolean;
}

const AssociationExercise: React.FC<AssociationExerciseProps> = ({
  exercise,
  isAnswered,
  isCorrect,
  onSubmit,
  mustRetry,
}) => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});

  const leftItems = exercise.pairs.map(p => p.left);
  const rightItems = [...exercise.pairs.map(p => p.right)].sort(() => Math.random() - 0.5);

  // Réinitialiser si on doit réessayer
  useEffect(() => {
    if (mustRetry === false && !isAnswered) {
      setMatches({});
      setSelectedLeft(null);
    }
  }, [mustRetry, isAnswered]);

  if (!exercise.pairs) return null;

  const handleLeftClick = (item: string) => {
    if (isAnswered) return;
    setSelectedLeft(selectedLeft === item ? null : item);
  };

  const handleRightClick = (item: string) => {
    if (isAnswered || !selectedLeft) return;
    
    // Créer une nouvelle association
    const newMatches = { ...matches };
    
    // Retirer l'ancienne association si elle existe
    Object.keys(newMatches).forEach(key => {
      if (newMatches[key] === item) {
        delete newMatches[key];
      }
    });
    
    newMatches[selectedLeft] = item;
    setMatches(newMatches);
    setSelectedLeft(null);
  };

  const handleSubmit = () => {
    if (Object.keys(matches).length === exercise.pairs!.length) {
      onSubmit(matches);
    }
  };

  const getMatchResult = (left: string): 'correct' | 'incorrect' | null => {
    if (!isAnswered) return null;
    const correctPair = exercise.pairs!.find(p => p.left === left);
    if (correctPair && matches[left] === correctPair.right) {
      return 'correct';
    }
    return 'incorrect';
  };

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-lg sm:text-xl font-medium text-center p-4 bg-muted/30 rounded-xl">
        {exercise.question}
      </div>

      {/* Zone d'association */}
      <div className="grid grid-cols-2 gap-4">
        {/* Colonne gauche */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground text-center">
            Clique pour sélectionner
          </p>
          {leftItems.map((item) => {
            const isSelected = selectedLeft === item;
            const hasMatch = matches[item];
            const result = getMatchResult(item);

            return (
              <motion.button
                key={item}
                onClick={() => handleLeftClick(item)}
                disabled={isAnswered}
                className={`w-full p-3 rounded-xl border-2 transition-all ${
                  result === 'correct'
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : result === 'incorrect'
                      ? 'border-destructive bg-destructive/10'
                      : isSelected
                        ? 'border-primary bg-primary/10'
                        : hasMatch
                          ? 'border-secondary bg-secondary/10'
                          : 'border-muted hover:border-primary/50'
                }`}
                whileHover={!isAnswered ? { scale: 1.02 } : {}}
                whileTap={!isAnswered ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item}</span>
                  {result === 'correct' && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                  {result === 'incorrect' && <XCircle className="w-4 h-4 text-destructive" />}
                  {hasMatch && !isAnswered && (
                    <span className="text-xs text-muted-foreground">→ {hasMatch}</span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Colonne droite */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground text-center">
            Puis clique pour associer
          </p>
          {rightItems.map((item) => {
            const isMatched = Object.values(matches).includes(item);
            const isCorrectMatch = isAnswered && exercise.pairs!.some(
              p => p.right === item && matches[p.left] === item
            );

            return (
              <motion.button
                key={item}
                onClick={() => handleRightClick(item)}
                disabled={isAnswered || !selectedLeft}
                className={`w-full p-3 rounded-xl border-2 transition-all ${
                  isAnswered
                    ? isCorrectMatch
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : isMatched
                        ? 'border-destructive bg-destructive/10'
                        : 'border-muted'
                    : isMatched
                      ? 'border-secondary bg-secondary/10'
                      : selectedLeft
                        ? 'border-muted hover:border-primary/50 cursor-pointer'
                        : 'border-muted opacity-50'
                }`}
                whileHover={!isAnswered && selectedLeft ? { scale: 1.02 } : {}}
                whileTap={!isAnswered && selectedLeft ? { scale: 0.98 } : {}}
              >
                <span className="font-medium">{item}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bouton valider */}
      {!isAnswered && (
        <Button
          onClick={handleSubmit}
          disabled={Object.keys(matches).length !== exercise.pairs.length}
          className="w-full py-6 text-lg"
        >
          🏁 Valider mes associations
        </Button>
      )}
    </div>
  );
};

export default AssociationExercise;
