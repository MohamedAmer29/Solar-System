# Solar System

## Overview

A 3D Solar System simulator built with React, Three.js, and React Three Fiber. Explore an interactive solar system featuring a playable spaceship, realistic planetary orbits, a procedural starfield, an asteroid belt, and collision detection. The Sun and all eight planets orbit at distinct speeds while tiny planets and distant stars fill the background. The scene renders inside a React Canvas component with orbit controls and smooth animation loops. A custom loading screen displays orbiting planets while textures load. The project demonstrates declarative 3D scene composition using React components, hooks, and state management to create an immersive space exploration experience directly in the browser.

## Statistics

- **9** React components powering the scene
- **8** planets orbiting the Sun with 2K textures
- **200** procedural asteroids in the belt
- **180** tiny planets scattered in deep space
- **8** high-resolution texture assets (up to 8K)

## Physics & Simulation

Each celestial body orbits independently using `useFrame` animation hooks. The Sun spins slowly on its axis while planets follow circular orbital paths at varying distances and speeds. An asteroid belt of dodecahedron-shaped rocks orbits at medium range, and 180 tiny planets with random colors populate distant space. Orbit rings visualize each planet's path. Speeds follow real-world ordering, from Mercury's rapid orbit to Neptune's almost imperceptible drift, creating a convincing sense of scale. All positions update every frame based on elapsed time, and collision detection continuously checks the ship's distance against every body's bounding radius.

## Spaceship & Controls

A first-person spaceship follows an orbit camera that smoothly tracks its position. Use WASD to move, arrow keys to turn, Q and E for vertical strafing, and hold Space to boost forward. The ship carries a point light headlight toggled with F for exploring dark regions of space. Colliding with the Sun, planets, or asteroids triggers a crash state, flashing the ship red and halting all movement until you press R to reset. Audio synthesis using the Web Audio API generates crash and boost sounds dynamically. The movement system supports smooth acceleration, directional velocity, and boost multipliers.

## Visuals & Effects

All planets use high-resolution 2K textures applied to Standard materials with configurable metalness and roughness for realistic surface appearance. A large inward-facing starfield sphere with a Milky Way texture renders surrounding space. Ambient light provides base illumination while a bright point light at the Sun's center creates realistic brightness and shadows. Each planet has subtle rotation in addition to its orbital movement. Thousands of small asteroids form a convincing belt. WebGL context loss is handled gracefully with a fullscreen recovery UI and reload button. Loading states and crash feedback give clear visual cues to the player.

## Technologies

This project uses **React 19** for component-based UI and state management. **Three.js** provides the low-level 3D rendering engine with geometries, materials, and lights. **React Three Fiber** acts as the React reconciler, translating JSX into Three.js scene graphs. **React Three Drei** supplies useful abstractions like `useTexture` for asset loading and `OrbitControls` for camera interaction. **Vite** powers the development server and production builds with hot module replacement. **TypeScript** adds static typing across all components for better maintainability and developer experience. Together these tools enable a declarative, reactive 3D application.

## Development

The project uses npm scripts for common workflows. Run `npm install` to install all dependencies, then `npm run dev` to start the Vite development server with hot module replacement. Use `npm run build` to type-check with TypeScript and generate an optimized production bundle in the `dist` directory. For deployment, `npm run predeploy` builds the project automatically, and `npm run deploy` publishes the contents of `dist` to GitHub Pages using `gh-pages`. The `vite.config.ts` file sets the base path to `/Solar-System` for correct asset routing on GitHub Pages. ESLint enforces code quality rules configured for React and TypeScript.
