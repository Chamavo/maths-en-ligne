
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Allowed origins
const ALLOWED_ORIGINS = [
  'https://cm2.lovable.app',
  'https://id-preview--935b3045-ce82-4628-8f59-63cf32ae0be0.lovable.app',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:8080',
];

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get('origin') || '';
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

// Generate consistent email from username/firstname
function generateEmail(username: string): string {
  const normalized = username.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${normalized}@maths-en-ligne.local`;
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { action, ...params } = await req.json();

    // Verify Teacher Role for protected administrative actions
    // Helper to check if caller is teacher
    const isTeacher = async (authHeader: string | null) => {
      if (!authHeader) return false;
      const token = authHeader.replace('Bearer ', '');
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (error || !user) return false;

      // Check profile role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      return profile?.role === 'teacher';
    };

    switch (action) {
      case 'create': {
        const authHeader = req.headers.get('Authorization');
        if (!(await isTeacher(authHeader))) {
          return new Response(JSON.stringify({ error: 'Non autorisé' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        const { firstName, password, displayName } = params;
        if (!firstName || !password) return new Response(JSON.stringify({ error: 'Données manquantes' }), { status: 400, headers: corsHeaders });

        const email = generateEmail(firstName);

        // Check availability (optional, Supabase will fail if email exists)

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

        // Return the student data
        return new Response(JSON.stringify({ success: true, student: user.user }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      case 'list': {
        const authHeader = req.headers.get('Authorization');
        if (!(await isTeacher(authHeader))) {
          return new Response(JSON.stringify({ error: 'Non autorisé' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        // Fetch profiles + progression
        // Supabase-js doesn't support complex joins easily on auth.users, but we have 'profiles' now!
        const { data: students, error } = await supabase
          .from('profiles')
          .select(`
            *,
            student_progression (
              current_level,
              status,
              consecutive_failures
            )
          `)
          .eq('role', 'student')
          .order('first_name');

        if (error) {
          return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        // Map to expected format if needed
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

        if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      case 'toggle-active': {
        const authHeader = req.headers.get('Authorization');
        if (!(await isTeacher(authHeader))) {
          return new Response(JSON.stringify({ error: 'Non autorisé' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        const { studentId, isActive } = params;
        const { error } = await supabase
          .from('profiles')
          .update({ is_active: isActive })
          .eq('id', studentId);

        // Also ban/unban in Auth?
        if (isActive) {
          await supabase.auth.admin.updateUserById(studentId, { ban_duration: 'none' });
        } else {
          await supabase.auth.admin.updateUserById(studentId, { ban_duration: '876000h' }); // 100 years
        }

        if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      default:
        return new Response(JSON.stringify({ error: 'Action not valid' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
