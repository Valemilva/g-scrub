import type { Metadata } from "next";
import { cookies } from "next/headers";
import { adminConfigured, cookieValid, ADMIN_COOKIE } from "@/lib/admin-auth";
import { fetchGA4Data, ga4Configured } from "@/lib/ga4";
import LoginForm from "./login-form";
import Dashboard from "./dashboard";

export const metadata: Metadata = {
  title: "Admin | G-SCRUB",
  robots: { index: false, follow: false },
};

// Always render fresh — it's a live dashboard behind auth, never cached.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const configured = adminConfigured();
  const cookieStore = await cookies();
  const authed =
    configured && cookieValid(cookieStore.get(ADMIN_COOKIE)?.value);

  if (!authed) {
    return <LoginForm configured={configured} />;
  }

  const data = await fetchGA4Data();
  return <Dashboard data={data} configured={ga4Configured()} />;
}
