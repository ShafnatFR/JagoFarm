# Graph Report - JagoFarm  (2026-07-14)

## Corpus Check
- 20 files · ~633,282 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 97 nodes · 116 edges · 22 communities (7 shown, 15 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e2ba0387`
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
- @react-three/rapier
- three
- vite
- @vitejs/plugin-react

## God Nodes (most connected - your core abstractions)
1. `scripts` - 4 edges
2. `icons` - 4 edges
3. `@fontsource/outfit` - 2 edges
4. `@gsap/react` - 2 edges
5. `@phosphor-icons/react` - 2 edges
6. `@react-three/drei` - 2 edges
7. `@react-three/fiber` - 2 edges
8. `@react-three/rapier` - 2 edges
9. `@vitejs/plugin-react` - 2 edges
10. `animejs` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (22 total, 15 thin omitted)

### Community 0 - "App.jsx"
Cohesion: 0.14
Nodes (12): App(), routes, AboutPage(), Nametag3D, TeamLanyards, contacts, ContactSection(), GlobalMotion() (+4 more)

### Community 1 - "content.js"
Cohesion: 0.16
Nodes (13): EcosystemPinnedScroll(), FeaturedProductsSection(), filters, ProductCatalog(), SolutionsSection(), benefits, ecosystemFloaters, ecosystemSteps (+5 more)

### Community 2 - "package.json"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, preview, type, version

### Community 3 - "Nametag3D.jsx"
Cohesion: 0.28
Nodes (4): Badge(), LanyardCanvas(), makeBandTexture(), members

### Community 4 - "dependencies"
Cohesion: 0.40
Nodes (5): animejs, dependencies, animejs, react, react

### Community 5 - "AboutPage.jsx"
Cohesion: 0.40
Nodes (4): companyLinks, Footer(), links, productLinks

## Knowledge Gaps
- **37 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+32 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`, `@fontsource/outfit`, `gsap`, `@gsap/react`, `lenis`, `lottie-react`, `meshline`, `@phosphor-icons/react`, `react-dom`, `@react-three/drei`, `@react-three/fiber`, `@react-three/rapier`, `three`, `vite`, `@vitejs/plugin-react`?**
  _High betweenness centrality (0.168) - this node is a cross-community bridge._
- **Why does `@fontsource/outfit` connect `@fontsource/outfit` to `dependencies`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _37 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1368421052631579 - nodes in this community are weakly interconnected._