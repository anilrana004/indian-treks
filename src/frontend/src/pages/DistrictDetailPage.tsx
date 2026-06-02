import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { getDistrictById, stateInfo } from "@/data/destinations";
import { treks } from "@/data/treks";
import { yatras } from "@/data/yatras";
import type { Difficulty, Trek, TrekState, Yatra } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  Clock,
  Filter,
  IndianRupee,
  MapPin,
  Mountain,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import { useMemo, useState } from "react";

type ContentType = "all" | "trek" | "yatra";
type SortOption = "popularity" | "price-asc" | "price-desc" | "difficulty";

const DIFFICULTY_ORDER: Difficulty[] = [
  "Easy",
  "Easy-Moderate",
  "Moderate",
  "Moderate-Difficult",
  "Challenging",
  "Difficult",
  "Very Difficult",
];

const SEASONS = [
  "All Seasons",
  "Summer",
  "Winter",
  "Monsoon",
  "Autumn",
  "Spring",
];
const DURATIONS = [
  "Any Duration",
  "1-3 days",
  "4-6 days",
  "7-10 days",
  "10+ days",
];

function durationDays(d: string): number {
  const match = d.match(/(\d+)/);
  return match ? Number.parseInt(match[1], 10) : 0;
}

function matchesDuration(durationStr: string, filter: string): boolean {
  if (filter === "Any Duration") return true;
  const days = durationDays(durationStr);
  if (filter === "1-3 days") return days >= 1 && days <= 3;
  if (filter === "4-6 days") return days >= 4 && days <= 6;
  if (filter === "7-10 days") return days >= 7 && days <= 10;
  if (filter === "10+ days") return days > 10;
  return true;
}

export default function DistrictDetailPage() {
  const { state, district } = useParams({
    from: "/destinations/$state/$district",
  });
  const stateId = state as TrekState;
  const districtData = getDistrictById(stateId, district);
  const currentState = stateInfo.find((s) => s.id === stateId);

  const [contentType, setContentType] = useState<ContentType>("all");
  const [difficulty, setDifficulty] = useState<string>("All");
  const [duration, setDuration] = useState<string>("Any Duration");
  const [season, setSeason] = useState<string>("All Seasons");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
  const [sortBy, setSortBy] = useState<SortOption>("popularity");

  const districtTreks = useMemo(
    () =>
      treks.filter(
        (t) =>
          t.state === stateId &&
          t.district.toLowerCase() === districtData?.name.toLowerCase(),
      ),
    [stateId, districtData],
  );

  const districtYatras = useMemo(
    () =>
      yatras.filter(
        (y) =>
          y.state === stateId &&
          y.district.toLowerCase() === districtData?.name.toLowerCase(),
      ),
    [stateId, districtData],
  );

  const filteredTreks = useMemo(() => {
    if (contentType === "yatra") return [];
    return districtTreks
      .filter((t) => {
        if (difficulty !== "All" && t.difficulty !== difficulty) return false;
        if (!matchesDuration(t.duration, duration)) return false;
        if (season !== "All Seasons" && !t.bestSeason.includes(season))
          return false;
        if (t.price < priceRange[0] || t.price > priceRange[1]) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "difficulty")
          return (
            DIFFICULTY_ORDER.indexOf(a.difficulty) -
            DIFFICULTY_ORDER.indexOf(b.difficulty)
          );
        return b.rating - a.rating;
      });
  }, [
    districtTreks,
    contentType,
    difficulty,
    duration,
    season,
    priceRange,
    sortBy,
  ]);

  const filteredYatras = useMemo(() => {
    if (contentType === "trek") return [];
    return districtYatras
      .filter((y) => {
        if (difficulty !== "All" && y.difficulty !== difficulty) return false;
        if (!matchesDuration(y.duration, duration)) return false;
        if (season !== "All Seasons" && !y.bestSeason.includes(season))
          return false;
        if (y.price < priceRange[0] || y.price > priceRange[1]) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "difficulty")
          return (
            DIFFICULTY_ORDER.indexOf(a.difficulty) -
            DIFFICULTY_ORDER.indexOf(b.difficulty)
          );
        return b.rating - a.rating;
      });
  }, [
    districtYatras,
    contentType,
    difficulty,
    duration,
    season,
    priceRange,
    sortBy,
  ]);

  if (!districtData || !currentState) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        District not found.
      </div>
    );
  }

  const totalShowing = filteredTreks.length + filteredYatras.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[380px] overflow-hidden">
        <img
          src={districtData.heroImage}
          alt={districtData.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end max-w-6xl mx-auto px-4 pb-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-white/70 text-sm mb-4 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link
              to="/destinations"
              className="hover:text-white transition-colors"
            >
              Destinations
            </Link>
            <ChevronRight size={14} />
            <Link
              to="/destinations/$state"
              params={{ state: stateId }}
              className="hover:text-white transition-colors"
            >
              {currentState.name}
            </Link>
            <ChevronRight size={14} />
            <span className="text-white font-medium">{districtData.name}</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
            {districtData.name}
          </h1>
          <div className="flex gap-3 flex-wrap">
            {districtData.trekCount > 0 && (
              <span className="badge-pill text-xs bg-white/20 text-white border border-white/30 backdrop-blur-sm">
                <Mountain size={12} />
                {districtData.trekCount} Treks
              </span>
            )}
            {districtData.yatraCount > 0 && (
              <span className="badge-pill text-xs bg-white/20 text-white border border-white/30 backdrop-blur-sm">
                <MapPin size={12} />
                {districtData.yatraCount} Yatras
              </span>
            )}
          </div>
        </div>
      </section>

      {/* District Introduction */}
      <section className="bg-card border-b py-8">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-muted-foreground text-lg leading-relaxed max-w-4xl">
            {districtData.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {districtData.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-0 z-20 bg-card/95 backdrop-blur border-b shadow-sm py-3">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground mr-1">
              <Filter size={15} />
              <span>Filter:</span>
            </div>

            {/* Content Type Toggle */}
            <div
              className="flex rounded-lg border border-border overflow-hidden"
              data-ocid="district.filter.type_toggle"
            >
              {(["all", "trek", "yatra"] as ContentType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setContentType(t)}
                  className={`px-4 py-2 text-sm font-medium transition-colors capitalize ${
                    contentType === t
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {t === "all" ? "All" : t === "trek" ? "Treks" : "Yatras"}
                </button>
              ))}
            </div>

            {/* Difficulty */}
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger
                className="w-36 h-9 text-sm"
                data-ocid="district.filter.difficulty_select"
              >
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Difficulties</SelectItem>
                {DIFFICULTY_ORDER.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Duration */}
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger
                className="w-36 h-9 text-sm"
                data-ocid="district.filter.duration_select"
              >
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                {DURATIONS.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Season */}
            <Select value={season} onValueChange={setSeason}>
              <SelectTrigger
                className="w-36 h-9 text-sm"
                data-ocid="district.filter.season_select"
              >
                <SelectValue placeholder="Season" />
              </SelectTrigger>
              <SelectContent>
                {SEASONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <div className="ml-auto flex items-center gap-2">
              <SlidersHorizontal size={15} className="text-muted-foreground" />
              <Select
                value={sortBy}
                onValueChange={(v) => setSortBy(v as SortOption)}
              >
                <SelectTrigger
                  className="w-40 h-9 text-sm"
                  data-ocid="district.filter.sort_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="price-asc">Price: Low → High</SelectItem>
                  <SelectItem value="price-desc">Price: High → Low</SelectItem>
                  <SelectItem value="difficulty">Difficulty</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price Range */}
          <div className="flex items-center gap-4 mt-3">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Price Range:
            </span>
            <div className="flex-1 max-w-xs">
              <Slider
                value={priceRange}
                onValueChange={(v) => setPriceRange(v as [number, number])}
                min={0}
                max={30000}
                step={500}
                data-ocid="district.filter.price_range"
              />
            </div>
            <span className="text-sm font-medium text-foreground whitespace-nowrap">
              ₹{priceRange[0].toLocaleString()} – ₹
              {priceRange[1].toLocaleString()}
            </span>
          </div>
        </div>
      </section>

      {/* Results Header */}
      <section className="max-w-6xl mx-auto px-4 pt-8 pb-4">
        <p className="text-muted-foreground text-sm">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {filteredTreks.length} treks
          </span>
          {", "}
          <span className="font-semibold text-foreground">
            {filteredYatras.length} yatras
          </span>{" "}
          in{" "}
          <span className="font-semibold text-foreground">
            {districtData.name}
          </span>
          {totalShowing === 0 && (
            <span className="ml-1 text-muted-foreground">
              {" "}
              — try adjusting your filters
            </span>
          )}
        </p>
      </section>

      {/* Content Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        {totalShowing === 0 ? (
          <EmptyState
            districtName={districtData.name}
            onReset={() => {
              setContentType("all");
              setDifficulty("All");
              setDuration("Any Duration");
              setSeason("All Seasons");
              setPriceRange([0, 30000]);
            }}
          />
        ) : (
          <div className="space-y-10">
            {filteredTreks.length > 0 && (
              <div>
                {contentType === "all" && (
                  <h2 className="font-display text-xl font-bold text-foreground mb-5">
                    Treks
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      ({filteredTreks.length})
                    </span>
                  </h2>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTreks.map((trek, i) => (
                    <TrekMiniCard key={trek.id} trek={trek} index={i + 1} />
                  ))}
                </div>
              </div>
            )}
            {filteredYatras.length > 0 && (
              <div>
                {contentType === "all" && (
                  <h2 className="font-display text-xl font-bold text-foreground mb-5">
                    Yatras
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      ({filteredYatras.length})
                    </span>
                  </h2>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredYatras.map((yatra, i) => (
                    <YatraMiniCard key={yatra.id} yatra={yatra} index={i + 1} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

function TrekMiniCard({ trek, index }: { trek: Trek; index: number }) {
  return (
    <a
      href={`/treks/${trek.slug}`}
      className="group block bg-card rounded-2xl overflow-hidden shadow-sm border border-border card-hover"
      data-ocid={`district.trek.item.${index}`}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={trek.heroImage}
          alt={trek.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs font-bold px-2 py-1 rounded-full ${difficultyColor(trek.difficulty)}`}
          >
            {trek.difficulty}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="text-xs font-bold bg-background/90 text-foreground px-2 py-1 rounded-full">
            ₹{trek.price.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-base text-foreground mb-1 line-clamp-1">
          {trek.name}
        </h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Mountain size={11} />
            {trek.altitude.toLocaleString()}m
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {trek.duration}
          </span>
          <span className="flex items-center gap-1">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            {trek.rating}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground flex items-center gap-0.5">
            <IndianRupee size={13} />
            {trek.price.toLocaleString()}
            <span className="text-xs text-muted-foreground font-normal ml-1">
              / person
            </span>
          </span>
          <Button
            variant="default"
            size="sm"
            className="h-7 text-xs gap-1 group/btn"
            data-ocid={`district.trek.view_button.${index}`}
          >
            View
            <ArrowRight
              size={12}
              className="transition-transform group-hover/btn:translate-x-0.5"
            />
          </Button>
        </div>
      </div>
    </a>
  );
}

function YatraMiniCard({ yatra, index }: { yatra: Yatra; index: number }) {
  return (
    <a
      href={`/yatras/${yatra.slug}`}
      className="group block bg-card rounded-2xl overflow-hidden shadow-sm border border-border card-hover"
      data-ocid={`district.yatra.item.${index}`}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={yatra.heroImage}
          alt={yatra.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-secondary/90 text-secondary-foreground">
            Yatra
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="text-xs font-bold bg-background/90 text-foreground px-2 py-1 rounded-full">
            ₹{yatra.price.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-base text-foreground mb-1 line-clamp-1">
          {yatra.name}
        </h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Mountain size={11} />
            {yatra.altitude.toLocaleString()}m
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {yatra.duration}
          </span>
          <span className="flex items-center gap-1">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            {yatra.rating}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground flex items-center gap-0.5">
            <IndianRupee size={13} />
            {yatra.price.toLocaleString()}
            <span className="text-xs text-muted-foreground font-normal ml-1">
              / person
            </span>
          </span>
          <Button
            variant="default"
            size="sm"
            className="h-7 text-xs gap-1 group/btn"
            data-ocid={`district.yatra.view_button.${index}`}
          >
            View
            <ArrowRight
              size={12}
              className="transition-transform group-hover/btn:translate-x-0.5"
            />
          </Button>
        </div>
      </div>
    </a>
  );
}

function EmptyState({
  districtName,
  onReset,
}: {
  districtName: string;
  onReset: () => void;
}) {
  return (
    <div
      className="text-center py-20 bg-muted/30 rounded-2xl border border-border"
      data-ocid="district.empty_state"
    >
      <Mountain className="mx-auto text-muted-foreground mb-4" size={48} />
      <h3 className="font-display text-xl font-bold text-foreground mb-2">
        No results in {districtName}
      </h3>
      <p className="text-muted-foreground mb-6">
        Try adjusting your filters to see more options.
      </p>
      <Button variant="outline" onClick={onReset}>
        Clear All Filters
      </Button>
    </div>
  );
}

function difficultyColor(d: Difficulty): string {
  const map: Record<Difficulty, string> = {
    Easy: "bg-green-500/90 text-white",
    "Easy-Moderate": "bg-lime-500/90 text-white",
    Moderate: "bg-yellow-500/90 text-white",
    "Moderate-Difficult": "bg-orange-500/90 text-white",
    Challenging: "bg-orange-600/90 text-white",
    Difficult: "bg-red-500/90 text-white",
    "Very Difficult": "bg-red-700/90 text-white",
    Extreme: "bg-purple-700/90 text-white",
  };
  return map[d] ?? "bg-muted text-muted-foreground";
}
