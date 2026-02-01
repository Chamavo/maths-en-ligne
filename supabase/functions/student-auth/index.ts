import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Generate consistent email from username/firstname
function generateEmail(username: string): string {
  const normalized = username.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${normalized}@maths-en-ligne.local`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { action, ...params } = await req.json();

    // Helper to check if caller is teacher using user_roles table
    const isTeacher = async (authHeader: string | null): Promise<boolean> => {
      if (!authHeader) return false;
      const token = authHeader.replace('Bearer ', '');
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (error || !user) return false;

      // Check role in user_roles table
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'teacher')
        .maybeSingle();

      return !!roleData;
    };

    switch (action) {
      case 'create': {
        const authHeader = req.headers.get('Authorization');
        if (!(await isTeacher(authHeader))) {
          return new Response(JSON.stringify({ error: 'Non autorisé' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        const { firstName, password, displayName } = params;
        if (!firstName || !password) {
          return new Response(JSON.stringify({ error: 'Données manquantes' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        const email = generateEmail(firstName);

        // Create User in Supabase Auth
        const { data: user, error: createError } = await supabase.auth.admin.createUser({
          email: email,
          password: password,
          email_confirm: true,
          user_metadata: {
            role: 'student',
            first_name: firstName,
            display_name: displayName || firstName
          }
        });

        if (createError) {
          console.error("Create User Error", createError);
          return new Response(JSON.stringify({ error: createError.message }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        // Add student role to user_roles table
        if (user.user) {
          await supabase.from('user_roles').insert({
            user_id: user.user.id,
            role: 'student'
          });
        }

        return new Response(JSON.stringify({ success: true, student: user.user }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      case 'list': {
        const authHeader = req.headers.get('Authorization');
        if (!(await isTeacher(authHeader))) {
          return new Response(JSON.stringify({ error: 'Non autorisé' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        // Fetch students from user_roles joined with profiles
        const { data: studentRoles, error: rolesError } = await supabase
          .from('user_roles')
          .select('user_id')
          .eq('role', 'student');

        if (rolesError) {
          console.error("Fetch roles error", rolesError);
          return new Response(JSON.stringify({ error: rolesError.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        if (!studentRoles || studentRoles.length === 0) {
          return new Response(JSON.stringify({ students: [] }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        const studentUserIds = studentRoles.map(r => r.user_id);

        // Fetch profiles for these students
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .in('user_id', studentUserIds)
          .order('display_name');

        if (profilesError) {
          console.error("Fetch profiles error", profilesError);
          return new Response(JSON.stringify({ error: profilesError.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        // Map to expected format
        const students = (profiles || []).map(p => ({
          id: p.user_id,
          firstName: p.display_name?.split(' ')[0] || p.display_name,
          displayName: p.display_name,
          isActive: true, // We don't track this in profiles currently
          createdAt: p.created_at
        }));

        return new Response(JSON.stringify({ students }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      case 'update-password': {
        const authHeader = req.headers.get('Authorization');
        if (!(await isTeacher(authHeader))) {
          return new Response(JSON.stringify({ error: 'Non autorisé' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        const { studentId, newPassword } = params;
        const { error } = await supabase.auth.admin.updateUserById(studentId, {
          password: newPassword
        });

        if (error) {
          return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }
        return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      case 'toggle-active': {
        const authHeader = req.headers.get('Authorization');
        if (!(await isTeacher(authHeader))) {
          return new Response(JSON.stringify({ error: 'Non autorisé' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        const { studentId, isActive } = params;
        
        // Ban/unban in Auth
        if (isActive) {
          await supabase.auth.admin.updateUserById(studentId, { ban_duration: 'none' });
        } else {
          await supabase.auth.admin.updateUserById(studentId, { ban_duration: '876000h' }); // 100 years
        }

        return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      default:
        return new Response(JSON.stringify({ error: 'Action not valid' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error("Edge function error:", message);
    return new Response(JSON.stringify({ error: message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
