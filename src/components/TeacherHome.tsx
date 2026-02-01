import React from 'react';
import { BookOpen, Star, Calculator, FileText, BarChart3, Globe, HelpCircle, Trophy } from 'lucide-react';
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
  const cards = [
    {
      id: 'calcul',
      title: 'Calcul',
      subtitle: 'Entraînement calcul mental 🚀',
      icon: Calculator,
      gradient: 'from-sky-blue to-primary',
      onClick: onSelectCalcul,
    },
    {
      id: 'revisions',
      title: 'Révisions',
      subtitle: 'Parcourir les thématiques 📚',
      icon: BookOpen,
      gradient: 'from-secondary to-mint-green',
      onClick: onSelectRevisions,
    },
    {
      id: 'problemes',
      title: 'Problèmes',
      subtitle: 'Exercices individuels 🧩',
      icon: HelpCircle,
      gradient: 'from-warning to-accent',
      onClick: onSelectProblemes,
    },
    {
      id: 'sujets',
      title: 'Sujets',
      subtitle: '50 examens types 📝',
      icon: FileText,
      gradient: 'from-accent to-coral-orange',
      onClick: onSelectSujets,
    },
    {
      id: 'monde',
      title: 'Le monde',
      subtitle: 'Questions du jour 🌍',
      icon: Globe,
      gradient: 'from-turquoise to-secondary',
      onClick: onSelectMonde,
    },
    {
      id: 'dashboard',
      title: 'Tableau de bord',
      subtitle: 'Suivi des élèves 📊',
      icon: BarChart3,
      gradient: 'from-violet-purple to-primary',
      onClick: onSelectDashboard,
    },
  ];

  return (
    <div className="min-h-screen gradient-bg flex flex-col relative overflow-hidden">
      {/* Decorative shapes */}
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
            className="text-center mb-10"
          >
            <div className="flex justify-center items-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-warning" />
              </motion.div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground">
                Mode <span className="gradient-text">Enseignant</span> 👨‍🏫
              </h1>
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Star className="w-10 h-10 sm:w-12 sm:h-12 text-warning" fill="currentColor" />
              </motion.div>
            </div>
            <p className="text-xl sm:text-2xl text-muted-foreground">
              Bienvenue <span className="font-bold text-primary">{username}</span> ! ✨
            </p>
          </motion.div>

          {/* Six grands boutons colorés */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-8">
            {cards.map((card, index) => (
              <motion.button
                key={card.id}
                onClick={card.onClick}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                whileHover={{ scale: 1.03, y: -8 }}
                whileTap={{ scale: 0.98 }}
                className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 text-foreground shadow-kid group kid-card bg-gradient-to-br ${card.gradient}`}
              >
                {/* Étoile décorative */}
                <motion.div
                  className="absolute top-3 right-3"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.15 }}
                >
                  <Star className="w-6 h-6 text-warning" fill="currentColor" />
                </motion.div>
                
                {/* Effet de brillance */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="icon-circle">
                    <card.icon className="w-10 h-10 sm:w-12 sm:h-12 text-muted" />
                  </div>
                  <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-primary-foreground">{card.title}</h2>
                    <p className="text-sm sm:text-base text-primary-foreground/80">{card.subtitle}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
