import type { CSSProperties } from "react";

// Deterministic placement keeps the server and browser markup identical.
// CSS handles the rainfall; no animation loop or client JavaScript is needed.
export function Rain({ soft = false }: { soft?: boolean }) {
  const count = soft ? 36 : 100;
  return (
    <div className={`rain${soft ? " rain-soft" : ""}`} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className={`raindrop${index % 4 === 0 ? " raindrop-near" : ""}`}
          style={
            {
              left: `${(index * 73 + 19) % 113}%`,
              "--rain-delay": `${-((index * 37) % 151) / 100}s`,
              "--rain-speed": `${0.8 + ((index * 17) % 70) / 100}s`,
              "--rain-length": `${32 + ((index * 13) % 65)}px`,
              "--rain-opacity": 0.18 + ((index * 7) % 36) / 100,
              "--rain-rest": `${(index * 31) % 96}%`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
