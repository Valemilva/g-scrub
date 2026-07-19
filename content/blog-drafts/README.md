# Blog drafts — the contract

Drop one `.json` file per post in this folder, then run:

```bash
npm run blog:ingest
```

That validates every draft and regenerates `lib/generated-posts.ts`. The site,
the sitemap, and the Blog nav link all read from there — **nothing else needs
editing to publish.** If validation fails, nothing is written and the post does
not go live.

The blog is **English only**. An `es` field makes the ingest fail (it would be
silently dropped otherwise).

## Schema

| Field | Type | Rules |
| --- | --- | --- |
| `slug` | string | kebab-case (`a-z`, `0-9`, `-`). Becomes `/blog/<slug>`. Must be unique. |
| `title` | string | Warns over 60 chars (search results truncate). |
| `description` | string | The meta description **and** the on-page intro. Aim 50–160 chars. |
| `date` | string | `yyyy-mm-dd`. Sorts the index (newest first). |
| `readMins` | number | Positive integer. |
| `tags` | string[] | At least one, from the allowed list below. First tag shows in the breadcrumb. |
| `body` | block[] | See below. Must contain a `callout`. |
| `image` | string, optional | Hero image path, e.g. `"/images/gscrub-blog-<slug>-hero.webp"`. Must already exist under `public/images/` — the ingest fails if the file is missing. Renders atop the article, as the thumbnail on `/blog`, and as the `og:image`/Twitter card. Posts without one still render fine, just text-only. Landscape ~1600×900 works best. |

Filename should match the slug (`shoe-care-basics.json` → `"slug": "shoe-care-basics"`).

### Body blocks

```jsonc
{ "type": "h2",      "text": "Section heading" }
{ "type": "p",       "text": "A paragraph." }
{ "type": "ul",      "items": ["First point", "Second point"] }
{ "type": "callout", "text": "Closing CTA paragraph." }   // required, put it last
```

Plain text only — no markdown, no HTML. `**bold**` renders as literal asterisks.

The `callout` is the Amazon CTA block: the ingest **fails without one**. Write
the persuasive text; the page renders the "Buy on Amazon →" button under it
automatically, so don't paste an Amazon URL into the text.

### Allowed tags

`Shoe Care` · `Club Care` · `Grip Care` · `Gear Care` · `How-To` ·
`Maintenance` · `Materials` · `Course Tips` · `Buying Guide` · `Product News`

An unknown tag fails the ingest on purpose — it stops near-duplicate tags from
piling up. To add one, edit `ALLOWED_TAGS` in `scripts/blog-ingest.mjs` first.

## Claim rules — this is the one that will bite you

G-SCRUB is a **cleaner, not a disinfectant.** The ingest scans the title,
description, and every block, and **hard-fails** on the claims below. They are
false for this product and would put the Amazon listing at risk. Source of
truth: `01_DOCS/G_SCRUB_BRAND_DEVELOPMENT_MEMORY.md` → "Safe Claims".

**Blocked:** disinfect · sanitize · sterilize · antimicrobial / antibacterial /
antifungal / antiviral · "kills/eliminates germs, bacteria, viruses, fungus,
mold" · "prevents/cures/treats disease, infection, athlete's foot" ·
hospital-grade · medical · FDA-approved · "safe for all …" · "best in the
world" · "guaranteed results".

**Say this instead:**

- Helps remove dirt / grass stains / mud / course debris
- Direct-to-brush formula · Concentrated solution · Standalone solution
- Safe for most common golf shoe materials **when used as directed**
- Brush and towel not included

## Example

```json
{
  "slug": "grass-stains-golf-shoes",
  "title": "How to Get Grass Stains Off Golf Shoes",
  "description": "Grass stains set fast on white golf shoes. Here's the routine that lifts them without wrecking the material.",
  "date": "2026-07-18",
  "readMins": 4,
  "tags": ["Shoe Care", "How-To"],
  "body": [
    { "type": "p", "text": "You finish eighteen and the toe box is green..." },
    { "type": "h2", "text": "Why grass stains set so fast" },
    { "type": "p", "text": "Chlorophyll bonds to the surface..." },
    { "type": "ul", "items": ["Work damp, not soaked", "Brush in one direction"] },
    { "type": "callout", "text": "G-SCRUB's foaming solution and brush are built for exactly this — it helps remove grass stains and course debris, and it's safe for most common golf shoe materials when used as directed." }
  ]
}
```

## Measurement

Don't put UTM parameters on Amazon links inside a post — Amazon ignores them
and nothing reports on them. Channel attribution comes from the **inbound**
link that brought the reader here. See `MEASUREMENT.md` at the repo root.
