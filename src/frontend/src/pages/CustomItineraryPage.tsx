import { useEffect, useRef, useState } from "react";
import Navigation from "../components/Navigation";
import NewsletterFooter from "../components/NewsletterFooter";

// ── Step data ────────────────────────────────────────────────
const STEPS = [
  { num: 1, label: "Destination & Type" },
  { num: 2, label: "Preferences" },
  { num: 3, label: "Budget & Logistics" },
  { num: 4, label: "Your Details" },
];

const INTERESTS = [
  "Snow/Winter",
  "Glaciers",
  "Alpine Meadows",
  "Wildlife",
  "Photography",
  "Pilgrimage",
  "Family-Friendly",
  "Solo Trekker",
  "Corporate Group",
];

type RadioPillsProps = {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  name: string;
  ocidPrefix: string;
};
function RadioPills({
  options,
  value,
  onChange,
  name,
  ocidPrefix,
}: RadioPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <label key={opt} className="cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="sr-only"
          />
          <span
            className="inline-block px-5 py-2 font-ui text-sm font-medium transition-smooth"
            style={{
              borderRadius: "4px",
              border:
                value === opt
                  ? "2px solid var(--color-glacier)"
                  : "2px solid rgba(77,168,199,0.25)",
              background:
                value === opt
                  ? "var(--color-glacier)"
                  : "rgba(77,168,199,0.06)",
              color:
                value === opt ? "var(--color-midnight)" : "var(--color-snow)",
            }}
            data-ocid={`${ocidPrefix}.${opt.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`}
          >
            {opt}
          </span>
        </label>
      ))}
    </div>
  );
}

function ChipMulti({
  options,
  selected,
  onToggle,
  ocidPrefix,
}: {
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
  ocidPrefix: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          type="button"
          key={opt}
          onClick={() => onToggle(opt)}
          className="px-4 py-2 font-ui text-sm transition-smooth"
          style={{
            borderRadius: "4px",
            border: selected.includes(opt)
              ? "2px solid var(--color-summit)"
              : "2px solid rgba(232,197,71,0.25)",
            background: selected.includes(opt)
              ? "var(--color-summit)"
              : "rgba(232,197,71,0.06)",
            color: selected.includes(opt)
              ? "var(--color-midnight)"
              : "var(--color-snow)",
          }}
          data-ocid={`${ocidPrefix}.${opt.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function CustomItineraryPage() {
  useEffect(() => {
    document.title =
      "Plan Your Own Trek | Custom Himalayan Itinerary | TrekRoot";
  }, []);

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Step 1
  const [region, setRegion] = useState("");
  const [trekType, setTrekType] = useState("");
  // Step 2
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");
  const [groupSize, setGroupSize] = useState(2);
  const [interests, setInterests] = useState<string[]>([]);
  // Step 3
  const [budget, setBudget] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [startMonth, setStartMonth] = useState("");
  // Step 4
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [source, setSource] = useState("");

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = formRef.current;
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
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleInterest = (v: string) =>
    setInterests((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v],
    );

  const canNext = [
    region && trekType,
    difficulty && duration,
    budget && accommodation && startMonth,
    name && email && whatsapp,
  ];

  const inputCls =
    "w-full px-4 py-3 rounded font-ui text-sm focus:outline-none focus:ring-2 transition-smooth";
  const inputSt = {
    background: "rgba(10,14,26,0.4)",
    border: "1px solid rgba(77,168,199,0.25)",
    color: "var(--color-snow)",
    borderRadius: "8px",
  };

  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthOptions = [
    ...MONTHS.map((m) => `${m} 2025`),
    ...MONTHS.map((m) => `${m} 2026`),
  ];

  if (submitted) {
    return (
      <div
        className="min-h-screen"
        style={{ background: "var(--color-midnight)" }}
      >
        <Navigation />
        <div className="flex items-center justify-center min-h-[80vh] px-6">
          <div className="text-center max-w-lg">
            <div className="text-7xl mb-6 animate-bounce">✅</div>
            <h2
              className="font-display font-bold text-3xl mb-4"
              style={{ color: "var(--color-snow)" }}
            >
              Your request has been received!
            </h2>
            <p
              className="font-body text-lg mb-3"
              style={{ color: "var(--color-ash)" }}
            >
              Our trek expert{" "}
              <strong style={{ color: "var(--color-summit)" }}>
                Ravi Raturi
              </strong>{" "}
              will call you within 24 hours with a personalised itinerary
              crafted just for you.
            </p>
            <p
              className="font-body text-sm mb-8"
              style={{ color: "rgba(212,207,200,0.6)" }}
            >
              Check your WhatsApp for a confirmation message.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={`https://wa.me/919876543210?text=${encodeURIComponent("Hi! I just submitted a custom itinerary request. Excited to hear back!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta font-ui"
                data-ocid="plan.whatsapp_button"
              >
                💬 Chat on WhatsApp
              </a>
              <a
                href="/"
                className="btn-secondary font-ui"
                data-ocid="plan.home_button"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-midnight)" }}
      data-ocid="plan.page"
    >
      <Navigation />

      {/* Hero */}
      <section
        className="pt-20 pb-12 px-6"
        style={{ background: "var(--color-forest)" }}
        data-ocid="plan.hero"
      >
        <div className="container-max text-center">
          <p
            className="font-mono text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: "var(--color-summit)" }}
          >
            Personalised for You
          </p>
          <h1
            className="font-display font-bold mb-4"
            style={{ fontSize: "clamp(1.8rem,5vw,3rem)", color: "white" }}
          >
            Plan Your Custom Himalayan Journey
          </h1>
          <p
            className="font-body text-lg"
            style={{ color: "rgba(245,242,236,0.75)" }}
          >
            Tell us your dream. Our experts craft your perfect itinerary.
          </p>
        </div>
      </section>

      {/* Form */}
      <section
        className="section-padding px-6"
        style={{ background: "var(--color-snow)" }}
      >
        <div className="container-max">
          <div
            ref={formRef}
            className="reveal mx-auto"
            style={{ maxWidth: 700 }}
          >
            {/* Progress bar */}
            <div
              className="flex items-center gap-0 mb-10"
              data-ocid="plan.steps_indicator"
            >
              {STEPS.map((s, i) => (
                <div
                  key={s.num}
                  className="flex items-center flex-1 last:flex-none"
                >
                  <div
                    className="flex flex-col items-center gap-1 cursor-pointer"
                    onClick={() => step > s.num && setStep(s.num)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && step > s.num && setStep(s.num)
                    }
                    tabIndex={step > s.num ? 0 : -1}
                    aria-label={`Go to step ${s.num}: ${s.label}`}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-ui font-bold text-sm transition-smooth"
                      style={{
                        background:
                          step >= s.num
                            ? "var(--color-glacier)"
                            : "rgba(10,14,26,0.12)",
                        color: step >= s.num ? "var(--color-midnight)" : "#888",
                        border:
                          step === s.num
                            ? "3px solid var(--color-summit)"
                            : "3px solid transparent",
                      }}
                    >
                      {s.num}
                    </div>
                    <span
                      className="hidden sm:block font-mono text-[10px] text-center"
                      style={{
                        color: step >= s.num ? "var(--color-midnight)" : "#aaa",
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className="flex-1 h-1 mx-2 rounded"
                      style={{
                        background:
                          step > s.num
                            ? "var(--color-glacier)"
                            : "rgba(10,14,26,0.12)",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Card */}
            <div
              className="p-8 rounded-2xl"
              style={{
                background: "white",
                boxShadow: "0 4px 32px rgba(10,14,26,0.10)",
              }}
            >
              {/* Step 1 */}
              {step === 1 && (
                <div data-ocid="plan.step1">
                  <h2
                    className="font-display font-bold text-2xl mb-6"
                    style={{ color: "var(--color-midnight)" }}
                  >
                    Where &amp; What?
                  </h2>
                  <div className="mb-6">
                    <p
                      className="font-ui font-semibold text-sm mb-3"
                      style={{ color: "var(--color-midnight)" }}
                    >
                      Which region?{" "}
                      <span style={{ color: "var(--color-ember)" }}>*</span>
                    </p>
                    <RadioPills
                      options={["Uttarakhand", "Himachal Pradesh", "Both"]}
                      value={region}
                      onChange={setRegion}
                      name="region"
                      ocidPrefix="plan.region"
                    />
                  </div>
                  <div>
                    <p
                      className="font-ui font-semibold text-sm mb-3"
                      style={{ color: "var(--color-midnight)" }}
                    >
                      What type of trip?{" "}
                      <span style={{ color: "var(--color-ember)" }}>*</span>
                    </p>
                    <RadioPills
                      options={[
                        "Trekking",
                        "Pilgrimage Yatra",
                        "Both",
                        "Cultural + Trekking",
                      ]}
                      value={trekType}
                      onChange={setTrekType}
                      name="trek-type"
                      ocidPrefix="plan.type"
                    />
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div data-ocid="plan.step2">
                  <h2
                    className="font-display font-bold text-2xl mb-6"
                    style={{ color: "var(--color-midnight)" }}
                  >
                    Your Preferences
                  </h2>
                  <div className="mb-6">
                    <p
                      className="font-ui font-semibold text-sm mb-3"
                      style={{ color: "var(--color-midnight)" }}
                    >
                      Difficulty level{" "}
                      <span style={{ color: "var(--color-ember)" }}>*</span>
                    </p>
                    <RadioPills
                      options={["Easy", "Moderate", "Difficult", "Extreme"]}
                      value={difficulty}
                      onChange={setDifficulty}
                      name="difficulty"
                      ocidPrefix="plan.difficulty"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="p-duration"
                      className="font-ui font-semibold text-sm mb-2 block"
                      style={{ color: "var(--color-midnight)" }}
                    >
                      Duration{" "}
                      <span style={{ color: "var(--color-ember)" }}>*</span>
                    </label>
                    <select
                      id="p-duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className={inputCls}
                      style={{
                        ...inputSt,
                        background: "#f7f7f5",
                        color: "var(--color-midnight)",
                      }}
                      data-ocid="plan.duration_select"
                    >
                      <option value="">Select duration…</option>
                      <option value="2-3 days">2–3 days</option>
                      <option value="4-5 days">4–5 days</option>
                      <option value="6-8 days">6–8 days</option>
                      <option value="9-12 days">9–12 days</option>
                      <option value="2+ weeks">2+ weeks</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <p
                      className="font-ui font-semibold text-sm mb-3"
                      style={{ color: "var(--color-midnight)" }}
                    >
                      Group size
                    </p>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setGroupSize((g) => Math.max(1, g - 1))}
                        className="w-10 h-10 rounded-full font-bold text-xl flex items-center justify-center transition-smooth"
                        style={{
                          background: "var(--color-glacier)",
                          color: "var(--color-midnight)",
                        }}
                        data-ocid="plan.group_decrease_button"
                      >
                        -
                      </button>
                      <span
                        className="font-display font-bold text-3xl w-12 text-center"
                        style={{ color: "var(--color-midnight)" }}
                      >
                        {groupSize}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGroupSize((g) => Math.min(20, g + 1))}
                        className="w-10 h-10 rounded-full font-bold text-xl flex items-center justify-center transition-smooth"
                        style={{
                          background: "var(--color-glacier)",
                          color: "var(--color-midnight)",
                        }}
                        data-ocid="plan.group_increase_button"
                      >
                        +
                      </button>
                      <span
                        className="font-ui text-sm"
                        style={{ color: "#888" }}
                      >
                        people (max 20)
                      </span>
                    </div>
                  </div>
                  <div>
                    <p
                      className="font-ui font-semibold text-sm mb-3"
                      style={{ color: "var(--color-midnight)" }}
                    >
                      Specific interests
                    </p>
                    <ChipMulti
                      options={INTERESTS}
                      selected={interests}
                      onToggle={toggleInterest}
                      ocidPrefix="plan.interest"
                    />
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div data-ocid="plan.step3">
                  <h2
                    className="font-display font-bold text-2xl mb-6"
                    style={{ color: "var(--color-midnight)" }}
                  >
                    Budget &amp; Logistics
                  </h2>
                  <div className="mb-6">
                    <label
                      htmlFor="p-budget"
                      className="font-ui font-semibold text-sm mb-2 block"
                      style={{ color: "var(--color-midnight)" }}
                    >
                      Budget per person{" "}
                      <span style={{ color: "var(--color-ember)" }}>*</span>
                    </label>
                    <select
                      id="p-budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className={inputCls}
                      style={{
                        ...inputSt,
                        background: "#f7f7f5",
                        color: "var(--color-midnight)",
                      }}
                      data-ocid="plan.budget_select"
                    >
                      <option value="">Select a budget range…</option>
                      <option value="under-10k">Under ₹10,000</option>
                      <option value="10k-20k">₹10,000 – ₹20,000</option>
                      <option value="20k-30k">₹20,000 – ₹30,000</option>
                      <option value="above-30k">Above ₹30,000</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <p
                      className="font-ui font-semibold text-sm mb-3"
                      style={{ color: "var(--color-midnight)" }}
                    >
                      Accommodation preference{" "}
                      <span style={{ color: "var(--color-ember)" }}>*</span>
                    </p>
                    <RadioPills
                      options={[
                        "Tents only",
                        "Guesthouses/Homestays",
                        "Mix",
                        "Hotel + Camping",
                      ]}
                      value={accommodation}
                      onChange={setAccommodation}
                      name="accommodation"
                      ocidPrefix="plan.accom"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="p-month"
                      className="font-ui font-semibold text-sm mb-2 block"
                      style={{ color: "var(--color-midnight)" }}
                    >
                      Preferred start month{" "}
                      <span style={{ color: "var(--color-ember)" }}>*</span>
                    </label>
                    <select
                      id="p-month"
                      value={startMonth}
                      onChange={(e) => setStartMonth(e.target.value)}
                      className={inputCls}
                      style={{
                        ...inputSt,
                        background: "#f7f7f5",
                        color: "var(--color-midnight)",
                      }}
                      data-ocid="plan.month_select"
                    >
                      <option value="">Select a month…</option>
                      {monthOptions.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div data-ocid="plan.step4">
                  <h2
                    className="font-display font-bold text-2xl mb-6"
                    style={{ color: "var(--color-midnight)" }}
                  >
                    Your Contact Details
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="p-name"
                        className="block font-ui text-sm font-medium mb-1.5"
                        style={{ color: "var(--color-midnight)" }}
                      >
                        Full Name{" "}
                        <span style={{ color: "var(--color-ember)" }}>*</span>
                      </label>
                      <input
                        id="p-name"
                        type="text"
                        required
                        placeholder="Arjun Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputCls}
                        style={{
                          ...inputSt,
                          background: "#f7f7f5",
                          color: "var(--color-midnight)",
                        }}
                        data-ocid="plan.name_input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="p-email"
                        className="block font-ui text-sm font-medium mb-1.5"
                        style={{ color: "var(--color-midnight)" }}
                      >
                        Email Address{" "}
                        <span style={{ color: "var(--color-ember)" }}>*</span>
                      </label>
                      <input
                        id="p-email"
                        type="email"
                        required
                        placeholder="arjun@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputCls}
                        style={{
                          ...inputSt,
                          background: "#f7f7f5",
                          color: "var(--color-midnight)",
                        }}
                        data-ocid="plan.email_input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="p-wa"
                        className="block font-ui text-sm font-medium mb-1.5"
                        style={{ color: "var(--color-midnight)" }}
                      >
                        WhatsApp Number{" "}
                        <span style={{ color: "var(--color-ember)" }}>*</span>
                      </label>
                      <input
                        id="p-wa"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className={inputCls}
                        style={{
                          ...inputSt,
                          background: "#f7f7f5",
                          color: "var(--color-midnight)",
                        }}
                        data-ocid="plan.whatsapp_input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="p-source"
                        className="block font-ui text-sm font-medium mb-1.5"
                        style={{ color: "var(--color-midnight)" }}
                      >
                        How did you hear about us?
                      </label>
                      <select
                        id="p-source"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        className={inputCls}
                        style={{
                          ...inputSt,
                          background: "#f7f7f5",
                          color: "var(--color-midnight)",
                        }}
                        data-ocid="plan.source_select"
                      >
                        <option value="">Select…</option>
                        <option value="instagram">Instagram</option>
                        <option value="google">Google</option>
                        <option value="youtube">YouTube</option>
                        <option value="friend">Friend / Word of mouth</option>
                        <option value="travel-agent">Travel Agent</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div
                className="flex items-center justify-between mt-8 pt-6"
                style={{ borderTop: "1px solid rgba(10,14,26,0.1)" }}
              >
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="btn-secondary font-ui"
                    data-ocid="plan.back_button"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}
                {step < 4 ? (
                  <button
                    type="button"
                    disabled={!canNext[step - 1]}
                    onClick={() => setStep((s) => s + 1)}
                    className="btn-cta font-ui disabled:opacity-40 disabled:cursor-not-allowed"
                    data-ocid="plan.next_button"
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!canNext[3]}
                    onClick={() => setSubmitted(true)}
                    className="btn-cta font-ui disabled:opacity-40 disabled:cursor-not-allowed"
                    data-ocid="plan.submit_button"
                  >
                    Submit Request ✓
                  </button>
                )}
              </div>
            </div>

            {/* Trust note */}
            <p
              className="text-center font-mono text-xs mt-6"
              style={{ color: "rgba(10,14,26,0.4)" }}
            >
              🔒 Your data is private. We’ll never share it. No spam.
            </p>
          </div>
        </div>
      </section>

      <NewsletterFooter />
    </div>
  );
}
