"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function ColorOrbs() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.025;
    group.current.rotation.x = Math.sin(t * 0.12) * 0.03;
  });
  return (
    <group ref={group}>
      <mesh position={[6, 2, -8]}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.18} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[-5, -1, -6]}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.14} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[1, 3, -5]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.16} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function StarsField() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.006;
  });
  return (
    <group ref={group}>
      <Stars radius={110} depth={70} count={4000} factor={2.5} saturation={0.9} fade speed={0.5} />
    </group>
  );
}

export default function SpaceBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 14], fov: 35 }} dpr={[1, 1.25]} gl={{ antialias: false, powerPreference: "low-power" }}>
        <color attach="background" args={["#060010"]} />
        <StarsField />
        <ColorOrbs />
      </Canvas>
    </div>
  );
} 