// ============================================================================
// WHOLESALE / B2B — foundation module (Phase 2 head-start)
// ============================================================================
// This file is the pricing + shipping engine for the wholesale channel that
// lives ONLY in the Wholesale section (the rest of the site stays an Amazon
// bridge). It is pure logic with no external dependencies, so it can be built
// and tested before the DB/auth/Stripe pieces come online.
//
// PRICING IS REAL as of 2026-07-21 — confirmed by Valentín for the Shoe
// Cleaner Kit, the one product currently for sale. Retail stays pinned to the
// Amazon price so the brand price is identical on every channel.
//
// Shipping is charged on top and is NOT estimated here: no carrier rates or
// package dimensions have been agreed yet, so the quote shows a product
// subtotal and says shipping is quoted with the invoice. Inventing a number
// would put a price on the site we can't honour.
// ============================================================================

// Suggested resale price (MSRP) that pro shops sell to golfers at — matches
// the Amazon retail price so the brand price stays consistent across channels.
export const WHOLESALE_MSRP_USD = 23.99;

// Minimum order quantity for a wholesale order (per product): one dozen.
export const WHOLESALE_MOQ = 12;

// Origin the office ships from (for shipping estimates). Real carrier rates
// (Phase 2, option A) will use this + the buyer's destination + package weight.
export const WHOLESALE_ORIGIN = {
  city: "Clermont",
  state: "FL",
  postalCode: "34714",
  country: "US",
};

// Volume pricing confirmed 2026-07-21. unitPriceUSD = what the pro shop pays
// G-SCRUB per unit; the spread against MSRP is their margin. Tiers evaluate
// high-to-low: the first tier whose minQty a quantity meets applies.
//
// Only these two tiers are real. Larger volumes are deliberately NOT listed —
// they get a direct quote rather than an invented number.
export interface WholesaleTier {
  minQty: number;
  unitPriceUSD: number;
}

export const WHOLESALE_TIERS: WholesaleTier[] = [
  { minQty: 24, unitPriceUSD: 12.0 }, // 24+ — pro shop keeps ~50% at MSRP
  { minQty: WHOLESALE_MOQ, unitPriceUSD: 13.0 }, // 12–23 — ~46% at MSRP
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
// Wholesale ships from the Clermont office and is billed on top of the unit
// price. No carrier rates or package dimensions are agreed yet, so we quote it
// with the invoice instead of showing a number we can't stand behind. When
// real rates exist (EasyPost / Shippo / UPS, using WHOLESALE_ORIGIN + the
// buyer's destination + package weight from the Procurement Cockpit), add the
// estimator here and surface it in WholesaleQuote.
export const WHOLESALE_SHIPPING_NOTE =
  "Shipping is billed on top and quoted with your invoice.";

// Product subtotal for an order, or null below MOQ. Shipping is deliberately
// not part of the total — see WHOLESALE_SHIPPING_NOTE.
export interface WholesaleQuote {
  qty: number;
  unitPriceUSD: number;
  /** qty × unitPrice. Shipping is added at invoicing, not here. */
  productSubtotalUSD: number;
  /** What the shop makes per unit reselling at MSRP. */
  marginPerUnitUSD: number;
  /** Same, as a 0..1 fraction. */
  resaleMargin: number;
  /** Total the shop makes on the order if it sells through at MSRP. */
  resaleProfitUSD: number;
  shippingNote: string;
}

export function wholesaleQuote(qty: number): WholesaleQuote | null {
  const unit = wholesaleUnitPrice(qty);
  const margin = wholesaleResaleMargin(qty);
  if (unit === null || margin === null) return null;
  const round = (n: number) => Math.round(n * 100) / 100;
  const marginPerUnit = WHOLESALE_MSRP_USD - unit;
  return {
    qty,
    unitPriceUSD: unit,
    productSubtotalUSD: round(unit * qty),
    marginPerUnitUSD: round(marginPerUnit),
    resaleMargin: margin,
    resaleProfitUSD: round(marginPerUnit * qty),
    shippingNote: WHOLESALE_SHIPPING_NOTE,
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
