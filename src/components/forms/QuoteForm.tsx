// src/components/forms/QuoteForm.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import type { QuoteField, Service, ServiceKey } from "../../content/services";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

type Props = {
  services: Service[];
  endpoint?: string;
  commonFields?: QuoteField[];
  defaultServiceKey?: ServiceKey;
  fallbackEmail?: string;
  fallbackSubject?: string;
};

function normalizeFields(fields: QuoteField[]) {
  return (fields ?? []).filter((f) => f && typeof f.id === "string" && f.id.trim().length > 0);
}

function isPlaceholderOption(s: string) {
  const t = String(s ?? "").trim().toLowerCase();
  return t === "" || t === "—" || t.includes("select") || t.includes("seleccion") || t.includes("elige");
}

function defaultValueForField(f: QuoteField) {
  if (f.type === "select") {
    const first = f.options?.[0] ?? "";
    return isPlaceholderOption(first) ? "" : first;
  }
  return "";
}

function getServiceKeyFromUrl(services: Service[]): ServiceKey | undefined {
  if (typeof window === "undefined") return undefined;
  const raw = new URLSearchParams(window.location.search).get("service");
  if (!raw) return undefined;
  const hit = services.find((s) => s.key === raw);
  return hit?.key;
}

function isConfiguredEndpoint(endpoint?: string) {
  return Boolean(endpoint && endpoint.trim().length > 0);
}

export default function QuoteForm({
  services,
  endpoint,
  commonFields,
  defaultServiceKey,
  fallbackEmail,
  fallbackSubject,
}: Props) {
  const safeCommon = useMemo(() => normalizeFields(commonFields ?? []), [commonFields]);

  // Якщо сервісів немає — краще не падати
  if (!services || services.length === 0) return null;

  // initial: НЕ читаємо URL тут (щоб уникнути hydration mismatch в Astro)
  // ?service= буде застосовано в useEffect нижче після гідрації / після swap
  const initialServiceKey =
    defaultServiceKey || services[0]?.key || ("telecom" as ServiceKey);

  const [serviceKey, setServiceKey] = useState<ServiceKey>(initialServiceKey);

  const service = useMemo(() => {
    return services.find((s) => s.key === serviceKey) || services[0];
  }, [services, serviceKey]);

  const extra = useMemo(() => normalizeFields(service?.extraQuoteFields ?? []), [service]);
  const activeFields = useMemo(() => normalizeFields([...safeCommon, ...extra]), [safeCommon, extra]);

  // Honeypot (має залишатися порожнім)
  const [hp, setHp] = useState("");

  const [values, setValues] = useState<Record<string, string>>(() => {
    const seed: Record<string, string> = {};
    const initialExtra = services.find((s) => s.key === initialServiceKey)?.extraQuoteFields ?? [];
    for (const f of normalizeFields([...(commonFields ?? []), ...initialExtra])) {
      seed[f.id] = defaultValueForField(f);
    }
    return seed;
  });

  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function ensureFieldDefaults(nextServiceKey: ServiceKey) {
    const nextService = services.find((s) => s.key === nextServiceKey);
    const nextExtra = normalizeFields(nextService?.extraQuoteFields ?? []);
    const nextAll = normalizeFields([...(commonFields ?? []), ...nextExtra]);

    setValues((prev) => {
      let changed = false;
      const out: Record<string, string> = { ...prev };
      for (const f of nextAll) {
        if (typeof out[f.id] === "undefined") {
          out[f.id] = defaultValueForField(f);
          changed = true;
        }
      }
      return changed ? out : prev;
    });
  }

  function update(id: string, v: string) {
    setValues((p) => ({ ...p, [id]: v }));
  }

  // Тримаємо актуальний serviceKey для listener'ів
  const serviceKeyRef = useRef<ServiceKey>(serviceKey);
  useEffect(() => {
    serviceKeyRef.current = serviceKey;
  }, [serviceKey]);

  // Після view-transitions / swap — зчитати ?service= і синхронізувати форму
  useEffect(() => {
    if (typeof window === "undefined") return;

    const applyFromUrl = () => {
      const fromUrl = getServiceKeyFromUrl(services);
      if (!fromUrl) return;
      if (fromUrl === serviceKeyRef.current) return;

      setServiceKey(fromUrl);
      ensureFieldDefaults(fromUrl);
    };

    applyFromUrl();

    window.addEventListener("popstate", applyFromUrl);
    document.addEventListener("astro:after-swap", applyFromUrl as any);
    document.addEventListener("astro:page-load", applyFromUrl as any);

    return () => {
      window.removeEventListener("popstate", applyFromUrl);
      document.removeEventListener("astro:after-swap", applyFromUrl as any);
      document.removeEventListener("astro:page-load", applyFromUrl as any);
    };
  }, [services, commonFields]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Honeypot: якщо заповнили — просто “тихо” приймаємо і нічого не відправляємо
    if (hp.trim().length > 0) {
      setStatus({ kind: "sent" });
      return;
    }

    setStatus({ kind: "sending" });

    const payload: Record<string, string> = {
      service: service?.key || serviceKey,
      service_title: service?.title || String(serviceKey),
      source: "arcwave-site",
      hp, // хай іде в payload (на випадок якщо endpoint захоче перевіряти)
    };

    for (const f of activeFields) {
      payload[f.id] = values[f.id] ?? "";
    }

    const configured = isConfiguredEndpoint(endpoint);

    try {
      if (!configured) {
        const to = fallbackEmail || "hello@example.com";
        const subject = fallbackSubject || "ARCWAVE Integrations — quote request";
        const lines = Object.entries(payload)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n");

        const href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
          lines
        )}`;

        window.location.href = href;
        setStatus({ kind: "sent" });
        return;
      }

      const res = await fetch(endpoint!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      setStatus({ kind: "sent" });
    } catch (err: any) {
      setStatus({ kind: "error", message: err?.message || "Something went wrong" });
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {/* Honeypot (hidden) */}
      <div className="hp" aria-hidden="true">
        <label>
          <span>Company</span>
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
        </label>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        <div>
          <label className="k">Service</label>
          <select
            className="in"
            value={serviceKey}
            onChange={(e) => {
              const next = e.target.value as ServiceKey;
              setServiceKey(next);
              ensureFieldDefaults(next);
            }}
          >
            {services.map((s) => (
              <option key={s.key} value={s.key}>
                {s.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid2">
          {activeFields.map((f) => {
            const val = values[f.id] ?? "";

            if (f.type === "textarea") {
              return (
                <div key={f.id} className="field full">
                  <label className="k">{f.label}</label>
                  <textarea
                    className="in"
                    placeholder={f.placeholder}
                    value={val}
                    required={Boolean(f.required)}
                    onChange={(e) => update(f.id, e.target.value)}
                    rows={5}
                  />
                </div>
              );
            }

            if (f.type === "select") {
              const first = f.options?.[0] ?? "";
              const hasPlaceholder = isPlaceholderOption(first);
              const rest = hasPlaceholder ? f.options.slice(1) : f.options;

              return (
                <div key={f.id} className="field">
                  <label className="k">{f.label}</label>
                  <select
                    className="in"
                    value={val}
                    required={Boolean(f.required)}
                    onChange={(e) => update(f.id, e.target.value)}
                  >
                    {hasPlaceholder ? (
                      <option value="" disabled>
                        {first}
                      </option>
                    ) : null}

                    {rest.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            return (
              <div key={f.id} className="field">
                <label className="k">{f.label}</label>
                <input
                  className="in"
                  type={f.type}
                  inputMode={f.type === "number" ? "numeric" : undefined}
                  placeholder={f.placeholder}
                  value={val}
                  required={Boolean(f.required)}
                  onChange={(e) => update(f.id, e.target.value)}
                />
              </div>
            );
          })}
        </div>

        {!isConfiguredEndpoint(endpoint) ? (
          <div className="muted">Endpoint isn’t configured — submit will create a draft instead (copy or open email).</div>
        ) : null}

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button className="btn primary" type="submit" disabled={status.kind === "sending"}>
            {isConfiguredEndpoint(endpoint) ? "Send request" : "Create draft"}
          </button>

          {status.kind === "sent" ? <div className="ok">Sent.</div> : null}
          {status.kind === "error" ? <div className="err">{status.message}</div> : null}
        </div>
      </div>

      <style>{`
        .hp{
          position:absolute;
          left:-10000px;
          top:auto;
          width:1px;
          height:1px;
          overflow:hidden;
        }

        .k{
          display:block;
          margin-bottom:6px;
          font-size:12px;
          letter-spacing:.16em;
          text-transform:uppercase;
          color: var(--muted);
        }
        .in{
          width:100%;
          padding: 12px 14px;
          border-radius: 14px;
          border:1px solid var(--border2);
          background: rgba(255,255,255,.65);
          outline:none;
        }
        .grid2{
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .field.full{ grid-column: 1 / -1; }
        .muted{ font-size: 12px; color: var(--muted); }
        .ok{ font-size: 13px; color: var(--text); }
        .err{ font-size: 13px; color: #b00020; }
        @media (max-width: 780px){
          .grid2{ grid-template-columns: 1fr; }
        }
      `}</style>
    </form>
  );
}
