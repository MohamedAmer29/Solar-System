import { Suspense } from "react";
import SolarSystemScene from "./SolarSystemScene";

function LoadingScreen() {
  return (
    <div
      style={{
        width: "96vw",
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
      <style>{`
        .loading-solar {
          width: 220px;
          height: 220px;
          position: relative;
          margin: 0 auto 24px;
        }
        .loading-solar .orbit {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 50%;
        }
        .loading-solar .orbit.small {
          width: 120px;
          height: 120px;
          animation: orbit-1 5.5s linear infinite;
        }
        .loading-solar .orbit.medium {
          width: 160px;
          height: 160px;
          animation: orbit-2 7.5s linear infinite reverse;
        }
        .loading-solar .orbit.large {
          width: 200px;
          height: 200px;
          animation: orbit-3 9.5s linear infinite;
        }
        .loading-solar .planet {
          position: absolute;
          top: 50%;
          left: 100%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          box-shadow: 0 0 14px rgba(255, 255, 255, 0.5);
        }
        .loading-solar .planet.small {
          width: 10px;
          height: 10px;
          background: #8ddcff;
        }
        .loading-solar .planet.medium {
          width: 12px;
          height: 12px;
          background: #ffb36b;
        }
        .loading-solar .planet.large {
          width: 14px;
          height: 14px;
          background: #9ef08a;
        }
        .loading-solar .sun {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: radial-gradient(circle, #ffd633 0%, #ff8a00 55%, #ff4e00 100%);
          box-shadow: 0 0 24px rgba(255, 144, 0, 0.8);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        @keyframes orbit-1 {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes orbit-2 {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        @keyframes orbit-3 {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
      <div className="loading-solar">
        <div className="sun" />
        <div className="orbit small">
          <div className="planet small" />
        </div>
        <div className="orbit medium">
          <div className="planet medium" />
        </div>
        <div className="orbit large">
          <div className="planet large" />
        </div>
      </div>
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
