// Sélecteur de saisons et Grands Prix
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, Star, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { Season, PlayerProgress } from '@/data/percentagesCircuit/types';

interface SeasonSelectorProps {
  seasons: Season[];
  progress: PlayerProgress;
  isSeasonUnlocked: (seasonId: number) => boolean;
  isGPUnlocked: (seasonId: number, gpId: number) => boolean;
  getGPScore: (seasonId: number, gpId: number) => number;
  getSeasonProgress: (seasonId: number) => { completed: number; total: number };
  onSelectGP: (seasonId: number, gpId: number) => void;
}

const SeasonSelector: React.FC<SeasonSelectorProps> = ({
  seasons,
  progress,
  isSeasonUnlocked,
  isGPUnlocked,
  getGPScore,
  getSeasonProgress,
  onSelectGP,
}) => {
  return (
    <div className="space-y-6">
      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          🏆 Championnat des Pourcentages
        </h2>
        <p className="text-muted-foreground">
          6 saisons • 30 Grands Prix • Deviens Champion du Monde !
        </p>
      </motion.div>

      {/* Liste des saisons */}
      <div className="space-y-6">
        {seasons.map((season, index) => {
          const unlocked = isSeasonUnlocked(season.id);
          const seasonProgress = getSeasonProgress(season.id);
          const isComplete = seasonProgress.completed === seasonProgress.total;

          return (
            <motion.div
              key={season.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`overflow-hidden transition-all ${
                  unlocked 
                    ? 'border-2 hover:shadow-lg cursor-pointer' 
                    : 'opacity-60 border-muted'
                }`}
                style={{ borderColor: unlocked ? season.color : undefined }}
              >
                <CardContent className="p-0">
                  {/* En-tête de saison */}
                  <div 
                    className="p-4 sm:p-6"
                    style={{ 
                      background: unlocked 
                        ? `linear-gradient(135deg, ${season.color}15, ${season.color}05)` 
                        : undefined 
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{season.icon}</span>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                            Saison {season.id} — {season.title}
                            {isComplete && (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                            {!unlocked && (
                              <Lock className="w-4 h-4 text-muted-foreground" />
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground">{season.subtitle}</p>
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium" style={{ color: season.color }}>
                          🧠 {season.competence}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {seasonProgress.completed}/{seasonProgress.total} GP
                        </p>
                      </div>
                    </div>

                    {/* Barre de progression saison */}
                    <Progress 
                      value={(seasonProgress.completed / seasonProgress.total) * 100}
                      className="h-2"
                    />
                  </div>

                  {/* Liste des Grands Prix */}
                  {unlocked && (
                    <div className="border-t border-border/50">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-border/50">
                        {season.grandsPrix.map((gp) => {
                          const gpUnlocked = isGPUnlocked(season.id, gp.id);
                          const gpScore = getGPScore(season.id, gp.id);
                          const gpComplete = progress.completedGPs.has(`${season.id}_${gp.id}`);

                          return (
                            <motion.button
                              key={gp.id}
                              onClick={() => gpUnlocked && onSelectGP(season.id, gp.id)}
                              disabled={!gpUnlocked}
                              className={`p-3 sm:p-4 text-left transition-all ${
                                gpUnlocked 
                                  ? 'hover:bg-muted/50 cursor-pointer' 
                                  : 'opacity-50 cursor-not-allowed'
                              }`}
                              whileHover={gpUnlocked ? { scale: 1.02 } : {}}
                              whileTap={gpUnlocked ? { scale: 0.98 } : {}}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium text-muted-foreground">
                                  GP {gp.id}
                                </span>
                                {gpComplete ? (
                                  <div className="flex items-center gap-1">
                                    {gpScore >= 90 && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                                    {gpScore >= 70 && <CheckCircle className="w-3 h-3 text-green-500" />}
                                  </div>
                                ) : !gpUnlocked ? (
                                  <Lock className="w-3 h-3 text-muted-foreground" />
                                ) : (
                                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                                )}
                              </div>
                              <p className="text-sm font-medium line-clamp-1">{gp.title}</p>
                              {gpComplete && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Score: {gpScore}%
                                </p>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Message si saison verrouillée */}
                  {!unlocked && (
                    <div className="p-4 bg-muted/30 text-center">
                      <p className="text-sm text-muted-foreground">
                        🔒 Termine la saison {season.id - 1} pour débloquer
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Légende */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mt-8"
      >
        <div className="flex items-center gap-1">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>Validé (70%+)</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span>Excellent (90%+)</span>
        </div>
        <div className="flex items-center gap-1">
          <Lock className="w-4 h-4" />
          <span>Verrouillé</span>
        </div>
      </motion.div>
    </div>
  );
};

export default SeasonSelector;
