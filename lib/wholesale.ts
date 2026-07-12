// ============================================================================
// WHOLESALE / B2B — foundation module (Phase 2 head-start)
// ============================================================================
// This file is the pricing + shipping engine for the wholesale channel that
// lives ONLY in the Wholesale section (the rest of the site stays an Amazon
// bridge). It is pure logic with no external dependencies, so it can be built
// and tested before the DB/auth/Stripe pieces come online.
//
// ⚠️ NOTHING HERE IS LIVE YET. The wholesale channel launches as a WAITLIST
// first. All prices below are TENTATIVE placeholders from the initial margin
// discussion (2026-07-09) — Valentín will confirm the real numbers once
// production cost (COGS) is known. Do not show these prices publicly until
// the portal goes live and the numbers are confirmed.
// ============================================================================

// Suggested resale price (MSRP) that pro shops sell to golfers at — matches
// the Amazon retail price so the brand price stays consistent across channels.
export const WHOLESALE_MSRP_USD = 23.99;

// Minimum order quantity for a wholesale order (per product).
export const WHOLESALE_MOQ = 24;

// Origin the office ships from (for shipping estimates). Real carrier rates
// (Phase 2, option A) will use this + the buyer's destination + package weight.
export const WHOLESALE_ORIGIN = {
  city: "Clermont",
  state: "FL",
  postalCode: "34714",
  country: "US",
};

// TENTATIVE volume pricing. unitPriceUSD = what the pro shop pays G-SCRUB per
// unit; the spread between this and MSRP is the pro shop's margin. Tiers are
// evaluated high-to-low: the first tier whose minQty a quantity meets applies.
export interface WholesaleTier {
  minQty: number;
  unitPriceUSD: number;
}

export const WHOLESALE_TIERS: WholesaleTier[] = [
  { minQty: 250, unitPriceUSD: 11.5 }, // ~52% off MSRP
  { minQty: 100, unitPriceUSD: 12.5 }, // ~48% off MSRP
  { minQty: WHOLESALE_MOQ, unitPriceUSD: 13.5 }, // ~44% off MSRP (24–99)
];

// The per-unit wholesale price for a given quantity, or null if below MOQ.
export function wholesaleUnitPrice(qty: number): number | null {
  if (qty < WHOLESALE_MOQ) return null;
  const tier = WHOLESALE_TIERS.find((t) => qty >= t.minQty);
  return tier ? tier.unitPriceUSD : null;
}

// The pro shop's resale margin at MSRP for a given quantity (0..1), for
// showing "your margin ~48%" style copy in the portal.
export function wholesaleResaleMargin(qty: number): number | null {
  const unit = wholesaleUnitPrice(qty);
  if (unit === null) return null;
  return (WHOLESALE_MSRP_USD - unit) / WHOLESALE_MSRP_USD;
}

// ---------------------------------------------------------------------------
// Shipping estimate (Phase 2, option B: simple quantity-tiered model)
// ---------------------------------------------------------------------------
// A configurable placeholder while we don't have real carrier rates. Model:
// free shipping at/above a volume threshold, otherwise a base handling fee
// plus a per-unit amount. Swap this out for live carrier rates (EasyPost /
// Shippo / UPS) once package weight + dimensions are known (Procurement
// Cockpit). All values TENTATIVE.
export const WHOLESALE_SHIPPING = {
  freeOverQty: 250, // free shipping on large orders (a carry incentive)
  baseHandlingUSD: 12.0, // flat per-order handling
  perUnitUSD: 0.35, // rough per-unit contribution to freight
};

export interface ShippingEstimate {
  costUSD: number;
  isFree: boolean;
  note: string;
}

// Estimate delivery shipping for a wholesale order of `qty` units.
export function estimateWholesaleShipping(qty: number): ShippingEstimate {
  if (qty >= WHOLESALE_SHIPPING.freeOverQty) {
    return {
      costUSD: 0,
      isFree: true,
      note: `Free shipping on orders of ${WHOLESALE_SHIPPING.freeOverQty}+ units`,
    };
  }
  const cost =
    WHOLESALE_SHIPPING.baseHandlingUSD + qty * WHOLESALE_SHIPPING.perUnitUSD;
  return {
    costUSD: Math.round(cost * 100) / 100,
    isFree: false,
    note: "Estimated shipping — final rate confirmed at fulfillment",
  };
}

// Full order quote: line total + shipping + grand total, or null below MOQ.
export interface WholesaleQuote {
  qty: number;
  unitPriceUSD: number;
  lineTotalUSD: number;
  shipping: ShippingEstimate;
  grandTotalUSD: number;
  resaleMargin: number;
}

export function wholesaleQuote(qty: number): WholesaleQuote | null {
  const unit = wholesaleUnitPrice(qty);
  const margin = wholesaleResaleMargin(qty);
  if (unit === null || margin === null) return null;
  const lineTotal = Math.round(unit * qty * 100) / 100;
  const shipping = estimateWholesaleShipping(qty);
  return {
    qty,
    unitPriceUSD: unit,
    lineTotalUSD: lineTotal,
    shipping,
    grandTotalUSD: Math.round((lineTotal + shipping.costUSD) * 100) / 100,
    resaleMargin: margin,
  };
}

// ---------------------------------------------------------------------------
// Data model for the application → approval → account → order flow (Phase 2).
// Defined here so the API route, the /admin panel, and the eventual DB schema
// all share one shape. Persistence (Supabase) is wired once the DB is set up.
// ---------------------------------------------------------------------------
export type WholesaleApplicationStatus = "pending" | "approved" | "rejected";

export interface WholesaleApplication {
  id?: string;
  name: string;
  business: string;
  email: string;
  phone: string;
  quantityInterested: string;
  message: string;
  status: WholesaleApplicationStatus;
  createdAt?: string;
}
