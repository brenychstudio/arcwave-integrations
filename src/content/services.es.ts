// src/content/services.es.ts
import type { QuoteField, Service, ServiceKey } from "./services";

export const commonQuoteFieldsEs: QuoteField[] = [
  { id: "name", label: "Nombre", type: "text", placeholder: "Nombre completo", required: true },
  { id: "email", label: "Email", type: "email", placeholder: "nombre@dominio.com", required: true },
  { id: "phone", label: "Teléfono", type: "tel", placeholder: "+34 ...", required: true },
  { id: "city", label: "Ciudad", type: "text", placeholder: "Barcelona, ...", required: true },
  {
    id: "site_type",
    label: "Tipo de espacio",
    type: "select",
    options: ["Seleccionar...", "Vivienda", "Oficina", "Comercio", "Industrial", "Otro"],
    required: true,
  },
  {
    id: "timeline",
    label: "Plazo deseado",
    type: "select",
    options: ["Seleccionar...", "Urgente", "1–2 semanas", "2–4 semanas", "1–2 meses", "Flexible"],
    required: true,
  },
  {
    id: "brief",
    label: "Breve descripción",
    type: "textarea",
    placeholder: "¿Qué hay que hacer? ¿Limitaciones? ¿Horario de acceso?",
    required: true,
  },
];

export const servicesEs: Service[] = [
  {
    key: "telecom" as ServiceKey,
    title: "Telecomunicaciones",
    short: "Terminaciones, racks y preparación de líneas.",
    description:
      "Infraestructura de telecom preparada para un soporte fiable: terminaciones limpias, etiquetado, pruebas básicas y notas de entrega — para que la instalación sea mantenible después del trabajo.",
    heroImage: "/hero/hero-telecom-tv-antenna-01.png",
    cardImage: "/hero/hero-telecom-tv-antenna-01.png",
    icon: "/icons/icon-telecom.png",
    overlay: "/overlays/overlay-telecom-racks.png",
    bullets: [
      "Terminación y parcheo de fibra/cobre (limpio y etiquetado)",
      "Ordenación de rack, gestión de cableado y rutas discretas",
      "Comprobaciones básicas de línea y pruebas prácticas",
      "Coordinación con ventanas de instalación del operador (si aplica)",
      "Notas de entrega para soporte y cambios futuros",
    ],
    faqs: [
      {
        q: "¿Trabajáis con racks y patch panels existentes?",
        a: "Sí. Podemos limpiar, re-terminar, etiquetar y documentar una instalación existente para que sea soportable.",
      },
      {
        q: "¿Coordináis con el operador/ISP?",
        a: "Si es necesario, preparamos el sitio y alineamos la entrega con la ventana de instalación del proveedor.",
      },
      {
        q: "¿Suministráis equipos?",
        a: "Podemos trabajar con tu equipo o recomendar opciones según el alcance y necesidades de soporte.",
      },
    ],
    extraQuoteFields: [
      { id: "terminations", label: "Nº aprox. de terminaciones/líneas", type: "number", placeholder: "p. ej., 24" },
      { id: "rack_present", label: "¿Hay rack?", type: "select", options: ["Seleccionar...", "Sí", "No", "No seguro"] },
    ],
  },

  {
    key: "networks" as ServiceKey,
    title: "Redes y Wi-Fi",
    short: "Cobertura, cableado y ubicación de AP.",
    description:
      "Redes fiables con cableado limpio, etiquetado claro y Wi-Fi bien ubicado — pensado para cobertura, estabilidad y soporte sencillo. Entrega documentada y ordenada.",
    heroImage: "/hero/hero-networks-01.png",
    cardImage: "/cards/card-networks-01.png",
    icon: "/icons/icon-wifi.png",
    overlay: "/overlays/overlay-networks-ap.png",
    bullets: [
      "Plan de cobertura + ubicación de puntos de acceso (según limitaciones)",
      "Cableado Cat, parcheo, etiquetado y rutas discretas",
      "Planificación de PoE / alimentación cuando aplique",
      "Configuración básica de switch/router (según acuerdo)",
      "Notas de entrega: esquema, etiquetas y recomendaciones",
    ],
    faqs: [
      {
        q: "¿Se puede mejorar el Wi-Fi sin re-cablear todo?",
        a: "A menudo sí. Optimizamos ubicación de AP y aprovechamos rutas existentes cuando sea posible, y documentamos el resultado.",
      },
      {
        q: "¿Instaláis equipo profesional?",
        a: "Sí, cuando el alcance lo requiere. Recomendamos opciones según presupuesto y expectativas de soporte.",
      },
      {
        q: "¿Documentáis puertos y etiquetas?",
        a: "Sí. Etiquetado claro y notas prácticas son parte de una red mantenible.",
      },
    ],
    extraQuoteFields: [
      { id: "area_m2", label: "Superficie aprox. (m²)", type: "number", placeholder: "p. ej., 180" },
      { id: "ap_count", label: "Nº aprox. de AP", type: "number", placeholder: "p. ej., 3" },
    ],
  },

  {
    key: "electricity" as ServiceKey,
    title: "Electricidad y Domótica",
    short: "Cuadros, circuitos, cableado listo para automatización y clima.",
    description:
      "Trabajo eléctrico con cuadro ordenado, etiquetado y documentación — pensado para ser mantenible hoy y preparado para capas de domótica cuando tenga sentido. También integramos control de climatización (zonas, termostatos, sensores) según tu sistema y objetivos.",
    heroImage: "/hero/hero-electric-wiring-01.png",
    cardImage: "/hero/hero-electric-wiring-01.png",
    icon: "/icons/icon-support.png",
    overlay: "/overlays/overlay-electricity-panel.png",
    bullets: [
      "Ordenación de cuadro + etiquetado para soporte a largo plazo",
      "Nuevos circuitos / puntos según el sitio",
      "Trabajo en carril DIN y rutas limpias dentro del cuadro",
      "Preparación domótica: rutas, puntos de control, notas de integración",
      "Climatización: zonificación, termostatos e integración de sensores (según alcance)",
      "Notas “as-built” para mantenimiento y futuras mejoras",
    ],
    faqs: [
      { q: "¿Entregáis documentación?", a: "Sí. Etiquetado limpio y notas “as-built” forman parte de la entrega." },
      { q: "¿Preparáis cableado para domótica?", a: "Sí, cuando tiene sentido. Planificamos rutas y dejamos el sitio listo." },
      {
        q: "¿Podéis integrar climatización (calefacción/ventilación/AC)?",
        a: "Sí. Podemos planificar zonas e integrar termostatos/sensores según el equipo y el nivel de control deseado.",
      },
    ],
    extraQuoteFields: [
      { id: "panel_work", label: "¿Trabajo en cuadro?", type: "select", options: ["Seleccionar...", "Sí", "No", "No seguro"] },
      { id: "circuits", label: "Nº aprox. de circuitos/puntos", type: "number", placeholder: "p. ej., 6" },
      {
        id: "climate_control",
        label: "Climatización (calefacción/ventilación/AC)",
        type: "select",
        options: ["Seleccionar...", "Nueva instalación", "Integración / mejora", "No necesario", "No seguro"],
      },
    ],
  },

  {
    key: "ev" as ServiceKey,
    title: "Carga de Vehículo Eléctrico",
    short: "Puntos de carga para vivienda y pequeño negocio.",
    description:
      "Instalación de cargadores VE con rutas limpias, protecciones correctas y un resultado ordenado — pensada para seguridad y uso a largo plazo, con notas de entrega para soporte.",
    heroImage: "/hero/hero-ev-01.png",
    cardImage: "/cards/card-ev-01.png",
    icon: "/icons/icon-ev.png",
    overlay: "/overlays/overlay-ev-wallbox.png",
    bullets: [
      "Plan de ubicación y recorrido (según limitaciones)",
      "Protecciones correctas e instalación ordenada",
      "Puesta en marcha básica y entrega",
      "Preparación para gestión de carga (si se requiere)",
      "Notas “as-built” para mantenimiento",
    ],
    faqs: [
      { q: "¿Ayudáis a elegir el cargador?", a: "Sí. Recomendamos opciones según el sitio y necesidades." },
      { q: "¿Instaláis en garajes comunitarios?", a: "Sí, sujeto a permisos y condiciones del edificio." },
      { q: "¿Quedará limpio?", a: "Sí. Priorizamos rutas discretas y un acabado mínimo/premium." },
    ],
    extraQuoteFields: [
      { id: "charger_model", label: "Modelo (si ya está elegido)", type: "text", placeholder: "p. ej., Wallbox..." },
      {
        id: "parking_type",
        label: "Tipo de parking",
        type: "select",
        options: ["Seleccionar...", "Garaje privado", "Garaje comunitario", "Exterior", "Otro"],
      },
    ],
  },

  {
    key: "alarms" as ServiceKey,
    title: "Sistemas de alarma",
    short: "Alarma + CCTV — zonas, cámaras e instalación limpia.",
    description:
      "Instalación de seguridad con zonificación clara, cableado ordenado y entrega documentada — combinando alarma y cámaras cuando se requiera. Podemos dejar el sistema listo para auto-monitorización o preparado para conexión a tu proveedor CRA. Trabajamos frecuentemente con Ajax Alarma para un sistema controlado por app y escalable (según alcance).",
    heroImage: "/hero/hero-alarms-01.png",
    cardImage: "/hero/hero-alarms-01.png",
    icon: "/icons/icon-alarms.png",
    overlay: "/overlays/overlay-cctv-zones.png",
    bullets: [
      "Visita + plan de colocación (puertas, ventanas, zonas clave)",
      "Zonas y etiquetado para una configuración mantenible",
      "Instalación cableada, inalámbrica o híbrida (según el sitio)",
      "Plan de cámaras (zonas + ángulos) para cobertura útil",
      "Rutas limpias, terminaciones y planificación de red/PoE si aplica",
      "Grabación / NVR (según acuerdo) + entrega de acceso remoto",
      "Preparación de integración con redes / domótica (según alcance)",
    ],
    faqs: [
      {
        q: "¿Trabajáis con Ajax Alarma?",
        a: "Sí. Ajax es una plataforma popular para alarmas controladas por app y setups escalables. Instalamos y documentamos según el sitio y requisitos.",
      },
      {
        q: "¿Ofrecéis CRA?",
        a: "No ofrecemos monitorización continua directamente. Dejamos el sistema listo para tu CRA o para auto-monitorización.",
      },
      {
        q: "¿Se puede ocultar el cableado de cámaras?",
        a: "Buscamos un resultado limpio. Depende de rutas, materiales y acceso — se confirma en la visita.",
      },
      {
        q: "¿Se integra con redes/domótica?",
        a: "Sí, cuando procede. Coordinamos la integración y dejamos notas prácticas para soporte futuro.",
      },
    ],
    extraQuoteFields: [
      { id: "alarm_property", label: "Tipo de inmueble", type: "select", options: ["Seleccionar...", "Piso", "Casa", "Oficina / comercial", "Otro"] },
      { id: "alarm_zones", label: "Nº aprox. de zonas/sensores", type: "number", placeholder: "p. ej., 8" },
      { id: "alarm_install", label: "Tipo de instalación", type: "select", options: ["Seleccionar...", "Cableada", "Inalámbrica", "Híbrida", "No seguro"] },
      { id: "alarm_monitoring", label: "Monitorización (CRA)", type: "select", options: ["Seleccionar...", "No", "Sí — ya tengo proveedor", "Aún no lo sé"] },
      { id: "camera_count", label: "Nº aprox. de cámaras", type: "number", placeholder: "p. ej., 6" },
      { id: "recording", label: "¿Grabación / NVR?", type: "select", options: ["Seleccionar...", "Sí", "No", "No seguro"] },
    ],
  },

  {
    key: "audio" as ServiceKey,
    title: "Audio y Cine en Casa",
    short: "Multiroom, cine en casa y sonido para locales — instalación limpia.",
    description:
      "Instalación de audio pensada para “no verse”: cableado limpio, zonificación correcta y una entrega clara. Desde cine en casa y música multiroom hasta sonido ambiental en restaurantes y espacios comerciales — planificamos altavoces, amplificación y control para un uso diario fiable.",
    heroImage: "/hero/hero-audio-homecinema-01.png",
    cardImage: "/hero/hero-audio-homecinema-01.png",
    icon: "/icons/icon-support.png",
    overlay: "/overlays/overlay-network-topology.png",
    bullets: [
      "Planificación multiroom (zonas, control, cableado ordenado)",
      "Cine en casa (integración TV/pantalla, altavoces, calibración básica)",
      "Sonido ambiental para locales (restaurantes, retail) con zonificación",
      "Instalación de equipos: altavoces, amplis, cableado, montaje limpio",
      "Notas de entrega para operación diaria y cambios futuros",
    ],
    faqs: [
      { q: "¿Diseñáis el sistema según espacio y presupuesto?", a: "Sí. Proponemos una solución práctica según uso, tamaño y limitaciones." },
      { q: "¿Hacéis instalaciones en restaurantes?", a: "Sí. Planificamos zonas y niveles para cobertura consistente y controlable." },
      { q: "¿Quedará discreto y limpio?", a: "Es prioridad. Buscamos rutas ocultas y un acabado minimal/premium." },
    ],
    extraQuoteFields: [
      { id: "audio_site", label: "Tipo de espacio", type: "select", options: ["Seleccionar...", "Vivienda", "Restaurante / bar", "Comercio", "Oficina", "Otro"] },
      { id: "audio_zones", label: "Nº aprox. de zonas/salas", type: "number", placeholder: "p. ej., 4" },
      { id: "audio_use", label: "Uso principal", type: "select", options: ["Seleccionar...", "Música multiroom", "Cine en casa", "Sonido ambiental (local)", "No seguro"] },
    ],
  },
];
