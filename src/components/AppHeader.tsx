import React from 'react';
import { Home, LogOut, ChevronLeft, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Avatar from './Avatar';

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  showLogout?: boolean;
  showHome?: boolean;
  onBack?: () => void;
  onLogout?: () => void;
  onHome?: () => void;
  className?: string;
  variant?: 'default' | 'transparent' | 'solid';
  backLabel?: string;
  username?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  showLogout = true,
  showHome = true,
  onBack,
  onLogout,
  onHome,
  className,
  variant = 'default',
  backLabel = 'Retour',
  username,
}) => {
  const bgClasses = {
    default: 'bg-card/80 backdrop-blur-md border-b border-border/50 shadow-lg',
    transparent: 'bg-transparent',
    solid: 'bg-card border-b border-border shadow-lg',
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'sticky top-0 z-40 px-4 py-3',
        bgClasses[variant],
        className
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Côté gauche - Navigation */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {showBack && onBack && (
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground hover:bg-muted/50 shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{backLabel}</span>
            </Button>
          )}

          {showHome && onHome && !showBack && (
            <Button
              onClick={onHome}
              variant="ghost"
              size="sm"
              className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground hover:bg-muted/50 shrink-0"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Accueil</span>
            </Button>
          )}

          {/* Titre central */}
          {(title || subtitle) && (
            <div className="min-w-0 flex-1 text-center sm:text-left">
              {title && (
                <h1 className="text-lg font-bold text-foreground truncate">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-xs text-muted-foreground truncate">
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Côté droit - User & Déconnexion */}
        <div className="flex items-center gap-3 shrink-0">
          {showHome && onHome && showBack && (
            <Button
              onClick={onHome}
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary hidden sm:flex"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Accueil</span>
            </Button>
          )}

          {/* User Display */}
          <div className="flex items-center gap-2 bg-muted/30 rounded-full px-3 py-1.5">
            <Avatar name={username || 'Élève'} size="sm" className="border-2 border-primary/30" />
            <div className="hidden md:flex flex-col items-start">
              <span className="text-xs font-semibold text-foreground">{username || 'Élève'}</span>
              <span className="text-[10px] text-muted-foreground">Connecté</span>
            </div>
          </div>

          {showLogout && onLogout && (
            <Button
              onClick={onLogout}
              variant="ghost"
              size="icon"
              className="text-foreground/60 hover:text-destructive hover:bg-destructive/10 transition-colors"
              title="Déconnexion"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default AppHeader;
