import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

export type SectionId = "about" | "experience" | "projects" | "skills" | "connect";

interface Pin {
  id: SectionId;
  label: string;
  lat: number;
  lon: number;
}

const PINS: Pin[] = [
  { id: "about",      label: "About Me",      lat: 25,  lon: 121  },  // Taiwan
  { id: "experience", label: "Experience",     lat: 40.7, lon: -74 },  // New York
  { id: "projects",   label: "Projects",       lat: 47,  lon: 8    },  // Switzerland
  { id: "skills",     label: "Tech & Skills",  lat: 37,  lon: -120 },  // California
  { id: "connect",    label: "Let's Connect",  lat: -33.93, lon: 18.42 },  // Cape Town, South Africa
];

function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

interface GlobeProps {
  onSectionClick: (id: SectionId) => void;
  activeSection: SectionId | null;
}

export default function Globe({ onSectionClick, activeSection }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    globe: THREE.Group;
    pins: Map<SectionId, THREE.Mesh>;
    animId: number;
  } | null>(null);

  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const pointerDownPos = useRef({ x: 0, y: 0 });
  const activeSectionRef = useRef<SectionId | null>(activeSection);
  const hoveredPinRef = useRef<SectionId | null>(null);

  const [labelPositions, setLabelPositions] = useState<
    Map<SectionId, { x: number; y: number; visible: boolean }>
  >(new Map());
  const [hoveredPin, setHoveredPin] = useState<SectionId | null>(null);

  // Keep refs in sync so animation loop always has latest values
  useEffect(() => { activeSectionRef.current = activeSection; }, [activeSection]);
  useEffect(() => { hoveredPinRef.current = hoveredPin; }, [hoveredPin]);

  const updateLabels = useCallback(() => {
    if (!sceneRef.current || !containerRef.current) return;
    const { camera, globe, pins, renderer } = sceneRef.current;
    const rect = renderer.domElement.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const newPositions = new Map<SectionId, { x: number; y: number; visible: boolean }>();

    pins.forEach((mesh, id) => {
      const worldPos = new THREE.Vector3();
      mesh.getWorldPosition(worldPos);

      const projected = worldPos.clone().project(camera);
      const x = ((projected.x + 1) / 2) * rect.width;
      const y = ((-projected.y + 1) / 2) * rect.height;

      const globeCenter = new THREE.Vector3();
      globe.getWorldPosition(globeCenter);
      const pinDist = worldPos.distanceTo(camera.position);
      const centerDist = globeCenter.distanceTo(camera.position);
      const isVisible =
        projected.z < 1 &&
        projected.z > -1 &&
        pinDist < centerDist + 1.05;

      newPositions.set(id, { x, y, visible: isVisible });
    });

    setLabelPositions(new Map(newPositions));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;

    // Renderer — opaque bg so the gradient div shows around the globe edges
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.z = 3.6;

    // Lighting — strong sun so the Blue Marble texture reads clearly
    const ambient = new THREE.AmbientLight(0x4466aa, 4);
    scene.add(ambient);
    // Primary sun — warm, from upper-right front
    const sunLight = new THREE.DirectionalLight(0xfff8f0, 3.5);
    sunLight.position.set(5, 3, 4);
    scene.add(sunLight);
    // Rim light — defines the dark-side silhouette against the bg
    const rimLight = new THREE.DirectionalLight(0x4dffc3, 0.6);
    rimLight.position.set(-5, -1, -3);
    scene.add(rimLight);
    // Soft fill from below
    const fillLight = new THREE.DirectionalLight(0x334466, 1.2);
    fillLight.position.set(0, -5, 2);
    scene.add(fillLight);

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const starCount = 3000;
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 80 + Math.random() * 40;
      starPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);
      starSizes[i] = Math.random();
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xe8edf5,
      size: 0.15,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.75,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // Globe group
    const globe = new THREE.Group();
    scene.add(globe);

    // Earth sphere — load real texture maps
    const loader = new THREE.TextureLoader();
    const sphereGeo = new THREE.SphereGeometry(1, 64, 64);

    // Fallback material shown while textures load
    const earthMat = new THREE.MeshPhongMaterial({
      color: 0x0a2040,
      emissive: 0x040e1e,
      shininess: 25,
      specular: 0x224466,
    });
    const earthMesh = new THREE.Mesh(sphereGeo, earthMat);
    globe.add(earthMesh);

    // Load day texture (Blue Marble)
    loader.load(
      "https://unpkg.com/three-globe@2.31.2/example/img/earth-blue-marble.jpg",
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        earthMat.map = tex;
        earthMat.needsUpdate = true;
      }
    );

    // Load bump map for terrain relief
    loader.load(
      "https://unpkg.com/three-globe@2.31.2/example/img/earth-topology.png",
      (tex) => {
        earthMat.bumpMap = tex;
        earthMat.bumpScale = 0.018;
        earthMat.needsUpdate = true;
      }
    );

    // Load specular map (oceans shine, land is matte)
    loader.load(
      "https://unpkg.com/three-globe@2.31.2/example/img/earth-water.png",
      (tex) => {
        earthMat.specularMap = tex;
        earthMat.specular = new THREE.Color(0x5599bb);
        earthMat.shininess = 35;
        earthMat.needsUpdate = true;
      }
    );

    // Thin cloud layer
    const cloudGeo = new THREE.SphereGeometry(1.012, 64, 64);
    const cloudMat = new THREE.MeshPhongMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    globe.add(cloudMesh);

    loader.load(
      "https://unpkg.com/three-globe@2.31.2/example/img/earth-clouds.png",
      (tex) => {
        cloudMat.alphaMap = tex;
        cloudMat.color.set(0xffffff);
        cloudMat.opacity = 0.28;
        cloudMat.needsUpdate = true;
      }
    );

    // Inner atmosphere — sky-blue limb glow
    const atmGeo = new THREE.SphereGeometry(1.055, 64, 64);
    const atmMat = new THREE.MeshBasicMaterial({
      color: 0x60c8ff,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    globe.add(new THREE.Mesh(atmGeo, atmMat));

    // Outer halo — wider, softer, defines the globe silhouette
    const haloGeo = new THREE.SphereGeometry(1.18, 64, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x2255aa,
      transparent: true,
      opacity: 0.07,
      side: THREE.BackSide,
    });
    globe.add(new THREE.Mesh(haloGeo, haloMat));

    // Pins
    const pinMeshes = new Map<SectionId, THREE.Mesh>();

    PINS.forEach((pin) => {
      const pos = latLonToVec3(pin.lat, pin.lon, 1.0);

      // Pin dot
      const dotGeo = new THREE.SphereGeometry(0.026, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0x4dffc3 });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos);
      dot.userData.pinId = pin.id;
      globe.add(dot);
      pinMeshes.set(pin.id, dot);

      // Spike
      const spikeGeo = new THREE.CylinderGeometry(0.003, 0.001, 0.07, 8);
      const spikeMat = new THREE.MeshBasicMaterial({
        color: 0x4dffc3,
        transparent: true,
        opacity: 0.65,
      });
      const spike = new THREE.Mesh(spikeGeo, spikeMat);
      spike.position.copy(pos.clone().multiplyScalar(1.038));
      spike.lookAt(new THREE.Vector3(0, 0, 0));
      spike.rotateX(Math.PI / 2);
      globe.add(spike);

      // Pulse ring
      const ringGeo = new THREE.RingGeometry(0.038, 0.052, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x4dffc3,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos.clone().multiplyScalar(1.012));
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      ring.userData.isPulseRing = true;
      ring.userData.phase = Math.random() * Math.PI * 2;
      globe.add(ring);
    });

    sceneRef.current = { renderer, scene, camera, globe, pins: pinMeshes, animId: 0 };

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getPinAtPointer = (clientX: number, clientY: number): SectionId | null => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(Array.from(pinMeshes.values()));
      return hits.length > 0 ? (hits[0].object.userData.pinId as SectionId) : null;
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      lastPointer.current = { x: e.clientX, y: e.clientY };
      pointerDownPos.current = { x: e.clientX, y: e.clientY };
      velocity.current = { x: 0, y: 0 };
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) {
        const hovered = getPinAtPointer(e.clientX, e.clientY);
        setHoveredPin(hovered);
        canvas.style.cursor = hovered ? "pointer" : "grab";
        return;
      }
      canvas.style.cursor = "grabbing";
      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      velocity.current = { x: dx * 0.004, y: dy * 0.004 };
      globe.rotation.y += dx * 0.004;
      globe.rotation.x += dy * 0.004;
      globe.rotation.x = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, globe.rotation.x));
      lastPointer.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging.current = false;
      canvas.style.cursor = "grab";
      const dx = Math.abs(e.clientX - pointerDownPos.current.x);
      const dy = Math.abs(e.clientY - pointerDownPos.current.y);
      if (dx < 6 && dy < 6) {
        const pinId = getPinAtPointer(e.clientX, e.clientY);
        if (pinId) onSectionClick(pinId);
      }
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.style.cursor = "grab";

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    let t = 0;
    const animate = () => {
      sceneRef.current!.animId = requestAnimationFrame(animate);
      t += 0.016;

      if (!isDragging.current) {
        globe.rotation.y += 0.0012;
        velocity.current.x *= 0.94;
        velocity.current.y *= 0.94;
      }

      // Clouds rotate slightly faster than globe for parallax
      cloudMesh.rotation.y += 0.00018;

      // Pulse rings
      globe.children.forEach((child) => {
        if (child.userData.isPulseRing) {
          const phase = child.userData.phase;
          const scale = 1 + 1.3 * ((Math.sin(t * 1.4 + phase) + 1) / 2);
          child.scale.setScalar(scale);
          const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
          mat.opacity = 0.45 * (1 - (scale - 1) / 1.3);
        }
      });

      const active = activeSectionRef.current;
      const hovered = hoveredPinRef.current;

      pinMeshes.forEach((mesh, id) => {
        const mat = mesh.material as THREE.MeshBasicMaterial;
        if (id === active) {
          mat.color.setHex(0xff6b4a);
        } else if (id === hovered) {
          mat.color.setHex(0xffffff);
        } else {
          mat.color.setHex(0x4dffc3);
        }
        const targetScale = id === hovered || id === active ? 1.7 : 1.0;
        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
      });

      updateLabels();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(sceneRef.current?.animId ?? 0);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, [onSectionClick, updateLabels]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Radial gradient so the globe edge reads against the bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, #0d1f3c 0%, #07101e 45%, #050810 100%)",
        }}
      />
      <canvas ref={canvasRef} className="relative w-full h-full" />

      {/* HTML pin labels */}
      {PINS.map((pin) => {
        const pos = labelPositions.get(pin.id);
        if (!pos || !pos.visible || !isFinite(pos.x) || !isFinite(pos.y)) return null;
        const isActive = activeSection === pin.id;
        const isHovered = hoveredPin === pin.id;

        return (
          <div
            key={pin.id}
            className="absolute pointer-events-none select-none"
            style={{
              left: pos.x,
              top: pos.y,
              transform: "translate(-50%, -185%)",
            }}
          >
            <div
              className="flex flex-col items-center gap-1"
              style={{
                transform: isHovered || isActive ? "scale(1.12)" : "scale(1)",
                transition: "transform 0.2s ease",
              }}
            >
              <div
                className="px-2.5 py-1 rounded-full text-xs font-medium tracking-wide whitespace-nowrap border"
                style={{
                  background: isActive ? "rgba(255,107,74,0.15)" : "rgba(5,8,16,0.8)",
                  borderColor: isActive
                    ? "#ff6b4a"
                    : isHovered
                    ? "rgba(77,255,195,0.6)"
                    : "rgba(77,255,195,0.3)",
                  color: isActive ? "#ff6b4a" : "#4dffc3",
                  backdropFilter: "blur(8px)",
                  boxShadow: isActive
                    ? "0 0 14px rgba(255,107,74,0.35)"
                    : isHovered
                    ? "0 0 12px rgba(77,255,195,0.25)"
                    : "none",
                  transition: "all 0.2s ease",
                }}
              >
                {pin.label}
              </div>
              <div
                className="w-px h-4"
                style={{
                  background: isActive
                    ? "linear-gradient(to bottom, #ff6b4a, transparent)"
                    : "linear-gradient(to bottom, rgba(77,255,195,0.55), transparent)",
                }}
              />
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <p
          className="text-xs tracking-widest uppercase"
          style={{ color: "rgba(122,138,170,0.55)" }}
        >
          Drag to explore · Click a pin to navigate
        </p>
      </div>
    </div>
  );
}
