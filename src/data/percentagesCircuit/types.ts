// Types pour le module "Spécial Pourcentages : le circuit"

export type ExerciseType = 
  | 'qcm' 
  | 'short_answer' 
  | 'association' 
  | 'multi_step' 
  | 'free_text' 
  | 'final_challenge';

export type GamificationType = 
  | 'fuel_fill' 
  | 'engine_sound' 
  | 'dashboard_light'
  | 'sector_complete'
  | 'pit_stop'
  | 'mechanical_fit'
  | 'digital_display'
  | 'telemetry_sync'
  | 'lap_counter'
  | 'strategy_board'
  | 'pit_animation'
  | 'price_drop'
  | 'radio_message'
  | 'podium_champagne';

export interface AssociationPair {
  left: string;
  right: string;
}

export interface Exercise {
  id: number;
  type: ExerciseType;
  question: string;
  choices?: string[];
  pairs?: AssociationPair[];
  steps?: string[];
  expected_format?: 'number' | 'fraction' | 'text';
  expected_answers?: string[];
  ai_feedback_focus?: string;
  gamification?: GamificationType;
  unit?: string;
}

export interface GrandPrix {
  id: number;
  title: string;
  description: string;
  exercises: Exercise[];
  unlockThreshold: number; // Pourcentage requis pour débloquer
}

export interface Season {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  competence: string;
  badge: string;
  unlockReward: string;
  grandsPrix: GrandPrix[];
}

export interface PlayerProgress {
  currentSeasonId: number;
  currentGPId: number;
  completedGPs: Set<string>; // "season_gp" format
  xp: number;
  badges: string[];
  seasonScores: Record<number, Record<number, number>>; // seasonId -> gpId -> score
}

export interface AIFeedback {
  trigger: string;
  message: string;
  hint_level: number;
  tone: 'encouraging' | 'corrective' | 'celebratory';
  theme: 'f1';
}

// Badges spéciaux
export const SPECIAL_BADGES = {
  CERVEAU_TURBO: { id: 'cerveau_turbo', name: '🧠 Cerveau Turbo', description: '3 bonnes explications d\'affilée' },
  DRS_MENTAL: { id: 'drs_mental', name: '⚡ DRS Mental', description: 'Calcul rapide' },
  MECANO: { id: 'mecano', name: '🛠️ Mécano', description: 'Correction d\'erreur réussie' },
  ROOKIE: { id: 'rookie', name: '🟢 Rookie des Stands', description: 'Saison 1 terminée' },
  STRATEGE: { id: 'stratege', name: '🟡 Stratège de Course', description: 'Saison 2 terminée' },
  TELEMETRIE: { id: 'telemetrie', name: '🟠 Pilote Télémétrie', description: 'Saison 3 terminée' },
  INGENIEUR: { id: 'ingenieur', name: '🔵 Ingénieur Stratégie', description: 'Saison 4 terminée' },
  PADDOCK: { id: 'paddock', name: '🟣 As du Paddock', description: 'Saison 5 terminée' },
  CHAMPION: { id: 'champion', name: '🏆 Champion du Monde', description: 'Toutes les saisons terminées' },
} as const;
