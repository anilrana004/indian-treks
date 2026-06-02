import { ARTICLES } from "@/data/company";
import { useEffect, useRef } from "react";

interface BlogPost {
  title: string;
  category: string;
  author: string;
  authorTitle: string;
  readTime: string;
  excerpt: string;
}

const POSTS: BlogPost[] = ARTICLES.map((a) => ({
  title: a.title,
  category: a.category.toUpperCase(),
  author: a.author,
  authorTitle: "Indian Treks Editorial",
  readTime: a.readTime,
  excerpt: a.excerpt,
}));

const CATEGORY_STYLES: Record<string, { bg: string; color: string }> = {
  "TREK GUIDE": { bg: "var(--color-glacier)", color: "var(--color-midnight)" },
  YATRA: { bg: "var(--color-forest)", color: "#fff" },
  GEAR: { bg: "var(--color-summit)", color: "var(--color-midnight)" },
  SAFETY: { bg: "var(--color-ember)", color: "#fff" },
  SEASONAL: { bg: "var(--color-pine)", color: "#fff" },
};

function avatarUrl(name: string) {
  const seed = encodeURIComponent(name.toLowerCase().replace(/[^a-z0-9]/g, ""));
  return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=4DA8C7&textColor=0A0E1A&fontSize=36`;
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const catStyle = CATEGORY_STYLES[post.category] ?? {
    bg: "var(--color-glacier)",
    color: "var(--color-midnight)",
  };

  return (
    <div
      ref={cardRef}
      className="reveal group"
      style={{ transitionDelay: `${index * 0.1}s` }}
      data-ocid={`blog.card.${index + 1}`}
    >
      <article
        className="h-full flex flex-col overflow-hidden bg-white transition-all duration-300"
        style={{
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(-8px)";
          el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.14)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)";
        }}
      >
        {/* Image / Gradient Placeholder */}
        <div
          className="overflow-hidden"
          style={{
            aspectRatio: "16/9",
            background:
              "linear-gradient(135deg, var(--color-forest), var(--color-midnight))",
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <span
              className="font-display text-white/30"
              style={{ fontSize: "48px" }}
            >
              ✦
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-6">
          {/* Category chip */}
          <span
            className="font-mono inline-block self-start mb-3 px-3 py-1 rounded-full"
            style={{
              fontSize: "11px",
              background: catStyle.bg,
              color: catStyle.color,
              letterSpacing: "0.06em",
            }}
          >
            {post.category}
          </span>

          {/* Title */}
          <h3
            className="font-display font-semibold mb-3 leading-snug"
            style={{
              fontSize: "20px",
              color: "var(--color-midnight)",
              lineHeight: 1.3,
            }}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p
            className="font-body flex-1 mb-4 line-clamp-3"
            style={{
              fontSize: "14px",
              color: "var(--color-ash)",
              lineHeight: 1.65,
            }}
          >
            {post.excerpt}
          </p>

          {/* Author + read time */}
          <div
            className="flex items-center justify-between mt-auto pt-4"
            style={{ borderTop: "1px solid rgba(10,14,26,0.08)" }}
          >
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={avatarUrl(post.author)}
                alt={post.author}
                className="rounded-full flex-shrink-0"
                width={32}
                height={32}
              />
              <div className="min-w-0">
                <p
                  className="font-ui font-bold truncate"
                  style={{ fontSize: "13px", color: "var(--color-midnight)" }}
                >
                  {post.author}
                </p>
                <p
                  className="font-ui truncate"
                  style={{ fontSize: "11px", color: "var(--color-ash)" }}
                >
                  {post.authorTitle}
                </p>
              </div>
            </div>
            <div
              className="font-mono flex-shrink-0 ml-3 flex items-center gap-1"
              style={{ fontSize: "11px", color: "var(--color-ash)" }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              {post.readTime}
            </div>
          </div>

          {/* Read more link */}
          <a
            href="/blog"
            className="font-ui mt-4 inline-block transition-colors duration-200 hover:underline"
            style={{ fontSize: "14px", color: "var(--color-glacier)" }}
            data-ocid={`blog.read_more.${index + 1}`}
          >
            Read More →
          </a>
        </div>
      </article>
    </div>
  );
}

export default function BlogSection() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{ background: "var(--color-snow)" }}
      className="section-padding"
      aria-label="Trail Notes — Blog"
    >
      <div className="container-max">
        {/* Header */}
        <div ref={headerRef} className="reveal text-center mb-12">
          <p
            className="font-mono uppercase tracking-[0.15em] mb-3"
            style={{ fontSize: "12px", color: "var(--color-glacier)" }}
          >
            TRAIL NOTES
          </p>
          <h2
            className="font-display font-bold mb-4"
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              color: "var(--color-midnight)",
              lineHeight: 1.15,
            }}
          >
            Stories &amp; Guides from the Trail
          </h2>
          <p
            className="font-body italic mx-auto"
            style={{
              fontSize: "18px",
              color: "var(--color-ash)",
              maxWidth: "560px",
              lineHeight: 1.6,
            }}
          >
            Expert knowledge from our trek leaders — gear, safety, and Himalayan
            wisdom
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {POSTS.map((post, i) => (
            <BlogCard key={post.title} post={post} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/blog"
            className="btn-outline inline-block"
            style={{
              color: "var(--color-midnight)",
              borderColor: "var(--color-midnight)",
            }}
            data-ocid="blog.view_all_button"
          >
            View All Articles
          </a>
        </div>
      </div>
    </section>
  );
}
