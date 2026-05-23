import type { ServiceKey } from "./services";
import type { ServiceDetail } from "./serviceDetails";

export const serviceDetailsEs: Partial<Record<ServiceKey, ServiceDetail>> = {
  telecom: {
    outcome: "Entrada de señal, handoff de operador y líneas preparadas para soporte.",
    activeLayer: "Telecom",
    activeLayerText: "Entrada de señal, handoff de operador, rack y líneas legibles para soporte.",
    heroTags: ["Señal", "Líneas", "Rack"],
    pathCards: [
      {
        index: "01 / Señal",
        title: "La necesidad se vuelve visible.",
        text: "Terminaciones, entrada de operador, estado del rack y líneas necesarias se aclaran antes del trabajo.",
      },
      {
        index: "02 / Sistema",
        title: "Las dependencias se mapean.",
        text: "Rutas, acceso, alimentación, red y ventanas del proveedor quedan conectadas en una ruta instalable.",
      },
      {
        index: "03 / Entrega",
        title: "El resultado queda mantenible.",
        text: "Etiquetas, notas prácticas y recomendaciones dejan la infraestructura de líneas legible después.",
      },
    ],
    quoteHints: ["entrada de operador", "ubicación de rack", "número de líneas", "acceso"],
    relatedServiceKeys: ["networks", "electricity", "ev"],
    scopeIntro:
      "El alcance de telecomunicaciones se confirma alrededor de entrada de señal, líneas, rack, tiempos de proveedor y soporte futuro.",
    faqIntro: "Respuestas breves antes de una solicitud de telecomunicaciones: proveedor, rack, equipos y entrega.",
  },
  networks: {
    outcome: "Cobertura, topología y puntos de acceso convertidos en una capa de red estable.",
    activeLayer: "Redes",
    activeLayerText: "Cobertura, topología, cableado y AP para Wi-Fi y LAN mantenibles.",
    heroTags: ["Cobertura", "Topología", "AP"],
    pathCards: [
      {
        index: "01 / Cobertura",
        title: "La necesidad se vuelve visible.",
        text: "Zonas débiles, densidad de uso, cableado existente y expectativas de dispositivos pasan a un brief práctico.",
      },
      {
        index: "02 / Topología",
        title: "Las dependencias se mapean.",
        text: "Rutas, switches, PoE, rack, handoff de telecom y restricciones de montaje se alinean antes de instalar.",
      },
      {
        index: "03 / Entrega",
        title: "El resultado queda mantenible.",
        text: "Etiquetas de puertos, posiciones de AP, notas de configuración y recomendaciones facilitan el soporte.",
      },
    ],
    quoteHints: ["superficie", "zonas sin cobertura", "cableado existente", "número de AP"],
    relatedServiceKeys: ["telecom", "alarms", "audio"],
    scopeIntro:
      "El alcance de red se confirma alrededor de cobertura, rutas de cable, PoE, número de AP, topología y soporte esperado.",
    faqIntro: "Respuestas breves antes de una solicitud de red: cobertura, equipos, cableado y documentación.",
  },
  electricity: {
    outcome: "Energía, control y cableado preparado para automatización como una capa mantenible.",
    activeLayer: "Energía + control",
    activeLayerText: "Cuadros, circuitos, cableado smart-ready y climatización con entrega clara.",
    heroTags: ["Energía", "Control", "Smart-ready"],
    pathCards: [
      {
        index: "01 / Energía",
        title: "La necesidad se vuelve visible.",
        text: "Estado del cuadro, nuevos circuitos, puntos de control y objetivos de automatización se hacen explícitos.",
      },
      {
        index: "02 / Control",
        title: "Las dependencias se mapean.",
        text: "Acceso al cuadro, rutas, protecciones, smart home y servicios conectados se revisan antes de empezar.",
      },
      {
        index: "03 / Entrega",
        title: "El resultado queda mantenible.",
        text: "Etiquetas, notas as-built y recomendaciones mantienen la capa eléctrica comprensible con el tiempo.",
      },
    ],
    quoteHints: ["acceso al cuadro", "circuitos", "automatización", "climatización"],
    relatedServiceKeys: ["ev", "networks", "alarms"],
    scopeIntro:
      "El alcance eléctrico se confirma alrededor de cuadro, circuitos, rutas, protecciones, smart home y futuras capas de servicio.",
    faqIntro: "Respuestas breves antes de una solicitud eléctrica: documentación, smart readiness y climatización.",
  },
  ev: {
    outcome: "Entrega de energía, protecciones y recorrido del cargador preparados para uso diario.",
    activeLayer: "Carga VE",
    activeLayerText: "Ubicación del cargador, ruta segura, protecciones y entrega para vivienda o negocio.",
    heroTags: ["Energía", "Protecciones", "Ruta"],
    pathCards: [
      {
        index: "01 / Energía",
        title: "La necesidad se vuelve visible.",
        text: "Parking, modelo de cargador, recorrido, distancia y uso esperado pasan a una solicitud instalable.",
      },
      {
        index: "02 / Seguridad",
        title: "Las dependencias se mapean.",
        text: "Capacidad del cuadro, protecciones, permisos, rutas y gestión de carga se aclaran antes de instalar.",
      },
      {
        index: "03 / Entrega",
        title: "El resultado queda mantenible.",
        text: "Puesta en marcha, notas básicas y as-built dejan el cargador listo para uso a largo plazo.",
      },
    ],
    quoteHints: ["tipo de parking", "modelo de cargador", "ruta de cable", "protecciones"],
    relatedServiceKeys: ["electricity", "networks", "telecom"],
    scopeIntro:
      "El alcance de carga VE se confirma alrededor de acceso, ubicación, recorrido, protecciones eléctricas y puesta en marcha.",
    faqIntro: "Respuestas breves antes de una solicitud VE: elección de cargador, parking y recorrido limpio.",
  },
  alarms: {
    outcome: "Perímetro, CCTV y seguridad preparada para monitorización planificados como un sistema.",
    activeLayer: "Seguridad",
    activeLayerText: "Zonas de alarma, cámaras, cableado limpio y entrega preparada para soporte.",
    heroTags: ["Perímetro", "CCTV", "Monitorización"],
    pathCards: [
      {
        index: "01 / Perímetro",
        title: "La necesidad se vuelve visible.",
        text: "Puertas, ventanas, zonas de movimiento, ángulos de cámara y objetivos de monitorización forman un mapa claro.",
      },
      {
        index: "02 / Cobertura",
        title: "Las dependencias se mapean.",
        text: "Energía, red, PoE, montaje, grabación, acceso por app y CRA se aclaran según el sitio.",
      },
      {
        index: "03 / Entrega",
        title: "El resultado queda mantenible.",
        text: "Zonas, etiquetas, notas de acceso y posiciones de dispositivos facilitan operación y mantenimiento.",
      },
    ],
    quoteHints: ["puertas y ventanas", "zonas", "cámaras", "proveedor CRA"],
    relatedServiceKeys: ["networks", "electricity", "telecom"],
    scopeIntro:
      "El alcance de seguridad se confirma alrededor de zonas, cámaras, rutas, grabación, monitorización y entrega.",
    faqIntro: "Respuestas breves antes de una solicitud de seguridad: Ajax, CRA, cámaras y capas conectadas.",
  },
  audio: {
    outcome: "Campo sonoro, zonas y cine en casa convertidos en un sistema limpio.",
    activeLayer: "Audio",
    activeLayerText: "Zonas, cableado, amplificación y control para sonido diario fiable.",
    heroTags: ["Sonido", "Zonas", "Cine en casa"],
    pathCards: [
      {
        index: "01 / Sonido",
        title: "La necesidad se vuelve visible.",
        text: "Salas, posiciones de escucha, zonas, usos y restricciones estéticas pasan a un brief de audio práctico.",
      },
      {
        index: "02 / Sistema",
        title: "Las dependencias se mapean.",
        text: "Altavoces, cableado, amplificación, control, red y energía se alinean antes de instalar.",
      },
      {
        index: "03 / Entrega",
        title: "El resultado queda mantenible.",
        text: "Etiquetas de zonas, notas de control y registro de equipos facilitan uso y ajustes posteriores.",
      },
    ],
    quoteHints: ["salas o zonas", "posición de altavoces", "equipos", "método de control"],
    relatedServiceKeys: ["networks", "electricity", "telecom"],
    scopeIntro:
      "El alcance de audio se confirma alrededor de zonas, uso de salas, altavoces, cableado, amplificación, control y acabado.",
    faqIntro: "Respuestas breves antes de una solicitud de audio: distribución, locales, cableado oculto y control diario.",
  },
};
