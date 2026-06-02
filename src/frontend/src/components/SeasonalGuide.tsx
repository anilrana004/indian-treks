import { useEffect, useRef, useState } from "react";

interface Season {
  id: string;
  name: string;
  months: string;
  icon: string;
  gradient: string;
  tempRange: string;
  description: string;
  treks: Array<{ label: string; slug: string }>;
  packTip: string;
}

const SEASONS: Season[] = [
  {
    id: "spring",
    name: "Spring",
    months: "Mar – May",
    icon: "🌸",
    gradient: "linear-gradient(135deg, #2d8b57, #4DA8C7)",
    tempRange: "+5°C to +18°C",
    description:
      "Valley of Flowers bursts into 500 species of alpine blooms. Rhododendrons carpet hillsides. Temple doors reopen for the season.",
    treks: [
      { label: "Valley of Flowers", slug: "valley-of-flowers" },
      { label: "Hampta Pass", slug: "hampta-pass" },
      { label: "Bhrigu Lake", slug: "bhrigu-lake" },
      { label: "Dayara Bugyal", slug: "dayara-bugyal" },
      { label: "Kuari Pass", slug: "kuari-pass" },
    ],
    packTip:
      "Light layers, rain jacket, waterproof boots, sun cream (UV very high)",
  },
  {
    id: "summer",
    name: "Summer",
    months: "Jun – Aug",
    icon: "☀️",
    gradient: "linear-gradient(135deg, #E8C547, #C94F2A)",
    tempRange: "+10°C to +25°C (lower) · −5°C to +10°C (above 4000m)",
    description:
      "Peak season for most high-altitude treks. Long daylight hours. Char Dham temples fully open. Expect afternoon rains at lower elevations.",
    treks: [
      { label: "Roopkund Trek", slug: "roopkund" },
      { label: "Hemkund Sahib", slug: "hemkund-sahib" },
      { label: "Valley of Flowers", slug: "valley-of-flowers" },
      { label: "Char Dham Yatra", slug: "char-dham-yatra" },
      { label: "Pin Parvati Pass", slug: "pin-parvati-pass" },
    ],
    packTip:
      "Quick-dry clothes, rain poncho, trekking poles, gaiters for monsoon zones",
  },
  {
    id: "autumn",
    name: "Autumn",
    months: "Sep – Nov",
    icon: "🍂",
    gradient: "linear-gradient(135deg, #C94F2A, #E8C547)",
    tempRange: "+2°C to +20°C (valley) · −10°C to +5°C (high camps)",
    description:
      "Crystal clear skies, post-monsoon green valleys, perfect visibility for Himalayan panoramas. The best photography season.",
    treks: [
      { label: "Brahmatal Trek", slug: "brahmatal" },
      { label: "Pin Parvati Pass", slug: "pin-parvati-pass" },
      { label: "Indrahar Pass", slug: "indrahar-pass" },
      { label: "Kinner Kailash", slug: "kinner-kailash" },
      { label: "Chandra Tal", slug: "chandra-tal" },
    ],
    packTip:
      "Warm layers, down jacket for evenings, gloves, thermal base layers, sun hat",
  },
  {
    id: "winter",
    name: "Winter",
    months: "Dec – Feb",
    icon: "❄️",
    gradient: "linear-gradient(135deg, #0A0E1A, #4DA8C7)",
    tempRange: "−5°C to +8°C (valleys) · −20°C to −8°C (high camps)",
    description:
      "A transformed, silent Himalaya. Kedarkantha buried in snowdrifts. Chopta rhododendrons white with frost. Magical, challenging, unforgettable.",
    treks: [
      { label: "Kedarkantha Trek", slug: "kedarkantha" },
      { label: "Brahmatal Trek", slug: "brahmatal" },
      { label: "Dayara Bugyal", slug: "dayara-bugyal" },
      { label: "Chopta-Tungnath", slug: "chopta-tungnath" },
      { label: "Tosh Valley", slug: "tosh-valley" },
    ],
    packTip:
      "Heavy down jacket (−20°C rated), thermal layers (3x), wool socks, snow boots, balaclava, gloves",
  },
];

// Month → season classification
const MONTHS = [
  { label: "JAN", type: "winter" },
  { label: "FEB", type: "winter" },
  { label: "MAR", type: "spring" },
  { label: "APR", type: "peak" },
  { label: "MAY", type: "peak" },
  { label: "JUN", type: "peak" },
  { label: "JUL", type: "shoulder" },
  { label: "AUG", type: "shoulder" },
  { label: "SEP", type: "peak" },
  { label: "OCT", type: "peak" },
  { label: "NOV", type: "shoulder" },
  { label: "DEC", type: "closed" },
] as const;

const MONTH_TYPE_STYLE: Record<string, { bg: string; label: string }> = {
  peak: { bg: "var(--color-pine)", label: "Peak" },
  shoulder: { bg: "var(--color-summit)", label: "Shoulder" },
  winter: { bg: "rgba(77,168,199,0.5)", label: "Off Season" },
  closed: { bg: "rgba(201,79,42,0.6)", label: "Closed" },
  spring: { bg: "#2d8b57", label: "Peak" },
};

function SeasonCard({ season, index }: { season: Season; index: number }) {
  const [packOpen, setPackOpen] = useState(false);

  return (
    <div
      className="reveal flex flex-col"
      style={{
        background: season.gradient,
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        minHeight: "360px",
        padding: "32px",
        transition:
          "transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)",
        transitionDelay: `${index * 0.08}s`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "scale(1.02)";
        el.style.boxShadow = "0 24px 64px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "scale(1)";
        el.style.boxShadow = "none";
      }}
      data-ocid={`seasonal.${season.id}.card`}
    >
      {/* Icon */}
      <span
        role="img"
        aria-label={season.name}
        style={{
          fontSize: "48px",
          lineHeight: 1,
          display: "block",
          marginBottom: "16px",
        }}
      >
        {season.icon}
      </span>

      {/* Season name */}
      <p
        className="font-mono font-bold uppercase"
        style={{
          fontSize: "14px",
          letterSpacing: "0.2em",
          color: "#fff",
          marginBottom: "4px",
        }}
      >
        {season.name}
      </p>

      {/* Month range */}
      <p
        className="font-ui"
        style={{
          fontSize: "13px",
          color: "rgba(255,255,255,0.7)",
          marginBottom: "12px",
        }}
      >
        {season.months}
      </p>

      {/* Temperature */}
      <p
        className="font-ui"
        style={{ fontSize: "15px", color: "#fff", marginBottom: "0" }}
      >
        <span aria-hidden="true" style={{ marginRight: "6px" }}>
          🌡️
        </span>
        {season.tempRange}
      </p>

      {/* Description */}
      <p
        className="font-body italic"
        style={{
          fontSize: "15px",
          color: "rgba(255,255,255,0.85)",
          marginTop: "16px",
          lineHeight: 1.6,
          flex: 1,
        }}
      >
        {season.description}
      </p>

      {/* Top Treks */}
      <div style={{ marginTop: "20px" }}>
        <p
          className="font-ui uppercase"
          style={{
            fontSize: "12px",
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.6)",
            marginBottom: "10px",
          }}
        >
          Top Treks:
        </p>
        <div className="flex flex-wrap gap-2">
          {season.treks.map((trek) => (
            <a
              key={trek.slug}
              href={`/treks/${trek.slug}`}
              className="season-trek-chip"
              data-ocid={`seasonal.${season.id}.trek_chip`}
            >
              {trek.label}
            </a>
          ))}
        </div>
      </div>

      {/* What to Pack toggle */}
      <div style={{ marginTop: "20px" }}>
        <button
          type="button"
          onClick={() => setPackOpen((v) => !v)}
          className="font-ui flex items-center gap-1"
          style={{
            fontSize: "13px",
            color: "var(--color-glacier)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
          aria-expanded={packOpen}
          data-ocid={`seasonal.${season.id}.pack_toggle`}
        >
          <span>What to Pack</span>
          <span
            style={{
              display: "inline-block",
              transition: "transform 0.25s ease",
              transform: packOpen ? "rotate(180deg)" : "rotate(0deg)",
              fontSize: "12px",
            }}
          >
            &#9662;
          </span>
        </button>

        {/* Pack panel */}
        <div
          style={{
            maxHeight: packOpen ? "200px" : "0px",
            overflow: "hidden",
            transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <p
            className="font-ui"
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.8)",
              marginTop: "10px",
              padding: "12px",
              background: "rgba(0,0,0,0.2)",
              borderRadius: "8px",
              lineHeight: 1.55,
            }}
          >
            {season.packTip}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SeasonalGuide() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    const section = sectionRef.current;
    if (!section) return;
    const reveals = section.querySelectorAll(".reveal");
    for (const el of reveals) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="seasons"
      className="grain"
      style={{
        background: "var(--color-midnight)",
        paddingTop: "var(--section-padding-desktop)",
        paddingBottom: "var(--section-padding-desktop)",
      }}
    >
      <div
        className="container-max"
        style={{ position: "relative", zIndex: 2 }}
      >
        {/* ─── Section Header ─────────────────────────────────────── */}
        <div className="text-center reveal" style={{ marginBottom: "64px" }}>
          <h2
            className="font-display font-bold text-white"
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            When to Go &#8212; Himalayan Seasons
          </h2>
          <p
            className="font-body italic mx-auto"
            style={{
              fontSize: "18px",
              color: "var(--color-ash)",
              maxWidth: "560px",
            }}
          >
            Every season transforms the Himalayas into something utterly
            different
          </p>
        </div>

        {/* ─── Season Cards Grid ──────────────────────────────────── */}
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            marginBottom: "64px",
          }}
          data-ocid="seasonal.cards_grid"
        >
          {SEASONS.map((season, i) => (
            <SeasonCard key={season.id} season={season} index={i} />
          ))}
        </div>

        {/* ─── Month Timeline Bar ─────────────────────────────────── */}
        <div className="reveal" data-ocid="seasonal.timeline">
          <p
            className="font-mono uppercase text-center"
            style={{
              fontSize: "12px",
              letterSpacing: "0.15em",
              color: "rgba(212,207,200,0.5)",
              marginBottom: "20px",
            }}
          >
            Best Trekking Months at a Glance
          </p>

          {/* Month pills */}
          <div
            className="flex gap-2 flex-wrap justify-center"
            style={{ marginBottom: "20px" }}
          >
            {MONTHS.map((month) => {
              const style =
                MONTH_TYPE_STYLE[month.type] ?? MONTH_TYPE_STYLE.peak;
              return (
                <div
                  key={month.label}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    style={{
                      width: "48px",
                      height: "24px",
                      borderRadius: "100px",
                      background: style.bg,
                    }}
                    title={style.label}
                    aria-label={`${month.label}: ${style.label}`}
                  />
                  <span
                    className="font-mono"
                    style={{ fontSize: "11px", color: "var(--color-ash)" }}
                  >
                    {month.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div
            className="flex flex-wrap justify-center gap-5 font-ui"
            style={{ fontSize: "13px", color: "var(--color-ash)" }}
          >
            <span className="flex items-center gap-2">
              <span
                style={{
                  display: "inline-block",
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: "var(--color-pine)",
                  flexShrink: 0,
                }}
              />
              Peak Season
            </span>
            <span className="flex items-center gap-2">
              <span
                style={{
                  display: "inline-block",
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: "var(--color-summit)",
                  flexShrink: 0,
                }}
              />
              Shoulder Season
            </span>
            <span className="flex items-center gap-2">
              <span
                style={{
                  display: "inline-block",
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: "rgba(77,168,199,0.5)",
                  flexShrink: 0,
                }}
              />
              Off Season
            </span>
            <span className="flex items-center gap-2">
              <span
                style={{
                  display: "inline-block",
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: "rgba(201,79,42,0.6)",
                  flexShrink: 0,
                }}
              />
              Closed / Not Recommended
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
