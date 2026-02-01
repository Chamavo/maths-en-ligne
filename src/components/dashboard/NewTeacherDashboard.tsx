import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Search, Users, TrendingUp, Clock, AlertTriangle, ChevronRight,
  RefreshCw, Eye, RotateCcw, UserPlus, Home, LogOut, Globe, Calculator, BookOpen, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  StudentProgress, 
  resetStudentProgress,
} from '@/types/studentProgress';
import { useEvaluation } from '@/hooks/useEvaluation';
import { supabase } from '@/integrations/supabase/client';
import { worldQuestions } from '@/data/worldQuestions';
import StudentManagement from './StudentManagement';
// DataMigration removed - migration not needed with new auth system

interface NewTeacherDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'overview' | 'students' | 'management';

interface StudentSummary {
  username: string;
  level: number;
  progression: number;
  avgScore: number;
  totalTime: number;
  lastActivity: string;
  status: 'ok' | 'warning' | 'danger';
  totalAttempts: number;
}

interface WorldResponse {
  id: string;
  username: string;
  questionId: number;
  questionText: string;
  choice: string;
  justification: string;
  responseDate: string;
}

const NewTeacherDashboard: React.FC<NewTeacherDashboardProps> = ({ isOpen, onClose }) => {
  const [students, setStudents] = useState<StudentProgress[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [worldResponses, setWorldResponses] = useState<WorldResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const { getAllEvaluations } = useEvaluation();

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      Promise.all([
        loadStudents(),
        loadWorldResponses(),
      ]).finally(() => setIsLoading(false));
    }
  }, [isOpen]);

  const loadStudents = async () => {
    // 1. Récupérer les élèves depuis Supabase (source de vérité pour les comptes)
    let supabaseStudents: any[] = [];
    try {
      const { data, error } = await supabase.functions.invoke('student-auth', {
        body: { action: 'list' }
      });
      if (!error && data?.students) {
        supabaseStudents = data.students;
      }
    } catch (e) {
      console.error('Error fetching Supabase students:', e);
    }

    // 2. Construire la liste unifiée à partir de Supabase
    // NB: l'endpoint renvoie du camelCase (displayName/firstName/createdAt...),
    // mais on tolère le snake_case pour compat.
    const allStudents: StudentProgress[] = supabaseStudents
      .map((s) => {
        const studentName = (s.displayName || s.display_name || s.firstName || s.first_name || '').trim();
        if (!studentName) return null;

      const key = `studentProgress_${studentName.toLowerCase()}`;
      const localData = localStorage.getItem(key);
      
      if (localData) {
        try {
          const progress = JSON.parse(localData);
          return {
            username: studentName,
            currentLevel: progress.currentLevel || 1,
            totalAttempts: progress.totalAttempts || 0,
            lastActivity: progress.lastActivity || s.lastLoginAt || s.last_login_at || '',
            attempts: progress.attempts || [],
            errorStats: progress.errorStats || {
              fraction: 0, addition: 0, soustraction: 0, multiplication: 0,
              division: 0, pourcentage: 0, geometrie: 0, conversion: 0,
              vitesse: 0, partage: 0, temps: 0, autre: 0
            }
          };
        } catch (e) {
          console.error('Error parsing local progress:', e);
        }
      }
      
      // Pas de données localStorage, créer une entrée vide
      return {
        username: studentName,
        currentLevel: 1,
        totalAttempts: 0,
        lastActivity: s.lastLoginAt || s.last_login_at || '',
        attempts: [],
        errorStats: {
          fraction: 0, addition: 0, soustraction: 0, multiplication: 0,
          division: 0, pourcentage: 0, geometrie: 0, conversion: 0,
          vitesse: 0, partage: 0, temps: 0, autre: 0
        }
      };
      })
      .filter(Boolean) as StudentProgress[];
    
    setStudents(allStudents.sort((a, b) => a.username.localeCompare(b.username)));
  };

  const loadWorldResponses = async () => {
    try {
      const { data, error } = await supabase
        .from('world_question_responses')
        .select('*')
        .order('response_date', { ascending: false });
      
      if (error) throw error;
      
      const responses: WorldResponse[] = (data || []).map((r: any) => {
        const question = worldQuestions.find(q => q.id === r.question_id);
        return {
          id: r.id,
          username: r.username,
          questionId: r.question_id,
          questionText: question?.question || `Question #${r.question_id}`,
          choice: r.choice,
          justification: r.justification,
          responseDate: r.response_date,
        };
      });
      
      setWorldResponses(responses);
    } catch (error) {
      console.error('Error loading world responses:', error);
    }
  };

  const handleReset = (username: string) => {
    if (confirm(`Êtes-vous sûr de vouloir réinitialiser la progression de ${username} ?`)) {
      resetStudentProgress(username);
      loadStudents();
    }
  };

  // Calcul des données élèves
  const studentSummaries: StudentSummary[] = useMemo(() => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return students.map(student => {
      const totalTime = student.attempts.reduce((sum, a) => sum + a.timeSpent, 0);
      const avgScore = student.attempts.length > 0
        ? Math.round(student.attempts.reduce((sum, a) => sum + (a.score / a.totalQuestions) * 100, 0) / student.attempts.length)
        : 0;
      const progression = Math.min(100, Math.round((student.currentLevel / 20) * 100));
      
      let status: 'ok' | 'warning' | 'danger' = 'ok';
      if (student.lastActivity) {
        const lastDate = new Date(student.lastActivity);
        if (lastDate < oneWeekAgo) {
          status = 'danger';
        } else {
          const totalErrors = Object.values(student.errorStats).reduce((a, b) => a + b, 0);
          if (totalErrors >= 10 || avgScore < 50) {
            status = 'warning';
          }
        }
      } else if (student.totalAttempts === 0) {
        status = 'warning';
      }

      return {
        username: student.username,
        level: student.currentLevel,
        progression,
        avgScore,
        totalTime,
        lastActivity: student.lastActivity,
        status,
        totalAttempts: student.totalAttempts,
      };
    }).sort((a, b) => {
      // Trier par statut (danger en premier, puis warning, puis ok)
      const statusOrder = { danger: 0, warning: 1, ok: 2 };
      return statusOrder[a.status] - statusOrder[b.status];
    });
  }, [students]);

  // KPIs
  const kpis = useMemo(() => {
    const totalStudents = students.length;
    const avgLevel = students.length > 0 
      ? (students.reduce((sum, s) => sum + s.currentLevel, 0) / students.length).toFixed(1)
      : '-';
    const totalTimeSeconds = students.reduce((sum, s) => 
      sum + s.attempts.reduce((attemptSum, a) => attemptSum + a.timeSpent, 0), 0
    );
    const totalHours = Math.floor(totalTimeSeconds / 3600);
    const totalMins = Math.floor((totalTimeSeconds % 3600) / 60);
    
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const activeThisWeek = students.filter(s => 
      s.lastActivity && new Date(s.lastActivity) >= oneWeekAgo
    ).length;

    const alertCount = studentSummaries.filter(s => s.status !== 'ok').length;

    return {
      totalStudents,
      avgLevel,
      totalTime: `${totalHours}h${totalMins.toString().padStart(2, '0')}`,
      activeThisWeek,
      alertCount,
      worldResponses: worldResponses.length,
    };
  }, [students, studentSummaries, worldResponses]);

  const filteredStudents = studentSummaries.filter(s =>
    s.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return h > 0 ? `${h}h${m.toString().padStart(2, '0')}` : `${m}min`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Jamais';
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  const getStatusBadge = (status: 'ok' | 'warning' | 'danger') => {
    const styles = {
      ok: 'bg-green-100 text-green-700',
      warning: 'bg-orange-100 text-orange-700',
      danger: 'bg-red-100 text-red-700',
    };
    const labels = {
      ok: '✓ OK',
      warning: '⚠ À surveiller',
      danger: '⚠ Inactif',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-hidden"
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="absolute inset-0 bg-background flex flex-col"
        >
          {/* Header fixe */}
          <header className="sticky top-0 z-10 bg-card border-b px-4 py-3 shadow-sm">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">Tableau de bord</h1>
                  <p className="text-xs text-muted-foreground">
                    {kpis.totalStudents} élève(s)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    loadStudents();
                    loadWorldResponses();
                  }}
                  className="text-muted-foreground"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </header>

          {/* Navigation onglets */}
          <nav className="bg-muted/30 border-b px-4">
            <div className="max-w-6xl mx-auto flex gap-1 overflow-x-auto py-2">
              {[
                { id: 'overview', label: 'Vue générale', icon: TrendingUp },
                { id: 'students', label: 'Élèves', icon: Users },
                { id: 'management', label: 'Gestion', icon: UserPlus },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-card/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Contenu principal - Scrollable */}
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-6xl mx-auto p-4 pb-24 space-y-6">
              
              {/* Vue générale */}
              {activeTab === 'overview' && (
                <>
                  {/* KPIs */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-blue-50 rounded-2xl p-4">
                      <div className="flex items-center gap-2 text-blue-600 mb-1">
                        <Users className="w-4 h-4" />
                        <span className="text-xs font-medium">Élèves</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-700">{kpis.totalStudents}</div>
                    </div>
                    <div className="bg-green-50 rounded-2xl p-4">
                      <div className="flex items-center gap-2 text-green-600 mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs font-medium">Niveau moyen</span>
                      </div>
                      <div className="text-2xl font-bold text-green-700">{kpis.avgLevel}</div>
                    </div>
                    <div className="bg-purple-50 rounded-2xl p-4">
                      <div className="flex items-center gap-2 text-purple-600 mb-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-medium">Temps total</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-700">{kpis.totalTime}</div>
                    </div>
                    <div className="bg-orange-50 rounded-2xl p-4">
                      <div className="flex items-center gap-2 text-orange-600 mb-1">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-xs font-medium">Alertes</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-700">{kpis.alertCount}</div>
                    </div>
                  </div>

                  {/* Alertes rapides */}
                  {kpis.alertCount > 0 && (
                    <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                      <h3 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Élèves à surveiller
                      </h3>
                      <div className="space-y-2">
                        {studentSummaries.filter(s => s.status !== 'ok').slice(0, 5).map(student => (
                          <div
                            key={student.username}
                            className="flex items-center justify-between bg-white rounded-xl p-3"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                                student.status === 'danger' ? 'bg-red-500' : 'bg-orange-500'
                              }`}>
                                {student.username.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <span className="font-medium">{student.username}</span>
                                <p className="text-xs text-muted-foreground">
                                  {student.status === 'danger' 
                                    ? `Dernière activité: ${formatDate(student.lastActivity)}`
                                    : `Score moyen: ${student.avgScore}%`
                                  }
                                </p>
                              </div>
                            </div>
                            {getStatusBadge(student.status)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Modules résumé */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-card border rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calculator className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">Calcul</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {students.reduce((sum, s) => sum + s.totalAttempts, 0)} tentatives
                      </p>
                    </div>
                    <div className="bg-card border rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-5 h-5 text-green-500" />
                        <span className="font-medium">Révisions</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {kpis.activeThisWeek} actifs/semaine
                      </p>
                    </div>
                    <div className="bg-card border rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-orange-500" />
                        <span className="font-medium">Sujets</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        À consulter
                      </p>
                    </div>
                    <div className="bg-card border rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Globe className="w-5 h-5 text-teal-500" />
                        <span className="font-medium">Le Monde</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {kpis.worldResponses} réponses
                      </p>
                    </div>
                  </div>

                  {/* Réponses "Comprendre le monde" */}
                  {worldResponses.length > 0 && (
                    <div className="bg-card border rounded-2xl p-4">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-teal-500" />
                        Dernières réponses "Comprendre le monde"
                      </h3>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {worldResponses.slice(0, 10).map(response => (
                          <div key={response.id} className="bg-muted/30 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-teal-700">{response.username}</span>
                              <span className="text-xs text-muted-foreground">{response.responseDate}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                              {response.questionText}
                            </p>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded text-sm font-medium">
                                {response.choice}
                              </span>
                            </div>
                            <p className="text-sm italic text-muted-foreground">
                              "{response.justification}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Liste élèves */}
              {activeTab === 'students' && (
                <>
                  {/* Barre de recherche */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un élève..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Tableau des élèves */}
                  <div className="bg-card border rounded-2xl overflow-hidden">
                    {/* En-tête tableau (desktop) */}
                    <div className="hidden md:grid grid-cols-6 gap-4 p-4 bg-muted/50 text-sm font-medium text-muted-foreground border-b">
                      <span>Élève</span>
                      <span className="text-center">Niveau</span>
                      <span className="text-center">Score</span>
                      <span className="text-center">Temps</span>
                      <span className="text-center">Activité</span>
                      <span className="text-center">Statut</span>
                    </div>

                    {/* Liste */}
                    <div className="divide-y">
                      {filteredStudents.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                          <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p>Aucun élève trouvé</p>
                        </div>
                      ) : (
                        filteredStudents.map(student => (
                          <motion.div
                            key={student.username}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="p-4 hover:bg-muted/30 transition-colors"
                          >
                            {/* Vue mobile */}
                            <div className="md:hidden space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                                    student.status === 'ok' ? 'bg-green-500' :
                                    student.status === 'warning' ? 'bg-orange-500' : 'bg-red-500'
                                  }`}>
                                    {student.username.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <span className="font-medium">{student.username}</span>
                                    <p className="text-xs text-muted-foreground">
                                      Niveau {student.level} • {student.avgScore}%
                                    </p>
                                  </div>
                                </div>
                                {getStatusBadge(student.status)}
                              </div>
                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>⏱ {formatTime(student.totalTime)}</span>
                                <span>{formatDate(student.lastActivity)}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleReset(student.username)}
                                  className="text-orange-600"
                                >
                                  <RotateCcw className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Vue desktop */}
                            <div className="hidden md:grid grid-cols-6 gap-4 items-center">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                                  student.status === 'ok' ? 'bg-green-500' :
                                  student.status === 'warning' ? 'bg-orange-500' : 'bg-red-500'
                                }`}>
                                  {student.username.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-medium">{student.username}</span>
                              </div>
                              <div className="text-center">
                                <span className="text-lg font-bold">{student.level}</span>
                              </div>
                              <div className="text-center">
                                <span className={`font-medium ${
                                  student.avgScore >= 80 ? 'text-green-600' :
                                  student.avgScore >= 50 ? 'text-orange-600' : 'text-red-600'
                                }`}>
                                  {student.avgScore}%
                                </span>
                              </div>
                              <div className="text-center text-muted-foreground">
                                {formatTime(student.totalTime)}
                              </div>
                              <div className="text-center text-muted-foreground text-sm">
                                {formatDate(student.lastActivity)}
                              </div>
                              <div className="flex items-center justify-center gap-2">
                                {getStatusBadge(student.status)}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleReset(student.username)}
                                  className="text-orange-600 h-8 w-8"
                                  title="Réinitialiser"
                                >
                                  <RotateCcw className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Gestion des comptes */}
              {activeTab === 'management' && (
                <div className="space-y-6">
                  <StudentManagement />
                </div>
              )}
            </div>
          </main>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NewTeacherDashboard;
