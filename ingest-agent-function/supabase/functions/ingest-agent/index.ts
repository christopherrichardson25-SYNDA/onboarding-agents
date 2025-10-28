import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
  const token = req.headers.get("authorization");
  const secret = Deno.env.get("SYNDABRAIN_INGEST_KEY");

  if (token !== secret) {
    return new Response("Unauthorized", { status: 401 });
  }

  const manifest = await req.json();

  // Convertir el manifest a texto plano legible
  const text = `
Agente: ${manifest.agent_id}
ICP: ${manifest.icp}%
XP: ${manifest.xp}
Fecha: ${manifest.created_at}

🎭 Perfil Cognitivo:
- Verde (Creatividad): ${manifest.cognition.verde}%
- Negro (Crítico): ${manifest.cognition.negro}%
- Amarillo (Optimismo): ${manifest.cognition.amarillo}%
- Blanco (Datos): ${manifest.cognition.blanco}%
- Rojo (Emoción): ${manifest.cognition.rojo}%
- Azul (Gestión): ${manifest.cognition.azul}%

⭐ Superpoderes:
${manifest.superpowers.map((s: string) => `- ${s}`).join("\n")}
`;

  const response = await fetch("https://tru-e-synda-brain.onrender.com/knowledge/load/syndaverse", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items: [{ source: manifest.agent_id, text }]
    })
  });

  if (!response.ok) {
    return new Response("Error al enviar conocimiento a SYNDAbrain", { status: 500 });
  }

  return new Response(JSON.stringify({ status: "ok", sent_to_syndabrain: true }), {
    headers: { "Content-Type": "application/json" },
    status: 200
  });
});
