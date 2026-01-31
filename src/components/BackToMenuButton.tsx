import React from 'react';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface BackToMenuButtonProps {
  onClick: () => void;
  variant?: 'default' | 'ghost' | 'icon';
  className?: string;
}

const BackToMenuButton: React.FC<BackToMenuButtonProps> = ({
  onClick,
  variant = 'default',
  className = '',
}) => {
  if (variant === 'icon') {
    return (
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`bg-card p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow ${className}`}
        title="Retour au menu principal"
      >
        <Home className="w-6 h-6 text-primary" />
      </motion.button>
    );
  }

  if (variant === 'ghost') {
    return (
      <Button
        onClick={onClick}
        variant="ghost"
        className={`flex items-center gap-2 ${className}`}
      >
        <Home className="w-5 h-5" />
        Menu principal
      </Button>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center gap-2 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold px-4 py-2 rounded-lg transition ${className}`}
    >
      <Home className="w-5 h-5" />
      Menu principal
    </motion.button>
  );
};

export default BackToMenuButton;
