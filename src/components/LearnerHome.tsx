import React from 'react';
import { BookOpen, Star, FileText, Calculator, Globe, HelpCircle, Trophy, PenLine, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import AppHeader from './AppHeader';
import mercedesF1 from '@/assets/mercedes-f1.png';

interface LearnerHomeProps {
  username: string;
  onSelectCalcul: () => void;
  onSelectRevisions: () => void;
  onSelectSujets: () => void;
  onSelectProblemes: () => void;
  onSelectMonde: () => void;
  onSelectPourcentages: () => void;
  onSelectProblemesLogique: () => void;
  onLogout: () => void;
}

const LearnerHome: React.FC<LearnerHomeProps> = ({
  username,
  onSelectCalcul,
  onSelectRevisions,
  onSelectSujets,
  onSelectProblemes,
  onSelectMonde,
  onSelectPourcentages,
  onSelectProblemesLogique,
  onLogout,
}) => {
  const cards = [
    {
      id: 'calcul',
      title: 'Calcul Rapide',
      subtitle: 'Calcul mental 🧠',
      emoji: '🚀',
      icon: Calculator,
      gradient: 'from-sky-blue to-primary',
      shadowColor: 'shadow-glow-blue',
      onClick: onSelectCalcul,
    },
    {
      id: 'revisions',
      title: 'Révisions',
      subtitle: '6 thématiques 📚',
      emoji: '📖',
      icon: BookOpen,
      gradient: 'from-secondary to-mint-green',
      shadowColor: 'shadow-glow-green',
      onClick: onSelectRevisions,
    },
    {
      id: 'problemes',
      title: 'Problèmes',
      subtitle: 'Exercices guidés 🧩',
      emoji: '🎯',
      icon: HelpCircle,
      gradient: 'from-accent to-coral-orange',
      shadowColor: 'shadow-glow-orange',
      onClick: onSelectProblemes,
    },
    {
      id: 'sujets',
      title: 'Sujets',
      subtitle: '50 examens types 📝',
      emoji: '📋',
      icon: FileText,
      gradient: 'from-violet-purple to-primary',
      shadowColor: 'shadow-glow-violet',
      onClick: onSelectSujets,
    },
  ];

  return (
    <div className="min-h-screen gradient-bg flex flex-col relative overflow-hidden">
      {/* Decorative shapes like Kumon */}
      <div className="kumon-shape kumon-shape-1" />
      <div className="kumon-shape kumon-shape-2" />
      <div className="kumon-shape kumon-shape-3" />

      <AppHeader
        showLogout
        showHome={false}
        onLogout={onLogout}
        variant="transparent"
        username={username}
      />
      
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center relative z-10">
        <div className="max-w-5xl w-full mx-auto">
          {/* Header avec animation */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="flex justify-center items-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Trophy className="w-10 h-10 sm:w-14 sm:h-14 text-warning drop-shadow-lg" />
              </motion.div>
              <div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground">
                  Salut <span className="gradient-text">{username}</span> ! 👋
                </h1>
              </div>
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Star className="w-10 h-10 sm:w-14 sm:h-14 text-warning drop-shadow-lg" fill="currentColor" />
              </motion.div>
            </div>
            <p className="text-lg sm:text-2xl text-muted-foreground">
              Bienvenue sur <span className="font-bold text-primary">Maths en ligne</span> ! ✨
            </p>
          </motion.div>

          {/* Bannière "Comprendre le monde" - CTA principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <motion.button
              onClick={onSelectMonde}
              className="w-full relative overflow-hidden rounded-3xl p-5 sm:p-6 kid-card bg-gradient-to-r from-warning via-accent to-warning"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Étoile décorative */}
              <motion.div 
                className="absolute top-3 right-3"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="w-8 h-8 text-foreground/80" fill="currentColor" />
              </motion.div>

              {/* Effet de brillance */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              
              <div className="relative z-10 flex items-center justify-center gap-4 sm:gap-6">
                <div className="icon-circle">
                  <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-warning" />
                </div>
                <div className="text-left flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl sm:text-2xl font-bold text-warning-foreground">🌟 Commence ta journée ici !</span>
                  </div>
                  <p className="text-sm sm:text-base text-warning-foreground/90">
                    Réponds à la question du jour sur le monde qui t'entoure 🌍
                  </p>
                </div>
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-3xl text-warning-foreground hidden sm:block"
                >
                  →
                </motion.div>
              </div>
            </motion.button>
          </motion.div>

          {/* Bandeau Spécial Pourcentages - Circuit F1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-4"
          >
            <motion.button
              onClick={onSelectPourcentages}
              className="w-full relative overflow-hidden rounded-3xl p-5 sm:p-6 kid-card bg-gradient-to-r from-card via-muted to-card border-2 border-secondary/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Effet de brillance racing */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              />
              
              {/* Ligne de course décorative */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-destructive via-secondary to-destructive" />
              
              <div className="relative z-10 flex items-center justify-between gap-4 sm:gap-6">
                <div className="flex items-center gap-4 flex-1">
                  <div className="icon-circle bg-secondary/20 border-secondary/50">
                    <span className="text-2xl sm:text-3xl">🏎️</span>
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl sm:text-2xl font-bold text-foreground">Spécial Pourcentages : le circuit</span>
                      <span className="text-lg">🏁</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm sm:text-base text-secondary">
                      <PenLine className="w-4 h-4" />
                      <span>Tu peux poser les opérations avec un stylo</span>
                    </div>
                  </div>
                </div>
                
                {/* Image Mercedes F1 */}
                <motion.div
                  className="hidden sm:block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img 
                    src={mercedesF1} 
                    alt="Mercedes F1" 
                    className="h-16 sm:h-20 object-contain drop-shadow-lg"
                  />
                </motion.div>
              </div>
            </motion.button>
          </motion.div>

          {/* Bandeau Problèmes sans calcul - Réflexion logique */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <motion.button
              onClick={onSelectProblemesLogique}
              className="w-full relative overflow-hidden rounded-3xl p-5 sm:p-6 kid-card bg-gradient-to-r from-warning/20 via-warning/30 to-warning/20 border-2 border-warning/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Effet de brillance pensée */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-warning/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
              />
              
              {/* Ligne décorative supérieure */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-warning via-warning/70 to-warning" />
              
              <div className="relative z-10 flex items-center justify-between gap-4 sm:gap-6">
                <div className="flex items-center gap-4 flex-1">
                  <div className="icon-circle bg-warning/30 border-warning/50">
                    <Lightbulb className="w-7 h-7 sm:w-8 sm:h-8 text-warning" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl sm:text-2xl font-bold text-foreground">Je résous des problèmes sans calcul</span>
                      <span className="text-lg">🧩</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
                      <span>Réfléchis, observe, déduis... pas besoin de calculer !</span>
                    </div>
                  </div>
                </div>
                
                {/* Emoji penseur */}
                <motion.div
                  className="hidden sm:flex items-center gap-1"
                  animate={{ 
                    y: [0, -3, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-4xl">🤔</span>
                  <motion.span 
                    className="text-2xl"
                    animate={{ 
                      opacity: [0.5, 1, 0.5],
                      scale: [0.9, 1.1, 0.9]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    💡
                  </motion.span>
                </motion.div>
              </div>
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {cards.map((card, index) => (
              <motion.button
                key={card.id}
                onClick={card.onClick}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                }}
                whileTap={{ scale: 0.98 }}
                className={`relative overflow-hidden rounded-3xl p-5 sm:p-6 text-foreground shadow-kid group kid-card bg-gradient-to-br ${card.gradient}`}
              >
                {/* Étoile en haut à droite */}
                <motion.div
                  className="absolute top-2 right-2 sm:top-3 sm:right-3"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-warning" fill="currentColor" />
                </motion.div>
                
                {/* Effet de brillance au survol */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4">
                  {/* Icône dans cercle */}
                  <div className="icon-circle">
                    <card.icon className="w-8 h-8 sm:w-10 sm:h-10 text-muted" />
                  </div>
                  
                  <div className="text-center">
                    <h2 className="text-lg sm:text-xl font-bold mb-1 text-primary-foreground">{card.title}</h2>
                    <p className="text-xs sm:text-sm text-primary-foreground/80">{card.subtitle}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Message d'encouragement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glass-card p-6 sm:p-8 text-center"
          >
            <div className="flex justify-center gap-2 text-2xl sm:text-3xl mb-3">
              <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }}>🧠</motion.span>
              <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}>✨</motion.span>
              <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}>🎯</motion.span>
              <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}>⭐</motion.span>
              <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}>🏅</motion.span>
            </div>
            <p className="text-base sm:text-lg text-foreground/90 font-medium">
              Les maths, c'est comme un muscle : plus tu t'entraînes, plus tu deviens fort ! 💪
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LearnerHome;
