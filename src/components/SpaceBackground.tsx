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
    group.current.rotation.y = t * 0.05;
    group.current.rotation.x = Math.sin(t * 0.2) * 0.05;
  });
  return (
    <group ref={group}>
      <mesh position={[6, 2, -8]}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.35} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[-5, -1, -6]}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.25} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[1, 3, -5]}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function StarsField() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.01;
  });
  return (
    <group ref={group}>
      <Stars radius={120} depth={80} count={14000} factor={3} saturation={1} fade speed={0.8} />
    </group>
  );
}

export default function SpaceBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 14], fov: 35 }}>
        <color attach="background" args={["#060010"]} />
        <StarsField />
        <ColorOrbs />
      </Canvas>
    </div>
  );
} 