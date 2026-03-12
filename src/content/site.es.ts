// src/content/site.es.ts
import { site } from "./site";

export const siteEs = {
  ...site,
  tagline: "Instalaciones de ingeniería premium",
  contact: {
    ...site.contact,
    serviceArea: "Barcelona y alrededores",
  },
  trustBadges: [
    { title: "Entrega limpia", note: "Instalación ordenada y mantenible" },
    { title: "Documentación", note: "Notas prácticas de entrega" },
    { title: "Alcance claro", note: "Sin exageraciones" },
  ],
  processSteps: [
    { title: "Visita", note: "Alcance, limitaciones, condiciones del sitio" },
    { title: "Propuesta", note: "Plan + calendario + materiales" },
    { title: "Instalación", note: "Ejecución limpia, etiquetada, probada" },
    { title: "Soporte", note: "Documentación + seguimiento" },
  ],
};
