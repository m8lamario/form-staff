"use client";

import {
  ApplicationDTO,
  flagEntries,
  hasMediaConsent,
  roleDistribution,
} from "@/lib/applications";
import { REVOKE_LABELS, REVOCABLE_KEYS } from "@/lib/consent-copy";
import { roleLabel, STAFF_ROLES, type StaffRoleId } from "@/lib/staff";
import { useRouter } from "next/navigation";
import { Fragment, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CHART_COLORS = [
  "#00edaf",
  "#7af8d3",
  "#ffffff",
  "#6d8cff",
  "#00c48c",
  "#c9fff0",
  "#9fb4ff",
];

type AdminDashboardProps = {
  applications: ApplicationDTO[];
};

export function AdminDashboard({ applications }: AdminDashboardProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | StaffRoleId>("ALL");
  const [mediaFilter, setMediaFilter] = useState<"ALL" | "YES" | "NO">("ALL");
  const [openId, setOpenId] = useState<number | null>(null);
  const [legacyOnly, setLegacyOnly] = useState(false);
  const [bulkMessage, setBulkMessage] = useState("");

  const distribution = useMemo(
    () => roleDistribution(applications),
    [applications],
  );
  const returningCount = applications.filter((item) => item.participatedLastYear).length;
  const mediaCount = applications.filter((item) => hasMediaConsent(item)).length;
  const topRole = [...distribution].sort((a, b) => b.count - a.count)[0];

  const preV2 = applications.filter((item) => item.legacy);
  const reinformedCount = preV2.filter((item) => item.reinformed).length;
  const renewedCount = preV2.filter((item) => item.renewed).length;

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return applications.filter((item) => {
      if (legacyOnly && !item.legacy) return false;
      const matchesRole = roleFilter === "ALL" || item.role === roleFilter;
      const matchesMedia =
        mediaFilter === "ALL" ||
        (mediaFilter === "YES" && hasMediaConsent(item)) ||
        (mediaFilter === "NO" && !hasMediaConsent(item));
      const haystack = `${item.firstName} ${item.lastName} ${item.email} ${item.phone}`.toLowerCase();
      return matchesRole && matchesMedia && (!needle || haystack.includes(needle));
    });
  }, [applications, query, roleFilter, mediaFilter, legacyOnly]);

  async function sendUpdatedNotices() {
    const ids = filtered.filter((item) => item.legacy).map((item) => item.id);
    setBulkMessage("");
    if (ids.length === 0) {
      setBulkMessage("Nessuna candidatura pre-v2.0 nel filtro attuale.");
      return;
    }
    const response = await fetch("/api/admin/reinform", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    const payload = (await response.json()) as { sent?: number; error?: string };
    if (!response.ok) {
      setBulkMessage(payload.error ?? "Invio non riuscito.");
      return;
    }
    setBulkMessage(`Email accodate e inviate: ${payload.sent ?? 0} su ${ids.length}.`);
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/15 bg-white/5 p-5 text-sm text-white/80">
        <p>
          Candidature pre-v2.0: {preV2.length}. Reinformate: {reinformedCount}. Scelte rinnovate: {renewedCount}.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={legacyOnly} onChange={(event) => setLegacyOnly(event.target.checked)} />
            Candidature pre-v2.0
          </label>
          <button type="button" onClick={sendUpdatedNotices} className="rounded-2xl bg-mint px-3 py-2 font-semibold text-navy">
            Invia informativa aggiornata
          </button>
        </div>
        {bulkMessage ? <p className="mt-2">{bulkMessage}</p> : null}
      </section>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Totale risposte" value={applications.length} />
        <StatCard label="Già staff l'anno scorso" value={returningCount} />
        <StatCard
          label="Nuove candidature"
          value={applications.length - returningCount}
        />
        <StatCard
          label="Ruolo più richiesto"
          value={topRole?.count ? topRole.label : "—"}
        />
        <StatCard label="Consensi riprese" value={mediaCount} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <article className="rounded-3xl border border-white/15 bg-white/5 p-5">
          <h2 className="font-display text-2xl tracking-widest text-white uppercase">
            Distribuzione ruoli
          </h2>
          <p className="mt-1 text-sm text-white/70">
            Quante persone hanno scelto ciascun ruolo.
          </p>
          <div className="mt-6 h-80">
            {applications.length === 0 ? (
              <EmptyChart />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distribution} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.12)" vertical={false} />
                  <XAxis
                    dataKey="shortLabel"
                    tick={{ fill: "#ffffff", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fill: "#ffffff", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(0,237,175,0.08)" }}
                    contentStyle={tooltipStyle}
                    formatter={(value, _name, item) => [
                      value,
                      String(item?.payload?.label ?? "Ruolo"),
                    ]}
                  />
                  <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                    {distribution.map((entry, index) => (
                      <Cell
                        key={entry.id}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </article>

        <article className="rounded-3xl border border-white/15 bg-white/5 p-5">
          <h2 className="font-display text-2xl tracking-widest text-white uppercase">
            Quote per ruolo
          </h2>
          <p className="mt-1 text-sm text-white/70">
            Percentuale di preferenze su tutte le risposte.
          </p>
          <div className="mt-6 h-80">
            {applications.length === 0 ? (
              <EmptyChart />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribution.filter((item) => item.count > 0)}
                    dataKey="count"
                    nameKey="label"
                    innerRadius={58}
                    outerRadius={100}
                    paddingAngle={3}
                  >
                    {distribution
                      .filter((item) => item.count > 0)
                      .map((entry, index) => (
                        <Cell
                          key={entry.id}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend
                    wrapperStyle={{ color: "#ffffff", fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-white/15 bg-white/5 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display text-2xl tracking-widest text-white uppercase">
              Elenco risposte
            </h2>
            <p className="mt-1 text-sm text-white/70">
              {filtered.length} di {applications.length} candidature visibili
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cerca nome, email o telefono"
              className="w-full rounded-2xl border border-transparent bg-white px-4 py-3 text-navy outline-none focus:ring-2 focus:ring-mint sm:w-72"
            />
            <select
              value={roleFilter}
              onChange={(event) =>
                setRoleFilter(event.target.value as "ALL" | StaffRoleId)
              }
              className="rounded-2xl border border-transparent bg-white px-4 py-3 text-navy outline-none focus:ring-2 focus:ring-mint"
            >
              <option value="ALL">Tutti i ruoli</option>
              {STAFF_ROLES.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.label}
                </option>
              ))}
            </select>
            <select
              value={mediaFilter}
              onChange={(event) =>
                setMediaFilter(event.target.value as "ALL" | "YES" | "NO")
              }
              className="rounded-2xl border border-transparent bg-white px-4 py-3 text-navy outline-none focus:ring-2 focus:ring-mint"
            >
              <option value="ALL">Tutte le riprese</option>
              <option value="YES">Consenso riprese: sì</option>
              <option value="NO">Niente riprese</option>
            </select>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm text-white">
            <thead>
              <tr className="border-b border-white/15 text-xs uppercase tracking-[0.18em] text-mint">
                <th className="px-3 py-3 font-medium">Nome</th>
                <th className="px-3 py-3 font-medium">Cognome</th>
                <th className="px-3 py-3 font-medium">Telefono</th>
                <th className="px-3 py-3 font-medium">Email</th>
                <th className="px-3 py-3 font-medium">Anno scorso</th>
                <th className="px-3 py-3 font-medium">Ruolo</th>
                <th className="px-3 py-3 font-medium">Privacy</th>
                <th className="px-3 py-3 font-medium">Stato</th>
                <th className="px-3 py-3 font-medium">Data</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-3 py-10 text-center text-white/70">
                    Nessuna candidatura da mostrare.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <Fragment key={item.id}>
                  <tr className="border-b border-white/10">
                    <td className="px-3 py-3">{item.firstName}</td>
                    <td className="px-3 py-3">{item.lastName}</td>
                    <td className="px-3 py-3">{item.phone}</td>
                    <td className="px-3 py-3">{item.email}</td>
                    <td className="px-3 py-3">
                      {item.participatedLastYear ? "Sì" : "No"}
                    </td>
                    <td className="px-3 py-3">{roleLabel(item.role)}</td>
                    <td className="px-3 py-3">
                      {item.privacyConsent ? "Sì" : "No"}
                    </td>
                    <td className="px-3 py-3">
                      <StatusCell item={item} />
                      <button
                        type="button"
                        onClick={() => setOpenId((current) => (current === item.id ? null : item.id))}
                        className="mt-2 text-xs uppercase tracking-wide text-mint"
                      >
                        {openId === item.id ? "Chiudi" : "Dettaglio"}
                      </button>
                    </td>
                    <td className="px-3 py-3">
                      {new Date(item.createdAt).toLocaleString("it-IT")}
                    </td>
                  </tr>
                  {openId === item.id ? (
                    <tr className="border-b border-white/10">
                      <td colSpan={9} className="px-3 py-4">
                        <ApplicationEditor item={item} onDone={() => router.refresh()} />
                      </td>
                    </tr>
                  ) : null}
                  </Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatusCell({ item }: { item: ApplicationDTO }) {
  return (
    <div className="flex max-w-xs flex-wrap gap-1">
      {item.pendingGuardian ? <Chip>In attesa del genitore</Chip> : null}
      {item.pendingOtherGuardian ? <Chip>In attesa dell&apos;altro genitore</Chip> : null}
      {item.legacyMediaLabel ? <Chip>{item.legacyMediaLabel}</Chip> : null}
      {item.legacy ? <Chip>Testi {item.policyVersion}</Chip> : null}
      {item.reinformed ? <Chip>Reinformata</Chip> : null}
      {item.renewed ? <Chip>Scelte rinnovate</Chip> : null}
      {item.lastEmail ? <Chip>Email {emailStatusLabel(item.lastEmail.status)}</Chip> : null}
      {!item.legacy
        ? flagEntries(item.flags).map((flag) => (
            <Chip key={flag.key}>
              {flag.label}: {flag.active ? "sì" : "no"}
            </Chip>
          ))
        : null}
      {item.applicationStatus ? <Chip>{statusLabel(item.applicationStatus)}</Chip> : null}
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/20 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/80">
      {children}
    </span>
  );
}

function emailStatusLabel(status: string) {
  if (status === "queued") return "in coda";
  if (status === "sent") return "inviata";
  if (status === "error") return "errore";
  return status;
}

function statusLabel(status: string) {
  if (status === "pending_guardian") return "In attesa";
  if (status === "submitted") return "Inviata";
  if (status === "accepted") return "Accettata";
  if (status === "rejected") return "Non accolta";
  return status;
}

function ApplicationEditor({ item, onDone }: { item: ApplicationDTO; onDone: () => void }) {
  const [note, setNote] = useState("");
  const [key, setKey] = useState<string>(REVOCABLE_KEYS[0]);
  const [role, setRole] = useState<StaffRoleId>(item.role);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function send(body: Record<string, unknown>) {
    setPending(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/applications/${item.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(payload.error ?? "Operazione non riuscita.");
        return;
      }
      onDone();
    } catch {
      setError("Connessione non disponibile.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-3 text-sm text-white/80">
      {item.birthDate ? <p>Data di nascita: {item.birthDate}. Fascia: {item.ageBand === "minor16_17" ? "16-17 anni" : item.ageBand === "adult" ? "maggiorenne" : "—"}.</p> : null}
      {item.guardianName ? <p>Genitore di contatto: {item.guardianName}, {item.guardianEmail}, {item.guardianPhone}.</p> : null}
      {item.secondGuardianName ? <p>Altro genitore: {item.secondGuardianName}, {item.secondGuardianEmail}.</p> : null}
      {item.legacyRightsNote ? <p>{item.legacyRightsNote}</p> : null}
      {item.lastEmail ? (
        <p>
          Ultimo invio ({item.lastEmail.kind}): {emailStatusLabel(item.lastEmail.status)}
          {item.lastEmail.error ? ` — ${item.lastEmail.error}` : ""}.
        </p>
      ) : null}
      {item.blockers.map((blocker) => (
        <p key={blocker} className="text-mint">{blocker}</p>
      ))}
      {item.legacy ? (
        <div className="space-y-2">
          <p>Candidatura precedente: resta legata ai testi già accettati e non si modifica da qui.</p>
          <button type="button" disabled={pending} onClick={() => send({ action: "reinform" })} className="rounded-2xl border border-white/20 px-3 py-2">
            Invia informativa aggiornata
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
          <label className="block">
            Ruolo assegnabile
            <select value={role} onChange={(event) => setRole(event.target.value as StaffRoleId)} className="mt-1 block rounded-2xl bg-white px-3 py-2 text-navy">
              {STAFF_ROLES.map((staffRole) => (
                <option key={staffRole.id} value={staffRole.id}>{staffRole.label}</option>
              ))}
            </select>
          </label>
          <button type="button" disabled={pending} onClick={() => send({ action: "role", role })} className="rounded-2xl border border-white/20 px-3 py-2">Salva ruolo</button>
          <button type="button" disabled={pending || item.blockers.length > 0} onClick={() => send({ action: "accept" })} className="rounded-2xl bg-mint px-3 py-2 font-semibold text-navy disabled:opacity-50">Accetta</button>
          <button type="button" disabled={pending} onClick={() => send({ action: "reject" })} className="rounded-2xl border border-white/20 px-3 py-2">Non accogliere</button>
          {item.pendingGuardian ? (
            <button type="button" disabled={pending} onClick={() => send({ action: "resend_guardian" })} className="rounded-2xl border border-white/20 px-3 py-2">
              Reinvia email al genitore
            </button>
          ) : null}
        </div>
      )}
      {!item.legacy ? (
        <div className="flex flex-col gap-2 lg:flex-row lg:items-end">
          <label className="block">
            Registra revoca
            <select value={key} onChange={(event) => setKey(event.target.value)} className="mt-1 block rounded-2xl bg-white px-3 py-2 text-navy">
              {REVOCABLE_KEYS.map((consentKey) => (
                <option key={consentKey} value={consentKey}>{REVOKE_LABELS[consentKey]}</option>
              ))}
            </select>
          </label>
          <label className="block min-w-64 flex-1">
            Nota
            <input value={note} onChange={(event) => setNote(event.target.value)} className="mt-1 w-full rounded-2xl bg-white px-3 py-2 text-navy" />
          </label>
          <button type="button" disabled={pending} onClick={() => send({ action: "revoke", key, note })} className="rounded-2xl border border-white/20 px-3 py-2">Registra revoca</button>
        </div>
      ) : null}
      {!item.legacy && key === "rightsAssignment" ? (
        <p>La cessione dei diritti non è revocabile per i contenuti già realizzati.</p>
      ) : null}
      {error ? <p className="text-mint">{error}</p> : null}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <article className="rounded-3xl border border-white/15 bg-white/5 p-5">
      <p className="text-xs uppercase tracking-[0.22em] text-mint">{label}</p>
      <p className="mt-3 font-display text-3xl text-white">{value}</p>
    </article>
  );
}

function EmptyChart() {
  return (
    <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/20 text-sm text-white/70">
      Ancora nessuna risposta da rappresentare.
    </div>
  );
}

const tooltipStyle = {
  backgroundColor: "#011674",
  border: "1px solid rgba(0,237,175,0.5)",
  borderRadius: 16,
  color: "#ffffff",
};
