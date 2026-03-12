// src/content/services.ts

export type ServiceKey = "telecom" | "networks" | "electricity" | "ev" | "alarms" | "audio";

export type QuoteField =
  | { id: string; label: string; type: "text" | "email" | "tel" | "number"; placeholder?: string; required?: boolean }
  | { id: string; label: string; type: "select"; options: string[]; required?: boolean }
  | { id: string; label: string; type: "textarea"; placeholder?: string; required?: boolean };

export type Service = {
  key: ServiceKey;
  title: string;
  short: string;
  description: string;
  heroImage: string;
  cardImage: string;
  icon: string;
  overlay: string;
  bullets: string[];
  faqs?: { q: string; a: string }[];
  extraQuoteFields?: QuoteField[];
};

export const commonQuoteFields: QuoteField[] = [
  { id: "name", label: "Name", type: "text", placeholder: "Full name", required: true },
  { id: "email", label: "Email", type: "email", placeholder: "name@domain.com", required: true },
  { id: "phone", label: "Phone", type: "tel", placeholder: "+34 ...", required: true },
  { id: "city", label: "City", type: "text", placeholder: "Barcelona, ...", required: true },
  {
    id: "site_type",
    label: "Site type",
    type: "select",
    options: ["Select...", "Home", "Office", "Retail", "Industrial", "Other"],
    required: true,
  },
  {
    id: "timeline",
    label: "Desired timeline",
    type: "select",
    options: ["Select...", "ASAP", "1–2 weeks", "2–4 weeks", "1–2 months", "Flexible"],
    required: true,
  },
  {
    id: "brief",
    label: "Short brief",
    type: "textarea",
    placeholder: "What needs to be done? Constraints? Access hours?",
    required: true,
  },
];

export const services: Service[] = [
  {
    key: "telecom",
    title: "Telecom",
    short: "Fiber terminations, racks, line readiness.",
    description:
      "Telecom-ready infrastructure built for reliability and future support: clean terminations, labeling, basic testing, and clear handover notes — so the site stays maintainable after install.",
    heroImage: "/hero/hero-telecom-tv-antenna-01.png",
    cardImage: "/hero/hero-telecom-tv-antenna-01.png",
    icon: "/icons/icon-telecom.png",
    overlay: "/overlays/overlay-telecom-racks.png",
    bullets: [
      "Fiber / copper termination and patching (clean, labeled)",
      "Rack layout, cable management, tidy routing",
      "Basic line readiness checks and practical testing",
      "Coordination with provider install windows (as needed)",
      "Handover notes for support and future changes",
    ],
    faqs: [
      {
        q: "Do you work with existing racks and patch panels?",
        a: "Yes. We can clean up, re-terminate, label, and document an existing setup so it stays supportable.",
      },
      {
        q: "Do you coordinate with ISPs / providers?",
        a: "If needed — we can prepare the site and align handover with the provider’s install window.",
      },
      {
        q: "Do you supply equipment?",
        a: "We can work with your equipment or recommend options aligned with the scope and support needs.",
      },
    ],
    extraQuoteFields: [
      { id: "terminations", label: "Approx. number of terminations/lines", type: "number", placeholder: "e.g., 24" },
      { id: "rack_present", label: "Rack present?", type: "select", options: ["Select...", "Yes", "No", "Not sure"] },
    ],
  },

  {
    key: "networks",
    title: "Networks & Wi-Fi",
    short: "Coverage planning, cabling, AP placement.",
    description:
      "Reliable networks with clean cabling, clear labeling, and practical Wi-Fi placement — designed for coverage, stability, and easy support. We focus on a tidy result and documented handover.",
    heroImage: "/hero/hero-networks-01.png",
    cardImage: "/cards/card-networks-01.png",
    icon: "/icons/icon-wifi.png",
    overlay: "/overlays/overlay-networks-ap.png",
    bullets: [
      "Coverage + access point placement plan (by constraints)",
      "Cat cabling, patching, labeling, tidy routing",
      "PoE / power planning where applicable",
      "Basic switch/router configuration (as agreed)",
      "Handover notes: layout, labels, and recommendations",
    ],
    faqs: [
      {
        q: "Can you improve Wi-Fi coverage without full rewiring?",
        a: "Often, yes. We optimize AP placement and use existing routes where possible, then document the final layout.",
      },
      {
        q: "Do you install commercial-grade equipment?",
        a: "Yes — when the scope calls for it. We can recommend options aligned with budget and support expectations.",
      },
      {
        q: "Will you document ports and labels?",
        a: "Yes. Clear labeling and practical notes are part of delivering a supportable network.",
      },
    ],
    extraQuoteFields: [
      { id: "area_m2", label: "Approx. area (m²)", type: "number", placeholder: "e.g., 180" },
      { id: "ap_count", label: "Approx. AP count", type: "number", placeholder: "e.g., 3" },
    ],
  },

  {
    key: "electricity",
    title: "Electricity & Smart Home",
    short: "Panels, circuits, automation-ready wiring, climate control integration.",
    description:
      "Electrical work with clean panel organization, clear labeling, and documentation — built to be maintainable now and ready for smart-home layers where it makes sense. We also prepare and integrate heating, ventilation, and climate-control automation (zoning, thermostats, sensors) depending on your system and goals.",
    heroImage: "/hero/hero-electric-wiring-01.png",
    cardImage: "/hero/hero-electric-wiring-01.png",
    icon: "/icons/icon-support.png",
    overlay: "/overlays/overlay-electricity-panel.png",
    bullets: [
      "Panel organization + labeling for long-term support",
      "New circuits / outlets as needed (by site constraints)",
      "DIN rail work and tidy routing inside the panel",
      "Smart-home readiness: routes, control points, integration notes",
      "Heating / ventilation / climate control: zoning, thermostats, sensor integration (scope-based)",
      "As-built notes for maintenance and future upgrades",
    ],
    faqs: [
      {
        q: "Do you provide documentation after the job?",
        a: "Yes. Clean labeling and basic as-built notes are part of how we deliver supportable work.",
      },
      {
        q: "Can you prepare wiring for smart home upgrades?",
        a: "Yes — where it makes sense. We plan routes and leave the site ready for future automation layers.",
      },
      {
        q: "Can you integrate climate control (heating / ventilation / AC)?",
        a: "Yes. We can plan zoning and integrate thermostats/sensors depending on the equipment and the desired level of control.",
      },
    ],
    extraQuoteFields: [
      { id: "panel_work", label: "Panel work needed?", type: "select", options: ["Select...", "Yes", "No", "Not sure"] },
      { id: "circuits", label: "Approx. number of circuits/outlets", type: "number", placeholder: "e.g., 6" },
      {
        id: "climate_control",
        label: "Heating / ventilation / climate control",
        type: "select",
        options: ["Select...", "New install", "Integration / upgrade", "Not needed", "Not sure"],
      },
    ],
  },

  {
    key: "ev",
    title: "EV Charging",
    short: "Home & small business charging points.",
    description:
      "EV charger installation with clean routing, correct protections, and a tidy result — built for safety and long-term use, with clear handover notes for future maintenance.",
    heroImage: "/hero/hero-ev-01.png",
    cardImage: "/cards/card-ev-01.png",
    icon: "/icons/icon-ev.png",
    overlay: "/overlays/overlay-ev-wallbox.png",
    bullets: [
      "Charger placement and routing plan (by constraints)",
      "Correct protections and tidy installation",
      "Basic commissioning and handover",
      "Optional prep for load management (if required)",
      "As-built notes for maintenance and support",
    ],
    faqs: [
      {
        q: "Do you help choose a charger model?",
        a: "We can recommend options aligned with your constraints and needs, then install and document the final setup.",
      },
      {
        q: "Do you install in garages / community parking?",
        a: "Yes — subject to permissions and site constraints. We clarify requirements during the survey.",
      },
      {
        q: "Will the installation look clean?",
        a: "That’s the goal. We prioritize neat routing, clean fixing, and a minimal, premium finish.",
      },
    ],
    extraQuoteFields: [
      { id: "charger_model", label: "Charger model (if chosen)", type: "text", placeholder: "e.g., Wallbox..." },
      {
        id: "parking_type",
        label: "Parking type",
        type: "select",
        options: ["Select...", "Private garage", "Community garage", "Outdoor", "Other"],
      },
    ],
  },

  {
    key: "alarms",
    title: "Alarm systems",
    short: "Alarms + CCTV — zones, cameras, clean installs.",
    description:
      "Security installation with clear zone mapping, tidy cabling, and documented handover — combining intrusion alarms and camera coverage where required. We can deliver a setup ready for self-monitoring, or prepared for connection to your chosen monitoring provider (CRA). We often work with Ajax Alarma platforms for a clean, app-controlled system and scalable device setup (scope-based).",
    heroImage: "/hero/hero-alarms-01.png",
    cardImage: "/hero/hero-alarms-01.png",
    icon: "/icons/icon-alarms.png",
    overlay: "/overlays/overlay-cctv-zones.png",
    bullets: [
      "Site survey + placement plan (doors, windows, key areas)",
      "Zone mapping + labeling for supportable alarm configuration",
      "Wired, wireless, or hybrid alarm installs (by constraints)",
      "Camera placement plan (zones + angles) for meaningful coverage",
      "Clean cabling routes, terminations, and network/PoE planning where needed",
      "Optional recording / NVR setup (as agreed) + remote viewing handover",
      "Integration readiness with networks / smart home (scope-based)",
    ],
    faqs: [
      {
        q: "Do you work with Ajax Alarma systems?",
        a: "Yes. Ajax is a popular platform for app-controlled alarms and scalable device setups. We install and document the configuration based on your site and requirements.",
      },
      {
        q: "Do you provide monitoring (CRA)?",
        a: "We don’t provide ongoing monitoring directly. We install the system ready for your chosen CRA, or for self-monitoring.",
      },
      {
        q: "Can you install cameras without visible cabling?",
        a: "We aim for a clean result. Feasibility depends on routes, materials, and access — confirmed during the survey.",
      },
      {
        q: "Can alarms and cameras integrate with networking / smart home?",
        a: "Yes. Where appropriate, we coordinate integration and provide practical handover notes for future support.",
      },
    ],
    extraQuoteFields: [
      {
        id: "alarm_property",
        label: "Property type",
        type: "select",
        options: ["Select...", "Apartment", "House", "Office / commercial", "Other"],
      },
      { id: "alarm_zones", label: "Approx. number of zones / sensors", type: "number", placeholder: "e.g., 8" },
      {
        id: "alarm_install",
        label: "Alarm install type",
        type: "select",
        options: ["Select...", "Wired", "Wireless", "Hybrid", "Not sure"],
      },
      {
        id: "alarm_monitoring",
        label: "Monitoring (CRA)",
        type: "select",
        options: ["Select...", "No", "Yes — I have a provider", "Not sure yet"],
      },
      { id: "camera_count", label: "Approx. camera count", type: "number", placeholder: "e.g., 6" },
      { id: "recording", label: "Recording / NVR needed?", type: "select", options: ["Select...", "Yes", "No", "Not sure"] },
    ],
  },

  {
    key: "audio",
    title: "Audio & Home Cinema",
    short: "Multiroom audio, home cinema, and venue sound — clean installs.",
    description:
      "Audio installation designed to feel invisible: clean cabling, correct zoning, and a tidy handover. From home cinema and multiroom music to background sound in restaurants and commercial spaces — we plan speaker placement, amplification, and control for reliable everyday use.",
    // NOTE (Stage B): replace these with dedicated Audio visuals. For now, we reuse existing assets to avoid 404.
    heroImage: "/hero/hero-audio-homecinema-01.png",
    cardImage: "/hero/hero-audio-homecinema-01.png",
    icon: "/icons/icon-audio.png",
    overlay: "/overlays/overlay-network-topology.png",
    bullets: [
      "Multiroom audio planning (zones, control, tidy cabling)",
      "Home cinema setup (screen/TV integration, speakers, calibration basics)",
      "Background sound for venues (restaurants, retail) with zoning",
      "Equipment install: speakers, amps, wiring, clean mounting",
      "Handover notes for daily operation and future changes",
    ],
    faqs: [
      {
        q: "Can you design a system around the space and budget?",
        a: "Yes. We propose a practical layout and component approach based on room size, use-case, and installation constraints.",
      },
      {
        q: "Do you handle commercial spaces like restaurants?",
        a: "Yes. We plan zones and levels so sound coverage is consistent and controllable across the venue.",
      },
      {
        q: "Will it look clean (hidden wiring, tidy mounting)?",
        a: "That’s a priority. We aim for discreet routing and a premium, minimal finish wherever possible.",
      },
    ],
    extraQuoteFields: [
      { id: "audio_site", label: "Audio site type", type: "select", options: ["Select...", "Home", "Restaurant / bar", "Retail", "Office", "Other"] },
      { id: "audio_zones", label: "Approx. number of zones / rooms", type: "number", placeholder: "e.g., 4" },
      { id: "audio_use", label: "Primary use", type: "select", options: ["Select...", "Multiroom music", "Home cinema", "Background sound (venue)", "Not sure"] },
    ],
  },
];
