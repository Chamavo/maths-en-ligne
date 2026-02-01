// Types for revision exercises
export type RevisionExerciseType = 'numeric' | 'qcm' | 'ordering' | 'text';

export interface RevisionExercise {
  id: number;
  categoryId: number;
  question: string;
  type: RevisionExerciseType;
  answer: string | number;
  // For QCM
  choices?: string[];
  // For ordering
  orderItems?: string[];
  correctOrder?: string[];
  // Hint for wrong answers
  hint?: string;
}

// ===== CATÉGORIE 1: NUMÉRATION (50 exercices) =====
const numerationExercises: RevisionExercise[] = [
  {
    id: 1,
    categoryId: 1,
    question: "Écris en chiffres : Deux millions cinq cent huit mille onze.",
    type: 'numeric',
    answer: 2508011,
    hint: "2 millions = 2 000 000, 508 mille = 508 000, 11 unités"
  },
  {
    id: 2,
    categoryId: 1,
    question: "Écris en lettres le nombre : 5 214 807.",
    type: 'qcm',
    answer: "Cinq millions deux cent quatorze mille huit cent sept",
    choices: [
      "Cinq millions deux cent quatorze mille huit cent sept",
      "Cinq millions deux cent quarante mille huit cent sept",
      "Cinquante-deux millions quatorze mille huit cent sept",
      "Cinq millions deux cent quatorze mille huit cent soixante-dix"
    ],
    hint: "5 = cinq millions, 214 = deux cent quatorze mille, 807 = huit cent sept"
  },
  {
    id: 3,
    categoryId: 1,
    question: "Écris en chiffres : cinq millions trois cent trente-sept mille vingt.",
    type: 'numeric',
    answer: 5337020,
    hint: "5 millions + 337 mille + 20"
  },
  {
    id: 4,
    categoryId: 1,
    question: "Écris en chiffres : cinq unités quatre millièmes.",
    type: 'numeric',
    answer: 5.004,
    hint: "5 unités = 5, 4 millièmes = 0,004"
  },
  {
    id: 5,
    categoryId: 1,
    question: "Écris en chiffres : cinq millions trois cent trente-sept mille quatre cents.",
    type: 'numeric',
    answer: 5337400,
    hint: "5 millions + 337 mille + 400"
  },
  {
    id: 6,
    categoryId: 1,
    question: "Écris en chiffres : cinq millions trois cent trente-sept mille quatre-vingt-cinq.",
    type: 'numeric',
    answer: 5337085,
    hint: "5 millions + 337 mille + 85"
  },
  {
    id: 7,
    categoryId: 1,
    question: "Combien y a-t-il de dizaines dans 326,15 ?",
    type: 'numeric',
    answer: 32,
    hint: "326,15 = 32 dizaines + 6 unités + 0,15"
  },
  {
    id: 8,
    categoryId: 1,
    question: "Dans 4376, combien y a-t-il de centaines ?",
    type: 'numeric',
    answer: 43,
    hint: "4376 = 43 centaines + 76 unités"
  },
  {
    id: 9,
    categoryId: 1,
    question: "Parmi ces nombres, lequel est divisible par 9 : 7341, 4500, 653, 9291 ?",
    type: 'qcm',
    answer: "7341 et 9291",
    choices: ["7341 et 9291", "4500 seulement", "653 seulement", "Tous"],
    hint: "Un nombre est divisible par 9 si la somme de ses chiffres est divisible par 9"
  },
  {
    id: 10,
    categoryId: 1,
    question: "Parmi ces nombres, lesquels sont divisibles par 3 ET par 5 : 325, 402, 600, 702, 1230 ?",
    type: 'qcm',
    answer: "600 et 1230",
    choices: ["600 et 1230", "325 et 600", "402 et 702", "Tous sauf 325"],
    hint: "Divisible par 3 : somme des chiffres divisible par 3. Divisible par 5 : termine par 0 ou 5"
  },
  {
    id: 11,
    categoryId: 1,
    question: "Arrondis 24,74 au dixième près.",
    type: 'numeric',
    answer: 24.7,
    hint: "Le chiffre des centièmes (4) est < 5, on garde 7"
  },
  {
    id: 12,
    categoryId: 1,
    question: "Arrondis 24,657 au centième près.",
    type: 'numeric',
    answer: 24.66,
    hint: "Le chiffre des millièmes (7) est ≥ 5, on arrondit au supérieur"
  },
  {
    id: 13,
    categoryId: 1,
    question: "Arrondis 24,6554 au millième près.",
    type: 'numeric',
    answer: 24.655,
    hint: "Le chiffre après les millièmes (4) est < 5, on garde 5"
  },
  {
    id: 14,
    categoryId: 1,
    question: "Range du plus petit au plus grand : 1 ; 3/4 ; 0,5 ; 1,2",
    type: 'ordering',
    orderItems: ["1", "3/4", "0,5", "1,2"],
    correctOrder: ["0,5", "3/4", "1", "1,2"],
    answer: "0,5 ; 3/4 ; 1 ; 1,2",
    hint: "3/4 = 0,75. Donc l'ordre est : 0,5 < 0,75 < 1 < 1,2"
  },
  {
    id: 15,
    categoryId: 1,
    question: "Écris en lettres : 5 337 400.",
    type: 'qcm',
    answer: "Cinq millions trois cent trente-sept mille quatre cents",
    choices: [
      "Cinq millions trois cent trente-sept mille quatre cents",
      "Cinq millions trois cent trente-sept mille quarante",
      "Cinq millions trois cent trente-sept mille quatre",
      "Cinquante-trois millions trente-sept mille quatre cents"
    ],
    hint: "5 337 400 = 5 millions + 337 mille + 400"
  },
  {
    id: 16,
    categoryId: 1,
    question: "Écris en lettres : 5 337 085.",
    type: 'qcm',
    answer: "Cinq millions trois cent trente-sept mille quatre-vingt-cinq",
    choices: [
      "Cinq millions trois cent trente-sept mille quatre-vingt-cinq",
      "Cinq millions trois cent trente-sept mille huit cent cinq",
      "Cinq millions trois cent trente-sept mille quatre-vingt-quinze",
      "Cinquante-trois millions trente-sept mille quatre-vingt-cinq"
    ],
    hint: "085 = quatre-vingt-cinq (80 + 5)"
  },
  {
    id: 17,
    categoryId: 1,
    question: "Écris en chiffres : sept millions deux cent cinquante mille cent vingt-trois.",
    type: 'numeric',
    answer: 7250123,
    hint: "7 millions + 250 mille + 123"
  },
  {
    id: 18,
    categoryId: 1,
    question: "Décompose 45 678 : combien de dizaines de mille ?",
    type: 'numeric',
    answer: 4,
    hint: "45 678 = 4 dizaines de mille + 5 milliers + 6 centaines + 7 dizaines + 8 unités"
  },
  {
    id: 19,
    categoryId: 1,
    question: "Dans le nombre 87 345, combien y a-t-il d'unités de mille ?",
    type: 'numeric',
    answer: 87,
    hint: "87 345 = 87 unités de mille + 345"
  },
  {
    id: 20,
    categoryId: 1,
    question: "Range dans l'ordre décroissant : 12,5 ; 12,05 ; 12,55 ; 12,505",
    type: 'ordering',
    orderItems: ["12,5", "12,05", "12,55", "12,505"],
    correctOrder: ["12,55", "12,505", "12,5", "12,05"],
    answer: "12,55 ; 12,505 ; 12,5 ; 12,05",
    hint: "Compare les décimales : 12,55 > 12,505 > 12,50 > 12,05"
  },
  {
    id: 21,
    categoryId: 1,
    question: "Écris en chiffres : trois milliards cent millions.",
    type: 'numeric',
    answer: 3100000000,
    hint: "3 milliards = 3 000 000 000, + 100 millions = 100 000 000"
  },
  {
    id: 22,
    categoryId: 1,
    question: "Combien y a-t-il de chiffres dans le nombre un million ?",
    type: 'numeric',
    answer: 7,
    hint: "1 000 000 a 7 chiffres (1 suivi de 6 zéros)"
  },
  {
    id: 23,
    categoryId: 1,
    question: "Quel est le successeur de 999 999 ?",
    type: 'numeric',
    answer: 1000000,
    hint: "Le successeur = le nombre + 1"
  },
  {
    id: 24,
    categoryId: 1,
    question: "Quel est le prédécesseur de 1 000 000 ?",
    type: 'numeric',
    answer: 999999,
    hint: "Le prédécesseur = le nombre - 1"
  },
  {
    id: 25,
    categoryId: 1,
    question: "Écris sous forme décimale : 5 unités et 7 centièmes.",
    type: 'numeric',
    answer: 5.07,
    hint: "5 unités = 5, 7 centièmes = 0,07"
  },
  {
    id: 26,
    categoryId: 1,
    question: "Dans 45,678, quelle est la partie entière ?",
    type: 'numeric',
    answer: 45,
    hint: "La partie entière est avant la virgule"
  },
  {
    id: 27,
    categoryId: 1,
    question: "Dans 345 678, quelle est la valeur du chiffre 5 ?",
    type: 'numeric',
    answer: 5000,
    hint: "Le 5 est à la position des milliers"
  },
  {
    id: 28,
    categoryId: 1,
    question: "Combien y a-t-il de dixièmes dans 3,4 ?",
    type: 'numeric',
    answer: 34,
    hint: "3,4 = 34 dixièmes (3 × 10 + 4)"
  },
  {
    id: 29,
    categoryId: 1,
    question: "Combien y a-t-il de centièmes dans 2,37 ?",
    type: 'numeric',
    answer: 237,
    hint: "2,37 = 237 centièmes (2 × 100 + 37)"
  },
  {
    id: 30,
    categoryId: 1,
    question: "Écris 2024 en chiffres romains.",
    type: 'qcm',
    answer: "MMXXIV",
    choices: ["MMXXIV", "MMXIV", "MCMXXIV", "MMXXVI"],
    hint: "M = 1000, X = 10, IV = 4. Donc 2024 = MM + XX + IV"
  },
  {
    id: 31,
    categoryId: 1,
    question: "Que vaut MCMXC en chiffres arabes ?",
    type: 'numeric',
    answer: 1990,
    hint: "M = 1000, CM = 900, XC = 90. Total = 1990"
  },
  {
    id: 32,
    categoryId: 1,
    question: "Encadre 45,7 à l'unité près. Quel est l'entier inférieur ?",
    type: 'numeric',
    answer: 45,
    hint: "45 < 45,7 < 46"
  },
  {
    id: 33,
    categoryId: 1,
    question: "Encadre 3,456 au dixième près. Quel est le dixième inférieur ?",
    type: 'numeric',
    answer: 3.4,
    hint: "3,4 < 3,456 < 3,5"
  },
  {
    id: 34,
    categoryId: 1,
    question: "Quel est le double de 4 567 ?",
    type: 'numeric',
    answer: 9134,
    hint: "Double = × 2"
  },
  {
    id: 35,
    categoryId: 1,
    question: "Quelle est la moitié de 8 426 ?",
    type: 'numeric',
    answer: 4213,
    hint: "Moitié = ÷ 2"
  },
  {
    id: 36,
    categoryId: 1,
    question: "Quel est le plus grand : 3,45 ou 3,405 ?",
    type: 'qcm',
    answer: "3,45",
    choices: ["3,45", "3,405", "Ils sont égaux", "On ne peut pas comparer"],
    hint: "3,45 = 3,450 > 3,405"
  },
  {
    id: 37,
    categoryId: 1,
    question: "Écris 45 000 sous forme de produit avec une puissance de 10.",
    type: 'qcm',
    answer: "45 × 1000 ou 4,5 × 10000",
    choices: ["45 × 1000 ou 4,5 × 10000", "450 × 10", "4500 × 100", "Toutes ces réponses"],
    hint: "45 000 = 45 × 1000 = 4,5 × 10 000 = 450 × 100..."
  },
  {
    id: 38,
    categoryId: 1,
    question: "Parmi 345, 678, 891, 1234, lesquels sont divisibles par 2 ?",
    type: 'qcm',
    answer: "678 et 1234",
    choices: ["678 et 1234", "345 et 891", "Tous", "Aucun"],
    hint: "Divisible par 2 = nombre pair (termine par 0, 2, 4, 6, 8)"
  },
  {
    id: 39,
    categoryId: 1,
    question: "Parmi 125, 234, 560, 789, lesquels sont divisibles par 5 ?",
    type: 'qcm',
    answer: "125 et 560",
    choices: ["125 et 560", "234 et 789", "560 seulement", "Tous"],
    hint: "Divisible par 5 = termine par 0 ou 5"
  },
  {
    id: 40,
    categoryId: 1,
    question: "Le nombre 4 567 est-il pair ou impair ?",
    type: 'qcm',
    answer: "Impair",
    choices: ["Impair", "Pair", "Ni l'un ni l'autre", "Les deux"],
    hint: "Un nombre est pair s'il termine par 0, 2, 4, 6 ou 8"
  },
  {
    id: 41,
    categoryId: 1,
    question: "Quelle est la somme des chiffres du nombre 4 589 ?",
    type: 'numeric',
    answer: 26,
    hint: "4 + 5 + 8 + 9 = 26"
  },
  {
    id: 42,
    categoryId: 1,
    question: "Écris 5 678 sous forme développée : 5000 + ? + 70 + 8. Quel nombre manque ?",
    type: 'numeric',
    answer: 600,
    hint: "5 678 = 5000 + 600 + 70 + 8"
  },
  {
    id: 43,
    categoryId: 1,
    question: "Donne une valeur approchée à la dizaine près de 4 567.",
    type: 'numeric',
    answer: 4570,
    hint: "4567 → le chiffre des unités (7) ≥ 5, donc on arrondit à 4570"
  },
  {
    id: 44,
    categoryId: 1,
    question: "Avec les chiffres 3, 7, 1, 5, forme le plus petit nombre possible.",
    type: 'numeric',
    answer: 1357,
    hint: "Range les chiffres dans l'ordre croissant"
  },
  {
    id: 45,
    categoryId: 1,
    question: "Avec les chiffres 3, 7, 1, 5, forme le plus grand nombre possible.",
    type: 'numeric',
    answer: 7531,
    hint: "Range les chiffres dans l'ordre décroissant"
  },
  {
    id: 46,
    categoryId: 1,
    question: "Trouve un nombre décimal compris entre 5,6 et 5,7. Exemple : 5,6?",
    type: 'qcm',
    answer: "5,65",
    choices: ["5,65", "5,55", "5,75", "5,50"],
    hint: "Tout nombre entre 5,60 et 5,70 convient"
  },
  {
    id: 47,
    categoryId: 1,
    question: "Écris 25/100 sous forme décimale.",
    type: 'numeric',
    answer: 0.25,
    hint: "25/100 = 25 centièmes = 0,25"
  },
  {
    id: 48,
    categoryId: 1,
    question: "Combien y a-t-il de millièmes dans 0,456 ?",
    type: 'numeric',
    answer: 456,
    hint: "0,456 = 456/1000 = 456 millièmes"
  },
  {
    id: 49,
    categoryId: 1,
    question: "Simplifie l'écriture : 007,500. Quel nombre obtiens-tu ?",
    type: 'numeric',
    answer: 7.5,
    hint: "Les zéros inutiles : devant (007) et après la virgule (500) → 7,5"
  },
  {
    id: 50,
    categoryId: 1,
    question: "Je suis un nombre de 4 chiffres. Milliers = 3, Centaines = double de 3, Dizaines = 0, Unités = moitié de 3. Qui suis-je ?",
    type: 'numeric',
    answer: 3601,
    hint: "Milliers = 3, Centaines = 6, Dizaines = 0, Unités = 1,5 → arrondi à 1 ou 2. Réponse : 3601"
  }
];

// ===== CATÉGORIE 2: OPÉRATIONS (50 exercices) =====
const operationsExercises: RevisionExercise[] = [
  {
    id: 51,
    categoryId: 2,
    question: "Calcule : 123 × 11",
    type: 'numeric',
    answer: 1353,
    hint: "Astuce × 11 : 1_3 puis additionne les chiffres voisins au milieu : 1(1+2)(2+3)3 = 1353"
  },
  {
    id: 52,
    categoryId: 2,
    question: "Calcule : 42 × 11",
    type: 'numeric',
    answer: 462,
    hint: "42 × 11 = 4_(4+2)_2 = 462"
  },
  {
    id: 53,
    categoryId: 2,
    question: "Calcule : 3,5 × 1,1",
    type: 'numeric',
    answer: 3.85,
    hint: "3,5 × 1,1 = 3,5 + 0,35 = 3,85"
  },
  {
    id: 54,
    categoryId: 2,
    question: "Calcule : 124 × 0,76",
    type: 'numeric',
    answer: 94.24,
    hint: "124 × 0,76 = 124 × 76/100 = 9424/100 = 94,24"
  },
  {
    id: 55,
    categoryId: 2,
    question: "Calcule : 248 × 0,5",
    type: 'numeric',
    answer: 124,
    hint: "Multiplier par 0,5 = diviser par 2"
  },
  {
    id: 56,
    categoryId: 2,
    question: "Calcule : 0,23 ÷ 0,01",
    type: 'numeric',
    answer: 23,
    hint: "Diviser par 0,01 = multiplier par 100"
  },
  {
    id: 57,
    categoryId: 2,
    question: "Calcule : 0,0537 ÷ 0,0001",
    type: 'numeric',
    answer: 537,
    hint: "Diviser par 0,0001 = multiplier par 10 000"
  },
  {
    id: 58,
    categoryId: 2,
    question: "Calcule : 72,75 ÷ 2,5",
    type: 'numeric',
    answer: 29.1,
    hint: "72,75 ÷ 2,5 = 727,5 ÷ 25 = 29,1"
  },
  {
    id: 59,
    categoryId: 2,
    question: "Calcule : 6 ÷ 0,125",
    type: 'numeric',
    answer: 48,
    hint: "Diviser par 0,125 = multiplier par 8 (car 1/0,125 = 8)"
  },
  {
    id: 60,
    categoryId: 2,
    question: "Calcule : 66 × 1,5",
    type: 'numeric',
    answer: 99,
    hint: "66 × 1,5 = 66 + 33 = 99"
  },
  {
    id: 61,
    categoryId: 2,
    question: "Calcule : 320 × 2,25",
    type: 'numeric',
    answer: 720,
    hint: "320 × 2,25 = 320 × 2 + 320 × 0,25 = 640 + 80 = 720"
  },
  {
    id: 62,
    categoryId: 2,
    question: "Calcule : 23,74 × 10",
    type: 'numeric',
    answer: 237.4,
    hint: "Multiplier par 10 = décaler la virgule d'un rang vers la droite"
  },
  {
    id: 63,
    categoryId: 2,
    question: "Calcule : 44,799 ÷ 1000",
    type: 'numeric',
    answer: 0.044799,
    hint: "Diviser par 1000 = décaler la virgule de 3 rangs vers la gauche"
  },
  {
    id: 64,
    categoryId: 2,
    question: "Calcule : 282,6 ÷ 3,14",
    type: 'numeric',
    answer: 90,
    hint: "282,6 ÷ 3,14 = 28260 ÷ 314 = 90"
  },
  {
    id: 65,
    categoryId: 2,
    question: "Calcule l'aire : 22 mètres × 0,5 mètre = ? m²",
    type: 'numeric',
    answer: 11,
    hint: "22 × 0,5 = 22 ÷ 2 = 11"
  },
  {
    id: 66,
    categoryId: 2,
    question: "Calcule : 4 567 + 3 894",
    type: 'numeric',
    answer: 8461,
    hint: "Additionne colonne par colonne"
  },
  {
    id: 67,
    categoryId: 2,
    question: "Calcule : 10 000 − 4 567",
    type: 'numeric',
    answer: 5433,
    hint: "Utilise la technique des compléments"
  },
  {
    id: 68,
    categoryId: 2,
    question: "Calcule : 456 × 234",
    type: 'numeric',
    answer: 106704,
    hint: "Pose la multiplication en colonnes"
  },
  {
    id: 69,
    categoryId: 2,
    question: "Effectue la division : 4 567 ÷ 12. Quel est le quotient entier ?",
    type: 'numeric',
    answer: 380,
    hint: "4567 = 12 × 380 + 7"
  },
  {
    id: 70,
    categoryId: 2,
    question: "Complète : 345 + … = 1000. Quel est le nombre manquant ?",
    type: 'numeric',
    answer: 655,
    hint: "1000 - 345 = 655"
  },
  {
    id: 71,
    categoryId: 2,
    question: "Complète : … × 8 = 456. Quel est le nombre manquant ?",
    type: 'numeric',
    answer: 57,
    hint: "456 ÷ 8 = 57"
  },
  {
    id: 72,
    categoryId: 2,
    question: "Calcule : 12,5 + 7,89 + 3,456",
    type: 'numeric',
    answer: 23.846,
    hint: "Aligne les virgules et additionne"
  },
  {
    id: 73,
    categoryId: 2,
    question: "Calcule : 45,67 − 23,89",
    type: 'numeric',
    answer: 21.78,
    hint: "Aligne les virgules et soustrais"
  },
  {
    id: 74,
    categoryId: 2,
    question: "Calcule : 12 × 5 × 8",
    type: 'numeric',
    answer: 480,
    hint: "12 × 5 = 60, puis 60 × 8 = 480"
  },
  {
    id: 75,
    categoryId: 2,
    question: "Calcule : 5 + 3 × 4",
    type: 'numeric',
    answer: 17,
    hint: "Priorité : multiplication d'abord. 3 × 4 = 12, puis 5 + 12 = 17"
  },
  {
    id: 76,
    categoryId: 2,
    question: "Calcule : (5 + 3) × 4",
    type: 'numeric',
    answer: 32,
    hint: "Priorité aux parenthèses : 5 + 3 = 8, puis 8 × 4 = 32"
  },
  {
    id: 77,
    categoryId: 2,
    question: "Calcule : 20 − 4 × 3 + 2",
    type: 'numeric',
    answer: 10,
    hint: "D'abord 4 × 3 = 12, puis 20 - 12 + 2 = 10"
  },
  {
    id: 78,
    categoryId: 2,
    question: "Calcule le carré de 12.",
    type: 'numeric',
    answer: 144,
    hint: "12² = 12 × 12 = 144"
  },
  {
    id: 79,
    categoryId: 2,
    question: "Calcule le cube de 5.",
    type: 'numeric',
    answer: 125,
    hint: "5³ = 5 × 5 × 5 = 125"
  },
  {
    id: 80,
    categoryId: 2,
    question: "Calcule la somme de 456 et 789.",
    type: 'numeric',
    answer: 1245,
    hint: "456 + 789 = 1245"
  },
  {
    id: 81,
    categoryId: 2,
    question: "Le double du tiers de 630 = ?",
    type: 'numeric',
    answer: 420,
    hint: "Tiers de 630 = 210, double de 210 = 420"
  },
  {
    id: 82,
    categoryId: 2,
    question: "Le quadruple de la moitié de 80 = ?",
    type: 'numeric',
    answer: 160,
    hint: "Moitié de 80 = 40, quadruple de 40 = 160"
  },
  {
    id: 83,
    categoryId: 2,
    question: "Calcule : 678 × 9",
    type: 'numeric',
    answer: 6102,
    hint: "Astuce × 9 : 678 × 10 - 678 = 6780 - 678 = 6102"
  },
  {
    id: 84,
    categoryId: 2,
    question: "Calcule : 56 × 99",
    type: 'numeric',
    answer: 5544,
    hint: "Astuce × 99 : 56 × 100 - 56 = 5600 - 56 = 5544"
  },
  {
    id: 85,
    categoryId: 2,
    question: "Calcule : 2 500 ÷ 25",
    type: 'numeric',
    answer: 100,
    hint: "2500 ÷ 25 = 100 (car 25 × 100 = 2500)"
  },
  {
    id: 86,
    categoryId: 2,
    question: "Calcule mentalement : 47 + 38",
    type: 'numeric',
    answer: 85,
    hint: "47 + 38 = 47 + 40 - 2 = 87 - 2 = 85"
  },
  {
    id: 87,
    categoryId: 2,
    question: "Calcule mentalement : 83 − 27",
    type: 'numeric',
    answer: 56,
    hint: "83 - 27 = 83 - 30 + 3 = 53 + 3 = 56"
  },
  {
    id: 88,
    categoryId: 2,
    question: "Calcule mentalement : 25 × 4",
    type: 'numeric',
    answer: 100,
    hint: "25 × 4 = 100 (quart de 100 × 4)"
  },
  {
    id: 89,
    categoryId: 2,
    question: "Calcule : 0,5 × 0,4",
    type: 'numeric',
    answer: 0.2,
    hint: "0,5 × 0,4 = 5 × 4 / 100 = 20/100 = 0,2"
  },
  {
    id: 90,
    categoryId: 2,
    question: "Calcule : 3,6 ÷ 0,4",
    type: 'numeric',
    answer: 9,
    hint: "3,6 ÷ 0,4 = 36 ÷ 4 = 9"
  },
  {
    id: 91,
    categoryId: 2,
    question: "Calcule : 3 h 45 min + 5 h 27 min",
    type: 'text',
    answer: "9h12",
    hint: "45 + 27 = 72 min = 1h12. Donc 3 + 5 + 1 = 9h et 12 min"
  },
  {
    id: 92,
    categoryId: 2,
    question: "Calcule : 10 h 45 min − 8 h 50 min",
    type: 'text',
    answer: "1h55",
    hint: "10h45 - 8h50 : emprunte 1h. 9h105min - 8h50min = 1h55min"
  },
  {
    id: 93,
    categoryId: 2,
    question: "Donne un ordre de grandeur du produit : 487 × 52",
    type: 'qcm',
    answer: "25 000",
    choices: ["25 000", "2 500", "250 000", "250"],
    hint: "487 ≈ 500, 52 ≈ 50. Donc 500 × 50 = 25 000"
  },
  {
    id: 94,
    categoryId: 2,
    question: "Vérifie : 145 = 12 × 12 + 1. Est-ce correct ?",
    type: 'qcm',
    answer: "Oui",
    choices: ["Oui", "Non, le reste est 0", "Non, le quotient est 11", "Non, c'est 144"],
    hint: "12 × 12 = 144, 144 + 1 = 145. C'est correct !"
  },
  {
    id: 95,
    categoryId: 2,
    question: "Quel nombre faut-il ajouter à 67 pour obtenir 100 ?",
    type: 'numeric',
    answer: 33,
    hint: "100 - 67 = 33"
  },
  {
    id: 96,
    categoryId: 2,
    question: "Quel nombre faut-il ajouter à 456 pour obtenir 1000 ?",
    type: 'numeric',
    answer: 544,
    hint: "1000 - 456 = 544"
  },
  {
    id: 97,
    categoryId: 2,
    question: "Calcule : 100 − (25 + 15)",
    type: 'numeric',
    answer: 60,
    hint: "D'abord 25 + 15 = 40, puis 100 - 40 = 60"
  },
  {
    id: 98,
    categoryId: 2,
    question: "Calcule : 8 × 7 − 6 × 5 + 4 × 3",
    type: 'numeric',
    answer: 38,
    hint: "8×7=56, 6×5=30, 4×3=12. Donc 56 - 30 + 12 = 38"
  },
  {
    id: 99,
    categoryId: 2,
    question: "Calcule : 1000 ÷ 8",
    type: 'numeric',
    answer: 125,
    hint: "1000 ÷ 8 = 125 (car 8 × 125 = 1000)"
  },
  {
    id: 100,
    categoryId: 2,
    question: "Calcule : 7,5 × 4",
    type: 'numeric',
    answer: 30,
    hint: "7,5 × 4 = 7 × 4 + 0,5 × 4 = 28 + 2 = 30"
  }
];

// ===== CATÉGORIE 3: FRACTIONS ET POURCENTAGES (50 exercices) =====
const fractionsExercises: RevisionExercise[] = [
  {
    id: 101,
    categoryId: 3,
    question: "Calcule : 5/4 de 48",
    type: 'numeric',
    answer: 60,
    hint: "5/4 de 48 = (48 ÷ 4) × 5 = 12 × 5 = 60"
  },
  {
    id: 102,
    categoryId: 3,
    question: "Trouve le numérateur : 17,21 = ?/100",
    type: 'numeric',
    answer: 1721,
    hint: "17,21 = 1721/100"
  },
  {
    id: 103,
    categoryId: 3,
    question: "Range dans l'ordre croissant : 3/5 ; 5/3 ; 2/3 ; 6/4",
    type: 'ordering',
    orderItems: ["3/5", "5/3", "2/3", "6/4"],
    correctOrder: ["3/5", "2/3", "6/4", "5/3"],
    answer: "3/5 ; 2/3 ; 6/4 ; 5/3",
    hint: "3/5=0,6 ; 2/3≈0,67 ; 6/4=1,5 ; 5/3≈1,67"
  },
  {
    id: 104,
    categoryId: 3,
    question: "Ordonne de manière croissante : 2/19 ; 2/21 ; 2/7 ; 2/14 ; 2/3",
    type: 'ordering',
    orderItems: ["2/19", "2/21", "2/7", "2/14", "2/3"],
    correctOrder: ["2/21", "2/19", "2/14", "2/7", "2/3"],
    answer: "2/21 ; 2/19 ; 2/14 ; 2/7 ; 2/3",
    hint: "Même numérateur : plus le dénominateur est grand, plus la fraction est petite"
  },
  {
    id: 105,
    categoryId: 3,
    question: "Écris 1,08 sous forme de fraction décimale.",
    type: 'qcm',
    answer: "108/100",
    choices: ["108/100", "18/100", "108/10", "1008/100"],
    hint: "1,08 = 1 + 8/100 = 108/100"
  },
  {
    id: 106,
    categoryId: 3,
    question: "Écris 1,7 sous forme de fraction décimale.",
    type: 'qcm',
    answer: "17/10",
    choices: ["17/10", "17/100", "170/100", "7/10"],
    hint: "1,7 = 17/10"
  },
  {
    id: 107,
    categoryId: 3,
    question: "Écris 0,9 sous forme de fraction décimale.",
    type: 'qcm',
    answer: "9/10",
    choices: ["9/10", "90/100", "9/100", "Les deux premières"],
    hint: "0,9 = 9/10 = 90/100"
  },
  {
    id: 108,
    categoryId: 3,
    question: "Écris 1/8 sous forme décimale.",
    type: 'numeric',
    answer: 0.125,
    hint: "1/8 = 0,125 (divise 1 par 8)"
  },
  {
    id: 109,
    categoryId: 3,
    question: "Écris 75% sous forme décimale.",
    type: 'numeric',
    answer: 0.75,
    hint: "75% = 75/100 = 0,75"
  },
  {
    id: 110,
    categoryId: 3,
    question: "Écris en fraction : sept dixièmes.",
    type: 'qcm',
    answer: "7/10",
    choices: ["7/10", "7/100", "10/7", "70/100"],
    hint: "Sept dixièmes = 7/10"
  },
  {
    id: 111,
    categoryId: 3,
    question: "Calcule et simplifie : 12/18 + 1/6 − 1/9",
    type: 'qcm',
    answer: "13/18",
    choices: ["13/18", "7/9", "2/3", "11/18"],
    hint: "12/18 = 2/3 = 12/18, 1/6 = 3/18, 1/9 = 2/18. Total = 12+3-2 = 13/18"
  },
  {
    id: 112,
    categoryId: 3,
    question: "Combien gagnes-tu pour un achat de 12 500 F avec une réduction de 8% ?",
    type: 'numeric',
    answer: 1000,
    hint: "8% de 12500 = 12500 × 8/100 = 1000 F"
  },
  {
    id: 113,
    categoryId: 3,
    question: "25% de 25 000 FCFA = ?",
    type: 'numeric',
    answer: 6250,
    hint: "25% = 1/4. 25000 ÷ 4 = 6250"
  },
  {
    id: 114,
    categoryId: 3,
    question: "800 candidats au CEP, 700 réussissent. Quel est le pourcentage de réussite ?",
    type: 'numeric',
    answer: 87.5,
    hint: "700/800 = 7/8 = 0,875 = 87,5%"
  },
  {
    id: 115,
    categoryId: 3,
    question: "Quel est le taux annuel si 4 000 F rapporte 120 F par an ?",
    type: 'numeric',
    answer: 3,
    hint: "Taux = (120/4000) × 100 = 3%"
  },
  {
    id: 116,
    categoryId: 3,
    question: "Un intérêt de 80 F sur un capital de 1 000 F. Quel taux ?",
    type: 'numeric',
    answer: 8,
    hint: "Taux = (80/1000) × 100 = 8%"
  },
  {
    id: 117,
    categoryId: 3,
    question: "Un article passe de 80 F à 100 F. L'augmentation est-elle de 20% ?",
    type: 'qcm',
    answer: "Non, c'est 25%",
    choices: ["Non, c'est 25%", "Oui, c'est 20%", "Non, c'est 20 F", "Oui exactement"],
    hint: "Augmentation = 20 F sur 80 F = 20/80 = 25%"
  },
  {
    id: 118,
    categoryId: 3,
    question: "Après une hausse de 10%, un article coûte 495 F. Prix initial ?",
    type: 'numeric',
    answer: 450,
    hint: "Prix initial × 1,10 = 495. Donc prix initial = 495/1,10 = 450"
  },
  {
    id: 119,
    categoryId: 3,
    question: "3 L pour 2 personnes. Combien pour 10 personnes ?",
    type: 'numeric',
    answer: 15,
    hint: "10 personnes = 5 × 2 personnes. Donc 5 × 3 L = 15 L"
  },
  {
    id: 120,
    categoryId: 3,
    question: "Recette : 2 kg sucre pour 3 kg pommes. Combien de pommes pour 3 kg sucre ?",
    type: 'numeric',
    answer: 4.5,
    hint: "3 kg sucre = 1,5 × 2 kg. Donc 1,5 × 3 kg = 4,5 kg pommes"
  },
  {
    id: 121,
    categoryId: 3,
    question: "Marcel reçoit 3/8 d'un gâteau. Quelle fraction reste pour les 3 autres enfants ?",
    type: 'qcm',
    answer: "5/8",
    choices: ["5/8", "3/8", "1/8", "4/8"],
    hint: "1 - 3/8 = 8/8 - 3/8 = 5/8"
  },
  {
    id: 122,
    categoryId: 3,
    question: "Réservoir 500 L rempli aux 3/5. On retire 120 L. Combien reste-t-il ?",
    type: 'numeric',
    answer: 180,
    hint: "3/5 de 500 = 300 L. 300 - 120 = 180 L"
  },
  {
    id: 123,
    categoryId: 3,
    question: "Un bidon plein aux 2/3 contient 10 L. Combien pour le remplir ?",
    type: 'numeric',
    answer: 5,
    hint: "2/3 = 10 L, donc 1/3 = 5 L. Il manque 1/3 = 5 L"
  },
  {
    id: 124,
    categoryId: 3,
    question: "Ali dépense 650 F, soit 2/3 de son argent. Combien avait-il ?",
    type: 'numeric',
    answer: 975,
    hint: "2/3 = 650, donc 1/3 = 325, et 3/3 = 975 F"
  },
  {
    id: 125,
    categoryId: 3,
    question: "14 filles = 25% de la classe. Combien de garçons ?",
    type: 'numeric',
    answer: 42,
    hint: "25% = 14, donc 100% = 56. Garçons = 56 - 14 = 42"
  },
  {
    id: 126,
    categoryId: 3,
    question: "Classe de 32 élèves, 3/8 sont des filles. Combien de filles ?",
    type: 'numeric',
    answer: 12,
    hint: "3/8 de 32 = 32 × 3/8 = 12"
  },
  {
    id: 127,
    categoryId: 3,
    question: "Simplifie la fraction 18/24.",
    type: 'qcm',
    answer: "3/4",
    choices: ["3/4", "6/8", "9/12", "Toutes ces réponses"],
    hint: "18/24 = 18÷6 / 24÷6 = 3/4"
  },
  {
    id: 128,
    categoryId: 3,
    question: "Trouve une fraction équivalente à 3/4 avec dénominateur 20.",
    type: 'qcm',
    answer: "15/20",
    choices: ["15/20", "12/20", "16/20", "18/20"],
    hint: "3/4 = 3×5 / 4×5 = 15/20"
  },
  {
    id: 129,
    categoryId: 3,
    question: "Quelle fraction est la plus grande : 2/3 ou 3/5 ?",
    type: 'qcm',
    answer: "2/3",
    choices: ["2/3", "3/5", "Elles sont égales", "On ne peut pas comparer"],
    hint: "2/3 ≈ 0,667 et 3/5 = 0,6. Donc 2/3 > 3/5"
  },
  {
    id: 130,
    categoryId: 3,
    question: "Calcule : 1/4 + 1/6",
    type: 'qcm',
    answer: "5/12",
    choices: ["5/12", "2/10", "1/5", "7/12"],
    hint: "1/4 = 3/12, 1/6 = 2/12. Total = 5/12"
  },
  {
    id: 131,
    categoryId: 3,
    question: "Calcule : 5/6 − 1/3",
    type: 'qcm',
    answer: "1/2",
    choices: ["1/2", "4/6", "2/3", "1/3"],
    hint: "5/6 - 2/6 = 3/6 = 1/2"
  },
  {
    id: 132,
    categoryId: 3,
    question: "Calcule : 2/3 × 3/4",
    type: 'qcm',
    answer: "1/2",
    choices: ["1/2", "6/12", "5/7", "2/4"],
    hint: "2/3 × 3/4 = 6/12 = 1/2"
  },
  {
    id: 133,
    categoryId: 3,
    question: "Calcule : 3/4 ÷ 1/2",
    type: 'qcm',
    answer: "3/2",
    choices: ["3/2", "3/8", "6/4", "1/2"],
    hint: "3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 3/2"
  },
  {
    id: 134,
    categoryId: 3,
    question: "Calcule 1/2 de 2/3.",
    type: 'qcm',
    answer: "1/3",
    choices: ["1/3", "2/6", "1/6", "3/5"],
    hint: "1/2 × 2/3 = 2/6 = 1/3"
  },
  {
    id: 135,
    categoryId: 3,
    question: "Exprime 40% sous forme de fraction simplifiée.",
    type: 'qcm',
    answer: "2/5",
    choices: ["2/5", "4/10", "40/100", "1/4"],
    hint: "40% = 40/100 = 4/10 = 2/5"
  },
  {
    id: 136,
    categoryId: 3,
    question: "Exprime 3/5 sous forme de pourcentage.",
    type: 'numeric',
    answer: 60,
    hint: "3/5 = 0,6 = 60%"
  },
  {
    id: 137,
    categoryId: 3,
    question: "Un prix passe de 500 F à 600 F. Pourcentage d'augmentation ?",
    type: 'numeric',
    answer: 20,
    hint: "Augmentation = 100 F. 100/500 = 0,2 = 20%"
  },
  {
    id: 138,
    categoryId: 3,
    question: "Un prix passe de 800 F à 600 F. Pourcentage de réduction ?",
    type: 'numeric',
    answer: 25,
    hint: "Réduction = 200 F. 200/800 = 0,25 = 25%"
  },
  {
    id: 139,
    categoryId: 3,
    question: "Article à 2 000 F avec réduction de 15%. Nouveau prix ?",
    type: 'numeric',
    answer: 1700,
    hint: "15% de 2000 = 300. Nouveau prix = 2000 - 300 = 1700"
  },
  {
    id: 140,
    categoryId: 3,
    question: "Après réduction de 20%, un article coûte 400 F. Prix initial ?",
    type: 'numeric',
    answer: 500,
    hint: "80% = 400 F, donc 100% = 400/0,8 = 500 F"
  },
  {
    id: 141,
    categoryId: 3,
    question: "Article à 1 000 F HT avec TVA de 18%. Prix TTC ?",
    type: 'numeric',
    answer: 1180,
    hint: "TVA = 18% de 1000 = 180. TTC = 1000 + 180 = 1180"
  },
  {
    id: 142,
    categoryId: 3,
    question: "5 kg coûtent 2 500 F. Combien coûtent 8 kg ?",
    type: 'numeric',
    answer: 4000,
    hint: "1 kg = 500 F. 8 kg = 8 × 500 = 4000 F"
  },
  {
    id: 143,
    categoryId: 3,
    question: "12 ouvriers font un travail en 15 jours. Combien de jours pour 20 ouvriers ?",
    type: 'numeric',
    answer: 9,
    hint: "Proportionnalité inverse : 12×15 = 20×j. j = 180/20 = 9 jours"
  },
  {
    id: 144,
    categoryId: 3,
    question: "Voiture : 240 km en 3 h. Distance en 5 h à même vitesse ?",
    type: 'numeric',
    answer: 400,
    hint: "Vitesse = 240/3 = 80 km/h. En 5h : 80 × 5 = 400 km"
  },
  {
    id: 145,
    categoryId: 3,
    question: "Échelle 1/100, bâtiment mesure 15 cm sur plan. Taille réelle en mètres ?",
    type: 'numeric',
    answer: 15,
    hint: "15 cm × 100 = 1500 cm = 15 m"
  },
  {
    id: 146,
    categoryId: 3,
    question: "Partage 360 F proportionnellement à 2, 3, 4. Quelle part pour le nombre 3 ?",
    type: 'numeric',
    answer: 120,
    hint: "Total parts = 9. Part de 3 = 360 × 3/9 = 120 F"
  },
  {
    id: 147,
    categoryId: 3,
    question: "Réduis 45/60 à sa forme irréductible.",
    type: 'qcm',
    answer: "3/4",
    choices: ["3/4", "9/12", "15/20", "45/60"],
    hint: "PGCD(45,60) = 15. 45/15 = 3, 60/15 = 4. Réponse : 3/4"
  },
  {
    id: 148,
    categoryId: 3,
    question: "Écris 0,375 sous forme de fraction simplifiée.",
    type: 'qcm',
    answer: "3/8",
    choices: ["3/8", "375/1000", "15/40", "6/16"],
    hint: "0,375 = 375/1000 = 3/8"
  },
  {
    id: 149,
    categoryId: 3,
    question: "École de 500 élèves, 120 en CM2. Quel pourcentage ?",
    type: 'numeric',
    answer: 24,
    hint: "120/500 = 0,24 = 24%"
  },
  {
    id: 150,
    categoryId: 3,
    question: "Les 3/4 d'un nombre valent 60. Quel est ce nombre ?",
    type: 'numeric',
    answer: 80,
    hint: "3/4 = 60, donc 1/4 = 20, et 4/4 = 80"
  }
];

// ===== CATÉGORIE 4: GRANDEURS ET MESURES (50 exercices) =====
const grandeursExercises: RevisionExercise[] = [
  {
    id: 151,
    categoryId: 4,
    question: "15 jours = combien d'heures ?",
    type: 'numeric',
    answer: 360,
    hint: "1 jour = 24 h. 15 × 24 = 360 h"
  },
  {
    id: 152,
    categoryId: 4,
    question: "2,5 décennies = combien d'années ?",
    type: 'numeric',
    answer: 25,
    hint: "1 décennie = 10 ans. 2,5 × 10 = 25 ans"
  },
  {
    id: 153,
    categoryId: 4,
    question: "2,5 décalitres = combien de dm³ ?",
    type: 'numeric',
    answer: 25,
    hint: "1 daL = 10 L = 10 dm³. 2,5 × 10 = 25 dm³"
  },
  {
    id: 154,
    categoryId: 4,
    question: "1 hectare = combien de centiares ?",
    type: 'numeric',
    answer: 10000,
    hint: "1 ha = 100 a = 10 000 ca"
  },
  {
    id: 155,
    categoryId: 4,
    question: "1 centiare = combien de m² ?",
    type: 'numeric',
    answer: 1,
    hint: "1 centiare = 1 m²"
  },
  {
    id: 156,
    categoryId: 4,
    question: "1 hectare = combien de m² ?",
    type: 'numeric',
    answer: 10000,
    hint: "1 ha = 10 000 m²"
  },
  {
    id: 157,
    categoryId: 4,
    question: "1 ha 2 a 45 ca = combien de m² ?",
    type: 'numeric',
    answer: 10245,
    hint: "1 ha = 10000, 2 a = 200, 45 ca = 45. Total = 10245 m²"
  },
  {
    id: 158,
    categoryId: 4,
    question: "1 hectare = combien d'ares ?",
    type: 'numeric',
    answer: 100,
    hint: "1 ha = 100 a"
  },
  {
    id: 159,
    categoryId: 4,
    question: "1 are = combien de dam² ?",
    type: 'numeric',
    answer: 1,
    hint: "1 are = 100 m² = 1 dam²"
  },
  {
    id: 160,
    categoryId: 4,
    question: "1 hectare = combien de hm² ?",
    type: 'numeric',
    answer: 0.01,
    hint: "1 hm² = 10 000 m² = 1 ha. Donc 1 ha = 0,01 hm² est faux. 1 ha = 1 hm² ? Non, 1 hm² = 10000 m² = 1 ha. Réponse : 0,01"
  },
  {
    id: 161,
    categoryId: 4,
    question: "2 hectolitres = combien de litres ?",
    type: 'numeric',
    answer: 200,
    hint: "1 hL = 100 L. 2 × 100 = 200 L"
  },
  {
    id: 162,
    categoryId: 4,
    question: "2,5 hectolitres = combien de dm³ ?",
    type: 'numeric',
    answer: 250,
    hint: "1 hL = 100 L = 100 dm³. 2,5 × 100 = 250 dm³"
  },
  {
    id: 163,
    categoryId: 4,
    question: "Combien de litres d'eau pèsent 13,5 kg ?",
    type: 'numeric',
    answer: 13.5,
    hint: "1 L d'eau = 1 kg. Donc 13,5 kg = 13,5 L"
  },
  {
    id: 164,
    categoryId: 4,
    question: "Camion vide : 1,5 t. Chargement : 1500 kg. Masse totale en kg ?",
    type: 'numeric',
    answer: 3000,
    hint: "1,5 t = 1500 kg. Total = 1500 + 1500 = 3000 kg"
  },
  {
    id: 165,
    categoryId: 4,
    question: "72 crayons de 11 g chacun. Poids total en grammes ?",
    type: 'numeric',
    answer: 792,
    hint: "72 × 11 = 792 g"
  },
  {
    id: 166,
    categoryId: 4,
    question: "1/4 heure = combien de minutes ?",
    type: 'numeric',
    answer: 15,
    hint: "1/4 × 60 = 15 min"
  },
  {
    id: 167,
    categoryId: 4,
    question: "10% de 3 600 F = ?",
    type: 'numeric',
    answer: 360,
    hint: "10% = 1/10. 3600/10 = 360 F"
  },
  {
    id: 168,
    categoryId: 4,
    question: "3,5 kg = combien de grammes ?",
    type: 'numeric',
    answer: 3500,
    hint: "1 kg = 1000 g. 3,5 × 1000 = 3500 g"
  },
  {
    id: 169,
    categoryId: 4,
    question: "4 500 g = combien de kg ?",
    type: 'numeric',
    answer: 4.5,
    hint: "4500 ÷ 1000 = 4,5 kg"
  },
  {
    id: 170,
    categoryId: 4,
    question: "5,6 L = combien de cL ?",
    type: 'numeric',
    answer: 560,
    hint: "1 L = 100 cL. 5,6 × 100 = 560 cL"
  },
  {
    id: 171,
    categoryId: 4,
    question: "250 cL = combien de L ?",
    type: 'numeric',
    answer: 2.5,
    hint: "250 ÷ 100 = 2,5 L"
  },
  {
    id: 172,
    categoryId: 4,
    question: "4,8 m = combien de cm ?",
    type: 'numeric',
    answer: 480,
    hint: "1 m = 100 cm. 4,8 × 100 = 480 cm"
  },
  {
    id: 173,
    categoryId: 4,
    question: "345 cm = combien de m ?",
    type: 'numeric',
    answer: 3.45,
    hint: "345 ÷ 100 = 3,45 m"
  },
  {
    id: 174,
    categoryId: 4,
    question: "2,5 km = combien de m ?",
    type: 'numeric',
    answer: 2500,
    hint: "1 km = 1000 m. 2,5 × 1000 = 2500 m"
  },
  {
    id: 175,
    categoryId: 4,
    question: "3 450 m = combien de km ?",
    type: 'numeric',
    answer: 3.45,
    hint: "3450 ÷ 1000 = 3,45 km"
  },
  {
    id: 176,
    categoryId: 4,
    question: "2,5 heures = combien de minutes ?",
    type: 'numeric',
    answer: 150,
    hint: "2,5 × 60 = 150 min"
  },
  {
    id: 177,
    categoryId: 4,
    question: "150 minutes = combien d'heures ?",
    type: 'numeric',
    answer: 2.5,
    hint: "150 ÷ 60 = 2,5 h"
  },
  {
    id: 178,
    categoryId: 4,
    question: "5 minutes = combien de secondes ?",
    type: 'numeric',
    answer: 300,
    hint: "1 min = 60 s. 5 × 60 = 300 s"
  },
  {
    id: 179,
    categoryId: 4,
    question: "240 secondes = combien de minutes ?",
    type: 'numeric',
    answer: 4,
    hint: "240 ÷ 60 = 4 min"
  },
  {
    id: 180,
    categoryId: 4,
    question: "2 m² = combien de cm² ?",
    type: 'numeric',
    answer: 20000,
    hint: "1 m² = 10 000 cm². 2 × 10000 = 20000 cm²"
  },
  {
    id: 181,
    categoryId: 4,
    question: "50 000 cm² = combien de m² ?",
    type: 'numeric',
    answer: 5,
    hint: "50000 ÷ 10000 = 5 m²"
  },
  {
    id: 182,
    categoryId: 4,
    question: "2,5 m³ = combien de litres ?",
    type: 'numeric',
    answer: 2500,
    hint: "1 m³ = 1000 L. 2,5 × 1000 = 2500 L"
  },
  {
    id: 183,
    categoryId: 4,
    question: "500 L = combien de m³ ?",
    type: 'numeric',
    answer: 0.5,
    hint: "500 ÷ 1000 = 0,5 m³"
  },
  {
    id: 184,
    categoryId: 4,
    question: "3,5 daL = combien de L ?",
    type: 'numeric',
    answer: 35,
    hint: "1 daL = 10 L. 3,5 × 10 = 35 L"
  },
  {
    id: 185,
    categoryId: 4,
    question: "45 mm = combien de cm ?",
    type: 'numeric',
    answer: 4.5,
    hint: "45 ÷ 10 = 4,5 cm"
  },
  {
    id: 186,
    categoryId: 4,
    question: "78 dm = combien de m ?",
    type: 'numeric',
    answer: 7.8,
    hint: "78 ÷ 10 = 7,8 m"
  },
  {
    id: 187,
    categoryId: 4,
    question: "0,5 hm = combien de m ?",
    type: 'numeric',
    answer: 50,
    hint: "1 hm = 100 m. 0,5 × 100 = 50 m"
  },
  {
    id: 188,
    categoryId: 4,
    question: "12 dag = combien de g ?",
    type: 'numeric',
    answer: 120,
    hint: "1 dag = 10 g. 12 × 10 = 120 g"
  },
  {
    id: 189,
    categoryId: 4,
    question: "2 500 mg = combien de g ?",
    type: 'numeric',
    answer: 2.5,
    hint: "2500 ÷ 1000 = 2,5 g"
  },
  {
    id: 190,
    categoryId: 4,
    question: "3,4 tonnes = combien de kg ?",
    type: 'numeric',
    answer: 3400,
    hint: "1 t = 1000 kg. 3,4 × 1000 = 3400 kg"
  },
  {
    id: 191,
    categoryId: 4,
    question: "5 600 kg = combien de tonnes ?",
    type: 'numeric',
    answer: 5.6,
    hint: "5600 ÷ 1000 = 5,6 t"
  },
  {
    id: 192,
    categoryId: 4,
    question: "4 hL = combien de daL ?",
    type: 'numeric',
    answer: 40,
    hint: "1 hL = 10 daL. 4 × 10 = 40 daL"
  },
  {
    id: 193,
    categoryId: 4,
    question: "Carré de périmètre 4 m. Périmètre en cm ?",
    type: 'numeric',
    answer: 400,
    hint: "4 m = 400 cm"
  },
  {
    id: 194,
    categoryId: 4,
    question: "Rectangle d'aire 2 m². Aire en dm² ?",
    type: 'numeric',
    answer: 200,
    hint: "1 m² = 100 dm². 2 × 100 = 200 dm²"
  },
  {
    id: 195,
    categoryId: 4,
    question: "Cube de volume 1 dm³. Volume en cm³ ?",
    type: 'numeric',
    answer: 1000,
    hint: "1 dm³ = 1000 cm³"
  },
  {
    id: 196,
    categoryId: 4,
    question: "Quelle est la masse de 5 litres d'eau en kg ?",
    type: 'numeric',
    answer: 5,
    hint: "1 L d'eau = 1 kg. 5 L = 5 kg"
  },
  {
    id: 197,
    categoryId: 4,
    question: "Combien de jours dans 3 semaines ?",
    type: 'numeric',
    answer: 21,
    hint: "1 semaine = 7 jours. 3 × 7 = 21 jours"
  },
  {
    id: 198,
    categoryId: 4,
    question: "56 jours = combien de semaines ?",
    type: 'numeric',
    answer: 8,
    hint: "56 ÷ 7 = 8 semaines"
  },
  {
    id: 199,
    categoryId: 4,
    question: "2 ans = combien de mois ?",
    type: 'numeric',
    answer: 24,
    hint: "1 an = 12 mois. 2 × 12 = 24 mois"
  },
  {
    id: 200,
    categoryId: 4,
    question: "36 mois = combien d'années ?",
    type: 'numeric',
    answer: 3,
    hint: "36 ÷ 12 = 3 ans"
  }
];

// ===== CATÉGORIE 5: GÉOMÉTRIE (50 exercices) =====
const geometrieExercises: RevisionExercise[] = [
  {
    id: 201,
    categoryId: 5,
    question: "Un triangle ayant 3 côtés égaux est un...",
    type: 'qcm',
    answer: "Triangle équilatéral",
    choices: ["Triangle équilatéral", "Triangle isocèle", "Triangle rectangle", "Triangle scalène"],
    hint: "Équilatéral = 3 côtés égaux"
  },
  {
    id: 202,
    categoryId: 5,
    question: "La longueur de la circonférence d'un cercle est aussi appelée...",
    type: 'qcm',
    answer: "Périmètre",
    choices: ["Périmètre", "Diamètre", "Rayon", "Aire"],
    hint: "Circonférence = périmètre du cercle"
  },
  {
    id: 203,
    categoryId: 5,
    question: "La somme des angles d'un triangle est égale à...",
    type: 'qcm',
    answer: "180°",
    choices: ["180°", "90°", "160°", "360°"],
    hint: "Dans tout triangle, la somme des 3 angles = 180°"
  },
  {
    id: 204,
    categoryId: 5,
    question: "Triangle rectangle avec un angle de 40°. Mesure du 3ème angle ?",
    type: 'numeric',
    answer: 50,
    hint: "90° + 40° + x = 180°. Donc x = 50°"
  },
  {
    id: 205,
    categoryId: 5,
    question: "120° + ? = 180°",
    type: 'numeric',
    answer: 60,
    hint: "180 - 120 = 60°"
  },
  {
    id: 206,
    categoryId: 5,
    question: "Quadrilatère : 4 côtés égaux, diagonales perpendiculaires, pas d'angles droits. Qui suis-je ?",
    type: 'qcm',
    answer: "Losange",
    choices: ["Losange", "Carré", "Rectangle", "Trapèze"],
    hint: "Le losange a 4 côtés égaux mais pas d'angles droits"
  },
  {
    id: 207,
    categoryId: 5,
    question: "Deux droites parallèles ne se croisent jamais. Vrai ou Faux ?",
    type: 'qcm',
    answer: "Vrai",
    choices: ["Vrai", "Faux"],
    hint: "Par définition, des droites parallèles ne se rencontrent jamais"
  },
  {
    id: 208,
    categoryId: 5,
    question: "Aire d'un triangle de base 12 m et hauteur 6 m ?",
    type: 'numeric',
    answer: 36,
    hint: "Aire = (base × hauteur) / 2 = (12 × 6) / 2 = 36 m²"
  },
  {
    id: 209,
    categoryId: 5,
    question: "Terrain triangulaire : base 12 m, hauteur 15 m. Aire ?",
    type: 'numeric',
    answer: 90,
    hint: "Aire = (12 × 15) / 2 = 90 m²"
  },
  {
    id: 210,
    categoryId: 5,
    question: "Carré de 225 m². Côté ?",
    type: 'numeric',
    answer: 15,
    hint: "Côté = √225 = 15 m"
  },
  {
    id: 211,
    categoryId: 5,
    question: "Carré de périmètre 24 m. Aire ?",
    type: 'numeric',
    answer: 36,
    hint: "Côté = 24/4 = 6 m. Aire = 6² = 36 m²"
  },
  {
    id: 212,
    categoryId: 5,
    question: "Rectangle : longueur 57 m, largeur 11 m. Surface ?",
    type: 'numeric',
    answer: 627,
    hint: "Aire = L × l = 57 × 11 = 627 m²"
  },
  {
    id: 213,
    categoryId: 5,
    question: "Rectangle : périmètre 28 m, longueur 8 m. Surface ?",
    type: 'numeric',
    answer: 48,
    hint: "Largeur = (28 - 2×8)/2 = 6 m. Aire = 8 × 6 = 48 m²"
  },
  {
    id: 214,
    categoryId: 5,
    question: "Cercle de périmètre 314 m. Rayon ? (π ≈ 3,14)",
    type: 'numeric',
    answer: 50,
    hint: "P = 2πr. r = 314/(2×3,14) = 50 m"
  },
  {
    id: 215,
    categoryId: 5,
    question: "Cylindre : diamètre 2 m, hauteur 1 m. Volume en m³ ? (π ≈ 3,14)",
    type: 'numeric',
    answer: 3.14,
    hint: "V = πr²h = 3,14 × 1² × 1 = 3,14 m³"
  },
  {
    id: 216,
    categoryId: 5,
    question: "Périmètre d'un carré de 15 cm de côté ?",
    type: 'numeric',
    answer: 60,
    hint: "P = 4 × côté = 4 × 15 = 60 cm"
  },
  {
    id: 217,
    categoryId: 5,
    question: "Périmètre d'un rectangle : 12 cm × 8 cm ?",
    type: 'numeric',
    answer: 40,
    hint: "P = 2(L + l) = 2(12 + 8) = 40 cm"
  },
  {
    id: 218,
    categoryId: 5,
    question: "Aire d'un carré de 9 cm de côté ?",
    type: 'numeric',
    answer: 81,
    hint: "Aire = côté² = 9² = 81 cm²"
  },
  {
    id: 219,
    categoryId: 5,
    question: "Aire d'un rectangle : 15 cm × 6 cm ?",
    type: 'numeric',
    answer: 90,
    hint: "Aire = L × l = 15 × 6 = 90 cm²"
  },
  {
    id: 220,
    categoryId: 5,
    question: "Circonférence d'un cercle de rayon 5 cm ? (π ≈ 3,14)",
    type: 'numeric',
    answer: 31.4,
    hint: "C = 2πr = 2 × 3,14 × 5 = 31,4 cm"
  },
  {
    id: 221,
    categoryId: 5,
    question: "Aire d'un cercle de rayon 4 cm ? (π ≈ 3,14)",
    type: 'numeric',
    answer: 50.24,
    hint: "A = πr² = 3,14 × 4² = 50,24 cm²"
  },
  {
    id: 222,
    categoryId: 5,
    question: "Cercle de rayon 7 cm. Diamètre ?",
    type: 'numeric',
    answer: 14,
    hint: "D = 2r = 2 × 7 = 14 cm"
  },
  {
    id: 223,
    categoryId: 5,
    question: "Cercle de diamètre 18 cm. Rayon ?",
    type: 'numeric',
    answer: 9,
    hint: "r = D/2 = 18/2 = 9 cm"
  },
  {
    id: 224,
    categoryId: 5,
    question: "Volume d'un cube de 5 cm d'arête ?",
    type: 'numeric',
    answer: 125,
    hint: "V = a³ = 5³ = 125 cm³"
  },
  {
    id: 225,
    categoryId: 5,
    question: "Aire totale d'un cube de 4 cm d'arête ?",
    type: 'numeric',
    answer: 96,
    hint: "Aire = 6 × a² = 6 × 16 = 96 cm²"
  },
  {
    id: 226,
    categoryId: 5,
    question: "Volume d'un pavé : 8 cm × 5 cm × 3 cm ?",
    type: 'numeric',
    answer: 120,
    hint: "V = L × l × h = 8 × 5 × 3 = 120 cm³"
  },
  {
    id: 227,
    categoryId: 5,
    question: "Combien de degrés mesure un angle droit ?",
    type: 'numeric',
    answer: 90,
    hint: "Un angle droit = 90°"
  },
  {
    id: 228,
    categoryId: 5,
    question: "Combien de degrés mesure un angle plat ?",
    type: 'numeric',
    answer: 180,
    hint: "Un angle plat = 180°"
  },
  {
    id: 229,
    categoryId: 5,
    question: "Qu'est-ce qu'un triangle isocèle ?",
    type: 'qcm',
    answer: "Un triangle avec 2 côtés égaux",
    choices: ["Un triangle avec 2 côtés égaux", "Un triangle avec 3 côtés égaux", "Un triangle avec un angle droit", "Un triangle avec tous les côtés différents"],
    hint: "Isocèle = 2 côtés égaux"
  },
  {
    id: 230,
    categoryId: 5,
    question: "Qu'est-ce qu'un triangle rectangle ?",
    type: 'qcm',
    answer: "Un triangle avec un angle droit",
    choices: ["Un triangle avec un angle droit", "Un triangle avec 3 angles égaux", "Un triangle avec 2 côtés égaux", "Un triangle avec 3 côtés égaux"],
    hint: "Rectangle = contient un angle de 90°"
  },
  {
    id: 231,
    categoryId: 5,
    question: "Qu'est-ce qu'un losange ?",
    type: 'qcm',
    answer: "Un quadrilatère avec 4 côtés égaux",
    choices: ["Un quadrilatère avec 4 côtés égaux", "Un quadrilatère avec 4 angles droits", "Un quadrilatère avec 2 paires de côtés parallèles", "Un triangle avec 3 côtés égaux"],
    hint: "Losange = 4 côtés égaux (mais pas forcément des angles droits)"
  },
  {
    id: 232,
    categoryId: 5,
    question: "Qu'est-ce qu'un parallélogramme ?",
    type: 'qcm',
    answer: "Un quadrilatère avec côtés opposés parallèles",
    choices: ["Un quadrilatère avec côtés opposés parallèles", "Un quadrilatère avec 4 côtés égaux", "Un triangle avec 2 côtés parallèles", "Un cercle avec 4 côtés"],
    hint: "Parallélogramme = côtés opposés parallèles et égaux"
  },
  {
    id: 233,
    categoryId: 5,
    question: "Qu'est-ce qu'un trapèze ?",
    type: 'qcm',
    answer: "Un quadrilatère avec 2 côtés parallèles",
    choices: ["Un quadrilatère avec 2 côtés parallèles", "Un quadrilatère avec 4 côtés égaux", "Un triangle avec 2 côtés parallèles", "Un rectangle penché"],
    hint: "Trapèze = exactement 2 côtés parallèles (les bases)"
  },
  {
    id: 234,
    categoryId: 5,
    question: "Combien de diagonales a un carré ?",
    type: 'numeric',
    answer: 2,
    hint: "Un carré a 2 diagonales qui se coupent en leur milieu"
  },
  {
    id: 235,
    categoryId: 5,
    question: "Les diagonales d'un rectangle sont-elles de même longueur ?",
    type: 'qcm',
    answer: "Oui",
    choices: ["Oui", "Non", "Seulement si c'est un carré", "Cela dépend"],
    hint: "Les diagonales d'un rectangle sont toujours égales"
  },
  {
    id: 236,
    categoryId: 5,
    question: "Combien d'angles droits possède un carré ?",
    type: 'numeric',
    answer: 4,
    hint: "Un carré a 4 angles droits (90° chacun)"
  },
  {
    id: 237,
    categoryId: 5,
    question: "Les côtés opposés d'un rectangle sont-ils égaux ?",
    type: 'qcm',
    answer: "Oui",
    choices: ["Oui", "Non", "Seulement les longueurs", "Seulement les largeurs"],
    hint: "Dans un rectangle, les côtés opposés sont toujours égaux"
  },
  {
    id: 238,
    categoryId: 5,
    question: "Combien d'axes de symétrie possède un carré ?",
    type: 'numeric',
    answer: 4,
    hint: "Un carré a 4 axes de symétrie (2 diagonales + 2 médiatrices)"
  },
  {
    id: 239,
    categoryId: 5,
    question: "Combien d'axes de symétrie possède un rectangle ?",
    type: 'numeric',
    answer: 2,
    hint: "Un rectangle a 2 axes de symétrie (les médiatrices des côtés)"
  },
  {
    id: 240,
    categoryId: 5,
    question: "Combien d'axes de symétrie possède un triangle équilatéral ?",
    type: 'numeric',
    answer: 3,
    hint: "Un triangle équilatéral a 3 axes de symétrie"
  },
  {
    id: 241,
    categoryId: 5,
    question: "Aire d'un parallélogramme : base 10 cm, hauteur 6 cm ?",
    type: 'numeric',
    answer: 60,
    hint: "Aire = base × hauteur = 10 × 6 = 60 cm²"
  },
  {
    id: 242,
    categoryId: 5,
    question: "Un hexagone régulier a combien de côtés ?",
    type: 'numeric',
    answer: 6,
    hint: "Hexa = 6"
  },
  {
    id: 243,
    categoryId: 5,
    question: "Aire d'un trapèze : bases 8 cm et 12 cm, hauteur 5 cm ?",
    type: 'numeric',
    answer: 50,
    hint: "Aire = (b1 + b2) × h / 2 = (8 + 12) × 5 / 2 = 50 cm²"
  },
  {
    id: 244,
    categoryId: 5,
    question: "Un pentagone régulier a combien de côtés ?",
    type: 'numeric',
    answer: 5,
    hint: "Penta = 5"
  },
  {
    id: 245,
    categoryId: 5,
    question: "Somme des angles d'un quadrilatère ?",
    type: 'numeric',
    answer: 360,
    hint: "Somme des angles d'un quadrilatère = 360°"
  },
  {
    id: 246,
    categoryId: 5,
    question: "Un octogone a combien de côtés ?",
    type: 'numeric',
    answer: 8,
    hint: "Octo = 8"
  },
  {
    id: 247,
    categoryId: 5,
    question: "Périmètre d'un triangle équilatéral de côté 7 cm ?",
    type: 'numeric',
    answer: 21,
    hint: "P = 3 × côté = 3 × 7 = 21 cm"
  },
  {
    id: 248,
    categoryId: 5,
    question: "Volume d'un prisme à base carrée : côté 4 cm, hauteur 10 cm ?",
    type: 'numeric',
    answer: 160,
    hint: "V = aire base × hauteur = 16 × 10 = 160 cm³"
  },
  {
    id: 249,
    categoryId: 5,
    question: "Combien de faces a un cube ?",
    type: 'numeric',
    answer: 6,
    hint: "Un cube a 6 faces carrées"
  },
  {
    id: 250,
    categoryId: 5,
    question: "Combien de sommets a un cube ?",
    type: 'numeric',
    answer: 8,
    hint: "Un cube a 8 sommets"
  }
];

// ===== CATÉGORIE 6: PROBLÈMES VIE COURANTE (50 exercices) =====
const problemesExercises: RevisionExercise[] = [
  {
    id: 251,
    categoryId: 6,
    question: "Marie a 45 € et achète un livre à 12 €. Combien lui reste-t-il ?",
    type: 'numeric',
    answer: 33,
    hint: "45 - 12 = 33 €"
  },
  {
    id: 252,
    categoryId: 6,
    question: "Un train part à 8h15 et arrive à 10h45. Combien de temps dure le trajet en minutes ?",
    type: 'numeric',
    answer: 150,
    hint: "De 8h15 à 10h45 = 2h30 = 150 minutes"
  },
  {
    id: 253,
    categoryId: 6,
    question: "Paul a 3 fois plus de billes que Jean. Jean a 15 billes. Combien Paul en a-t-il ?",
    type: 'numeric',
    answer: 45,
    hint: "3 × 15 = 45 billes"
  },
  {
    id: 254,
    categoryId: 6,
    question: "Un magasin vend 6 cahiers pour 9 €. Quel est le prix d'un cahier ?",
    type: 'numeric',
    answer: 1.5,
    hint: "9 ÷ 6 = 1,5 €"
  },
  {
    id: 255,
    categoryId: 6,
    question: "Une voiture parcourt 240 km en 3 heures. Quelle est sa vitesse en km/h ?",
    type: 'numeric',
    answer: 80,
    hint: "Vitesse = distance ÷ temps = 240 ÷ 3 = 80 km/h"
  },
  {
    id: 256,
    categoryId: 6,
    question: "Sophie achète 4 kg de pommes à 2,50 € le kg. Combien paie-t-elle ?",
    type: 'numeric',
    answer: 10,
    hint: "4 × 2,50 = 10 €"
  },
  {
    id: 257,
    categoryId: 6,
    question: "Un rectangle a une longueur de 12 cm et une largeur de 8 cm. Quel est son périmètre ?",
    type: 'numeric',
    answer: 40,
    hint: "P = 2 × (L + l) = 2 × (12 + 8) = 40 cm"
  },
  {
    id: 258,
    categoryId: 6,
    question: "Pierre partage 48 bonbons entre 6 enfants. Combien chaque enfant reçoit-il ?",
    type: 'numeric',
    answer: 8,
    hint: "48 ÷ 6 = 8 bonbons"
  },
  {
    id: 259,
    categoryId: 6,
    question: "Léa a 25 € et dépense les 2/5 de cette somme. Combien dépense-t-elle ?",
    type: 'numeric',
    answer: 10,
    hint: "25 × 2/5 = 50/5 = 10 €"
  },
  {
    id: 260,
    categoryId: 6,
    question: "Un film dure 1h45. Il commence à 14h20. À quelle heure finit-il ? (en minutes depuis minuit)",
    type: 'numeric',
    answer: 965,
    hint: "14h20 + 1h45 = 16h05 = 16×60 + 5 = 965 minutes"
  },
  {
    id: 261,
    categoryId: 6,
    question: "Marc achète un vélo à 180 € avec 20% de réduction. Combien paie-t-il ?",
    type: 'numeric',
    answer: 144,
    hint: "20% de 180 = 36 €. Prix final = 180 - 36 = 144 €"
  },
  {
    id: 262,
    categoryId: 6,
    question: "Une piscine contient 450 L d'eau. On en vide 1/3. Combien reste-t-il de litres ?",
    type: 'numeric',
    answer: 300,
    hint: "450 - (450 ÷ 3) = 450 - 150 = 300 L"
  },
  {
    id: 263,
    categoryId: 6,
    question: "Un jardinier plante 8 rangées de 12 tulipes. Combien de tulipes plante-t-il ?",
    type: 'numeric',
    answer: 96,
    hint: "8 × 12 = 96 tulipes"
  },
  {
    id: 264,
    categoryId: 6,
    question: "Un livre coûte 15 € TTC. La TVA est de 5%. Quel est le prix hors taxe arrondi au centième ?",
    type: 'numeric',
    answer: 14.29,
    hint: "Prix HT = 15 ÷ 1,05 ≈ 14,29 €"
  },
  {
    id: 265,
    categoryId: 6,
    question: "Emma mesure 1,45 m. Son père mesure 32 cm de plus. Quelle est la taille du père en mètres ?",
    type: 'numeric',
    answer: 1.77,
    hint: "1,45 + 0,32 = 1,77 m"
  },
  {
    id: 266,
    categoryId: 6,
    question: "Une classe de 28 élèves part en sortie. Le car coûte 252 €. Combien paie chaque élève ?",
    type: 'numeric',
    answer: 9,
    hint: "252 ÷ 28 = 9 €"
  },
  {
    id: 267,
    categoryId: 6,
    question: "Un cycliste roule à 24 km/h pendant 2h30. Quelle distance parcourt-il ?",
    type: 'numeric',
    answer: 60,
    hint: "Distance = vitesse × temps = 24 × 2,5 = 60 km"
  },
  {
    id: 268,
    categoryId: 6,
    question: "Lucas a 72 €. Il dépense 1/4 puis 1/3 du reste. Combien lui reste-t-il ?",
    type: 'numeric',
    answer: 36,
    hint: "Après 1/4 : 72 - 18 = 54 €. Après 1/3 du reste : 54 - 18 = 36 €"
  },
  {
    id: 269,
    categoryId: 6,
    question: "Un terrain rectangulaire mesure 45 m × 30 m. Quelle est son aire en m² ?",
    type: 'numeric',
    answer: 1350,
    hint: "Aire = 45 × 30 = 1350 m²"
  },
  {
    id: 270,
    categoryId: 6,
    question: "Clara achète 3 croissants à 1,20 € et 2 pains au chocolat à 1,50 €. Combien paie-t-elle ?",
    type: 'numeric',
    answer: 6.6,
    hint: "3 × 1,20 + 2 × 1,50 = 3,60 + 3,00 = 6,60 €"
  },
  {
    id: 271,
    categoryId: 6,
    question: "Un réservoir de 60 L est rempli aux 3/4. Combien de litres contient-il ?",
    type: 'numeric',
    answer: 45,
    hint: "60 × 3/4 = 180/4 = 45 L"
  },
  {
    id: 272,
    categoryId: 6,
    question: "Thomas court 5 km en 25 minutes. À quelle vitesse court-il en km/h ?",
    type: 'numeric',
    answer: 12,
    hint: "25 min = 5/12 h. Vitesse = 5 ÷ (25/60) = 5 × 60/25 = 12 km/h"
  },
  {
    id: 273,
    categoryId: 6,
    question: "Une bouteille contient 1,5 L de jus. On sert 6 verres égaux. Quelle contenance par verre en cL ?",
    type: 'numeric',
    answer: 25,
    hint: "1,5 L = 150 cL. 150 ÷ 6 = 25 cL"
  },
  {
    id: 274,
    categoryId: 6,
    question: "Un article passe de 80 € à 100 €. Quel est le pourcentage d'augmentation ?",
    type: 'numeric',
    answer: 25,
    hint: "Augmentation = 20 €. Pourcentage = 20/80 × 100 = 25%"
  },
  {
    id: 275,
    categoryId: 6,
    question: "Julie lit 35 pages par jour. Combien de jours pour finir un livre de 245 pages ?",
    type: 'numeric',
    answer: 7,
    hint: "245 ÷ 35 = 7 jours"
  },
  {
    id: 276,
    categoryId: 6,
    question: "Un sac de 2,5 kg de riz coûte 4,50 €. Quel est le prix au kg ?",
    type: 'numeric',
    answer: 1.8,
    hint: "4,50 ÷ 2,5 = 1,80 €/kg"
  },
  {
    id: 277,
    categoryId: 6,
    question: "Une pizza est partagée en 8 parts égales. 3 personnes mangent chacune 2 parts. Quelle fraction reste-t-il ?",
    type: 'qcm',
    answer: "2/8 ou 1/4",
    choices: ["2/8 ou 1/4", "3/8", "5/8", "6/8"],
    hint: "Parts mangées = 3 × 2 = 6. Il reste 8 - 6 = 2 parts = 2/8 = 1/4"
  },
  {
    id: 278,
    categoryId: 6,
    question: "Un avion vole à 900 km/h. Quelle distance parcourt-il en 40 minutes ?",
    type: 'numeric',
    answer: 600,
    hint: "40 min = 2/3 h. Distance = 900 × 2/3 = 600 km"
  },
  {
    id: 279,
    categoryId: 6,
    question: "Une entreprise produit 1500 pièces par jour, 5 jours par semaine. Combien par semaine ?",
    type: 'numeric',
    answer: 7500,
    hint: "1500 × 5 = 7500 pièces"
  },
  {
    id: 280,
    categoryId: 6,
    question: "Anna a 15 ans. Sa mère a le triple de son âge. Quel âge a sa mère ?",
    type: 'numeric',
    answer: 45,
    hint: "3 × 15 = 45 ans"
  },
  {
    id: 281,
    categoryId: 6,
    question: "Un paquet de 500 g de pâtes coûte 1,25 €. Quel est le prix de 2 kg ?",
    type: 'numeric',
    answer: 5,
    hint: "2 kg = 4 × 500 g. Prix = 4 × 1,25 = 5 €"
  },
  {
    id: 282,
    categoryId: 6,
    question: "Le périmètre d'un carré est 48 cm. Quelle est la longueur d'un côté ?",
    type: 'numeric',
    answer: 12,
    hint: "Côté = Périmètre ÷ 4 = 48 ÷ 4 = 12 cm"
  },
  {
    id: 283,
    categoryId: 6,
    question: "Tom achète 2,4 kg de viande à 12,50 € le kg. Combien paie-t-il ?",
    type: 'numeric',
    answer: 30,
    hint: "2,4 × 12,50 = 30 €"
  },
  {
    id: 284,
    categoryId: 6,
    question: "Une école compte 420 élèves. 35% sont en CM2. Combien d'élèves sont en CM2 ?",
    type: 'numeric',
    answer: 147,
    hint: "420 × 35/100 = 420 × 0,35 = 147 élèves"
  },
  {
    id: 285,
    categoryId: 6,
    question: "Un robinet remplit une baignoire de 180 L en 15 minutes. Quel est son débit en L/min ?",
    type: 'numeric',
    answer: 12,
    hint: "Débit = 180 ÷ 15 = 12 L/min"
  },
  {
    id: 286,
    categoryId: 6,
    question: "Léo a 50 € et achète 3 BD à 8,50 € pièce. Combien lui reste-t-il ?",
    type: 'numeric',
    answer: 24.5,
    hint: "50 - (3 × 8,50) = 50 - 25,50 = 24,50 €"
  },
  {
    id: 287,
    categoryId: 6,
    question: "Un terrain a une aire de 600 m². Sa largeur est 20 m. Quelle est sa longueur ?",
    type: 'numeric',
    answer: 30,
    hint: "Longueur = Aire ÷ largeur = 600 ÷ 20 = 30 m"
  },
  {
    id: 288,
    categoryId: 6,
    question: "Un bus transporte 45 passagers. 20% descendent à l'arrêt. Combien restent ?",
    type: 'numeric',
    answer: 36,
    hint: "Descendent : 45 × 0,20 = 9. Restent : 45 - 9 = 36"
  },
  {
    id: 289,
    categoryId: 6,
    question: "Sarah a économisé 240 € en 8 mois. Combien économise-t-elle par mois ?",
    type: 'numeric',
    answer: 30,
    hint: "240 ÷ 8 = 30 €/mois"
  },
  {
    id: 290,
    categoryId: 6,
    question: "Un carré a une aire de 81 cm². Quel est son côté ?",
    type: 'numeric',
    answer: 9,
    hint: "Côté = √81 = 9 cm"
  },
  {
    id: 291,
    categoryId: 6,
    question: "Un commerçant achète 50 articles à 6 € et les revend 9 € chacun. Quel est son bénéfice total ?",
    type: 'numeric',
    answer: 150,
    hint: "Bénéfice par article = 9 - 6 = 3 €. Total = 50 × 3 = 150 €"
  },
  {
    id: 292,
    categoryId: 6,
    question: "Un film de 2h15 commence à 20h45. À quelle heure finit-il ? (Donner l'heure en format HH.MM, ex: 23.00)",
    type: 'numeric',
    answer: 23,
    hint: "20h45 + 2h15 = 23h00"
  },
  {
    id: 293,
    categoryId: 6,
    question: "Une recette pour 4 personnes demande 300 g de farine. Combien pour 6 personnes ?",
    type: 'numeric',
    answer: 450,
    hint: "300 × 6/4 = 300 × 1,5 = 450 g"
  },
  {
    id: 294,
    categoryId: 6,
    question: "Un triangle a une base de 16 cm et une hauteur de 9 cm. Quelle est son aire ?",
    type: 'numeric',
    answer: 72,
    hint: "Aire = (base × hauteur) ÷ 2 = (16 × 9) ÷ 2 = 72 cm²"
  },
  {
    id: 295,
    categoryId: 6,
    question: "Trois frères se partagent 175 € de façon que l'aîné ait le double du cadet et le cadet le double du benjamin. Combien reçoit le cadet ?",
    type: 'numeric',
    answer: 50,
    hint: "Benjamin = x, Cadet = 2x, Aîné = 4x. Total = 7x = 175 €. x = 25. Cadet = 50 €"
  },
  {
    id: 296,
    categoryId: 6,
    question: "Une voiture consomme 6 L aux 100 km. Combien consomme-t-elle pour 350 km ?",
    type: 'numeric',
    answer: 21,
    hint: "6 × 350/100 = 6 × 3,5 = 21 L"
  },
  {
    id: 297,
    categoryId: 6,
    question: "Le prix d'un article passe de 40 € à 32 €. Quel est le pourcentage de réduction ?",
    type: 'numeric',
    answer: 20,
    hint: "Réduction = 8 €. Pourcentage = 8/40 × 100 = 20%"
  },
  {
    id: 298,
    categoryId: 6,
    question: "Une boîte contient 66 chocolats. On les partage en 6 parts égales. Combien par part ?",
    type: 'numeric',
    answer: 11,
    hint: "66 ÷ 6 = 11 chocolats"
  },
  {
    id: 299,
    categoryId: 6,
    question: "Un ouvrier gagne 12 € de l'heure. Combien gagne-t-il pour 35 heures de travail ?",
    type: 'numeric',
    answer: 420,
    hint: "12 × 35 = 420 €"
  },
  {
    id: 300,
    categoryId: 6,
    question: "Une piscine de 8 m × 4 m × 1,5 m. Quel est son volume en m³ ?",
    type: 'numeric',
    answer: 48,
    hint: "Volume = 8 × 4 × 1,5 = 48 m³"
  }
];

// Export all exercises
export const revisionExercises: RevisionExercise[] = [
  ...numerationExercises,
  ...operationsExercises,
  ...fractionsExercises,
  ...grandeursExercises,
  ...geometrieExercises,
  ...problemesExercises
];

// Helper functions
export const getExercisesByCategory = (categoryId: number): RevisionExercise[] => {
  return revisionExercises.filter(ex => ex.categoryId === categoryId);
};

export const getExerciseById = (id: number): RevisionExercise | undefined => {
  return revisionExercises.find(ex => ex.id === id);
};

export const getCategoryName = (categoryId: number): string => {
  const names: Record<number, string> = {
    1: "Numération",
    2: "Opérations",
    3: "Fractions et Pourcentages",
    4: "Grandeurs et Mesures",
    5: "Géométrie",
    6: "Problèmes"
  };
  return names[categoryId] || "Inconnu";
};

// Shuffle helper for randomizing exercises
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
