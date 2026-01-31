// Types pour le suivi de la progression des élèves

export interface ErrorByCategory {
  fraction: number;
  addition: number;
  soustraction: number;
  multiplication: number;
  division: number;
  pourcentage: number;
  geometrie: number;
  conversion: number;
  vitesse: number;
  partage: number;
  temps: number;
  autre: number;
}

export interface LevelAttempt {
  level: number;
  date: string;
  score: number;
  totalQuestions: number;
  timeSpent: number; // en secondes
  passed: boolean;
  errors: ErrorByCategory;
}

export interface StudentProgress {
  username: string;
  currentLevel: number;
  totalAttempts: number;
  lastActivity: string;
  attempts: LevelAttempt[];
  errorStats: ErrorByCategory;
}

// Fonction pour obtenir la catégorie d'erreur à partir du type d'exercice
export const getCategoryFromType = (type: string): keyof ErrorByCategory => {
  const typeMap: Record<string, keyof ErrorByCategory> = {
    'fraction': 'fraction',
    'addition': 'addition',
    'soustraction': 'soustraction',
    'multiplication': 'multiplication',
    'division': 'division',
    'pourcentage': 'pourcentage',
    'geometrie': 'geometrie',
    'conversion': 'conversion',
    'vitesse': 'vitesse',
    'partage': 'partage',
    'temps': 'temps',
    'moyenne': 'autre',
    'echelle': 'autre',
    'age': 'autre',
  };
  return typeMap[type.toLowerCase()] || 'autre';
};

// Fonction pour créer des stats d'erreurs vides
export const createEmptyErrorStats = (): ErrorByCategory => ({
  fraction: 0,
  addition: 0,
  soustraction: 0,
  multiplication: 0,
  division: 0,
  pourcentage: 0,
  geometrie: 0,
  conversion: 0,
  vitesse: 0,
  partage: 0,
  temps: 0,
  autre: 0,
});

// Fonction pour sauvegarder une tentative d'élève
export const saveStudentAttempt = (
  username: string, 
  level: number, 
  results: Array<{ correct: boolean; category: string; timeSpent: number }>
): void => {
  const key = `studentProgress_${username.toLowerCase()}`;
  const existing = localStorage.getItem(key);
  let progress: StudentProgress;
  
  if (existing) {
    progress = JSON.parse(existing);
  } else {
    progress = {
      username,
      currentLevel: level,
      totalAttempts: 0,
      lastActivity: new Date().toISOString(),
      attempts: [],
      errorStats: createEmptyErrorStats(),
    };
  }
  
  // Calculer les erreurs par catégorie pour cette tentative
  const attemptErrors = createEmptyErrorStats();
  let correctCount = 0;
  let totalTime = 0;
  
  results.forEach(r => {
    totalTime += r.timeSpent;
    if (r.correct) {
      correctCount++;
    } else {
      const cat = getCategoryFromType(r.category);
      attemptErrors[cat]++;
      progress.errorStats[cat]++;
    }
  });
  
  const passed = (results.length - correctCount) <= 2;
  
  // Ajouter la tentative
  const attempt: LevelAttempt = {
    level,
    date: new Date().toISOString(),
    score: correctCount,
    totalQuestions: results.length,
    timeSpent: Math.round(totalTime / 1000),
    passed,
    errors: attemptErrors,
  };
  
  progress.attempts.push(attempt);
  progress.totalAttempts++;
  progress.lastActivity = new Date().toISOString();
  if (passed && level >= progress.currentLevel) {
    progress.currentLevel = level + 1;
  }
  
  localStorage.setItem(key, JSON.stringify(progress));
};

// Fonction pour récupérer la progression d'un élève
export const getStudentProgress = (username: string): StudentProgress | null => {
  const key = `studentProgress_${username.toLowerCase()}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Fonction pour récupérer tous les élèves
export const getAllStudentsProgress = (): StudentProgress[] => {
  const students: StudentProgress[] = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('studentProgress_')) {
      try {
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        if (data.username) {
          students.push(data);
        }
      } catch (e) {
        console.error('Error parsing student progress:', e);
      }
    }
  }
  
  return students.sort((a, b) => a.username.localeCompare(b.username));
};

// Fonction pour réinitialiser la progression d'un élève
export const resetStudentProgress = (username: string): void => {
  const key = `studentProgress_${username.toLowerCase()}`;
  const sessionKey = `mentalCalcSession_${username.toLowerCase()}`;
  
  // Reset progress
  localStorage.removeItem(key);
  
  // Reset session level
  const session = localStorage.getItem(sessionKey);
  if (session) {
    const sessionData = JSON.parse(session);
    sessionData.level = 1;
    localStorage.setItem(sessionKey, JSON.stringify(sessionData));
  }
};

// Fonction pour supprimer complètement un élève
export const deleteStudent = (username: string): void => {
  const key = `studentProgress_${username.toLowerCase()}`;
  const sessionKey = `mentalCalcSession_${username.toLowerCase()}`;
  
  // Supprimer la progression
  localStorage.removeItem(key);
  
  // Supprimer la session
  localStorage.removeItem(sessionKey);
};
