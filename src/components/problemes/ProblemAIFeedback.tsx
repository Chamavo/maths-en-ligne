import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, X, Award } from 'lucide-react';

interface ProblemAIFeedbackProps {
  message: string | null;
  isLoading: boolean;
  onRequestCorrection: () => void;
  onClear: () => void;
  tentatives: number;
}

const ProblemAIFeedback: React.FC<ProblemAIFeedbackProps> = ({
  message,
  isLoading,
  onRequestCorrection,
  onClear,
  tentatives,
}) => {
  if (!message && !isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="mb-4"
      >
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              {/* Avatar IA */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-primary" />
                  )}
                </div>
              </div>

              {/* Contenu */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-primary flex items-center gap-2">
                    🤖 Ton tuteur IA
                  </h4>
                  {!isLoading && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onClear}
                      className="h-6 w-6 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {isLoading ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-sm">Je réfléchis...</span>
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      🤔
                    </motion.div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Message de l'IA */}
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p className="whitespace-pre-wrap text-foreground/90 leading-relaxed">
                        {message}
                      </p>
                    </div>

                    {/* Actions supplémentaires */}
                    {tentatives >= 2 && (
                      <div className="pt-2 border-t border-border/50">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={onRequestCorrection}
                          className="flex items-center gap-2"
                        >
                          <Award className="w-4 h-4" />
                          Voir la correction complète
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          Tu as essayé {tentatives} fois. Tu peux demander la correction pour comprendre.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProblemAIFeedback;
