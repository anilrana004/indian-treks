import { yatras as importedYatras } from "@/data/yatras";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

interface YatraCardData {
  id: string;
  slug: string;
  name: string;
  region: string;
  stops: string[];
  duration: number;
  price: number;
  openingDate: string;
  closingDate: string;
  helicopterAvailable: boolean;
  religiousSignificance: string;
  heroImage: string;
}

const fallbackYatras: YatraCardData[] = [
  {
    id: "char-dham",
    slug: "char-dham-yatra",
    name: "Char Dham Yatra",
    region: "uttarakhand",
    stops: ["Yamunotri", "Gangotri", "Kedarnath", "Badrinath"],
    duration: 11,
    price: 24999,
    openingDate: "May 2, 2025",
    closingDate: "Nov 15, 2025",
    helicopterAvailable: true,
    religiousSignificance:
      "The most sacred Hindu pilgrimage circuit in the Himalayas, encompassing four divine shrines dedicated to the supreme forces of creation, preservation, and destruction.",
    heroImage:
      "https://images.unsplash.com/photo-1548013441-c56abe9b8bd1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "kedarnath",
    slug: "kedarnath-yatra",
    name: "Kedarnath Yatra",
    region: "uttarakhand",
    stops: ["Rishikesh", "Sonprayag", "Gaurikund", "Kedarnath"],
    duration: 4,
    price: 7999,
    openingDate: "May 2, 2025",
    closingDate: "Nov 10, 2025",
    helicopterAvailable: true,
    religiousSignificance:
      "One of the twelve Jyotirlinga shrines dedicated to Lord Shiva, nestled at 3,583 meters amidst the Garhwal Himalayas, accessible only on foot or by helicopter.",
    heroImage:
      "https://images.unsplash.com/photo-1579380730838-54ac39e1d8bf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "badrinath",
    slug: "badrinath-yatra",
    name: "Badrinath Yatra",
    region: "uttarakhand",
    stops: ["Rishikesh", "Devprayag", "Joshimath", "Badrinath"],
    duration: 3,
    price: 5999,
    openingDate: "May 4, 2025",
    closingDate: "Nov 18, 2025",
    helicopterAvailable: false,
    religiousSignificance:
      "The holiest Vaishnavite shrine in India, dedicated to Lord Vishnu in his form as Badri Vishal, located between the Nar and Narayan mountain ranges.",
    heroImage:
      "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gangotri",
    slug: "gangotri-yatra",
    name: "Gangotri & Gomukh Tapovan",
    region: "uttarakhand",
    stops: ["Uttarkashi", "Gangotri", "Gomukh", "Tapovan"],
    duration: 6,
    price: 11999,
    openingDate: "May 7, 2025",
    closingDate: "Nov 1, 2025",
    helicopterAvailable: false,
    religiousSignificance:
      "The sacred origin of the River Ganges, where Goddess Ganga descended from the heavens. Gangotri Temple sits at 3,048 meters and is one of the Char Dham pilgrimage sites.",
    heroImage:
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "manimahesh",
    slug: "manimahesh-yatra",
    name: "Manimahesh Yatra",
    region: "himachal",
    stops: ["Bharmour", "Hadsar", "Dhancho", "Manimahesh Lake"],
    duration: 5,
    price: 12999,
    openingDate: "Aug 10, 2025",
    closingDate: "Sep 10, 2025",
    helicopterAvailable: true,
    religiousSignificance:
      "The most important Shiva pilgrimage in Himachal Pradesh, centered on the sacred Manimahesh Lake at 4,080 meters, below the unclimbed Manimahesh Kailash peak.",
    heroImage:
      "https://images.unsplash.com/photo-1506905489316-0781d394b780?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "hemkund",
    slug: "hemkund-sahib-yatra",
    name: "Hemkund Sahib Yatra",
    region: "uttarakhand",
    stops: ["Govindghat", "Ghangaria", "Hemkund Sahib"],
    duration: 5,
    price: 10499,
    openingDate: "Jun 1, 2025",
    closingDate: "Oct 10, 2025",
    helicopterAvailable: true,
    religiousSignificance:
      "The highest Gurudwara in the world at 4,329 meters, where Guru Gobind Singh Ji meditated in a past life. It stands beside a pristine glacial lake in the Valley of Flowers region.",
    heroImage:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "yamunotri",
    slug: "yamunotri-yatra",
    name: "Yamunotri Yatra",
    region: "uttarakhand",
    stops: ["Hanuman Chatti", "Janki Chatti", "Yamunotri"],
    duration: 3,
    price: 5499,
    openingDate: "May 2, 2025",
    closingDate: "Nov 12, 2025",
    helicopterAvailable: false,
    religiousSignificance:
      "The source of the sacred Yamuna River, Yamunotri Dham sits at 3,293 meters. Pilgrims cook rice in the hot springs here and offer it to the goddess.",
    heroImage:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "adi-kailash",
    slug: "adi-kailash-yatra",
    name: "Adi Kailash & Om Parvat",
    region: "uttarakhand",
    stops: ["Dharchula", "Gunji", "Jolingkong", "Om Parvat"],
    duration: 9,
    price: 21999,
    openingDate: "Jun 1, 2025",
    closingDate: "Oct 15, 2025",
    helicopterAvailable: false,
    religiousSignificance:
      "The mystical twin to Mount Kailash in Tibet, Adi Kailash is believed to be Lord Shiva's abode in India. Om Parvat bears a natural snow formation of the sacred OM symbol.",
    heroImage:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "do-dham",
    slug: "do-dham-yatra",
    name: "Do Dham Yatra",
    region: "uttarakhand",
    stops: ["Rishikesh", "Kedarnath", "Badrinath"],
    duration: 7,
    price: 14999,
    openingDate: "May 2, 2025",
    closingDate: "Nov 15, 2025",
    helicopterAvailable: true,
    religiousSignificance:
      "The twin-dham pilgrimage combining Kedarnath and Badrinath — the abodes of Shiva and Vishnu respectively — in one spiritually complete Himalayan journey.",
    heroImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "nanda-devi-raj-jat",
    slug: "nanda-devi-raj-jat",
    name: "Nanda Devi Raj Jat Yatra",
    region: "uttarakhand",
    stops: ["Nauti", "Nandprayag", "Wan", "Bedni Bugyal", "Roopkund"],
    duration: 12,
    price: 18999,
    openingDate: "Aug 15, 2025",
    closingDate: "Sep 5, 2025",
    helicopterAvailable: false,
    religiousSignificance:
      "The world's largest ritual procession held every 12 years, where Goddess Nanda Devi — the patron deity of Uttarakhand — is escorted to her mythological home in the Himalayas.",
    heroImage:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "tungnath",
    slug: "tungnath-yatra",
    name: "Tungnath Yatra",
    region: "uttarakhand",
    stops: ["Chopta", "Tungnath", "Chandrashila"],
    duration: 2,
    price: 3999,
    openingDate: "May 1, 2025",
    closingDate: "Nov 14, 2025",
    helicopterAvailable: false,
    religiousSignificance:
      "The highest Shiva temple in the world at 3,680 meters, Tungnath is part of the Panch Kedar pilgrimage. The trek through dense rhododendron forests and alpine meadows is breathtaking.",
    heroImage:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "panch-kedar",
    slug: "panch-kedar-yatra",
    name: "Panch Kedar Yatra",
    region: "uttarakhand",
    stops: [
      "Kedarnath",
      "Tungnath",
      "Rudranath",
      "Madhyamaheshwar",
      "Kalpeshwar",
    ],
    duration: 15,
    price: 32999,
    openingDate: "May 1, 2025",
    closingDate: "Nov 10, 2025",
    helicopterAvailable: false,
    religiousSignificance:
      "The five sacred Shiva temples of Garhwal, each enshrining a different body part of Lord Shiva. The complete circuit is among the most spiritually intense Himalayan journeys.",
    heroImage:
      "https://images.unsplash.com/photo-1512036666432-2181c1f26420?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "panch-badri",
    slug: "panch-badri-yatra",
    name: "Panch Badri Yatra",
    region: "uttarakhand",
    stops: [
      "Badrinath",
      "Yogadhyan Badri",
      "Bhavishya Badri",
      "Vriddha Badri",
      "Adi Badri",
    ],
    duration: 10,
    price: 22499,
    openingDate: "May 4, 2025",
    closingDate: "Nov 18, 2025",
    helicopterAvailable: false,
    religiousSignificance:
      "The five sacred Vishnu shrines of Chamoli district form the Panch Badri circuit — representing the divine presence of Lord Vishnu across different yugas and forms.",
    heroImage:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "shrikhand",
    slug: "shrikhand-mahadev-yatra",
    name: "Shrikhand Mahadev Yatra",
    region: "himachal",
    stops: ["Rampur", "Jaon", "Singhad", "Shrikhand Mahadev"],
    duration: 5,
    price: 13999,
    openingDate: "Jul 10, 2025",
    closingDate: "Aug 25, 2025",
    helicopterAvailable: false,
    religiousSignificance:
      "One of the most arduous Shiva pilgrimages in India — a 72-foot natural Shiva Linga at 5,155 meters. Pilgrims climb through glaciers and snowfields on a path tested only by the most devoted.",
    heroImage:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "kinner-kailash",
    slug: "kinner-kailash-yatra",
    name: "Kinner Kailash Yatra",
    region: "himachal",
    stops: ["Kalpa", "Powari", "Kinner Kailash Base"],
    duration: 5,
    price: 14999,
    openingDate: "Jul 1, 2025",
    closingDate: "Sep 15, 2025",
    helicopterAvailable: false,
    religiousSignificance:
      "A sacred 79-foot Shiva Linga that changes colour from golden at dawn to white at noon and dark at dusk. Set against the dramatic Kinner Kailash range, this parikrama is among the most visually stunning pilgrimages in India.",
    heroImage:
      "https://images.unsplash.com/photo-1506905489316-0781d394b780?auto=format&fit=crop&w=800&q=80",
  },
];

type ImportableYatra = {
  id: string;
  slug: string;
  name: string;
  region?: string;
  stops?: string[];
  duration: string;
  price: number;
  openingDate?: string;
  closingDate?: string;
  helicopterAvailable?: boolean;
  religiousSignificance: string;
  heroImage: string;
};

function mapImportedToCardData(y: ImportableYatra): YatraCardData {
  return {
    id: y.id,
    slug: y.slug,
    name: y.name,
    region: y.region ?? "uttarakhand",
    stops: y.stops ?? [],
    duration: Number.parseInt(y.duration) || 5,
    price: y.price,
    openingDate: y.openingDate ?? "May 2025",
    closingDate: y.closingDate ?? "Nov 2025",
    helicopterAvailable: y.helicopterAvailable ?? false,
    religiousSignificance: y.religiousSignificance,
    heroImage: y.heroImage,
  };
}

const importedCards =
  importedYatras.length > 0
    ? importedYatras.map((y) => mapImportedToCardData(y as ImportableYatra))
    : [];

const yatraData: YatraCardData[] =
  importedCards.length > 0 ? importedCards : fallbackYatras;

const CHAR_DHAM_STOPS = [
  {
    name: "Yamunotri",
    img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=400&q=70",
  },
  {
    name: "Gangotri",
    img: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=400&q=70",
  },
  {
    name: "Kedarnath",
    img: "https://images.unsplash.com/photo-1579380730838-54ac39e1d8bf?auto=format&fit=crop&w=400&q=70",
  },
  {
    name: "Badrinath",
    img: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?auto=format&fit=crop&w=400&q=70",
  },
];

function YatraCard({ yatra, index }: { yatra: YatraCardData; index: number }) {
  const regionLabel =
    yatra.region === "himachal" ? "Himachal Pradesh" : "Uttarakhand";

  return (
    <div
      className="card-trek flex flex-col reveal bg-white border border-amber-200 rounded-2xl overflow-hidden hover:shadow-elevated transition-shadow duration-300"
      style={{
        animationDelay: `${index * 0.08}s`,
        borderLeft: "4px solid #F59E0B",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <img
          src={yatra.heroImage}
          alt={yatra.name}
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform =
              "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
          }}
        />
        {/* Bottom gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)",
          }}
        />
        {/* Region badge top-left */}
        <span className="absolute top-3 left-3 font-mono text-[11px] uppercase tracking-wider px-2 py-1 rounded bg-green-700 text-white">
          {regionLabel}
        </span>
        {/* Helicopter badge top-right */}
        {yatra.helicopterAvailable && (
          <span className="absolute top-3 right-3 font-mono text-[11px] px-2 py-1 rounded-full font-bold bg-amber-100 text-amber-700 border border-amber-300">
            Helicopter Avbl.
          </span>
        )}
        {/* Open / Close badge bottom */}
        <span className="absolute bottom-3 left-3 font-mono text-[11px] px-2 py-1 rounded-full bg-green-100 text-green-700">
          Opens: {yatra.openingDate} &middot; Closes: {yatra.closingDate}
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-3 p-5 flex-1 bg-white">
        <h3 className="font-ui font-bold text-[18px] text-gray-900 leading-snug">
          {yatra.name}
        </h3>

        {yatra.stops.length > 0 && (
          <p className="font-mono text-[11px] flex flex-wrap gap-1 items-center text-gray-600">
            {yatra.stops.map((stop, i) => (
              <span key={stop} className="flex items-center gap-1">
                {stop}
                {i < yatra.stops.length - 1 && (
                  <span aria-hidden="true">&middot;</span>
                )}
              </span>
            ))}
          </p>
        )}

        <p className="font-ui text-[14px] text-gray-600">
          {yatra.duration} Days &middot;{" "}
          <span className="font-bold text-green-700">
            From &#8377;{yatra.price.toLocaleString("en-IN")}
          </span>
        </p>

        <p className="font-body text-[14px] italic line-clamp-2 flex-1 text-gray-500">
          {yatra.religiousSignificance}
        </p>

        <Link
          to="/yatras"
          className="w-full text-center mt-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg py-2.5 transition-colors duration-200"
          data-ocid={`yatra.item.${yatra.slug}.book_button`}
        >
          Book Yatra
        </Link>
      </div>
    </div>
  );
}

export default function YatraSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );

    const section = sectionRef.current;
    if (!section) return;
    const cards = section.querySelectorAll(".reveal");
    for (const card of cards) observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="yatras"
      className="grain relative bg-amber-50"
      style={{
        paddingTop: "var(--section-padding-desktop)",
        paddingBottom: "var(--section-padding-desktop)",
      }}
    >
      <div className="container-max relative" style={{ zIndex: 2 }}>
        {/* ─── Section Header ──────────────────────────────────────────── */}
        <div className="text-center mb-12 reveal">
          <p className="font-mono uppercase tracking-[0.2em] text-[12px] mb-4 text-amber-600">
            DIVINE JOURNEYS
          </p>
          <h2
            className="font-display font-bold text-green-900 mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.15 }}
          >
            Sacred Yatras of the Himalayas
          </h2>
          <p className="font-body text-[18px] mx-auto max-w-2xl text-gray-600">
            Walk the ancient paths walked by sages for millennia
          </p>
        </div>

        {/* ─── Char Dham Featured Banner ──────────────────────────────── */}
        <div
          className="reveal rounded-2xl overflow-hidden mb-16 relative bg-white border border-amber-200"
          data-ocid="char-dham.featured_banner"
        >
          <div
            className="relative flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center"
            style={{
              zIndex: 1,
              padding: "clamp(32px,5vw,48px) clamp(24px,5vw,64px)",
            }}
          >
            {/* Left — text */}
            <div className="flex-1 min-w-0">
              <span className="font-mono uppercase tracking-[0.15em] text-[11px] px-3 py-1 rounded-full mb-4 inline-block bg-amber-100 text-amber-700 border border-amber-300">
                FEATURED YATRA
              </span>
              <h3
                className="font-display font-bold text-green-900 mt-3 mb-3"
                style={{ fontSize: "clamp(24px,4vw,40px)", lineHeight: 1.15 }}
              >
                Char Dham Yatra 2025
              </h3>
              <p className="font-body text-[16px] mb-6 max-w-xl text-gray-600">
                The most sacred pilgrimage in Hinduism &mdash; four holy shrines
                in one divine journey
              </p>

              {/* Route icons with dashed connecting line */}
              <div className="flex flex-wrap items-center gap-0 mb-6">
                {CHAR_DHAM_STOPS.map((stop, i) => (
                  <div key={stop.name} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <span
                        className="text-xl mb-1 text-amber-500"
                        role="img"
                        aria-label="temple"
                      >
                        &#128757;
                      </span>
                      <span className="font-mono text-[11px] text-amber-600">
                        {stop.name}
                      </span>
                    </div>
                    {i < CHAR_DHAM_STOPS.length - 1 && (
                      <div
                        className="mx-2 mb-5 flex-shrink-0"
                        aria-hidden="true"
                        style={{
                          width: "32px",
                          borderBottom: "2px dashed #F59E0B",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Stats */}
              <p className="font-ui text-[15px] font-semibold mb-6 text-gray-600">
                <span className="text-gray-900">11 Days</span> &middot;{" "}
                <span className="text-gray-900">&#8377;24,999/person</span>{" "}
                &middot;{" "}
                <span className="text-amber-600">
                  Helicopter Option Available
                </span>
              </p>

              <Link
                to="/yatras"
                className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg px-6 py-3 transition-colors duration-200"
                data-ocid="char-dham.featured_banner.cta_button"
              >
                Plan Char Dham Yatra &rarr;
              </Link>
            </div>

            {/* Right — 2x2 dham grid */}
            <div className="grid grid-cols-2 gap-3 flex-shrink-0 w-full lg:w-72">
              {CHAR_DHAM_STOPS.map((dham) => (
                <div
                  key={dham.name}
                  className="relative overflow-hidden rounded-xl"
                  style={{ aspectRatio: "1/1" }}
                >
                  <img
                    src={dham.img}
                    alt={dham.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)",
                    }}
                  />
                  <span className="absolute bottom-2 left-0 right-0 text-center font-mono text-[11px] font-bold text-amber-400">
                    {dham.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Yatra Grid — sm+ ─────────────────────────────────────── */}
        <div
          className="hidden sm:grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
          data-ocid="yatra.list"
        >
          {yatraData.map((yatra, i) => (
            <YatraCard key={yatra.id} yatra={yatra} index={i} />
          ))}
        </div>

        {/* ─── Yatra Carousel — mobile ──────────────────────────────── */}
        <div className="sm:hidden swipe-container" data-ocid="yatra.carousel">
          {yatraData.map((yatra, i) => (
            <div
              key={yatra.id}
              className="swipe-item"
              style={{ width: "84vw", maxWidth: "340px" }}
            >
              <YatraCard yatra={yatra} index={i} />
            </div>
          ))}
        </div>

        {/* ─── View All CTA ─────────────────────────────────────────── */}
        <div className="text-center mt-12 reveal">
          <Link
            to="/yatras"
            className="btn-outline"
            data-ocid="yatra.view_all_button"
          >
            View All Yatras &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
