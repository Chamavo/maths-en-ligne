import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, LogIn, Eye, EyeOff, AlertCircle, Star, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useStudentAuth } from '@/hooks/useStudentAuth';

interface StudentLoginProps {
  onLoginSuccess: () => void;
  onTeacherLogin: () => void;
}

const StudentLogin: React.FC<StudentLoginProps> = ({ onLoginSuccess, onTeacherLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, loading: isLoading } = useStudentAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !password.trim()) {
      return;
    }

    const success = await login(firstName.trim(), password);
    if (success) {
      onLoginSuccess();
    } else {
      setError("Prénom ou mot de passe incorrect");
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="kumon-shape kumon-shape-1" />
      <div className="kumon-shape kumon-shape-2" />
      <div className="kumon-shape kumon-shape-3" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-card/90 backdrop-blur-md border-border/50 shadow-2xl overflow-hidden">
          {/* Top gradient bar */}
          <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
          
          <CardHeader className="text-center pb-2 pt-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="relative w-24 h-24 mx-auto mb-4"
            >
              {/* Animated stars around logo */}
              <motion.div 
                className="absolute -top-2 -right-2"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                <Star className="w-6 h-6 text-warning" fill="currentColor" />
              </motion.div>
              <motion.div 
                className="absolute -bottom-1 -left-1"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="w-5 h-5 text-warning" fill="currentColor" />
              </motion.div>
              
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-glow-blue">
                <span className="text-5xl">🎓</span>
              </div>
            </motion.div>
            
            <CardTitle className="text-3xl font-extrabold gradient-text">
              Maths en ligne
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground mt-2">
              Connecte-toi pour commencer à apprendre ! 🚀
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-4 pb-8 px-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Alert variant="destructive" className="bg-destructive/10 border-destructive/30">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <User className="h-4 w-4 text-primary" />
                  Mon prénom
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Entre ton prénom..."
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="h-12 text-lg bg-muted/50 border-border/50 focus:border-primary focus:ring-primary/30 transition-all"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  data-form-type="other"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <Lock className="h-4 w-4 text-secondary" />
                  Mon mot de passe
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Entre ton mot de passe..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 text-lg bg-muted/50 border-border/50 focus:border-secondary focus:ring-secondary/30 transition-all pr-12"
                    autoComplete="off"
                    data-form-type="other"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !firstName.trim() || !password.trim()}
                className="w-full h-12 text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all shadow-lg hover:shadow-glow-blue text-primary-foreground"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Rocket className="mr-2 h-5 w-5" />
                    C'est parti !
                  </>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-card text-muted-foreground">ou</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={onTeacherLogin}
              className="w-full h-10 text-muted-foreground hover:text-foreground hover:bg-muted/50 border-border/50"
            >
              Accès enseignant 👨‍🏫
            </Button>

            <p className="text-center text-xs text-muted-foreground mt-4">
              Demande ton mot de passe à ton professeur si tu ne l'as pas 😊
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StudentLogin;
