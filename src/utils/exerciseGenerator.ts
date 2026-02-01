// Générateur d'exercices basé sur la structure de données par niveau
// Règles: 20 questions par niveau (30 pour niveaux spéciaux), pas de répétition

import { getExercisesForLevel, StructuredExercise } from '@/data/structuredExercises';
import { niveauFractions1, niveauFractions2, isSpecialFractionLevel, getSpecialLevelConfig } from '@/data/fractionLevels';
import { getFondamentauxExercises } from '@/data/fondamentauxLevel';
import { getOperationsExercises } from '@/data/operationsLevel';

export interface Exercise {
  id: string;
  question: string;
  answer: number;
  category: string;
  level: number;
  hint?: string;
  isQCM?: boolean;
  choices?: number[];
}

// Générateur d'ID unique
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
};

// Convertir une réponse (number | string) en number
// Pour les questions de temps, on retourne le total en minutes pour comparaison uniforme
const parseAnswer = (reponse: number | string): number => {
  if (typeof reponse === 'number') {
    return reponse;
  }
  // Si c'est un format "Xh Ymin" ou "XhYY", on retourne en minutes (pas en heures décimales)
  // pour correspondre au parsing utilisateur qui retourne aussi en minutes
  const timeMatch = reponse.match(/(\d+)h\s*(\d{1,2})/);
  if (timeMatch) {
    const hours = parseInt(timeMatch[1]);
    const minutes = parseInt(timeMatch[2]);
    return hours * 60 + minutes; // Retourner en minutes
  }
  // Format "Xh" seul
  const hoursOnlyMatch = reponse.match(/^(\d+)h$/);
  if (hoursOnlyMatch) {
    return parseInt(hoursOnlyMatch[1]) * 60;
  }
  return parseFloat(reponse) || 0;
};

// Générer les choix multiples pour les fractions - utilise UNIQUEMENT des fractions connues
const generateFractionChoices = (correctAnswer: number): number[] => {
  const choices = [correctAnswer];
  
  // Liste étendue de toutes les fractions communes avec leurs valeurs décimales
  // Ces valeurs correspondent exactement à formatAsFraction dans fractionLevels.ts
  const commonFractions = [
    0.125, 0.167, 0.2, 0.222, 0.25, 0.267, 0.3, 0.333, 0.35, 0.375, 
    0.4, 0.417, 0.5, 0.583, 0.6, 0.625, 0.65, 0.667, 0.733, 0.75, 
    0.8, 0.833, 0.85, 0.875, 0.917, 1, 1.2, 1.25, 1.333, 1.5, 2
  ];
  
  // Trouver des distracteurs proches de la bonne réponse
  const possibleDistractors = commonFractions.filter(f => 
    Math.abs(f - correctAnswer) >= 0.03 && Math.abs(f - correctAnswer) <= 1.5
  );
  
  const shuffled = [...possibleDistractors].sort(() => Math.random() - 0.5);
  
  for (const distractor of shuffled) {
    if (choices.length >= 4) break;
    if (!choices.some(c => Math.abs(c - distractor) < 0.01)) {
      choices.push(distractor);
    }
  }
  
  // Si pas assez de distracteurs, prendre des fractions communes quelconques
  if (choices.length < 4) {
    const allShuffled = [...commonFractions].sort(() => Math.random() - 0.5);
    for (const distractor of allShuffled) {
      if (choices.length >= 4) break;
      if (!choices.some(c => Math.abs(c - distractor) < 0.01)) {
        choices.push(distractor);
      }
    }
  }
  
  return choices.sort(() => Math.random() - 0.5);
};

// Convertir un exercice structuré en Exercise
const convertToExercise = (structured: StructuredExercise, level: number, isQCM = false): Exercise => {
  const answer = parseAnswer(structured.reponse);
  const exercise: Exercise = {
    id: generateId(),
    question: structured.enonce,
    answer,
    category: structured.type,
    level,
    hint: structured.astuce,
    isQCM,
  };
  
  if (isQCM) {
    exercise.choices = generateFractionChoices(answer);
  }
  
  return exercise;
};

// Fonction principale pour générer les exercices d'un niveau
// excludeFromLastAttempt: questions à exclure (du dernier essai) - MAINTENANT POUR TOUS LES NIVEAUX
export const generateLevelExercises = (
  level: number, 
  usedQuestions: Set<string>,
  failedQuestions: Exercise[] = [],
  excludeFromLastAttempt: Set<string> = new Set()
): Exercise[] => {
  // Vérifier si c'est un niveau spécial fractions
  const specialConfig = getSpecialLevelConfig(level);
  
  let structuredExercises: StructuredExercise[];
  let targetCount: number;
  let isQCM = false;
  
  if (level === 5.5) {
    // Fondamentaux - après niveau 5
    structuredExercises = getFondamentauxExercises();
    targetCount = 15;
    isQCM = false;
  } else if (level === 6.5) {
    // Fractions 1 - après niveau 6 - 20 questions parmi 60
    structuredExercises = niveauFractions1.exercices;
    targetCount = 20;
    isQCM = true;
  } else if (level === 8.5) {
    // Opérations - après niveau 8
    structuredExercises = getOperationsExercises();
    targetCount = 20;
    isQCM = false;
  } else if (level === 10.5) {
    // Fractions 2 - après niveau 10 - 20 questions parmi 60
    structuredExercises = niveauFractions2.exercices;
    targetCount = 20;
    isQCM = false;
  } else if (level === 0) {
    // Niveau Évaluation - 20 questions
    structuredExercises = getExercisesForLevel(level);
    targetCount = 20;
  } else if (level >= 1 && level <= 5) {
    // Niveaux 1-5: 15 questions parmi 30
    structuredExercises = getExercisesForLevel(level);
    targetCount = 15;
  } else if (level === 8) {
    structuredExercises = getExercisesForLevel(level);
    targetCount = 30;
  } else {
    structuredExercises = getExercisesForLevel(level);
    targetCount = 20;
  }
  
  if (structuredExercises.length === 0) {
    return [{
      id: generateId(),
      question: `Niveau ${level} - Exercices non disponibles`,
      answer: 0,
      category: "placeholder",
      level,
    }];
  }
  
  const exercises: Exercise[] = [];
  
  // D'abord ajouter les questions ratées du niveau précédent (max 2, sauf niveaux spéciaux)
  if (!specialConfig) {
    const failedToReuse = failedQuestions.slice(0, 2);
    failedToReuse.forEach(ex => {
      if (exercises.length < targetCount) {
        exercises.push({
          ...ex,
          id: generateId(),
        });
      }
    });
  }
  
  // Mélanger les exercices structurés
  const shuffled = [...structuredExercises].sort(() => Math.random() - 0.5);
  
  // POUR TOUS LES NIVEAUX: exclure les questions du dernier essai (éviter la mémorisation)
  // Ajouter les exercices en évitant les doublons ET les questions du dernier essai
  for (const structured of shuffled) {
    if (exercises.length >= targetCount) break;
    
    const questionKey = structured.enonce.toLowerCase().trim();
    
    // Vérifier si la question était dans le dernier essai (TOUS LES NIVEAUX maintenant)
    const wasInLastAttempt = excludeFromLastAttempt.has(structured.enonce);
    
    if (!usedQuestions.has(questionKey) && 
        !exercises.some(e => e.question === structured.enonce) &&
        !wasInLastAttempt) {
      const exercise = convertToExercise(structured, level, isQCM);
      exercises.push(exercise);
      usedQuestions.add(questionKey);
    }
  }
  
  // Si pas assez d'exercices (questions exclues trop nombreuses), prendre des questions exclues
  if (exercises.length < targetCount) {
    const remaining = shuffled.filter(s => !exercises.some(e => e.question === s.enonce));
    for (const structured of remaining) {
      if (exercises.length >= targetCount) break;
      const exercise = convertToExercise(structured, level, isQCM);
      exercises.push(exercise);
    }
  }
  
  // Pour les niveaux spéciaux, on peut répéter si nécessaire
  if (specialConfig && exercises.length < targetCount) {
    let index = 0;
    while (exercises.length < targetCount) {
      const structured = shuffled[index % shuffled.length];
      const exercise = convertToExercise(structured, level, isQCM);
      exercise.id = generateId(); // Nouvel ID
      exercises.push(exercise);
      index++;
    }
  }
  
  return exercises.sort(() => Math.random() - 0.5);
};

// Générateur de choix multiples pour les questions normales
export const generateChoices = (correctAnswer: number): number[] => {
  const choices = [correctAnswer];
  const isDecimal = correctAnswer % 1 !== 0;
  
  while (choices.length < 4) {
    let wrong: number;
    const offset = Math.floor(Math.random() * 10) + 1;
    
    if (isDecimal) {
      const decimalOffset = (Math.floor(Math.random() * 20) - 10) / 10;
      wrong = parseFloat((correctAnswer + decimalOffset).toFixed(2));
    } else {
      if (Math.random() > 0.5) {
        wrong = correctAnswer + offset;
      } else {
        wrong = Math.max(0, correctAnswer - offset);
      }
    }
    
    if (!choices.includes(wrong) && wrong !== correctAnswer && wrong >= 0) {
      choices.push(wrong);
    }
  }
  
  return choices.sort(() => Math.random() - 0.5);
};

// Obtenir les informations du niveau
export const getLevelInfo = (level: number): { 
  questionsCount: number; 
  timeSeconds: number; 
  isSpecial: boolean;
  name: string;
  allowWrittenCalc?: boolean;
  isEvaluation?: boolean;
  perfectScoreRequired?: boolean;
  maxErrors?: number;
} => {
  if (level === 0) {
    return { questionsCount: 20, timeSeconds: 1800, isSpecial: true, name: 'Évaluation', isEvaluation: true };
  }
  // Fondamentaux - après niveau 5
  if (level === 5.5) {
    return { questionsCount: 15, timeSeconds: 900, isSpecial: true, name: 'Fondamentaux', maxErrors: 1 };
  }
  // Fractions 1 - après niveau 6 - 20 questions, 15 min
  if (level === 6.5) {
    return { questionsCount: 20, timeSeconds: 900, isSpecial: true, name: 'Fractions 1', perfectScoreRequired: true };
  }
  // Opérations - après niveau 8
  if (level === 8.5) {
    return { questionsCount: 20, timeSeconds: 900, isSpecial: true, name: 'Opérations', maxErrors: 2 };
  }
  // Fractions 2 - après niveau 10 - 20 questions, 15 min
  if (level === 10.5) {
    return { questionsCount: 20, timeSeconds: 900, isSpecial: true, name: 'Fractions 2', perfectScoreRequired: true };
  }
  if (level === 20) {
    return { questionsCount: 20, timeSeconds: 1800, isSpecial: true, name: 'Niveau 20 - Élite', perfectScoreRequired: true };
  }
  // Niveaux 1-5: 15 questions, 8 minutes, 1 erreur autorisée
  if (level >= 1 && level <= 5) {
    return { questionsCount: 15, timeSeconds: 480, isSpecial: false, name: `Niveau ${level}`, maxErrors: 1 };
  }
  // Niveau 6: 15 minutes
  if (level === 6) {
    return { questionsCount: 20, timeSeconds: 900, isSpecial: false, name: `Niveau ${level}` };
  }
  // Niveaux 7, 9: 15 minutes
  if (level === 7 || level === 9) {
    return { questionsCount: 20, timeSeconds: 900, isSpecial: false, name: `Niveau ${level}` };
  }
  // Niveau 8: 15 minutes, 30 questions, 1 erreur max
  if (level === 8) {
    return { questionsCount: 30, timeSeconds: 900, isSpecial: false, name: `Niveau ${level}` };
  }
  // Niveau 10: 15 minutes
  if (level === 10) {
    return { questionsCount: 20, timeSeconds: 900, isSpecial: false, name: `Niveau ${level}` };
  }
  // Niveaux 16-17: 25 minutes
  if (level === 16 || level === 17) {
    return { questionsCount: 20, timeSeconds: 1500, isSpecial: false, name: `Niveau ${level}` };
  }
  // Niveaux 18-19: 15 minutes
  if (level >= 18 && level <= 19) {
    return { questionsCount: 20, timeSeconds: 900, isSpecial: false, name: `Niveau ${level}` };
  }
  // Niveaux 11-15: 12 minutes
  return { questionsCount: 20, timeSeconds: 720, isSpecial: false, name: `Niveau ${level}` };
};

// Liste de tous les niveaux dans l'ordre
// 0 = Évaluation, 1-5 puis Fondamentaux (5.5), 6 puis Fractions 1 (6.5), 7-8 puis Opérations (8.5), 9-10 puis Fractions 2 (10.5), 11-20
export const ALL_LEVELS = [0, 1, 2, 3, 4, 5, 5.5, 6, 6.5, 7, 8, 8.5, 9, 10, 10.5, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

// Obtenir le niveau suivant
export const getNextLevel = (currentLevel: number): number => {
  const currentIndex = ALL_LEVELS.indexOf(currentLevel);
  if (currentIndex === -1 || currentIndex === ALL_LEVELS.length - 1) {
    return currentLevel;
  }
  return ALL_LEVELS[currentIndex + 1];
};

// Obtenir l'index du niveau dans la progression
export const getLevelIndex = (level: number): number => {
  return ALL_LEVELS.indexOf(level);
};
