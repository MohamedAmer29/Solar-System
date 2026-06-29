# Solar System

## Overview

A 3D Solar System simulator built with React, Three.js, and React Three Fiber. Explore an interactive solar system featuring a playable spaceship, realistic planetary orbits, a procedural starfield, asteroid belt, and collision detection. The Sun and all eight planets orbit at distinct speeds while tiny planets and distant stars fill the background.

## Physics & Simulation

Each body orbits independently: the Sun spins slowly, planets follow circular paths at varying distances and speeds, and an asteroid belt of dodecahedron-shaped rocks orbits at medium range. Orbit rings visualize each planet's path. Speeds scale with real-world ordering, from Mercury's fast spin to Neptune's glacial drift.

## Spaceship & Controls

A first-person spaceship follows an orbit camera. Use WASD to move, arrow keys to turn, Q/E for vertical motion, and Space to boost. The ship carries a point light headlight toggled with F. Colliding with the Sun, planets, or asteroids triggers a crash state, flashing red and halting movement until you press R to reset.

## Visuals & Effects

All planets use high-resolution 2K textures with Standard materials, metalness, and roughness. A large starfield sphere renders surrounding space. Ambient and point lights illuminate the Sun, while each planet has subtle rotation. WebGL context loss is handled gracefully with a fullscreen recovery UI and reload button.

## Technologies

- **React 19** — Component-based UI
- **Three.js** — Low-level 3D rendering
- **React Three Fiber** — React reconciler for Three.js
- **React Three Drei** — R3F helpers like `useTexture` and `OrbitControls`
- **Vite** — Fast dev server and bundler
- **TypeScript** — Static typing

## Development

Install dependencies with `npm install`, start the dev server via `npm run dev`, build for production with `npm run build`, and deploy to GitHub Pages with `npm run deploy`.
