import React from 'react';
import { Lock, BookOpen, Home, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LevelBlockInfo } from '@/utils/levelBlockingSystem';

interface LevelBlockedScreenProps {
  blockingInfo: LevelBlockInfo;
  onGoToRevisions: () => void;
  onGoToMenu: () => void;
}

const LevelBlockedScreen: React.FC<LevelBlockedScreenProps> = ({
  blockingInfo,
  onGoToRevisions,
  onGoToMenu,
}) => {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full"
      >
        <div className="bg-card rounded-3xl shadow-2xl p-8 text-center">
          {/* Icône animée */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6"
          >
            <div className="w-24 h-24 mx-auto bg-destructive/20 rounded-full flex items-center justify-center">
              <Lock className="w-12 h-12 text-destructive" />
            </div>
          </motion.div>

          {/* Titre */}
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Niveau {blockingInfo.level} bloqué 🔒
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            Tu as fait 3 tentatives sans succès.
          </p>

          {/* Explication */}
          <div className="bg-primary/10 rounded-2xl p-6 mb-6 text-left">
            <h2 className="font-bold text-primary mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Comment débloquer ce niveau ?
            </h2>
            <ol className="space-y-3 text-foreground">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <span>Va dans la rubrique <strong>Révisions</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <span>Choisis une catégorie pour t'entraîner</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <span>Réussis <strong className="text-primary">10 réponses justes d'affilée</strong></span>
              </li>
            </ol>
          </div>

          {/* Message motivant */}
          <div className="bg-secondary/30 rounded-xl p-4 mb-6">
            <p className="text-foreground">
              💪 <strong>Tu peux y arriver !</strong> L'entraînement te permettra de maîtriser les calculs et de revenir plus fort.
            </p>
          </div>

          {/* Boutons d'action */}
          <div className="space-y-3">
            <Button
              onClick={onGoToRevisions}
              className="w-full py-6 text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Aller aux Révisions
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button
              onClick={onGoToMenu}
              variant="outline"
              className="w-full py-4"
            >
              <Home className="w-5 h-5 mr-2" />
              Retour au menu principal
            </Button>
          </div>

          {/* Indicateur de progression vers déblocage */}
          {blockingInfo.currentCorrectStreak > 0 && (
            <div className="mt-6 pt-4 border-t border-muted">
              <p className="text-sm text-muted-foreground">
                Progression actuelle : <strong className="text-primary">{blockingInfo.currentCorrectStreak}/10</strong> réponses correctes d'affilée
              </p>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all"
                  style={{ width: `${(blockingInfo.currentCorrectStreak / 10) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LevelBlockedScreen;
