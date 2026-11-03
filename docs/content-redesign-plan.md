# Plan — Revised website content (PDF) + 7 new blog posts

## Context
The client supplied `public/blog/Revised website content.pdf` (6 pages) and 7 blog drafts (`public/blog/*.docx`). The PDF replaces the copy on three pages: **Services, Solutions, About**. It has no homepage section. The 7 drafts must become full posts in the existing blog, which already has 8 posts, category tabs and `/blog/<slug>` routes.

Decisions from the user:
- New posts are dated with the go-live date (2026-11-03).
- Covers are a branded cover built in code (no stock images).
- "Real Estate Funds" is renamed to "Real Estate Investment Trusts" everywhere.

## Audit findings
- **Stack:** Next.js 15 App Router, React 18, TypeScript, Tailwind + shadcn/ui, `@tailwindcss/typography` (already installed). The site is mostly statically generated. `next.config.mjs` has `trailingSlash: true`, `ignoreBuildErrors`, and unoptimized images.
- **How content is stored:**
  - Blog posts are markdown files with frontmatter in `content/blog/*.md`, read by `src/lib/blog.ts` (gray-matter + remark).
  - Services copy is in `src/content/services-content.json`.
  - Solutions copy is hardcoded in `src/app/solutions/page.tsx` (`newFunctionGroups`). The homepage keeps a second copy of the group and function names, with different group labels.
  - Data Hub text is in `solutions` in `src/lib/constants.ts`, and is also hardcoded in the Data Hub section of `src/app/solutions/page.tsx` and in `solutions/data-hub/page.tsx`.
  - About copy is inline in `src/app/about/page.tsx`.
- **SEO gaps:**
  - The root layout has no `metadataBase`, Open Graph settings or canonical URLs.
  - The Solutions page has no metadata.
  - Blog detail pages only set title and description.
  - There is no structured data anywhere.
  - In the sitemap, each blog entry's `lastModified` comes from the post date.
- **Issues to fix while doing this:**
  - The Solutions page hides all of its content inside collapsible sections with oversized titles.
  - Data Hub copy lives in three places, and the function lists in two.
  - The blog loader silently fills in an author, a placeholder image and today's date when frontmatter is missing.
  - The DOCX text has broken characters (`�` instead of apostrophes and bullets), and Blog 1 has a typo ("Discover more about DataAlpha�s").
- Known pre-existing items I'm leaving alone: 15 TypeScript errors in `data-flow-background.tsx` and `icons.tsx`, and ESLint isn't configured.

## Content mapping (PDF → site)
| PDF section | Page / file | Action |
|---|---|---|
| Our Services intro | `/services` H1 + intro → `services-content.json` `intro` | Replace. H1 becomes "Our Services". |
| Technology Services + Data / Artificial Intelligence / Quant / Financial Applications | `techServices` (4 items) | Replace the text. Show the titles as written in the PDF. Keep the `tech-data`, `tech-ai`, `tech-quant` and `tech-finance-applications` anchors via a new `anchorId` field. |
| Who We Serve + 9 audiences | `fundsServices` (9 items) | Replace the text. The heading becomes "Who We Serve". Rename the REIT card. Keep the `#fund-real-estate-funds` anchor via `anchorId`. |
| Data Hub, Key Features (4), Benefits | `/solutions#data-hub` and `/solutions/data-hub` → move to one new source, `src/content/solutions-content.ts` | Replace. Point `solutions` in constants at it. |
| Investment Management Solutions intro + 5 groups / 20 functions | `/solutions#investment-management-functions` → same new source | Replace the text. Group names follow the PDF: "Investment Research & Strategy (Pre-Trade)", "Trading", "Post-Trade Optimization", "Transparency & Risk Control", "Accounting". |
| About DataAlpha, H1, 3 paragraphs | `/about` intro | Replace. H1 becomes "We Help Generate Alpha by Leveraging Your Data". |
| Our Values intro + 4 values | `/about` values | Replace. |
| (not in the PDF) | Homepage, Leadership, About CTA, Careers, Contact | Leave unchanged. The only exception is the homepage REIT tile (`src/content/expertise.json`) and the homepage function accordion, which will read from the new shared source so names match. |

All copy is used as written. I'll only fix broken characters and obvious typos, and I won't add any claims.

## Blog integration (7 new posts)
| # | Title | Slug | Category |
|---|---|---|---|
| 1 | 7 Ways AI Is Disrupting Investment Management | `7-ways-ai-is-disrupting-investment-management` | AI & Automation |
| 2 | Why Financial Firms Struggle with Data Silos and How to Solve Them | `why-financial-firms-struggle-with-data-silos` | Data Management |
| 3 | Generative AI in Asset Management: 5 Practical Use Cases Beyond Chatbots | `generative-ai-in-asset-management-use-cases` | AI & Automation |
| 4 | Data Warehouses vs. Data Lakes: What Should Investment Firms Choose? | `data-warehouses-vs-data-lakes-for-investment-firms` | Data Management |
| 5 | How Predictive Analytics Helps Private Credit Firms Identify Portfolio Risks Earlier | `predictive-analytics-private-credit-portfolio-risk` | Risk & Portfolio |
| 6 | How AI-Powered Portfolio Optimization Can Improve Investment Decision-Making | `ai-powered-portfolio-optimization` | Risk & Portfolio |
| 7 | From Manual Reconciliation to Intelligent Automation: Modernizing Post-Trade Operations | `manual-reconciliation-to-intelligent-automation` | Operations |

- **Format:** each post becomes `content/blog/<slug>.md`, using the existing approach, with no copy kept anywhere else.
  - Converted with a one-off python-docx script. The doc's "Blog N" label line is dropped.
  - Bold headings become `##`, numbered sub-points become `###`, and list paragraphs become `-` bullets.
- **Frontmatter:** `title`, `slug`, `date: "2026-11-03"`, `order: 1–7` (keeps them in document order when the date is the same), `category`, `excerpt`, `description`, `author: "DataAlpha"`, and no `image`.
  - `excerpt` is taken from the post's own first paragraph.
  - `description` is a meta description of 140–160 characters, built from the post's own wording.
  - `author` is the publisher only; no person's name is invented.
- **Re-categorising existing posts** so the tabs hold up at 15 posts: "AI & Data" splits into **AI & Automation** (Context Layering) and **Data Management** (Turning Data into Investment Intelligence). Hedge Funds, Commodities, Family Offices and Technology Strategy stay. That gives 8 tabs plus All.
- **`src/lib/blog.ts`:**
  - Make `image` optional; drop the picsum fallback.
  - Add `order` and `description`.
  - Stop defaulting the date to "now".
  - Sort by date descending, then `order`.
  - Add `getRelatedPosts(slug, n)`: same category first, then the most recent posts.
- **New `src/components/blog/blog-cover.tsx`:** a server component that renders the post image when there is one. Otherwise it renders the branded cover: navy gradient, category icon from lucide (already installed) and the title. It's used by both the listing cards and the detail hero.
- **Listing (`blog-post-grid.tsx`):**
  - Use `BlogCover`.
  - Show the latest post as a wide featured card above the grid when the "All" tab is active.
  - Keep the tabs, plus a `?category=` query so a filtered view can be shared as a link.
- **Detail (`src/app/blog/[slug]/page.tsx`):**
  - Category label, date, title, excerpt as the intro, then the cover, then the article.
  - Article text in the `prose` style, tuned for headings and lists.
  - "Related insights" (3 cards), "Back to Blog", and a CTA panel linking to `/contact`.

## SEO
- Root layout: add `metadataBase: https://www.dataalpha.ai` and default `openGraph`/`twitter` settings (siteName, type).
- Per page, set title, description, `alternates.canonical` (with trailing slash) and `openGraph`:
  - `/services` and `/about`: titles kept.
  - `/solutions`: new.
  - `/solutions/data-hub`: updated.
  - Each blog post: built in `generateMetadata`, with Open Graph type article and its cover or default image.
- JSON-LD:
  - `BlogPosting` on blog posts: headline, description, datePublished, author/publisher Organization.
  - `Organization` once in the layout.
  - No made-up fields.
- `sitemap.ts`: all 15 posts are included automatically through `getAllPostsMeta`. I'll check undated handling, though all posts now have dates.
- Heading order on every touched page: one H1, then H2 for sections, then H3 for cards. Alt text describes each image.

## Design / components
I'll reuse the existing tokens, `Card`, `Button`, `font-headline` and the navy theme.
- New shared building blocks in `src/components/sections/`:
  - `SectionHeader` (eyebrow, H2, subtitle).
  - `FeatureCard` (icon, H3 title, text), used by Services, Solutions and Values.
- **Solutions:**
  - Remove the collapsible sections so all content is visible and crawlable.
  - Data Hub section: copy plus the existing interactive demo, then a 2-column layout with "Key Features" as a checklist and "Benefits".
  - Functions section: a strip of group shortcut chips (anchor links) above five groups, each with an icon and a 3-column card grid.
  - Anchor ids stay the same (`#data-hub`, `#investment-management-functions`, plus one per group).
- **Services:** same section order. Longer PDF copy means cards line up top-aligned in equal-height grid rows; nothing is cut off.
- **About:** only the copy changes. The leadership cards stay exactly as they are.

## Execution order
1. Copy this plan into the repo as `docs/content-redesign-plan.md`.
2. Shared content sources (`solutions-content.ts`, JSON updates) and section components.
3. Services → Solutions (+ Data Hub detail) → About → homepage REIT and accordion source.
4. Blog loader → convert the 7 DOCX files to markdown → `BlogCover` → listing → detail → re-categorise existing posts.
5. SEO: layout metadata, per-page metadata, JSON-LD, sitemap check.
6. QA and fixes.

## Verification
- `npx tsc --noEmit`: no new errors outside the known 15.
- `npm run build`: succeeds, and all 15 `/blog/*` routes are prerendered.
- Run `next start`, then request every route and every blog URL directly (simulating a refresh). Each must return 200. Check `/sitemap.xml` lists 15 posts.
- Headless Chrome via the existing DevTools script, at 375, 768, 1280 and 1440px:
  - Screenshots of Services, Solutions, About, Blog list and 2 blog posts.
  - Click each category tab.
  - Collect console errors and failed network requests; expect none.
- Content check: a script compares the PDF and DOCX text, normalised, with the rendered HTML to confirm every paragraph appears.
- Check `<title>`, meta description, canonical, Open Graph and JSON-LD in the built HTML for each page type.

## Risks / blockers
- The PDF copy is longer than the short card copy written earlier. It will be shown in full, so cards get taller.
- Pushing to GitHub is still blocked: the `sauravmehtoDataalphaai` account gets a 403 on the repo. All changes stay local until that's fixed, and the earlier unpushed commit (`2225d3d`) is still waiting in the scratch clone.
- Splitting the categories changes the tabs the user saw earlier. Changing a category means editing that post's frontmatter.

---

## Implementation results (2026-11-03)

**Done:** everything in this plan. Services, Solutions, Data Hub and About now use the PDF copy. The 7 posts are live, and SEO is in place across all of these pages.

**Verified against the production build (`npm run build` + `next start`):**
- Build: OK, 32 pages generated (25 before; +7 posts).
- All 11 site routes, all 15 `/blog/<slug>/` URLs (direct load = refresh) and `/sitemap.xml` return 200. The sitemap lists all 15 posts, with trailing-slash URLs matching the canonical tags.
- Content: all 103 PDF sentences and every paragraph of the 7 DOCX posts appear in the rendered HTML.
- SEO: each page has a unique title and description, a canonical URL, and Open Graph tags (`og:site_name`, image; `article` type on posts). JSON-LD: `Organization` on every page, `BlogPosting` on posts. One H1 per page, with no skipped heading levels.
- Browser (headless Chrome at 375 / 768 / 1280 px across Services, Solutions, About, Blog, two posts and the homepage): no console errors, no failed requests, no horizontal overflow. Category tabs and `?category=` links work.
- `tsc --noEmit`: no new errors. The 15 known errors in `data-flow-background.tsx` and `icons.tsx` remain.

**Where content lives now**
- Services: `src/content/services-content.json`. Items have a stable `anchorId` for `/services#tech-*` and `/services#fund-*` links.
- Solutions / Data Hub / functions: `src/content/solutions-content.ts`. Used by `/solutions`, `/solutions/data-hub`, the homepage accordion and header search.
- Blog: `content/blog/*.md`. Frontmatter: `title`, `slug`, `date`, `order`, `category`, `excerpt`, `description`, `author`, optional `image`. A post without `image` gets the branded cover.
