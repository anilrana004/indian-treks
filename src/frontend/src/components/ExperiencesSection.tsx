import { useEffect, useRef } from "react";

interface Experience {
  id: number;
  icon: string;
  title: string;
  description: string;
  imageUrl: string;
  isLarge: boolean;
}

const experiences: Experience[] = [
  {
    id: 1,
    icon: "⛺",
    title: "High Altitude Camping",
    description:
      "Sleep above 4,000 meters under a billion stars. Wake to sunrise painting snow peaks gold.",
    imageUrl:
      "https://images.unsplash.com/photo-1469521667108-eed3154f0168?auto=format&fit=crop&w=800&q=80",
    isLarge: true,
  },
  {
    id: 2,
    icon: "🌸",
    title: "Meadow & Bugyal Treks",
    description:
      "Roll through vast alpine meadows — Dayara, Ali Bedni, Brahmatal — as far as the eye can see.",
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    isLarge: false,
  },
  {
    id: 3,
    icon: "❄️",
    title: "Winter Snow Treks",
    description:
      "White-out beauty. Frozen lakes. Snowfall campsites. Kedarkantha in December is magic.",
    imageUrl:
      "https://images.unsplash.com/photo-1578762560426-e0a5cf01ab4e?auto=format&fit=crop&w=800&q=80",
    isLarge: false,
  },
  {
    id: 4,
    icon: "🌊",
    title: "River Valley Walks",
    description:
      "The turquoise Tirthan, the holy Bhagirathi, the mystic Parvati — walk beside living rivers.",
    imageUrl:
      "https://images.unsplash.com/photo-1506905489316-0781d394b780?auto=format&fit=crop&w=800&q=80",
    isLarge: true,
  },
  {
    id: 5,
    icon: "🛕",
    title: "Sacred Temple Circuits",
    description:
      "Ancient shrines carved into cliff faces, pilgrimage routes walked for 2,000 years.",
    imageUrl:
      "https://images.unsplash.com/photo-1548013441-c56abe9b8bd1?auto=format&fit=crop&w=800&q=80",
    isLarge: false,
  },
  {
    id: 6,
    icon: "🦅",
    title: "Wildlife & Bird Watching",
    description:
      "Snow leopard territory. Himalayan monal. Bears in Govind National Park. Rare and sacred wildlife.",
    imageUrl:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
    isLarge: false,
  },
  {
    id: 7,
    icon: "🧘",
    title: "Yoga & Wellness Retreats",
    description:
      "Begin in Rishikesh. Ascend to high-altitude camps. Practice yoga at 3,500m.",
    imageUrl:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=80",
    isLarge: true,
  },
  {
    id: 8,
    icon: "📸",
    title: "Photography Expeditions",
    description:
      "Golden hour at Brahmatal. Blue hour at Chandrashila. The Himalayas as your studio.",
    imageUrl:
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=800&q=80",
    isLarge: false,
  },
  {
    id: 9,
    icon: "👨‍👩‍👧",
    title: "Family Friendly Treks",
    description:
      "Easy trails, hotel stays, and magical moments that turn families into trekking families.",
    imageUrl:
      "https://images.unsplash.com/photo-1500534803095-88a7e91571dc?auto=format&fit=crop&w=800&q=80",
    isLarge: false,
  },
  {
    id: 10,
    icon: "🎒",
    title: "Solo Trekker Programs",
    description:
      "Safe, structured, connected solo adventures with weekly group departures and WhatsApp family updates.",
    imageUrl:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80",
    isLarge: true,
  },
  {
    id: 11,
    icon: "🎪",
    title: "Camping Festivals",
    description:
      "Bonfire stories, local Pahadi cuisine, folk music under stars — cultural immersion at altitude.",
    imageUrl:
      "https://images.unsplash.com/photo-1454496522416-818a8c96e0b2?auto=format&fit=crop&w=800&q=80",
    isLarge: false,
  },
  {
    id: 12,
    icon: "🚣",
    title: "River Rafting Add-ons",
    description:
      "Pair your Rishikesh transit with Grade III-IV rapids before or after your Himalayan trek.",
    imageUrl:
      "https://images.unsplash.com/photo-1418985991418-19a41a96a1c8?auto=format&fit=crop&w=800&q=80",
    isLarge: false,
  },
];

// Groups: [largeIndex, smallIndex1, smallIndex2, largeIsRight]
// largeIsRight=true means small cards come first (left), large is right
const groups: [number, number, number, boolean][] = [
  [0, 1, 2, false], // group 1: large left, 2 small right
  [3, 4, 5, true], // group 2: 2 small left, large right
  [6, 7, 8, false], // group 3: large left, 2 small right
  [9, 10, 11, true], // group 4: 2 small left, large right
];

export default function ExperiencesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.style.animationDelay || "0s";
            const delayMs = Number.parseFloat(delay) * 1000;
            setTimeout(() => {
              el.classList.add("revealed");
            }, delayMs);
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.15 },
    );

    for (const card of cards) {
      observer.observe(card);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .experiences-section {
          background: var(--color-snow);
          padding: var(--section-padding-desktop) 0;
        }
        @media (max-width: 1023px) {
          .experiences-section {
            padding: var(--section-padding-mobile) 0;
          }
        }

        /* Experience card base */
        .experience-card {
          position: relative;
          border-radius: var(--radius-card);
          overflow: hidden;
          cursor: pointer;
        }
        .experience-card:focus-visible {
          outline: 2px solid var(--color-glacier);
          outline-offset: 3px;
        }

        /* Image layer */
        .card-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }
        .experience-card:hover .card-bg {
          transform: scale(1.05);
        }

        /* Gradient overlay */
        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10, 14, 26, 0.85) 0%,
            rgba(10, 14, 26, 0.2) 60%
          );
          transition: background 0.4s ease;
        }
        .experience-card:hover .card-overlay {
          background: linear-gradient(
            to top,
            rgba(10, 14, 26, 0.65) 0%,
            rgba(10, 14, 26, 0.08) 60%
          );
        }

        /* Content */
        .card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .card-icon {
          font-size: 40px;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.5));
          line-height: 1;
          display: block;
          margin-bottom: 4px;
        }

        .card-title {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          margin: 0;
        }

        .card-description {
          font-size: 14px;
          font-style: italic;
          color: var(--color-ash);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.5;
        }

        .card-cta {
          font-size: 12px;
          color: var(--color-glacier);
          letter-spacing: 0.05em;
          margin-top: 4px;
          display: inline-block;
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .experience-card:hover .card-cta {
          color: var(--color-summit);
          transform: translateX(4px);
        }

        /* ── Desktop grid layout ── */
        .exp-group {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .exp-group.reversed {
          grid-template-columns: 2fr 3fr;
        }

        /* Large card */
        .exp-large {
          min-height: 500px;
        }
        .exp-group.reversed .exp-large {
          order: 2;
        }
        .exp-group.reversed .exp-small-stack {
          order: 1;
        }

        /* Small stack */
        .exp-small-stack {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .exp-small {
          flex: 1;
          min-height: 240px;
        }

        /* ── Mobile: single column ── */
        @media (max-width: 767px) {
          .exp-group,
          .exp-group.reversed {
            grid-template-columns: 1fr;
          }
          .exp-large {
            min-height: 300px;
          }
          .exp-small {
            min-height: 200px;
          }
          .exp-group.reversed .exp-large {
            order: 0;
          }
          .exp-group.reversed .exp-small-stack {
            order: 0;
          }
        }

        /* ── Tablet ── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .exp-large {
            min-height: 380px;
          }
          .exp-small {
            min-height: 180px;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="experiences-section"
        aria-labelledby="exp-heading"
        data-ocid="experiences.section"
      >
        <div className="container-max">
          {/* Section header */}
          <div className="text-center mb-12 md:mb-16">
            <p
              className="font-mono text-xs tracking-widest uppercase mb-4"
              style={{ color: "var(--color-glacier)" }}
            >
              CURATED ADVENTURES
            </p>
            <h2
              id="exp-heading"
              className="font-display reveal"
              style={{
                fontSize: "clamp(32px, 4vw, 56px)",
                color: "var(--color-midnight)",
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: "16px",
              }}
            >
              Experiences for Every Traveler
            </h2>
            <p
              className="font-body reveal"
              style={{
                fontSize: "clamp(16px, 2vw, 20px)",
                color: "var(--color-ash)",
                maxWidth: "560px",
                margin: "0 auto",
                lineHeight: 1.6,
                animationDelay: "0.1s",
              }}
            >
              Choose your adventure &#8212; from sacred summits to serene
              valleys
            </p>
          </div>

          {/* Alternating grid groups */}
          {groups.map(
            ([largeIdx, small1Idx, small2Idx, reversed], groupIdx) => {
              const baseDelay = groupIdx * 3; // stagger offset per group
              return (
                <div
                  key={largeIdx}
                  className={`exp-group${reversed ? " reversed" : ""}`}
                >
                  {/* Large card */}
                  <div
                    className="exp-large experience-card reveal"
                    style={{ animationDelay: `${baseDelay * 0.1}s` }}
                    data-ocid={`experiences.item.${largeIdx + 1}`}
                  >
                    <div
                      className="card-bg"
                      style={{
                        backgroundImage: `url(${experiences[largeIdx].imageUrl})`,
                      }}
                      aria-hidden="true"
                    />
                    <div className="card-overlay" aria-hidden="true" />
                    <div className="card-content">
                      <span className="card-icon" aria-hidden="true">
                        {experiences[largeIdx].icon}
                      </span>
                      <h3 className="card-title font-ui">
                        {experiences[largeIdx].title}
                      </h3>
                      <p className="card-description font-body">
                        {experiences[largeIdx].description}
                      </p>
                      <span className="card-cta font-mono">
                        Explore &#8594;
                      </span>
                    </div>
                  </div>

                  {/* Small card stack */}
                  <div className="exp-small-stack">
                    <div
                      className="exp-small experience-card reveal"
                      style={{ animationDelay: `${(baseDelay + 1) * 0.1}s` }}
                      data-ocid={`experiences.item.${small1Idx + 1}`}
                    >
                      <div
                        className="card-bg"
                        style={{
                          backgroundImage: `url(${experiences[small1Idx].imageUrl})`,
                        }}
                        aria-hidden="true"
                      />
                      <div className="card-overlay" aria-hidden="true" />
                      <div className="card-content">
                        <span className="card-icon" aria-hidden="true">
                          {experiences[small1Idx].icon}
                        </span>
                        <h3 className="card-title font-ui">
                          {experiences[small1Idx].title}
                        </h3>
                        <p className="card-description font-body">
                          {experiences[small1Idx].description}
                        </p>
                        <span className="card-cta font-mono">
                          Explore &#8594;
                        </span>
                      </div>
                    </div>

                    <div
                      className="exp-small experience-card reveal"
                      style={{ animationDelay: `${(baseDelay + 2) * 0.1}s` }}
                      data-ocid={`experiences.item.${small2Idx + 1}`}
                    >
                      <div
                        className="card-bg"
                        style={{
                          backgroundImage: `url(${experiences[small2Idx].imageUrl})`,
                        }}
                        aria-hidden="true"
                      />
                      <div className="card-overlay" aria-hidden="true" />
                      <div className="card-content">
                        <span className="card-icon" aria-hidden="true">
                          {experiences[small2Idx].icon}
                        </span>
                        <h3 className="card-title font-ui">
                          {experiences[small2Idx].title}
                        </h3>
                        <p className="card-description font-body">
                          {experiences[small2Idx].description}
                        </p>
                        <span className="card-cta font-mono">
                          Explore &#8594;
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </section>
    </>
  );
}
