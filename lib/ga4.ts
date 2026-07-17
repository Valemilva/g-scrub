/**
 * GA4 Data API helper — server-only (uses service-account credentials).
 *
 * Requires env var GOOGLE_ANALYTICS_CREDENTIALS: the full service-account key
 * JSON, stringified. The service account must be granted Viewer access to the
 * G-SCRUB GA4 property (545017055) under the valentinlopez2007 GA account.
 *
 * The credential parsing mirrors the Viaja Bonita helper, which learned the
 * hard way that Vercel can store raw newlines inside the private_key string.
 */

import { BetaAnalyticsDataClient } from "@google-analytics/data";

// GA4 property "G-SCRUB" (Measurement ID G-R1FMKHEDGH).
const GA4_PROPERTY = "properties/545017055";

export interface GA4Source {
  source: string;
  sessions: number;
  amazonClicks: number;
}
export interface GA4Page {
  path: string;
  title: string;
  views: number;
}
export interface GA4DailyUsers {
  date: string; // YYYYMMDD
  users: number;
}

export interface GA4Data {
  activeUsers7d: number;
  activeUsers30d: number;
  newUsers30d: number;
  sessions30d: number;
  amazonClicks30d: number;
  dailyUsers: GA4DailyUsers[]; // last 14 days
  sources: GA4Source[]; // sessions + Amazon clicks by session source
  topPages: GA4Page[];
}

function makeClient(): BetaAnalyticsDataClient | null {
  const raw = process.env.GOOGLE_ANALYTICS_CREDENTIALS;
  if (!raw) return null;

  let clientEmail: string | undefined;
  let privateKey: string | undefined;

  // 1) Straight parse (env stored correctly).
  try {
    const c = JSON.parse(raw) as { client_email: string; private_key: string };
    clientEmail = c.client_email;
    privateKey = c.private_key;
  } catch {
    // 2) Escape literal newlines inside JSON string values, then parse — Vercel
    //    can store raw 0x0A bytes inside private_key, breaking JSON.parse.
    try {
      const sanitized = raw.replace(/("(?:[^"\\]|\\.)*")/g, (str) =>
        str.replace(/\r\n/g, "\\n").replace(/\r/g, "\\n").replace(/\n/g, "\\n"),
      );
      const c = JSON.parse(sanitized) as {
        client_email: string;
        private_key: string;
      };
      clientEmail = c.client_email;
      privateKey = c.private_key;
    } catch {
      // 3) Last resort — regex the two fields out directly.
      const emailM = raw.match(/"client_email"\s*:\s*"([^"]+)"/);
      const keyM = raw.match(
        /"private_key"\s*:\s*"(-----BEGIN[\s\S]+?-----)\s*"[\s,\n}]/,
      );
      if (emailM?.[1] && keyM?.[1]) {
        clientEmail = emailM[1];
        privateKey = keyM[1];
      } else {
        console.error("[GA4] Cannot parse GOOGLE_ANALYTICS_CREDENTIALS.");
        return null;
      }
    }
  }

  if (!clientEmail || !privateKey) return null;

  // \\n escape sequences → real newlines for the crypto layer.
  const normalizedKey = privateKey.replace(/\\n/g, "\n");
  try {
    return new BetaAnalyticsDataClient({
      credentials: { client_email: clientEmail, private_key: normalizedKey },
    });
  } catch (err) {
    console.error(
      "[GA4] client init error:",
      err instanceof Error ? err.message : String(err),
    );
    return null;
  }
}

/** True when GA4 credentials are present (used to show a setup hint instead). */
export function ga4Configured(): boolean {
  return !!process.env.GOOGLE_ANALYTICS_CREDENTIALS;
}

const int = (v: string | null | undefined) => parseInt(v ?? "0", 10);

export async function fetchGA4Data(): Promise<GA4Data | null> {
  const client = makeClient();
  if (!client) return null;

  const range = { startDate: "30daysAgo", endDate: "today" };

  try {
    const [
      users7dRes,
      users30dRes,
      engagementRes,
      dailyUsersRes,
      sessionsBySourceRes,
      amazonBySourceRes,
      topPagesRes,
    ] = await Promise.all([
      client.runReport({
        property: GA4_PROPERTY,
        metrics: [{ name: "activeUsers" }],
        dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      }),
      client.runReport({
        property: GA4_PROPERTY,
        metrics: [{ name: "activeUsers" }, { name: "sessions" }],
        dateRanges: [range],
      }),
      client.runReport({
        property: GA4_PROPERTY,
        metrics: [{ name: "newUsers" }],
        dateRanges: [range],
      }),
      client.runReport({
        property: GA4_PROPERTY,
        dimensions: [{ name: "date" }],
        metrics: [{ name: "activeUsers" }],
        dateRanges: [{ startDate: "13daysAgo", endDate: "today" }],
        orderBys: [{ dimension: { dimensionName: "date" }, desc: false }],
      }),
      // Sessions by session source (tiktok / instagram / google / blog / ...).
      client.runReport({
        property: GA4_PROPERTY,
        dimensions: [{ name: "sessionSource" }],
        metrics: [{ name: "sessions" }],
        dateRanges: [range],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 25,
      }),
      // "Buy on Amazon" clicks by source. Enhanced measurement logs an outbound
      // `click` event with linkUrl; we count those pointing at amazon.com, split
      // by the session source that drove them.
      client.runReport({
        property: GA4_PROPERTY,
        dimensions: [{ name: "sessionSource" }, { name: "linkUrl" }],
        metrics: [{ name: "eventCount" }],
        dateRanges: [range],
        dimensionFilter: {
          andGroup: {
            expressions: [
              {
                filter: {
                  fieldName: "eventName",
                  stringFilter: { matchType: "EXACT", value: "click" },
                },
              },
              {
                filter: {
                  fieldName: "linkUrl",
                  stringFilter: {
                    matchType: "CONTAINS",
                    value: "amazon.",
                    caseSensitive: false,
                  },
                },
              },
            ],
          },
        },
        limit: 100,
      }),
      client.runReport({
        property: GA4_PROPERTY,
        dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
        metrics: [{ name: "screenPageViews" }],
        dateRanges: [range],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 12,
      }),
    ]);

    const activeUsers7d = int(users7dRes[0].rows?.[0]?.metricValues?.[0]?.value);
    const activeUsers30d = int(
      users30dRes[0].rows?.[0]?.metricValues?.[0]?.value,
    );
    const sessions30d = int(users30dRes[0].rows?.[0]?.metricValues?.[1]?.value);
    const newUsers30d = int(
      engagementRes[0].rows?.[0]?.metricValues?.[0]?.value,
    );

    const dailyUsers: GA4DailyUsers[] = (dailyUsersRes[0].rows ?? []).map(
      (r) => ({
        date: r.dimensionValues?.[0]?.value ?? "",
        users: int(r.metricValues?.[0]?.value),
      }),
    );

    // Fold the amazon-click report (source × linkUrl) down to clicks per source.
    const amazonBySource = new Map<string, number>();
    let amazonClicks30d = 0;
    for (const r of amazonBySourceRes[0].rows ?? []) {
      const src = r.dimensionValues?.[0]?.value ?? "(direct)";
      const n = int(r.metricValues?.[0]?.value);
      amazonBySource.set(src, (amazonBySource.get(src) ?? 0) + n);
      amazonClicks30d += n;
    }

    const sources: GA4Source[] = (sessionsBySourceRes[0].rows ?? []).map(
      (r) => {
        const source = r.dimensionValues?.[0]?.value ?? "(direct)";
        return {
          source,
          sessions: int(r.metricValues?.[0]?.value),
          amazonClicks: amazonBySource.get(source) ?? 0,
        };
      },
    );

    const topPages: GA4Page[] = (topPagesRes[0].rows ?? []).map((r) => ({
      path: r.dimensionValues?.[0]?.value ?? "—",
      title: r.dimensionValues?.[1]?.value ?? "—",
      views: int(r.metricValues?.[0]?.value),
    }));

    return {
      activeUsers7d,
      activeUsers30d,
      newUsers30d,
      sessions30d,
      amazonClicks30d,
      dailyUsers,
      sources,
      topPages,
    };
  } catch (err) {
    console.error("[GA4] fetchGA4Data error:", err);
    return null;
  }
}
