// Level blocking system - simplified version using localStorage only
// The student_progression table doesn't exist yet, so we use localStorage

export interface LevelBlockInfo {
  level: number;
  failCount: number;
  isBlocked: boolean;
  requiredCorrectStreak: number;
  currentCorrectStreak: number;
  levelInProgress?: boolean;
  levelStartedAt?: string;
  requiredRevisionModule?: string | null;
}

// Get blocking info from localStorage
export const getBlockingInfo = async (username: string): Promise<LevelBlockInfo | null> => {
  const key = `levelBlocking_${username.toLowerCase()}`;
  const data = localStorage.getItem(key);
  
  if (!data) return null;
  
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

export const markLevelStarted = async (username: string, level: number): Promise<void> => {
  const key = `levelBlocking_${username.toLowerCase()}`;
  const existing = await getBlockingInfo(username) || {
    level,
    failCount: 0,
    isBlocked: false,
    requiredCorrectStreak: 10,
    currentCorrectStreak: 0,
  };
  
  existing.levelInProgress = true;
  existing.levelStartedAt = new Date().toISOString();
  existing.level = level;
  
  localStorage.setItem(key, JSON.stringify(existing));
};

export const markLevelCompleted = async (username: string, level: number): Promise<void> => {
  const key = `levelBlocking_${username.toLowerCase()}`;
  const existing = await getBlockingInfo(username);
  
  if (existing) {
    existing.levelInProgress = false;
    localStorage.setItem(key, JSON.stringify(existing));
  }
};

export const recordLevelSuccess = async (username: string, level: number): Promise<void> => {
  const key = `levelBlocking_${username.toLowerCase()}`;
  const existing = await getBlockingInfo(username) || {
    level,
    failCount: 0,
    isBlocked: false,
    requiredCorrectStreak: 10,
    currentCorrectStreak: 0,
  };
  
  existing.failCount = 0;
  existing.isBlocked = false;
  existing.currentCorrectStreak = (existing.currentCorrectStreak || 0) + 1;
  
  localStorage.setItem(key, JSON.stringify(existing));
};

export const recordLevelFailure = async (username: string, level: number): Promise<LevelBlockInfo | null> => {
  const key = `levelBlocking_${username.toLowerCase()}`;
  const existing = await getBlockingInfo(username) || {
    level,
    failCount: 0,
    isBlocked: false,
    requiredCorrectStreak: 10,
    currentCorrectStreak: 0,
  };
  
  existing.failCount = (existing.failCount || 0) + 1;
  existing.currentCorrectStreak = 0;
  
  // Block after 3 consecutive failures
  if (existing.failCount >= 3) {
    existing.isBlocked = true;
  }
  
  localStorage.setItem(key, JSON.stringify(existing));
  return existing;
};

export const checkAndRecordAbandon = async (username: string): Promise<LevelBlockInfo | null> => {
  return null;
};

export const unblockLevel = async (username: string, level: number): Promise<void> => {
  const key = `levelBlocking_${username.toLowerCase()}`;
  const existing = await getBlockingInfo(username);
  
  if (existing) {
    existing.isBlocked = false;
    existing.failCount = 0;
    localStorage.setItem(key, JSON.stringify(existing));
  }
};

// Utils for UI checking
export const isLevelBlocked = (info: LevelBlockInfo | null, level: number): boolean => {
  return info !== null && info.isBlocked && info.level === level;
};

export const getBlockedLevel = (info: LevelBlockInfo | null): number | null => {
  return info && info.isBlocked ? info.level : null;
};
