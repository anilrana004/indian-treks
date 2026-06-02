import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1920&q=80";

const DESTINATIONS = [
  { value: "", label: "All Destinations" },
  { value: "uk", label: "All Uttarakhand" },
  { value: "hp", label: "All Himachal Pradesh" },
  { value: "kedarnath", label: "Kedarnath" },
  { value: "badrinath", label: "Badrinath" },
  { value: "gangotri", label: "Gangotri" },
  { value: "yamunotri", label: "Yamunotri" },
  { value: "roopkund", label: "Roopkund" },
  { value: "valley-of-flowers", label: "Valley of Flowers" },
  { value: "chopta", label: "Chopta" },
  { value: "manali", label: "Manali" },
  { value: "spiti", label: "Spiti Valley" },
  { value: "dharamshala", label: "Dharamshala" },
];

const TREK_TYPES = [
  { value: "", label: "Trek Type" },
  { value: "trekking", label: "Trekking" },
  { value: "yatra", label: "Yatra" },
  { value: "expedition", label: "Expedition" },
];

const DURATIONS = [
  { value: "", label: "Duration" },
  { value: "weekend", label: "Weekend (1–2 days)" },
  { value: "short", label: "Short (3–4 days)" },
  { value: "medium", label: "Medium (5–7 days)" },
  { value: "long", label: "Long (8–12 days)" },
  { value: "extended", label: "Extended (14+ days)" },
];

const DIFFICULTIES = [
  { value: "", label: "Difficulty" },
  { value: "easy", label: "Easy" },
  { value: "easy-moderate", label: "Easy-Moderate" },
  { value: "moderate", label: "Moderate" },
  { value: "difficult", label: "Difficult" },
  { value: "extreme", label: "Extreme" },
];

const STATS = [
  { number: "12,500", unit: "ft", label: "Max Altitude" },
  { number: "35+", unit: "", label: "Treks" },
  { number: "4.9", unit: "/5", label: "Rating" },
  { number: "100%", unit: "", label: "Safe" },
  { number: "10+", unit: "", label: "Years" },
];

const CATEGORY_CHIPS = [
  "Beginner",
  "Moderate",
  "Difficult",
  "Snow Trek",
  "Yatra",
  "Weekend",
  "Family",
  "Photography",
];

export default function HeroSection() {
  const [revealed, setRevealed] = useState(false);
  const [bgY, setBgY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [search, setSearch] = useState({
    destination: "",
    trekType: "",
    duration: "",
    difficulty: "",
  });

  const heroRef = useRef<HTMLDivElement>(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Staggered reveal
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Parallax scroll (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setBgY(scrollY * 0.4);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const heroStyle: React.CSSProperties = {
    backgroundImage: `url('${HERO_IMAGE}')`,
    backgroundSize: "cover",
    backgroundPosition: isMobile ? "center" : `center ${bgY}px`,
    backgroundRepeat: "no-repeat",
  };

  return (
    <section data-ocid="hero.section" className="relative bg-white">
      {/* Main Hero */}
      <div
        ref={heroRef}
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{
          minHeight: "100vh",
          ...heroStyle,
        }}
      >
        {/* Ken Burns on mobile */}
        {isMobile && (
          <div
            className="absolute inset-0 animate-ken-burns"
            style={{
              backgroundImage: `url('${HERO_IMAGE}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 0,
            }}
          />
        )}

        {/* LIGHT overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.80) 0%, rgba(255,255,255,0.40) 50%, rgba(255,255,255,0.70) 100%)",
            zIndex: 1,
          }}
        />

        {/* Hero content */}
        <div
          className="relative z-10 flex flex-col items-center text-center px-4 w-full"
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            paddingTop: "var(--nav-height-desktop)",
            paddingBottom: "160px",
          }}
        >
          {/* Micro-label */}
          <div
            className={`reveal stagger-1 mb-6${revealed ? " revealed" : ""}`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              color: "#15803d",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
            data-ocid="hero.label"
          >
            UTTARAKHAND · HIMACHAL PRADESH · INDIA
          </div>

          {/* Main headline */}
          <h1
            className={`reveal stagger-2 font-display font-bold text-green-900${revealed ? " revealed" : ""}`}
            style={{
              fontSize: "clamp(40px, 7vw, 96px)",
              lineHeight: 1.08,
              marginBottom: "24px",
            }}
            data-ocid="hero.headline"
          >
            The Himalayas
            <br />
            Are Calling.
          </h1>

          {/* Subline */}
          <p
            className={`reveal stagger-3 font-body${revealed ? " revealed" : ""}`}
            style={{
              fontSize: "clamp(15px, 2vw, 20px)",
              color: "#4b5563",
              lineHeight: 1.7,
              maxWidth: "620px",
              marginBottom: "40px",
            }}
            data-ocid="hero.subline"
          >
            India&apos;s most trusted trekking community. 35+ Himalayan
            adventures,
            <br />
            expert guides, zero compromise on safety. Your summit story starts
            here.
          </p>

          {/* CTA Buttons */}
          <div
            className={`reveal stagger-4 flex flex-wrap items-center justify-center gap-4${revealed ? " revealed" : ""}`}
            data-ocid="hero.cta_row"
          >
            <Link
              to="/treks"
              className="inline-flex items-center justify-center rounded-md px-8 py-3 text-base font-bold text-white transition-colors duration-200 bg-amber-500 hover:bg-amber-600"
              data-ocid="hero.explore_treks_button"
            >
              Explore Treks
            </Link>
            <Link
              to="/yatras"
              className="inline-flex items-center justify-center rounded-md border-2 border-green-600 px-8 py-3 text-base font-semibold text-green-700 bg-white transition-colors duration-200 hover:bg-green-50"
              data-ocid="hero.view_yatras_button"
            >
              View Yatras
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`reveal stagger-5 absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2${revealed ? " revealed" : ""}`}
          data-ocid="hero.scroll_indicator"
        >
          <ScrollMouseIcon />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "#15803d",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Scroll to Explore
          </span>
        </div>

        {/* Floating Search Bar */}
        <FloatingSearchBar search={search} setSearch={setSearch} />
      </div>

      {/* Stats Bar */}
      <div
        className="relative w-full bg-white"
        style={{
          paddingTop: "80px",
          paddingBottom: "48px",
        }}
        data-ocid="hero.stats_bar"
      >
        <div className="container-max">
          <div className="flex flex-wrap items-center justify-center gap-0">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-stretch">
                <div
                  className="flex flex-col items-center justify-center px-8 py-2 text-center"
                  data-ocid={`hero.stat.${i + 1}`}
                >
                  <span
                    className="font-display font-bold"
                    style={{
                      fontSize: "clamp(32px, 4vw, 48px)",
                      color: "#15803d",
                      lineHeight: 1.1,
                    }}
                  >
                    {stat.number}
                    <span style={{ fontSize: "0.6em", color: "#4b5563" }}>
                      {stat.unit}
                    </span>
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      color: "#6b7280",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginTop: "4px",
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
                {i < STATS.length - 1 && (
                  <div
                    className="self-center hidden sm:block"
                    style={{
                      width: "1px",
                      height: "60px",
                      background: "rgba(0,0,0,0.08)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Chips Row */}
      <div
        className="w-full bg-white border-t border-gray-100"
        data-ocid="hero.category_chips"
      >
        <div className="container-max py-5">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            <span
              className="flex-shrink-0 text-xs font-semibold uppercase tracking-wider text-green-700 mr-1"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Popular:
            </span>
            {CATEGORY_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                className="flex-shrink-0 inline-flex items-center rounded-full border border-green-200 bg-white px-4 py-1.5 text-sm font-medium text-green-700 transition-colors duration-200 hover:bg-green-50 hover:border-green-300"
                data-ocid={`hero.chip.${chip.toLowerCase().replace(/\s+/g, "_")}`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Scroll Mouse Icon ─────────────────────────────────────────────────────────
function ScrollMouseIcon() {
  return (
    <svg
      width="22"
      height="34"
      viewBox="0 0 22 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="20"
        height="32"
        rx="10"
        stroke="#15803d"
        strokeWidth="1.5"
      />
      <rect
        x="9.5"
        y="6"
        width="3"
        height="6"
        rx="1.5"
        fill="#15803d"
        style={{ animation: "scrollIndicator 2s ease-in-out infinite" }}
      />
    </svg>
  );
}

// ── Floating Search Bar ───────────────────────────────────────────────────────
interface SearchState {
  destination: string;
  trekType: string;
  duration: string;
  difficulty: string;
}

interface FloatingSearchBarProps {
  search: SearchState;
  setSearch: React.Dispatch<React.SetStateAction<SearchState>>;
}

const selectStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  borderBottom: "2px solid #d1d5db",
  color: "#1f2937",
  fontFamily: "var(--font-ui)",
  fontSize: "15px",
  padding: "8px 4px",
  outline: "none",
  cursor: "pointer",
  width: "100%",
  appearance: "none",
  WebkitAppearance: "none",
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%231f2937' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 4px center",
  backgroundSize: "12px",
  paddingRight: "20px",
};

function FloatingSearchBar({ search, setSearch }: FloatingSearchBarProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const getSelectStyle = (field: string): React.CSSProperties => ({
    ...selectStyle,
    borderBottomColor: focusedField === field ? "#15803d" : "#d1d5db",
    transition: "border-color 0.2s",
  });

  return (
    <div
      data-ocid="hero.search_bar"
      className="bg-white rounded-2xl shadow-lg border border-gray-200"
      style={{
        position: "absolute",
        bottom: "-40px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(90vw, 900px)",
        padding: "24px 32px",
        zIndex: 10,
      }}
    >
      {/* Label row */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "#15803d",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}
      >
        Find Your Trek
      </p>

      {/* Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-end gap-4 md:gap-0">
        {/* Destination */}
        <div className="flex-1 min-w-0 md:pr-5">
          <label
            htmlFor="hero-destination"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "11px",
              color: "#6B7280",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Destination
          </label>
          <select
            id="hero-destination"
            style={getSelectStyle("destination")}
            value={search.destination}
            onChange={(e) =>
              setSearch((s) => ({ ...s, destination: e.target.value }))
            }
            onFocus={() => setFocusedField("destination")}
            onBlur={() => setFocusedField(null)}
            data-ocid="hero.search_destination_select"
            aria-label="Select destination"
          >
            {DESTINATIONS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <Divider />

        {/* Trek Type */}
        <div className="flex-1 min-w-0 md:px-5">
          <label
            htmlFor="hero-trektype"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "11px",
              color: "#6B7280",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Trek Type
          </label>
          <select
            id="hero-trektype"
            style={getSelectStyle("trekType")}
            value={search.trekType}
            onChange={(e) =>
              setSearch((s) => ({ ...s, trekType: e.target.value }))
            }
            onFocus={() => setFocusedField("trekType")}
            onBlur={() => setFocusedField(null)}
            data-ocid="hero.search_type_select"
            aria-label="Select trek type"
          >
            {TREK_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <Divider />

        {/* Duration */}
        <div className="flex-1 min-w-0 md:px-5">
          <label
            htmlFor="hero-duration"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "11px",
              color: "#6B7280",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Duration
          </label>
          <select
            id="hero-duration"
            style={getSelectStyle("duration")}
            value={search.duration}
            onChange={(e) =>
              setSearch((s) => ({ ...s, duration: e.target.value }))
            }
            onFocus={() => setFocusedField("duration")}
            onBlur={() => setFocusedField(null)}
            data-ocid="hero.search_duration_select"
            aria-label="Select duration"
          >
            {DURATIONS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <Divider />

        {/* Difficulty */}
        <div className="flex-1 min-w-0 md:px-5">
          <label
            htmlFor="hero-difficulty"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "11px",
              color: "#6B7280",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Difficulty
          </label>
          <select
            id="hero-difficulty"
            style={getSelectStyle("difficulty")}
            value={search.difficulty}
            onChange={(e) =>
              setSearch((s) => ({ ...s, difficulty: e.target.value }))
            }
            onFocus={() => setFocusedField("difficulty")}
            onBlur={() => setFocusedField(null)}
            data-ocid="hero.search_difficulty_select"
            aria-label="Select difficulty"
          >
            {DIFFICULTIES.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div className="md:pl-5 flex-shrink-0">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md px-8 py-3 text-base font-bold text-white transition-colors duration-200 bg-amber-500 hover:bg-amber-600 w-full md:w-auto"
            data-ocid="hero.search_button"
            aria-label="Search treks"
            onClick={() => {
              // Navigate to treks list with search params
              window.location.href = `/treks?destination=${search.destination}&type=${search.trekType}&duration=${search.duration}&difficulty=${search.difficulty}`;
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

// Vertical divider between search fields
function Divider() {
  return (
    <div
      className="hidden md:block flex-shrink-0 self-stretch"
      style={{
        width: "1px",
        background: "rgba(0,0,0,0.08)",
        margin: "0",
      }}
      aria-hidden="true"
    />
  );
}
