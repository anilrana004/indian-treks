import { Button } from "@/components/ui/button";
import { yatras } from "@/data/yatras";
import type { Difficulty, TrekState, Yatra } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  Clock,
  Filter,
  Flame,
  MapPin,
  Mountain,
  RotateCcw,
  Search,
  Star,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";

type SortOption =
  | "popular"
  | "price-asc"
  | "price-desc"
  | "difficulty-easy"
  | "altitude-desc";
type ReligiousType = "all" | "shiva" | "vishnu" | "sikh" | "other";

interface Filters {
  state: TrekState | "all";
  difficulty: Difficulty[];
  duration: string[];
  priceRange: string[];
  season: string[];
  altitude: string[];
  religiousType: ReligiousType;
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
const SEASON_OPTIONS = ["Summer", "Monsoon", "Autumn", "All Season"];
const ALTITUDE_OPTIONS = [
  { label: "Under 3,000m", key: "u3k" },
  { label: "3,000–4,000m", key: "3k-4k" },
  { label: "4,000–5,000m", key: "4k-5k" },
  { label: "5,000m+", key: "5k+" },
];
const RELIGIOUS_OPTIONS: {
  value: ReligiousType;
  label: string;
  icon: string;
}[] = [
  { value: "all", label: "All Traditions", icon: "🙏" },
  { value: "shiva", label: "Shaivite (Shiva)", icon: "🔱" },
  { value: "vishnu", label: "Vaishnava (Vishnu)", icon: "🪷" },
  { value: "sikh", label: "Sikh Yatras", icon: "☬" },
  { value: "other", label: "Other / Mixed", icon: "✨" },
];
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "popular", label: "Popularity" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "difficulty-easy", label: "Difficulty: Easy First" },
  { value: "altitude-desc", label: "Altitude: High to Low" },
];

// Featured yatras (static showcase when no data loaded)
const FEATURED_YATRAS = [
  {
    id: "char-dham",
    name: "Char Dham Yatra",
    subtitle: "Yamunotri · Gangotri · Kedarnath · Badrinath",
    icon: "🕉️",
    tags: ["Most Sacred", "14 Days", "Uttarakhand"],
    color: "from-orange-500 to-amber-400",
  },
  {
    id: "kedarnath",
    name: "Kedarnath Yatra",
    subtitle: "Jyotirlinga at 3,583m — Highest Shiva Temple",
    icon: "🔱",
    tags: ["Jyotirlinga", "4 Days", "Rudraprayag"],
    color: "from-secondary to-teal-400",
  },
  {
    id: "hemkund-sahib",
    name: "Hemkund Sahib Yatra",
    subtitle: "Sacred Sikh Gurudwara at 4,329m",
    icon: "☬",
    tags: ["Sikh Pilgrimage", "3 Days", "Chamoli"],
    color: "from-blue-500 to-indigo-400",
  },
  {
    id: "mani-mahesh",
    name: "Mani Mahesh Yatra",
    subtitle: "The Untouched Kailash of Himachal Pradesh",
    icon: "🏔️",
    tags: ["Radh Jatra", "5 Days", "Chamba"],
    color: "from-purple-500 to-violet-400",
  },
];

const difficultyRank: Record<string, number> = {
  Easy: 1,
  "Easy-Moderate": 2,
  Moderate: 3,
  "Moderate-Difficult": 4,
  Challenging: 5,
  Difficult: 6,
};
const difficultyColors: Record<string, string> = {
  Easy: "bg-green-100 text-green-800",
  "Easy-Moderate": "bg-lime-100 text-lime-800",
  Moderate: "bg-yellow-100 text-yellow-800",
  "Moderate-Difficult": "bg-orange-100 text-orange-800",
  Challenging: "bg-orange-100 text-orange-700",
  Difficult: "bg-red-100 text-red-800",
};

function matchesDuration(y: Yatra, keys: string[]): boolean {
  if (!keys.length) return true;
  const num = Number.parseInt(y.duration);
  return keys.some((k) => {
    if (k === "1-3") return num >= 1 && num <= 3;
    if (k === "4-6") return num >= 4 && num <= 6;
    if (k === "7-10") return num >= 7 && num <= 10;
    if (k === "10+") return num > 10;
    return false;
  });
}

function matchesPrice(y: Yatra, keys: string[]): boolean {
  if (!keys.length) return true;
  return keys.some((k) => {
    if (k === "u5k") return y.price < 5000;
    if (k === "5k-10k") return y.price >= 5000 && y.price < 10000;
    if (k === "10k-20k") return y.price >= 10000 && y.price < 20000;
    if (k === "20k+") return y.price >= 20000;
    return false;
  });
}

function matchesSeason(y: Yatra, seasons: string[]): boolean {
  if (!seasons.length) return true;
  const s = y.bestSeason.toLowerCase();
  return seasons.some((season) => {
    if (season === "Summer")
      return s.includes("may") || s.includes("jun") || s.includes("apr");
    if (season === "Monsoon") return s.includes("jul") || s.includes("aug");
    if (season === "Autumn") return s.includes("sep") || s.includes("oct");
    if (season === "All Season") return s.includes("all");
    return false;
  });
}

function matchesAltitude(y: Yatra, keys: string[]): boolean {
  if (!keys.length) return true;
  return keys.some((k) => {
    if (k === "u3k") return y.altitude < 3000;
    if (k === "3k-4k") return y.altitude >= 3000 && y.altitude < 4000;
    if (k === "4k-5k") return y.altitude >= 4000 && y.altitude < 5000;
    if (k === "5k+") return y.altitude >= 5000;
    return false;
  });
}

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
              data-ocid={`yatras.filter.${opt.key}_checkbox`}
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

function YatraCard({ yatra, index }: { yatra: Yatra; index: number }) {
  return (
    <Link
      to="/treks/$slug"
      params={{ slug: yatra.slug }}
      className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-smooth flex flex-col"
      data-ocid={`yatras.item.${index}`}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={yatra.heroImage}
          alt={yatra.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 right-3">
          <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
            ₹{yatra.price.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColors[yatra.difficulty] ?? "bg-muted text-muted-foreground"}`}
          >
            {yatra.difficulty}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-secondary/80 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
            <Flame className="w-3 h-3" /> Yatra
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-foreground text-base mb-1.5 line-clamp-1 group-hover:text-primary transition-colors">
          {yatra.name}
        </h3>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Mountain className="w-3.5 h-3.5 text-secondary/70" />
            <span>{yatra.altitude.toLocaleString("en-IN")}m</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-secondary/70" />
            <span>{yatra.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-secondary/70" />
            <span className="truncate">{yatra.district}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium text-foreground">{yatra.rating}</span>
          </div>
        </div>
        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {yatra.bestSeason}
          </span>
          <span className="text-xs font-semibold text-secondary group-hover:underline">
            View Yatra →
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
    filters.altitude.length ||
    filters.religiousType !== "all";
  return (
    <aside
      className="bg-card rounded-2xl border p-5 shadow-sm"
      data-ocid="yatras.filter_sidebar"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-foreground flex items-center gap-2">
          <Filter className="w-4 h-4 text-secondary" /> Filters
        </h2>
        {!!hasActive && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-secondary hover:underline flex items-center gap-1"
            data-ocid="yatras.clear_filters_button"
          >
            <RotateCcw className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      {/* Religious Type */}
      <div className="mb-5">
        <h3 className="font-semibold text-foreground text-sm mb-2.5">
          Religious Tradition
        </h3>
        <div className="flex flex-col gap-2">
          {RELIGIOUS_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="radio"
                name="religious"
                checked={filters.religiousType === opt.value}
                onChange={() => onChange({ religiousType: opt.value })}
                className="w-4 h-4 accent-secondary"
                data-ocid={`yatras.filter.religion_${opt.value}_radio`}
              />
              <span className="text-sm text-foreground/80 group-hover:text-foreground flex items-center gap-1.5">
                <span>{opt.icon}</span> {opt.label}
              </span>
            </label>
          ))}
        </div>
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
                name="state-yatra"
                checked={filters.state === s}
                onChange={() => onChange({ state: s })}
                className="w-4 h-4 accent-secondary"
                data-ocid={`yatras.filter.state_${s}_radio`}
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
        label="Physical Fitness Required"
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

export default function YatraListPage() {
  const [filters, setFilters] = useState<Filters>({
    state: "all",
    difficulty: [],
    duration: [],
    priceRange: [],
    season: [],
    altitude: [],
    religiousType: "all",
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
      religiousType: "all",
    });
    setSearch("");
    setPage(1);
  };

  const filtered = useMemo(() => {
    let result = [...yatras];
    if (filters.state !== "all")
      result = result.filter((y) => y.state === filters.state);
    if (filters.difficulty.length)
      result = result.filter((y) => filters.difficulty.includes(y.difficulty));
    if (filters.duration.length)
      result = result.filter((y) => matchesDuration(y, filters.duration));
    if (filters.priceRange.length)
      result = result.filter((y) => matchesPrice(y, filters.priceRange));
    if (filters.season.length)
      result = result.filter((y) => matchesSeason(y, filters.season));
    if (filters.altitude.length)
      result = result.filter((y) => matchesAltitude(y, filters.altitude));
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (y) =>
          y.name.toLowerCase().includes(q) ||
          y.district.toLowerCase().includes(q),
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
        className="relative h-80 md:h-[440px] flex items-end"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1605537964099-9e7ed0d5ac89?w=1600&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
        data-ocid="yatras.hero"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80" />
        {/* Decorative mantras */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-white/20 text-4xl font-serif select-none">
          ॐ नमः शिवाय
        </div>
        <div className="relative w-full max-w-7xl mx-auto px-4 pb-10">
          <nav className="flex items-center gap-1.5 text-white/70 text-xs mb-3">
            <a href="/" className="hover:text-white">
              Home
            </a>
            <span>/</span>
            <span className="text-white">Yatras</span>
          </nav>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🕉️</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white">
              Sacred Himalayan Yatras
            </h1>
          </div>
          <p className="text-white/80 text-lg max-w-2xl">
            Walk the ancient pilgrimage routes of the Himalayas. Sacred journeys
            across Uttarakhand and Himachal Pradesh — where faith meets the
            mountains.
          </p>
        </div>
      </section>

      {/* Featured Yatras Showcase */}
      {yatras.length === 0 && (
        <section className="bg-muted/30 border-b py-10">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
              Sacred Pilgrimage Routes of the Himalayas
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
              From the highest Shiva temple at Kedarnath to the sacred Sikh
              Gurudwara at Hemkund Sahib, these yatras have drawn pilgrims for
              thousands of years. Each route is a journey not just through the
              mountains, but through the soul.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {FEATURED_YATRAS.map((y) => (
                <div
                  key={y.id}
                  className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg hover:-translate-y-1 transition-smooth"
                >
                  <div
                    className={`h-28 bg-gradient-to-br ${y.color} flex items-center justify-center`}
                  >
                    <span className="text-5xl">{y.icon}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground mb-1">{y.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {y.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {y.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Controls bar */}
      <div className="bg-card border-b sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search yatras..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-input bg-background text-sm"
              data-ocid="yatras.search_input"
            />
          </div>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-input bg-background text-sm font-medium cursor-pointer"
              data-ocid="yatras.sort_select"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden flex items-center gap-1.5 text-sm border border-border rounded-lg px-3 py-2 bg-background"
            data-ocid="yatras.mobile_filter_button"
          >
            <Filter className="w-4 h-4" /> Filters
          </button>
          <span className="text-sm text-muted-foreground ml-auto">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {yatras.length === 0
                ? 0
                : Math.min(paged.length, filtered.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            yatras
          </span>
        </div>
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
          <div className="hidden lg:block w-64 flex-shrink-0 sticky top-20">
            <FilterSidebar
              filters={filters}
              onChange={updateFilter}
              onClear={clearFilters}
            />
          </div>
          <div className="flex-1 min-w-0">
            {yatras.length === 0 ? (
              <div
                className="text-center py-20 bg-card rounded-2xl border"
                data-ocid="yatras.empty_state"
              >
                <div className="text-6xl mb-4">🕉️</div>
                <h3 className="font-bold text-xl text-foreground mb-2">
                  Yatra listings coming soon
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  We're adding detailed content for all 16 sacred yatras. In the
                  meantime, browse our trek collection or contact us to plan
                  your pilgrimage.
                </p>
                <div className="flex gap-3 justify-center">
                  <Link to="/treks" className="btn-primary">
                    Browse Treks
                  </Link>
                  <a href="/contact" className="btn-secondary">
                    Contact Us
                  </a>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {paged.map((yatra, i) => (
                    <YatraCard key={yatra.slug} yatra={yatra} index={i + 1} />
                  ))}
                </div>
                {paged.length === 0 && (
                  <div
                    className="text-center py-20 bg-card rounded-2xl border"
                    data-ocid="yatras.empty_state"
                  >
                    <div className="text-5xl mb-4">🔍</div>
                    <h3 className="font-bold text-xl mb-2">
                      No yatras match your filters
                    </h3>
                    <Button
                      onClick={clearFilters}
                      data-ocid="yatras.clear_filters_button"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" /> Clear Filters
                    </Button>
                  </div>
                )}
                {hasMore && (
                  <div className="flex justify-center mt-10">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setPage((p) => p + 1)}
                      className="px-10 border-secondary text-secondary hover:bg-secondary/5"
                      data-ocid="yatras.load_more_button"
                    >
                      <TrendingUp className="w-4 h-4 mr-2" /> Load More Yatras (
                      {filtered.length - paged.length} remaining)
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Spiritual Info Block */}
      <section className="bg-gradient-to-br from-secondary/10 via-background to-primary/5 border-t py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🏔️</div>
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Sacred Pilgrimage Routes of the Himalayas
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
            The Himalayas are not merely mountains — they are the abode of the
            gods. For millennia, seekers have walked these ancient paths to seek
            divine blessings at altitudes where earth meets heaven. Our expertly
            guided yatras combine deep spiritual authenticity with modern safety
            and comfort.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                icon: "🔱",
                title: "Char Dham Circuit",
                desc: "The four sacred dhams of Uttarakhand — Yamunotri, Gangotri, Kedarnath, Badrinath — form the most revered pilgrimage circuit in Hinduism.",
              },
              {
                icon: "☬",
                title: "Sikh Sacred Peaks",
                desc: "Hemkund Sahib at 4,329m is among the world's highest Gurdwaras, where Guru Gobind Singh is believed to have meditated in a previous life.",
              },
              {
                icon: "🌸",
                title: "Himalayan Mythology",
                desc: "Every peak, river, and valley carries stories from the Ramayana, Mahabharata, and Puranas. Each yatra is a walk through living scripture.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-card rounded-2xl border p-5">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
