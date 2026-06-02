import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { treks } from "../data/treks";
import type { Difficulty, Trek } from "../types";

// ── Filter config ──────────────────────────────────────────
type FilterKey =
  | "all"
  | "uttarakhand"
  | "himachal-pradesh"
  | "easy"
  | "moderate"
  | "difficult"
  | "extreme";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "uttarakhand", label: "Uttarakhand" },
  { key: "himachal-pradesh", label: "Himachal Pradesh" },
  { key: "easy", label: "Easy" },
  { key: "moderate", label: "Moderate" },
  { key: "difficult", label: "Difficult" },
  { key: "extreme", label: "Extreme" },
];

function matchesFilter(trek: Trek, filter: FilterKey): boolean {
  if (filter === "all") return true;
  if (filter === "uttarakhand") return trek.state === "uttarakhand";
  if (filter === "himachal-pradesh") return trek.state === "himachal";
  const d = trek.difficulty.toLowerCase();
  if (filter === "easy") return d.includes("easy");
  if (filter === "moderate")
    return d === "moderate" || d === "moderate-difficult";
  if (filter === "difficult")
    return d === "difficult" || d === "very difficult" || d === "challenging";
  if (filter === "extreme") return d === "extreme";
  return false;
}

// ── Difficulty badge mapping ─────────────────────────────────
function difficultyBadgeClass(difficulty: Difficulty): string {
  const d = difficulty.toLowerCase();
  if (d.includes("extreme"))
    return "bg-purple-100 text-purple-700 font-semibold";
  if (d.includes("difficult") || d === "very difficult" || d === "challenging")
    return "bg-red-100 text-red-700 font-semibold";
  if (d === "moderate" || d === "moderate-difficult")
    return "bg-amber-100 text-amber-700 font-semibold";
  return "bg-green-100 text-green-700 font-semibold";
}

function difficultyLabel(difficulty: Difficulty): string {
  const map: Record<string, string> = {
    easy: "Easy",
    "easy-moderate": "Easy+",
    moderate: "Moderate",
    "moderate-difficult": "Mod+",
    challenging: "Challenging",
    difficult: "Difficult",
    "very difficult": "Very Hard",
    extreme: "Extreme",
  };
  return map[difficulty.toLowerCase()] ?? difficulty;
}

// ── Bookmark Icon ────────────────────────────────────────────
function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "#16a34a" : "none"}
      stroke="#16a34a"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

// ── Trek Card ────────────────────────────────────────────────
interface TrekCardProps {
  trek: Trek;
  index: number;
  isNew: boolean;
  bookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

function TrekCard({
  trek,
  index,
  isNew,
  bookmarked,
  onToggleBookmark,
}: TrekCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const staggerDelay = Math.min(index % 6, 5) * 0.1;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("revealed");
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="reveal bg-white border border-gray-200 rounded-2xl hover:shadow-elevated hover:-translate-y-1 transition-all"
      style={{
        transitionDelay: `${staggerDelay}s`,
        animationDelay: isNew ? `${staggerDelay}s` : undefined,
      }}
      data-ocid={`trek.item.${index + 1}`}
    >
      {/* Image area */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img
          src={trek.heroImage}
          alt={trek.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[600ms] ease-in-out"
          style={{ transform: "scale(1)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform =
              "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
          }}
        />

        {/* Difficulty badge — top-right */}
        <span
          className={`absolute top-3 right-3 font-mono text-[11px] font-bold px-[10px] py-[4px] ${difficultyBadgeClass(trek.difficulty)}`}
          style={{ borderRadius: "4px", letterSpacing: "0.04em" }}
        >
          {difficultyLabel(trek.difficulty)}
        </span>

        {/* Bookmark — top-left */}
        <button
          type="button"
          onClick={() => onToggleBookmark(trek.id)}
          aria-label={
            bookmarked ? `Remove ${trek.name} from saved` : `Save ${trek.name}`
          }
          className="absolute top-3 left-3 flex items-center justify-center w-8 h-8 rounded-full transition-smooth bg-white/90 border border-green-300"
          data-ocid={`trek.bookmark.${index + 1}`}
        >
          <BookmarkIcon filled={bookmarked} />
        </button>
      </div>

      {/* Card body */}
      <div className="p-5 bg-white">
        {/* Trek name */}
        <h3 className="font-ui font-bold text-[18px] leading-snug mb-1 text-gray-900">
          {trek.name}
        </h3>

        {/* Location line */}
        <p className="font-mono text-[11px] uppercase tracking-wide mb-3 text-green-600">
          {trek.state === "uttarakhand" ? "UTTARAKHAND" : "HIMACHAL PRADESH"} ·{" "}
          {trek.altitude.toLocaleString("en-IN")}M
        </p>

        {/* Info row */}
        <div className="flex flex-wrap gap-3 text-[13px] mb-3 text-gray-600 font-ui">
          <span>📅 {trek.duration}</span>
          <span>👥 Group &amp; Solo</span>
          <span>🗓️ {trek.bestSeason}</span>
        </div>

        {/* Description / tagline */}
        <p
          className="font-body text-[14px] leading-relaxed mb-4 text-gray-600"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {trek.tagline ?? trek.aboutTrek.slice(0, 120)}
        </p>

        {/* Price + CTA row */}
        <div className="flex items-center justify-between">
          <span className="font-ui font-bold text-lg text-gray-900">
            From ₹{trek.price.toLocaleString("en-IN")}/person
          </span>

          <Link
            to="/treks/$slug"
            params={{ slug: trek.slug }}
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg px-4 py-2 text-[14px] transition-colors duration-200"
            data-ocid={`trek.view_link.${index + 1}`}
          >
            View Trek →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Main Section ─────────────────────────────────────────────
export default function FeaturedTreks() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [newIndices, setNewIndices] = useState<Set<number>>(new Set());
  const prevCountRef = useRef(6);

  const filteredTreks = treks.filter((t) => matchesFilter(t, activeFilter));
  const visibleTreks = filteredTreks.slice(0, visibleCount);
  const remaining = filteredTreks.length - visibleCount;

  function handleFilterChange(key: FilterKey) {
    setActiveFilter(key);
    setVisibleCount(6);
    setNewIndices(new Set());
    prevCountRef.current = 6;
  }

  function handleLoadMore() {
    const prev = prevCountRef.current;
    const next = prev + 6;
    const indices = new Set<number>();
    for (let i = prev; i < Math.min(next, filteredTreks.length); i++) {
      indices.add(i);
    }
    setNewIndices(indices);
    setVisibleCount(next);
    prevCountRef.current = next;
  }

  function toggleBookmark(id: string) {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <section
      className="section-padding bg-gray-50"
      aria-labelledby="featured-treks-title"
      data-ocid="featured_treks.section"
    >
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-mono text-[12px] uppercase tracking-[0.15em] mb-3 text-green-600">
            HANDPICKED FOR YOU
          </p>
          <h2
            id="featured-treks-title"
            className="font-display font-bold leading-tight text-green-900"
            style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
          >
            Iconic Himalayan Treks
          </h2>
        </div>

        {/* Filter Tabs */}
        <div
          className="flex flex-wrap gap-2 justify-center mb-10"
          aria-label="Filter treks"
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => handleFilterChange(f.key)}
              aria-pressed={activeFilter === f.key}
              data-ocid={`trek.filter.${f.key}`}
              className={`font-ui text-[13px] font-medium px-4 py-2 rounded-full transition-smooth cursor-pointer ${
                activeFilter === f.key
                  ? "bg-green-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-green-400"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
          }}
          data-ocid="trek.list"
        >
          {visibleTreks.map((trek, idx) => (
            <TrekCard
              key={trek.id}
              trek={trek}
              index={idx}
              isNew={newIndices.has(idx)}
              bookmarked={bookmarks.has(trek.id)}
              onToggleBookmark={toggleBookmark}
            />
          ))}
        </div>

        {/* Empty state */}
        {visibleTreks.length === 0 && (
          <div className="text-center py-16" data-ocid="trek.empty_state">
            <p className="font-display text-2xl mb-2 text-gray-900">
              No treks found
            </p>
            <p className="font-ui text-[14px] text-gray-600">
              Try selecting a different filter
            </p>
          </div>
        )}

        {/* Counter + Load More */}
        {filteredTreks.length > 0 && (
          <div className="flex flex-col items-center gap-4 mt-12">
            <p className="font-mono text-[12px] text-gray-600">
              Showing {Math.min(visibleCount, filteredTreks.length)} of{" "}
              {filteredTreks.length} treks
            </p>

            {remaining > 0 && (
              <button
                type="button"
                onClick={handleLoadMore}
                className="border-2 border-green-600 text-green-700 hover:bg-green-50 font-ui text-[14px] font-medium px-6 py-2 rounded-full transition-colors duration-200"
                data-ocid="trek.load_more_button"
              >
                Load More Treks ({remaining} remaining)
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
