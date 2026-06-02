import { Clock, MapPin, Mountain, Star } from "lucide-react";
import type { Trek } from "../types";

interface TrekCardProps {
  trek: Trek;
}

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-100 text-green-800",
  "Easy-Moderate": "bg-lime-100 text-lime-800",
  Moderate: "bg-yellow-100 text-yellow-800",
  "Moderate-Difficult": "bg-orange-100 text-orange-800",
  Challenging: "bg-orange-100 text-orange-700",
  Difficult: "bg-red-100 text-red-800",
  "Very Difficult": "bg-red-200 text-red-900",
};

export default function TrekCard({ trek }: TrekCardProps) {
  return (
    <a
      href={`/treks/${trek.slug}`}
      className="flex-shrink-0 w-64 bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-smooth group"
      data-ocid="trek.card"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={trek.heroImage}
          alt={trek.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
            ₹{trek.price.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="absolute bottom-2 left-2">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColors[trek.difficulty] ?? "bg-muted text-muted-foreground"}`}
          >
            {trek.difficulty}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-foreground text-sm mb-2 line-clamp-1">
          {trek.name}
        </h3>
        <div className="grid grid-cols-2 gap-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Mountain className="w-3 h-3" />
            <span>{trek.altitude}m</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{trek.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{trek.district}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{trek.rating}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
