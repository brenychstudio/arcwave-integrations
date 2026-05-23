import type { ServiceKey } from "./services";

export type ServicePathCard = {
  index: string;
  title: string;
  text: string;
};

export type ServiceDetail = {
  outcome: string;
  activeLayer: string;
  activeLayerText: string;
  heroTags: string[];
  pathCards: ServicePathCard[];
  quoteHints: string[];
  relatedServiceKeys: ServiceKey[];
  scopeIntro: string;
  faqIntro: string;
};

export const serviceDetails: Partial<Record<ServiceKey, ServiceDetail>> = {
  telecom: {
    outcome: "Signal entry, provider handoff and support-ready line infrastructure.",
    activeLayer: "Telecom",
    activeLayerText: "Signal entry, provider handoff and support-ready line infrastructure.",
    heroTags: ["Signal", "Lines", "Rack readiness"],
    pathCards: [
      {
        index: "01 / Signal",
        title: "Need becomes visible.",
        text: "Fiber terminations, provider handoff, rack condition and line readiness become clear before work starts.",
      },
      {
        index: "02 / System",
        title: "Dependencies are mapped.",
        text: "Routes, access, power, network and provider windows are clarified so installation does not depend on guesswork.",
      },
      {
        index: "03 / Handover",
        title: "The result stays supportable.",
        text: "Labels, practical notes and next-step recommendations keep the line infrastructure readable after completion.",
      },
    ],
    quoteHints: ["access point", "provider handoff", "rack or panel location", "line count"],
    relatedServiceKeys: ["networks", "electricity", "ev"],
    scopeIntro:
      "Telecom scope is confirmed around entry points, line count, rack readiness, provider timing and future support needs.",
    faqIntro: "Short answers before a telecom request: provider coordination, racks, equipment and handover.",
  },
  networks: {
    outcome: "Coverage, topology and AP placement shaped into a stable network layer.",
    activeLayer: "Networks",
    activeLayerText: "Coverage planning, topology, cabling and AP placement for supportable Wi-Fi and LAN.",
    heroTags: ["Coverage", "Topology", "AP placement"],
    pathCards: [
      {
        index: "01 / Coverage",
        title: "Need becomes visible.",
        text: "Weak zones, user density, existing cabling and device expectations are translated into a practical coverage brief.",
      },
      {
        index: "02 / Topology",
        title: "Dependencies are mapped.",
        text: "Routes, switches, PoE, rack location, telecom handoff and mounting constraints are aligned before installation.",
      },
      {
        index: "03 / Handover",
        title: "The result stays supportable.",
        text: "Port labels, AP positions, configuration notes and recommendations make the network easier to maintain.",
      },
    ],
    quoteHints: ["site size", "coverage gaps", "existing cabling", "AP count"],
    relatedServiceKeys: ["telecom", "alarms", "audio"],
    scopeIntro:
      "Network scope is confirmed around coverage, cabling routes, PoE, AP count, topology and support expectations.",
    faqIntro: "Short answers before a network request: coverage, equipment, cabling and documentation.",
  },
  electricity: {
    outcome: "Power, control and automation-ready wiring prepared as one maintainable layer.",
    activeLayer: "Power + control",
    activeLayerText: "Panels, circuits, smart-ready wiring and climate control integration with clear handover.",
    heroTags: ["Power", "Control", "Smart-ready"],
    pathCards: [
      {
        index: "01 / Power",
        title: "Need becomes visible.",
        text: "Panel condition, new circuits, control points and climate or automation goals are made explicit.",
      },
      {
        index: "02 / Control",
        title: "Dependencies are mapped.",
        text: "Panel access, routing, protections, smart-home readiness and connected services are checked before work starts.",
      },
      {
        index: "03 / Handover",
        title: "The result stays supportable.",
        text: "Labels, as-built notes and practical recommendations keep the electrical layer understandable over time.",
      },
    ],
    quoteHints: ["panel access", "circuit count", "automation goals", "climate control"],
    relatedServiceKeys: ["ev", "networks", "alarms"],
    scopeIntro:
      "Electrical scope is confirmed around panel access, circuits, routing, protections, smart-home readiness and future service layers.",
    faqIntro: "Short answers before an electrical request: documentation, smart readiness and climate control.",
  },
  ev: {
    outcome: "Energy delivery, protections and charger routing prepared for daily use.",
    activeLayer: "EV charging",
    activeLayerText: "Charger placement, safe routing, protections and handover for home or small business charging.",
    heroTags: ["Energy", "Protections", "Routing"],
    pathCards: [
      {
        index: "01 / Energy",
        title: "Need becomes visible.",
        text: "Parking position, charger type, cable route, distance and expected use are translated into an installable request.",
      },
      {
        index: "02 / Safety",
        title: "Dependencies are mapped.",
        text: "Panel capacity, protections, permissions, routing and optional load management are clarified before installation.",
      },
      {
        index: "03 / Handover",
        title: "The result stays supportable.",
        text: "Commissioning, basic operation notes and as-built information leave the charger ready for long-term use.",
      },
    ],
    quoteHints: ["parking type", "charger model", "cable route", "load or protections"],
    relatedServiceKeys: ["electricity", "networks", "telecom"],
    scopeIntro:
      "EV scope is confirmed around parking access, charger placement, cable routing, electrical protections and commissioning.",
    faqIntro: "Short answers before an EV request: charger choice, parking constraints and clean routing.",
  },
  alarms: {
    outcome: "Perimeter, CCTV and monitoring-ready security paths planned together.",
    activeLayer: "Security",
    activeLayerText: "Alarm zones, cameras, clean cabling and monitoring-ready handover for supportable security.",
    heroTags: ["Perimeter", "CCTV", "Monitoring-ready"],
    pathCards: [
      {
        index: "01 / Perimeter",
        title: "Need becomes visible.",
        text: "Doors, windows, movement zones, camera angles and monitoring goals become a clear security map.",
      },
      {
        index: "02 / Coverage",
        title: "Dependencies are mapped.",
        text: "Power, network, PoE, mounting, recording, app access and CRA readiness are clarified by site conditions.",
      },
      {
        index: "03 / Handover",
        title: "The result stays supportable.",
        text: "Zones, labels, access notes and device placement records make the system easier to operate and maintain.",
      },
    ],
    quoteHints: ["doors and windows", "sensor zones", "camera count", "monitoring provider"],
    relatedServiceKeys: ["networks", "electricity", "telecom"],
    scopeIntro:
      "Security scope is confirmed around alarm zones, camera coverage, routes, recording, monitoring readiness and handover.",
    faqIntro: "Short answers before a security request: Ajax, CRA, cameras and connected layers.",
  },
  audio: {
    outcome: "Sound field, zones and home cinema infrastructure shaped into a clean system.",
    activeLayer: "Audio",
    activeLayerText: "Speaker zones, cabling, amplification and control planned for reliable daily sound.",
    heroTags: ["Sound field", "Zones", "Home cinema"],
    pathCards: [
      {
        index: "01 / Sound",
        title: "Need becomes visible.",
        text: "Rooms, listening positions, zones, use cases and aesthetic constraints become a practical audio brief.",
      },
      {
        index: "02 / System",
        title: "Dependencies are mapped.",
        text: "Speaker placement, cabling, amplification, control, network and power needs are aligned before installation.",
      },
      {
        index: "03 / Handover",
        title: "The result stays supportable.",
        text: "Zone labels, control notes and equipment records keep the system easy to use and adjust later.",
      },
    ],
    quoteHints: ["rooms or zones", "speaker positions", "equipment", "control method"],
    relatedServiceKeys: ["networks", "electricity", "telecom"],
    scopeIntro:
      "Audio scope is confirmed around zones, room use, speaker placement, cabling, amplification, control and finish quality.",
    faqIntro: "Short answers before an audio request: layout, venues, hidden wiring and daily control.",
  },
};
