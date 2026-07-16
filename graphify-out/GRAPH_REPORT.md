# Graph Report - JagoFarm  (2026-07-16)

## Corpus Check
- 29 files · ~573,329 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 261 nodes · 351 edges · 20 communities (18 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `17ffa28a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App.jsx
- content.js
- package.json
- Nametag3D.jsx
- dependencies
- AboutPage.jsx
- AGENTS.md
- @fontsource/outfit
- gsap
- @gsap/react
- lenis
- 8. Testing Strategy
- meshline
- @phosphor-icons/react
- react-dom
- @react-three/drei
- @react-three/fiber
- SectionRenderer.jsx

## God Nodes (most connected - your core abstractions)
1. `Product Requirements Document (PRD)` - 20 edges
2. `postImage()` - 12 edges
3. `6.4 API Contract` - 11 edges
4. `App()` - 8 edges
5. `validImageUrl()` - 8 edges
6. `postContent()` - 8 edges
7. `8. Testing Strategy` - 8 edges
8. `fetchFromCMS()` - 7 edges
9. `1. Overview` - 7 edges
10. `6. Technical Architecture` - 7 edges

## Surprising Connections (you probably didn't know these)
- `GenericCards()` --calls--> `validImageUrl()`  [EXTRACTED]
  src/components/SectionRenderer.jsx → src/lib/cms.js
- `Cta()` --calls--> `validImageUrl()`  [EXTRACTED]
  src/components/SectionRenderer.jsx → src/lib/cms.js
- `App()` --calls--> `getNavigation()`  [EXTRACTED]
  src/App.jsx → src/lib/cms.js
- `App()` --calls--> `getPostCategories()`  [EXTRACTED]
  src/App.jsx → src/lib/cms.js
- `App()` --calls--> `getPosts()`  [EXTRACTED]
  src/App.jsx → src/lib/cms.js

## Import Cycles
- None detected.

## Communities (20 total, 2 thin omitted)

### Community 0 - "App.jsx"
Cohesion: 0.10
Nodes (24): App(), articleSlugFromPath(), ErrorBoundary, resolveRoute(), routes, contacts, ContactSection(), Footer() (+16 more)

### Community 1 - "content.js"
Cohesion: 0.47
Nodes (5): Masonry(), MEDIA_COLUMNS, MEDIA_QUERIES, preloadImages(), useMedia()

### Community 2 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, preview, test, type (+1 more)

### Community 3 - "Nametag3D.jsx"
Cohesion: 0.15
Nodes (12): AboutPage(), Nametag3D, TeamLanyards, Badge(), LanyardCanvas(), makeBandTexture(), aboutHeroText, aboutStats (+4 more)

### Community 4 - "dependencies"
Cohesion: 0.06
Nodes (33): animejs, @fontsource/outfit, gsap, @gsap/react, lenis, lottie-react, meshline, dependencies (+25 more)

### Community 5 - "AboutPage.jsx"
Cohesion: 0.05
Nodes (38): 10.1 Data Inventory, 10.2 User Rights (UU PDP), 10.3 Data Security Checklist, 10.4 Privacy Policy & Terms of Service, 10. Data Privacy & Compliance, 11.1 Screen List, 11.2 Design References, 11.3 User Flow Utama (+30 more)

### Community 7 - "@fontsource/outfit"
Cohesion: 0.09
Nodes (23): 6.1 Tech Stack, 6.2 System Architecture, 6.3 Database Schema, 6.4 API Contract, 6.5 Project Structure, 6.6 Third-Party Integrations, 6. Technical Architecture, API Versioning Strategy (+15 more)

### Community 8 - "gsap"
Cohesion: 0.21
Nodes (6): EcosystemPinnedScroll(), storyStages, HeroSection(), Cta(), GenericCards(), validImageUrl()

### Community 9 - "@gsap/react"
Cohesion: 0.22
Nodes (9): 4.1 Feature Priority (MoSCoW), 4.2 Feature List, 4.3 Functional Requirements, 4.4 Non-Functional Requirements, 4. Features & Requirements, F-01: Authentication & Role Based Access, F-02: Real-Time IoT Monitoring Dashboard, F-03: Circular Ecosystem Log & Resource Calculator (+1 more)

### Community 10 - "lenis"
Cohesion: 0.25
Nodes (8): 2.1 Goals (In Scope), 2.2 Non-Goals (Out of Scope), 2.3 MVP Boundary, 2.4 Product Metrics (Business KPI), 2.5 Technical Metrics (Engineering KPI), 2. Goals & Success Metrics, Yang MASUK MVP (harus selesai sebelum launch):, Yang TIDAK masuk MVP (ditunda ke iterasi berikutnya):

### Community 11 - "8. Testing Strategy"
Cohesion: 0.15
Nodes (20): ArticleDetail(), DEFAULT_DATA, FeaturedProductsSection(), LatestArticle(), ProductCatalog(), SolutionsSection(), benefits, ecosystemFloaters (+12 more)

### Community 12 - "meshline"
Cohesion: 0.29
Nodes (7): 1.1 Problem Statement, 1.2 Proposed Solution, 1.3 Value Proposition, 1.4 Competitive Landscape, 1.5 Monetization Model, 1.6 Assumptions, 1. Overview

### Community 13 - "@phosphor-icons/react"
Cohesion: 0.29
Nodes (7): 7.1 General Principles, 7.2 Backend Standards (Python / FastAPI), 7.3 Frontend/Mobile Standards (Flutter / Dart), 7.4 API Response Format Standard, 7.5 Git Workflow, 7.6 Linting & Formatting Tools, 7. Coding Standards

### Community 14 - "react-dom"
Cohesion: 0.33
Nodes (6): 12.1 Communication Cadence, 12.2 Phases / Milestones, 12.3 Sprint Breakdown, 12. Sprint Planning & Timeline, Sprint 1 — (13/07/2026 - 24/07/2026), Sprint 2 — (27/07/2026 - 07/08/2026)

### Community 15 - "@react-three/drei"
Cohesion: 0.33
Nodes (6): 3.1 Target Users, 3.2 Stakeholders, 3.3 RACI Matrix, 3. User & Stakeholder, Persona 1: Pak Hendra (Peternak Ikan & Ayam Mitra JagoFarm), Persona 2: Rina (Agropreneur & Pengelola Greenhouse Melon Premium)

### Community 17 - "SectionRenderer.jsx"
Cohesion: 0.33
Nodes (6): 9.1 Log Levels, 9.2 Log Format (Structured JSON), 9.3 Yang Wajib Di-log, 9.4 Error Handling Pattern, 9.5 Monitoring & Alerting, 9. Logging, Monitoring & Error Handling

## Knowledge Gaps
- **131 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+126 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Product Requirements Document (PRD)` connect `AboutPage.jsx` to `@fontsource/outfit`, `@gsap/react`, `lenis`, `meshline`, `@phosphor-icons/react`, `react-dom`, `@react-three/drei`, `SectionRenderer.jsx`?**
  _High betweenness centrality (0.164) - this node is a cross-community bridge._
- **Why does `6. Technical Architecture` connect `@fontsource/outfit` to `AboutPage.jsx`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _131 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10084033613445378 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `AboutPage.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._
- **Should `@fontsource/outfit` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._