import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDistrictsByState, stateInfo } from "@/data/destinations";
import type { TrekState } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  Map as MapIcon,
  MapPin,
  Mountain,
} from "lucide-react";

export default function StateDestinationsPage() {
  const { state } = useParams({ from: "/destinations/$state" });
  const stateId = state as TrekState;
  const currentState = stateInfo.find((s) => s.id === stateId);
  const districts = getDistrictsByState(stateId);

  if (!currentState) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        State not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative h-[420px] overflow-hidden">
        <img
          src={currentState.heroImage}
          alt={currentState.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end max-w-6xl mx-auto px-4 pb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-white/70 text-sm mb-4">
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
            <span className="text-white font-medium">{currentState.name}</span>
          </nav>
          <div className="flex gap-3 mb-4">
            <span className="badge-pill text-xs bg-white/20 text-white border border-white/30 backdrop-blur-sm">
              <Mountain size={12} />
              {currentState.trekCount} Treks
            </span>
            <span className="badge-pill text-xs bg-white/20 text-white border border-white/30 backdrop-blur-sm">
              <MapPin size={12} />
              {currentState.yatraCount} Yatras
            </span>
            <span className="badge-pill text-xs bg-white/20 text-white border border-white/30 backdrop-blur-sm">
              <MapIcon size={12} />
              {districts.length} Districts
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white">
            Explore {currentState.name}
          </h1>
        </div>
      </section>

      {/* State Description */}
      <section className="bg-card border-b py-8">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
            {currentState.description}
          </p>
        </div>
      </section>

      {/* Districts Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="font-display text-3xl font-bold text-foreground mb-2">
          Explore by District
        </h2>
        <p className="text-muted-foreground mb-10">
          {districts.length} districts, each with its own landscape, culture,
          and adventure.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {districts.map((district) => (
            <DistrictCard
              key={district.id}
              district={district}
              stateId={stateId}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function DistrictCard({
  district,
  stateId,
}: {
  district: ReturnType<typeof getDistrictsByState>[0];
  stateId: TrekState;
}) {
  const hasContent = district.trekCount > 0 || district.yatraCount > 0;

  return (
    <div
      className="group relative bg-card rounded-2xl overflow-hidden shadow-sm border border-border card-hover"
      data-ocid={`destinations.district.${district.id}.card`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={district.heroImage}
          alt={district.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center text-white">
            {district.trekCount > 0 && (
              <p className="text-3xl font-bold font-display">
                {district.trekCount}
              </p>
            )}
            {district.trekCount > 0 && (
              <p className="text-sm">Treks Available</p>
            )}
            {district.trekCount === 0 && district.yatraCount === 0 && (
              <p className="text-sm font-medium">Explore District</p>
            )}
          </div>
        </div>
        {/* Count badges on image */}
        <div className="absolute top-3 right-3 flex gap-2">
          {district.trekCount > 0 && (
            <span className="text-xs font-bold bg-primary text-primary-foreground px-2 py-1 rounded-full">
              {district.trekCount} Treks
            </span>
          )}
          {district.yatraCount > 0 && (
            <span className="text-xs font-bold bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
              {district.yatraCount} Yatras
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-display text-xl font-bold text-foreground mb-2">
          {district.name}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
          {district.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {district.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {hasContent ? (
          <Link
            to="/destinations/$state/$district"
            params={{ state: stateId, district: district.id }}
            data-ocid={`destinations.district.${district.id}.explore_button`}
          >
            <Button
              variant="default"
              size="sm"
              className="w-full gap-2 group/btn"
            >
              Explore District
              <ArrowRight
                size={14}
                className="transition-transform group-hover/btn:translate-x-1"
              />
            </Button>
          </Link>
        ) : (
          <Button variant="outline" size="sm" className="w-full" disabled>
            Coming Soon
          </Button>
        )}
      </div>
    </div>
  );
}
