# Plan: Interactive Globe Portfolio

## Context

A single-page portfolio site where a 3D spinning globe acts as the primary navigation element. Four geo-pinned markers on the globe correspond to four portfolio sections: About Me, Projects, Technology & Skills, and Let's Connect. The user can drag the globe to rotate it and click a pin to fly to that section. The globe auto-spins when idle. The aesthetic is **kinetic / dark-space**: motion is primary, the canvas is deep dark, luminous accents punctuate interaction points.

---

## Aesthetic Decisions

**Stance:** Kinetic — motion is the hero, dark canvas with light motion highlights.

**Fonts (Google Fonts):**
- Display: `Syne` (expressive, slightly technical — fits the space/exploration tone)  
  *Wait — per aesthetic stance, Syne is overused. Use `DM Serif Display` for section headings (warm, editorial, memorable)*
- Body: `Inter` (readable, neutral)
- Wired via `@import` in `src/index.css` before all other CSS

**Palette (dark ground):**
- Background: `#050810` (near-black with blue tinge — deep space)
- Foreground: `#E8EDF5`
- Primary (globe glow / pin accent): `#4DFFC3` (electric mint — unusual, not blue)
- Secondary surfaces: `#0D1526`
- Muted: `#1A2540`
- Accent: `#FF6B4A` (warm coral — warm/cool contrast, for hover/active states)
- Border: `rgba(77, 255, 195, 0.15)`

---

## Technology

**Three.js** for the 3D globe — installed via `pnpm add three @types/three`.

The globe renders:
- A sphere with a custom shader or texture for the earth surface (use a dark/glowing style)
- 4 animated pin markers positioned at specific lat/lon coordinates
- Raycasting for click detection on pins
- Auto-rotation that pauses on user drag
- Smooth orbit controls (manual implementation — no need for Three.js OrbitControls full library, just pointer drag math)

---

## File Structure

```
src/
  App.tsx                  — layout shell, section router, scroll state
  components/
    Globe.tsx              — Three.js canvas, auto-spin, drag, pin raycasting
    GlobePin.tsx           — pin mesh + label billboard
    sections/
      AboutMe.tsx
      Projects.tsx
      TechSkills.tsx
      LetsConnect.tsx
  index.css                — font imports + tailwind + theme tokens
```

---

## Implementation Plan

### 1. Install Three.js
```
pnpm add three @types/three
```

### 2. Wire fonts and theme tokens in `src/index.css`
- Add Google Fonts `@import` for `DM Serif Display` and `Inter` at the top
- Add CSS custom properties for the dark-space palette

### 3. Build `Globe.tsx`
- `useRef` on a `<canvas>` element
- Three.js scene: `WebGLRenderer`, `PerspectiveCamera`, `Scene`
- Earth sphere: `SphereGeometry` + `MeshPhongMaterial` with a dark texture or procedural appearance (dark base + glowing edges via custom vertex/fragment shader or atmosphere overlay mesh)
- Star field: `Points` geometry, ~2000 random points in a large sphere shell
- 4 pins: small cone/sphere meshes at lat/lon positions, converted to 3D cartesian on the unit sphere
  - Pin positions (approximate, spread around globe):
    - About Me: Northern Europe (55°N, 10°E)
    - Projects: North America (40°N, -100°W)
    - Tech & Skills: East Asia (35°N, 135°E)
    - Let's Connect: South America (-15°S, -50°W)
- Labels: HTML overlay `<div>` elements positioned via `Vector3.project()` each frame (CSS absolute positioning over canvas)
- Auto-rotation: increment `globe.rotation.y` each frame; pause when `isDragging`
- Drag: `pointerdown` / `pointermove` / `pointerup` handlers update rotation delta
- Click/raycasting: on `pointerup` with minimal movement, raycast against pin meshes and fire `onSectionSelect(id)`
- Glow atmosphere: second slightly-larger sphere with additive blending, low opacity, primary color

### 4. Build `App.tsx`
- State: `activeSection: string | null`
- Globe centered in viewport (full 100vh hero)
- When a pin is clicked → `activeSection` updates → section panel slides up from bottom (CSS transition) or full scroll
- Navigation overlay: small dot nav at bottom showing which section is active
- Sections render below the fold; clicking a pin smoothly scrolls to the section AND highlights the pin

### 5. Build section components (About Me, Projects, Tech & Skills, Let's Connect)
- Each is a full-width section below the globe
- Dark cards, generous whitespace, DM Serif Display headings, Inter body
- Projects: 2–3 placeholder project cards with mock titles, descriptions, tech tags
- Tech & Skills: icon grid or tag cloud with skill names
- Let's Connect: email link + social icon links (GitHub, LinkedIn)
- About Me: short bio paragraph + portrait placeholder

### 6. Polish
- Pin pulse animation (CSS keyframe ring expanding from pin center)
- Hover state on pins: scale up + label becomes more prominent
- Smooth scroll behavior
- Responsive: on mobile, globe is smaller (50vw), sections stack vertically

---

## Critical Files to Modify

- `src/index.css` — font imports, CSS tokens
- `src/App.tsx` — full replacement with globe + sections layout
- New: `src/components/Globe.tsx`
- New: `src/components/sections/AboutMe.tsx`, `Projects.tsx`, `TechSkills.tsx`, `LetsConnect.tsx`

---

## Verification

1. Globe renders and auto-spins on load
2. Drag gesture rotates the globe freely
3. Clicking each pin scrolls to the corresponding section
4. Section content is readable, well-styled
5. No TypeScript errors (check with `pnpm typecheck` if available)
6. Works on mobile viewport (360px wide)
