import {
  getOrCreateSettings,
  getMembersByCompany,
  readJSON,
} from "@/lib/store";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const settings = getOrCreateSettings(companyId);
  const members = getMembersByCompany(companyId);
  const events = readJSON<
    Array<{ type: string; data: Record<string, unknown>; at: string }>
  >("events", [])
    .filter((e) => e.data?.companyId === companyId)
    .slice(0, 12);

  const activeCount = members.filter((m) => m.status === "active").length;
  const atRisk = members
    .filter((m) => m.status === "active" && m.healthScore < (settings.healthThreshold || 40))
    .sort((a, b) => a.healthScore - b.healthScore)
    .slice(0, 8);
  const avgHealth =
    members.length > 0
      ? Math.round(members.reduce((s, m) => s + m.healthScore, 0) / members.length)
      : 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-lg">
              CG
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                ChurnGuard
              </h1>
              <p className="text-zinc-400 text-sm">
                Automated onboarding & retention
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          <StatCard label="Members Tracked" value={String(members.length)} />
          <StatCard label="Active Now" value={String(activeCount)} />
          <StatCard
            label="Avg Health Score"
            value={members.length ? String(avgHealth) : "—"}
          />
          <StatCard
            label="Onboarding"
            value={settings.onboardingEnabled ? "ON" : "OFF"}
            highlight={settings.onboardingEnabled}
          />
        </div>

        {members.length === 0 && (
          <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-2">Waiting for members</h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-3">
              ChurnGuard is connected. When someone joins your community (or starts a
              membership), they will appear here automatically and the onboarding
              sequence will start.
            </p>
            <ul className="text-sm text-zinc-500 space-y-1 list-disc list-inside">
              <li>Webhook must be pointed to this app</li>
              <li>New joins trigger the welcome sequence</li>
              <li>Health scores update as activity is recorded</li>
            </ul>
          </section>
        )}

        {atRisk.length > 0 && (
          <section className="bg-zinc-900/80 border border-amber-900/40 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-1 text-amber-200">
              At-risk members
            </h2>
            <p className="text-sm text-zinc-400 mb-4">
              Health score below {settings.healthThreshold}. These are the people most
              likely to cancel soon.
            </p>
            <div className="space-y-2">
              {atRisk.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between bg-zinc-950/60 rounded-xl px-4 py-3 border border-zinc-800/50"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{m.id}</p>
                    <p className="text-xs text-zinc-500">
                      Last activity:{" "}
                      {new Date(m.lastActivityAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-amber-400 font-semibold text-sm shrink-0 ml-3">
                    {m.healthScore}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-1">Onboarding sequence</h2>
          <p className="text-sm text-zinc-400 mb-5">
            Sent automatically when a new member joins.
          </p>
          <div className="space-y-3">
            {settings.sequence.map((step, i) => (
              <div
                key={i}
                className="flex gap-4 items-start bg-zinc-950/60 rounded-xl p-4 border border-zinc-800/50"
              >
                <div className="shrink-0 w-16 text-center">
                  <div className="text-xs text-zinc-500">Step {i + 1}</div>
                  <div className="text-sm font-medium text-emerald-400">
                    {step.delayHours === 0 ? "Now" : `+${step.delayHours}h`}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs uppercase tracking-wider text-zinc-500 mb-1">
                    {step.type}
                  </div>
                  <p className="text-sm text-zinc-200 leading-relaxed">{step.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Recent activity</h2>
          {events.length === 0 ? (
            <p className="text-zinc-500 text-sm">
              No events yet. Activity will show here after members join or leave.
            </p>
          ) : (
            <ul className="space-y-2">
              {events.map((e, i) => (
                <li key={i} className="text-sm text-zinc-300 flex gap-3 flex-wrap">
                  <span className="text-zinc-600 shrink-0">
                    {new Date(e.at).toLocaleString()}
                  </span>
                  <span className="font-medium text-emerald-400/90">{e.type}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <p className="text-center text-xs text-zinc-600 mt-10">
          ChurnGuard · Runs automatically after installation
        </p>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      <p className="text-xs text-zinc-500 uppercase tracking-wider">{label}</p>
      <p
        className={`text-2xl font-semibold mt-1 ${
          highlight ? "text-emerald-400" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}