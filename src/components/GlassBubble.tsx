"use client";

import { useRef, useState, useEffect, Component, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Bvh } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ponytail: local error boundary so a WebGL/HDR failure doesn't crash the whole page
class CanvasErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.warn("[GlassBubble] 3D render failed, hiding bubble:", error.message);
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}


interface GlassBubbleProps {
  className?: string;
  scale?: [number, number, number] | number;
  position?: [number, number, number];
}

function BubbleMesh({
  scale = 2.2,
  position = [1.2, 0.4, 0],
}: {
  scale?: [number, number, number] | number;
  position?: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    // Register ScrollTrigger inside component mount
    gsap.registerPlugin(ScrollTrigger);

    if (!meshRef.current) return;

    // Subtle parallax motion on scroll
    const scrollAnim = gsap.to(meshRef.current.position, {
      y: position[1] - 1.5,
      x: position[0] - 0.8,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      },
    });

    const rotateAnim = gsap.to(meshRef.current.rotation, {
      y: Math.PI * 0.4,
      x: Math.PI * 0.25,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    return () => {
      scrollAnim.kill();
      rotateAnim.kill();
    };
  }, [position]);

  return (
    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {/* Sphere geometry */}
        <sphereGeometry args={[1, 64, 64]} />
        
        {/* High fidelity refraction material */}
        <MeshTransmissionMaterial
          backside
          transmission={1.0}
          roughness={0.02}
          thickness={0.0} // 0 thickness avoids rendering empty canvas background as solid black/dark glass
          ior={1.33} // soap film / water index of refraction
          chromaticAberration={0.05}
          iridescence={1.0}
          iridescenceIOR={1.35}
          iridescenceThicknessRange={[100, 400]}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          distortion={0.05}
          distortionScale={0.1}
          temporalDistortion={0.02}
        />
      </mesh>
    </Float>
  );
}

export default function GlassBubble({
  className = "",
  scale = 2.2,
  position = [1.2, 0.4, 0],
}: GlassBubbleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Lazy render the WebGL canvas using Intersection Observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
    >
      {isInView && (
        <CanvasErrorBoundary>
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{
              antialias: true,
              alpha: true,
              preserveDrawingBuffer: false,
              powerPreference: "high-performance",
            }}
            className="w-full h-full"
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 2]} intensity={1.5} />
            <directionalLight position={[-5, -5, -2]} intensity={0.5} />
            <directionalLight position={[0, 5, 5]} intensity={0.8} />
            
            <Bvh firstHitOnly>
              <BubbleMesh scale={scale} position={position} />
            </Bvh>
          </Canvas>
        </CanvasErrorBoundary>
      )}
    </div>
  );
}
