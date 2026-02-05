// Composant pour exécuter un Grand Prix (série d'exercices)
import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Trophy, RotateCcw, Home, Flag, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { getGrandPrix, getSeasonById } from '@/data/percentagesCircuit/seasons';
import type { Exercise } from '@/data/percentagesCircuit/types';
import { usePercentageAI } from '@/hooks/usePercentageAI';
import { useF1Sounds } from '@/hooks/useF1Sounds';
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
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [mustRetry, setMustRetry] = useState(false);
  const [showOffTrack, setShowOffTrack] = useState(false);

  const { analyzeAnswer, getSuccessFeedback, isLoading, aiMessage, clearMessage } = usePercentageAI();
  const { playEngineStart, playSuccessBeep, playOffTrack, playCheckpoint } = useF1Sounds();

  const exercises = useMemo(() => grandPrix?.exercises || [], [grandPrix]);
  const currentExercise = exercises[currentIndex];
  const progress = ((currentIndex + (isAnswered ? 1 : 0)) / exercises.length) * 100;

  // Trouver la bonne réponse pour un exercice QCM
  const getCorrectQCMAnswer = useCallback((exercise: Exercise): string | null => {
    if (!exercise.choices) return null;
    
    // D'abord vérifier expected_answers
    if (exercise.expected_answers && exercise.expected_answers.length > 0) {
      return exercise.expected_answers[0];
    }
    
    // Logique basée sur le contenu de la question pour déterminer la bonne réponse
    const question = exercise.question.toLowerCase();
    
    // Correspondances directes basées sur les concepts
    if (question.includes('% signifie') || question.includes('symbole %')) {
      return exercise.choices.find(c => c.toLowerCase().includes('sur 100')) || null;
    }
    if (question.includes('50 %') && question.includes('fraction')) {
      return exercise.choices.find(c => c.includes('1/2')) || null;
    }
    if (question.includes('25 %') && question.includes('fraction')) {
      return exercise.choices.find(c => c.includes('1/4')) || null;
    }
    if (question.includes('10 %') && question.includes('fraction')) {
      return exercise.choices.find(c => c.includes('1/10')) || null;
    }
    if (question.includes('50 cases') || question.includes('moitié')) {
      return exercise.choices.find(c => c.toLowerCase().includes('moitié')) || null;
    }
    if (question.includes('100 %') && question.includes('places')) {
      return exercise.choices.find(c => c.toLowerCase().includes('toutes')) || null;
    }
    if (question.includes('75 %') && question.includes('fraction')) {
      return exercise.choices.find(c => c.includes('3/4')) || null;
    }
    if (question.includes('0,5 représente')) {
      return exercise.choices.find(c => c.includes('50 %')) || null;
    }
    if (question.includes('0,1 représente')) {
      return exercise.choices.find(c => c.includes('10 %')) || null;
    }
    if (question.includes('0,01 représente')) {
      return exercise.choices.find(c => c.includes('1 %')) || null;
    }
    if (question.includes('0,05 représente')) {
      return exercise.choices.find(c => c.includes('5 %')) || null;
    }
    if (question.includes('réduction de 50 %')) {
      return exercise.choices.find(c => c.toLowerCase().includes('moitié')) || null;
    }
    if (question.includes('45 sur 100')) {
      return exercise.choices.find(c => c === '45 %') || null;
    }
    if (question.includes('75 %') && question.includes('mécaniciens')) {
      return exercise.choices.find(c => c.includes('75 sur 100')) || null;
    }
    if (question.includes('1/5 équivaut')) {
      return exercise.choices.find(c => c.includes('20 %')) || null;
    }
    if (question.includes('50 % d\'un circuit')) {
      return exercise.choices.find(c => c.toLowerCase().includes('moitié')) || null;
    }
    if (question.includes('calculer 5 %')) {
      return exercise.choices.find(c => c.toLowerCase().includes('diviser par 20')) || null;
    }
    if (question.includes('casque a') && question.includes('casque b')) {
      return exercise.choices.find(c => c.toLowerCase().includes('casque a') && c.includes('80')) || null;
    }
    
    return null;
  }, []);

  const checkAnswer = useCallback((userAnswer: string, exercise: Exercise): boolean => {
    const normalizedAnswer = userAnswer.toLowerCase().trim().replace(',', '.');
    
    if (exercise.expected_answers) {
      return exercise.expected_answers.some(expected => 
        expected.toLowerCase().trim().replace(',', '.') === normalizedAnswer
      );
    }
    
    // Pour les QCM, utiliser la logique intelligente
    if (exercise.type === 'qcm' && exercise.choices) {
      const correctAnswer = getCorrectQCMAnswer(exercise);
      return correctAnswer === userAnswer;
    }
    
    return false;
  }, [getCorrectQCMAnswer]);

  const handleSubmitAnswer = useCallback(async (answer: string) => {
    if (!currentExercise) return;
    
    const correct = checkAnswer(answer, currentExercise);
    
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    setIsAnswered(true);
    
    if (correct) {
      setAnswers(prev => ({
        ...prev,
        [currentExercise.id]: { answer, correct },
      }));
      addXP(10);
      setStreak(s => s + 1);
      setMustRetry(false);
      getSuccessFeedback();
      playSuccessBeep();
    } else {
      // Afficher l'animation de sortie de piste
      setShowOffTrack(true);
      playOffTrack();
      setTimeout(() => setShowOffTrack(false), 1500);
      
      setStreak(0);
      setMustRetry(true);
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

  const handleRetry = useCallback(() => {
    setIsAnswered(false);
    setIsCorrect(null);
    setSelectedAnswer(null);
    setMustRetry(false);
    clearMessage();
  }, [clearMessage]);

  const handleAssociationSubmit = useCallback(async (matches: Record<string, string>) => {
    if (!currentExercise?.pairs) return;
    
    const allCorrect = currentExercise.pairs.every(pair => 
      matches[pair.left] === pair.right
    );
    
    setIsCorrect(allCorrect);
    setIsAnswered(true);
    
    if (allCorrect) {
      setAnswers(prev => ({
        ...prev,
        [currentExercise.id]: { answer: JSON.stringify(matches), correct: allCorrect },
      }));
      addXP(15); // Bonus pour associations
      setStreak(s => s + 1);
      setMustRetry(false);
      getSuccessFeedback();
      playSuccessBeep();
    } else {
      setShowOffTrack(true);
      playOffTrack();
      setTimeout(() => setShowOffTrack(false), 1500);
      
      setStreak(0);
      setMustRetry(true);
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
      playCheckpoint();
      setCurrentIndex(currentIndex + 1);
      setIsAnswered(false);
      setIsCorrect(null);
      setSelectedAnswer(null);
      setMustRetry(false);
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
    setShowStartScreen(true);
    setMustRetry(false);
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

  // Écran de départ - Signal clair pour commencer
  if (showStartScreen) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto"
      >
        <Card className="overflow-hidden border-2 border-primary">
          <div className="p-8 text-center bg-gradient-to-br from-primary/20 via-primary/10 to-background">
            {/* Titre GP */}
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="mb-4"
            >
              <span className="text-4xl mb-2 block">{season.icon}</span>
              <h2 className="text-2xl font-bold">{grandPrix.title}</h2>
              <p className="text-muted-foreground">{grandPrix.description}</p>
            </motion.div>

            {/* Infos de la course */}
            <div className="my-6 py-4 border-y border-border/50">
              <div className="flex justify-center gap-8 text-sm">
                <div>
                  <p className="text-2xl font-bold">{exercises.length}</p>
                  <p className="text-muted-foreground">questions</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">70%</p>
                  <p className="text-muted-foreground">pour valider</p>
                </div>
              </div>
            </div>

            {/* Feux de départ */}
            <motion.div 
              className="flex justify-center gap-3 my-6"
              initial="hidden"
              animate="visible"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-6 h-6 rounded-full bg-red-500"
                  initial={{ opacity: 0.3 }}
                  animate={{ 
                    opacity: 1,
                    backgroundColor: ['#ef4444', '#ef4444', '#22c55e']
                  }}
                  transition={{ 
                    delay: i * 0.3,
                    duration: 0.3,
                    backgroundColor: { delay: 2 + i * 0.1, duration: 0.2 }
                  }}
                />
              ))}
            </motion.div>

            {/* Bouton DÉMARRER très visible */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              <Button
                onClick={() => {
                  playEngineStart();
                  setShowStartScreen(false);
                }}
                size="lg"
                className="w-full py-8 text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
              >
                <Flag className="w-6 h-6 mr-3" />
                🏁 DÉMARRER LA COURSE !
              </Button>
            </motion.div>

            <p className="text-xs text-muted-foreground mt-4">
              💡 Prends ton temps, tu peux utiliser un stylo pour calculer !
            </p>
          </div>
        </Card>
      </motion.div>
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
      {/* Animation de sortie de piste */}
      <AnimatePresence>
        {showOffTrack && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-red-500/20 backdrop-blur-sm"
          >
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: [10, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="bg-red-500 text-white p-8 rounded-2xl shadow-2xl text-center"
            >
              <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold">⚠️ Sortie de piste !</h3>
              <p className="text-white/80">Reprends le contrôle et réessaie !</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Piste de course - Progression visuelle */}
      <div className="relative">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">🏎️ Course {currentIndex + 1}/{exercises.length}</span>
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
        
        {/* Piste visuelle avec drapeaux */}
        <div className="relative h-8 bg-muted rounded-full overflow-hidden border-2 border-border">
          {/* Marqueurs de position (comme des bornes sur une piste) */}
          <div className="absolute inset-0 flex items-center justify-between px-2">
            {exercises.map((_, idx) => (
              <div 
                key={idx}
                className={`w-1 h-4 rounded ${
                  idx < currentIndex 
                    ? 'bg-green-500' 
                    : idx === currentIndex 
                      ? 'bg-primary animate-pulse' 
                      : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
          
          {/* Voiture qui avance */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 text-xl"
            animate={{ left: `${Math.min(progress, 95)}%` }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            🏎️
          </motion.div>
          
          {/* Drapeau à damier à la fin */}
          <div className="absolute right-1 top-1/2 -translate-y-1/2 text-lg">
            🏁
          </div>
        </div>
      </div>

      {/* Zone d'exercice */}
      <Card className={`transition-all ${isCorrect === true ? 'ring-2 ring-green-500' : isCorrect === false ? 'ring-2 ring-red-500' : ''}`}>
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
                  correctAnswer={getCorrectQCMAnswer(currentExercise)}
                />
              )}
              
              {currentExercise.type === 'short_answer' && (
                <ShortAnswerExercise
                  exercise={currentExercise}
                  isAnswered={isAnswered}
                  isCorrect={isCorrect}
                  onSubmit={handleSubmitAnswer}
                  mustRetry={mustRetry}
                />
              )}
              
              {currentExercise.type === 'association' && (
                <AssociationExercise
                  exercise={currentExercise}
                  isAnswered={isAnswered}
                  isCorrect={isCorrect}
                  onSubmit={handleAssociationSubmit}
                  mustRetry={mustRetry}
                />
              )}
              
              {(currentExercise.type === 'multi_step' || currentExercise.type === 'final_challenge') && (
                <MultiStepExercise
                  exercise={currentExercise}
                  isAnswered={isAnswered}
                  isCorrect={isCorrect}
                  onSubmit={handleSubmitAnswer}
                  mustRetry={mustRetry}
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

          {/* Feedback erreur + affichage bonne réponse */}
          {isAnswered && !isCorrect && mustRetry && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-3"
            >
              {/* Bonne réponse */}
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-center">
                <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">La bonne réponse était :</p>
                <p className="text-lg font-bold text-green-600">
                  {currentExercise.type === 'qcm' 
                    ? getCorrectQCMAnswer(currentExercise) 
                    : currentExercise.expected_answers?.[0]
                  } {currentExercise.unit || ''}
                </p>
              </div>
              
              {/* Message IA */}
              {aiMessage && (
                <div className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl">
                  <p className="text-sm">📻 {aiMessage}</p>
                </div>
              )}
              
              {/* Bouton réessayer */}
              <Button
                onClick={handleRetry}
                className="w-full py-6 text-lg bg-amber-500 hover:bg-amber-600"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                🔄 Réessayer cette question
              </Button>
            </motion.div>
          )}

          {/* Succès - Feedback IA positif */}
          {isAnswered && isCorrect && aiMessage && currentExercise.type !== 'free_text' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl"
            >
              <p className="text-sm text-center">🏆 {aiMessage}</p>
            </motion.div>
          )}

          {/* Bouton suivant (uniquement si réponse correcte) */}
          {isAnswered && isCorrect && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <Button
                onClick={handleNext}
                className="w-full py-6 text-lg bg-green-500 hover:bg-green-600"
              >
                {currentIndex < exercises.length - 1 ? (
                  <>
                    ✅ Question suivante
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  <>
                    <Trophy className="w-5 h-5 mr-2" />
                    🏁 Voir mes résultats
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
