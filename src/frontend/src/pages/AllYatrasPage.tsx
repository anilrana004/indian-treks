import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Navigation from "../components/Navigation";
import NewsletterFooter from "../components/NewsletterFooter";

// ── Yatra card data type (mirrors YatraSection fallback) ─────────
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
  deity?: string;
  season?: string;
}

const YATRAS: YatraCardData[] = [
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
      "The most sacred Hindu pilgrimage circuit in the Himalayas, encompassing four divine shrines.",
    heroImage:
      "https://images.unsplash.com/photo-1548013441-c56abe9b8bd1?auto=format&fit=crop&w=800&q=80",
    deity: "multi",
    season: "summer",
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
      "One of the twelve Jyotirlinga shrines dedicated to Lord Shiva, nestled at 3,583 meters.",
    heroImage:
      "https://images.unsplash.com/photo-1579380730838-54ac39e1d8bf?auto=format&fit=crop&w=800&q=80",
    deity: "shiva",
    season: "summer",
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
      "The holiest Vaishnavite shrine in India, dedicated to Lord Vishnu as Badri Vishal.",
    heroImage:
      "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?auto=format&fit=crop&w=800&q=80",
    deity: "vishnu",
    season: "summer",
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
      "The sacred origin of the River Ganges, where Goddess Ganga descended from the heavens.",
    heroImage:
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=800&q=80",
    deity: "ganga",
    season: "summer",
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
      "The source of the sacred Yamuna River, Yamunotri Dham sits at 3,293 meters.",
    heroImage:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
    deity: "yamuna",
    season: "summer",
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
      "The most important Shiva pilgrimage in Himachal Pradesh, centered on the sacred Manimahesh Lake at 4,080m.",
    heroImage:
      "https://images.unsplash.com/photo-1506905489316-0781d394b780?auto=format&fit=crop&w=800&q=80",
    deity: "shiva",
    season: "monsoon",
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
      "The highest Gurudwara in the world at 4,329 meters, where Guru Gobind Singh Ji meditated.",
    heroImage:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    deity: "multi",
    season: "summer",
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
      "The mystical twin to Mount Kailash — Adi Kailash is Lord Shiva's abode in India.",
    heroImage:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    deity: "shiva",
    season: "summer",
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
      "Kedarnath and Badrinath — the abodes of Shiva and Vishnu in one spiritually complete journey.",
    heroImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    deity: "multi",
    season: "summer",
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
      "The world's largest ritual procession held every 12 years, escorting Goddess Nanda Devi.",
    heroImage:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
    deity: "multi",
    season: "post-monsoon",
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
      "The highest Shiva temple in the world at 3,680 meters — part of the Panch Kedar circuit.",
    heroImage:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80",
    deity: "shiva",
    season: "summer",
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
      "Five sacred Shiva temples of Garhwal — among the most spiritually intense Himalayan journeys.",
    heroImage:
      "https://images.unsplash.com/photo-1512036666432-2181c1f26420?auto=format&fit=crop&w=800&q=80",
    deity: "shiva",
    season: "summer",
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
      "Five sacred Vishnu shrines of Chamoli district — the Panch Badri circuit.",
    heroImage:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80",
    deity: "vishnu",
    season: "summer",
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
      "A 72-foot natural Shiva Linga at 5,155 meters — one of the most arduous pilgrimages in India.",
    heroImage:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    deity: "shiva",
    season: "monsoon",
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
      "A sacred 79-foot Shiva Linga that changes colour from golden at dawn to white at noon.",
    heroImage:
      "https://images.unsplash.com/photo-1506905489316-0781d394b780?auto=format&fit=crop&w=800&q=80",
    deity: "shiva",
    season: "monsoon",
  },
];

function YatraCard({ y, index }: { y: YatraCardData; index: number }) {
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
      className="reveal overflow-hidden"
      style={{
        borderRadius: "var(--radius-card)",
        transitionDelay: `${(index % 3) * 0.08}s`,
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      data-ocid={`all-yatras.item.${index + 1}`}
    >
      <div className="relative" style={{ aspectRatio: "16/9" }}>
        <img
          src={y.heroImage}
          alt={y.name}
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
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,14,26,0.85), rgba(10,14,26,0.1))",
          }}
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {y.helicopterAvailable && (
            <span
              className="font-mono text-[10px] font-bold px-2 py-1"
              style={{
                background: "var(--color-ember)",
                color: "white",
                borderRadius: "4px",
              }}
            >
              🚁 HELICOPTER
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-4 right-4">
          <p
            className="font-mono text-[10px] uppercase tracking-wider mb-1"
            style={{ color: "var(--color-summit)" }}
          >
            {y.region === "uttarakhand" ? "UTTARAKHAND" : "HIMACHAL PRADESH"}
          </p>
          <h3
            className="font-display font-bold text-lg leading-tight"
            style={{ color: "white" }}
          >
            {y.name}
          </h3>
        </div>
      </div>
      <div className="p-5" style={{ background: "var(--color-forest)" }}>
        <div className="flex flex-wrap gap-2 mb-3">
          {y.stops.map((s, si) => (
            <span key={s} className="flex items-center gap-1">
              <span
                className="font-mono text-[11px]"
                style={{ color: "var(--color-ash)" }}
              >
                {s}
              </span>
              {si < y.stops.length - 1 && (
                <span style={{ color: "var(--color-summit)" }}>•</span>
              )}
            </span>
          ))}
        </div>
        <p
          className="font-body text-xs leading-relaxed mb-4"
          style={{
            color: "rgba(212,207,200,0.75)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {y.religiousSignificance}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span
              className="font-mono text-[11px]"
              style={{ color: "var(--color-ash)" }}
            >
              {y.duration} Days
            </span>
            <span className="mx-2" style={{ color: "rgba(212,207,200,0.3)" }}>
              |
            </span>
            <span
              className="font-ui font-bold text-sm"
              style={{ color: "var(--color-summit)" }}
            >
              From ₹{y.price.toLocaleString("en-IN")}
            </span>
          </div>
          <Link
            to="/"
            className="btn-cta font-ui text-xs px-4 py-2"
            data-ocid={`all-yatras.book.${index + 1}`}
          >
            Book →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AllYatrasPage() {
  useEffect(() => {
    document.title =
      "All Sacred Yatras | Uttarakhand & Himachal Pradesh | TrekRoot";
  }, []);

  const [region, setRegion] = useState("all");
  const [deity, setDeity] = useState("all");
  const [duration, setDuration] = useState("all");
  const [season, setSeason] = useState("all");
  const [helicopter, setHelicopter] = useState(false);
  const [visible, setVisible] = useState(9);

  const filtered = YATRAS.filter((y) => {
    if (region !== "all" && y.region !== region) return false;
    if (deity !== "all" && y.deity !== deity) return false;
    if (duration !== "all") {
      if (duration === "short" && y.duration > 3) return false;
      if (duration === "medium" && (y.duration < 4 || y.duration > 6))
        return false;
      if (duration === "long" && y.duration < 7) return false;
    }
    if (season !== "all" && y.season !== season) return false;
    if (helicopter && !y.helicopterAvailable) return false;
    return true;
  });

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-midnight)" }}
      data-ocid="all-yatras.page"
    >
      <Navigation />

      {/* Header */}
      <section
        className="pt-20 pb-12 px-6"
        style={{ background: "var(--color-forest)" }}
        data-ocid="all-yatras.header"
      >
        <div className="container-max">
          <p
            className="font-mono text-xs tracking-[0.2em] uppercase mb-3"
            style={{ color: "var(--color-summit)" }}
          >
            DIVINE JOURNEYS
          </p>
          <h1
            className="font-display font-bold mb-3"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: "white" }}
          >
            Sacred Yatras of the Himalayas
          </h1>
          <p
            className="font-body text-lg mb-2"
            style={{ color: "rgba(245,242,236,0.7)" }}
          >
            Walk the ancient paths walked by sages for millennia
          </p>
          <p
            className="font-mono text-xs tracking-wider"
            style={{ color: "var(--color-summit)" }}
          >
            SHOWING {Math.min(visible, filtered.length)} OF {filtered.length}{" "}
            YATRAS
          </p>
        </div>
      </section>

      {/* Filters */}
      <section
        className="py-6 px-6 border-b"
        style={{
          background: "rgba(27,58,45,0.5)",
          borderColor: "rgba(77,168,199,0.1)",
        }}
      >
        <div className="container-max">
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label
                htmlFor="region-select"
                className="block font-mono text-xs mb-1"
                style={{ color: "var(--color-glacier)" }}
              >
                REGION
              </label>
              <select
                id="region-select"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="rounded px-3 py-2 text-sm font-ui"
                style={{
                  background: "rgba(10,14,26,0.8)",
                  border: "1px solid rgba(77,168,199,0.3)",
                  color: "var(--color-snow)",
                }}
                data-ocid="all-yatras.region_select"
              >
                <option value="all">All Regions</option>
                <option value="uttarakhand">Uttarakhand</option>
                <option value="himachal">Himachal Pradesh</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="deity-select"
                className="block font-mono text-xs mb-1"
                style={{ color: "var(--color-glacier)" }}
              >
                DEITY
              </label>
              <select
                id="deity-select"
                value={deity}
                onChange={(e) => setDeity(e.target.value)}
                className="rounded px-3 py-2 text-sm font-ui"
                style={{
                  background: "rgba(10,14,26,0.8)",
                  border: "1px solid rgba(77,168,199,0.3)",
                  color: "var(--color-snow)",
                }}
                data-ocid="all-yatras.deity_select"
              >
                <option value="all">All Deities</option>
                <option value="shiva">Lord Shiva</option>
                <option value="vishnu">Lord Vishnu</option>
                <option value="ganga">Goddess Ganga</option>
                <option value="yamuna">Goddess Yamuna</option>
                <option value="multi">Multi-deity</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="duration-select"
                className="block font-mono text-xs mb-1"
                style={{ color: "var(--color-glacier)" }}
              >
                DURATION
              </label>
              <select
                id="duration-select"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="rounded px-3 py-2 text-sm font-ui"
                style={{
                  background: "rgba(10,14,26,0.8)",
                  border: "1px solid rgba(77,168,199,0.3)",
                  color: "var(--color-snow)",
                }}
                data-ocid="all-yatras.duration_select"
              >
                <option value="all">Any Duration</option>
                <option value="short">Short (1–3 days)</option>
                <option value="medium">Medium (4–6 days)</option>
                <option value="long">Long (7+ days)</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="season-select"
                className="block font-mono text-xs mb-1"
                style={{ color: "var(--color-glacier)" }}
              >
                SEASON
              </label>
              <select
                id="season-select"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="rounded px-3 py-2 text-sm font-ui"
                style={{
                  background: "rgba(10,14,26,0.8)",
                  border: "1px solid rgba(77,168,199,0.3)",
                  color: "var(--color-snow)",
                }}
                data-ocid="all-yatras.season_select"
              >
                <option value="all">Any Season</option>
                <option value="summer">Summer</option>
                <option value="monsoon">Monsoon</option>
                <option value="post-monsoon">Post-Monsoon</option>
              </select>
            </div>
            <label
              className="flex items-center gap-2 cursor-pointer"
              data-ocid="all-yatras.helicopter_checkbox"
            >
              <input
                type="checkbox"
                checked={helicopter}
                onChange={(e) => setHelicopter(e.target.checked)}
                className="w-4 h-4"
                style={{ accentColor: "var(--color-glacier)" }}
              />
              <span
                className="font-ui text-sm"
                style={{ color: "var(--color-snow)" }}
              >
                🚁 Helicopter Available
              </span>
            </label>
            {(region !== "all" ||
              deity !== "all" ||
              duration !== "all" ||
              season !== "all" ||
              helicopter) && (
              <button
                type="button"
                onClick={() => {
                  setRegion("all");
                  setDeity("all");
                  setDuration("all");
                  setSeason("all");
                  setHelicopter(false);
                  setVisible(9);
                }}
                className="font-ui text-sm underline"
                style={{ color: "var(--color-ember)" }}
                data-ocid="all-yatras.clear_filters_button"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Grid */}
      <main id="main-content" className="container-max py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20" data-ocid="all-yatras.empty_state">
            <p className="text-5xl mb-4">🛕</p>
            <p
              className="font-display font-bold text-xl mb-2"
              style={{ color: "var(--color-snow)" }}
            >
              No yatras match your filters
            </p>
            <p className="font-body" style={{ color: "var(--color-ash)" }}>
              Try adjusting or clearing your filters
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.slice(0, visible).map((y, i) => (
                <YatraCard key={y.id} y={y} index={i} />
              ))}
            </div>
            {visible < filtered.length && (
              <div className="text-center mt-12">
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + 9)}
                  className="btn-secondary font-ui"
                  data-ocid="all-yatras.load_more_button"
                >
                  Load More Yatras ({filtered.length - visible} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <NewsletterFooter />
    </div>
  );
}
