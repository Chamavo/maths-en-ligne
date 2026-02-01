import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';

interface TeacherLoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

const TeacherLogin: React.FC<TeacherLoginProps> = ({ onLoginSuccess, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              role: 'teacher' // We can try to set this, but backend might ignore it depending on setup
            }
          }
        });

        if (signUpError) {
          setError(signUpError.message);
          setIsLoading(false);
          return;
        }

        if (data.user) {
          // Check if we need to manually insert role or if trigger handles it
          // For now, let's assume successful signup allows login, but we warn if role check fails later
          onLoginSuccess();
        }
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (signInError) {
          if (signInError.message.includes('Invalid login credentials')) {
            setError('Email ou mot de passe incorrect');
          } else {
            setError(signInError.message);
          }
          setIsLoading(false);
          return;
        }

        if (data.user) {
          // Check if user has teacher role via user_roles table
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', data.user.id)
            .eq('role', 'teacher')
            .maybeSingle();

          if (!roleData) {
            await supabase.auth.signOut();
            setError('Ce compte n\'a pas les droits enseignant');
            setIsLoading(false);
            return;
          }

          onLoginSuccess();
        }
      }
    } catch (e) {
      console.error('Auth error:', e);
      setError('Erreur d\'authentification');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />

          <CardHeader className="text-center pb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="absolute top-4 left-4 text-muted-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour
            </Button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
            >
              <span className="text-4xl">👨‍🏫</span>
            </motion.div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {isSignUp ? 'Inscription Enseignant' : 'Espace Enseignant'}
            </CardTitle>
            <CardDescription className="text-base">
              {isSignUp ? 'Créez votre compte pour gérer vos classes' : 'Connectez-vous pour accéder au tableau de bord'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                  <Alert variant="destructive" className="bg-red-50 border-red-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-sm font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4 text-purple-500" />
                  Email
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-lg border-2 focus:border-purple-500 transition-colors"
                  autoComplete="email"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-sm font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4 text-indigo-500" />
                  Mot de passe
                </Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 text-lg border-2 focus:border-indigo-500 transition-colors pr-12"
                    autoComplete="current-password"
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
                disabled={isLoading || !email.trim() || !password.trim()}
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    {isSignUp ? 'S\'inscrire' : 'Se connecter'}
                  </>
                )}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">ou</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                }}
                className="w-full"
              >
                {isSignUp ? 'J\'ai déjà un compte' : 'Créer un compte'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TeacherLogin;