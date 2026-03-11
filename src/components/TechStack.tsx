import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import "./styles/TechStack.css";

// ── Tool definitions ──────────────────────────────────────────────────────────
const techStack = [
  { label: "AWS",            bg: "#ff9900", fg: "#0d0d0d" },
  { label: "GCP",            bg: "#4285f4", fg: "#ffffff" },
  { label: "Azure",          bg: "#0078d4", fg: "#ffffff" },
  { label: "Kubernetes",     bg: "#326ce5", fg: "#ffffff" },
  { label: "Terraform",      bg: "#7b42bc", fg: "#ffffff" },
  { label: "Docker",         bg: "#2496ed", fg: "#ffffff" },
  { label: "Helm",           bg: "#0f1689", fg: "#ffffff" },
  { label: "ArgoCD",         bg: "#ef7b4d", fg: "#ffffff" },
  { label: "GitHub\nActions",bg: "#24292e", fg: "#ffffff" },
  { label: "Azure\nDevOps",  bg: "#0078d4", fg: "#ffffff" },
  { label: "Jenkins",        bg: "#d24939", fg: "#ffffff" },
  { label: "Ansible",        bg: "#ee0000", fg: "#ffffff" },
  { label: "Python",         bg: "#3776ab", fg: "#ffffff" },
  { label: "Go",             bg: "#00add8", fg: "#ffffff" },
  { label: "Bash",           bg: "#4eaa25", fg: "#ffffff" },
  { label: "Prometheus",     bg: "#e6522c", fg: "#ffffff" },
  { label: "Grafana",        bg: "#f46800", fg: "#ffffff" },
  { label: "ELK",            bg: "#005571", fg: "#ffffff" },
  { label: "Linux",          bg: "#555555", fg: "#ffffff" },
  { label: "SonarQube",      bg: "#4e9bcd", fg: "#ffffff" },
];

// ── Canvas texture for each ball ──────────────────────────────────────────────
function makeTexture(label: string, bg: string, fg: string): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, size, size);

  const grad = ctx.createRadialGradient(size * 0.38, size * 0.32, 0, size / 2, size / 2, size * 0.7);
  grad.addColorStop(0, "rgba(255,255,255,0.22)");
  grad.addColorStop(1, "rgba(0,0,0,0.15)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = fg;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const lines = label.split("\n");
  const rawLen = label.replace("\n", "").length;
  let fontSize = rawLen <= 3 ? 110 : rawLen <= 5 ? 88 : rawLen <= 8 ? 72 : rawLen <= 11 ? 58 : 48;
  if (lines.length > 1) fontSize = Math.min(fontSize, 64);
  ctx.font = `900 ${fontSize}px Arial, sans-serif`;

  const lineH = fontSize * 1.2;
  const startY = size / 2 - ((lines.length - 1) * lineH) / 2;
  lines.forEach((line, i) => ctx.fillText(line, size / 2, startY + i * lineH, size - 40));

  return new THREE.CanvasTexture(canvas);
}

const textures = techStack.map(({ label, bg, fg }) => makeTexture(label, bg, fg));
const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);
const spheres = techStack.map((_, i) => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)] as number,
  textureIndex: i,
}));

// ── Single sphere ─────────────────────────────────────────────────────────────
type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);
  const elapsed = useRef(0);

  useFrame((_state, delta) => {
    if (!isActive) return;
    elapsed.current += delta;
    if (elapsed.current < 1 / 30) return;
    elapsed.current = 0;
    delta = Math.min(0.1, delta);
    api.current?.applyImpulse(
      vec.copy(api.current!.translation()).normalize().multiply(
        new THREE.Vector3(-50 * delta * scale, -150 * delta * scale, -50 * delta * scale)
      ),
      true
    );
  });

  return (
    <RigidBody linearDamping={0.75} angularDamping={0.15} friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]} ref={api} colliders={false}>
      <BallCollider args={[scale]} />
      <CylinderCollider rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]} />
      <mesh castShadow receiveShadow scale={scale} geometry={sphereGeometry}
        material={material} rotation={[0.3, 1, 1]} />
    </RigidBody>
  );
}

// ── Mouse collider ────────────────────────────────────────────────────────────
function Pointer({ vec = new THREE.Vector3(), isActive }: { vec?: THREE.Vector3; isActive: boolean }) {
  const ref = useRef<RapierRigidBody>(null);
  const elapsed = useRef(0);
  useFrame(({ pointer, viewport }, delta) => {
    if (!isActive) return;
    elapsed.current += delta;
    if (elapsed.current < 1 / 30) return;
    elapsed.current = 0;
    ref.current?.setNextKinematicTranslation(
      vec.lerp(new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ), 0.2)
    );
  });
  return (
    <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document.getElementById("work")!.getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(handleScroll, 10);
        setTimeout(() => clearInterval(interval), 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const materials = useMemo(
    () => textures.map((texture) =>
      new THREE.MeshPhysicalMaterial({
        map: texture, emissive: "#ffffff", emissiveMap: texture,
        emissiveIntensity: 0.3, metalness: 0.5, roughness: 1, clearcoat: 0.1,
      })
    ),
    []
  );

  return (
    <div className="techstack" id="techstack">
      <div className="ts-inner section-container">

        {/* ── Section heading ── */}
        <h2 className="ts-heading">My <span>Tech Stack</span></h2>

        {/* ── Tool badge grid + floating balls ── */}
        <div className="ts-stage">

          {/* Cards: behind the canvas, visible through alpha gaps */}
          <div className="ts-cards" aria-hidden="true">
            {techStack.map(({ label, bg }) => (
              <div className="ts-card" key={label}>
                <span className="ts-card-dot" style={{ background: bg }} />
                <span className="ts-card-name">{label.replace("\n", " ")}</span>
              </div>
            ))}
          </div>

          {/* 3D physics canvas — alpha:true so cards show through */}
          <Canvas
            shadows
            gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
            camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
            onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
            className="tech-canvas"
          >
            <ambientLight intensity={1} />
            <spotLight position={[20, 20, 25]} penumbra={1} angle={0.2}
              color="white" castShadow shadow-mapSize={[512, 512]} />
            <directionalLight position={[0, 5, -4]} intensity={2} />
            <Physics gravity={[0, 0, 0]}>
              <Pointer isActive={isActive} />
              {spheres.slice(0, 15).map((s, i) => (
                <SphereGeo key={i} scale={s.scale}
                  material={materials[s.textureIndex]} isActive={isActive} />
              ))}
            </Physics>
            <Environment files="/models/char_enviorment.hdr"
              environmentIntensity={0.5} environmentRotation={[0, 4, 2]} />
            <EffectComposer enableNormalPass={false}>
              <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
            </EffectComposer>
          </Canvas>
        </div>

      </div>
    </div>
  );
};

export default TechStack;
