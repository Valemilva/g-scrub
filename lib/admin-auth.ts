import { createHmac, timingSafeEqual } from "node:crypto";

// Minimal password gate for /admin. G-SCRUB has no user database, so this is a
// single shared password (ADMIN_PASSWORD env var, set by Valentín in Vercel).
// On login we set a cookie holding an HMAC of the password keyed by the
// password itself — so the plaintext password never lives in the cookie, and a
// cookie can't be forged without knowing the password.

const COOKIE_NAME = "gscrub_admin";

export function adminConfigured(): boolean {
  return !!process.env.ADMIN_PASSWORD;
}

function expectedToken(password: string): string {
  return createHmac("sha256", password).update("gscrub-admin-v1").digest("hex");
}

/** Constant-time check that `candidate` equals the configured password. */
export function passwordMatches(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  // Length differences leak nothing useful here, but keep the compare safe.
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function sessionCookie(): { name: string; value: string } {
  const password = process.env.ADMIN_PASSWORD ?? "";
  return { name: COOKIE_NAME, value: expectedToken(password) };
}

/** Whether a request's cookie value proves a valid admin session. */
export function cookieValid(cookieValue: string | undefined): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password || !cookieValue) return false;
  const expected = expectedToken(password);
  const a = Buffer.from(cookieValue);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export const ADMIN_COOKIE = COOKIE_NAME;
