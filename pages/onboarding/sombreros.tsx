import { useEffect } from "react";
import { useRouter } from "next/router";

export default function SombrerosGPT() {
  const router = useRouter();

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.sombreros) {
        localStorage.setItem("sombreros_profile", JSON.stringify(e.data.sombreros));
        router.push("/onboarding/result");
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [router]);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>🎩 Evaluación de Superpoderes Cognitivos</h1>
      <p>Interactúa con el GPT para descubrir tu estilo de pensamiento dominante.</p>

      <iframe
        src="https://chatgpt.com/g/g-69024045dee88191b80703e995f35a0c"
        width="100%"
        height="600"
        style={{ border: "1px solid #ccc", borderRadius: "8px" }}
        allow="clipboard-write"
      />

      <p style={{ marginTop: "1rem", color: "#888" }}>
        Tu perfil se cargará automáticamente cuando el GPT lo envíe.
      </p>
    </div>
  );
}

