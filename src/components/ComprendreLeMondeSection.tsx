import React, { useState, useEffect } from 'react';
import { Globe, Send, CheckCircle, Bot, Loader2, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { getQuestionOfTheDay, getTodayDateString, WorldQuestion } from '@/data/worldQuestions';
import { useToast } from '@/hooks/use-toast';
import { useAITutor } from '@/hooks/useAITutor';
import { useStudentAuth } from '@/hooks/useStudentAuth';
import AppHeader from './AppHeader';

interface ComprendreLeMondeProps {
  username: string;
  onBack: () => void;
  onLogout: () => void;
}

interface TodayResponse {
  choice: string;
  justification: string;
  question_id: number;
}

const ComprendreLeMondeSection: React.FC<ComprendreLeMondeProps> = ({
  username,
  onBack,
  onLogout,
}) => {
  const [question, setQuestion] = useState<WorldQuestion | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<string>('');
  const [justification, setJustification] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAnsweredToday, setHasAnsweredToday] = useState(false);
  const [todayResponse, setTodayResponse] = useState<TodayResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [showAIExplanation, setShowAIExplanation] = useState(false);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  
  const { toast } = useToast();
  const { askForHelp, isLoading: isAILoading, aiMessage, clearMessage } = useAITutor();
  const { student } = useStudentAuth();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Charger la question du jour
      const todayQuestion = getQuestionOfTheDay();
      setQuestion(todayQuestion);
      
      // Récupérer le user_id depuis Supabase Auth (enseignant) ou session élève
      const { data: { user } } = await supabase.auth.getUser();
      
      let effectiveUserId: string | null = null;
      let effectiveStudentId: string | null = null;
      
      if (user) {
        // Connexion enseignant via Supabase Auth
        effectiveUserId = user.id;
        setUserId(user.id);
      } else if (student) {
        // Connexion élève via système custom
        effectiveUserId = student.id;
        effectiveStudentId = student.id;
        setUserId(student.id);
        setStudentId(student.id);
      }
      
      if (effectiveUserId) {
        // Vérifier si l'élève a déjà répondu aujourd'hui
        const todayDate = getTodayDateString();
        const { data: existingResponse } = await supabase
          .from('world_question_responses')
          .select('choice, justification, question_id')
          .eq('user_id', effectiveUserId)
          .eq('response_date', todayDate)
          .maybeSingle();
        
        if (existingResponse) {
          setHasAnsweredToday(true);
          setTodayResponse(existingResponse as TodayResponse);
        }
      }
      
      setIsLoading(false);
    };
    
    loadData();
  }, [student]);

  const handleSubmit = async () => {
    if (!selectedChoice) {
      toast({
        title: "Choix manquant",
        description: "Sélectionne une réponse (A, B, C ou D)",
        variant: "destructive"
      });
      return;
    }
    
    if (!justification.trim() || justification.trim().length < 10) {
      toast({
        title: "Justification trop courte",
        description: "Explique pourquoi tu as choisi cette réponse (au moins 10 caractères)",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (!userId) {
        toast({
          title: "Erreur",
          description: "Tu dois être connecté pour répondre",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
      const { error } = await supabase
        .from('world_question_responses')
        .insert({
          user_id: userId,
          student_id: studentId,
          username: username,
          question_id: question!.id,
          choice: selectedChoice,
          justification: justification.trim(),
          response_date: getTodayDateString()
        });
      
      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Déjà répondu",
            description: "Tu as déjà répondu à la question du jour",
            variant: "destructive"
          });
        } else {
          throw error;
        }
      } else {
        setHasAnsweredToday(true);
        setTodayResponse({
          choice: selectedChoice,
          justification: justification.trim(),
          question_id: question!.id
        });
        
        toast({
          title: "Réponse enregistrée ! ✨",
          description: "Merci pour ta réflexion. Reviens demain pour une nouvelle question !",
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer ta réponse. Réessaie plus tard.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <Globe className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <AppHeader
        title="Comprendre le monde"
        subtitle="Une question par jour 🌍"
        showBack
        showHome
        showLogout
        onBack={onBack}
        onHome={onBack}
        onLogout={onLogout}
        backLabel="Retour"
      />
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center items-center gap-3 mb-2">
            <Globe className="w-10 h-10 text-teal-400" />
            <h1 className="text-3xl font-bold text-foreground">
              Comprendre le monde
            </h1>
          </div>
          <p className="text-muted-foreground">
            Une question par jour pour développer ton intuition 🌍
          </p>
        </motion.div>

        {/* Contenu principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl shadow-xl p-6"
        >
          {hasAnsweredToday ? (
            // Message après avoir répondu + Explication IA
            <div className="text-center py-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Merci pour ta réflexion ! 🎉
              </h2>
              
              <div className="bg-muted/50 rounded-xl p-4 text-left mb-6">
                <p className="text-sm text-muted-foreground mb-2">Ta réponse :</p>
                <p className="font-semibold text-foreground mb-2">
                  Choix : {todayResponse?.choice}
                </p>
                <p className="text-sm text-muted-foreground italic">
                  "{todayResponse?.justification?.slice(0, 100)}{(todayResponse?.justification?.length || 0) > 100 ? '...' : ''}"
                </p>
              </div>
              
              {/* Bouton pour demander une explication IA */}
              {!showAIExplanation ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    onClick={async () => {
                      setShowAIExplanation(true);
                      setIsAIThinking(true);
                      const result = await askForHelp({
                        type: 'world_explanation',
                        worldQuestion: question?.question || '',
                        worldChoices: question?.choices || { A: '', B: '', C: '', D: '' },
                        userChoice: todayResponse?.choice || '',
                        justification: todayResponse?.justification || '',
                        theme: question?.theme || '',
                      });
                      setAiExplanation(result);
                      setIsAIThinking(false);
                    }}
                    className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-6 py-3 text-lg"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    🤖 Comprendre les ordres de grandeur
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    L'IA va t'expliquer la logique sans te donner la réponse
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  {isAIThinking || isAILoading ? (
                    <div className="flex flex-col items-center gap-4 py-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader2 className="w-10 h-10 text-teal-500" />
                      </motion.div>
                      <p className="text-muted-foreground">
                        Je réfléchis à comment t'expliquer... 🤔
                      </p>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-2xl p-5 text-left border border-teal-200 dark:border-teal-700">
                      <div className="flex items-center gap-2 mb-3">
                        <Bot className="w-6 h-6 text-teal-600" />
                        <h3 className="font-bold text-foreground">Ton tuteur t'explique :</h3>
                      </div>
                      <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                        {aiExplanation || aiMessage || "Désolé, je n'ai pas pu générer une explication. Réessaie !"}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
              
              <p className="text-muted-foreground mt-6">
                ✨ Reviens demain pour découvrir une nouvelle question !
              </p>
            </div>
          ) : (
            // Formulaire de réponse
            <>
              {/* Question du jour */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-teal-500/20 text-teal-400 text-xs font-semibold px-3 py-1 rounded-full">
                    Question #{question?.id}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {question?.theme}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                  {question?.question}
                </h2>
              </div>

              {/* Choix QCM */}
              <div className="mb-8">
                <RadioGroup
                  value={selectedChoice}
                  onValueChange={setSelectedChoice}
                  className="space-y-3"
                >
                  {(['A', 'B', 'C', 'D'] as const).map((letter) => (
                    <motion.div
                      key={letter}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <Label
                        htmlFor={`choice-${letter}`}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedChoice === letter
                            ? 'border-teal-500 bg-teal-500/10'
                            : 'border-muted hover:border-muted-foreground/50'
                        }`}
                      >
                        <RadioGroupItem
                          value={letter}
                          id={`choice-${letter}`}
                          className="sr-only"
                        />
                        <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                          selectedChoice === letter
                            ? 'bg-teal-500 text-white'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {letter}
                        </span>
                        <span className="text-foreground flex-1">
                          {question?.choices[letter]}
                        </span>
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>
              </div>

              {/* Justification */}
              <div className="mb-8">
                <Label htmlFor="justification" className="text-lg font-semibold text-foreground mb-3 block">
                  Pourquoi tu penses cela ? 🤔
                </Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Explique ton raisonnement. Il n'y a pas de mauvaise réponse si tu réfléchis !
                </p>
                <Textarea
                  id="justification"
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  placeholder="J'ai choisi cette réponse parce que..."
                  className="min-h-[120px] resize-none"
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground mt-2 text-right">
                  {justification.length}/500 caractères
                </p>
              </div>

              {/* Bouton de validation */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !selectedChoice || justification.trim().length < 10}
                  className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      J'enregistre ma réponse
                    </>
                  )}
                </Button>
              </motion.div>

              {/* Note pédagogique */}
              <p className="text-center text-xs text-muted-foreground mt-6">
                💡 L'important n'est pas d'avoir la bonne réponse, mais de réfléchir !
              </p>
            </>
          )}
        </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ComprendreLeMondeSection;
