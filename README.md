# AERO — AI Driven Real Estate

An award-caliber real estate landing page built with Next.js, GSAP, React Three Fiber, and Lenis Smooth Scroll.

---

## Tech Stack

| Layer | Library |
|-------|---------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + CSS Custom Properties |
| Animation | GSAP (ScrollTrigger, ScrollToPlugin, Flip) |
| 3D / WebGL | React Three Fiber, Drei, custom GLSL shaders |
| Smooth Scroll | @studio-freight/lenis |
| Performance | Dynamic imports, mobile fallbacks, dpr capping |

---

## Quick Start

```bash
cd aero-estate
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Architecture

```
aero-estate/
├── app/
│   ├── globals.css          # Design tokens, cursor, noise overlay
│   ├── layout.tsx           # Lenis provider + GSAP sync root
│   └── page.tsx             # Section assembly
│
├── components/
│   ├── hero/
│   │   ├── HeroSection.tsx  # GSAP split-text char reveal, parallax
│   │   └── HeroCanvas.tsx   # R3F glass sculpture + particles
│   │
│   ├── cards/
│   │   └── WhoWeAreSection.tsx  # Z-axis fly-in + 3D magnetic tilt
│   │
│   ├── projects/
│   │   ├── ProjectsSection.tsx  # GSAP pinned horizontal scroll
│   │   ├── LiquidImage.tsx      # GLSL liquid distortion shader
│   │   ├── PropertyDetail.tsx   # Slide-in overlay + 3D floorplan
│   │   └── FloorplanViewer.tsx  # Interactive R3F 3D floor plan
│   │
│   ├── leadership/
│   │   └── LeadershipSection.tsx  # CSS 3D cylinder carousel
│   │
│   ├── testimonials/
│   │   ├── BlogSection.tsx         # Snap-scroll horizontal blog cards
│   │   └── TestimonialsSection.tsx # Parallax + liquid blur-fade cycler
│   │
│   ├── contact/
│   │   └── ContactSection.tsx   # Magnetic submit button
│   │
│   ├── footer/
│   │   ├── Footer.tsx           # Magnetic socials
│   │   └── FooterGlobe.tsx      # Slow-rotating R3F wireframe globe
│   │
│   └── ui/
│       ├── CustomCursor.tsx     # Gold dot + lagging ring cursor
│       └── Magnetic.tsx         # Reusable magnetic wrapper
│
├── hooks/
│   └── useIsMobile.ts       # 768px breakpoint hook
│
└── lib/
    ├── properties.ts        # Property data
    └── shaders.ts           # GLSL vertex + fragment shaders
```

---

## Key Animation Details

### Hero — Split Text Char Flip
Characters are individually wrapped and animated with `rotateX(-80deg) → 0` + `translateY(110%) → 0` with staggered delay via GSAP. The WebGL background de-blurs on load.

### Who We Are — Z-Axis Fly-In
Cards start at `z: -300, rotateX: 25` and fly forward on scroll into view. Mouse hover applies dynamic `rotateY/rotateX` tilt with an inner content layer at `translateZ(30px)` for parallax depth.

### Featured Projects — Pinned Horizontal Scroll
`ScrollTrigger` pins the section and maps vertical scroll progress to a `translateX` on the card track. Total scroll distance = `track.scrollWidth - window.innerWidth`.

### Liquid Distortion Shader
A custom GLSL fragment shader combines:
- Distance-based ripple from mouse UV position: `sin(dist * 28 - time * 4)`
- Organic Perlin noise: layered `fract(sin(...))` hash functions
- UV distortion applied to texture sample with edge vignette falloff

### 3D Leadership Cylinder
CSS `perspective: 1200px` + `transform-style: preserve-3d` on a container. Cards are positioned with `rotateY(i * 90deg) translateZ(220px)`. GSAP rotates the container `rotateY` to cycle to any index.

### Testimonials — Liquid Blur Fade
Outgoing text animates to `filter: blur(8px), opacity: 0, x: -20px`, content swaps, then incoming text fades in clean. Parallax quotation marks track `ScrollTrigger.getVelocity()`.

### Footer Globe
R3F sphere with `wireframe: true`, torus rings at varying angles, Fibonacci-spaced dot positions — all slowly rotating on `useFrame`.

---

## Performance Guardrails

- All heavy WebGL components loaded with `dynamic(() => import(...), { ssr: false })`
- `useIsMobile()` hook: simplified geometry on `≤ 768px`, `dpr` capped at `1`
- `powerPreference: 'high-performance'` on all WebGL canvases
- GSAP `lagSmoothing(0)` prevents spiral-of-death on slow tabs
- Lenis `duration: 1.4` with exponential easing for buttery 60fps scroll

---

## Customization

**Colors** — Edit CSS variables in `app/globals.css`:
```css
--cream: #F4EFE6;
--ink: #141210;
--gold: #C8A96E;
```

**Properties** — Edit `lib/properties.ts` to add/change listings.

**Shader intensity** — In `lib/shaders.ts`, adjust:
- `28.0` — ripple frequency
- `0.012` — ripple amplitude
- `0.5` — falloff radius

---

## Production Build

```bash
npm run build
npm start
```

Ensure `NEXT_PUBLIC_` env vars are set if you integrate a real CMS or API.
