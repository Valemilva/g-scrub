// blog-ingest.mjs — validates the JSON drafts in content/blog-drafts/ and
// regenerates lib/generated-posts.ts, which lib/blog.ts serves to the site.
//
// This is the gate between the marketing chat's drafts and production. It fails
// loudly rather than publishing a post that breaks the brand's claim rules
// (01_DOCS/G_SCRUB_BRAND_DEVELOPMENT_MEMORY.md → "Safe Claims").
//
// Usage: npm run blog:ingest
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DRAFTS = join(ROOT, "content", "blog-drafts");
const OUT = join(ROOT, "lib", "generated-posts.ts");

const BLOCK_TYPES = new Set(["h2", "p", "ul", "callout"]);

// Adding a tag is a deliberate act: add it here first, then use it in a draft.
// Keeps the taxonomy from sprawling into near-duplicates.
const ALLOWED_TAGS = new Set([
  "Shoe Care",
  "Club Care",
  "Grip Care",
  "Gear Care",
  "How-To",
  "Maintenance",
  "Materials",
  "Course Tips",
  "Buying Guide",
  "Product News",
]);

// Hard blocks, straight from the brand doc's "Avoid" list. G-SCRUB is a
// cleaner, not a disinfectant — these claims would be false and would put the
// Amazon listing at risk. The `why` is shown to whoever runs the ingest.
const FORBIDDEN_CLAIMS = [
  {
    re: /\bdisinfect(s|ed|ing|ant|ants)?\b/i,
    why: 'antimicrobial claim ("disinfect"). G-SCRUB cleans — say "helps remove dirt".',
  },
  {
    re: /\bsanitiz(e|es|ed|ing|er|ers)\b/i,
    why: 'antimicrobial claim ("sanitize").',
  },
  {
    re: /\bsteriliz(e|es|ed|ing)\b/i,
    why: 'antimicrobial claim ("sterilize").',
  },
  {
    re: /\banti-?(microbial|bacterial|fungal|viral)\b/i,
    why: "antimicrobial claim.",
  },
  {
    re: /\b(kills?|killing|eliminates?|eliminating|destroys?)\b[^.!?]{0,25}\b(germ|bacteri|virus|viruses|fungus|fungi|mold|mildew|pathogen)/i,
    why: 'antimicrobial claim ("kills germs/bacteria").',
  },
  {
    re: /\b(prevents?|preventing|cures?|treats?|heals?)\b[^.!?]{0,25}\b(disease|infection|illness|athlete'?s foot|fungus)/i,
    why: "medical / disease claim.",
  },
  {
    re: /\bhospital[-\s]grade\b/i,
    why: 'implies disinfectant grade ("hospital-grade").',
  },
  {
    re: /\bmedical(ly)?\b/i,
    why: "medical claim.",
  },
  {
    re: /\bfda[-\s](approved|certified)\b/i,
    why: "regulatory claim — G-SCRUB has no such registration.",
  },
  {
    re: /\bsafe\s+(for|on)\s+all\b/i,
    why: 'overreaching safety claim. Use "safe for most common golf shoe materials when used as directed".',
  },
  {
    re: /\bbest\s+in\s+the\s+world\b/i,
    why: "unsupportable superlative.",
  },
  {
    re: /\bguarantee(d|s)?\b[^.!?]{0,25}\bresults?\b/i,
    why: '"guaranteed results" — unsupportable promise.',
  },
];

let failed = false;

function fail(msg) {
  console.error(`❌ ${msg}`);
  failed = true;
}

function warn(msg) {
  console.warn(`⚠️  ${msg}`);
}

/** Every piece of reader-facing prose in a draft, for the claim scan. */
function proseOf(p) {
  const parts = [p.title, p.description];
  for (const b of p.body ?? []) {
    if (b?.type === "ul" && Array.isArray(b.items)) parts.push(...b.items);
    else if (typeof b?.text === "string") parts.push(b.text);
  }
  return parts.filter((s) => typeof s === "string").join("\n");
}

function checkClaims(p, where) {
  const prose = proseOf(p);
  for (const { re, why } of FORBIDDEN_CLAIMS) {
    const hit = prose.match(re);
    if (hit) {
      fail(`${where}: forbidden claim ${JSON.stringify(hit[0])} — ${why}`);
    }
  }
}

function validateBody(body, where) {
  if (!Array.isArray(body) || body.length === 0) {
    fail(`${where}: 'body' must be a non-empty array.`);
    return false;
  }
  let hasCallout = false;
  for (const [i, b] of body.entries()) {
    if (!b || !BLOCK_TYPES.has(b.type)) {
      fail(
        `${where}: block ${i} has an invalid type (${b?.type}). Allowed: ${[...BLOCK_TYPES].join(", ")}.`,
      );
      continue;
    }
    if (b.type === "ul") {
      if (!Array.isArray(b.items) || b.items.length === 0) {
        fail(`${where}: block ${i} 'ul' has no items.`);
      }
    } else if (typeof b.text !== "string" || !b.text.trim()) {
      fail(`${where}: block ${i} '${b.type}' has no text.`);
    }
    if (b.type === "callout") hasCallout = true;
  }
  return hasCallout;
}

function main() {
  if (!existsSync(DRAFTS)) {
    console.log("(no content/blog-drafts/ — nothing to ingest)");
    writeFileSync(OUT, header() + "export const GENERATED_POSTS: BlogPost[] = [];\n");
    return;
  }

  const files = readdirSync(DRAFTS).filter((f) => f.endsWith(".json"));
  const seen = new Set();
  const posts = [];

  for (const file of files.sort()) {
    const where = `content/blog-drafts/${file}`;
    let p;
    try {
      p = JSON.parse(readFileSync(join(DRAFTS, file), "utf8"));
    } catch (e) {
      fail(`${where}: invalid JSON — ${e.message}`);
      continue;
    }

    let missing = false;
    for (const k of ["slug", "title", "description", "date", "readMins", "tags", "body"]) {
      if (p[k] === undefined || p[k] === null) {
        fail(`${where}: missing field '${k}'.`);
        missing = true;
      }
    }
    if (missing) continue;

    if (!/^[a-z0-9-]+$/.test(p.slug)) {
      fail(`${where}: invalid slug '${p.slug}' — use kebab-case.`);
    }
    if (seen.has(p.slug)) {
      fail(`${where}: duplicate slug '${p.slug}'.`);
    }
    seen.add(p.slug);

    if (!/^\d{4}-\d{2}-\d{2}$/.test(p.date)) {
      fail(`${where}: 'date' must be yyyy-mm-dd.`);
    }
    if (typeof p.readMins !== "number" || p.readMins <= 0) {
      fail(`${where}: 'readMins' must be a positive number.`);
    }
    if (!Array.isArray(p.tags) || p.tags.length === 0) {
      fail(`${where}: 'tags' is empty.`);
    } else {
      for (const t of p.tags) {
        if (!ALLOWED_TAGS.has(t)) {
          fail(
            `${where}: tag '${t}' is not allowed. Add it to ALLOWED_TAGS in scripts/blog-ingest.mjs first, or use one of: ${[...ALLOWED_TAGS].join(", ")}.`,
          );
        }
      }
    }

    // The site is English-only; a stray Spanish overlay would be silently
    // dropped, so say so instead of ignoring it.
    if (p.es) {
      fail(`${where}: 'es' overlay found — the G-SCRUB blog is English-only.`);
    }

    // Optional hero image — if given, it must point at a file that actually exists in
    // public/, so a typo'd path doesn't ship as a silently-broken <img>.
    if (p.image !== undefined) {
      if (typeof p.image !== "string" || !p.image.startsWith("/images/")) {
        fail(`${where}: 'image' must be a string starting with "/images/" (e.g. "/images/gscrub-blog-foo-hero.webp").`);
      } else {
        const onDisk = join(ROOT, "public", p.image);
        if (!existsSync(onDisk) || !statSync(onDisk).isFile()) {
          fail(`${where}: 'image' points at "${p.image}", which doesn't exist under public/images/.`);
        }
      }
    }

    const hasCallout = validateBody(p.body, where);
    if (!hasCallout) {
      fail(`${where}: post needs a closing 'callout' block (the Amazon CTA).`);
    }

    checkClaims(p, where);

    // SEO nudges — worth knowing, not worth blocking a publish over.
    if (typeof p.description === "string") {
      if (p.description.length > 160) {
        warn(`${where}: description is ${p.description.length} chars (>160 gets truncated in search results).`);
      } else if (p.description.length < 50) {
        warn(`${where}: description is only ${p.description.length} chars — thin for search results.`);
      }
    }
    if (typeof p.title === "string" && p.title.length > 60) {
      warn(`${where}: title is ${p.title.length} chars (>60 gets truncated in search results).`);
    }

    posts.push({
      slug: p.slug,
      title: p.title,
      description: p.description,
      date: p.date,
      readMins: p.readMins,
      tags: p.tags,
      body: p.body,
      ...(p.image !== undefined ? { image: p.image } : {}),
    });
  }

  if (failed) {
    console.error("\nIngest aborted — generated-posts.ts was left untouched.");
    process.exit(1);
  }

  posts.sort((a, b) => b.date.localeCompare(a.date));
  writeFileSync(
    OUT,
    header() + `export const GENERATED_POSTS: BlogPost[] = ${JSON.stringify(posts, null, 2)};\n`,
  );
  console.log(`✅ Ingested ${posts.length} post(s) → lib/generated-posts.ts`);
}

function header() {
  return (
    "// AUTO-GENERATED by scripts/blog-ingest.mjs — do not edit by hand.\n" +
    "// Source drafts: content/blog-drafts/*.json. Run `npm run blog:ingest` to regenerate.\n" +
    'import type { BlogPost } from "./blog-types";\n\n'
  );
}

main();
