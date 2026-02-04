// Composant pour exécuter un Grand Prix (série d'exercices)
import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Trophy, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { getGrandPrix, getSeasonById } from '@/data/percentagesCircuit/seasons';
import type { Exercise } from '@/data/percentagesCircuit/types';
import { usePercentageAI } from '@/hooks/usePercentageAI';
import {
  QCMExercise,
  ShortAnswerExercise,
  AssociationExercise,
  MultiStepExercise,
  FreeTextExercise,
} from './exercises';

interface GrandPrixRunnerProps {
  seasonId: number;
  gpId: number;
  username: string;
  onComplete: (score: number) => void;
  onBack: () => void;
  addXP: (amount: number) => void;
}

const GrandPrixRunner: React.FC<GrandPrixRunnerProps> = ({
  seasonId,
  gpId,
  username,
  onComplete,
  onBack,
  addXP,
}) => {
  const season = getSeasonById(seasonId);
  const grandPrix = getGrandPrix(seasonId, gpId);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, { answer: string; correct: boolean }>>({});
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [streak, setStreak] = useState(0);

  const { analyzeAnswer, getSuccessFeedback, isLoading, aiMessage, clearMessage } = usePercentageAI();

  const exercises = useMemo(() => grandPrix?.exercises || [], [grandPrix]);
  const currentExercise = exercises[currentIndex];
  const progress = ((currentIndex + (isAnswered ? 1 : 0)) / exercises.length) * 100;

  const checkAnswer = useCallback((userAnswer: string, exercise: Exercise): boolean => {
    const normalizedAnswer = userAnswer.toLowerCase().trim().replace(',', '.');
    
    if (exercise.expected_answers) {
      return exercise.expected_answers.some(expected => 
        expected.toLowerCase().trim().replace(',', '.') === normalizedAnswer
      );
    }
    
    // Pour les QCM, vérifier si c'est le bon choix (généralement index 1 basé sur les données)
    if (exercise.type === 'qcm' && exercise.choices) {
      // La bonne réponse est typiquement "sur 100" ou équivalent
      const correctIndex = exercise.choices.findIndex(c => 
        c.toLowerCase().includes('100') || 
        c.toLowerCase().includes('1/2') ||
        c.toLowerCase().includes('moitié')
      );
      return exercise.choices[correctIndex] === userAnswer;
    }
    
    return false;
  }, []);

  const handleSubmitAnswer = useCallback(async (answer: string) => {
    if (!currentExercise) return;
    
    const correct = checkAnswer(answer, currentExercise);
    
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    setIsAnswered(true);
    
    setAnswers(prev => ({
      ...prev,
      [currentExercise.id]: { answer, correct },
    }));

    if (correct) {
      addXP(10);
      setStreak(s => s + 1);
      getSuccessFeedback();
    } else {
      setStreak(0);
      // Demander un feedback IA pour les erreurs
      await analyzeAnswer({
        type: 'percentage_help',
        exercise_question: currentExercise.question,
        exercise_type: currentExercise.type,
        user_answer: answer,
        correct_answers: currentExercise.expected_answers,
        season_id: seasonId,
        ai_feedback_focus: currentExercise.ai_feedback_focus,
      });
    }
  }, [currentExercise, checkAnswer, addXP, getSuccessFeedback, analyzeAnswer, seasonId]);

  const handleAssociationSubmit = useCallback(async (matches: Record<string, string>) => {
    if (!currentExercise?.pairs) return;
    
    const allCorrect = currentExercise.pairs.every(pair => 
      matches[pair.left] === pair.right
    );
    
    setIsCorrect(allCorrect);
    setIsAnswered(true);
    
    setAnswers(prev => ({
      ...prev,
      [currentExercise.id]: { answer: JSON.stringify(matches), correct: allCorrect },
    }));

    if (allCorrect) {
      addXP(15); // Bonus pour associations
      setStreak(s => s + 1);
      getSuccessFeedback();
    } else {
      setStreak(0);
      await analyzeAnswer({
        type: 'percentage_help',
        exercise_question: currentExercise.question,
        exercise_type: 'association',
        user_answer: JSON.stringify(matches),
        season_id: seasonId,
        ai_feedback_focus: currentExercise.ai_feedback_focus,
      });
    }
  }, [currentExercise, addXP, getSuccessFeedback, analyzeAnswer, seasonId]);

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsAnswered(false);
      setIsCorrect(null);
      setSelectedAnswer(null);
      clearMessage();
    } else {
      // Fin du GP - calculer le score
      const correctCount = Object.values(answers).filter(a => a.correct).length;
      const score = Math.round((correctCount / exercises.length) * 100);
      onComplete(score);
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setIsAnswered(false);
    setIsCorrect(null);
    setSelectedAnswer(null);
    setShowResults(false);
    setStreak(0);
    clearMessage();
  };

  if (!grandPrix || !season) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Grand Prix non trouvé</p>
        <Button onClick={onBack} className="mt-4">Retour</Button>
      </div>
    );
  }

  // Écran de résultats
  if (showResults) {
    const correctCount = Object.values(answers).filter(a => a.correct).length;
    const score = Math.round((correctCount / exercises.length) * 100);
    const passed = score >= 70;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto"
      >
        <Card className="overflow-hidden">
          <div className={`p-6 text-center ${passed ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20' : 'bg-gradient-to-br from-orange-500/20 to-amber-500/20'}`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="text-6xl mb-4"
            >
              {passed ? '🏆' : '🔧'}
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">
              {passed ? 'Drapeau à damier !' : 'Arrêt au stand'}
            </h2>
            <p className="text-muted-foreground">
              {passed 
                ? `Bravo ${username} ! Tu as validé ce Grand Prix !`
                : `Continue l'entraînement, ${username} !`
              }
            </p>
          </div>
          
          <CardContent className="p-6 space-y-4">
            <div className="text-center">
              <p className="text-4xl font-bold" style={{ color: season.color }}>
                {score}%
              </p>
              <p className="text-sm text-muted-foreground">
                {correctCount}/{exercises.length} réponses correctes
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleRestart}
                className="flex-1"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Recommencer
              </Button>
              <Button
                onClick={onBack}
                className="flex-1"
              >
                <Home className="w-4 h-4 mr-2" />
                {passed ? 'Continuer' : 'Retour'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* En-tête du GP */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>{season.icon}</span>
          <span>Saison {seasonId}</span>
          <span>•</span>
          <span>{grandPrix.title}</span>
        </div>
        <p className="text-xs text-muted-foreground">{grandPrix.description}</p>
      </div>

      {/* Barre de progression */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Question {currentIndex + 1}/{exercises.length}</span>
          {streak >= 3 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-amber-500 font-medium"
            >
              🔥 Série de {streak} !
            </motion.span>
          )}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Zone d'exercice */}
      <Card>
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentExercise.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {currentExercise.type === 'qcm' && (
                <QCMExercise
                  exercise={currentExercise}
                  selectedAnswer={selectedAnswer}
                  isAnswered={isAnswered}
                  isCorrect={isCorrect}
                  onSelectAnswer={setSelectedAnswer}
                  onValidate={() => selectedAnswer && handleSubmitAnswer(selectedAnswer)}
                />
              )}
              
              {currentExercise.type === 'short_answer' && (
                <ShortAnswerExercise
                  exercise={currentExercise}
                  isAnswered={isAnswered}
                  isCorrect={isCorrect}
                  onSubmit={handleSubmitAnswer}
                />
              )}
              
              {currentExercise.type === 'association' && (
                <AssociationExercise
                  exercise={currentExercise}
                  isAnswered={isAnswered}
                  isCorrect={isCorrect}
                  onSubmit={handleAssociationSubmit}
                />
              )}
              
              {(currentExercise.type === 'multi_step' || currentExercise.type === 'final_challenge') && (
                <MultiStepExercise
                  exercise={currentExercise}
                  isAnswered={isAnswered}
                  isCorrect={isCorrect}
                  onSubmit={handleSubmitAnswer}
                />
              )}
              
              {currentExercise.type === 'free_text' && (
                <FreeTextExercise
                  exercise={currentExercise}
                  isAnswered={isAnswered}
                  isLoading={isLoading}
                  aiMessage={aiMessage}
                  onSubmit={handleSubmitAnswer}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Feedback IA (pour exercices non free_text) */}
          {isAnswered && currentExercise.type !== 'free_text' && aiMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl"
            >
              <p className="text-sm">📻 {aiMessage}</p>
            </motion.div>
          )}

          {/* Bouton suivant */}
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <Button
                onClick={handleNext}
                className="w-full py-6 text-lg"
              >
                {currentIndex < exercises.length - 1 ? (
                  <>
                    Question suivante
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  <>
                    <Trophy className="w-5 h-5 mr-2" />
                    Voir mes résultats
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GrandPrixRunner;
