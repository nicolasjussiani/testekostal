"use client";
import { useRef, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (prefersReduced) return;

    let scene: import("three").Scene;
    let camera: import("three").PerspectiveCamera;
    let renderer: import("three").WebGLRenderer;
    let raf: number;
    let particles: import("three").Points;

    const init = async () => {
      const THREE = await import("three");

      // Checar suporte WebGL
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) return;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100);
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      // Campo de particulas
      const count = isMobile ? 120 : 350;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      const c1 = new THREE.Color(0xc0144e); // magenta
      const c2 = new THREE.Color(0xb5892a); // gold
      const c3 = new THREE.Color(0x7a8fa0); // steel

      for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 14;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

        const mix = Math.random();
        const col = mix < 0.15 ? c1 : mix < 0.25 ? c2 : c3;
        colors[i * 3]     = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.03,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
      });

      particles = new THREE.Points(geo, mat);
      scene.add(particles);

      // Linhas tecnicas geometricas
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x7a8fa0,
        transparent: true,
        opacity: 0.08,
      });
      const lineGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(3, 3, 3));
      const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
      lineMesh.position.set(3, 0.5, -2);
      scene.add(lineMesh);

      // Animate
      let t = 0;
      const animate = () => {
        raf = requestAnimationFrame(animate);
        t += 0.002;
        particles.rotation.y = t * 0.15;
        particles.rotation.x = t * 0.05;
        lineMesh.rotation.y = t * 0.3;
        lineMesh.rotation.x = t * 0.2;
        renderer.render(scene, camera);
      };
      animate();

      // Resize
      const onResize = () => {
        if (!mount || !renderer || !camera) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(raf);
        geo.dispose();
        mat.dispose();
        lineGeo.dispose();
        lineMat.dispose();
        renderer.dispose();
        if (mount && renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
      };
    };

    let cleanup: (() => void) | undefined;
    init().then((fn) => { cleanup = fn; });
    return () => { cleanup?.(); };
  }, [prefersReduced, isMobile]);

  return (
    <div
      ref={mountRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
