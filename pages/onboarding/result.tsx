// result.tsx - placeholder for SYNDAverse complete onboarding module
import { useEffect } from "react";
import { sendAgentToSyndabrain } from "@/lib/sendToSyndabrain";

export default function ResultPage() {
  const agentProfile = {
    agent_id: "NovaMind25",
    icp: 84,
    cognition: {
      verde: 80,
      negro: 60,
      amarillo: 55,
      blanco: 50,
      rojo: 45,
      azul: 20
    },
    superpowers: [
      "Creatividad disruptiva",
      "Pensamiento crítico",
      "Optimismo estratégico"
    ],
    xp: 120,
    created_at: new Date().toISOString()
  };

  useEffect(() => {
    async function notifyBrain() {
      const ok = await sendAgentToSyndabrain(agentProfile);
      if (ok) {
        console.log("✅ Enviado a SYNDAbrain");
      } else {
        console.error("❌ Falló el envío a SYNDAbrain");
      }
    }

    notifyBrain();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🎉 ¡Tu agente está listo!</h1>
      <p>Se ha conectado con SYNDAbrain como <strong>{agentProfile.agent_id}</strong>.</p>
      <pre>{JSON.stringify(agentProfile, null, 2)}</pre>
    </div>
  );
}
