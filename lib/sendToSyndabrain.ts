export async function sendAgentToSyndabrain(agentManifest: any) {
  const endpoint = process.env.SYNDABRAIN_INGEST_URL!;
  const token = process.env.SYNDABRAIN_INGEST_KEY!;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(agentManifest)
    });

    if (!res.ok) {
      console.error("Error al enviar manifest:", await res.text());
      return false;
    }

    return true;
  } catch (err) {
    console.error("Error de red al enviar manifest a Syndabrain:", err);
    return false;
  }
}
