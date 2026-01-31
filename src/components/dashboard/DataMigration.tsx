import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database,
  RefreshCw,
  ArrowRight,
  Check,
  AlertCircle,
  Link2,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface MigrationCandidate {
  name: string;
  matchedStudent: { id: string; firstName: string } | null;
  sessionsCount: number;
  evaluationsCount: number;
  worldResponsesCount: number;
}

interface Student {
  id: string;
  firstName: string;
}

const DataMigration: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [candidates, setCandidates] = useState<MigrationCandidate[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedMappings, setSelectedMappings] = useState<Record<string, string>>({});
  const [migratedNames, setMigratedNames] = useState<Set<string>>(new Set());
  const [migrationInProgress, setMigrationInProgress] = useState<string | null>(null);

  const fetchCandidates = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('student-auth', {
        body: { action: 'get-migration-candidates' }
      });

      if (error) {
        console.error('Fetch candidates error:', error);
        toast({
          title: "Erreur",
          description: "Impossible de récupérer les données à migrer",
          variant: "destructive"
        });
        return;
      }

      setCandidates(data.candidates || []);
      setStudents(data.students || []);

      // Pré-remplir les correspondances automatiques
      const autoMappings: Record<string, string> = {};
      data.candidates?.forEach((c: MigrationCandidate) => {
        if (c.matchedStudent) {
          autoMappings[c.name] = c.matchedStudent.id;
        }
      });
      setSelectedMappings(autoMappings);
    } catch (e) {
      console.error('Fetch error:', e);
    }
    setIsLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const handleMigrateOne = async (candidate: MigrationCandidate) => {
    const studentId = selectedMappings[candidate.name];
    if (!studentId) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un compte élève",
        variant: "destructive"
      });
      return;
    }

    setMigrationInProgress(candidate.name);
    try {
      const { data, error } = await supabase.functions.invoke('student-auth', {
        body: { 
          action: 'migrate-student-data',
          studentId,
          studentName: candidate.name
        }
      });

      if (error || data.error) {
        toast({
          title: "Erreur",
          description: data?.error || "Erreur lors de la migration",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Migration réussie !",
        description: `${data.migratedCount} enregistrements liés à ${candidate.name}`,
      });

      setMigratedNames(prev => new Set([...prev, candidate.name]));
    } catch (e) {
      console.error('Migration error:', e);
      toast({
        title: "Erreur",
        description: "Erreur lors de la migration",
        variant: "destructive"
      });
    }
    setMigrationInProgress(null);
  };

  const handleMigrateAll = async () => {
    const candidatesToMigrate = candidates.filter(c => 
      selectedMappings[c.name] && !migratedNames.has(c.name)
    );

    for (const candidate of candidatesToMigrate) {
      await handleMigrateOne(candidate);
    }

    toast({
      title: "Migration terminée",
      description: `${candidatesToMigrate.length} élèves migrés`,
    });
  };

  const getTotalRecords = (candidate: MigrationCandidate) => {
    return candidate.sessionsCount + candidate.evaluationsCount + candidate.worldResponsesCount;
  };

  const unmatchedCount = candidates.filter(c => !selectedMappings[c.name]).length;
  const migratedCount = migratedNames.size;
  const pendingCount = candidates.length - migratedCount;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-purple-500" />
              Migration des données
            </CardTitle>
            <CardDescription>
              Liez les données historiques aux nouveaux comptes élèves
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchCandidates}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
            {candidates.length > 0 && pendingCount > 0 && (
              <Button
                size="sm"
                onClick={handleMigrateAll}
                disabled={unmatchedCount === pendingCount || migrationInProgress !== null}
                className="bg-gradient-to-r from-purple-600 to-pink-600"
              >
                <Link2 className="h-4 w-4 mr-2" />
                Tout migrer ({pendingCount - unmatchedCount})
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Stats */}
        {candidates.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-3 bg-blue-50 rounded-lg text-center">
              <p className="text-2xl font-bold text-blue-700">{candidates.length}</p>
              <p className="text-sm text-blue-600">Total à migrer</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg text-center">
              <p className="text-2xl font-bold text-orange-700">{unmatchedCount}</p>
              <p className="text-sm text-orange-600">Sans correspondance</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-700">{migratedCount}</p>
              <p className="text-sm text-green-600">Migrés</p>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
          </div>
        ) : candidates.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <p className="text-lg font-medium">Aucune donnée à migrer</p>
            <p className="text-sm">Toutes les données sont déjà liées aux comptes élèves</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom dans les données</TableHead>
                <TableHead>Enregistrements</TableHead>
                <TableHead>Lier au compte</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {candidates.map((candidate) => {
                  const isMigrated = migratedNames.has(candidate.name);
                  const isProcessing = migrationInProgress === candidate.name;
                  
                  return (
                    <motion.tr
                      key={candidate.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isMigrated ? 0.5 : 1 }}
                      exit={{ opacity: 0 }}
                      className={isMigrated ? 'bg-green-50' : ''}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium capitalize">{candidate.name}</span>
                          {candidate.matchedStudent && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              Correspondance auto
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {candidate.sessionsCount > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {candidate.sessionsCount} sessions
                            </Badge>
                          )}
                          {candidate.evaluationsCount > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {candidate.evaluationsCount} éval.
                            </Badge>
                          )}
                          {candidate.worldResponsesCount > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {candidate.worldResponsesCount} monde
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {isMigrated ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <Check className="h-4 w-4" />
                            <span>Migré</span>
                          </div>
                        ) : (
                          <Select
                            value={selectedMappings[candidate.name] || ''}
                            onValueChange={(value) => setSelectedMappings(prev => ({
                              ...prev,
                              [candidate.name]: value
                            }))}
                          >
                            <SelectTrigger className="w-48">
                              <SelectValue placeholder="Sélectionner..." />
                            </SelectTrigger>
                            <SelectContent>
                              {students.map((student) => (
                                <SelectItem key={student.id} value={student.id}>
                                  {student.firstName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {!isMigrated && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMigrateOne(candidate)}
                            disabled={!selectedMappings[candidate.name] || isProcessing}
                          >
                            {isProcessing ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <ArrowRight className="h-4 w-4 mr-1" />
                                Migrer
                              </>
                            )}
                          </Button>
                        )}
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </TableBody>
          </Table>
        )}

        {/* Warning for unmatched */}
        {unmatchedCount > 0 && (
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
            <div>
              <p className="font-medium text-orange-700">
                {unmatchedCount} nom(s) sans correspondance
              </p>
              <p className="text-sm text-orange-600">
                Créez d'abord les comptes élèves correspondants, puis actualisez cette page.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataMigration;
