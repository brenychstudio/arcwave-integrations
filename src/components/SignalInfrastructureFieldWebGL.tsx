import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type FieldProfile = "full" | "mobile";

type ServiceNode = {
  key: string;
  label: string;
  system: string;
  outcome: string;
  color: string;
  position: [number, number, number];
  labelClass: string;
};

const serviceNodesEn: ServiceNode[] = [
  {
    key: "telecom",
    label: "Telecom",
    system: "Signal entry",
    outcome: "Provider handoff and long-distance lines",
    color: "#8ccfff",
    position: [-3.95, 0.9, 0.12],
    labelClass: "telecom",
  },
  {
    key: "networks",
    label: "Networks",
    system: "Connectivity layer",
    outcome: "Wi-Fi, topology and access points",
    color: "#3f9cff",
    position: [-1.15, -1.28, 0.26],
    labelClass: "networks",
  },
  {
    key: "electricity",
    label: "Electricity",
    system: "Power control",
    outcome: "Panels, circuits and smart-ready wiring",
    color: "#d8ad55",
    position: [1.42, 1.18, 0.04],
    labelClass: "electricity",
  },
  {
    key: "ev",
    label: "EV Charging",
    system: "Energy delivery",
    outcome: "Charging points and safe routing",
    color: "#7bcfc5",
    position: [3.92, -0.28, 0.18],
    labelClass: "ev",
  },
  {
    key: "security",
    label: "Security",
    system: "Protected perimeter",
    outcome: "Alarms, CCTV, zones and monitoring-ready setup",
    color: "#8ea6da",
    position: [2.22, -1.7, 0.3],
    labelClass: "security",
  },
  {
    key: "audio",
    label: "Audio",
    system: "Sound field",
    outcome: "Home cinema, multiroom and venue audio",
    color: "#a897d0",
    position: [-3.08, -0.76, 0.02],
    labelClass: "audio",
  },
  {
    key: "quote",
    label: "Quote",
    system: "Technical request",
    outcome: "The system path becomes a clear quote for the space",
    color: "#318ee8",
    position: [4.35, -1.42, 0.36],
    labelClass: "quote",
  },
];

const serviceNodesEs: ServiceNode[] = [
  {
    ...serviceNodesEn[0],
    label: "Telecom",
    system: "Entrada de señal",
    outcome: "Handoff de operador y líneas principales",
  },
  {
    ...serviceNodesEn[1],
    label: "Redes",
    system: "Capa de conectividad",
    outcome: "Wi-Fi, topología y puntos de acceso",
  },
  {
    ...serviceNodesEn[2],
    label: "Electricidad",
    system: "Control de energía",
    outcome: "Cuadros, circuitos y cableado smart-ready",
  },
  {
    ...serviceNodesEn[3],
    label: "Carga VE",
    system: "Entrega de energía",
    outcome: "Puntos de carga y recorrido seguro",
  },
  {
    ...serviceNodesEn[4],
    label: "Seguridad",
    system: "Perímetro protegido",
    outcome: "Alarmas, CCTV, zonas y monitorización",
  },
  {
    ...serviceNodesEn[5],
    label: "Audio",
    system: "Campo sonoro",
    outcome: "Cine en casa, multiroom y audio para locales",
  },
  {
    ...serviceNodesEn[6],
    label: "Presupuesto",
    system: "Solicitud técnica",
    outcome: "La ruta del sistema se convierte en un presupuesto claro",
  },
];

const focusOrder = ["telecom", "networks", "electricity", "security", "quote"];
const commercialRoute = ["telecom", "networks", "electricity", "security", "quote"];

const connections = [
  [0, 1],
  [0, 2],
  [0, 5],
  [1, 2],
  [1, 4],
  [1, 5],
  [2, 3],
  [2, 4],
  [3, 4],
  [4, 5],
  [1, 6],
  [2, 6],
  [4, 6],
];

function routeKey(from: string, to: string) {
  return [from, to].sort().join(":");
}

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec3 uAccent;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = mat2(1.62, -1.18, 1.18, 1.62) * p;
      a *= 0.5;
    }
    return v;
  }

  float lineGrid(vec2 p, float scale, float width) {
    vec2 g = abs(fract(p * scale - 0.5) - 0.5) / fwidth(p * scale);
    float axis = min(g.x, g.y);
    return 1.0 - smoothstep(width, width + 1.0, axis);
  }

  float ring(vec2 p, vec2 center, float radius, float width) {
    float d = length(p - center);
    return 1.0 - smoothstep(width, width + 0.006, abs(d - radius));
  }

  float beam(vec2 p, float y, float slope, float width) {
    float d = abs(p.y - (y + p.x * slope));
    return 1.0 - smoothstep(width, width + 0.01, d);
  }

  float sweep(vec2 p, float offset, float slope, float width) {
    float d = abs(p.x * 0.82 + p.y * slope + offset);
    return 1.0 - smoothstep(width, width + 0.045, d);
  }

  float contour(vec2 p, vec2 center, float bend, float width) {
    vec2 q = p - center;
    float field = q.x * q.x * 0.78 + q.y * q.y * 1.42 + sin((q.x + q.y) * 3.2 + uTime * 0.07) * bend;
    float c = abs(fract(field * 2.1) - 0.5);
    return 1.0 - smoothstep(width, width + 0.018, c);
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(2.05, 1.0);

    float vignette = smoothstep(1.18, 0.2, length(p * vec2(0.72, 1.02)));
    float fineGrid = lineGrid(p + vec2(uTime * 0.0012, -uTime * 0.0008), 54.0, 0.24);
    float microGrid = lineGrid(p + vec2(0.08, -0.03), 92.0, 0.16);
    float macroGrid = lineGrid(p, 11.0, 0.22);

    float r1 = ring(p, vec2(0.18, -0.16), 0.46 + sin(uTime * 0.26) * 0.02, 0.009);
    float r2 = ring(p, vec2(0.66, 0.22), 0.38 + sin(uTime * 0.2 + 1.0) * 0.018, 0.008);
    float r3 = ring(p, vec2(-0.44, -0.28), 0.55 + sin(uTime * 0.16 + 2.0) * 0.022, 0.007);

    float b1 = beam(p, -0.05 + sin(uTime * 0.15) * 0.025, 0.08, 0.006);
    float b2 = beam(p, 0.19 + cos(uTime * 0.12) * 0.022, -0.06, 0.005);
    float b3 = beam(p, -0.27, -0.11, 0.004);
    float s1 = sweep(p, sin(uTime * 0.16) * 0.62 - 0.14, 0.46, 0.008);
    float s2 = sweep(p, cos(uTime * 0.12) * 0.72 + 0.24, -0.32, 0.006);
    float c1 = contour(p, vec2(0.38, 0.02), 0.035, 0.018);
    float c2 = contour(p, vec2(-0.28, -0.26), 0.025, 0.022);
    float terrain = fbm(p * 2.2 + vec2(uTime * 0.018, -uTime * 0.012));

    vec3 blue = vec3(0.12, 0.48, 0.82);
    vec3 cyan = vec3(0.35, 0.72, 0.72);
    vec3 amber = vec3(0.82, 0.62, 0.28);
    vec3 graphite = vec3(0.34, 0.43, 0.52);

    float glowA = smoothstep(0.82, 0.0, length(p - vec2(0.36, 0.18)));
    float glowB = smoothstep(0.72, 0.0, length(p - vec2(-0.22, -0.36)));

    vec3 color = vec3(0.64, 0.78, 0.9) * fineGrid * 0.085;
    color += vec3(0.40, 0.50, 0.60) * microGrid * 0.018;
    color += graphite * macroGrid * 0.034;
    color += blue * (r1 * 0.13 + b1 * 0.18 + b2 * 0.11 + s1 * 0.13 + c1 * 0.055);
    color += cyan * (r2 * 0.082 + c2 * 0.036);
    color += amber * (r3 * 0.05 + b3 * 0.044 + s2 * 0.032);
    color += uAccent * (glowA * 0.13 + s1 * 0.12) + amber * glowB * 0.028;
    color += vec3(0.14, 0.22, 0.30) * terrain * 0.008;

    float alpha = (fineGrid * 0.05 + microGrid * 0.01 + macroGrid * 0.024 + r1 * 0.082 + r2 * 0.05 + r3 * 0.032 + b1 * 0.118 + b2 * 0.078 + b3 * 0.036 + s1 * 0.108 + s2 * 0.042 + c1 * 0.048 + c2 * 0.034 + glowA * 0.135 + glowB * 0.036 + terrain * 0.008) * vignette;
    gl_FragColor = vec4(color, alpha);
  }
`;

const particleVertexShader = `
  attribute float size;
  attribute float alpha;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = color;
    vAlpha = alpha;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (260.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = `
  precision highp float;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 p = gl_PointCoord - 0.5;
    float d = length(p);
    float core = 1.0 - smoothstep(0.08, 0.22, d);
    float glow = 1.0 - smoothstep(0.12, 0.5, d);
    float alpha = (core * 0.72 + glow * 0.28) * vAlpha;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

const pathVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const pathFragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform float uOffset;
  uniform float uOpacity;
  uniform vec3 uColor;
  varying vec2 vUv;

  void main() {
    float head = fract(uTime * 0.28 + uOffset);
    float d = abs(vUv.x - head);
    d = min(d, 1.0 - d);

    float scan = smoothstep(0.16, 0.0, d);
    float core = smoothstep(0.038, 0.0, d);
    float filament = smoothstep(0.008, 0.0, abs(vUv.y - 0.52));
    float edgeFade = smoothstep(0.0, 0.035, vUv.x) * (1.0 - smoothstep(0.965, 1.0, vUv.x));

    vec3 whiteHot = vec3(0.78, 0.94, 1.0);
    vec3 color = mix(uColor, whiteHot, core * 0.52 + filament * 0.18);
    float alpha = (0.32 + scan * 0.52 + core * 0.42 + filament * 0.18) * uOpacity * edgeFade;

    if (alpha < 0.01) discard;
    gl_FragColor = vec4(color, alpha);
  }
`;

function createCurve(from: [number, number, number], to: [number, number, number], lift: number) {
  const a = new THREE.Vector3(...from);
  const b = new THREE.Vector3(...to);
  const midA = a.clone().lerp(b, 0.34);
  const midB = a.clone().lerp(b, 0.68);
  midA.y += lift;
  midB.y -= lift * 0.42;
  midA.z += 0.34;
  midB.z += 0.24;
  return new THREE.CatmullRomCurve3([a, midA, midB, b]);
}

function TubePath({
  from,
  to,
  color,
  opacity,
  lift,
  active,
  routeActive = false,
  offset = 0,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  opacity: number;
  lift: number;
  active: boolean;
  routeActive?: boolean;
  offset?: number;
}) {
  const curve = useMemo(() => createCurve(from, to, lift), [from, to, lift]);
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOffset: { value: offset },
      uOpacity: { value: opacity },
      uColor: { value: new THREE.Color(color) },
    }),
    [color, offset, opacity]
  );
  const core = useMemo(
    () => new THREE.TubeGeometry(curve, 220, routeActive ? 0.0068 : active ? 0.0044 : 0.0019, 10, false),
    [curve, active, routeActive]
  );
  const hairline = useMemo(
    () => new THREE.TubeGeometry(curve, 220, routeActive ? 0.002 : active ? 0.0015 : 0.0008, 8, false),
    [curve, active, routeActive]
  );
  const aura = useMemo(
    () => new THREE.TubeGeometry(curve, 220, routeActive ? 0.034 : active ? 0.016 : 0.0048, 10, false),
    [curve, active, routeActive]
  );

  useFrame(({ clock }) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = clock.elapsedTime;
    material.current.uniforms.uOpacity.value = opacity;
    material.current.uniforms.uColor.value.lerp(new THREE.Color(color), 0.08);
  });

  return (
    <group>
      <mesh geometry={aura}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity * (routeActive ? 0.2 : 0.14)}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={core}>
        {routeActive ? (
          <shaderMaterial
            ref={material}
            uniforms={uniforms}
            vertexShader={pathVertexShader}
            fragmentShader={pathFragmentShader}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        ) : (
          <meshBasicMaterial
            color={color}
            transparent
            opacity={opacity}
            blending={active ? THREE.AdditiveBlending : THREE.NormalBlending}
            depthWrite={false}
          />
        )}
      </mesh>
      {active ? (
        <mesh geometry={hairline}>
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={Math.min(routeActive ? 0.46 : 0.28, opacity * (routeActive ? 0.68 : 0.32))}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ) : null}
    </group>
  );
}

function FieldShader({ activeNode }: { activeNode: ServiceNode }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAccent: { value: new THREE.Color(activeNode.color) },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = clock.elapsedTime;
    material.current.uniforms.uAccent.value.lerp(new THREE.Color(activeNode.color), 0.045);
  });

  return (
    <mesh position={[0.45, -0.06, -0.82]}>
      <planeGeometry args={[10.8, 5.8, 1, 1]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function seeded(index: number) {
  return (Math.sin(index * 999.13) * 43758.5453) % 1;
}

function FieldParticles({ profile = "full" }: { profile?: FieldProfile }) {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const sizes: number[] = [];
    const alphas: number[] = [];
    const colorA = new THREE.Color("#8bb8d6");
    const colorB = new THREE.Color("#d9b56a");
    const colorC = new THREE.Color("#9da6be");
    const colorD = new THREE.Color("#5fc7c2");

    const count = profile === "mobile" ? 155 : 360;
    const sizeScale = profile === "mobile" ? 0.78 : 1;
    const alphaScale = profile === "mobile" ? 0.72 : 1;

    for (let i = 0; i < count; i += 1) {
      const r1 = seeded(i + 1);
      const r2 = seeded(i + 7);
      const r3 = seeded(i + 17);
      const x = (r1 - 0.5) * 11.2;
      const y = (r2 - 0.5) * 5.55;
      const z = -0.92 + r3 * 1.15;
      positions.push(x, y, z);

      const color = i % 19 === 0 ? colorB : i % 13 === 0 ? colorD : i % 7 === 0 ? colorC : colorA;
      colors.push(color.r, color.g, color.b);
      sizes.push((i % 31 === 0 ? 6.6 : i % 11 === 0 ? 4.2 : 2.15) * sizeScale);
      alphas.push((i % 31 === 0 ? 0.3 : i % 11 === 0 ? 0.17 : 0.075) * alphaScale);
    }

    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    buffer.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    buffer.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));
    buffer.setAttribute("alpha", new THREE.Float32BufferAttribute(alphas, 1));
    return buffer;
  }, [profile]);

  useFrame(({ clock }) => {
    if (!points.current) return;
    points.current.rotation.z = Math.sin(clock.elapsedTime * 0.05) * 0.018;
    points.current.position.y = Math.sin(clock.elapsedTime * 0.16) * 0.028;
  });

  return (
    <points ref={points} geometry={geometry}>
      <shaderMaterial
        vertexColors
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function WaveRing({ node, active, delay }: { node: ServiceNode; active: boolean; delay: number }) {
  const ring = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (!ring.current || !material.current) return;

    const t = (clock.elapsedTime * (active ? 0.13 : 0.07) + delay) % 1;
    const scale = 0.72 + t * (active ? 2.35 : 1.55);
    ring.current.scale.set(scale, scale * 0.14, scale);
    material.current.opacity = (1 - t) * (active ? 0.055 : 0.017);
  });

  return (
    <mesh ref={ring} position={node.position} rotation={[Math.PI / 2.22, 0.08, -0.28]}>
      <torusGeometry args={[0.13, active ? 0.0022 : 0.0016, 8, 144]} />
      <meshBasicMaterial
        ref={material}
        color={node.color}
        transparent
        opacity={0.1}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function SignalPulse({
  from,
  to,
  delay,
  color,
  lift,
  active = false,
  routeActive = false,
}: {
  from: [number, number, number];
  to: [number, number, number];
  delay: number;
  color: string;
  lift: number;
  active?: boolean;
  routeActive?: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const curve = useMemo(() => createCurve(from, to, lift), [from, to, lift]);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const speed = routeActive ? 0.42 : active ? 0.22 : 0.1;
    const t = (clock.elapsedTime * speed + delay) % 1;
    ref.current.position.copy(curve.getPointAt(t));
    const scale = (routeActive ? 0.64 : active ? 0.4 : 0.24) + Math.sin(t * Math.PI) * (routeActive ? 0.5 : 0.24);
    ref.current.scale.setScalar(scale);
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[routeActive ? 0.028 : active ? 0.016 : 0.01, 18, 18]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={routeActive ? 1 : active ? 0.58 : 0.18}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[routeActive ? 0.092 : active ? 0.046 : 0.024, 18, 18]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={routeActive ? 0.2 : active ? 0.08 : 0.02}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function NodeBeacon({ node, active, index }: { node: ServiceNode; active: boolean; index: number }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const pulse = 1 + Math.sin(clock.elapsedTime * 0.8 + index) * 0.02;
    group.current.scale.setScalar(active ? pulse * 1.06 : pulse);
  });

  return (
    <group ref={group} position={node.position}>
      <WaveRing node={node} active={active} delay={index * 0.12} />
      <mesh>
        <sphereGeometry args={[active ? 0.048 : 0.024, 32, 32]} />
        <meshBasicMaterial color={node.color} transparent opacity={active ? 0.94 : 0.36} />
      </mesh>
      <mesh>
        <sphereGeometry args={[active ? 0.15 : 0.065, 32, 32]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={active ? 0.075 : 0.016}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh position={[0, 0, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[active ? 0.15 : 0.06, active ? 0.166 : 0.069, 96]} />
        <meshBasicMaterial color={node.color} transparent opacity={active ? 0.26 : 0.035} depthWrite={false} />
      </mesh>
    </group>
  );
}

function StructuralBand({
  from,
  to,
  lift,
  color,
  opacity,
  radius,
}: {
  from: [number, number, number];
  to: [number, number, number];
  lift: number;
  color: string;
  opacity: number;
  radius: number;
}) {
  const curve = useMemo(() => createCurve(from, to, lift), [from, to, lift]);
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 192, radius, 12, false), [curve, radius]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
}

function SignalScene({
  activeKey,
  serviceNodes,
  profile = "full",
}: {
  activeKey: string;
  serviceNodes: ServiceNode[];
  profile?: FieldProfile;
}) {
  const group = useRef<THREE.Group>(null);
  const isMobile = profile === "mobile";
  const activeIndex = Math.max(0, serviceNodes.findIndex((node) => node.key === activeKey));
  const activeNode = serviceNodes[activeIndex];
  const visibleConnections = useMemo(
    () => (isMobile ? connections.filter((_, index) => [0, 1, 3, 5, 7, 9, 11].includes(index)) : connections),
    [isMobile]
  );
  const activeRoute = useMemo(() => {
    const activeRouteIndex = Math.max(0, commercialRoute.indexOf(activeKey));
    const visibleRoute = commercialRoute.slice(0, activeRouteIndex + 1);
    const routeEdges = new Set<string>();

    for (let index = 0; index < visibleRoute.length - 1; index += 1) {
      routeEdges.add(routeKey(visibleRoute[index], visibleRoute[index + 1]));
    }

    return routeEdges;
  }, [activeKey]);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;

    group.current.rotation.y = isMobile ? 0 : pointer.x * 0.035;
    group.current.rotation.x = -0.075 + (isMobile ? 0 : pointer.y * 0.02);
    group.current.position.y = Math.sin(clock.elapsedTime * (isMobile ? 0.18 : 0.28)) * (isMobile ? 0.012 : 0.02);
  });

  return (
    <group ref={group}>
      <FieldShader activeNode={activeNode} />
      <FieldParticles profile={profile} />

      <StructuralBand from={[-5.15, 1.16, -0.46]} to={[5.28, -0.46, -0.46]} color="#446276" opacity={isMobile ? 0.02 : 0.032} lift={0.86} radius={isMobile ? 0.018 : 0.028} />
      <StructuralBand from={[-5.22, 0.1, -0.5]} to={[5.18, 0.18, -0.5]} color="#587f96" opacity={isMobile ? 0.018 : 0.026} lift={-0.45} radius={isMobile ? 0.014 : 0.022} />
      {!isMobile ? (
        <StructuralBand from={[-4.96, -1.22, -0.48]} to={[5.14, -1.32, -0.48]} color="#8c785d" opacity={0.018} lift={0.52} radius={0.018} />
      ) : null}

      <TubePath from={[-5.1, 1.2, -0.28]} to={[5.25, -0.5, -0.28]} color="#8fbdd8" opacity={isMobile ? 0.036 : 0.052} lift={0.78} active />
      <TubePath from={[-5.2, 0.16, -0.36]} to={[5.1, 0.18, -0.36]} color="#6faed6" opacity={isMobile ? 0.03 : 0.044} lift={-0.42} active />
      {!isMobile ? (
        <TubePath from={[-4.9, -1.18, -0.3]} to={[5.1, -1.32, -0.3]} color="#c5a35e" opacity={0.026} lift={0.52} active={false} />
      ) : null}

      {visibleConnections.map(([fromIndex, toIndex], index) => {
        const from = serviceNodes[fromIndex];
        const to = serviceNodes[toIndex];
        const routeActive = activeRoute.has(routeKey(from.key, to.key));
        const directlyActive = from.key === activeKey || to.key === activeKey;
        const active = routeActive || directlyActive;
        const lift = Math.sin(index * 1.7) * 0.62;

        return (
          <TubePath
            key={`${from.key}-${to.key}`}
            from={from.position}
            to={to.position}
            color={routeActive ? activeNode.color : active ? "#5fb7ef" : "#7da8bf"}
            opacity={(routeActive ? 0.72 : active ? 0.22 : 0.052) * (isMobile ? 0.78 : 1)}
            lift={lift}
            active={active}
            routeActive={routeActive}
            offset={index * 0.071}
          />
        );
      })}

      {visibleConnections.map(([fromIndex, toIndex], index) => {
        const from = serviceNodes[fromIndex];
        const to = serviceNodes[toIndex];
        const routeActive = activeRoute.has(routeKey(from.key, to.key));
        const active = routeActive || from.key === activeKey || to.key === activeKey;

        return (
          <React.Fragment key={`pulse-${from.key}-${to.key}`}>
            <SignalPulse
              from={from.position}
              to={to.position}
              delay={index * 0.087}
              color={routeActive ? activeNode.color : active ? "#88c8ea" : "#b7dcff"}
              lift={Math.sin(index * 1.7) * 0.62}
              active={active}
              routeActive={routeActive}
            />
            {routeActive ? (
              <SignalPulse
                from={from.position}
                to={to.position}
                delay={index * 0.087 + 0.43}
                color={activeNode.color}
                lift={Math.sin(index * 1.7) * 0.62}
                active
                routeActive
              />
            ) : null}
          </React.Fragment>
        );
      })}

      {serviceNodes.map((node, index) => (
        <NodeBeacon key={node.key} node={node} active={node.key === activeKey} index={index} />
      ))}
    </group>
  );
}

export default function SignalInfrastructureField({
  locale = "en",
  profile = "full",
}: {
  locale?: "en" | "es";
  profile?: FieldProfile;
}) {
  const serviceNodes = locale === "es" ? serviceNodesEs : serviceNodesEn;
  const activeLayerLabel = locale === "es" ? "Capa activa" : "Active layer";
  const [activeKey, setActiveKey] = useState("telecom");
  const pauseUntil = useRef(0);
  const activeNode = serviceNodes.find((node) => node.key === activeKey) ?? serviceNodes[0];
  const visibleLabelNodes =
    profile === "mobile"
      ? serviceNodes.filter((node) => ["telecom", "electricity", "security", "quote"].includes(node.key))
      : serviceNodes;

  useEffect(() => {
    function handleFieldFocus(event: Event) {
      const key = (event as CustomEvent<{ key?: string }>).detail?.key;
      if (!key || !serviceNodes.some((node) => node.key === key)) return;
      activateNode(key);
    }

    window.addEventListener("arcwave:field-focus", handleFieldFocus);

    const interval = window.setInterval(() => {
      if (Date.now() < pauseUntil.current) return;

      setActiveKey((current) => {
        const index = focusOrder.indexOf(current);
        return focusOrder[(Math.max(0, index) + 1) % focusOrder.length];
      });
    }, 3000);

    return () => {
      window.removeEventListener("arcwave:field-focus", handleFieldFocus);
      window.clearInterval(interval);
    };
  }, []);

  function activateNode(key: string) {
    pauseUntil.current = Date.now() + 7000;
    setActiveKey(key);
  }

  return (
    <div className="signalField">
      <div className="fieldCanvas" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, profile === "mobile" ? 6.85 : 6.3], fov: profile === "mobile" ? 43 : 38 }}
          dpr={profile === "mobile" ? [1, 1.2] : [1, 1.65]}
          gl={{ alpha: true, antialias: profile !== "mobile", powerPreference: profile === "mobile" ? "low-power" : "high-performance" }}
        >
          <SignalScene activeKey={activeKey} serviceNodes={serviceNodes} profile={profile} />
        </Canvas>
      </div>

      <div className="fieldGrain" aria-hidden="true"></div>
      <div className="fieldAxis axisA" aria-hidden="true"></div>
      <div className="fieldAxis axisB" aria-hidden="true"></div>

      <div className="fieldLabels" aria-label="Signal infrastructure services">
        {visibleLabelNodes.map((node) => (
          <button
            key={node.key}
            type="button"
            className={`fieldNode ${node.labelClass} ${node.key === activeKey ? "isActive" : ""}`}
            onFocus={() => activateNode(node.key)}
            onMouseEnter={() => activateNode(node.key)}
          >
            <span style={{ "--node-color": node.color } as React.CSSProperties}></span>
            {node.label}
          </button>
        ))}
      </div>

      <div className="fieldReadout">
        <span>{activeLayerLabel}</span>
        <strong>{activeNode.system}</strong>
        <p>{activeNode.outcome}</p>
      </div>
    </div>
  );
}
