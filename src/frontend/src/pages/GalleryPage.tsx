import { ChevronLeft, ChevronRight, Grid3X3, Layers, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

// ─── Gallery Data ───────────────────────────────────────────────────────────
type GalleryTag =
  | "All"
  | "Treks"
  | "Yatras"
  | "Uttarakhand"
  | "Himachal Pradesh"
  | "Snow"
  | "Meadows"
  | "Glaciers";

interface GalleryItem {
  id: string;
  url: string;
  title: string;
  location: string;
  tag: Exclude<GalleryTag, "All">;
  category: "Treks" | "Yatras";
  state: "Uttarakhand" | "Himachal Pradesh";
}

const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    url: "https://images.unsplash.com/photo-1605537964099-9e7ed0d5ac89?w=800&q=80",
    title: "Kedarkantha Summit",
    location: "Uttarkashi, Uttarakhand",
    tag: "Snow",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g2",
    url: "https://images.unsplash.com/photo-1580654843061-8c90a9f5c115?w=800&q=80",
    title: "Har Ki Dun Valley",
    location: "Uttarkashi, Uttarakhand",
    tag: "Meadows",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g3",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    title: "Dayara Bugyal",
    location: "Uttarkashi, Uttarakhand",
    tag: "Meadows",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g4",
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    title: "Brahmatal Winter",
    location: "Chamoli, Uttarakhand",
    tag: "Snow",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g5",
    url: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80",
    title: "Nag Tibba Summit",
    location: "Tehri Garhwal, Uttarakhand",
    tag: "Snow",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g6",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    title: "Himalayan Sunrise",
    location: "Kedarkantha Base, Uttarakhand",
    tag: "Treks",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g7",
    url: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80",
    title: "Pine Forest Trail",
    location: "Sankri, Uttarakhand",
    tag: "Treks",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g8",
    url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80",
    title: "Golden Alpenglow",
    location: "Kumaon Himalayas, Uttarakhand",
    tag: "Treks",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g9",
    url: "https://images.unsplash.com/photo-1510797215324-95aa89f43c33?w=800&q=80",
    title: "Base Camp Sunset",
    location: "Juda Ka Talab, Uttarakhand",
    tag: "Treks",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g10",
    url: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&q=80",
    title: "Summit Victory",
    location: "Kedarkantha, Uttarakhand",
    tag: "Treks",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g11",
    url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    title: "Trek Group",
    location: "Sankri Village, Uttarakhand",
    tag: "Treks",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g12",
    url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80",
    title: "Himalayan Wildlife",
    location: "Govind Sanctuary, Uttarakhand",
    tag: "Treks",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g13",
    url: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80",
    title: "Camp at Dusk",
    location: "Har Ki Dun, Uttarakhand",
    tag: "Treks",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g14",
    url: "https://images.unsplash.com/photo-1601932862107-8a0c3aaab2eb?w=800&q=80",
    title: "Snow Glissading",
    location: "Kedarkantha, Uttarakhand",
    tag: "Snow",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g15",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    title: "Mountain Lake",
    location: "Kumaon, Uttarakhand",
    tag: "Glaciers",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g16",
    url: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=800&q=80",
    title: "Valley Meadow",
    location: "Garhwal, Uttarakhand",
    tag: "Meadows",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g17",
    url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80",
    title: "Hampta Pass",
    location: "Kullu, Himachal Pradesh",
    tag: "Snow",
    category: "Treks",
    state: "Himachal Pradesh",
  },
  {
    id: "g18",
    url: "https://images.unsplash.com/photo-1530866994-4b2ff2ca2e8f?w=800&q=80",
    title: "Spiti Landscape",
    location: "Spiti Valley, Himachal Pradesh",
    tag: "Himachal Pradesh",
    category: "Treks",
    state: "Himachal Pradesh",
  },
  {
    id: "g19",
    url: "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=800&q=80",
    title: "Triund Ridge",
    location: "Kangra, Himachal Pradesh",
    tag: "Himachal Pradesh",
    category: "Treks",
    state: "Himachal Pradesh",
  },
  {
    id: "g20",
    url: "https://images.unsplash.com/photo-1617140237972-3afea2e6c5d7?w=800&q=80",
    title: "Kheerganga Meadow",
    location: "Parvati Valley, Himachal Pradesh",
    tag: "Meadows",
    category: "Treks",
    state: "Himachal Pradesh",
  },
  {
    id: "g21",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    title: "Winter Camp",
    location: "Himachal Pradesh",
    tag: "Snow",
    category: "Treks",
    state: "Himachal Pradesh",
  },
  {
    id: "g22",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    title: "Bhrigu Lake",
    location: "Kullu, Himachal Pradesh",
    tag: "Glaciers",
    category: "Treks",
    state: "Himachal Pradesh",
  },
  {
    id: "g23",
    url: "https://images.unsplash.com/photo-1611270418597-a6c77f4b7271?w=800&q=80",
    title: "Kedarnath Temple",
    location: "Rudraprayag, Uttarakhand",
    tag: "Yatras",
    category: "Yatras",
    state: "Uttarakhand",
  },
  {
    id: "g24",
    url: "https://images.unsplash.com/photo-1604314923937-b64a3bc2c4e6?w=800&q=80",
    title: "Temple Pilgrims",
    location: "Char Dham, Uttarakhand",
    tag: "Yatras",
    category: "Yatras",
    state: "Uttarakhand",
  },
  {
    id: "g25",
    url: "https://images.unsplash.com/photo-1590764449989-a5d53e4bd7d4?w=800&q=80",
    title: "Badrinath Dham",
    location: "Chamoli, Uttarakhand",
    tag: "Yatras",
    category: "Yatras",
    state: "Uttarakhand",
  },
  {
    id: "g26",
    url: "https://images.unsplash.com/photo-1580654843061-8c90a9f5c115?w=800&q=80",
    title: "Gangotri Glaciers",
    location: "Uttarkashi, Uttarakhand",
    tag: "Glaciers",
    category: "Yatras",
    state: "Uttarakhand",
  },
  {
    id: "g27",
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    title: "Mani Mahesh Lake",
    location: "Chamba, Himachal Pradesh",
    tag: "Yatras",
    category: "Yatras",
    state: "Himachal Pradesh",
  },
  {
    id: "g28",
    url: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80",
    title: "Hemkund Sahib",
    location: "Chamoli, Uttarakhand",
    tag: "Yatras",
    category: "Yatras",
    state: "Uttarakhand",
  },
  {
    id: "g29",
    url: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80",
    title: "Forest Pilgrimage Path",
    location: "Uttarakhand",
    tag: "Yatras",
    category: "Yatras",
    state: "Uttarakhand",
  },
  {
    id: "g30",
    url: "https://images.unsplash.com/photo-1510797215324-95aa89f43c33?w=800&q=80",
    title: "Sacred Lake Reflection",
    location: "Kinnaur, Himachal Pradesh",
    tag: "Glaciers",
    category: "Yatras",
    state: "Himachal Pradesh",
  },
  {
    id: "g31",
    url: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&q=80",
    title: "Mountain Pass",
    location: "Uttarakhand",
    tag: "Treks",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g32",
    url: "https://images.unsplash.com/photo-1601932862107-8a0c3aaab2eb?w=800&q=80",
    title: "Snow Descent",
    location: "Chamoli, Uttarakhand",
    tag: "Snow",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g33",
    url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80",
    title: "Morning Mist",
    location: "Kullu, Himachal Pradesh",
    tag: "Himachal Pradesh",
    category: "Treks",
    state: "Himachal Pradesh",
  },
  {
    id: "g34",
    url: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80",
    title: "Glacier View",
    location: "Kumaon, Uttarakhand",
    tag: "Glaciers",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g35",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    title: "Alpine Meadow",
    location: "Lahaul, Himachal Pradesh",
    tag: "Meadows",
    category: "Treks",
    state: "Himachal Pradesh",
  },
  {
    id: "g36",
    url: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=800&q=80",
    title: "Bugyal at Dawn",
    location: "Uttarkashi, Uttarakhand",
    tag: "Meadows",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g37",
    url: "https://images.unsplash.com/photo-1505533321630-975218a5f66f?w=800&q=80",
    title: "High Altitude Lake",
    location: "Spiti, Himachal Pradesh",
    tag: "Glaciers",
    category: "Treks",
    state: "Himachal Pradesh",
  },
  {
    id: "g38",
    url: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80",
    title: "Rocky Ridge",
    location: "Uttarkashi, Uttarakhand",
    tag: "Treks",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g39",
    url: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80",
    title: "Waterfall Trail",
    location: "Parvati Valley, Himachal Pradesh",
    tag: "Himachal Pradesh",
    category: "Treks",
    state: "Himachal Pradesh",
  },
  {
    id: "g40",
    url: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=800&q=80",
    title: "Snowy Summit",
    location: "Pin Parvati, Himachal Pradesh",
    tag: "Snow",
    category: "Treks",
    state: "Himachal Pradesh",
  },
  {
    id: "g41",
    url: "https://images.unsplash.com/photo-1497435335787-f443963f8b72?w=800&q=80",
    title: "Himalayan Village",
    location: "Osla, Uttarakhand",
    tag: "Treks",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g42",
    url: "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=800&q=80",
    title: "Trek Trail Dawn",
    location: "Garhwal, Uttarakhand",
    tag: "Treks",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g43",
    url: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=800&q=80",
    title: "Himalayan Panorama",
    location: "Himachal Pradesh",
    tag: "Himachal Pradesh",
    category: "Treks",
    state: "Himachal Pradesh",
  },
  {
    id: "g44",
    url: "https://images.unsplash.com/photo-1540390769625-2fc3f8b1d50c?w=800&q=80",
    title: "Winter Ridge",
    location: "Uttarakhand",
    tag: "Snow",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g45",
    url: "https://images.unsplash.com/photo-1486078562557-66cc1edd1c1a?w=800&q=80",
    title: "Cloud Sea",
    location: "Manali, Himachal Pradesh",
    tag: "Himachal Pradesh",
    category: "Treks",
    state: "Himachal Pradesh",
  },
  {
    id: "g46",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    title: "Panoramic Vista",
    location: "Kumaon, Uttarakhand",
    tag: "Treks",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g47",
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    title: "Frozen Trail",
    location: "Brahmatal, Uttarakhand",
    tag: "Snow",
    category: "Treks",
    state: "Uttarakhand",
  },
  {
    id: "g48",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    title: "Summit Sunrise",
    location: "Kedarkantha, Uttarakhand",
    tag: "Treks",
    category: "Treks",
    state: "Uttarakhand",
  },
];

const FILTER_TABS: GalleryTag[] = [
  "All",
  "Treks",
  "Yatras",
  "Uttarakhand",
  "Himachal Pradesh",
  "Snow",
  "Meadows",
  "Glaciers",
];

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [activeTag, setActiveTag] = useState<GalleryTag>("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [layout, setLayout] = useState<"masonry" | "grid">("masonry");

  const filtered =
    activeTag === "All"
      ? galleryItems
      : galleryItems.filter((g) => {
          if (activeTag === "Treks") return g.category === "Treks";
          if (activeTag === "Yatras") return g.category === "Yatras";
          if (activeTag === "Uttarakhand") return g.state === "Uttarakhand";
          if (activeTag === "Himachal Pradesh")
            return g.state === "Himachal Pradesh";
          return g.tag === activeTag;
        });

  const goNext = useCallback(
    () =>
      setLightboxIdx((i) => (i === null ? null : (i + 1) % filtered.length)),
    [filtered.length],
  );
  const goPrev = useCallback(
    () =>
      setLightboxIdx((i) =>
        i === null ? null : (i - 1 + filtered.length) % filtered.length,
      ),
    [filtered.length],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") setLightboxIdx(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="relative h-64 md:h-80 flex items-end"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
        }}
        data-ocid="gallery.hero"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/75" />
        <div className="relative w-full max-w-7xl mx-auto px-4 pb-8">
          <nav className="flex items-center gap-1.5 text-white/70 text-xs mb-3">
            <a href="/" className="hover:text-white">
              Home
            </a>
            <span>/</span>
            <span className="text-white">Gallery</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
            Trek Gallery
          </h1>
          <p className="text-white/80">
            {galleryItems.length}+ stunning images from the Himalayas
          </p>
        </div>
      </section>

      {/* Controls */}
      <div className="bg-card border-b sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-2 overflow-x-auto pb-1 flex-1">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTag(tab)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-smooth border ${
                    activeTag === tab
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:border-primary"
                  }`}
                  data-ocid={`gallery.${tab.toLowerCase().replace(" ", "-")}_tab`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex gap-1 flex-shrink-0 border rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setLayout("masonry")}
                className={`p-2 transition-colors ${layout === "masonry" ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-muted"}`}
                aria-label="Masonry layout"
                data-ocid="gallery.masonry_layout_button"
              >
                <Layers className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setLayout("grid")}
                className={`p-2 transition-colors ${layout === "grid" ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-muted"}`}
                aria-label="Grid layout"
                data-ocid="gallery.grid_layout_button"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Showing {filtered.length} of {galleryItems.length} images
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20" data-ocid="gallery.empty_state">
            <div className="text-5xl mb-4">🖼️</div>
            <p className="text-muted-foreground">
              No images in this category yet
            </p>
          </div>
        ) : layout === "masonry" ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {filtered.map((img, idx) => (
              <button
                key={img.id}
                type="button"
                className="break-inside-avoid w-full block cursor-pointer group relative rounded-xl overflow-hidden"
                onClick={() => setLightboxIdx(idx)}
                data-ocid={`gallery.item.${idx + 1}`}
                aria-label={img.title}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-auto block group-hover:scale-105 transition-smooth"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-smooth flex flex-col items-start justify-end p-3">
                  <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-smooth line-clamp-1">
                    {img.title}
                  </span>
                  <span className="text-white/70 text-xs opacity-0 group-hover:opacity-100 transition-smooth">
                    {img.location}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((img, idx) => (
              <button
                key={img.id}
                type="button"
                className="aspect-square cursor-pointer group relative rounded-xl overflow-hidden"
                onClick={() => setLightboxIdx(idx)}
                data-ocid={`gallery.item.${idx + 1}`}
                aria-label={img.title}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-smooth flex flex-col items-start justify-end p-3">
                  <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-smooth line-clamp-1">
                    {img.title}
                  </span>
                  <span className="text-white/70 text-xs opacity-0 group-hover:opacity-100 transition-smooth">
                    {img.location}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        // biome-ignore lint/a11y/useSemanticElements: lightbox overlay
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxIdx(null)}
          onKeyDown={(e) => e.key === "Escape" && setLightboxIdx(null)}
        >
          <button
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-smooth z-10"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous image"
            data-ocid="gallery.prev_button"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            className="max-w-5xl max-h-full px-16 py-8"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightboxIdx]?.url}
              alt={filtered[lightboxIdx]?.title}
              className="max-w-full max-h-[75vh] rounded-2xl object-contain mx-auto block shadow-2xl"
            />
            <div className="text-center mt-4">
              <p className="text-white font-semibold text-lg">
                {filtered[lightboxIdx]?.title}
              </p>
              <p className="text-white/60 text-sm mt-1">
                {filtered[lightboxIdx]?.location}
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                  {filtered[lightboxIdx]?.category}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                  {filtered[lightboxIdx]?.state}
                </span>
                <span className="text-white/40 text-xs">
                  {lightboxIdx + 1} / {filtered.length}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-smooth z-10"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next image"
            data-ocid="gallery.next_button"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <button
            type="button"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
            onClick={() => setLightboxIdx(null)}
            aria-label="Close"
            data-ocid="gallery.close_button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
