"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Transform, Vec3, Camera } from "ogl";
import "./MetaBalls.css";

interface MetaBallsProps {
  className?: string;
  color?: string;
  speed?: number;
  enableMouseInteraction?: boolean;
  hoverSmoothness?: number;
  animationSize?: number;
  ballCount?: number;
  clumpFactor?: number;
  cursorBallSize?: number;
  cursorBallColor?: string;
  enableTransparency?: boolean;
}

function parseHexColor(hex: string): [number, number, number] {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  return [r, g, b];
}

function fract(x: number): number {
  return x - Math.floor(x);
}

function hash31(p: number): [number, number, number] {
  const r: [number, number, number] = [p * 0.1031, p * 0.103, p * 0.0973].map(fract) as [number, number, number];
  const r_yzx = [r[1], r[2], r[0]];
  const dotVal = r[0] * (r_yzx[0] + 33.33) + r[1] * (r_yzx[1] + 33.33) + r[2] * (r_yzx[2] + 33.33);
  for (let i = 0; i < 3; i++) {
    r[i] = fract(r[i] + dotVal);
  }
  return r;
}

function hash33(v: [number, number, number]): [number, number, number] {
  const p: [number, number, number] = [v[0] * 0.1031, v[1] * 0.103, v[2] * 0.0973].map(fract) as [number, number, number];
  const p_yxz = [p[1], p[0], p[2]];
  const dotVal = p[0] * (p_yxz[0] + 33.33) + p[1] * (p_yxz[1] + 33.33) + p[2] * (p_yxz[2] + 33.33);
  for (let i = 0; i < 3; i++) {
    p[i] = fract(p[i] + dotVal);
  }
  const p_xxy = [p[0], p[0], p[1]];
  const p_yxx = [p[1], p[0], p[0]];
  const p_zyx = [p[2], p[1], p[0]];
  const result: [number, number, number] = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    result[i] = fract((p_xxy[i] + p_yxx[i]) * p_zyx[i]);
  }
  return result;
}

const vertex = `#version 300 es
precision highp float;
layout(location = 0) in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iMouse;
uniform vec3 iColor;
uniform vec3 iCursorColor;
uniform float iAnimationSize;
uniform int iBallCount;
uniform float iCursorBallSize;
uniform vec3 iMetaBalls[50];
uniform float iClumpFactor;
uniform bool enableTransparency;
out vec4 outColor;

float getMetaBallValue(vec2 c, float r, vec2 p) {
  vec2 d = p - c;
  float dist2 = dot(d, d);
  return (r * r) / dist2;
}

void main() {
  vec2 fc = gl_FragCoord.xy;
  float scale = iAnimationSize / iResolution.y;
  vec2 coord = (fc - iResolution.xy * 0.5) * scale;
  vec2 mouseW = (iMouse.xy - iResolution.xy * 0.5) * scale;
  
  float m1 = 0.0;
  vec2 grad = vec2(0.0);
  
  for (int i = 0; i < 50; i++) {
    if (i >= iBallCount) break;
    vec2 d = coord - iMetaBalls[i].xy;
    float dist2 = dot(d, d);
    if (dist2 > 0.001) {
      float val = (iMetaBalls[i].z * iMetaBalls[i].z) / dist2;
      m1 += val;
      grad += -2.0 * val * d / dist2;
    }
  }
  
  const float cursorWeight = 1.25;
  vec2 dMouse = coord - mouseW;
  float dist2Mouse = dot(dMouse, dMouse);
  float m2 = 0.0;
  if (dist2Mouse > 0.001) {
    m2 = (iCursorBallSize * iCursorBallSize) / dist2Mouse;
    float weightedVal = m2 * cursorWeight;
    m1 += weightedVal;
    grad += -2.0 * weightedVal * dMouse / dist2Mouse;
  }
  
  float total = m1;
  
  // Smoothly blend the edges with anti-aliasing
  float threshold = 1.0;
  float edgeWidth = 0.03;
  float mask = smoothstep(threshold - edgeWidth, threshold + edgeWidth, total);
  
  if (mask > 0.01) {
    // Outward facing normal from gradient (grad points towards center because of negative sign in formula)
    vec3 N = normalize(vec3(-grad, 0.45));
    
    // Light setup
    vec3 L = normalize(vec3(-0.5, 0.6, 1.2)); // Light from top-left-front
    vec3 V = vec3(0.0, 0.0, 1.0); // View direction
    vec3 H = normalize(L + V);
    
    float diff = max(dot(N, L), 0.0);
    float spec = pow(max(dot(N, H), 0.0), 32.0);
    float fresnel = pow(1.0 - max(dot(N, V), 0.0), 3.0);
    
    // Translucent glass base color (off-white)
    vec3 baseColor = mix(iColor, iCursorColor, m2 / max(total, 0.001));
    
    // iridescence along the edge
    vec3 irid = 0.5 + 0.5 * cos(iTime * 1.5 + coord.xyx * 0.05 + vec3(0.0, 2.0, 4.0));
    
    // Specular light (bright white highlight)
    vec3 specularColor = vec3(spec * 0.95);
    
    // Rim refraction (dark outline + iridescence)
    vec3 rimColor = mix(vec3(0.12, 0.12, 0.12), irid, 0.35);
    
    // Blend between transparent center and refractive rim + specular
    vec3 glassColor = mix(baseColor * 0.95, rimColor, fresnel) + specularColor;
    
    // Transparency: center is extremely clear, edges are visible, highlights are opaque
    float alpha = mix(0.02, 0.32, fresnel) + spec * 0.85;
    
    outColor = vec4(glassColor, (enableTransparency ? alpha : 1.0) * mask);
  } else {
    discard;
  }
}
`;

const MetaBalls = ({
  className = "",
  color = "#ffffff",
  speed = 0.3,
  enableMouseInteraction = true,
  hoverSmoothness = 0.05,
  animationSize = 30,
  ballCount = 15,
  clumpFactor = 1,
  cursorBallSize = 3,
  cursorBallColor = "#ffffff",
  enableTransparency = true,
}: MetaBallsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dpr = 1;
    const renderer = new Renderer({ dpr, alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, enableTransparency ? 0 : 1);
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, {
      left: -1,
      right: 1,
      top: 1,
      bottom: -1,
      near: 0.1,
      far: 10,
    });
    camera.position.z = 1;

    const geometry = new Triangle(gl);
    const [r1, g1, b1] = parseHexColor(color);
    const [r2, g2, b2] = parseHexColor(cursorBallColor);

    const metaBallsUniform: any[] = [];
    for (let i = 0; i < 50; i++) {
      metaBallsUniform.push(new Vec3(0, 0, 0));
    }

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec3(0, 0, 0) },
        iMouse: { value: new Vec3(0, 0, 0) },
        iColor: { value: new Vec3(r1, g1, b1) },
        iCursorColor: { value: new Vec3(r2, g2, b2) },
        iAnimationSize: { value: animationSize },
        iBallCount: { value: ballCount },
        iCursorBallSize: { value: cursorBallSize },
        iMetaBalls: { value: metaBallsUniform },
        iClumpFactor: { value: clumpFactor },
        enableTransparency: { value: enableTransparency },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    const scene = new Transform();
    mesh.setParent(scene);

    const maxBalls = 50;
    const effectiveBallCount = Math.min(ballCount, maxBalls);
    const ballParams: any[] = [];
    for (let i = 0; i < effectiveBallCount; i++) {
      const idx = i + 1;
      const h1 = hash31(idx);
      const st = h1[0] * (2 * Math.PI);
      const dtFactor = 0.1 * Math.PI + h1[1] * (0.4 * Math.PI - 0.1 * Math.PI);
      const baseScale = 0.45 + h1[1] * 0.55;
      const h2 = hash33(h1);
      const toggle = Math.floor(h2[0] * 2.0);
      const radiusVal = 0.95 + h2[2] * 0.55;
      ballParams.push({ st, dtFactor, baseScale, toggle, radius: radiusVal });
    }

    const mouseBallPos = { x: 0, y: 0 };
    let pointerInside = false;
    let pointerX = 0;
    let pointerY = 0;

    function resize() {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width * dpr, height * dpr);
      gl.canvas.style.width = width + "px";
      gl.canvas.style.height = height + "px";
      program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, 0);
    }
    window.addEventListener("resize", resize);
    resize();

    function onPointerMove(e: PointerEvent) {
      if (!enableMouseInteraction || !container) return;
      const rect = container.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      pointerX = (px / rect.width) * gl.canvas.width;
      pointerY = (1 - py / rect.height) * gl.canvas.height;
    }
    function onPointerEnter() {
      if (!enableMouseInteraction) return;
      pointerInside = true;
    }
    function onPointerLeave() {
      if (!enableMouseInteraction) return;
      pointerInside = false;
    }
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerenter", onPointerEnter);
    container.addEventListener("pointerleave", onPointerLeave);

    const startTime = performance.now();
    let animationFrameId: number;
    function update(t: number) {
      animationFrameId = requestAnimationFrame(update);
      const elapsed = (t - startTime) * 0.001;
      program.uniforms.iTime.value = elapsed;

      // Explicitly position the main bubble in the center, and a satellite bubble to the right
      // Ball 0: The giant center bubble (wobbling very slightly)
      const centerHoverX = Math.sin(elapsed * 0.8) * 0.04;
      const centerHoverY = Math.cos(elapsed * 0.6) * 0.04;
      metaBallsUniform[0].set(centerHoverX, centerHoverY, 2.3);

      // Ball 1: The satellite bubble to the right (floating gently)
      const satX = 2.4 + Math.sin(elapsed * 0.5) * 0.12;
      const satY = 0.5 + Math.cos(elapsed * 0.7) * 0.12;
      metaBallsUniform[1].set(satX, satY, 0.75);

      // Fill remaining uniform slots off-screen
      for (let i = 2; i < 50; i++) {
        metaBallsUniform[i].set(999.0, 999.0, 0.0);
      }

      let targetX: number, targetY: number;
      const cx = gl.canvas.width * 0.5;
      const cy = gl.canvas.height * 0.5;

      if (pointerInside) {
        let dx = pointerX - cx;
        let dy = pointerY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Constrain drop travel distance so it stretches elastically before separating
        const maxDist = gl.canvas.height * 0.35;
        if (dist > maxDist) {
          dx = (dx / dist) * maxDist;
          dy = (dy / dist) * maxDist;
        }
        targetX = cx + dx;
        targetY = cy + dy;
      } else {
        // Re-merge fully back into the center bubble when mouse is not hovering
        targetX = cx;
        targetY = cy;
      }
      mouseBallPos.x += (targetX - mouseBallPos.x) * hoverSmoothness;
      mouseBallPos.y += (targetY - mouseBallPos.y) * hoverSmoothness;
      program.uniforms.iMouse.value.set(mouseBallPos.x, mouseBallPos.y, 0);

      renderer.render({ scene, camera });
    }
    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerenter", onPointerEnter);
      container.removeEventListener("pointerleave", onPointerLeave);
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [
    color,
    cursorBallColor,
    speed,
    enableMouseInteraction,
    hoverSmoothness,
    animationSize,
    ballCount,
    clumpFactor,
    cursorBallSize,
    enableTransparency,
  ]);

  return <div ref={containerRef} className={`metaballs-container ${className}`} />;
};

export default MetaBalls;
