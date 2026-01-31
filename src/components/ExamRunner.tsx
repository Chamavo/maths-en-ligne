import React, { useState, useEffect, useCallback } from 'react';
import { Clock, CheckCircle, AlertCircle, Send, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ExamSubject, ExamQuestion, convertScoreTo20 } from '@/data/examSubjects';
import BackToMenuButton from './BackToMenuButton';

interface ExamRunnerProps {
  subject: ExamSubject;
  username: string;
  onBack: () => void;
  onComplete: (score: number, totalPoints: number, noteOn20: number) => void;
  onLogout: () => void;
}

interface UserAnswer {
  questionId: number;
  answers: string[];
}

const ExamRunner: React.FC<ExamRunnerProps> = ({
  subject,
  username,
  onBack,
  onComplete,
  onLogout,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [currentInputs, setCurrentInputs] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(subject.duration * 60); // en secondes
  const [isFinished, setIsFinished] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = subject.questions[currentQuestionIndex];

  // Timer
  useEffect(() => {
    if (isFinished) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished]);

  // Initialiser les inputs pour la question actuelle
  useEffect(() => {
    const existingAnswer = userAnswers.find(a => a.questionId === currentQuestion.id);
    if (existingAnswer) {
      setCurrentInputs(existingAnswer.answers);
    } else {
      setCurrentInputs(new Array(currentQuestion.reponses.length).fill(''));
    }
  }, [currentQuestionIndex, currentQuestion]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...currentInputs];
    newInputs[index] = value;
    setCurrentInputs(newInputs);
  };

  const saveCurrentAnswer = useCallback(() => {
    setUserAnswers(prev => {
      const existing = prev.findIndex(a => a.questionId === currentQuestion.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { questionId: currentQuestion.id, answers: currentInputs };
        return updated;
      }
      return [...prev, { questionId: currentQuestion.id, answers: currentInputs }];
    });
  }, [currentQuestion.id, currentInputs]);

  const handleNextQuestion = () => {
    saveCurrentAnswer();
    if (currentQuestionIndex < subject.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    saveCurrentAnswer();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleFinishExam = () => {
    saveCurrentAnswer();
    setIsFinished(true);
    calculateScore();
    setShowResults(true);
  };

  const calculateScore = () => {
    let totalScore = 0;
    
    subject.questions.forEach(question => {
      const userAnswer = userAnswers.find(a => a.questionId === question.id);
      if (!userAnswer) return;

      let questionScore = 0;
      const pointsPerAnswer = 10 / question.reponses.length;

      question.reponses.forEach((rep, idx) => {
        const userVal = userAnswer.answers[idx]?.trim().toLowerCase() || '';
        const correctVal = String(rep.reponse).toLowerCase();
        
        // Comparaison flexible (nombres ou texte)
        const userNum = parseFloat(userVal.replace(',', '.').replace(/\s/g, ''));
        const correctNum = parseFloat(correctVal.replace(',', '.').replace(/\s/g, ''));
        
        if (!isNaN(userNum) && !isNaN(correctNum)) {
          if (Math.abs(userNum - correctNum) < 0.01) {
            questionScore += pointsPerAnswer;
          }
        } else if (userVal === correctVal) {
          questionScore += pointsPerAnswer;
        }
      });

      totalScore += Math.round(questionScore * 10) / 10;
    });

    setScore(totalScore);
  };

  const handleCompleteAndExit = () => {
    const noteOn20 = convertScoreTo20(score);
    onComplete(score, 50, noteOn20);
  };

  if (showResults) {
    const noteOn20 = convertScoreTo20(score);
    const timeSpent = subject.duration * 60 - timeRemaining;
    const minsSpent = Math.floor(timeSpent / 60);
    
    return (
      <div className="min-h-screen gradient-bg p-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-3xl shadow-2xl p-8"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="text-8xl mb-4"
              >
                {noteOn20 >= 16 ? '🏆' : noteOn20 >= 12 ? '⭐' : noteOn20 >= 10 ? '👍' : '📚'}
              </motion.div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Examen terminé !
              </h1>
              <p className="text-xl text-muted-foreground">
                Bravo {username} pour avoir complété le {subject.title} !
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-6 text-white text-center">
                <p className="text-lg opacity-80">Score</p>
                <p className="text-5xl font-bold">{score}/50</p>
              </div>
              <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-6 text-white text-center">
                <p className="text-lg opacity-80">Note</p>
                <p className="text-5xl font-bold">{noteOn20}/20</p>
              </div>
            </div>

            <div className="text-center text-muted-foreground mb-8">
              <Clock className="inline-block w-5 h-5 mr-2" />
              Temps utilisé : {minsSpent} minutes
            </div>

            {/* Récapitulatif des réponses */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-bold text-foreground">📋 Correction</h3>
              {subject.questions.map((question, qIdx) => {
                const userAnswer = userAnswers.find(a => a.questionId === question.id);
                return (
                  <div key={question.id} className="bg-muted/30 rounded-xl p-4">
                    <p className="font-semibold text-foreground mb-2">
                      Exercice {qIdx + 1} ({question.theme})
                    </p>
                    <div className="space-y-2">
                      {question.reponses.map((rep, rIdx) => {
                        const userVal = userAnswer?.answers[rIdx] || '-';
                        const isCorrect = String(rep.reponse).toLowerCase() === userVal.trim().toLowerCase() ||
                          Math.abs(parseFloat(String(rep.reponse)) - parseFloat(userVal.replace(',', '.'))) < 0.01;
                        
                        return (
                          <div key={rIdx} className="flex items-center gap-2 text-sm">
                            {isCorrect ? (
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                            )}
                            <span className="text-muted-foreground">{rep.question}:</span>
                            <span className={isCorrect ? 'text-green-600 font-medium' : 'text-red-600'}>
                              {userVal}
                            </span>
                            {!isCorrect && (
                              <span className="text-green-600 font-medium">
                                → {rep.reponse} {rep.unite || ''}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              onClick={handleCompleteAndExit}
              className="w-full py-6 text-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            >
              Retour aux sujets
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header avec timer */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BackToMenuButton onClick={onBack} variant="icon" />
            <motion.button
              onClick={onLogout}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-card p-3 rounded-full shadow-lg"
              title="Déconnexion"
            >
              <LogOut className="w-6 h-6 text-muted-foreground" />
            </motion.button>
          </div>

          <h1 className="text-2xl font-bold text-foreground">
            {subject.title} - Exercice {currentQuestionIndex + 1}/5
          </h1>

          <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg ${
            timeRemaining < 300 ? 'bg-red-500 text-white animate-pulse' : 'bg-card text-foreground'
          }`}>
            <Clock className="w-5 h-5" />
            {formatTime(timeRemaining)}
          </div>
        </div>

        {/* Navigation rapide */}
        <div className="flex justify-center gap-2 mb-6">
          {subject.questions.map((_, idx) => {
            const hasAnswer = userAnswers.some(a => a.questionId === subject.questions[idx].id);
            return (
              <button
                key={idx}
                onClick={() => {
                  saveCurrentAnswer();
                  setCurrentQuestionIndex(idx);
                }}
                className={`w-10 h-10 rounded-full font-bold transition-all ${
                  idx === currentQuestionIndex
                    ? 'bg-orange-500 text-white scale-110'
                    : hasAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-card text-foreground'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Question actuelle */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-card rounded-3xl shadow-2xl p-8"
          >
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                {currentQuestion.theme.charAt(0).toUpperCase() + currentQuestion.theme.slice(1)} - 10 points
              </span>
            </div>

            <p className="text-lg text-foreground mb-4 leading-relaxed">
              {currentQuestion.enonce}
            </p>

            {currentQuestion.sousQuestions && (
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-1">
                {currentQuestion.sousQuestions.map((sq, idx) => (
                  <li key={idx}>{sq}</li>
                ))}
              </ul>
            )}

            {/* Champs de réponse */}
            <div className="space-y-4">
              {currentQuestion.reponses.map((rep, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <label className="text-foreground font-medium min-w-[150px]">
                    {rep.question} {rep.unite && `(${rep.unite})`}:
                  </label>
                  <Input
                    type="text"
                    value={currentInputs[idx] || ''}
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                    className="flex-1"
                    placeholder="Ta réponse..."
                  />
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                variant="outline"
                className="px-6"
              >
                ← Précédent
              </Button>

              {currentQuestionIndex < subject.questions.length - 1 ? (
                <Button
                  onClick={handleNextQuestion}
                  className="px-6 bg-orange-500 hover:bg-orange-600"
                >
                  Suivant →
                </Button>
              ) : (
                <Button
                  onClick={handleFinishExam}
                  className="px-6 bg-green-500 hover:bg-green-600"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Terminer l'examen
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExamRunner;
