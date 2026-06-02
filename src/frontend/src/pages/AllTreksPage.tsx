import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Navigation from "../components/Navigation";
import NewsletterFooter from "../components/NewsletterFooter";
import { treks } from "../data/treks";
import type { Trek } from "../types";

// ── Difficulty badge ────────────────────────────────────────────
function diffBadgeClass(d: string) {
  const dl = d.toLowerCase();
  if (dl.includes("extreme")) return "badge-extreme";
  if (dl.includes("difficult")) return "badge-difficult";
  if (dl === "moderate" || dl.includes("moderate")) return "badge-moderate";
  return "badge-easy";
}

// ── Bookmark icon ───────────────────────────────────────────────
function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "white" : "none"}
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

// ── Trek card ───────────────────────────────────────────────────
function TrekCard({
  trek,
  index,
  bookmarked,
  onToggle,
}: {
  trek: Trek;
  index: number;
  bookmarked: boolean;
  onToggle: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("revealed");
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="reveal card-trek"
      style={{
        transitionDelay: `${(index % 3) * 0.08}s`,
        background: "var(--color-snow)",
      }}
      data-ocid={`all-treks.item.${index + 1}`}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img
          src={trek.heroImage}
          alt={trek.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform =
              "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
          }}
        />
        <span
          className={`absolute top-3 right-3 font-mono text-[11px] font-bold px-2 py-1 ${diffBadgeClass(trek.difficulty)}`}
          style={{ borderRadius: "4px", letterSpacing: "0.04em" }}
        >
          {trek.difficulty}
        </span>
        <button
          type="button"
          onClick={() => onToggle(trek.id)}
          aria-label={bookmarked ? `Remove ${trek.name}` : `Save ${trek.name}`}
          className="absolute top-3 left-3 flex items-center justify-center w-8 h-8 rounded-full transition-smooth"
          style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
        >
          <BookmarkIcon filled={bookmarked} />
        </button>
      </div>
      <div className="p-5">
        <h3
          className="font-ui font-bold text-[17px] leading-snug mb-1"
          style={{ color: "var(--color-midnight)" }}
        >
          {trek.name}
        </h3>
        <p
          className="font-mono text-[11px] uppercase tracking-wide mb-3"
          style={{ color: "var(--color-glacier)" }}
        >
          {trek.state === "uttarakhand" ? "UTTARAKHAND" : "HIMACHAL PRADESH"} ·{" "}
          {trek.altitude.toLocaleString("en-IN")}M
        </p>
        <div
          className="flex flex-wrap gap-3 text-[13px] mb-3 font-ui"
          style={{ color: "var(--color-ash)" }}
        >
          <span>📅 {trek.duration}</span>
          <span>👥 Group &amp; Solo</span>
          <span>🗓️ {trek.bestSeason}</span>
        </div>
        <p
          className="font-body text-[13px] leading-relaxed mb-4"
          style={{
            color: "var(--color-ash)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {trek.aboutTrek.slice(0, 120)}
        </p>
        <div className="flex items-center justify-between">
          <span
            className="font-ui font-bold text-base"
            style={{ color: "var(--color-midnight)" }}
          >
            From ₹{trek.price.toLocaleString("en-IN")}
          </span>
          <Link
            to="/treks/$slug"
            params={{ slug: trek.slug }}
            className="font-ui font-semibold text-sm transition-smooth hover:opacity-80"
            style={{ color: "var(--color-glacier)" }}
            data-ocid={`all-treks.view.${index + 1}`}
          >
            View Trek →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Filter sidebar ──────────────────────────────────────────────
const REGIONS = [
  { val: "uttarakhand", label: "Uttarakhand" },
  { val: "himachal", label: "Himachal Pradesh" },
];
const DIFFICULTIES = [
  "Easy",
  "Easy-Moderate",
  "Moderate",
  "Difficult",
  "Extreme",
];
const DURATIONS = [
  {
    val: "weekend",
    label: "Weekend (1–2 days)",
    fn: (d: string) => ["1 Day", "2 Days"].some((x) => d.includes(x)),
  },
  {
    val: "short",
    label: "Short (3–5 days)",
    fn: (d: string) =>
      ["3 Days", "4 Days", "5 Days"].some((x) => d.includes(x)),
  },
  {
    val: "week",
    label: "Week (6–8 days)",
    fn: (d: string) =>
      ["6 Days", "7 Days", "8 Days"].some((x) => d.includes(x)),
  },
  {
    val: "long",
    label: "Long (9+ days)",
    fn: (d: string) => Number.parseInt(d) >= 9,
  },
];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type SortKey =
  | "popular"
  | "price-asc"
  | "price-desc"
  | "duration-short"
  | "altitude-high";

function sortTreks(list: Trek[], sort: SortKey): Trek[] {
  switch (sort) {
    case "price-asc":
      return [...list].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...list].sort((a, b) => b.price - a.price);
    case "duration-short":
      return [...list].sort(
        (a, b) => Number.parseInt(a.duration) - Number.parseInt(b.duration),
      );
    case "altitude-high":
      return [...list].sort((a, b) => b.altitude - a.altitude);
    default:
      return [...list].sort((a, b) => b.rating - a.rating);
  }
}

export default function AllTreksPage() {
  useEffect(() => {
    document.title =
      "All Himalayan Treks | Uttarakhand & Himachal Pradesh | TrekRoot";
  }, []);

  const [regions, setRegions] = useState<string[]>(["uttarakhand", "himachal"]);
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [duration, setDuration] = useState<string>("");
  const [months, setMonths] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [sort, setSort] = useState<SortKey>("popular");
  const [visible, setVisible] = useState(12);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [mobileFilters, setMobileFilters] = useState(false);

  const toggleArr = (
    arr: string[],
    set: React.Dispatch<React.SetStateAction<string[]>>,
    val: string,
  ) => set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  const filtered = treks.filter((t) => {
    if (!regions.includes(t.state)) return false;
    if (
      difficulties.length > 0 &&
      !difficulties.some((d) =>
        t.difficulty.toLowerCase().includes(d.toLowerCase()),
      )
    )
      return false;
    if (duration) {
      const match = DURATIONS.find((d) => d.val === duration);
      if (match && !match.fn(t.duration)) return false;
    }
    if (months.length > 0 && !months.some((m) => t.bestSeason.includes(m)))
      return false;
    if (t.price < minPrice || t.price > maxPrice) return false;
    return true;
  });

  const sorted = sortTreks(filtered, sort);

  const clearAll = () => {
    setRegions(["uttarakhand", "himachal"]);
    setDifficulties([]);
    setDuration("");
    setMonths([]);
    setMinPrice(0);
    setMaxPrice(30000);
    setSort("popular");
    setVisible(12);
  };

  const FilterPanel = () => (
    <div
      className="p-6 sticky top-24"
      style={{ background: "var(--color-snow)", borderRadius: "12px" }}
    >
      {/* Region */}
      <div className="mb-6">
        <h3
          className="font-ui font-bold text-sm mb-3"
          style={{ color: "var(--color-midnight)" }}
        >
          Region
        </h3>
        {REGIONS.map((r) => (
          <label
            key={r.val}
            className="flex items-center gap-2 mb-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={regions.includes(r.val)}
              onChange={() => toggleArr(regions, setRegions, r.val)}
              className="w-4 h-4 rounded"
              style={{ accentColor: "var(--color-glacier)" }}
            />
            <span
              className="font-ui text-sm"
              style={{ color: "var(--color-midnight)" }}
            >
              {r.label}
            </span>
          </label>
        ))}
      </div>
      {/* Difficulty */}
      <div className="mb-6">
        <h3
          className="font-ui font-bold text-sm mb-3"
          style={{ color: "var(--color-midnight)" }}
        >
          Difficulty
        </h3>
        {DIFFICULTIES.map((d) => (
          <label
            key={d}
            className="flex items-center gap-2 mb-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={difficulties.includes(d)}
              onChange={() => toggleArr(difficulties, setDifficulties, d)}
              className="w-4 h-4 rounded"
              style={{ accentColor: "var(--color-glacier)" }}
            />
            <span
              className="font-ui text-sm"
              style={{ color: "var(--color-midnight)" }}
            >
              {d}
            </span>
          </label>
        ))}
      </div>
      {/* Duration */}
      <div className="mb-6">
        <h3
          className="font-ui font-bold text-sm mb-3"
          style={{ color: "var(--color-midnight)" }}
        >
          Duration
        </h3>
        {DURATIONS.map((d) => (
          <label
            key={d.val}
            className="flex items-center gap-2 mb-2 cursor-pointer"
          >
            <input
              type="radio"
              name="duration"
              checked={duration === d.val}
              onChange={() => setDuration(d.val)}
              className="w-4 h-4"
              style={{ accentColor: "var(--color-glacier)" }}
            />
            <span
              className="font-ui text-sm"
              style={{ color: "var(--color-midnight)" }}
            >
              {d.label}
            </span>
          </label>
        ))}
        {duration && (
          <button
            type="button"
            onClick={() => setDuration("")}
            className="text-xs mt-1 underline"
            style={{ color: "var(--color-ember)" }}
          >
            Clear
          </button>
        )}
      </div>
      {/* Best Month */}
      <div className="mb-6">
        <h3
          className="font-ui font-bold text-sm mb-3"
          style={{ color: "var(--color-midnight)" }}
        >
          Best Month
        </h3>
        <div className="grid grid-cols-4 gap-1">
          {MONTHS.map((m) => (
            <button
              type="button"
              key={m}
              onClick={() => toggleArr(months, setMonths, m)}
              className="text-xs py-1 px-1 rounded transition-smooth font-mono"
              style={{
                background: months.includes(m)
                  ? "var(--color-glacier)"
                  : "rgba(10,14,26,0.1)",
                color: months.includes(m) ? "white" : "var(--color-midnight)",
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      {/* Price Range */}
      <div className="mb-6">
        <h3
          className="font-ui font-bold text-sm mb-3"
          style={{ color: "var(--color-midnight)" }}
        >
          Price Range (₹)
        </h3>
        <div className="flex gap-2">
          <input
            type="number"
            value={minPrice}
            min={0}
            max={maxPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-full rounded border px-2 py-1 text-sm"
            style={{ borderColor: "#ccc", color: "var(--color-midnight)" }}
            placeholder="Min"
            data-ocid="all-treks.min_price_input"
          />
          <input
            type="number"
            value={maxPrice}
            min={minPrice}
            max={30000}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full rounded border px-2 py-1 text-sm"
            style={{ borderColor: "#ccc", color: "var(--color-midnight)" }}
            placeholder="Max"
            data-ocid="all-treks.max_price_input"
          />
        </div>
      </div>
      {/* Sort */}
      <div className="mb-6">
        <h3
          className="font-ui font-bold text-sm mb-3"
          style={{ color: "var(--color-midnight)" }}
        >
          Sort By
        </h3>
        {(
          [
            "popular",
            "price-asc",
            "price-desc",
            "duration-short",
            "altitude-high",
          ] as SortKey[]
        ).map((s) => (
          <label
            key={s}
            className="flex items-center gap-2 mb-2 cursor-pointer"
          >
            <input
              type="radio"
              name="sort"
              checked={sort === s}
              onChange={() => setSort(s)}
              className="w-4 h-4"
              style={{ accentColor: "var(--color-glacier)" }}
            />
            <span
              className="font-ui text-sm"
              style={{ color: "var(--color-midnight)" }}
            >
              {
                {
                  popular: "Most Popular",
                  "price-asc": "Price (Low–High)",
                  "price-desc": "Price (High–Low)",
                  "duration-short": "Duration (Short)",
                  "altitude-high": "Altitude (Highest)",
                }[s]
              }
            </span>
          </label>
        ))}
      </div>
      <button
        type="button"
        onClick={clearAll}
        className="font-ui text-sm underline"
        style={{ color: "var(--color-ember)" }}
        data-ocid="all-treks.clear_filters_button"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-midnight)" }}
      data-ocid="all-treks.page"
    >
      <Navigation />

      {/* Header */}
      <section
        className="pt-20 pb-10 px-6"
        style={{ background: "var(--color-midnight)" }}
        data-ocid="all-treks.header"
      >
        <div className="container-max">
          <h1
            className="font-display font-bold mb-3"
            style={{
              fontSize: "clamp(2rem,5vw,3.5rem)",
              color: "var(--color-snow)",
            }}
          >
            All Himalayan Treks
          </h1>
          <p
            className="font-body text-lg mb-2"
            style={{ color: "var(--color-ash)" }}
          >
            40 curated routes across Uttarakhand &amp; Himachal Pradesh
          </p>
          <p
            className="font-mono text-xs tracking-wider"
            style={{ color: "var(--color-glacier)" }}
          >
            SHOWING {Math.min(visible, sorted.length)} OF {sorted.length} TREKS
          </p>
        </div>
      </section>

      {/* Mobile filter button */}
      <div className="lg:hidden px-4 pb-4">
        <div className="container-max">
          <button
            type="button"
            onClick={() => setMobileFilters(true)}
            className="btn-secondary font-ui text-sm"
            data-ocid="all-treks.mobile_filter_button"
          >
            🔧 Filter & Sort
          </button>
        </div>
      </div>

      {/* Mobile filter overlay */}
      {mobileFilters && (
        <div
          className="fixed inset-0 z-50 overflow-auto"
          style={{ background: "rgba(10,14,26,0.8)" }}
        >
          <div
            className="absolute right-0 top-0 bottom-0 w-[320px] overflow-auto"
            style={{ background: "var(--color-snow)" }}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <span
                className="font-ui font-bold"
                style={{ color: "var(--color-midnight)" }}
              >
                Filters
              </span>
              <button
                type="button"
                onClick={() => setMobileFilters(false)}
                aria-label="Close filters"
                className="text-2xl"
                style={{ color: "var(--color-midnight)" }}
              >
                ✕
              </button>
            </div>
            <FilterPanel />
            <div className="p-4">
              <button
                type="button"
                onClick={() => setMobileFilters(false)}
                className="btn-primary w-full font-ui"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Layout: sidebar + grid */}
      <div className="container-max pb-20">
        <div className="flex gap-8 items-start">
          {/* Sidebar desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <FilterPanel />
          </aside>
          {/* Grid */}
          <main id="main-content" className="flex-1 min-w-0">
            {sorted.length === 0 ? (
              <div
                className="text-center py-20"
                data-ocid="all-treks.empty_state"
              >
                <p className="text-5xl mb-4">🏔️</p>
                <p
                  className="font-display font-bold text-xl mb-2"
                  style={{ color: "var(--color-snow)" }}
                >
                  No treks match your filters
                </p>
                <p className="font-body" style={{ color: "var(--color-ash)" }}>
                  Try broadening your filters or{" "}
                  <button
                    type="button"
                    onClick={clearAll}
                    className="underline"
                    style={{ color: "var(--color-glacier)" }}
                  >
                    clear all
                  </button>
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sorted.slice(0, visible).map((trek, i) => (
                    <TrekCard
                      key={trek.id}
                      trek={trek}
                      index={i}
                      bookmarked={bookmarks.has(trek.id)}
                      onToggle={(id) =>
                        setBookmarks((prev) => {
                          const s = new Set(prev);
                          s.has(id) ? s.delete(id) : s.add(id);
                          return s;
                        })
                      }
                    />
                  ))}
                </div>
                {visible < sorted.length && (
                  <div className="text-center mt-12">
                    <button
                      type="button"
                      onClick={() => setVisible((v) => v + 12)}
                      className="btn-secondary font-ui"
                      data-ocid="all-treks.load_more_button"
                    >
                      Load More Treks ({sorted.length - visible} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      <NewsletterFooter />
    </div>
  );
}
