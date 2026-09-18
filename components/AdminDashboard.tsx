"use client";

import { ApplicationDTO, roleDistribution } from "@/lib/applications";
import { roleLabel, STAFF_ROLES, type StaffRoleId } from "@/lib/staff";
import { useMemo, useState } from "react";
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
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | StaffRoleId>("ALL");

  const distribution = useMemo(
    () => roleDistribution(applications),
    [applications],
  );
  const returningCount = applications.filter((item) => item.participatedLastYear).length;
  const mediaCount = applications.filter((item) => item.mediaConsent).length;
  const topRole = [...distribution].sort((a, b) => b.count - a.count)[0];

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return applications.filter((item) => {
      const matchesRole = roleFilter === "ALL" || item.role === roleFilter;
      const haystack = `${item.firstName} ${item.lastName} ${item.email} ${item.phone}`.toLowerCase();
      return matchesRole && (!needle || haystack.includes(needle));
    });
  }, [applications, query, roleFilter]);

  return (
    <div className="space-y-8">
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
                <th className="px-3 py-3 font-medium">Riprese</th>
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
                  <tr key={item.id} className="border-b border-white/10">
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
                      {item.mediaConsent ? "Sì" : "No"}
                    </td>
                    <td className="px-3 py-3">
                      {new Date(item.createdAt).toLocaleString("it-IT")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
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
