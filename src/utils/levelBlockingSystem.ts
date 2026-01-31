// Système de blocage de niveau après 3 échecs consécutifs
// + gestion des abandons (niveau quitté = tentative utilisée)

export interface LevelBlockInfo {
  level: number;
  failCount: number;
  isBlocked: boolean;
  requiredCorrectStreak: number;
  currentCorrectStreak: number;
  // Nouveau: suivre si un niveau est en cours
  levelInProgress?: boolean;
  levelStartedAt?: string;
}

// Clé localStorage pour stocker les infos de blocage
const getBlockingKey = (username: string) => `levelBlocking_${username.toLowerCase()}`;

// Récupérer les infos de blocage pour un utilisateur
export const getBlockingInfo = (username: string): LevelBlockInfo | null => {
  const key = getBlockingKey(username);
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Sauvegarder les infos de blocage
export const saveBlockingInfo = (username: string, info: LevelBlockInfo): void => {
  const key = getBlockingKey(username);
  localStorage.setItem(key, JSON.stringify(info));
};

// Supprimer les infos de blocage (niveau débloqué)
export const clearBlockingInfo = (username: string): void => {
  const key = getBlockingKey(username);
  localStorage.removeItem(key);
};

// Marquer le début d'un niveau (pour détecter les abandons)
export const markLevelStarted = (username: string, level: number): void => {
  const currentInfo = getBlockingInfo(username);
  
  // Si on a déjà un blocage pour un autre niveau, on ne le remplace pas
  if (currentInfo && currentInfo.isBlocked && currentInfo.level !== level) {
    return;
  }
  
  const info: LevelBlockInfo = currentInfo && currentInfo.level === level
    ? { ...currentInfo, levelInProgress: true, levelStartedAt: new Date().toISOString() }
    : {
        level,
        failCount: currentInfo?.level === level ? currentInfo.failCount : 0,
        isBlocked: false,
        requiredCorrectStreak: 10,
        currentCorrectStreak: 0,
        levelInProgress: true,
        levelStartedAt: new Date().toISOString(),
      };
  
  saveBlockingInfo(username, info);
};

// Marquer un niveau comme terminé (succès ou échec complet)
export const markLevelCompleted = (username: string, level: number): void => {
  const currentInfo = getBlockingInfo(username);
  if (currentInfo && currentInfo.level === level) {
    saveBlockingInfo(username, {
      ...currentInfo,
      levelInProgress: false,
      levelStartedAt: undefined,
    });
  }
};

// Enregistrer un abandon de niveau (compte comme un échec)
export const recordLevelAbandon = (username: string, level: number): LevelBlockInfo | null => {
  const currentInfo = getBlockingInfo(username);
  
  // Ne compter l'abandon que si un niveau était en cours
  if (!currentInfo || currentInfo.level !== level || !currentInfo.levelInProgress) {
    return currentInfo;
  }
  
  // Incrémenter le compteur d'échecs
  const newInfo: LevelBlockInfo = {
    ...currentInfo,
    failCount: currentInfo.failCount + 1,
    isBlocked: currentInfo.failCount + 1 >= 3,
    levelInProgress: false,
    levelStartedAt: undefined,
    currentCorrectStreak: 0,
  };
  
  saveBlockingInfo(username, newInfo);
  return newInfo;
};

// Enregistrer un échec de niveau
export const recordLevelFailure = (username: string, level: number): LevelBlockInfo => {
  const currentInfo = getBlockingInfo(username);
  
  // Si on a déjà un blocage pour un autre niveau, on ne le remplace pas
  if (currentInfo && currentInfo.isBlocked && currentInfo.level !== level) {
    return currentInfo;
  }
  
  let newInfo: LevelBlockInfo;
  
  if (currentInfo && currentInfo.level === level) {
    // Incrémenter le compteur d'échecs pour ce niveau
    newInfo = {
      ...currentInfo,
      failCount: currentInfo.failCount + 1,
      isBlocked: currentInfo.failCount + 1 >= 3,
      currentCorrectStreak: 0,
      levelInProgress: false,
      levelStartedAt: undefined,
    };
  } else {
    // Premier échec sur ce niveau
    newInfo = {
      level,
      failCount: 1,
      isBlocked: false,
      requiredCorrectStreak: 10,
      currentCorrectStreak: 0,
      levelInProgress: false,
    };
  }
  
  saveBlockingInfo(username, newInfo);
  return newInfo;
};

// Enregistrer un succès de niveau (réinitialise le compteur d'échecs)
export const recordLevelSuccess = (username: string, level: number): void => {
  const currentInfo = getBlockingInfo(username);
  
  // Si le niveau réussi est celui qui était bloqué ou suivi, on supprime les infos
  if (currentInfo && currentInfo.level === level) {
    clearBlockingInfo(username);
  }
};

// Vérifier si un niveau a été abandonné (et compter comme tentative si oui)
export const checkAndRecordAbandon = (username: string): LevelBlockInfo | null => {
  const currentInfo = getBlockingInfo(username);
  
  if (currentInfo && currentInfo.levelInProgress) {
    // Un niveau était en cours et n'a pas été terminé = abandon
    return recordLevelAbandon(username, currentInfo.level);
  }
  
  return currentInfo;
};

// Incrémenter le compteur de réponses justes d'affilée (en Révisions)
export const incrementCorrectStreak = (username: string): { 
  newStreak: number; 
  isUnlocked: boolean;
  unlockedLevel: number | null;
} => {
  const currentInfo = getBlockingInfo(username);
  
  if (!currentInfo || !currentInfo.isBlocked) {
    return { newStreak: 0, isUnlocked: false, unlockedLevel: null };
  }
  
  const newStreak = currentInfo.currentCorrectStreak + 1;
  const isUnlocked = newStreak >= currentInfo.requiredCorrectStreak;
  
  if (isUnlocked) {
    // Débloquer le niveau
    clearBlockingInfo(username);
  } else {
    // Mettre à jour le compteur
    saveBlockingInfo(username, {
      ...currentInfo,
      currentCorrectStreak: newStreak,
    });
  }
  
  return { 
    newStreak, 
    isUnlocked, 
    unlockedLevel: isUnlocked ? currentInfo.level : null 
  };
};

// Réinitialiser le compteur de réponses justes d'affilée (en cas d'erreur)
export const resetCorrectStreak = (username: string): void => {
  const currentInfo = getBlockingInfo(username);
  
  if (currentInfo && currentInfo.isBlocked) {
    saveBlockingInfo(username, {
      ...currentInfo,
      currentCorrectStreak: 0,
    });
  }
};

// Vérifier si un niveau est bloqué pour un utilisateur
export const isLevelBlocked = (username: string, level: number): boolean => {
  const currentInfo = getBlockingInfo(username);
  return currentInfo !== null && currentInfo.isBlocked && currentInfo.level === level;
};

// Obtenir le niveau bloqué (s'il y en a un)
export const getBlockedLevel = (username: string): number | null => {
  const currentInfo = getBlockingInfo(username);
  return currentInfo && currentInfo.isBlocked ? currentInfo.level : null;
};

// Obtenir le compteur actuel de réponses justes d'affilée
export const getCurrentCorrectStreak = (username: string): number => {
  const currentInfo = getBlockingInfo(username);
  return currentInfo?.currentCorrectStreak || 0;
};
