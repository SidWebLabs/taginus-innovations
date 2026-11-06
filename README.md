# Taginus Innovations - Website

Next.js (App Router) + TypeScript + Tailwind CSS v4 PWA. Responsive (mobile, tablet, desktop), statically generated, built for SEO, AEO (answer engines) and GEO (generative engines).

## 1. Run it

```bash
npm install
cp .env.example .env.local      # then set NEXT_PUBLIC_SITE_URL
npm run dev                     # http://localhost:3000
npm run typecheck
npm run build && npm start      # production check (PWA/service worker only runs in production)
```

Starting from scratch instead? `npx create-next-app@latest taginus-website --ts --tailwind --app --src-dir --import-alias "@/*"`, then copy `src/`, `public/`, `next.config.ts`, `netlify.toml` and `.env.example` over it.

## 2. Structure

```
src/
  app/
    layout.tsx            fonts, global metadata, Organization + WebSite JSON-LD, PWA registration
    page.tsx              home (hero index, what we do, portfolio, FAQ)
    [vertical]/page.tsx   7 vertical pages (CollectionPage + ItemList + FAQPage + breadcrumbs)
    [vertical]/[item]/    ~42 product / service / platform pages (Product, Service or SoftwareApplication JSON-LD)
    about  contact  donate  offline
    sitemap.ts  robots.ts  manifest.ts  llms.txt/route.ts  opengraph-image.tsx  icon.svg  apple-icon.png
  components/             Header, MobileMenu, Footer, Hero parts, Faq, Stats, Cta, ItemRow, JsonLd, ...
  data/site.ts            company details, stats, home FAQs
  data/verticals.ts       ALL client content: verticals > groups > items. Edit here, pages + sitemap + llms.txt update automatically
  lib/seo.ts              metadata + schema helpers
public/sw.js              service worker (offline page + cached static assets)
public/icons/             PWA icons (192, 512, maskable)
```

## 3. Editing content

Everything lives in `src/data/verticals.ts`. Add an item and you get a new page, a sitemap entry, an internal link, schema and an `llms.txt` line automatically. Add `features` for platform pages and `meta` for chips such as design numbers.

## 4. SEO / AEO / GEO checklist (already built in)

| Area | What is configured |
|---|---|
| Crawlability | `sitemap.xml` (49 content URLs), `robots.txt` (Googlebot, Bingbot and AI crawlers explicitly allowed), static HTML for every page, canonical + `hreflang` (en-IN, x-default) on every page, `favicon.ico` |
| Meta tags | Unique `<title>` (<= 60 chars incl. brand) and `<meta description>` (70-160 chars) per page, keywords, robots with max-snippet/max-image-preview, Open Graph, Twitter card, geo tags, theme-color, apple-touch-icon, category, referrer policy |
| Social previews | Auto-generated 1200x630 OG and Twitter image for the home page, each vertical and each item (titles drawn from your data) |
| Structured data | Organization + LocalBusiness (with OfferCatalog of all verticals), WebSite, WebPage / CollectionPage with **speakable** markup, AboutPage, ContactPage, BreadcrumbList, FAQPage, ItemList, Product, Service, SoftwareApplication, Person |
| AEO | Answer-first summary on every page (`data-speakable`), FAQ blocks with FAQPage schema, one H1 per page |
| GEO | `/llms.txt` (map) and `/llms-full.txt` (full content incl. features and FAQs), consistent company facts in schema and text |
| Trust files | `/.well-known/security.txt`, `/humans.txt` |
| Verification | `NEXT_PUBLIC_GSC_VERIFICATION`, `NEXT_PUBLIC_BING_VERIFICATION` |
| Domain safety | Canonical base = `NEXT_PUBLIC_SITE_URL`, else Netlify `URL`, else Cloudflare `CF_PAGES_URL`. A build warning appears if it falls back to localhost |
| Performance and a11y | See section 7. Skip link, focus styles, reduced-motion support |
| PWA | Manifest, maskable icons, service worker, offline page |

### Keep SEO healthy
`npm run seo:audit` checks every product / vertical page for title length, description length, duplicate titles/descriptions and repeated brand names. Run it after editing `src/data/verticals.ts`. Use the optional `seoTitle` field on a vertical or item to override a title that is too long.

### After you deploy
1. Set `NEXT_PUBLIC_SITE_URL` to the real domain and redeploy.
2. Google Search Console: add property, paste the verification value in `.env`, redeploy, verify, submit `https://yourdomain/sitemap.xml`.
3. Bing Webmaster Tools: import from Search Console, same sitemap.
4. Check `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`, `/manifest.webmanifest`.
5. Test with Google Rich Results Test and PageSpeed Insights.
6. Create a Google Business Profile for the Jath office and link it to the site (local SEO).

### Adding real photos (recommended)
Put images in `public/images/`, use `next/image` with `width`, `height` and `alt`, set `priority` only on the single hero image, keep JPG/PNG under ~300 KB source, and write descriptive alt text with the product name (for example "Papaya Harvester by Taginus Innovations").

## 5. Deploy

**Netlify:** push to GitHub, "Add new site > Import", build command `npm run build`. The Next.js runtime is auto-detected (`netlify.toml` included). Add the env vars in Site settings. Add your domain under Domain management.

**Cloudflare:** use the OpenNext adapter (`npm i @opennextjs/cloudflare wrangler`, then follow the current Cloudflare "Next.js on Workers" guide; build with `npx opennextjs-cloudflare build`). Add the env vars as build variables and attach your domain in the dashboard.

## 6. Open items to confirm with the client
- Portfolio numbers differ between the PPT and the Word file; the Word figures are used (`src/data/site.ts`).
- Biofertiliser Mixer design number is not confirmed (see TODO in `verticals.ts`).
- The donate page publishes the bank account number publicly, as in the brief. Confirm this is intended.
- Real photos, logo file, privacy policy and (for QR Pay / Innography) live app links.

## 7. Motion, 3D and visual system (v2)

| Feature | Where | Notes |
|---|---|---|
| One typeface everywhere | `layout.tsx`, `globals.css` | Figtree for header, body and footer |
| Big-screen / zoom-out scaling | `globals.css` (`html` font-size steps at 1536, 1920, 2560, 3400px) | Everything is rem-based, so the UI scales instead of staying tiny in a narrow column |
| Scroll reveal (fade/slide up) | `RevealObserver.tsx` + `[data-reveal]` CSS | Add `data-reveal` (or `="left"`, `="right"`, `="zoom"`) and `style={{"--d":"120ms"}}` for delay. Off for reduced-motion users; content stays visible without JS |
| Hover effects | `LinkButton`, `ItemRow`, `Stats`, footer, nav (`.link-u` underline grow) | Lift, colour change, slide, logo flower rotates |
| 3D innovation path (three.js) | `HeroScene.tsx`, `HeroVisual.tsx` | Loaded after idle, only if WebGL is available, no reduced-motion, no Save-Data. Pauses off-screen. Animated SVG fallback otherwise |
| Journey path | `Journey.tsx` | Line draws and dots pop on scroll. Edit the 6 steps in the file |
| Count-up numbers | `CountUp.tsx` | Final value is in the server HTML (good for SEO) |
| Scroll progress bar | `.progress` | CSS-only, Chromium/Safari |
| Hero + page banner artwork | `public/images/hero-field.svg`, `page-banner.svg` | Tiny SVGs. Replace with real photography when available (keep the hero image under ~200 KB, WebP/AVIF) |
