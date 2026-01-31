import React, { useState, useEffect } from 'react';
import { Brain, Trophy, Clock, Target, ChevronRight, CheckCircle, XCircle, RotateCcw, Users, Star, AlertCircle, Lock, LogOut, Bot } from 'lucide-react';
import { generateLevelExercises, Exercise, getLevelInfo, ALL_LEVELS, getNextLevel } from '@/utils/exerciseGenerator';
import { TEACHER_PASSWORD_CONST, STUDENT_PASSWORD_CONST } from '@/hooks/useTeacherAuth';
import { parseFraction, formatAnswer, isFractionQuestion, isInputFractionFormat, isFractionOperationQuestion } from '@/utils/fractionUtils';
import { validateFractionAnswer } from '@/utils/fractionValidation';
import { formatAsFraction } from '@/data/fractionLevels';
import FractionInput from '@/components/FractionInput';
import TeacherDashboard from '@/components/TeacherDashboard';
import AppHeader from '@/components/AppHeader';
import { saveStudentAttempt, getCategoryFromType } from '@/types/studentProgress';
import { useQuestionHistory } from '@/hooks/useQuestionHistory';
import { useEvaluation } from '@/hooks/useEvaluation';
import { useAITutor } from '@/hooks/useAITutor';
import AITutorDialog from '@/components/AITutorDialog';
import { supabase } from '@/integrations/supabase/client';
import confetti from 'canvas-confetti';
import { 
  getBlockingInfo, 
  recordLevelFailure, 
  recordLevelSuccess, 
  isLevelBlocked,
  getBlockedLevel,
  markLevelStarted,
  markLevelCompleted,
  recordLevelAbandon,
  checkAndRecordAbandon,
  LevelBlockInfo
} from '@/utils/levelBlockingSystem';

// Fonction pour lancer les confettis simples
const triggerConfetti = () => {
  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#9b87f5', '#7E69AB', '#6E59A5', '#22c55e', '#eab308']
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#9b87f5', '#7E69AB', '#6E59A5', '#22c55e', '#eab308']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  confetti({
    particleCount: 100,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#9b87f5', '#7E69AB', '#6E59A5', '#22c55e', '#eab308']
  });

  frame();
};

// Fonction pour lancer une pluie de confettis intense avec fanfare
const triggerFanfareConfetti = () => {
  const duration = 5000;
  const end = Date.now() + duration;

  // Confetti massif initial
  confetti({
    particleCount: 200,
    spread: 180,
    origin: { y: 0.5 },
    colors: ['#FFD700', '#FFA500', '#FF6347', '#9b87f5', '#22c55e']
  });

  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 70,
      origin: { x: 0 },
      colors: ['#FFD700', '#FFA500', '#FF6347', '#9b87f5', '#22c55e']
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 70,
      origin: { x: 1 },
      colors: ['#FFD700', '#FFA500', '#FF6347', '#9b87f5', '#22c55e']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};

// Fonction pour jouer la fanfare (son plus élaboré)
const playFanfare = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // Séquence de notes pour une fanfare
  const notes = [
    { freq: 523.25, time: 0, duration: 0.15 },     // C5
    { freq: 659.25, time: 0.15, duration: 0.15 },  // E5
    { freq: 783.99, time: 0.30, duration: 0.15 },  // G5
    { freq: 1046.50, time: 0.45, duration: 0.30 }, // C6
    { freq: 783.99, time: 0.75, duration: 0.15 },  // G5
    { freq: 1046.50, time: 0.90, duration: 0.50 }, // C6 (tenue)
  ];

  notes.forEach(({ freq, time, duration }) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = freq;
    oscillator.type = 'triangle';
    
    const startTime = audioContext.currentTime + time;
    gainNode.gain.setValueAtTime(0.3, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  });
};

// Nombre max d'erreurs autorisées pour passer au niveau suivant
const MAX_ERRORS_ALLOWED = 2;

// Niveaux qui exigent un score parfait (aucune erreur permise)
const PERFECT_SCORE_LEVELS = [6.5, 10.5, 20];

// Niveaux qui autorisent 1 erreur max (niveaux 1-5, 5.5 + niveau 8)
const ONE_ERROR_LEVELS = [1, 2, 3, 4, 5, 5.5, 8];

// Niveaux qui autorisent 2 erreurs max
const TWO_ERROR_LEVELS = [8.5];

// Fonction pour obtenir le nombre max d'erreurs selon le niveau
const getMaxErrorsForLevel = (level: number): number => {
  if (level === 0) return 999; // Évaluation: pas de limite d'erreurs
  if (PERFECT_SCORE_LEVELS.includes(level)) return 0;
  if (ONE_ERROR_LEVELS.includes(level)) return 1;
  if (TWO_ERROR_LEVELS.includes(level)) return 2;
  return MAX_ERRORS_ALLOWED;
};

// Fonction pour jouer le son de trompette victorieuse (question 20)
const playVictoryTrumpet = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  const notes = [
    { freq: 392.00, time: 0, duration: 0.2 },      // G4
    { freq: 523.25, time: 0.2, duration: 0.2 },    // C5
    { freq: 659.25, time: 0.4, duration: 0.2 },    // E5
    { freq: 783.99, time: 0.6, duration: 0.3 },    // G5
    { freq: 1046.50, time: 0.9, duration: 0.6 },   // C6 (tenue finale)
  ];

  notes.forEach(({ freq, time, duration }) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = freq;
    oscillator.type = 'sawtooth';
    
    const startTime = audioContext.currentTime + time;
    gainNode.gain.setValueAtTime(0.2, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  });
};

// Alias pour la compatibilité
const playVictorySound = playVictoryTrumpet;

interface ExerciseResult {
  exerciseId: string;
  question: string;
  userAnswer: number | null;
  correctAnswer: number | string;
  correct: boolean;
  timeSpent: number;
  category: string;
}

interface Session {
  username: string;
  level: number;
  isTeacher?: boolean;
}

interface ProgressionSectionProps {
  session: Session;
  onBack: () => void;
  onLogout: () => void;
  onUpdateSession: (session: Session) => void;
}

const ProgressionSection: React.FC<ProgressionSectionProps> = ({
  session,
  onBack,
  onLogout,
  onUpdateSession,
}) => {
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [results, setResults] = useState<ExerciseResult[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [sessionStartTime, setSessionStartTime] = useState<number>(0);
  const [isTestMode, setIsTestMode] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [, setForceUpdate] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState<Set<string>>(new Set());
  const [failedExercises, setFailedExercises] = useState<Exercise[]>([]);
  const [showTeacherDashboard, setShowTeacherDashboard] = useState(false);
  const [supabaseUserId, setSupabaseUserId] = useState<string | null>(null);
  const [evaluationStatus, setEvaluationStatus] = useState<{
    canTake: boolean;
    daysRemaining: number;
    lastNote: number | null;
  }>({ canTake: true, daysRemaining: 0, lastNote: null });
  const [isInEvaluation, setIsInEvaluation] = useState(false);
  const [blockingInfo, setBlockingInfo] = useState<LevelBlockInfo | null>(null);
  const [questionErrorCount, setQuestionErrorCount] = useState<Map<string, number>>(new Map());
  const [showAIHelp, setShowAIHelp] = useState(false);
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState<Exercise | null>(null);
  const [currentUserAnswerForAI, setCurrentUserAnswerForAI] = useState<string | number | null>(null);
  
  const { canTakeEvaluation, saveEvaluation } = useEvaluation();
  const { askForHelp, isLoading: isAILoading, aiMessage, clearMessage } = useAITutor();

  // Charger les infos de blocage au démarrage + vérifier les abandons
  useEffect(() => {
    if (session && !session.isTeacher) {
      // Vérifier si un niveau a été abandonné (et le compter comme tentative)
      const updatedInfo = checkAndRecordAbandon(session.username);
      setBlockingInfo(updatedInfo);
    }
  }, [session]);
  const { getLastAttemptQuestions, saveAttemptQuestions, cleanupOldHistory } = useQuestionHistory();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: authSession } }) => {
      if (authSession?.user) {
        setSupabaseUserId(authSession.user.id);
        checkEvaluationStatus(authSession.user.id);
      }
    });
  }, []);

  const checkEvaluationStatus = async (userId: string) => {
    const status = await canTakeEvaluation(userId);
    setEvaluationStatus({
      canTake: status.canTake,
      daysRemaining: status.daysRemaining,
      lastNote: status.lastEvaluation?.noteSur20 || null,
    });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTestMode) {
      interval = setInterval(() => {
        setForceUpdate(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTestMode]);

  const startLevel = async (level: number) => {
    if (level === 0) {
      setIsInEvaluation(true);
    }
    
    // Marquer le niveau comme en cours (pour détecter les abandons)
    if (session && !session.isTeacher && level !== 0) {
      markLevelStarted(session.username, level);
    }
    
    setCurrentLevel(level);
    const newUsedQuestions = new Set<string>();
    
    // POUR TOUS LES NIVEAUX: récupérer les questions du dernier essai pour les exclure
    let excludeQuestions = new Set<string>();
    if (supabaseUserId && level !== 0) {
      excludeQuestions = await getLastAttemptQuestions(supabaseUserId, level);
      console.log(`Niveau ${level}: ${excludeQuestions.size} questions exclues du dernier essai`);
    }
    
    const newExercises = generateLevelExercises(level, newUsedQuestions, failedExercises, excludeQuestions);
    setExercises(newExercises);
    setUsedQuestions(newUsedQuestions);
    setCurrentExerciseIndex(0);
    setResults([]);
    setUserAnswer('');
    setSelectedChoice(null);
    setStartTime(Date.now());
    setSessionStartTime(Date.now());
    setIsTestMode(true);
    setShowResult(false);
    setFailedExercises([]);
  };

  const submitAnswer = () => {
    const currentExercise = exercises[currentExerciseIndex];
    let parsedAnswer: number | null = null;
    let needsSimplification = false;
    let simplifiedForm = '';
    
    if (currentExercise.isQCM && selectedChoice !== null) {
      parsedAnswer = selectedChoice;
    } else if (userAnswer !== '') {
      // Vérifier si c'est une question de fraction qui nécessite une réponse simplifiée
      const isFractionOp = isFractionOperationQuestion(currentExercise.question);
      
      if (isFractionOp && !isInputFractionFormat(userAnswer)) {
        return;
      }
      
      // Pour les questions de fractions, valider que la réponse est simplifiée
      if (isFractionOp && isInputFractionFormat(userAnswer)) {
        const correctAnswerNum = typeof currentExercise.answer === 'string' 
          ? parseFraction(currentExercise.answer) || 0
          : currentExercise.answer;
        
        const validation = validateFractionAnswer(userAnswer, correctAnswerNum, true);
        parsedAnswer = validation.userValue;
        needsSimplification = validation.needsSimplification;
        simplifiedForm = validation.simplifiedForm;
        
        // Si la valeur est correcte mais non simplifiée, c'est une erreur
        if (needsSimplification) {
          // La réponse sera considérée comme incorrecte, on met à jour le hint
          currentExercise.hint = `Ta réponse ${userAnswer} est correcte mais pas simplifiée. La forme simplifiée est ${simplifiedForm}`;
        }
      } else {
        parsedAnswer = parseFraction(userAnswer);
      }
    }
    
    if (parsedAnswer === null) return;
    
    const correctAnswerNum = typeof currentExercise.answer === 'string' 
      ? parseFraction(currentExercise.answer) || 0
      : currentExercise.answer;
    
    // La réponse est incorrecte si la valeur ne correspond pas OU si elle n'est pas simplifiée
    const valueCorrect = Math.abs(parsedAnswer - correctAnswerNum) < 0.01;
    const correct = valueCorrect && !needsSimplification;
    const timeSpent = Date.now() - startTime;

    const newResult: ExerciseResult = {
      exerciseId: currentExercise.id,
      question: currentExercise.question,
      userAnswer: parsedAnswer,
      correctAnswer: currentExercise.answer,
      correct,
      timeSpent,
      category: currentExercise.category,
    };

    setResults([...results, newResult]);
    
    if (!correct) {
      setFailedExercises(prev => [...prev, currentExercise]);
      
      // Track error count for AI help
      const questionKey = currentExercise.question;
      const currentErrorCount = (questionErrorCount.get(questionKey) || 0) + 1;
      const newErrorMap = new Map(questionErrorCount);
      newErrorMap.set(questionKey, currentErrorCount);
      setQuestionErrorCount(newErrorMap);
      
      // Save info for potential AI help
      setCurrentQuestionForAI(currentExercise);
      setCurrentUserAnswerForAI(parsedAnswer);
    }

    setLastAnswerCorrect(correct);
    setShowResult(true);

    const errorDelay = currentLevel === 6.5 ? 10000 : 5000; // More time for reading + AI help
    const delay = correct ? 1000 : errorDelay;
    
    setTimeout(() => {
      if (currentExerciseIndex < exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setUserAnswer('');
        setSelectedChoice(null);
        setStartTime(Date.now());
        setShowResult(false);
      } else {
        finishLevel();
      }
    }, delay);
  };

  const finishLevel = async () => {
    const correctCount = results.filter(r => r.correct).length + (lastAnswerCorrect ? 1 : 0);
    const totalQuestions = exercises.length;
    const errorCount = totalQuestions - correctCount;
    const maxErrors = getMaxErrorsForLevel(currentLevel);
    const passed = errorCount <= maxErrors;
    const totalTimeSpent = Math.floor((Date.now() - sessionStartTime) / 1000);

    const allResults = [...results];
    if (results.length < exercises.length) {
      const lastExercise = exercises[currentExerciseIndex];
      allResults.push({
        exerciseId: lastExercise.id,
        question: lastExercise.question,
        userAnswer: null,
        correctAnswer: lastExercise.answer,
        correct: lastAnswerCorrect,
        timeSpent: Date.now() - startTime,
        category: lastExercise.category,
      });
    }

    if (currentLevel === 0 && supabaseUserId && session) {
      const errors = allResults
        .filter(r => !r.correct)
        .map(r => ({
          question: r.question,
          userAnswer: r.userAnswer !== null ? String(r.userAnswer) : null,
          correctAnswer: String(r.correctAnswer),
          category: r.category,
        }));

      await saveEvaluation(
        supabaseUserId,
        session.username,
        correctCount,
        totalQuestions,
        totalTimeSpent,
        errors
      );

      setEvaluationStatus({
        canTake: false,
        daysRemaining: 7,
        lastNote: Math.round((correctCount / totalQuestions) * 20 * 10) / 10,
      });
      
      setIsInEvaluation(false);
    }

    if (session && !session.isTeacher) {
      saveStudentAttempt(
        session.username,
        currentLevel,
        allResults.map(r => ({
          correct: r.correct,
          category: r.category,
          timeSpent: r.timeSpent,
        }))
      );
    }

    // POUR TOUS LES NIVEAUX: sauvegarder l'historique des questions (éviter répétition)
    if (supabaseUserId && currentLevel !== 0) {
      const questionEnonces = exercises.map(e => e.question);
      await saveAttemptQuestions(supabaseUserId, currentLevel, questionEnonces);
      await cleanupOldHistory(supabaseUserId, currentLevel);
    }

    // Marquer le niveau comme terminé (plus en cours)
    if (session && !session.isTeacher && currentLevel !== 0) {
      markLevelCompleted(session.username, currentLevel);
    }

    // Gérer le système de blocage après échecs
    if (session && !session.isTeacher && currentLevel !== 0) {
      if (passed) {
        // Succès : enregistrer et supprimer les infos de blocage
        recordLevelSuccess(session.username, currentLevel);
        setBlockingInfo(null);
        
        const nextLevel = getNextLevel(currentLevel);
        const currentLevelIndex = ALL_LEVELS.indexOf(session.level);
        const nextLevelIndex = ALL_LEVELS.indexOf(nextLevel);
        
        if (nextLevelIndex > currentLevelIndex || session.level === currentLevel) {
          const updatedSession = { ...session, level: nextLevel };
          onUpdateSession(updatedSession);
        }
        
        // Système de célébrations visuelles
        const fanfareLevels = [5, 10, 15, 20];
        
        if (fanfareLevels.includes(currentLevel)) {
          triggerFanfareConfetti();
          playFanfare();
        } else {
          triggerConfetti();
        }
        
        if (currentLevel === 20) {
          setTimeout(() => playVictoryTrumpet(), 1500);
        }
      } else {
        // Échec : enregistrer et vérifier si blocage
        const newBlockingInfo = recordLevelFailure(session.username, currentLevel);
        setBlockingInfo(newBlockingInfo);
      }
    }

    setIsTestMode(false);
  };

  const isLevelUnlocked = (level: number): boolean => {
    if (!session) return false;
    if (session.isTeacher) return true;
    if (level === 0) return true;
    
    // Vérifier si le niveau est bloqué après 3 échecs
    if (blockingInfo && blockingInfo.isBlocked && blockingInfo.level === level) {
      return false;
    }
    
    const sessionLevelIndex = ALL_LEVELS.indexOf(session.level);
    const levelIndex = ALL_LEVELS.indexOf(level);
    return levelIndex <= sessionLevelIndex;
  };
  
  // Vérifier si le niveau est bloqué (différent de non déverrouillé)
  const isLevelBlockedByFailures = (level: number): boolean => {
    if (!session || session.isTeacher) return false;
    return blockingInfo !== null && blockingInfo.isBlocked && blockingInfo.level === level;
  };

  const levelInfo = getLevelInfo(currentLevel);

  // Écran de résultats
  if (!isTestMode && results.length > 0) {
    const correctCount = results.filter(r => r.correct).length;
    const totalQuestions = results.length;
    const errorCount = totalQuestions - correctCount;
    const totalTime = results.reduce((sum, r) => sum + r.timeSpent, 0) / 1000;
    const maxErrors = getMaxErrorsForLevel(currentLevel);
    const passed = errorCount <= maxErrors;
    const nextLevel = getNextLevel(currentLevel);

    return (
      <div className="min-h-screen gradient-bg p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              {passed ? (
                <div className="relative">
                  <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-4 animate-bounce" />
                  <div className="absolute -top-2 -right-2 left-0 right-0 flex justify-center">
                    <span className="text-4xl animate-pulse">⭐</span>
                  </div>
                </div>
              ) : (
                <XCircle className="w-24 h-24 text-destructive mx-auto mb-4" />
              )}
              <h2 className="text-4xl font-bold text-foreground mb-2">
                {levelInfo.isEvaluation 
                  ? `📊 Note : ${Math.round((correctCount / totalQuestions) * 20)}/20`
                  : passed 
                    ? (currentLevel === 20 ? '🏆 CHAMPION ! Tu as terminé le parcours ! 🏆' : '🎉 Niveau réussi ! Bravo ! 🎊')
                    : '💪 Continue, tu vas y arriver !'}
              </h2>
              {passed && !levelInfo.isEvaluation && (
                <div className="flex justify-center gap-2 my-3">
                  {Array.from({ length: Math.min(correctCount, 5) }).map((_, i) => (
                    <span key={i} className="text-2xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>🌟</span>
                  ))}
                </div>
              )}
              <p className="text-xl text-muted-foreground">
                {levelInfo.name} - {correctCount}/{totalQuestions} réponses correctes
              </p>
              <p className="text-lg text-muted-foreground mt-2">
                ⏱️ Temps total : {Math.floor(totalTime / 60)}:{String(Math.floor(totalTime % 60)).padStart(2, '0')}
              </p>
              {/* Message de motivation gamifié */}
              {passed && correctCount === totalQuestions && (
                <div className="mt-4 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl p-4 border-2 border-yellow-400">
                  <span className="text-xl font-bold text-amber-700">🔥 PARFAIT ! Score de 100% ! 🔥</span>
                </div>
              )}
              {!passed && blockingInfo && blockingInfo.failCount === 2 && (
                <div className="mt-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl p-4 border-2 border-orange-400">
                  <span className="text-lg font-bold text-orange-700">⚠️ Attention ! Dernière tentative avant blocage !</span>
                </div>
              )}
            </div>

            {/* Afficher les stats seulement si ce n'est pas l'Évaluation */}
            {!levelInfo.isEvaluation ? (
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-green-500/10 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-green-600">{correctCount}</div>
                  <div className="text-muted-foreground">Correctes</div>
                </div>
                <div className="bg-destructive/10 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-destructive">{errorCount}</div>
                  <div className="text-muted-foreground">Erreurs</div>
                </div>
              </div>
            ) : (
              <div className="bg-primary/10 rounded-lg p-6 text-center mb-8">
                <div className="text-4xl font-bold text-primary">{correctCount}/{totalQuestions}</div>
                <div className="text-muted-foreground">Réponses correctes</div>
              </div>
            )}

            <div className="space-y-3">
              {levelInfo.isEvaluation ? (
                <>
                  <p className="text-center text-muted-foreground mb-4">
                    Prochaine évaluation disponible dans 7 jours
                  </p>
                  <button
                    onClick={() => { setResults([]); setIsTestMode(false); }}
                    className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-semibold py-4 rounded-lg transition duration-200"
                  >
                    Continuer vers les niveaux
                  </button>
                </>
              ) : (
                <>
                  {passed && nextLevel !== currentLevel && (
                    <button
                      onClick={() => startLevel(nextLevel)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                    >
                      Niveau suivant <ChevronRight />
                    </button>
                  )}
                  
                  {/* Message de blocage après 3 échecs */}
                  {!passed && blockingInfo && blockingInfo.isBlocked && blockingInfo.level === currentLevel && (
                    <div className="bg-destructive/10 border-2 border-destructive/30 rounded-xl p-6 mb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Lock className="w-8 h-8 text-destructive" />
                        <h3 className="text-xl font-bold text-destructive">Niveau bloqué ! 🔒</h3>
                      </div>
                      <p className="text-foreground mb-4">
                        Tu as été éjecté du niveau {currentLevel} car tu ne maîtrises pas encore les calculs.
                      </p>
                      <p className="text-muted-foreground">
                        👉 <strong>Va t'entraîner dans la rubrique Révisions</strong>, choisis les notions qui te donnent du mal et entraîne-toi : 
                        <span className="font-bold text-primary"> tu dois avoir 10 réponses justes d'affilée</span> pour que le niveau {currentLevel} de la Progression se débloque.
                      </p>
                    </div>
                  )}
                  
                  {/* N'afficher "Recommencer" que si le niveau n'est pas bloqué */}
                  {!passed && !(blockingInfo && blockingInfo.isBlocked && blockingInfo.level === currentLevel) && (
                    <button
                      onClick={() => startLevel(currentLevel)}
                      className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-semibold py-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-5 h-5" /> Recommencer ce niveau
                    </button>
                  )}
                  
                  {passed && (
                    <button
                      onClick={() => startLevel(currentLevel)}
                      className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-semibold py-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-5 h-5" /> Recommencer ce niveau
                    </button>
                  )}
                  
                  <button
                    onClick={() => { setResults([]); setIsTestMode(false); }}
                    className="w-full bg-muted hover:bg-muted/80 text-foreground font-semibold py-4 rounded-lg transition duration-200"
                  >
                    Retour au menu
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Écran d'exercice
  if (isTestMode && exercises.length > 0) {
    const currentExercise = exercises[currentExerciseIndex];
    const progress = ((currentExerciseIndex + 1) / exercises.length) * 100;
    const elapsedTime = Math.floor((Date.now() - sessionStartTime) / 1000);
    const remainingTime = Math.max(0, levelInfo.timeSeconds - elapsedTime);
    const currentErrors = results.filter(r => !r.correct).length;
    const isTimeUp = remainingTime === 0;

    if (isTimeUp && isTestMode) {
      finishLevel();
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-primary" />
                <span className="font-bold text-xl">{levelInfo.name}</span>
                {levelInfo.isSpecial && <Star className="w-5 h-5 text-yellow-500" />}
                {levelInfo.allowWrittenCalc && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    📝 Calculs posés autorisés
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
              {/* Masquer le compteur d'erreurs pour l'Évaluation (niveau 0) */}
              {currentLevel !== 0 && (
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                    currentErrors > getMaxErrorsForLevel(currentLevel) ? 'bg-destructive/20 text-destructive' : 
                    currentErrors > 0 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                  }`}>
                    <XCircle className="w-4 h-4" />
                    <span className="font-bold">{currentErrors}/{getMaxErrorsForLevel(currentLevel)} err</span>
                  </div>
              )}
                <div className={`flex items-center gap-2 ${
                  remainingTime < 60 ? 'text-destructive' : remainingTime < 180 ? 'text-orange-600' : 'text-muted-foreground'
                }`}>
                  <Clock className="w-5 h-5" />
                  <span className="text-lg font-mono font-bold">
                    {Math.floor(remainingTime / 60)}:{String(remainingTime % 60).padStart(2, '0')}
                  </span>
                </div>
                {/* Bouton Quitter masqué pendant le jeu - l'abandon involontaire = échec automatique */}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Question {currentExerciseIndex + 1} / {exercises.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 mb-6">
              <h3 className={`font-bold text-center text-foreground mb-6 ${
                currentExercise.question.length > 80 
                  ? 'text-lg leading-relaxed' 
                  : currentExercise.question.length > 40 
                    ? 'text-xl' 
                    : 'text-3xl'
              }`}>
                {currentExercise.question}
              </h3>

              {showResult && (
                <div className={`text-center mb-4 p-4 rounded-lg ${
                  lastAnswerCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {lastAnswerCorrect ? '✓ Correct !' : (
                    <div className="space-y-3">
                      <div className="font-bold text-lg">
                        ✗ Réponse correcte : {
                          currentExercise.category === 'fraction' || 
                          currentExercise.category === 'partage' ||
                          isFractionOperationQuestion(currentExercise.question)
                            ? formatAsFraction(typeof currentExercise.answer === 'string' 
                                ? parseFraction(currentExercise.answer) || 0 
                                : currentExercise.answer)
                            : formatAnswer(currentExercise.answer)
                        }
                      </div>
                      {currentExercise.hint && (
                        <div className="text-sm opacity-80 bg-white/50 rounded px-3 py-2">
                          💡 <strong>Astuce :</strong> {currentExercise.hint}
                        </div>
                      )}
                      
                      {/* Bouton d'aide IA si 2+ erreurs sur cette question */}
                      {(questionErrorCount.get(currentExercise.question) || 0) >= 2 && (
                        <button
                          onClick={() => {
                            setShowAIHelp(true);
                            askForHelp({
                              type: 'math_help',
                              question: currentExercise.question,
                              correctAnswer: currentExercise.answer,
                              userAnswer: currentUserAnswerForAI || '',
                              astuce: currentExercise.hint,
                              failureCount: questionErrorCount.get(currentExercise.question) || 2,
                            });
                          }}
                          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all"
                        >
                          <Bot className="w-5 h-5" />
                          Besoin d'aide ? L'IA t'explique ! 🤖
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {!showResult && (
                <>
                  {currentExercise.isQCM && currentExercise.choices ? (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {currentExercise.choices.map((choice, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedChoice(choice)}
                          className={`p-4 rounded-xl text-xl font-bold transition-all ${
                            selectedChoice === choice
                              ? 'bg-primary text-primary-foreground scale-105'
                              : 'bg-card border-2 border-muted hover:border-primary'
                          }`}
                        >
                          {formatAsFraction(choice)}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <FractionInput
                      value={userAnswer}
                      onChange={setUserAnswer}
                      onSubmit={submitAnswer}
                      question={currentExercise.question}
                      category={currentExercise.category}
                    />
                  )}
                  <button
                    onClick={submitAnswer}
                    disabled={currentExercise.isQCM ? selectedChoice === null : userAnswer === ''}
                    className="w-full bg-primary hover:bg-primary/80 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground font-bold py-4 rounded-lg transition duration-200 text-xl mt-4"
                  >
                    Valider
                  </button>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground text-center">
              <div className="bg-muted rounded p-2">
                <div className="font-semibold">Catégorie</div>
                <div>{currentExercise.category}</div>
              </div>
              <div className="bg-muted rounded p-2">
                <div className="font-semibold">Niveau</div>
                <div>{levelInfo.name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Menu principal des niveaux
  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <AppHeader
        title={`🚀 Progression - ${session.username}`}
        subtitle={session.isTeacher 
          ? "Accès à tous les niveaux pour tester les exercices"
          : `Niveau débloqué : ${getLevelInfo(session.level).name}`
        }
        showBack
        showHome
        showLogout
        onBack={onBack}
        onHome={onBack}
        onLogout={onLogout}
      />
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-2xl shadow-2xl p-6 md:p-8 mb-6">
            {session.isTeacher && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setShowTeacherDashboard(true)}
                  className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-lg transition duration-200"
                >
                  <Users className="w-5 h-5" />
                  Dashboard élèves
                </button>
              </div>
            )}

            {/* Message d'encouragement ludique gamifié */}
            <div className="bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-100 rounded-2xl p-4 md:p-6 mb-8 border-2 border-yellow-300/50 shadow-lg">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <span className="text-3xl md:text-4xl animate-bounce">🎮</span>
                <div className="text-center">
                  <p className="text-lg md:text-xl font-bold text-orange-700">
                    {session.level <= 5 
                      ? '🚀 Commence ton aventure mathématique !' 
                      : session.level <= 10 
                        ? '⭐ Tu progresses super bien !'
                        : session.level <= 15
                          ? '🔥 Tu es en feu ! Continue comme ça !'
                          : '🏆 Tu approches du sommet !'}
                  </p>
                  <p className="text-base md:text-lg text-orange-600">
                    Niveau actuel : <span className="font-bold">{getLevelInfo(session.level).name}</span> 
                    {' '}• {ALL_LEVELS.indexOf(session.level)} / {ALL_LEVELS.length - 1} niveaux débloqués
                  </p>
                </div>
                <span className="text-3xl md:text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>🏆</span>
              </div>
              {/* Barre de progression globale */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-orange-700 mb-1">
                  <span>Progression globale</span>
                  <span>{Math.round((ALL_LEVELS.indexOf(session.level) / (ALL_LEVELS.length - 1)) * 100)}%</span>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-orange-400 to-pink-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.round((ALL_LEVELS.indexOf(session.level) / (ALL_LEVELS.length - 1)) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

          {/* Grille des niveaux */}
          <div className="space-y-4">
            {/* Niveau Évaluation (0) */}
            {evaluationStatus.canTake ? (
              <button
                onClick={() => startLevel(0)}
                className="w-full p-6 rounded-xl font-bold text-lg transition-all duration-200 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:scale-[1.02]"
              >
                <div className="flex flex-col items-center gap-2">
                  <span>📊 Évaluation</span>
                  <span className="text-sm">Test de niveau - 20 questions - 30 min - Libre d'accès</span>
                </div>
              </button>
            ) : (
              <div className="w-full p-6 rounded-xl font-bold text-lg bg-gradient-to-r from-gray-400 to-gray-500 text-white opacity-80">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>📊 Évaluation</span>
                  </div>
                  <span className="text-sm">
                    {evaluationStatus.lastNote !== null && `Dernière note : ${evaluationStatus.lastNote}/20 • `}
                    Disponible dans {evaluationStatus.daysRemaining} jour{evaluationStatus.daysRemaining > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            )}

            {/* Niveaux 1-5 */}
            <div className="grid grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((level) => {
                const unlocked = isLevelUnlocked(level);
                const isCurrent = session.level === level;
                const isOneErrorLevel = ONE_ERROR_LEVELS.includes(level);

                return (
                  <button
                    key={level}
                    onClick={() => unlocked && startLevel(level)}
                    disabled={!unlocked}
                    className={`p-4 rounded-xl font-bold text-xl transition-all duration-200 ${
                      !unlocked 
                        ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                        : isCurrent
                        ? 'bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg transform hover:scale-105'
                        : 'bg-gradient-to-br from-primary/80 to-secondary/80 text-primary-foreground hover:shadow-lg hover:scale-105'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {isCurrent && <Trophy className="w-5 h-5" />}
                      <span>N{level}</span>
                      <span className="text-xs">15q • 8min</span>
                      {!unlocked && <span className="text-xs">🔒</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Niveau Fondamentaux (5.5) - après niveau 5 */}
            {(() => {
              const level = 5.5;
              const unlocked = isLevelUnlocked(level);
              const isCurrent = session.level === level;

              return (
                <button
                  key={level}
                  onClick={() => unlocked && startLevel(level)}
                  disabled={!unlocked}
                  className={`w-full p-4 rounded-xl font-bold transition-all duration-200 ${
                    !unlocked 
                      ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                      : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:scale-[1.02]'
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <Star className="w-5 h-5" />
                    <span>📐 Fondamentaux (Fractions = Décimaux = %) - 15 questions - 15 min - 1 erreur autorisée</span>
                    {!unlocked && <span>🔒</span>}
                  </div>
                </button>
              );
            })()}

            {/* Niveau 6 */}
            <div className="grid grid-cols-1 gap-3">
              {(() => {
                const level = 6;
                const unlocked = isLevelUnlocked(level);
                const isCurrent = session.level === level;

                return (
                  <button
                    key={level}
                    onClick={() => unlocked && startLevel(level)}
                    disabled={!unlocked}
                    className={`p-4 rounded-xl font-bold text-xl transition-all duration-200 ${
                      !unlocked 
                        ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                        : isCurrent
                        ? 'bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg transform hover:scale-105'
                        : 'bg-gradient-to-br from-primary/80 to-secondary/80 text-primary-foreground hover:shadow-lg hover:scale-105'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {isCurrent && <Trophy className="w-5 h-5" />}
                      <span>Niveau 6</span>
                      {!unlocked && <span className="text-xs">🔒</span>}
                    </div>
                  </button>
                );
              })()}
            </div>

            {/* Niveau Fractions 1 (6.5) - après niveau 6 - 20 questions, 15 min */}
            {(() => {
              const level = 6.5;
              const unlocked = isLevelUnlocked(level);
              const isCurrent = session.level === level;
              const isBlocked = isLevelBlockedByFailures(level);

              return (
                <button
                  key={level}
                  onClick={() => unlocked && !isBlocked && startLevel(level)}
                  disabled={!unlocked || isBlocked}
                  className={`w-full p-4 rounded-xl font-bold transition-all duration-200 ${
                    isBlocked
                      ? 'bg-destructive/20 text-destructive border-2 border-destructive/50 cursor-not-allowed'
                      : !unlocked 
                      ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                      : 'bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:shadow-lg hover:scale-[1.02]'
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <Star className="w-5 h-5" />
                    <span>⭐ Fractions 1 (QCM) • 20 questions • 15 min • Score parfait requis</span>
                    {isBlocked && <Lock className="w-5 h-5" />}
                    {!unlocked && !isBlocked && <span>🔒</span>}
                  </div>
                </button>
              );
            })()}

            {/* Niveaux 7-8 */}
            <div className="grid grid-cols-2 gap-3">
              {[7, 8].map((level) => {
                const unlocked = isLevelUnlocked(level);
                const isCurrent = session.level === level;

                return (
                  <button
                    key={level}
                    onClick={() => unlocked && startLevel(level)}
                    disabled={!unlocked}
                    className={`p-4 rounded-xl font-bold text-xl transition-all duration-200 ${
                      !unlocked 
                        ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                        : isCurrent
                        ? 'bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg transform hover:scale-105'
                        : 'bg-gradient-to-br from-primary/80 to-secondary/80 text-primary-foreground hover:shadow-lg hover:scale-105'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {isCurrent && <Trophy className="w-5 h-5" />}
                      <span>N{level}</span>
                      {!unlocked && <span className="text-xs">🔒</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Niveau Opérations (8.5) - après niveau 8 */}
            {(() => {
              const level = 8.5;
              const unlocked = isLevelUnlocked(level);
              const isCurrent = session.level === level;

              return (
                <button
                  key={level}
                  onClick={() => unlocked && startLevel(level)}
                  disabled={!unlocked}
                  className={`w-full p-4 rounded-xl font-bold transition-all duration-200 ${
                    !unlocked 
                      ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:scale-[1.02]'
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <Star className="w-5 h-5" />
                    <span>🔢 Opérations (20 questions - 15 min - 2 erreurs autorisées)</span>
                    {!unlocked && <span>🔒</span>}
                  </div>
                </button>
              );
            })()}

            {/* Niveaux 9-10 */}
            <div className="grid grid-cols-2 gap-3">
              {[9, 10].map((level) => {
                const unlocked = isLevelUnlocked(level);
                const isCurrent = session.level === level;

                return (
                  <button
                    key={level}
                    onClick={() => unlocked && startLevel(level)}
                    disabled={!unlocked}
                    className={`p-4 rounded-xl font-bold text-xl transition-all duration-200 ${
                      !unlocked 
                        ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                        : isCurrent
                        ? 'bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg transform hover:scale-105'
                        : 'bg-gradient-to-br from-primary/80 to-secondary/80 text-primary-foreground hover:shadow-lg hover:scale-105'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {isCurrent && <Trophy className="w-5 h-5" />}
                      <span>N{level}</span>
                      {!unlocked && <span className="text-xs">🔒</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Niveau Fractions 2 (10.5) - après niveau 10 - 20 questions, 15 min */}
            {(() => {
              const level = 10.5;
              const unlocked = isLevelUnlocked(level);
              const isBlocked = isLevelBlockedByFailures(level);

              return (
                <button
                  key={level}
                  onClick={() => unlocked && !isBlocked && startLevel(level)}
                  disabled={!unlocked || isBlocked}
                  className={`w-full p-4 rounded-xl font-bold transition-all duration-200 ${
                    isBlocked
                      ? 'bg-destructive/20 text-destructive border-2 border-destructive/50 cursor-not-allowed'
                      : !unlocked 
                      ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                      : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-lg hover:scale-[1.02]'
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <Star className="w-5 h-5" />
                    <span>⭐ Fractions 2 (Réponses en fraction) • 20 questions • 15 min • Score parfait requis</span>
                    {isBlocked && <Lock className="w-5 h-5" />}
                    {!unlocked && !isBlocked && <span>🔒</span>}
                  </div>
                </button>
              );
            })()}

            {/* Niveaux 11-20 */}
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3">
              {[11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((level) => {
                const unlocked = isLevelUnlocked(level);
                const isCurrent = session.level === level;
                const isPerfectLevel = level === 20;

                return (
                  <button
                    key={level}
                    onClick={() => unlocked && startLevel(level)}
                    disabled={!unlocked}
                    className={`p-4 rounded-xl font-bold text-xl transition-all duration-200 ${
                      !unlocked 
                        ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                        : isCurrent
                        ? 'bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg transform hover:scale-105'
                        : isPerfectLevel
                        ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white hover:shadow-lg hover:scale-105'
                        : 'bg-gradient-to-br from-primary/80 to-secondary/80 text-primary-foreground hover:shadow-lg hover:scale-105'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {isCurrent && <Trophy className="w-5 h-5" />}
                      <span>N{level}</span>
                      {isPerfectLevel && <span className="text-xs">⚡20/20</span>}
                      {!unlocked && <span className="text-xs">🔒</span>}
                    </div>
                  </button>
                );
              })}
            </div>
            
          </div>
        </div>

        </div>
      </div>
      
      <TeacherDashboard 
        isOpen={showTeacherDashboard} 
        onClose={() => setShowTeacherDashboard(false)} 
      />
      
      <AITutorDialog
        isOpen={showAIHelp}
        onClose={() => {
          setShowAIHelp(false);
          clearMessage();
        }}
        message={aiMessage}
        isLoading={isAILoading}
        title="Ton tuteur t'explique 🧠"
      />
    </div>
  );
};

export default ProgressionSection;
