import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, BookOpen, FileText, Globe, CheckCircle, Target, Award, Clock } from 'lucide-react';

interface ModuleStats {
  calcul: {
    avgLevel: number;
    maxLevel: number;
    totalAttempts: number;
    completionRate: number;
  };
  revision: {
    categoriesMastered: number;
    totalCategories: number;
    avgBestScore: number;
  };
  sujets: {
    subjectsCompleted: number;
    totalSubjects: number;
    avgNote: number;
    bestNote: number;
  };
  monde: {
    totalResponses: number;
    activeParticipants: number;
    avgStreak: number;
  };
}

interface DashboardModuleStatsProps {
  stats: ModuleStats;
}

const DashboardModuleStats: React.FC<DashboardModuleStatsProps> = ({ stats }) => {
  const modules = [
    {
      name: 'Calcul',
      icon: Calculator,
      gradient: 'from-blue-400 to-blue-600',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-700',
      stats: [
        { label: 'Niveau moyen', value: stats.calcul.avgLevel.toFixed(1) },
        { label: 'Niveau max atteint', value: stats.calcul.maxLevel },
        { label: 'Tentatives', value: stats.calcul.totalAttempts },
        { label: 'Taux complétion', value: `${stats.calcul.completionRate}%` },
      ],
    },
    {
      name: 'Révisions',
      icon: BookOpen,
      gradient: 'from-green-400 to-green-600',
      bgLight: 'bg-green-50',
      textColor: 'text-green-700',
      stats: [
        { label: 'Catégories maîtrisées', value: `${stats.revision.categoriesMastered}/${stats.revision.totalCategories}` },
        { label: 'Score moyen', value: `${stats.revision.avgBestScore}/50` },
      ],
    },
    {
      name: 'Sujets',
      icon: FileText,
      gradient: 'from-orange-400 to-orange-600',
      bgLight: 'bg-orange-50',
      textColor: 'text-orange-700',
      stats: [
        { label: 'Sujets complétés', value: `${stats.sujets.subjectsCompleted}/${stats.sujets.totalSubjects}` },
        { label: 'Moyenne générale', value: `${stats.sujets.avgNote.toFixed(1)}/20` },
        { label: 'Meilleure note', value: `${stats.sujets.bestNote}/20` },
      ],
    },
    {
      name: 'Le Monde',
      icon: Globe,
      gradient: 'from-teal-400 to-teal-600',
      bgLight: 'bg-teal-50',
      textColor: 'text-teal-700',
      stats: [
        { label: 'Réponses totales', value: stats.monde.totalResponses },
        { label: 'Participants actifs', value: stats.monde.activeParticipants },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {modules.map((module, index) => (
        <motion.div
          key={module.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`${module.bgLight} rounded-2xl p-5 border border-transparent hover:border-opacity-50 transition-all hover:shadow-lg`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-xl bg-gradient-to-br ${module.gradient}`}>
              <module.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className={`font-bold text-lg ${module.textColor}`}>{module.name}</h3>
          </div>
          
          <div className="space-y-3">
            {module.stats.map((stat, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <span className={`font-bold ${module.textColor}`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardModuleStats;
