import { Button } from "@/components/ui/button";
import { stateInfo } from "@/data/destinations";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, MapPin, Mountain } from "lucide-react";

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Hero */}
      <section className="relative bg-card border-b py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=60&fit=crop)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Compass className="text-primary" size={20} />
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Explore the Himalayas
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
            Choose Your
            <span className="text-gradient"> Destination</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Two legendary Himalayan states. Forty treks. Sixteen sacred yatras.
            Every trail a story waiting to be lived.
          </p>
        </div>
      </section>

      {/* State Selection Cards */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stateInfo.map((state) => (
            <StateCard key={state.id} state={state} />
          ))}
        </div>
      </section>

      {/* Why Explore Section */}
      <section className="bg-muted/40 border-y py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center text-foreground mb-12">
            What Awaits You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyItems.map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.Icon className="text-primary" size={24} />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function StateCard({ state }: { state: (typeof stateInfo)[0] }) {
  return (
    <Link
      to="/destinations/$state"
      params={{ state: state.id }}
      className="group block relative rounded-2xl overflow-hidden h-[420px] card-hover shadow-lg"
      data-ocid={`destinations.${state.id}.card`}
    >
      {/* Background Image */}
      <img
        src={state.heroImage}
        alt={state.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <div className="flex gap-3 mb-4">
          <span className="badge-pill text-xs bg-white/20 text-white border border-white/30 backdrop-blur-sm">
            <Mountain size={12} />
            {state.trekCount} Treks
          </span>
          <span className="badge-pill text-xs bg-white/20 text-white border border-white/30 backdrop-blur-sm">
            <MapPin size={12} />
            {state.yatraCount} Yatras
          </span>
        </div>
        <h2 className="font-display text-4xl font-bold text-white mb-2">
          {state.name}
        </h2>
        <p className="text-white/80 text-sm leading-relaxed mb-6 line-clamp-2">
          {state.description}
        </p>
        <div className="flex items-center">
          <Button
            variant="default"
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 group/btn"
            data-ocid={`destinations.${state.id}.explore_button`}
          >
            Explore {state.name}
            <ArrowRight
              size={16}
              className="transition-transform group-hover/btn:translate-x-1"
            />
          </Button>
        </div>
      </div>
    </Link>
  );
}

const whyItems = [
  {
    Icon: Mountain,
    title: "40+ Curated Treks",
    description:
      "From beginner-friendly bugyals to advanced glacier crossings — every trek verified by our in-field team.",
  },
  {
    Icon: MapPin,
    title: "24 Districts Mapped",
    description:
      "District-wise content with local insider knowledge, GPS routes, and accurate seasonal windows.",
  },
  {
    Icon: Compass,
    title: "Yatras & Treks Together",
    description:
      "Uniquely combines adventure trekking with Hindu and Sikh pilgrimage routes in one seamless platform.",
  },
];
