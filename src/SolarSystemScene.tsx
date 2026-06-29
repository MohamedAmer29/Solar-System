/* eslint-disable react-hooks/refs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const planets = [
  {
    name: "Mercury",
    textureKey: "mercury",
    radius: 0.2,
    distance: 2,
    speed: 2,
  },
  {
    name: "Venus",
    textureKey: "venus",
    radius: 0.28,
    distance: 3.2,
    speed: 1,
  },
  {
    name: "Earth",
    textureKey: "earth",
    radius: 0.32,
    distance: 4.6,
    speed: 0.6,
  },
  {
    name: "Mars",
    textureKey: "mars",
    radius: 0.24,
    distance: 6,
    speed: 0.2,
  },
  {
    name: "Jupiter",
    textureKey: "jupiter",
    radius: 0.7,
    distance: 8.5,
    speed: 0.09,
  },
  {
    name: "Saturn",
    textureKey: "saturn",
    radius: 0.6,
    distance: 11,
    speed: 0.04,
  },
  {
    name: "Uranus",
    textureKey: "uranus",
    radius: 0.5,
    distance: 13.5,
    speed: 0.02,
  },
  {
    name: "Neptune",
    textureKey: "neptune",
    radius: 0.48,
    distance: 16,
    speed: 0.009,
  },
];

const textures = {
  sun: new URL("../static/textures/2k_sun.jpg", import.meta.url).href,
  mercury: new URL("../static/textures/2k_mercury.jpg", import.meta.url).href,
  venus: new URL("../static/textures/2k_venus_surface.jpg", import.meta.url)
    .href,
  earth: new URL("../static/textures/2k_earth_daymap.jpg", import.meta.url)
    .href,
  mars: new URL("../static/textures/2k_mars.jpg", import.meta.url).href,
  jupiter: new URL("../static/textures/2k_mars.jpg", import.meta.url).href,
  saturn: new URL("../static/textures/2k_venus_surface.jpg", import.meta.url)
    .href,
  uranus: new URL("../static/textures/2k_earth_daymap.jpg", import.meta.url)
    .href,
  neptune: new URL("../static/textures/2k_mars.jpg", import.meta.url).href,
  stars: new URL("../static/textures/2k_stars_milky_way.jpg", import.meta.url)
    .href,
};

type MovementState = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  rotateLeft: boolean;
  rotateRight: boolean;
  boost: boolean;
};

type Asteroid = {
  id: number;
  position: [number, number, number];
  size: number;
};

type TinyPlanet = {
  id: number;
  position: [number, number, number];
  size: number;
  color: string;
};

const createAsteroids = (): Asteroid[] => {
  const asteroids: Asteroid[] = [];
  const count = 200;

  for (let index = 0; index < count; index += 1) {
    const radius = 22 + Math.random() * 70;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    asteroids.push({
      id: index,
      position: [
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi) * 0.8,
        radius * Math.sin(phi) * Math.sin(theta),
      ] as [number, number, number],
      size: 0.08 + Math.random() * 0.24,
    });
  }

  return asteroids;
};

const createTinyPlanets = (): TinyPlanet[] => {
  const tinyPlanets: TinyPlanet[] = [];
  const count = 180;
  const colors = ["#8fb8ff", "#ffb3c6", "#c7f9cc", "#f9d423", "#b388eb"];

  for (let index = 0; index < count; index += 1) {
    const radius = 24 + Math.random() * 60;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    tinyPlanets.push({
      id: index,
      position: [
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi) * 0.7,
        radius * Math.sin(phi) * Math.sin(theta),
      ] as [number, number, number],
      size: 0.01 + Math.random() * 0.03,
      color: colors[index % colors.length],
    });
  }

  return tinyPlanets;
};

function Planet({
  texture,
  radius,
  distance,
  speed,
  planetRef,
}: {
  texture: THREE.Texture;
  radius: number;
  distance: number;
  speed: number;
  planetRef: (mesh: THREE.Mesh | null) => void;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    planetRef(ref.current);
  }, [planetRef]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    ref.current.position.set(Math.cos(t) * distance, 0, Math.sin(t) * distance);
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial map={texture} metalness={0.2} roughness={0.7} />
    </mesh>
  );
}

const StarField = ({ texture }: { texture: THREE.Texture }) => {
  return (
    <mesh scale={100}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
};

const SolarSystem = ({
  planetRefs,
  sunRef,
  asteroids,
}: {
  planetRefs: React.MutableRefObject<(THREE.Mesh | null)[]>;
  sunRef: React.MutableRefObject<THREE.Mesh | null>;
  asteroids: Asteroid[];
}) => {
  const maps = useTexture(textures) as {
    sun: THREE.Texture;
    mercury: THREE.Texture;
    venus: THREE.Texture;
    earth: THREE.Texture;
    mars: THREE.Texture;
    jupiter: THREE.Texture;
    saturn: THREE.Texture;
    uranus: THREE.Texture;
    neptune: THREE.Texture;
    stars: THREE.Texture;
  };
  const tinyPlanets = useRef(createTinyPlanets()).current;

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />
      <mesh ref={sunRef}>
        <sphereGeometry args={[1, 100, 100]} />
        <meshStandardMaterial
          map={maps.sun}
          emissive="#ffcc33"
          emissiveIntensity={3}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
      {planets.map((planet, index) => (
        <Planet
          key={planet.name}
          texture={maps[planet.textureKey as keyof typeof maps]}
          radius={planet.radius}
          distance={planet.distance}
          speed={planet.speed}
          planetRef={(mesh) => {
            planetRefs.current[index] = mesh;
          }}
        />
      ))}
      {planets.map((planet) => (
        <mesh key={`${planet.name}-orbit`} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry
            args={[planet.distance - 0.008, planet.distance + 0.008, 128]}
          />
          <meshBasicMaterial
            color="#888888"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      {asteroids.map((asteroid) => (
        <mesh key={asteroid.id} position={asteroid.position}>
          <dodecahedronGeometry args={[asteroid.size, 0]} />
          <meshStandardMaterial
            color="#7a5c3b"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
      ))}
      {tinyPlanets.map((planet) => (
        <mesh key={planet.id} position={planet.position}>
          <sphereGeometry args={[planet.size, 8, 8]} />
          <meshStandardMaterial
            color={planet.color}
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
      ))}
      <StarField texture={maps.stars} />
    </>
  );
};

const KeyboardControls = ({
  movement,
  onReset,
  onToggleLight,
}: {
  movement: React.MutableRefObject<MovementState>;
  onReset: () => void;
  onToggleLight: () => void;
}) => {
  useEffect(() => {
    const onKeyChange = (value: boolean, key: string) => {
      const state = movement.current;
      switch (key) {
        case "w":
          state.forward = value;
          break;
        case "s":
          state.backward = value;
          break;
        case "a":
          state.left = value;
          break;
        case "d":
          state.right = value;
          break;
        case "q":
          state.up = value;
          break;
        case "e":
          state.down = value;
          break;
        case "arrowleft":
          state.rotateLeft = value;
          break;
        case "arrowright":
          state.rotateRight = value;
          break;
        case " ":
        case "space":
          state.boost = value;
          break;
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === "r") {
        onReset();
        return;
      }
      if (key === "f") {
        onToggleLight();
        return;
      }
      onKeyChange(true, key);
    };
    const onKeyUp = (event: KeyboardEvent) => {
      onKeyChange(false, event.key.toLowerCase());
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [movement, onReset, onToggleLight]);

  return null;
};

const Ship = ({
  movement,
  planetRefs,
  controlsRef,
  onCrash,
  crashed,
  resetSignal,
  sunRef,
  asteroids,
  lightOn,
}: {
  movement: React.MutableRefObject<MovementState>;
  planetRefs: React.MutableRefObject<(THREE.Mesh | null)[]>;
  controlsRef: React.MutableRefObject<any>;
  onCrash: () => void;
  crashed: boolean;
  resetSignal: React.MutableRefObject<boolean>;
  sunRef: React.MutableRefObject<THREE.Mesh | null>;
  asteroids: Asteroid[];
  lightOn: boolean;
}) => {
  const shipRef = useRef<THREE.Group>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);
  const audioContext = useRef<AudioContext | null>(null);
  const boostGainRef = useRef<GainNode | null>(null);
  const boostOscRef = useRef<OscillatorNode | null>(null);
  const { camera } = useThree();

  useEffect(() => {
    const AudioCtx =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (AudioCtx) {
      audioContext.current = new AudioCtx();
    }
    return () => {
      audioContext.current?.close();
    };
  }, []);

  const playCrashSound = () => {
    const ctx = audioContext.current;
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  };

  const updateBoostSound = (boosting: boolean) => {
    const ctx = audioContext.current;
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();

    if (boosting) {
      if (!boostOscRef.current) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(280, ctx.currentTime);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        boostOscRef.current = osc;
        boostGainRef.current = gain;
      }
      if (boostGainRef.current) {
        boostGainRef.current.gain.setTargetAtTime(0.05, ctx.currentTime, 0.05);
      }
      if (boostOscRef.current) {
        boostOscRef.current.frequency.setTargetAtTime(
          380,
          ctx.currentTime,
          0.05,
        );
      }
    } else if (boostGainRef.current) {
      boostGainRef.current.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.05);
      setTimeout(() => {
        if (boostOscRef.current) {
          boostOscRef.current.stop();
          boostOscRef.current.disconnect();
          boostOscRef.current = null;
        }
        if (boostGainRef.current) {
          boostGainRef.current.disconnect();
          boostGainRef.current = null;
        }
      }, 80);
    }
  };

  // eslint-disable-next-line react-hooks/immutability
  useFrame((_, delta) => {
    if (!shipRef.current) return;

    if (resetSignal.current) {
      shipRef.current.position.set(0, 0, 12);
      shipRef.current.rotation.set(0, 0, 0);
      // eslint-disable-next-line react-hooks/immutability
      resetSignal.current = false;
      if (materialRef.current) materialRef.current.color.set("#ffffff");
    }

    const state = movement.current;
    const turnSpeed = delta * 1.8;
    if (state.rotateLeft) shipRef.current.rotation.y += turnSpeed;
    if (state.rotateRight) shipRef.current.rotation.y -= turnSpeed;

    if (!crashed) {
      const forward = new THREE.Vector3(0, 0, -1)
        .applyQuaternion(shipRef.current.quaternion)
        .normalize();
      const right = new THREE.Vector3(1, 0, 0)
        .applyQuaternion(shipRef.current.quaternion)
        .normalize();
      const up = new THREE.Vector3(0, 1, 0);
      const velocity = new THREE.Vector3();

      if (state.forward) velocity.add(forward);
      if (state.backward) velocity.sub(forward);
      if (state.left) velocity.sub(right);
      if (state.right) velocity.add(right);
      if (state.up) velocity.add(up);
      if (state.down) velocity.sub(up);
      if (state.boost) velocity.add(forward.multiplyScalar(1.7));
      updateBoostSound(state.boost);

      if (velocity.lengthSq() > 0) {
        velocity.normalize().multiplyScalar(delta * (state.boost ? 8.5 : 5.5));
        shipRef.current.position.add(velocity);
      }

      const shipPos = shipRef.current.position;
      if (sunRef.current) {
        const sunRadius =
          ((sunRef.current.geometry as THREE.SphereGeometry).parameters as any)
            .radius ?? 1;
        const distanceToSun = shipPos.distanceTo(sunRef.current.position);
        if (distanceToSun < sunRadius + 0.35) {
          if (!crashed) {
            playCrashSound();
            onCrash();
            if (materialRef.current) materialRef.current.color.set("#ff0000");
          }
        }
      }

      for (const planet of planetRefs.current) {
        if (!planet) continue;
        const planetRadius =
          ((planet.geometry as THREE.SphereGeometry).parameters as any)
            .radius ?? 1;
        const distance = shipPos.distanceTo(planet.position);
        if (distance < planetRadius + 0.35) {
          if (!crashed) {
            playCrashSound();
            onCrash();
            if (materialRef.current) materialRef.current.color.set("#ff0000");
          }
          break;
        }
      }

      for (const asteroid of asteroids) {
        const asteroidDistance = shipPos.distanceTo(
          new THREE.Vector3(...asteroid.position),
        );
        if (asteroidDistance < asteroid.size + 0.3) {
          if (!crashed) {
            playCrashSound();
            onCrash();
            if (materialRef.current) materialRef.current.color.set("#ff0000");
          }
          break;
        }
      }
    }

    const shipPos = shipRef.current.position.clone();
    const offset = new THREE.Vector3(0, 2, 8).applyQuaternion(
      shipRef.current.quaternion,
    );
    const desired = shipPos.clone().add(offset);
    camera.position.lerp(desired, 0.12);
    camera.lookAt(shipPos);
    if (controlsRef.current) {
      controlsRef.current.target.copy(shipPos);
      controlsRef.current.update();
    }
  });

  return (
    <group ref={shipRef} position={[0, 0, 12]}>
      <mesh scale={[0.7, 0.7, 0.7]}>
        <coneGeometry args={[0.2, 0.6, 8]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#ffffff"
          emissive="#88bbff"
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      <pointLight
        position={[0, 0, -0.8]}
        intensity={lightOn ? 3 : 0}
        distance={8}
        color="#88bbff"
      />
    </group>
  );
};

const SolarSystemScene = () => {
  const movement = useRef<MovementState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false,
    rotateLeft: false,
    rotateRight: false,
    boost: false,
  });
  const planetRefs = useRef<(THREE.Mesh | null)[]>([]);
  const sunRef = useRef<THREE.Mesh | null>(null);
  const controlsRef = useRef<any>(null);
  const [crashed, setCrashed] = useState(false);
  const [lightOn, setLightOn] = useState(true);
  const resetSignal = useRef(false);
  const asteroids = useRef(createAsteroids());

  const handleCrash = () => setCrashed(true);
  const handleReset = () => {
    setCrashed(false);
    resetSignal.current = true;
  };
  const handleToggleLight = () => setLightOn((value) => !value);

  return (
    <div
      id="canvas-container"
      style={{ width: "90vw", height: "90vh", overflow: "hidden" }}
    >
      <Canvas camera={{ position: [0, 5, 18], fov: 55 }}>
        <SolarSystem
          planetRefs={planetRefs}
          sunRef={sunRef}
          asteroids={asteroids.current}
        />
        <Ship
          movement={movement}
          planetRefs={planetRefs}
          controlsRef={controlsRef}
          onCrash={handleCrash}
          crashed={crashed}
          resetSignal={resetSignal}
          sunRef={sunRef}
          asteroids={asteroids.current}
          lightOn={lightOn}
        />
        <KeyboardControls
          movement={movement}
          onReset={handleReset}
          onToggleLight={handleToggleLight}
        />
        <OrbitControls ref={controlsRef} enableZoom enablePan enableRotate />
      </Canvas>
      {crashed && (
        <div
          style={{
            position: "absolute",
            left: 20,
            top: 20,
            color: "#ff6666",
            fontSize: 22,
            fontWeight: 700,
            textShadow: "0 0 10px rgba(0,0,0,0.6)",
          }}
        >
          Crash detected! Press R to reset the ship.
        </div>
      )}
      <div
        style={{
          position: "absolute",
          left: 20,
          bottom: 20,
          color: "white",
          fontSize: 14,
          textShadow: "0 0 8px rgba(0,0,0,0.7)",
        }}
      >
        Controls: W/S/A/D = move, Arrow keys = turn, Q/E = up/down, Space =
        boost, F = light, R = reset
      </div>
    </div>
  );
};

export default SolarSystemScene;
