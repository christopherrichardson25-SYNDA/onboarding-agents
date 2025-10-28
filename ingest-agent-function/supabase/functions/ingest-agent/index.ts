import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const token = req.headers.get("authorization");
  const secret = Deno.env.get("SYNDABRAIN_INGEST_KEY");

  if (token !== secret) {
    return new Response("Unauthorized", { status: 401 });
  }

  const manifest = await req.json();

  console.log("✅ Agente recibido:", manifest);

  return new Response(
    JSON.stringify({ status: "ok", agent_id: manifest.agent_id }),
    { headers: { "Content-Type": "application/json" }, status: 200 }
  );
});
