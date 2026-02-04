// Composant principal du module "Spécial Pourcentages : le circuit"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { seasons } from '@/data/percentagesCircuit';
import { usePercentagesProgress } from '@/hooks/usePercentagesProgress';
import SeasonSelector from './SeasonSelector';
import GrandPrixRunner from './GrandPrixRunner';
import mercedesF1 from '@/assets/mercedes-f1.png';

interface PercentagesCircuitProps {
  username: string;
  onBack: () => void;
}

type View = 'seasons' | 'grandprix';

const PercentagesCircuit: React.FC<PercentagesCircuitProps> = ({ username, onBack }) => {
  const [view, setView] = useState<View>('seasons');
  const [selectedSeasonId, setSelectedSeasonId] = useState<number>(1);
  const [selectedGPId, setSelectedGPId] = useState<number>(1);
  
  const {
    progress,
    addXP,
    addBadge,
    completeGP,
    isGPUnlocked,
    isSeasonUnlocked,
    getGPScore,
    getSeasonProgress,
    getTotalXP,
  } = usePercentagesProgress(username);

  const handleSelectGP = (seasonId: number, gpId: number) => {
    setSelectedSeasonId(seasonId);
    setSelectedGPId(gpId);
    setView('grandprix');
  };

  const handleGPComplete = (score: number) => {
    completeGP(selectedSeasonId, selectedGPId, score);
    
    // Bonus XP selon le score
    if (score === 100) {
      addXP(50); // Parfait
    } else if (score >= 90) {
      addXP(30); // Excellent
    } else if (score >= 70) {
      addXP(20); // Validé
    } else {
      addXP(10); // Participation
    }
    
    // Vérifier si la saison est complétée pour le badge
    const season = seasons.find(s => s.id === selectedSeasonId);
    if (season) {
      const allComplete = season.grandsPrix.every(gp => 
        gp.id === selectedGPId ? score >= 70 : progress.completedGPs.has(`${selectedSeasonId}_${gp.id}`)
      );
      if (allComplete) {
        addBadge(season.badge.toLowerCase().replace(/\s+/g, '_'));
      }
    }
  };

  const handleBackToSeasons = () => {
    setView('seasons');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Header F1 */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={view === 'seasons' ? onBack : handleBackToSeasons}
              className="hover:bg-secondary/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏎️</span>
              <h1 className="text-lg sm:text-xl font-bold">
                {view === 'seasons' ? 'Grand Prix des Pourcentages' : `Saison ${selectedSeasonId} - GP ${selectedGPId}`}
              </h1>
            </div>
          </div>
          
          {/* Stats du joueur */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold">{getTotalXP()} XP</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="font-semibold">{progress.badges.length}</span>
            </div>
            <motion.img
              src={mercedesF1}
              alt="Mercedes F1"
              className="h-8 object-contain"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </div>
        
        {/* Barre de progression globale */}
        <div className="h-1 bg-muted">
          <motion.div
            className="h-full bg-gradient-to-r from-secondary via-primary to-destructive"
            initial={{ width: 0 }}
            animate={{ 
              width: `${(progress.completedGPs.size / seasons.reduce((acc, s) => acc + s.grandsPrix.length, 0)) * 100}%` 
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.header>

      {/* Contenu principal */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {view === 'seasons' ? (
            <motion.div
              key="seasons"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <SeasonSelector
                seasons={seasons}
                progress={progress}
                isSeasonUnlocked={isSeasonUnlocked}
                isGPUnlocked={isGPUnlocked}
                getGPScore={getGPScore}
                getSeasonProgress={getSeasonProgress}
                onSelectGP={handleSelectGP}
              />
            </motion.div>
          ) : (
            <motion.div
              key="grandprix"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GrandPrixRunner
                seasonId={selectedSeasonId}
                gpId={selectedGPId}
                username={username}
                onComplete={handleGPComplete}
                onBack={handleBackToSeasons}
                addXP={addXP}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default PercentagesCircuit;
