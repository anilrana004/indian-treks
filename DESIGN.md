# Indian Treks — Flipkart-Style Mobile UI Design Brief

**Brand:** Premium adventure tourism + spiritual pilgrimage platform. World-class Flipkart-inspired mobile booking experience for treks and yatras in Uttarakhand and Himachal Pradesh.

## Visual Direction

**Tone:** Clean, bright, airy, modern. Flipkart-inspired e-commerce aesthetic applied to adventure travel. Professional, approachable, conversion-focused. Emphasis on whitespace, clarity, and green/gold accents.

**Differentiation:** Light green primary with white backgrounds, gold CTAs for urgency, subtle green accents for secondary actions. Trek cards inspired by Flipkart product cards — white background, left green border, price in gold. Navigation: white header with green text/icons.

## Palette (OKLCH — Light Primary Only)

| Token | OKLCH | Hex | Purpose |
| --- | --- | --- | --- |
| Primary (Green) | 0.48 0.13 146 | #38A169 | Main brand, nav accents, secondary buttons |
| Accent (Gold) | 0.72 0.18 80 | #F59E0B | CTAs, urgency badges, highlights |
| Background | 0.99 0.002 0 | #FFFFFF | Main canvas, card backgrounds |
| Muted Surface | 0.92 0.008 0 | #F0F9F4 | Light green sections, hover states |
| Foreground | 0.15 0.005 0 | #1F2937 | Primary text, dark ink |
| Border | 0.88 0.008 0 | #E5E7EB | Dividers, card borders |
| Success | 0.55 0.15 146 | #10B981 | Positive actions |
| Destructive | 0.55 0.22 25 | #EF4444 | Alerts, warnings |

## Typography

| Role | Font | Scale | Weight |
| --- | --- | --- | --- |
| Display | Playfair Display | 48/36 | 700 |
| Body | Inter | 16 | 400–600 |
| Accent | Space Grotesk | 14 | 600 |
| Mono | JetBrains Mono | 12–14 | 400 |

## Structural Zones

| Zone | Background | Border | Shadow | Use |
| --- | --- | --- | --- | --- |
| Header | #FFFFFF | #E5E7EB | xs | Sticky nav. Green text, icons. White bg. |
| Hero | gradient overlay | none | lg | Trek image + white text. Gold "Book" button. |
| Cards | #FFFFFF | left 4px #38A169 | subtle | Trek/Yatra product cards. Flipkart style. |
| Sections | #F0F9F4 | none | none | Light green background alternating sections. |
| Footer | #FFFFFF | top border #E5E7EB | none | Links, social. Green text. |

## Component Patterns

**Trek Card (Flipkart Style):** White background, left 4px green border, 16:9 image top, badges (green/amber), trek name bold, location gray, price in gold bold, duration/altitude gray, "Book" button gold. Hover: -4px elevation, subtle shadow.

**Buttons:** Primary (gold bg, white text) for CTAs. Secondary (green text, white bg, green border) for alternates. Border-radius: 4px (sharp, editorial).

**Navigation:** White sticky header, green active links/icons, hamburger expands full-width white menu with green accents.

**Badges:** Easy = green, Moderate = amber, Difficult = orange, Extreme = red. Pill-shaped, 10px padding, sans-serif.

## Motion & Animation

| Animation | Duration | Use |
| --- | --- | --- |
| fade-in | 0.3s | Page/modal load |
| slide-in-from-top | 0.3s | Dropdown reveal |
| pulse-subtle | 2s | Available badge, CTA attention |
| transition-smooth | 0.3s | Hover, scroll effects |

## Spacing

**Baseline:** 4px grid. Mobile padding: 16px. Card gap: 12px. Section vertical spacing: 32px. Border-radius: 12px cards, 4px buttons.

## Signature Details

**Green Accent Left Border:** All trek/yatra cards feature a 4px light green left border — distinctive Flipkart-inspired signal.

**Gold Price Text:** Bold, eye-catching price display in amber/gold (#F59E0B).

**Clean Dividers:** Subtle light borders (#E5E7EB) separate sections. No heavy shadows or dark overlays.

**Floating CTA Buttons:** "Book Now" buttons float over content with gold background, white text, subtle shadow, fixed on mobile.

## Design Tokens (Light Mode Only)

**:root:**
- --primary: #38A169 (light green)
- --accent: #F59E0B (gold/amber)
- --background: #FFFFFF (white)
- --muted: #F0F9F4 (light green bg)
- --foreground: #1F2937 (dark ink)
- --border: #E5E7EB (light border)
- --success: #10B981 (green)
- --destructive: #EF4444 (red)

**Fonts:**
- --font-display: Playfair Display
- --font-ui: Inter
- --font-body: Inter
- --font-mono: JetBrains Mono

## Accessibility & Performance

**A11y:** WCAG AA contrast. Semantic HTML. Touch targets 44×44px mobile. Focus rings in green.

**Perf:** Lighthouse 90+. WebP images, lazy loading, code-split routes.

## Brand Voice

Modern, accessible, trustworthy. Clean Flipkart-inspired product interface applied to premium adventure travel. Every interaction is bright, clear, and conversion-focused. Green = trust, Gold = action.
