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

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    // Not configured yet — fail honestly instead of pretending it worked.
    console.error(
      "[subscribe] RESEND_API_KEY or RESEND_AUDIENCE_ID is not set; email not stored.",
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
