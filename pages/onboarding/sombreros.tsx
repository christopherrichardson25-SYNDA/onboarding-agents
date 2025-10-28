import { useState } from "react";
import { useRouter } from "next/router";

const hats = [
  { color: "Blanco", prompt: "¿Te consideras una persona objetiva y enfocada en datos y hechos?" },
  { color: "Rojo", prompt: "¿Tomas decisiones basado en emociones o intuición?" },
  { color: "Negro", prompt: "¿Analizas riesgos y aspectos negativos antes de actuar?" },
  { color: "Amarillo", prompt: "¿Tiendes a ver el lado positivo de las ideas y situaciones?" },
  { color: "Verde", prompt: "¿Eres creativo y buscas constantemente nuevas alternativas?" },
  { color: "Azul", prompt: "¿Eres bueno organizando, facilitando o liderando procesos?" }
];

export default function SombrerosTest() {
  const router = useRouter();
  const [answers, setAnswers] = useState<number[]>(Array(hats.length).fill(3)); // escala 1–5

  const handleSubmit = () => {
    const profile = hats.map((h, i) => ({
      sombrero: h.color,
      valor: answers[i]
    }));
    localStorage.setItem("sombreros_profile", JSON.stringify(profile));
    router.push("/onboarding/result");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>🎩 Test de los 6 Sombreros</h1>
      <p style={{ textAlign: "center" }}>Responde con qué frecuencia te identificas con cada estilo de pensamiento.</p>

      <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
        {hats.map((hat, idx) => (
          <div key={hat.color} style={{ marginBottom: "1.5rem" }}>
            <label>
              <strong>{hat.color}</strong>: {hat.prompt}
            </label>
            <br />
            <input
              type="range"
              min="1"
              max="5"
              value={answers[idx]}
              onChange={(e) => {
                const copy = [...answers];
                copy[idx] = parseInt(e.target.value);
                setAnswers(copy);
              }}
              style={{ width: "100%" }}
            />
            <div style={{ textAlign: "right" }}>Nivel: {answers[idx]}</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          onClick={handleSubmit}
          style={{
            background: "#000",
            color: "#fff",
            padding: "1rem 2rem",
            fontSize: "1rem",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Ver mi perfil cognitivo →
        </button>
      </div>
    </div>
  );
}
