import { useEffect } from "react";
import Navigation from "../components/Navigation";

export default function BlogPage() {
  useEffect(() => {
    document.title = "Trail Notes — Stories from TrekRoot Guides";
  }, []);

  return (
    <div className="min-h-screen bg-midnight" data-ocid="blog.page">
      <Navigation />
      <main
        id="main-content"
        className="flex flex-col items-center justify-center min-h-[80vh] px-6"
      >
        <div className="text-center max-w-2xl mx-auto">
          <p
            className="font-mono text-xs tracking-[0.2em] uppercase mb-6"
            style={{ color: "var(--color-summit)" }}
          >
            Trail Notes
          </p>
          <h1
            className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight"
            style={{ color: "var(--color-snow)" }}
          >
            Stories from the Trail
          </h1>
          <p
            className="font-body text-lg leading-relaxed mb-4"
            style={{ color: "var(--color-ash)" }}
          >
            Guides, gear wisdom, yatra insights, and seasonal trek breakdowns —
            written by our lead trekkers who have walked every trail we offer.
          </p>
          <p
            className="font-body text-base leading-relaxed"
            style={{ color: "var(--color-ash)" }}
          >
            Full blog with 10+ in-depth articles — coming soon.
          </p>
        </div>
      </main>
    </div>
  );
}
