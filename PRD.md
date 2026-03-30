# PRD — Youcef Megoura Portfolio Rebuild

## Summary

Rebuild youcefmegoura.github.io (the source code is available at https://github.com/youcefmegoura/youcefmegoura.github.io) from a legacy HTML/CSS/PHP site into a modern Next.js application. All content is driven by a single YAML data source. The site supports FR/EN with a toggle, dark/light mode with a toggle, and is optimized for recruiter discovery. Deployed via Docker on self-hosted infrastructure.

The project ships 7 visual template versions sharing the same data layer. Version 1 is a pixel-perfect clone of the current site. Version 2 keeps the same vibe, modernized. Versions 3–7 are creative explorations (mix of single-page and multi-page). The owner picks one; the rest are deleted and the chosen version moves to `/`.

---

## Target User

**Tech recruiters and hiring managers** who land on this site from LinkedIn, GitHub, or Google. They need to quickly assess:
- Current role and seniority (Backend & DevOps Engineer, 6+ years)
- Tech stack fit (Java, Spring Boot, Kotlin, K8s, Docker, CI/CD)
- Work history depth (IoT, ERP, microservices, startup infra)
- Downloadable CV for forwarding internally

Secondary: peers/developers who discover the site via GitHub profile.

---

## Tech Stack

| Layer      | Choice                                                                    |
|------------|---------------------------------------------------------------------------|
| Framework  | Next.js 15+ (App Router) — owner decides before sprint 1                  |
| Styling    | Tailwind CSS 3                                                            |
| Data       | YAML files in `/content/` directory, read at build time                   |
| i18n       | next-intl (Next.js) or @nuxtjs/i18n (Nuxt) — FR default, EN toggle        |
| Theme      | CSS variables + Tailwind dark class strategy — light default, toggle      |
| Icons      | Lucide React or Heroicons                                                 |
| Animations | Framer Motion (Next.js) or @vueuse/motion (Nuxt) — subtle, no bloat       |
| SEO        | next-seo / nuxt-seo, JSON-LD for Person schema, OpenGraph, Twitter cards  |
| Analytics  | Umami (self-hosted) or Plausible — privacy-first, no cookie banner needed |
| Build      | Static Site Generation (SSG) — pages pre-rendered at build                |
| Deploy     | Docker (multi-stage: build → nginx/node)                                  |
| CI         | GitHub Actions — lint, build, docker push                                 |

---

## Data Architecture

All content lives in YAML. One source of truth, two language keys per field.

### File Structure

```
/content/en
  profile.yaml        # name, title, tagline, photo, location, contact links
  experience.yaml     # all jobs — short + detailed view
  skills.yaml         # categorized technical skills
  education.yaml      # degrees, schools
  projects.yaml       # dev projects + design projects (separated by type)
  languages.yaml      # spoken languages
  certifications.yaml # optional — certs carousel from old site
  meta.yaml           # SEO defaults, social links, CV download URL, detailed experience PDF URL

```

### Example: experience.yaml

```yaml
- id: keutt
  company:
    fr: "Keutt (Startup)"
    en: "Keutt (Startup)"
  role:
    fr: "DevOps & LeadTech"
    en: "DevOps & LeadTech"
  type: "part-time"
  period:
    start: "2026-01"
    end: null # present
  location: "Paris, France"
  short:
    fr: "Structuration infra d'une startup. Docker, Traefik, Ansible, CI/CD GitHub Actions."
    en: "Built startup infrastructure from scratch. Docker, Traefik, Ansible, CI/CD GitHub Actions."
  detailed:
    fr: |
      Contexte: Participation à la structuration technique d'une startup...
      Missions:
      - Conception et mise en place de l'infrastructure serveur
      - Conteneurisation des applications avec Docker
      ...
    en: |
      Context: Technical structuring of a startup with backend, frontend web and mobile Flutter apps...
      Missions:
      - Server infrastructure design and setup
      - Application containerization with Docker
      ...
  environment:
    - Docker
    - Ansible
    - Terraform
    - Kubernetes
    - Traefik
    - GitHub Actions
    - Linux
```

### Example: projects.yaml

```yaml
dev:
  - id: lx-connect
    title:
      fr: "LX Connect — Plateforme IoT"
      en: "LX Connect — IoT Platform"
    description:
      fr: "Plateforme IoT pour la gestion d'équipements connectés"
      en: "IoT platform for connected equipment management"
    tech: [Java, Kotlin, Spring Boot, Kafka, K8s, Helm]
    image: "/images/projects/lx-connect.jpg"
    link: null # NDA/internal
    type: "professional"

design:
  - id: poster-01
    title:
      fr: "Affiche événementielle"
      en: "Event poster"
    image: "/images/design/portfolio20.jpg"
    tools: [Photoshop, Illustrator]
```

### Example: meta.yaml

```yaml
site_url: "https://youcefmegoura.online"
cv_download_url: "https://drive.google.com/file/d/xxx/view"
detailed_experience_url: "https://drive.google.com/file/d/yyy/view"
social:
  linkedin: "https://www.linkedin.com/in/youcefmegoura/"
  github: "https://github.com/YoucefMegoura"
  twitter: "https://twitter.com/youcefmegoura"
  email: "ymegoura@gmail.com"
  phone: "+33 7 45 26 74 00"
og_image: "/images/og-cover.jpg"
```

---

## Sections Spec

### 1. Hero
- Professional headshot (circular or styled)
- Name: **Youcef MEGOURA**
- Title: **Backend & DevOps Engineer**
- Tagline (typed animation in V1, varies by version): short value proposition
- Two CTAs: "Download CV" (Google Drive link) → `meta.yaml.cv_download_url` | "Detailed Experience" → `meta.yaml.detailed_experience_url`
- Language toggle (FR/EN) in navbar or hero
- Theme toggle (light/dark) in navbar

### 2. About / Summary
- Professional summary from `profile.yaml`
- Location, availability
- Quick stats: 6+ years exp, 10+ clients, 20+ projects (computed or hardcoded in YAML)

### 3. Skills
- Grouped by category from `skills.yaml`:
    - Backend & Dev (Java, Kotlin, Spring Boot, GoLang)
    - DevOps & Cloud (Docker, K8s, Helm, Ansible, Terraform, Traefik, CI/CD)
    - Databases (PostgreSQL, Oracle, MySQL, Redis, Kafka, RabbitMQ, Timescale)
    - IoT & Protocols (LwM2M, FOTA, COAP, MQTT)
    - Frontend & Mobile (Angular, React, Tailwind, Flutter)
    - Monitoring (Prometheus, Grafana, OpenTelemetry, SigNoz)
    - Tools (Keycloak, Jira, Git, SonarQube, Trivy, BlackDuck)
- Display: tag chips, grid, or icon-based — varies per version. No percentage bars (outdated pattern, not credible for backend/devops).

### 4. Experience
- Timeline or card layout (varies per version)
- Each entry shows: company, role, period, short description, tech environment tags
- **"See details" button** → expands inline (accordion/modal/slide) to show the full detailed description from `experience.yaml.detailed`
- Only show relevant dev career (Keutt, Lacroix, Audaxis, Freelance dev work). Old non-tech jobs (para-pharm, cyber-cafe) are omitted.

### 5. Education
- Master only (primary). Licence can be secondary/smaller.
- University name, period, field

### 6. Projects
- Two tabs or two sub-sections: **Development** | **Design**
- Dev projects: card with image, title, tech tags, link (if public)
- Design projects: image gallery/lightbox of old graphic design assets
- Migrate existing portfolio images from current repo `/images/` directory

### 7. Languages
- French: C1 (TCF SO diploma)
- English: B2 (Independent user)
- Display as simple badges or flags

### 8. Contact
- No form (no backend needed)
- Social links from `meta.yaml.social`: LinkedIn, GitHub, Twitter/X, Email, Phone
- CTA: "Download CV" repeated

---

## 7 Versions Spec

All versions share:
- Same YAML data layer
- Same i18n system
- Same dark/light toggle
- Same SEO/meta setup
- Same component library for data fetching

Differentiation is purely visual — layout, typography, color palette, animation style, section ordering.

### Version 1 — `/1` — Legacy Clone
- Pixel-perfect rebuild of current site (https://youcefmegoura.github.io)
- Same layout: fixed navbar, particle.js hero with circular photo, progress bars (kept for this version only), alternating timeline, portfolio grid, certifications carousel, contact form replaced with links
- Bootstrap-like spacing and grid — replicated via Tailwind utilities
- Color: red accent `#d82c2e` on dark sections
- Content updated to new YAML data
- Typed.js animation in hero → use typed.js or a React/Vue equivalent

### Version 2 — `/2` — Same Vibe, Modernized
- Same structure as V1 but with modern polish
- Replace Bootstrap grid with Tailwind
- Better typography (Inter or similar)
- Subtle scroll animations (fade-in on scroll)
- Skills as tag chips instead of progress bars
- Cleaner timeline with better spacing
- Keep red accent palette but refined
- Single-page

### Version 3 — `/3` — Minimal Dark
- Dark-first design (light mode available but secondary)
- Monospace or condensed font
- Terminal/code aesthetic — fits backend/devops branding
- Animated gradient or subtle grid background
- Single-page, sections separated by full-height blocks
- Skills as a grid of icons/logos

### Version 4 — `/4` — Bento Grid
- Modern bento/card grid layout (inspired by Apple/Linear design)
- Each section is a card in a grid
- Glassmorphism or subtle blur effects
- Light-first, clean whites and grays
- Single-page

### Version 5 — `/5` — Multi-page Classic
- Multi-page layout: Home, Experience, Projects, Contact as separate routes
- Clean sidebar navigation
- Each experience on its own sub-page with full detail (no accordion)
- Professional/corporate feel — think law firm site but for engineers

### Version 6 — `/6` — Interactive Timeline
- Full-screen scrollable timeline as the primary navigation
- Horizontal or vertical scroll-driven experience
- Each scroll stop = one career milestone
- Heavy on animation, immersive
- Single-page

### Version 7 — `/7` — Creative / Experimental
- Asymmetric layout, large typography, bold colors
- Mix of full-bleed images and text
- Cursor effects, parallax, or 3D elements (subtle)
- Most visually distinctive — designed to stand out
- Single-page or hybrid

---

## Routing

During design exploration:
```
/1  → Version 1 (legacy clone)
/2  → Version 2 (modernized vibe)
/3  → Version 3 (minimal dark)
/4  → Version 4 (bento grid)
/5  → Version 5 (multi-page)
/6  → Version 6 (interactive timeline)
/7  → Version 7 (creative)
/   → Index page listing all 7 versions with thumbnails
```

After selection:
```
/   → Chosen version
```
All other version routes removed.

---

## SEO Requirements

- `<title>`: "Youcef Megoura — Backend & DevOps Engineer | Rennes, France"
- `<meta description>`: From `profile.yaml` summary
- OpenGraph: title, description, image (`og_image` from meta.yaml), type=website
- Twitter card: summary_large_image
- JSON-LD: Person schema with name, jobTitle, url, sameAs (social links), knowsAbout (skills)
- `robots.txt` and `sitemap.xml` auto-generated
- Canonical URL on each version during exploration, single canonical after selection
- `lang` attribute on `<html>` — switches with i18n

---

## Dark / Light Mode

- Default: **light**
- Toggle in navbar (sun/moon icon)
- Persisted in `localStorage`
- Respects `prefers-color-scheme` only on first visit if no stored preference
- Tailwind `darkMode: 'class'` strategy
- CSS variables for colors — each version defines its own palette but all support both modes

---

## i18n

- Default locale: **fr**
- Available: fr, en
- Toggle in navbar (flag icon or FR/EN text)
- Persisted in `localStorage`
- URL structure: no locale prefix (single domain, client-side switch)
- All translatable strings in YAML data files (no separate translation JSON needed for content — only UI strings like "Download CV", "See details", "Dark mode" in a small `ui.yaml`)

---

## Docker

```dockerfile
# Multi-stage build
FROM node:24-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html
# OR for SSR: FROM node:20-alpine → npm start
```

- Expose port 80 (nginx) or 3000 (node)
- Health check endpoint: `/api/health` or just `/`
- Docker Compose file for local dev

---

## Project Structure

```
/
├── content/
│   ├── profile.yaml
│   ├── experience.yaml
│   ├── skills.yaml
│   ├── education.yaml
│   ├── projects.yaml
│   ├── languages.yaml
│   ├── certifications.yaml
│   ├── meta.yaml
│   └── ui.yaml           # UI translation strings
├── public/
│   ├── images/
│   │   ├── profile/
│   │   ├── projects/
│   │   └── design/
│   ├── favicon.png
│   └── og-cover.jpg
├── src/
│   ├── components/
│   │   ├── shared/        # Theme toggle, lang toggle, SEO head, navbar
│   │   └── sections/      # Hero, About, Skills, Experience, Education, Projects, Languages, Contact
│   ├── layouts/
│   │   ├── v1/            # Version 1 layout + styles
│   │   ├── v2/
│   │   ├── v3/
│   │   ├── v4/
│   │   ├── v5/
│   │   ├── v6/
│   │   └── v7/
│   ├── lib/
│   │   ├── yaml-loader.ts # Reads and parses YAML at build time
│   │   ├── i18n.ts
│   │   └── types.ts       # TypeScript interfaces for all YAML schemas
│   └── app/ (or pages/)
│       ├── page.tsx        # Version index (during exploration)
│       ├── 1/page.tsx
│       ├── 2/page.tsx
│       ├── ...
│       └── 7/page.tsx
├── Dockerfile
├── docker-compose.yml
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Implementation Order

### Phase 1 — Foundation
1. Initialize project (Next.js or Nuxt, TypeScript, Tailwind)
2. Set up YAML loader utility
3. Define TypeScript types for all YAML schemas
4. Create all YAML data files with full FR+EN content
5. Implement i18n (locale context, toggle, persistence)
6. Implement dark/light mode (theme context, toggle, persistence)
7. Build shared components: Navbar, Footer, SEO Head, Theme Toggle, Lang Toggle

### Phase 2 — Version 1 (Legacy Clone)
1. Analyze current site CSS and layout
2. Rebuild pixel-perfect in Tailwind
3. Particle.js background in hero
4. Typed animation
5. Progress bars for skills (V1 only)
6. Alternating timeline for experience
7. Portfolio grid
8. Certifications carousel
9. Contact section (links, no form)

### Phase 3 — Versions 2–7
Build each version as an independent layout consuming shared data components. Prioritize V2 and V3 first (highest likelihood of selection).

### Phase 4 — SEO & Polish
1. JSON-LD Person schema
2. OpenGraph + Twitter cards
3. Sitemap generation
4. Performance optimization (image optimization, lazy loading, bundle analysis)
5. Lighthouse audit — target 95+ on all metrics

### Phase 5 — Deploy
1. Dockerfile (multi-stage)
2. docker-compose.yml for local + production
3. GitHub Actions CI: lint → build → docker build → push
4. Analytics integration (Umami/Plausible)

### Phase 6 — Selection & Cleanup
1. Owner reviews all 7 versions
2. Chosen version moves to `/`
3. Delete unused version layouts
4. Final SEO audit with single canonical

---

## Content Migration Checklist

- [ ] Migrate professional photo from current repo
- [ ] Migrate portfolio images from `/images/` (categorize into dev vs design)
- [ ] Write EN translations for all experience descriptions
- [ ] Prepare OG cover image (1200x630)
- [ ] Get Google Drive share links for CV PDF and detailed experience PDF
- [ ] Update social links (verify all are current)
- [ ] Remove outdated content: non-tech jobs, torrent links page, old apps page

---

## Constraints

- No database
- No CMS admin panel
- No contact form (no backend API)
- No cookies (analytics must be cookie-free)
- Build time < 60 seconds
- All images optimized (WebP, lazy loaded)
- WCAG 2.1 AA accessibility minimum
- Mobile-first responsive design on all versions