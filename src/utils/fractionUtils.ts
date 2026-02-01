// Utilitaires pour la gestion des fractions et du temps

/**
 * Parse une chaîne de temps au format HH:mm et retourne le total en minutes
 */
export const parseTime = (input: string): number | null => {
  const trimmed = input.trim();
  
  // Format HH:mm ou H:mm
  const timeMatch = trimmed.match(/^(\d{1,2}):(\d{2})$/);
  if (timeMatch) {
    const hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);
    if (minutes >= 60) return null;
    return hours * 60 + minutes;
  }
  
  // Format avec "h" (ex: "2h30" ou "2h 30" ou "2h30min")
  const hFormatMatch = trimmed.match(/^(\d{1,2})h\s*(\d{0,2})\s*(min)?$/i);
  if (hFormatMatch) {
    const hours = parseInt(hFormatMatch[1], 10);
    const minutes = hFormatMatch[2] ? parseInt(hFormatMatch[2], 10) : 0;
    if (minutes >= 60) return null;
    return hours * 60 + minutes;
  }
  
  return null;
};

/**
 * Vérifie si une question attend une réponse en format temps (HH:mm)
 * Exclut les questions de vitesse qui attendent un nombre décimal
 */
export const isTimeQuestion = (question: string): boolean => {
  // Si c'est une question de vitesse (combien de temps + km/h), la réponse est en nombre décimal
  const speedPattern = /km\/h|vitesse|parcour/i;
  if (speedPattern.test(question)) {
    return false;
  }
  
  const timePatterns = [
    /durée du trajet/i,
    /dure le trajet/i,
    /\d+h\s*\d*\s*(min)?.*[+−\-×÷]/i,
    /\d+:\d+/,
    /débute.*finit/i,
    /parti.*arrivé/i,
    /part.*arrive/i,
    /à quelle heure/i,
    /quelle heure/i,
    /heure d['']arrivée/i,
    /heure de départ/i,
  ];
  return timePatterns.some(pattern => pattern.test(question));
};

/**
 * Vérifie si une catégorie d'exercice est liée au temps
 */
export const isTimeCategory = (category: string): boolean => {
  return category === 'temps' || category === 'duree' || category === 'durée';
};

/**
 * Parse une chaîne de fraction (ex: "1/2", "3/4") et retourne sa valeur décimale
 * Supporte aussi les nombres décimaux directs et les formats temps
 */
export const parseFraction = (input: string): number | null => {
  const trimmed = input.trim();
  
  // Si c'est vide
  if (!trimmed) return null;
  
  // Essayer de parser comme temps (HH:mm ou Xh Ymin)
  const timeValue = parseTime(trimmed);
  if (timeValue !== null) {
    return timeValue;
  }
  
  // Essayer de parser comme fraction (ex: "1/2", "3/4")
  const fractionMatch = trimmed.match(/^(-?\d+)\s*\/\s*(\d+)$/);
  if (fractionMatch) {
    const numerator = parseInt(fractionMatch[1], 10);
    const denominator = parseInt(fractionMatch[2], 10);
    if (denominator === 0) return null;
    return numerator / denominator;
  }
  
  // Essayer de parser comme nombre mixte (ex: "1 1/2" = 1.5)
  const mixedMatch = trimmed.match(/^(-?\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (mixedMatch) {
    const whole = parseInt(mixedMatch[1], 10);
    const numerator = parseInt(mixedMatch[2], 10);
    const denominator = parseInt(mixedMatch[3], 10);
    if (denominator === 0) return null;
    const sign = whole < 0 ? -1 : 1;
    return whole + sign * (numerator / denominator);
  }
  
  // Essayer de parser comme nombre décimal normal
  const num = parseFloat(trimmed.replace(',', '.'));
  if (!isNaN(num)) {
    return num;
  }
  
  return null;
};

/**
 * Vérifie si une entrée est au format fraction (ex: "1/2", "3/4", "1 1/2")
 */
export const isInputFractionFormat = (input: string): boolean => {
  const trimmed = input.trim();
  
  // Format fraction simple (ex: "1/2", "3/4")
  const fractionMatch = trimmed.match(/^(-?\d+)\s*\/\s*(\d+)$/);
  if (fractionMatch) return true;
  
  // Format nombre mixte (ex: "1 1/2")
  const mixedMatch = trimmed.match(/^(-?\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (mixedMatch) return true;
  
  return false;
};

/**
 * Vérifie si une question est une opération sur des fractions (addition, soustraction, multiplication, division)
 */
export const isFractionOperationQuestion = (question: string): boolean => {
  // Détecte les opérations comme "1/2 + 1/4 =", "2/3 × 1/2 =", etc.
  const fractionOpPattern = /\d+\s*\/\s*\d+\s*[+−\-×÷*\/]\s*(\d+\s*\/\s*\d+|\d+)/;
  return fractionOpPattern.test(question);
};

/**
 * Formate un nombre de minutes en format HH:mm
 */
export const formatTimeFromMinutes = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h${mins.toString().padStart(2, '0')}`;
};

/**
 * Vérifie si deux nombres sont égaux avec une tolérance
 */
export const areAnswersEqual = (userAnswer: number, correctAnswer: number, tolerance = 0.01): boolean => {
  return Math.abs(userAnswer - correctAnswer) < tolerance;
};

/**
 * Formate une réponse pour l'affichage
 * Convertit les décimaux simples en fractions si possible
 */
export const formatAnswer = (answer: number | string): string => {
  if (typeof answer === 'string') {
    return answer;
  }
  
  // Fractions communes à afficher
  const commonFractions: Record<string, string> = {
    '0.5': '1/2',
    '0.25': '1/4',
    '0.75': '3/4',
    '0.333': '1/3',
    '0.667': '2/3',
    '0.166': '1/6',
    '0.833': '5/6',
    '0.2': '1/5',
    '0.4': '2/5',
    '0.6': '3/5',
    '0.8': '4/5',
    '0.125': '1/8',
    '0.375': '3/8',
    '0.625': '5/8',
    '0.875': '7/8',
  };
  
  // Arrondir à 3 décimales pour la comparaison
  const rounded = Math.abs(answer).toFixed(3);
  
  // Vérifier si c'est une fraction commune
  for (const [decimal, fraction] of Object.entries(commonFractions)) {
    if (Math.abs(parseFloat(decimal) - Math.abs(answer)) < 0.005) {
      return answer < 0 ? `-${fraction}` : fraction;
    }
  }
  
  // Sinon retourner le nombre formaté
  if (Number.isInteger(answer)) {
    return answer.toString();
  }
  return answer.toFixed(2);
};

/**
 * Vérifie si une question attend une réponse en fraction
 */
export const isFractionQuestion = (question: string): boolean => {
  // Questions d'opérations sur fractions (ex: "1/2 + 1/4 =")
  const fractionOpPattern = /\d+\s*\/\s*\d+.*[+−\-×÷]/;
  return fractionOpPattern.test(question);
};

/**
 * Génère une représentation décimale plus lisible
 */
export const decimalToFractionHint = (decimal: number): string | null => {
  const fractions: [number, string][] = [
    [0.5, '1/2'],
    [0.25, '1/4'],
    [0.75, '3/4'],
    [0.333, '1/3'],
    [0.667, '2/3'],
    [0.166, '1/6'],
    [0.833, '5/6'],
    [0.5, '1/2'],
  ];
  
  for (const [val, frac] of fractions) {
    if (Math.abs(decimal - val) < 0.01) {
      return frac;
    }
  }
  
  return null;
};
