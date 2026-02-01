// Structure d'exercices par niveau - Format JSON importable
// Chaque niveau contient des exercices avec énoncé, type, réponse et astuce

export interface StructuredExercise {
  enonce: string;
  type: string;
  reponse: number | string;
  astuce: string;
}

export interface NiveauData {
  niveau: number;
  duree: string;
  instructions: string;
  exercices: StructuredExercise[];
}

// Niveaux 1 à 20
export const niveaux: NiveauData[] = [
  {
    niveau: 1,
    duree: "8 mn",
    instructions: "Calcul mental uniquement. Additions et soustractions avec et sans passage de dizaine (résultats ≤ 100). 15 questions parmi 30, 1 erreur autorisée.",
    exercices: [
      { enonce: "8 + 7 =", type: "addition", reponse: 15, astuce: "Passage de dizaine" },
      { enonce: "14 − 9 =", type: "soustraction", reponse: 5, astuce: "Passage de dizaine" },
      { enonce: "27 + 8 =", type: "addition", reponse: 35, astuce: "Passage de dizaine" },
      { enonce: "20 − 9 =", type: "soustraction", reponse: 11, astuce: "Passage de dizaine" },
      { enonce: "46 + 7 =", type: "addition", reponse: 53, astuce: "Passage de dizaine" },
      { enonce: "32 − 8 =", type: "soustraction", reponse: 24, astuce: "Passage de dizaine" },
      { enonce: "58 + 6 =", type: "addition", reponse: 64, astuce: "Passage de dizaine" },
      { enonce: "41 − 7 =", type: "soustraction", reponse: 34, astuce: "Passage de dizaine" },
      { enonce: "9 + 8 =", type: "addition", reponse: 17, astuce: "Passage de dizaine" },
      { enonce: "15 − 7 =", type: "soustraction", reponse: 8, astuce: "Passage de dizaine" },
      { enonce: "64 + 9 =", type: "addition", reponse: 73, astuce: "Passage de dizaine" },
      { enonce: "70 − 8 =", type: "soustraction", reponse: 62, astuce: "Passage de dizaine" },
      { enonce: "37 + 5 =", type: "addition", reponse: 42, astuce: "Passage de dizaine" },
      { enonce: "53 − 6 =", type: "soustraction", reponse: 47, astuce: "Passage de dizaine" },
      { enonce: "28 + 7 =", type: "addition", reponse: 35, astuce: "Passage de dizaine" },
      { enonce: "90 − 8 =", type: "soustraction", reponse: 82, astuce: "Passage de dizaine" },
      { enonce: "49 + 6 =", type: "addition", reponse: 55, astuce: "Passage de dizaine" },
      { enonce: "61 − 9 =", type: "soustraction", reponse: 52, astuce: "Passage de dizaine" },
      { enonce: "75 + 8 =", type: "addition", reponse: 83, astuce: "Passage de dizaine" },
      { enonce: "100 − 9 =", type: "soustraction", reponse: 91, astuce: "Passage de dizaine" },
      // 10 exercices supplémentaires pour atteindre 30
      { enonce: "17 + 6 =", type: "addition", reponse: 23, astuce: "Passage de dizaine" },
      { enonce: "43 − 7 =", type: "soustraction", reponse: 36, astuce: "Passage de dizaine" },
      { enonce: "55 + 9 =", type: "addition", reponse: 64, astuce: "Passage de dizaine" },
      { enonce: "82 − 6 =", type: "soustraction", reponse: 76, astuce: "Passage de dizaine" },
      { enonce: "38 + 4 =", type: "addition", reponse: 42, astuce: "Passage de dizaine" },
      { enonce: "67 − 9 =", type: "soustraction", reponse: 58, astuce: "Passage de dizaine" },
      { enonce: "76 + 7 =", type: "addition", reponse: 83, astuce: "Passage de dizaine" },
      { enonce: "44 − 5 =", type: "soustraction", reponse: 39, astuce: "Passage de dizaine" },
      { enonce: "89 + 5 =", type: "addition", reponse: 94, astuce: "Passage de dizaine" },
      { enonce: "50 − 7 =", type: "soustraction", reponse: 43, astuce: "Passage de dizaine" },
    ]
  },
  {
    niveau: 2,
    duree: "8 mn",
    instructions: "Multiplications et divisions par 0,1 - 0,01 - 10 - 100 - 1000 - 0,5 - 0,25. 15 questions parmi 30, 1 erreur autorisée.",
    exercices: [
      // Multiplications par 10
      { enonce: "45 × 10 =", type: "multiplication", reponse: 450, astuce: "Déplacer la virgule d'1 rang vers la droite" },
      { enonce: "7,3 × 10 =", type: "multiplication", reponse: 73, astuce: "7,3 → 73" },
      { enonce: "0,56 × 10 =", type: "multiplication", reponse: 5.6, astuce: "0,56 → 5,6" },
      // Divisions par 10
      { enonce: "340 ÷ 10 =", type: "division", reponse: 34, astuce: "Déplacer la virgule d'1 rang vers la gauche" },
      { enonce: "8,5 ÷ 10 =", type: "division", reponse: 0.85, astuce: "8,5 → 0,85" },
      // Multiplications par 100
      { enonce: "3,7 × 100 =", type: "multiplication", reponse: 370, astuce: "Déplacer la virgule de 2 rangs vers la droite" },
      { enonce: "0,45 × 100 =", type: "multiplication", reponse: 45, astuce: "0,45 → 45" },
      // Divisions par 100
      { enonce: "750 ÷ 100 =", type: "division", reponse: 7.5, astuce: "750 → 7,5" },
      { enonce: "43 ÷ 100 =", type: "division", reponse: 0.43, astuce: "43 → 0,43" },
      // Multiplications par 1000
      { enonce: "2,5 × 1000 =", type: "multiplication", reponse: 2500, astuce: "Déplacer la virgule de 3 rangs vers la droite" },
      { enonce: "0,078 × 1000 =", type: "multiplication", reponse: 78, astuce: "0,078 → 78" },
      // Divisions par 1000
      { enonce: "4500 ÷ 1000 =", type: "division", reponse: 4.5, astuce: "4500 → 4,5" },
      { enonce: "320 ÷ 1000 =", type: "division", reponse: 0.32, astuce: "320 → 0,32" },
      // Multiplications par 0,1 (= diviser par 10)
      { enonce: "80 × 0,1 =", type: "multiplication", reponse: 8, astuce: "Multiplier par 0,1 = diviser par 10" },
      { enonce: "25 × 0,1 =", type: "multiplication", reponse: 2.5, astuce: "25 → 2,5" },
      // Multiplications par 0,01 (= diviser par 100)
      { enonce: "600 × 0,01 =", type: "multiplication", reponse: 6, astuce: "Multiplier par 0,01 = diviser par 100" },
      { enonce: "75 × 0,01 =", type: "multiplication", reponse: 0.75, astuce: "75 → 0,75" },
      // Multiplications par 0,5 (= diviser par 2)
      { enonce: "48 × 0,5 =", type: "multiplication", reponse: 24, astuce: "Multiplier par 0,5 = diviser par 2" },
      { enonce: "150 × 0,5 =", type: "multiplication", reponse: 75, astuce: "150 ÷ 2 = 75" },
      // Multiplications par 0,25 (= diviser par 4)
      { enonce: "80 × 0,25 =", type: "multiplication", reponse: 20, astuce: "Multiplier par 0,25 = diviser par 4" },
      // 10 exercices supplémentaires pour atteindre 30
      { enonce: "120 × 0,25 =", type: "multiplication", reponse: 30, astuce: "120 ÷ 4 = 30" },
      { enonce: "6,4 × 10 =", type: "multiplication", reponse: 64, astuce: "Décaler d'1 rang à droite" },
      { enonce: "920 ÷ 100 =", type: "division", reponse: 9.2, astuce: "920 → 9,2" },
      { enonce: "0,8 × 1000 =", type: "multiplication", reponse: 800, astuce: "0,8 → 800" },
      { enonce: "55 × 0,1 =", type: "multiplication", reponse: 5.5, astuce: "55 → 5,5" },
      { enonce: "200 × 0,01 =", type: "multiplication", reponse: 2, astuce: "200 → 2" },
      { enonce: "64 × 0,5 =", type: "multiplication", reponse: 32, astuce: "64 ÷ 2 = 32" },
      { enonce: "200 × 0,25 =", type: "multiplication", reponse: 50, astuce: "200 ÷ 4 = 50" },
      { enonce: "3,25 × 100 =", type: "multiplication", reponse: 325, astuce: "3,25 → 325" },
      { enonce: "15 ÷ 1000 =", type: "division", reponse: 0.015, astuce: "15 → 0,015" },
    ]
  },
  {
    niveau: 3,
    duree: "8 mn",
    instructions: "Calcul mental uniquement. Additions, soustractions et premières multiplications/divisions simples. 15 questions parmi 30, 1 erreur autorisée.",
    exercices: [
      { enonce: "38 + 7 =", type: "addition", reponse: 45, astuce: "Passage de dizaine" },
      { enonce: "62 − 9 =", type: "soustraction", reponse: 53, astuce: "Passage de dizaine" },
      { enonce: "47 + 8 =", type: "addition", reponse: 55, astuce: "Passage de dizaine" },
      { enonce: "80 − 7 =", type: "soustraction", reponse: 73, astuce: "Passage de dizaine" },
      { enonce: "6 × 4 =", type: "multiplication", reponse: 24, astuce: "Tables de multiplication" },
      { enonce: "7 × 5 =", type: "multiplication", reponse: 35, astuce: "Tables de multiplication" },
      { enonce: "8 × 3 =", type: "multiplication", reponse: 24, astuce: "Tables de multiplication" },
      { enonce: "9 × 4 =", type: "multiplication", reponse: 36, astuce: "Tables de multiplication" },
      { enonce: "6 × 5 =", type: "multiplication", reponse: 30, astuce: "Tables de multiplication" },
      { enonce: "7 × 8 =", type: "multiplication", reponse: 56, astuce: "Tables de multiplication" },
      { enonce: "9 × 6 =", type: "multiplication", reponse: 54, astuce: "Tables de multiplication" },
      { enonce: "8 × 7 =", type: "multiplication", reponse: 56, astuce: "Tables de multiplication" },
      { enonce: "24 ÷ 6 =", type: "division", reponse: 4, astuce: "Division simple" },
      { enonce: "35 ÷ 5 =", type: "division", reponse: 7, astuce: "Division simple" },
      { enonce: "42 ÷ 6 =", type: "division", reponse: 7, astuce: "Division simple" },
      { enonce: "56 ÷ 8 =", type: "division", reponse: 7, astuce: "Division simple" },
      { enonce: "54 + 9 =", type: "addition", reponse: 63, astuce: "Passage de dizaine" },
      { enonce: "71 − 8 =", type: "soustraction", reponse: 63, astuce: "Passage de dizaine" },
      { enonce: "65 + 7 =", type: "addition", reponse: 72, astuce: "Passage de dizaine" },
      { enonce: "90 − 8 =", type: "soustraction", reponse: 82, astuce: "Passage de dizaine" },
      // 10 exercices supplémentaires pour atteindre 30
      { enonce: "4 × 9 =", type: "multiplication", reponse: 36, astuce: "Tables de multiplication" },
      { enonce: "63 ÷ 7 =", type: "division", reponse: 9, astuce: "Division simple" },
      { enonce: "5 × 8 =", type: "multiplication", reponse: 40, astuce: "Tables de multiplication" },
      { enonce: "48 ÷ 6 =", type: "division", reponse: 8, astuce: "Division simple" },
      { enonce: "83 + 9 =", type: "addition", reponse: 92, astuce: "Passage de dizaine" },
      { enonce: "45 − 8 =", type: "soustraction", reponse: 37, astuce: "Passage de dizaine" },
      { enonce: "6 × 6 =", type: "multiplication", reponse: 36, astuce: "Tables de multiplication" },
      { enonce: "72 ÷ 9 =", type: "division", reponse: 8, astuce: "Division simple" },
      { enonce: "3 × 9 =", type: "multiplication", reponse: 27, astuce: "Tables de multiplication" },
      { enonce: "81 ÷ 9 =", type: "division", reponse: 9, astuce: "Division simple" },
    ]
  },
  {
    niveau: 4,
    duree: "8 mn",
    instructions: "Additions, soustractions ≤ 100 et fractions simples (1/2, 1/3, 1/4). 15 questions parmi 30, 1 erreur autorisée.",
    exercices: [
      { enonce: "45 + 23 =", type: "addition", reponse: 68, astuce: "Nombres ≤ 100" },
      { enonce: "78 − 34 =", type: "soustraction", reponse: 44, astuce: "Nombres ≤ 100" },
      { enonce: "1/2 de 16 =", type: "fraction", reponse: 8, astuce: "Fraction simple, calcul mental" },
      { enonce: "1/3 de 21 =", type: "fraction", reponse: 7, astuce: "Fraction simple, calcul mental" },
      { enonce: "50 + 25 =", type: "addition", reponse: 75, astuce: "Nombres ≤ 100" },
      { enonce: "60 − 28 =", type: "soustraction", reponse: 32, astuce: "Nombres ≤ 100" },
      { enonce: "1/4 de 24 =", type: "fraction", reponse: 6, astuce: "Fraction simple" },
      { enonce: "1/2 de 30 =", type: "fraction", reponse: 15, astuce: "Fraction simple" },
      { enonce: "67 + 28 =", type: "addition", reponse: 95, astuce: "Nombres ≤ 100" },
      { enonce: "91 − 47 =", type: "soustraction", reponse: 44, astuce: "Nombres ≤ 100" },
      { enonce: "1/3 de 27 =", type: "fraction", reponse: 9, astuce: "Fraction simple" },
      { enonce: "1/4 de 40 =", type: "fraction", reponse: 10, astuce: "Fraction simple" },
      { enonce: "38 + 44 =", type: "addition", reponse: 82, astuce: "Nombres ≤ 100" },
      { enonce: "85 − 39 =", type: "soustraction", reponse: 46, astuce: "Nombres ≤ 100" },
      { enonce: "1/2 de 48 =", type: "fraction", reponse: 24, astuce: "Fraction simple" },
      { enonce: "1/3 de 18 =", type: "fraction", reponse: 6, astuce: "Fraction simple" },
      { enonce: "56 + 37 =", type: "addition", reponse: 93, astuce: "Nombres ≤ 100" },
      { enonce: "73 − 45 =", type: "soustraction", reponse: 28, astuce: "Nombres ≤ 100" },
      { enonce: "1/4 de 32 =", type: "fraction", reponse: 8, astuce: "Fraction simple" },
      { enonce: "1/2 de 26 =", type: "fraction", reponse: 13, astuce: "Fraction simple" },
      // 10 exercices supplémentaires pour atteindre 30
      { enonce: "33 + 49 =", type: "addition", reponse: 82, astuce: "Nombres ≤ 100" },
      { enonce: "92 − 56 =", type: "soustraction", reponse: 36, astuce: "Nombres ≤ 100" },
      { enonce: "1/2 de 54 =", type: "fraction", reponse: 27, astuce: "Fraction simple" },
      { enonce: "1/3 de 33 =", type: "fraction", reponse: 11, astuce: "Fraction simple" },
      { enonce: "47 + 36 =", type: "addition", reponse: 83, astuce: "Nombres ≤ 100" },
      { enonce: "80 − 33 =", type: "soustraction", reponse: 47, astuce: "Nombres ≤ 100" },
      { enonce: "1/4 de 48 =", type: "fraction", reponse: 12, astuce: "Fraction simple" },
      { enonce: "1/2 de 62 =", type: "fraction", reponse: 31, astuce: "Fraction simple" },
      { enonce: "29 + 54 =", type: "addition", reponse: 83, astuce: "Nombres ≤ 100" },
      { enonce: "1/3 de 36 =", type: "fraction", reponse: 12, astuce: "Fraction simple" },
    ]
  },
  {
    niveau: 5,
    duree: "8 mn",
    instructions: "Fractions simples, pourcentages simples et multiplications/divisions par 10. 15 questions parmi 30, 1 erreur autorisée.",
    exercices: [
      { enonce: "1/2 de 18 =", type: "fraction", reponse: 9, astuce: "Fraction simple" },
      { enonce: "25 % de 40 =", type: "pourcentage", reponse: 10, astuce: "Pourcentage simple" },
      { enonce: "10 × 7 =", type: "multiplication", reponse: 70, astuce: "Multiplication par 10" },
      { enonce: "120 ÷ 10 =", type: "division", reponse: 12, astuce: "Division par 10" },
      { enonce: "1/4 de 32 =", type: "fraction", reponse: 8, astuce: "Fraction simple" },
      { enonce: "50 % de 60 =", type: "pourcentage", reponse: 30, astuce: "Pourcentage simple" },
      { enonce: "10 × 15 =", type: "multiplication", reponse: 150, astuce: "Multiplication par 10" },
      { enonce: "80 ÷ 10 =", type: "division", reponse: 8, astuce: "Division par 10" },
      { enonce: "1/3 de 24 =", type: "fraction", reponse: 8, astuce: "Fraction simple" },
      { enonce: "10 % de 50 =", type: "pourcentage", reponse: 5, astuce: "Pourcentage simple" },
      { enonce: "10 × 23 =", type: "multiplication", reponse: 230, astuce: "Multiplication par 10" },
      { enonce: "150 ÷ 10 =", type: "division", reponse: 15, astuce: "Division par 10" },
      { enonce: "1/2 de 44 =", type: "fraction", reponse: 22, astuce: "Fraction simple" },
      { enonce: "75 % de 20 =", type: "pourcentage", reponse: 15, astuce: "Pourcentage simple" },
      { enonce: "10 × 9 =", type: "multiplication", reponse: 90, astuce: "Multiplication par 10" },
      { enonce: "200 ÷ 10 =", type: "division", reponse: 20, astuce: "Division par 10" },
      { enonce: "1/4 de 48 =", type: "fraction", reponse: 12, astuce: "Fraction simple" },
      { enonce: "20 % de 100 =", type: "pourcentage", reponse: 20, astuce: "Pourcentage simple" },
      { enonce: "10 × 11 =", type: "multiplication", reponse: 110, astuce: "Multiplication par 10" },
      { enonce: "90 ÷ 10 =", type: "division", reponse: 9, astuce: "Division par 10" },
      // 10 exercices supplémentaires pour atteindre 30
      { enonce: "1/2 de 56 =", type: "fraction", reponse: 28, astuce: "Fraction simple" },
      { enonce: "50 % de 80 =", type: "pourcentage", reponse: 40, astuce: "Pourcentage simple" },
      { enonce: "10 × 17 =", type: "multiplication", reponse: 170, astuce: "Multiplication par 10" },
      { enonce: "250 ÷ 10 =", type: "division", reponse: 25, astuce: "Division par 10" },
      { enonce: "1/3 de 30 =", type: "fraction", reponse: 10, astuce: "Fraction simple" },
      { enonce: "25 % de 80 =", type: "pourcentage", reponse: 20, astuce: "Pourcentage simple" },
      { enonce: "10 × 14 =", type: "multiplication", reponse: 140, astuce: "Multiplication par 10" },
      { enonce: "340 ÷ 10 =", type: "division", reponse: 34, astuce: "Division par 10" },
      { enonce: "1/4 de 60 =", type: "fraction", reponse: 15, astuce: "Fraction simple" },
      { enonce: "10 % de 90 =", type: "pourcentage", reponse: 9, astuce: "Pourcentage simple" },
    ]
  },
  {
    niveau: 6,
    duree: "20 mn",
    instructions: "Fractions combinées, pourcentages variés et multiplications/divisions par 10 et 100",
    exercices: [
      // Fractions combinées (min 5)
      { enonce: "1/2 + 1/4 =", type: "fraction", reponse: 0.75, astuce: "= 2/4 + 1/4 = 3/4" },
      { enonce: "1/3 + 1/6 =", type: "fraction", reponse: 0.5, astuce: "= 2/6 + 1/6 = 3/6 = 1/2" },
      { enonce: "1/2 − 1/4 =", type: "fraction", reponse: 0.25, astuce: "= 2/4 − 1/4 = 1/4" },
      { enonce: "1/4 + 1/4 =", type: "fraction", reponse: 0.5, astuce: "= 2/4 = 1/2" },
      { enonce: "3/4 − 1/2 =", type: "fraction", reponse: 0.25, astuce: "= 3/4 − 2/4 = 1/4" },
      { enonce: "1/3 + 1/3 =", type: "fraction", reponse: 0.667, astuce: "= 2/3" },
      // Pourcentages
      { enonce: "75 % de 80 =", type: "pourcentage", reponse: 60, astuce: "Pourcentage simple" },
      { enonce: "50 % de 90 =", type: "pourcentage", reponse: 45, astuce: "Pourcentage simple" },
      { enonce: "25 % de 120 =", type: "pourcentage", reponse: 30, astuce: "Pourcentage simple" },
      { enonce: "10 % de 200 =", type: "pourcentage", reponse: 20, astuce: "Pourcentage simple" },
      // Multiplications/divisions par 10 et 100
      { enonce: "10 × 12 =", type: "multiplication", reponse: 120, astuce: "Multiplication par 10" },
      { enonce: "400 ÷ 100 =", type: "division", reponse: 4, astuce: "Division par 100" },
      { enonce: "100 × 5 =", type: "multiplication", reponse: 500, astuce: "Multiplication par 100" },
      { enonce: "350 ÷ 10 =", type: "division", reponse: 35, astuce: "Division par 10" },
      { enonce: "10 × 45 =", type: "multiplication", reponse: 450, astuce: "Multiplication par 10" },
      { enonce: "700 ÷ 100 =", type: "division", reponse: 7, astuce: "Division par 100" },
      { enonce: "100 × 8 =", type: "multiplication", reponse: 800, astuce: "Multiplication par 100" },
      { enonce: "250 ÷ 10 =", type: "division", reponse: 25, astuce: "Division par 10" },
      { enonce: "10 × 33 =", type: "multiplication", reponse: 330, astuce: "Multiplication par 10" },
      { enonce: "900 ÷ 100 =", type: "division", reponse: 9, astuce: "Division par 100" },
    ]
  },
  {
    niveau: 7,
    duree: "20 mn",
    instructions: "Conversions simples, mesures agraires, multiplications/divisions par 0,1 et 100, partages simples",
    exercices: [
      { enonce: "Convertir 3500 m en km =", type: "conversion", reponse: 3.5, astuce: "Division par 1000" },
      { enonce: "12 ha = ? a", type: "conversion", reponse: 1200, astuce: "1 ha = 100 a" },
      { enonce: "0,1 × 240 =", type: "multiplication", reponse: 24, astuce: "Multiplier par 0,1" },
      { enonce: "400 ÷ 100 =", type: "division", reponse: 4, astuce: "Division par 100" },
      { enonce: "Un sac de 12 kg est partagé également entre 4 personnes. Combien chacun ?", type: "partage", reponse: 3, astuce: "Division simple" },
      { enonce: "Convertir 2500 mL en L =", type: "conversion", reponse: 2.5, astuce: "Division par 1000" },
      // Fractions (min 5)
      { enonce: "1/2 + 1/3 =", type: "fraction", reponse: 0.833, astuce: "= 3/6 + 2/6 = 5/6" },
      { enonce: "2/3 − 1/6 =", type: "fraction", reponse: 0.5, astuce: "= 4/6 − 1/6 = 3/6 = 1/2" },
      { enonce: "1/4 + 1/2 =", type: "fraction", reponse: 0.75, astuce: "= 1/4 + 2/4 = 3/4" },
      { enonce: "3/4 − 1/4 =", type: "fraction", reponse: 0.5, astuce: "= 2/4 = 1/2" },
      { enonce: "1/3 × 2 =", type: "fraction", reponse: 0.667, astuce: "= 2/3" },
      // Suite
      { enonce: "5,5 ha = ? a", type: "conversion", reponse: 550, astuce: "1 ha = 100 a" },
      { enonce: "0,1 × 150 =", type: "multiplication", reponse: 15, astuce: "Multiplier par 0,1" },
      { enonce: "600 ÷ 100 =", type: "division", reponse: 6, astuce: "Division par 100" },
      { enonce: "4500 m = ? km", type: "conversion", reponse: 4.5, astuce: "Division par 1000" },
      { enonce: "0,1 × 380 =", type: "multiplication", reponse: 38, astuce: "Multiplier par 0,1" },
      { enonce: "1800 mL = ? L", type: "conversion", reponse: 1.8, astuce: "Division par 1000" },
      { enonce: "900 ÷ 100 =", type: "division", reponse: 9, astuce: "Division par 100" },
      { enonce: "8 ha = ? a", type: "conversion", reponse: 800, astuce: "1 ha = 100 a" },
      { enonce: "0,1 × 470 =", type: "multiplication", reponse: 47, astuce: "Multiplier par 0,1" },
    ]
  },
  {
    niveau: 8,
    duree: "20 mn",
    instructions: "Fractions et pourcentages intermédiaires, multiplications/divisions par 10, 100, 1000, partages simples",
    exercices: [
      // Fractions (min 5)
      { enonce: "1/2 + 1/3 =", type: "fraction", reponse: 0.833, astuce: "= 3/6 + 2/6 = 5/6" },
      { enonce: "2/3 − 1/4 =", type: "fraction", reponse: 0.417, astuce: "= 8/12 − 3/12 = 5/12" },
      { enonce: "1/4 + 2/3 =", type: "fraction", reponse: 0.917, astuce: "= 3/12 + 8/12 = 11/12" },
      { enonce: "3/4 − 1/3 =", type: "fraction", reponse: 0.417, astuce: "= 9/12 − 4/12 = 5/12" },
      { enonce: "1/2 + 1/6 =", type: "fraction", reponse: 0.667, astuce: "= 3/6 + 1/6 = 4/6 = 2/3" },
      { enonce: "5/6 − 1/2 =", type: "fraction", reponse: 0.333, astuce: "= 5/6 − 3/6 = 2/6 = 1/3" },
      // Pourcentages
      { enonce: "25 % de 120 =", type: "pourcentage", reponse: 30, astuce: "Pourcentage simple" },
      { enonce: "75 % de 60 =", type: "pourcentage", reponse: 45, astuce: "Pourcentage simple" },
      { enonce: "20 % de 150 =", type: "pourcentage", reponse: 30, astuce: "Pourcentage simple" },
      // Multiplications/divisions
      { enonce: "45 × 100 =", type: "multiplication", reponse: 4500, astuce: "Multiplier par 100" },
      { enonce: "3000 ÷ 1000 =", type: "division", reponse: 3, astuce: "Division par 1000" },
      { enonce: "67 × 10 =", type: "multiplication", reponse: 670, astuce: "Multiplier par 10" },
      { enonce: "8500 ÷ 100 =", type: "division", reponse: 85, astuce: "Division par 100" },
      { enonce: "23 × 1000 =", type: "multiplication", reponse: 23000, astuce: "Multiplier par 1000" },
      // Partages
      { enonce: "Une somme de 1000 F est partagée entre A et B. A reçoit les 3/5 et B reçoit le reste. Combien B reçoit-il ?", type: "probleme", reponse: 400, astuce: "1000 − 600 = 400 F" },
      { enonce: "Une somme de 800 F est partagée entre deux personnes : l'une reçoit 3/4, l'autre 1/4. Combien reçoit celui qui a 1/4 ?", type: "probleme", reponse: 200, astuce: "800 × 1/4 = 200 F" },
      { enonce: "56 × 100 =", type: "multiplication", reponse: 5600, astuce: "Multiplier par 100" },
      { enonce: "9000 ÷ 1000 =", type: "division", reponse: 9, astuce: "Division par 1000" },
      { enonce: "34 × 10 =", type: "multiplication", reponse: 340, astuce: "Multiplier par 10" },
      { enonce: "18,7 ÷ 0,01 =", type: "division", reponse: 1870, astuce: "Diviser par 0,01 = multiplier par 100" },
    ]
  },
  {
    niveau: 9,
    duree: "20 mn",
    instructions: "Fractions complexes, pourcentages, conversions intermédiaires, multiplications/divisions par 10, 100, 1000",
    exercices: [
      // Fractions (min 5)
      { enonce: "2/3 + 3/4 =", type: "fraction", reponse: 1.417, astuce: "= 8/12 + 9/12 = 17/12" },
      { enonce: "5/6 − 1/4 =", type: "fraction", reponse: 0.583, astuce: "= 10/12 − 3/12 = 7/12" },
      { enonce: "1/2 + 2/3 =", type: "fraction", reponse: 1.167, astuce: "= 3/6 + 4/6 = 7/6" },
      { enonce: "3/4 + 1/6 =", type: "fraction", reponse: 0.917, astuce: "= 9/12 + 2/12 = 11/12" },
      { enonce: "4/5 − 1/2 =", type: "fraction", reponse: 0.3, astuce: "= 8/10 − 5/10 = 3/10" },
      { enonce: "1/3 + 2/5 =", type: "fraction", reponse: 0.733, astuce: "= 5/15 + 6/15 = 11/15" },
      // Pourcentages
      { enonce: "30 % de 400 =", type: "pourcentage", reponse: 120, astuce: "30 × 4 = 120" },
      { enonce: "75 % de 160 =", type: "pourcentage", reponse: 120, astuce: "Pourcentage simple" },
      { enonce: "40 % de 250 =", type: "pourcentage", reponse: 100, astuce: "Pourcentage simple" },
      // Conversions
      { enonce: "Convertir 3,5 km en m =", type: "conversion", reponse: 3500, astuce: "Multiplier par 1000" },
      { enonce: "4750 m = ? km", type: "conversion", reponse: 4.75, astuce: "Division par 1000" },
      { enonce: "6,8 L = ? mL", type: "conversion", reponse: 6800, astuce: "Multiplier par 1000" },
      // Multiplications/divisions
      { enonce: "35 × 100 =", type: "multiplication", reponse: 3500, astuce: "Multiplier par 100" },
      { enonce: "4500 ÷ 1000 =", type: "division", reponse: 4.5, astuce: "Division par 1000" },
      { enonce: "89 × 10 =", type: "multiplication", reponse: 890, astuce: "Multiplier par 10" },
      { enonce: "12300 ÷ 100 =", type: "division", reponse: 123, astuce: "Division par 100" },
      // Partages
      { enonce: "Une somme de 1200 F est partagée entre A et B. A reçoit les 3/5 et B reçoit le reste. Combien B reçoit-il ?", type: "probleme", reponse: 480, astuce: "1200 × 2/5 = 480 F" },
      { enonce: "67 × 100 =", type: "multiplication", reponse: 6700, astuce: "Multiplier par 100" },
      { enonce: "7800 ÷ 1000 =", type: "division", reponse: 7.8, astuce: "Division par 1000" },
      { enonce: "45 × 10 =", type: "multiplication", reponse: 450, astuce: "Multiplier par 10" },
    ]
  },
  {
    niveau: 10,
    duree: "15 mn",
    instructions: "Géométrie simple (carré, rectangle, cercle), problèmes simples de temps/vitesse/distance, multiplications/divisions par 10, 100",
    exercices: [
      { enonce: "Calcule l'aire d'un carré dont le côté mesure 8 m.", type: "geometrie", reponse: 64, astuce: "Aire = côté² = 64 m²" },
      { enonce: "Calcule l'aire d'un rectangle de 12 m de longueur et 5 m de largeur.", type: "geometrie", reponse: 60, astuce: "Aire = L × l = 60 m²" },
      { enonce: "Calcule l'aire d'un cercle de rayon 10 m (π = 3,14).", type: "geometrie", reponse: 314, astuce: "Aire = π × r² = 314 m²" },
      { enonce: "Un train parcourt 120 km en 2 heures. Quelle est sa vitesse moyenne en km/h ?", type: "probleme", reponse: 60, astuce: "Vitesse = Distance ÷ temps = 60 km/h" },
      { enonce: "36 × 100 =", type: "multiplication", reponse: 3600, astuce: "Multiplier par 100" },
      { enonce: "7200 ÷ 1000 =", type: "division", reponse: 7.2, astuce: "Division par 1000" },
      // Fractions (min 5)
      { enonce: "2/3 + 1/4 =", type: "fraction", reponse: 0.917, astuce: "= 8/12 + 3/12 = 11/12" },
      { enonce: "3/4 − 2/5 =", type: "fraction", reponse: 0.35, astuce: "= 15/20 − 8/20 = 7/20" },
      { enonce: "1/2 × 3/4 =", type: "fraction", reponse: 0.375, astuce: "= 3/8" },
      { enonce: "2/5 + 1/3 =", type: "fraction", reponse: 0.733, astuce: "= 6/15 + 5/15 = 11/15" },
      { enonce: "5/6 − 1/3 =", type: "fraction", reponse: 0.5, astuce: "= 5/6 − 2/6 = 3/6 = 1/2" },
      // Suite géométrie/vitesse
      { enonce: "Calcule l'aire d'un carré dont le côté mesure 11 m.", type: "geometrie", reponse: 121, astuce: "Aire = côté² = 121 m²" },
      { enonce: "Calcule l'aire d'un rectangle de 15 m de longueur et 8 m de largeur.", type: "geometrie", reponse: 120, astuce: "Aire = L × l = 120 m²" },
      { enonce: "Calcule le périmètre d'un carré dont le côté mesure 9 m.", type: "geometrie", reponse: 36, astuce: "Périmètre = 4 × côté = 36 m" },
      { enonce: "Une voiture roule à 90 km/h pendant 2 heures. Quelle distance parcourt-elle ?", type: "probleme", reponse: 180, astuce: "Distance = vitesse × temps = 180 km" },
      { enonce: "Un cycliste parcourt 200 km en 4 heures. Quelle est sa vitesse moyenne ?", type: "probleme", reponse: 50, astuce: "Vitesse = distance ÷ temps = 50 km/h" },
      { enonce: "48 × 100 =", type: "multiplication", reponse: 4800, astuce: "Multiplier par 100" },
      { enonce: "5400 ÷ 1000 =", type: "division", reponse: 5.4, astuce: "Division par 1000" },
      { enonce: "Calcule le périmètre d'un rectangle de 10 m de longueur et 6 m de largeur.", type: "geometrie", reponse: 32, astuce: "Périmètre = 2 × (L + l) = 32 m" },
      { enonce: "Calcule le périmètre d'un cercle de rayon 5 m (π = 3,14).", type: "geometrie", reponse: 31.4, astuce: "Périmètre = 2 × π × r = 31,4 m" },
    ]
  },
  {
    niveau: 11,
    duree: "15 mn",
    instructions: "Conversions avancées, mesures agraires, fractions et pourcentages, multiplications/divisions par 0,01 et 10",
    exercices: [
      { enonce: "Convertir 5,6 ha en a ?", type: "conversion", reponse: 560, astuce: "1 ha = 100 a" },
      { enonce: "Un bidon peut contenir 15 litres d'eau. Il est actuellement rempli aux 2/3 de sa capacité. Combien de litres faut-il ajouter pour le remplir complètement ?", type: "probleme", reponse: 5, astuce: "15 × 1/3 = 5 L" },
      { enonce: "25 % de 200 =", type: "pourcentage", reponse: 50, astuce: "Pourcentage simple" },
      { enonce: "0,01 × 450 =", type: "multiplication", reponse: 4.5, astuce: "Multiplier par 0,01" },
      { enonce: "120 ÷ 10 =", type: "division", reponse: 12, astuce: "Division par 10" },
      { enonce: "Une somme de 1000 F doit être partagée entre deux personnes A et B. A reçoit la moitié de la somme et B reçoit le reste. Combien B reçoit-il ?", type: "probleme", reponse: 500, astuce: "1000 × 1/2 = 500 F" },
      // Fractions (min 5)
      { enonce: "3/4 + 2/3 =", type: "fraction", reponse: 1.417, astuce: "= 9/12 + 8/12 = 17/12" },
      { enonce: "5/6 − 3/4 =", type: "fraction", reponse: 0.083, astuce: "= 10/12 − 9/12 = 1/12" },
      { enonce: "1/2 × 4/5 =", type: "fraction", reponse: 0.4, astuce: "= 4/10 = 2/5" },
      { enonce: "2/3 ÷ 2 =", type: "fraction", reponse: 0.333, astuce: "= 2/3 × 1/2 = 1/3" },
      { enonce: "1/4 + 5/8 =", type: "fraction", reponse: 0.875, astuce: "= 2/8 + 5/8 = 7/8" },
      // Suite
      { enonce: "8,4 ha = ? a", type: "conversion", reponse: 840, astuce: "1 ha = 100 a" },
      { enonce: "0,01 × 670 =", type: "multiplication", reponse: 6.7, astuce: "Multiplier par 0,01" },
      { enonce: "350 ÷ 10 =", type: "division", reponse: 35, astuce: "Division par 10" },
      { enonce: "60 % de 150 =", type: "pourcentage", reponse: 90, astuce: "Pourcentage simple" },
      { enonce: "3,25 ha = ? a", type: "conversion", reponse: 325, astuce: "1 ha = 100 a" },
      { enonce: "0,01 × 890 =", type: "multiplication", reponse: 8.9, astuce: "Multiplier par 0,01" },
      { enonce: "480 ÷ 10 =", type: "division", reponse: 48, astuce: "Division par 10" },
      { enonce: "Un réservoir de 20 litres est rempli aux 3/4 de sa capacité. Combien de litres d'eau contient-il actuellement ?", type: "probleme", reponse: 15, astuce: "20 × 3/4 = 15 L" },
      { enonce: "45 % de 200 =", type: "pourcentage", reponse: 90, astuce: "Pourcentage simple" },
    ]
  },
  {
    niveau: 12,
    duree: "15 mn",
    instructions: "Conversions, pourcentages, problèmes de partage inégaux, multiplications/divisions par 0,1 et 100",
    exercices: [
      // Nouveaux exercices de partage
      { enonce: "Pierre et Paul se partagent 50 €. Pierre a 10 € de plus que Paul. Quelle est la part de Paul ?", type: "partage", reponse: 20, astuce: "Paul = x, Pierre = x + 10. Donc 2x + 10 = 50, soit x = 20 €" },
      { enonce: "Deux classes se partagent 120 livres. La classe A en reçoit le double de la classe B. Combien de livres reçoit la classe B ?", type: "partage", reponse: 40, astuce: "B = x, A = 2x. Donc 3x = 120, soit x = 40 livres" },
      { enonce: "Un gâteau de 800 g est partagé entre Léo et Sarah. Léo en mange 1/4 et Sarah mange le reste. Quel poids Sarah mange-t-elle ?", type: "partage", reponse: 600, astuce: "Sarah = 800 × 3/4 = 600 g" },
      { enonce: "30 fleurs sont partagées en deux bouquets. Le premier bouquet contient 3/5 des fleurs. Combien de fleurs y a-t-il dans le deuxième bouquet ?", type: "partage", reponse: 12, astuce: "Deuxième = 30 × 2/5 = 12 fleurs" },
      { enonce: "Trois enfants se partagent 100 images. Le premier en a 40. Les deux autres se partagent le reste de façon égale. Combien d'images reçoivent les deux autres chacun ?", type: "partage", reponse: 30, astuce: "Reste = 100 - 40 = 60. Chacun = 60 ÷ 2 = 30 images" },
      // Conversions
      { enonce: "Convertir 3,25 km en m =", type: "conversion", reponse: 3250, astuce: "Multiplier par 1000" },
      { enonce: "4,75 km = ? m", type: "conversion", reponse: 4750, astuce: "Multiplier par 1000" },
      { enonce: "5,8 km = ? m", type: "conversion", reponse: 5800, astuce: "Multiplier par 1000" },
      // Pourcentages
      { enonce: "75 % de 80 =", type: "pourcentage", reponse: 60, astuce: "Pourcentage simple" },
      { enonce: "80 % de 125 =", type: "pourcentage", reponse: 100, astuce: "Pourcentage simple" },
      { enonce: "35 % de 400 =", type: "pourcentage", reponse: 140, astuce: "Pourcentage simple" },
      { enonce: "25 % de 240 =", type: "pourcentage", reponse: 60, astuce: "Pourcentage simple" },
      // Multiplications/divisions
      { enonce: "0,1 × 360 =", type: "multiplication", reponse: 36, astuce: "Multiplier par 0,1" },
      { enonce: "900 ÷ 100 =", type: "division", reponse: 9, astuce: "Division par 100" },
      { enonce: "0,1 × 420 =", type: "multiplication", reponse: 42, astuce: "Multiplier par 0,1" },
      { enonce: "1500 ÷ 100 =", type: "division", reponse: 15, astuce: "Division par 100" },
      { enonce: "0,1 × 570 =", type: "multiplication", reponse: 57, astuce: "Multiplier par 0,1" },
      { enonce: "2300 ÷ 100 =", type: "division", reponse: 23, astuce: "Division par 100" },
      // Partage simple
      { enonce: "Une somme de 800 F est partagée entre A et B. A reçoit les 3/4 et B reçoit le reste. Combien B reçoit-il ?", type: "probleme", reponse: 200, astuce: "800 × 1/4 = 200 F" },
      { enonce: "2/5 de 45 =", type: "fraction", reponse: 18, astuce: "45 × 2/5 = 18" },
    ]
  },
  {
    niveau: 13,
    duree: "15 mn",
    instructions: "Fractions, pourcentages, conversions, problèmes de partage, multiplications/divisions par 100, 1000",
    exercices: [
      // Nouveaux exercices de partage
      { enonce: "Une ficelle de 24 m est coupée en deux morceaux. L'un mesure 4 m de plus que l'autre. Quelle est la longueur du plus petit morceau ?", type: "partage", reponse: 10, astuce: "Petit = x, Grand = x + 4. Donc 2x + 4 = 24, soit x = 10 m" },
      { enonce: "Marie et Jean ont 36 billes à eux deux. Marie en a 6 de moins que Jean. Combien de billes Jean possède-t-il ?", type: "partage", reponse: 21, astuce: "Jean = x, Marie = x - 6. Donc 2x - 6 = 36, soit x = 21 billes" },
      { enonce: "Deux rubans mesurent ensemble 45 cm. Le ruban rouge est deux fois plus long que le ruban bleu. Quelle est la longueur du ruban bleu ?", type: "partage", reponse: 15, astuce: "Bleu = x, Rouge = 2x. Donc 3x = 45, soit x = 15 cm" },
      // Fractions
      { enonce: "1/2 + 1/3 =", type: "fraction", reponse: 0.833, astuce: "= 3/6 + 2/6 = 5/6" },
      { enonce: "3/5 − 1/4 =", type: "fraction", reponse: 0.35, astuce: "= 12/20 − 5/20 = 7/20" },
      { enonce: "2/3 × 3/5 =", type: "fraction", reponse: 0.4, astuce: "= 6/15 = 2/5" },
      { enonce: "1/2 ÷ 3 =", type: "fraction", reponse: 0.167, astuce: "= 1/2 × 1/3 = 1/6" },
      { enonce: "3/4 + 1/8 =", type: "fraction", reponse: 0.875, astuce: "= 6/8 + 1/8 = 7/8" },
      { enonce: "5/6 − 2/9 =", type: "fraction", reponse: 0.611, astuce: "= 15/18 − 4/18 = 11/18" },
      // Pourcentages
      { enonce: "30 % de 250 =", type: "pourcentage", reponse: 75, astuce: "Pourcentage simple" },
      { enonce: "65 % de 200 =", type: "pourcentage", reponse: 130, astuce: "Pourcentage simple" },
      // Conversions
      { enonce: "Convertir 4,2 km en m =", type: "conversion", reponse: 4200, astuce: "Multiplier par 1000" },
      { enonce: "6300 m = ? km", type: "conversion", reponse: 6.3, astuce: "Division par 1000" },
      // Multiplications/divisions
      { enonce: "45 × 1000 =", type: "multiplication", reponse: 45000, astuce: "Multiplier par 1000" },
      { enonce: "7200 ÷ 100 =", type: "division", reponse: 72, astuce: "Division par 100" },
      { enonce: "15600 ÷ 1000 =", type: "division", reponse: 15.6, astuce: "Division par 1000" },
      // Partages classiques
      { enonce: "Une somme de 900 F est partagée entre A et B. A reçoit les 2/3 et B reçoit le reste. Combien B reçoit-il ?", type: "probleme", reponse: 300, astuce: "900 × 1/3 = 300 F" },
      { enonce: "Une somme de 1500 F est partagée entre A et B. A reçoit les 3/5 et B reçoit le reste. Combien B reçoit-il ?", type: "probleme", reponse: 600, astuce: "1500 × 2/5 = 600 F" },
      { enonce: "23400 ÷ 1000 =", type: "division", reponse: 23.4, astuce: "Division par 1000" },
    ]
  },
  {
    niveau: 14,
    duree: "15 mn",
    instructions: "Problèmes de temps, vitesse, distance, géométrie, partages avancés, pourcentages, multiplications/divisions",
    exercices: [
      // Nouveaux exercices de partage
      { enonce: "On partage 75 € entre Luc et Inès. Luc reçoit 3/5 de la somme. Quel est le montant reçu par Inès ?", type: "partage", reponse: 30, astuce: "Inès = 75 × 2/5 = 30 €" },
      { enonce: "Thomas a 60 cartes. Il en donne 1/3 à sa sœur et 1/4 à son frère. Combien de cartes lui reste-t-il ?", type: "partage", reponse: 25, astuce: "Donné = 60 × 1/3 + 60 × 1/4 = 20 + 15 = 35. Reste = 60 - 35 = 25 cartes" },
      // Vitesse/distance
      { enonce: "Un train parcourt 90 km en 1,5 h. Vitesse moyenne ?", type: "vitesse", reponse: 60, astuce: "Distance ÷ temps" },
      { enonce: "Voiture 75 km/h pendant 4 h. Distance ?", type: "vitesse", reponse: 300, astuce: "v × t" },
      { enonce: "Distance 240 km en 4 h. Vitesse ?", type: "vitesse", reponse: 60, astuce: "d ÷ t" },
      // Géométrie
      { enonce: "Carré côté 12 m. Aire ?", type: "geometrie", reponse: 144, astuce: "c²" },
      { enonce: "Rectangle 15 m × 7 m. Aire ?", type: "geometrie", reponse: 105, astuce: "L × l" },
      { enonce: "Périmètre carré côté 14 m ?", type: "geometrie", reponse: 56, astuce: "4 × c" },
      { enonce: "Cercle rayon 10 m, π=3,14. Aire ?", type: "geometrie", reponse: 314, astuce: "π × r² = 3,14 × 100 = 314" },
      { enonce: "Périmètre rectangle 18 m × 9 m ?", type: "geometrie", reponse: 54, astuce: "2 × (L + l)" },
      // Fractions
      { enonce: "1/3 + 2/5 =", type: "fraction", reponse: 0.733, astuce: "= 5/15 + 6/15 = 11/15" },
      { enonce: "4/5 − 2/3 =", type: "fraction", reponse: 0.133, astuce: "= 12/15 − 10/15 = 2/15" },
      { enonce: "1/4 × 2/3 =", type: "fraction", reponse: 0.167, astuce: "= 2/12 = 1/6" },
      { enonce: "3/5 ÷ 2 =", type: "fraction", reponse: 0.3, astuce: "= 3/5 × 1/2 = 3/10" },
      { enonce: "7/8 − 1/2 =", type: "fraction", reponse: 0.375, astuce: "= 7/8 − 4/8 = 3/8" },
      // Pourcentages
      { enonce: "50 % de 120 =", type: "pourcentage", reponse: 60, astuce: "Pourcentage simple" },
      { enonce: "85 % de 200 =", type: "pourcentage", reponse: 170, astuce: "Pourcentage simple" },
      // Divisions
      { enonce: "3600 ÷ 1000 =", type: "division", reponse: 3.6, astuce: "Division par 1000" },
      { enonce: "55 ÷ 0,25 =", type: "division", reponse: 220, astuce: "Diviser par 0,25 = multiplier par 4" },
    ]
  },
  {
    niveau: 15,
    duree: "15 mn",
    instructions: "Partages inégaux faciles, conversions, temps et durées, divisions de décimaux par 0,1 et 0,01",
    exercices: [
      { enonce: "Une somme de 1200 F est partagée entre A et B. A reçoit les 3/5 et B reçoit le reste. Combien B reçoit-il ?", type: "probleme", reponse: 480, astuce: "1200 × 2/5 = 480 F" },
      { enonce: "Convertir 3,5 ha en a ?", type: "conversion", reponse: 350, astuce: "1 ha = 100 a" },
      // Temps et durées
      { enonce: "Un train part à 8h15 et arrive à 11h45. Quelle est la durée du trajet en heures et minutes ?", type: "temps", reponse: "3h30", astuce: "De 8h15 à 11h45 = 3h30" },
      { enonce: "Un bus part à 14h50 et roule pendant 2h35. À quelle heure arrive-t-il ?", type: "temps", reponse: "17h25", astuce: "14h50 + 2h35 = 17h25" },
      { enonce: "Un avion atterrit à 22h10 après un vol de 4h45. À quelle heure a-t-il décollé ?", type: "temps", reponse: "17h25", astuce: "22h10 − 4h45 = 17h25" },
      { enonce: "Un match commence à 16h30 et se termine à 18h15. Quelle est la durée du match ?", type: "temps", reponse: "1h45", astuce: "De 16h30 à 18h15 = 1h45" },
      { enonce: "Un TGV part à 7h25 et arrive à 10h40. Combien de temps dure le trajet ?", type: "temps", reponse: "3h15", astuce: "De 7h25 à 10h40 = 3h15" },
      { enonce: "3/4 − 5/8 =", type: "fraction", reponse: 0.125, astuce: "= 6/8 − 5/8 = 1/8" },
      // Pourcentages
      { enonce: "75 % de 160 =", type: "pourcentage", reponse: 120, astuce: "Pourcentage simple" },
      { enonce: "40 % de 350 =", type: "pourcentage", reponse: 140, astuce: "Pourcentage simple" },
      // Divisions de décimaux par 0,1 et 0,01 (remplacent multiplications par 10/100)
      { enonce: "4,2 ÷ 0,1 =", type: "division", reponse: 42, astuce: "Diviser par 0,1 = multiplier par 10" },
      { enonce: "5 ÷ 0,1 =", type: "division", reponse: 50, astuce: "Diviser par 0,1 = multiplier par 10" },
      { enonce: "8,9 ÷ 0,1 =", type: "division", reponse: 89, astuce: "Diviser par 0,1 = multiplier par 10" },
      { enonce: "0,75 ÷ 0,01 =", type: "division", reponse: 75, astuce: "Diviser par 0,01 = multiplier par 100" },
      { enonce: "0,32 ÷ 0,01 =", type: "division", reponse: 32, astuce: "Diviser par 0,01 = multiplier par 100" },
      // Conversions
      { enonce: "7,25 ha = ? a", type: "conversion", reponse: 725, astuce: "1 ha = 100 a" },
      { enonce: "4500 m = ? km", type: "conversion", reponse: 4.5, astuce: "Division par 1000" },
      // Partages
      { enonce: "Une somme de 1800 F est partagée entre A et B. A reçoit les 2/3 et B reçoit le reste. Combien B reçoit-il ?", type: "probleme", reponse: 600, astuce: "1800 × 1/3 = 600 F" },
      { enonce: "Une somme de 2000 F est partagée entre A et B. A reçoit les 7/10 et B reçoit le reste. Combien B reçoit-il ?", type: "probleme", reponse: 600, astuce: "2000 × 3/10 = 600 F" },
      { enonce: "6,3 ÷ 0,1 =", type: "division", reponse: 63, astuce: "Diviser par 0,1 = multiplier par 10" },
    ]
  },
  {
    niveau: 16,
    duree: "25 mn",
    instructions: "Partages inégaux avancés, pourcentages, conversions, divisions de décimaux par 0,01 et 0,1",
    exercices: [
      // Nouveaux exercices de partage avancés
      { enonce: "Pour le goûter, la grand-mère de Léo répartit 24 bonbons entre ses deux petits-enfants. Elle dit : « J'en donne le double à Léo par rapport à sa petite sœur. » Combien de bonbons chaque enfant a-t-il reçus ? (répondre pour la sœur)", type: "partage", reponse: 8, astuce: "Sœur = x, Léo = 2x. Donc 3x = 24, soit x = 8 bonbons pour la sœur" },
      { enonce: "Le fermier range 60 œufs dans des boîtes. Il en met 3 fois plus dans la grande boîte que dans la petite. Combien d'œufs y a-t-il dans la petite boîte ?", type: "partage", reponse: 15, astuce: "Petite = x, Grande = 3x. Donc 4x = 60, soit x = 15 œufs" },
      { enonce: "Trois amis, Thomas, Marc et Sarah, se partagent un paquet de 42 billes. Thomas a deux fois moins de billes que Marc. Sarah a deux fois plus de billes que Marc. Combien de billes possède Thomas ?", type: "partage", reponse: 6, astuce: "Thomas = x, Marc = 2x, Sarah = 4x. Donc x + 2x + 4x = 42, soit 7x = 42, x = 6 billes pour Thomas" },
      { enonce: "Sophie découpe une ficelle de 90 cm en deux morceaux. Le grand morceau est 5 fois plus long que le petit. Quelle est la longueur du petit morceau ?", type: "partage", reponse: 15, astuce: "Petit = x, Grand = 5x. Donc 6x = 90, soit x = 15 cm" },
      // Pourcentages
      { enonce: "75 % de 240 =", type: "pourcentage", reponse: 180, astuce: "Pourcentage simple" },
      { enonce: "35 % de 400 =", type: "pourcentage", reponse: 140, astuce: "Pourcentage simple" },
      { enonce: "60 % de 350 =", type: "pourcentage", reponse: 210, astuce: "Pourcentage simple" },
      // Divisions de décimaux par 0,01 et 0,1
      { enonce: "0,5 ÷ 0,01 =", type: "division", reponse: 50, astuce: "Diviser par 0,01 = multiplier par 100" },
      { enonce: "6,7 ÷ 0,1 =", type: "division", reponse: 67, astuce: "Diviser par 0,1 = multiplier par 10" },
      { enonce: "0,85 ÷ 0,01 =", type: "division", reponse: 85, astuce: "Diviser par 0,01 = multiplier par 100" },
      { enonce: "4,5 ÷ 0,1 =", type: "division", reponse: 45, astuce: "Diviser par 0,1 = multiplier par 10" },
      { enonce: "0,092 ÷ 0,01 =", type: "division", reponse: 9.2, astuce: "Diviser par 0,01 = multiplier par 100" },
      // Conversions
      { enonce: "4,25 km = ? m", type: "conversion", reponse: 4250, astuce: "Multiplier par 1000" },
      { enonce: "9,5 ha = ? a", type: "conversion", reponse: 950, astuce: "1 ha = 100 a" },
      // Partages classiques
      { enonce: "Pierre et Paul se partagent 1000 F. Pierre reçoit 3 fois plus que Paul. Combien Paul reçoit-il ?", type: "probleme", reponse: 250, astuce: "1000 ÷ 4 = 250 F (Paul = 1 part sur 4)" },
      { enonce: "Une somme de 2400 F est partagée entre A et B dans le rapport 3:1. Combien B reçoit-il ?", type: "probleme", reponse: 600, astuce: "2400 ÷ 4 = 600 F (B = 1 part sur 4)" },
      // Décimaux × 0,25
      { enonce: "1,6 × 0,25 =", type: "multiplication", reponse: 0.4, astuce: "1,6 × 0,25 = 1,6 ÷ 4 = 0,4" },
      { enonce: "1,5 ÷ 0,25 =", type: "division", reponse: 6, astuce: "Diviser par 0,25 = multiplier par 4. 1,5 × 4 = 6" },
      // Nouvelle question décimale
      { enonce: "2,4 × 0,5 =", type: "multiplication", reponse: 1.2, astuce: "2,4 × 0,5 = 2,4 ÷ 2 = 1,2" },
      // Question de vitesse
      { enonce: "Une voiture roule à 90 km/h. Quelle distance parcourt-elle en 40 minutes ? (réponse en km)", type: "vitesse", reponse: 60, astuce: "40 min = 2/3 h. Distance = 90 × 2/3 = 60 km" },
    ]
  },
  {
    niveau: 17,
    duree: "25 mn",
    instructions: "Partages complexes, pourcentages avancés, conversions, divisions de décimaux par 0,01 et 0,1",
    exercices: [
      // Exercices de partage avancés (similaires à niveau 16)
      { enonce: "Un père partage 175 € entre ses 3 enfants. L'aîné reçoit le double du cadet, et le benjamin reçoit la moitié du cadet. Combien reçoit le cadet ?", type: "partage", reponse: 50, astuce: "Cadet = x, Aîné = 2x, Benjamin = x/2. Donc 3,5x = 175, x = 50 €" },
      { enonce: "Deux frères ont ensemble 72 billes. Le grand en a le triple du petit. Combien le petit a-t-il de billes ?", type: "partage", reponse: 18, astuce: "Petit = x, Grand = 3x. Donc 4x = 72, x = 18 billes" },
      { enonce: "Trois amies se partagent 66 chocolats. La première en prend 2 fois plus que la deuxième. La troisième en prend 3 fois plus que la deuxième. Combien la deuxième reçoit-elle ?", type: "partage", reponse: 11, astuce: "Deuxième = x. 2x + x + 3x = 66, 6x = 66, x = 11" },
      { enonce: "Un ruban de 120 cm est coupé en 3 morceaux. Le premier est 2 fois plus long que le deuxième. Le troisième est 3 fois plus long que le deuxième. Quelle est la longueur du deuxième morceau ?", type: "partage", reponse: 20, astuce: "Deuxième = x. 2x + x + 3x = 120, 6x = 120, x = 20 cm" },
      // Pourcentages
      { enonce: "55 % de 300 =", type: "pourcentage", reponse: 165, astuce: "Pourcentage simple" },
      { enonce: "90 % de 450 =", type: "pourcentage", reponse: 405, astuce: "Pourcentage simple" },
      { enonce: "45 % de 200 =", type: "pourcentage", reponse: 90, astuce: "Pourcentage simple" },
      // Conversions
      { enonce: "5,6 km = ? m", type: "conversion", reponse: 5600, astuce: "Multiplier par 1000" },
      { enonce: "8,75 ha = ? a", type: "conversion", reponse: 875, astuce: "1 ha = 100 a" },
      { enonce: "3450 m = ? km", type: "conversion", reponse: 3.45, astuce: "Division par 1000" },
      // Divisions de décimaux par 0,01 et 0,1
      { enonce: "0,75 ÷ 0,01 =", type: "division", reponse: 75, astuce: "Diviser par 0,01 = multiplier par 100" },
      { enonce: "4,8 ÷ 0,1 =", type: "division", reponse: 48, astuce: "Diviser par 0,1 = multiplier par 10" },
      { enonce: "0,89 ÷ 0,01 =", type: "division", reponse: 89, astuce: "Diviser par 0,01 = multiplier par 100" },
      { enonce: "9,2 ÷ 0,1 =", type: "division", reponse: 92, astuce: "Diviser par 0,1 = multiplier par 10" },
      // Partages classiques
      { enonce: "Une somme de 1500 F est partagée entre A et B. A reçoit les 2/5 et B reçoit le reste. Combien B reçoit-il ?", type: "partage", reponse: 900, astuce: "1500 × 3/5 = 900 F" },
      { enonce: "Une somme de 2100 F est partagée entre A et B dans le rapport 4:3. Combien le second reçoit-il ?", type: "partage", reponse: 900, astuce: "2100 × 3/7 = 900 F" },
      { enonce: "0,48 ÷ 0,01 =", type: "division", reponse: 48, astuce: "Diviser par 0,01 = multiplier par 100" },
      // Questions additionnelles pour atteindre 20
      { enonce: "Un fermier partage 96 kg de pommes entre ses 4 enfants. L'aîné reçoit le double des autres. Combien reçoit l'aîné ?", type: "partage", reponse: 38.4, astuce: "Aîné = 2x, autres = x chacun. 2x + 3x = 96, 5x = 96, x = 19,2. Aîné = 38,4 kg" },
      { enonce: "35 % de 180 =", type: "pourcentage", reponse: 63, astuce: "35% × 180 = 63" },
      { enonce: "6,3 ÷ 0,1 =", type: "division", reponse: 63, astuce: "Diviser par 0,1 = multiplier par 10" },
    ]
  },
  {
    niveau: 18,
    duree: "20 mn",
    instructions: "Problèmes temps/vitesse/distance complexes, géométrie, fractions et pourcentages, multiplications/divisions",
    exercices: [
      { enonce: "Un train part à 21h34 et arrive à 5h30 le lendemain matin. Quelle est la durée du trajet ?", type: "temps", reponse: "7h56", astuce: "De 21h34 à minuit = 2h26, de minuit à 5h30 = 5h30. Total = 7h56" },
      { enonce: "Calcule l'aire d'un cercle de rayon 1 m (π = 3,14).", type: "geometrie", reponse: 3.14, astuce: "Aire = π × r² = 3,14 × 1 = 3,14 m²" },
      { enonce: "Calcule l'aire d'un rectangle de 25 m de longueur et 8 m de largeur.", type: "geometrie", reponse: 200, astuce: "Aire = L × l = 200 m²" },
      // Fractions (min 5)
      { enonce: "1/2 + 2/3 − 3/4 =", type: "fraction", reponse: 0.417, astuce: "= 6/12 + 8/12 − 9/12 = 5/12" },
      { enonce: "2/5 × 5/8 =", type: "fraction", reponse: 0.25, astuce: "= 10/40 = 1/4" },
      { enonce: "3/4 ÷ 6 =", type: "fraction", reponse: 0.125, astuce: "= 3/4 × 1/6 = 1/8" },
      { enonce: "5/6 − 1/2 + 1/3 =", type: "fraction", reponse: 0.667, astuce: "= 5/6 − 3/6 + 2/6 = 4/6 = 2/3" },
      { enonce: "1/4 + 3/8 + 1/8 =", type: "fraction", reponse: 0.75, astuce: "= 2/8 + 3/8 + 1/8 = 6/8 = 3/4" },
      // Pourcentages
      { enonce: "75 % de 360 =", type: "pourcentage", reponse: 270, astuce: "Pourcentage simple" },
      { enonce: "60 % de 450 =", type: "pourcentage", reponse: 270, astuce: "Pourcentage simple" },
      // Suite
      { enonce: "0,1 × 980 =", type: "multiplication", reponse: 98, astuce: "Multiplier par 0,1" },
      { enonce: "Un train part à 14h45 et arrive à 18h20. Quelle est la durée du trajet ?", type: "temps", reponse: "3h35", astuce: "De 14h45 à 18h20 = 3h35" },
      { enonce: "Un train roule à 120 km/h pendant 2,5 heures. Quelle distance parcourt-il ?", type: "probleme", reponse: 300, astuce: "Distance = vitesse × temps = 300 km" },
      { enonce: "Un coureur parcourt 450 km en 5 heures. Quelle est sa vitesse moyenne ?", type: "probleme", reponse: 90, astuce: "Vitesse = distance ÷ temps = 90 km/h" },
      { enonce: "Calcule l'aire d'un carré dont le côté mesure 17 m.", type: "geometrie", reponse: 289, astuce: "Aire = côté² = 289 m²" },
      { enonce: "Calcule le périmètre d'un cercle de rayon 10 m (π = 3,14).", type: "geometrie", reponse: 62.8, astuce: "Périmètre = 2 × π × r = 62,8 m" },
      { enonce: "0,01 × 560 =", type: "multiplication", reponse: 5.6, astuce: "Multiplier par 0,01" },
      { enonce: "7500 ÷ 1000 =", type: "division", reponse: 7.5, astuce: "Division par 1000" },
      { enonce: "Calcule le périmètre d'un rectangle de 22 m de longueur et 11 m de largeur.", type: "geometrie", reponse: 66, astuce: "Périmètre = 2 × (L + l) = 66 m" },
      { enonce: "Dans un triangle rectangle, un angle aigu mesure 35°. Quelle est la mesure de l'autre angle aigu ?", type: "geometrie", reponse: 55, astuce: "90° − 35° = 55° (les deux angles aigus sont complémentaires)" },
    ]
  },
  {
    niveau: 19,
    duree: "20 mn",
    instructions: "Consolidation de tous types : fractions, pourcentages, conversions, partages inégaux, multiplications/divisions",
    exercices: [
      // Distance, temps, vitesse - réponses en format temps pour les questions de durée
      { enonce: "Un cycliste roule à 24 km/h. Combien de temps lui faut-il pour parcourir 36 km ?", type: "temps", reponse: "1h30", astuce: "Temps = distance ÷ vitesse = 36 ÷ 24 = 1,5 h = 1h30" },
      { enonce: "Une voiture roule pendant 2h30 à 80 km/h. Quelle distance a-t-elle parcourue ?", type: "vitesse", reponse: 200, astuce: "Distance = vitesse × temps = 80 × 2,5 = 200 km" },
      { enonce: "Un train parcourt 270 km en 3 heures. Quelle est sa vitesse moyenne ?", type: "vitesse", reponse: 90, astuce: "Vitesse = distance ÷ temps = 270 ÷ 3 = 90 km/h" },
      { enonce: "À 60 km/h, combien de temps faut-il pour parcourir 150 km ?", type: "temps", reponse: "2h30", astuce: "Temps = 150 ÷ 60 = 2,5 h = 2h30" },
      { enonce: "Un marathonien court à 15 km/h pendant 2h40. Quelle distance a-t-il parcourue ?", type: "vitesse", reponse: 40, astuce: "Distance = 15 × (2 + 40/60) = 15 × 2,667 = 40 km" },
      { enonce: "7/10 − 2/5 =", type: "fraction", reponse: 0.3, astuce: "= 7/10 − 4/10 = 3/10" },
      // Pourcentages
      { enonce: "30 % de 200 + 55 % de 200 =", type: "pourcentage", reponse: 170, astuce: "60 + 110 = 170" },
      { enonce: "85 % de 600 =", type: "pourcentage", reponse: 510, astuce: "Pourcentage simple" },
      // Conversions
      { enonce: "7,25 km = ? m", type: "conversion", reponse: 7250, astuce: "Multiplier par 1000" },
      { enonce: "12,5 ha = ? a", type: "conversion", reponse: 1250, astuce: "1 ha = 100 a" },
      { enonce: "8450 m = ? km", type: "conversion", reponse: 8.45, astuce: "Division par 1000" },
      // Partages
      { enonce: "Une somme de 1800 F est partagée entre A et B. A reçoit les 5/6 et B reçoit le reste. Combien B reçoit-il ?", type: "partage", reponse: 300, astuce: "1800 × 1/6 = 300 F" },
      { enonce: "Une somme de 2500 F est partagée entre A et B dans le rapport 3:2. Combien le second reçoit-il ?", type: "partage", reponse: 1000, astuce: "2500 × 2/5 = 1000 F" },
      // Multiplications/divisions
      { enonce: "120 × 1000 =", type: "multiplication", reponse: 120000, astuce: "Multiplier par 1000" },
      { enonce: "360 ÷ 0,01 =", type: "division", reponse: 36000, astuce: "Diviser par 0,01" },
      { enonce: "0,1 × 730 =", type: "multiplication", reponse: 73, astuce: "Multiplier par 0,1" },
      { enonce: "0,01 × 940 =", type: "multiplication", reponse: 9.4, astuce: "Multiplier par 0,01" },
      { enonce: "5600 ÷ 100 =", type: "division", reponse: 56, astuce: "Division par 100" },
      { enonce: "89 × 1000 =", type: "multiplication", reponse: 89000, astuce: "Multiplier par 1000" },
      { enonce: "420 ÷ 0,1 =", type: "division", reponse: 4200, astuce: "Diviser par 0,1" },
    ]
  },
  {
    niveau: 20,
    duree: "30 mn",
    instructions: "Niveau Élite : Aucune erreur permise. Tous types combinés : fractions, pourcentages, partages, problèmes implicites",
    exercices: [
      // Nouvelles questions (remplaçant les questions de durée)
      { enonce: "5/4 de 48 =", type: "fraction", reponse: 60, astuce: "5/4 × 48 = 5 × 12 = 60" },
      { enonce: "248 × 0,5 =", type: "multiplication", reponse: 124, astuce: "Multiplier par 0,5 = diviser par 2" },
      { enonce: "Le double du tiers de 630 =", type: "probleme", reponse: 420, astuce: "Tiers = 630 ÷ 3 = 210. Double = 420" },
      { enonce: "Paul met 50 min pour aller au travail et arrive à 7h15. À quelle heure est-il parti ?", type: "temps", reponse: "6h25", astuce: "7h15 − 50 min = 6h25" },
      { enonce: "Ali dépense 650 francs, soit 2/3 de son argent. Combien avait-il ?", type: "probleme", reponse: 975, astuce: "650 = 2/3 × X. X = 650 × 3/2 = 975 F" },
      { enonce: "0,0537 ÷ 0,0001 =", type: "division", reponse: 537, astuce: "Diviser par 0,0001 = multiplier par 10 000" },
      // Problèmes implicites
      { enonce: "Une classe de 28 élèves part en sortie. Le bus coûte 140 F. Chaque élève paie aussi 15 F pour l'entrée du musée. Quel est le coût total de la sortie ?", type: "probleme", reponse: 560, astuce: "Bus 140 + (28 × 15) = 140 + 420 = 560 F" },
      { enonce: "Un commerçant achète 45 stylos à 8 F pièce et les revend 12 F pièce. Quel est son bénéfice total ?", type: "probleme", reponse: 180, astuce: "Bénéfice unitaire = 12 − 8 = 4 F. Total = 45 × 4 = 180 F" },
      { enonce: "Pierre achète 3 cahiers à 25 F et 5 stylos à 8 F. Il paie avec un billet de 200 F. Combien lui rend-on ?", type: "probleme", reponse: 85, astuce: "(3 × 25) + (5 × 8) = 75 + 40 = 115 F. Rendu = 200 − 115 = 85 F" },
      { enonce: "Un jardinier plante 8 rangées de 12 tulipes et 5 rangées de 15 roses. Combien de fleurs a-t-il plantées ?", type: "probleme", reponse: 171, astuce: "(8 × 12) + (5 × 15) = 96 + 75 = 171 fleurs" },
      { enonce: "Marie a 45 F. Elle achète 2 croissants à 7 F et un jus à 12 F. Combien peut-elle encore dépenser ?", type: "probleme", reponse: 19, astuce: "Dépense = (2 × 7) + 12 = 26 F. Reste = 45 − 26 = 19 F" },
      // Problèmes avec pourcentages implicites
      { enonce: "Un article coûte 80 F. Il est soldé à 25 %. On ajoute ensuite 10 F de frais de port. Quel est le prix final ?", type: "probleme", reponse: 70, astuce: "Prix soldé = 80 × 0,75 = 60 F. Final = 60 + 10 = 70 F" },
      { enonce: "Un ouvrier travaille 8h par jour pendant 5 jours. Il est payé 12 F de l'heure. Combien gagne-t-il ?", type: "probleme", reponse: 480, astuce: "Heures = 8 × 5 = 40 h. Salaire = 40 × 12 = 480 F" },
      // Problèmes de distance implicites
      { enonce: "Une voiture consomme 8 L aux 100 km. Pour un trajet de 250 km, le litre d'essence coûte 2 F. Quel est le coût du trajet ?", type: "probleme", reponse: 40, astuce: "Consommation = 250 × 8/100 = 20 L. Coût = 20 × 2 = 40 F" },
      { enonce: "Un cycliste roule à 20 km/h pendant 2h30, puis à 15 km/h pendant 2h. Quelle distance totale a-t-il parcourue ?", type: "probleme", reponse: 80, astuce: "D1 = 20 × 2,5 = 50 km. D2 = 15 × 2 = 30 km. Total = 80 km" },
      // Partages implicites
      { enonce: "Trois amis se partagent 120 billes. Le premier en prend le tiers, le second la moitié de ce qui reste. Combien le troisième reçoit-il ?", type: "probleme", reponse: 40, astuce: "Premier = 40. Reste = 80. Second = 40. Troisième = 40" },
      { enonce: "Un héritage de 9000 F est partagé. L'aîné reçoit 2/5, le cadet 1/3, le benjamin le reste. Combien reçoit le benjamin ?", type: "probleme", reponse: 2400, astuce: "Aîné = 3600, Cadet = 3000. Benjamin = 9000 − 3600 − 3000 = 2400 F" },
      // Géométrie implicite
      { enonce: "Un carré a un périmètre de 48 cm. On veut doubler son côté. Quelle sera l'aire du nouveau carré ?", type: "probleme", reponse: 576, astuce: "Côté = 48/4 = 12 cm. Nouveau côté = 24 cm. Aire = 576 cm²" },
      { enonce: "Un rectangle a une aire de 120 cm² et une largeur de 8 cm. On veut l'entourer de ruban. Quelle longueur de ruban faut-il ?", type: "probleme", reponse: 46, astuce: "Longueur = 120/8 = 15 cm. Périmètre = 2 × (15 + 8) = 46 cm" },
      // Multiplications/divisions avec contexte
      { enonce: "Une usine produit 850 pièces par jour. Combien en produit-elle en 2 semaines de 5 jours ?", type: "probleme", reponse: 8500, astuce: "Jours = 2 × 5 = 10. Production = 850 × 10 = 8500 pièces" },
    ]
  },
];

// Niveau Évaluation (0) - Libre d'accès, évalue le niveau des apprenants
export const niveauEvaluation: NiveauData = {
  niveau: 0,
  duree: "30 mn",
  instructions: "Évaluation diagnostique : Ce test évalue votre niveau en calcul mental. Répondez à toutes les questions. Une note sur 20 sera calculée à la fin.",
  exercices: [
    // Questions du Concours adaptées pour évaluation
    { enonce: "Quel est le poids de 72 crayons si un crayon pèse 11 grammes ?", type: "probleme", reponse: 792, astuce: "72 × 11 = 792 g" },
    { enonce: "Un avion vole à une vitesse de 600 km/h. Quelle distance a-t-il parcourue en 55 minutes ?", type: "probleme", reponse: 550, astuce: "600 × 55/60 = 550 km" },
    { enonce: "Je fais un achat de 525 francs avec un billet de 2000 francs. Combien de francs me rend-on ?", type: "probleme", reponse: 1475, astuce: "2000 − 525 = 1475 F" },
    { enonce: "22 m × 0,5 m = ?", type: "multiplication", reponse: 11, astuce: "22 × 0,5 = 11 m²" },
    { enonce: "2,5 décalitres = combien de litres ?", type: "conversion", reponse: 25, astuce: "1 daL = 10 L. 2,5 × 10 = 25 L" },
    { enonce: "120 degrés + combien = 180 degrés ?", type: "probleme", reponse: 60, astuce: "180 − 120 = 60°" },
    { enonce: "10h45 − 8h50 = ?", type: "temps", reponse: "1h55", astuce: "10h45 − 8h50 = 1h55" },
    { enonce: "7000 F sont partagés entre 2 enfants. L'aîné reçoit le double du cadet. Quelle est la part du cadet ?", type: "partage", reponse: 2333.33, astuce: "Cadet = x, Aîné = 2x. 3x = 7000. x ≈ 2333,33 F" },
    { enonce: "Le triple d'un nombre est 60. Quelle est sa moitié ?", type: "probleme", reponse: 10, astuce: "Nombre = 60 ÷ 3 = 20. Moitié = 10" },
    { enonce: "Quel est le prix de 50 g de poisson à 2500 francs le kilogramme ?", type: "probleme", reponse: 125, astuce: "50 g = 0,05 kg. 2500 × 0,05 = 125 F" },
    { enonce: "Nathan a 14 ans. Sa sœur cadette a 5 ans. Quel est l'âge de la sœur jumelle de Nathan ?", type: "probleme", reponse: 14, astuce: "La jumelle a le même âge que Nathan = 14 ans" },
    { enonce: "Combien économises-tu pour un achat de 12500 francs avec une réduction de 8% ?", type: "pourcentage", reponse: 1000, astuce: "12500 × 8/100 = 1000 F" },
    { enonce: "Un intérêt annuel de 80 francs est produit par un capital de 1000 francs. À quel taux ?", type: "pourcentage", reponse: 8, astuce: "Taux = 80/1000 × 100 = 8%" },
    { enonce: "Une douzaine d'œufs coûte 600 francs. Quel est le prix de 180 œufs ?", type: "probleme", reponse: 9000, astuce: "180 ÷ 12 = 15 douzaines. 15 × 600 = 9000 F" },
    { enonce: "123 × 11 =", type: "multiplication", reponse: 1353, astuce: "123 × 11 = 1353" },
    { enonce: "15 jours = combien d'heures ?", type: "conversion", reponse: 360, astuce: "15 × 24 = 360 heures" },
    { enonce: "1 hectare = combien de mètres carrés ?", type: "conversion", reponse: 10000, astuce: "1 ha = 10 000 m²" },
    { enonce: "La surface d'un rectangle de périmètre 28 m et de longueur 8 m est ?", type: "geometrie", reponse: 48, astuce: "Périmètre = 2(L+l) = 28 → L+l = 14. l = 6 m. Aire = 8 × 6 = 48 m²" },
    { enonce: "Dans une classe, il y a 14 filles, soit 25% de la classe. Combien y a-t-il de garçons ?", type: "pourcentage", reponse: 42, astuce: "Total = 14/0,25 = 56. Garçons = 56 − 14 = 42" },
    { enonce: "Si on prévoit 3 L pour 2 personnes, combien de litres doit-on prévoir pour 10 personnes ?", type: "probleme", reponse: 15, astuce: "3/2 × 10 = 15 L" },
    { enonce: "Un triangle rectangle a un angle de 40°. Quelles sont les mesures des autres angles ? (donner la somme)", type: "geometrie", reponse: 140, astuce: "90° + 40° + 50° = 180°. Somme = 140°" },
    { enonce: "3,5 × 1,1 =", type: "multiplication", reponse: 3.85, astuce: "3,5 × 1,1 = 3,85" },
    { enonce: "Pierre décolle à 21h35 et atterrit à 6h12 le lendemain. Durée du vol en minutes ?", type: "temps", reponse: 517, astuce: "De 21h35 à 6h12 = 8h37 = 517 min" },
    { enonce: "Un seau de 10 L est rempli aux 3/4. Combien de litres contient-il ?", type: "fraction", reponse: 7.5, astuce: "10 × 3/4 = 7,5 L" },
    { enonce: "1 ha 2 a 45 ca = combien de mètres carrés ?", type: "conversion", reponse: 10245, astuce: "1 ha = 10000, 2 a = 200, 45 ca = 45. Total = 10245 m²" },
    { enonce: "Achille veut ranger 70 œufs dans des alvéoles de 12. Combien d'alvéoles lui faut-il ?", type: "probleme", reponse: 6, astuce: "70 ÷ 12 = 5,83... Il faut 6 alvéoles" },
    { enonce: "Le collège Libermann a été créé en 1952. En quelle année a-t-il célébré son cinquantenaire ?", type: "probleme", reponse: 2002, astuce: "1952 + 50 = 2002" },
    { enonce: "Recette : 2 kg de sucre pour 3 kg de pommes. Combien de kg de pommes pour 3 kg de sucre ?", type: "probleme", reponse: 4.5, astuce: "3/2 × 3 = 4,5 kg" },
    { enonce: "Combien y a-t-il de dizaines dans 326,15 ?", type: "probleme", reponse: 32, astuce: "326,15 ÷ 10 = 32,615 → 32 dizaines" },
    { enonce: "Un robinet donne 60 L en 5 min. Quel est son débit en L/min ?", type: "probleme", reponse: 12, astuce: "60 ÷ 5 = 12 L/min" },
    { enonce: "Un match de foot commence à 16h15. Après 2 mi-temps de 45 min et 15 min de pause, quelle est l'heure de fin ?", type: "temps", reponse: "18h", astuce: "16h15 + 45 + 45 + 15 = 18h" },
    { enonce: "Combien de litres d'eau pèsent 13,5 kg ?", type: "conversion", reponse: 13.5, astuce: "1 L d'eau = 1 kg. 13,5 kg = 13,5 L" },
    { enonce: "Surface d'un triangle : base 12 m, hauteur 6 m ?", type: "geometrie", reponse: 36, astuce: "Aire = (12 × 6) / 2 = 36 m²" },
    { enonce: "3h45 + 5h27 = ?", type: "temps", reponse: "9h12", astuce: "3h45 + 5h27 = 9h12" },
    { enonce: "Échelle 1/1000. Une rue mesure 17,5 mm sur le plan. Longueur réelle en m ?", type: "probleme", reponse: 17.5, astuce: "17,5 mm × 1000 = 17 500 mm = 17,5 m" },
    { enonce: "Notes : 14, 10, 8, 12. Moyenne ?", type: "probleme", reponse: 11, astuce: "(14 + 10 + 8 + 12) / 4 = 11" },
    { enonce: "Camara lit un livre de la page 70 à la page 140. Combien de pages a-t-il lues ?", type: "probleme", reponse: 71, astuce: "140 − 70 + 1 = 71 pages" },
    { enonce: "Max a 1 an, Jacques 12 ans, Erwin 3 ans. Le père avait 26 ans à la naissance de l'aîné. Quel âge a le père aujourd'hui ?", type: "probleme", reponse: 38, astuce: "L'aîné est Jacques (12 ans). Père = 26 + 12 = 38 ans" },
    { enonce: "Un cercle a un périmètre de 314 m (π = 3,14). Quel est son rayon ?", type: "geometrie", reponse: 50, astuce: "P = 2πr → r = 314 / (2 × 3,14) = 50 m" },
    { enonce: "L'épreuve dure 25 min et se termine à 12h20. Heure de début ?", type: "temps", reponse: "11h55", astuce: "12h20 − 25 min = 11h55" },
    { enonce: "42 × 11 =", type: "multiplication", reponse: 462, astuce: "42 × 11 = 462" },
    { enonce: "0,23 ÷ 0,01 =", type: "division", reponse: 23, astuce: "Diviser par 0,01 = multiplier par 100" },
    { enonce: "Un bidon plein aux 2/3 contient 10 L. Combien faut-il ajouter pour le remplir ?", type: "fraction", reponse: 5, astuce: "Capacité = 10 × 3/2 = 15 L. Manque = 15 − 10 = 5 L" },
    { enonce: "Dans 4376, combien y a-t-il de centaines ?", type: "probleme", reponse: 43, astuce: "4376 ÷ 100 = 43,76 → 43 centaines" },
    { enonce: "Quel est le côté d'un carré de 225 m² ?", type: "geometrie", reponse: 15, astuce: "√225 = 15 m" },
    { enonce: "Un couple de pigeons coûte 18000 francs. Combien coûtent 40 pigeons ?", type: "probleme", reponse: 360000, astuce: "1 couple = 2 pigeons. 40/2 = 20 couples. 20 × 18000 = 360 000 F" },
    { enonce: "Ami vend 25 cl à 250 francs. Rose vend 1 L à 900 francs. Lequel vend le moins cher ? (prix au litre d'Ami)", type: "probleme", reponse: 1000, astuce: "Ami: 250/0,25 = 1000 F/L. Rose: 900 F/L. Rose est moins cher." },
  ]
};

// Niveau Concours (21) - Questions du concours original conservées
export const niveauConcours: NiveauData = {
  niveau: 21,
  duree: "30 mn",
  instructions: "Calcul mental avancé : fractions, %, partages inégaux, temps/vitesse/distance, échelle, conversions, multiplications/divisions par 0,01/0,1/10/100/1000",
  exercices: [
    { enonce: "Combien coûte un sac si les 2/3 de son prix valent 900 F ?", type: "probleme", reponse: 1350, astuce: "900 ÷ 2 × 3 = 1350 F" },
    { enonce: "Pierre et Paul se partagent 1000 F. Pierre reçoit 3 fois plus que Paul. Combien Paul reçoit-il ?", type: "probleme", reponse: 250, astuce: "1000 ÷ 4 = 250 F (Paul = 1 part sur 4)" },
    { enonce: "Un bidon rempli aux 2/3 contient 10 litres. Combien de litres faut-il ajouter pour le remplir complètement ?", type: "probleme", reponse: 5, astuce: "Capacité = 10 ÷ 2 × 3 = 15 L. Il manque 15 − 10 = 5 L" },
    { enonce: "Voici 4 notes : 12, 15, 14 et 13. Quelle est la moyenne de ces notes ?", type: "probleme", reponse: 13.5, astuce: "(12 + 15 + 14 + 13) ÷ 4 = 13,5" },
    { enonce: "Un train part à 21h34 et arrive à 5h30 le lendemain. Quelle est la durée du trajet ?", type: "temps", reponse: "7h56", astuce: "De 21h34 à minuit = 2h26, de minuit à 5h30 = 5h30. Total = 7h56" },
    // Fractions (min 5)
    { enonce: "1/2 + 2/3 − 3/4 =", type: "fraction", reponse: 0.417, astuce: "= 6/12 + 8/12 − 9/12 = 5/12" },
    { enonce: "3/5 × 5/6 =", type: "fraction", reponse: 0.5, astuce: "= 15/30 = 1/2" },
    { enonce: "7/8 ÷ 7 =", type: "fraction", reponse: 0.125, astuce: "= 1/8" },
    { enonce: "5/6 + 1/3 − 1/2 =", type: "fraction", reponse: 0.667, astuce: "= 5/6 + 2/6 − 3/6 = 4/6 = 2/3" },
    { enonce: "2/5 + 3/10 =", type: "fraction", reponse: 0.7, astuce: "= 4/10 + 3/10 = 7/10" },
    // Suite
    { enonce: "Sur un plan à l'échelle 1/1000, une rue mesure 17,5 cm. Quelle est sa longueur réelle en cm ?", type: "probleme", reponse: 17500, astuce: "17,5 × 1000 = 17 500 cm" },
    { enonce: "0,01 × 350 =", type: "multiplication", reponse: 3.5, astuce: "Multiplier par 0,01" },
    { enonce: "450 ÷ 100 =", type: "division", reponse: 4.5, astuce: "Diviser par 100" },
    { enonce: "0,1 × 280 =", type: "multiplication", reponse: 28, astuce: "Multiplier par 0,1" },
    { enonce: "600 ÷ 1000 =", type: "division", reponse: 0.6, astuce: "Diviser par 1000" },
    { enonce: "Quel âge a ton père aujourd'hui s'il avait 35 ans en 2015 ?", type: "probleme", reponse: 46, astuce: "2026 − 2015 + 35 = 46 ans" },
    { enonce: "Un bidon de 15 litres est rempli aux 3/5 de sa capacité. Combien de litres d'eau contient-il ?", type: "probleme", reponse: 9, astuce: "15 × 3/5 = 9 L" },
    { enonce: "Combien coûte un sac si les 3/4 de son prix valent 900 F ?", type: "probleme", reponse: 1200, astuce: "900 ÷ 3 × 4 = 1200 F" },
    { enonce: "Un cycliste parcourt 180 km en 3 heures. Quelle est sa vitesse moyenne ?", type: "probleme", reponse: 60, astuce: "Vitesse = distance ÷ temps = 60 km/h" },
    { enonce: "Un champ de 6 ha est partagé : 1/3 pour A et le reste pour B. Quelle surface B reçoit-il en ha ?", type: "probleme", reponse: 4, astuce: "6 − (6 × 1/3) = 6 − 2 = 4 ha" },
  ]
};

// Niveau Problèmes (22) - 30 problèmes, 1h, calculs posés autorisés
export const niveauProblemes: NiveauData = {
  niveau: 22,
  duree: "60 mn",
  instructions: "Problèmes de type concours. Les calculs posés sont autorisés. Prenez le temps de bien lire chaque énoncé.",
  exercices: [
    { enonce: "Un réservoir de 500 litres est rempli d'eau aux 3/5. On en retire 120 litres. Quelle quantité d'eau reste-t-il ?", type: "probleme", reponse: 180, astuce: "500 × 3/5 = 300 L. Reste 300 - 120 = 180 L" },
    { enonce: "Dans une classe de 32 élèves, les 3/8 sont des filles. Parmi les garçons, 1/4 portent des lunettes. Combien de garçons portent des lunettes ?", type: "probleme", reponse: 5, astuce: "Filles = 32 × 3/8 = 12. Garçons = 20. 20 × 1/4 = 5" },
    { enonce: "Un commerçant achète 150 articles à 800 F pièce et les revend avec un bénéfice de 25 %. Quel est son bénéfice total ?", type: "probleme", reponse: 30000, astuce: "Coût = 150 × 800 = 120 000 F. Bénéfice = 120 000 × 0,25 = 30 000 F" },
    { enonce: "Trois robinets remplissent un bassin. Le premier seul le remplit en 6h, le deuxième en 4h, le troisième en 3h. En combien d'heures les trois robinets ensemble remplissent-ils le bassin ?", type: "probleme", reponse: 1.33, astuce: "1/6 + 1/4 + 1/3 = 2/12 + 3/12 + 4/12 = 9/12 = 3/4 par heure. Temps = 4/3 h ≈ 1,33 h" },
    { enonce: "Un train part de Yaoundé à 8h15 et arrive à Bertoua à 11h45. Il roule à une vitesse moyenne de 90 km/h. Quelle est la distance entre Yaoundé et Bertoua ?", type: "probleme", reponse: 315, astuce: "Durée = 3h30 = 3,5 h. Distance = 90 × 3,5 = 315 km" },
    { enonce: "Pierre a économisé 2/5 de son argent de poche. Il a dépensé 3/4 du reste pour acheter un livre à 1500 F. Quel était son argent de poche initial ?", type: "probleme", reponse: 10000, astuce: "Reste = 3/5. Dépense = 3/4 de 3/5 = 9/20. 9/20 × X = 1500 → X = 10 000 F" },
    { enonce: "Un rectangle a un périmètre de 56 cm. Sa longueur est le double de sa largeur augmentée de 4 cm. Quelles sont ses dimensions ?", type: "probleme", reponse: 20, astuce: "L = 2l + 4. 2L + 2l = 56 → L + l = 28. 2l + 4 + l = 28 → l = 8, L = 20" },
    { enonce: "Dans un troupeau, il y a des vaches et des poulets. On compte 50 têtes et 140 pattes. Combien y a-t-il de vaches ?", type: "probleme", reponse: 20, astuce: "V + P = 50 et 4V + 2P = 140. 4V + 2(50-V) = 140 → 2V = 40 → V = 20" },
    { enonce: "On place 50 000 F à la banque au taux de 5 % par an. Quel est le montant des intérêts au bout d'un an ?", type: "probleme", reponse: 2500, astuce: "Intérêts = 50 000 × 5/100 = 2 500 F" },
    { enonce: "Une fontaine remplit un bassin de 1 200 litres en 4 heures. Une fuite vide ce même bassin en 6 heures. Le bassin étant vide au départ et la fuite active, en combien d'heures sera-t-il plein ?", type: "probleme", reponse: 12, astuce: "Remplissage = 300 L/h. Fuite = 200 L/h. Net = 100 L/h. 1200/100 = 12 h" },
    { enonce: "Un marchand achète 80 kg de riz à 250 F le kg. Il revend 60 kg à 300 F le kg et le reste à 200 F le kg. Quel est son bénéfice ou sa perte ?", type: "probleme", reponse: 2000, astuce: "Achat = 20 000 F. Vente = 18 000 + 4 000 = 22 000 F. Bénéfice = 2 000 F" },
    { enonce: "L'âge de Paul est le tiers de celui de son père. Dans 15 ans, l'âge de Paul sera la moitié de celui de son père. Quel est l'âge actuel de Paul ?", type: "probleme", reponse: 15, astuce: "P = p/3. P + 15 = (p + 15)/2 → 2P + 30 = p + 15 → 2 × p/3 + 30 = p + 15 → p = 45, P = 15" },
    { enonce: "Un cycliste parcourt les 2/5 d'un trajet en 40 minutes. À la même vitesse, combien de temps lui faudra-t-il pour parcourir tout le trajet ?", type: "probleme", reponse: 100, astuce: "2/5 → 40 min. 1/5 → 20 min. 5/5 → 100 min" },
    { enonce: "Dans une école, 3/7 des élèves sont en CM1 et 2/5 du reste sont en CM2. Les 120 autres élèves sont dans d'autres classes. Combien y a-t-il d'élèves en tout ?", type: "probleme", reponse: 350, astuce: "Reste = 4/7. CM2 = 2/5 × 4/7 = 8/35. Autres = 1 - 3/7 - 8/35 = 12/35 = 120. Total = 350" },
    { enonce: "Un jardin rectangulaire a une superficie de 480 m². Sa longueur dépasse sa largeur de 8 m. Quel est le périmètre de ce jardin ?", type: "probleme", reponse: 88, astuce: "L × l = 480 et L = l + 8. l(l+8) = 480 → l = 20, L = 28. P = 2(20+28) = 88 m" },
    { enonce: "Un avion vole pendant 2h30 à 720 km/h, puis pendant 1h45 à 640 km/h. Quelle distance totale a-t-il parcourue ?", type: "probleme", reponse: 2920, astuce: "D1 = 720 × 2,5 = 1800 km. D2 = 640 × 1,75 = 1120 km. Total = 2920 km" },
    { enonce: "Trois amis Albert, Bernard et Charles se partagent 4 500 F. Albert reçoit le double de Bernard, et Bernard reçoit le triple de Charles. Combien chacun reçoit-il ?", type: "probleme", reponse: 450, astuce: "C = x, B = 3x, A = 6x. 10x = 4 500 → x = 450. Charles = 450 F, Bernard = 1350 F, Albert = 2700 F" },
    { enonce: "Un rectangle a pour dimensions 12 cm et 9 cm. On augmente sa longueur de 25 % et on diminue sa largeur de 1/3. Quelle est l'aire du nouveau rectangle ?", type: "probleme", reponse: 90, astuce: "Nouvelle L = 12 × 1,25 = 15. Nouvelle l = 9 × 2/3 = 6. Aire = 90 cm²" },
    { enonce: "Un ouvrier fait un travail en 12 jours. Un second ouvrier fait le même travail en 8 jours. Travaillant ensemble, en combien de jours finissent-ils ce travail ?", type: "probleme", reponse: 4.8, astuce: "1/12 + 1/8 = 5/24 par jour. Temps = 24/5 = 4,8 jours" },
    { enonce: "Une bouteille et son bouchon coûtent 110 F ensemble. La bouteille coûte 100 F de plus que le bouchon. Combien coûte le bouchon ?", type: "probleme", reponse: 5, astuce: "b + (b + 100) = 110 → 2b = 10 → b = 5 F" },
    { enonce: "Sur une carte à l'échelle 1/50 000, deux villes sont séparées de 14 cm. Quelle est la distance réelle entre ces villes en km ?", type: "probleme", reponse: 7, astuce: "14 × 50 000 = 700 000 cm = 7 km" },
    { enonce: "Un négociant achète du tissu à 1 500 F le mètre. Pour le revendre, il majore de 20%. Quel est son bénéfice par mètre ?", type: "probleme", reponse: 300, astuce: "Prix de vente = 1500 × 1,20 = 1800 F. Bénéfice = 1800 - 1500 = 300 F" },
    { enonce: "L'aire d'un carré est 36 cm². On double le côté de ce carré. Quelle est l'aire du nouveau carré ?", type: "probleme", reponse: 144, astuce: "Côté = 6. Nouveau côté = 12. Aire = 144 cm²" },
    { enonce: "Un automobiliste parcourt 240 km en 3 heures. Puis il ralentit et parcourt les 180 km suivants en 2h30. Quelle est sa vitesse moyenne sur l'ensemble du trajet ?", type: "probleme", reponse: 76.36, astuce: "Distance totale = 420 km. Temps = 5,5 h. Vitesse = 420/5,5 ≈ 76,36 km/h" },
    { enonce: "Un père a 42 ans et son fils 14 ans. Dans combien d'années l'âge du père sera-t-il le double de celui du fils ?", type: "probleme", reponse: 14, astuce: "42 + n = 2(14 + n) → 42 + n = 28 + 2n → n = 14 ans" },
    { enonce: "Une cuve contient 750 litres d'eau. On en retire 15 % puis on ajoute 50 litres. Combien de litres y a-t-il maintenant dans la cuve ?", type: "probleme", reponse: 687.5, astuce: "750 × 0,85 = 637,5. 637,5 + 50 = 687,5 L" },
    { enonce: "Trois nombres consécutifs ont pour somme 156. Quel est le plus grand de ces trois nombres ?", type: "probleme", reponse: 53, astuce: "n + (n+1) + (n+2) = 156 → 3n + 3 = 156 → n = 51. Plus grand = 53" },
    { enonce: "Un article subit une hausse de 10 % et coûte maintenant 495 F. Quel était son prix initial ?", type: "probleme", reponse: 450, astuce: "Prix initial × 1,10 = 495 → Prix initial = 495 ÷ 1,10 = 450 F" },
    { enonce: "Un bassin peut être rempli par un robinet A en 5h ou par un robinet B en 3h. On ouvre d'abord A seul pendant 2h, puis A et B ensemble. En combien de temps le bassin sera-t-il plein au total ?", type: "probleme", reponse: 3.125, astuce: "Après 2h: 2/5 rempli. Reste 3/5. Ensemble: 1/5 + 1/3 = 8/15 par h. 3/5 ÷ 8/15 = 9/8 h. Total = 2 + 1,125 = 3,125 h" },
    { enonce: "Un rectangle a un périmètre de 84 cm. Si on augmente sa longueur de 5 cm et qu'on diminue sa largeur de 3 cm, le périmètre reste le même. Quelles sont les dimensions initiales ?", type: "probleme", reponse: 25, astuce: "L + l = 42. Les dimensions peuvent varier tant que L + l = 42. Exemple: L = 25, l = 17" },
  ]
};

// Fonction pour obtenir les exercices d'un niveau
export const getExercisesForLevel = (level: number): StructuredExercise[] => {
  if (level === 0) {
    return niveauEvaluation.exercices;
  }
  if (level === 21) {
    return niveauConcours.exercices;
  }
  if (level === 22) {
    return niveauProblemes.exercices;
  }
  const niveauData = niveaux.find(n => n.niveau === level);
  return niveauData?.exercices || [];
};

// Fonction pour obtenir les instructions d'un niveau
export const getLevelInstructions = (level: number): string => {
  if (level === 0) {
    return niveauEvaluation.instructions;
  }
  if (level === 21) {
    return niveauConcours.instructions;
  }
  if (level === 22) {
    return niveauProblemes.instructions;
  }
  const niveauData = niveaux.find(n => n.niveau === level);
  return niveauData?.instructions || '';
};

// Fonction pour obtenir la durée d'un niveau
export const getLevelDuration = (level: number): string => {
  if (level === 0) {
    return niveauEvaluation.duree;
  }
  if (level === 21) {
    return niveauConcours.duree;
  }
  if (level === 22) {
    return niveauProblemes.duree;
  }
  const niveauData = niveaux.find(n => n.niveau === level);
  return niveauData?.duree || '10 mn';
};
