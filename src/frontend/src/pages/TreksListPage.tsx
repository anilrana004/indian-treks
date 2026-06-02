import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { treks } from "@/data/treks";
import type { Difficulty, Trek, TrekState } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  Clock,
  Filter,
  MapPin,
  Mountain,
  RotateCcw,
  Search,
  Star,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";

// ─── Filter Types ──────────────────────────────────────────────────────────
type SortOption =
  | "popular"
  | "price-asc"
  | "price-desc"
  | "difficulty-easy"
  | "altitude-desc";

interface Filters {
  state: TrekState | "all";
  difficulty: Difficulty[];
  duration: string[];
  priceRange: string[];
  season: string[];
  altitude: string[];
}

const PAGE_SIZE = 9;

const DIFFICULTY_OPTIONS: Difficulty[] = [
  "Easy",
  "Easy-Moderate",
  "Moderate",
  "Moderate-Difficult",
  "Challenging",
  "Difficult",
];

const DURATION_OPTIONS = [
  { label: "1–3 Days", key: "1-3" },
  { label: "4–6 Days", key: "4-6" },
  { label: "7–10 Days", key: "7-10" },
  { label: "10+ Days", key: "10+" },
];

const PRICE_OPTIONS = [
  { label: "Under ₹5,000", key: "u5k" },
  { label: "₹5,000–₹10,000", key: "5k-10k" },
  { label: "₹10,000–₹20,000", key: "10k-20k" },
  { label: "₹20,000+", key: "20k+" },
];

const SEASON_OPTIONS = ["Winter", "Summer", "Monsoon", "All Season"];

const ALTITUDE_OPTIONS = [
  { label: "Under 3,000m", key: "u3k" },
  { label: "3,000–4,000m", key: "3k-4k" },
  { label: "4,000–5,000m", key: "4k-5k" },
  { label: "5,000m+", key: "5k+" },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "popular", label: "Popularity" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "difficulty-easy", label: "Difficulty: Easy First" },
  { value: "altitude-desc", label: "Altitude: High to Low" },
];

const difficultyRank: Record<string, number> = {
  Easy: 1,
  "Easy-Moderate": 2,
  Moderate: 3,
  "Moderate-Difficult": 4,
  Challenging: 5,
  Difficult: 6,
  "Very Difficult": 7,
};

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-100 text-green-800",
  "Easy-Moderate": "bg-lime-100 text-lime-800",
  Moderate: "bg-yellow-100 text-yellow-800",
  "Moderate-Difficult": "bg-orange-100 text-orange-800",
  Challenging: "bg-orange-100 text-orange-700",
  Difficult: "bg-red-100 text-red-800",
  "Very Difficult": "bg-red-200 text-red-900",
};

// ─── Helpers ───────────────────────────────────────────────────────────────
function matchesDuration(trek: Trek, keys: string[]): boolean {
  if (!keys.length) return true;
  const num = Number.parseInt(trek.duration);
  return keys.some((k) => {
    if (k === "1-3") return num >= 1 && num <= 3;
    if (k === "4-6") return num >= 4 && num <= 6;
    if (k === "7-10") return num >= 7 && num <= 10;
    if (k === "10+") return num > 10;
    return false;
  });
}

function matchesPrice(trek: Trek, keys: string[]): boolean {
  if (!keys.length) return true;
  return keys.some((k) => {
    if (k === "u5k") return trek.price < 5000;
    if (k === "5k-10k") return trek.price >= 5000 && trek.price < 10000;
    if (k === "10k-20k") return trek.price >= 10000 && trek.price < 20000;
    if (k === "20k+") return trek.price >= 20000;
    return false;
  });
}

function matchesSeason(trek: Trek, seasons: string[]): boolean {
  if (!seasons.length) return true;
  const s = trek.bestSeason.toLowerCase();
  return seasons.some((season) => {
    if (season === "Winter")
      return (
        s.includes("dec") ||
        s.includes("jan") ||
        s.includes("feb") ||
        s.includes("nov")
      );
    if (season === "Summer")
      return s.includes("apr") || s.includes("may") || s.includes("jun");
    if (season === "Monsoon")
      return s.includes("jul") || s.includes("aug") || s.includes("sep");
    if (season === "All Season") return s.includes("all");
    return false;
  });
}

function matchesAltitude(trek: Trek, keys: string[]): boolean {
  if (!keys.length) return true;
  return keys.some((k) => {
    if (k === "u3k") return trek.altitude < 3000;
    if (k === "3k-4k") return trek.altitude >= 3000 && trek.altitude < 4000;
    if (k === "4k-5k") return trek.altitude >= 4000 && trek.altitude < 5000;
    if (k === "5k+") return trek.altitude >= 5000;
    return false;
  });
}

// ─── Subcomponents ─────────────────────────────────────────────────────────
function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: { label: string; key: string }[];
  selected: string[];
  onChange: (keys: string[]) => void;
}) {
  const toggle = (key: string) =>
    onChange(
      selected.includes(key)
        ? selected.filter((k) => k !== key)
        : [...selected, key],
    );
  return (
    <div className="mb-5">
      <h3 className="font-semibold text-foreground text-sm mb-2.5">{label}</h3>
      <div className="space-y-2">
        {options.map((opt) => (
          <label
            key={opt.key}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selected.includes(opt.key)}
              onChange={() => toggle(opt.key)}
              className="w-4 h-4 accent-primary rounded"
              data-ocid={`treks.filter.${opt.key}_checkbox`}
            />
            <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

function TrekListCard({ trek, index }: { trek: Trek; index: number }) {
  return (
    <Link
      to="/treks/$slug"
      params={{ slug: trek.slug }}
      className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-smooth flex flex-col"
      data-ocid={`treks.item.${index}`}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={trek.heroImage}
          alt={trek.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 right-3">
          <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
            ₹{trek.price.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              difficultyColors[trek.difficulty] ??
              "bg-muted text-muted-foreground"
            }`}
          >
            {trek.difficulty}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 rounded-full capitalize">
            {trek.state === "uttarakhand" ? "Uttarakhand" : "Himachal"}
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-foreground text-base mb-1.5 line-clamp-1 group-hover:text-primary transition-colors">
          {trek.name}
        </h3>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Mountain className="w-3.5 h-3.5 text-primary/70" />
            <span>{trek.altitude.toLocaleString("en-IN")}m</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-primary/70" />
            <span>{trek.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-primary/70" />
            <span className="truncate">{trek.district}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium text-foreground">{trek.rating}</span>
          </div>
        </div>
        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {trek.bestSeason}
          </span>
          <span className="text-xs font-semibold text-primary group-hover:underline">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}

function FilterSidebar({
  filters,
  onChange,
  onClear,
}: {
  filters: Filters;
  onChange: (f: Partial<Filters>) => void;
  onClear: () => void;
}) {
  const hasActive =
    filters.state !== "all" ||
    filters.difficulty.length ||
    filters.duration.length ||
    filters.priceRange.length ||
    filters.season.length ||
    filters.altitude.length;

  return (
    <aside
      className="bg-card rounded-2xl border p-5 shadow-sm"
      data-ocid="treks.filter_sidebar"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-foreground flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" /> Filters
        </h2>
        {!!hasActive && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-primary hover:underline flex items-center gap-1"
            data-ocid="treks.clear_filters_button"
          >
            <RotateCcw className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      {/* State */}
      <div className="mb-5">
        <h3 className="font-semibold text-foreground text-sm mb-2.5">State</h3>
        <div className="flex flex-col gap-2">
          {(["all", "uttarakhand", "himachal"] as const).map((s) => (
            <label
              key={s}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="radio"
                name="state"
                checked={filters.state === s}
                onChange={() => onChange({ state: s })}
                className="w-4 h-4 accent-primary"
                data-ocid={`treks.filter.state_${s}_radio`}
              />
              <span className="text-sm text-foreground/80 group-hover:text-foreground capitalize">
                {s === "all"
                  ? "All States"
                  : s === "uttarakhand"
                    ? "Uttarakhand"
                    : "Himachal Pradesh"}
              </span>
            </label>
          ))}
        </div>
      </div>

      <CheckboxGroup
        label="Difficulty"
        options={DIFFICULTY_OPTIONS.map((d) => ({ label: d, key: d }))}
        selected={filters.difficulty}
        onChange={(v) => onChange({ difficulty: v as Difficulty[] })}
      />
      <CheckboxGroup
        label="Duration"
        options={DURATION_OPTIONS}
        selected={filters.duration}
        onChange={(v) => onChange({ duration: v })}
      />
      <CheckboxGroup
        label="Price Range"
        options={PRICE_OPTIONS}
        selected={filters.priceRange}
        onChange={(v) => onChange({ priceRange: v })}
      />
      <CheckboxGroup
        label="Best Season"
        options={SEASON_OPTIONS.map((s) => ({ label: s, key: s }))}
        selected={filters.season}
        onChange={(v) => onChange({ season: v })}
      />
      <CheckboxGroup
        label="Altitude"
        options={ALTITUDE_OPTIONS}
        selected={filters.altitude}
        onChange={(v) => onChange({ altitude: v })}
      />
    </aside>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function TreksListPage() {
  const [filters, setFilters] = useState<Filters>({
    state: "all",
    difficulty: [],
    duration: [],
    priceRange: [],
    season: [],
    altitude: [],
  });
  const [sort, setSort] = useState<SortOption>("popular");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const updateFilter = (f: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...f }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({
      state: "all",
      difficulty: [],
      duration: [],
      priceRange: [],
      season: [],
      altitude: [],
    });
    setSearch("");
    setPage(1);
  };

  const filtered = useMemo(() => {
    let result = [...treks];
    if (filters.state !== "all")
      result = result.filter((t) => t.state === filters.state);
    if (filters.difficulty.length)
      result = result.filter((t) => filters.difficulty.includes(t.difficulty));
    if (filters.duration.length)
      result = result.filter((t) => matchesDuration(t, filters.duration));
    if (filters.priceRange.length)
      result = result.filter((t) => matchesPrice(t, filters.priceRange));
    if (filters.season.length)
      result = result.filter((t) => matchesSeason(t, filters.season));
    if (filters.altitude.length)
      result = result.filter((t) => matchesAltitude(t, filters.altitude));
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.district.toLowerCase().includes(q),
      );
    }
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "difficulty-easy":
        result.sort(
          (a, b) =>
            (difficultyRank[a.difficulty] ?? 9) -
            (difficultyRank[b.difficulty] ?? 9),
        );
        break;
      case "altitude-desc":
        result.sort((a, b) => b.altitude - a.altitude);
        break;
      default:
        result.sort((a, b) => b.rating - a.rating);
    }
    return result;
  }, [filters, sort, search]);

  const paged = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paged.length < filtered.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="relative h-72 md:h-96 flex items-end"
        style={{
          backgroundImage:
            "url(/assets/generated/himalayan-treks-hero.dim_1600x900.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
        data-ocid="treks.hero"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/75" />
        <div className="relative w-full max-w-7xl mx-auto px-4 pb-10">
          <nav className="flex items-center gap-1.5 text-white/70 text-xs mb-3">
            <a href="/" className="hover:text-white">
              Home
            </a>
            <span>/</span>
            <span className="text-white">Treks</span>
          </nav>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-2">
            Himalayan Treks
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            Explore 40 world-class treks across Uttarakhand and Himachal Pradesh
          </p>
        </div>
      </section>

      {/* Controls bar */}
      <div className="bg-card border-b sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search treks..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-input bg-background text-sm"
              data-ocid="treks.search_input"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-input bg-background text-sm font-medium cursor-pointer"
              data-ocid="treks.sort_select"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>

          {/* Mobile filter toggle */}
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden flex items-center gap-1.5"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            data-ocid="treks.mobile_filter_button"
          >
            <Filter className="w-4 h-4" /> Filters
          </Button>

          {/* Result count */}
          <span className="text-sm text-muted-foreground ml-auto">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {Math.min(paged.length, filtered.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            treks
          </span>
        </div>

        {/* Mobile filter accordion */}
        {mobileFiltersOpen && (
          <div className="lg:hidden border-t bg-card px-4 py-4 max-h-[60vh] overflow-y-auto">
            <FilterSidebar
              filters={filters}
              onChange={updateFilter}
              onClear={clearFilters}
            />
          </div>
        )}
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6 items-start">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0 sticky top-20">
            <FilterSidebar
              filters={filters}
              onChange={updateFilter}
              onClear={clearFilters}
            />
          </div>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {paged.length === 0 ? (
              <div
                className="text-center py-20 bg-card rounded-2xl border"
                data-ocid="treks.empty_state"
              >
                <div className="text-6xl mb-4">🏔️</div>
                <h3 className="font-bold text-xl text-foreground mb-2">
                  No treks found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query
                </p>
                <Button
                  onClick={clearFilters}
                  data-ocid="treks.clear_filters_button"
                >
                  <RotateCcw className="w-4 h-4 mr-2" /> Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {paged.map((trek, i) => (
                    <TrekListCard key={trek.slug} trek={trek} index={i + 1} />
                  ))}
                </div>

                {hasMore && (
                  <div className="flex justify-center mt-10">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setPage((p) => p + 1)}
                      className="px-10 border-primary text-primary hover:bg-primary/5"
                      data-ocid="treks.load_more_button"
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Load More Treks ({filtered.length - paged.length}{" "}
                      remaining)
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Featured Stats */}
      <section className="bg-muted/40 border-t py-12 mt-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "40+", label: "Curated Treks" },
            { value: "2", label: "Himalayan States" },
            { value: "12+", label: "Districts Covered" },
            { value: "4.8★", label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
