import { Link } from "@tanstack/react-router";
import { useState } from "react";

// Social icon components
function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <title>Instagram</title>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <title>YouTube</title>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <title>Facebook</title>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const popularTreks = [
  { label: "Roopkund Trek", to: "/treks/roopkund" },
  { label: "Valley of Flowers Trek", to: "/treks/valley-of-flowers" },
  { label: "Kedarkantha Trek", to: "/treks/kedarkantha" },
  { label: "Har Ki Dun Trek", to: "/treks/har-ki-dun" },
  { label: "Brahmatal Trek", to: "/treks/brahmatal" },
  { label: "Hampta Pass Trek", to: "/treks/hampta-pass" },
  { label: "Pin Parvati Pass", to: "/treks/pin-parvati-pass" },
  { label: "Triund Trek", to: "/treks/triund" },
];

const sacredYatras = [
  { label: "Char Dham Yatra", to: "/yatras" },
  { label: "Kedarnath Yatra", to: "/yatras" },
  { label: "Adi Kailash & Om Parvat", to: "/yatras" },
  { label: "Manimahesh Yatra", to: "/yatras" },
  { label: "Hemkund Sahib Yatra", to: "/yatras" },
  { label: "Shrikhand Mahadev", to: "/yatras" },
];

const companyLinks = [
  { label: "About TrekRoot", to: "/about" },
  { label: "Our Guides", to: "/about#guides" },
  { label: "Responsible Trekking", to: "/about#responsibility" },
  { label: "Safety Standards", to: "/about#safety" },
  { label: "Partner With Us", to: "/contact" },
  { label: "Careers", to: "/contact" },
  { label: "Press Kit", to: "/about" },
  { label: "Blog", to: "/blog" },
];

const supportLinks = [
  { label: "How to Book", to: "/book" },
  { label: "Cancellation Policy", to: "/about#cancellation" },
  { label: "Trek FAQs", to: "/treks" },
  { label: "What to Expect", to: "/about" },
  { label: "Group Bookings", to: "/contact" },
  { label: "Custom Itineraries", to: "/plan" },
  { label: "Contact Us", to: "/contact" },
];

const paymentBadges = ["Visa", "Mastercard", "UPI", "Razorpay"];

export default function NewsletterFooter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  }

  return (
    <>
      {/* ── Newsletter ────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#276749", padding: "80px 0" }}
        aria-label="Newsletter signup"
      >
        <div className="container-max">
          <div className="max-w-2xl mx-auto text-center">
            {/* Label */}
            <p
              className="font-mono uppercase tracking-widest mb-4"
              style={{ fontSize: "12px", color: "var(--color-summit)" }}
            >
              STAY INFORMED
            </p>

            {/* Title */}
            <h2
              className="font-display font-bold text-white mb-4 leading-tight"
              style={{ fontSize: "clamp(32px, 5vw, 48px)" }}
            >
              Get Trek Alerts Before They Sell Out
            </h2>

            {/* Subtitle */}
            <p
              className="font-body mb-8"
              style={{
                fontSize: "18px",
                color: "rgba(212,207,200,0.8)",
                lineHeight: "1.6",
              }}
            >
              Early access to new routes, seasonal openings, and exclusive batch
              discounts.
            </p>

            {/* Form */}
            {submitted ? (
              <output
                className="font-ui font-semibold text-center py-4 block"
                style={{ color: "var(--color-summit)", fontSize: "18px" }}
              >
                Thank you! You&apos;re on the list.
              </output>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 justify-center mb-5"
                noValidate
              >
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-ocid="newsletter.input"
                  aria-label="Email address"
                  className="flex-1 font-ui transition-smooth"
                  style={{
                    fontSize: "15px",
                    padding: "14px 20px",
                    borderRadius: "4px",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "white",
                    outline: "none",
                    minWidth: 0,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--color-summit)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.2)";
                  }}
                />
                <button
                  type="submit"
                  className="font-ui font-semibold text-white transition-smooth"
                  data-ocid="newsletter.submit_button"
                  style={{
                    whiteSpace: "nowrap",
                    background: "#D4880E",
                    padding: "14px 28px",
                    borderRadius: "4px",
                    fontSize: "15px",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "#B7791F";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "#D4880E";
                  }}
                >
                  Subscribe
                </button>
              </form>
            )}

            {/* Social proof */}
            <p
              className="font-ui flex items-center justify-center gap-2 mb-2"
              style={{ fontSize: "14px", color: "rgba(212,207,200,0.7)" }}
            >
              <span style={{ color: "var(--color-summit)" }}>&#10003;</span>
              Join 45,000 mountain lovers already subscribed
            </p>

            {/* Privacy */}
            <p
              className="font-ui"
              style={{ fontSize: "13px", color: "rgba(212,207,200,0.5)" }}
            >
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer
        style={{ background: "#1C4532", padding: "80px 0 40px" }}
        aria-label="Site footer"
      >
        <div className="container-max">
          {/* 5-column grid */}
          <div
            className="grid gap-10"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            }}
          >
            {/* Col 1 — Branding */}
            <div className="col-span-1">
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-2 mb-3"
                style={{ textDecoration: "none" }}
                aria-label="TrekRoot home"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  aria-hidden="true"
                >
                  <polygon
                    points="16,3 29,26 3,26"
                    fill="var(--color-glacier)"
                    opacity="0.9"
                  />
                  <polygon
                    points="16,3 22,14 10,14"
                    fill="var(--color-summit)"
                    opacity="0.95"
                  />
                  <line
                    x1="16"
                    y1="26"
                    x2="16"
                    y2="20"
                    stroke="white"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                </svg>
                <span
                  className="font-display font-bold"
                  style={{ fontSize: "22px", color: "white" }}
                >
                  TrekRoot
                </span>
              </Link>

              <p
                className="font-body italic mb-4"
                style={{
                  fontSize: "14px",
                  color: "#D1FAE5",
                  lineHeight: "1.5",
                }}
              >
                Born in the Himalayas. Built for adventurers.
              </p>
              <address
                className="not-italic"
                style={{ fontSize: "13px", lineHeight: "1.8" }}
              >
                <p className="font-ui" style={{ color: "#D1FAE5" }}>
                  Narayan Vihar Kargi Chowk, Dehradun,
                  <br />
                  Uttarakhand 248121
                </p>
                <a
                  href="tel:+917300900108"
                  className="font-ui block transition-smooth"
                  style={{
                    color: "#FDE68A",
                    textDecoration: "none",
                  }}
                >
                  +91-7300900108
                </a>
                <a
                  href="tel:+917310954451"
                  className="font-ui block transition-smooth"
                  style={{
                    color: "#FDE68A",
                    textDecoration: "none",
                  }}
                >
                  +91-7310954451
                </a>
                <a
                  href="mailto:info@indiantreks.in"
                  className="font-ui block transition-smooth"
                  style={{
                    color: "#FDE68A",
                    textDecoration: "none",
                  }}
                >
                  info@indiantreks.in
                </a>
              </address>

              {/* Social icons */}
              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <a
                  href="https://instagram.com/indiantreks"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Indian Treks on Instagram"
                  className="transition-smooth"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "8px",
                    background: "#276749",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#A7F3D0",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "scale(1.1)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                    (e.currentTarget as HTMLElement).style.color = "#A7F3D0";
                  }}
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://youtube.com/@indiantreks"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Indian Treks on YouTube"
                  className="transition-smooth"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "8px",
                    background: "#276749",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#A7F3D0",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "scale(1.1)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                    (e.currentTarget as HTMLElement).style.color = "#A7F3D0";
                  }}
                >
                  <YouTubeIcon />
                </a>
                <a
                  href="https://facebook.com/indiantreks"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Indian Treks on Facebook"
                  className="transition-smooth"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "8px",
                    background: "#276749",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#A7F3D0",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "scale(1.1)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                    (e.currentTarget as HTMLElement).style.color = "#A7F3D0";
                  }}
                >
                  <FacebookIcon />
                </a>
                <a
                  href="https://quora.com/profile/indiantreks"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Indian Treks on Quora"
                  className="transition-smooth"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "8px",
                    background: "#276749",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#A7F3D0",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "scale(1.1)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                    (e.currentTarget as HTMLElement).style.color = "#A7F3D0";
                  }}
                >
                  <span className="sr-only">Quora</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <title>Quora</title>
                    <path d="M12.07 0C5.38 0 .09 4.91.09 11.07c0 4.4 2.89 8.22 7.26 10.05.35.13.6.06.78-.2.17-.25.7-1.04.87-1.3.17-.25.1-.5-.09-.65-1.87-1.4-2.98-3.5-2.98-5.9 0-4.22 3.37-7.64 7.14-7.64 3.78 0 7.14 3.42 7.14 7.64 0 2.4-1.11 4.5-2.98 5.9-.19.15-.26.4-.09.65.17.26.7 1.05.87 1.3.18.26.43.33.78.2 4.37-1.83 7.26-5.65 7.26-10.05C24.05 4.91 18.76 0 12.07 0z" />
                  </svg>
                </a>
                <a
                  href="https://medium.com/@indiantreks"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Indian Treks on Medium"
                  className="transition-smooth"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "8px",
                    background: "#276749",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#A7F3D0",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "scale(1.1)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                    (e.currentTarget as HTMLElement).style.color = "#A7F3D0";
                  }}
                >
                  <span className="sr-only">Medium</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <title>Medium</title>
                    <path d="M0 0v24h24V0H0zm19.938 5.686L18.651 6.92a.376.376 0 0 0-.14.362v9.067a.376.376 0 0 0 .14.361l1.257 1.234v.271h-6.322v-.27l1.302-1.265c.128-.128.128-.165.128-.36V8.99l-3.62 9.195h-.49L6.69 8.99v6.163a.85.85 0 0 0 .233.707l1.694 2.054v.271H3.815v-.27L5.51 15.86a.82.82 0 0 0 .218-.707V8.027a.624.624 0 0 0-.203-.527L3.019 5.687v-.27h4.674l3.613 7.923 3.176-7.924h4.456v.001z" />
                  </svg>
                </a>
                <a
                  href="https://tripoto.com/profile/indiantreks"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Indian Treks on Tripoto"
                  className="transition-smooth"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "8px",
                    background: "#276749",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#A7F3D0",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "scale(1.1)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                    (e.currentTarget as HTMLElement).style.color = "#A7F3D0";
                  }}
                >
                  <span className="sr-only">Tripoto</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <title>Tripoto</title>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2 — Popular Treks */}
            <nav aria-label="Popular treks">
              <h3
                className="font-ui font-bold mb-4"
                style={{ fontSize: "15px", color: "white" }}
              >
                Popular Treks
              </h3>
              <ul
                className="space-y-2"
                style={{ listStyle: "none", padding: 0, margin: 0 }}
              >
                {popularTreks.map((t) => (
                  <li key={t.label}>
                    <Link
                      to={t.to}
                      className="font-ui transition-smooth"
                      style={{
                        fontSize: "14px",
                        color: "#D1FAE5",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "#D1FAE5";
                      }}
                    >
                      {t.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/all-treks"
                    className="font-ui transition-smooth"
                    style={{
                      fontSize: "14px",
                      color: "#FDE68A",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    View All Treks &#8594;
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Col 3 — Sacred Yatras */}
            <nav aria-label="Sacred yatras">
              <h3
                className="font-ui font-bold mb-4"
                style={{ fontSize: "15px", color: "white" }}
              >
                Sacred Yatras
              </h3>
              <ul
                className="space-y-2"
                style={{ listStyle: "none", padding: 0, margin: 0 }}
              >
                {sacredYatras.map((y) => (
                  <li key={y.label}>
                    <Link
                      to={y.to}
                      className="font-ui transition-smooth"
                      style={{
                        fontSize: "14px",
                        color: "#D1FAE5",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "#D1FAE5";
                      }}
                    >
                      {y.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/all-yatras"
                    className="font-ui transition-smooth"
                    style={{
                      fontSize: "14px",
                      color: "#FDE68A",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    View All Yatras &#8594;
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Col 4 — Company */}
            <nav aria-label="Company links">
              <h3
                className="font-ui font-bold mb-4"
                style={{ fontSize: "15px", color: "white" }}
              >
                Company
              </h3>
              <ul
                className="space-y-2"
                style={{ listStyle: "none", padding: 0, margin: 0 }}
              >
                {companyLinks.map((c) => (
                  <li key={c.label}>
                    <Link
                      to={c.to}
                      className="font-ui transition-smooth"
                      style={{
                        fontSize: "14px",
                        color: "#D1FAE5",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "#D1FAE5";
                      }}
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Col 5 — Support */}
            <nav aria-label="Support links">
              <h3
                className="font-ui font-bold mb-4"
                style={{ fontSize: "15px", color: "white" }}
              >
                Support
              </h3>
              <ul
                className="space-y-2"
                style={{ listStyle: "none", padding: 0, margin: 0 }}
              >
                {supportLinks.map((s) => (
                  <li key={s.label}>
                    <Link
                      to={s.to}
                      className="font-ui transition-smooth"
                      style={{
                        fontSize: "14px",
                        color: "#D1FAE5",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "#D1FAE5";
                      }}
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop: "1px solid #276749",
              paddingTop: "32px",
              marginTop: "40px",
            }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              {/* Copyright */}
              <p
                className="font-ui"
                style={{ fontSize: "13px", color: "#86EFAC" }}
              >
                &copy; {new Date().getFullYear()} Indian Treks &mdash; MSME
                &amp; Startup India Certified, Dehradun. All rights reserved.
              </p>

              {/* Made with love */}
              <p
                className="font-ui italic"
                style={{ fontSize: "13px", color: "#86EFAC" }}
              >
                Made with &#10084;&#65039; in the Himalayas
              </p>

              {/* Legal links */}
              <div className="flex items-center gap-4 flex-wrap justify-center">
                {["Privacy Policy", "Terms of Service", "Refund Policy"].map(
                  (label) => (
                    <a
                      key={label}
                      href="/about"
                      className="font-ui transition-smooth"
                      style={{
                        fontSize: "13px",
                        color: "#86EFAC",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "#86EFAC";
                      }}
                    >
                      {label}
                    </a>
                  ),
                )}
              </div>
            </div>

            {/* Payment badges */}
            <div className="flex items-center justify-center gap-3 mt-5 flex-wrap">
              {paymentBadges.map((badge) => (
                <span
                  key={badge}
                  className="font-mono"
                  style={{
                    fontSize: "11px",
                    color: "#86EFAC",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid #276749",
                    borderRadius: "4px",
                    padding: "4px 10px",
                    letterSpacing: "0.04em",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Caffeine branding */}
            <p
              className="font-ui text-center mt-6"
              style={{ fontSize: "12px", color: "rgba(134,239,172,0.5)" }}
            >
              &copy; {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.hostname : "",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#FDE68A",
                  textDecoration: "none",
                }}
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
