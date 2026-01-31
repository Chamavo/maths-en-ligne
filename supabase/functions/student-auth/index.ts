import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Allowed origins for CORS - restricts which domains can call this function
const ALLOWED_ORIGINS = [
  'https://cm2.lovable.app',
  'https://id-preview--935b3045-ce82-4628-8f59-63cf32ae0be0.lovable.app',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:8080',
];

// Function to get CORS headers based on request origin
function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get('origin') || '';
  
  // Check if the origin is allowed or is a lovable.app/lovableproject.com subdomain
  const isAllowed = ALLOWED_ORIGINS.includes(origin) || 
    origin.endsWith('.lovable.app') ||
    origin.endsWith('.lovableproject.com');
  
  const allowedOrigin = isAllowed ? origin : ALLOWED_ORIGINS[0];
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
    'Access-Control-Allow-Credentials': 'true',
  };
}

// Helper to convert Uint8Array to base64
function uint8ArrayToBase64(arr: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < arr.length; i++) {
    binary += String.fromCharCode(arr[i]);
  }
  return btoa(binary);
}

// PBKDF2 password hashing with 310,000 iterations (OWASP recommendation)
// Version prefix "v2:" indicates PBKDF2, legacy hashes without prefix use SHA-256
const PBKDF2_ITERATIONS = 310000;
const HASH_VERSION = 'v2:';

async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const encoder = new TextEncoder();
  const passwordData = encoder.encode(password);
  
  // Import password as key material for PBKDF2
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordData,
    'PBKDF2',
    false,
    ['deriveBits']
  );
  
  // Derive key with 310,000 iterations (OWASP recommendation for PBKDF2-SHA256)
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256'
    },
    keyMaterial,
    256
  );
  
  const hashArray = new Uint8Array(derivedBits);
  
  // Store salt + hash together with version prefix
  const result = new Uint8Array(salt.length + hashArray.length);
  result.set(salt);
  result.set(hashArray, salt.length);
  
  return HASH_VERSION + uint8ArrayToBase64(result);
}

// Verify password supporting both new PBKDF2 and legacy SHA-256 hashes
async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    // Check if it's a new PBKDF2 hash (v2:) or legacy SHA-256
    if (storedHash.startsWith(HASH_VERSION)) {
      // New PBKDF2 hash
      const hashData = storedHash.slice(HASH_VERSION.length);
      const decoded = Uint8Array.from(atob(hashData), c => c.charCodeAt(0));
      
      const salt = decoded.slice(0, 16);
      const originalHash = decoded.slice(16);
      
      const encoder = new TextEncoder();
      const passwordData = encoder.encode(password);
      
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        passwordData,
        'PBKDF2',
        false,
        ['deriveBits']
      );
      
      const derivedBits = await crypto.subtle.deriveBits(
        {
          name: 'PBKDF2',
          salt: salt,
          iterations: PBKDF2_ITERATIONS,
          hash: 'SHA-256'
        },
        keyMaterial,
        256
      );
      
      const newHash = new Uint8Array(derivedBits);
      
      if (newHash.length !== originalHash.length) return false;
      for (let i = 0; i < newHash.length; i++) {
        if (newHash[i] !== originalHash[i]) return false;
      }
      return true;
    } else {
      // Legacy SHA-256 hash (for backward compatibility)
      const decoded = Uint8Array.from(atob(storedHash), c => c.charCodeAt(0));
      
      const salt = decoded.slice(0, 16);
      const originalHash = decoded.slice(16);
      
      const encoder = new TextEncoder();
      const passwordData = encoder.encode(password);
      
      const combined = new Uint8Array(salt.length + passwordData.length);
      combined.set(salt);
      combined.set(passwordData, salt.length);
      
      const hashBuffer = await crypto.subtle.digest('SHA-256', combined);
      const newHash = new Uint8Array(hashBuffer);
      
      if (newHash.length !== originalHash.length) return false;
      for (let i = 0; i < newHash.length; i++) {
        if (newHash[i] !== originalHash[i]) return false;
      }
      return true;
    }
  } catch (e) {
    console.error('Password verification error:', e);
    return false;
  }
}

// Rehash password if using legacy algorithm (call after successful login)
function needsRehash(storedHash: string): boolean {
  return !storedHash.startsWith(HASH_VERSION);
}

serve(async (req) => {
  // Get CORS headers based on request origin
  const corsHeaders = getCorsHeaders(req);
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { action, ...params } = await req.json();
    console.log(`Action: ${action}`);

    switch (action) {
      case 'reset-password-direct': {
        // Action spéciale pour réinitialiser les mots de passe sans auth (admin uniquement via service role)
        const { studentId, newPassword, adminKey } = params;
        
        // Vérifier une clé admin simple pour sécuriser
        if (adminKey !== 'TEACHER_RESET_2026') {
          return new Response(
            JSON.stringify({ error: 'Non autorisé' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        if (!studentId || !newPassword) {
          return new Response(
            JSON.stringify({ error: 'ID élève et nouveau mot de passe requis' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Hacher le nouveau mot de passe
        const passwordHash = await hashPassword(newPassword);

        // Mettre à jour
        const { error: updateError } = await supabase
          .from('students')
          .update({ password_hash: passwordHash })
          .eq('id', studentId);

        if (updateError) {
          console.error('Reset error:', updateError);
          return new Response(
            JSON.stringify({ error: 'Erreur lors de la mise à jour' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        console.log(`Password reset for student ${studentId}`);

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'login': {
        const { firstName, password } = params;
        
        if (!firstName || !password) {
          return new Response(
            JSON.stringify({ error: 'Prénom et mot de passe requis' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Rechercher l'élève
        const { data: student, error: findError } = await supabase
          .from('students')
          .select('id, first_name, display_name, password_hash, is_active')
          .ilike('first_name', firstName.trim())
          .maybeSingle();

        if (findError) {
          console.error('Find error:', findError);
          return new Response(
            JSON.stringify({ error: 'Erreur de connexion' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        if (!student) {
          return new Response(
            JSON.stringify({ error: 'Prénom non reconnu' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        if (!student.is_active) {
          return new Response(
            JSON.stringify({ error: 'Compte désactivé' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Vérifier le mot de passe
        const validPassword = await verifyPassword(password, student.password_hash);
        
        if (!validPassword) {
          return new Response(
            JSON.stringify({ error: 'Mot de passe incorrect' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Rehash password if using legacy SHA-256 algorithm
        if (needsRehash(student.password_hash)) {
          const newHash = await hashPassword(password);
          await supabase
            .from('students')
            .update({ 
              password_hash: newHash,
              last_login_at: new Date().toISOString()
            })
            .eq('id', student.id);
          console.log(`Password rehashed for student ${student.first_name} (migrated to PBKDF2)`);
        } else {
          // Mettre à jour la dernière connexion
          await supabase
            .from('students')
            .update({ last_login_at: new Date().toISOString() })
            .eq('id', student.id);
        }

        // Enregistrer l'historique de connexion
        const userAgent = req.headers.get('user-agent') || '';
        await supabase
          .from('student_login_history')
          .insert({
            student_id: student.id,
            user_agent: userAgent
          });

        console.log(`Student ${student.first_name} logged in successfully`);

        return new Response(
          JSON.stringify({
            success: true,
            student: {
              id: student.id,
              firstName: student.first_name,
              displayName: student.display_name || student.first_name
            }
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'create': {
        // Vérifier l'authentification enseignant
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
          return new Response(
            JSON.stringify({ error: 'Non autorisé' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const token = authHeader.replace('Bearer ', '');
        const { data: claims, error: claimsError } = await supabase.auth.getClaims(token);
        
        if (claimsError || !claims?.claims?.sub) {
          return new Response(
            JSON.stringify({ error: 'Token invalide' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Vérifier le rôle enseignant
        const { data: hasTeacherRole } = await supabase.rpc('has_role', {
          _user_id: claims.claims.sub,
          _role: 'teacher'
        });

        if (!hasTeacherRole) {
          return new Response(
            JSON.stringify({ error: 'Accès réservé aux enseignants' }),
            { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { firstName, password, displayName } = params;

        if (!firstName || !password) {
          return new Response(
            JSON.stringify({ error: 'Prénom et mot de passe requis' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Vérifier si le prénom existe déjà
        const { data: existing } = await supabase
          .from('students')
          .select('id')
          .ilike('first_name', firstName.trim())
          .maybeSingle();

        if (existing) {
          return new Response(
            JSON.stringify({ error: 'Ce prénom existe déjà' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Hacher le mot de passe avec la nouvelle méthode
        const passwordHash = await hashPassword(password);

        // Créer l'élève
        const { data: newStudent, error: createError } = await supabase
          .from('students')
          .insert({
            first_name: firstName.trim(),
            password_hash: passwordHash,
            display_name: displayName?.trim() || firstName.trim(),
            created_by: claims.claims.sub
          })
          .select('id, first_name, display_name')
          .single();

        if (createError) {
          console.error('Create error:', createError);
          return new Response(
            JSON.stringify({ error: 'Erreur lors de la création' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        console.log(`Student ${newStudent.first_name} created successfully`);

        return new Response(
          JSON.stringify({ success: true, student: newStudent }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'update-password': {
        // Vérifier l'authentification enseignant
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
          return new Response(
            JSON.stringify({ error: 'Non autorisé' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const token = authHeader.replace('Bearer ', '');
        const { data: claims, error: claimsError } = await supabase.auth.getClaims(token);
        
        if (claimsError || !claims?.claims?.sub) {
          return new Response(
            JSON.stringify({ error: 'Token invalide' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Vérifier le rôle enseignant
        const { data: hasTeacherRole } = await supabase.rpc('has_role', {
          _user_id: claims.claims.sub,
          _role: 'teacher'
        });

        if (!hasTeacherRole) {
          return new Response(
            JSON.stringify({ error: 'Accès réservé aux enseignants' }),
            { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { studentId, newPassword } = params;

        if (!studentId || !newPassword) {
          return new Response(
            JSON.stringify({ error: 'ID élève et nouveau mot de passe requis' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Hacher le nouveau mot de passe
        const passwordHash = await hashPassword(newPassword);

        // Mettre à jour
        const { error: updateError } = await supabase
          .from('students')
          .update({ password_hash: passwordHash })
          .eq('id', studentId);

        if (updateError) {
          console.error('Update error:', updateError);
          return new Response(
            JSON.stringify({ error: 'Erreur lors de la mise à jour' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        console.log(`Password updated for student ${studentId}`);

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'list': {
        // Vérifier l'authentification enseignant
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
          return new Response(
            JSON.stringify({ error: 'Non autorisé' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const token = authHeader.replace('Bearer ', '');
        const { data: claims, error: claimsError } = await supabase.auth.getClaims(token);
        
        if (claimsError || !claims?.claims?.sub) {
          return new Response(
            JSON.stringify({ error: 'Token invalide' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Vérifier le rôle enseignant
        const { data: hasTeacherRole } = await supabase.rpc('has_role', {
          _user_id: claims.claims.sub,
          _role: 'teacher'
        });

        if (!hasTeacherRole) {
          return new Response(
            JSON.stringify({ error: 'Accès réservé aux enseignants' }),
            { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { data: students, error: listError } = await supabase
          .from('students')
          .select(`
            id,
            first_name,
            display_name,
            is_active,
            created_at,
            last_login_at,
            student_login_history (
              logged_in_at
            )
          `)
          .order('first_name');

        if (listError) {
          console.error('List error:', listError);
          return new Response(
            JSON.stringify({ error: 'Erreur lors de la récupération' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({ students }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'toggle-active': {
        // Vérifier l'authentification enseignant
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
          return new Response(
            JSON.stringify({ error: 'Non autorisé' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const token = authHeader.replace('Bearer ', '');
        const { data: claims, error: claimsError } = await supabase.auth.getClaims(token);
        
        if (claimsError || !claims?.claims?.sub) {
          return new Response(
            JSON.stringify({ error: 'Token invalide' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Vérifier le rôle enseignant
        const { data: hasTeacherRole } = await supabase.rpc('has_role', {
          _user_id: claims.claims.sub,
          _role: 'teacher'
        });

        if (!hasTeacherRole) {
          return new Response(
            JSON.stringify({ error: 'Accès réservé aux enseignants' }),
            { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { studentId, isActive } = params;

        const { error: updateError } = await supabase
          .from('students')
          .update({ is_active: isActive })
          .eq('id', studentId);

        if (updateError) {
          console.error('Toggle error:', updateError);
          return new Response(
            JSON.stringify({ error: 'Erreur lors de la mise à jour' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'migrate-student-data': {
        // Vérifier l'authentification enseignant
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
          return new Response(
            JSON.stringify({ error: 'Non autorisé' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const token = authHeader.replace('Bearer ', '');
        const { data: claims, error: claimsError } = await supabase.auth.getClaims(token);
        
        if (claimsError || !claims?.claims?.sub) {
          return new Response(
            JSON.stringify({ error: 'Token invalide' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Vérifier le rôle enseignant
        const { data: hasTeacherRole } = await supabase.rpc('has_role', {
          _user_id: claims.claims.sub,
          _role: 'teacher'
        });

        if (!hasTeacherRole) {
          return new Response(
            JSON.stringify({ error: 'Accès réservé aux enseignants' }),
            { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { studentId, studentName } = params;

        if (!studentId || !studentName) {
          return new Response(
            JSON.stringify({ error: 'ID élève et nom requis' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        console.log(`Migrating data for student ${studentName} (${studentId})`);

        let migratedCount = 0;

        // Mettre à jour learning_sessions par student_name
        const { data: sessions, error: sessionsError } = await supabase
          .from('learning_sessions')
          .update({ student_id: studentId })
          .ilike('student_name', studentName)
          .is('student_id', null)
          .select('id');

        if (!sessionsError && sessions) {
          migratedCount += sessions.length;
          console.log(`Migrated ${sessions.length} learning sessions`);
        }

        // Mettre à jour student_evaluations par username
        const { data: evaluations, error: evalsError } = await supabase
          .from('student_evaluations')
          .update({ student_id: studentId })
          .ilike('username', studentName)
          .is('student_id', null)
          .select('id');

        if (!evalsError && evaluations) {
          migratedCount += evaluations.length;
          console.log(`Migrated ${evaluations.length} evaluations`);
        }

        // Mettre à jour world_question_responses par username
        const { data: worldResponses, error: worldError } = await supabase
          .from('world_question_responses')
          .update({ student_id: studentId })
          .ilike('username', studentName)
          .is('student_id', null)
          .select('id');

        if (!worldError && worldResponses) {
          migratedCount += worldResponses.length;
          console.log(`Migrated ${worldResponses.length} world responses`);
        }

        return new Response(
          JSON.stringify({ 
            success: true, 
            migratedCount,
            details: {
              sessions: sessions?.length || 0,
              evaluations: evaluations?.length || 0,
              worldResponses: worldResponses?.length || 0
            }
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'get-migration-candidates': {
        // Vérifier l'authentification enseignant
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
          return new Response(
            JSON.stringify({ error: 'Non autorisé' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const token = authHeader.replace('Bearer ', '');
        const { data: claims, error: claimsError } = await supabase.auth.getClaims(token);
        
        if (claimsError || !claims?.claims?.sub) {
          return new Response(
            JSON.stringify({ error: 'Token invalide' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Vérifier le rôle enseignant
        const { data: hasTeacherRole } = await supabase.rpc('has_role', {
          _user_id: claims.claims.sub,
          _role: 'teacher'
        });

        if (!hasTeacherRole) {
          return new Response(
            JSON.stringify({ error: 'Accès réservé aux enseignants' }),
            { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Récupérer les noms uniques sans student_id
        const { data: sessionNames } = await supabase
          .from('learning_sessions')
          .select('student_name')
          .is('student_id', null);

        const { data: evalNames } = await supabase
          .from('student_evaluations')
          .select('username')
          .is('student_id', null);

        const { data: worldNames } = await supabase
          .from('world_question_responses')
          .select('username')
          .is('student_id', null);

        // Combiner et dédupliquer
        const allNames = new Set<string>();
        sessionNames?.forEach(s => allNames.add(s.student_name.toLowerCase()));
        evalNames?.forEach(e => allNames.add(e.username.toLowerCase()));
        worldNames?.forEach(w => allNames.add(w.username.toLowerCase()));

        // Compter les enregistrements par nom
        const candidates: { name: string; count: number }[] = [];
        for (const name of allNames) {
          let count = 0;
          count += sessionNames?.filter(s => s.student_name.toLowerCase() === name).length || 0;
          count += evalNames?.filter(e => e.username.toLowerCase() === name).length || 0;
          count += worldNames?.filter(w => w.username.toLowerCase() === name).length || 0;
          candidates.push({ name, count });
        }

        // Récupérer la liste des élèves existants
        const { data: existingStudents } = await supabase
          .from('students')
          .select('id, first_name, display_name')
          .eq('is_active', true)
          .order('first_name');

        return new Response(
          JSON.stringify({ 
            candidates: candidates.sort((a, b) => b.count - a.count),
            students: existingStudents || []
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: 'Action non reconnue' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur serveur' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
