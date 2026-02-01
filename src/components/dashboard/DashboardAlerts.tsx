import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, Clock, CheckCircle, User, Sparkles } from 'lucide-react';

export interface Alert {
  type: 'danger' | 'warning' | 'info' | 'success';
  message: string;
  student: string;
  icon: React.ReactNode;
}

interface DashboardAlertsProps {
  alerts: Alert[];
}

const alertStyles = {
  danger: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: 'text-red-500',
    text: 'text-red-700',
  },
  warning: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    icon: 'text-orange-500',
    text: 'text-orange-700',
  },
  info: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    icon: 'text-yellow-500',
    text: 'text-yellow-700',
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: 'text-green-500',
    text: 'text-green-700',
  },
};

const DashboardAlerts: React.FC<DashboardAlertsProps> = ({ alerts }) => {
  if (alerts.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <Sparkles className="w-10 h-10 text-green-500 mx-auto mb-3" />
        <p className="text-green-700 font-medium">Tous les voyants sont au vert ! 🎉</p>
        <p className="text-green-600 text-sm">Aucune alerte à signaler</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border shadow-sm">
      <div className="p-4 border-b flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-orange-500" />
        <h3 className="font-bold text-foreground">Alertes et recommandations</h3>
        <span className="ml-auto bg-orange-100 text-orange-700 text-xs font-medium px-2 py-1 rounded-full">
          {alerts.length}
        </span>
      </div>
      <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
        {alerts.map((alert, index) => {
          const style = alertStyles[alert.type];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`${style.bg} ${style.border} border rounded-xl p-4 flex items-start gap-3`}
            >
              <div className={`${style.icon} flex-shrink-0 mt-0.5`}>
                {alert.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold text-foreground">{alert.student}</span>
                </div>
                <p className={`${style.text} text-sm`}>{alert.message}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardAlerts;
