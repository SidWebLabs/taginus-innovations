"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";

export type SceneNode = { label: string; href: string };

/**
 * 3D "innovation path": the seven business verticals as glowing nodes joined by one curved path,
 * with light particles flowing from Agri Input to Innovation Engagement.
 * Drag-free, pointer parallax only. Pauses off-screen and when the tab is hidden.
 */
export default function HeroScene({ nodes }: { nodes: SceneNode[] }) {
  const host = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.cssText = "display:block;width:100%;height:100%";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    const group = new THREE.Group();
    scene.add(group);

    const n = nodes.length;
    const pts = nodes.map((_, i) => {
      const t = i / (n - 1);
      return new THREE.Vector3((t - 0.5) * 9.5, Math.sin(t * Math.PI * 1.7) * 2.1, Math.cos(t * Math.PI * 2.2) * 1.8);
    });
    const curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5);

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(o: T) => { disposables.push(o); return o; };

    // path
    const tubeGeo = track(new THREE.TubeGeometry(curve, 220, 0.028, 8, false));
    const tubeMat = track(new THREE.MeshBasicMaterial({ color: 0xf2a900, transparent: true, opacity: 0.6 }));
    group.add(new THREE.Mesh(tubeGeo, tubeMat));

    // nodes (core + halo)
    const coreGeo = track(new THREE.SphereGeometry(0.17, 24, 24));
    const haloGeo = track(new THREE.SphereGeometry(0.42, 24, 24));
    const coreMat = track(new THREE.MeshBasicMaterial({ color: 0xffffff }));
    const haloMat = track(new THREE.MeshBasicMaterial({ color: 0xf2a900, transparent: true, opacity: 0.22 }));
    const cores: THREE.Mesh[] = [], halos: THREE.Mesh[] = [];
    pts.forEach((p) => {
      const c = new THREE.Mesh(coreGeo, coreMat); c.position.copy(p);
      const h = new THREE.Mesh(haloGeo, haloMat); h.position.copy(p);
      group.add(c, h); cores.push(c); halos.push(h);
    });

    // flowing particles
    const FLOW = 46;
    const flowArr = new Float32Array(FLOW * 3);
    const flowGeo = track(new THREE.BufferGeometry());
    flowGeo.setAttribute("position", new THREE.BufferAttribute(flowArr, 3));
    const flowMat = track(new THREE.PointsMaterial({ color: 0xffffff, size: 0.11, transparent: true, opacity: 0.95, sizeAttenuation: true }));
    group.add(new THREE.Points(flowGeo, flowMat));

    // ambient dust
    const DUST = 140;
    const dustArr = new Float32Array(DUST * 3);
    for (let i = 0; i < DUST; i++) { dustArr[i * 3] = (Math.random() - 0.5) * 16; dustArr[i * 3 + 1] = (Math.random() - 0.5) * 8; dustArr[i * 3 + 2] = (Math.random() - 0.5) * 8; }
    const dustGeo = track(new THREE.BufferGeometry());
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustArr, 3));
    const dustMat = track(new THREE.PointsMaterial({ color: 0xa9d6b8, size: 0.035, transparent: true, opacity: 0.55 }));
    group.add(new THREE.Points(dustGeo, dustMat));

    // HTML labels (clickable, projected each frame)
    const labels = nodes.map((nd, i) => {
      const a = document.createElement("a");
      a.href = nd.href; a.textContent = nd.label; a.tabIndex = -1; a.setAttribute("aria-hidden", "true");
      a.style.cssText = "position:absolute;left:0;top:0;white-space:nowrap;font:600 .8rem var(--font-figtree),system-ui,sans-serif;color:#fff;background:rgba(18,55,42,.78);border:1px solid rgba(242,169,0,.6);padding:.25rem .6rem;border-radius:999px;transition:background .2s,color .2s,transform .2s;will-change:transform";
      a.addEventListener("mouseenter", () => { hover = i; a.style.background = "#f2a900"; a.style.color = "#12372a"; });
      a.addEventListener("mouseleave", () => { hover = -1; a.style.background = "rgba(18,55,42,.78)"; a.style.color = "#fff"; });
      a.addEventListener("click", (e) => { e.preventDefault(); router.push(nd.href); });
      el.appendChild(a);
      return a;
    });
    let hover = -1;

    let w = 1, h = 1, visible = true, raf = 0;
    const pointer = { x: 0, y: 0 }, smooth = { x: 0, y: 0 };
    const v = new THREE.Vector3();

    const resize = () => {
      w = el.clientWidth || 1; h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.set(0, 0.2, Math.max(10.5, 15 / camera.aspect));
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize); ro.observe(el); resize();

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    el.addEventListener("pointermove", onMove);

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(frame); }, { threshold: 0.05 });
    io.observe(el);

    const clock = new THREE.Clock();
    function frame() {
      raf = 0;
      if (!visible || document.hidden) return;
      const t = clock.getElapsedTime();
      smooth.x += (pointer.x - smooth.x) * 0.05; smooth.y += (pointer.y - smooth.y) * 0.05;
      group.rotation.y = Math.sin(t * 0.25) * 0.28 + smooth.x * 0.3;
      group.rotation.x = smooth.y * 0.14;

      for (let i = 0; i < FLOW; i++) {
        curve.getPoint(((t * 0.06 + i / FLOW) % 1), v);
        flowArr[i * 3] = v.x; flowArr[i * 3 + 1] = v.y; flowArr[i * 3 + 2] = v.z;
      }
      flowGeo.attributes.position.needsUpdate = true;
      dustMat.opacity = 0.45 + Math.sin(t) * 0.1;

      halos.forEach((hm, i) => { const s = (hover === i ? 1.7 : 1) + Math.sin(t * 2 + i) * 0.12; hm.scale.setScalar(s); });
      cores.forEach((c, i) => c.scale.setScalar(hover === i ? 1.4 : 1));

      group.updateMatrixWorld();
      labels.forEach((a, i) => {
        v.copy(pts[i]).applyMatrix4(group.matrixWorld).project(camera);
        const x = (v.x * 0.5 + 0.5) * w, y = (-v.y * 0.5 + 0.5) * h;
        const lw = a.offsetWidth;
        a.style.transform = `translate(${Math.max(4, Math.min(w - lw - 4, x - lw / 2))}px, ${y + 16}px)`;
      });
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    const onVis = () => { if (!document.hidden && visible && !raf) raf = requestAnimationFrame(frame); };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      el.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      labels.forEach((a) => a.remove());
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [nodes, router]);

  return <div ref={host} className="absolute inset-0" />;
}
