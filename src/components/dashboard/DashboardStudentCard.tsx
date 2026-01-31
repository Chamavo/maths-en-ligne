import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, RotateCcw, Trash2, Target, Clock, AlertTriangle, CheckCircle, Award } from 'lucide-react';
import { StudentProgress, ErrorByCategory } from '@/types/studentProgress';
import { Button } from '@/components/ui/button';

interface DashboardStudentCardProps {
  student: StudentProgress;
  onReset: (username: string) => void;
  onDelete: (username: string) => void;
}

const categoryLabels: Record<keyof ErrorByCategory, string> = {
  fraction: 'Fractions',
  addition: 'Additions',
  soustraction: 'Soustractions',
  multiplication: 'Multiplications',
  division: 'Divisions',
  pourcentage: 'Pourcentages',
  geometrie: 'Géométrie',
  conversion: 'Conversions',
  vitesse: 'Vitesse/Distance',
  partage: 'Partages',
  temps: 'Temps',
  autre: 'Autres',
};

const categoryColors: Record<keyof ErrorByCategory, string> = {
  fraction: 'bg-red-500',
  addition: 'bg-blue-500',
  soustraction: 'bg-green-500',
  multiplication: 'bg-yellow-500',
  division: 'bg-purple-500',
  pourcentage: 'bg-pink-500',
  geometrie: 'bg-indigo-500',
  conversion: 'bg-orange-500',
  vitesse: 'bg-teal-500',
  partage: 'bg-cyan-500',
  temps: 'bg-amber-500',
  autre: 'bg-gray-500',
};

const DashboardStudentCard: React.FC<DashboardStudentCardProps> = ({
  student,
  onReset,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'reset' | 'delete' | null>(null);

  const getTotalErrors = () => 
    Object.values(student.errorStats).reduce((sum, count) => sum + count, 0);

  const getTopErrors = () => 
    Object.entries(student.errorStats)
      .filter(([_, count]) => count > 0)
      .sort(([_, a], [__, b]) => b - a)
      .slice(0, 3);

  const totalErrors = getTotalErrors();
  const topErrors = getTopErrors();
  const successRate = student.totalAttempts > 0 
    ? Math.round(((student.totalAttempts - totalErrors) / student.totalAttempts) * 100)
    : 0;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Jamais';
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const getLevelColor = (level: number) => {
    if (level >= 15) return 'text-green-600 bg-green-50';
    if (level >= 10) return 'text-blue-600 bg-blue-50';
    if (level >= 5) return 'text-orange-600 bg-orange-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <motion.div
      layout
      className="bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg">
            {student.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold text-foreground text-lg">{student.username}</h3>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className={`px-2 py-0.5 rounded-full font-medium ${getLevelColor(student.currentLevel)}`}>
                Niveau {student.currentLevel}
              </span>
              <span>•</span>
              <span>{student.totalAttempts} tentatives</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Quick stats */}
          {topErrors.length > 0 && (
            <div className="hidden md:flex gap-1">
              {topErrors.map(([cat, count]) => (
                <span 
                  key={cat}
                  className={`${categoryColors[cat as keyof ErrorByCategory]} text-white text-xs px-2 py-1 rounded-full`}
                >
                  {count}
                </span>
              ))}
            </div>
          )}
          
          {/* Success rate badge */}
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
            successRate >= 80 ? 'bg-green-100 text-green-700' :
            successRate >= 60 ? 'bg-blue-100 text-blue-700' :
            successRate >= 40 ? 'bg-orange-100 text-orange-700' :
            'bg-red-100 text-red-700'
          }`}>
            {successRate >= 80 ? <CheckCircle className="w-4 h-4" /> : 
             successRate >= 40 ? <Target className="w-4 h-4" /> : 
             <AlertTriangle className="w-4 h-4" />}
            <span className="font-medium text-sm">{successRate}%</span>
          </div>
          
          {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : 
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />}
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t"
          >
            <div className="p-4 space-y-4">
              {/* Stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-muted/30 rounded-xl p-3 text-center">
                  <Award className="w-5 h-5 mx-auto text-primary mb-1" />
                  <div className="text-lg font-bold text-foreground">{student.currentLevel}</div>
                  <div className="text-xs text-muted-foreground">Niveau actuel</div>
                </div>
                <div className="bg-muted/30 rounded-xl p-3 text-center">
                  <Target className="w-5 h-5 mx-auto text-blue-500 mb-1" />
                  <div className="text-lg font-bold text-foreground">{student.totalAttempts}</div>
                  <div className="text-xs text-muted-foreground">Tentatives</div>
                </div>
                <div className="bg-muted/30 rounded-xl p-3 text-center">
                  <AlertTriangle className="w-5 h-5 mx-auto text-orange-500 mb-1" />
                  <div className="text-lg font-bold text-foreground">{totalErrors}</div>
                  <div className="text-xs text-muted-foreground">Erreurs totales</div>
                </div>
                <div className="bg-muted/30 rounded-xl p-3 text-center">
                  <Clock className="w-5 h-5 mx-auto text-purple-500 mb-1" />
                  <div className="text-sm font-bold text-foreground">{formatDate(student.lastActivity)}</div>
                  <div className="text-xs text-muted-foreground">Dernière activité</div>
                </div>
              </div>

              {/* Error distribution */}
              {totalErrors > 0 && (
                <div className="bg-orange-50 rounded-xl p-4">
                  <h4 className="font-medium text-orange-800 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Distribution des erreurs
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(student.errorStats)
                      .filter(([_, count]) => count > 0)
                      .sort(([_, a], [__, b]) => b - a)
                      .map(([cat, count]) => (
                        <span 
                          key={cat}
                          className={`${categoryColors[cat as keyof ErrorByCategory]} text-white px-3 py-1 rounded-full text-sm`}
                        >
                          {categoryLabels[cat as keyof ErrorByCategory]}: {count}
                        </span>
                      ))
                    }
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t">
                {confirmAction === 'reset' ? (
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Confirmer la réinitialisation ?</span>
                    <Button size="sm" variant="destructive" onClick={() => { onReset(student.username); setConfirmAction(null); }}>
                      Oui
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setConfirmAction(null)}>
                      Non
                    </Button>
                  </div>
                ) : confirmAction === 'delete' ? (
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-sm text-destructive">Supprimer définitivement ?</span>
                    <Button size="sm" variant="destructive" onClick={() => { onDelete(student.username); setConfirmAction(null); }}>
                      Supprimer
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setConfirmAction(null)}>
                      Annuler
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex items-center gap-1"
                      onClick={(e) => { e.stopPropagation(); setConfirmAction('reset'); }}
                    >
                      <RotateCcw className="w-4 h-4" />
                      Réinitialiser
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex items-center gap-1 text-destructive hover:text-destructive"
                      onClick={(e) => { e.stopPropagation(); setConfirmAction('delete'); }}
                    >
                      <Trash2 className="w-4 h-4" />
                      Supprimer
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DashboardStudentCard;
