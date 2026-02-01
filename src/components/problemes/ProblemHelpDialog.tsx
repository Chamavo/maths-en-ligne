import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { HelpCircle, BookOpen, Lightbulb, MessageSquare } from 'lucide-react';
import { ProblemHelpType } from '@/hooks/useProblemAI';

interface ProblemHelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHelp: (helpType: ProblemHelpType, raisonnement?: string) => void;
}

const ProblemHelpDialog: React.FC<ProblemHelpDialogProps> = ({
  isOpen,
  onClose,
  onSelectHelp,
}) => {
  const [showRaisonnementInput, setShowRaisonnementInput] = useState(false);
  const [raisonnement, setRaisonnement] = useState('');

  const handleSelect = (helpType: ProblemHelpType) => {
    if (helpType === 'verifier_raisonnement') {
      setShowRaisonnementInput(true);
    } else {
      onSelectHelp(helpType);
      onClose();
    }
  };

  const handleSubmitRaisonnement = () => {
    onSelectHelp('verifier_raisonnement', raisonnement);
    setRaisonnement('');
    setShowRaisonnementInput(false);
    onClose();
  };

  const handleClose = () => {
    setShowRaisonnementInput(false);
    setRaisonnement('');
    onClose();
  };

  const helpOptions = [
    {
      type: 'incomprehension' as ProblemHelpType,
      icon: HelpCircle,
      title: "Je ne comprends pas l'énoncé",
      description: "L'IA reformule avec des mots plus simples",
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-950 dark:hover:bg-blue-900',
    },
    {
      type: 'comment_commencer' as ProblemHelpType,
      icon: BookOpen,
      title: "Je ne sais pas par où commencer",
      description: "L'IA aide à identifier les étapes",
      color: 'text-green-500',
      bgColor: 'bg-green-50 hover:bg-green-100 dark:bg-green-950 dark:hover:bg-green-900',
    },
    {
      type: 'bloque' as ProblemHelpType,
      icon: Lightbulb,
      title: "Je suis bloqué à une étape",
      description: "L'IA donne un indice pour débloquer",
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 hover:bg-orange-100 dark:bg-orange-950 dark:hover:bg-orange-900',
    },
    {
      type: 'verifier_raisonnement' as ProblemHelpType,
      icon: MessageSquare,
      title: "Je veux vérifier mon raisonnement",
      description: "Explique ta démarche, l'IA te guide",
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 hover:bg-purple-100 dark:bg-purple-950 dark:hover:bg-purple-900',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            🤖 Ton tuteur IA
          </DialogTitle>
        </DialogHeader>

        {!showRaisonnementInput ? (
          <div className="space-y-3 py-2">
            <p className="text-sm text-muted-foreground text-center mb-4">
              De quel type d'aide as-tu besoin ?
            </p>
            
            {helpOptions.map((option) => (
              <button
                key={option.type}
                onClick={() => handleSelect(option.type)}
                className={`w-full p-4 rounded-xl ${option.bgColor} transition-all duration-200 text-left border border-transparent hover:border-border`}
              >
                <div className="flex items-start gap-3">
                  <option.icon className={`w-6 h-6 ${option.color} mt-0.5 flex-shrink-0`} />
                  <div>
                    <h4 className="font-medium text-foreground">{option.title}</h4>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <p className="text-sm text-muted-foreground">
              Explique ton raisonnement ci-dessous. L'IA va te dire si tu es sur la bonne piste ! 📝
            </p>
            
            <Textarea
              value={raisonnement}
              onChange={(e) => setRaisonnement(e.target.value)}
              placeholder="J'ai commencé par calculer... puis j'ai fait..."
              className="min-h-[120px]"
              autoFocus
            />
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowRaisonnementInput(false)}
                className="flex-1"
              >
                Retour
              </Button>
              <Button
                onClick={handleSubmitRaisonnement}
                disabled={!raisonnement.trim()}
                className="flex-1"
              >
                Envoyer
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProblemHelpDialog;
