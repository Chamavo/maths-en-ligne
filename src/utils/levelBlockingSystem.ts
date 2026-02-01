import { supabase } from '@/integrations/supabase/client';

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

// Récupérer les infos de blocage depuis la DB
export const getBlockingInfo = async (username: string): Promise<LevelBlockInfo | null> => {
  // On ignore 'username' car on utilise auth.uid()
  // Mais on garde la signature pour compatibilité temporaire
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabase
    .from('student_progression')
    .select('*')
    .eq('user_id', session.user.id)
    .single();

  if (error || !data) return null;

  return {
    level: data.current_level,
    failCount: data.consecutive_failures,
    isBlocked: data.status === 'blocked',
    requiredCorrectStreak: 10,
    currentCorrectStreak: 0, // TODO: Add to DB if needed
    levelInProgress: false, // Managed differently now?
    requiredRevisionModule: data.required_revision_module
  };
};

export const markLevelStarted = async (username: string, level: number): Promise<void> => {
  // Optional: Track in DB 'current_activity' or just client state
  // For now, relies on client state for 'in progress', or we could add a column
  console.log('markLevelStarted', level);
};

export const markLevelCompleted = async (username: string, level: number): Promise<void> => {
  console.log('markLevelCompleted', level);
};

export const recordLevelSuccess = async (username: string, level: number): Promise<void> => {
  const { error } = await supabase.rpc('record_level_result', {
    p_level: level,
    p_success: true
  });
  if (error) console.error('Error recording success:', error);
};

export const recordLevelFailure = async (username: string, level: number): Promise<LevelBlockInfo | null> => {
  const { data, error } = await supabase.rpc('record_level_result', {
    p_level: level,
    p_success: false
  });

  if (error) {
    console.error('Error recording failure:', error);
    return null;
  }

  // Transform RPC result to LevelBlockInfo
  return {
    level: level,
    failCount: data.failures,
    isBlocked: data.status === 'blocked',
    requiredCorrectStreak: 10,
    currentCorrectStreak: 0,
    requiredRevisionModule: data.required_revision_module || null
  };
};

export const checkAndRecordAbandon = async (username: string): Promise<LevelBlockInfo | null> => {
  // Logic complex with async/DB. For MVP, we might skip "Abandon detection"
  // or implement it via a heartbeat.
  // Converting to async no-op for now to avoid blocking
  return null;
};

export const unblockLevel = async (username: string, level: number): Promise<void> => {
  const { error } = await supabase.rpc('record_level_result', {
    p_level: level,
    p_success: true // Success unblocks
  });
  if (error) console.error('Error unblocking level:', error);
};

// Utils for UI checking (now needs to accept the loaded info object rather than fetching it)
export const isLevelBlocked = (info: LevelBlockInfo | null, level: number): boolean => {
  return info !== null && info.isBlocked && info.level === level;
};

export const getBlockedLevel = (info: LevelBlockInfo | null): number | null => {
  return info && info.isBlocked ? info.level : null;
};

