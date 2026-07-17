# Measurement — how we tell channels apart

Shared contract between the website chat and the marketing chat. If we tag
links differently, the numbers can't be compared and the whole exercise is
theatre.

## The one rule that matters

**Tag the link that brings someone TO g-scrub.com. Never tag the link that
sends them to Amazon.**

Amazon does not report `utm_*` parameters to sellers — not in Seller Central,
not anywhere. A link like `amazon.com/dp/B0FJ7NJDZ6?utm_source=blog` looks like
tracking but reports nothing; it only creates a false sense of attribution.
GA4 already records which page an outbound click happened on, so tagging the
destination adds nothing we don't have.

That's why `AmazonButton` builds clean links (`lib/constants.ts` →
`withAffiliateTag`). That helper is the single place to add real Amazon-side
tracking when it becomes available (see "Later" below).

## Inbound UTM convention

Every link we post anywhere off-site:

```
https://g-scrub.com/?utm_source=<source>&utm_medium=<medium>&utm_campaign=<campaign>
```

| Param | Allowed values |
| --- | --- |
| `utm_source` | `tiktok` · `instagram` · `youtube` · `facebook` · `blog` · `email` |
| `utm_medium` | `bio` · `video` · `post` · `link` |
| `utm_campaign` | `organic`, or the blog post slug |

Lowercase always — GA4 treats `TikTok` and `tiktok` as two different sources.

Examples:

```
https://g-scrub.com/?utm_source=tiktok&utm_medium=bio&utm_campaign=organic
https://g-scrub.com/blog/grass-stains-golf-shoes?utm_source=instagram&utm_medium=post&utm_campaign=grass-stains-golf-shoes
```

## How a channel gets credit

1. Someone taps the TikTok bio link → lands with `utm_source=tiktok`.
2. GA4 attributes the **whole session** to tiktok.
3. They click "Buy on Amazon" → GA4 logs an outbound click **on that session**.
4. So "outbound Amazon clicks, split by session source" answers *which channel
   sends buyers* — without needing anything from Amazon's side.

Step 4 is what the `/admin` dashboard has to surface: clicks broken down by
`utm_source` / referrer, not just totals.

## What this cannot tell us

GA4 knows someone **left for Amazon**. It cannot know whether they **bought** —
Amazon doesn't hand that back. So:

- Channel comparison → trustworthy (clicks per source).
- "Channel X produced N sales" → **not measurable today.** Don't report it.

Sales stay a single number from Seller Central, correlated with traffic by
timing, not attributed per channel.

## Later: real Amazon-side attribution

Two things would close the loop, both gated on **Brand Registry** (needs the
trademark, ~2 months out):

- **Amazon Attribution** — per-channel tags Amazon *does* report on, including
  sales. This is the real fix.
- **Associates `ascsubtag`** — per-source tags visible in Associates reports.
  Blocked separately: `AMAZON_ASSOCIATE_TAG` is empty and the reused
  author-books tag was flagged `AssociateNotEligible`.

Both plug into `withAffiliateTag` when they land. Until then: inbound UTMs.
