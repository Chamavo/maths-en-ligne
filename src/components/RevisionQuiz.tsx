import React, { useState, useEffect, useCallback } from 'react';
import { LogOut, CheckCircle, XCircle, Clock, Target, RotateCcw, ChevronRight, GripVertical, Unlock, Brain } from 'lucide-react';
import { motion, Reorder } from 'framer-motion';
import { RevisionExercise, getExercisesByCategory, shuffleArray, getCategoryName } from '@/data/revisionExercises';
import BackToMenuButton from './BackToMenuButton';
import AITutorDialog from './AITutorDialog';
import { useAITutor } from '@/hooks/useAITutor';
import {
  getBlockingInfo,
  unblockLevel
} from '@/utils/levelBlockingSystem';

interface RevisionQuizProps {
  categoryId: number;
  categoryTitle: string;
  username: string;
  onBack: () => void;
  onLogout: () => void;
  onComplete: (score: number, total: number) => void;
}

interface QuizResult {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  correct: boolean;
  type: string;
}

const RevisionQuiz: React.FC<RevisionQuizProps> = ({
  categoryId,
  categoryTitle,
  username,
  onBack,
  onLogout,
  onComplete,
}) => {
  const [exercises, setExercises] = useState<RevisionExercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [orderedItems, setOrderedItems] = useState<string[]>([]);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [currentSeriesScore, setCurrentSeriesScore] = useState(0);
  const [currentSeriesIndex, setCurrentSeriesIndex] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [seriesFailed, setSeriesFailed] = useState(false);
  const [startTime] = useState(Date.now());
  const [unlockStreak, setUnlockStreak] = useState(0);
  const [showUnlockMessage, setShowUnlockMessage] = useState(false);
  const [unlockedLevel, setUnlockedLevel] = useState<number | null>(null);
  const [blockedLevel, setBlockedLevel] = useState<number | null>(null);

  // AI Tutor
  const { askForHelp, isLoading: isAILoading, aiMessage, clearMessage } = useAITutor();
  const [showAIHelp, setShowAIHelp] = useState(false);

  const handleRequestAI = async () => {
    if (!currentExercise) return;

    setShowAIHelp(true);
    await askForHelp({
      type: 'math_help',
      question: currentExercise.question,
      correctAnswer: String(currentExercise.answer),
      userAnswer: userAnswer || selectedChoice || '',
      astuce: currentExercise.hint,
      failureCount: 1 // On assume 1 échec si on demande après une erreur
    });
  };

  // Vérifier s'il y a un niveau bloqué et initialiser le compteur
  useEffect(() => {
    const fetchBlockingInfo = async () => {
      const blockingInfo = await getBlockingInfo(username);
      if (blockingInfo && blockingInfo.isBlocked) {
        setBlockedLevel(blockingInfo.level);
        // Le streak démarre à 0 pour la session de révision, ou on pourrait le récupérer si stocké
        setUnlockStreak(0);
      }
    };
    fetchBlockingInfo();
  }, [username]);

  // Initialize exercises
  useEffect(() => {
    const categoryExercises = getExercisesByCategory(categoryId);
    const shuffled = shuffleArray(categoryExercises).slice(0, 50);
    setExercises(shuffled);
  }, [categoryId]);

  // Initialize ordering items when exercise changes
  useEffect(() => {
    if (exercises[currentIndex]?.type === 'ordering' && exercises[currentIndex].orderItems) {
      setOrderedItems(shuffleArray([...exercises[currentIndex].orderItems!]));
    }
  }, [currentIndex, exercises]);

  const currentExercise = exercises[currentIndex];
  const currentSeriesStart = currentSeriesIndex * 10;
  const currentSeriesEnd = Math.min(currentSeriesStart + 10, exercises.length);
  const positionInSeries = currentIndex - currentSeriesStart + 1;

  const submitAnswer = useCallback(async () => {
    if (!currentExercise) return;

    let userAns = '';
    let isCorrect = false;

    if (currentExercise.type === 'qcm') {
      userAns = selectedChoice || '';
      isCorrect = selectedChoice === String(currentExercise.answer);
    } else if (currentExercise.type === 'ordering') {
      userAns = orderedItems.join(' ; ');
      const correctOrderStr = currentExercise.correctOrder?.join(' ; ') || '';
      isCorrect = userAns === correctOrderStr;
    } else {
      userAns = userAnswer;
      // Compare numeric values
      const userNum = parseFloat(userAnswer.replace(',', '.'));
      const correctNum = typeof currentExercise.answer === 'number'
        ? currentExercise.answer
        : parseFloat(String(currentExercise.answer).replace(',', '.'));
      isCorrect = !isNaN(userNum) && Math.abs(userNum - correctNum) < 0.001;
    }

    const result: QuizResult = {
      question: currentExercise.question,
      userAnswer: userAns,
      correctAnswer: String(currentExercise.answer),
      correct: isCorrect,
      type: currentExercise.type,
    };

    setResults([...results, result]);
    setLastAnswerCorrect(isCorrect);
    setShowResult(true);

    if (isCorrect) {
      setCurrentSeriesScore(prev => prev + 1);

      // Système de déblocage : incrémenter le streak si un niveau est bloqué
      if (blockedLevel !== null) {
        const newStreak = unlockStreak + 1;
        setUnlockStreak(newStreak);

        if (newStreak >= 10) {
          await unblockLevel(username, blockedLevel);
          setShowUnlockMessage(true);
          setUnlockedLevel(blockedLevel);
          setBlockedLevel(null);
        }
      }
    } else {
      // Réinitialiser le streak en cas d'erreur
      if (blockedLevel !== null) {
        setUnlockStreak(0);
      }
    }

    // Delay before next question handling
    if (isCorrect) {
      setTimeout(() => {
        goToNextQuestion();
      }, 1000);
    }
    // Si incorrect, l'utilisateur doit cliquer sur "Suivant" manuel (à ajouter) ou on laisse un délai long ?
    // Pour l'instant on garde le timeout mais long (3s) -> Mieux : ajouter un bouton "Continuer" si erreur ?
    // Le code original avait 3000ms. On va garder 3000ms MAIS on pourrait vouloir que l'élève clique sur "Comprendre avec l'IA".
    // On va modifier le timeout pour qu'il ne se déclenche QUE si c'est correct, ou très long si incorrect ?
    // Non, pour l'intégration IA, il faut bloquer le passage automatique si c'est faux !

  }, [currentExercise, selectedChoice, orderedItems, userAnswer, results, username, blockedLevel, unlockStreak]);

  const goToNextQuestion = () => {
    setShowResult(false);
    setUserAnswer('');
    setSelectedChoice(null);

    const nextIndex = currentIndex + 1;
    const seriesEnd = (currentSeriesIndex + 1) * 10;

    // End of current series (every 10 questions)
    if (nextIndex >= seriesEnd || nextIndex >= exercises.length) {
      const finalScore = currentSeriesScore + (lastAnswerCorrect ? 1 : 0);

      if (finalScore < 6) {
        // Series failed - must restart category
        setSeriesFailed(true);
      } else if (nextIndex >= exercises.length) {
        // All 50 questions completed
        const totalScore = results.filter(r => r.correct).length + (lastAnswerCorrect ? 1 : 0);
        setSessionComplete(true);
        onComplete(totalScore, exercises.length);
      } else {
        // Move to next series
        setCurrentSeriesIndex(prev => prev + 1);
        setCurrentSeriesScore(0);
        setCurrentIndex(nextIndex);
      }
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  // Écran de déblocage de niveau
  if (showUnlockMessage && unlockedLevel !== null) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card rounded-2xl shadow-2xl p-8 max-w-lg text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: 2 }}
          >
            <Unlock className="w-24 h-24 text-green-500 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            🎉 Bravo ! Niveau {unlockedLevel} débloqué !
          </h2>
          <p className="text-xl text-green-600 font-medium mb-6">
            Tu peux retourner t'entraîner en calcul ! 🚀
          </p>
          <p className="text-muted-foreground mb-6">
            Tu as réussi 10 réponses justes d'affilée. Le niveau {unlockedLevel} de la Progression est maintenant accessible.
          </p>
          <div className="space-y-3">
            <button
              onClick={onBack}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg transition flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Retour au menu
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Series failed screen
  if (seriesFailed) {
    const seriesScore = currentSeriesScore;
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card rounded-2xl shadow-2xl p-8 max-w-lg text-center"
        >
          <XCircle className="w-20 h-20 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Série non validée 😔
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Tu as obtenu {seriesScore}/10 (minimum requis : 6/10)
          </p>
          <p className="text-muted-foreground mb-6">
            Tu dois recommencer cette catégorie avec de nouvelles questions.
          </p>
          <div className="space-y-3">
            <button
              onClick={onBack}
              className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-semibold py-4 rounded-lg transition flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Recommencer la catégorie
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Session complete screen
  if (sessionComplete) {
    const totalScore = results.filter(r => r.correct).length;
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    const passed = totalScore >= 45;

    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card rounded-2xl shadow-2xl p-8 max-w-lg text-center"
        >
          {passed ? (
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          ) : (
            <Target className="w-20 h-20 text-primary mx-auto mb-4" />
          )}
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {passed ? '🎉 Excellent travail !' : 'Session terminée !'}
          </h2>
          <p className="text-lg text-muted-foreground mb-2">
            Score : {totalScore}/50
          </p>
          <p className="text-muted-foreground mb-4">
            Temps : {Math.floor(totalTime / 60)}:{String(totalTime % 60).padStart(2, '0')}
          </p>
          {passed && (
            <p className="text-green-600 font-medium mb-4">
              ✓ Session validée pour la maîtrise (≥45/50)
            </p>
          )}
          <button
            onClick={onBack}
            className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-semibold py-4 rounded-lg transition"
          >
            Retour aux catégories
          </button>
        </motion.div>
      </div>
    );
  }

  if (!currentExercise) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-xl text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / exercises.length) * 100;

  return (
    <div className="min-h-screen gradient-bg p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BackToMenuButton onClick={onBack} variant="icon" />
            <button
              onClick={onLogout}
              className="bg-card p-2 rounded-full shadow hover:shadow-lg transition"
            >
              <LogOut className="w-5 h-5 text-muted-foreground" />
            </button>
            <div>
              <h1 className="font-bold text-xl text-foreground">{categoryTitle}</h1>
              <p className="text-sm text-muted-foreground">
                Série {currentSeriesIndex + 1}/5 • Question {positionInSeries}/10
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-card px-3 py-1 rounded-full shadow text-sm">
              <span className="font-bold text-primary">{currentSeriesScore}</span>
              <span className="text-muted-foreground">/10</span>
            </div>
            <div className="text-muted-foreground text-sm">
              {currentIndex + 1}/{exercises.length}
            </div>
          </div>
        </div>

        {/* Bandeau de déblocage si un niveau est bloqué */}
        {blockedLevel !== null && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary/10 border-2 border-primary/30 rounded-xl p-4 mb-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Unlock className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Niveau {blockedLevel} bloqué • Objectif : 10 réponses justes d'affilée
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${i < unlockStreak ? 'bg-green-500' : 'bg-muted'
                        }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-primary">{unlockStreak}/10</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Progress bar */}
        <div className="mb-6">
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card rounded-2xl shadow-xl p-6"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 mb-6">
            <h2 className={`font-bold text-center text-foreground ${currentExercise.question.length > 80 ? 'text-lg' : 'text-xl'
              }`}>
              {currentExercise.question}
            </h2>
          </div>

          {/* Result feedback */}
          {showResult && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-center mb-4 p-4 rounded-lg ${lastAnswerCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
            >
              {lastAnswerCorrect ? '✓ Correct !' : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="font-bold">✗ Réponse correcte : {
                      currentExercise.type === 'ordering'
                        ? currentExercise.correctOrder?.join(' ; ')
                        : String(currentExercise.answer)
                    }</div>
                    {currentExercise.hint && (
                      <div className="text-sm opacity-80 bg-white/50 rounded px-3 py-2">
                        💡 {currentExercise.hint}
                      </div>
                    )}
                  </div>

                  {/* AI Tutor Help Button */}
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={handleRequestAI}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition flex items-center gap-2 shadow-sm"
                    >
                      <Brain className="w-4 h-4" />
                      M'expliquer avec l'IA
                    </button>
                    <button
                      onClick={goToNextQuestion}
                      className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-semibold transition shadow-sm"
                    >
                      Question suivante <ChevronRight className="w-4 h-4 inline ml-1" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Input based on type */}
          {!showResult && (
            <div className="space-y-4">
              {currentExercise.type === 'qcm' && currentExercise.choices && (
                <div className="grid gap-3">
                  {currentExercise.choices.map((choice, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedChoice(choice)}
                      className={`p-4 rounded-xl border-2 text-left transition ${selectedChoice === choice
                        ? 'border-primary bg-primary/10'
                        : 'border-muted hover:border-primary/50'
                        }`}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              )}

              {currentExercise.type === 'ordering' && (
                <div>
                  <p className="text-sm text-muted-foreground mb-3 text-center">
                    Glisse les éléments pour les ranger dans le bon ordre<br />
                    <span className="font-medium text-foreground">
                      {currentExercise.question.toLowerCase().includes('décroissant')
                        ? '⬆️ Le plus GRAND en haut, le plus petit en bas ⬇️'
                        : '⬆️ Le plus PETIT en haut, le plus grand en bas ⬇️'
                      }
                    </span>
                  </p>
                  <Reorder.Group
                    axis="y"
                    values={orderedItems}
                    onReorder={setOrderedItems}
                    className="space-y-2"
                  >
                    {orderedItems.map((item) => (
                      <Reorder.Item
                        key={item}
                        value={item}
                        className="bg-muted/50 border border-muted rounded-xl p-4 cursor-grab active:cursor-grabbing flex items-center gap-3"
                      >
                        <GripVertical className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">{item}</span>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                </div>
              )}

              {(currentExercise.type === 'numeric' || currentExercise.type === 'text') && (
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && userAnswer && submitAnswer()}
                  placeholder="Ta réponse..."
                  className="w-full px-4 py-4 text-xl border-2 border-muted rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-center"
                  autoFocus
                />
              )}

              <button
                onClick={submitAnswer}
                disabled={
                  (currentExercise.type === 'qcm' && !selectedChoice) ||
                  ((currentExercise.type === 'numeric' || currentExercise.type === 'text') && !userAnswer)
                }
                className="w-full bg-primary hover:bg-primary/80 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2"
              >
                Valider <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </motion.div>
      </div>

      <AITutorDialog
        isOpen={showAIHelp}
        onClose={() => {
          setShowAIHelp(false);
          clearMessage();
        }}
        message={aiMessage}
        isLoading={isAILoading}
        title="Explication de l'IA 🧠"
      />
    </div>
  );
};

export default RevisionQuiz;
