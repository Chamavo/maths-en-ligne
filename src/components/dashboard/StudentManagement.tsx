import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserPlus,
  RefreshCw,
  Key,
  UserX,
  UserCheck,
  Copy,
  Check,
  Clock,
  Users,
  ArrowUpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useStudentManagement } from '@/hooks/useStudentAuth';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ALL_LEVELS, getLevelInfo } from '@/utils/exerciseGenerator';

interface LegacyStudent {
  username: string;
  isLegacy: true;
  currentLevel: number;
  lastActivity: string;
}

const StudentManagement: React.FC = () => {
  const {
    students: supabaseStudents,
    isLoading,
    fetchStudents,
    createStudent,
    updatePassword,
    toggleActive,
    generatePassword
  } = useStudentManagement();

  const [legacyStudents, setLegacyStudents] = useState<LegacyStudent[]>([]);
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isLevelDialogOpen, setIsLevelDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>('1');

  // Form states
  const [newFirstName, setNewFirstName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newDisplayName, setNewDisplayName] = useState('');
  const [copiedPassword, setCopiedPassword] = useState<string | null>(null);

  // Helper functions
  const handleGeneratePassword = () => {
    setNewPassword(generatePassword());
  };

  const handleCopyPassword = async (password: string) => {
    try {
      await navigator.clipboard.writeText(password);
      setCopiedPassword(password);
      setTimeout(() => setCopiedPassword(null), 2000);
      toast({ title: "Copié !", description: "Mot de passe copié dans le presse-papiers" });
    } catch (e) {
      console.error('Failed to copy:', e);
    }
  };

  // Charger les élèves legacy non migrés
  const loadLegacyStudents = useCallback(() => {
    const supabaseNames = new Set(
      supabaseStudents.map(s => (s.display_name || s.first_name).toLowerCase())
    );

    const legacy: LegacyStudent[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('studentProgress_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          if (data.username && !supabaseNames.has(data.username.toLowerCase())) {
            legacy.push({
              username: data.username,
              isLegacy: true,
              currentLevel: data.currentLevel || 1,
              lastActivity: data.lastActivity || ''
            });
          }
        } catch (e) {
          console.error('Error parsing legacy student:', e);
        }
      }
    }
    setLegacyStudents(legacy.sort((a, b) => a.username.localeCompare(b.username)));
  }, [supabaseStudents]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    loadLegacyStudents();
  }, [loadLegacyStudents]);

  // Combine les élèves Supabase et legacy
  const allStudents = useMemo(() => {
    const combined: any[] = [
      ...supabaseStudents.map(s => ({ ...s, isLegacy: false })),
      ...legacyStudents.map(s => ({
        id: `legacy_${s.username}`,
        first_name: s.username,
        display_name: s.username,
        is_active: true,
        last_login_at: s.lastActivity,
        created_at: null,
        isLegacy: true,
        currentLevel: s.currentLevel
      }))
    ];
    return combined.sort((a, b) =>
      (a.display_name || a.first_name).localeCompare(b.display_name || b.first_name)
    );
  }, [supabaseStudents, legacyStudents]);

  // Get current level from profile first, then fallback to localStorage
  const getStudentLevel = (studentOrName: any): number => {
    // If it's a string, use it directly as the name
    const studentName = typeof studentOrName === 'string' 
      ? studentOrName 
      : (studentOrName?.display_name || studentOrName?.first_name || '');
    
    // New backend source (only if object was passed)
    if (typeof studentOrName === 'object' && studentOrName?.student_progression?.current_level) {
      return studentOrName.student_progression.current_level;
    }
    
    // Legacy fallback using localStorage
    if (studentName) {
      const key = `studentProgress_${studentName.toLowerCase()}`;
      const data = localStorage.getItem(key);
      if (data) {
        try {
          const progress = JSON.parse(data);
          return progress.currentLevel || 1;
        } catch (e) {
          return 1;
        }
      }
    }
    return 1;
  };

  const handleRestoreLevel = async () => {
    if (!selectedStudent) return;

    const levelNum = parseFloat(selectedLevel);
    const studentName = selectedStudent.display_name || selectedStudent.first_name;
    
    // Always use localStorage for level storage (student_progression table doesn't exist)
    const key = `studentProgress_${studentName.toLowerCase()}`;
    const data = localStorage.getItem(key);
    let progress;
    try {
      progress = data ? JSON.parse(data) : { username: studentName };
    } catch {
      progress = { username: studentName };
    }
    progress.currentLevel = levelNum;
    localStorage.setItem(key, JSON.stringify(progress));

    toast({
      title: "Niveau mis à jour !",
      description: `${selectedStudent.first_name} est maintenant au niveau ${levelNum}`,
    });

    setIsLevelDialogOpen(false);
    setSelectedStudent(null);
  };

  const handleCreateStudent = async () => {
    if (!newFirstName.trim() || !newPassword.trim()) {
      toast({
        title: "Erreur",
        description: "Le prénom et le mot de passe sont requis",
        variant: "destructive"
      });
      return;
    }

    const result = await createStudent(newFirstName, newPassword, newDisplayName);

    if (result.success) {
      toast({
        title: "Élève créé !",
        description: `${newFirstName} peut maintenant se connecter`,
      });
      setIsCreateDialogOpen(false);
      setNewFirstName('');
      setNewPassword('');
      setNewDisplayName('');
    } else {
      toast({
        title: "Erreur",
        description: result.error || "Impossible de créer l'élève",
        variant: "destructive"
      });
    }
  };

  const handleUpdatePassword = async () => {
    if (!selectedStudent || !newPassword.trim()) return;

    const result = await updatePassword(selectedStudent.id, newPassword);

    if (result.success) {
      toast({
        title: "Mot de passe mis à jour !",
        description: `Le nouveau mot de passe de ${selectedStudent.first_name} est prêt`,
      });
      setIsPasswordDialogOpen(false);
      setNewPassword('');
      setSelectedStudent(null);
    } else {
      toast({
        title: "Erreur",
        description: result.error || "Impossible de mettre à jour le mot de passe",
        variant: "destructive"
      });
    }
  };

  const handleToggleActive = async (student: any) => {
    const result = await toggleActive(student.id, !student.is_active);

    if (result.success) {
      toast({
        title: student.is_active ? "Compte désactivé" : "Compte réactivé",
        description: `${student.first_name} ${student.is_active ? 'ne peut plus' : 'peut à nouveau'} se connecter`,
      });
    } else {
      toast({
        title: "Erreur",
        description: result.error,
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Jamais';
    return format(new Date(dateString), 'dd MMM yyyy à HH:mm', { locale: fr });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Gestion des élèves
            </CardTitle>
            <CardDescription>
              {allStudents.length} élève(s) • {supabaseStudents.length} compte(s) Supabase • {legacyStudents.length} legacy
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchStudents}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Nouvel élève
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Créer un compte élève</DialogTitle>
                  <DialogDescription>
                    Créez un nouveau compte pour un élève. Le mot de passe sera à communiquer à l'élève.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      placeholder="Ex: Lucas"
                      value={newFirstName}
                      onChange={(e) => setNewFirstName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Nom d'affichage (optionnel)</Label>
                    <Input
                      id="displayName"
                      placeholder="Ex: Lucas M."
                      value={newDisplayName}
                      onChange={(e) => setNewDisplayName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="password"
                        placeholder="Mot de passe"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleGeneratePassword}
                      >
                        Générer
                      </Button>
                    </div>
                    {newPassword && (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                        <code className="flex-1 font-mono text-lg">{newPassword}</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopyPassword(newPassword)}
                        >
                          {copiedPassword === newPassword ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleCreateStudent} disabled={!newFirstName || !newPassword}>
                    Créer le compte
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {allStudents.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Aucun élève</p>
            <p className="text-sm">Créez votre premier compte élève pour commencer</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Élève</TableHead>
                <TableHead>Niveau</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Dernière connexion</TableHead>
                <TableHead>Créé le</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {allStudents.map((student) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="font-medium">{student.first_name}</p>
                          {student.display_name && student.display_name !== student.first_name && (
                            <p className="text-sm text-muted-foreground">{student.display_name}</p>
                          )}
                        </div>
                        {student.isLegacy && (
                          <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                            Non migré
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {getLevelInfo(getStudentLevel(student)).name}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {student.isLegacy ? (
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Legacy
                        </Badge>
                      ) : student.is_active ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Actif
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          Désactivé
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDate(student.last_login_at)}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {student.isLegacy ? '-' : formatDate(student.created_at)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!student.isLegacy && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedStudent(student);
                                setNewPassword('');
                                setIsPasswordDialogOpen(true);
                              }}
                            >
                              <Key className="h-3 w-3 mr-1" />
                              Mot de passe
                            </Button>
                            <Button
                              size="sm"
                              variant={student.is_active ? "outline" : "default"}
                              onClick={() => handleToggleActive(student)}
                            >
                              {student.is_active ? (
                                <>
                                  <UserX className="h-3 w-3 mr-1" />
                                  Désactiver
                                </>
                              ) : (
                                <>
                                  <UserCheck className="h-3 w-3 mr-1" />
                                  Réactiver
                                </>
                              )}
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-blue-50"
                          onClick={() => {
                            setSelectedStudent(student);
                            const currentLevel = getStudentLevel(student);
                            setSelectedLevel(String(currentLevel));
                            setIsLevelDialogOpen(true);
                          }}
                        >
                          <ArrowUpCircle className="h-3 w-3 mr-1" />
                          Niveau
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        )}

        {/* Password Update Dialog */}
        <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier le mot de passe</DialogTitle>
              <DialogDescription>
                Définissez un nouveau mot de passe pour {selectedStudent?.first_name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nouveau mot de passe</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Nouveau mot de passe"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGeneratePassword}
                  >
                    Générer
                  </Button>
                </div>
                {newPassword && (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                    <code className="flex-1 font-mono text-lg">{newPassword}</code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopyPassword(newPassword)}
                    >
                      {copiedPassword === newPassword ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleUpdatePassword} disabled={!newPassword}>
                Mettre à jour
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Level Update Dialog */}
        <Dialog open={isLevelDialogOpen} onOpenChange={setIsLevelDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier le niveau</DialogTitle>
              <DialogDescription>
                Restaurer ou modifier le niveau de {selectedStudent?.display_name || selectedStudent?.first_name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Niveau actuel : {selectedStudent && getLevelInfo(getStudentLevel(selectedStudent)).name}</Label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    {ALL_LEVELS.filter(l => l !== 0).map((level) => (
                      <SelectItem key={level} value={String(level)}>
                        {getLevelInfo(level).name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsLevelDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleRestoreLevel} className="bg-blue-600 hover:bg-blue-700">
                Restaurer à ce niveau
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default StudentManagement;