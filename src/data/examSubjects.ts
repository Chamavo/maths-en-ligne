// Sujets d'examen - Concours d'entrée en 6ème
// Chaque sujet: 5 questions de 10 points (total 50 pts → note sur 20)
// Durée: 50 minutes par sujet

export interface ExamQuestion {
  id: number;
  enonce: string;
  sousQuestions?: string[];
  points: 10;
  reponses: {
    question: string;
    reponse: string | number;
    unite?: string;
  }[];
  theme: 'numeration' | 'operations' | 'fractions' | 'mesures' | 'geometrie' | 'problemes';
}

export interface ExamSubject {
  id: number;
  title: string;
  duration: 50;
  totalPoints: 50;
  questions: ExamQuestion[];
}

// Fonction helper pour créer un sujet placeholder
const createPlaceholderSubject = (id: number): ExamSubject => ({
  id,
  title: `Sujet ${id}`,
  duration: 50,
  totalPoints: 50,
  questions: [
    {
      id: 1,
      enonce: `Exercice 1 du sujet ${id} - Bientôt disponible`,
      points: 10,
      reponses: [{ question: "Réponse", reponse: 0 }],
      theme: 'problemes'
    },
    {
      id: 2,
      enonce: `Exercice 2 du sujet ${id} - Bientôt disponible`,
      points: 10,
      reponses: [{ question: "Réponse", reponse: 0 }],
      theme: 'operations'
    },
    {
      id: 3,
      enonce: `Exercice 3 du sujet ${id} - Bientôt disponible`,
      points: 10,
      reponses: [{ question: "Réponse", reponse: 0 }],
      theme: 'geometrie'
    },
    {
      id: 4,
      enonce: `Exercice 4 du sujet ${id} - Bientôt disponible`,
      points: 10,
      reponses: [{ question: "Réponse", reponse: 0 }],
      theme: 'fractions'
    },
    {
      id: 5,
      enonce: `Exercice 5 du sujet ${id} - Bientôt disponible`,
      points: 10,
      reponses: [{ question: "Réponse", reponse: 0 }],
      theme: 'mesures'
    }
  ]
});

export const examSubjects: ExamSubject[] = [
  // ==================== SUJET 1 ====================
  {
    id: 1,
    title: "Sujet 1",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Le Directeur d'une école a reçu de l'Association des Parents d'Élèves une somme d'argent pour fournir des livres à sa classe de CM2. La classe compte 96 élèves. Le Directeur décide d'acheter : un livre de calcul pour 3 élèves, un livre de lecture pour 4 élèves, un livre de géographie pour 6 élèves, un dictionnaire pour 8 élèves.",
        sousQuestions: [
          "Combien de livres de calcul faut-il acheter ?",
          "Combien de livres de lecture faut-il acheter ?",
          "Combien de livres de géographie faut-il acheter ?",
          "Combien de dictionnaires faut-il acheter ?"
        ],
        points: 10,
        reponses: [
          { question: "Livres de calcul", reponse: 32, unite: "livres" },
          { question: "Livres de lecture", reponse: 24, unite: "livres" },
          { question: "Livres de géographie", reponse: 16, unite: "livres" },
          { question: "Dictionnaires", reponse: 12, unite: "dictionnaires" }
        ],
        theme: 'operations'
      },
      {
        id: 2,
        enonce: "Une voiture quitte Ngaoundéré à 19 h 45 min pour Douala où elle arrive le lendemain à 8 h 25 min. La voiture se déplace à 60 km/h.",
        sousQuestions: [
          "Quelle est la durée du voyage ?",
          "Quelle est la distance qui sépare Douala de Ngaoundéré ?"
        ],
        points: 10,
        reponses: [
          { question: "Durée du voyage", reponse: "12h40min" },
          { question: "Distance Ngaoundéré-Douala", reponse: 760, unite: "km" }
        ],
        theme: 'mesures'
      },
      {
        id: 3,
        enonce: "Sur un plan cadastral à l'échelle 1/1000, un champ en forme de trapèze mesure : grande base = 25 mm, petite base = 15 mm, hauteur = 12 mm. On récolte 15 tonnes de soja par an sur ce champ.",
        sousQuestions: [
          "Quelles sont les dimensions réelles du champ ?",
          "Quelle est la superficie du champ ?",
          "Quel est le rendement à l'are ?"
        ],
        points: 10,
        reponses: [
          { question: "Grande base réelle", reponse: 25, unite: "m" },
          { question: "Petite base réelle", reponse: 15, unite: "m" },
          { question: "Hauteur réelle", reponse: 12, unite: "m" },
          { question: "Superficie", reponse: 240, unite: "m²" },
          { question: "Rendement à l'are", reponse: 6250, unite: "kg/are" }
        ],
        theme: 'geometrie'
      },
      {
        id: 4,
        enonce: "Un éleveur possède une clôture mobile en grillage mesurant 128 m. Il veut limiter une surface à brouter pour ses chèvres. Il peut lui donner la forme d'un carré ou la forme d'un rectangle de 34 m de long.",
        sousQuestions: [
          "Calcule l'aire si la clôture forme un carré.",
          "Calcule l'aire si la clôture forme un rectangle de 34 m de long.",
          "Quelle forme doit-il choisir pour avoir la plus grande superficie ?"
        ],
        points: 10,
        reponses: [
          { question: "Aire du carré", reponse: 1024, unite: "m²" },
          { question: "Aire du rectangle", reponse: 1020, unite: "m²" },
          { question: "Forme à choisir", reponse: "carré" }
        ],
        theme: 'geometrie'
      },
      {
        id: 5,
        enonce: "Une camionnette vide pèse 750 kg. Pleine de sacs de riz de 50 kg chacun, elle pèse 3,15 tonnes.",
        sousQuestions: [
          "Quel est le poids net de la marchandise ?",
          "Combien de sacs de riz contient-elle ?"
        ],
        points: 10,
        reponses: [
          { question: "Poids net", reponse: 2400, unite: "kg" },
          { question: "Nombre de sacs", reponse: 48, unite: "sacs" }
        ],
        theme: 'mesures'
      }
    ]
  },

  // ==================== SUJET 2 ====================
  {
    id: 2,
    title: "Sujet 2",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Un car de transport part de Douala à 7 h 58 min à destination de Yaoundé. Il roule à la vitesse moyenne de 90 km/h. La distance Douala – Yaoundé est d'environ 276 km.",
        sousQuestions: [
          "Convertis la vitesse moyenne en mètres par seconde.",
          "Calcule la durée du voyage.",
          "À quelle heure arrive-t-il à Yaoundé ?"
        ],
        points: 10,
        reponses: [
          { question: "Vitesse en m/s", reponse: 25, unite: "m/s" },
          { question: "Durée du voyage", reponse: "3h04min" },
          { question: "Heure d'arrivée", reponse: "11h02min" }
        ],
        theme: 'mesures'
      },
      {
        id: 2,
        enonce: "M. SIMO partage son héritage de 32 600 000 F entre ses enfants TALLA, KONO et ESSO. KONO a 1 500 000 F de plus que TALLA et 2 000 000 F de moins que ESSO.",
        sousQuestions: [
          "Quelle est la part de TALLA ?",
          "Quelle est la part de KONO ?",
          "Quelle est la part de ESSO ?"
        ],
        points: 10,
        reponses: [
          { question: "Part de TALLA", reponse: 9200000, unite: "F" },
          { question: "Part de KONO", reponse: 10700000, unite: "F" },
          { question: "Part de ESSO", reponse: 12700000, unite: "F" }
        ],
        theme: 'problemes'
      },
      {
        id: 3,
        enonce: "TALLA place sa part de 9 200 000 F dans une banque au taux annuel de 6 %. Avec les intérêts, il veut acheter deux motocyclettes à 305 000 F l'une.",
        sousQuestions: [
          "Quel est le montant de l'intérêt au bout d'un an ?",
          "Quelle remise le vendeur devra-t-il accorder par moto pour que TALLA puisse acheter les deux ?"
        ],
        points: 10,
        reponses: [
          { question: "Intérêt annuel", reponse: 552000, unite: "F" },
          { question: "Remise par moto", reponse: 29000, unite: "F" }
        ],
        theme: 'fractions'
      },
      {
        id: 4,
        enonce: "TOTO achète un terrain trapézoïdal à 15 187 500 F, vendu à 6 750 F le m². La hauteur est de 46,875 m et la grande base vaut 5/3 de la petite base.",
        sousQuestions: [
          "Calcule la surface du terrain en m² et en ares.",
          "Détermine la petite base du terrain.",
          "Détermine la grande base du terrain."
        ],
        points: 10,
        reponses: [
          { question: "Surface en m²", reponse: 2250, unite: "m²" },
          { question: "Surface en ares", reponse: 22.5, unite: "ares" },
          { question: "Petite base", reponse: 36, unite: "m" },
          { question: "Grande base", reponse: 60, unite: "m" }
        ],
        theme: 'geometrie'
      },
      {
        id: 5,
        enonce: "L'agronome conseille à TOTO de fertiliser son terrain de 22,5 ares à raison de 1,6 t d'engrais à l'hectare. L'engrais se vend exclusivement en sacs de 50 kg.",
        sousQuestions: [
          "Calcule la masse d'engrais nécessaire en kg.",
          "Combien de sacs d'engrais doit-il acheter ?"
        ],
        points: 10,
        reponses: [
          { question: "Masse d'engrais", reponse: 360, unite: "kg" },
          { question: "Nombre de sacs", reponse: 8, unite: "sacs" }
        ],
        theme: 'mesures'
      }
    ]
  },

  // ==================== SUJET 3 ====================
  {
    id: 3,
    title: "Sujet 3",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Madame NDOUMBE décore une salle rectangulaire de 32 m de long et 24 m de large. Elle tend deux rangées de guirlandes. Pour une rangée, il faut une longueur supérieure au périmètre de 1/10 de ce périmètre. Elle a acheté 300 m de guirlande.",
        sousQuestions: [
          "Quel est le périmètre de la salle ?",
          "Quelle longueur de guirlande faut-il pour les deux rangées ?",
          "Quelle longueur lui restera-t-il ?"
        ],
        points: 10,
        reponses: [
          { question: "Périmètre", reponse: 112, unite: "m" },
          { question: "Longueur pour 2 rangées", reponse: 246.4, unite: "m" },
          { question: "Reste", reponse: 53.6, unite: "m" }
        ],
        theme: 'geometrie'
      },
      {
        id: 2,
        enonce: "Un vendeur ambulant achète 5000 crayons à 840 FCFA la douzaine. Il les vend à 90 FCFA la pièce.",
        sousQuestions: [
          "Quel est le prix d'achat total des crayons ?",
          "Quel est le prix de vente total ?",
          "Quel est le bénéfice total ?"
        ],
        points: 10,
        reponses: [
          { question: "Prix d'achat total", reponse: 350000, unite: "F" },
          { question: "Prix de vente total", reponse: 450000, unite: "F" },
          { question: "Bénéfice total", reponse: 100000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 3,
        enonce: "Le vendeur de crayons place son bénéfice de 100 000 F à un taux de 5 % pendant 18 mois.",
        sousQuestions: [
          "Quel est le bénéfice par crayon ?",
          "Quel intérêt produira le placement ?"
        ],
        points: 10,
        reponses: [
          { question: "Bénéfice par crayon", reponse: 20, unite: "F" },
          { question: "Intérêt", reponse: 7500, unite: "F" }
        ],
        theme: 'fractions'
      },
      {
        id: 4,
        enonce: "Les élèves d'une école aménagent un sautoir en creusant le sol sur 5 m de long, 2,9 m de large et 0,3 m de profondeur. Le m³ de sable coûte 6 800 FCFA et le transport est évalué à 1 300 FCFA.",
        sousQuestions: [
          "Calcule le volume de sable nécessaire.",
          "À combien reviendra ce sable (achat + transport) ?"
        ],
        points: 10,
        reponses: [
          { question: "Volume de sable", reponse: 4.35, unite: "m³" },
          { question: "Coût total", reponse: 30880, unite: "F" }
        ],
        theme: 'geometrie'
      },
      {
        id: 5,
        enonce: "Une ménagère achète 12 serviettes à 1 050 FCFA l'une et 5,5 m de tissu à 1 200 FCFA le mètre. Cette dépense représente 45 % de son argent.",
        sousQuestions: [
          "Combien a-t-elle dépensé ?",
          "Combien avait-elle emporté ?"
        ],
        points: 10,
        reponses: [
          { question: "Dépense totale", reponse: 19200, unite: "F" },
          { question: "Argent emporté", reponse: 42667, unite: "F" }
        ],
        theme: 'fractions'
      }
    ]
  },

  // ==================== SUJET 4 ====================
  {
    id: 4,
    title: "Sujet 4",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Louis achète une voiture de 4 500 000 FCFA. Il paie 3 000 000 FCFA à l'achat. Il versera le reste augmenté de 10 % en 10 mensualités.",
        sousQuestions: [
          "Quelle somme reste-t-il à payer après l'achat ?",
          "Quelle somme totale doit-il encore verser (avec les 10 %) ?",
          "Quel est le montant d'une mensualité ?"
        ],
        points: 10,
        reponses: [
          { question: "Reste à payer", reponse: 1500000, unite: "F" },
          { question: "Total avec intérêts", reponse: 1650000, unite: "F" },
          { question: "Mensualité", reponse: 165000, unite: "F" }
        ],
        theme: 'fractions'
      },
      {
        id: 2,
        enonce: "Un vase vide pèse 0,4 kg. À moitié plein d'eau, il pèse 1,7 kg.",
        sousQuestions: [
          "Quel est le poids de l'eau qui le remplit à moitié ?",
          "Quel est le poids de l'eau qui le remplit entièrement ?",
          "Quel est le poids du vase plein d'eau ?",
          "Combien de bouteilles de 0,125 litre faut-il pour remplir ce vase ?"
        ],
        points: 10,
        reponses: [
          { question: "Poids eau (moitié)", reponse: 1.3, unite: "kg" },
          { question: "Poids eau (plein)", reponse: 2.6, unite: "kg" },
          { question: "Poids vase plein", reponse: 3, unite: "kg" },
          { question: "Nombre de bouteilles", reponse: 21, unite: "bouteilles" }
        ],
        theme: 'mesures'
      },
      {
        id: 3,
        enonce: "On partage 5 600 F entre Marie, Danielle et Isabelle. Marie a 600 F de plus que Danielle, et Danielle a 250 F de plus qu'Isabelle.",
        sousQuestions: [
          "Quelle est la part d'Isabelle ?",
          "Quelle est la part de Danielle ?",
          "Quelle est la part de Marie ?"
        ],
        points: 10,
        reponses: [
          { question: "Part d'Isabelle", reponse: 1450, unite: "F" },
          { question: "Part de Danielle", reponse: 1700, unite: "F" },
          { question: "Part de Marie", reponse: 2450, unite: "F" }
        ],
        theme: 'problemes'
      },
      {
        id: 4,
        enonce: "Un cultivateur a récolté un sac de riz de 150 kg. Il peut vendre le sac entier à 6 000 F ou le vendre au détail à 45 F le kg.",
        sousQuestions: [
          "Combien gagne-t-il en vendant au détail ?",
          "Quelle est la solution la plus avantageuse ?",
          "Combien gagne-t-il de plus avec cette solution ?"
        ],
        points: 10,
        reponses: [
          { question: "Vente au détail", reponse: 6750, unite: "F" },
          { question: "Solution avantageuse", reponse: "détail" },
          { question: "Gain supplémentaire", reponse: 750, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 5,
        enonce: "Sur un plan à l'échelle 1/2500, un champ trapézoïdal mesure : grande base = 120 mm, petite base = 60 mm, hauteur = 50 mm. Jean et Paul se partagent ce champ, Paul ayant le double de Jean.",
        sousQuestions: [
          "Quelle est la surface réelle du champ en m² ?",
          "Quelle est la surface du champ en ares ?",
          "Quelle est la superficie de Jean ?",
          "Quelle est la superficie de Paul ?"
        ],
        points: 10,
        reponses: [
          { question: "Surface en m²", reponse: 28125, unite: "m²" },
          { question: "Surface en ares", reponse: 281.25, unite: "ares" },
          { question: "Surface de Jean", reponse: 93.75, unite: "ares" },
          { question: "Surface de Paul", reponse: 187.5, unite: "ares" }
        ],
        theme: 'geometrie'
      }
    ]
  },

  // ==================== SUJET 5 ====================
  {
    id: 5,
    title: "Sujet 5",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Un réservoir en forme de pavé droit contient 92 160 litres d'eau. Sa base rectangulaire mesure 80 dm sur 64 dm. Une vanne permet d'écouler 16 litres par seconde.",
        sousQuestions: [
          "Quelle est la hauteur d'eau dans ce réservoir (en dm) ?",
          "Quelle est la durée nécessaire pour vider le réservoir (en heures) ?"
        ],
        points: 10,
        reponses: [
          { question: "Hauteur d'eau", reponse: 18, unite: "dm" },
          { question: "Durée pour vider", reponse: 1.6, unite: "heures" }
        ],
        theme: 'mesures'
      },
      {
        id: 2,
        enonce: "En 5 minutes, un piéton fait 600 pas de 80 cm chacun.",
        sousQuestions: [
          "Quelle distance a-t-il parcourue en mètres ?",
          "Quelle est sa vitesse moyenne en m/s ?"
        ],
        points: 10,
        reponses: [
          { question: "Distance parcourue", reponse: 480, unite: "m" },
          { question: "Vitesse moyenne", reponse: 1.6, unite: "m/s" }
        ],
        theme: 'mesures'
      },
      {
        id: 3,
        enonce: "Après une remise de 20 %, une robe coûte 12 000 F.",
        sousQuestions: [
          "Quel était le prix de la robe avant la remise ?",
          "Quel est le montant de la remise ?"
        ],
        points: 10,
        reponses: [
          { question: "Prix avant remise", reponse: 15000, unite: "F" },
          { question: "Montant de la remise", reponse: 3000, unite: "F" }
        ],
        theme: 'fractions'
      },
      {
        id: 4,
        enonce: "Une plantation rectangulaire de 450 m sur 250 m est représentée sur une carte à l'échelle 1/2500. Etéki achète cette plantation à 400 000 F l'hectare.",
        sousQuestions: [
          "Quelles sont les dimensions de la plantation sur la carte (en cm) ?",
          "Quelle est la superficie de la plantation en hectares ?",
          "Combien Etéki paiera-t-il ?"
        ],
        points: 10,
        reponses: [
          { question: "Longueur sur carte", reponse: 18, unite: "cm" },
          { question: "Largeur sur carte", reponse: 10, unite: "cm" },
          { question: "Superficie", reponse: 11.25, unite: "ha" },
          { question: "Prix d'achat", reponse: 4500000, unite: "F" }
        ],
        theme: 'geometrie'
      },
      {
        id: 5,
        enonce: "Etéki veut clôturer sa plantation (450 m × 250 m) en laissant une ouverture de 5 m pour le portail. Le mètre de clôture coûte 2 100 F, avec une réduction de 10 %.",
        sousQuestions: [
          "Quelle est la longueur totale de la clôture ?",
          "Quel est le prix de revient de la clôture ?"
        ],
        points: 10,
        reponses: [
          { question: "Longueur clôture", reponse: 1395, unite: "m" },
          { question: "Prix de revient", reponse: 2636550, unite: "F" }
        ],
        theme: 'geometrie'
      }
    ]
  },

  // ==================== SUJET 6 ====================
  {
    id: 6,
    title: "Sujet 6",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "La cour de l'immeuble de Joël est un carré de 9 m de côté. Au centre, il y a une piscine circulaire de 6 m de diamètre. Le maçon demande 5 000 F par m² pour cimenter la surface autour de la piscine. (π ≈ 3,14)",
        sousQuestions: [
          "Quelle est l'aire de la cour carrée ?",
          "Quelle est l'aire de la piscine ?",
          "Quelle est l'aire à cimenter ?",
          "Combien Joël doit-il payer au maçon ?"
        ],
        points: 10,
        reponses: [
          { question: "Aire de la cour", reponse: 81, unite: "m²" },
          { question: "Aire de la piscine", reponse: 28.26, unite: "m²" },
          { question: "Aire à cimenter", reponse: 52.74, unite: "m²" },
          { question: "Prix à payer", reponse: 263700, unite: "F" }
        ],
        theme: 'geometrie'
      },
      {
        id: 2,
        enonce: "Après la vente de son cacao, MBAH place 45 % de son gain dans une banque au taux annuel de 5 %. Après un an et demi, les intérêts s'élèvent à 10 500 F.",
        sousQuestions: [
          "Quelle somme MBAH avait-il placée ?",
          "Quel était son gain total de la vente du cacao ?"
        ],
        points: 10,
        reponses: [
          { question: "Somme placée", reponse: 140000, unite: "F" },
          { question: "Gain total", reponse: 311111, unite: "F" }
        ],
        theme: 'fractions'
      },
      {
        id: 3,
        enonce: "Un gâteau et un paquet de bonbons ont été achetés à 3 600 F. Le gâteau a coûté 3 fois plus que le paquet de bonbons.",
        sousQuestions: [
          "Quel est le prix du paquet de bonbons ?",
          "Quel est le prix du gâteau ?"
        ],
        points: 10,
        reponses: [
          { question: "Prix des bonbons", reponse: 900, unite: "F" },
          { question: "Prix du gâteau", reponse: 2700, unite: "F" }
        ],
        theme: 'problemes'
      },
      {
        id: 4,
        enonce: "Un marchand reçoit un carton de 45 kg de mandarines. Le 1/5 est invendable. Le prix d'achat total est de 4 200 F. Il veut réaliser un bénéfice de 15 % sur le prix d'achat.",
        sousQuestions: [
          "Quelle masse de mandarines peut-il vendre ?",
          "Quel montant total doit-il obtenir de la vente ?",
          "À quel prix doit-il vendre le kg de mandarines ?"
        ],
        points: 10,
        reponses: [
          { question: "Masse vendable", reponse: 36, unite: "kg" },
          { question: "Montant à obtenir", reponse: 4830, unite: "F" },
          { question: "Prix au kg", reponse: 134.17, unite: "F" }
        ],
        theme: 'fractions'
      },
      {
        id: 5,
        enonce: "Ton oncle construit une piscine parallélépipédique de 7 m de long, 4 m de large et 2,5 m de profondeur. Le volume de terre remuée augmente de 4 %. Il revend la terre à 500 F le m³.",
        sousQuestions: [
          "Quel est le volume initial du trou ?",
          "Quel volume de terre obtient-on après foisonnement ?",
          "À combien vendra-t-il cette terre ?"
        ],
        points: 10,
        reponses: [
          { question: "Volume initial", reponse: 70, unite: "m³" },
          { question: "Volume après foisonnement", reponse: 72.8, unite: "m³" },
          { question: "Prix de vente terre", reponse: 36400, unite: "F" }
        ],
        theme: 'geometrie'
      }
    ]
  },

  // ==================== SUJET 7 ====================
  {
    id: 7,
    title: "Sujet 7",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Un parc municipal rectangulaire mesure 30 m sur 20 m. On veut y planter du gazon à 1 300 F/m² avec une main d'œuvre de 35 000 F. Une clôture entoure le parc avec une entrée de 2 m.",
        sousQuestions: [
          "Quelle est l'aire du parc ?",
          "Quel est le coût total (gazon + main d'œuvre) ?",
          "Quelle est la longueur de la clôture ?"
        ],
        points: 10,
        reponses: [
          { question: "Aire du parc", reponse: 600, unite: "m²" },
          { question: "Coût total", reponse: 815000, unite: "F" },
          { question: "Longueur clôture", reponse: 98, unite: "m" }
        ],
        theme: 'geometrie'
      },
      {
        id: 2,
        enonce: "Un trajet Bertoua-Edéa : le compteur affiche 418 526 km au départ et 419 201 km à l'arrivée. Départ à 19 h 25, arrivée à 4 h 25 le lendemain.",
        sousQuestions: [
          "Quelle est la distance parcourue ?",
          "Quelle est la durée du trajet ?",
          "Quelle est la vitesse moyenne ?"
        ],
        points: 10,
        reponses: [
          { question: "Distance", reponse: 675, unite: "km" },
          { question: "Durée", reponse: "9h" },
          { question: "Vitesse moyenne", reponse: 75, unite: "km/h" }
        ],
        theme: 'mesures'
      },
      {
        id: 3,
        enonce: "Un repas de fête pour 12 amis comprend : 12 poissons à 3 000 F l'un, 2 pizzas à 7 000 F l'une, 1 gâteau à 3 280 F et 3 bouteilles de vin à 9 000 F l'une.",
        sousQuestions: [
          "Quel est le coût total du repas ?",
          "Quelle est la part de chaque convive ?"
        ],
        points: 10,
        reponses: [
          { question: "Coût total", reponse: 77280, unite: "F" },
          { question: "Part par convive", reponse: 6440, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 4,
        enonce: "Lors d'un concours de musique avec 300 votants : Maalox obtient 40 %, Mink's obtient 5 %, Tenor obtient le reste.",
        sousQuestions: [
          "Combien de voix a obtenu Maalox ?",
          "Combien de voix a obtenu Mink's ?",
          "Combien de voix a obtenu Tenor ?",
          "Qui est le vainqueur ?"
        ],
        points: 10,
        reponses: [
          { question: "Voix Maalox", reponse: 120, unite: "voix" },
          { question: "Voix Mink's", reponse: 15, unite: "voix" },
          { question: "Voix Tenor", reponse: 165, unite: "voix" },
          { question: "Vainqueur", reponse: "Tenor" }
        ],
        theme: 'fractions'
      },
      {
        id: 5,
        enonce: "Un terrain trapézoïdal a une grande base de 90 m. La petite base vaut 2/3 de la grande base. La hauteur vaut 1/2 de la petite base.",
        sousQuestions: [
          "Quelle est la mesure de la petite base ?",
          "Quelle est la mesure de la hauteur ?",
          "Quelle est l'aire du terrain ?"
        ],
        points: 10,
        reponses: [
          { question: "Petite base", reponse: 60, unite: "m" },
          { question: "Hauteur", reponse: 30, unite: "m" },
          { question: "Aire", reponse: 2250, unite: "m²" }
        ],
        theme: 'geometrie'
      }
    ]
  },

  // ==================== SUJET 8 ====================
  {
    id: 8,
    title: "Sujet 8",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Une plantation rectangulaire de 50 m sur 30 m est traversée par deux allées perpendiculaires de 10 m de large formant une croix. On veut y mettre du sable sur 50 cm d'épaisseur.",
        sousQuestions: [
          "Quelle est la surface totale de la plantation ?",
          "Quelle est la surface des allées ?",
          "Quel volume de sable faut-il ?"
        ],
        points: 10,
        reponses: [
          { question: "Surface plantation", reponse: 1500, unite: "m²" },
          { question: "Surface allées", reponse: 700, unite: "m²" },
          { question: "Volume sable", reponse: 350, unite: "m³" }
        ],
        theme: 'geometrie'
      },
      {
        id: 2,
        enonce: "Une télévision coûte 180 000 F. Option 1 : paiement comptant avec remise de 5 %. Option 2 : crédit avec 50 000 F d'apport puis 3 mensualités de 45 000 F.",
        sousQuestions: [
          "Quel est le prix avec l'option 1 ?",
          "Quel est le prix total avec l'option 2 ?",
          "Quelle est l'option la plus avantageuse ?",
          "Quelle est la différence de prix ?"
        ],
        points: 10,
        reponses: [
          { question: "Prix option 1", reponse: 171000, unite: "F" },
          { question: "Prix option 2", reponse: 185000, unite: "F" },
          { question: "Option avantageuse", reponse: "option 1" },
          { question: "Différence", reponse: 14000, unite: "F" }
        ],
        theme: 'fractions'
      },
      {
        id: 3,
        enonce: "Une poupée coûte 20 000 F. En juin, son prix augmente de 15 %. En décembre, il augmente encore de 15 %.",
        sousQuestions: [
          "Quel est le prix après la hausse de juin ?",
          "Quel est le prix final après décembre ?",
          "L'augmentation totale est-elle de 30 % ? Justifie."
        ],
        points: 10,
        reponses: [
          { question: "Prix après juin", reponse: 23000, unite: "F" },
          { question: "Prix final", reponse: 26450, unite: "F" },
          { question: "Augmentation totale", reponse: "Non, 32,25%" }
        ],
        theme: 'fractions'
      },
      {
        id: 4,
        enonce: "Une chemise coûte 3 000 F. Vendeur A : baisse de 30 % puis réduction supplémentaire de 20 %. Vendeur B : réduction unique de 48 %.",
        sousQuestions: [
          "Quel est le prix chez le vendeur A ?",
          "Quel est le prix chez le vendeur B ?",
          "Chez quel vendeur acheter ?"
        ],
        points: 10,
        reponses: [
          { question: "Prix vendeur A", reponse: 1680, unite: "F" },
          { question: "Prix vendeur B", reponse: 1560, unite: "F" },
          { question: "Vendeur à choisir", reponse: "vendeur B" }
        ],
        theme: 'fractions'
      },
      {
        id: 5,
        enonce: "On plante des cocotiers tous les 5 m sur le pourtour d'une plantation rectangulaire de 50 m sur 30 m.",
        sousQuestions: [
          "Quel est le périmètre de la plantation ?",
          "Combien de cocotiers faut-il planter ?"
        ],
        points: 10,
        reponses: [
          { question: "Périmètre", reponse: 160, unite: "m" },
          { question: "Nombre cocotiers", reponse: 32, unite: "cocotiers" }
        ],
        theme: 'geometrie'
      }
    ]
  },

  // ==================== SUJET 9 ====================
  {
    id: 9,
    title: "Sujet 9",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Dans une usine : 10 crayons forment 1 pochette, 10 pochettes forment 1 boîte, 10 boîtes forment 1 caisse.",
        sousQuestions: [
          "Combien de pochettes peut-on faire avec 30 crayons ?",
          "Combien de boîtes peut-on faire avec 250 crayons ?",
          "Comment ranger 2 706 crayons (caisses, boîtes, pochettes, crayons) ?"
        ],
        points: 10,
        reponses: [
          { question: "Pochettes pour 30", reponse: 3, unite: "pochettes" },
          { question: "Boîtes pour 250", reponse: 2, unite: "boîtes" },
          { question: "Rangement 2706", reponse: "2 caisses, 7 boîtes, 0 pochettes, 6 crayons" }
        ],
        theme: 'numeration'
      },
      {
        id: 2,
        enonce: "Un bassin cubique a une arête de 1,20 m. On veut carreler le fond et les parois avec des carreaux de 25 cm de côté. Un paquet de 25 carreaux coûte 5 300 F.",
        sousQuestions: [
          "Quelle est l'aire du fond du bassin ?",
          "Quelle est l'aire totale à carreler (fond + 4 parois) ?",
          "Combien de carreaux faut-il ?",
          "Combien coûtera le carrelage ?"
        ],
        points: 10,
        reponses: [
          { question: "Aire du fond", reponse: 1.44, unite: "m²" },
          { question: "Aire totale", reponse: 7.2, unite: "m²" },
          { question: "Nombre de carreaux", reponse: 115, unite: "carreaux" },
          { question: "Coût carrelage", reponse: 26500, unite: "F" }
        ],
        theme: 'geometrie'
      },
      {
        id: 3,
        enonce: "Une robe coûte 95 000 F. Option A : remise de 20 %. Option B : apport de 1/4 puis le reste majoré de 8 % payé en 5 mensualités.",
        sousQuestions: [
          "Quel est le prix avec l'option A ?",
          "Quel est le montant de l'apport avec l'option B ?",
          "Quel est le prix total avec l'option B ?"
        ],
        points: 10,
        reponses: [
          { question: "Prix option A", reponse: 76000, unite: "F" },
          { question: "Apport option B", reponse: 23750, unite: "F" },
          { question: "Prix total option B", reponse: 100620, unite: "F" }
        ],
        theme: 'fractions'
      },
      {
        id: 4,
        enonce: "Moussa achète une voiture d'occasion à 1 250 000 F. Il change les 4 pneus à 18 500 F l'un et fait des réparations pour 360 000 F. Il revend la voiture à 1 850 000 F.",
        sousQuestions: [
          "Quel est le coût total des pneus ?",
          "Quel est le prix de revient total ?",
          "A-t-il fait un bénéfice ou une perte ? De combien ?"
        ],
        points: 10,
        reponses: [
          { question: "Coût pneus", reponse: 74000, unite: "F" },
          { question: "Prix de revient", reponse: 1684000, unite: "F" },
          { question: "Bénéfice", reponse: 166000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 5,
        enonce: "On compare l'aire d'un rectangle de 25 m sur 12 m et celle d'un cercle de 14 m de diamètre. (π ≈ 3,14)",
        sousQuestions: [
          "Quelle est l'aire du rectangle ?",
          "Quelle est l'aire du cercle ?",
          "Quelle figure a la plus grande aire ?",
          "De combien ?"
        ],
        points: 10,
        reponses: [
          { question: "Aire rectangle", reponse: 300, unite: "m²" },
          { question: "Aire cercle", reponse: 153.86, unite: "m²" },
          { question: "Plus grande aire", reponse: "rectangle" },
          { question: "Différence", reponse: 146.14, unite: "m²" }
        ],
        theme: 'geometrie'
      }
    ]
  },

  // ==================== SUJET 10 ====================
  {
    id: 10,
    title: "Sujet 10",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Un aviculteur achète 500 poussins à 450 F l'un. La mortalité est de 6 %. Il dépense 15 sacs d'aliment à 14 500 F et 85 000 F en soins. Il vend les poulets survivants à 3 500 F pièce.",
        sousQuestions: [
          "Combien de poulets reste-t-il après la mortalité ?",
          "Quel est le prix de revient total ?",
          "Quel est le montant de la vente ?",
          "Quel est le bénéfice ?"
        ],
        points: 10,
        reponses: [
          { question: "Poulets survivants", reponse: 470, unite: "poulets" },
          { question: "Prix de revient", reponse: 527500, unite: "F" },
          { question: "Montant vente", reponse: 1645000, unite: "F" },
          { question: "Bénéfice", reponse: 1117500, unite: "F" }
        ],
        theme: 'problemes'
      },
      {
        id: 2,
        enonce: "Un arroseur débite 450 litres d'eau à l'heure. Il fonctionne de 21 h à 6 h du matin.",
        sousQuestions: [
          "Quelle est la durée de fonctionnement ?",
          "Quel volume d'eau a-t-il évacué ?"
        ],
        points: 10,
        reponses: [
          { question: "Durée", reponse: 9, unite: "heures" },
          { question: "Volume évacué", reponse: 4050, unite: "litres" }
        ],
        theme: 'mesures'
      },
      {
        id: 3,
        enonce: "L'eau de l'arroseur (4 050 L) est recueillie dans un bassin de 7,5 m de long, 2 m de large et 0,8 m de profondeur.",
        sousQuestions: [
          "Quel est le volume du bassin en litres ?",
          "Quelle est la hauteur d'eau dans le bassin ?",
          "Quelle quantité d'eau manque pour remplir le bassin ?"
        ],
        points: 10,
        reponses: [
          { question: "Volume bassin", reponse: 12000, unite: "L" },
          { question: "Hauteur d'eau", reponse: 0.27, unite: "m" },
          { question: "Eau manquante", reponse: 7950, unite: "L" }
        ],
        theme: 'geometrie'
      },
      {
        id: 4,
        enonce: "Sur le plan d'une concession à l'échelle 1/1000, on lit : longueur 76 mm, largeur 56 mm. L'oncle pense que sa concession fait 40 ares.",
        sousQuestions: [
          "Quelle est la forme de la concession ?",
          "Quelles sont les dimensions réelles ?",
          "Quelle est la surface réelle en ares ?",
          "L'oncle a-t-il raison ?"
        ],
        points: 10,
        reponses: [
          { question: "Forme", reponse: "rectangle" },
          { question: "Longueur réelle", reponse: 76, unite: "m" },
          { question: "Largeur réelle", reponse: 56, unite: "m" },
          { question: "Surface", reponse: 42.56, unite: "ares" },
          { question: "Oncle raison", reponse: "Non" }
        ],
        theme: 'geometrie'
      },
      {
        id: 5,
        enonce: "Un agriculteur récolte 8 000 kg de riz. Il garde 3/10 pour sa consommation et vend le reste à 700 F le kg.",
        sousQuestions: [
          "Quelle quantité garde-t-il pour sa consommation ?",
          "Quelle quantité vend-il ?",
          "À combien s'élève la vente ?"
        ],
        points: 10,
        reponses: [
          { question: "Consommation", reponse: 2400, unite: "kg" },
          { question: "Quantité vendue", reponse: 5600, unite: "kg" },
          { question: "Montant vente", reponse: 3920000, unite: "F" }
        ],
        theme: 'fractions'
      }
    ]
  },

  // ==================== SUJET 11 ====================
  {
    id: 11,
    title: "Sujet 11",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Une boîte cubique mesure 22 cm d'arête.",
        sousQuestions: [
          "Quel est son volume en cm³ ?",
          "Quelle est sa contenance en litres ?"
        ],
        points: 10,
        reponses: [
          { question: "Volume", reponse: 10648, unite: "cm³" },
          { question: "Contenance", reponse: 10.648, unite: "L" }
        ],
        theme: 'geometrie'
      },
      {
        id: 2,
        enonce: "Un ouvrier est payé 1 760 F par semaine de 40 h et 500 F par heure supplémentaire. Cette semaine : lundi 9 h, mardi 10 h, mercredi 10 h, jeudi 11 h, vendredi 7 h. On lui retient 4 500 F de cotisation.",
        sousQuestions: [
          "Combien d'heures a-t-il travaillé ?",
          "Combien d'heures supplémentaires ?",
          "Quel est son salaire brut ?",
          "Quel est son salaire net ?"
        ],
        points: 10,
        reponses: [
          { question: "Heures travaillées", reponse: 47, unite: "h" },
          { question: "Heures sup", reponse: 7, unite: "h" },
          { question: "Salaire brut", reponse: 5260, unite: "F" },
          { question: "Salaire net", reponse: 760, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 3,
        enonce: "Un épicier reçoit 3 quintaux de pommes de terre. Il met le quart en sacs de 5 kg.",
        sousQuestions: [
          "Quelle est la masse totale en kg ?",
          "Quelle masse met-il en sacs ?",
          "Combien de sacs remplit-il ?"
        ],
        points: 10,
        reponses: [
          { question: "Masse totale", reponse: 300, unite: "kg" },
          { question: "Masse en sacs", reponse: 75, unite: "kg" },
          { question: "Nombre de sacs", reponse: 15, unite: "sacs" }
        ],
        theme: 'mesures'
      },
      {
        id: 4,
        enonce: "Un cycliste parcourt 144 km en 4 h 30 min.",
        sousQuestions: [
          "Quelle est sa vitesse moyenne en km/h ?",
          "Quelle distance parcourra-t-il en 2 h 50 min à cette vitesse ?"
        ],
        points: 10,
        reponses: [
          { question: "Vitesse moyenne", reponse: 32, unite: "km/h" },
          { question: "Distance en 2h50", reponse: 90.67, unite: "km" }
        ],
        theme: 'mesures'
      },
      {
        id: 5,
        enonce: "Un champ trapézoïdal a une grande base de 120 m, une petite base égale aux 2/3 de la grande base, et une hauteur de 60 m. Ce champ produit 2,5 t de blé à l'hectare, vendu à 80 F le kg.",
        sousQuestions: [
          "Quelle est la mesure de la petite base ?",
          "Quelle est la surface du champ en ares ?",
          "Quelle est la masse totale de la récolte ?",
          "Quel est le prix de vente total ?"
        ],
        points: 10,
        reponses: [
          { question: "Petite base", reponse: 80, unite: "m" },
          { question: "Surface", reponse: 60, unite: "ares" },
          { question: "Masse récolte", reponse: 1500, unite: "kg" },
          { question: "Prix de vente", reponse: 120000, unite: "F" }
        ],
        theme: 'geometrie'
      }
    ]
  },

  // ==================== SUJET 12 ====================
  {
    id: 12,
    title: "Sujet 12",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Un tonneau plein de vin pèse 240 kg. Vide, il pèse 24 kg. Un litre de vin pèse 0,900 kg et se vend à 350 F.",
        sousQuestions: [
          "Quelle est la masse du vin ?",
          "Quelle est la capacité du tonneau en litres ?",
          "Quel est le prix de vente du vin ?"
        ],
        points: 10,
        reponses: [
          { question: "Masse du vin", reponse: 216, unite: "kg" },
          { question: "Capacité", reponse: 240, unite: "L" },
          { question: "Prix de vente", reponse: 84000, unite: "F" }
        ],
        theme: 'mesures'
      },
      {
        id: 2,
        enonce: "Un terrain rectangulaire a une longueur de 450 m et une largeur égale aux 2/3 de la longueur. On l'entoure de 3 rangées de fil de fer avec une porte de 4 m. On plante des piquets tous les 5 m (un de chaque côté de la porte).",
        sousQuestions: [
          "Quelle est la largeur du terrain ?",
          "Quelle est la longueur totale de fil de fer ?",
          "Combien de piquets faut-il ?"
        ],
        points: 10,
        reponses: [
          { question: "Largeur", reponse: 300, unite: "m" },
          { question: "Fil de fer", reponse: 4488, unite: "m" },
          { question: "Nombre piquets", reponse: 302, unite: "piquets" }
        ],
        theme: 'geometrie'
      },
      {
        id: 3,
        enonce: "La coopérative d'une école compte 145 élèves qui versent chacun 250 F. Elle achète 4 ballons à 4 500 F l'un et 14 maillots à 1 200 F l'un.",
        sousQuestions: [
          "Quel est le montant total des cotisations ?",
          "Quel est le montant total des achats ?",
          "Quelle somme reste-t-il dans la caisse ?"
        ],
        points: 10,
        reponses: [
          { question: "Cotisations", reponse: 36250, unite: "F" },
          { question: "Achats", reponse: 34800, unite: "F" },
          { question: "Reste", reponse: 1450, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 4,
        enonce: "Un bassin circulaire a 4 m de diamètre et 1,50 m de profondeur. On le remplit avec un robinet débitant 25 L par minute. (π ≈ 3,14)",
        sousQuestions: [
          "Quelle est la surface de base du bassin ?",
          "Quel est le volume du bassin en m³ ?",
          "Quelle est sa capacité en litres ?",
          "Combien de temps faut-il pour le remplir ?"
        ],
        points: 10,
        reponses: [
          { question: "Surface base", reponse: 12.56, unite: "m²" },
          { question: "Volume", reponse: 18.84, unite: "m³" },
          { question: "Capacité", reponse: 18840, unite: "L" },
          { question: "Temps remplissage", reponse: "12h34min" }
        ],
        theme: 'geometrie'
      },
      {
        id: 5,
        enonce: "Un marchand de tissus achète 3 pièces de 25 m chacune pour 45 000 F au total. Il revend 1/3 à 800 F le mètre et le reste à 750 F le mètre.",
        sousQuestions: [
          "Quel est le prix d'achat d'un mètre ?",
          "Quelle longueur vend-il à 800 F ?",
          "Quel est le montant total de la vente ?",
          "Quel est son bénéfice ?"
        ],
        points: 10,
        reponses: [
          { question: "Prix achat/m", reponse: 600, unite: "F" },
          { question: "Longueur à 800 F", reponse: 25, unite: "m" },
          { question: "Montant vente", reponse: 57500, unite: "F" },
          { question: "Bénéfice", reponse: 12500, unite: "F" }
        ],
        theme: 'operations'
      }
    ]
  },

  // ==================== SUJET 13 ====================
  {
    id: 13,
    title: "Sujet 13",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Un champ carré a un périmètre de 240 m. Son propriétaire l'échange contre un terrain rectangulaire de même surface mais de 80 m de long.",
        sousQuestions: [
          "Quel est le côté du carré ?",
          "Quelle est la surface du carré en ares ?",
          "Quelle est la largeur du rectangle ?",
          "Quel est le périmètre du rectangle ?"
        ],
        points: 10,
        reponses: [
          { question: "Côté carré", reponse: 60, unite: "m" },
          { question: "Surface", reponse: 36, unite: "ares" },
          { question: "Largeur rectangle", reponse: 45, unite: "m" },
          { question: "Périmètre rectangle", reponse: 250, unite: "m" }
        ],
        theme: 'geometrie'
      },
      {
        id: 2,
        enonce: "Un ouvrier gagne 65 000 F par mois et dépense 48 500 F pour sa nourriture et son logement. Il veut s'acheter une moto à 495 000 F.",
        sousQuestions: [
          "Quelle est son économie mensuelle ?",
          "Quelle sera son économie annuelle ?",
          "Combien de mois devra-t-il économiser pour la moto ?"
        ],
        points: 10,
        reponses: [
          { question: "Économie mensuelle", reponse: 16500, unite: "F" },
          { question: "Économie annuelle", reponse: 198000, unite: "F" },
          { question: "Mois nécessaires", reponse: 30, unite: "mois" }
        ],
        theme: 'operations'
      },
      {
        id: 3,
        enonce: "Une cour trapézoïdale a des bases de 25 m et 20 m, et une hauteur de 12 m. On veut la paver avec des dalles carrées de 20 cm de côté.",
        sousQuestions: [
          "Quelle est la surface de la cour ?",
          "Quelle est la surface d'une dalle en m² ?",
          "Combien de dalles faut-il ?"
        ],
        points: 10,
        reponses: [
          { question: "Surface cour", reponse: 270, unite: "m²" },
          { question: "Surface dalle", reponse: 0.04, unite: "m²" },
          { question: "Nombre dalles", reponse: 6750, unite: "dalles" }
        ],
        theme: 'geometrie'
      },
      {
        id: 4,
        enonce: "Un éleveur vend 15 bœufs à 125 000 F l'un. Il place cette somme à la banque au taux de 6 % par an.",
        sousQuestions: [
          "Quel est le prix de vente total ?",
          "Quel est l'intérêt au bout d'un an ?",
          "Quel est l'intérêt au bout de 15 mois ?"
        ],
        points: 10,
        reponses: [
          { question: "Prix de vente", reponse: 1875000, unite: "F" },
          { question: "Intérêt 1 an", reponse: 112500, unite: "F" },
          { question: "Intérêt 15 mois", reponse: 140625, unite: "F" }
        ],
        theme: 'fractions'
      },
      {
        id: 5,
        enonce: "Sur un plan à l'échelle 1/2500, un terrain rectangulaire mesure 8 cm sur 5 cm.",
        sousQuestions: [
          "Quelles sont les dimensions réelles en mètres ?",
          "Quel est le périmètre réel ?",
          "Quelle est la surface réelle en ares ?",
          "Quelle est la surface en hectares ?"
        ],
        points: 10,
        reponses: [
          { question: "Longueur réelle", reponse: 200, unite: "m" },
          { question: "Largeur réelle", reponse: 125, unite: "m" },
          { question: "Périmètre", reponse: 650, unite: "m" },
          { question: "Surface ares", reponse: 250, unite: "ares" },
          { question: "Surface ha", reponse: 2.5, unite: "ha" }
        ],
        theme: 'geometrie'
      }
    ]
  },

  // ==================== SUJET 14 ====================
  {
    id: 14,
    title: "Sujet 14",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Une ménagère achète : 3 kg de viande à 1 800 F/kg, 5 kg de riz à 450 F/kg, 2 L d'huile à 900 F/L. Elle paie avec un billet de 10 000 F.",
        sousQuestions: [
          "Quel est le montant total des achats ?",
          "Combien doit-on lui rendre ?"
        ],
        points: 10,
        reponses: [
          { question: "Montant achats", reponse: 9450, unite: "F" },
          { question: "Monnaie rendue", reponse: 550, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 2,
        enonce: "Une citerne cylindrique a 2 m de diamètre et 3 m de hauteur. On veut peindre l'intérieur (fond + paroi latérale). (π ≈ 3,14)",
        sousQuestions: [
          "Quelle est la surface latérale ?",
          "Quelle est la surface du fond ?",
          "Quelle est la surface totale à peindre ?",
          "Quel est le volume de la citerne ?"
        ],
        points: 10,
        reponses: [
          { question: "Surface latérale", reponse: 18.84, unite: "m²" },
          { question: "Surface fond", reponse: 3.14, unite: "m²" },
          { question: "Surface à peindre", reponse: 21.98, unite: "m²" },
          { question: "Volume", reponse: 9.42, unite: "m³" }
        ],
        theme: 'geometrie'
      },
      {
        id: 3,
        enonce: "Complète cette facture : (a) boîtes de craie à 1 200 F = 84 000 F ; 34 livres à 450 F = (b) F. Prix total = (c). TVA 20 % = (d). Total à payer = (e).",
        sousQuestions: [
          "Combien de boîtes de craie (a) ?",
          "Montant des livres (b) ?",
          "Prix total (c) ?",
          "TVA (d) ?",
          "Total à payer (e) ?"
        ],
        points: 10,
        reponses: [
          { question: "Boîtes craie (a)", reponse: 70, unite: "boîtes" },
          { question: "Montant livres (b)", reponse: 15300, unite: "F" },
          { question: "Prix total (c)", reponse: 99300, unite: "F" },
          { question: "TVA (d)", reponse: 19860, unite: "F" },
          { question: "Total (e)", reponse: 119160, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 4,
        enonce: "Un jardin rectangulaire de 75 m sur 60 m a une allée de 6 m de large qui en fait le tour (prise sur le jardin). Le reste forme une pelouse.",
        sousQuestions: [
          "Quelles sont les dimensions de la pelouse ?",
          "Quelle est la superficie de la pelouse ?",
          "Quelle est la surface de l'allée ?"
        ],
        points: 10,
        reponses: [
          { question: "Longueur pelouse", reponse: 63, unite: "m" },
          { question: "Largeur pelouse", reponse: 48, unite: "m" },
          { question: "Surface pelouse", reponse: 3024, unite: "m²" },
          { question: "Surface allée", reponse: 1476, unite: "m²" }
        ],
        theme: 'geometrie'
      },
      {
        id: 5,
        enonce: "On répand 23 tombereaux de sable de 2,340 t chacun sur l'allée.",
        sousQuestions: [
          "Quelle est la masse totale de sable utilisée ?"
        ],
        points: 10,
        reponses: [
          { question: "Masse totale", reponse: 53.82, unite: "t" }
        ],
        theme: 'mesures'
      }
    ]
  },

  // ==================== SUJET 15 ====================
  {
    id: 15,
    title: "Sujet 15",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Un camion pèse 1 825 kg à vide. Chargé de 45 caisses, il pèse 3 472 kg. Sa charge utile maximale est de 2 t.",
        sousQuestions: [
          "Quelle est la masse totale des caisses ?",
          "Quelle est la masse d'une caisse ?",
          "Combien de caisses pourrait-il charger au maximum ?"
        ],
        points: 10,
        reponses: [
          { question: "Masse caisses", reponse: 1647, unite: "kg" },
          { question: "Masse une caisse", reponse: 36.6, unite: "kg" },
          { question: "Caisses max", reponse: 54, unite: "caisses" }
        ],
        theme: 'mesures'
      },
      {
        id: 2,
        enonce: "Sur un terrain triangulaire de 26 ares et de hauteur 40 m, on répand du gravier. Le transport nécessite 10 voyages avec un camion de 6,5 m³.",
        sousQuestions: [
          "Quelle est la base du triangle ?",
          "Quel volume de gravier a-t-on utilisé ?",
          "Quel volume de gravier par m² ?"
        ],
        points: 10,
        reponses: [
          { question: "Base triangle", reponse: 130, unite: "m" },
          { question: "Volume gravier", reponse: 65, unite: "m³" },
          { question: "Gravier par m²", reponse: 0.025, unite: "m³/m²" }
        ],
        theme: 'geometrie'
      },
      {
        id: 3,
        enonce: "Le plan d'une école comprend 3 parties : A (triangle rectangle, hauteur 24 m, base 40 m), B (rectangle 40 m × 22 m), C (trapèze, bases 28 m et 17 m, hauteur 22 m).",
        sousQuestions: [
          "Quelle est la surface de A ?",
          "Quelle est la surface de B ?",
          "Quelle est la surface de C ?",
          "Quelle est la surface totale ?"
        ],
        points: 10,
        reponses: [
          { question: "Surface A", reponse: 480, unite: "m²" },
          { question: "Surface B", reponse: 880, unite: "m²" },
          { question: "Surface C", reponse: 495, unite: "m²" },
          { question: "Surface totale", reponse: 1855, unite: "m²" }
        ],
        theme: 'geometrie'
      },
      {
        id: 4,
        enonce: "Pour remplir complètement un bassin (il manque 7 950 L), un arroseur continue à débiter 450 L/h.",
        sousQuestions: [
          "Combien de temps faudra-t-il pour finir de remplir le bassin ?"
        ],
        points: 10,
        reponses: [
          { question: "Temps nécessaire", reponse: "17h40min" }
        ],
        theme: 'mesures'
      },
      {
        id: 5,
        enonce: "Un tableau de proportionnalité : Distance en km (100, 50, 150, 200, ?, 500) / Consommation en litres (8, ?, ?, 16, 80, ?).",
        sousQuestions: [
          "Quelle est la consommation pour 50 km ?",
          "Quelle est la consommation pour 150 km ?",
          "Quelle distance pour 80 litres ?",
          "Quelle est la consommation pour 500 km ?"
        ],
        points: 10,
        reponses: [
          { question: "Conso 50 km", reponse: 4, unite: "L" },
          { question: "Conso 150 km", reponse: 12, unite: "L" },
          { question: "Distance 80 L", reponse: 1000, unite: "km" },
          { question: "Conso 500 km", reponse: 40, unite: "L" }
        ],
        theme: 'fractions'
      }
    ]
  },

  // ==================== SUJET 16 ====================
  {
    id: 16,
    title: "Sujet 16 - Les deux frères",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Tiga et Séni sont deux frères qui travaillent. À eux deux, ils gagnent 438 000 F par mois. Tiga gagne deux fois plus que son frère Séni.",
        sousQuestions: [
          "Calcule le salaire mensuel de Tiga.",
          "Calcule le salaire mensuel de Séni."
        ],
        points: 10,
        reponses: [
          { question: "Salaire de Tiga", reponse: 292000, unite: "F" },
          { question: "Salaire de Séni", reponse: 146000, unite: "F" }
        ],
        theme: 'problemes'
      },
      {
        id: 2,
        enonce: "Chaque mois, Séni met de côté 22 000 F et Tiga économise 18% de son salaire.",
        sousQuestions: [
          "Calcule le montant total qu'ils économisent ensemble en un mois."
        ],
        points: 10,
        reponses: [
          { question: "Économies de Tiga", reponse: 52560, unite: "F" },
          { question: "Total économisé", reponse: 74560, unite: "F" }
        ],
        theme: 'fractions'
      },
      {
        id: 3,
        enonce: "Les deux frères ont reçu en héritage un terrain rectangulaire de 16 800 m². La largeur de ce terrain mesure 84 m.",
        sousQuestions: [
          "Calcule la longueur du terrain."
        ],
        points: 10,
        reponses: [
          { question: "Longueur du terrain", reponse: 200, unite: "m" }
        ],
        theme: 'geometrie'
      },
      {
        id: 4,
        enonce: "Avec leurs économies de l'année, ils achètent du grillage pour clôturer tout le terrain. Ils laissent une ouverture de 6 m pour le portail.",
        sousQuestions: [
          "Calcule le périmètre du terrain.",
          "Calcule la longueur de grillage nécessaire."
        ],
        points: 10,
        reponses: [
          { question: "Périmètre", reponse: 568, unite: "m" },
          { question: "Longueur grillage", reponse: 562, unite: "m" }
        ],
        theme: 'geometrie'
      },
      {
        id: 5,
        enonce: "Le mètre de grillage coûte 1 200 F.",
        sousQuestions: [
          "Calcule le prix total d'achat du grillage."
        ],
        points: 10,
        reponses: [
          { question: "Prix total grillage", reponse: 674400, unite: "F" }
        ],
        theme: 'operations'
      }
    ]
  },

  // ==================== SUJET 17 ====================
  {
    id: 17,
    title: "Sujet 17 - Le jardin public",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Tu es le trésorier de l'association des jeunes de ton quartier. Le Maire de la Commune vous a donné 1 600 000 F pour réaménager le jardin public. Ce jardin mesure 50 m de long et 30 m de large. Vous voulez installer une clôture autour du jardin. La pose de la clôture coûte 6 000 F par mètre. Vous prévoyez de laisser deux portes de 3 m chacune (une sur chaque largeur).",
        sousQuestions: [
          "Calcule le périmètre du jardin.",
          "Calcule la longueur de clôture nécessaire.",
          "Calcule le coût total de la clôture."
        ],
        points: 10,
        reponses: [
          { question: "Périmètre", reponse: 160, unite: "m" },
          { question: "Longueur clôture", reponse: 154, unite: "m" },
          { question: "Coût clôture", reponse: 924000, unite: "F" }
        ],
        theme: 'geometrie'
      },
      {
        id: 2,
        enonce: "La main d'œuvre pour poser la clôture coûte 20% du prix de la clôture.",
        sousQuestions: [
          "Calcule le montant de la main d'œuvre."
        ],
        points: 10,
        reponses: [
          { question: "Main d'œuvre", reponse: 184800, unite: "F" }
        ],
        theme: 'fractions'
      },
      {
        id: 3,
        enonce: "Au milieu du jardin, vous aménagez une aire de jeu circulaire de 10 m de rayon. Vous achetez 6 m³ de gravier à 12 500 F le m³ pour recouvrir cette aire.",
        sousQuestions: [
          "Calcule le prix total du gravier."
        ],
        points: 10,
        reponses: [
          { question: "Prix gravier", reponse: 75000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 4,
        enonce: "Vous achetez 8 banquettes à 28 500 F l'unité pour les installer autour de l'aire de jeu.",
        sousQuestions: [
          "Calcule le prix total des banquettes."
        ],
        points: 10,
        reponses: [
          { question: "Prix banquettes", reponse: 228000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 5,
        enonce: "Calcule le montant total des dépenses (clôture + main d'œuvre + gravier + banquettes).",
        sousQuestions: [
          "Quelle somme restera-t-il en caisse ?"
        ],
        points: 10,
        reponses: [
          { question: "Total dépenses", reponse: 1411800, unite: "F" },
          { question: "Reste en caisse", reponse: 188200, unite: "F" }
        ],
        theme: 'problemes'
      }
    ]
  },

  // ==================== SUJET 18 ====================
  {
    id: 18,
    title: "Sujet 18 - Le champ de l'association",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Une association sportive d'un village possède un champ rectangulaire dont le périmètre mesure 840 m. La largeur de ce champ représente les 3/4 de la longueur.",
        sousQuestions: [
          "Calcule la longueur du champ."
        ],
        points: 10,
        reponses: [
          { question: "Longueur", reponse: 240, unite: "m" }
        ],
        theme: 'geometrie'
      },
      {
        id: 2,
        enonce: "La largeur représente les 3/4 de la longueur.",
        sousQuestions: [
          "Calcule la largeur du champ."
        ],
        points: 10,
        reponses: [
          { question: "Largeur", reponse: 180, unite: "m" }
        ],
        theme: 'geometrie'
      },
      {
        id: 3,
        enonce: "Ce champ produit 10 quintaux d'arachide par hectare (1 quintal = 100 kg).",
        sousQuestions: [
          "Calcule la surface du champ.",
          "Calcule le poids total de la récolte en kg."
        ],
        points: 10,
        reponses: [
          { question: "Surface", reponse: 43200, unite: "m²" },
          { question: "Récolte", reponse: 4320, unite: "kg" }
        ],
        theme: 'mesures'
      },
      {
        id: 4,
        enonce: "L'arachide est vendue à 80 F le kg.",
        sousQuestions: [
          "Calcule la somme totale reçue après la vente."
        ],
        points: 10,
        reponses: [
          { question: "Somme vente", reponse: 345600, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 5,
        enonce: "L'association dépense les 2/3 de cet argent pour acheter du matériel. Elle place le reste à la banque au taux de 5% par an. Au bout d'un certain temps, elle retire 111 000 F (capital et intérêts réunis).",
        sousQuestions: [
          "Calcule le capital placé.",
          "Calcule la durée du placement en années."
        ],
        points: 10,
        reponses: [
          { question: "Capital placé", reponse: 115200, unite: "F" },
          { question: "Durée placement", reponse: 1, unite: "an" }
        ],
        theme: 'fractions'
      }
    ]
  },

  // ==================== SUJET 19 ====================
  {
    id: 19,
    title: "Sujet 19 - La coopérative et les poussins",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "La coopérative scolaire de ton école décide d'acheter des poussins pour faire un petit élevage. Elle dépense 41 000 F pour acheter des poussins à 205 F l'un.",
        sousQuestions: [
          "Calcule le nombre de poussins achetés."
        ],
        points: 10,
        reponses: [
          { question: "Nombre poussins", reponse: 200, unite: "poussins" }
        ],
        theme: 'operations'
      },
      {
        id: 2,
        enonce: "Chaque poussin consomme 4 kg d'aliments. Le sac de 50 kg d'aliment coûte 7 000 F.",
        sousQuestions: [
          "Calcule la quantité totale d'aliments nécessaires.",
          "Calcule le nombre de sacs à acheter.",
          "Calcule le prix total de l'alimentation."
        ],
        points: 10,
        reponses: [
          { question: "Quantité aliments", reponse: 800, unite: "kg" },
          { question: "Nombre sacs", reponse: 16, unite: "sacs" },
          { question: "Prix alimentation", reponse: 112000, unite: "F" }
        ],
        theme: 'problemes'
      },
      {
        id: 3,
        enonce: "La coopérative paie aussi 7 800 F de médicaments et 6 300 F pour l'entretien du poulailler.",
        sousQuestions: [
          "Calcule la somme totale dépensée par la coopérative."
        ],
        points: 10,
        reponses: [
          { question: "Total dépenses", reponse: 167100, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 4,
        enonce: "Malheureusement, 5 poulets meurent avant la vente.",
        sousQuestions: [
          "Combien reste-t-il de poulets à vendre ?"
        ],
        points: 10,
        reponses: [
          { question: "Poulets restants", reponse: 195, unite: "poulets" }
        ],
        theme: 'operations'
      },
      {
        id: 5,
        enonce: "La coopérative veut réaliser un bénéfice total de 86 000 F.",
        sousQuestions: [
          "Calcule le prix de vente total nécessaire.",
          "À quel prix doit-elle vendre chaque poulet ?"
        ],
        points: 10,
        reponses: [
          { question: "Prix vente total", reponse: 253100, unite: "F" },
          { question: "Prix par poulet", reponse: 1298, unite: "F" }
        ],
        theme: 'problemes'
      }
    ]
  },

  // ==================== SUJET 20 ====================
  {
    id: 20,
    title: "Sujet 20 - La porte rectangulaire",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Une porte a la forme d'un rectangle surmonté d'un demi-cercle. La largeur de la porte est de 1,40 m. La hauteur totale de la porte (rectangle + demi-cercle) est de 2,80 m. Le demi-cercle a pour diamètre la largeur de la porte (1,40 m).",
        sousQuestions: [
          "Calcule le rayon du demi-cercle.",
          "Calcule la hauteur de la partie rectangulaire."
        ],
        points: 10,
        reponses: [
          { question: "Rayon demi-cercle", reponse: 0.7, unite: "m" },
          { question: "Hauteur rectangle", reponse: 2.1, unite: "m" }
        ],
        theme: 'geometrie'
      },
      {
        id: 2,
        enonce: "Calcule la surface de la partie rectangulaire (en m²).",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Surface rectangle", reponse: 2.94, unite: "m²" }
        ],
        theme: 'geometrie'
      },
      {
        id: 3,
        enonce: "Calcule la surface du demi-cercle (en m²). Prends π = 3,14.",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Surface demi-cercle", reponse: 0.77, unite: "m²" }
        ],
        theme: 'geometrie'
      },
      {
        id: 4,
        enonce: "On peint la porte sur ses deux faces. On utilise 2 kg de peinture pour peindre 5 m².",
        sousQuestions: [
          "Calcule la surface totale à peindre.",
          "Calcule le poids total de peinture nécessaire."
        ],
        points: 10,
        reponses: [
          { question: "Surface totale", reponse: 7.42, unite: "m²" },
          { question: "Poids peinture", reponse: 2.97, unite: "kg" }
        ],
        theme: 'mesures'
      },
      {
        id: 5,
        enonce: "Cette peinture se vend en boîtes de 250 g à 500 F l'unité.",
        sousQuestions: [
          "Combien de boîtes faut-il acheter ?",
          "Calcule le prix total de la peinture."
        ],
        points: 10,
        reponses: [
          { question: "Nombre boîtes", reponse: 12, unite: "boîtes" },
          { question: "Prix peinture", reponse: 6000, unite: "F" }
        ],
        theme: 'operations'
      }
    ]
  },

  // ==================== SUJET 21 ====================
  {
    id: 21,
    title: "Sujet 21 - L'élevage de poulets",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "La coopérative scolaire achète 350 poussins à 220 F l'un pour faire un élevage de poulets.",
        sousQuestions: [
          "Calcule le prix d'achat des poussins."
        ],
        points: 10,
        reponses: [
          { question: "Prix poussins", reponse: 77000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 2,
        enonce: "Pour vacciner les poussins, elle achète 3 flacons de médicament à 6 250 F l'un et un sachet de vitamines à 3 750 F.",
        sousQuestions: [
          "Calcule le coût total des médicaments et des vitamines."
        ],
        points: 10,
        reponses: [
          { question: "Coût médicaments", reponse: 22500, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 3,
        enonce: "Pendant 6 semaines, les poussins consomment 3 sacs d'aliments par semaine à 5 500 F le sac.",
        sousQuestions: [
          "Calcule le coût total de l'alimentation."
        ],
        points: 10,
        reponses: [
          { question: "Coût alimentation", reponse: 99000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 4,
        enonce: "Calcule le coût total de l'élevage (poussins + médicaments + alimentation).",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Coût total élevage", reponse: 198500, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 5,
        enonce: "Avant la vente, 1/10 des poulets meurent de maladie. Le reste est vendu à 2 000 F le poulet.",
        sousQuestions: [
          "Combien de poulets sont vendus ?",
          "Calcule le montant de la vente.",
          "Calcule le bénéfice réalisé."
        ],
        points: 10,
        reponses: [
          { question: "Poulets vendus", reponse: 315, unite: "poulets" },
          { question: "Montant vente", reponse: 630000, unite: "F" },
          { question: "Bénéfice", reponse: 431500, unite: "F" }
        ],
        theme: 'problemes'
      }
    ]
  },

  // ==================== SUJET 22 ====================
  {
    id: 22,
    title: "Sujet 22 - Le jardin scolaire et les oignons",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Le jardin scolaire d'une école a produit 350 kg d'oignons avec un rendement de 6 kg par m².",
        sousQuestions: [
          "Calcule la surface du jardin exploitée en m²."
        ],
        points: 10,
        reponses: [
          { question: "Surface jardin", reponse: 58.33, unite: "m²" }
        ],
        theme: 'mesures'
      },
      {
        id: 2,
        enonce: "La coopérative décide de stocker la récolte pour la vendre plus tard à 500 F le kg. Mais en stockant, l'oignon perd 1/5 de son poids.",
        sousQuestions: [
          "Quel poids d'oignons pourra être vendu ?"
        ],
        points: 10,
        reponses: [
          { question: "Poids vendable", reponse: 280, unite: "kg" }
        ],
        theme: 'fractions'
      },
      {
        id: 3,
        enonce: "Calcule le montant total de la vente des oignons.",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Montant vente", reponse: 140000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 4,
        enonce: "Avec cet argent, la coopérative veut acheter une motopompe qui coûte 320 000 F. Le vendeur fait une remise de 10% sur le prix.",
        sousQuestions: [
          "Calcule le prix à payer après la remise.",
          "Combien manque-t-il à la coopérative ?"
        ],
        points: 10,
        reponses: [
          { question: "Prix après remise", reponse: 288000, unite: "F" },
          { question: "Somme manquante", reponse: 148000, unite: "F" }
        ],
        theme: 'fractions'
      },
      {
        id: 5,
        enonce: "Pour compléter le prix de la motopompe, chaque élève doit payer une cotisation de 250 F.",
        sousQuestions: [
          "Calcule le nombre d'élèves dans l'école."
        ],
        points: 10,
        reponses: [
          { question: "Nombre élèves", reponse: 592, unite: "élèves" }
        ],
        theme: 'operations'
      }
    ]
  },

  // ==================== SUJET 23 ====================
  {
    id: 23,
    title: "Sujet 23 - Les activités de l'école",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Une école a organisé plusieurs activités pour gagner de l'argent. À la fin, elle avait 10 000 F en caisse. Après les activités, elle dispose maintenant de 90 000 F.",
        sousQuestions: [
          "Calcule la somme totale disponible."
        ],
        points: 10,
        reponses: [
          { question: "Somme totale", reponse: 100000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 2,
        enonce: "L'école décide d'utiliser les 3/5 de cette somme pour acheter des livres à 780 F l'un.",
        sousQuestions: [
          "Calcule le montant utilisé pour les livres.",
          "Combien de livres pourra-t-elle acheter ?"
        ],
        points: 10,
        reponses: [
          { question: "Montant livres", reponse: 60000, unite: "F" },
          { question: "Nombre livres", reponse: 76, unite: "livres" }
        ],
        theme: 'fractions'
      },
      {
        id: 3,
        enonce: "Le reste de la somme est placé à la banque au taux de 5% par an. Au bout de 25 mois, l'école retire tout l'argent (capital et intérêts).",
        sousQuestions: [
          "Calcule le capital placé.",
          "Calcule les intérêts gagnés."
        ],
        points: 10,
        reponses: [
          { question: "Capital placé", reponse: 40000, unite: "F" },
          { question: "Intérêts", reponse: 4167, unite: "F" }
        ],
        theme: 'fractions'
      },
      {
        id: 4,
        enonce: "Calcule la somme totale retirée (capital + intérêts).",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Somme retirée", reponse: 44167, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 5,
        enonce: "Avec cette somme, l'école veut réparer une classe pour 95 000 F.",
        sousQuestions: [
          "Combien manque-t-il ?"
        ],
        points: 10,
        reponses: [
          { question: "Somme manquante", reponse: 50833, unite: "F" }
        ],
        theme: 'problemes'
      }
    ]
  },

  // ==================== SUJET 24 ====================
  {
    id: 24,
    title: "Sujet 24 - Le jardin rectangulaire",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Un jardinier veut clôturer son jardin rectangulaire. Il achète du grillage pour une valeur totale de 309 000 F à 1 500 F le mètre. Il prévoit de laisser un portail de 4 m.",
        sousQuestions: [
          "Calcule la longueur totale de grillage achetée.",
          "Calcule le périmètre du jardin."
        ],
        points: 10,
        reponses: [
          { question: "Longueur grillage", reponse: 206, unite: "m" },
          { question: "Périmètre jardin", reponse: 210, unite: "m" }
        ],
        theme: 'operations'
      },
      {
        id: 2,
        enonce: "La longueur du jardin est le double de sa largeur.",
        sousQuestions: [
          "Calcule la largeur du jardin."
        ],
        points: 10,
        reponses: [
          { question: "Largeur", reponse: 35, unite: "m" }
        ],
        theme: 'geometrie'
      },
      {
        id: 3,
        enonce: "Calcule la longueur du jardin.",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Longueur", reponse: 70, unite: "m" }
        ],
        theme: 'geometrie'
      },
      {
        id: 4,
        enonce: "Calcule la surface du jardin en m².",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Surface", reponse: 2450, unite: "m²" }
        ],
        theme: 'geometrie'
      },
      {
        id: 5,
        enonce: "Ce jardin produit des oignons avec un rendement de 2 quintaux par are (1 are = 100 m²). On vend la récolte à 250 F le kg.",
        sousQuestions: [
          "Calcule la surface en ares.",
          "Calcule le poids de la récolte.",
          "Calcule le montant total de la vente."
        ],
        points: 10,
        reponses: [
          { question: "Surface en ares", reponse: 24.5, unite: "ares" },
          { question: "Poids récolte", reponse: 4900, unite: "kg" },
          { question: "Montant vente", reponse: 1225000, unite: "F" }
        ],
        theme: 'mesures'
      }
    ]
  },

  // ==================== SUJET 25 ====================
  {
    id: 25,
    title: "Sujet 25 - Le champ des jeunes",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Des jeunes gens décident d'exploiter un champ rectangulaire pour alimenter leur coopérative. La clôture du champ est revenue à 171 000 F. Le mètre de clôture coûte 475 F.",
        sousQuestions: [
          "Calcule le périmètre du champ."
        ],
        points: 10,
        reponses: [
          { question: "Périmètre", reponse: 360, unite: "m" }
        ],
        theme: 'operations'
      },
      {
        id: 2,
        enonce: "La longueur de ce champ est le triple de sa largeur.",
        sousQuestions: [
          "Calcule la largeur du champ."
        ],
        points: 10,
        reponses: [
          { question: "Largeur", reponse: 45, unite: "m" }
        ],
        theme: 'geometrie'
      },
      {
        id: 3,
        enonce: "Calcule la longueur du champ.",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Longueur", reponse: 135, unite: "m" }
        ],
        theme: 'geometrie'
      },
      {
        id: 4,
        enonce: "Ce champ produit des oignons avec un rendement de 30 quintaux par hectare. Les oignons sont vendus à 150 F le kg.",
        sousQuestions: [
          "Calcule la surface du champ.",
          "Calcule le poids de la récolte.",
          "Calcule le montant total de la vente."
        ],
        points: 10,
        reponses: [
          { question: "Surface", reponse: 6075, unite: "m²" },
          { question: "Poids récolte", reponse: 1822.5, unite: "kg" },
          { question: "Montant vente", reponse: 273375, unite: "F" }
        ],
        theme: 'mesures'
      },
      {
        id: 5,
        enonce: "Avec 20% du produit de la vente, les jeunes achètent des poussins à 270 F l'un.",
        sousQuestions: [
          "Calcule le montant disponible pour les poussins.",
          "Combien de poussins peuvent-ils acheter ?"
        ],
        points: 10,
        reponses: [
          { question: "Montant poussins", reponse: 54675, unite: "F" },
          { question: "Nombre poussins", reponse: 202, unite: "poussins" }
        ],
        theme: 'fractions'
      }
    ]
  },

  // ==================== SUJET 26 ====================
  {
    id: 26,
    title: "Sujet 26 - La couturière",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Une couturière achète de l'étoffe. Le prix marqué est 96 000 F mais le commerçant lui fait une remise de 15%.",
        sousQuestions: [
          "Calcule le montant de la remise.",
          "Calcule le prix payé après la remise."
        ],
        points: 10,
        reponses: [
          { question: "Montant remise", reponse: 14400, unite: "F" },
          { question: "Prix payé", reponse: 81600, unite: "F" }
        ],
        theme: 'fractions'
      },
      {
        id: 2,
        enonce: "La couturière calcule qu'elle a acheté le mètre d'étoffe à 1 020 F.",
        sousQuestions: [
          "Calcule la longueur d'étoffe achetée en mètres."
        ],
        points: 10,
        reponses: [
          { question: "Longueur étoffe", reponse: 80, unite: "m" }
        ],
        theme: 'operations'
      },
      {
        id: 3,
        enonce: "Avec cette étoffe, elle peut coudre soit 64 tenues d'enfants vendues 2 000 F la tenue, soit des tenues d'adultes (à raison de 2,50 m d'étoffe par tenue) vendues 3 500 F pièce.",
        sousQuestions: [
          "Combien de tenues d'adultes peut-elle coudre ?"
        ],
        points: 10,
        reponses: [
          { question: "Tenues adultes", reponse: 32, unite: "tenues" }
        ],
        theme: 'operations'
      },
      {
        id: 4,
        enonce: "Calcule le bénéfice si elle confectionne des tenues d'enfants.",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Bénéfice enfants", reponse: 46400, unite: "F" }
        ],
        theme: 'problemes'
      },
      {
        id: 5,
        enonce: "Calcule le bénéfice si elle confectionne des tenues d'adultes. Quelle option est la plus avantageuse ?",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Bénéfice adultes", reponse: 30400, unite: "F" },
          { question: "Option avantageuse", reponse: "enfants" }
        ],
        theme: 'problemes'
      }
    ]
  },

  // ==================== SUJET 27 ====================
  {
    id: 27,
    title: "Sujet 27 - La kermesse solidaire",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Les 660 élèves d'une école organisent une kermesse pour aider un camarade malade. Ils vendent deux types de billets : 120 billets pour adultes à 100 F le ticket, et 350 billets pour enfants. Le prix du billet adulte est le double de celui des enfants.",
        sousQuestions: [
          "Calcule le prix du billet enfant."
        ],
        points: 10,
        reponses: [
          { question: "Prix billet enfant", reponse: 50, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 2,
        enonce: "Calcule la recette totale des billets (adultes + enfants).",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Recette billets", reponse: 29500, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 3,
        enonce: "Les jeux ont rapporté 20 500 F. Les dépenses de la kermesse s'élèvent à 6 000 F.",
        sousQuestions: [
          "Calcule la recette nette (recettes - dépenses + jeux)."
        ],
        points: 10,
        reponses: [
          { question: "Recette nette", reponse: 44000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 4,
        enonce: "Cette recette représente les 2/5 des frais médicaux à payer.",
        sousQuestions: [
          "Calcule le montant total des frais médicaux."
        ],
        points: 10,
        reponses: [
          { question: "Frais médicaux", reponse: 110000, unite: "F" }
        ],
        theme: 'fractions'
      },
      {
        id: 5,
        enonce: "Le directeur et les maîtres versent les 4/10 de la somme manquante. Le reste est partagé entre tous les élèves.",
        sousQuestions: [
          "Calcule la somme manquante.",
          "Calcule la contribution des enseignants.",
          "Combien doit payer chaque élève ?"
        ],
        points: 10,
        reponses: [
          { question: "Somme manquante", reponse: 66000, unite: "F" },
          { question: "Contribution enseignants", reponse: 26400, unite: "F" },
          { question: "Part par élève", reponse: 60, unite: "F" }
        ],
        theme: 'problemes'
      }
    ]
  },

  // ==================== SUJET 28 ====================
  {
    id: 28,
    title: "Sujet 28 - Les tenues scolaires",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "L'association des parents d'élèves veut commander des tenues scolaires auprès d'un centre de couture. Le centre demande 4 500 F par élève. L'association dispose de 1 790 000 F en caisse. Pour compléter, elle emprunte 1 000 000 F à une banque.",
        sousQuestions: [
          "Calcule le montant total disponible.",
          "Calcule le nombre total d'élèves dans l'école."
        ],
        points: 10,
        reponses: [
          { question: "Montant total", reponse: 2790000, unite: "F" },
          { question: "Nombre élèves", reponse: 620, unite: "élèves" }
        ],
        theme: 'operations'
      },
      {
        id: 2,
        enonce: "Sachant que 4 500 F représentent le prix de 2 tenues par élève.",
        sousQuestions: [
          "Calcule le nombre total de tenues confectionnées."
        ],
        points: 10,
        reponses: [
          { question: "Nombre tenues", reponse: 1240, unite: "tenues" }
        ],
        theme: 'operations'
      },
      {
        id: 3,
        enonce: "L'association vend chaque tenue à 2 500 F.",
        sousQuestions: [
          "Calcule le montant total de la vente."
        ],
        points: 10,
        reponses: [
          { question: "Montant vente", reponse: 3100000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 4,
        enonce: "Calcule le bénéfice réalisé.",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Bénéfice", reponse: 310000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 5,
        enonce: "L'association rembourse 1 040 000 F à la banque.",
        sousQuestions: [
          "Calcule les intérêts payés.",
          "À quel taux a-t-elle emprunté cet argent ?"
        ],
        points: 10,
        reponses: [
          { question: "Intérêts", reponse: 40000, unite: "F" },
          { question: "Taux", reponse: 4, unite: "%" }
        ],
        theme: 'fractions'
      }
    ]
  },

  // ==================== SUJET 29 ====================
  {
    id: 29,
    title: "Sujet 29 - Le jardin scolaire rectangulaire",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Le maître d'une classe de 30 élèves a fait 150 pas de 80 cm pour mesurer le tour du jardin scolaire rectangulaire.",
        sousQuestions: [
          "Calcule le périmètre du jardin en mètres."
        ],
        points: 10,
        reponses: [
          { question: "Périmètre", reponse: 120, unite: "m" }
        ],
        theme: 'mesures'
      },
      {
        id: 2,
        enonce: "La largeur représente les 2/3 de la longueur.",
        sousQuestions: [
          "Calcule la longueur du jardin.",
          "Calcule la largeur du jardin."
        ],
        points: 10,
        reponses: [
          { question: "Longueur", reponse: 36, unite: "m" },
          { question: "Largeur", reponse: 24, unite: "m" }
        ],
        theme: 'geometrie'
      },
      {
        id: 3,
        enonce: "Pour une sortie, les élèves récoltent et vendent 1 230 pieds de salade à raison de 210 F les 3 pieds.",
        sousQuestions: [
          "Calcule la somme reçue."
        ],
        points: 10,
        reponses: [
          { question: "Somme reçue", reponse: 86100, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 4,
        enonce: "Le trajet de la sortie mesure 6 cm sur une carte à l'échelle 1/5 000 000. Le transport coûte 300 F par kilomètre (aller-retour).",
        sousQuestions: [
          "Calcule la distance réelle en km.",
          "Calcule le coût total du transport."
        ],
        points: 10,
        reponses: [
          { question: "Distance réelle", reponse: 300, unite: "km" },
          { question: "Coût transport", reponse: 180000, unite: "F" }
        ],
        theme: 'mesures'
      },
      {
        id: 5,
        enonce: "Combien manque-t-il ? Chaque élève doit verser une cotisation pour compléter.",
        sousQuestions: [
          "Calcule le montant manquant.",
          "Calcule la cotisation par élève."
        ],
        points: 10,
        reponses: [
          { question: "Montant manquant", reponse: 93900, unite: "F" },
          { question: "Cotisation par élève", reponse: 3130, unite: "F" }
        ],
        theme: 'problemes'
      }
    ]
  },

  // ==================== SUJET 30 ====================
  {
    id: 30,
    title: "Sujet 30 - Le projet de bibliothèque",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Une école de 1 320 élèves veut construire et équiper une bibliothèque. Le bâtiment coûte 1 000 000 F, la main d'œuvre représente 20% du coût du bâtiment, et les équipements coûtent 800 000 F.",
        sousQuestions: [
          "Calcule le coût de la main d'œuvre.",
          "Calcule le coût total de la bibliothèque."
        ],
        points: 10,
        reponses: [
          { question: "Main d'œuvre", reponse: 200000, unite: "F" },
          { question: "Coût total", reponse: 2000000, unite: "F" }
        ],
        theme: 'fractions'
      },
      {
        id: 2,
        enonce: "Chaque élève cotise 500 F.",
        sousQuestions: [
          "Calcule le montant total des cotisations."
        ],
        points: 10,
        reponses: [
          { question: "Cotisations", reponse: 660000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 3,
        enonce: "L'association des parents verse 1/4 du coût total et la municipalité verse 40% du coût total.",
        sousQuestions: [
          "Calcule le montant versé par les parents.",
          "Calcule le montant versé par la municipalité."
        ],
        points: 10,
        reponses: [
          { question: "Parents", reponse: 500000, unite: "F" },
          { question: "Municipalité", reponse: 800000, unite: "F" }
        ],
        theme: 'fractions'
      },
      {
        id: 4,
        enonce: "Calcule la somme totale réunie. Combien manque-t-il ?",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Somme réunie", reponse: 1960000, unite: "F" },
          { question: "Somme manquante", reponse: 40000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 5,
        enonce: "Les élèves hésitent entre organiser une manifestation théâtrale (486 places à 75 F la place) ou demander une cotisation complémentaire de 50 F par élève.",
        sousQuestions: [
          "Calcule le montant de la manifestation théâtrale.",
          "Calcule le montant de la cotisation complémentaire.",
          "Quelle option rapporte le plus ?"
        ],
        points: 10,
        reponses: [
          { question: "Manifestation", reponse: 36450, unite: "F" },
          { question: "Cotisation complémentaire", reponse: 66000, unite: "F" },
          { question: "Meilleure option", reponse: "cotisation" }
        ],
        theme: 'problemes'
      }
    ]
  },

  // ==================== SUJET 31 - La sortie scolaire en bus ====================
  {
    id: 31,
    title: "Sujet 31 - La sortie scolaire en bus",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Une école loue un grand bus pour 30 000 F afin d'emmener 50 élèves en voyage. L'école paie la moitié de la location, le reste est partagé entre les élèves.",
        sousQuestions: [
          "Quelle somme l'école paie-t-elle pour le bus ?",
          "Quelle somme totale les élèves doivent-ils payer ensemble ?"
        ],
        points: 10,
        reponses: [
          { question: "Part de l'école", reponse: 15000, unite: "F" },
          { question: "Part des élèves", reponse: 15000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 2,
        enonce: "Les 50 élèves se partagent équitablement leur part.",
        sousQuestions: [
          "Combien chaque élève doit-il payer individuellement ?"
        ],
        points: 10,
        reponses: [
          { question: "Part par élève", reponse: 300, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 3,
        enonce: "Le bus roule à 60 km/h pendant 2 heures.",
        sousQuestions: [
          "Quelle distance le bus a-t-il parcourue ?"
        ],
        points: 10,
        reponses: [
          { question: "Distance", reponse: 120, unite: "km" }
        ],
        theme: 'mesures'
      },
      {
        id: 4,
        enonce: "Le bus consomme 10 litres de carburant pour 100 km.",
        sousQuestions: [
          "Combien de litres le bus a-t-il utilisés pour le trajet ?"
        ],
        points: 10,
        reponses: [
          { question: "Carburant utilisé", reponse: 12, unite: "L" }
        ],
        theme: 'operations'
      },
      {
        id: 5,
        enonce: "Le litre de carburant coûte 750 F.",
        sousQuestions: [
          "Calcule le coût total du carburant."
        ],
        points: 10,
        reponses: [
          { question: "Coût carburant", reponse: 9000, unite: "F" }
        ],
        theme: 'operations'
      }
    ]
  },

  // ==================== SUJET 32 - La boutique de miel ====================
  {
    id: 32,
    title: "Sujet 32 - La boutique de miel",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Un apiculteur a récolté 100 litres de miel. Il décide de le mettre dans des bouteilles de 2 litres.",
        sousQuestions: [
          "Combien de bouteilles l'apiculteur va-t-il remplir ?"
        ],
        points: 10,
        reponses: [
          { question: "Nombre de bouteilles", reponse: 50, unite: "bouteilles" }
        ],
        theme: 'operations'
      },
      {
        id: 2,
        enonce: "Chaque bouteille vide lui coûte 100 F.",
        sousQuestions: [
          "Quel est le prix d'achat total des bouteilles vides ?"
        ],
        points: 10,
        reponses: [
          { question: "Prix bouteilles", reponse: 5000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 3,
        enonce: "Il vend ensuite chaque bouteille remplie à 4 000 F.",
        sousQuestions: [
          "Quel est le montant total de la vente des bouteilles de miel ?"
        ],
        points: 10,
        reponses: [
          { question: "Montant vente", reponse: 200000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 4,
        enonce: "L'apiculteur a payé 20 000 F pour le transport.",
        sousQuestions: [
          "Quel est le total de ses dépenses (bouteilles + transport) ?"
        ],
        points: 10,
        reponses: [
          { question: "Total dépenses", reponse: 25000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 5,
        enonce: "Calcule le bénéfice final de l'apiculteur.",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Bénéfice", reponse: 175000, unite: "F" }
        ],
        theme: 'problemes'
      }
    ]
  },

  // ==================== SUJET 33 - Problèmes multiples ====================
  {
    id: 33,
    title: "Sujet 33 - Problèmes multiples",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Monsieur MBOCK est temporaire à la société CIMENCAM. Il travaille en matinée de 7h 45min à 12h et l'après-midi de 14h 15min à 18h. Il est payé 850 F l'heure.",
        sousQuestions: [
          "Combien de temps travaille-t-il par jour ?",
          "Combien gagne-t-il par jour ?"
        ],
        points: 10,
        reponses: [
          { question: "Temps de travail", reponse: 8, unite: "h" },
          { question: "Salaire journalier", reponse: 6800, unite: "F" }
        ],
        theme: 'mesures'
      },
      {
        id: 2,
        enonce: "Le réservoir cubique du camion a 40 cm d'arête. On y verse 3 bidons de 15 L d'essence chacun.",
        sousQuestions: [
          "Calcule le volume du réservoir en dm³.",
          "Calcule la quantité d'essence versée en L."
        ],
        points: 10,
        reponses: [
          { question: "Volume réservoir", reponse: 64, unite: "dm³" },
          { question: "Essence versée", reponse: 45, unite: "L" }
        ],
        theme: 'geometrie'
      },
      {
        id: 3,
        enonce: "Le réservoir est-il plein ? Quelle quantité en litres reste-t-il pour faire le plein ?",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Réservoir plein ?", reponse: "non" },
          { question: "Reste à ajouter", reponse: 19, unite: "L" }
        ],
        theme: 'mesures'
      },
      {
        id: 4,
        enonce: "Un parc rectangulaire a 240 m de long et 150 m de large. 2 allées en croix de 5 m de large sont aménagées suivant les médianes.",
        sousQuestions: [
          "Calcule la surface totale du parc en m².",
          "Calcule la surface des allées en m²."
        ],
        points: 10,
        reponses: [
          { question: "Surface parc", reponse: 36000, unite: "m²" },
          { question: "Surface allées", reponse: 1925, unite: "m²" }
        ],
        theme: 'geometrie'
      },
      {
        id: 5,
        enonce: "On répand sur les allées 80 kg de gravier au mètre carré.",
        sousQuestions: [
          "Quelle masse de gravier est nécessaire ?"
        ],
        points: 10,
        reponses: [
          { question: "Masse gravier", reponse: 154000, unite: "kg" }
        ],
        theme: 'mesures'
      }
    ]
  },

  // ==================== SUJET 34 - L'appareil de musique ====================
  {
    id: 34,
    title: "Sujet 34 - L'appareil de musique",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Un fonctionnaire fait une commande d'appareil de musique à 27 500 F. Ne pouvant payer comptant, il verse 2 500 F à la commande et 4 000 F à l'arrivée de l'appareil. Il paiera le reste majoré de 2,5% en 6 versements égaux.",
        sousQuestions: [
          "Calcule le reste à payer après les premiers versements.",
          "Calcule la majoration de 2,5%."
        ],
        points: 10,
        reponses: [
          { question: "Reste à payer", reponse: 21000, unite: "F" },
          { question: "Majoration", reponse: 525, unite: "F" }
        ],
        theme: 'fractions'
      },
      {
        id: 2,
        enonce: "Chacun des 6 versements est augmenté de 20 F pour frais.",
        sousQuestions: [
          "Calcule le montant de chaque versement."
        ],
        points: 10,
        reponses: [
          { question: "Montant versement", reponse: 3607.5, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 3,
        enonce: "Combien l'appareil aura-t-il coûté en tout ?",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Coût total", reponse: 28145, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 4,
        enonce: "Quelle économie aurait-il faite en payant l'appareil de musique au comptant ?",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Économie", reponse: 645, unite: "F" }
        ],
        theme: 'problemes'
      },
      {
        id: 5,
        enonce: "L'appareil nécessite l'usage de 6 piles à 35 F l'unité, par semaine. Quelle dépense fera-t-il pendant 65 jours ?",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Dépense piles", reponse: 1890, unite: "F" }
        ],
        theme: 'operations'
      }
    ]
  },

  // ==================== SUJET 35 - La coopérative scolaire et les légumes ====================
  {
    id: 35,
    title: "Sujet 35 - La coopérative et les légumes",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Une coopérative scolaire a produit cette année 750 kg de pommes de terre, 300 kg d'oignons et 45 kg de poivrons.",
        sousQuestions: [
          "Calcule la masse totale de la production."
        ],
        points: 10,
        reponses: [
          { question: "Masse totale", reponse: 1095, unite: "kg" }
        ],
        theme: 'operations'
      },
      {
        id: 2,
        enonce: "Le kg de pommes de terre coûte 400 F, le kg d'oignons 250 F et le kg de poivrons 500 F.",
        sousQuestions: [
          "Calcule le prix de vente des pommes de terre.",
          "Calcule le prix de vente des oignons."
        ],
        points: 10,
        reponses: [
          { question: "Pommes de terre", reponse: 300000, unite: "F" },
          { question: "Oignons", reponse: 75000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 3,
        enonce: "Quel est le montant total de la vente de la coopérative ?",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Montant total", reponse: 397500, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 4,
        enonce: "Une parcelle a la forme d'un carré. Son côté mesure 35 m.",
        sousQuestions: [
          "Quelle est l'aire de la parcelle carrée ?"
        ],
        points: 10,
        reponses: [
          { question: "Aire carrée", reponse: 1225, unite: "m²" }
        ],
        theme: 'geometrie'
      },
      {
        id: 5,
        enonce: "Cette parcelle a la même aire qu'une autre parcelle rectangulaire dont la largeur est 25 m.",
        sousQuestions: [
          "Quelle est la longueur de la parcelle rectangulaire ?"
        ],
        points: 10,
        reponses: [
          { question: "Longueur rectangle", reponse: 49, unite: "m" }
        ],
        theme: 'geometrie'
      }
    ]
  },

  // ==================== SUJET 36 - Problèmes de CM2 ====================
  {
    id: 36,
    title: "Sujet 36 - Problèmes de CM2",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Dans une classe de CM2 de 80 élèves, il y a 8 filles de moins que les garçons.",
        sousQuestions: [
          "Quel est le nombre de garçons ?",
          "Quel est le nombre de filles ?"
        ],
        points: 10,
        reponses: [
          { question: "Garçons", reponse: 44 },
          { question: "Filles", reponse: 36 }
        ],
        theme: 'problemes'
      },
      {
        id: 2,
        enonce: "Dans cette classe, 85% d'élèves réussissent au concours d'entrée en 6e.",
        sousQuestions: [
          "Quel est le nombre d'élèves admis en 6e ?",
          "Quel est le pourcentage d'élèves qui n'ont pas réussi ?"
        ],
        points: 10,
        reponses: [
          { question: "Élèves admis", reponse: 68 },
          { question: "Pourcentage échec", reponse: 15, unite: "%" }
        ],
        theme: 'fractions'
      },
      {
        id: 3,
        enonce: "Un automobiliste part à 7h 55min et arrive à 12h 55min après avoir parcouru 240 km.",
        sousQuestions: [
          "Calcule la durée du parcours.",
          "Calcule la vitesse moyenne."
        ],
        points: 10,
        reponses: [
          { question: "Durée", reponse: 5, unite: "h" },
          { question: "Vitesse moyenne", reponse: 48, unite: "km/h" }
        ],
        theme: 'mesures'
      },
      {
        id: 4,
        enonce: "À destination, il met 1h 30min pour décharger. À quelle heure revient-il à l'usine si la vitesse au retour est la même ?",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Heure de retour", reponse: "19h25" }
        ],
        theme: 'mesures'
      },
      {
        id: 5,
        enonce: "Un terrain rectangulaire mesure 42 m de large. La longueur est le double de la largeur.",
        sousQuestions: [
          "Calcule la longueur.",
          "Calcule la surface en m²."
        ],
        points: 10,
        reponses: [
          { question: "Longueur", reponse: 84, unite: "m" },
          { question: "Surface", reponse: 3528, unite: "m²" }
        ],
        theme: 'geometrie'
      }
    ]
  },

  // ==================== SUJET 37 - Le verger et le puits ====================
  {
    id: 37,
    title: "Sujet 37 - Le verger et le puits",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Un verger est clôturé avec quatre rangées de fil barbelé d'une masse totale de 56,64 kg, en laissant deux portes : l'une de 3 m, l'autre de 2 m. Le mètre de fil barbelé a une masse de 48 g.",
        sousQuestions: [
          "Calcule la longueur totale de fil barbelé utilisé.",
          "Calcule le périmètre du verger."
        ],
        points: 10,
        reponses: [
          { question: "Longueur fil", reponse: 1180, unite: "m" },
          { question: "Périmètre", reponse: 300, unite: "m" }
        ],
        theme: 'mesures'
      },
      {
        id: 2,
        enonce: "La longueur du verger dépasse la largeur de 40 m.",
        sousQuestions: [
          "Calcule la largeur du verger.",
          "Calcule la longueur du verger."
        ],
        points: 10,
        reponses: [
          { question: "Largeur", reponse: 55, unite: "m" },
          { question: "Longueur", reponse: 95, unite: "m" }
        ],
        theme: 'geometrie'
      },
      {
        id: 3,
        enonce: "Un puits de 4,50 m de profondeur et de 1,50 m de diamètre est creusé. Calcule le volume du puits.",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Volume puits", reponse: 7.95, unite: "m³" }
        ],
        theme: 'geometrie'
      },
      {
        id: 4,
        enonce: "On aménage au quart de la surface des plants de salade de 3 m de long sur 1,50 m de large. La surface entre les plants est de 253,25 m².",
        sousQuestions: [
          "Calcule la surface du quart du verger.",
          "Calcule le nombre de plants."
        ],
        points: 10,
        reponses: [
          { question: "Quart surface", reponse: 1306.25, unite: "m²" },
          { question: "Nombre plants", reponse: 234 }
        ],
        theme: 'geometrie'
      },
      {
        id: 5,
        enonce: "Le puits est rempli aux 3/4 et chaque plant a besoin de 25 litres d'eau. Les plants auront-ils suffisamment d'eau ?",
        sousQuestions: [
          "Calcule le volume d'eau disponible en L.",
          "Calcule le volume d'eau nécessaire."
        ],
        points: 10,
        reponses: [
          { question: "Eau disponible", reponse: 5962.5, unite: "L" },
          { question: "Eau nécessaire", reponse: 5850, unite: "L" }
        ],
        theme: 'problemes'
      }
    ]
  },

  // ==================== SUJET 38 - Le bassin rectangulaire ====================
  {
    id: 38,
    title: "Sujet 38 - Le bassin rectangulaire",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Un bassin a la forme d'un parallélépipède rectangle. Plein, il contient 9 000 litres d'eau. Sa hauteur est de 1,5 m et elle est la moitié de la longueur.",
        sousQuestions: [
          "Calcule la longueur du bassin.",
          "Calcule la largeur du bassin."
        ],
        points: 10,
        reponses: [
          { question: "Longueur", reponse: 3, unite: "m" },
          { question: "Largeur", reponse: 2, unite: "m" }
        ],
        theme: 'geometrie'
      },
      {
        id: 2,
        enonce: "Le fond et les parois doivent être carrelés avec des carreaux de 15 cm de côté vendus par caisse de 20 à 2 750 F.",
        sousQuestions: [
          "Calcule la surface totale à carreler.",
          "Calcule le nombre de caisses nécessaires.",
          "Calcule le prix total des carreaux."
        ],
        points: 10,
        reponses: [
          { question: "Surface à carreler", reponse: 21, unite: "m²" },
          { question: "Nombre caisses", reponse: 47 },
          { question: "Prix carreaux", reponse: 129250, unite: "F" }
        ],
        theme: 'mesures'
      },
      {
        id: 3,
        enonce: "Le carreleur est payé 1 200 F par m² et deux manœuvres sont payés 3 000 F par jour. Les travaux durent 4 jours.",
        sousQuestions: [
          "Calcule le prix de revient du carrelage."
        ],
        points: 10,
        reponses: [
          { question: "Prix carrelage", reponse: 178450, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 4,
        enonce: "Une motopompe de débit 60 L/min est utilisée pour vider le bassin. La vidange commence à 8h 45min.",
        sousQuestions: [
          "Calcule la durée de vidange.",
          "À quelle heure le bassin sera-t-il vidé ?"
        ],
        points: 10,
        reponses: [
          { question: "Durée vidange", reponse: 150, unite: "min" },
          { question: "Heure fin", reponse: "11h15" }
        ],
        theme: 'mesures'
      },
      {
        id: 5,
        enonce: "30 bêtes (10 moutons à 3 L/jour, 10 chevaux à 6 L/jour, 10 vaches à 9 L/jour) doivent être abreuvées avec l'eau restante après 1h de pompage.",
        sousQuestions: [
          "Calcule l'eau restante après 1h.",
          "Pendant combien de jours peut-on abreuver les bêtes ?"
        ],
        points: 10,
        reponses: [
          { question: "Eau restante", reponse: 5400, unite: "L" },
          { question: "Nombre de jours", reponse: 30, unite: "jours" }
        ],
        theme: 'problemes'
      }
    ]
  },

  // ==================== SUJET 39 - Le terrain et le puits ====================
  {
    id: 39,
    title: "Sujet 39 - Le terrain et le puits",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Un terrain rectangulaire dont la longueur est le quadruple de la largeur. Un puisatier réclame 2 500 F par mètre creusé. Il faut 10 tours d'un pot cylindrique de 30 cm de diamètre pour que la corde atteigne l'eau et 15 tours pour toucher le fond.",
        sousQuestions: [
          "Calcule la profondeur de l'eau dans le puits.",
          "Calcule la profondeur totale du puits."
        ],
        points: 10,
        reponses: [
          { question: "Profondeur eau", reponse: 4.71, unite: "m" },
          { question: "Profondeur puits", reponse: 14.13, unite: "m" }
        ],
        theme: 'geometrie'
      },
      {
        id: 2,
        enonce: "Le puits a un diamètre de 1,80 m. π = 3,14.",
        sousQuestions: [
          "Calcule le volume d'eau contenu en litres (arrondi à l'unité supérieure)."
        ],
        points: 10,
        reponses: [
          { question: "Volume eau", reponse: 11986, unite: "L" }
        ],
        theme: 'geometrie'
      },
      {
        id: 3,
        enonce: "Le propriétaire a utilisé 33 rouleaux de 50 m de fil barbelé dont 12 m restent inutilisés pour clôturer avec un triple rang en laissant une porte de 4 m.",
        sousQuestions: [
          "Calcule le périmètre du terrain.",
          "Calcule la largeur et la longueur du terrain."
        ],
        points: 10,
        reponses: [
          { question: "Périmètre", reponse: 550, unite: "m" },
          { question: "Largeur", reponse: 55, unite: "m" },
          { question: "Longueur", reponse: 220, unite: "m" }
        ],
        theme: 'geometrie'
      },
      {
        id: 4,
        enonce: "Le mètre de fil barbelé coûte 425 F et la douzaine de piquets 3 000 F. Les piquets sont espacés de 2,6 m avec un piquet de chaque côté de la porte.",
        sousQuestions: [
          "Calcule le prix du fil barbelé.",
          "Calcule le nombre de piquets.",
          "Calcule le prix de revient de la clôture."
        ],
        points: 10,
        reponses: [
          { question: "Prix fil", reponse: 695250, unite: "F" },
          { question: "Nombre piquets", reponse: 214 },
          { question: "Prix clôture", reponse: 749250, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 5,
        enonce: "Chaque plant a besoin de 20 L d'eau/jour. Le nombre de plants de carottes dépasse de 5 celui de navets et celui de choux dépasse de 4 celui de carottes.",
        sousQuestions: [
          "Calcule le nombre de plants de chaque espèce."
        ],
        points: 10,
        reponses: [
          { question: "Navets", reponse: 195 },
          { question: "Carottes", reponse: 200 },
          { question: "Choux", reponse: 204 }
        ],
        theme: 'problemes'
      }
    ]
  },

  // ==================== SUJET 40 - Le camion frigorifique ====================
  {
    id: 40,
    title: "Sujet 40 - Le camion frigorifique",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Un camion frigorifique chargé quitte Mbour le lundi à 18h 55min pour Saint-Louis, distant de 275 km. Le chauffeur prévoit de s'arrêter une demi-heure et d'arriver à minuit.",
        sousQuestions: [
          "Calcule le temps de trajet prévu (sans l'arrêt).",
          "Calcule la vitesse normale du camion."
        ],
        points: 10,
        reponses: [
          { question: "Temps trajet", reponse: 4.58, unite: "h" },
          { question: "Vitesse", reponse: 60, unite: "km/h" }
        ],
        theme: 'mesures'
      },
      {
        id: 2,
        enonce: "Le camion est immobilisé par une panne pendant 1h 10min à 75 km de Mbour, puis repart sans l'arrêt prévu.",
        sousQuestions: [
          "Quand arrivera-t-il à Saint-Louis ?"
        ],
        points: 10,
        reponses: [
          { question: "Heure arrivée", reponse: "0h40" }
        ],
        theme: 'mesures'
      },
      {
        id: 3,
        enonce: "À quelle vitesse devrait-il rouler sans arrêt pour arriver à l'heure prévue (minuit) ?",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Vitesse requise", reponse: 75, unite: "km/h" }
        ],
        theme: 'mesures'
      },
      {
        id: 4,
        enonce: "Le réservoir du camion a la forme d'un parallélépipède de 60 cm × 50 cm avec une capacité de 120 L. Au départ, il était plein aux 3/4. À l'arrivée, le niveau est à 32 cm du bord supérieur.",
        sousQuestions: [
          "Calcule la hauteur du réservoir.",
          "Calcule l'essence consommée."
        ],
        points: 10,
        reponses: [
          { question: "Hauteur réservoir", reponse: 40, unite: "cm" },
          { question: "Essence consommée", reponse: 66, unite: "L" }
        ],
        theme: 'geometrie'
      },
      {
        id: 5,
        enonce: "Calcule la consommation aux 100 km et de combien le niveau baisse quand le camion roule une heure.",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Consommation 100km", reponse: 24, unite: "L" },
          { question: "Baisse niveau/heure", reponse: 4.8, unite: "cm" }
        ],
        theme: 'problemes'
      }
    ]
  },

  // ==================== SUJET 41 - Le terrain de Paul ====================
  {
    id: 41,
    title: "Sujet 41 - Le terrain de Paul",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Paul achète un terrain rectangulaire de 250 m de long et 200 m de large à 175 000 F l'hectare.",
        sousQuestions: [
          "Calcule la surface du terrain en hectares.",
          "Calcule le prix d'achat du terrain."
        ],
        points: 10,
        reponses: [
          { question: "Surface", reponse: 5, unite: "ha" },
          { question: "Prix achat", reponse: 875000, unite: "F" }
        ],
        theme: 'geometrie'
      },
      {
        id: 2,
        enonce: "Pour désherber le terrain, il emploie deux manœuvres pendant 15 jours et paie chacun 1 500 F par jour.",
        sousQuestions: [
          "Quelle somme dépense-t-il pour le travail des manœuvres ?"
        ],
        points: 10,
        reponses: [
          { question: "Coût manœuvres", reponse: 45000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 3,
        enonce: "Il entoure ce terrain d'une clôture valant 750 F le mètre.",
        sousQuestions: [
          "Calcule le périmètre du terrain.",
          "Calcule la valeur de la clôture."
        ],
        points: 10,
        reponses: [
          { question: "Périmètre", reponse: 900, unite: "m" },
          { question: "Valeur clôture", reponse: 675000, unite: "F" }
        ],
        theme: 'mesures'
      },
      {
        id: 4,
        enonce: "Calcule le prix de revient du terrain (achat + manœuvres + clôture).",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Prix de revient", reponse: 1595000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 5,
        enonce: "Quelques années après, il revend ce terrain en faisant un bénéfice de 475 825 F.",
        sousQuestions: [
          "À combien a-t-il vendu le terrain ?"
        ],
        points: 10,
        reponses: [
          { question: "Prix de vente", reponse: 2070825, unite: "F" }
        ],
        theme: 'problemes'
      }
    ]
  },

  // ==================== SUJET 42 - Le jardin d'oignons ====================
  {
    id: 42,
    title: "Sujet 42 - Le jardin d'oignons",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Le comité de gestion d'une école dispose d'un jardin rectangulaire dont le périmètre mesure 280 m et la largeur 60 m.",
        sousQuestions: [
          "Calcule la longueur du jardin.",
          "Calcule sa surface en ares."
        ],
        points: 10,
        reponses: [
          { question: "Longueur", reponse: 80, unite: "m" },
          { question: "Surface", reponse: 48, unite: "ares" }
        ],
        theme: 'geometrie'
      },
      {
        id: 2,
        enonce: "Ce jardin a produit en moyenne 5 kg d'oignon par mètre carré.",
        sousQuestions: [
          "Calcule la production totale du jardin."
        ],
        points: 10,
        reponses: [
          { question: "Production", reponse: 24000, unite: "kg" }
        ],
        theme: 'operations'
      },
      {
        id: 3,
        enonce: "La production a été vendue à 500 F le kilogramme.",
        sousQuestions: [
          "Calcule le prix de vente des oignons."
        ],
        points: 10,
        reponses: [
          { question: "Prix de vente", reponse: 12000000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 4,
        enonce: "Le comité décide d'acheter une motopompe dont le prix marqué est 350 000 F. Le commerçant lui fait une remise de 10%.",
        sousQuestions: [
          "Calcule le prix d'achat de la motopompe."
        ],
        points: 10,
        reponses: [
          { question: "Prix motopompe", reponse: 315000, unite: "F" }
        ],
        theme: 'fractions'
      },
      {
        id: 5,
        enonce: "Calcule le solde de la caisse du comité après l'achat de la motopompe.",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Solde caisse", reponse: 11685000, unite: "F" }
        ],
        theme: 'operations'
      }
    ]
  },

  // ==================== SUJET 43 - Le mobilier scolaire ====================
  {
    id: 43,
    title: "Sujet 43 - Le mobilier scolaire",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Le comité de gestion d'une école commande 15 tables-bancs à 22 000 F l'unité et 25 livres de CP1 d'une valeur de 30 000 F. Les frais de transport s'élèvent à 22 500 F.",
        sousQuestions: [
          "Calcule le prix des tables-bancs.",
          "Calcule le prix de revient du matériel."
        ],
        points: 10,
        reponses: [
          { question: "Prix tables-bancs", reponse: 330000, unite: "F" },
          { question: "Prix de revient", reponse: 382500, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 2,
        enonce: "L'école compte 260 élèves. Chaque élève doit cotiser 600 F.",
        sousQuestions: [
          "Calcule le montant de la cotisation des élèves."
        ],
        points: 10,
        reponses: [
          { question: "Cotisations", reponse: 156000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 3,
        enonce: "Le reste sera donné par la communauté.",
        sousQuestions: [
          "À combien la communauté va-t-elle contribuer ?"
        ],
        points: 10,
        reponses: [
          { question: "Contribution communauté", reponse: 226500, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 4,
        enonce: "Calcule le pourcentage que représente la contribution des élèves.",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Pourcentage élèves", reponse: 40.78, unite: "%" }
        ],
        theme: 'fractions'
      },
      {
        id: 5,
        enonce: "Si le prix d'un livre est de 1 200 F, combien de livres peut-on acheter avec les 30 000 F ?",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Nombre livres", reponse: 25 }
        ],
        theme: 'operations'
      }
    ]
  },

  // ==================== SUJET 44 - L'avion AIR-BURKINA ====================
  {
    id: 44,
    title: "Sujet 44 - L'avion AIR-BURKINA",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "L'avion AIR-BURKINA pèse à vide 25,5 t. Il transporte 75 passagers et membres d'équipage pesant en moyenne 72 kg chacun, plus 1 800 kg de bagages.",
        sousQuestions: [
          "Calcule le poids total de l'avion prêt à s'envoler en kg."
        ],
        points: 10,
        reponses: [
          { question: "Poids total", reponse: 32700, unite: "kg" }
        ],
        theme: 'mesures'
      },
      {
        id: 2,
        enonce: "Les réservoirs à kérosène ont une capacité de 18 750 L. Le litre de kérosène coûte 1 100 F.",
        sousQuestions: [
          "Calcule la dépense en carburant."
        ],
        points: 10,
        reponses: [
          { question: "Dépense carburant", reponse: 20625000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 3,
        enonce: "Chacune des deux ailes de l'avion a une forme de trapèze de 15 m de hauteur, avec une grande base de 4 m et une petite base de 2 m.",
        sousQuestions: [
          "Calcule la surface d'une aile.",
          "Calcule la surface totale des deux ailes."
        ],
        points: 10,
        reponses: [
          { question: "Surface une aile", reponse: 45, unite: "m²" },
          { question: "Surface totale", reponse: 90, unite: "m²" }
        ],
        theme: 'geometrie'
      },
      {
        id: 4,
        enonce: "L'avion part de Ouagadougou à 10h 50min et arrive à destination à 13h 40min.",
        sousQuestions: [
          "Calcule la durée du vol."
        ],
        points: 10,
        reponses: [
          { question: "Durée vol", reponse: "2h50" }
        ],
        theme: 'mesures'
      },
      {
        id: 5,
        enonce: "La vitesse moyenne de l'appareil est de 450 km/h.",
        sousQuestions: [
          "Quelle est la distance parcourue ?"
        ],
        points: 10,
        reponses: [
          { question: "Distance", reponse: 1275, unite: "km" }
        ],
        theme: 'mesures'
      }
    ]
  },

  // ==================== SUJET 45 - L'école et le riz ====================
  {
    id: 45,
    title: "Sujet 45 - L'école et le riz",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Une école de 315 élèves exploite un champ de riz de 3 ha. Le champ produit en moyenne 1 500 kg de riz par ha.",
        sousQuestions: [
          "Calcule la masse totale de la récolte."
        ],
        points: 10,
        reponses: [
          { question: "Masse récolte", reponse: 4500, unite: "kg" }
        ],
        theme: 'operations'
      },
      {
        id: 2,
        enonce: "Ce riz est vendu 225 F le kilogramme.",
        sousQuestions: [
          "Combien cette vente rapportera-t-elle à l'école ?"
        ],
        points: 10,
        reponses: [
          { question: "Recette", reponse: 1012500, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 3,
        enonce: "L'école a dépensé 40 000 F pour les semences, 10 500 F pour l'irrigation et 600 F de cadeaux par élève.",
        sousQuestions: [
          "Calcule les dépenses totales.",
          "Combien reste-t-il en caisse ?"
        ],
        points: 10,
        reponses: [
          { question: "Dépenses", reponse: 239500, unite: "F" },
          { question: "Reste", reponse: 773000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 4,
        enonce: "Le reste est placé dans une caisse d'épargne au taux de 6%.",
        sousQuestions: [
          "Calcule les intérêts au bout d'un an."
        ],
        points: 10,
        reponses: [
          { question: "Intérêts", reponse: 46380, unite: "F" }
        ],
        theme: 'fractions'
      },
      {
        id: 5,
        enonce: "Quelle somme totale disposera l'école au bout d'un an ?",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Somme totale", reponse: 819380, unite: "F" }
        ],
        theme: 'operations'
      }
    ]
  },

  // ==================== SUJET 46 - La course cycliste ====================
  {
    id: 46,
    title: "Sujet 46 - La course cycliste",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Une course cycliste se déroule sur une piste circulaire de 5 km à parcourir 30 fois.",
        sousQuestions: [
          "Calcule la distance totale à parcourir."
        ],
        points: 10,
        reponses: [
          { question: "Distance totale", reponse: 150, unite: "km" }
        ],
        theme: 'operations'
      },
      {
        id: 2,
        enonce: "Sur 75 coureurs ayant pris le départ, seuls les 2/3 ont terminé la course.",
        sousQuestions: [
          "Calcule le nombre de coureurs qui ont terminé.",
          "Calcule le nombre de coureurs qui ont abandonné."
        ],
        points: 10,
        reponses: [
          { question: "Coureurs arrivés", reponse: 50 },
          { question: "Abandons", reponse: 25 }
        ],
        theme: 'fractions'
      },
      {
        id: 3,
        enonce: "Parmi ceux qui ont abandonné, Issa n'a fait que 18 tours.",
        sousQuestions: [
          "Quelle distance a-t-il parcourue ?",
          "Quel pourcentage du parcours Issa a-t-il fait ?"
        ],
        points: 10,
        reponses: [
          { question: "Distance Issa", reponse: 90, unite: "km" },
          { question: "Pourcentage", reponse: 60, unite: "%" }
        ],
        theme: 'fractions'
      },
      {
        id: 4,
        enonce: "La course a commencé à 6h 15min et a pris fin à 10h.",
        sousQuestions: [
          "Quelle a été la durée de la course ?"
        ],
        points: 10,
        reponses: [
          { question: "Durée", reponse: "3h45" }
        ],
        theme: 'mesures'
      },
      {
        id: 5,
        enonce: "À quelle vitesse moyenne les coureurs ont-ils roulé ?",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Vitesse moyenne", reponse: 40, unite: "km/h" }
        ],
        theme: 'mesures'
      }
    ]
  },

  // ==================== SUJET 47 - Le champ de maïs ====================
  {
    id: 47,
    title: "Sujet 47 - Le champ de maïs",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Sur un champ rectangulaire de 350 m de long sur 180 m de large, un groupement de femmes produit du maïs. Il a entouré le champ d'un grillage en laissant une porte de 2,5 m.",
        sousQuestions: [
          "Calcule le périmètre du champ.",
          "Calcule la longueur de grillage nécessaire."
        ],
        points: 10,
        reponses: [
          { question: "Périmètre", reponse: 1060, unite: "m" },
          { question: "Grillage", reponse: 1057.5, unite: "m" }
        ],
        theme: 'geometrie'
      },
      {
        id: 2,
        enonce: "Le mètre de grillage coûte 700 F.",
        sousQuestions: [
          "Calcule le prix d'achat du grillage."
        ],
        points: 10,
        reponses: [
          { question: "Prix grillage", reponse: 740250, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 3,
        enonce: "Calcule la surface du champ. Sur un hectare, le groupement a récolté 1,5 t de maïs.",
        sousQuestions: [
          "Calcule la surface du champ.",
          "Calcule la production totale."
        ],
        points: 10,
        reponses: [
          { question: "Surface", reponse: 6.3, unite: "ha" },
          { question: "Production", reponse: 9450, unite: "kg" }
        ],
        theme: 'mesures'
      },
      {
        id: 4,
        enonce: "Le groupement vend les 3/4 de la récolte à 200 F le kg.",
        sousQuestions: [
          "Calcule la quantité vendue.",
          "De quelle somme dispose-t-il ?"
        ],
        points: 10,
        reponses: [
          { question: "Quantité vendue", reponse: 7087.5, unite: "kg" },
          { question: "Recette", reponse: 1417500, unite: "F" }
        ],
        theme: 'fractions'
      },
      {
        id: 5,
        enonce: "Si le grillage a été acheté à crédit, le groupement pourra-t-il le rembourser totalement cette année ?",
        sousQuestions: [
          "Calcule le montant restant après remboursement du grillage."
        ],
        points: 10,
        reponses: [
          { question: "Reste après remboursement", reponse: 677250, unite: "F" }
        ],
        theme: 'problemes'
      }
    ]
  },

  // ==================== SUJET 48 - La cantine scolaire ====================
  {
    id: 48,
    title: "Sujet 48 - La cantine scolaire",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "L'APE d'une école de 823 élèves a demandé à chaque parent 3,5 kg de haricot et 725 F par élève.",
        sousQuestions: [
          "Calcule la masse totale de haricot collecté.",
          "Calcule le montant des cotisations."
        ],
        points: 10,
        reponses: [
          { question: "Haricot", reponse: 2880.5, unite: "kg" },
          { question: "Cotisations", reponse: 596675, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 2,
        enonce: "L'association a cultivé des arachides sur un terrain triangulaire de base 250 m et hauteur 224 m.",
        sousQuestions: [
          "Calcule l'aire du champ."
        ],
        points: 10,
        reponses: [
          { question: "Aire champ", reponse: 28000, unite: "m²" }
        ],
        theme: 'geometrie'
      },
      {
        id: 3,
        enonce: "Le champ a produit 15 sacs d'arachides à l'hectare. Le sac est vendu à 14 000 F.",
        sousQuestions: [
          "Calcule le nombre de sacs récoltés.",
          "Calcule le prix de vente de la production."
        ],
        points: 10,
        reponses: [
          { question: "Nombre sacs", reponse: 42 },
          { question: "Prix vente", reponse: 588000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 4,
        enonce: "Calcule la somme totale encaissée (cotisations + vente arachides).",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Somme totale", reponse: 1184675, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 5,
        enonce: "L'association utilise 8% de la somme totale pour le salaire des cantinières.",
        sousQuestions: [
          "Quel est le montant des salaires des cantinières ?"
        ],
        points: 10,
        reponses: [
          { question: "Salaires", reponse: 94774, unite: "F" }
        ],
        theme: 'fractions'
      }
    ]
  },

  // ==================== SUJET 49 - Le commerce de glace ====================
  {
    id: 49,
    title: "Sujet 49 - Le commerce de glace",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Sanata achète à crédit 3 congélateurs à 427 000 F l'unité pour ouvrir un commerce de glace et jus de fruits.",
        sousQuestions: [
          "Calcule le prix d'achat des congélateurs."
        ],
        points: 10,
        reponses: [
          { question: "Prix congélateurs", reponse: 1281000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 2,
        enonce: "Elle emploie 3 vendeurs qui reversent chacun par jour 1 500 F pour la glace et 2 800 F pour le jus. Ils travaillent 25 jours par mois.",
        sousQuestions: [
          "Calcule la recette mensuelle par vendeur.",
          "Calcule la recette mensuelle totale."
        ],
        points: 10,
        reponses: [
          { question: "Recette par vendeur", reponse: 107500, unite: "F" },
          { question: "Recette totale", reponse: 322500, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 3,
        enonce: "À la fin du mois, Sanata paye 35 000 F à chaque vendeur, 45 000 F de factures eau/électricité et 20 000 F de frais divers.",
        sousQuestions: [
          "Calcule les dépenses mensuelles."
        ],
        points: 10,
        reponses: [
          { question: "Dépenses", reponse: 170000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 4,
        enonce: "Calcule le bénéfice mensuel de Sanata.",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Bénéfice mensuel", reponse: 152500, unite: "F" }
        ],
        theme: 'problemes'
      },
      {
        id: 5,
        enonce: "Elle reverse les 3/4 de son bénéfice mensuel pour rembourser son crédit.",
        sousQuestions: [
          "Combien verse-t-elle par mois ?",
          "Au bout de combien de mois pourra-t-elle rembourser tout le crédit ?"
        ],
        points: 10,
        reponses: [
          { question: "Versement mensuel", reponse: 114375, unite: "F" },
          { question: "Durée remboursement", reponse: 12, unite: "mois" }
        ],
        theme: 'fractions'
      }
    ]
  },

  // ==================== SUJET 50 - Le prêt bancaire ====================
  {
    id: 50,
    title: "Sujet 50 - Le prêt bancaire",
    duration: 50,
    totalPoints: 50,
    questions: [
      {
        id: 1,
        enonce: "Un fonctionnaire gagne 61 500 F par mois. Il demande à la banque un prêt qui vaut 4 fois son salaire.",
        sousQuestions: [
          "Quel est le montant de ce prêt ?"
        ],
        points: 10,
        reponses: [
          { question: "Montant prêt", reponse: 246000, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 2,
        enonce: "La banque lui accorde le prêt avec un intérêt de 12%.",
        sousQuestions: [
          "Calcule les intérêts.",
          "Quelle somme doit-il rembourser ?"
        ],
        points: 10,
        reponses: [
          { question: "Intérêts", reponse: 29520, unite: "F" },
          { question: "Somme à rembourser", reponse: 275520, unite: "F" }
        ],
        theme: 'fractions'
      },
      {
        id: 3,
        enonce: "Cette somme doit être versée en 15 mois.",
        sousQuestions: [
          "Quel est le montant d'un versement mensuel ?"
        ],
        points: 10,
        reponses: [
          { question: "Versement mensuel", reponse: 18368, unite: "F" }
        ],
        theme: 'operations'
      },
      {
        id: 4,
        enonce: "Avec le montant du prêt, il achète un poste radio à 90 000 F et un frigidaire à 125 000 F. Le commerçant fait une remise de 15% sur le frigidaire.",
        sousQuestions: [
          "Calcule le prix du frigidaire après remise.",
          "Combien a-t-il dépensé pour les deux articles ?"
        ],
        points: 10,
        reponses: [
          { question: "Prix frigidaire", reponse: 106250, unite: "F" },
          { question: "Dépense totale", reponse: 196250, unite: "F" }
        ],
        theme: 'fractions'
      },
      {
        id: 5,
        enonce: "Combien lui reste-t-il du montant du prêt ?",
        sousQuestions: [],
        points: 10,
        reponses: [
          { question: "Reste", reponse: 49750, unite: "F" }
        ],
        theme: 'problemes'
      }
    ]
  }
];

// Fonction pour obtenir un sujet par son ID
export const getExamSubjectById = (id: number): ExamSubject | undefined => {
  return examSubjects.find(subject => subject.id === id);
};

// Fonction pour convertir un score sur 50 en note sur 20
export const convertScoreTo20 = (scoreOn50: number): number => {
  return Math.round((scoreOn50 / 50) * 20 * 100) / 100;
};

// Nombre total de sujets disponibles
export const TOTAL_EXAM_SUBJECTS = 50;

// Fonction pour obtenir les sujets complétés (non-placeholder)
export const getCompletedSubjectsCount = (): number => {
  return examSubjects.filter(s => 
    !s.questions[0].enonce.includes('Bientôt disponible')
  ).length;
};
