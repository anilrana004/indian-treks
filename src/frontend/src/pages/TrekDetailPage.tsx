import { treks } from "@/data/treks";
import type { GalleryCategory, ItineraryDay, MonthStatus, Trek } from "@/types";
import { useParams } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Star,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Design tokens ──────────────────────────────────────────────────────────
const GLACIER = "#4DA8C7";
const SUMMIT = "#E8C547";
const MIDNIGHT = "#0A0E1A";
const FOREST = "#1B3A2D";
const PINE = "#2E5E3E";
const EMBER = "#C94F2A";
const ASH = "#D4CFC8";
const SNOW = "#F5F2EC";

const difficultyColors: Record<string, string> = {
  Easy: PINE,
  "Easy-Moderate": "#4a9a5e",
  Moderate: GLACIER,
  "Moderate-Difficult": "#e0854a",
  Challenging: EMBER,
  Difficult: EMBER,
  "Very Difficult": "#a33820",
  Extreme: "#7a1e10",
};

const _monthDotColor: Record<MonthStatus, string> = {
  best: PINE,
  possible: SUMMIT,
  closed: EMBER,
};

const _monthBgColor: Record<MonthStatus, string> = {
  best: "rgba(46,94,62,0.15)",
  possible: "rgba(232,197,71,0.15)",
  closed: "rgba(201,79,42,0.12)",
};

const _monthTextColor: Record<MonthStatus, string> = {
  best: PINE,
  possible: SUMMIT,
  closed: EMBER,
};

// ─── Default fallbacks ────────────────────────────────────────────────────────
const DEFAULT_INCLUSIONS = [
  "Expert certified mountain guide",
  "All meals from Day 1 dinner to final breakfast",
  "High-quality dome tents / camping gear",
  "Sleeping bags (−15°C rated)",
  "All forest/national park permits",
  "Emergency satellite communication",
  "High-altitude first aid kit + Gamow bag",
  "Trek leader + support staff (1:6 guide ratio)",
  "Mules for common equipment transport",
  "Transport from base city to trek start",
];

const DEFAULT_EXCLUSIONS = [
  "Flights / trains to base city",
  "Personal trekking gear (boots, jacket, bag)",
  "Personal travel insurance",
  "Porter charges (available at extra cost: ₹700/day)",
  "Meals in cities before/after trek",
  "Tips to guides and porters (customary but voluntary)",
  "Medical evacuation by helicopter (if required)",
  "Any costs due to early exit or bad weather",
];

const DEFAULT_GEAR_CATEGORIES = [
  {
    label: "Clothing",
    icon: "👕",
    items: [
      "Thermal inner wear (top + bottom) ×2",
      "Fleece jacket",
      "Down jacket / puffer coat",
      "Waterproof jacket + pants",
      "Trekking pants ×2",
      "Woollen socks ×4 pairs",
      "Gloves (inner + outer)",
      "Balaclava / face cover",
    ],
  },
  {
    label: "Footwear",
    icon: "🥾",
    items: [
      "Trekking boots with ankle support (waterproof)",
      "Gaiters (recommended in winter)",
      "Camp sandals / slippers",
    ],
  },
  {
    label: "Backpack & Gear",
    icon: "🎒",
    items: [
      "Trek rucksack 50–60L with rain cover",
      "Day pack 20–25L",
      "Dry bags / zip-lock bags",
      "Trekking poles (recommended)",
      "Head torch + extra batteries",
      "Sunscreen SPF 50+",
      "UV400 Sunglasses",
    ],
  },
  {
    label: "Medical Kit",
    icon: "💊",
    items: [
      "Diamox (altitude sickness — consult doctor)",
      "Personal prescription medications",
      "Paracetamol, Ibuprofen",
      "Antacid, ORS sachets",
      "Blister plasters, bandages",
      "Cough drops, lip balm",
    ],
  },
  {
    label: "Documents",
    icon: "📄",
    items: [
      "Govt. photo ID (Aadhaar / Passport)",
      "Medical fitness certificate",
      "Booking confirmation email",
      "Emergency contact card",
    ],
  },
];

const ROOPKUND_ITINERARY: ItineraryDay[] = [
  {
    day: 1,
    title: "Arrival at Lohajung — Acclimatisation & Briefing",
    distance: "0 km trek",
    altitudeGain: "Stay at 2,220m",
    terrain: "Rest day",
    campsite: "Lohajung Village Guesthouse",
    meals: "Dinner",
    highlights: ["Gear check", "Trek briefing", "Village walk"],
    walkingHours: "Rest day",
    description:
      "Arrive at Lohajung (2,220m), the gateway to Roopkund. A gentle acclimatisation walk in the evening through oak and buransh forests. Meet the trek leader for a comprehensive briefing on route, safety, and high-altitude protocol.",
  },
  {
    day: 2,
    title: "Lohajung → Didna Village",
    distance: "9 km",
    altitudeGain: "Gain: 460m (2,220m → 2,680m)",
    terrain: "Forest trail, village paths",
    campsite: "Didna Village",
    meals: "Breakfast, Lunch, Dinner",
    highlights: [
      "Panoramic valley views",
      "Traditional Garhwali village",
      "Walnut orchards",
    ],
    walkingHours: "4–5 hrs",
    description:
      "Descend through mixed forest to the Bedni Nala, cross the river, and climb steadily to the ancient village of Didna. The trail winds past terraced fields and walnut groves with sweeping views of the Nanda Ghunti massif. Camp in the village meadow.",
  },
  {
    day: 3,
    title: "Didna → Ali Bugyal",
    distance: "11 km",
    altitudeGain: "Gain: 945m (2,680m → 3,625m)",
    terrain: "Dense forest, open meadow",
    campsite: "Ali Bugyal",
    meals: "Breakfast, Lunch, Dinner",
    highlights: [
      "Dense rhododendron forest",
      "Ali Bugyal — India's largest alpine meadow",
      "360° panorama",
    ],
    walkingHours: "6–7 hrs",
    description:
      "A long, rewarding ascent through magical rhododendron and oak forest. As the trees thin, the trail opens dramatically onto Ali Bugyal — a rolling alpine meadow at 3,625m with unobstructed views of Trishul, Nanda Ghunti, and Roopkund ridge. Camp on the meadow.",
  },
  {
    day: 4,
    title: "Ali Bugyal → Bedni Bugyal",
    distance: "5 km",
    altitudeGain: "Loss: 271m (3,625m → 3,354m)",
    terrain: "Open bugyal, easy path",
    campsite: "Bedni Bugyal",
    meals: "Breakfast, Lunch, Dinner",
    highlights: [
      "Bedni Kund sacred lake",
      "Ancient Latu Devta temple",
      "Meadow with peak backdrops",
    ],
    walkingHours: "3–4 hrs",
    description:
      "A short, pleasant walk across the vast bugyal landscape to Bedni Bugyal (3,354m), considered one of the most beautiful campsites in the Himalayas. Visit the Latu Devta temple and the sacred Bedni Kund lake. Rest and acclimatise for the high camps ahead.",
  },
  {
    day: 5,
    title: "Bedni Bugyal → Pathar Nachuni",
    distance: "7 km",
    altitudeGain: "Gain: 696m (3,354m → 4,050m)",
    terrain: "Rocky moraine, snow patches",
    campsite: "Pathar Nachuni",
    meals: "Breakfast, Lunch, Dinner",
    highlights: [
      "Stone plateau camp",
      "First glacial views",
      "Mountain goat sightings",
    ],
    walkingHours: "5–6 hrs",
    description:
      "The trail leaves the bugyals behind and climbs steadily onto rocky moraines. The vegetation thins and the air becomes noticeably crisper. Camp at the stony plateau of Pathar Nachuni (4,050m) — your last comfortable night before the final push.",
  },
  {
    day: 6,
    title: "Pathar Nachuni → Roopkund → Bedni Bugyal",
    distance: "8 km",
    altitudeGain: "Gain: 979m, Loss: 1,625m",
    terrain: "Snow, rock, steep descent",
    campsite: "Bedni Bugyal",
    meals: "Breakfast, Packed Lunch, Dinner",
    highlights: [
      "Roopkund Lake (5,029m)",
      "Ancient skeletal remains",
      "Summit panorama",
    ],
    walkingHours: "7–8 hrs",
    description:
      "The summit push begins before dawn. A steep climb through snow and rock leads to the legendary Roopkund Lake at 5,029m — the mystery lake whose shores are littered with ancient human skeletal remains, dated to the 9th century CE. Soak in panoramic views of the Himalayan giants before descending all the way back to Bedni Bugyal.",
  },
  {
    day: 7,
    title: "Bedni Bugyal → Lohajung",
    distance: "16 km",
    altitudeGain: "Loss: 1,275m (3,354m → 2,220m)",
    terrain: "Forest descent, village paths",
    campsite: "Lohajung Village",
    meals: "Breakfast, Lunch, Dinner",
    highlights: [
      "Long descent through forest",
      "Farewell views of Trishul",
      "Celebration dinner",
    ],
    walkingHours: "7–8 hrs",
    description:
      "A long but spirit-filled descent retracing the forested trail through Bedni, Ali Bugyal, and back down to Lohajung. The mountains bid farewell as rhododendron blooms surround the path. Arrive at Lohajung for a celebratory dinner with the team.",
  },
  {
    day: 8,
    title: "Departure from Lohajung",
    distance: "Drive to Kathgodam",
    altitudeGain: "Descent to plains",
    terrain: "Road drive",
    campsite: "N/A",
    meals: "Breakfast",
    highlights: ["Final mountain views", "Kathgodam railway station drop"],
    walkingHours: "~5–6 hrs drive",
    description:
      "After a hearty breakfast, transfer to Kathgodam (approx. 165 km) for onward rail or road connections. The Himalayas fade in the rear-view mirror, but Roopkund stays with you forever.",
  },
];

const ROOPKUND_FAQS = [
  {
    question: "Is Roopkund Trek suitable for beginners?",
    answer:
      "No. Roopkund is rated Difficult. The trek crosses 5,000m altitude, involves steep rocky terrain and significant snowfields. Trekkers need prior high-altitude experience (at least one trek above 3,500m) and excellent physical fitness.",
  },
  {
    question: "What is the best time to do the Roopkund Trek?",
    answer:
      "May–June (pre-monsoon) and September–October (post-monsoon) are the prime windows. The valley of flowers blooms in July–August but monsoon makes the high trail dangerous. Winter (Dec–Feb) sees the route fully snow-covered and only suitable for expert trekkers.",
  },
  {
    question: "Is the trek self-guided or guided only?",
    answer:
      "For safety above 4,000m, a certified guide is mandatory. Roopkund's upper section involves glacier navigation and there is no cellular connectivity. Our guide-to-trekker ratio is 1:6 at minimum.",
  },
  {
    question: "What medical fitness is required?",
    answer:
      "You should be able to walk 8–10 km daily with a 8–10 kg backpack on uphill terrain. A VO2 max training routine (running, cycling, stair climbing) of at least 6–8 weeks is recommended. Consult your doctor about Diamox usage.",
  },
  {
    question: "Is altitude sickness a concern on Roopkund?",
    answer:
      "Yes. The trek crosses 5,000m and altitude-related illness is a real risk. We carry supplemental oxygen, a Gamow bag, and a pulse oximeter. Our itinerary includes acclimatisation days. Trekkers showing AMS symptoms will be escorted down immediately.",
  },
];

// ─── SEO hook ────────────────────────────────────────────────────────────────
function useTrekSEO(trek: Trek) {
  useEffect(() => {
    document.title = `${trek.name} — ${trek.duration} Trek | TrekRoot`;
    const metas: Record<string, string> = {
      description: `${trek.name}: ${trek.duration} trek to ${trek.altitude.toLocaleString("en-IN")}m in ${trek.district}, ${trek.state.charAt(0).toUpperCase() + trek.state.slice(1)}. Best season: ${trek.bestSeason}. Book from ₹${trek.price.toLocaleString("en-IN")}. Complete itinerary, map, reviews.`,
      "og:title": `${trek.name} — ${trek.duration} Himalayan Trek | TrekRoot`,
      "og:image": trek.heroImage,
      "og:url": `${window.location.origin}/treks/${trek.slug}`,
      "twitter:card": "summary_large_image",
    };
    for (const [k, v] of Object.entries(metas)) {
      const isOg = k.startsWith("og:") || k.startsWith("twitter:");
      const attr = isOg ? "property" : "name";
      let el = document.querySelector(
        `meta[${attr}="${k}"]`,
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, k);
        document.head.appendChild(el);
      }
      el.content = v;
    }
    const existing = document.getElementById("trek-jsonld");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "trek-jsonld";
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: trek.name,
      description: trek.aboutTrek.slice(0, 300),
      touristType: "Adventure",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: trek.rating,
        reviewCount: trek.reviews.length,
      },
      offers: { "@type": "Offer", price: trek.price, priceCurrency: "INR" },
    });
    document.head.appendChild(script);
    return () => document.getElementById("trek-jsonld")?.remove();
  }, [trek]);
}

// ─── Altitude SVG Graph ───────────────────────────────────────────────────────
function AltitudeGraph({ trek }: { trek: Trek }) {
  const profile = trek.mapData.elevationProfile;
  if (!profile.length) return null;
  const W = 100;
  const H = 40;
  const pad = 6;
  const maxAlt = Math.max(...profile.map((p) => p.altitude));
  const minAlt = Math.min(...profile.map((p) => p.altitude));
  const maxDist = profile[profile.length - 1]?.distance ?? 1;
  const x = (d: number) => pad + (d / maxDist) * (W - 2 * pad);
  const y = (a: number) =>
    H - pad - ((a - minAlt) / Math.max(maxAlt - minAlt, 1)) * (H - 2 * pad);
  const points = profile
    .map((p) => `${x(p.distance)},${y(p.altitude)}`)
    .join(" ");
  const areaPath = `M${x(profile[0]?.distance ?? 0)},${H - pad} ${profile.map((p) => `L${x(p.distance)},${y(p.altitude)}`).join(" ")} L${x(maxDist)},${H - pad} Z`;

  return (
    <div
      style={{
        background: "rgba(77,168,199,0.05)",
        borderRadius: 12,
        padding: "16px 20px",
        border: "1px solid rgba(77,168,199,0.2)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: GLACIER,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Elevation Profile
        </span>
        <div style={{ display: "flex", gap: 16 }}>
          <span
            style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: ASH }}
          >
            High:{" "}
            <span style={{ color: SUMMIT }}>
              {maxAlt.toLocaleString("en-IN")}m
            </span>
          </span>
          <span
            style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: ASH }}
          >
            Low:{" "}
            <span style={{ color: GLACIER }}>
              {minAlt.toLocaleString("en-IN")}m
            </span>
          </span>
        </div>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", height: 140, overflow: "visible" }}
        role="img"
        aria-label="Elevation profile chart"
      >
        {/* Area fill */}
        <defs>
          <linearGradient id="altGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={GLACIER} stopOpacity="0.25" />
            <stop offset="100%" stopColor={GLACIER} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#altGrad)" />
        <polyline
          points={points}
          fill="none"
          stroke={GLACIER}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Data points */}
        {profile.map((p, i) => (
          <circle
            // biome-ignore lint/suspicious/noArrayIndexKey: static elevation profile
            key={i}
            cx={x(p.distance)}
            cy={y(p.altitude)}
            r="1.2"
            fill={p.altitude === maxAlt ? SUMMIT : GLACIER}
            stroke={MIDNIGHT}
            strokeWidth="0.4"
          />
        ))}
        {/* X axis labels */}
        <text
          x={pad}
          y={H + 1}
          fill={ASH}
          fontSize="3"
          fontFamily="var(--font-mono)"
        >
          0km
        </text>
        <text
          x={W - pad}
          y={H + 1}
          fill={ASH}
          fontSize="3"
          fontFamily="var(--font-mono)"
          textAnchor="end"
        >
          {maxDist}km
        </text>
      </svg>
    </div>
  );
}

// ─── Tab type ─────────────────────────────────────────────────────────────────
type Tab =
  | "overview"
  | "itinerary"
  | "inclusions"
  | "pack"
  | "photos"
  | "reviews"
  | "faqs";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "inclusions", label: "Inclusions" },
  { id: "pack", label: "What to Pack" },
  { id: "photos", label: "Photos" },
  { id: "reviews", label: "Reviews" },
  { id: "faqs", label: "FAQs" },
];

// ─── Overview Tab ────────────────────────────────────────────────────────────
function OverviewTab({ trek }: { trek: Trek }) {
  const quickInfo = [
    { label: "Starting Point", value: trek.startPoint, icon: "📍" },
    { label: "Ending Point", value: trek.endPoint, icon: "🏁" },
    {
      label: "Max Altitude",
      value: `${trek.altitude.toLocaleString("en-IN")}m`,
      icon: "⛰️",
    },
    { label: "Best Season", value: trek.bestSeason, icon: "🌤️" },
    { label: "Duration", value: trek.duration, icon: "📅" },
    { label: "Difficulty", value: trek.difficulty, icon: "💪" },
    { label: "Group Size", value: trek.groupSize, icon: "👥" },
    {
      label: "State",
      value: trek.state.charAt(0).toUpperCase() + trek.state.slice(1),
      icon: "🗺️",
    },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      {/* About */}
      <div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 700,
            color: SNOW,
            marginBottom: 20,
          }}
        >
          About the Trek
        </h2>
        {trek.aboutTrek.split("\n\n").map((para, i) => (
          <p
            // biome-ignore lint/suspicious/noArrayIndexKey: paragraphs are positionally ordered
            key={i}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 17,
              lineHeight: 1.85,
              color: ASH,
              marginBottom: 16,
            }}
          >
            {para}
          </p>
        ))}
      </div>

      {/* Highlights */}
      {trek.highlights.length > 0 && (
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              fontWeight: 700,
              color: SNOW,
              marginBottom: 20,
            }}
          >
            Trek Highlights
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 12,
            }}
          >
            {trek.highlights.map((h) => (
              <div
                key={h.title}
                style={{
                  background: "rgba(77,168,199,0.06)",
                  border: "1px solid rgba(77,168,199,0.18)",
                  borderRadius: 12,
                  padding: "16px 18px",
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontSize: 26, lineHeight: 1 }}>{h.icon}</span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontWeight: 600,
                      color: SNOW,
                      fontSize: 14,
                      marginBottom: 4,
                    }}
                  >
                    {h.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      color: ASH,
                      fontSize: 13,
                      lineHeight: 1.6,
                    }}
                  >
                    {h.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Info Grid */}
      <div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 700,
            color: SNOW,
            marginBottom: 20,
          }}
        >
          Quick Info
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 12,
          }}
        >
          {quickInfo.map((item) => (
            <div
              key={item.label}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: "14px 16px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: GLACIER,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                {item.icon} {item.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontWeight: 600,
                  color: SNOW,
                  fontSize: 14,
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map placeholder */}
      <div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 700,
            color: SNOW,
            marginBottom: 20,
          }}
        >
          Trek Route Map
        </h2>
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(77,168,199,0.2)",
            borderRadius: 12,
            height: 320,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 40 }}>🗺️</span>
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 600,
              color: SNOW,
              fontSize: 16,
            }}
          >
            Interactive Trek Map
          </div>
          <div
            style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: ASH }}
          >
            📍 GPS route map — Leaflet.js integration coming soon
          </div>
          <a
            href={trek.howToReach.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: 8,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 20px",
              background: GLACIER,
              color: MIDNIGHT,
              borderRadius: 4,
              fontFamily: "var(--font-ui)",
              fontWeight: 600,
              fontSize: 13,
              textDecoration: "none",
            }}
            data-ocid="trek.google_maps_button"
          >
            <ExternalLink size={14} /> Get Directions
          </a>
        </div>
      </div>

      {/* Altitude Graph */}
      <div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 700,
            color: SNOW,
            marginBottom: 20,
          }}
        >
          Elevation Profile
        </h2>
        <AltitudeGraph trek={trek} />
      </div>
    </div>
  );
}

// ─── Itinerary Tab ───────────────────────────────────────────────────────────
function ItineraryTab({ trek }: { trek: Trek }) {
  const itinerary =
    trek.itinerary.length > 0 ? trek.itinerary : ROOPKUND_ITINERARY;
  const [openDays, setOpenDays] = useState<Set<number>>(new Set([1, 2]));
  const toggleDay = (day: number) =>
    setOpenDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 28,
          fontWeight: 700,
          color: SNOW,
          marginBottom: 24,
        }}
      >
        Day-by-Day Itinerary
      </h2>
      <div style={{ position: "relative" }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: 23,
            top: 24,
            bottom: 0,
            width: 2,
            background: `linear-gradient(to bottom, ${GLACIER}66, transparent)`,
            borderRadius: 2,
            zIndex: 0,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {itinerary.map((day) => {
            const isOpen = openDays.has(day.day);
            return (
              <div
                key={day.day}
                style={{ position: "relative", zIndex: 1, marginBottom: 0 }}
              >
                <button
                  type="button"
                  onClick={() => toggleDay(day.day)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 16,
                    padding: "16px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  data-ocid={`itinerary.day.${day.day}`}
                >
                  {/* Day circle */}
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: SUMMIT,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      zIndex: 2,
                      border: `3px solid ${MIDNIGHT}`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: 16,
                        color: MIDNIGHT,
                      }}
                    >
                      {day.day}
                    </span>
                  </div>
                  <div style={{ flex: 1, paddingTop: 4 }}>
                    <div
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontWeight: 700,
                        fontSize: 17,
                        color: SNOW,
                      }}
                    >
                      {day.title}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 16,
                        flexWrap: "wrap",
                        marginTop: 6,
                      }}
                    >
                      {day.distance && (
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 12,
                            color: GLACIER,
                          }}
                        >
                          📍 {day.distance}
                        </span>
                      )}
                      {day.altitudeGain && (
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 12,
                            color: GLACIER,
                          }}
                        >
                          ⛰️ {day.altitudeGain}
                        </span>
                      )}
                      {day.walkingHours && (
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 12,
                            color: GLACIER,
                          }}
                        >
                          ⏱️ {day.walkingHours}
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    style={{
                      color: GLACIER,
                      fontSize: 18,
                      paddingTop: 8,
                      flexShrink: 0,
                    }}
                  >
                    {isOpen ? "▲" : "▼"}
                  </span>
                </button>
                {isOpen && (
                  <div
                    style={{
                      marginLeft: 64,
                      marginBottom: 16,
                      background: "rgba(255,255,255,0.04)",
                      borderRadius: 12,
                      padding: 20,
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 15,
                        color: ASH,
                        lineHeight: 1.75,
                        marginBottom: 16,
                      }}
                    >
                      {day.description}
                    </p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(130px, 1fr))",
                        gap: 8,
                        marginBottom: 14,
                      }}
                    >
                      {[
                        { icon: "🏕️", label: "Campsite", value: day.campsite },
                        { icon: "🍽️", label: "Meals", value: day.meals },
                        { icon: "🏔️", label: "Terrain", value: day.terrain },
                      ].map((info) => (
                        <div
                          key={info.label}
                          style={{
                            background: "rgba(77,168,199,0.08)",
                            borderRadius: 8,
                            padding: "8px 12px",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 10,
                              color: GLACIER,
                              marginBottom: 3,
                            }}
                          >
                            {info.icon} {info.label}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-ui)",
                              fontSize: 13,
                              color: SNOW,
                              fontWeight: 500,
                            }}
                          >
                            {info.value}
                          </div>
                        </div>
                      ))}
                    </div>
                    {day.highlights.length > 0 && (
                      <div
                        style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
                      >
                        {day.highlights.map((h) => (
                          <span
                            key={h}
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 11,
                              color: SUMMIT,
                              background: "rgba(232,197,71,0.1)",
                              border: "1px solid rgba(232,197,71,0.25)",
                              borderRadius: 100,
                              padding: "3px 10px",
                            }}
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Inclusions Tab ───────────────────────────────────────────────────────────
function InclusionsTab({ trek }: { trek: Trek }) {
  const inclusions =
    trek.inclusions.length > 0 ? trek.inclusions : DEFAULT_INCLUSIONS;
  const exclusions =
    trek.exclusions.length > 0 ? trek.exclusions : DEFAULT_EXCLUSIONS;
  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 28,
          fontWeight: 700,
          color: SNOW,
          marginBottom: 24,
        }}
      >
        Inclusions &amp; Exclusions
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div
          style={{
            background: "rgba(46,94,62,0.15)",
            border: "1px solid rgba(46,94,62,0.4)",
            borderRadius: 16,
            padding: "24px 28px",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 700,
              fontSize: 16,
              color: "#7dcf8a",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            ✓ What's Included
          </h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {inclusions.map((item) => (
              <li
                key={item}
                style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
              >
                <span
                  style={{
                    color: PINE,
                    fontWeight: 700,
                    fontSize: 16,
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 14,
                    color: SNOW,
                    lineHeight: 1.6,
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div
          style={{
            background: "rgba(201,79,42,0.1)",
            border: "1px solid rgba(201,79,42,0.3)",
            borderRadius: 16,
            padding: "24px 28px",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 700,
              fontSize: 16,
              color: "#f0836a",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            ✗ What's Not Included
          </h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {exclusions.map((item) => (
              <li
                key={item}
                style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
              >
                <span
                  style={{
                    color: EMBER,
                    fontWeight: 700,
                    fontSize: 16,
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  ✗
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 14,
                    color: ASH,
                    lineHeight: 1.6,
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─── Pack Tab ─────────────────────────────────────────────────────────────────
function PackTab({ trek }: { trek: Trek }) {
  const gearHasItems = Object.values(trek.gearList).some(
    (arr) => arr.length > 0,
  );
  const categories = gearHasItems
    ? [
        { label: "Clothing", icon: "👕", items: trek.gearList.clothing },
        { label: "Footwear", icon: "🥾", items: trek.gearList.footwear },
        {
          label: "Backpack & Gear",
          icon: "🎒",
          items: trek.gearList.backpack.concat(trek.gearList.campingGear),
        },
        { label: "Medical Kit", icon: "💊", items: trek.gearList.medicines },
        { label: "Documents", icon: "📄", items: trek.gearList.documents },
      ].filter((c) => c.items.length > 0)
    : DEFAULT_GEAR_CATEGORIES;

  const allItems = categories.flatMap((c) => c.items);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [openCats, setOpenCats] = useState<Set<string>>(
    new Set(categories.map((c) => c.label)),
  );

  const toggleItem = (item: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  const toggleCat = (cat: string) =>
    setOpenCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });

  const pct = allItems.length
    ? Math.round((checked.size / allItems.length) * 100)
    : 0;

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 700,
            color: SNOW,
          }}
        >
          What to Pack
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 6,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: GLACIER,
            }}
          >
            {checked.size} of {allItems.length} items packed
          </span>
          <div
            style={{
              width: 200,
              height: 6,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 100,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${pct}%`,
                background: `linear-gradient(90deg, ${GLACIER}, ${PINE})`,
                borderRadius: 100,
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {categories.map((cat) => (
          <div
            key={cat.label}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <button
              type="button"
              onClick={() => toggleCat(cat.label)}
              style={{
                width: "100%",
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              data-ocid={`pack.category.${cat.label.toLowerCase().replace(/\s+/g, "_")}`}
            >
              <span style={{ fontSize: 20 }}>{cat.icon}</span>
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontWeight: 700,
                  fontSize: 15,
                  color: SNOW,
                  flex: 1,
                  textAlign: "left",
                }}
              >
                {cat.label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: ASH,
                }}
              >
                {cat.items.filter((i) => checked.has(i)).length}/
                {cat.items.length}
              </span>
              <span style={{ color: GLACIER, fontSize: 14 }}>
                {openCats.has(cat.label) ? "▲" : "▼"}
              </span>
            </button>
            {openCats.has(cat.label) && (
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: "0 18px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {cat.items.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => toggleItem(item)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "4px 0",
                      }}
                      data-ocid={`pack.item.${item.slice(0, 20).toLowerCase().replace(/\s+/g, "_")}`}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 4,
                          border: checked.has(item)
                            ? `2px solid ${PINE}`
                            : "2px solid rgba(255,255,255,0.2)",
                          background: checked.has(item) ? PINE : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          transition: "all 0.2s",
                        }}
                      >
                        {checked.has(item) && (
                          <span
                            style={{
                              color: SNOW,
                              fontSize: 12,
                              fontWeight: 700,
                            }}
                          >
                            ✓
                          </span>
                        )}
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-ui)",
                          fontSize: 14,
                          color: checked.has(item) ? ASH : SNOW,
                          textDecoration: checked.has(item)
                            ? "line-through"
                            : "none",
                          transition: "all 0.2s",
                          textAlign: "left",
                        }}
                      >
                        {item}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Photos Tab ──────────────────────────────────────────────────────────────
function PhotosTab({ trek }: { trek: Trek }) {
  const cats: (GalleryCategory | "All")[] = [
    "All",
    "Trail",
    "Campsite",
    "Sunrise/Sunset",
    "Group",
    "Wildlife",
    "Snow",
  ];
  const [filter, setFilter] = useState<GalleryCategory | "All">("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const filtered =
    filter === "All"
      ? trek.gallery
      : trek.gallery.filter((g) => g.category === filter);

  const goNext = useCallback(
    () =>
      setLightboxIdx((i) => (i === null ? null : (i + 1) % filtered.length)),
    [filtered.length],
  );
  const goPrev = useCallback(
    () =>
      setLightboxIdx((i) =>
        i === null ? null : (i - 1 + filtered.length) % filtered.length,
      ),
    [filtered.length],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") setLightboxIdx(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 28,
          fontWeight: 700,
          color: SNOW,
          marginBottom: 20,
        }}
      >
        Photo Gallery
      </h2>
      {/* Filter pills */}
      <div
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          paddingBottom: 8,
          marginBottom: 20,
        }}
      >
        {cats.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            style={{
              flexShrink: 0,
              padding: "6px 16px",
              borderRadius: 100,
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              fontWeight: 400,
              cursor: "pointer",
              border: "1px solid",
              transition: "all 0.2s",
              background: filter === cat ? GLACIER : "transparent",
              color: filter === cat ? MIDNIGHT : GLACIER,
              borderColor: GLACIER,
            }}
            data-ocid={`gallery.filter.${cat.toLowerCase().replace("/", "-")}_tab`}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Masonry grid */}
      {filtered.length > 0 ? (
        <div style={{ columns: "2 240px", gap: 12 }}>
          {filtered.map((img, idx) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setLightboxIdx(idx)}
              style={{
                display: "block",
                width: "100%",
                marginBottom: 12,
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 0,
                position: "relative",
                overflow: "hidden",
                borderRadius: 12,
              }}
              data-ocid={`gallery.item.${idx + 1}`}
            >
              <img
                src={img.url}
                alt={img.caption}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: 12,
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1.04)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1)";
                }}
              />
            </button>
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "60px 0",
            color: ASH,
            fontFamily: "var(--font-ui)",
          }}
        >
          No photos in this category
        </div>
      )}
      {/* Lightbox */}
      {lightboxIdx !== null && (
        // biome-ignore lint/a11y/useSemanticElements: custom overlay needs scroll prevention
        <div
          role="dialog"
          aria-label="Image lightbox"
          onClick={() => setLightboxIdx(null)}
          onKeyDown={(e) => e.key === "Escape" && setLightboxIdx(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(10,14,26,0.96)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: SNOW,
            }}
            data-ocid="gallery.prev_button"
          >
            <ChevronLeft size={24} />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            style={{ maxWidth: "90vw", maxHeight: "85vh" }}
          >
            <img
              src={filtered[lightboxIdx]?.url}
              alt={filtered[lightboxIdx]?.caption}
              style={{
                maxWidth: "100%",
                maxHeight: "75vh",
                borderRadius: 12,
                objectFit: "contain",
                display: "block",
              }}
            />
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                color: ASH,
                textAlign: "center",
                marginTop: 12,
              }}
            >
              {filtered[lightboxIdx]?.caption} &nbsp;·&nbsp;{" "}
              <span style={{ color: GLACIER }}>
                {lightboxIdx + 1}/{filtered.length}
              </span>
            </div>
          </div>
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            style={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: SNOW,
            }}
            data-ocid="gallery.next_button"
          >
            <ChevronRight size={24} />
          </button>
          <button
            type="button"
            aria-label="Close lightbox"
            onClick={() => setLightboxIdx(null)}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: SNOW,
            }}
            data-ocid="gallery.close_button"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Reviews Tab ─────────────────────────────────────────────────────────────
function ReviewsTab({ trek }: { trek: Trek }) {
  const reviews = trek.reviews;
  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: 0,
    date: "",
    text: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const avgRating = reviews.length
    ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length
    : 0;

  // Star distribution
  const dist = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: reviews.filter((r) => r.rating === s).length,
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 28,
          fontWeight: 700,
          color: SNOW,
        }}
      >
        Trekker Reviews
      </h2>

      {reviews.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 32,
            alignItems: "center",
          }}
        >
          {/* Overall */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 56,
                fontWeight: 700,
                color: SUMMIT,
                lineHeight: 1,
              }}
            >
              {avgRating.toFixed(1)}
            </div>
            <div
              style={{
                display: "flex",
                gap: 3,
                justifyContent: "center",
                marginTop: 8,
              }}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  size={18}
                  style={{
                    color:
                      n <= Math.round(avgRating)
                        ? SUMMIT
                        : "rgba(255,255,255,0.2)",
                    fill: n <= Math.round(avgRating) ? SUMMIT : "none",
                  }}
                />
              ))}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: ASH,
                marginTop: 6,
              }}
            >
              {reviews.length} reviews
            </div>
          </div>
          {/* Distribution bars */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {dist.map(({ star, count }) => (
              <div
                key={star}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: ASH,
                    width: 12,
                    textAlign: "right",
                  }}
                >
                  {star}
                </span>
                <Star
                  size={12}
                  style={{ color: SUMMIT, fill: SUMMIT, flexShrink: 0 }}
                />
                <div
                  style={{
                    flex: 1,
                    height: 6,
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: 100,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: reviews.length
                        ? `${(count / reviews.length) * 100}%`
                        : "0%",
                      background: SUMMIT,
                      borderRadius: 100,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: ASH,
                    width: 20,
                  }}
                >
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {reviews.map((r) => (
          <div
            key={r.id}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              padding: "20px 24px",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${GLACIER}, ${FOREST})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontWeight: 700,
                    color: SNOW,
                    fontSize: 15,
                  }}
                >
                  {r.name.charAt(0)}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontWeight: 700,
                    color: SNOW,
                    fontSize: 14,
                  }}
                >
                  {r.name}
                  {r.verified && (
                    <span style={{ marginLeft: 6, fontSize: 11, color: PINE }}>
                      ✓ Verified
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: ASH,
                  }}
                >
                  {r.date}
                </div>
              </div>
              <div style={{ display: "flex", gap: 2 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={14}
                    style={{
                      color: n <= r.rating ? SUMMIT : "rgba(255,255,255,0.15)",
                      fill: n <= r.rating ? SUMMIT : "none",
                    }}
                  />
                ))}
              </div>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: ASH,
                lineHeight: 1.75,
                fontStyle: "italic",
                margin: 0,
              }}
            >
              &quot;{r.text}&quot;
            </p>
          </div>
        ))}
      </div>

      {/* Write review form */}
      <div
        style={{
          background: "rgba(77,168,199,0.05)",
          border: "1px solid rgba(77,168,199,0.2)",
          borderRadius: 16,
          padding: "28px 32px",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            fontWeight: 700,
            color: SNOW,
            marginBottom: 20,
          }}
        >
          Leave a Review
        </h3>
        {submitted ? (
          <div
            style={{ textAlign: "center", padding: "32px 0" }}
            data-ocid="trek.review_success_state"
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontWeight: 700,
                color: SNOW,
                marginBottom: 8,
              }}
            >
              Thank you for your review!
            </div>
            <a
              href="https://g.page/r"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: GLACIER,
                fontFamily: "var(--font-ui)",
                fontSize: 14,
              }}
            >
              Share it on Google Reviews →
            </a>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
            data-ocid="trek.review_form"
          >
            {[
              {
                id: "review-name",
                label: "Your Name",
                type: "text",
                key: "name" as const,
                placeholder: "Arjun Mehta",
              },
              {
                id: "review-email",
                label: "Email",
                type: "email",
                key: "email" as const,
                placeholder: "arjun@email.com",
              },
            ].map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-ui)",
                    fontSize: 13,
                    color: ASH,
                    marginBottom: 6,
                  }}
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  required
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [field.key]: e.target.value }))
                  }
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 6,
                    padding: "10px 14px",
                    color: SNOW,
                    fontFamily: "var(--font-ui)",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  data-ocid={`trek.review_${field.key}_input`}
                />
              </div>
            ))}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 13,
                  color: ASH,
                  marginBottom: 6,
                }}
              >
                Rating
              </p>
              <div style={{ display: "flex", gap: 4 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, rating: n }))}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    data-ocid={`trek.review_star.${n}`}
                  >
                    <Star
                      size={28}
                      style={{
                        color:
                          n <= form.rating ? SUMMIT : "rgba(255,255,255,0.2)",
                        fill: n <= form.rating ? SUMMIT : "none",
                        transition: "all 0.15s",
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label
                htmlFor="review-date"
                style={{
                  display: "block",
                  fontFamily: "var(--font-ui)",
                  fontSize: 13,
                  color: ASH,
                  marginBottom: 6,
                }}
              >
                Trek Date
              </label>
              <input
                id="review-date"
                type="month"
                value={form.date}
                onChange={(e) =>
                  setForm((f) => ({ ...f, date: e.target.value }))
                }
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 6,
                  padding: "10px 14px",
                  color: SNOW,
                  fontFamily: "var(--font-ui)",
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                  colorScheme: "dark",
                }}
                data-ocid="trek.review_date_input"
              />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label
                htmlFor="review-text"
                style={{
                  display: "block",
                  fontFamily: "var(--font-ui)",
                  fontSize: 13,
                  color: ASH,
                  marginBottom: 6,
                }}
              >
                Your Review
              </label>
              <textarea
                id="review-text"
                required
                rows={4}
                placeholder="Share your experience on this trek..."
                value={form.text}
                onChange={(e) =>
                  setForm((f) => ({ ...f, text: e.target.value }))
                }
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 6,
                  padding: "10px 14px",
                  color: SNOW,
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  outline: "none",
                  resize: "none",
                  boxSizing: "border-box",
                }}
                data-ocid="trek.review_textarea"
              />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <button
                type="submit"
                style={{
                  padding: "12px 32px",
                  background: SUMMIT,
                  color: MIDNIGHT,
                  borderRadius: 4,
                  fontFamily: "var(--font-ui)",
                  fontWeight: 700,
                  fontSize: 15,
                  border: "none",
                  cursor: "pointer",
                }}
                data-ocid="trek.review_submit_button"
              >
                Submit Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── FAQs Tab ─────────────────────────────────────────────────────────────────
function FaqsTab({ trek }: { trek: Trek }) {
  const faqs = trek.faqs.length > 0 ? trek.faqs : ROOPKUND_FAQS;
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 28,
          fontWeight: 700,
          color: SNOW,
          marginBottom: 24,
        }}
      >
        Frequently Asked Questions
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {faqs.map((faq, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: FAQs are positionally ordered
            key={i}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <button
              type="button"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              style={{
                width: "100%",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
              data-ocid={`faq.item.${i + 1}`}
            >
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontWeight: 700,
                  fontSize: 15,
                  color: SNOW,
                }}
              >
                {faq.question}
              </span>
              <span style={{ color: GLACIER, fontSize: 14, flexShrink: 0 }}>
                {openIdx === i ? "▲" : "▼"}
              </span>
            </button>
            {openIdx === i && (
              <div style={{ padding: "0 20px 16px" }}>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    color: ASH,
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Tag cloud */}
      {trek.tags.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h3
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 700,
              color: SNOW,
              fontSize: 16,
              marginBottom: 16,
            }}
          >
            Trek Tags
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {trek.tags.map((tag, i) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  padding: "4px 12px",
                  borderRadius: 100,
                  background:
                    i % 2 === 0
                      ? "rgba(77,168,199,0.1)"
                      : "rgba(232,197,71,0.1)",
                  color: i % 2 === 0 ? GLACIER : SUMMIT,
                  border: `1px solid ${i % 2 === 0 ? "rgba(77,168,199,0.3)" : "rgba(232,197,71,0.3)"}`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ trek }: { trek: Trek }) {
  const nextBatch =
    trek.batches.find((b) => b.status !== "Full") ?? trek.batches[0];
  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  return (
    <aside
      style={{ position: "sticky", top: 96, width: 320, flexShrink: 0 }}
      data-ocid="trek.booking_sidebar"
    >
      <div
        style={{
          background: SNOW,
          borderRadius: 16,
          padding: 32,
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Price */}
        <div
          style={{
            marginBottom: 20,
            paddingBottom: 20,
            borderBottom: "1px solid rgba(10,14,26,0.1)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              color: "#555",
              display: "block",
              marginBottom: 4,
            }}
          >
            Trek Package from
          </span>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 34,
                fontWeight: 700,
                color: MIDNIGHT,
              }}
            >
              ₹{trek.price.toLocaleString("en-IN")}
            </span>
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 14,
                color: "#777",
              }}
            >
              /person
            </span>
          </div>
        </div>
        {/* Next batch */}
        {nextBatch && (
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "#777",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Next Batch
            </div>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 14,
                fontWeight: 600,
                color: MIDNIGHT,
              }}
            >
              {fmtDate(nextBatch.startDate)}
            </div>
            {nextBatch.seatsAvailable <= 8 && nextBatch.seatsAvailable > 0 && (
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: EMBER,
                  marginTop: 4,
                }}
              >
                ⚡ Only {nextBatch.seatsAvailable} spots remaining!
              </div>
            )}
          </div>
        )}
        {/* CTAs */}
        <a
          href={`/book?trek=${trek.slug}`}
          style={{
            display: "block",
            width: "100%",
            textAlign: "center",
            padding: "14px 0",
            background: SUMMIT,
            color: MIDNIGHT,
            borderRadius: 4,
            fontFamily: "var(--font-ui)",
            fontWeight: 700,
            fontSize: 15,
            textDecoration: "none",
            marginBottom: 12,
            boxSizing: "border-box",
          }}
          data-ocid="trek.sidebar_book_button"
        >
          Book This Trek
        </a>
        <button
          type="button"
          onClick={() => console.log("Download itinerary:", trek.slug)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            width: "100%",
            padding: "12px 0",
            background: "transparent",
            color: MIDNIGHT,
            border: `1px solid ${MIDNIGHT}`,
            borderRadius: 4,
            fontFamily: "var(--font-ui)",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            marginBottom: 12,
            boxSizing: "border-box",
          }}
          data-ocid="trek.download_button"
        >
          <Download size={16} /> Download Itinerary PDF
        </button>
        <a
          href="https://wa.me/919999999999?text=Hi%21%20I%27m%20interested%20in%20booking%20the%20trek.%20Please%20help%20me."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            width: "100%",
            padding: "12px 0",
            background: "#25D366",
            color: SNOW,
            borderRadius: 4,
            fontFamily: "var(--font-ui)",
            fontWeight: 600,
            fontSize: 14,
            textDecoration: "none",
            boxSizing: "border-box",
          }}
          data-ocid="trek.whatsapp_button"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Chat with Expert
        </a>
      </div>
    </aside>
  );
}

// ─── Related Treks ────────────────────────────────────────────────────────────
function RelatedTreks({ trek }: { trek: Trek }) {
  const related = trek.relatedTrekSlugs
    .map((s) => treks.find((t) => t.slug === s))
    .filter((t): t is Trek => !!t)
    .slice(0, 3);
  if (!related.length) return null;
  return (
    <section data-ocid="trek.related_section" style={{ marginTop: 64 }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 32,
          fontWeight: 700,
          color: SNOW,
          marginBottom: 24,
        }}
      >
        You May Also Like
      </h2>
      <div
        style={{
          display: "flex",
          gap: 20,
          overflowX: "auto",
          paddingBottom: 12,
        }}
      >
        {related.map((t) => (
          <a
            key={t.slug}
            href={`/treks/${t.slug}`}
            style={{
              flexShrink: 0,
              width: 260,
              textDecoration: "none",
              display: "block",
            }}
            data-ocid={`related.trek.${t.slug}`}
          >
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                position: "relative",
                height: 160,
              }}
            >
              <img
                src={t.heroImage}
                alt={t.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1)";
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(10,14,26,0.75), transparent)",
                }}
              />
              <div style={{ position: "absolute", bottom: 12, left: 12 }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: GLACIER,
                    background: "rgba(10,14,26,0.7)",
                    padding: "3px 8px",
                    borderRadius: 4,
                  }}
                >
                  {t.difficulty.toUpperCase()}
                </span>
              </div>
            </div>
            <div style={{ padding: "12px 0" }}>
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontWeight: 700,
                  color: SNOW,
                  fontSize: 15,
                  marginBottom: 4,
                }}
              >
                {t.name}
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: GLACIER,
                  }}
                >
                  {t.duration}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: ASH,
                  }}
                >
                  {t.altitude.toLocaleString("en-IN")}m
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 13,
                  color: SUMMIT,
                  marginTop: 6,
                }}
              >
                ₹{t.price.toLocaleString("en-IN")}/person
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────────────
export default function TrekDetailPage() {
  const { slug } = useParams({ strict: false }) as { slug?: string };
  const trek = treks.find((t) => t.slug === slug);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const tabsRef = useRef<HTMLDivElement>(null);

  useTrekSEO(trek ?? treks[0]);

  if (!trek) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          background: MIDNIGHT,
        }}
        data-ocid="trek.not_found"
      >
        <div style={{ fontSize: 56 }}>🏔️</div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            color: SNOW,
            margin: 0,
          }}
        >
          Trek Not Found
        </h1>
        <p style={{ fontFamily: "var(--font-ui)", color: ASH }}>
          We couldn&apos;t find a trek with that name.
        </p>
        <a
          href="/treks"
          style={{
            padding: "12px 28px",
            background: SUMMIT,
            color: MIDNIGHT,
            borderRadius: 4,
            fontFamily: "var(--font-ui)",
            fontWeight: 700,
            textDecoration: "none",
          }}
          data-ocid="trek.back_to_treks_button"
        >
          Browse All Treks
        </a>
      </div>
    );
  }

  const diffColor = difficultyColors[trek.difficulty] ?? GLACIER;

  return (
    <div
      style={{ background: MIDNIGHT, minHeight: "100vh" }}
      data-ocid="trek.detail_page"
    >
      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          height: "70vh",
          backgroundImage: `url(${trek.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
        data-ocid="trek.hero"
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(0deg, rgba(10,14,26,0.88) 0%, rgba(10,14,26,0.4) 60%, rgba(10,14,26,0.15) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1440,
            margin: "0 auto",
            padding: "0 32px 48px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 16,
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Home", href: "/" },
              { label: "Treks", href: "/treks" },
              {
                label: trek.state.charAt(0).toUpperCase() + trek.state.slice(1),
                href: `/treks?state=${trek.state}`,
              },
              { label: trek.name, href: null },
            ].map((crumb, i, arr) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: breadcrumbs are positionally ordered
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "rgba(212,207,200,0.7)",
                      textDecoration: "none",
                    }}
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: SNOW,
                    }}
                  >
                    {crumb.label}
                  </span>
                )}
                {i < arr.length - 1 && (
                  <span
                    style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}
                  >
                    ›
                  </span>
                )}
              </span>
            ))}
          </nav>
          {/* Trek Name */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5vw, 72px)",
              fontWeight: 700,
              color: SNOW,
              margin: "0 0 24px",
              lineHeight: 1.08,
              maxWidth: 800,
            }}
          >
            {trek.name}
          </h1>
          {/* Stat pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[
              { value: `📅 ${trek.duration}` },
              { value: `⛰️ ${trek.altitude.toLocaleString("en-IN")}m Max` },
              { value: trek.difficulty, bg: diffColor },
              { value: `₹${trek.price.toLocaleString("en-IN")}/person` },
              { value: `🗓️ ${trek.bestSeason}` },
            ].map((pill) => (
              <span
                key={pill.value}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: SNOW,
                  background: pill.bg ? pill.bg : "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  padding: "8px 16px",
                  borderRadius: 100,
                  whiteSpace: "nowrap",
                }}
              >
                {pill.value}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TAB NAV ── */}
      <div
        ref={tabsRef}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(10,14,26,0.97)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
        data-ocid="trek.tab_nav"
      >
        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "0 32px",
            display: "flex",
            overflowX: "auto",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                flexShrink: 0,
                padding: "16px 20px",
                fontFamily: "var(--font-ui)",
                fontSize: 14,
                fontWeight: 500,
                background: "none",
                border: "none",
                cursor: "pointer",
                borderBottom:
                  activeTab === tab.id
                    ? `3px solid ${GLACIER}`
                    : "3px solid transparent",
                color: activeTab === tab.id ? GLACIER : ASH,
                transition: "all 0.2s",
              }}
              data-ocid={`trek.tab.${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "48px 32px 80px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
          {/* Left content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {activeTab === "overview" && <OverviewTab trek={trek} />}
            {activeTab === "itinerary" && <ItineraryTab trek={trek} />}
            {activeTab === "inclusions" && <InclusionsTab trek={trek} />}
            {activeTab === "pack" && <PackTab trek={trek} />}
            {activeTab === "photos" && <PhotosTab trek={trek} />}
            {activeTab === "reviews" && <ReviewsTab trek={trek} />}
            {activeTab === "faqs" && <FaqsTab trek={trek} />}

            {/* Related treks always visible below tabs */}
            <RelatedTreks trek={trek} />
          </div>

          {/* Sidebar — hidden on mobile */}
          <div style={{ display: "none" }} className="lg:block">
            <Sidebar trek={trek} />
          </div>
          {/* Visible from lg */}
          <style>
            {
              "@media (min-width: 1024px) { .sidebar-desktop { display: block !important; } }"
            }
          </style>
          <div className="sidebar-desktop" style={{ display: "none" }}>
            <Sidebar trek={trek} />
          </div>
        </div>
      </div>

      {/* ── MOBILE BOTTOM BAR ── */}
      <div
        style={{
          display: "block",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: SNOW,
          borderTop: "1px solid rgba(0,0,0,0.1)",
          padding: "12px 20px",
          boxSizing: "border-box",
        }}
        className="lg:hidden"
        data-ocid="trek.mobile_sticky_cta"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            justifyContent: "space-between",
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 12,
                color: "#777",
              }}
            >
              From
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 700,
                color: MIDNIGHT,
              }}
            >
              ₹{trek.price.toLocaleString("en-IN")}
            </div>
          </div>
          <a
            href={`/book?trek=${trek.slug}`}
            style={{
              padding: "12px 28px",
              background: SUMMIT,
              color: MIDNIGHT,
              borderRadius: 4,
              fontFamily: "var(--font-ui)",
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
              flexShrink: 0,
            }}
            data-ocid="trek.mobile_book_button"
          >
            Book This Trek
          </a>
        </div>
      </div>
    </div>
  );
}
