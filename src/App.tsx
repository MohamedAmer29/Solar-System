import { Suspense } from "react";
import SolarSystemScene from "./SolarSystemScene";

function LoadingScreen() {
  return (
    <div
      style={{
        width: "90vw",
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle, #000000, #05011a, #0f1033)",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        fontSize: 18,
        textAlign: "center",
        padding: 20,
      }}
    >
      <div>
        <div style={{ fontSize: 32, marginBottom: 12 }}>
          Loading Solar System
        </div>
        <div style={{ opacity: 0.8 }}>
          Preparing the scene, loading textures, and initializing the
          starfield...
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <SolarSystemScene />
    </Suspense>
  );
}
