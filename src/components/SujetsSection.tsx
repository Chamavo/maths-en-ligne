import React, { useState } from 'react';
import { Clock, Trophy, CheckCircle, Play, FileText, Star, Lock, PenLine } from 'lucide-react';
import { motion } from 'framer-motion';
import { examSubjects, getExamSubjectById, getCompletedSubjectsCount, TOTAL_EXAM_SUBJECTS } from '@/data/examSubjects';
import ExamRunner from './ExamRunner';
import AppHeader from './AppHeader';

interface SujetsSectionProps {
  username: string;
  onBack: () => void;
  onLogout: () => void;
}

interface CompletedExam {
  subjectId: number;
  score: number;
  noteOn20: number;
  completedAt: string;
}

const SujetsSection: React.FC<SujetsSectionProps> = ({
  username,
  onBack,
  onLogout,
}) => {
  const [activeExamId, setActiveExamId] = useState<number | null>(null);
  const [completedExams, setCompletedExams] = useState<CompletedExam[]>(() => {
    const saved = localStorage.getItem(`exams_${username}`);
    return saved ? JSON.parse(saved) : [];
  });

  const completedSubjectsCount = getCompletedSubjectsCount();

  const isSubjectAvailable = (id: number) => {
    const subject = getExamSubjectById(id);
    return subject && !subject.questions[0].enonce.includes('Bientôt disponible');
  };

  const getCompletedExam = (subjectId: number) => {
    return completedExams.find(e => e.subjectId === subjectId);
  };

  const handleSelectSubject = (subjectId: number) => {
    if (!isSubjectAvailable(subjectId)) {
      return; // Ne rien faire si le sujet n'est pas disponible
    }
    setActiveExamId(subjectId);
  };

  const handleExamComplete = (score: number, totalPoints: number, noteOn20: number) => {
    if (activeExamId) {
      const newCompleted: CompletedExam = {
        subjectId: activeExamId,
        score,
        noteOn20,
        completedAt: new Date().toISOString(),
      };
      
      const updatedExams = [...completedExams.filter(e => e.subjectId !== activeExamId), newCompleted];
      setCompletedExams(updatedExams);
      localStorage.setItem(`exams_${username}`, JSON.stringify(updatedExams));
    }
    setActiveExamId(null);
  };

  // Si un examen est en cours, afficher ExamRunner
  if (activeExamId) {
    const subject = getExamSubjectById(activeExamId);
    if (subject) {
      return (
        <ExamRunner
          subject={subject}
          username={username}
          onBack={() => setActiveExamId(null)}
          onComplete={handleExamComplete}
          onLogout={onLogout}
        />
      );
    }
  }

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <AppHeader
        title="📝 Sujets d'Examen"
        subtitle={`${completedSubjectsCount} sujets disponibles sur ${TOTAL_EXAM_SUBJECTS}`}
        showBack
        showHome
        showLogout
        onBack={onBack}
        onHome={onBack}
        onLogout={onLogout}
      />
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-6xl mx-auto">
          {/* Rappel stylo et papier - texte agrandi et plus visible */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950/50 dark:to-orange-950/50 border-2 border-amber-300 dark:border-amber-700 rounded-2xl p-5 mb-6 flex items-center gap-4 shadow-lg"
          >
            <div className="bg-amber-200 dark:bg-amber-800 p-4 rounded-xl">
              <PenLine className="w-10 h-10 text-amber-700 dark:text-amber-300" />
            </div>
            <p className="text-xl md:text-2xl font-bold text-amber-800 dark:text-amber-200">
              Prépare-toi ! ✏️ Utilise ton stylo et du papier pour poser tes calculs
            </p>
          </motion.div>

          {/* Info box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-xl p-6 mb-8 text-white"
          >
            <div className="flex items-center gap-4">
              <Clock className="w-12 h-12" />
              <div>
                <h3 className="text-2xl font-bold">50 minutes par sujet</h3>
                <p className="text-orange-100">
                  Comme un vrai examen : pas de pause, pas de correction en cours de route !
                </p>
              </div>
            </div>
          </motion.div>

        {/* Grille des 50 sujets */}
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
          {Array.from({ length: TOTAL_EXAM_SUBJECTS }, (_, i) => i + 1).map((subjectId, index) => {
            const isAvailable = isSubjectAvailable(subjectId);
            const completed = getCompletedExam(subjectId);
            
            return (
              <motion.button
                key={subjectId}
                onClick={() => handleSelectSubject(subjectId)}
                disabled={!isAvailable}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                whileHover={isAvailable ? { scale: 1.1 } : {}}
                whileTap={isAvailable ? { scale: 0.95 } : {}}
                className={`relative aspect-square rounded-xl shadow-lg flex flex-col items-center justify-center font-bold transition-all ${
                  completed
                    ? 'bg-gradient-to-br from-emerald-500 to-green-700 text-white ring-2 ring-emerald-300 ring-offset-1'
                    : isAvailable
                    ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white hover:from-orange-500 hover:to-orange-700 cursor-pointer'
                    : 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-500 cursor-not-allowed opacity-50'
                }`}
              >
                {completed ? (
                  <div className="flex flex-col items-center">
                    <CheckCircle className="w-4 h-4 mb-0.5" />
                    <span className="text-lg font-extrabold">{completed.noteOn20}</span>
                    <span className="text-[10px] opacity-80">/20</span>
                  </div>
                ) : isAvailable ? (
                  <>
                    <Play className="w-5 h-5 mb-1" />
                    <span className="text-sm">{subjectId}</span>
                  </>
                ) : (
                  <span className="text-sm">{subjectId}</span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Statistiques */}
        {completedExams.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-card rounded-2xl shadow-xl p-6"
          >
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              📊 Tes résultats
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-muted/30 rounded-xl p-4">
                <p className="text-3xl font-bold text-orange-500">{completedExams.length}</p>
                <p className="text-muted-foreground">Sujets terminés</p>
              </div>
              <div className="bg-muted/30 rounded-xl p-4">
                <p className="text-3xl font-bold text-green-500">
                  {(completedExams.reduce((acc, e) => acc + e.noteOn20, 0) / completedExams.length).toFixed(1)}
                </p>
                <p className="text-muted-foreground">Moyenne /20</p>
              </div>
              <div className="bg-muted/30 rounded-xl p-4">
                <p className="text-3xl font-bold text-blue-500">
                  {Math.max(...completedExams.map(e => e.noteOn20))}
                </p>
                <p className="text-muted-foreground">Meilleure note</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Légende et instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-card rounded-2xl shadow-xl p-6"
        >
          <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
            💡 Comment ça marche ?
          </h3>
          <ul className="text-muted-foreground space-y-2">
            <li className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-500" />
              Chaque sujet contient 5 exercices de 10 points (total : 50 points)
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              Tu as exactement 50 minutes pour tout résoudre
            </li>
            <li className="flex items-center gap-2">
              <Star className="w-5 h-5 text-orange-500" />
              Ta note finale est convertie sur 20 (ex: 45/50 = 18/20)
            </li>
            <li className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-orange-500" />
              Aucune correction pendant l'examen, uniquement à la fin !
            </li>
          </ul>

          {/* Légende des couleurs */}
          <div className="mt-4 pt-4 border-t border-muted flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-orange-400 to-orange-600" />
              <span className="text-sm text-muted-foreground">Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-emerald-500 to-green-700 ring-2 ring-emerald-300" />
              <span className="text-sm text-muted-foreground">Terminé (note affichée)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-gray-300 to-gray-400 opacity-50" />
              <span className="text-sm text-muted-foreground">Bientôt disponible</span>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SujetsSection;
