import { useEffect, useRef } from "react";

interface DestinationCard {
  id: string;
  image: string;
  badge: string;
  name: string;
  tagline: string;
  href: string;
}

const row1Cards: DestinationCard[] = [
  {
    id: "uttarakhand",
    image:
      "https://images.unsplash.com/photo-1506905489316-0781d394b780?auto=format&fit=crop&w=800&q=80",
    badge: "NORTH INDIA",
    name: "Uttarakhand",
    tagline: "Devbhoomi — Land of Gods",
    href: "/destinations/uttarakhand",
  },
  {
    id: "himachal",
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=80",
    badge: "NORTH INDIA",
    name: "Himachal Pradesh",
    tagline: "Apple Country Meets High Himalaya",
    href: "/destinations/himachal",
  },
  {
    id: "char-dham",
    image:
      "https://images.unsplash.com/photo-1548013441-c56abe9b8bd1?auto=format&fit=crop&w=800&q=80",
    badge: "UTTARAKHAND",
    name: "Char Dham Yatra",
    tagline: "The Sacred Four — A Lifetime Journey",
    href: "/yatras/char-dham-yatra",
  },
];

const row2Cards: DestinationCard[] = [
  {
    id: "spiti",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80",
    badge: "HIMACHAL PRADESH",
    name: "Spiti Valley",
    tagline: "The Middle Land — High Desert Moonscape",
    href: "/treks/spiti",
  },
  {
    id: "chopta",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    badge: "UTTARAKHAND",
    name: "Chopta-Tungnath",
    tagline: "Mini Switzerland & World's Highest Shiva Temple",
    href: "/treks/tungnath-chandrashila-trek",
  },
  {
    id: "kasol",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=80",
    badge: "HIMACHAL PRADESH",
    name: "Kasol-Kheerganga",
    tagline: "Parvati Valley's Backpacker Paradise",
    href: "/treks/kheerganga-trek",
  },
  {
    id: "har-ki-dun",
    image:
      "https://images.unsplash.com/photo-1500534803095-88a7e91571dc?auto=format&fit=crop&w=600&q=80",
    badge: "UTTARAKHAND",
    name: "Har Ki Dun",
    tagline: "Valley of the Gods — Ancient Himalayan Cradle",
    href: "/treks/har-ki-dun-trek",
  },
];

const CARD_OVERLAY =
  "linear-gradient(to top, rgba(10,14,26,0.85) 0%, rgba(10,14,26,0.4) 50%, rgba(10,14,26,0.1) 100%)";

interface DestCardProps extends DestinationCard {
  aspectClass: string;
  nameSize: string;
  revealDelay: string;
}

function DestCard({
  id,
  image,
  badge,
  name,
  tagline,
  href,
  aspectClass,
  nameSize,
  revealDelay,
}: DestCardProps) {
  return (
    <a
      href={href}
      data-ocid={`destinations.${id}.card`}
      className="reveal group block rounded-[16px] overflow-hidden relative cursor-pointer"
      style={{ animationDelay: revealDelay }}
    >
      {/* Image wrapper */}
      <div className={`relative ${aspectClass} overflow-hidden`}>
        {/* BG image with scale on hover */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[600ms] ease-out group-hover:scale-105"
          style={{ backgroundImage: `url('${image}')` }}
        />
        {/* Gradient overlay — lightens on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-80"
          style={{ background: CARD_OVERLAY }}
        />

        {/* Region badge — top-left */}
        <span
          className="absolute top-4 left-4 font-mono text-[11px] tracking-[0.15em] uppercase z-10"
          style={{ color: "var(--color-glacier)" }}
        >
          {badge}
        </span>

        {/* Arrow icon — bottom-right, slides in on hover */}
        <span
          className="absolute bottom-5 right-5 w-8 h-8 flex items-center justify-center text-white text-2xl z-10
                     opacity-0 translate-y-[10px] transition-all duration-500 ease-out
                     group-hover:opacity-100 group-hover:translate-y-0"
          aria-hidden="true"
        >
          →
        </span>

        {/* Card text — bottom-left */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <h3
            className={`font-display font-bold text-white leading-tight ${nameSize}`}
          >
            {name}
          </h3>
          <p
            className="font-ui text-sm italic mt-1"
            style={{ color: "var(--color-ash)" }}
          >
            {tagline}
          </p>
        </div>
      </div>
    </a>
  );
}

export default function DestinationCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        }
      },
      { threshold: 0.12 },
    );

    // Observe section for overall reveal
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Observe heading
    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    // Observe each card
    const cards = sectionRef.current?.querySelectorAll(".reveal") ?? [];
    for (const card of cards) {
      observer.observe(card);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: "var(--color-snow)" }}
      aria-labelledby="destinations-heading"
    >
      <div className="container-max">
        {/* Section header */}
        <div ref={headingRef} className="reveal text-center mb-14">
          <p
            className="font-mono text-[12px] uppercase tracking-[0.2em] mb-3"
            style={{ color: "var(--color-glacier)" }}
          >
            EXPLORE INDIA'S HIMALAYAS
          </p>
          <h2
            id="destinations-heading"
            className="font-display font-bold leading-tight mb-4"
            style={{
              color: "var(--color-midnight)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
            }}
          >
            Explore by Destination
          </h2>
          <p
            className="font-body max-w-xl mx-auto"
            style={{
              color: "var(--color-ash)",
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
              filter: "brightness(0.7)",
            }}
          >
            From the divine char dhams to the remotest Himalayan valleys
          </p>
        </div>

        {/* Row 1 — 3 large portrait cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {row1Cards.map((card, i) => (
            <DestCard
              key={card.id}
              {...card}
              aspectClass="aspect-[2/3]"
              nameSize="text-3xl"
              revealDelay={`${(i + 1) * 0.1}s`}
            />
          ))}
        </div>

        {/* Row 2 — 4 smaller landscape cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {row2Cards.map((card, i) => (
            <DestCard
              key={card.id}
              {...card}
              aspectClass="aspect-[4/3]"
              nameSize="text-xl"
              revealDelay={`${(i + 4) * 0.1}s`}
            />
          ))}
        </div>

        {/* Section footer CTA */}
        <div className="text-center">
          <a
            href="/destinations"
            data-ocid="destinations.view_all.button"
            className="btn-outline inline-flex items-center gap-2"
            style={{
              borderColor: "var(--color-summit)",
              color: "var(--color-midnight)",
            }}
          >
            View All Destinations
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
