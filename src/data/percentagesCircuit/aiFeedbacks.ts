// Bibliothèque de feedbacks IA pour le module Pourcentages
// Organisé par saison et type d'erreur

import type { AIFeedback } from './types';

// ═══════════════════════════════════════════════════════════════
// SAISON 1 – Sens du pourcentage (« sur 100 »)
// ═══════════════════════════════════════════════════════════════
export const season1Feedbacks: AIFeedback[] = [
  {
    trigger: 'missing_sur_100',
    message: `🏁 Bien vu, tu as trouvé le bon nombre !
Maintenant, imagine que tu es dans les stands :
le **%** veut toujours dire **« sur 100 »**.
Peux-tu reformuler ta réponse comme un ingénieur de course ?`,
    hint_level: 1,
    tone: 'encouraging',
    theme: 'f1',
  },
  {
    trigger: 'confusion_fraction_percent',
    message: `🔧 Tu as une bonne intuition, mais change de tableau de bord.
Ici, on parle en **pourcentage**, donc en **sur 100**.
Combien fait **1/10 sur 100** tours ?`,
    hint_level: 1,
    tone: 'corrective',
    theme: 'f1',
  },
  {
    trigger: 'wrong_base',
    message: `📊 Attention au tableau de bord !
Le symbole **%** signifie toujours **sur 100**, pas sur 10 ni sur 1000.
Essaie de relire la question avec cette info.`,
    hint_level: 1,
    tone: 'corrective',
    theme: 'f1',
  },
];

// ═══════════════════════════════════════════════════════════════
// SAISON 2 – Fractions ↔ Pourcentages
// ═══════════════════════════════════════════════════════════════
export const season2Feedbacks: AIFeedback[] = [
  {
    trigger: 'confusion_25_half',
    message: `🧠 Pause aux stands !
1/2, c'est **la moitié de la course**.
25 %, c'est **un quart du circuit**.
Si le circuit est coupé en 4 secteurs égaux, tu en as parcouru combien ?`,
    hint_level: 1,
    tone: 'encouraging',
    theme: 'f1',
  },
  {
    trigger: 'wrong_simplification',
    message: `🔄 Tu es sur la bonne piste, mais regarde bien la fraction.
Pour simplifier, demande-toi :
**par combien peux-tu diviser le haut et le bas sans changer la valeur ?**`,
    hint_level: 1,
    tone: 'corrective',
    theme: 'f1',
  },
  {
    trigger: 'fraction_inversion',
    message: `🏎️ Attention virage serré !
25/100 se simplifie en divisant les deux par **25**.
Essaie : 25 ÷ 25 = ? et 100 ÷ 25 = ?`,
    hint_level: 2,
    tone: 'corrective',
    theme: 'f1',
  },
];

// ═══════════════════════════════════════════════════════════════
// SAISON 3 – Décimaux ↔ Pourcentages
// ═══════════════════════════════════════════════════════════════
export const season3Feedbacks: AIFeedback[] = [
  {
    trigger: 'decimal_position_error',
    message: `📊 Attention à la virgule !
Passer de % à décimal, c'est comme retirer le symbole %
et **diviser par 100**.
Essaie de lire 25 % comme **25 sur 100** sur l'écran digital.`,
    hint_level: 1,
    tone: 'corrective',
    theme: 'f1',
  },
  {
    trigger: 'confusion_05_5percent',
    message: `🚦 Freinage tardif !
0,5 signifie **la moitié du total**.
Sur 100 tours, la moitié, ça fait combien de tours ?`,
    hint_level: 1,
    tone: 'corrective',
    theme: 'f1',
  },
  {
    trigger: 'missing_zero',
    message: `🔢 N'oublie pas le zéro devant la virgule !
0,25 c'est pareil que 25 centièmes ou 25 %.
L'écran digital t'aide : 0,__ signifie « moins de 1 entier ».`,
    hint_level: 1,
    tone: 'encouraging',
    theme: 'f1',
  },
];

// ═══════════════════════════════════════════════════════════════
// SAISON 4 – Calculer un pourcentage
// ═══════════════════════════════════════════════════════════════
export const season4Feedbacks: AIFeedback[] = [
  {
    trigger: 'subtraction_instead_of_division',
    message: `🛠️ On ne retire rien pour l'instant !
50 %, c'est **la moitié**.
Essaie d'abord de **couper le nombre en deux**, comme un ingénieur découpe une stratégie.`,
    hint_level: 1,
    tone: 'corrective',
    theme: 'f1',
  },
  {
    trigger: 'multiplication_error',
    message: `🧮 Tu es allé trop vite dans la ligne droite !
25 %, c'est **un quart**.
Quelle opération permet de trouver un quart d'un nombre ?`,
    hint_level: 1,
    tone: 'corrective',
    theme: 'f1',
  },
  {
    trigger: 'wrong_method_10percent',
    message: `🏁 Astuce de pro pour 10 % :
Divise simplement par **10** !
Exemple : 10 % de 80 = 80 ÷ 10 = ?`,
    hint_level: 2,
    tone: 'encouraging',
    theme: 'f1',
  },
];

// ═══════════════════════════════════════════════════════════════
// SAISON 5 – Réductions et remises
// ═══════════════════════════════════════════════════════════════
export const season5Feedbacks: AIFeedback[] = [
  {
    trigger: 'confusion_reduction_final',
    message: `🏪 Très bonne idée, mais il manque un arrêt au stand.
D'abord, on calcule **ce que tu économises**.
Ensuite seulement, on calcule **ce que tu paies**.
Reprends la stratégie étape par étape.`,
    hint_level: 1,
    tone: 'corrective',
    theme: 'f1',
  },
  {
    trigger: 'double_reduction_error',
    message: `🏁 C'est une erreur très courante, même chez les adultes !
La deuxième réduction ne s'applique pas au prix de départ,
mais **au nouveau prix**.
Essaie avec un objet à 100 € pour voir.`,
    hint_level: 1,
    tone: 'encouraging',
    theme: 'f1',
  },
  {
    trigger: 'forgot_subtraction',
    message: `💰 Tu as bien calculé la réduction !
Mais n'oublie pas : le **prix final** = prix de départ - réduction.
Un dernier calcul et tu y es !`,
    hint_level: 1,
    tone: 'encouraging',
    theme: 'f1',
  },
];

// ═══════════════════════════════════════════════════════════════
// SAISON 6 – Raisonnement & stratégie
// ═══════════════════════════════════════════════════════════════
export const season6Feedbacks: AIFeedback[] = [
  {
    trigger: 'choose_highest_percent',
    message: `📉 Le pourcentage seul ne suffit pas !
En F1, une stratégie dépend toujours du **contexte**.
Calcule les deux réductions en euros, puis compare-les.`,
    hint_level: 1,
    tone: 'corrective',
    theme: 'f1',
  },
  {
    trigger: 'blocked_complex',
    message: `🛑 Pause stratégique autorisée.
Coupe le problème en **petits morceaux**, comme un GP en secteurs.
Commence par le **premier calcul simple**, le reste suivra.`,
    hint_level: 1,
    tone: 'encouraging',
    theme: 'f1',
  },
  {
    trigger: 'missing_explanation',
    message: `📻 Message radio : ton résultat semble bon !
Mais l'équipe a besoin de comprendre ta stratégie.
Peux-tu expliquer ton raisonnement en quelques mots ?`,
    hint_level: 1,
    tone: 'encouraging',
    theme: 'f1',
  },
];

// ═══════════════════════════════════════════════════════════════
// FEEDBACKS DE VALORISATION (réussite ou progrès)
// ═══════════════════════════════════════════════════════════════
export const successFeedbacks: AIFeedback[] = [
  {
    trigger: 'correct_with_explanation',
    message: `🎉 Magnifique stratégie !
Tu n'as pas seulement trouvé la bonne réponse,
tu l'as expliquée comme un **vrai ingénieur de course**.`,
    hint_level: 0,
    tone: 'celebratory',
    theme: 'f1',
  },
  {
    trigger: 'corrected_after_hint',
    message: `💪 Bien joué !
Faire une erreur et la corriger, c'est exactement comme
améliorer un tour après un passage aux stands.`,
    hint_level: 0,
    tone: 'celebratory',
    theme: 'f1',
  },
  {
    trigger: 'gp_complete',
    message: `🏆 Drapeau à damier !
Tu progresses de course en course.
Prêt pour le prochain Grand Prix ?`,
    hint_level: 0,
    tone: 'celebratory',
    theme: 'f1',
  },
  {
    trigger: 'season_complete',
    message: `🏆🍾 FÉLICITATIONS !
Tu viens de remporter la saison !
Monte sur le podium, tu l'as bien mérité !`,
    hint_level: 0,
    tone: 'celebratory',
    theme: 'f1',
  },
  {
    trigger: 'fast_answer',
    message: `⚡ DRS activé !
Tu as répondu à la vitesse de l'éclair !
Voilà un vrai pilote de calcul mental.`,
    hint_level: 0,
    tone: 'celebratory',
    theme: 'f1',
  },
  {
    trigger: 'streak_3',
    message: `🔥 Trois réponses parfaites d'affilée !
Tu es en mode « tour rapide » !
Continue comme ça, champion !`,
    hint_level: 0,
    tone: 'celebratory',
    theme: 'f1',
  },
];

// Fonction pour obtenir un feedback aléatoire de succès
export const getRandomSuccessFeedback = (): string => {
  const generalSuccess = [
    "🏁 Parfait ! Tu maîtrises comme un pro !",
    "✅ Excellent calcul ! L'équipe est fière de toi !",
    "🎯 Dans le mille ! Tu progresses à chaque tour !",
    "🏎️ Réponse validée ! Tu files vers la victoire !",
    "⭐ Superbe ! Tu gagnes des points au classement !",
  ];
  return generalSuccess[Math.floor(Math.random() * generalSuccess.length)];
};

// Fonction pour obtenir un feedback d'encouragement après erreur
export const getEncouragementFeedback = (): string => {
  const encouragements = [
    "🔧 Pas de souci, même les champions font des erreurs aux essais !",
    "🏎️ Un petit dérapage, mais tu reprends la piste !",
    "💪 Continue, chaque erreur te rapproche de la maîtrise !",
    "🛠️ Arrêt au stand pour ajuster... et on repart !",
    "📻 L'équipe croit en toi, essaie encore !",
  ];
  return encouragements[Math.floor(Math.random() * encouragements.length)];
};

// Obtenir les feedbacks par saison
export const getFeedbacksBySeason = (seasonId: number): AIFeedback[] => {
  switch (seasonId) {
    case 1: return season1Feedbacks;
    case 2: return season2Feedbacks;
    case 3: return season3Feedbacks;
    case 4: return season4Feedbacks;
    case 5: return season5Feedbacks;
    case 6: return season6Feedbacks;
    default: return [];
  }
};
