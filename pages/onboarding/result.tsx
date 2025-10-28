import { useEffect, useState } from "react";

type Sombrero = {
  sombrero: string;
  valor: number;
};

export default function ResultPage() {
  const [perfil, setPerfil] = useState<Sombrero[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("sombreros_profile");
    if (stored) {
      const parsed = JSON.parse(stored) as Sombrero[];
      setPerfil(parsed);
    }
  }, []);

  if (!perfil.length) {
    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif", textAlign: "center" }}>
        <h1>Resultado no disponible</h1>
        <p>No se encontraron datos del test cognitivo.</p>
      </div>
    );
  }

  const total = perfil.reduce((sum, s) => sum + s.valor, 0);
  const colores = {
    Blanco: "#ccc",
    Rojo: "#e63946",
    Negro: "#1d1d1d",
    Amarillo: "#ffcc00",
    Verde: "#2a9d8f",
    Azul: "#264653"
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>🧠 Perfil Cognitivo</h1>
      <p>Este es tu radar de pensamiento según los 6 sombreros de Edward de Bono.</p>

      <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
        {perfil.map(({ sombrero, valor }) => {
          const pct = ((valor / total) * 100).toFixed(1);
          return (
            <div key={sombrero} style={{ marginBottom: "1rem", textAlign: "left" }}>
              <strong>{sombrero}</strong>: {pct}%
              <div style={{
                height: "12px",
                width: pct + "%",
                backgroundColor: colores[sombrero as keyof typeof colores],
                borderRadius: "6px",
                marginTop: "4px"
              }} />
            </div>
          );
        })}
      </div>

      <p style={{ marginTop: "3rem" }}>🔄 Puedes reiniciar el onboarding si deseas actualizar tu perfil.</p>
    </div>
  );
}
