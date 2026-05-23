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
    options: ["Seleccionar...", "Urgente", "1-2 semanas", "2-4 semanas", "1-2 meses", "Flexible"],
    required: true,
  },
  {
    id: "brief",
    label: "Breve descripción",
    type: "textarea",
    placeholder: "¿Qué hay que resolver? ¿Restricciones, acceso, horarios o resultado esperado?",
    required: true,
  },
];

export const servicesEs: Service[] = [
  {
    key: "telecom" as ServiceKey,
    title: "Telecom",
    short: "Entrada de señal, terminaciones, rack y líneas preparadas para soporte.",
    description:
      "Infraestructura de telecomunicaciones preparada como una ruta técnica mantenible: entrada de operador, terminaciones limpias, etiquetado, rack y notas de entrega para futuras intervenciones.",
    heroImage: "/hero/hero-telecom-tv-antenna-01.png",
    cardImage: "/hero/hero-telecom-tv-antenna-01.png",
    icon: "/icons/icon-telecom.png",
    overlay: "/overlays/overlay-telecom-racks.png",
    bullets: [
      "Terminación y parcheo de fibra o cobre con etiquetado claro",
      "Ordenación de rack, patch panel y gestión de cableado",
      "Revisión básica de entrada de operador y continuidad de líneas",
      "Coordinación con ventanas de instalación del proveedor cuando aplica",
      "Notas de entrega para soporte, cambios y ampliaciones",
    ],
    faqs: [
      {
        q: "¿Trabajáis con racks y patch panels existentes?",
        a: "Sí. Podemos ordenar, reterminar, etiquetar y documentar una instalación existente para que sea más fácil de mantener.",
      },
      {
        q: "¿Coordináis con el operador o ISP?",
        a: "Cuando el alcance lo requiere, preparamos el sitio y alineamos la entrega con la ventana de instalación del proveedor.",
      },
      {
        q: "¿Podéis recomendar equipos?",
        a: "Sí. Podemos trabajar con equipos existentes o recomendar opciones según el alcance, presupuesto y necesidades de soporte.",
      },
    ],
    extraQuoteFields: [
      { id: "terminations", label: "Número aproximado de líneas", type: "number", placeholder: "p. ej., 24" },
      { id: "rack_present", label: "¿Hay rack?", type: "select", options: ["Seleccionar...", "Sí", "No", "No seguro"] },
    ],
  },
  {
    key: "networks" as ServiceKey,
    title: "Redes y Wi-Fi",
    short: "Cobertura, cableado, topología y ubicación de puntos de acceso.",
    description:
      "Redes fiables con cableado ordenado, etiquetado legible y Wi-Fi planificado por cobertura, estabilidad y soporte. La ruta conecta telecomunicaciones, PoE, rack y puntos de acceso.",
    heroImage: "/hero/hero-networks-01.png",
    cardImage: "/cards/card-networks-01.png",
    icon: "/icons/icon-wifi.png",
    overlay: "/overlays/overlay-networks-ap.png",
    bullets: [
      "Plan de cobertura y ubicación de puntos de acceso según restricciones",
      "Cableado Cat, parcheo, etiquetado y rutas discretas",
      "Planificación de PoE, switch, router y rack cuando aplica",
      "Configuración básica según el alcance acordado",
      "Notas de entrega con puertos, etiquetas y recomendaciones",
    ],
    faqs: [
      {
        q: "¿Se puede mejorar el Wi-Fi sin recablear todo?",
        a: "A menudo sí. Revisamos cobertura, ubicación de AP y rutas existentes antes de proponer nuevas tiradas.",
      },
      {
        q: "¿Instaláis equipos profesionales?",
        a: "Sí, cuando el alcance lo pide. La selección se alinea con presupuesto, cobertura y expectativas de soporte.",
      },
      {
        q: "¿Documentáis puertos y etiquetas?",
        a: "Sí. La documentación práctica forma parte de una red que se puede mantener después.",
      },
    ],
    extraQuoteFields: [
      { id: "area_m2", label: "Superficie aproximada (m²)", type: "number", placeholder: "p. ej., 180" },
      { id: "ap_count", label: "Número aproximado de AP", type: "number", placeholder: "p. ej., 3" },
    ],
  },
  {
    key: "electricity" as ServiceKey,
    title: "Electricidad y Smart Home",
    short: "Cuadros, circuitos, control y cableado preparado para automatización.",
    description:
      "Trabajo eléctrico tratado como una capa técnica legible: cuadro ordenado, protecciones, circuitos, puntos de control y preparación para smart home o climatización cuando tiene sentido.",
    heroImage: "/hero/hero-electric-wiring-01.png",
    cardImage: "/hero/hero-electric-wiring-01.png",
    icon: "/icons/icon-support.png",
    overlay: "/overlays/overlay-electricity-panel.png",
    bullets: [
      "Ordenación de cuadro y etiquetado para soporte a largo plazo",
      "Nuevos circuitos, puntos y rutas según las condiciones del sitio",
      "Trabajo en carril DIN, protecciones y routing limpio dentro del cuadro",
      "Preparación smart home: control, sensores, escenas o integración futura",
      "Climatización: zonas, termostatos y sensores según alcance",
      "Notas as-built para mantenimiento y ampliaciones",
    ],
    faqs: [
      { q: "¿Entregáis documentación?", a: "Sí. Etiquetado y notas as-built ayudan a mantener el sistema después." },
      { q: "¿Preparáis cableado para smart home?", a: "Sí, cuando tiene sentido para el espacio y el presupuesto." },
      {
        q: "¿Podéis integrar climatización?",
        a: "Sí. Podemos planificar zonas, termostatos y sensores según el equipo existente y el nivel de control deseado.",
      },
    ],
    extraQuoteFields: [
      { id: "panel_work", label: "¿Trabajo en cuadro?", type: "select", options: ["Seleccionar...", "Sí", "No", "No seguro"] },
      { id: "circuits", label: "Número aproximado de circuitos o puntos", type: "number", placeholder: "p. ej., 6" },
      {
        id: "climate_control",
        label: "Climatización / control",
        type: "select",
        options: ["Seleccionar...", "Nueva instalación", "Integración / mejora", "No necesario", "No seguro"],
      },
    ],
  },
  {
    key: "ev" as ServiceKey,
    title: "Carga VE",
    short: "Puntos de carga, protecciones, recorrido y puesta en marcha.",
    description:
      "Instalación de carga para vehículo eléctrico con recorrido limpio, protecciones correctas, contexto del cuadro y entrega clara para vivienda, garaje o pequeño negocio.",
    heroImage: "/hero/hero-ev-01.png",
    cardImage: "/cards/card-ev-01.png",
    icon: "/icons/icon-ev.png",
    overlay: "/overlays/overlay-ev-wallbox.png",
    bullets: [
      "Ubicación del cargador y ruta de cable según restricciones",
      "Revisión de cuadro, protecciones y capacidad disponible",
      "Instalación ordenada y puesta en marcha básica",
      "Preparación para gestión de carga cuando se requiere",
      "Notas as-built para mantenimiento y soporte",
    ],
    faqs: [
      {
        q: "¿Ayudáis a elegir cargador?",
        a: "Sí. Recomendamos opciones según el sitio, potencia, uso esperado y restricciones de instalación.",
      },
      {
        q: "¿Instaláis en garajes comunitarios?",
        a: "Sí, sujeto a permisos, acceso y condiciones del edificio. Se aclara en la fase de alcance.",
      },
      {
        q: "¿El resultado queda limpio?",
        a: "Ese es el objetivo: recorrido discreto, fijación ordenada y entrega mantenible.",
      },
    ],
    extraQuoteFields: [
      { id: "charger_model", label: "Modelo de cargador si ya está elegido", type: "text", placeholder: "p. ej., Wallbox..." },
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
    title: "Alarmas y CCTV",
    short: "Zonas, cámaras, perímetro y sistema preparado para monitorización.",
    description:
      "Seguridad planteada como una ruta conectada: zonas de alarma, cámaras, red, alimentación, grabación y entrega clara. Puede quedar lista para auto-monitorización o para proveedor CRA elegido.",
    heroImage: "/hero/hero-alarms-01.png",
    cardImage: "/hero/hero-alarms-01.png",
    icon: "/icons/icon-alarms.png",
    overlay: "/overlays/overlay-cctv-zones.png",
    bullets: [
      "Visita y plan de colocación para puertas, ventanas y zonas clave",
      "Mapa de zonas y etiquetado para configuración mantenible",
      "Instalación cableada, inalámbrica o híbrida según el sitio",
      "Plan de cámaras con ángulos, cobertura útil y rutas discretas",
      "Red, PoE, grabación o NVR según alcance",
      "Entrega de acceso remoto, notas y contexto de soporte",
      "Preparación para integración con red o smart home cuando procede",
    ],
    faqs: [
      {
        q: "¿Trabajáis con Ajax Alarma?",
        a: "Sí. Ajax es una plataforma habitual para sistemas controlados por app y ampliables. Instalamos y documentamos según el sitio.",
      },
      {
        q: "¿Ofrecéis CRA?",
        a: "No ofrecemos monitorización continua directamente. Dejamos el sistema preparado para tu CRA o para auto-monitorización.",
      },
      {
        q: "¿Se puede ocultar el cableado de cámaras?",
        a: "Buscamos un resultado limpio. La viabilidad depende de rutas, materiales y acceso.",
      },
      {
        q: "¿Se integra con redes o smart home?",
        a: "Sí, cuando procede. Coordinamos la integración y dejamos notas prácticas para soporte futuro.",
      },
    ],
    extraQuoteFields: [
      { id: "alarm_property", label: "Tipo de inmueble", type: "select", options: ["Seleccionar...", "Piso", "Casa", "Oficina / comercial", "Otro"] },
      { id: "alarm_zones", label: "Número aproximado de zonas o sensores", type: "number", placeholder: "p. ej., 8" },
      { id: "alarm_install", label: "Tipo de instalación", type: "select", options: ["Seleccionar...", "Cableada", "Inalámbrica", "Híbrida", "No seguro"] },
      { id: "alarm_monitoring", label: "Monitorización CRA", type: "select", options: ["Seleccionar...", "No", "Sí, ya tengo proveedor", "Aún no lo sé"] },
      { id: "camera_count", label: "Número aproximado de cámaras", type: "number", placeholder: "p. ej., 6" },
      { id: "recording", label: "¿Grabación / NVR?", type: "select", options: ["Seleccionar...", "Sí", "No", "No seguro"] },
    ],
  },
  {
    key: "audio" as ServiceKey,
    title: "Audio y Cine en Casa",
    short: "Zonas, cableado, amplificación y control para sonido diario fiable.",
    description:
      "Audio diseñado para integrarse sin ruido visual: salas, zonas, altavoces, amplificación, control y cableado claro para cine en casa, multiroom o espacios comerciales.",
    heroImage: "/hero/hero-audio-homecinema-01.png",
    cardImage: "/hero/hero-audio-homecinema-01.png",
    icon: "/icons/icon-audio.png",
    overlay: "/overlays/overlay-network-topology.png",
    bullets: [
      "Planificación multiroom: zonas, control y cableado ordenado",
      "Cine en casa: integración de pantalla, altavoces y calibración básica",
      "Sonido ambiental para restaurantes, retail u oficinas",
      "Instalación de altavoces, amplificadores, cableado y montaje limpio",
      "Notas de entrega para uso diario y cambios futuros",
    ],
    faqs: [
      {
        q: "¿Diseñáis el sistema según espacio y presupuesto?",
        a: "Sí. Proponemos una solución práctica según uso, tamaño, estética y restricciones del sitio.",
      },
      {
        q: "¿Hacéis instalaciones en restaurantes o locales?",
        a: "Sí. Planificamos zonas y niveles para cobertura consistente y controlable.",
      },
      {
        q: "¿Queda discreto?",
        a: "Esa es la prioridad: rutas ocultas cuando sea posible y acabado limpio.",
      },
    ],
    extraQuoteFields: [
      { id: "audio_site", label: "Tipo de espacio", type: "select", options: ["Seleccionar...", "Vivienda", "Restaurante / bar", "Comercio", "Oficina", "Otro"] },
      { id: "audio_zones", label: "Número aproximado de zonas o salas", type: "number", placeholder: "p. ej., 4" },
      { id: "audio_use", label: "Uso principal", type: "select", options: ["Seleccionar...", "Música multiroom", "Cine en casa", "Sonido ambiental", "No seguro"] },
    ],
  },
];
