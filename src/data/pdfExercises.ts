// Exercises extracted from the PDF "Calcul Mental"
// Organized by theme and difficulty level

export interface PDFExercise {
  exercise: string;
  answer: number;
  theme: string;
  difficulty: number; // 1 = easy, 2 = medium, 3 = hard
}

// ADDITION EXERCISES
export const additionExercises: PDFExercise[] = [
  // Adding 1, 2, 3 to single digit numbers (Level 1 - very easy)
  { exercise: "1 + 2", answer: 3, theme: "additions", difficulty: 1 },
  { exercise: "2 + 3", answer: 5, theme: "additions", difficulty: 1 },
  { exercise: "1 + 1", answer: 2, theme: "additions", difficulty: 1 },
  { exercise: "2 + 2", answer: 4, theme: "additions", difficulty: 1 },
  { exercise: "1 + 3", answer: 4, theme: "additions", difficulty: 1 },
  { exercise: "4 + 1", answer: 5, theme: "additions", difficulty: 1 },
  { exercise: "5 + 2", answer: 7, theme: "additions", difficulty: 1 },
  { exercise: "6 + 3", answer: 9, theme: "additions", difficulty: 1 },
  { exercise: "4 + 3", answer: 7, theme: "additions", difficulty: 1 },
  { exercise: "5 + 3", answer: 8, theme: "additions", difficulty: 1 },
  { exercise: "5 + 1", answer: 6, theme: "additions", difficulty: 1 },
  { exercise: "4 + 2", answer: 6, theme: "additions", difficulty: 1 },
  { exercise: "7 + 1", answer: 8, theme: "additions", difficulty: 1 },
  { exercise: "8 + 3", answer: 11, theme: "additions", difficulty: 1 },
  { exercise: "7 + 2", answer: 9, theme: "additions", difficulty: 1 },
  { exercise: "6 + 2", answer: 8, theme: "additions", difficulty: 1 },
  { exercise: "8 + 1", answer: 9, theme: "additions", difficulty: 1 },
  { exercise: "9 + 2", answer: 11, theme: "additions", difficulty: 1 },
  { exercise: "0 + 3", answer: 3, theme: "additions", difficulty: 1 },
  
  // Adding to 2-digit numbers without carry
  { exercise: "12 + 7", answer: 19, theme: "additions", difficulty: 1 },
  { exercise: "35 + 2", answer: 37, theme: "additions", difficulty: 1 },
  { exercise: "28 + 1", answer: 29, theme: "additions", difficulty: 1 },
  { exercise: "30 + 5", answer: 35, theme: "additions", difficulty: 1 },
  { exercise: "43 + 6", answer: 49, theme: "additions", difficulty: 1 },
  { exercise: "24 + 3", answer: 27, theme: "additions", difficulty: 1 },
  { exercise: "77 + 2", answer: 79, theme: "additions", difficulty: 1 },
  { exercise: "51 + 4", answer: 55, theme: "additions", difficulty: 1 },
  { exercise: "96 + 3", answer: 99, theme: "additions", difficulty: 1 },
  { exercise: "75 + 4", answer: 79, theme: "additions", difficulty: 1 },
  { exercise: "92 + 5", answer: 97, theme: "additions", difficulty: 1 },
  { exercise: "54 + 1", answer: 55, theme: "additions", difficulty: 1 },
  { exercise: "31 + 6", answer: 37, theme: "additions", difficulty: 1 },
  { exercise: "40 + 7", answer: 47, theme: "additions", difficulty: 1 },

  // Adding 8
  { exercise: "460 + 8", answer: 468, theme: "additions", difficulty: 2 },
  { exercise: "393 + 8", answer: 401, theme: "additions", difficulty: 2 },
  { exercise: "445 + 8", answer: 453, theme: "additions", difficulty: 2 },
  { exercise: "599 + 8", answer: 607, theme: "additions", difficulty: 2 },
  { exercise: "378 + 8", answer: 386, theme: "additions", difficulty: 2 },
  { exercise: "566 + 8", answer: 574, theme: "additions", difficulty: 2 },
  { exercise: "437 + 8", answer: 445, theme: "additions", difficulty: 2 },
  { exercise: "312 + 8", answer: 320, theme: "additions", difficulty: 2 },
  { exercise: "451 + 8", answer: 459, theme: "additions", difficulty: 2 },
  { exercise: "773 + 8", answer: 781, theme: "additions", difficulty: 2 },
  { exercise: "472 + 8", answer: 480, theme: "additions", difficulty: 2 },
  { exercise: "607 + 8", answer: 615, theme: "additions", difficulty: 2 },
  { exercise: "485 + 8", answer: 493, theme: "additions", difficulty: 2 },
  { exercise: "374 + 8", answer: 382, theme: "additions", difficulty: 2 },

  // Adding multiples of 10
  { exercise: "25 + 20", answer: 45, theme: "additions", difficulty: 1 },
  { exercise: "36 + 40", answer: 76, theme: "additions", difficulty: 1 },
  { exercise: "44 + 80", answer: 124, theme: "additions", difficulty: 1 },
  { exercise: "23 + 90", answer: 113, theme: "additions", difficulty: 1 },
  { exercise: "68 + 60", answer: 128, theme: "additions", difficulty: 1 },
  { exercise: "77 + 20", answer: 97, theme: "additions", difficulty: 1 },
  { exercise: "92 + 40", answer: 132, theme: "additions", difficulty: 1 },
  { exercise: "10 + 70", answer: 80, theme: "additions", difficulty: 1 },
  { exercise: "89 + 30", answer: 119, theme: "additions", difficulty: 1 },
  { exercise: "51 + 50", answer: 101, theme: "additions", difficulty: 1 },
  { exercise: "14 + 30", answer: 44, theme: "additions", difficulty: 1 },
  { exercise: "73 + 80", answer: 153, theme: "additions", difficulty: 1 },
  { exercise: "98 + 40", answer: 138, theme: "additions", difficulty: 1 },
  { exercise: "59 + 50", answer: 109, theme: "additions", difficulty: 1 },
  { exercise: "87 + 20", answer: 107, theme: "additions", difficulty: 1 },
  { exercise: "61 + 70", answer: 131, theme: "additions", difficulty: 1 },
  { exercise: "35 + 30", answer: 65, theme: "additions", difficulty: 1 },
  { exercise: "57 + 90", answer: 147, theme: "additions", difficulty: 1 },
  { exercise: "66 + 80", answer: 146, theme: "additions", difficulty: 1 },
  { exercise: "22 + 20", answer: 42, theme: "additions", difficulty: 1 },

  // Adding 19, 29, 39...
  { exercise: "37 + 19", answer: 56, theme: "additions", difficulty: 2 },
  { exercise: "46 + 29", answer: 75, theme: "additions", difficulty: 2 },
  { exercise: "54 + 19", answer: 73, theme: "additions", difficulty: 2 },
  { exercise: "22 + 29", answer: 51, theme: "additions", difficulty: 2 },
  { exercise: "50 + 19", answer: 69, theme: "additions", difficulty: 2 },
  { exercise: "73 + 39", answer: 112, theme: "additions", difficulty: 2 },
  { exercise: "86 + 19", answer: 105, theme: "additions", difficulty: 2 },
  { exercise: "36 + 29", answer: 65, theme: "additions", difficulty: 2 },
  { exercise: "51 + 29", answer: 80, theme: "additions", difficulty: 2 },
  { exercise: "74 + 19", answer: 93, theme: "additions", difficulty: 2 },
  { exercise: "63 + 29", answer: 92, theme: "additions", difficulty: 2 },
  { exercise: "47 + 39", answer: 86, theme: "additions", difficulty: 2 },
  { exercise: "34 + 19", answer: 53, theme: "additions", difficulty: 2 },
  { exercise: "41 + 49", answer: 90, theme: "additions", difficulty: 2 },

  // Adding 18, 28, 38...
  { exercise: "24 + 18", answer: 42, theme: "additions", difficulty: 2 },
  { exercise: "53 + 28", answer: 81, theme: "additions", difficulty: 2 },
  { exercise: "45 + 38", answer: 83, theme: "additions", difficulty: 2 },
  { exercise: "28 + 18", answer: 46, theme: "additions", difficulty: 2 },
  { exercise: "63 + 28", answer: 91, theme: "additions", difficulty: 2 },
  { exercise: "46 + 38", answer: 84, theme: "additions", difficulty: 2 },
  { exercise: "82 + 28", answer: 110, theme: "additions", difficulty: 2 },
  { exercise: "54 + 28", answer: 82, theme: "additions", difficulty: 2 },
  { exercise: "42 + 38", answer: 80, theme: "additions", difficulty: 2 },
  { exercise: "38 + 38", answer: 76, theme: "additions", difficulty: 2 },
  { exercise: "57 + 18", answer: 75, theme: "additions", difficulty: 2 },
  { exercise: "89 + 18", answer: 107, theme: "additions", difficulty: 2 },
  { exercise: "44 + 38", answer: 82, theme: "additions", difficulty: 2 },
  { exercise: "31 + 48", answer: 79, theme: "additions", difficulty: 2 },
  { exercise: "67 + 28", answer: 95, theme: "additions", difficulty: 2 },

  // Adding 2 numbers with carry
  { exercise: "48 + 35", answer: 83, theme: "additions", difficulty: 2 },
  { exercise: "56 + 27", answer: 83, theme: "additions", difficulty: 2 },
  { exercise: "74 + 64", answer: 138, theme: "additions", difficulty: 2 },
  { exercise: "37 + 39", answer: 76, theme: "additions", difficulty: 2 },
  { exercise: "49 + 52", answer: 101, theme: "additions", difficulty: 2 },
  { exercise: "64 + 36", answer: 100, theme: "additions", difficulty: 2 },
  { exercise: "36 + 48", answer: 84, theme: "additions", difficulty: 2 },
  { exercise: "28 + 83", answer: 111, theme: "additions", difficulty: 2 },
  { exercise: "14 + 96", answer: 110, theme: "additions", difficulty: 2 },
  { exercise: "39 + 75", answer: 114, theme: "additions", difficulty: 2 },
  { exercise: "36 + 77", answer: 113, theme: "additions", difficulty: 2 },
  { exercise: "45 + 56", answer: 101, theme: "additions", difficulty: 2 },
  { exercise: "53 + 58", answer: 111, theme: "additions", difficulty: 2 },
  { exercise: "26 + 74", answer: 100, theme: "additions", difficulty: 2 },
  { exercise: "89 + 17", answer: 106, theme: "additions", difficulty: 2 },
  { exercise: "74 + 29", answer: 103, theme: "additions", difficulty: 2 },
  { exercise: "93 + 36", answer: 129, theme: "additions", difficulty: 2 },
  { exercise: "68 + 75", answer: 143, theme: "additions", difficulty: 2 },
  { exercise: "77 + 73", answer: 150, theme: "additions", difficulty: 2 },
  { exercise: "86 + 97", answer: 183, theme: "additions", difficulty: 2 },

  // Adding 2 multiples of 10
  { exercise: "120 + 50", answer: 170, theme: "additions", difficulty: 1 },
  { exercise: "210 + 30", answer: 240, theme: "additions", difficulty: 1 },
  { exercise: "140 + 20", answer: 160, theme: "additions", difficulty: 1 },
  { exercise: "350 + 50", answer: 400, theme: "additions", difficulty: 1 },
  { exercise: "180 + 60", answer: 240, theme: "additions", difficulty: 1 },
  { exercise: "100 + 90", answer: 190, theme: "additions", difficulty: 1 },
  { exercise: "360 + 60", answer: 420, theme: "additions", difficulty: 1 },
  { exercise: "170 + 30", answer: 200, theme: "additions", difficulty: 1 },
  { exercise: "220 + 20", answer: 240, theme: "additions", difficulty: 1 },
  { exercise: "110 + 90", answer: 200, theme: "additions", difficulty: 1 },
  { exercise: "190 + 40", answer: 230, theme: "additions", difficulty: 1 },
  { exercise: "370 + 50", answer: 420, theme: "additions", difficulty: 1 },
  { exercise: "430 + 10", answer: 440, theme: "additions", difficulty: 1 },
  { exercise: "770 + 60", answer: 830, theme: "additions", difficulty: 1 },
  { exercise: "880 + 60", answer: 940, theme: "additions", difficulty: 1 },
  { exercise: "250 + 90", answer: 340, theme: "additions", difficulty: 1 },
  { exercise: "940 + 30", answer: 970, theme: "additions", difficulty: 1 },
  { exercise: "680 + 20", answer: 700, theme: "additions", difficulty: 1 },

  // Adding large numbers
  { exercise: "35700 + 3000", answer: 38700, theme: "additions", difficulty: 3 },
  { exercise: "63600 + 400", answer: 64000, theme: "additions", difficulty: 3 },
  { exercise: "86300 + 12000", answer: 98300, theme: "additions", difficulty: 3 },
  { exercise: "48000 + 22000", answer: 70000, theme: "additions", difficulty: 3 },
  { exercise: "25800 + 200", answer: 26000, theme: "additions", difficulty: 3 },
  { exercise: "53200 + 1200", answer: 54400, theme: "additions", difficulty: 3 },
  { exercise: "62000 + 62000", answer: 124000, theme: "additions", difficulty: 3 },
  { exercise: "10000 + 105000", answer: 115000, theme: "additions", difficulty: 3 },
  { exercise: "35600 + 405", answer: 36005, theme: "additions", difficulty: 3 },
  { exercise: "22300 + 1700", answer: 24000, theme: "additions", difficulty: 3 },

  // Synthesis additions
  { exercise: "35 + 6", answer: 41, theme: "additions", difficulty: 1 },
  { exercise: "14 + 7", answer: 21, theme: "additions", difficulty: 1 },
  { exercise: "60 + 80", answer: 140, theme: "additions", difficulty: 1 },
  { exercise: "63 + 9", answer: 72, theme: "additions", difficulty: 1 },
  { exercise: "50 + 70", answer: 120, theme: "additions", difficulty: 1 },
  { exercise: "82 + 8", answer: 90, theme: "additions", difficulty: 1 },
  { exercise: "47 + 9", answer: 56, theme: "additions", difficulty: 1 },
  { exercise: "56 + 8", answer: 64, theme: "additions", difficulty: 1 },
  { exercise: "30 + 80", answer: 110, theme: "additions", difficulty: 1 },
  { exercise: "43 + 6", answer: 49, theme: "additions", difficulty: 1 },
  { exercise: "55 + 8", answer: 63, theme: "additions", difficulty: 1 },
  { exercise: "70 + 50", answer: 120, theme: "additions", difficulty: 1 },
  { exercise: "71 + 10", answer: 81, theme: "additions", difficulty: 1 },
  { exercise: "42 + 30", answer: 72, theme: "additions", difficulty: 1 },
  { exercise: "86 + 7", answer: 93, theme: "additions", difficulty: 1 },
  { exercise: "94 + 20", answer: 114, theme: "additions", difficulty: 1 },
];

// SUBTRACTION EXERCISES
export const subtractionExercises: PDFExercise[] = [
  // Subtracting 9
  { exercise: "23 - 9", answer: 14, theme: "soustractions", difficulty: 1 },
  { exercise: "35 - 9", answer: 26, theme: "soustractions", difficulty: 1 },
  { exercise: "42 - 9", answer: 33, theme: "soustractions", difficulty: 1 },
  { exercise: "14 - 9", answer: 5, theme: "soustractions", difficulty: 1 },
  { exercise: "47 - 9", answer: 38, theme: "soustractions", difficulty: 1 },
  { exercise: "28 - 9", answer: 19, theme: "soustractions", difficulty: 1 },
  { exercise: "36 - 9", answer: 27, theme: "soustractions", difficulty: 1 },
  { exercise: "64 - 9", answer: 55, theme: "soustractions", difficulty: 1 },
  { exercise: "50 - 9", answer: 41, theme: "soustractions", difficulty: 1 },
  { exercise: "41 - 9", answer: 32, theme: "soustractions", difficulty: 1 },
  { exercise: "57 - 9", answer: 48, theme: "soustractions", difficulty: 1 },
  { exercise: "70 - 9", answer: 61, theme: "soustractions", difficulty: 1 },
  { exercise: "83 - 9", answer: 74, theme: "soustractions", difficulty: 1 },
  { exercise: "61 - 9", answer: 52, theme: "soustractions", difficulty: 1 },
  { exercise: "34 - 9", answer: 25, theme: "soustractions", difficulty: 1 },
  { exercise: "25 - 9", answer: 16, theme: "soustractions", difficulty: 1 },
  { exercise: "53 - 9", answer: 44, theme: "soustractions", difficulty: 1 },
  { exercise: "46 - 9", answer: 37, theme: "soustractions", difficulty: 1 },
  { exercise: "73 - 9", answer: 64, theme: "soustractions", difficulty: 1 },
  { exercise: "86 - 9", answer: 77, theme: "soustractions", difficulty: 1 },
  { exercise: "92 - 9", answer: 83, theme: "soustractions", difficulty: 2 },
  { exercise: "81 - 9", answer: 72, theme: "soustractions", difficulty: 2 },
  { exercise: "73 - 9", answer: 64, theme: "soustractions", difficulty: 2 },
  { exercise: "16 - 9", answer: 7, theme: "soustractions", difficulty: 1 },
  { exercise: "46 - 9", answer: 37, theme: "soustractions", difficulty: 2 },
  { exercise: "13 - 9", answer: 4, theme: "soustractions", difficulty: 1 },
  { exercise: "33 - 9", answer: 24, theme: "soustractions", difficulty: 2 },
  { exercise: "52 - 9", answer: 43, theme: "soustractions", difficulty: 2 },
  { exercise: "74 - 9", answer: 65, theme: "soustractions", difficulty: 2 },
  { exercise: "66 - 9", answer: 57, theme: "soustractions", difficulty: 2 },
  { exercise: "134 - 9", answer: 125, theme: "soustractions", difficulty: 2 },
  { exercise: "122 - 9", answer: 113, theme: "soustractions", difficulty: 2 },
  { exercise: "163 - 9", answer: 154, theme: "soustractions", difficulty: 2 },
  { exercise: "245 - 9", answer: 236, theme: "soustractions", difficulty: 2 },
  { exercise: "146 - 9", answer: 137, theme: "soustractions", difficulty: 2 },
  { exercise: "220 - 9", answer: 211, theme: "soustractions", difficulty: 2 },
  { exercise: "173 - 9", answer: 164, theme: "soustractions", difficulty: 2 },
  { exercise: "217 - 9", answer: 208, theme: "soustractions", difficulty: 2 },

  // Subtracting 10
  { exercise: "39 - 10", answer: 29, theme: "soustractions", difficulty: 1 },
  { exercise: "77 - 10", answer: 67, theme: "soustractions", difficulty: 1 },
  { exercise: "164 - 10", answer: 154, theme: "soustractions", difficulty: 1 },
  { exercise: "632 - 10", answer: 622, theme: "soustractions", difficulty: 2 },
  { exercise: "420 - 10", answer: 410, theme: "soustractions", difficulty: 2 },
  { exercise: "866 - 10", answer: 856, theme: "soustractions", difficulty: 2 },
  { exercise: "918 - 10", answer: 908, theme: "soustractions", difficulty: 2 },
  { exercise: "700 - 10", answer: 690, theme: "soustractions", difficulty: 2 },
  { exercise: "373 - 10", answer: 363, theme: "soustractions", difficulty: 2 },
  { exercise: "251 - 10", answer: 241, theme: "soustractions", difficulty: 2 },
  { exercise: "781 - 10", answer: 771, theme: "soustractions", difficulty: 2 },
  { exercise: "360 - 10", answer: 350, theme: "soustractions", difficulty: 2 },
  { exercise: "242 - 10", answer: 232, theme: "soustractions", difficulty: 2 },
  { exercise: "853 - 10", answer: 843, theme: "soustractions", difficulty: 2 },
  { exercise: "687 - 10", answer: 677, theme: "soustractions", difficulty: 2 },
  { exercise: "191 - 10", answer: 181, theme: "soustractions", difficulty: 2 },
  { exercise: "573 - 10", answer: 563, theme: "soustractions", difficulty: 2 },
  { exercise: "735 - 10", answer: 725, theme: "soustractions", difficulty: 2 },
  { exercise: "416 - 10", answer: 406, theme: "soustractions", difficulty: 2 },
  { exercise: "281 - 10", answer: 271, theme: "soustractions", difficulty: 2 },

  // Subtracting 2 multiples of 10
  { exercise: "320 - 30", answer: 290, theme: "soustractions", difficulty: 1 },
  { exercise: "270 - 40", answer: 230, theme: "soustractions", difficulty: 1 },
  { exercise: "170 - 50", answer: 120, theme: "soustractions", difficulty: 1 },
  { exercise: "470 - 40", answer: 430, theme: "soustractions", difficulty: 1 },
  { exercise: "230 - 20", answer: 210, theme: "soustractions", difficulty: 1 },
  { exercise: "260 - 40", answer: 220, theme: "soustractions", difficulty: 1 },
  { exercise: "320 - 50", answer: 270, theme: "soustractions", difficulty: 1 },
  { exercise: "570 - 60", answer: 510, theme: "soustractions", difficulty: 1 },
  { exercise: "480 - 90", answer: 390, theme: "soustractions", difficulty: 1 },
  { exercise: "330 - 50", answer: 280, theme: "soustractions", difficulty: 1 },
  { exercise: "270 - 30", answer: 240, theme: "soustractions", difficulty: 1 },
  { exercise: "480 - 50", answer: 430, theme: "soustractions", difficulty: 1 },
  { exercise: "360 - 80", answer: 280, theme: "soustractions", difficulty: 1 },
  { exercise: "590 - 60", answer: 530, theme: "soustractions", difficulty: 1 },
  { exercise: "610 - 30", answer: 580, theme: "soustractions", difficulty: 1 },
  { exercise: "830 - 40", answer: 790, theme: "soustractions", difficulty: 1 },
  { exercise: "750 - 20", answer: 730, theme: "soustractions", difficulty: 1 },
  { exercise: "370 - 60", answer: 310, theme: "soustractions", difficulty: 1 },
  { exercise: "560 - 30", answer: 530, theme: "soustractions", difficulty: 1 },
  { exercise: "490 - 80", answer: 410, theme: "soustractions", difficulty: 1 },

  // Subtracting 2-digit numbers without carry
  { exercise: "37 - 24", answer: 13, theme: "soustractions", difficulty: 1 },
  { exercise: "64 - 33", answer: 31, theme: "soustractions", difficulty: 1 },
  { exercise: "85 - 32", answer: 53, theme: "soustractions", difficulty: 1 },
  { exercise: "93 - 23", answer: 70, theme: "soustractions", difficulty: 1 },
  { exercise: "46 - 15", answer: 31, theme: "soustractions", difficulty: 1 },
  { exercise: "78 - 24", answer: 54, theme: "soustractions", difficulty: 1 },
  { exercise: "89 - 32", answer: 57, theme: "soustractions", difficulty: 1 },
  { exercise: "97 - 36", answer: 61, theme: "soustractions", difficulty: 1 },
  { exercise: "65 - 21", answer: 44, theme: "soustractions", difficulty: 1 },
  { exercise: "53 - 12", answer: 41, theme: "soustractions", difficulty: 1 },
  { exercise: "76 - 35", answer: 41, theme: "soustractions", difficulty: 1 },
  { exercise: "95 - 22", answer: 73, theme: "soustractions", difficulty: 1 },
  { exercise: "47 - 36", answer: 11, theme: "soustractions", difficulty: 1 },
  { exercise: "83 - 11", answer: 72, theme: "soustractions", difficulty: 1 },
  { exercise: "66 - 25", answer: 41, theme: "soustractions", difficulty: 1 },
  { exercise: "58 - 27", answer: 31, theme: "soustractions", difficulty: 1 },
  { exercise: "32 - 12", answer: 20, theme: "soustractions", difficulty: 1 },
  { exercise: "79 - 31", answer: 48, theme: "soustractions", difficulty: 1 },
  { exercise: "97 - 24", answer: 73, theme: "soustractions", difficulty: 1 },
  { exercise: "48 - 25", answer: 23, theme: "soustractions", difficulty: 1 },

  // Subtracting 2-digit numbers with carry
  { exercise: "63 - 14", answer: 49, theme: "soustractions", difficulty: 2 },
  { exercise: "74 - 26", answer: 48, theme: "soustractions", difficulty: 2 },
  { exercise: "42 - 33", answer: 9, theme: "soustractions", difficulty: 2 },
  { exercise: "35 - 26", answer: 9, theme: "soustractions", difficulty: 2 },
  { exercise: "83 - 24", answer: 59, theme: "soustractions", difficulty: 2 },
  { exercise: "66 - 28", answer: 38, theme: "soustractions", difficulty: 2 },
  { exercise: "51 - 13", answer: 38, theme: "soustractions", difficulty: 2 },
  { exercise: "44 - 16", answer: 28, theme: "soustractions", difficulty: 2 },
  { exercise: "45 - 17", answer: 28, theme: "soustractions", difficulty: 2 },
  { exercise: "82 - 23", answer: 59, theme: "soustractions", difficulty: 2 },
  { exercise: "72 - 14", answer: 58, theme: "soustractions", difficulty: 2 },
  { exercise: "64 - 36", answer: 28, theme: "soustractions", difficulty: 2 },
  { exercise: "36 - 28", answer: 8, theme: "soustractions", difficulty: 2 },
  { exercise: "53 - 15", answer: 38, theme: "soustractions", difficulty: 2 },
  { exercise: "85 - 37", answer: 48, theme: "soustractions", difficulty: 2 },
  { exercise: "98 - 39", answer: 59, theme: "soustractions", difficulty: 2 },
  { exercise: "86 - 27", answer: 59, theme: "soustractions", difficulty: 2 },
  { exercise: "93 - 15", answer: 78, theme: "soustractions", difficulty: 2 },
  { exercise: "37 - 28", answer: 9, theme: "soustractions", difficulty: 2 },
  { exercise: "62 - 33", answer: 29, theme: "soustractions", difficulty: 2 },

  // Subtracting large numbers
  { exercise: "1200 - 500", answer: 700, theme: "soustractions", difficulty: 2 },
  { exercise: "12900 - 600", answer: 12300, theme: "soustractions", difficulty: 3 },
  { exercise: "7400 - 3200", answer: 4200, theme: "soustractions", difficulty: 3 },
  { exercise: "3500 - 1000", answer: 2500, theme: "soustractions", difficulty: 2 },
  { exercise: "18300 - 9100", answer: 9200, theme: "soustractions", difficulty: 3 },
  { exercise: "27100 - 9000", answer: 18100, theme: "soustractions", difficulty: 3 },
  { exercise: "82700 - 3700", answer: 79000, theme: "soustractions", difficulty: 3 },
  { exercise: "25000 - 15500", answer: 9500, theme: "soustractions", difficulty: 3 },
  { exercise: "100000 - 55400", answer: 44600, theme: "soustractions", difficulty: 3 },
  { exercise: "64800 - 10800", answer: 54000, theme: "soustractions", difficulty: 3 },
];

// MULTIPLICATION EXERCISES
export const multiplicationExercises: PDFExercise[] = [
  // Multiply by 2
  { exercise: "31 × 2", answer: 62, theme: "multiplications", difficulty: 1 },
  { exercise: "34 × 2", answer: 68, theme: "multiplications", difficulty: 1 },
  { exercise: "46 × 2", answer: 92, theme: "multiplications", difficulty: 1 },
  { exercise: "14 × 2", answer: 28, theme: "multiplications", difficulty: 1 },
  { exercise: "41 × 2", answer: 82, theme: "multiplications", difficulty: 1 },
  { exercise: "36 × 2", answer: 72, theme: "multiplications", difficulty: 1 },
  { exercise: "24 × 2", answer: 48, theme: "multiplications", difficulty: 1 },
  { exercise: "42 × 2", answer: 84, theme: "multiplications", difficulty: 1 },
  { exercise: "23 × 2", answer: 46, theme: "multiplications", difficulty: 1 },
  { exercise: "26 × 2", answer: 52, theme: "multiplications", difficulty: 1 },
  { exercise: "38 × 2", answer: 76, theme: "multiplications", difficulty: 1 },
  { exercise: "48 × 2", answer: 96, theme: "multiplications", difficulty: 1 },
  { exercise: "61 × 2", answer: 122, theme: "multiplications", difficulty: 1 },
  { exercise: "53 × 2", answer: 106, theme: "multiplications", difficulty: 1 },
  { exercise: "71 × 2", answer: 142, theme: "multiplications", difficulty: 1 },
  { exercise: "92 × 2", answer: 184, theme: "multiplications", difficulty: 1 },
  { exercise: "75 × 2", answer: 150, theme: "multiplications", difficulty: 1 },
  { exercise: "77 × 2", answer: 154, theme: "multiplications", difficulty: 1 },
  { exercise: "60 × 2", answer: 120, theme: "multiplications", difficulty: 1 },
  { exercise: "88 × 2", answer: 176, theme: "multiplications", difficulty: 1 },
  { exercise: "80 × 2", answer: 160, theme: "multiplications", difficulty: 1 },
  { exercise: "79 × 2", answer: 158, theme: "multiplications", difficulty: 1 },
  { exercise: "95 × 2", answer: 190, theme: "multiplications", difficulty: 1 },
  { exercise: "93 × 2", answer: 186, theme: "multiplications", difficulty: 1 },
  { exercise: "76 × 2", answer: 152, theme: "multiplications", difficulty: 1 },
  { exercise: "83 × 2", answer: 166, theme: "multiplications", difficulty: 1 },
  { exercise: "78 × 2", answer: 156, theme: "multiplications", difficulty: 1 },
  { exercise: "67 × 2", answer: 134, theme: "multiplications", difficulty: 1 },

  // Multiply by 9
  { exercise: "35 × 9", answer: 315, theme: "multiplications", difficulty: 2 },
  { exercise: "21 × 9", answer: 189, theme: "multiplications", difficulty: 2 },
  { exercise: "27 × 9", answer: 243, theme: "multiplications", difficulty: 2 },
  { exercise: "36 × 9", answer: 324, theme: "multiplications", difficulty: 2 },
  { exercise: "54 × 9", answer: 486, theme: "multiplications", difficulty: 2 },
  { exercise: "40 × 9", answer: 360, theme: "multiplications", difficulty: 2 },
  { exercise: "32 × 9", answer: 288, theme: "multiplications", difficulty: 2 },
  { exercise: "78 × 9", answer: 702, theme: "multiplications", difficulty: 2 },
  { exercise: "69 × 9", answer: 621, theme: "multiplications", difficulty: 2 },
  { exercise: "97 × 9", answer: 873, theme: "multiplications", difficulty: 2 },
  { exercise: "23 × 9", answer: 207, theme: "multiplications", difficulty: 2 },
  { exercise: "26 × 9", answer: 234, theme: "multiplications", difficulty: 2 },
  { exercise: "51 × 9", answer: 459, theme: "multiplications", difficulty: 2 },
  { exercise: "43 × 9", answer: 387, theme: "multiplications", difficulty: 2 },
  { exercise: "76 × 9", answer: 684, theme: "multiplications", difficulty: 2 },
  { exercise: "14 × 9", answer: 126, theme: "multiplications", difficulty: 2 },
  { exercise: "38 × 9", answer: 342, theme: "multiplications", difficulty: 2 },
  { exercise: "85 × 9", answer: 765, theme: "multiplications", difficulty: 2 },
  { exercise: "75 × 9", answer: 675, theme: "multiplications", difficulty: 2 },

  // Multiply by 11
  { exercise: "16 × 11", answer: 176, theme: "multiplications", difficulty: 2 },
  { exercise: "25 × 11", answer: 275, theme: "multiplications", difficulty: 2 },
  { exercise: "52 × 11", answer: 572, theme: "multiplications", difficulty: 2 },
  { exercise: "35 × 11", answer: 385, theme: "multiplications", difficulty: 2 },
  { exercise: "79 × 11", answer: 869, theme: "multiplications", difficulty: 2 },
  { exercise: "20 × 11", answer: 220, theme: "multiplications", difficulty: 2 },
  { exercise: "69 × 11", answer: 759, theme: "multiplications", difficulty: 2 },
  { exercise: "78 × 11", answer: 858, theme: "multiplications", difficulty: 2 },
  { exercise: "83 × 11", answer: 913, theme: "multiplications", difficulty: 2 },
  { exercise: "94 × 11", answer: 1034, theme: "multiplications", difficulty: 2 },
  { exercise: "44 × 11", answer: 484, theme: "multiplications", difficulty: 2 },
  { exercise: "33 × 11", answer: 363, theme: "multiplications", difficulty: 2 },
  { exercise: "77 × 11", answer: 847, theme: "multiplications", difficulty: 2 },
  { exercise: "18 × 11", answer: 198, theme: "multiplications", difficulty: 2 },
  { exercise: "66 × 11", answer: 726, theme: "multiplications", difficulty: 2 },
  { exercise: "51 × 11", answer: 561, theme: "multiplications", difficulty: 2 },
  { exercise: "75 × 11", answer: 825, theme: "multiplications", difficulty: 2 },
  { exercise: "99 × 11", answer: 1089, theme: "multiplications", difficulty: 2 },

  // Multiply by 12, 15
  { exercise: "10 × 12", answer: 120, theme: "multiplications", difficulty: 2 },
  { exercise: "14 × 15", answer: 210, theme: "multiplications", difficulty: 2 },
  { exercise: "16 × 12", answer: 192, theme: "multiplications", difficulty: 2 },
  { exercise: "15 × 12", answer: 180, theme: "multiplications", difficulty: 2 },
  { exercise: "22 × 15", answer: 330, theme: "multiplications", difficulty: 2 },
  { exercise: "10 × 15", answer: 150, theme: "multiplications", difficulty: 2 },
  { exercise: "11 × 15", answer: 165, theme: "multiplications", difficulty: 2 },
  { exercise: "24 × 12", answer: 288, theme: "multiplications", difficulty: 2 },
  { exercise: "35 × 12", answer: 420, theme: "multiplications", difficulty: 2 },
  { exercise: "16 × 15", answer: 240, theme: "multiplications", difficulty: 2 },
  { exercise: "18 × 12", answer: 216, theme: "multiplications", difficulty: 2 },
  { exercise: "25 × 12", answer: 300, theme: "multiplications", difficulty: 2 },
  { exercise: "32 × 15", answer: 480, theme: "multiplications", difficulty: 2 },
  { exercise: "26 × 15", answer: 390, theme: "multiplications", difficulty: 2 },
  { exercise: "17 × 15", answer: 255, theme: "multiplications", difficulty: 2 },
  { exercise: "26 × 12", answer: 312, theme: "multiplications", difficulty: 2 },
  { exercise: "21 × 15", answer: 315, theme: "multiplications", difficulty: 2 },
  { exercise: "30 × 12", answer: 360, theme: "multiplications", difficulty: 2 },
  { exercise: "32 × 12", answer: 384, theme: "multiplications", difficulty: 2 },
  { exercise: "28 × 15", answer: 420, theme: "multiplications", difficulty: 2 },

  // Multiply by 10, 100, 1000
  { exercise: "84 × 10", answer: 840, theme: "multiplications", difficulty: 1 },
  { exercise: "30 × 100", answer: 3000, theme: "multiplications", difficulty: 1 },
  { exercise: "73 × 1000", answer: 73000, theme: "multiplications", difficulty: 1 },
  { exercise: "17 × 10", answer: 170, theme: "multiplications", difficulty: 1 },
  { exercise: "76 × 100", answer: 7600, theme: "multiplications", difficulty: 1 },
  { exercise: "72 × 100", answer: 7200, theme: "multiplications", difficulty: 1 },
  { exercise: "87 × 10", answer: 870, theme: "multiplications", difficulty: 1 },
  { exercise: "140 × 100", answer: 14000, theme: "multiplications", difficulty: 2 },
  { exercise: "80 × 1000", answer: 80000, theme: "multiplications", difficulty: 2 },
  { exercise: "68 × 1000", answer: 68000, theme: "multiplications", difficulty: 2 },

  // Multiply by 30, 40, 300, 400...
  { exercise: "3 × 30", answer: 90, theme: "multiplications", difficulty: 1 },
  { exercise: "7 × 60", answer: 420, theme: "multiplications", difficulty: 1 },
  { exercise: "8 × 40", answer: 320, theme: "multiplications", difficulty: 1 },
  { exercise: "6 × 30", answer: 180, theme: "multiplications", difficulty: 1 },
  { exercise: "4 × 80", answer: 320, theme: "multiplications", difficulty: 1 },
  { exercise: "5 × 500", answer: 2500, theme: "multiplications", difficulty: 2 },
  { exercise: "9 × 90", answer: 810, theme: "multiplications", difficulty: 2 },
  { exercise: "7 × 700", answer: 4900, theme: "multiplications", difficulty: 2 },
  { exercise: "8 × 30", answer: 240, theme: "multiplications", difficulty: 1 },
  { exercise: "6 × 600", answer: 3600, theme: "multiplications", difficulty: 2 },
  { exercise: "2 × 40", answer: 80, theme: "multiplications", difficulty: 1 },
  { exercise: "7 × 600", answer: 4200, theme: "multiplications", difficulty: 2 },
  { exercise: "9 × 80", answer: 720, theme: "multiplications", difficulty: 2 },
  { exercise: "8 × 700", answer: 5600, theme: "multiplications", difficulty: 2 },
  { exercise: "6 × 500", answer: 3000, theme: "multiplications", difficulty: 2 },
  { exercise: "5 × 700", answer: 3500, theme: "multiplications", difficulty: 2 },
  { exercise: "7 × 300", answer: 2100, theme: "multiplications", difficulty: 2 },
  { exercise: "9 × 800", answer: 7200, theme: "multiplications", difficulty: 2 },
  { exercise: "8 × 600", answer: 4800, theme: "multiplications", difficulty: 2 },
  { exercise: "3 × 400", answer: 1200, theme: "multiplications", difficulty: 2 },

  // Multiply by 99, 101
  { exercise: "2 × 99", answer: 198, theme: "multiplications", difficulty: 3 },
  { exercise: "7 × 99", answer: 693, theme: "multiplications", difficulty: 3 },
  { exercise: "9 × 99", answer: 891, theme: "multiplications", difficulty: 3 },
  { exercise: "6 × 99", answer: 594, theme: "multiplications", difficulty: 3 },
  { exercise: "5 × 99", answer: 495, theme: "multiplications", difficulty: 3 },
  { exercise: "3 × 99", answer: 297, theme: "multiplications", difficulty: 3 },
  { exercise: "4 × 99", answer: 396, theme: "multiplications", difficulty: 3 },
  { exercise: "1 × 99", answer: 99, theme: "multiplications", difficulty: 3 },
  { exercise: "8 × 99", answer: 792, theme: "multiplications", difficulty: 3 },
  { exercise: "12 × 99", answer: 1188, theme: "multiplications", difficulty: 3 },
  { exercise: "2 × 101", answer: 202, theme: "multiplications", difficulty: 3 },
  { exercise: "8 × 101", answer: 808, theme: "multiplications", difficulty: 3 },
  { exercise: "6 × 101", answer: 606, theme: "multiplications", difficulty: 3 },
  { exercise: "4 × 101", answer: 404, theme: "multiplications", difficulty: 3 },
  { exercise: "3 × 101", answer: 303, theme: "multiplications", difficulty: 3 },
  { exercise: "1 × 101", answer: 101, theme: "multiplications", difficulty: 3 },
  { exercise: "9 × 101", answer: 909, theme: "multiplications", difficulty: 3 },
  { exercise: "7 × 101", answer: 707, theme: "multiplications", difficulty: 3 },
  { exercise: "5 × 101", answer: 505, theme: "multiplications", difficulty: 3 },
  { exercise: "12 × 101", answer: 1212, theme: "multiplications", difficulty: 3 },

  // Multiply by 2, 3, 4...8 (2-digit numbers)
  { exercise: "12 × 3", answer: 36, theme: "multiplications", difficulty: 1 },
  { exercise: "14 × 3", answer: 42, theme: "multiplications", difficulty: 1 },
  { exercise: "15 × 5", answer: 75, theme: "multiplications", difficulty: 1 },
  { exercise: "16 × 6", answer: 96, theme: "multiplications", difficulty: 1 },
  { exercise: "21 × 7", answer: 147, theme: "multiplications", difficulty: 2 },
  { exercise: "23 × 5", answer: 115, theme: "multiplications", difficulty: 2 },
  { exercise: "17 × 6", answer: 102, theme: "multiplications", difficulty: 2 },
  { exercise: "24 × 4", answer: 96, theme: "multiplications", difficulty: 1 },
  { exercise: "35 × 7", answer: 245, theme: "multiplications", difficulty: 2 },
  { exercise: "13 × 8", answer: 104, theme: "multiplications", difficulty: 2 },
  { exercise: "41 × 8", answer: 328, theme: "multiplications", difficulty: 2 },
  { exercise: "53 × 4", answer: 212, theme: "multiplications", difficulty: 2 },
  { exercise: "24 × 7", answer: 168, theme: "multiplications", difficulty: 2 },
  { exercise: "66 × 6", answer: 396, theme: "multiplications", difficulty: 2 },
  { exercise: "72 × 7", answer: 504, theme: "multiplications", difficulty: 2 },
  { exercise: "17 × 2", answer: 34, theme: "multiplications", difficulty: 1 },
  { exercise: "31 × 8", answer: 248, theme: "multiplications", difficulty: 2 },
  { exercise: "25 × 5", answer: 125, theme: "multiplications", difficulty: 1 },
  { exercise: "43 × 7", answer: 301, theme: "multiplications", difficulty: 2 },
  { exercise: "61 × 3", answer: 183, theme: "multiplications", difficulty: 2 },
  { exercise: "24 × 4", answer: 96, theme: "multiplications", difficulty: 1 },
  { exercise: "33 × 4", answer: 132, theme: "multiplications", difficulty: 2 },
  { exercise: "12 × 3", answer: 36, theme: "multiplications", difficulty: 1 },
  { exercise: "41 × 2", answer: 82, theme: "multiplications", difficulty: 1 },
  { exercise: "54 × 3", answer: 162, theme: "multiplications", difficulty: 2 },
  { exercise: "35 × 4", answer: 140, theme: "multiplications", difficulty: 2 },
  { exercise: "43 × 3", answer: 129, theme: "multiplications", difficulty: 2 },
  { exercise: "52 × 2", answer: 104, theme: "multiplications", difficulty: 1 },
  { exercise: "24 × 5", answer: 120, theme: "multiplications", difficulty: 2 },
  { exercise: "17 × 4", answer: 68, theme: "multiplications", difficulty: 2 },
  { exercise: "34 × 4", answer: 136, theme: "multiplications", difficulty: 2 },
  { exercise: "61 × 7", answer: 427, theme: "multiplications", difficulty: 2 },
  { exercise: "43 × 6", answer: 258, theme: "multiplications", difficulty: 2 },
  { exercise: "54 × 2", answer: 108, theme: "multiplications", difficulty: 1 },
  { exercise: "22 × 4", answer: 88, theme: "multiplications", difficulty: 1 },
  { exercise: "18 × 2", answer: 36, theme: "multiplications", difficulty: 1 },
  { exercise: "21 × 8", answer: 168, theme: "multiplications", difficulty: 2 },
  { exercise: "37 × 3", answer: 111, theme: "multiplications", difficulty: 2 },
  { exercise: "43 × 4", answer: 172, theme: "multiplications", difficulty: 2 },
  { exercise: "52 × 5", answer: 260, theme: "multiplications", difficulty: 2 },
];

// DIVISION EXERCISES
export const divisionExercises: PDFExercise[] = [
  // Divide by 2
  { exercise: "34 ÷ 2", answer: 17, theme: "divisions", difficulty: 1 },
  { exercise: "30 ÷ 2", answer: 15, theme: "divisions", difficulty: 1 },
  { exercise: "50 ÷ 2", answer: 25, theme: "divisions", difficulty: 1 },
  { exercise: "38 ÷ 2", answer: 19, theme: "divisions", difficulty: 1 },
  { exercise: "44 ÷ 2", answer: 22, theme: "divisions", difficulty: 1 },
  { exercise: "54 ÷ 2", answer: 27, theme: "divisions", difficulty: 1 },
  { exercise: "32 ÷ 2", answer: 16, theme: "divisions", difficulty: 1 },
  { exercise: "346 ÷ 2", answer: 173, theme: "divisions", difficulty: 2 },
  { exercise: "993 ÷ 2", answer: 496.5, theme: "divisions", difficulty: 2 },
  { exercise: "165 ÷ 2", answer: 82.5, theme: "divisions", difficulty: 2 },
  { exercise: "575 ÷ 2", answer: 287.5, theme: "divisions", difficulty: 2 },
  { exercise: "683 ÷ 2", answer: 341.5, theme: "divisions", difficulty: 2 },
  { exercise: "957 ÷ 2", answer: 478.5, theme: "divisions", difficulty: 2 },
  { exercise: "711 ÷ 2", answer: 355.5, theme: "divisions", difficulty: 2 },
  { exercise: "629 ÷ 2", answer: 314.5, theme: "divisions", difficulty: 2 },
  { exercise: "527 ÷ 2", answer: 263.5, theme: "divisions", difficulty: 2 },
  { exercise: "446 ÷ 2", answer: 223, theme: "divisions", difficulty: 2 },
  { exercise: "798 ÷ 2", answer: 399, theme: "divisions", difficulty: 2 },
  { exercise: "864 ÷ 2", answer: 432, theme: "divisions", difficulty: 2 },

  // Simple divisions 1-digit divisor
  { exercise: "54 ÷ 6", answer: 9, theme: "divisions", difficulty: 1 },
  { exercise: "35 ÷ 7", answer: 5, theme: "divisions", difficulty: 1 },
  { exercise: "27 ÷ 3", answer: 9, theme: "divisions", difficulty: 1 },
  { exercise: "63 ÷ 9", answer: 7, theme: "divisions", difficulty: 1 },
  { exercise: "32 ÷ 8", answer: 4, theme: "divisions", difficulty: 1 },
  { exercise: "30 ÷ 5", answer: 6, theme: "divisions", difficulty: 1 },
  { exercise: "20 ÷ 4", answer: 5, theme: "divisions", difficulty: 1 },
  { exercise: "49 ÷ 7", answer: 7, theme: "divisions", difficulty: 1 },
  { exercise: "72 ÷ 9", answer: 8, theme: "divisions", difficulty: 1 },
  { exercise: "21 ÷ 3", answer: 7, theme: "divisions", difficulty: 1 },
  { exercise: "42 ÷ 7", answer: 6, theme: "divisions", difficulty: 1 },
  { exercise: "28 ÷ 4", answer: 7, theme: "divisions", difficulty: 1 },
  { exercise: "24 ÷ 3", answer: 8, theme: "divisions", difficulty: 1 },
  { exercise: "36 ÷ 9", answer: 4, theme: "divisions", difficulty: 1 },
  { exercise: "56 ÷ 8", answer: 7, theme: "divisions", difficulty: 1 },
  { exercise: "28 ÷ 7", answer: 4, theme: "divisions", difficulty: 1 },
  { exercise: "48 ÷ 8", answer: 6, theme: "divisions", difficulty: 1 },
  { exercise: "42 ÷ 6", answer: 7, theme: "divisions", difficulty: 1 },
  { exercise: "40 ÷ 5", answer: 8, theme: "divisions", difficulty: 1 },
  { exercise: "45 ÷ 9", answer: 5, theme: "divisions", difficulty: 1 },

  // Divide by 0.5 (= multiply by 2)
  { exercise: "2 ÷ 0,5", answer: 4, theme: "divisions", difficulty: 2 },
  { exercise: "6 ÷ 0,5", answer: 12, theme: "divisions", difficulty: 2 },
  { exercise: "10 ÷ 0,5", answer: 20, theme: "divisions", difficulty: 2 },
  { exercise: "12 ÷ 0,5", answer: 24, theme: "divisions", difficulty: 2 },
  { exercise: "14 ÷ 0,5", answer: 28, theme: "divisions", difficulty: 2 },
  { exercise: "7 ÷ 0,5", answer: 14, theme: "divisions", difficulty: 2 },
  { exercise: "16 ÷ 0,5", answer: 32, theme: "divisions", difficulty: 2 },
  { exercise: "21 ÷ 0,5", answer: 42, theme: "divisions", difficulty: 2 },
  { exercise: "32 ÷ 0,5", answer: 64, theme: "divisions", difficulty: 2 },
  { exercise: "28 ÷ 0,5", answer: 56, theme: "divisions", difficulty: 2 },

  // Divide by 0.25 (= multiply by 4)
  { exercise: "3 ÷ 0,25", answer: 12, theme: "divisions", difficulty: 2 },
  { exercise: "5 ÷ 0,25", answer: 20, theme: "divisions", difficulty: 2 },
  { exercise: "9 ÷ 0,25", answer: 36, theme: "divisions", difficulty: 2 },
  { exercise: "11 ÷ 0,25", answer: 44, theme: "divisions", difficulty: 2 },
  { exercise: "23 ÷ 0,25", answer: 92, theme: "divisions", difficulty: 2 },
  { exercise: "33 ÷ 0,25", answer: 132, theme: "divisions", difficulty: 2 },
  { exercise: "24 ÷ 0,25", answer: 96, theme: "divisions", difficulty: 2 },
  { exercise: "52 ÷ 0,25", answer: 208, theme: "divisions", difficulty: 2 },
  { exercise: "13 ÷ 0,25", answer: 52, theme: "divisions", difficulty: 2 },
  { exercise: "26 ÷ 0,25", answer: 104, theme: "divisions", difficulty: 2 },
];

// DECIMAL EXERCISES
export const decimalExercises: PDFExercise[] = [
  // Adding decimals
  { exercise: "8,4 + 2,5", answer: 10.9, theme: "décimaux", difficulty: 1 },
  { exercise: "9,3 + 3,2", answer: 12.5, theme: "décimaux", difficulty: 1 },
  { exercise: "5,2 + 0,25", answer: 5.45, theme: "décimaux", difficulty: 2 },
  { exercise: "16,7 + 3,2", answer: 19.9, theme: "décimaux", difficulty: 1 },
  { exercise: "34,3 + 6,5", answer: 40.8, theme: "décimaux", difficulty: 1 },
  { exercise: "51,3 + 8,31", answer: 59.61, theme: "décimaux", difficulty: 2 },
  { exercise: "8,25 + 2,4", answer: 10.65, theme: "décimaux", difficulty: 2 },
  { exercise: "3,63 + 1,04", answer: 4.67, theme: "décimaux", difficulty: 2 },
  { exercise: "45,6 + 7,2", answer: 52.8, theme: "décimaux", difficulty: 1 },
  { exercise: "81,35 + 7,2", answer: 88.55, theme: "décimaux", difficulty: 2 },
  { exercise: "62,1 + 8,6", answer: 70.7, theme: "décimaux", difficulty: 1 },
  { exercise: "9,6 + 12,3", answer: 21.9, theme: "décimaux", difficulty: 1 },
  { exercise: "13,4 + 5,2", answer: 18.6, theme: "décimaux", difficulty: 1 },
  { exercise: "42,5 + 9,5", answer: 52, theme: "décimaux", difficulty: 1 },
  { exercise: "10,54 + 12,1", answer: 22.64, theme: "décimaux", difficulty: 2 },
  { exercise: "32,6 + 8,4", answer: 41, theme: "décimaux", difficulty: 1 },
  { exercise: "14,8 + 31,1", answer: 45.9, theme: "décimaux", difficulty: 1 },
  { exercise: "3,89 + 0,01", answer: 3.90, theme: "décimaux", difficulty: 2 },
  { exercise: "52,5 + 1,5", answer: 54, theme: "décimaux", difficulty: 1 },
  { exercise: "74,7 + 21,2", answer: 95.9, theme: "décimaux", difficulty: 2 },

  // Subtracting integer from decimal
  { exercise: "26,4 - 20", answer: 6.4, theme: "décimaux", difficulty: 1 },
  { exercise: "34,6 - 33", answer: 1.6, theme: "décimaux", difficulty: 1 },
  { exercise: "53,8 - 15", answer: 38.8, theme: "décimaux", difficulty: 1 },
  { exercise: "42,9 - 25", answer: 17.9, theme: "décimaux", difficulty: 1 },
  { exercise: "76,4 - 65", answer: 11.4, theme: "décimaux", difficulty: 1 },
  { exercise: "38,3 - 21", answer: 17.3, theme: "décimaux", difficulty: 1 },
  { exercise: "54,6 - 34", answer: 20.6, theme: "décimaux", difficulty: 1 },
  { exercise: "99,7 - 54", answer: 45.7, theme: "décimaux", difficulty: 1 },
  { exercise: "86,2 - 33", answer: 53.2, theme: "décimaux", difficulty: 1 },
  { exercise: "35,6 - 19", answer: 16.6, theme: "décimaux", difficulty: 1 },
  { exercise: "37,3 - 15", answer: 22.3, theme: "décimaux", difficulty: 1 },
  { exercise: "44,4 - 41", answer: 3.4, theme: "décimaux", difficulty: 1 },
  { exercise: "51,7 - 30", answer: 21.7, theme: "décimaux", difficulty: 1 },
  { exercise: "66,6 - 42", answer: 24.6, theme: "décimaux", difficulty: 1 },
  { exercise: "48,5 - 34", answer: 14.5, theme: "décimaux", difficulty: 1 },
  { exercise: "145,2 - 99", answer: 46.2, theme: "décimaux", difficulty: 2 },
  { exercise: "178,1 - 89", answer: 89.1, theme: "décimaux", difficulty: 2 },
  { exercise: "164,4 - 120", answer: 44.4, theme: "décimaux", difficulty: 2 },
  { exercise: "189,9 - 151", answer: 38.9, theme: "décimaux", difficulty: 2 },
  { exercise: "196,8 - 110", answer: 86.8, theme: "décimaux", difficulty: 2 },

  // Subtracting decimal from integer
  { exercise: "29 - 4,5", answer: 24.5, theme: "décimaux", difficulty: 1 },
  { exercise: "41 - 1,2", answer: 39.8, theme: "décimaux", difficulty: 1 },
  { exercise: "38 - 6,3", answer: 31.7, theme: "décimaux", difficulty: 1 },
  { exercise: "65 - 4,8", answer: 60.2, theme: "décimaux", difficulty: 1 },
  { exercise: "37 - 7,9", answer: 29.1, theme: "décimaux", difficulty: 1 },
  { exercise: "22 - 1,5", answer: 20.5, theme: "décimaux", difficulty: 1 },
  { exercise: "54 - 3,4", answer: 50.6, theme: "décimaux", difficulty: 1 },
  { exercise: "46 - 6,9", answer: 39.1, theme: "décimaux", difficulty: 1 },
  { exercise: "63 - 3,1", answer: 59.9, theme: "décimaux", difficulty: 1 },
  { exercise: "70 - 9,7", answer: 60.3, theme: "décimaux", difficulty: 1 },
  { exercise: "95 - 5,5", answer: 89.5, theme: "décimaux", difficulty: 1 },
  { exercise: "77 - 3,2", answer: 73.8, theme: "décimaux", difficulty: 1 },
  { exercise: "62 - 2,7", answer: 59.3, theme: "décimaux", difficulty: 1 },
  { exercise: "34 - 2,9", answer: 31.1, theme: "décimaux", difficulty: 1 },
  { exercise: "53 - 3,8", answer: 49.2, theme: "décimaux", difficulty: 1 },
  { exercise: "46 - 5,1", answer: 40.9, theme: "décimaux", difficulty: 1 },
  { exercise: "29 - 8,2", answer: 20.8, theme: "décimaux", difficulty: 1 },
  { exercise: "78 - 7,4", answer: 70.6, theme: "décimaux", difficulty: 1 },
  { exercise: "81 - 6,3", answer: 74.7, theme: "décimaux", difficulty: 1 },
  { exercise: "10 - 9,6", answer: 0.4, theme: "décimaux", difficulty: 2 },

  // Multiplying decimals by 0.5, 0.25
  { exercise: "8 × 0,5", answer: 4, theme: "décimaux", difficulty: 1 },
  { exercise: "10 × 0,5", answer: 5, theme: "décimaux", difficulty: 1 },
  { exercise: "6 × 0,5", answer: 3, theme: "décimaux", difficulty: 1 },
  { exercise: "18 × 0,5", answer: 9, theme: "décimaux", difficulty: 1 },
  { exercise: "36 × 0,5", answer: 18, theme: "décimaux", difficulty: 1 },
  { exercise: "68 × 0,25", answer: 17, theme: "décimaux", difficulty: 1 },
  { exercise: "52 × 0,25", answer: 13, theme: "décimaux", difficulty: 1 },
  { exercise: "88 × 0,25", answer: 22, theme: "décimaux", difficulty: 1 },
  { exercise: "24 × 0,25", answer: 6, theme: "décimaux", difficulty: 1 },
  { exercise: "16 × 0,25", answer: 4, theme: "décimaux", difficulty: 1 },
  { exercise: "17 × 0,5", answer: 8.5, theme: "décimaux", difficulty: 1 },
  { exercise: "13 × 0,5", answer: 6.5, theme: "décimaux", difficulty: 1 },
  { exercise: "22 × 0,25", answer: 5.5, theme: "décimaux", difficulty: 2 },
  { exercise: "240 × 0,5", answer: 120, theme: "décimaux", difficulty: 2 },
  { exercise: "1000 × 0,25", answer: 250, theme: "décimaux", difficulty: 2 },
  { exercise: "82 × 0,25", answer: 20.5, theme: "décimaux", difficulty: 2 },
  { exercise: "156 × 0,5", answer: 78, theme: "décimaux", difficulty: 2 },
  { exercise: "14 × 0,25", answer: 3.5, theme: "décimaux", difficulty: 2 },
  { exercise: "64 × 0,5", answer: 32, theme: "décimaux", difficulty: 1 },
  { exercise: "128 × 0,5", answer: 64, theme: "décimaux", difficulty: 2 },

  // Multiplying decimals by 10, 100, 1000
  { exercise: "9,6 × 10", answer: 96, theme: "décimaux", difficulty: 1 },
  { exercise: "5,9 × 100", answer: 590, theme: "décimaux", difficulty: 1 },
  { exercise: "4,24 × 10", answer: 42.4, theme: "décimaux", difficulty: 1 },
  { exercise: "3,1 × 100", answer: 310, theme: "décimaux", difficulty: 1 },
  { exercise: "8,5 × 100", answer: 850, theme: "décimaux", difficulty: 1 },
  { exercise: "91,2 × 10", answer: 912, theme: "décimaux", difficulty: 1 },
  { exercise: "3,7 × 100", answer: 370, theme: "décimaux", difficulty: 1 },
  { exercise: "6,34 × 1000", answer: 6340, theme: "décimaux", difficulty: 2 },
  { exercise: "8,61 × 10", answer: 86.1, theme: "décimaux", difficulty: 1 },
  { exercise: "2,5 × 10", answer: 25, theme: "décimaux", difficulty: 1 },
  { exercise: "4,02 × 1000", answer: 4020, theme: "décimaux", difficulty: 2 },
  { exercise: "90,1 × 10", answer: 901, theme: "décimaux", difficulty: 1 },
  { exercise: "0,24 × 10", answer: 2.4, theme: "décimaux", difficulty: 1 },
  { exercise: "3,16 × 100", answer: 316, theme: "décimaux", difficulty: 1 },
  { exercise: "23,4 × 1000", answer: 23400, theme: "décimaux", difficulty: 2 },
  { exercise: "67,2 × 100", answer: 6720, theme: "décimaux", difficulty: 2 },
  { exercise: "0,99 × 10", answer: 9.9, theme: "décimaux", difficulty: 1 },
  { exercise: "4,37 × 10", answer: 43.7, theme: "décimaux", difficulty: 1 },
  { exercise: "11,2 × 100", answer: 1120, theme: "décimaux", difficulty: 2 },
  { exercise: "0,886 × 1000", answer: 886, theme: "décimaux", difficulty: 2 },

  // Dividing decimals by 2, 3
  { exercise: "8,4 ÷ 2", answer: 4.2, theme: "décimaux", difficulty: 1 },
  { exercise: "16,8 ÷ 2", answer: 8.4, theme: "décimaux", difficulty: 1 },
  { exercise: "20,6 ÷ 2", answer: 10.3, theme: "décimaux", difficulty: 1 },
  { exercise: "32,2 ÷ 2", answer: 16.1, theme: "décimaux", difficulty: 1 },
  { exercise: "58,8 ÷ 2", answer: 29.4, theme: "décimaux", difficulty: 1 },
  { exercise: "36,6 ÷ 2", answer: 18.3, theme: "décimaux", difficulty: 1 },
  { exercise: "42,4 ÷ 2", answer: 21.2, theme: "décimaux", difficulty: 1 },
  { exercise: "30,2 ÷ 2", answer: 15.1, theme: "décimaux", difficulty: 1 },
  { exercise: "46,2 ÷ 2", answer: 23.1, theme: "décimaux", difficulty: 1 },
  { exercise: "15,3 ÷ 3", answer: 5.1, theme: "décimaux", difficulty: 1 },
  { exercise: "33,9 ÷ 3", answer: 11.3, theme: "décimaux", difficulty: 1 },
  { exercise: "60,6 ÷ 3", answer: 20.2, theme: "décimaux", difficulty: 1 },
  { exercise: "18,9 ÷ 3", answer: 6.3, theme: "décimaux", difficulty: 1 },
  { exercise: "48,6 ÷ 3", answer: 16.2, theme: "décimaux", difficulty: 1 },
  { exercise: "33,3 ÷ 3", answer: 11.1, theme: "décimaux", difficulty: 1 },
  { exercise: "81,3 ÷ 3", answer: 27.1, theme: "décimaux", difficulty: 1 },
  { exercise: "45,6 ÷ 3", answer: 15.2, theme: "décimaux", difficulty: 1 },
  { exercise: "51,9 ÷ 3", answer: 17.3, theme: "décimaux", difficulty: 1 },
  { exercise: "126,9 ÷ 3", answer: 42.3, theme: "décimaux", difficulty: 2 },
  
  // More decimal exercises for level 12+
  { exercise: "7,5 + 12,8", answer: 20.3, theme: "décimaux", difficulty: 2 },
  { exercise: "45,6 - 18,9", answer: 26.7, theme: "décimaux", difficulty: 2 },
  { exercise: "3,4 × 2", answer: 6.8, theme: "décimaux", difficulty: 1 },
  { exercise: "6,5 × 4", answer: 26, theme: "décimaux", difficulty: 2 },
  { exercise: "12,4 × 3", answer: 37.2, theme: "décimaux", difficulty: 2 },
  { exercise: "9,2 × 5", answer: 46, theme: "décimaux", difficulty: 2 },
  { exercise: "15,5 ÷ 5", answer: 3.1, theme: "décimaux", difficulty: 2 },
  { exercise: "24,8 ÷ 4", answer: 6.2, theme: "décimaux", difficulty: 2 },
  { exercise: "33,6 ÷ 6", answer: 5.6, theme: "décimaux", difficulty: 2 },
  { exercise: "0,8 × 7", answer: 5.6, theme: "décimaux", difficulty: 2 },
  { exercise: "0,25 × 12", answer: 3, theme: "décimaux", difficulty: 2 },
  { exercise: "0,5 × 15", answer: 7.5, theme: "décimaux", difficulty: 1 },
  { exercise: "2,5 × 8", answer: 20, theme: "décimaux", difficulty: 2 },
  { exercise: "1,25 × 8", answer: 10, theme: "décimaux", difficulty: 2 },
  { exercise: "0,75 × 4", answer: 3, theme: "décimaux", difficulty: 2 },
  { exercise: "4,8 ÷ 0,4", answer: 12, theme: "décimaux", difficulty: 3 },
  { exercise: "7,2 ÷ 0,6", answer: 12, theme: "décimaux", difficulty: 3 },
  { exercise: "10,5 ÷ 0,5", answer: 21, theme: "décimaux", difficulty: 2 },
  { exercise: "6,3 ÷ 0,9", answer: 7, theme: "décimaux", difficulty: 3 },
  { exercise: "100 - 45,7", answer: 54.3, theme: "décimaux", difficulty: 2 },
  { exercise: "50 - 12,35", answer: 37.65, theme: "décimaux", difficulty: 3 },
  { exercise: "1000 - 456,8", answer: 543.2, theme: "décimaux", difficulty: 3 },
];

// COMPLEX NUMBERS (time) EXERCISES
export const timeExercises: PDFExercise[] = [
  // Time calculations - represented as minutes
  { exercise: "1h + 2h 35min en minutes", answer: 215, theme: "nombres complexes", difficulty: 2 },
  { exercise: "2h 15min + 1h 15min en minutes", answer: 210, theme: "nombres complexes", difficulty: 2 },
  { exercise: "2h 20min + 4h 40min en minutes", answer: 420, theme: "nombres complexes", difficulty: 2 },
  { exercise: "6h + 3h 20min en minutes", answer: 560, theme: "nombres complexes", difficulty: 2 },
  { exercise: "5h 35min + 2h 25min en minutes", answer: 480, theme: "nombres complexes", difficulty: 2 },
  { exercise: "4h 45min + 20min en minutes", answer: 305, theme: "nombres complexes", difficulty: 2 },
  { exercise: "30min × 3 en minutes", answer: 90, theme: "nombres complexes", difficulty: 1 },
  { exercise: "15min × 4 en minutes", answer: 60, theme: "nombres complexes", difficulty: 1 },
  { exercise: "3h 30min × 2 en minutes", answer: 420, theme: "nombres complexes", difficulty: 2 },
  { exercise: "1h 20min × 3 en minutes", answer: 240, theme: "nombres complexes", difficulty: 2 },
  { exercise: "2h 30min × 4 en minutes", answer: 600, theme: "nombres complexes", difficulty: 2 },
  { exercise: "15min × 6 en minutes", answer: 90, theme: "nombres complexes", difficulty: 1 },
  { exercise: "6min × 10 en minutes", answer: 60, theme: "nombres complexes", difficulty: 1 },
  { exercise: "8min × 10 en minutes", answer: 80, theme: "nombres complexes", difficulty: 1 },

  // Conversions hours to minutes
  { exercise: "2h en minutes", answer: 120, theme: "nombres complexes", difficulty: 1 },
  { exercise: "5h en minutes", answer: 300, theme: "nombres complexes", difficulty: 1 },
  { exercise: "1h en secondes ÷ 60", answer: 60, theme: "nombres complexes", difficulty: 2 },
  { exercise: "48h en jours", answer: 2, theme: "nombres complexes", difficulty: 1 },
  { exercise: "5j en heures", answer: 120, theme: "nombres complexes", difficulty: 2 },
];

// PROBLÈMES - Word problems from teacher
export const problemExercises: PDFExercise[] = [
  { exercise: "Dans un triangle, deux angles mesurent 50° et 60°. Le troisième vaut ?", answer: 70, theme: "problèmes", difficulty: 2 },
  { exercise: "15% de 200 = ?", answer: 30, theme: "problèmes", difficulty: 2 },
  { exercise: "Dans un triangle rectangle, un angle aigu mesure 40°. Que vaut le troisième ?", answer: 50, theme: "problèmes", difficulty: 2 },
  { exercise: "Combien y a-t-il de chiffres en écrivant tous les nombres de 1 à 100 ?", answer: 192, theme: "problèmes", difficulty: 3 },
  { exercise: "1000 − 398 = ?", answer: 602, theme: "problèmes", difficulty: 1 },
  { exercise: "125 × 8 = ?", answer: 1000, theme: "problèmes", difficulty: 2 },
  { exercise: "Michel a : 12, 14, 11, 13, 10. Quelle est sa moyenne ?", answer: 12, theme: "problèmes", difficulty: 2 },
  { exercise: "Le périmètre d'un carré est 24 cm. Quelle est la longueur d'un côté ?", answer: 6, theme: "problèmes", difficulty: 1 },
  { exercise: "Combien y a-t-il de multiples de 5 entre 1 et 50 ?", answer: 10, theme: "problèmes", difficulty: 2 },
  { exercise: "Un rectangle mesure 10 m sur 4 m. Quelle longueur de clôture faut-il ?", answer: 28, theme: "problèmes", difficulty: 2 },
  { exercise: "Une moyenne de 5 nombres est 75. Quelle est leur somme ?", answer: 375, theme: "problèmes", difficulty: 2 },
  { exercise: "Combien y a-t-il de chiffres en tout dans les nombres de 1 à 1000 ?", answer: 2893, theme: "problèmes", difficulty: 3 },
  { exercise: "J'ai 30 récipients de 1/2 L. Quelle quantité totale en litres ?", answer: 15, theme: "problèmes", difficulty: 2 },
  { exercise: "Le périmètre d'un cercle est 2π cm. Quel est son rayon ?", answer: 1, theme: "problèmes", difficulty: 2 },
  { exercise: "Combien y a-t-il de nombres impairs entre 1 et 100 ?", answer: 50, theme: "problèmes", difficulty: 2 },
  { exercise: "Dans un triangle rectangle, un angle vaut 70°. Combien vaut l'autre angle aigu ?", answer: 20, theme: "problèmes", difficulty: 2 },
  { exercise: "1498 + 503 = ?", answer: 2001, theme: "problèmes", difficulty: 2 },
  { exercise: "Une moyenne de 4 nombres est 12. Quelle est leur somme ?", answer: 48, theme: "problèmes", difficulty: 2 },
  { exercise: "Combien y a-t-il de nombres pairs entre 1 et 100 ?", answer: 50, theme: "problèmes", difficulty: 2 },
  { exercise: "On entoure un rectangle de 12 m sur 8 m avec une corde. Combien de mètres faut-il ?", answer: 40, theme: "problèmes", difficulty: 2 },
  { exercise: "Maman achète 0,25 kg de crevettes à 8500 F le kilo. Combien paie-t-elle ?", answer: 2125, theme: "problèmes", difficulty: 2 },
  { exercise: "Cyril pèse 0,5 kg de mangues à 2000 F le kilo. Quel prix ?", answer: 1000, theme: "problèmes", difficulty: 2 },
  { exercise: "Le 1er a franchi 187 cm, soit 9 cm de mieux que le 2e. Performance du 2e ?", answer: 178, theme: "problèmes", difficulty: 2 },
  { exercise: "402 × 9 = ?", answer: 3618, theme: "problèmes", difficulty: 2 },
  { exercise: "721 × 11 = ?", answer: 7931, theme: "problèmes", difficulty: 2 },
  { exercise: "Il a plu 9 jours à 12 mm/jour. Quantité totale en mm ?", answer: 108, theme: "problèmes", difficulty: 2 },
  { exercise: "Chez ma tante 43 km, soit 9 fois moins que chez grand-mère. Distance grand-mère ?", answer: 387, theme: "problèmes", difficulty: 2 },
  { exercise: "Je divise un nombre par 3, je retranche 17, je trouve 21. Quel nombre ?", answer: 114, theme: "problèmes", difficulty: 2 },
  { exercise: "La somme de deux nombres est 77. Le plus petit est 35. Quel est le plus grand ?", answer: 42, theme: "problèmes", difficulty: 1 },
  { exercise: "La première photographie date de 1825. Combien d'années depuis (en 2026) ?", answer: 201, theme: "problèmes", difficulty: 2 },
  { exercise: "(4 ÷ 0,01) + 6 = ?", answer: 406, theme: "problèmes", difficulty: 3 },
  { exercise: "Parti à 13h10, arrivé à 19h40. Durée en minutes ?", answer: 390, theme: "problèmes", difficulty: 2 },
  { exercise: "Alfred (1,87 m) mesure 15 cm de plus que Steve. Taille de Steve en m ?", answer: 1.72, theme: "problèmes", difficulty: 2 },
  { exercise: "Une canne à pêche : 5 morceaux de 1,05 m. Longueur totale ?", answer: 5.25, theme: "problèmes", difficulty: 2 },
  { exercise: "Salle de 400 places, 3/8 occupés. Combien de billets vendus ?", answer: 150, theme: "problèmes", difficulty: 2 },
  { exercise: "Salle de 400 places, 4/5 occupés. Combien de places restent ?", answer: 80, theme: "problèmes", difficulty: 2 },
  { exercise: "Consommation passée de 69000 L à 72000 L. Augmentation en L ?", answer: 3000, theme: "problèmes", difficulty: 1 },
  { exercise: "Article à 4000 F, réduction 10%. Prix payé ?", answer: 3600, theme: "problèmes", difficulty: 2 },
  { exercise: "100000 F placés à 8%. Total à la fin de l'année ?", answer: 108000, theme: "problèmes", difficulty: 2 },
  { exercise: "Piste de 1,6 km rallongée de 700 m. Nouvelle longueur en km ?", answer: 2.3, theme: "problèmes", difficulty: 2 },
  { exercise: "714 kg = combien de quintaux ?", answer: 7.14, theme: "problèmes", difficulty: 2 },
  { exercise: "21,3 hL = combien de daL ?", answer: 213, theme: "problèmes", difficulty: 2 },
  { exercise: "12 dL = combien de L ?", answer: 1.2, theme: "problèmes", difficulty: 2 },
  { exercise: "14 L = combien de cL ?", answer: 1400, theme: "problèmes", difficulty: 2 },
  { exercise: "Un magnum contient 148 cL. Combien de litres ?", answer: 1.48, theme: "problèmes", difficulty: 2 },
];

// GRANDS NOMBRES - Large numbers exercises for level 15+
export const largeNumberExercises: PDFExercise[] = [
  // Writing numbers in digits (letters to digits)
  { exercise: "Écris en chiffres : Trois millions cinq cent mille", answer: 3500000, theme: "grands nombres", difficulty: 2 },
  { exercise: "Écris en chiffres : Deux millions huit cent quarante mille", answer: 2840000, theme: "grands nombres", difficulty: 2 },
  { exercise: "Écris en chiffres : Sept millions deux cents", answer: 7000200, theme: "grands nombres", difficulty: 2 },
  { exercise: "Écris en chiffres : Cinq millions soixante-quinze mille", answer: 5075000, theme: "grands nombres", difficulty: 2 },
  { exercise: "Écris en chiffres : Neuf millions neuf cent quatre-vingt-dix-neuf mille", answer: 9999000, theme: "grands nombres", difficulty: 3 },
  { exercise: "Écris en chiffres : Un million cinq cent mille", answer: 1500000, theme: "grands nombres", difficulty: 2 },
  { exercise: "Écris en chiffres : Quatre millions trois cent vingt mille", answer: 4320000, theme: "grands nombres", difficulty: 2 },
  { exercise: "Écris en chiffres : Six millions cinquante mille", answer: 6050000, theme: "grands nombres", difficulty: 2 },
  { exercise: "Écris en chiffres : Huit millions quatre cent mille", answer: 8400000, theme: "grands nombres", difficulty: 2 },
  { exercise: "Écris en chiffres : Dix millions", answer: 10000000, theme: "grands nombres", difficulty: 2 },
  
  // Simple additions with large numbers
  { exercise: "2 500 000 + 1 500 000 = ?", answer: 4000000, theme: "grands nombres", difficulty: 2 },
  { exercise: "3 200 000 + 800 000 = ?", answer: 4000000, theme: "grands nombres", difficulty: 2 },
  { exercise: "5 000 000 + 2 500 000 = ?", answer: 7500000, theme: "grands nombres", difficulty: 2 },
  { exercise: "1 750 000 + 250 000 = ?", answer: 2000000, theme: "grands nombres", difficulty: 2 },
  { exercise: "4 600 000 + 400 000 = ?", answer: 5000000, theme: "grands nombres", difficulty: 2 },
  { exercise: "6 300 000 + 700 000 = ?", answer: 7000000, theme: "grands nombres", difficulty: 2 },
  { exercise: "2 100 000 + 900 000 = ?", answer: 3000000, theme: "grands nombres", difficulty: 2 },
  { exercise: "8 500 000 + 1 500 000 = ?", answer: 10000000, theme: "grands nombres", difficulty: 2 },
  { exercise: "3 750 000 + 1 250 000 = ?", answer: 5000000, theme: "grands nombres", difficulty: 2 },
  { exercise: "7 200 000 + 2 800 000 = ?", answer: 10000000, theme: "grands nombres", difficulty: 2 },
  
  // Subtractions with large numbers
  { exercise: "5 000 000 - 2 000 000 = ?", answer: 3000000, theme: "grands nombres", difficulty: 2 },
  { exercise: "10 000 000 - 3 500 000 = ?", answer: 6500000, theme: "grands nombres", difficulty: 2 },
  { exercise: "8 000 000 - 2 500 000 = ?", answer: 5500000, theme: "grands nombres", difficulty: 2 },
  { exercise: "6 500 000 - 1 500 000 = ?", answer: 5000000, theme: "grands nombres", difficulty: 2 },
  { exercise: "9 000 000 - 4 000 000 = ?", answer: 5000000, theme: "grands nombres", difficulty: 2 },
  { exercise: "7 500 000 - 2 500 000 = ?", answer: 5000000, theme: "grands nombres", difficulty: 2 },
  { exercise: "4 000 000 - 1 200 000 = ?", answer: 2800000, theme: "grands nombres", difficulty: 2 },
  { exercise: "3 000 000 - 750 000 = ?", answer: 2250000, theme: "grands nombres", difficulty: 2 },
  
  // Multiplications with large numbers
  { exercise: "500 000 × 2 = ?", answer: 1000000, theme: "grands nombres", difficulty: 2 },
  { exercise: "250 000 × 4 = ?", answer: 1000000, theme: "grands nombres", difficulty: 2 },
  { exercise: "1 000 000 × 5 = ?", answer: 5000000, theme: "grands nombres", difficulty: 2 },
  { exercise: "2 000 000 × 3 = ?", answer: 6000000, theme: "grands nombres", difficulty: 2 },
  { exercise: "1 500 000 × 2 = ?", answer: 3000000, theme: "grands nombres", difficulty: 2 },
  { exercise: "400 000 × 5 = ?", answer: 2000000, theme: "grands nombres", difficulty: 2 },
  { exercise: "300 000 × 10 = ?", answer: 3000000, theme: "grands nombres", difficulty: 2 },
  { exercise: "750 000 × 4 = ?", answer: 3000000, theme: "grands nombres", difficulty: 2 },
  
  // Divisions with large numbers
  { exercise: "6 000 000 ÷ 2 = ?", answer: 3000000, theme: "grands nombres", difficulty: 2 },
  { exercise: "9 000 000 ÷ 3 = ?", answer: 3000000, theme: "grands nombres", difficulty: 2 },
  { exercise: "8 000 000 ÷ 4 = ?", answer: 2000000, theme: "grands nombres", difficulty: 2 },
  { exercise: "10 000 000 ÷ 5 = ?", answer: 2000000, theme: "grands nombres", difficulty: 2 },
  { exercise: "4 500 000 ÷ 9 = ?", answer: 500000, theme: "grands nombres", difficulty: 3 },
  { exercise: "7 200 000 ÷ 8 = ?", answer: 900000, theme: "grands nombres", difficulty: 3 },
  { exercise: "5 600 000 ÷ 7 = ?", answer: 800000, theme: "grands nombres", difficulty: 3 },
  { exercise: "3 600 000 ÷ 6 = ?", answer: 600000, theme: "grands nombres", difficulty: 2 },
];

// RAISONNEMENT IMPLICITE - Exercises requiring implicit reasoning (level 12+)
export const implicitReasoningExercises: PDFExercise[] = [
  // Geometry - Same perimeter/area problems
  { exercise: "Un carré de côté 6 cm a le même périmètre qu'un rectangle de largeur 4 cm. Longueur du rectangle ?", answer: 8, theme: "raisonnement", difficulty: 2 },
  { exercise: "Un carré de côté 8 cm a le même périmètre qu'un rectangle de largeur 6 cm. Longueur du rectangle ?", answer: 10, theme: "raisonnement", difficulty: 2 },
  { exercise: "Un carré de côté 10 cm a le même périmètre qu'un rectangle de largeur 5 cm. Longueur du rectangle ?", answer: 15, theme: "raisonnement", difficulty: 2 },
  { exercise: "Un carré de côté 12 cm a le même périmètre qu'un rectangle de largeur 8 cm. Longueur du rectangle ?", answer: 16, theme: "raisonnement", difficulty: 2 },
  { exercise: "Un rectangle de 15 cm × 5 cm a le même périmètre qu'un carré. Côté du carré ?", answer: 10, theme: "raisonnement", difficulty: 2 },
  { exercise: "Un rectangle de 18 cm × 6 cm a le même périmètre qu'un carré. Côté du carré ?", answer: 12, theme: "raisonnement", difficulty: 2 },
  
  // Area problems
  { exercise: "Un carré de côté 6 cm a la même aire qu'un rectangle de largeur 4 cm. Longueur du rectangle ?", answer: 9, theme: "raisonnement", difficulty: 2 },
  { exercise: "Un carré de côté 8 cm a la même aire qu'un rectangle de largeur 4 cm. Longueur du rectangle ?", answer: 16, theme: "raisonnement", difficulty: 2 },
  { exercise: "Un rectangle de 12 cm × 3 cm a la même aire qu'un carré. Côté du carré ?", answer: 6, theme: "raisonnement", difficulty: 2 },
  { exercise: "Un rectangle de 18 cm × 2 cm a la même aire qu'un carré. Côté du carré ?", answer: 6, theme: "raisonnement", difficulty: 2 },
  
  // Missing operand problems
  { exercise: "? + 37 = 85. Trouve le nombre manquant.", answer: 48, theme: "raisonnement", difficulty: 2 },
  { exercise: "? - 24 = 56. Trouve le nombre manquant.", answer: 80, theme: "raisonnement", difficulty: 2 },
  { exercise: "? × 7 = 63. Trouve le nombre manquant.", answer: 9, theme: "raisonnement", difficulty: 2 },
  { exercise: "? ÷ 8 = 12. Trouve le nombre manquant.", answer: 96, theme: "raisonnement", difficulty: 2 },
  { exercise: "45 + ? = 112. Trouve le nombre manquant.", answer: 67, theme: "raisonnement", difficulty: 2 },
  { exercise: "93 - ? = 47. Trouve le nombre manquant.", answer: 46, theme: "raisonnement", difficulty: 2 },
  { exercise: "? × 9 = 108. Trouve le nombre manquant.", answer: 12, theme: "raisonnement", difficulty: 2 },
  { exercise: "144 ÷ ? = 12. Trouve le nombre manquant.", answer: 12, theme: "raisonnement", difficulty: 2 },
  
  // Proportionality and ratios
  { exercise: "Paul a 3 fois plus de billes que Jean. Ensemble ils en ont 48. Combien Jean en a-t-il ?", answer: 12, theme: "raisonnement", difficulty: 2 },
  { exercise: "Marie a 4 fois plus d'argent que Léa. Ensemble elles ont 75 €. Combien Léa a-t-elle ?", answer: 15, theme: "raisonnement", difficulty: 2 },
  { exercise: "Pierre a 2 fois moins de livres que Sophie. Ensemble ils en ont 18. Combien Pierre en a-t-il ?", answer: 6, theme: "raisonnement", difficulty: 2 },
  { exercise: "Un père a 3 fois l'âge de son fils. La somme de leurs âges est 48 ans. Âge du fils ?", answer: 12, theme: "raisonnement", difficulty: 2 },
  { exercise: "Un père a 4 fois l'âge de sa fille. La somme de leurs âges est 60 ans. Âge de la fille ?", answer: 12, theme: "raisonnement", difficulty: 2 },
  
  // Consecutive numbers
  { exercise: "La somme de 3 nombres consécutifs est 48. Quel est le plus petit ?", answer: 15, theme: "raisonnement", difficulty: 2 },
  { exercise: "La somme de 3 nombres consécutifs est 63. Quel est le plus grand ?", answer: 22, theme: "raisonnement", difficulty: 2 },
  { exercise: "La somme de 2 nombres consécutifs est 35. Quel est le plus petit ?", answer: 17, theme: "raisonnement", difficulty: 2 },
  { exercise: "La somme de 4 nombres consécutifs est 50. Quel est le plus petit ?", answer: 11, theme: "raisonnement", difficulty: 3 },
  
  // Difference and sum problems
  { exercise: "Deux nombres ont pour somme 50 et pour différence 14. Le plus grand = ?", answer: 32, theme: "raisonnement", difficulty: 3 },
  { exercise: "Deux nombres ont pour somme 100 et pour différence 20. Le plus petit = ?", answer: 40, theme: "raisonnement", difficulty: 3 },
  { exercise: "Deux nombres ont pour somme 84 et pour différence 12. Le plus grand = ?", answer: 48, theme: "raisonnement", difficulty: 3 },
  { exercise: "Deux nombres ont pour somme 72 et pour différence 8. Le plus petit = ?", answer: 32, theme: "raisonnement", difficulty: 3 },
  
  // Fractions of quantities
  { exercise: "J'ai dépensé 3/4 de mon argent. Il me reste 15 €. J'avais combien au départ ?", answer: 60, theme: "raisonnement", difficulty: 3 },
  { exercise: "J'ai mangé 2/5 des bonbons. Il en reste 18. Combien y en avait-il au départ ?", answer: 30, theme: "raisonnement", difficulty: 3 },
  { exercise: "J'ai lu 3/5 d'un livre. Il me reste 80 pages. Combien de pages au total ?", answer: 200, theme: "raisonnement", difficulty: 3 },
  { exercise: "J'ai parcouru 2/3 du trajet. Il me reste 40 km. Distance totale ?", answer: 120, theme: "raisonnement", difficulty: 3 },
  
  // Angles in triangles
  { exercise: "Dans un triangle isocèle, l'angle au sommet est 40°. Chaque angle à la base = ?", answer: 70, theme: "raisonnement", difficulty: 2 },
  { exercise: "Dans un triangle isocèle, un angle à la base est 55°. L'angle au sommet = ?", answer: 70, theme: "raisonnement", difficulty: 2 },
  { exercise: "Dans un triangle, un angle est le double d'un autre. Le 3e vaut 60°. Les deux autres font 120° ensemble. Le plus petit = ?", answer: 40, theme: "raisonnement", difficulty: 3 },
  
  // Speed/distance/time problems
  { exercise: "Une voiture roule à 80 km/h. Temps pour 200 km en heures ?", answer: 2.5, theme: "raisonnement", difficulty: 2 },
  { exercise: "Un cycliste roule à 20 km/h. Distance en 3 heures ?", answer: 60, theme: "raisonnement", difficulty: 2 },
  { exercise: "Un train parcourt 450 km en 3 heures. Vitesse en km/h ?", answer: 150, theme: "raisonnement", difficulty: 2 },
  { exercise: "Un piéton marche à 5 km/h. Temps pour 15 km en heures ?", answer: 3, theme: "raisonnement", difficulty: 2 },
  
  // Scale problems
  { exercise: "Sur une carte à l'échelle 1/100 000, 5 cm représentent combien de km ?", answer: 5, theme: "raisonnement", difficulty: 2 },
  { exercise: "Sur une carte à l'échelle 1/50 000, 8 cm représentent combien de km ?", answer: 4, theme: "raisonnement", difficulty: 2 },
  { exercise: "Une distance de 30 km est représentée par 3 cm sur une carte. Échelle = 1/? (en milliers)", answer: 1000, theme: "raisonnement", difficulty: 3 },
];

// EXPERT LEVEL - Contest-style questions for levels 19-20 ONLY
// These are tricky, require multi-step reasoning, and are NOT mechanical calculations
export const expertExercises: PDFExercise[] = [
  // Counting and combinatorics
  { exercise: "Combien de nombres à 3 chiffres peut-on former avec 1, 2, 3 (sans répétition) ?", answer: 6, theme: "expert", difficulty: 3 },
  { exercise: "Combien de rectangles dans une grille 2×3 ?", answer: 18, theme: "expert", difficulty: 3 },
  { exercise: "Combien de poignées de main entre 6 personnes si chacun salue tous les autres ?", answer: 15, theme: "expert", difficulty: 3 },
  { exercise: "Combien de diagonales dans un hexagone ?", answer: 9, theme: "expert", difficulty: 3 },
  { exercise: "Combien de triangles dans une figure avec 5 points alignés reliés à 1 point extérieur ?", answer: 10, theme: "expert", difficulty: 3 },
  
  // Number theory tricks
  { exercise: "Quel est le reste de 2023 ÷ 9 ?", answer: 7, theme: "expert", difficulty: 3 },
  { exercise: "Quel est le chiffre des unités de 7^100 ?", answer: 1, theme: "expert", difficulty: 3 },
  { exercise: "Quel est le chiffre des unités de 3^50 ?", answer: 9, theme: "expert", difficulty: 3 },
  { exercise: "Somme des chiffres de 999 999 999 × 5 = ?", answer: 45, theme: "expert", difficulty: 3 },
  { exercise: "Combien de zéros à la fin de 25! (25 factorielle) ?", answer: 6, theme: "expert", difficulty: 3 },
  { exercise: "Le plus grand diviseur commun de 84 et 126 = ?", answer: 42, theme: "expert", difficulty: 3 },
  { exercise: "Le plus petit multiple commun de 12 et 18 = ?", answer: 36, theme: "expert", difficulty: 3 },
  
  // Tricky fractions and percentages
  { exercise: "Si j'augmente un prix de 25% puis je le diminue de 20%, variation totale en % ?", answer: 0, theme: "expert", difficulty: 3 },
  { exercise: "Un article baisse de 20% puis de 25%. Baisse totale en % ?", answer: 40, theme: "expert", difficulty: 3 },
  { exercise: "3/4 + 5/6 - 2/3 = ? (réponse en douzièmes, numérateur)", answer: 11, theme: "expert", difficulty: 3 },
  { exercise: "Si 2/3 d'un nombre = 48, quel est 5/6 de ce nombre ?", answer: 60, theme: "expert", difficulty: 3 },
  { exercise: "A a 40% de plus que B. B a quel % de moins que A ?", answer: 28.57, theme: "expert", difficulty: 3 },
  
  // Logic puzzles with numbers
  { exercise: "Je pense à un nombre. Son triple moins 7 donne son double plus 8. Ce nombre ?", answer: 15, theme: "expert", difficulty: 3 },
  { exercise: "Un nombre + sa moitié + son quart = 35. Ce nombre ?", answer: 20, theme: "expert", difficulty: 3 },
  { exercise: "La somme de 5 nombres consécutifs pairs est 100. Le plus grand ?", answer: 24, theme: "expert", difficulty: 3 },
  { exercise: "Produit de 3 nombres consécutifs = 120. Le nombre du milieu ?", answer: 5, theme: "expert", difficulty: 3 },
  { exercise: "Un nombre divisé par 7 donne reste 5. Par 5 donne reste 3. Plus petit nombre > 100 ?", answer: 103, theme: "expert", difficulty: 3 },
  
  // Geometry reasoning
  { exercise: "Aire d'un triangle rectangle avec hypoténuse 10 et un côté 6 = ?", answer: 24, theme: "expert", difficulty: 3 },
  { exercise: "Dans un rectangle, diagonale 13 cm et largeur 5 cm. Longueur ?", answer: 12, theme: "expert", difficulty: 3 },
  { exercise: "Périmètre d'un carré inscrit dans un cercle de rayon 5√2 cm = ?", answer: 40, theme: "expert", difficulty: 3 },
  { exercise: "Un cube a une arête de 4 cm. Somme de toutes les arêtes = ?", answer: 48, theme: "expert", difficulty: 3 },
  { exercise: "Rapport des aires de 2 carrés si leurs côtés sont dans le rapport 2:3 ?", answer: 4, theme: "expert", difficulty: 3 },
  
  // Speed and work problems
  { exercise: "A fait un travail en 6h, B en 3h. Ensemble en combien d'heures ?", answer: 2, theme: "expert", difficulty: 3 },
  { exercise: "Un robinet remplit en 4h, un autre vide en 6h. Bassin plein en combien d'heures ?", answer: 12, theme: "expert", difficulty: 3 },
  { exercise: "Aller à 40 km/h, retour à 60 km/h. Vitesse moyenne aller-retour en km/h ?", answer: 48, theme: "expert", difficulty: 3 },
  { exercise: "Train 1 à 80 km/h, train 2 à 120 km/h. Ils se croisent après 2h. Distance initiale ?", answer: 400, theme: "expert", difficulty: 3 },
  
  // Classic math traps
  { exercise: "3 frères ont 3 sœurs. Combien d'enfants dans la famille ?", answer: 6, theme: "expert", difficulty: 3 },
  { exercise: "Une brique pèse 1 kg + une demi-brique. Poids de la brique en kg ?", answer: 2, theme: "expert", difficulty: 3 },
  { exercise: "Un escargot monte 3m le jour, descend 2m la nuit. Jours pour 10m ?", answer: 8, theme: "expert", difficulty: 3 },
  { exercise: "Page 99 d'un livre. Combien de chiffres pour numéroter de 1 à 99 ?", answer: 189, theme: "expert", difficulty: 3 },
  { exercise: "Horloge : angle entre aiguilles à 15h30 en degrés ?", answer: 75, theme: "expert", difficulty: 3 },
  
  // Sequences and patterns
  { exercise: "Suite 2, 6, 12, 20, 30, ? Terme suivant ?", answer: 42, theme: "expert", difficulty: 3 },
  { exercise: "Suite 1, 1, 2, 3, 5, 8, 13, ? Terme suivant ?", answer: 21, theme: "expert", difficulty: 3 },
  { exercise: "Somme 1+2+3+...+20 = ?", answer: 210, theme: "expert", difficulty: 3 },
  { exercise: "Somme des 10 premiers nombres impairs = ?", answer: 100, theme: "expert", difficulty: 3 },
  { exercise: "1×2 + 2×3 + 3×4 + 4×5 = ?", answer: 40, theme: "expert", difficulty: 3 },
  
  // Advanced mental math
  { exercise: "99 × 101 = ?", answer: 9999, theme: "expert", difficulty: 3 },
  { exercise: "25² = ?", answer: 625, theme: "expert", difficulty: 3 },
  { exercise: "15² = ?", answer: 225, theme: "expert", difficulty: 3 },
  { exercise: "997 + 998 + 999 + 1000 + 1001 + 1002 + 1003 = ?", answer: 7000, theme: "expert", difficulty: 3 },
  { exercise: "12345679 × 9 = ?", answer: 111111111, theme: "expert", difficulty: 3 },
  
  // Mixed reasoning
  { exercise: "Age du père = 3× âge fils. Dans 12 ans, père = 2× fils. Âge actuel du fils ?", answer: 12, theme: "expert", difficulty: 3 },
  { exercise: "8 stylos + 3 cahiers = 47€. 3 stylos + 8 cahiers = 53€. Prix d'un stylo ?", answer: 3, theme: "expert", difficulty: 3 },
  { exercise: "Carré magique 3×3 avec somme 15. Valeur au centre ?", answer: 5, theme: "expert", difficulty: 3 },
  { exercise: "24 = 2^a × 3^b. Valeur de a + b ?", answer: 4, theme: "expert", difficulty: 3 },
  { exercise: "Si a÷b = 3/4 et b÷c = 2/5, alors a÷c = ? (numérateur si forme simplifiée x/10)", answer: 3, theme: "expert", difficulty: 3 },
];

// CONCOURS - Level 21 - Ultra-difficult contest-style exercises
export const concoursExercises: PDFExercise[] = [
  // Durée et temps
  { exercise: "Quelle est la durée d'un film qui débute à 16h45min et finit à 18h30 ?", answer: 105, theme: "concours", difficulty: 3 },
  { exercise: "Un camion part de Douala à 6h30mn et arrive à Bafoussam à 11h25mn. Combien de temps a-t-il mis en route ? (en minutes)", answer: 295, theme: "concours", difficulty: 3 },
  { exercise: "Parti du Cameroun à 8h, un avion arrive à Paris à 16h05min. Quelle est la durée du trajet ? (en minutes)", answer: 485, theme: "concours", difficulty: 3 },
  { exercise: "J'ai parcouru à bicyclette 15km. Je suis parti à 7h30min. À quelle heure suis-je arrivé si ma vitesse moyenne a été de 30km/h ? (réponse en minutes après 7h)", answer: 60, theme: "concours", difficulty: 3 },
  { exercise: "Calcule 2h42min + 1h18min (résultat en minutes)", answer: 240, theme: "concours", difficulty: 3 },
  { exercise: "Convertis 110min en heures et minutes. Donne le nombre de minutes restantes.", answer: 50, theme: "concours", difficulty: 3 },
  
  // Conversions et mesures
  { exercise: "240m ÷ 0,25 = ? m", answer: 960, theme: "concours", difficulty: 3 },
  { exercise: "2 ha + 3a = ? m²", answer: 20300, theme: "concours", difficulty: 3 },
  { exercise: "Combien y a-t-il de quintaux dans 7825 kg ?", answer: 78.25, theme: "concours", difficulty: 3 },
  { exercise: "Un homme fait des pas de 0,75m. Quelle distance parcourt-il s'il fait 1000 pas ? (en m)", answer: 750, theme: "concours", difficulty: 3 },
  { exercise: "Convertis et additionne 5,8 hm + 330m (résultat en m)", answer: 910, theme: "concours", difficulty: 3 },
  
  // Géométrie - Surfaces
  { exercise: "Quelle est, en m², la surface d'un disque de rayon 10 dm ? (utilise π ≈ 3,14)", answer: 3.14, theme: "concours", difficulty: 3 },
  { exercise: "Une table mesure 120 cm de long et 110 cm de large. Trouve sa surface en cm².", answer: 13200, theme: "concours", difficulty: 3 },
  { exercise: "Quelle est la surface d'un triangle dont la base mesure 42m et la hauteur 20m ?", answer: 420, theme: "concours", difficulty: 3 },
  { exercise: "Paul entoure son champ carré de 20 piquets espacés de 2m les uns des autres. Combien d'intervalles y a-t-il ?", answer: 20, theme: "concours", difficulty: 3 },
  
  // Pourcentages et intérêts
  { exercise: "15% de 300 kg de viande c'est combien de kg ?", answer: 45, theme: "concours", difficulty: 3 },
  { exercise: "Une somme de 125 000F est placée à un taux de 5%. Trouve l'intérêt annuel.", answer: 6250, theme: "concours", difficulty: 3 },
  { exercise: "Combien gagneras-tu si pour un achat de 12 500F, le marchand t'accorde une réduction de 8% ?", answer: 1000, theme: "concours", difficulty: 3 },
  { exercise: "Calcule l'intérêt produit par un capital de 30 000F au taux de 6% pendant 1 an et demi.", answer: 2700, theme: "concours", difficulty: 3 },
  { exercise: "Quel est le prix réel d'une radio dont 30% représente 90 000F ?", answer: 300000, theme: "concours", difficulty: 3 },
  
  // Problèmes de prix et proportionnalité
  { exercise: "Quel est le prix de 11 cahiers dont l'un coûte 275F ?", answer: 3025, theme: "concours", difficulty: 3 },
  { exercise: "Une douzaine de crayons coûte 720F. Combien coûtent 2 crayons ?", answer: 120, theme: "concours", difficulty: 3 },
  { exercise: "50 oranges coûtent 1500F. En combien de tas peut-on grouper ces oranges à raison de 150F le tas ?", answer: 5, theme: "concours", difficulty: 3 },
  { exercise: "Ali donne trois billets de 2000F pour payer un article de 4375F. Combien doit-on lui rembourser ?", answer: 1625, theme: "concours", difficulty: 3 },
  { exercise: "Pour payer le tiers d'une dette, j'ai versé 2000F. Quelle était ma dette ?", answer: 6000, theme: "concours", difficulty: 3 },
  { exercise: "Quel est le prix de 44 crayons à 25F l'un ?", answer: 1100, theme: "concours", difficulty: 3 },
  { exercise: "Il faut 15min pour remplir au robinet une bassine de 30L. Quel est le débit du robinet en L/min ?", answer: 2, theme: "concours", difficulty: 3 },
  
  // Problèmes d'âge et raisonnement
  { exercise: "Moussa a le tiers de l'âge de son père qui a 57 ans cette année. Quel est l'âge de Moussa ?", answer: 19, theme: "concours", difficulty: 3 },
  { exercise: "Ben a 11 ans. Sa mère a le triple de son âge. Donne l'âge de sa mère.", answer: 33, theme: "concours", difficulty: 3 },
  { exercise: "Quel est le double de la moitié de 30 ?", answer: 30, theme: "concours", difficulty: 3 },
  { exercise: "Le triple d'un nombre est 60, sa moitié est combien ?", answer: 10, theme: "concours", difficulty: 3 },
  
  // Calculs avec décimaux
  { exercise: "Calcule 11 × 170", answer: 1870, theme: "concours", difficulty: 3 },
  { exercise: "Calcule 12 × 110", answer: 1320, theme: "concours", difficulty: 3 },
  { exercise: "Calcule 240 × 0,10", answer: 24, theme: "concours", difficulty: 3 },
  { exercise: "Calcule 13,42 + 16,58", answer: 30, theme: "concours", difficulty: 3 },
  { exercise: "Calcule 280 × 0,5", answer: 140, theme: "concours", difficulty: 3 },
  { exercise: "Calcule 180 ÷ 0,5", answer: 360, theme: "concours", difficulty: 3 },
  { exercise: "Calcule 360 × 1,75", answer: 630, theme: "concours", difficulty: 3 },
  { exercise: "Calcule 32 × 0,75", answer: 24, theme: "concours", difficulty: 3 },
  { exercise: "Calcule 1212 - 202", answer: 1010, theme: "concours", difficulty: 3 },
  { exercise: "Calcule 88 ÷ 0,25", answer: 352, theme: "concours", difficulty: 3 },
  { exercise: "Calcule 230 × 1,5", answer: 345, theme: "concours", difficulty: 3 },
  { exercise: "Calcule 240 × 2,5", answer: 600, theme: "concours", difficulty: 3 },
  { exercise: "Calcule 808 - 99", answer: 709, theme: "concours", difficulty: 3 },
  { exercise: "Calcule 6,9 ÷ 0,01", answer: 690, theme: "concours", difficulty: 3 },
  
  // Fractions
  { exercise: "Calcule 17/28 × 2 (donne le numérateur de la fraction simplifiée sur 28)", answer: 34, theme: "concours", difficulty: 3 },
  { exercise: "Calcule 9 ÷ 2 (partie entière)", answer: 4, theme: "concours", difficulty: 3 },
  { exercise: "Trouve le numérateur de la fraction qui représente 20 jours d'une année bissextile (sur 366)", answer: 20, theme: "concours", difficulty: 3 },
  
  // Divisibilité
  { exercise: "Parmi 251, 310, 2016, 235 : combien de nombres sont divisibles par 5 ?", answer: 2, theme: "concours", difficulty: 3 },
];

// Combine all exercises
export const allPDFExercises: PDFExercise[] = [
  ...additionExercises,
  ...subtractionExercises,
  ...multiplicationExercises,
  ...divisionExercises,
  ...decimalExercises,
  ...timeExercises,
  ...problemExercises,
  ...largeNumberExercises,
  ...implicitReasoningExercises,
  ...expertExercises,
  ...concoursExercises,
];

// Export by theme
export const exercisesByTheme: Record<string, PDFExercise[]> = {
  additions: additionExercises,
  soustractions: subtractionExercises,
  multiplications: multiplicationExercises,
  divisions: divisionExercises,
  décimaux: decimalExercises,
  "nombres complexes": timeExercises,
  problèmes: problemExercises,
  "grands nombres": largeNumberExercises,
  raisonnement: implicitReasoningExercises,
  expert: expertExercises,
  concours: concoursExercises,
};

// Filter out very simple additions (single digits < 10) for levels 5+
const filterSimpleAdditions = (exercises: PDFExercise[], excludeSimple: boolean): PDFExercise[] => {
  if (!excludeSimple) return exercises;
  
  return exercises.filter(e => {
    // Keep non-addition exercises
    if (e.theme !== "additions") return true;
    
    // For additions, exclude very simple ones (result < 15 or single digit operands)
    // Check if exercise contains only small numbers
    const numbers = e.exercise.match(/\d+/g);
    if (numbers) {
      const allSmall = numbers.every(n => parseInt(n) < 10);
      const resultSmall = e.answer < 15;
      // Exclude if all operands are small AND result is small
      if (allSmall && resultSmall) return false;
    }
    return true;
  });
};

// Get exercises filtered by difficulty for progressive levels
export const getExercisesForLevel = (level: number): PDFExercise[] => {
  // Map levels 1-20 to difficulty ranges and themes
  if (level <= 4) {
    // Levels 1-4: Easy additions and subtractions (include simple additions)
    return allPDFExercises.filter(e => 
      (e.theme === "additions" || e.theme === "soustractions") && 
      e.difficulty === 1
    );
  } else if (level <= 5) {
    // Level 5: Easy additions/subtractions but filter out very simple additions
    const exercises = allPDFExercises.filter(e => 
      (e.theme === "additions" || e.theme === "soustractions") && 
      e.difficulty === 1
    );
    return filterSimpleAdditions(exercises, true);
  } else if (level <= 8) {
    // Levels 6-8: Multiplications and divisions + harder add/sub (no simple additions)
    const exercises = allPDFExercises.filter(e => 
      (e.theme === "multiplications" || e.theme === "divisions" || 
       e.theme === "additions" || e.theme === "soustractions") && 
      e.difficulty <= 2
    );
    return filterSimpleAdditions(exercises, true);
  } else if (level <= 11) {
    // Levels 9-11: MORE DIVISIONS prioritized + multiplications
    const exercises = allPDFExercises.filter(e => 
      (e.theme === "divisions" || e.theme === "multiplications" || 
       e.theme === "additions" || e.theme === "soustractions") && 
      e.difficulty <= 2
    );
    // Boost divisions by adding them twice
    const divisions = exercises.filter(e => e.theme === "divisions");
    return filterSimpleAdditions([...exercises, ...divisions], true);
  } else if (level <= 14) {
    // Levels 12-14: MORE DECIMALS + IMPLICIT REASONING + divisions
    const exercises = allPDFExercises.filter(e => 
      e.theme !== "problèmes" && e.theme !== "grands nombres" && e.theme !== "expert" && e.difficulty <= 2
    );
    // Boost decimals and reasoning exercises
    const decimals = exercises.filter(e => e.theme === "décimaux");
    const reasoning = exercises.filter(e => e.theme === "raisonnement");
    return filterSimpleAdditions([...exercises, ...decimals, ...reasoning], true);
  } else if (level <= 16) {
    // Levels 15-16: Include word problems + LARGE NUMBERS + REASONING (difficulty 1-2)
    const exercises = allPDFExercises.filter(e => 
      e.theme !== "expert" && e.difficulty <= 2
    );
    // Boost large numbers and reasoning for these levels
    const largeNumbers = exercises.filter(e => e.theme === "grands nombres");
    const reasoning = exercises.filter(e => e.theme === "raisonnement");
    return filterSimpleAdditions([...exercises, ...largeNumbers, ...reasoning], true);
  } else if (level <= 18) {
    // Levels 17-18: Hard exercises but not expert level only
    const exercises = allPDFExercises.filter(e => 
      e.theme !== "expert" && e.difficulty >= 2
    );
    const reasoning = exercises.filter(e => e.theme === "raisonnement");
    return filterSimpleAdditions([...exercises, ...reasoning], true);
  } else if (level <= 20) {
    // LEVELS 19-20: EXPERT ONLY - Contest-style, tricky reasoning, NO basic exercises
    // STRICT FILTERING: Only difficulty 3 + expert theme + advanced reasoning
    const expertOnly = allPDFExercises.filter(e => 
      e.theme === "expert" || 
      (e.difficulty === 3 && (
        e.theme === "raisonnement" || 
        e.theme === "problèmes" ||
        e.theme === "grands nombres"
      ))
    );
    
    // Additional filter to remove any remaining basic exercises
    const filteredExpert = expertOnly.filter(e => {
      // Exclude basic operations patterns
      const isBasicOperation = /^\d+\s*[+\-×÷]\s*\d+\s*=/.test(e.exercise);
      const isSimpleConversion = /^\d+\s*(m|km|L|kg|g|cm)\s*=/.test(e.exercise);
      const isBasicPerimeter = /^Périmètre d'un (carré|rectangle)/.test(e.exercise);
      
      return !isBasicOperation && !isSimpleConversion && !isBasicPerimeter;
    });
    
    return filteredExpert.length > 0 ? filteredExpert : expertExercises;
  } else {
    // LEVEL 21: CONCOURS - Ultra-difficult, olympiad-style questions ONLY
    // If concours exercises exist, use them exclusively
    // Otherwise fall back to expert + hardest reasoning
    if (concoursExercises.length > 0) {
      return concoursExercises;
    }
    
    // Fallback: combine expert exercises with the hardest reasoning problems
    const ultraHard = allPDFExercises.filter(e => 
      e.theme === "expert" || 
      (e.theme === "concours") ||
      (e.difficulty === 3 && e.theme === "raisonnement")
    );
    return ultraHard.length > 0 ? ultraHard : expertExercises;
  }
};

// Get a random exercise from PDF data
export const getRandomPDFExercise = (
  level: number, 
  usedExercises: Set<string>
): PDFExercise | null => {
  const availableExercises = getExercisesForLevel(level);
  const unusedExercises = availableExercises.filter(e => !usedExercises.has(e.exercise));
  
  if (unusedExercises.length === 0) {
    // If all exercises have been used, allow reuse
    if (availableExercises.length === 0) return null;
    return availableExercises[Math.floor(Math.random() * availableExercises.length)];
  }
  
  return unusedExercises[Math.floor(Math.random() * unusedExercises.length)];
};

// Get exercises by specific theme for "Mode Libre"
export const getExercisesByTheme = (theme: string): PDFExercise[] => {
  return exercisesByTheme[theme] || [];
};
