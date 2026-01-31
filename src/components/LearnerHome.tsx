import React from 'react';
import { BookOpen, Sparkles, Star, FileText, Calculator, Globe, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import AppHeader from './AppHeader';

interface LearnerHomeProps {
  username: string;
  onSelectCalcul: () => void;
  onSelectRevisions: () => void;
  onSelectSujets: () => void;
  onSelectProblemes: () => void;
  onSelectMonde: () => void;
  onLogout: () => void;
}

const LearnerHome: React.FC<LearnerHomeProps> = ({
  username,
  onSelectCalcul,
  onSelectRevisions,
  onSelectSujets,
  onSelectProblemes,
  onSelectMonde,
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
                <Sparkles className="w-12 h-12 text-yellow-300 drop-shadow-lg" />
              </motion.div>
              <h1 
                className="text-4xl sm:text-5xl font-bold text-yellow-300"
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
              >
                Salut {username} ! 👋
              </h1>
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Star className="w-12 h-12 text-yellow-300 drop-shadow-lg" />
              </motion.div>
            </div>
            <p className="text-xl sm:text-2xl text-white/90">
              Bienvenue sur <span className="font-bold text-yellow-300">Maths en ligne</span> ! 🏆
            </p>
          </motion.div>

        {/* Bannière d'incitation "Comprendre le monde" - TRÈS VISIBLE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <motion.button
            onClick={onSelectMonde}
            className="w-full relative overflow-hidden rounded-[20px] p-4 shadow-2xl"
            style={{ 
              background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
              boxShadow: '0 10px 30px rgba(251, 191, 36, 0.3)'
            }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Effet de brillance */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
            />
            
            <div className="relative z-10 flex items-center justify-center gap-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Globe className="w-10 h-10 text-[#1A2332]" />
              </motion.div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-[#1A2332]">🌟 Commence ta journée ici !</span>
                </div>
                <p className="text-sm text-[#1A2332]/80">
                  Réponds à la question du jour sur le monde qui t'entoure
                </p>
              </div>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <span className="text-2xl text-[#1A2332]">→</span>
              </motion.div>
            </div>
          </motion.button>
        </motion.div>

        {/* Quatre grands boutons colorés */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Bouton Calcul Rapide - Bleu électrique */}
          <motion.button
            onClick={onSelectCalcul}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -10, boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden rounded-3xl p-8 text-white shadow-xl group transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' }}
          >
            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            {/* Étoiles décoratives */}
            <motion.div
              animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-3 right-3"
            >
              <Star className="w-6 h-6 text-yellow-300 drop-shadow-md" fill="currentColor" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
            </motion.div>
            
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="bg-white/20 p-5 rounded-[20px]">
                <Calculator className="w-12 h-12" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-1 text-white">Calcul Rapide</h2>
                <p className="text-sm text-white/95">
                  Calcule de tête 🧠
                </p>
              </div>
            </div>
          </motion.button>

          {/* Bouton Révision - Vert émeraude */}
          <motion.button
            onClick={onSelectRevisions}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -10, boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden rounded-3xl p-8 text-white shadow-xl group transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}
          >
            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            {/* Étoiles décoratives */}
            <motion.div
              animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="absolute top-3 left-3"
            >
              <Star className="w-6 h-6 text-yellow-300 drop-shadow-md" fill="currentColor" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
            </motion.div>
            
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="bg-white/20 p-5 rounded-[20px]">
                <BookOpen className="w-12 h-12" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2 text-white">Révision</h2>
                <p className="text-sm text-white/95">
                  6 thématiques à maîtriser ! 📚
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
            whileHover={{ scale: 1.05, y: -10, boxShadow: "0 20px 50px rgba(245, 158, 11, 0.5)" }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden rounded-3xl p-8 text-white shadow-xl group transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #D97706 100%)' }}
          >
            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            {/* Étoiles décoratives */}
            <motion.div
              animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              className="absolute top-3 left-3"
            >
              <Star className="w-6 h-6 text-yellow-200 drop-shadow-md" fill="currentColor" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
            </motion.div>
            
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="bg-white/20 p-5 rounded-[20px]">
                <HelpCircle className="w-12 h-12" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2 text-white">Problèmes</h2>
                <p className="text-sm text-white/95">
                  Exercices individuels 🧩
                </p>
              </div>
            </div>
          </motion.button>

          {/* Bouton Sujets - Orange corail */}
          <motion.button
            onClick={onSelectSujets}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.05, y: -10, boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden rounded-3xl p-8 text-white shadow-xl group transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)' }}
          >
            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            {/* Étoiles décoratives */}
            <motion.div
              animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
              className="absolute top-3 right-3"
            >
              <Star className="w-6 h-6 text-yellow-300 drop-shadow-md" fill="currentColor" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
            </motion.div>
            
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="bg-white/20 p-5 rounded-[20px]">
                <FileText className="w-12 h-12" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2 text-white">Sujets</h2>
                <p className="text-sm text-white/95">
                  50 examens types ! 📝
                </p>
              </div>
            </div>
          </motion.button>

        </div>

          {/* Message d'encouragement - Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="rounded-[20px] p-8 text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex justify-center gap-2 text-3xl mb-3">
              🧠 ✨ 🎯 ⭐ 🏅
            </div>
            <p className="text-lg text-white/90">
              Les maths, c'est comme un muscle : plus tu t'entraînes, plus tu deviens fort !
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LearnerHome;
