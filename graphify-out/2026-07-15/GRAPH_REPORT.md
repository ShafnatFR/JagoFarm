# Graph Report - JagoFarm  (2026-07-15)

## Corpus Check
- 22 files · ~569,626 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 211 nodes · 227 edges · 18 communities (17 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `da4b7b8a`
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
- lottie-react
- meshline
- @phosphor-icons/react
- react-dom
- @react-three/drei
- @react-three/fiber

## God Nodes (most connected - your core abstractions)
1. `Product Requirements Document (PRD)` - 20 edges
2. `6.4 API Contract` - 11 edges
3. `8. Testing Strategy` - 8 edges
4. `1. Overview` - 7 edges
5. `6. Technical Architecture` - 7 edges
6. `7. Coding Standards` - 7 edges
7. `2. Goals & Success Metrics` - 6 edges
8. `6.3 Database Schema` - 6 edges
9. `9. Logging, Monitoring & Error Handling` - 6 edges
10. `4. Features & Requirements` - 5 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (18 total, 1 thin omitted)

### Community 0 - "App.jsx"
Cohesion: 0.09
Nodes (19): App(), routes, AboutPage(), Nametag3D, TeamLanyards, contacts, ContactSection(), EcosystemPinnedScroll() (+11 more)

### Community 1 - "content.js"
Cohesion: 0.17
Nodes (12): FeaturedProductsSection(), filters, ProductCatalog(), SolutionsSection(), benefits, ecosystemFloaters, ecosystemSteps, featuredProducts (+4 more)

### Community 2 - "package.json"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, preview, type, version

### Community 3 - "Nametag3D.jsx"
Cohesion: 0.28
Nodes (4): Badge(), LanyardCanvas(), makeBandTexture(), members

### Community 4 - "dependencies"
Cohesion: 0.06
Nodes (33): animejs, @fontsource/outfit, gsap, @gsap/react, lenis, lottie-react, meshline, dependencies (+25 more)

### Community 5 - "AboutPage.jsx"
Cohesion: 0.06
Nodes (31): 11.1 Screen List, 11.2 Design References, 11.3 User Flow Utama, 11. UI/UX Requirements, 13.1 Internal Dependencies, 13.2 External Dependencies, 13.3 Library Dependencies, 13. Dependencies (+23 more)

### Community 7 - "@fontsource/outfit"
Cohesion: 0.17
Nodes (12): 6.1 Tech Stack, 6.2 System Architecture, 6.3 Database Schema, 6.5 Project Structure, 6.6 Third-Party Integrations, 6. Technical Architecture, DDL Schema:, Design Decisions: (+4 more)

### Community 8 - "gsap"
Cohesion: 0.18
Nodes (11): 6.4 API Contract, API Versioning Strategy, Endpoint: GET /api/v1/circular-logs, Endpoint: POST /api/v1/ai/predict-harvest (`[PAID]`), Endpoint: POST /api/v1/auth/login, Endpoint: POST /api/v1/auth/refresh, Endpoint: POST /api/v1/auth/register, Endpoint: POST /api/v1/circular-logs (+3 more)

### Community 9 - "@gsap/react"
Cohesion: 0.22
Nodes (9): 4.1 Feature Priority (MoSCoW), 4.2 Feature List, 4.3 Functional Requirements, 4.4 Non-Functional Requirements, 4. Features & Requirements, F-01: Authentication & Role Based Access, F-02: Real-Time IoT Monitoring Dashboard, F-03: Circular Ecosystem Log & Resource Calculator (+1 more)

### Community 10 - "lenis"
Cohesion: 0.25
Nodes (8): 2.1 Goals (In Scope), 2.2 Non-Goals (Out of Scope), 2.3 MVP Boundary, 2.4 Product Metrics (Business KPI), 2.5 Technical Metrics (Engineering KPI), 2. Goals & Success Metrics, Yang MASUK MVP (harus selesai sebelum launch):, Yang TIDAK masuk MVP (ditunda ke iterasi berikutnya):

### Community 11 - "lottie-react"
Cohesion: 0.25
Nodes (8): 8.1 Testing Pyramid, 8.2 Unit Testing, 8.3 Integration Testing, 8.4 UI / Widget Testing (Flutter), 8.5 Coverage Targets, 8.6 Testing Tools, 8.7 Load & Performance Testing, 8. Testing Strategy

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

### Community 16 - "@react-three/fiber"
Cohesion: 0.40
Nodes (5): 10.1 Data Inventory, 10.2 User Rights (UU PDP), 10.3 Data Security Checklist, 10.4 Privacy Policy & Terms of Service, 10. Data Privacy & Compliance

## Knowledge Gaps
- **127 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+122 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Product Requirements Document (PRD)` connect `AboutPage.jsx` to `@fontsource/outfit`, `@gsap/react`, `lenis`, `lottie-react`, `meshline`, `@phosphor-icons/react`, `react-dom`, `@react-three/drei`, `@react-three/fiber`?**
  _High betweenness centrality (0.252) - this node is a cross-community bridge._
- **Why does `6. Technical Architecture` connect `@fontsource/outfit` to `gsap`, `AboutPage.jsx`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `6.4 API Contract` connect `gsap` to `@fontsource/outfit`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _127 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0896551724137931 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `AboutPage.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._