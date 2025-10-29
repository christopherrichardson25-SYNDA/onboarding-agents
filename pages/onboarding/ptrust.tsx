import { useEffect } from "react";
import { useRouter } from "next/router";

export default function PTrustPage() {
  const router = useRouter();

  useEffect(() => {
    const listener = (e: MessageEvent) => {
      if (e.data?.icp) {
        localStorage.setItem("ptrust_icp", String(e.data.icp));
        router.push("/onboarding/sombreros");
      }
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, [router]);

  return (
    <div style={{ padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>🔒 Validación P‑Trust</h1>
      <p>Estamos evaluando tu nivel de confianza con el sistema P‑Trust.</p>

      <iframe
        src="https://chatgpt.com/g/g-68530b58236c81919d8b28a871b7d64d"
        width="100%"
        height="600"
        style={{ border: "1px solid #ccc", borderRadius: "8px" }}
        allow="clipboard-write"
      />

      <p style={{ marginTop: "1rem", color: "#888" }}>Tu perfil de confianza será generado y usado en tu avatar.</p>
    </div>
  );
}
