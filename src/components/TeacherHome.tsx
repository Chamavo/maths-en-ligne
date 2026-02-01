import React from 'react';
import { BookOpen, Sparkles, Star, Calculator, FileText, BarChart3, Globe, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import AppHeader from './AppHeader';

interface TeacherHomeProps {
  username: string;
  onSelectCalcul: () => void;
  onSelectRevisions: () => void;
  onSelectSujets: () => void;
  onSelectProblemes: () => void;
  onSelectMonde: () => void;
  onSelectDashboard: () => void;
  onLogout: () => void;
}

const TeacherHome: React.FC<TeacherHomeProps> = ({
  username,
  onSelectCalcul,
  onSelectRevisions,
  onSelectSujets,
  onSelectProblemes,
  onSelectMonde,
  onSelectDashboard,
  onLogout,
}) => {
  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <AppHeader
        showLogout
        showHome={false}
        onLogout={onLogout}
        variant="transparent"
      />
      
      <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center">
        <div className="max-w-5xl w-full mx-auto">
          {/* Header avec animation */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="flex justify-center items-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" />
              </motion.div>
              <h1 className="text-3xl sm:text-5xl font-bold text-foreground">
                Mode Enseignant 👨‍🏫
              </h1>
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Star className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" />
              </motion.div>
            </div>
            <p className="text-xl sm:text-2xl text-muted-foreground">
              Bienvenue <span className="font-bold text-primary">{username}</span> !
            </p>
          </motion.div>

        {/* Six grands boutons colorés */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Bouton Calcul - Bleu */}
          <motion.button
            onClick={onSelectCalcul}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-xl group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <motion.div
              animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-3 right-3"
            >
              <Star className="w-6 h-6 text-yellow-300" fill="currentColor" />
            </motion.div>
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="bg-white/20 p-4 rounded-full">
                <Calculator className="w-12 h-12" />
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">Calcul</h2>
                <p className="text-base text-blue-100">
                  Entrainement au calcul mental 🚀
                </p>
              </div>
            </div>
          </motion.button>

          {/* Bouton Révision - Vert */}
          <motion.button
            onClick={onSelectRevisions}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-3xl p-8 text-white shadow-xl group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <motion.div
              animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="absolute top-3 left-3"
            >
              <Star className="w-6 h-6 text-yellow-300" fill="currentColor" />
            </motion.div>
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="bg-white/20 p-4 rounded-full">
                <BookOpen className="w-12 h-12" />
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">Révision</h2>
                <p className="text-base text-green-100">
                  Parcourir les thématiques 📚
                </p>
              </div>
            </div>
          </motion.button>

          {/* Bouton Problèmes - Jaune/Orange vif */}
          <motion.button
            onClick={onSelectProblemes}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(245, 158, 11, 0.5)" }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-3xl p-8 text-white shadow-xl group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <motion.div
              animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              className="absolute top-3 right-3"
            >
              <Star className="w-6 h-6 text-yellow-200" fill="currentColor" />
            </motion.div>
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="bg-white/20 p-4 rounded-full">
                <HelpCircle className="w-12 h-12" />
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">Problèmes</h2>
                <p className="text-base text-amber-100">
                  Exercices individuels 🧩
                </p>
              </div>
            </div>
          </motion.button>

          {/* Bouton Sujets - Orange */}
          <motion.button
            onClick={onSelectSujets}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(249, 115, 22, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-3xl p-8 text-white shadow-xl group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <motion.div
              animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.75 }}
              className="absolute top-3 right-3"
            >
              <Star className="w-6 h-6 text-yellow-300" fill="currentColor" />
            </motion.div>
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="bg-white/20 p-4 rounded-full">
                <FileText className="w-12 h-12" />
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">Sujets</h2>
                <p className="text-base text-orange-100">
                  50 examens types 📝
                </p>
              </div>
            </div>
          </motion.button>

          {/* Bouton Comprendre le monde - Teal */}
          <motion.button
            onClick={onSelectMonde}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(20, 184, 166, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 rounded-3xl p-8 text-white shadow-xl group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <motion.div
              animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.85 }}
              className="absolute top-3 right-3"
            >
              <Star className="w-6 h-6 text-yellow-300" fill="currentColor" />
            </motion.div>
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="bg-white/20 p-4 rounded-full">
                <Globe className="w-12 h-12" />
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">Le monde</h2>
                <p className="text-base text-teal-100">
                  Questions du jour 🌍
                </p>
              </div>
            </div>
          </motion.button>

          {/* Bouton Tableau de bord - Violet */}
          <motion.button
            onClick={onSelectDashboard}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden bg-gradient-to-br from-violet-400 via-violet-500 to-violet-600 rounded-3xl p-8 text-white shadow-xl group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <motion.div
              animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
              className="absolute top-3 left-3"
            >
              <Star className="w-6 h-6 text-yellow-300" fill="currentColor" />
            </motion.div>
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="bg-white/20 p-4 rounded-full">
                <BarChart3 className="w-12 h-12" />
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">Tableau de bord</h2>
                <p className="text-base text-violet-100">
                  Suivi des élèves 📊
                </p>
              </div>
            </div>
          </motion.button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
