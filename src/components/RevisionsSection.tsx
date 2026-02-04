import React from 'react';
import { Calculator, Hash, Divide, Ruler, Shapes, Brain, Star, Lock, CheckCircle, PenLine } from 'lucide-react';
import { motion } from 'framer-motion';
import AppHeader from './AppHeader';

export interface RevisionCategory {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  description: string[];
  questionsCount: number;
  completedQuestions: number;
}

interface RevisionsSectionProps {
  username: string;
  onBack: () => void;
  onLogout: () => void;
  onSelectCategory: (categoryId: number) => void;
  categories: RevisionCategory[];
}

export const defaultRevisionCategories: RevisionCategory[] = [
  {
    id: 1,
    title: "Numération",
    subtitle: "Système Décimal et Grands Nombres",
    icon: <Hash className="w-10 h-10" />,
    color: "from-red-400 to-red-600",
    description: [
      "Lire, écrire et décomposer les grands nombres",
      "Comprendre les décimaux (dixièmes, centièmes, millièmes)",
      "Comparer et ranger les nombres",
      "Multiples et diviseurs (règles de divisibilité)"
    ],
    questionsCount: 50,
    completedQuestions: 0,
  },
  {
    id: 2,
    title: "Opérations",
    subtitle: "Techniques Opératoires",
    icon: <Calculator className="w-10 h-10" />,
    color: "from-orange-400 to-orange-600",
    description: [
      "Addition et soustraction sur entiers et décimaux",
      "Multiplication par nombres à plusieurs chiffres",
      "Division avec diviseur décimal",
      "Calcul mental et estimations"
    ],
    questionsCount: 50,
    completedQuestions: 0,
  },
  {
    id: 3,
    title: "Fractions",
    subtitle: "Pourcentages et Proportionnalité",
    icon: <Divide className="w-10 h-10" />,
    color: "from-yellow-400 to-yellow-600",
    description: [
      "Lire, écrire, comparer et simplifier les fractions",
      "Additionner et soustraire les fractions",
      "Passage fraction/décimal",
      "Proportionnalité et pourcentages"
    ],
    questionsCount: 50,
    completedQuestions: 0,
  },
  {
    id: 4,
    title: "Grandeurs",
    subtitle: "et Mesures",
    icon: <Ruler className="w-10 h-10" />,
    color: "from-green-400 to-green-600",
    description: [
      "Unités de longueur, masse et capacité",
      "Calcul de durées et temps",
      "Périmètres et aires",
      "Volumes (cube et parallélépipède)"
    ],
    questionsCount: 50,
    completedQuestions: 0,
  },
  {
    id: 5,
    title: "Géométrie",
    subtitle: "et Tracés",
    icon: <Shapes className="w-10 h-10" />,
    color: "from-blue-400 to-blue-600",
    description: [
      "Droites parallèles et perpendiculaires",
      "Angles avec équerre et rapporteur",
      "Figures planes et solides",
      "Échelles et plans"
    ],
    questionsCount: 50,
    completedQuestions: 0,
  },
  {
    id: 6,
    title: "Problèmes",
    subtitle: "Vie Courante",
    icon: <Brain className="w-10 h-10" />,
    color: "from-purple-400 to-purple-600",
    description: [
      "Comprendre l'énoncé et choisir l'opération",
      "Économie familiale (prix, bénéfice, perte)",
      "Lecture de graphiques",
      "Vitesse, distance et temps"
    ],
    questionsCount: 50,
    completedQuestions: 0,
  },
];

const RevisionsSection: React.FC<RevisionsSectionProps> = ({
  username,
  onBack,
  onLogout,
  onSelectCategory,
  categories,
}) => {
  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <AppHeader
        title="📚 Centre de Révisions"
        subtitle={`Choisis une thématique, ${username} !`}
        showBack
        showHome
        showLogout
        onBack={onBack}
        onHome={onBack}
        onLogout={onLogout}
      />
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-6xl mx-auto">
          {/* Rappel stylo et papier - texte agrandi et plus visible */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950/50 dark:to-orange-950/50 border-2 border-amber-300 dark:border-amber-700 rounded-2xl p-5 mb-6 flex items-center gap-4 shadow-lg"
          >
            <div className="bg-amber-200 dark:bg-amber-800 p-4 rounded-xl">
              <PenLine className="w-10 h-10 text-amber-700 dark:text-amber-300" />
            </div>
            <p className="text-xl md:text-2xl font-bold text-amber-800 dark:text-amber-200">
              Prépare-toi ! ✏️ Utilise ton stylo et du papier pour poser tes calculs
            </p>
          </motion.div>

          {/* Bandeau Comprendre les pourcentages */}
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {/* TODO: contenu à venir */}}
            className="w-full mb-6 relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl p-5 text-white shadow-xl group"
          >
            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <div className="relative z-10 flex items-center justify-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-3xl">📊</span>
              </div>
              <div className="text-left flex-1">
                <h3 className="text-xl md:text-2xl font-bold">Comprendre les pourcentages</h3>
                <p className="text-sm md:text-base text-white/90">Maîtrise les pourcentages pas à pas ! 🎯</p>
              </div>
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-3xl hidden sm:block"
              >
                →
              </motion.div>
            </div>
          </motion.button>

          {/* Grille des 6 catégories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const progress = (category.completedQuestions / category.questionsCount) * 100;
            const isAvailable = category.questionsCount > 0;
            
            return (
              <motion.button
                key={category.id}
                onClick={() => isAvailable && onSelectCategory(category.id)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={isAvailable ? { scale: 1.03, y: -5 } : undefined}
                whileTap={isAvailable ? { scale: 0.98 } : undefined}
                disabled={!isAvailable}
                className={`relative overflow-hidden bg-gradient-to-br ${category.color} rounded-2xl p-6 text-white shadow-xl text-left group ${
                  !isAvailable ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {/* Effet de brillance */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                {/* Numéro du thème */}
                <div className="absolute top-3 right-3 bg-white/20 rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">
                  {category.id}
                </div>

                {/* Contenu */}
                <div className="relative z-10">
                  <div className="bg-white/20 p-3 rounded-xl w-fit mb-4">
                    {category.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-1">{category.title}</h3>
                  <p className="text-lg text-white/90 mb-4">{category.subtitle}</p>
                  
                  {/* Liste des points */}
                  <ul className="text-sm text-white/80 space-y-1 mb-4">
                    {category.description.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-yellow-300">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Barre de progression */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{category.completedQuestions}/{category.questionsCount} questions</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="bg-white/30 rounded-full h-3">
                      <div 
                        className="bg-white rounded-full h-3 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Badge si non disponible */}
                  {!isAvailable && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
                      <div className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                        <Lock className="w-5 h-5" />
                        <span>Bientôt disponible</span>
                      </div>
                    </div>
                  )}

                  {/* Badge si complété */}
                  {progress === 100 && (
                    <div className="absolute top-3 left-3">
                      <CheckCircle className="w-8 h-8 text-green-300" />
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Message informatif */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-card rounded-2xl shadow-xl p-6"
        >
          <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
            💡 Comment utiliser les révisions ?
          </h3>
          <ul className="text-muted-foreground space-y-2">
            <li>✅ Chaque thématique contient 50 questions graduelles</li>
            <li>📈 Les questions deviennent progressivement plus difficiles</li>
            <li>🎯 Ton enseignant peut voir tes progrès et t'aider sur les points difficiles</li>
            <li>🔄 Tu peux recommencer une thématique autant de fois que tu veux</li>
          </ul>
        </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RevisionsSection;
