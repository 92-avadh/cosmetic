"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  Environment,
  useTexture,
  useProgress,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState, Suspense } from "react";

/* ------------------------------------------------------------------ *
 * BubbleScene — true-refraction glass / soap-bubble hero element.
 *
 * ONE physically-based transmissive sphere that refracts the content
 * behind it, with real thin-film iridescence, a specular hotspot,
 * animated soap-film micro-motion, and cursor-reactive surface tension.
 * Falls back to a cheap CSS/SVG bubble when WebGL is unavailable or
 * the user prefers reduced motion.
 *
 * Drives the preloader: signals the parent via onLoadComplete once the
 * scene's assets (environment + textures) have loaded.
 * ------------------------------------------------------------------ */

export interface BubbleSceneProps {
  /** If true, refract the hero background image; else refract a flat brand tone. */
  refractImage?: boolean;
  /** Optional fixed size (px or CSS length). Omit to fill the parent (absolute inset-0). */
  size?: number | string;
  /** Fires once the WebGL scene is ready — or immediately on the CSS fallback path. */
  onLoadComplete?: () => void;
  /** Reports asset-load progress 0–100 (WebGL path only; fallback jumps to 100). */
  onProgress?: (progress: number) => void;
}

// -------------------------------------------------------------------
// WebGL capability probe
// -------------------------------------------------------------------
function hasWebGL() {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// -------------------------------------------------------------------
// Cheap fallback: CSS/SVG glass bubble (no light actually bends here —
// the "faked gradient" tier, kept for unsupported clients).
// -------------------------------------------------------------------
function CSSBubbleFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
      <div
        className="w-[70%] h-[70%] rounded-full relative"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(237,229,223,0.1) 40%, rgba(201,122,94,0.15) 80%, rgba(18,18,18,0.05) 100%)",
          boxShadow:
            "inset 0 16px 24px rgba(255,255,255,0.35), inset 8px 0 16px rgba(201,122,94,0.2), inset -8px 0 16px rgba(18,18,18,0.15), 0 20px 40px rgba(18,18,18,0.12)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <div className="absolute top-[15%] left-[20%] w-[10%] h-[10%] bg-white rounded-full opacity-60 filter blur-[1px]" />
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// Lightweight 3D pseudo-noise for soap-film micro-motion. Layered trig
// gives organic, seamless displacement without a simplex dependency —
// keeps the preloader bundle lean (it loads BEFORE the rest of the page).
// Output ~[-0.5, 0.5].
// -------------------------------------------------------------------
function noise3(x: number, y: number, z: number) {
  return (
    (Math.sin(x * 1.0 + Math.cos(y * 0.7)) * 0.5 +
      Math.sin(y * 1.3 + Math.cos(z * 0.9)) * 0.3 +
      Math.sin(z * 1.7 + Math.cos(x * 1.1)) * 0.2) *
    0.5
  );
}

// -------------------------------------------------------------------
// Background plane — transmission needs real pixels behind it to refract.
// -------------------------------------------------------------------
function BackgroundPlane({ refractImage }: { refractImage: boolean }) {
  const { viewport } = useThree();
  const texture = useTexture("/hero-bg.png");

  return (
    <mesh position={[0, 0, -2.5]} scale={[viewport.width * 1.5, viewport.height * 1.5, 1]}>
      <planeGeometry />
      {refractImage ? (
        <meshBasicMaterial map={texture} toneMapped={false} />
      ) : (
        <meshBasicMaterial color="#F6F4EE" toneMapped={false} />
      )}
    </mesh>
  );
}

// -------------------------------------------------------------------
// The bubble: high-segment sphere + MeshTransmissionMaterial.
// -------------------------------------------------------------------
function BubbleMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<
    (THREE.MeshPhysicalMaterial & { distortion: number; distortionScale: number }) | null
  >(null);

  const targetPos = useRef(new THREE.Vector3());
  const mouseVel = useRef(0);
  const lastMouse = useRef({ x: 0, y: 0 });

  // The canvas wrapper is pointer-events-none (it must never block page
  // interaction), so R3F's own pointer state never updates — track the
  // cursor at window level instead, normalized to [-1, 1].
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Idle-state material targets (interaction springs back to these).
  const IDLE_DISTORTION_SCALE = 0.45;
  const IDLE_DISTORTION = 0.25;

  // 64x64 minimum — low-poly shows faceted refraction artifacts.
  const geometry = useMemo(() => new THREE.SphereGeometry(1.65, 64, 64), []);

  // Pristine vertex cache so per-frame displacement is applied against
  // the true sphere, not the previous frame's displaced surface.
  const basePositions = useRef<Float32Array | null>(null);
  useEffect(() => {
    basePositions.current = (geometry.attributes.position.array as Float32Array).slice();
    return () => geometry.dispose();
  }, [geometry]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const { x, y } = pointer.current;
    const viewport = state.viewport;
    const time = state.clock.getElapsedTime();

    // 1. Magnetic position lerp toward the cursor.
    targetPos.current.set(x * (viewport.width * 0.15), y * (viewport.height * 0.15), 0);
    mesh.position.lerp(targetPos.current, 0.055);

    // 2. Pointer velocity → elastic reaction (fast move = distortion spike).
    const dx = x - lastMouse.current.x;
    const dy = y - lastMouse.current.y;
    const velocity = Math.sqrt(dx * dx + dy * dy);
    mouseVel.current += (velocity - mouseVel.current) * 0.085;
    lastMouse.current.x = x;
    lastMouse.current.y = y;

    // 3. Slow rotation cycles the specular spots and — crucially — sweeps
    //    the viewing angle so the thin-film iridescence hue visibly shifts.
    mesh.rotation.y = time * 0.15;
    mesh.rotation.x = time * 0.07;

    // 4. Fluid surface-tension wobble on scale.
    const baseWobble = Math.sin(time * 1.8) * 0.03;
    const dynamicScale = 1.02 + baseWobble + mouseVel.current * 0.55;
    mesh.scale.set(
      dynamicScale,
      dynamicScale + Math.cos(time * 1.4) * 0.015,
      dynamicScale
    );

    // 5. Soap-film micro-motion — radial vertex perturbation with animated
    //    pseudo-noise. Amplitude rises briefly with pointer velocity.
    const base = basePositions.current;
    if (base) {
      const pos = geometry.attributes.position as THREE.BufferAttribute;
      const amp = 0.03 + mouseVel.current * 0.18;
      for (let i = 0; i < pos.count; i++) {
        const bx = base[i * 3];
        const by = base[i * 3 + 1];
        const bz = base[i * 3 + 2];
        const n = noise3(
          bx * 1.5 + time * 0.3,
          by * 1.5 + time * 0.22,
          bz * 1.5 + time * 0.2
        );
        const f = 1 + n * amp;
        pos.setXYZ(i, bx * f, by * f, bz * f);
      }
      pos.needsUpdate = true;
      geometry.computeVertexNormals();
    }

    // 6. Push distortion up on interaction, spring back to idle.
    if (materialRef.current) {
      materialRef.current.distortionScale = IDLE_DISTORTION_SCALE + mouseVel.current * 2.8;
      materialRef.current.distortion = IDLE_DISTORTION + mouseVel.current * 1.4;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <MeshTransmissionMaterial
        ref={materialRef as never}
        transmission={1.0}
        thickness={0.15} // thin soap-film wall, not a solid glass ball
        roughness={0.08} // a touch of roughness reads as film, not hard glass
        ior={1.33} // water/soap-film index of refraction
        chromaticAberration={0.08} // real-lens colour fringing at the edges
        anisotropicBlur={0.15}
        distortion={IDLE_DISTORTION}
        distortionScale={IDLE_DISTORTION_SCALE}
        temporalDistortion={0.15} // never fully static
        color="#ffffff"
        resolution={512}
        samples={4}
        iridescence={1.0} // physically-based thin-film rainbow
        iridescenceIOR={1.4}
        iridescenceThicknessRange={[100, 400]} // nm — hue shifts by view angle
      />
    </mesh>
  );
}

// -------------------------------------------------------------------
// Mounts only after Suspense resolves — i.e. environment + textures
// are loaded and the scene is ready to reveal.
// -------------------------------------------------------------------
function SceneReadySignal({
  onLoadComplete,
  onProgress,
}: {
  onLoadComplete?: () => void;
  onProgress?: (p: number) => void;
}) {
  const done = useRef(false);
  useEffect(() => {
    onProgress?.(100);
    if (!done.current) {
      done.current = true;
      onLoadComplete?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

// Streams drei's global asset-load progress while the scene suspends.
// Subscribes to the store imperatively (no hook) — the loader mutates the
// store synchronously mid-render during Suspense, and consuming it via the
// hook triggers React's "setState while rendering" warning.
function ProgressReporter({ onProgress }: { onProgress?: (p: number) => void }) {
  useEffect(() => {
    onProgress?.(useProgress.getState().progress);
    return useProgress.subscribe((state) => onProgress?.(state.progress));
  }, [onProgress]);
  return null;
}

// -------------------------------------------------------------------
// Exported component
// -------------------------------------------------------------------
export default function BubbleScene({
  refractImage = true,
  size,
  onLoadComplete,
  onProgress,
}: BubbleSceneProps) {
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Treat reduced-motion the same as no-WebGL: show the calm CSS bubble.
    setWebgl(hasWebGL() && !reducedMotion);
  }, []);

  // The fallback path must still unblock the loading sequence.
  useEffect(() => {
    if (webgl === false) {
      onProgress?.(100);
      onLoadComplete?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webgl]);

  const dim = typeof size === "number" ? `${size}px` : size;
  const wrapperClass = size
    ? "relative pointer-events-none select-none"
    : "absolute inset-0 w-full h-full pointer-events-none select-none";
  const wrapperStyle = dim ? { width: dim, height: dim } : undefined;

  if (webgl === null) return null; // still deciding — render nothing
  if (!webgl)
    return (
      <div className={wrapperClass} style={wrapperStyle}>
        <CSSBubbleFallback />
      </div>
    );

  return (
    <div className={wrapperClass} style={wrapperStyle}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Reads progress while assets stream in (renders outside Suspense) */}
        <ProgressReporter onProgress={onProgress} />

        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />

          {/* Soft specular hotspot, upper-left — mirrors the CSS glare dot */}
          <pointLight position={[-5, 5, 4]} intensity={25} color="#ffffff" />
          <pointLight position={[5, -5, 2.5]} intensity={12} color="#ffffff" />

          {/* Something coherent to refract */}
          <BackgroundPlane refractImage={refractImage} />

          <BubbleMesh />

          <Environment preset="studio" />

          {/* Fires once everything above has resolved */}
          <SceneReadySignal onLoadComplete={onLoadComplete} onProgress={onProgress} />
        </Suspense>

        <EffectComposer>
          {/* Only the specular hotspot should bloom, not the whole sphere */}
          <Bloom intensity={0.5} luminanceThreshold={0.8} luminanceSmoothing={0.05} />
          {/* Very subtle extra edge fringing on top of the material's own */}
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0006, 0.0006]}
            radialModulation={false}
            modulationOffset={0}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
