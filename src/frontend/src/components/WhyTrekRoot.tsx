import { useEffect, useRef } from "react";

const pillars = [
  {
    icon: "👥",
    title: "Small Groups (Max 15)",
    desc: "Intimate, safe, and more personal. Small groups mean better bonding and individual attention from guides.",
  },
  {
    icon: "📅",
    title: "Scheduled Departures",
    desc: "Every week, all year round. Fixed departure dates so you can plan your adventure with confidence.",
  },
  {
    icon: "🏕️",
    title: "Comfortable Stays",
    desc: "Camping & homestay options. Clean tents, warm sleeping bags, and hygienic campsites at every halt.",
  },
  {
    icon: "📵",
    title: "Disconnect to Connect",
    desc: "Digital detox in the Himalayas. Leave screens behind and reconnect with nature and yourself.",
  },
  {
    icon: "🌿",
    title: "Leave No Trace",
    desc: "Zero waste, eco-certified treks. We carry back all waste and leave the mountains cleaner than we found them.",
  },
  {
    icon: "♻️",
    title: "Sustainable Tourism",
    desc: "Carbon-neutral trek program. Supporting local communities and preserving Himalayan ecosystems.",
  },
  {
    icon: "🍲",
    title: "Hygienic Food",
    desc: "Nutritious vegetarian meals, 3 times daily. Freshly cooked at camp with local ingredients.",
  },
  {
    icon: "🛡️",
    title: "Safety-First",
    desc: "Oxygen cylinder, first aid, evacuation protocol. ATOAI-certified safety standards on every trek.",
  },
];

const certifications = [
  { acronym: "MSME", full: "Udyam Registration — Govt of India" },
  { acronym: "Startup India", full: "DPIIT Recognized Startup" },
  { acronym: "ATOAI", full: "Adventure Tour Operators Association of India" },
  { acronym: "UK Tourism", full: "Uttarakhand Tourism Certified" },
];

export default function WhyTrekRoot() {
  const pillarsRef = useRef<HTMLDivElement[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

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
    for (const el of pillarsRef.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ background: "var(--color-snow)" }}
      aria-label="Why Indian Treks"
    >
      {/* Split Layout */}
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        {/* LEFT — Mountain image with overlay */}
        <div
          className="relative lg:w-1/2 min-h-[400px] lg:min-h-[600px] flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1469521667108-eed3154f0168?auto=format&fit=crop&w=800&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(10,14,26,0.6)" }}
          />

          {/* Content */}
          <div className="relative z-10 text-center px-8">
            <p
              className="font-mono uppercase tracking-[0.2em] mb-3"
              style={{ fontSize: "13px", color: "var(--color-glacier)" }}
            >
              Since 2015
            </p>
            <h2
              className="font-display font-bold text-white mb-5"
              style={{ fontSize: "clamp(36px, 5vw, 48px)", lineHeight: 1.1 }}
            >
              Himalayan Expertise
            </h2>
            <hr
              className="mx-auto mb-5 border-0"
              style={{
                width: "60px",
                height: "2px",
                background: "var(--color-summit)",
              }}
            />
            <p
              className="font-ui mb-1"
              style={{ fontSize: "20px", color: "var(--color-ash)" }}
            >
              Dehradun, Uttarakhand.
            </p>
            <p
              className="font-ui italic"
              style={{ fontSize: "20px", color: "var(--color-ash)" }}
            >
              ATOAI Certified.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-12 mt-10">
              <div className="text-center">
                <p
                  className="font-display font-bold leading-none"
                  style={{ fontSize: "48px", color: "var(--color-summit)" }}
                >
                  50,000+
                </p>
                <p
                  className="font-mono mt-1"
                  style={{
                    fontSize: "12px",
                    color: "var(--color-ash)",
                    letterSpacing: "0.08em",
                  }}
                >
                  Happy Trekkers
                </p>
              </div>
              <div className="text-center">
                <p
                  className="font-display font-bold leading-none"
                  style={{ fontSize: "48px", color: "var(--color-summit)" }}
                >
                  35+
                </p>
                <p
                  className="font-mono mt-1"
                  style={{
                    fontSize: "12px",
                    color: "var(--color-ash)",
                    letterSpacing: "0.08em",
                  }}
                >
                  Himalayan Treks
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Trust pillars */}
        <div
          className="lg:w-1/2 flex flex-col justify-center bg-white"
          style={{ padding: "48px" }}
        >
          <p className="font-mono uppercase tracking-[0.15em] mb-2 text-green-600 text-[12px]">
            Built on trust
          </p>
          <h2
            className="font-display font-bold text-gray-900 mb-2"
            style={{ fontSize: "36px", lineHeight: 1.2 }}
          >
            Why Indian Treks?
          </h2>
          <p className="font-body italic mb-8 text-gray-500 text-[16px]">
            India's most trusted trekking company since 2015
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                ref={(el) => {
                  if (el) pillarsRef.current[i] = el;
                }}
                className="reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
                data-ocid={`why_indiantreks.pillar.${i + 1}`}
              >
                <div className="h-full rounded-xl p-5 transition-all duration-300 cursor-default bg-white border border-gray-100 hover:border-green-300 hover:-translate-y-1">
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-100 text-green-700 text-2xl mb-3"
                    aria-hidden="true"
                  >
                    {p.icon}
                  </div>
                  <h3
                    className="font-ui font-bold text-gray-900 mb-2"
                    style={{ fontSize: "15px" }}
                  >
                    {p.title}
                  </h3>
                  <p className="font-body leading-relaxed text-gray-600 text-[13px]">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM BAR — Certifications */}
      <div
        className="bg-green-600"
        style={{ padding: "32px 0" }}
        data-ocid="why_indiantreks.certifications"
      >
        <div className="container-max">
          <div className="flex flex-wrap justify-center items-center gap-y-6">
            {certifications.map((cert, i) => (
              <div key={cert.acronym} className="flex items-center">
                <div className="text-center px-8 lg:px-12">
                  <p className="font-mono font-bold text-white text-[20px] tracking-[0.05em]">
                    {cert.acronym}
                  </p>
                  <p className="font-ui mt-1 text-green-100 text-[11px] max-w-[160px]">
                    {cert.full}
                  </p>
                </div>
                {i < certifications.length - 1 && (
                  <div
                    className="hidden sm:block self-stretch w-px bg-green-400/30"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
