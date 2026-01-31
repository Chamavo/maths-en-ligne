import React from 'react';
import { Home, LogOut, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
}) => {
  const bgClasses = {
    default: 'bg-card/95 backdrop-blur-sm border-b border-border shadow-sm',
    transparent: 'bg-transparent',
    solid: 'bg-card border-b border-border shadow-sm',
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
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/80 shrink-0"
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
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/80 shrink-0"
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

        {/* Côté droit - Déconnexion */}
        <div className="flex items-center gap-2 shrink-0">
          {showHome && onHome && showBack && (
            <Button
              onClick={onHome}
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Accueil</span>
            </Button>
          )}
          
          {showLogout && onLogout && (
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default AppHeader;
