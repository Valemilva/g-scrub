import { NextResponse } from "next/server";

// Email capture endpoint. Adds a subscriber to the G-SCRUB Resend audience.
// The API key is read server-side only, so it never reaches the browser.
//
// Requires two env vars (set in Vercel):
//   RESEND_API_KEY       — a Resend API key (secret)
//   RESEND_AUDIENCE_ID   — the "G-SCRUB Launch List" audience id
// Until BOTH are set this route returns 503 and the form tells the visitor to
// email us directly — it never reports a false success (that was the old bug).

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email: unknown;
  let source: unknown;
  try {
    const body = await request.json();
    email = body?.email;
    source = body?.source;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  // These are pasted into Vercel by hand, so a value can pick up stray
  // whitespace or even a copied emoji (a non-Latin1 char in the Authorization
  // header throws a TypeError). Extract the well-formed token/UUID defensively
  // so a messy paste degrades to a clean 503 instead of a crash.
  const apiKey = (process.env.RESEND_API_KEY ?? "").match(
    /re_[A-Za-z0-9_-]+/,
  )?.[0];
  const audienceId = (process.env.RESEND_AUDIENCE_ID ?? "").match(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,
  )?.[0];
  if (!apiKey || !audienceId) {
    // Not configured (or the pasted value has no recognizable token/UUID) —
    // fail honestly instead of pretending it worked.
    const rawKey = process.env.RESEND_API_KEY ?? "";
    const rawAud = process.env.RESEND_AUDIENCE_ID ?? "";
    console.error(
      `[subscribe] diag keyLen=${rawKey.length} keyHasRe=${rawKey.includes("re_")} keyMatched=${!!apiKey} audLen=${rawAud.length} audMatched=${!!audienceId}`,
    );
    return NextResponse.json(
      { error: "Signups aren’t available right now." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          unsubscribed: false,
        }),
      },
    );

    if (!res.ok) {
      // Resend treats an already-subscribed email as a 409/422 — that's a
      // success from the visitor's point of view, so don't surface it as error.
      if (res.status === 409 || res.status === 422) {
        return NextResponse.json({ ok: true, already: true });
      }
      const detail = await res.text();
      console.error(`[subscribe] Resend error ${res.status}: ${detail}`);
      return NextResponse.json(
        { error: "Couldn’t save your email. Please try again." },
        { status: 502 },
      );
    }

    // `source` is optional context (e.g. "wholesale") for future segmentation;
    // recorded in logs for now since audiences don't take arbitrary fields.
    if (typeof source === "string" && source) {
      console.log(`[subscribe] new contact via ${source}`);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] request failed:", err);
    return NextResponse.json(
      { error: "Couldn’t save your email. Please try again." },
      { status: 502 },
    );
  }
}
