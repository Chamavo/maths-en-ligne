// Niveaux spéciaux de fractions
// Niveau 6.5 : QCM Fractions 1 (après niveau 6) - 60 questions en base, 20 par test
// Niveau 10.5 : Questions ouvertes Fractions 2 (après niveau 10) - 60 questions en base, 20 par test

import { StructuredExercise, NiveauData } from './structuredExercises';

// Niveau Fractions 1 (6.5) - 60 questions en base, 20 QCM par test, 15 minutes
export const niveauFractions1: NiveauData = {
  niveau: 6.5,
  duree: "15 mn",
  instructions: "Niveau Fractions 1 : 20 questions à choix multiples sur les opérations de fractions simples. Répondez sous forme de fraction simplifiée. En cas d'erreur, la correction s'affiche 10 secondes.",
  exercices: [
    // === ADDITIONS (15 questions) ===
    { enonce: "1/2 + 1/4 =", type: "fraction", reponse: 0.75, astuce: "= 2/4 + 1/4 = 3/4" },
    { enonce: "1/3 + 1/6 =", type: "fraction", reponse: 0.5, astuce: "= 2/6 + 1/6 = 3/6 = 1/2" },
    { enonce: "1/4 + 1/4 =", type: "fraction", reponse: 0.5, astuce: "= 2/4 = 1/2" },
    { enonce: "1/2 + 1/6 =", type: "fraction", reponse: 0.667, astuce: "= 3/6 + 1/6 = 4/6 = 2/3" },
    { enonce: "1/3 + 1/3 =", type: "fraction", reponse: 0.667, astuce: "= 2/3" },
    { enonce: "1/5 + 2/5 =", type: "fraction", reponse: 0.6, astuce: "= 3/5" },
    { enonce: "1/4 + 1/2 =", type: "fraction", reponse: 0.75, astuce: "= 1/4 + 2/4 = 3/4" },
    { enonce: "1/6 + 1/3 =", type: "fraction", reponse: 0.5, astuce: "= 1/6 + 2/6 = 3/6 = 1/2" },
    { enonce: "2/3 + 1/6 =", type: "fraction", reponse: 0.833, astuce: "= 4/6 + 1/6 = 5/6" },
    { enonce: "1/4 + 1/3 =", type: "fraction", reponse: 0.583, astuce: "= 3/12 + 4/12 = 7/12" },
    { enonce: "1/5 + 1/5 =", type: "fraction", reponse: 0.4, astuce: "= 2/5" },
    { enonce: "1/8 + 1/8 =", type: "fraction", reponse: 0.25, astuce: "= 2/8 = 1/4" },
    { enonce: "1/6 + 1/6 =", type: "fraction", reponse: 0.333, astuce: "= 2/6 = 1/3" },
    { enonce: "3/8 + 1/8 =", type: "fraction", reponse: 0.5, astuce: "= 4/8 = 1/2" },
    { enonce: "1/10 + 2/5 =", type: "fraction", reponse: 0.5, astuce: "= 1/10 + 4/10 = 5/10 = 1/2" },
    
    // === SOUSTRACTIONS (15 questions) ===
    { enonce: "1/2 − 1/4 =", type: "fraction", reponse: 0.25, astuce: "= 2/4 − 1/4 = 1/4" },
    { enonce: "3/4 − 1/2 =", type: "fraction", reponse: 0.25, astuce: "= 3/4 − 2/4 = 1/4" },
    { enonce: "2/3 − 1/3 =", type: "fraction", reponse: 0.333, astuce: "= 1/3" },
    { enonce: "5/6 − 1/2 =", type: "fraction", reponse: 0.333, astuce: "= 5/6 − 3/6 = 2/6 = 1/3" },
    { enonce: "1/2 − 1/6 =", type: "fraction", reponse: 0.333, astuce: "= 3/6 − 1/6 = 2/6 = 1/3" },
    { enonce: "3/4 − 1/4 =", type: "fraction", reponse: 0.5, astuce: "= 2/4 = 1/2" },
    { enonce: "2/3 − 1/6 =", type: "fraction", reponse: 0.5, astuce: "= 4/6 − 1/6 = 3/6 = 1/2" },
    { enonce: "3/4 − 1/3 =", type: "fraction", reponse: 0.417, astuce: "= 9/12 − 4/12 = 5/12" },
    { enonce: "4/5 − 2/5 =", type: "fraction", reponse: 0.4, astuce: "= 2/5" },
    { enonce: "5/6 − 1/3 =", type: "fraction", reponse: 0.5, astuce: "= 5/6 − 2/6 = 3/6 = 1/2" },
    { enonce: "7/8 − 1/2 =", type: "fraction", reponse: 0.375, astuce: "= 7/8 − 4/8 = 3/8" },
    { enonce: "3/5 − 1/5 =", type: "fraction", reponse: 0.4, astuce: "= 2/5" },
    { enonce: "5/6 − 2/3 =", type: "fraction", reponse: 0.167, astuce: "= 5/6 − 4/6 = 1/6" },
    { enonce: "7/10 − 1/2 =", type: "fraction", reponse: 0.2, astuce: "= 7/10 − 5/10 = 2/10 = 1/5" },
    { enonce: "9/10 − 2/5 =", type: "fraction", reponse: 0.5, astuce: "= 9/10 − 4/10 = 5/10 = 1/2" },
    
    // === MULTIPLICATIONS (15 questions) ===
    { enonce: "1/2 × 1/2 =", type: "fraction", reponse: 0.25, astuce: "= 1/4" },
    { enonce: "1/3 × 1/2 =", type: "fraction", reponse: 0.167, astuce: "= 1/6" },
    { enonce: "2/3 × 1/2 =", type: "fraction", reponse: 0.333, astuce: "= 2/6 = 1/3" },
    { enonce: "1/4 × 2 =", type: "fraction", reponse: 0.5, astuce: "= 2/4 = 1/2" },
    { enonce: "1/2 × 3/4 =", type: "fraction", reponse: 0.375, astuce: "= 3/8" },
    { enonce: "2/5 × 1/2 =", type: "fraction", reponse: 0.2, astuce: "= 2/10 = 1/5" },
    { enonce: "1/3 × 3 =", type: "fraction", reponse: 1, astuce: "= 3/3 = 1" },
    { enonce: "1/2 × 2/3 =", type: "fraction", reponse: 0.333, astuce: "= 2/6 = 1/3" },
    { enonce: "3/4 × 1/3 =", type: "fraction", reponse: 0.25, astuce: "= 3/12 = 1/4" },
    { enonce: "2/3 × 3/4 =", type: "fraction", reponse: 0.5, astuce: "= 6/12 = 1/2" },
    { enonce: "1/5 × 5 =", type: "fraction", reponse: 1, astuce: "= 5/5 = 1" },
    { enonce: "3/5 × 1/3 =", type: "fraction", reponse: 0.2, astuce: "= 3/15 = 1/5" },
    { enonce: "2/3 × 3 =", type: "fraction", reponse: 2, astuce: "= 6/3 = 2" },
    { enonce: "4/5 × 1/2 =", type: "fraction", reponse: 0.4, astuce: "= 4/10 = 2/5" },
    { enonce: "1/6 × 3 =", type: "fraction", reponse: 0.5, astuce: "= 3/6 = 1/2" },
    
    // === DIVISIONS (15 questions) ===
    { enonce: "1/2 ÷ 2 =", type: "fraction", reponse: 0.25, astuce: "= 1/2 × 1/2 = 1/4" },
    { enonce: "1/3 ÷ 2 =", type: "fraction", reponse: 0.167, astuce: "= 1/3 × 1/2 = 1/6" },
    { enonce: "1/4 ÷ 2 =", type: "fraction", reponse: 0.125, astuce: "= 1/4 × 1/2 = 1/8" },
    { enonce: "2/3 ÷ 2 =", type: "fraction", reponse: 0.333, astuce: "= 2/3 × 1/2 = 1/3" },
    { enonce: "3/4 ÷ 3 =", type: "fraction", reponse: 0.25, astuce: "= 3/4 × 1/3 = 1/4" },
    { enonce: "1/2 ÷ 1/4 =", type: "fraction", reponse: 2, astuce: "= 1/2 × 4 = 2" },
    { enonce: "1 ÷ 1/2 =", type: "fraction", reponse: 2, astuce: "= 1 × 2 = 2" },
    { enonce: "1/4 ÷ 1/2 =", type: "fraction", reponse: 0.5, astuce: "= 1/4 × 2 = 1/2" },
    { enonce: "2/3 ÷ 3 =", type: "fraction", reponse: 0.222, astuce: "= 2/3 × 1/3 = 2/9" },
    { enonce: "3/5 ÷ 3 =", type: "fraction", reponse: 0.2, astuce: "= 3/5 × 1/3 = 1/5" },
    { enonce: "4/5 ÷ 2 =", type: "fraction", reponse: 0.4, astuce: "= 4/5 × 1/2 = 2/5" },
    { enonce: "1/3 ÷ 1/3 =", type: "fraction", reponse: 1, astuce: "= 1/3 × 3 = 1" },
    { enonce: "2/5 ÷ 2 =", type: "fraction", reponse: 0.2, astuce: "= 2/5 × 1/2 = 1/5" },
    { enonce: "5/6 ÷ 5 =", type: "fraction", reponse: 0.167, astuce: "= 5/6 × 1/5 = 1/6" },
    { enonce: "3/4 ÷ 1/4 =", type: "fraction", reponse: 3, astuce: "= 3/4 × 4 = 3" },
  ]
};

// Niveau Fractions 2 (10.5) - 60 questions en base, 20 questions ouvertes par test, 15 minutes
export const niveauFractions2: NiveauData = {
  niveau: 10.5,
  duree: "15 mn",
  instructions: "Niveau Fractions 2 : 20 questions ouvertes sur les opérations de fractions. Répondez uniquement sous forme de fraction simplifiée (ex: 1/2, 3/4)",
  exercices: [
    // === ADDITIONS COMPLEXES (15 questions) ===
    { enonce: "1/2 + 1/3 =", type: "fraction", reponse: 0.833, astuce: "= 3/6 + 2/6 = 5/6" },
    { enonce: "2/3 + 1/4 =", type: "fraction", reponse: 0.917, astuce: "= 8/12 + 3/12 = 11/12" },
    { enonce: "1/4 + 2/5 =", type: "fraction", reponse: 0.65, astuce: "= 5/20 + 8/20 = 13/20" },
    { enonce: "3/4 + 1/6 =", type: "fraction", reponse: 0.917, astuce: "= 9/12 + 2/12 = 11/12" },
    { enonce: "1/3 + 2/5 =", type: "fraction", reponse: 0.733, astuce: "= 5/15 + 6/15 = 11/15" },
    { enonce: "2/5 + 1/3 =", type: "fraction", reponse: 0.733, astuce: "= 6/15 + 5/15 = 11/15" },
    { enonce: "1/6 + 1/4 =", type: "fraction", reponse: 0.417, astuce: "= 2/12 + 3/12 = 5/12" },
    { enonce: "3/5 + 1/4 =", type: "fraction", reponse: 0.85, astuce: "= 12/20 + 5/20 = 17/20" },
    { enonce: "2/9 + 1/3 =", type: "fraction", reponse: 0.556, astuce: "= 2/9 + 3/9 = 5/9" },
    { enonce: "1/4 + 3/8 =", type: "fraction", reponse: 0.625, astuce: "= 2/8 + 3/8 = 5/8" },
    { enonce: "2/5 + 3/10 =", type: "fraction", reponse: 0.7, astuce: "= 4/10 + 3/10 = 7/10" },
    { enonce: "1/3 + 1/9 =", type: "fraction", reponse: 0.444, astuce: "= 3/9 + 1/9 = 4/9" },
    { enonce: "5/8 + 1/4 =", type: "fraction", reponse: 0.875, astuce: "= 5/8 + 2/8 = 7/8" },
    { enonce: "1/6 + 2/9 =", type: "fraction", reponse: 0.389, astuce: "= 3/18 + 4/18 = 7/18" },
    { enonce: "3/8 + 1/4 =", type: "fraction", reponse: 0.625, astuce: "= 3/8 + 2/8 = 5/8" },
    
    // === SOUSTRACTIONS COMPLEXES (15 questions) ===
    { enonce: "2/3 − 1/4 =", type: "fraction", reponse: 0.417, astuce: "= 8/12 − 3/12 = 5/12" },
    { enonce: "3/4 − 1/3 =", type: "fraction", reponse: 0.417, astuce: "= 9/12 − 4/12 = 5/12" },
    { enonce: "5/6 − 1/4 =", type: "fraction", reponse: 0.583, astuce: "= 10/12 − 3/12 = 7/12" },
    { enonce: "4/5 − 1/2 =", type: "fraction", reponse: 0.3, astuce: "= 8/10 − 5/10 = 3/10" },
    { enonce: "2/3 − 2/5 =", type: "fraction", reponse: 0.267, astuce: "= 10/15 − 6/15 = 4/15" },
    { enonce: "3/4 − 2/5 =", type: "fraction", reponse: 0.35, astuce: "= 15/20 − 8/20 = 7/20" },
    { enonce: "5/6 − 2/3 =", type: "fraction", reponse: 0.167, astuce: "= 5/6 − 4/6 = 1/6" },
    { enonce: "7/8 − 1/4 =", type: "fraction", reponse: 0.625, astuce: "= 7/8 − 2/8 = 5/8" },
    { enonce: "5/6 − 1/9 =", type: "fraction", reponse: 0.722, astuce: "= 15/18 − 2/18 = 13/18" },
    { enonce: "4/5 − 1/3 =", type: "fraction", reponse: 0.467, astuce: "= 12/15 − 5/15 = 7/15" },
    { enonce: "5/8 − 1/4 =", type: "fraction", reponse: 0.375, astuce: "= 5/8 − 2/8 = 3/8" },
    { enonce: "7/9 − 1/3 =", type: "fraction", reponse: 0.444, astuce: "= 7/9 − 3/9 = 4/9" },
    { enonce: "11/12 − 1/4 =", type: "fraction", reponse: 0.667, astuce: "= 11/12 − 3/12 = 8/12 = 2/3" },
    { enonce: "3/5 − 1/4 =", type: "fraction", reponse: 0.35, astuce: "= 12/20 − 5/20 = 7/20" },
    { enonce: "8/9 − 2/3 =", type: "fraction", reponse: 0.222, astuce: "= 8/9 − 6/9 = 2/9" },
    
    // === MULTIPLICATIONS COMPLEXES (15 questions) ===
    { enonce: "2/3 × 3/4 =", type: "fraction", reponse: 0.5, astuce: "= 6/12 = 1/2" },
    { enonce: "1/2 × 4/5 =", type: "fraction", reponse: 0.4, astuce: "= 4/10 = 2/5" },
    { enonce: "3/4 × 2/3 =", type: "fraction", reponse: 0.5, astuce: "= 6/12 = 1/2" },
    { enonce: "2/5 × 5/6 =", type: "fraction", reponse: 0.333, astuce: "= 10/30 = 1/3" },
    { enonce: "3/5 × 2/3 =", type: "fraction", reponse: 0.4, astuce: "= 6/15 = 2/5" },
    { enonce: "1/3 × 3/5 =", type: "fraction", reponse: 0.2, astuce: "= 3/15 = 1/5" },
    { enonce: "4/5 × 1/4 =", type: "fraction", reponse: 0.2, astuce: "= 4/20 = 1/5" },
    { enonce: "3/8 × 4/5 =", type: "fraction", reponse: 0.3, astuce: "= 12/40 = 3/10" },
    { enonce: "5/6 × 3/5 =", type: "fraction", reponse: 0.5, astuce: "= 15/30 = 1/2" },
    { enonce: "2/3 × 9/10 =", type: "fraction", reponse: 0.6, astuce: "= 18/30 = 3/5" },
    { enonce: "3/4 × 4/9 =", type: "fraction", reponse: 0.333, astuce: "= 12/36 = 1/3" },
    { enonce: "5/8 × 2/5 =", type: "fraction", reponse: 0.25, astuce: "= 10/40 = 1/4" },
    { enonce: "4/9 × 3/4 =", type: "fraction", reponse: 0.333, astuce: "= 12/36 = 1/3" },
    { enonce: "7/8 × 4/7 =", type: "fraction", reponse: 0.5, astuce: "= 28/56 = 1/2" },
    { enonce: "2/3 × 3/8 =", type: "fraction", reponse: 0.25, astuce: "= 6/24 = 1/4" },
    
    // === DIVISIONS COMPLEXES (15 questions) ===
    { enonce: "1/2 ÷ 1/3 =", type: "fraction", reponse: 1.5, astuce: "= 1/2 × 3 = 3/2" },
    { enonce: "2/3 ÷ 1/2 =", type: "fraction", reponse: 1.333, astuce: "= 2/3 × 2 = 4/3" },
    { enonce: "3/4 ÷ 1/2 =", type: "fraction", reponse: 1.5, astuce: "= 3/4 × 2 = 3/2" },
    { enonce: "1/3 ÷ 1/4 =", type: "fraction", reponse: 1.333, astuce: "= 1/3 × 4 = 4/3" },
    { enonce: "2/5 ÷ 1/3 =", type: "fraction", reponse: 1.2, astuce: "= 2/5 × 3 = 6/5" },
    { enonce: "3/5 ÷ 2 =", type: "fraction", reponse: 0.3, astuce: "= 3/5 × 1/2 = 3/10" },
    { enonce: "4/5 ÷ 2 =", type: "fraction", reponse: 0.4, astuce: "= 4/5 × 1/2 = 2/5" },
    { enonce: "5/6 ÷ 5 =", type: "fraction", reponse: 0.167, astuce: "= 5/6 × 1/5 = 1/6" },
    { enonce: "3/4 ÷ 3/8 =", type: "fraction", reponse: 2, astuce: "= 3/4 × 8/3 = 2" },
    { enonce: "2/3 ÷ 4/9 =", type: "fraction", reponse: 1.5, astuce: "= 2/3 × 9/4 = 3/2" },
    { enonce: "5/8 ÷ 5/4 =", type: "fraction", reponse: 0.5, astuce: "= 5/8 × 4/5 = 1/2" },
    { enonce: "4/9 ÷ 2/3 =", type: "fraction", reponse: 0.667, astuce: "= 4/9 × 3/2 = 2/3" },
    { enonce: "3/5 ÷ 6/5 =", type: "fraction", reponse: 0.5, astuce: "= 3/5 × 5/6 = 1/2" },
    { enonce: "7/8 ÷ 7/4 =", type: "fraction", reponse: 0.5, astuce: "= 7/8 × 4/7 = 1/2" },
    { enonce: "5/6 ÷ 2/3 =", type: "fraction", reponse: 1.25, astuce: "= 5/6 × 3/2 = 5/4" },
  ]
};

// Générer les choix multiples pour le niveau Fractions 1
export const generateFractionChoices = (correctAnswer: number): number[] => {
  const choices = [correctAnswer];
  
  // Fractions communes comme distracteurs
  const commonFractions = [
    0.25, 0.333, 0.5, 0.667, 0.75, 0.167, 0.125, 0.375, 0.625, 0.875,
    0.2, 0.4, 0.6, 0.8, 1, 1.5, 2, 0.833, 0.917, 0.222, 0.444, 0.556, 0.778
  ];
  
  // Filtrer pour avoir des distracteurs proches mais différents
  const possibleDistractors = commonFractions.filter(f => 
    Math.abs(f - correctAnswer) >= 0.05 && Math.abs(f - correctAnswer) <= 1
  );
  
  // Mélanger et prendre 3 distracteurs
  const shuffled = [...possibleDistractors].sort(() => Math.random() - 0.5);
  
  for (const distractor of shuffled) {
    if (choices.length >= 4) break;
    if (!choices.some(c => Math.abs(c - distractor) < 0.01)) {
      choices.push(distractor);
    }
  }
  
  // Si pas assez de distracteurs, en générer
  while (choices.length < 4) {
    const offset = (Math.random() - 0.5) * 0.5;
    const distractor = Math.max(0, correctAnswer + offset);
    const rounded = Math.round(distractor * 100) / 100;
    if (!choices.some(c => Math.abs(c - rounded) < 0.05)) {
      choices.push(rounded);
    }
  }
  
  return choices.sort(() => Math.random() - 0.5);
};

// Format fraction pour affichage - mappings complets décimal → fraction
export const formatAsFraction = (decimal: number): string => {
  const fractions: [number, string][] = [
    // Fractions de base
    [0.125, '1/8'], [0.167, '1/6'], [0.2, '1/5'], [0.222, '2/9'], [0.25, '1/4'],
    [0.333, '1/3'], [0.375, '3/8'], [0.389, '7/18'], [0.4, '2/5'], [0.417, '5/12'],
    [0.444, '4/9'], [0.467, '7/15'], [0.5, '1/2'], [0.556, '5/9'],
    [0.583, '7/12'], [0.6, '3/5'], [0.625, '5/8'], [0.65, '13/20'], 
    [0.667, '2/3'], [0.7, '7/10'], [0.722, '13/18'], [0.733, '11/15'],
    [0.75, '3/4'], [0.778, '7/9'], [0.8, '4/5'], [0.833, '5/6'], 
    [0.85, '17/20'], [0.875, '7/8'], [0.889, '8/9'], [0.917, '11/12'],
    [1, '1'], [1.2, '6/5'], [1.25, '5/4'], [1.333, '4/3'], [1.5, '3/2'], [2, '2'], [3, '3'],
    // Fractions additionnelles
    [0.111, '1/9'], [0.267, '4/15'], [0.3, '3/10'], [0.35, '7/20'],
  ];
  
  for (const [val, frac] of fractions) {
    if (Math.abs(decimal - val) < 0.01) {
      return frac;
    }
  }
  
  return decimal.toFixed(2);
};

// Vérifier si un niveau est un niveau spécial fractions
export const isSpecialFractionLevel = (level: number): boolean => {
  return level === 6.5 || level === 10.5;
};

// Obtenir la configuration du niveau spécial
export const getSpecialLevelConfig = (level: number): {
  questionsCount: number;
  timeSeconds: number;
  isQCM: boolean;
  totalPoolSize: number;
} | null => {
  if (level === 6.5) {
    return { questionsCount: 20, timeSeconds: 900, isQCM: true, totalPoolSize: 60 }; // 20 questions, 15 min, pool de 60
  }
  if (level === 10.5) {
    return { questionsCount: 20, timeSeconds: 900, isQCM: false, totalPoolSize: 60 }; // 20 questions, 15 min, pool de 60
  }
  return null;
};
