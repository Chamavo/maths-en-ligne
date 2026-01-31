import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, RotateCcw, HelpCircle, Check, RefreshCw, Loader2, PenLine } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AppHeader from './AppHeader';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { problemesExercises, NIVEAU_LABELS, TOTAL_PROBLEMES } from '@/data/problemesExercises';
import ProblemHelpDialog from './problemes/ProblemHelpDialog';
import ProblemAIFeedback from './problemes/ProblemAIFeedback';
import { useProblemAI, ProblemHelpType } from '@/hooks/useProblemAI';

interface ProblemesSectionProps {
  username: string;
  onBack: () => void;
  onLogout: () => void;
}

const ProblemesSection: React.FC<ProblemesSectionProps> = ({
  username,
  onBack,
  onLogout,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [tentatives, setTentatives] = useState(0);
  const [indicesVus, setIndicesVus] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  
  const { askForHelp, isLoading: aiLoading, aiMessage, clearMessage } = useProblemAI();

  const currentExercise = problemesExercises[currentIndex];

  const resetExerciseState = () => {
    setUserAnswer('');
    setTentatives(0);
    setIndicesVus(0);
    setHasSubmitted(false);
    clearMessage();
  };

  const goToNext = () => {
    if (currentIndex < TOTAL_PROBLEMES - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
      resetExerciseState();
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
      resetExerciseState();
    }
  };

  const goToFirst = () => {
    setDirection(-1);
    setCurrentIndex(0);
    resetExerciseState();
  };

  const goToNiveau = (niveau: number) => {
    const firstIndex = problemesExercises.findIndex(e => e.niveau === niveau);
    if (firstIndex !== -1) {
      setDirection(firstIndex > currentIndex ? 1 : -1);
      setCurrentIndex(firstIndex);
      resetExerciseState();
    }
  };

  const getNiveauColor = (niveau: number): string => {
    switch (niveau) {
      case 1: return 'bg-green-500 hover:bg-green-600';
      case 2: return 'bg-blue-500 hover:bg-blue-600';
      case 3: return 'bg-orange-500 hover:bg-orange-600';
      case 4: return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  const getTextSize = (text: string): string => {
    if (text.length > 350) return 'text-base sm:text-lg';
    if (text.length > 200) return 'text-lg sm:text-xl';
    if (text.length > 100) return 'text-xl sm:text-2xl';
    return 'text-2xl sm:text-3xl';
  };

  const handleHelpRequest = async (helpType: ProblemHelpType, raisonnement?: string) => {
    setShowHelpDialog(false);
    
    await askForHelp({
      probleme: currentExercise.enonce,
      niveau: currentExercise.niveau,
      reponseEleve: userAnswer || undefined,
      helpType,
      indicesDejaVus: indicesVus,
      tentatives,
      raisonnementEleve: raisonnement,
      reponseCorrecte: currentExercise.reponse,
      unite: currentExercise.unite,
    });
    
    if (helpType !== 'correction_finale') {
      setIndicesVus(prev => prev + 1);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) return;
    
    setTentatives(prev => prev + 1);
    setHasSubmitted(true);
    
    // L'IA analyse la réponse avec la bonne réponse fournie
    await askForHelp({
      probleme: currentExercise.enonce,
      niveau: currentExercise.niveau,
      reponseEleve: userAnswer,
      helpType: 'apres_erreur',
      indicesDejaVus: indicesVus,
      tentatives: tentatives + 1,
      reponseCorrecte: currentExercise.reponse,
      unite: currentExercise.unite,
    });
  };

  const handleRequestCorrection = async () => {
    await askForHelp({
      probleme: currentExercise.enonce,
      niveau: currentExercise.niveau,
      reponseEleve: userAnswer || undefined,
      helpType: 'correction_finale',
      indicesDejaVus: indicesVus,
      tentatives,
      reponseCorrecte: currentExercise.reponse,
      unite: currentExercise.unite,
    });
  };

  const handleRetry = () => {
    setUserAnswer('');
    setHasSubmitted(false);
    clearMessage();
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <AppHeader
        title="🧩 Problèmes"
        subtitle={`Exercice ${currentIndex + 1} sur ${TOTAL_PROBLEMES}`}
        showBack
        showHome
        showLogout
        onBack={onBack}
        onHome={onBack}
        onLogout={onLogout}
      />
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
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

          {/* Navigation par niveau */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 mb-4 justify-center"
          >
            {[1, 2, 3, 4].map(niveau => {
              const count = problemesExercises.filter(e => e.niveau === niveau).length;
              const isCurrentNiveau = currentExercise.niveau === niveau;
              
              return (
                <Button
                  key={niveau}
                  variant={isCurrentNiveau ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToNiveau(niveau)}
                  className={isCurrentNiveau ? getNiveauColor(niveau) : ''}
                >
                  {NIVEAU_LABELS[niveau].label} ({count})
                </Button>
              );
            })}
          </motion.div>

          {/* Carte de l'exercice */}
          <div className="relative min-h-[200px] sm:min-h-[180px] mb-4">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'tween', duration: 0.3 }}
                className="absolute inset-0"
              >
                <Card className="bg-card/95 backdrop-blur-sm shadow-2xl border-2 h-full">
                  <CardContent className="p-4 sm:p-6 h-full flex flex-col">
                    {/* En-tête avec badges */}
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Badge className={`${getNiveauColor(currentExercise.niveau)} text-white`}>
                          Niveau {currentExercise.niveau}
                        </Badge>
                        <Badge variant="outline">
                          Ex. {currentExercise.id}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {NIVEAU_LABELS[currentExercise.niveau].label}
                      </span>
                    </div>

                    {/* Énoncé du problème */}
                    <div className="flex-1 flex items-center justify-center">
                      <p className={`${getTextSize(currentExercise.enonce)} text-foreground leading-relaxed text-center`}>
                        {currentExercise.enonce}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Zone de réponse */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card/95 backdrop-blur-sm shadow-xl border-2 mb-4">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  💭 Ma réponse
                </h3>
                
                <Textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Écris ta réponse ici... Tu peux montrer ton raisonnement et donner le résultat."
                  className="min-h-[100px] mb-4 text-base"
                  disabled={aiLoading}
                />

                {/* Boutons d'action */}
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowHelpDialog(true)}
                    disabled={aiLoading}
                    className="flex items-center gap-2"
                  >
                    <HelpCircle className="w-4 h-4" />
                    J'ai besoin d'aide
                  </Button>
                  
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={!userAnswer.trim() || aiLoading}
                    className="flex items-center gap-2 bg-primary"
                  >
                    {aiLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                    Vérifier ma réponse
                  </Button>
                  
                  {hasSubmitted && (
                    <Button
                      variant="secondary"
                      onClick={handleRetry}
                      disabled={aiLoading}
                      className="flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Réessayer
                    </Button>
                  )}
                </div>

                {/* Statistiques de tentatives */}
                {(tentatives > 0 || indicesVus > 0) && (
                  <div className="mt-4 flex justify-center gap-4 text-sm text-muted-foreground">
                    {tentatives > 0 && (
                      <span>Tentatives : {tentatives}</span>
                    )}
                    {indicesVus > 0 && (
                      <span>Indices utilisés : {indicesVus}</span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Feedback de l'IA */}
          <ProblemAIFeedback
            message={aiMessage}
            isLoading={aiLoading}
            onRequestCorrection={handleRequestCorrection}
            onClear={clearMessage}
            tentatives={tentatives}
          />

          {/* Contrôles de navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between mt-6 gap-4"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className="flex-1 sm:flex-none"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span className="hidden sm:inline">Précédent</span>
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToFirst}
                title="Revenir au début"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
              <span className="text-sm font-medium text-foreground px-3 py-1 bg-card rounded-full">
                {currentIndex + 1} / {TOTAL_PROBLEMES}
              </span>
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={goToNext}
              disabled={currentIndex === TOTAL_PROBLEMES - 1}
              className="flex-1 sm:flex-none"
            >
              <span className="hidden sm:inline">Suivant</span>
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </motion.div>

          {/* Barre de progression */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / TOTAL_PROBLEMES) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Niveau 1</span>
              <span>Niveau 2</span>
              <span>Niveau 3</span>
              <span>Niveau 4</span>
            </div>
          </motion.div>

          {/* Bouton retour au menu */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground"
            >
              <Home className="w-4 h-4 mr-2" />
              Retour au menu principal
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Dialog d'aide */}
      <ProblemHelpDialog
        isOpen={showHelpDialog}
        onClose={() => setShowHelpDialog(false)}
        onSelectHelp={handleHelpRequest}
      />
    </div>
  );
};

export default ProblemesSection;
