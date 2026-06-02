import { useEffect, useRef, useState } from "react";
import Navigation from "../components/Navigation";
import NewsletterFooter from "../components/NewsletterFooter";
import { treks } from "../data/treks";

// ── Trek + Yatra interest dropdown options ─────────────────────
const TREK_OPTIONS = [
  "Roopkund Trek",
  "Valley of Flowers Trek",
  "Kedarkantha Trek",
  "Har Ki Dun Trek",
  "Brahmatal Trek",
  "Kuari Pass Trek",
  "Hampta Pass Trek",
  "Pin Parvati Pass Trek",
  "Bhrigu Lake Trek",
  "Triund Trek",
  "Pindari Glacier Trek",
  "Milam Glacier Trek",
  "Kheerganga Trek",
  "Indrahar Pass Trek",
  "Shrikhand Mahadev Trek",
];
const YATRA_OPTIONS = [
  "Char Dham Yatra",
  "Do Dham Yatra",
  "Kedarnath Yatra",
  "Badrinath Yatra",
  "Gangotri Yatra",
  "Yamunotri Yatra",
  "Adi Kailash & Om Parvat",
  "Hemkund Sahib Yatra",
  "Manimahesh Yatra",
  "Shrikhand Mahadev Yatra",
  "Kinner Kailash Yatra",
  "Panch Kedar Yatra",
];

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  callTime: string;
}

export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact TrekRoot | Get in Touch | Dehradun";
  }, []);

  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
    callTime: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
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
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const inputClass =
    "w-full rounded px-4 py-3 text-sm font-ui transition-smooth focus:outline-none focus:ring-2";
  const inputStyle = {
    background: "rgba(10,14,26,0.6)",
    border: "1px solid rgba(77,168,199,0.25)",
    color: "var(--color-snow)",
    borderRadius: "8px",
  };
  const inputFocusStyle = {
    "--tw-ring-color": "rgba(77,168,199,0.4)",
  } as React.CSSProperties;

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-midnight)" }}
      data-ocid="contact.page"
    >
      <Navigation />

      {/* HERO */}
      <section
        ref={heroRef}
        className="pt-24 pb-14 px-6"
        style={{ background: "var(--color-midnight)" }}
        data-ocid="contact.hero"
      >
        <div className="container-max">
          <p
            className="font-mono text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: "var(--color-glacier)" }}
          >
            Reach Out
          </p>
          <h1
            className="font-display font-bold mb-4"
            style={{
              fontSize: "clamp(2rem,5vw,3.5rem)",
              color: "var(--color-snow)",
            }}
          >
            Get in Touch
          </h1>
          <p
            className="font-body italic text-xl"
            style={{ color: "var(--color-ash)" }}
          >
            We’re based in Dehradun. Our team lives in the mountains.
          </p>
        </div>
      </section>

      {/* SPLIT LAYOUT */}
      <section
        className="pb-16 px-6"
        style={{ background: "var(--color-snow)" }}
        data-ocid="contact.main"
      >
        <div className="container-max">
          <div
            ref={formRef}
            className="reveal grid grid-cols-1 lg:grid-cols-5 gap-10 pt-12"
          >
            {/* LEFT — FORM */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div
                  className="p-10 rounded-2xl text-center"
                  style={{ background: "var(--color-forest)" }}
                  data-ocid="contact.success_state"
                >
                  <div className="text-6xl mb-4">✅</div>
                  <h3
                    className="font-display font-bold text-2xl mb-3"
                    style={{ color: "var(--color-snow)" }}
                  >
                    Message Received!
                  </h3>
                  <p
                    className="font-body text-lg mb-6"
                    style={{ color: "rgba(245,242,236,0.8)" }}
                  >
                    Thank you! We’ll be in touch within 24 hours.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <a
                      href={`https://wa.me/919876543210?text=${encodeURIComponent("Hi! I just sent a contact form enquiry. Can we chat?")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-cta font-ui flex items-center gap-2"
                      data-ocid="contact.whatsapp_followup_button"
                    >
                      💬 Chat on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: "",
                          email: "",
                          phone: "",
                          interest: "",
                          message: "",
                          callTime: "",
                        });
                      }}
                      className="btn-secondary font-ui"
                      data-ocid="contact.send_another_button"
                    >
                      Send Another
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="p-8 rounded-2xl"
                  style={{
                    background: "white",
                    boxShadow: "0 4px 32px rgba(10,14,26,0.10)",
                  }}
                >
                  <h2
                    className="font-display font-bold text-2xl mb-2"
                    style={{ color: "var(--color-midnight)" }}
                  >
                    Send Us a Message
                  </h2>
                  <p
                    className="font-body text-sm mb-6"
                    style={{ color: "#666" }}
                  >
                    Fill out the form and our team will respond within 24 hours.
                  </p>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    data-ocid="contact.form"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="c-name"
                          className="block font-ui text-sm font-medium mb-1.5"
                          style={{ color: "var(--color-midnight)" }}
                        >
                          Full Name{" "}
                          <span style={{ color: "var(--color-ember)" }}>*</span>
                        </label>
                        <input
                          id="c-name"
                          type="text"
                          required
                          placeholder="Arjun Sharma"
                          value={form.name}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, name: e.target.value }))
                          }
                          className={inputClass}
                          style={{
                            ...inputStyle,
                            ...inputFocusStyle,
                            background: "#f7f7f5",
                            color: "var(--color-midnight)",
                          }}
                          data-ocid="contact.name_input"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="c-email"
                          className="block font-ui text-sm font-medium mb-1.5"
                          style={{ color: "var(--color-midnight)" }}
                        >
                          Email Address{" "}
                          <span style={{ color: "var(--color-ember)" }}>*</span>
                        </label>
                        <input
                          id="c-email"
                          type="email"
                          required
                          placeholder="arjun@gmail.com"
                          value={form.email}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, email: e.target.value }))
                          }
                          className={inputClass}
                          style={{
                            ...inputStyle,
                            ...inputFocusStyle,
                            background: "#f7f7f5",
                            color: "var(--color-midnight)",
                          }}
                          data-ocid="contact.email_input"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="c-phone"
                          className="block font-ui text-sm font-medium mb-1.5"
                          style={{ color: "var(--color-midnight)" }}
                        >
                          WhatsApp / Phone
                        </label>
                        <input
                          id="c-phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, phone: e.target.value }))
                          }
                          className={inputClass}
                          style={{
                            ...inputStyle,
                            ...inputFocusStyle,
                            background: "#f7f7f5",
                            color: "var(--color-midnight)",
                          }}
                          data-ocid="contact.phone_input"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="c-call"
                          className="block font-ui text-sm font-medium mb-1.5"
                          style={{ color: "var(--color-midnight)" }}
                        >
                          Best Time to Call
                        </label>
                        <select
                          id="c-call"
                          value={form.callTime}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, callTime: e.target.value }))
                          }
                          className={inputClass}
                          style={{
                            ...inputStyle,
                            ...inputFocusStyle,
                            background: "#f7f7f5",
                            color: "var(--color-midnight)",
                          }}
                          data-ocid="contact.call_time_select"
                        >
                          <option value="">Select a time slot</option>
                          <option value="morning">Morning 8–11am</option>
                          <option value="afternoon">Afternoon 12–3pm</option>
                          <option value="evening">Evening 5–8pm</option>
                          <option value="anytime">Anytime</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="c-interest"
                        className="block font-ui text-sm font-medium mb-1.5"
                        style={{ color: "var(--color-midnight)" }}
                      >
                        Trek / Yatra I’m Interested In
                      </label>
                      <select
                        id="c-interest"
                        value={form.interest}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, interest: e.target.value }))
                        }
                        className={inputClass}
                        style={{
                          ...inputStyle,
                          ...inputFocusStyle,
                          background: "#f7f7f5",
                          color: "var(--color-midnight)",
                        }}
                        data-ocid="contact.interest_select"
                      >
                        <option value="">Select a trek or yatra…</option>
                        <optgroup label="— Popular Treks —">
                          {TREK_OPTIONS.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="— Sacred Yatras —">
                          {YATRA_OPTIONS.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </optgroup>
                        <option value="custom">Custom / Not sure yet</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="c-msg"
                        className="block font-ui text-sm font-medium mb-1.5"
                        style={{ color: "var(--color-midnight)" }}
                      >
                        Message{" "}
                        <span style={{ color: "var(--color-ember)" }}>*</span>
                      </label>
                      <textarea
                        id="c-msg"
                        required
                        rows={5}
                        placeholder="Tell us your dream trek dates, group size, any questions…"
                        value={form.message}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, message: e.target.value }))
                        }
                        className={`${inputClass} resize-none`}
                        style={{
                          ...inputStyle,
                          ...inputFocusStyle,
                          background: "#f7f7f5",
                          color: "var(--color-midnight)",
                        }}
                        data-ocid="contact.message_textarea"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-cta font-ui flex items-center gap-2 disabled:opacity-60"
                      data-ocid="contact.submit_button"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />{" "}
                          Sending…
                        </>
                      ) : (
                        <>✉️ Send Message</>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* RIGHT — INFO */}
            <div className="lg:col-span-2 space-y-5">
              {/* Office card */}
              <div
                className="p-7 rounded-2xl"
                style={{
                  background: "var(--color-midnight)",
                  border: "1px solid rgba(77,168,199,0.15)",
                }}
              >
                <h3
                  className="font-display font-bold text-xl mb-6"
                  style={{ color: "var(--color-snow)" }}
                >
                  TrekRoot HQ
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: "🏔️",
                      label: "Address",
                      val: "Rajpur Road, Dehradun, Uttarakhand 248001",
                    },
                    {
                      icon: "📞",
                      label: "Phone",
                      val: "+91-XXXXXXXXXX (9am–7pm, Mon–Sat)",
                    },
                    { icon: "📧", label: "Email", val: "namaste@trekroot.in" },
                    {
                      icon: "💬",
                      label: "WhatsApp",
                      val: "Available 24/7 for trek emergencies",
                    },
                  ].map((row) => (
                    <div key={row.label} className="flex gap-3">
                      <span className="text-xl flex-shrink-0">{row.icon}</span>
                      <div>
                        <p
                          className="font-mono text-[10px] uppercase tracking-wider mb-0.5"
                          style={{ color: "var(--color-glacier)" }}
                        >
                          {row.label}
                        </p>
                        <p
                          className="font-ui text-sm"
                          style={{ color: "var(--color-ash)" }}
                        >
                          {row.val}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Office hours */}
                <div
                  className="mt-6 pt-5"
                  style={{ borderTop: "1px solid rgba(77,168,199,0.12)" }}
                >
                  <p
                    className="font-mono text-[10px] uppercase tracking-wider mb-3"
                    style={{ color: "var(--color-glacier)" }}
                  >
                    Office Hours
                  </p>
                  <table className="w-full text-sm font-ui">
                    <tbody>
                      {[
                        ["Mon – Fri", "9:00 AM – 7:00 PM"],
                        ["Saturday", "9:00 AM – 5:00 PM"],
                        ["Sunday", "Closed"],
                      ].map(([d, h]) => (
                        <tr key={d}>
                          <td
                            className="py-1 pr-4"
                            style={{ color: "var(--color-ash)" }}
                          >
                            {d}
                          </td>
                          <td
                            className="py-1"
                            style={{
                              color:
                                d === "Sunday"
                                  ? "var(--color-ember)"
                                  : "var(--color-snow)",
                            }}
                          >
                            {h}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Map placeholder */}
              <div
                className="rounded-2xl overflow-hidden flex flex-col items-center justify-center"
                style={{
                  height: 200,
                  background: "rgba(27,58,45,0.8)",
                  border: "1px solid rgba(77,168,199,0.15)",
                }}
              >
                <p
                  className="font-mono text-xs mb-3"
                  style={{ color: "var(--color-summit)" }}
                >
                  📍 TrekRoot Office — Rajpur Road, Dehradun
                </p>
                <a
                  href="https://maps.google.com/?q=Rajpur+Road+Dehradun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary font-ui text-xs"
                  data-ocid="contact.map_link"
                >
                  Find us on Google Maps →
                </a>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/919876543210?text=${encodeURIComponent("Hi! I'm interested in booking a trek/yatra. Please help me.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl transition-smooth hover:opacity-90"
                style={{ background: "#25D366" }}
                data-ocid="contact.whatsapp_cta_button"
              >
                <span className="text-3xl">💬</span>
                <div>
                  <p className="font-ui font-bold text-white text-sm">
                    Chat with a Trek Expert
                  </p>
                  <p
                    className="font-mono text-xs"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    Usually responds within minutes
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* EMERGENCY STRIP */}
      <div
        className="py-5 px-6 text-center"
        style={{ background: "var(--color-ember)" }}
        data-ocid="contact.emergency_strip"
      >
        <p className="font-ui font-bold text-white text-sm md:text-base">
          🆘 Trek Emergency Line: +91-XXXXXXXXXX &nbsp;·&nbsp; Available 24/7,
          staffed by certified mountain guides
        </p>
      </div>

      {/* Popular treks quick links */}
      <section
        className="py-12 px-6"
        style={{ background: "var(--color-midnight)" }}
        data-ocid="contact.popular_treks"
      >
        <div className="container-max">
          <h2
            className="font-display font-bold text-xl mb-6"
            style={{ color: "var(--color-snow)" }}
          >
            Browse Popular Treks
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {treks.slice(0, 8).map((t, i) => (
              <a
                key={t.slug}
                href={`/treks/${t.slug}`}
                className="flex items-center justify-between p-4 rounded-xl group transition-smooth hover:opacity-80"
                style={{
                  background: "rgba(77,168,199,0.06)",
                  border: "1px solid rgba(77,168,199,0.12)",
                }}
                data-ocid={`contact.trek_link.${i + 1}`}
              >
                <div className="min-w-0">
                  <p
                    className="font-ui text-sm font-medium truncate"
                    style={{ color: "var(--color-snow)" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="font-mono text-[10px]"
                    style={{ color: "var(--color-glacier)" }}
                  >
                    {t.duration}
                  </p>
                </div>
                <span
                  className="font-ui font-bold text-xs ml-2 flex-shrink-0"
                  style={{ color: "var(--color-summit)" }}
                >
                  ₹{t.price.toLocaleString("en-IN")}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <NewsletterFooter />
    </div>
  );
}
