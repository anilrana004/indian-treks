import { useEffect, useRef, useState } from "react";
import Navigation from "../components/Navigation";
import NewsletterFooter from "../components/NewsletterFooter";

// ── Timeline data ─────────────────────────────────────────────
const MILESTONES = [
  {
    year: "2010",
    text: "Founded in Dehradun — first group trek to Kedarkantha with 12 trekkers. The Raturi brothers turned passion into profession.",
  },
  {
    year: "2012",
    text: "First Char Dham Yatra guided — 45 pilgrims, flawless logistics, deeply moving spiritual experience for everyone.",
  },
  {
    year: "2014",
    text: "Expanded to Himachal Pradesh, launched flagship Hampta Pass program. Base camp in Manali established.",
  },
  {
    year: "2016",
    text: "Achieved 500th successful trek milestone. NIMAS certification acquired for all senior guides.",
  },
  {
    year: "2018",
    text: "Partnered with Uttarakhand Tourism. Launched women-only trek programs with all-women guide teams.",
  },
  {
    year: "2020",
    text: "Pivoted to virtual trail guides during the pandemic. Built an online mountain community of 10,000+ members.",
  },
  {
    year: "2022",
    text: "Reached 5,000 happy trekkers milestone. Became an IMAS (International Mountain Association) member.",
  },
  {
    year: "2024",
    text: "TrekRoot digital platform launched. 200+ routes mapped, 15,000+ trekkers served. India's most trusted Himalayan brand.",
  },
];

// ── Guide data ─────────────────────────────────────────────────
const GUIDES = [
  {
    name: "Ravi Raturi",
    role: "Head Trek Leader",
    years: 15,
    quote: "Every mountain has a lesson. I'm just the translator.",
    avatar: "RR",
    color: "#4DA8C7",
  },
  {
    name: "Deepak Raturi",
    role: "Co-Founder & Equipment Head",
    years: 15,
    quote: "Safety isn't extra. It's the foundation of every great adventure.",
    avatar: "DR",
    color: "#E8C547",
  },
  {
    name: "Kavita Thakur",
    role: "Women's Trek Specialist",
    years: 8,
    quote: "I want every solo woman to summit her first peak with us.",
    avatar: "KT",
    color: "#C94F2A",
  },
  {
    name: "Pradeep Rawat",
    role: "Operations Manager",
    years: 12,
    quote: "If logistics bore you, treks become magical.",
    avatar: "PR",
    color: "#2E5E3E",
  },
  {
    name: "Dr. Meera Joshi",
    role: "Medical Officer",
    years: 7,
    quote: "Healthy trekkers make the best memories.",
    avatar: "MJ",
    color: "#4DA8C7",
  },
  {
    name: "Anjali Negi",
    role: "Yatra Coordinator",
    years: 9,
    quote: "The mountains don't just test your body. They call your spirit.",
    avatar: "AN",
    color: "#E8C547",
  },
];

// ── Philosophy ─────────────────────────────────────────────────
const PHILOSOPHY = [
  {
    icon: "🌱",
    title: "Responsible Trekking",
    desc: "We operate within Leave No Trace principles. Waste is carried out. Porters are paid fairly and treated with dignity. The mountains belong to future generations — we protect them fiercely.",
  },
  {
    icon: "🛡️",
    title: "Safety Above All",
    desc: "No trek is worth a life. We turn back when needed — no ego, no peer pressure. Satellite phones, emergency oxygen, and first-aid trained guides on every high-altitude route.",
  },
  {
    icon: "🤝",
    title: "Community First",
    desc: "Local guides, local stays, local food. The Himalayan communities are our partners, not vendors. Every rupee you spend with us flows back into the mountain villages that host us.",
  },
];

// ── Certifications ─────────────────────────────────────────────
const CERTS = [
  { name: "IMAS Member", sub: "International Mountain Association" },
  { name: "NIMAS Certified", sub: "National Institute of Mountaineering" },
  { name: "ATOAI Member", sub: "Adventure Tour Operators Assoc. of India" },
  { name: "UK Tourism Regd.", sub: "Uttarakhand Tourism Department" },
];

// ── Reveal hook ────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
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
  return ref;
}

export default function AboutPage() {
  useEffect(() => {
    document.title = "About TrekRoot | Born in the Himalayas";
  }, []);

  const storyRef = useReveal();
  const timelineRef = useReveal();
  const guidesRef = useReveal();
  const philosophyRef = useReveal();
  const certsRef = useReveal();

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-midnight)" }}
      data-ocid="about.page"
    >
      <Navigation />

      {/* ── HERO ── */}
      <section
        className="relative flex items-end"
        style={{ height: "60vh", minHeight: 380 }}
        data-ocid="about.hero"
      >
        <img
          src="https://images.unsplash.com/photo-1469521667108-eed3154f0168?auto=format&fit=crop&w=1920&q=80"
          alt="Himalayan mountain landscape"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(10,14,26,0.6)" }}
        />
        <div className="relative container-max w-full pb-16 pt-8">
          <p
            className="font-mono text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: "var(--color-glacier)" }}
          >
            Our Story
          </p>
          <h1
            className="font-display font-bold leading-tight mb-4"
            style={{
              fontSize: "clamp(2.5rem,6vw,4.5rem)",
              color: "var(--color-snow)",
            }}
          >
            About TrekRoot
          </h1>
          <p
            className="font-body italic text-lg md:text-2xl"
            style={{ color: "var(--color-ash)" }}
          >
            Born in Dehradun. Built for the mountains.
          </p>
        </div>
      </section>

      {/* ── FOUNDING STORY ── */}
      <section
        className="section-padding"
        style={{ background: "var(--color-snow)" }}
        data-ocid="about.story_section"
      >
        <div className="container-max">
          <div
            ref={storyRef}
            className="reveal grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            <div>
              <p
                className="font-mono text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: "var(--color-glacier)" }}
              >
                How It Began
              </p>
              <h2
                className="font-display font-bold mb-6"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "var(--color-midnight)",
                }}
              >
                Two Brothers, One Dream
              </h2>
              <div
                className="space-y-4 font-body text-[17px] leading-relaxed"
                style={{ color: "#3a3530" }}
              >
                <p>
                  TrekRoot was founded in 2010 by the Raturi brothers — Ravi and
                  Deepak — who grew up in the shadow of the Himalayas in
                  Dehradun. As children, they trekked to Kedarkantha with their
                  father, a forest department ranger who knew every trail, tree,
                  and altitude change in the Garhwal. Those early mornings of
                  frozen campsites and summit dawns never left them.
                </p>
                <p>
                  After Ravi completed his mountaineering certification from
                  NIMAS and Deepak built a logistics career, they merged their
                  skills into something unprecedented: a trek organization that
                  prioritized safety protocols with the warmth of local
                  hospitality. Their first paid group — 12 colleagues from a
                  Delhi tech company — returned and booked again the following
                  year.
                </p>
                <p>
                  Today, TrekRoot is Uttarakhand's most reviewed trekking
                  organization. Over 15,000 trekkers have stood on summits,
                  waded through valley flowers, and sat around campfires under
                  skies full of stars — all because two brothers refused to keep
                  the Himalayas to themselves. Every guide we hire is local.
                  Every campsite we use is one we've been coming back to for
                  fifteen years.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=80"
                alt="Trekkers on Himalayan trail"
                loading="lazy"
                className="w-full object-cover"
                style={{
                  borderRadius: "var(--radius-card)",
                  aspectRatio: "4/3",
                }}
              />
              <div
                className="absolute -bottom-6 -left-6 px-6 py-4"
                style={{
                  background: "var(--color-forest)",
                  borderRadius: "var(--radius-card)",
                }}
              >
                <p
                  className="font-mono text-2xl font-bold"
                  style={{ color: "var(--color-summit)" }}
                >
                  15,000+
                </p>
                <p
                  className="font-ui text-sm"
                  style={{ color: "var(--color-ash)" }}
                >
                  happy trekkers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section
        className="section-padding"
        style={{ background: "var(--color-midnight)" }}
        data-ocid="about.timeline_section"
      >
        <div className="container-max">
          <div ref={timelineRef} className="reveal">
            <p
              className="font-mono text-xs tracking-[0.2em] uppercase mb-3 text-center"
              style={{ color: "var(--color-glacier)" }}
            >
              Est. 2010
            </p>
            <h2
              className="font-display font-bold text-center mb-16"
              style={{
                fontSize: "clamp(1.8rem,4vw,2.5rem)",
                color: "var(--color-snow)",
              }}
            >
              Our Journey Since 2010
            </h2>
            <div className="relative max-w-3xl mx-auto">
              {/* Vertical connector line */}
              <div
                className="absolute left-[calc(50%-1px)] top-0 bottom-0 w-px hidden md:block"
                style={{ background: "var(--color-glacier)", opacity: 0.3 }}
              />
              <div className="space-y-12">
                {MILESTONES.map((m, i) => (
                  <div
                    key={m.year}
                    className={`flex flex-col md:flex-row items-start md:items-center gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                    data-ocid={`about.milestone.${i + 1}`}
                  >
                    <div
                      className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                    >
                      {i % 2 === 0 ? (
                        <div
                          className="p-5 rounded-2xl"
                          style={{
                            background: "rgba(77,168,199,0.08)",
                            border: "1px solid rgba(77,168,199,0.15)",
                          }}
                        >
                          <p
                            className="font-body text-sm leading-relaxed"
                            style={{ color: "var(--color-ash)" }}
                          >
                            {m.text}
                          </p>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                    {/* Year node */}
                    <div
                      className="flex items-center justify-center w-20 h-20 rounded-full flex-shrink-0 z-10"
                      style={{
                        background: "var(--color-forest)",
                        border: "2px solid var(--color-glacier)",
                      }}
                    >
                      <span
                        className="font-mono font-bold text-sm"
                        style={{ color: "var(--color-summit)" }}
                      >
                        {m.year}
                      </span>
                    </div>
                    <div
                      className={`flex-1 ${i % 2 !== 0 ? "md:text-left" : "md:text-right"}`}
                    >
                      {i % 2 !== 0 ? (
                        <div
                          className="p-5 rounded-2xl"
                          style={{
                            background: "rgba(77,168,199,0.08)",
                            border: "1px solid rgba(77,168,199,0.15)",
                          }}
                        >
                          <p
                            className="font-body text-sm leading-relaxed"
                            style={{ color: "var(--color-ash)" }}
                          >
                            {m.text}
                          </p>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GUIDES GRID ── */}
      <section
        className="section-padding"
        style={{ background: "var(--color-forest)" }}
        data-ocid="about.guides_section"
      >
        <div className="container-max">
          <div ref={guidesRef} className="reveal">
            <p
              className="font-mono text-xs tracking-[0.2em] uppercase mb-3 text-center"
              style={{ color: "var(--color-summit)" }}
            >
              The People Behind TrekRoot
            </p>
            <h2
              className="font-display font-bold text-center mb-4"
              style={{
                fontSize: "clamp(1.8rem,4vw,2.5rem)",
                color: "var(--color-snow)",
              }}
            >
              Meet Our Mountain Experts
            </h2>
            <p
              className="text-center font-body mb-14"
              style={{ color: "rgba(245,242,236,0.65)" }}
            >
              Local guides with deep roots in the Himalayas — every one of them
              was born and raised near the trails they lead.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {GUIDES.map((g, i) => (
                <div
                  key={g.name}
                  className="p-6 flex flex-col items-center text-center"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "var(--radius-card)",
                    backdropFilter: "blur(10px)",
                  }}
                  data-ocid={`about.guide.${i + 1}`}
                >
                  {/* Avatar */}
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold mb-4 flex-shrink-0"
                    style={{
                      background: g.color,
                      color: "var(--color-midnight)",
                    }}
                  >
                    {g.avatar}
                  </div>
                  <h3
                    className="font-ui font-bold text-base mb-1"
                    style={{ color: "var(--color-snow)" }}
                  >
                    {g.name}
                  </h3>
                  <p
                    className="font-mono text-xs tracking-wider mb-1"
                    style={{ color: "var(--color-glacier)" }}
                  >
                    {g.role.toUpperCase()}
                  </p>
                  <p
                    className="font-mono text-xs mb-4"
                    style={{ color: "var(--color-summit)" }}
                  >
                    {g.years} Years Experience
                  </p>
                  <p
                    className="font-body text-sm italic leading-relaxed"
                    style={{ color: "rgba(212,207,200,0.8)" }}
                  >
                    &ldquo;{g.quote}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section
        className="section-padding"
        style={{ background: "var(--color-snow)" }}
        data-ocid="about.philosophy_section"
      >
        <div className="container-max">
          <div ref={philosophyRef} className="reveal">
            <p
              className="font-mono text-xs tracking-[0.2em] uppercase mb-3 text-center"
              style={{ color: "var(--color-glacier)" }}
            >
              What We Stand For
            </p>
            <h2
              className="font-display font-bold text-center mb-14"
              style={{
                fontSize: "clamp(1.8rem,4vw,2.5rem)",
                color: "var(--color-midnight)",
              }}
            >
              Our Philosophy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PHILOSOPHY.map((p, i) => (
                <div
                  key={p.title}
                  className="text-center p-8"
                  style={{
                    background: "white",
                    borderRadius: "var(--radius-card)",
                    boxShadow: "0 4px 24px rgba(10,14,26,0.08)",
                  }}
                  data-ocid={`about.philosophy.${i + 1}`}
                >
                  <div className="text-5xl mb-5">{p.icon}</div>
                  <h3
                    className="font-display font-bold text-xl mb-4"
                    style={{ color: "var(--color-midnight)" }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: "#4a4540" }}
                  >
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section
        className="section-padding"
        style={{ background: "var(--color-midnight)" }}
        data-ocid="about.certs_section"
      >
        <div className="container-max">
          <div ref={certsRef} className="reveal text-center">
            <p
              className="font-mono text-xs tracking-[0.2em] uppercase mb-3"
              style={{ color: "var(--color-glacier)" }}
            >
              Trusted & Certified
            </p>
            <h2
              className="font-display font-bold mb-12"
              style={{
                fontSize: "clamp(1.8rem,4vw,2.5rem)",
                color: "var(--color-snow)",
              }}
            >
              Certifications & Partnerships
            </h2>
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {CERTS.map((c) => (
                <div
                  key={c.name}
                  className="px-8 py-5"
                  style={{
                    background: "rgba(77,168,199,0.08)",
                    border: "1px solid rgba(77,168,199,0.2)",
                    borderRadius: "12px",
                  }}
                >
                  <p
                    className="font-ui font-bold text-sm mb-1"
                    style={{ color: "var(--color-summit)" }}
                  >
                    {c.name}
                  </p>
                  <p
                    className="font-mono text-xs"
                    style={{ color: "var(--color-ash)" }}
                  >
                    {c.sub}
                  </p>
                </div>
              ))}
            </div>
            <p
              className="font-body text-sm"
              style={{ color: "rgba(212,207,200,0.6)" }}
            >
              Also partnered with: Uttarakhand Tourism · Himachal Pradesh
              Tourism · GMVNL · KMVN
            </p>
          </div>
        </div>
      </section>

      <NewsletterFooter />
    </div>
  );
}
