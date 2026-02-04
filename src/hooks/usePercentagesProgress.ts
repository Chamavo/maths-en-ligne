// Hook personnalisé pour gérer l'état du module Pourcentages
import { useState, useCallback, useEffect } from 'react';
import type { PlayerProgress } from '@/data/percentagesCircuit/types';
import { seasons } from '@/data/percentagesCircuit/seasons';

const STORAGE_KEY = 'percentagesCircuit_progress';

const getInitialProgress = (studentName: string): PlayerProgress => {
  const key = `${STORAGE_KEY}_${studentName.toLowerCase()}`;
  const saved = localStorage.getItem(key);
  
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        completedGPs: new Set(parsed.completedGPs || []),
        badges: parsed.badges || [],
        seasonScores: parsed.seasonScores || {},
      };
    } catch {
      // ignore
    }
  }
  
  return {
    currentSeasonId: 1,
    currentGPId: 1,
    completedGPs: new Set(),
    xp: 0,
    badges: [],
    seasonScores: {},
  };
};

export const usePercentagesProgress = (studentName: string) => {
  const [progress, setProgress] = useState<PlayerProgress>(() => 
    getInitialProgress(studentName)
  );

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    const key = `${STORAGE_KEY}_${studentName.toLowerCase()}`;
    const toSave = {
      ...progress,
      completedGPs: Array.from(progress.completedGPs),
    };
    localStorage.setItem(key, JSON.stringify(toSave));
  }, [progress, studentName]);

  const addXP = useCallback((amount: number) => {
    setProgress(prev => ({ ...prev, xp: prev.xp + amount }));
  }, []);

  const addBadge = useCallback((badgeId: string) => {
    setProgress(prev => {
      if (prev.badges.includes(badgeId)) return prev;
      return { ...prev, badges: [...prev.badges, badgeId] };
    });
  }, []);

  const completeGP = useCallback((seasonId: number, gpId: number, score: number) => {
    setProgress(prev => {
      const key = `${seasonId}_${gpId}`;
      const newCompleted = new Set(prev.completedGPs);
      newCompleted.add(key);
      
      const newSeasonScores = { ...prev.seasonScores };
      if (!newSeasonScores[seasonId]) {
        newSeasonScores[seasonId] = {};
      }
      // Garder le meilleur score
      const existingScore = newSeasonScores[seasonId][gpId] || 0;
      newSeasonScores[seasonId][gpId] = Math.max(existingScore, score);
      
      return {
        ...prev,
        completedGPs: newCompleted,
        seasonScores: newSeasonScores,
      };
    });
  }, []);

  const isGPUnlocked = useCallback((seasonId: number, gpId: number): boolean => {
    // Premier GP de la première saison toujours débloqué
    if (seasonId === 1 && gpId === 1) return true;
    
    // Vérifier si la saison précédente est complétée
    if (gpId === 1 && seasonId > 1) {
      const prevSeason = seasons.find(s => s.id === seasonId - 1);
      if (prevSeason) {
        const allPrevGPsComplete = prevSeason.grandsPrix.every(gp => 
          progress.completedGPs.has(`${seasonId - 1}_${gp.id}`)
        );
        return allPrevGPsComplete;
      }
    }
    
    // Vérifier si le GP précédent est complété avec 70%+
    const prevGPKey = `${seasonId}_${gpId - 1}`;
    if (progress.completedGPs.has(prevGPKey)) {
      const prevScore = progress.seasonScores[seasonId]?.[gpId - 1] || 0;
      return prevScore >= 70;
    }
    
    return false;
  }, [progress]);

  const isSeasonUnlocked = useCallback((seasonId: number): boolean => {
    if (seasonId === 1) return true;
    
    // Vérifier si la saison précédente est complétée
    const prevSeason = seasons.find(s => s.id === seasonId - 1);
    if (prevSeason) {
      return prevSeason.grandsPrix.every(gp => 
        progress.completedGPs.has(`${seasonId - 1}_${gp.id}`)
      );
    }
    
    return false;
  }, [progress]);

  const getGPScore = useCallback((seasonId: number, gpId: number): number => {
    return progress.seasonScores[seasonId]?.[gpId] || 0;
  }, [progress]);

  const getSeasonProgress = useCallback((seasonId: number): { completed: number; total: number } => {
    const season = seasons.find(s => s.id === seasonId);
    if (!season) return { completed: 0, total: 0 };
    
    const completed = season.grandsPrix.filter(gp => 
      progress.completedGPs.has(`${seasonId}_${gp.id}`)
    ).length;
    
    return { completed, total: season.grandsPrix.length };
  }, [progress]);

  const getTotalXP = useCallback((): number => {
    return progress.xp;
  }, [progress]);

  const resetProgress = useCallback(() => {
    const key = `${STORAGE_KEY}_${studentName.toLowerCase()}`;
    localStorage.removeItem(key);
    setProgress(getInitialProgress(studentName));
  }, [studentName]);

  return {
    progress,
    addXP,
    addBadge,
    completeGP,
    isGPUnlocked,
    isSeasonUnlocked,
    getGPScore,
    getSeasonProgress,
    getTotalXP,
    resetProgress,
  };
};
