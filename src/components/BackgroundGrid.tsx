"use client";

import { Canvas } from "@react-three/fiber";
import { Grid } from "@react-three/drei";

export default function BackgroundGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 opacity-60">
      <Canvas camera={{ position: [0, 0, 14], fov: 35 }}>
        <Grid cellColor="#2a1b4a" sectionColor="#7c3aed" cellSize={0.8} sectionSize={4} fadeDistance={22} fadeStrength={1.2} />
      </Canvas>
    </div>
  );
} 