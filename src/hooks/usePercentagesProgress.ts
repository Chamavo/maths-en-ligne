// Hook personnalisé pour gérer l'état du module Pourcentages
// Utilise Supabase pour la persistence avec fallback localStorage
import { useState, useCallback, useEffect } from 'react';
import type { PlayerProgress } from '@/data/percentagesCircuit/types';
import { seasons } from '@/data/percentagesCircuit/seasons';
import { supabase } from '@/integrations/supabase/client';

const STORAGE_KEY = 'percentagesCircuit_progress';
const MODE = 'pourcentages';

interface ProgressionRow {
  id: string;
  extra_data: {
    xp?: number;
    badges?: string[];
    completedGPs?: string[];
    seasonScores?: Record<number, Record<number, number>>;
    currentSeasonId?: number;
    currentGPId?: number;
  } | null;
  current_level: number;
}

const getInitialProgress = (): PlayerProgress => ({
  currentSeasonId: 1,
  currentGPId: 1,
  completedGPs: new Set(),
  xp: 0,
  badges: [],
  seasonScores: {},
});

const parseProgressFromRow = (row: ProgressionRow): PlayerProgress => {
  const extra = row.extra_data || {};
  return {
    currentSeasonId: extra.currentSeasonId ?? 1,
    currentGPId: extra.currentGPId ?? 1,
    completedGPs: new Set(extra.completedGPs || []),
    xp: extra.xp ?? 0,
    badges: extra.badges || [],
    seasonScores: extra.seasonScores || {},
  };
};

const loadFromLocalStorage = (studentName: string): PlayerProgress => {
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
  
  return getInitialProgress();
};

export const usePercentagesProgress = (studentName: string) => {
  const [progress, setProgress] = useState<PlayerProgress>(() => 
    loadFromLocalStorage(studentName)
  );
  const [userId, setUserId] = useState<string | null>(null);

  // Get current user on mount
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserId(user?.id ?? null);
    });
  }, []);

  // Load from database on mount (if authenticated)
  useEffect(() => {
    const loadFromDatabase = async () => {
      if (!userId) return;
      
      try {
        const { data, error } = await supabase
          .from('student_progression')
          .select('id, extra_data, current_level')
          .eq('user_id', userId)
          .eq('student_name', studentName.toLowerCase())
          .eq('mode', MODE)
          .maybeSingle();
        
        if (!error && data) {
          const dbProgress = parseProgressFromRow(data as ProgressionRow);
          // Use database progress if it has more data
          const localProgress = loadFromLocalStorage(studentName);
          const useDb = dbProgress.completedGPs.size >= localProgress.completedGPs.size;
          
          if (useDb) {
            setProgress(dbProgress);
          } else {
            // Migrate local to DB
            await saveToDatabase(localProgress);
          }
        }
      } catch (err) {
        console.error('Failed to load progress from database:', err);
      }
    };
    
    loadFromDatabase();
  }, [userId, studentName]);

  // Save to database
  const saveToDatabase = async (progressData: PlayerProgress) => {
    if (!userId) return;
    
    const extraData = {
      xp: progressData.xp,
      badges: progressData.badges,
      completedGPs: Array.from(progressData.completedGPs),
      seasonScores: progressData.seasonScores,
      currentSeasonId: progressData.currentSeasonId,
      currentGPId: progressData.currentGPId,
    };
    
    try {
      await supabase
        .from('student_progression')
        .upsert({
          user_id: userId,
          student_name: studentName.toLowerCase(),
          mode: MODE,
          current_level: progressData.currentSeasonId,
          extra_data: extraData,
        }, {
          onConflict: 'user_id,student_name,mode'
        });
    } catch (err) {
      console.error('Failed to save progress to database:', err);
    }
  };

  // Sauvegarder à chaque changement
  useEffect(() => {
    // Save to localStorage (backup)
    const key = `${STORAGE_KEY}_${studentName.toLowerCase()}`;
    const toSave = {
      ...progress,
      completedGPs: Array.from(progress.completedGPs),
    };
    localStorage.setItem(key, JSON.stringify(toSave));
    
    // Save to database
    saveToDatabase(progress);
  }, [progress, studentName, userId]);

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

  const resetProgress = useCallback(async () => {
    const key = `${STORAGE_KEY}_${studentName.toLowerCase()}`;
    localStorage.removeItem(key);
    
    // Also reset in database
    if (userId) {
      await supabase
        .from('student_progression')
        .delete()
        .eq('user_id', userId)
        .eq('student_name', studentName.toLowerCase())
        .eq('mode', MODE);
    }
    
    setProgress(getInitialProgress());
  }, [studentName, userId]);

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
