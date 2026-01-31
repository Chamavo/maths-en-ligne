export interface WorldQuestion {
  id: number;
  theme: string;
  question: string;
  choices: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
}

export const worldQuestions: WorldQuestion[] = [
  // 🏙️ Vie quotidienne et Localisation (Cameroun)
  {
    id: 1,
    theme: "Vie quotidienne",
    question: "Combien de personnes vivent à Douala ?",
    choices: { A: "30 000", B: "300 000", C: "3 millions", D: "30 millions" }
  },
  {
    id: 2,
    theme: "Vie quotidienne",
    question: "Quelle distance sépare Douala de Yaoundé ?",
    choices: { A: "25 km", B: "250 km", C: "2 500 km", D: "25 000 km" }
  },
  {
    id: 3,
    theme: "Vie quotidienne",
    question: "Quelle est la longueur du fleuve Wouri ?",
    choices: { A: "16 km", B: "160 km", C: "1 600 km", D: "16 000 km" }
  },
  {
    id: 4,
    theme: "Vie quotidienne",
    question: "À quelle altitude se trouve le Mont Cameroun ?",
    choices: { A: "400 m", B: "4 000 m", C: "40 000 m", D: "400 000 m" }
  },
  {
    id: 5,
    theme: "Vie quotidienne",
    question: "Combien de temps faut-il pour aller de Bonabéri à Akwa en voiture ?",
    choices: { A: "3 min", B: "30 min", C: "5 h", D: "1 jour" }
  },
  {
    id: 6,
    theme: "Vie quotidienne",
    question: "Quelle distance parcours-tu pour aller à l'école ?",
    choices: { A: "20 m", B: "2 km", C: "200 km", D: "2 000 km" }
  },
  {
    id: 7,
    theme: "Vie quotidienne",
    question: "Combien de temps mets-tu pour aller à l'école à pied ?",
    choices: { A: "1 min", B: "10 min", C: "3 h", D: "1 jour" }
  },

  // 🌍 Géographie et Monde
  {
    id: 8,
    theme: "Géographie",
    question: "Quelle est la distance entre Douala et Paris ?",
    choices: { A: "500 km", B: "5 000 km", C: "50 000 km", D: "500 000 km" }
  },
  {
    id: 9,
    theme: "Géographie",
    question: "Combien de temps dure un vol Douala-Paris ?",
    choices: { A: "1 h", B: "6 h", C: "24 h", D: "1 semaine" }
  },
  {
    id: 10,
    theme: "Géographie",
    question: "Combien de pays y a-t-il en Afrique ?",
    choices: { A: "5", B: "54", C: "500", D: "5 000" }
  },
  {
    id: 11,
    theme: "Géographie",
    question: "Combien de personnes vivent au Cameroun ?",
    choices: { A: "280 000", B: "28 millions", C: "280 millions", D: "2,8 milliards" }
  },
  {
    id: 12,
    theme: "Géographie",
    question: "Le tour de la Terre mesure environ :",
    choices: { A: "40 km", B: "400 km", C: "4 000 km", D: "40 000 km" }
  },
  {
    id: 13,
    theme: "Géographie",
    question: "La largeur d'un pays est environ :",
    choices: { A: "10 km", B: "100 km", C: "1 000 km", D: "10 000 km" }
  },
  {
    id: 14,
    theme: "Géographie",
    question: "Combien de personnes vivent sur Terre ?",
    choices: { A: "80 millions", B: "800 millions", C: "8 milliards", D: "80 milliards" }
  },

  // ⏰ Temps et Durées
  {
    id: 15,
    theme: "Temps",
    question: "Combien d'heures dure une journée d'école ?",
    choices: { A: "1 h", B: "6 h", C: "24 h", D: "48 h" }
  },
  {
    id: 16,
    theme: "Temps",
    question: "Combien de jours y a-t-il dans une année ?",
    choices: { A: "52", B: "365", C: "1 000", D: "10 000" }
  },
  {
    id: 17,
    theme: "Temps",
    question: "Depuis combien d'années le Cameroun est-il indépendant (1960) ?",
    choices: { A: "6 ans", B: "65 ans", C: "600 ans", D: "6 000 ans" }
  },
  {
    id: 18,
    theme: "Temps",
    question: "La durée d'un film est environ :",
    choices: { A: "5 min", B: "20 min", C: "2 h", D: "1 jour" }
  },
  {
    id: 19,
    theme: "Temps",
    question: "Le temps pour cligner des yeux est environ :",
    choices: { A: "1 seconde", B: "10 secondes", C: "1 minute", D: "10 minutes" }
  },
  {
    id: 20,
    theme: "Temps",
    question: "Le temps pour manger un repas est environ :",
    choices: { A: "30 sec", B: "5 min", C: "30 min", D: "3 h" }
  },
  {
    id: 21,
    theme: "Temps",
    question: "Combien de secondes y a-t-il dans une heure ?",
    choices: { A: "60", B: "600", C: "3 600", D: "36 000" }
  },
  {
    id: 22,
    theme: "Temps",
    question: "Combien de secondes y a-t-il dans une journée ?",
    choices: { A: "1 000", B: "10 000", C: "86 400", D: "864 000" }
  },

  // 📏 Tailles et Mesures
  {
    id: 23,
    theme: "Tailles",
    question: "La taille d'un moustique est environ :",
    choices: { A: "0,1 mm", B: "5 mm", C: "5 cm", D: "50 cm" }
  },
  {
    id: 24,
    theme: "Tailles",
    question: "Combien mesure une fourmi ?",
    choices: { A: "5 mm", B: "5 cm", C: "50 cm", D: "5 m" }
  },
  {
    id: 25,
    theme: "Tailles",
    question: "L'épaisseur d'un livre est environ :",
    choices: { A: "1 mm", B: "1 cm", C: "10 cm", D: "1 m" }
  },
  {
    id: 26,
    theme: "Tailles",
    question: "La taille d'un cahier est environ :",
    choices: { A: "5 cm", B: "20 cm", C: "2 m", D: "20 m" }
  },
  {
    id: 27,
    theme: "Tailles",
    question: "Quelle est ta taille (à 11 ans) ?",
    choices: { A: "50 cm", B: "145 cm", C: "300 cm", D: "500 cm" }
  },
  {
    id: 28,
    theme: "Tailles",
    question: "La taille d'un adulte est environ :",
    choices: { A: "50 cm", B: "1,5 m", C: "5 m", D: "15 m" }
  },
  {
    id: 29,
    theme: "Tailles",
    question: "La longueur d'une voiture est environ :",
    choices: { A: "50 cm", B: "2 m", C: "5 m", D: "10 m" }
  },
  {
    id: 30,
    theme: "Tailles",
    question: "La longueur d'un couloir d'école est environ :",
    choices: { A: "2 m", B: "10 m", C: "100 m", D: "1 km" }
  },
  {
    id: 31,
    theme: "Tailles",
    question: "Quelle est la longueur d'un terrain de football ?",
    choices: { A: "10 m", B: "100 m", C: "1 km", D: "10 km" }
  },
  {
    id: 32,
    theme: "Tailles",
    question: "Quelle est la largeur du pont Wouri ?",
    choices: { A: "2 m", B: "15 m", C: "500 m", D: "5 km" }
  },
  {
    id: 33,
    theme: "Tailles",
    question: "Quelle est la hauteur d'un immeuble de 5 étages ?",
    choices: { A: "3 m", B: "15 m", C: "500 m", D: "5 km" }
  },
  {
    id: 34,
    theme: "Tailles",
    question: "Quelle est la hauteur d'un baobab adulte ?",
    choices: { A: "2 m", B: "20 m", C: "200 m", D: "2 km" }
  },

  // ⚖️ Masses et Poids
  {
    id: 35,
    theme: "Masses",
    question: "Combien pèse une mangue ou une pomme ?",
    choices: { A: "1 g", B: "100 g", C: "300 g", D: "5 kg" }
  },
  {
    id: 36,
    theme: "Masses",
    question: "Combien pèse ton cartable plein ?",
    choices: { A: "50 g", B: "5 kg", C: "50 kg", D: "500 kg" }
  },
  {
    id: 37,
    theme: "Masses",
    question: "Combien pèse un sac de riz standard ?",
    choices: { A: "1 kg", B: "5 kg", C: "25 kg", D: "50 kg" }
  },
  {
    id: 38,
    theme: "Masses",
    question: "Combien pèses-tu à 11 ans ?",
    choices: { A: "4 kg", B: "35 kg", C: "300 kg", D: "3 000 kg" }
  },
  {
    id: 39,
    theme: "Masses",
    question: "Le poids d'un chat est environ :",
    choices: { A: "100 g", B: "1 kg", C: "5 kg", D: "50 kg" }
  },
  {
    id: 40,
    theme: "Masses",
    question: "Combien pèse un éléphant adulte ?",
    choices: { A: "50 kg", B: "500 kg", C: "5 000 kg", D: "50 000 kg" }
  },
  {
    id: 41,
    theme: "Masses",
    question: "Combien pèse une voiture ?",
    choices: { A: "50 kg", B: "500 kg", C: "1 500 kg", D: "15 000 kg" }
  },
  {
    id: 42,
    theme: "Masses",
    question: "Combien pèse un camion chargé ?",
    choices: { A: "100 kg", B: "1 000 kg", C: "20 000 kg", D: "200 000 kg" }
  },

  // 💰 Argent et Économie
  {
    id: 43,
    theme: "Argent",
    question: "Combien coûte un pain à Douala ?",
    choices: { A: "10 FCFA", B: "200 FCFA", C: "5 000 FCFA", D: "50 000 FCFA" }
  },
  {
    id: 44,
    theme: "Argent",
    question: "Quel est le prix d'un cahier d'école ?",
    choices: { A: "5 FCFA", B: "300 FCFA", C: "20 000 FCFA", D: "200 000 FCFA" }
  },
  {
    id: 45,
    theme: "Argent",
    question: "Combien coûte un taxi de Bonabéri à Bonanjo ?",
    choices: { A: "50 FCFA", B: "500 FCFA", C: "50 000 FCFA", D: "500 000 FCFA" }
  },
  {
    id: 46,
    theme: "Argent",
    question: "Combien coûte un téléphone portable simple ?",
    choices: { A: "1 000 FCFA", B: "15 000 FCFA", C: "500 000 FCFA", D: "5 000 000 FCFA" }
  },
  {
    id: 47,
    theme: "Argent",
    question: "Combien gagne un enseignant par mois environ ?",
    choices: { A: "5 000 FCFA", B: "150 000 FCFA", C: "10 000 000 FCFA", D: "100 000 000 FCFA" }
  },

  // 🌡️ Température et Énergie
  {
    id: 48,
    theme: "Température",
    question: "Quelle est la température du corps humain sain ?",
    choices: { A: "10°C", B: "37°C", C: "100°C", D: "500°C" }
  },
  {
    id: 49,
    theme: "Température",
    question: "À quelle température l'eau bout-elle ?",
    choices: { A: "10°C", B: "37°C", C: "100°C", D: "1 000°C" }
  },
  {
    id: 50,
    theme: "Température",
    question: "Quelle est la température à Douala en saison chaude ?",
    choices: { A: "5°C", B: "30°C", C: "80°C", D: "200°C" }
  },
  {
    id: 51,
    theme: "Température",
    question: "Quelle est la température dans un réfrigérateur ?",
    choices: { A: "-50°C", B: "4°C", C: "30°C", D: "100°C" }
  },
  {
    id: 52,
    theme: "Énergie",
    question: "Combien de watts consomme une ampoule LED ?",
    choices: { A: "1 W", B: "10 W", C: "1 000 W", D: "10 000 W" }
  },
  {
    id: 53,
    theme: "Énergie",
    question: "Combien de litres d'essence consomme une voiture pour 100 km ?",
    choices: { A: "0,5 L", B: "8 L", C: "80 L", D: "800 L" }
  },

  // 🍎 Alimentation et Santé
  {
    id: 54,
    theme: "Santé",
    question: "Combien de litres d'eau boit une personne par jour ?",
    choices: { A: "20 cl", B: "2 L", C: "20 L", D: "200 L" }
  },
  {
    id: 55,
    theme: "Santé",
    question: "Combien de calories manges-tu par jour ?",
    choices: { A: "20", B: "2 000", C: "20 000", D: "200 000" }
  },
  {
    id: 56,
    theme: "Alimentation",
    question: "Combien de grains de riz y a-t-il dans 1 kg ?",
    choices: { A: "100", B: "5 000", C: "50 000", D: "500 000" }
  },
  {
    id: 57,
    theme: "Santé",
    question: "Combien d'os a le corps humain ?",
    choices: { A: "20", B: "206", C: "2 000", D: "20 000" }
  },
  {
    id: 58,
    theme: "Santé",
    question: "Combien de litres de sang a un adulte ?",
    choices: { A: "0,5 L", B: "5 L", C: "50 L", D: "500 L" }
  },
  {
    id: 59,
    theme: "Santé",
    question: "Combien de fois ton cœur bat-il par minute ?",
    choices: { A: "7", B: "70", C: "700", D: "7 000" }
  },
  {
    id: 60,
    theme: "Santé",
    question: "Combien de fois respires-tu par minute ?",
    choices: { A: "1", B: "15", C: "150", D: "1 500" }
  },

  // 💻 Technologie et Construction
  {
    id: 61,
    theme: "Technologie",
    question: "Combien de personnes utilisent Internet au Cameroun ?",
    choices: { A: "10 000", B: "10 millions", C: "100 millions", D: "1 milliard" }
  },
  {
    id: 62,
    theme: "Technologie",
    question: "Combien de photos contient un téléphone de 64 Go ?",
    choices: { A: "10", B: "10 000", C: "10 millions", D: "10 milliards" }
  },
  {
    id: 63,
    theme: "Construction",
    question: "Combien de briques faut-il pour une maison ?",
    choices: { A: "50", B: "5 000", C: "500 000", D: "50 millions" }
  },
  {
    id: 64,
    theme: "Technologie",
    question: "Combien de voitures passent sur le pont Wouri par jour ?",
    choices: { A: "100", B: "10 000", C: "1 million", D: "100 millions" }
  },

  // 🌌 Espace
  {
    id: 65,
    theme: "Espace",
    question: "À quelle distance est la Lune de la Terre ?",
    choices: { A: "4 000 km", B: "400 000 km", C: "40 millions km", D: "4 milliards km" }
  },
  {
    id: 66,
    theme: "Espace",
    question: "Combien de temps met la lumière du Soleil pour arriver sur Terre ?",
    choices: { A: "8 secondes", B: "8 minutes", C: "8 heures", D: "8 jours" }
  },
  {
    id: 67,
    theme: "Espace",
    question: "Combien de planètes tournent autour du Soleil ?",
    choices: { A: "3", B: "8", C: "80", D: "800" }
  },

  // 🧮 Estimations et Projections
  {
    id: 68,
    theme: "Estimations",
    question: "Si tu marches 1 km/jour pendant 1 an, cela fait :",
    choices: { A: "30 km", B: "365 km", C: "3 000 km", D: "30 000 km" }
  },
  {
    id: 69,
    theme: "Estimations",
    question: "Si tu bois 1 L/jour pendant 1 an, cela fait :",
    choices: { A: "30 L", B: "365 L", C: "5 000 L", D: "50 000 L" }
  },
  {
    id: 70,
    theme: "Estimations",
    question: "Si tu respires 15 fois/min, combien de fois par jour ?",
    choices: { A: "~1 000", B: "~20 000", C: "~100 000", D: "~1 000 000" }
  },
  {
    id: 71,
    theme: "Estimations",
    question: "Combien de repas manges-tu en une année ?",
    choices: { A: "100", B: "300", C: "1 000", D: "10 000" }
  }
];

// Fonction pour obtenir la question du jour basée sur la date
export const getQuestionOfTheDay = (): WorldQuestion => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  // Cycle à travers les 71 questions
  const questionIndex = dayOfYear % worldQuestions.length;
  return worldQuestions[questionIndex];
};

// Fonction pour obtenir la date du jour au format YYYY-MM-DD
export const getTodayDateString = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};
