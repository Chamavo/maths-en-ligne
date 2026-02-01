import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Clock, Target, Award, Calendar } from 'lucide-react';

interface DashboardKPIsProps {
  totalStudents: number;
  avgLevel: number | string;
  totalAttempts: number;
  totalTimeSpent: number;
  weeklyActiveStudents: number;
  globalProgressPercent: number;
}

const DashboardKPIs: React.FC<DashboardKPIsProps> = ({
  totalStudents,
  avgLevel,
  totalAttempts,
  totalTimeSpent,
  weeklyActiveStudents,
  globalProgressPercent,
}) => {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h${mins.toString().padStart(2, '0')}`;
  };

  const kpis = [
    {
      label: 'Élèves inscrits',
      value: totalStudents,
      icon: Users,
      gradient: 'from-blue-400 to-blue-600',
      textColor: 'text-blue-600',
      bgLight: 'bg-blue-50',
    },
    {
      label: 'Niveau moyen',
      value: avgLevel,
      icon: TrendingUp,
      gradient: 'from-green-400 to-green-600',
      textColor: 'text-green-600',
      bgLight: 'bg-green-50',
    },
    {
      label: 'Temps total',
      value: formatTime(totalTimeSpent),
      icon: Clock,
      gradient: 'from-purple-400 to-purple-600',
      textColor: 'text-purple-600',
      bgLight: 'bg-purple-50',
    },
    {
      label: 'Tentatives',
      value: totalAttempts,
      icon: Target,
      gradient: 'from-orange-400 to-orange-600',
      textColor: 'text-orange-600',
      bgLight: 'bg-orange-50',
    },
    {
      label: 'Actifs cette semaine',
      value: weeklyActiveStudents,
      icon: Calendar,
      gradient: 'from-cyan-400 to-cyan-600',
      textColor: 'text-cyan-600',
      bgLight: 'bg-cyan-50',
    },
    {
      label: 'Progression globale',
      value: `${globalProgressPercent}%`,
      icon: Award,
      gradient: 'from-pink-400 to-pink-600',
      textColor: 'text-pink-600',
      bgLight: 'bg-pink-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {kpis.map((kpi, index) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`${kpi.bgLight} rounded-2xl p-4 relative overflow-hidden group hover:shadow-lg transition-shadow`}
        >
          {/* Gradient accent */}
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${kpi.gradient}`} />
          
          <div className="flex items-start justify-between mb-2">
            <div className={`p-2 rounded-xl bg-gradient-to-br ${kpi.gradient}`}>
              <kpi.icon className="w-5 h-5 text-white" />
            </div>
          </div>
          
          <div className={`text-2xl font-bold ${kpi.textColor} mb-1`}>
            {kpi.value}
          </div>
          <div className="text-sm text-muted-foreground">
            {kpi.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardKPIs;
