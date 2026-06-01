import React, { useEffect, useMemo, useRef, useState } from "react";

type ServiceNode = {
  key: string;
  label: string;
  system: string;
  outcome: string;
  color: string;
  labelClass: string;
};

type FieldProfile = "full" | "tablet" | "mobile";

type Props = {
  locale?: "en" | "es";
  profile?: FieldProfile;
};

type WebGLComponent = React.ComponentType<Props>;

const serviceNodesEn: ServiceNode[] = [
  {
    key: "telecom",
    label: "Telecom",
    system: "Signal entry",
    outcome: "Provider handoff and long-distance lines",
    color: "#8ccfff",
    labelClass: "telecom",
  },
  {
    key: "networks",
    label: "Networks",
    system: "Connectivity layer",
    outcome: "Wi-Fi, topology and access points",
    color: "#3f9cff",
    labelClass: "networks",
  },
  {
    key: "electricity",
    label: "Electricity",
    system: "Power control",
    outcome: "Panels, circuits and smart-ready wiring",
    color: "#d8ad55",
    labelClass: "electricity",
  },
  {
    key: "ev",
    label: "EV Charging",
    system: "Energy delivery",
    outcome: "Charging points and safe routing",
    color: "#7bcfc5",
    labelClass: "ev",
  },
  {
    key: "security",
    label: "Security",
    system: "Protected perimeter",
    outcome: "Alarms, CCTV, zones and monitoring-ready setup",
    color: "#8ea6da",
    labelClass: "security",
  },
  {
    key: "audio",
    label: "Audio",
    system: "Sound field",
    outcome: "Home cinema, multiroom and venue audio",
    color: "#a897d0",
    labelClass: "audio",
  },
  {
    key: "quote",
    label: "Quote",
    system: "Technical request",
    outcome: "The system path becomes a clear quote for the space",
    color: "#318ee8",
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

function getShouldReduceMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getViewportProfile(): FieldProfile {
  if (typeof window === "undefined") return "full";
  if (window.matchMedia("(max-width: 760px)").matches) return "mobile";
  if (window.matchMedia("(min-width: 681px) and (max-width: 1080px)").matches) return "tablet";
  return "full";
}

function scheduleIdle(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const win = window as Window & {
    requestIdleCallback?: (cb: IdleRequestCallback, opts?: IdleRequestOptions) => number;
    cancelIdleCallback?: (id: number) => void;
  };

  if (typeof win.requestIdleCallback === "function") {
    const id = win.requestIdleCallback(callback, { timeout: 1600 });
    return () => win.cancelIdleCallback?.(id);
  }

  const id = window.setTimeout(callback, 900);
  return () => window.clearTimeout(id);
}

export default function SignalInfrastructureField({ locale = "en" }: Props) {
  const serviceNodes = locale === "es" ? serviceNodesEs : serviceNodesEn;
  const activeLayerLabel = locale === "es" ? "Capa activa" : "Active layer";
  const [activeKey, setActiveKey] = useState("telecom");
  const [WebGLField, setWebGLField] = useState<WebGLComponent | null>(null);
  const [shouldLoadWebGL, setShouldLoadWebGL] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [webGLProfile, setWebGLProfile] = useState<FieldProfile>("full");
  const pauseUntil = useRef(0);
  const visibleLabelNodes =
    webGLProfile === "mobile"
      ? serviceNodes.filter((node) => ["telecom", "electricity", "security", "quote"].includes(node.key))
      : webGLProfile === "tablet"
        ? serviceNodes.filter((node) => ["telecom", "networks", "electricity", "security", "quote"].includes(node.key))
      : serviceNodes;

  const activeNode = useMemo(
    () => serviceNodes.find((node) => node.key === activeKey) ?? serviceNodes[0],
    [activeKey, serviceNodes]
  );

  useEffect(() => {
    const reduced = getShouldReduceMotion();
    setReduceMotion(reduced);

    const updateProfile = () => setWebGLProfile(getViewportProfile());
    const mediaQueries = [
      window.matchMedia("(max-width: 760px)"),
      window.matchMedia("(min-width: 681px) and (max-width: 1080px)"),
    ];

    updateProfile();
    mediaQueries.forEach((query) => query.addEventListener("change", updateProfile));

    if (reduced) {
      return () => {
        mediaQueries.forEach((query) => query.removeEventListener("change", updateProfile));
      };
    }

    let cleanupIdle = () => {};
    let observer: IntersectionObserver | null = null;
    const stage = document.querySelector("#signal-field .signalStage");

    if ("IntersectionObserver" in window && stage) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          cleanupIdle = scheduleIdle(() => setShouldLoadWebGL(true));
          observer.disconnect();
        },
        { rootMargin: "240px 0px" }
      );

      observer.observe(stage);
      return () => {
        observer?.disconnect();
        cleanupIdle();
        mediaQueries.forEach((query) => query.removeEventListener("change", updateProfile));
      };
    }

    cleanupIdle = scheduleIdle(() => setShouldLoadWebGL(true));
    return () => {
      cleanupIdle();
      mediaQueries.forEach((query) => query.removeEventListener("change", updateProfile));
    };
  }, []);

  useEffect(() => {
    if (!shouldLoadWebGL || reduceMotion || WebGLField) return;

    let cancelled = false;
    import("./SignalInfrastructureFieldWebGL").then((module) => {
      if (!cancelled) setWebGLField(() => module.default);
    });

    return () => {
      cancelled = true;
    };
  }, [WebGLField, reduceMotion, shouldLoadWebGL]);

  useEffect(() => {
    function handleFieldFocus(event: Event) {
      const key = (event as CustomEvent<{ key?: string }>).detail?.key;
      if (!key || !serviceNodes.some((node) => node.key === key)) return;
      activateNode(key);
    }

    window.addEventListener("arcwave:field-focus", handleFieldFocus);

    const interval = window.setInterval(() => {
      if (Date.now() < pauseUntil.current || WebGLField) return;

      setActiveKey((current) => {
        const index = focusOrder.indexOf(current);
        return focusOrder[(Math.max(0, index) + 1) % focusOrder.length];
      });
    }, 3000);

    return () => {
      window.removeEventListener("arcwave:field-focus", handleFieldFocus);
      window.clearInterval(interval);
    };
  }, [WebGLField, serviceNodes]);

  function activateNode(key: string) {
    pauseUntil.current = Date.now() + 7000;
    setActiveKey(key);
  }

  return (
    <div className={`signalFieldShell ${WebGLField ? "isEnhanced" : ""}`.trim()}>
      <div className="signalField signalFieldFallback" aria-hidden={Boolean(WebGLField)}>
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
              style={{ "--node-color": node.color } as React.CSSProperties}
              tabIndex={WebGLField ? -1 : 0}
            >
              <span></span>
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

      {WebGLField ? <WebGLField locale={locale} profile={webGLProfile} /> : null}
    </div>
  );
}
