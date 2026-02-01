import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Search, LayoutDashboard, Users, TrendingUp, FileText, BookOpen, Globe,
  RefreshCw, Download, Filter, ChevronDown, AlertTriangle, TrendingDown, Clock, UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  StudentProgress, 
  getAllStudentsProgress, 
  resetStudentProgress,
  deleteStudent,
  ErrorByCategory 
} from '@/types/studentProgress';
import { useEvaluation } from '@/hooks/useEvaluation';
import { defaultRevisionCategories } from '@/components/RevisionsSection';
import { supabase } from '@/integrations/supabase/client';
import { worldQuestions } from '@/data/worldQuestions';

import DashboardKPIs from './dashboard/DashboardKPIs';
import DashboardAlerts, { Alert } from './dashboard/DashboardAlerts';
import DashboardActivityChart from './dashboard/DashboardActivityChart';
import DashboardStudentCard from './dashboard/DashboardStudentCard';
import DashboardModuleStats from './dashboard/DashboardModuleStats';
import StudentManagement from './dashboard/StudentManagement';

interface TeacherDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EvaluationData {
  id: string;
  username: string;
  score: number;
  totalQuestions: number;
  noteSur20: number;
  timeSpentSeconds: number;
  completedAt: string;
  errorsCount: number;
}

interface SubjectResult {
  username: string;
  subjectId: number;
  score: number;
  total: number;
  note: number;
  completedAt: string;
}

interface RevisionProgressData {
  username: string;
  categoryId: number;
  categoryName: string;
  sessionsCompleted: number;
  bestScore: number;
  mastered: boolean;
}

interface WorldResponse {
  id: string;
  username: string;
  questionId: number;
  questionText: string;
  choice: string;
  justification: string;
  responseDate: string;
  theme: string;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ isOpen, onClose }) => {
  const [students, setStudents] = useState<StudentProgress[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [evaluations, setEvaluations] = useState<EvaluationData[]>([]);
  const [subjectResults, setSubjectResults] = useState<SubjectResult[]>([]);
  const [revisionProgressData, setRevisionProgressData] = useState<RevisionProgressData[]>([]);
  const [worldResponses, setWorldResponses] = useState<WorldResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { getAllEvaluations } = useEvaluation();

  // Load all data on mount
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      Promise.all([
        loadStudents(),
        loadEvaluations(),
        loadSubjectResults(),
        loadRevisionProgress(),
        loadWorldResponses(),
      ]).finally(() => setIsLoading(false));
    }
  }, [isOpen]);

  const loadStudents = async () => {
    const allStudents = getAllStudentsProgress();
    
    // Check for students in mentalCalcSession_
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('mentalCalcSession_') && !key.includes('studentProgress')) {
        try {
          const session = JSON.parse(localStorage.getItem(key) || '{}');
          if (session.username && !session.isTeacher) {
            const exists = allStudents.find(s => 
              s.username.toLowerCase() === session.username.toLowerCase()
            );
            if (!exists) {
              allStudents.push({
                username: session.username,
                currentLevel: session.level || 1,
                totalAttempts: 0,
                lastActivity: '',
                attempts: [],
                errorStats: {
                  fraction: 0, addition: 0, soustraction: 0, multiplication: 0,
                  division: 0, pourcentage: 0, geometrie: 0, conversion: 0,
                  vitesse: 0, partage: 0, temps: 0, autre: 0
                }
              });
            }
          }
        } catch (e) {
          console.error('Error loading session:', e);
        }
      }
    }
    
    setStudents(allStudents.sort((a, b) => a.username.localeCompare(b.username)));
  };

  const loadEvaluations = async () => {
    const evals = await getAllEvaluations();
    setEvaluations(evals);
  };

  const loadSubjectResults = () => {
    const results: SubjectResult[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('exams_')) {
        try {
          const username = key.replace('exams_', '');
          const exams = JSON.parse(localStorage.getItem(key) || '[]');
          exams.forEach((exam: any) => {
            results.push({
              username,
              subjectId: exam.subjectId,
              score: exam.score,
              total: 50,
              note: exam.noteOn20,
              completedAt: exam.completedAt,
            });
          });
        } catch (e) {
          console.error('Error loading subject results:', e);
        }
      }
    }
    setSubjectResults(results.sort((a, b) => 
      new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    ));
  };

  const loadRevisionProgress = () => {
    const progressData: RevisionProgressData[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('revisionProgress_')) {
        try {
          const username = key.replace('revisionProgress_', '');
          const progress = JSON.parse(localStorage.getItem(key) || '[]');
          progress.forEach((p: any) => {
            const category = defaultRevisionCategories.find(c => c.id === p.categoryId);
            progressData.push({
              username,
              categoryId: p.categoryId,
              categoryName: category?.title || `Catégorie ${p.categoryId}`,
              sessionsCompleted: p.sessionsCompleted || 0,
              bestScore: p.bestScore || 0,
              mastered: p.mastered || false,
            });
          });
        } catch (e) {
          console.error('Error loading revision progress:', e);
        }
      }
    }
    setRevisionProgressData(progressData);
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
          theme: question?.theme || 'Inconnu',
        };
      });
      
      setWorldResponses(responses);
    } catch (error) {
      console.error('Error loading world responses:', error);
    }
  };

  const handleReset = (username: string) => {
    resetStudentProgress(username);
    loadStudents();
  };

  const handleDelete = (username: string) => {
    deleteStudent(username);
    loadStudents();
  };

  // Compute KPIs
  const kpis = useMemo(() => {
    const totalStudents = students.length;
    const avgLevel = students.length > 0 
      ? parseFloat((students.reduce((sum, s) => sum + s.currentLevel, 0) / students.length).toFixed(1))
      : 0;
    const totalAttempts = students.reduce((sum, s) => sum + s.totalAttempts, 0);
    const totalTimeSpent = students.reduce((sum, s) => 
      sum + s.attempts.reduce((attemptSum, a) => attemptSum + a.timeSpent, 0), 0
    );
    
    // Weekly active students
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weeklyActiveStudents = students.filter(s => {
      if (!s.lastActivity) return false;
      return new Date(s.lastActivity) >= oneWeekAgo;
    }).length;

    // Global progress (% students above level 5)
    const globalProgressPercent = students.length > 0
      ? Math.round((students.filter(s => s.currentLevel >= 5).length / students.length) * 100)
      : 0;

    return { totalStudents, avgLevel, totalAttempts, totalTimeSpent, weeklyActiveStudents, globalProgressPercent };
  }, [students]);

  // Compute alerts
  const alerts = useMemo((): Alert[] => {
    const result: Alert[] = [];
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    students.forEach(student => {
      // Red: Not connected for 7+ days
      if (student.lastActivity) {
        const lastDate = new Date(student.lastActivity);
        if (lastDate < oneWeekAgo) {
          result.push({
            type: 'danger',
            student: student.username,
            message: `Non connecté depuis plus de 7 jours`,
            icon: <AlertTriangle className="w-5 h-5" />,
          });
        }
      }

      // Orange: Too many errors
      const totalErrors = Object.values(student.errorStats).reduce((a, b) => a + b, 0);
      if (totalErrors >= 10) {
        const topError = Object.entries(student.errorStats)
          .sort(([_, a], [__, b]) => b - a)[0];
        result.push({
          type: 'warning',
          student: student.username,
          message: `${totalErrors} erreurs totales. Difficultés principales en ${topError[0]}`,
          icon: <TrendingDown className="w-5 h-5" />,
        });
      }
    });

    // Check for students who haven't done revisions in 2 weeks
    const activeRevisionStudents = new Set(revisionProgressData.map(r => r.username));
    students.forEach(student => {
      if (!activeRevisionStudents.has(student.username) && student.totalAttempts > 0) {
        result.push({
          type: 'info',
          student: student.username,
          message: `N'a pas encore commencé les révisions`,
          icon: <Clock className="w-5 h-5" />,
        });
      }
    });

    return result.slice(0, 10); // Limit to 10 alerts
  }, [students, revisionProgressData]);

  // Compute module stats
  const moduleStats = useMemo(() => {
    const maxLevel = students.length > 0 ? Math.max(...students.map(s => s.currentLevel)) : 0;
    const completionRate = students.length > 0
      ? Math.round((students.filter(s => s.currentLevel >= 20).length / students.length) * 100)
      : 0;

    const masteredCategories = revisionProgressData.filter(r => r.mastered);
    const uniqueMastered = new Set(masteredCategories.map(r => r.categoryId)).size;
    const avgBestScore = revisionProgressData.length > 0
      ? Math.round(revisionProgressData.reduce((sum, r) => sum + r.bestScore, 0) / revisionProgressData.length)
      : 0;

    const avgNote = subjectResults.length > 0
      ? subjectResults.reduce((sum, r) => sum + r.note, 0) / subjectResults.length
      : 0;
    const bestNote = subjectResults.length > 0 ? Math.max(...subjectResults.map(r => r.note)) : 0;

    const uniqueWorldParticipants = new Set(worldResponses.map(r => r.username)).size;

    return {
      calcul: {
        avgLevel: kpis.avgLevel,
        maxLevel,
        totalAttempts: kpis.totalAttempts,
        completionRate,
      },
      revision: {
        categoriesMastered: uniqueMastered,
        totalCategories: 6,
        avgBestScore,
      },
      sujets: {
        subjectsCompleted: subjectResults.length,
        totalSubjects: 50,
        avgNote,
        bestNote,
      },
      monde: {
        totalResponses: worldResponses.length,
        activeParticipants: uniqueWorldParticipants,
        avgStreak: 0,
      },
    };
  }, [students, revisionProgressData, subjectResults, worldResponses, kpis]);

  // Compute activity data for charts
  const activityData = useMemo(() => {
    const last7Days: { date: string; shortDate: string; sessions: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const shortDate = date.toLocaleDateString('fr-FR', { weekday: 'short' });
      
      // Count sessions for this day
      let sessions = 0;
      students.forEach(s => {
        s.attempts.forEach(a => {
          if (a.date?.startsWith(dateStr)) {
            sessions++;
          }
        });
      });
      
      last7Days.push({ date: dateStr, shortDate, sessions });
    }
    return last7Days;
  }, [students]);

  const performanceData = useMemo(() => {
    const last7Days: { date: string; shortDate: string; score: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const shortDate = date.toLocaleDateString('fr-FR', { weekday: 'short' });
      
      // Calculate average score for this day
      let totalScore = 0;
      let count = 0;
      students.forEach(s => {
        s.attempts.forEach(a => {
          if (a.date?.startsWith(dateStr)) {
            totalScore += a.score / Math.max(1, a.totalQuestions) * 100;
            count++;
          }
        });
      });
      
      last7Days.push({ 
        date: dateStr, 
        shortDate, 
        score: count > 0 ? Math.round(totalScore / count) : 0 
      });
    }
    return last7Days;
  }, [students]);

  const filteredStudents = students.filter(s =>
    s.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-card rounded-3xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col border"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary via-primary/90 to-secondary text-primary-foreground p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-foreground/20 rounded-2xl">
                  <LayoutDashboard className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Tableau de bord</h2>
                  <p className="text-primary-foreground/80">
                    {students.length} élève(s) • Vue d'ensemble en temps réel
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0"
                  onClick={() => {
                    loadStudents();
                    loadEvaluations();
                    loadSubjectResults();
                    loadRevisionProgress();
                    loadWorldResponses();
                  }}
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Actualiser
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={onClose}
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="border-b bg-muted/30 px-6 overflow-x-auto">
                <TabsList className="h-14 bg-transparent gap-1 min-w-max">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-card gap-2 px-4">
                    <LayoutDashboard className="w-4 h-4" />
                    Vue d'ensemble
                  </TabsTrigger>
                  <TabsTrigger value="accounts" className="data-[state=active]:bg-card gap-2 px-4">
                    <UserPlus className="w-4 h-4" />
                    Comptes
                  </TabsTrigger>
                  <TabsTrigger value="students" className="data-[state=active]:bg-card gap-2 px-4">
                    <Users className="w-4 h-4" />
                    Suivi ({students.length})
                  </TabsTrigger>
                  <TabsTrigger value="calcul" className="data-[state=active]:bg-card gap-2 px-4">
                    <TrendingUp className="w-4 h-4" />
                    Calcul
                  </TabsTrigger>
                  <TabsTrigger value="revisions" className="data-[state=active]:bg-card gap-2 px-4">
                    <BookOpen className="w-4 h-4" />
                    Révisions
                  </TabsTrigger>
                  <TabsTrigger value="sujets" className="data-[state=active]:bg-card gap-2 px-4">
                    <FileText className="w-4 h-4" />
                    Sujets ({subjectResults.length})
                  </TabsTrigger>
                  <TabsTrigger value="monde" className="data-[state=active]:bg-card gap-2 px-4">
                    <Globe className="w-4 h-4" />
                    Le Monde ({worldResponses.length})
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {/* Overview Tab */}
                <TabsContent value="overview" className="mt-0 space-y-6">
                  <DashboardKPIs {...kpis} />
                  <DashboardModuleStats stats={moduleStats} />
                  <DashboardActivityChart activityData={activityData} performanceData={performanceData} />
                  <DashboardAlerts alerts={alerts} />
                </TabsContent>

                {/* Accounts Management Tab */}
                <TabsContent value="accounts" className="mt-0 space-y-6">
                  <StudentManagement />
                </TabsContent>

                {/* Students Tracking Tab */}
                <TabsContent value="students" className="mt-0 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Rechercher un élève..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {filteredStudents.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Aucun élève trouvé</p>
                      </div>
                    ) : (
                      filteredStudents.map(student => (
                        <DashboardStudentCard
                          key={student.username}
                          student={student}
                          onReset={handleReset}
                          onDelete={handleDelete}
                        />
                      ))
                    )}
                  </div>
                </TabsContent>

                {/* Calcul Tab */}
                <TabsContent value="calcul" className="mt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-2xl p-5">
                      <div className="text-3xl font-bold text-blue-700">{kpis.avgLevel}</div>
                      <div className="text-blue-600">Niveau moyen</div>
                    </div>
                    <div className="bg-green-50 rounded-2xl p-5">
                      <div className="text-3xl font-bold text-green-700">{moduleStats.calcul.maxLevel}</div>
                      <div className="text-green-600">Niveau max atteint</div>
                    </div>
                    <div className="bg-purple-50 rounded-2xl p-5">
                      <div className="text-3xl font-bold text-purple-700">{kpis.totalAttempts}</div>
                      <div className="text-purple-600">Tentatives totales</div>
                    </div>
                    <div className="bg-orange-50 rounded-2xl p-5">
                      <div className="text-3xl font-bold text-orange-700">{moduleStats.calcul.completionRate}%</div>
                      <div className="text-orange-600">Taux de complétion</div>
                    </div>
                  </div>

                  {/* Evaluations section */}
                  <div className="bg-card border rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-500" />
                      Évaluations récentes
                    </h3>
                    {evaluations.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">Aucune évaluation enregistrée</p>
                    ) : (
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {evaluations.slice(0, 10).map(evaluation => (
                          <div key={evaluation.id} className="flex items-center justify-between bg-muted/30 rounded-xl p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                                {evaluation.username.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <span className="font-medium">{evaluation.username}</span>
                                <div className="text-xs text-muted-foreground">
                                  {new Date(evaluation.completedAt).toLocaleDateString('fr-FR')}
                                </div>
                              </div>
                            </div>
                            <div className={`text-xl font-bold ${
                              evaluation.noteSur20 >= 15 ? 'text-green-600' :
                              evaluation.noteSur20 >= 10 ? 'text-blue-600' : 'text-red-600'
                            }`}>
                              {evaluation.noteSur20}/20
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Revisions Tab */}
                <TabsContent value="revisions" className="mt-0 space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {defaultRevisionCategories.map(cat => {
                      const catData = revisionProgressData.filter(r => r.categoryId === cat.id);
                      const masteredCount = catData.filter(r => r.mastered).length;
                      return (
                        <div key={cat.id} className={`bg-gradient-to-br ${cat.color} rounded-2xl p-4 text-white`}>
                          <h4 className="font-bold mb-2">{cat.title}</h4>
                          <div className="text-2xl font-bold">{masteredCount}</div>
                          <div className="text-sm opacity-80">élève(s) maîtrise(nt)</div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-card border rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-4">Progression par élève</h3>
                    {revisionProgressData.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">Aucune donnée de révision</p>
                    ) : (
                      <div className="space-y-3">
                        {Object.entries(
                          revisionProgressData.reduce((acc, r) => {
                            if (!acc[r.username]) acc[r.username] = [];
                            acc[r.username].push(r);
                            return acc;
                          }, {} as Record<string, RevisionProgressData[]>)
                        ).map(([username, data]) => (
                          <div key={username} className="bg-muted/30 rounded-xl p-4">
                            <div className="font-medium mb-2">{username}</div>
                            <div className="flex flex-wrap gap-2">
                              {data.map(cat => (
                                <span 
                                  key={cat.categoryId}
                                  className={`px-3 py-1 rounded-full text-sm ${
                                    cat.mastered 
                                      ? 'bg-green-100 text-green-700' 
                                      : 'bg-orange-100 text-orange-700'
                                  }`}
                                >
                                  {cat.categoryName}: {cat.bestScore}/50
                                  {cat.mastered && ' ✓'}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Sujets Tab */}
                <TabsContent value="sujets" className="mt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-orange-50 rounded-2xl p-5">
                      <div className="text-3xl font-bold text-orange-700">
                        {subjectResults.length > 0 ? moduleStats.sujets.avgNote.toFixed(1) : '-'}/20
                      </div>
                      <div className="text-orange-600">Moyenne générale</div>
                    </div>
                    <div className="bg-green-50 rounded-2xl p-5">
                      <div className="text-3xl font-bold text-green-700">
                        {subjectResults.length > 0 ? moduleStats.sujets.bestNote : '-'}/20
                      </div>
                      <div className="text-green-600">Meilleure note</div>
                    </div>
                    <div className="bg-blue-50 rounded-2xl p-5">
                      <div className="text-3xl font-bold text-blue-700">{subjectResults.length}</div>
                      <div className="text-blue-600">Sujets complétés</div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-4">Historique des examens</h3>
                    {subjectResults.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">Aucun sujet terminé</p>
                    ) : (
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {subjectResults.map((result, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-muted/30 rounded-xl p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                                {result.subjectId}
                              </div>
                              <div>
                                <span className="font-medium">{result.username}</span>
                                <div className="text-xs text-muted-foreground">
                                  Sujet n°{result.subjectId} • {new Date(result.completedAt).toLocaleDateString('fr-FR')}
                                </div>
                              </div>
                            </div>
                            <div className={`text-xl font-bold ${
                              result.note >= 16 ? 'text-green-600' :
                              result.note >= 12 ? 'text-blue-600' :
                              result.note >= 10 ? 'text-orange-600' : 'text-red-600'
                            }`}>
                              {result.note.toFixed(1)}/20
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Monde Tab */}
                <TabsContent value="monde" className="mt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-teal-50 rounded-2xl p-5">
                      <div className="text-3xl font-bold text-teal-700">{worldResponses.length}</div>
                      <div className="text-teal-600">Réponses totales</div>
                    </div>
                    <div className="bg-cyan-50 rounded-2xl p-5">
                      <div className="text-3xl font-bold text-cyan-700">{moduleStats.monde.activeParticipants}</div>
                      <div className="text-cyan-600">Participants actifs</div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-4">Réponses récentes</h3>
                    {worldResponses.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">Aucune réponse enregistrée</p>
                    ) : (
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {worldResponses.slice(0, 20).map(response => (
                          <div key={response.id} className="bg-muted/30 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{response.username}</span>
                              <span className="text-xs text-muted-foreground">{response.responseDate}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{response.questionText}</p>
                            <div className="flex items-center gap-2">
                              <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-sm font-medium">
                                Réponse: {response.choice}
                              </span>
                              <span className="text-xs text-muted-foreground">{response.theme}</span>
                            </div>
                            <p className="mt-2 text-sm italic text-muted-foreground">
                              "{response.justification}"
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TeacherDashboard;
