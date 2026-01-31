import React from 'react';
import { BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

interface FloatingDashboardButtonProps {
  onClick: () => void;
}

const FloatingDashboardButton: React.FC<FloatingDashboardButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 bg-gradient-to-br from-violet-500 to-violet-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
      title="Tableau de bord enseignant"
    >
      <BarChart3 className="w-6 h-6" />
    </motion.button>
  );
};

export default FloatingDashboardButton;
