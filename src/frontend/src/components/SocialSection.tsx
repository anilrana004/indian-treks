import { useRef } from "react";

/* ─── Instagram grid data ─────────────────────────────────── */
const igPosts = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506905489316-0781d394b780?auto=format&fit=crop&w=400&q=80",
    alt: "Snow-capped Himalayan peak at sunrise",
    tall: true,
    likes: "1.2K",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1469521667108-eed3154f0168?auto=format&fit=crop&w=400&q=80",
    alt: "Trekker on ridge trail",
    tall: false,
    likes: "843",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=400&q=80",
    alt: "Alpine meadow camping",
    tall: false,
    likes: "2.1K",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80",
    alt: "Mountain valley at golden hour",
    tall: true,
    likes: "3.4K",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=400&q=80",
    alt: "Frozen lake high altitude",
    tall: false,
    likes: "1.7K",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80",
    alt: "Wildflowers in valley",
    tall: false,
    likes: "976",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1548013441-c56abe9b8bd1?auto=format&fit=crop&w=400&q=80",
    alt: "Prayer flags on summit",
    tall: true,
    likes: "4.2K",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1500534803095-88a7e91571dc?auto=format&fit=crop&w=400&q=80",
    alt: "Mountain river crossing",
    tall: false,
    likes: "1.1K",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1578762560426-e0a5cf01ab4e?auto=format&fit=crop&w=400&q=80",
    alt: "Night sky stargazing camp",
    tall: false,
    likes: "2.8K",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=400&q=80",
    alt: "Himalayan village path",
    tall: true,
    likes: "1.5K",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1454496522416-818a8c96e0b2?auto=format&fit=crop&w=400&q=80",
    alt: "Snow trek winter conditions",
    tall: false,
    likes: "3.9K",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1418985991418-19a41a96a1c8?auto=format&fit=crop&w=400&q=80",
    alt: "Sunrise over mountain peaks",
    tall: false,
    likes: "5.1K",
  },
];

/* ─── YouTube data ────────────────────────────────────────── */
const featuredVideo = {
  id: "v1",
  title: "Roopkund Trek \u2014 Full Documentary",
  duration: "24:18",
  views: "2.4M views",
  thumb:
    "https://images.unsplash.com/photo-1506905489316-0781d394b780?auto=format&fit=crop&w=800&q=80",
  url: "https://youtube.com",
};

const smallVideos = [
  {
    id: "v2",
    title: "Char Dham Yatra 2025 Highlights",
    duration: "14:32",
    views: "1.8M views",
    thumb:
      "https://images.unsplash.com/photo-1548013441-c56abe9b8bd1?auto=format&fit=crop&w=400&q=80",
    url: "https://youtube.com",
  },
  {
    id: "v3",
    title: "Hampta Pass in 4K",
    duration: "18:45",
    views: "3.1M views",
    thumb:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=400&q=80",
    url: "https://youtube.com",
  },
  {
    id: "v4",
    title: "A Solo Woman&#x27;s Spiti Journey",
    duration: "22:07",
    views: "987K views",
    thumb:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=400&q=80",
    url: "https://youtube.com",
  },
];

/* ─── Sub-components ─────────────────────────────────────── */
function IgCameraIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function PlayIcon({ size = 64 }: { size?: number }) {
  const half = size / 2;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={half}
        height={half}
        viewBox="0 0 24 24"
        fill="#4da8c7"
        aria-hidden="true"
      >
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    </div>
  );
}

function YouTubeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="16"
      viewBox="0 0 22 16"
      fill="white"
      aria-hidden="true"
    >
      <path d="M21.54 2.5A2.78 2.78 0 0 0 19.59.52C17.88 0 11 0 11 0S4.12 0 2.41.52A2.78 2.78 0 0 0 .46 2.5 29.1 29.1 0 0 0 0 8a29.1 29.1 0 0 0 .46 5.5A2.78 2.78 0 0 0 2.41 15.48C4.12 16 11 16 11 16s6.88 0 8.59-.52a2.78 2.78 0 0 0 1.95-1.98A29.1 29.1 0 0 0 22 8a29.1 29.1 0 0 0-.46-5.5zM8.75 11.43V4.57L14.5 8l-5.75 3.43z" />
    </svg>
  );
}

/* ─── Instagram Post Cell ─────────────────────────────────── */
function IgCell({
  post,
}: {
  post: (typeof igPosts)[number];
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      data-tall={post.tall}
      className="ig-cell"
      style={{
        borderRadius: 8,
        overflow: "hidden",
        position: "relative",
        gridRow: post.tall ? "span 2" : "span 1",
        aspectRatio: post.tall ? undefined : "1 / 1",
      }}
    >
      <img
        src={post.src}
        alt={post.alt}
        loading="lazy"
        className="ig-img"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
      <div
        className="ig-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(10,14,26,0.72)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <IgCameraIcon />
        <span
          style={{
            color: "white",
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          &#x2665; {post.likes}
        </span>
      </div>
    </div>
  );
}

/* ─── Video Card ─────────────────────────────────────────── */
function VideoCard({
  video,
  featured = false,
}: {
  video: {
    id: string;
    title: string;
    duration: string;
    views: string;
    thumb: string;
    url: string;
  };
  featured?: boolean;
}) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch ${video.title} on YouTube`}
      className="yt-card"
      style={{
        display: "block",
        borderRadius: featured ? 16 : 12,
        overflow: "hidden",
        position: "relative",
        textDecoration: "none",
        flexShrink: 0,
      }}
      data-ocid={`social.youtube.${video.id}`}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 9",
          overflow: "hidden",
        }}
      >
        <img
          src={video.thumb}
          alt={video.title}
          loading="lazy"
          className="yt-thumb"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "filter 0.3s ease, transform 0.35s ease",
          }}
        />
        {/* Dark overlay on hover */}
        <div
          className="yt-overlay"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10,14,26,0)",
            transition: "background 0.3s ease",
          }}
        />
        {/* Play button */}
        <div
          className="yt-play"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            transition: "transform 0.25s ease",
          }}
        >
          <PlayIcon size={featured ? 64 : 40} />
        </div>
        {/* Duration badge */}
        <span
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "rgba(10,14,26,0.85)",
            color: "var(--color-ash)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            padding: "2px 6px",
            borderRadius: 3,
          }}
        >
          {video.duration}
        </span>
      </div>

      {/* Meta */}
      <div style={{ padding: featured ? "16px 0 0" : "10px 0 0" }}>
        <p
          style={{
            color: "white",
            fontFamily: featured ? "var(--font-display)" : "var(--font-ui)",
            fontSize: featured ? 22 : 15,
            fontWeight: featured ? 700 : 600,
            lineHeight: 1.3,
            margin: "0 0 6px",
          }}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static string, no user input
          dangerouslySetInnerHTML={{ __html: video.title }}
        />
        <span
          style={{
            color: "var(--color-ash)",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
          }}
        >
          {video.views}
        </span>
      </div>
    </a>
  );
}

/* ─── Main export ─────────────────────────────────────────── */
export function SocialSection() {
  return (
    <>
      {/* ====== INSTAGRAM ====== */}
      <section
        data-ocid="social.instagram.section"
        style={{
          background: "var(--color-snow)",
          padding: "80px 0",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 700,
                color: "var(--color-midnight)",
                margin: "0 0 12px",
              }}
            >
              On the Trail
            </h2>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 18,
                color: "var(--color-ash)",
                margin: 0,
              }}
            >
              @trekrootofficial &#8212; Follow the journey
            </p>
          </div>

          {/* Masonry grid */}
          <div
            data-ocid="social.instagram.grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gridAutoRows: "160px",
              gap: 8,
            }}
            className="ig-grid"
          >
            {igPosts.map((post) => (
              <IgCell key={post.id} post={post} />
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a
              href="https://www.instagram.com/trekrootofficial"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="social.instagram.follow_button"
              className="ig-cta-btn"
              style={{
                display: "inline-block",
                padding: "12px 32px",
                borderRadius: "var(--radius-btn)",
                fontFamily: "var(--font-ui)",
                fontWeight: 700,
                fontSize: 15,
                color: "white",
                background:
                  "linear-gradient(90deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
                textDecoration: "none",
                transition: "opacity 0.2s ease, transform 0.2s ease",
              }}
            >
              Follow @trekrootofficial
            </a>
          </div>
        </div>
      </section>

      {/* ====== YOUTUBE ====== */}
      <section
        data-ocid="social.youtube.section"
        style={{
          background: "var(--color-midnight)",
          padding: "80px 0",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 700,
                color: "white",
                margin: "0 0 12px",
              }}
            >
              Watch the Mountains Come Alive
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 18,
                color: "var(--color-ash)",
                fontStyle: "italic",
                margin: 0,
              }}
            >
              Trek films, yatra stories, trail guides &#8212; subscribe to
              TrekRoot
            </p>
          </div>

          {/* Video grid */}
          <div
            className="yt-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 2fr",
              gap: 24,
              alignItems: "start",
            }}
          >
            {/* Featured */}
            <VideoCard video={featuredVideo} featured />

            {/* Small stack */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {smallVideos.map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
          </div>

          {/* Subscribe CTA */}
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <a
              href="https://www.youtube.com/@trekroot"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="social.youtube.subscribe_button"
              className="yt-subscribe-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 32px",
                borderRadius: "var(--radius-btn)",
                background: "#FF0000",
                color: "white",
                fontFamily: "var(--font-ui)",
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
                transition: "background 0.2s ease",
              }}
            >
              <YouTubeIcon />
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* ====== SCOPED STYLES ====== */}
      <style>{`
        /* Instagram grid — responsive */
        @media (max-width: 767px) {
          .ig-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: 140px !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .ig-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        /* Instagram cell hover */
        .ig-cell:hover .ig-overlay {
          opacity: 1;
        }
        .ig-cell:hover .ig-img {
          transform: scale(1.05);
        }

        /* YouTube grid — responsive */
        @media (max-width: 767px) {
          .yt-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .yt-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* YouTube card hover */
        .yt-card:hover .yt-thumb {
          filter: brightness(0.8);
        }
        .yt-card:hover .yt-overlay {
          background: rgba(10,14,26,0.35) !important;
        }
        .yt-card:hover .yt-play {
          transform: translate(-50%, -50%) scale(1.15) !important;
        }

        /* Instagram CTA hover */
        .ig-cta-btn:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        /* YouTube subscribe hover */
        .yt-subscribe-btn:hover {
          background: #cc0000 !important;
        }
      `}</style>
    </>
  );
}

export default SocialSection;
