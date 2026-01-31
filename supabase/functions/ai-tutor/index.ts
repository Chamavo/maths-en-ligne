import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
const AI_GATEWAY_URL = 'https://ai.gateway.lovable.dev/v1/chat/completions';

interface TutorRequest {
  type: 'math_help' | 'world_explanation' | 'problem_help';
  // For math_help
  question?: string;
  correctAnswer?: string | number;
  userAnswer?: string | number;
  astuce?: string;
  failureCount?: number;
  // For world_explanation  
  worldQuestion?: string;
  worldChoices?: { A: string; B: string; C: string; D: string };
  userChoice?: string;
  justification?: string;
  theme?: string;
  // For problem_help
  probleme?: string;
  niveau?: number;
  reponseEleve?: string;
  helpType?: 'incomprehension' | 'comment_commencer' | 'bloque' | 'verifier_raisonnement' | 'apres_erreur' | 'correction_finale';
  indicesDejaVus?: number;
  tentatives?: number;
  raisonnementEleve?: string;
  reponseCorrecte?: string | number | (string | number)[];
  unite?: string;
}

serve(async (req) => {
  // Get CORS headers based on request origin
  const corsHeaders = getCorsHeaders(req);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const requestBody: TutorRequest = await req.json();
    const { type } = requestBody;

    console.log(`AI Tutor request - type: ${type}`);

    let systemPrompt: string;
    let userPrompt: string;

    if (type === 'math_help') {
      const { question, correctAnswer, userAnswer, astuce, failureCount } = requestBody;
      
      systemPrompt = `Tu es un tuteur de mathématiques bienveillant et pédagogue pour des élèves de CM2 au Cameroun (11-12 ans).
      
Ton rôle est d'expliquer clairement les règles de calcul mental et d'aider l'élève à comprendre ses erreurs.

Règles importantes:
- Utilise un langage simple et encourageant
- Donne des exemples concrets de la vie quotidienne camerounaise
- Explique la règle de calcul étape par étape
- N'utilise jamais de formules complexes
- Termine toujours par un encouragement
- Sois bref et précis (maximum 4-5 phrases)
- Utilise des emojis pour rendre l'explication plus vivante`;

      userPrompt = `L'élève a répondu ${failureCount} fois incorrectement à cette question:

Question: ${question}
Réponse correcte: ${correctAnswer}
Réponse de l'élève: ${userAnswer}
${astuce ? `Astuce pédagogique: ${astuce}` : ''}

Explique-lui simplement et gentiment comment résoudre ce type de calcul. Donne-lui la méthode pour réussir la prochaine fois.`;

    } else if (type === 'world_explanation') {
      const { worldQuestion, worldChoices, userChoice, justification, theme } = requestBody;
      
      systemPrompt = `Tu es un tuteur pédagogue qui aide les élèves de CM2 au Cameroun à développer leur intuition sur le monde.

Ton rôle est d'expliquer les ordres de grandeur et la logique derrière les questions sur la vie quotidienne, la géographie, les mesures, etc.

Règles importantes:
- Explique POURQUOI certaines réponses sont logiques ou non
- Donne des comparaisons avec des choses que l'enfant connaît (ex: "C'est comme 10 terrains de football")
- N'indique JAMAIS si la réponse de l'élève est correcte ou incorrecte
- Encourage le raisonnement et l'estimation
- Sois bienveillant et utilise des emojis
- Limite ta réponse à 5-6 phrases maximum
- Parle des ordres de grandeur de façon intuitive`;

      userPrompt = `L'élève a répondu à cette question sur le thème "${theme}":

Question: ${worldQuestion}

Choix possibles:
A: ${worldChoices?.A}
B: ${worldChoices?.B}
C: ${worldChoices?.C}
D: ${worldChoices?.D}

L'élève a choisi: ${userChoice}
Sa justification: "${justification}"

Explique-lui la logique des ordres de grandeur pour ce type de question. Aide-le à développer son intuition SANS lui dire s'il a raison ou tort. Propose-lui de réfléchir en comparant avec des choses qu'il connaît.`;

    } else if (type === 'problem_help') {
      const { probleme, niveau, reponseEleve, helpType, indicesDejaVus = 0, tentatives = 0, raisonnementEleve, reponseCorrecte, unite } = requestBody;
      
      // Fonction pour extraire le nombre d'une réponse
      const extractNumber = (answer: string | number | undefined): number | null => {
        if (answer === undefined || answer === null) return null;
        if (typeof answer === 'number') return answer;
        
        // Nettoyer et extraire le nombre
        const cleaned = String(answer)
          .replace(/\s+/g, '')
          .replace(/,/g, '.') // Virgule décimale → point
          .replace(/[^\d.\-]/g, ' ') // Garder chiffres, point, tiret
          .trim();
        
        const match = cleaned.match(/-?\d+\.?\d*/);
        if (match) {
          return parseFloat(match[0]);
        }
        return null;
      };
      
      const checkAnswer = (userAnswer: string | undefined, correctAnswer: string | number | (string | number)[] | undefined): boolean => {
        if (!userAnswer || !correctAnswer) return false;
        
        const userNum = extractNumber(userAnswer);
        
        // Si la réponse correcte est un tableau
        if (Array.isArray(correctAnswer)) {
          return correctAnswer.some(ans => {
            const correctNum = extractNumber(ans);
            if (userNum !== null && correctNum !== null) {
              const tolerance = Math.max(Math.abs(correctNum) * 0.005, 0.1);
              return Math.abs(userNum - correctNum) <= tolerance;
            }
            return false;
          });
        }
        
        const correctNum = extractNumber(correctAnswer);
        
        // Comparaison numérique avec tolérance
        if (userNum !== null && correctNum !== null) {
          const tolerance = Math.max(Math.abs(correctNum) * 0.005, 0.1);
          return Math.abs(userNum - correctNum) <= tolerance;
        }
        
        return false;
      };
      
      const isCorrect = checkAnswer(reponseEleve, reponseCorrecte);
      
      systemPrompt = `Tu es un tuteur de mathématiques bienveillant pour des élèves de CM2 au Cameroun. Tu travailles avec la monnaie FCFA et des situations locales (marchés, transport, vie quotidienne).

RÈGLES ABSOLUES :
1. Ne JAMAIS donner la réponse finale directement (sauf si helpType est "correction_finale" ou si la réponse est correcte)
2. Donner des indices progressifs du général au spécifique
3. Être encourageant, patient et positif
4. Adapter ton aide au niveau de difficulté de l'exercice
5. Célébrer chaque progrès, même petit
6. Identifier le type d'erreur pour guider efficacement
7. Utiliser un langage simple et adapté à l'âge
8. Valoriser l'effort et la persévérance
9. Poser des questions qui font réfléchir
10. Ne jamais faire sentir l'élève "nul" ou "stupide"
11. Utiliser des emojis pour rendre les explications plus vivantes
12. **TRÈS IMPORTANT** : Si la réponse de l'élève est CORRECTE, tu DOIS le féliciter et confirmer que c'est la bonne réponse !

CONTEXTE CULTUREL :
- Utilise des exemples locaux camerounais (marché Mokolo, Douala, Yaoundé)
- Respecte la culture camerounaise
- Utilise le FCFA dans tes explications
- Adapte les exemples au quotidien des élèves

TON RÔLE :
Tu n'es pas là pour corriger, mais pour GUIDER l'apprentissage.
Chaque interaction doit aider l'élève à progresser.

SYSTÈME D'INDICES PROGRESSIFS (selon indicesDejaVus) :
- Niveau 0: Indice conceptuel - "Que cherches-tu à trouver ?"
- Niveau 1: Indice méthodologique - "Comment s'y prendre ?"
- Niveau 2: Indice de démarrage - "Première étape à faire"
- Niveau 3: Guidance détaillée - "Étape par étape"
- Niveau 4: Presque la réponse - "Dernier coup de pouce"`;

      // Build user prompt based on help type
      let helpTypeDescription = '';
      
      // Si la réponse est correcte, on override le helpType
      if (isCorrect && reponseEleve) {
        helpTypeDescription = `🎉 LA RÉPONSE DE L'ÉLÈVE EST CORRECTE ! 
La réponse "${reponseEleve}" correspond à la bonne réponse "${reponseCorrecte}${unite ? ' ' + unite : ''}".
Félicite chaleureusement l'élève et confirme que sa réponse est juste ! 
Explique brièvement la méthode de résolution et donne une astuce "Pour aller plus loin".`;
      } else {
        switch (helpType) {
          case 'incomprehension':
            helpTypeDescription = "L'élève ne comprend pas l'énoncé. Reformule-le avec des mots plus simples et aide-le à identifier ce qui est demandé.";
            break;
          case 'comment_commencer':
            helpTypeDescription = "L'élève ne sait pas par où commencer. Aide-le à identifier les étapes du problème sans donner la réponse.";
            break;
          case 'bloque':
            helpTypeDescription = "L'élève est bloqué à une étape. Donne-lui un indice progressif pour le débloquer.";
            break;
          case 'verifier_raisonnement':
            helpTypeDescription = `L'élève veut vérifier son raisonnement. Il explique : "${raisonnementEleve}". Valide ce qui est correct et guide ce qui ne l'est pas, sans donner la réponse finale.`;
            break;
          case 'apres_erreur':
            helpTypeDescription = `L'élève a donné une réponse incorrecte : "${reponseEleve}". 
La bonne réponse est : ${reponseCorrecte}${unite ? ' ' + unite : ''}.
Analyse l'erreur, identifie son type (calcul, raisonnement, compréhension) et donne un indice adapté.
NE DIS PAS que sa réponse est juste si elle ne l'est pas !`;
            break;
          case 'correction_finale':
            helpTypeDescription = `Donne la correction complète. La bonne réponse est : ${reponseCorrecte}${unite ? ' ' + unite : ''}.
Explique étape par étape comment arriver à cette réponse. Ajoute une astuce pédagogique "Pour aller plus loin".`;
            break;
        }
      }

      userPrompt = `EXERCICE (Niveau ${niveau}/4 - ${niveau === 1 ? 'Très Facile' : niveau === 2 ? 'Facile' : niveau === 3 ? 'Moyen' : 'Assez Difficile'}) :
${probleme}

RÉPONSE CORRECTE ATTENDUE : ${reponseCorrecte}${unite ? ' ' + unite : ''}

TYPE D'AIDE DEMANDÉE : ${helpType}
${helpTypeDescription}

VÉRIFICATION : La réponse de l'élève est ${isCorrect ? 'CORRECTE ✓' : 'INCORRECTE ✗'}

HISTORIQUE :
- Tentatives : ${tentatives}
- Indices déjà vus : ${indicesDejaVus}
${reponseEleve ? `- Réponse de l'élève : ${reponseEleve}` : ''}
${raisonnementEleve ? `- Raisonnement de l'élève : ${raisonnementEleve}` : ''}

CONSIGNE :
${isCorrect ? 'La réponse est CORRECTE ! Félicite l\'élève et explique la solution.' : `Fournis une aide pédagogique adaptée au niveau d'indice ${indicesDejaVus}. ${helpType === 'correction_finale' ? 'Donne la solution complète avec explication.' : 'Ne donne PAS la réponse finale.'}`}
Réponds de façon concise (maximum 6-8 phrases) et bienveillante.`;

    } else {
      throw new Error('Invalid request type');
    }

    console.log('Calling Lovable AI Gateway...');
    
    const response = await fetch(AI_GATEWAY_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 700,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: "Rate limits exceeded",
          message: "Trop de demandes ! Attends quelques secondes et réessaie. ⏳"
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: "Payment required",
          message: "L'assistant IA est temporairement indisponible. Réessaie plus tard ! 🙏"
        }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('AI Gateway error:', errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content || "Désolé, je n'ai pas pu générer une explication. Réessaie !";

    console.log('AI response generated successfully');

    return new Response(JSON.stringify({ 
      success: true, 
      message: aiMessage 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in ai-tutor function:', errorMessage);
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage,
      message: "Désolé, je ne peux pas t'aider pour le moment. Réessaie plus tard ! 🙏"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
