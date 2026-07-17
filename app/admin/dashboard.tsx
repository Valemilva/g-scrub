"use client";

import type { GA4Data } from "@/lib/ga4";

function StatTile({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-[14px] border border-[rgba(17,17,17,0.09)] bg-white p-5">
      <p className="m-0 text-[11.5px] font-extrabold tracking-[0.1em] text-body-2 uppercase">
        {label}
      </p>
      <p className="m-0 mt-1.5 font-heading text-[30px] font-black tracking-[-0.02em] text-ink">
        {value}
      </p>
      {sub && <p className="m-0 mt-0.5 text-[13px] text-body-2">{sub}</p>}
    </div>
  );
}

function Sparkline({ data }: { data: { date: string; users: number }[] }) {
  if (data.length === 0) return null;
  const w = 560;
  const h = 90;
  const max = Math.max(1, ...data.map((d) => d.users));
  const step = data.length > 1 ? w / (data.length - 1) : 0;
  const pts = data
    .map((d, i) => `${i * step},${h - (d.users / max) * (h - 8) - 4}`)
    .join(" ");
  const area = `0,${h} ${pts} ${w},${h}`;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-[90px] w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label="Daily active users, last 14 days"
    >
      <polygon points={area} fill="rgba(42,140,42,0.10)" />
      <polyline
        points={pts}
        fill="none"
        stroke="#2A8C2A"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default function Dashboard({
  data,
  configured,
}: {
  data: GA4Data | null;
  configured: boolean;
}) {
  async function signOut() {
    await fetch("/api/admin-login", { method: "DELETE" });
    window.location.reload();
  }

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[900px] px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="m-0 text-[11.5px] font-extrabold tracking-[0.14em] text-green-primary uppercase">
              G-SCRUB Admin
            </p>
            <h1 className="m-0 font-heading text-[26px] font-black tracking-[-0.02em] text-ink">
              Traffic &amp; Amazon clicks
            </h1>
            <p className="m-0 mt-1 text-[13px] text-body-2">Last 30 days · GA4</p>
          </div>
          <button
            onClick={signOut}
            className="rounded-full border border-[rgba(17,17,17,0.18)] px-4 py-2 text-[13px] font-semibold text-body hover:border-green-primary hover:text-green-primary"
          >
            Sign out
          </button>
        </div>

        {!configured ? (
          <SetupNotice
            title="Connect Google Analytics"
            body="Set GOOGLE_ANALYTICS_CREDENTIALS in Vercel (the service-account JSON, granted Viewer access to the G-SCRUB GA4 property) to see live traffic here."
          />
        ) : !data ? (
          <SetupNotice
            title="Couldn’t reach GA4"
            body="Credentials are set but the report failed — the service account may not have access to property 545017055, or the value is malformed. Check the deployment logs."
          />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatTile
                label="Users · 7d"
                value={data.activeUsers7d.toLocaleString()}
              />
              <StatTile
                label="Users · 30d"
                value={data.activeUsers30d.toLocaleString()}
                sub={`${data.sessions30d.toLocaleString()} sessions`}
              />
              <StatTile
                label="New · 30d"
                value={data.newUsers30d.toLocaleString()}
              />
              <StatTile
                label="Amazon clicks · 30d"
                value={data.amazonClicks30d.toLocaleString()}
              />
            </div>

            <section className="mt-4 rounded-[14px] border border-[rgba(17,17,17,0.09)] bg-white p-5">
              <p className="m-0 mb-3 text-[11.5px] font-extrabold tracking-[0.1em] text-body-2 uppercase">
                Daily active users · 14d
              </p>
              <Sparkline data={data.dailyUsers} />
            </section>

            <section className="mt-4 rounded-[14px] border border-[rgba(17,17,17,0.09)] bg-white p-5">
              <h2 className="m-0 mb-1 font-heading text-[16px] font-extrabold text-ink">
                Channels
              </h2>
              <p className="m-0 mb-4 text-[13px] text-body-2">
                Sessions and “Buy on Amazon” clicks by traffic source.
              </p>
              {data.sources.length === 0 ? (
                <p className="m-0 text-[14px] text-body-2">No sessions yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-[14px]">
                    <thead>
                      <tr className="border-b border-[rgba(17,17,17,0.1)] text-left text-[12px] font-extrabold tracking-[0.06em] text-body-2 uppercase">
                        <th className="py-2 pr-3">Source</th>
                        <th className="py-2 pr-3 text-right">Sessions</th>
                        <th className="py-2 pr-3 text-right">Amazon clicks</th>
                        <th className="py-2 text-right">Click rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.sources.map((s) => {
                        const rate =
                          s.sessions > 0
                            ? Math.round((s.amazonClicks / s.sessions) * 100)
                            : 0;
                        return (
                          <tr
                            key={s.source}
                            className="border-b border-[rgba(17,17,17,0.06)]"
                          >
                            <td className="py-2 pr-3 font-medium text-ink">
                              {s.source}
                            </td>
                            <td className="py-2 pr-3 text-right text-body">
                              {s.sessions.toLocaleString()}
                            </td>
                            <td className="py-2 pr-3 text-right text-body">
                              {s.amazonClicks.toLocaleString()}
                            </td>
                            <td className="py-2 text-right font-semibold text-green-primary">
                              {s.amazonClicks > 0 ? `${rate}%` : "—"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section className="mt-4 rounded-[14px] border border-[rgba(17,17,17,0.09)] bg-white p-5">
              <h2 className="m-0 mb-4 font-heading text-[16px] font-extrabold text-ink">
                Top pages
              </h2>
              {data.topPages.length === 0 ? (
                <p className="m-0 text-[14px] text-body-2">No views yet.</p>
              ) : (
                <ul className="m-0 list-none space-y-1.5 p-0">
                  {data.topPages.map((p) => (
                    <li
                      key={p.path}
                      className="flex items-center justify-between gap-4 text-[14px]"
                    >
                      <span className="truncate text-body">{p.path}</span>
                      <span className="shrink-0 font-semibold text-ink">
                        {p.views.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}

function SetupNotice({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[14px] border border-dashed border-[rgba(17,17,17,0.2)] bg-bg-alt px-6 py-10 text-center">
      <h2 className="m-0 mb-2 font-heading text-[18px] font-extrabold text-ink">
        {title}
      </h2>
      <p className="mx-auto m-0 max-w-[460px] text-[14.5px] leading-[1.6] text-body-2">
        {body}
      </p>
    </div>
  );
}
