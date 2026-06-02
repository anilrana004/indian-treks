import { Link, useNavigate } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
type DropdownMenu = "treks" | "yatras" | null;

// ─── Data ────────────────────────────────────────────────────────────────────
const TREK_LINKS = [
  { name: "Kedarkantha Trek", to: "/treks/kedarkantha-trek" },
  { name: "Dayara Bugyal", to: "/treks/dayara-bugyal-trek" },
  { name: "Har-Ki-Dun", to: "/treks/har-ki-dun-trek" },
  { name: "Hampta Pass", to: "/treks/hampta-pass-trek" },
  { name: "Roopkund", to: "/treks/roopkund-trek" },
  { name: "View All Treks", to: "/all-treks" },
];

const YATRA_LINKS = [
  { name: "Char Dham Yatra", to: "/yatras/char-dham-yatra" },
  { name: "Kedarnath Yatra", to: "/yatras/kedarnath-yatra" },
  { name: "Do Dham Yatra", to: "/yatras/do-dham-yatra" },
  { name: "Manimahesh Yatra", to: "/yatras/manimahesh-yatra" },
  { name: "View All Yatras", to: "/all-yatras" },
];

const NAV_LINKS = [
  { label: "Home", to: "/", hasDropdown: false },
  {
    label: "Treks",
    to: "/all-treks",
    hasDropdown: true,
    menu: "treks" as DropdownMenu,
  },
  {
    label: "Yatras",
    to: "/all-yatras",
    hasDropdown: true,
    menu: "yatras" as DropdownMenu,
  },
  { label: "About", to: "/about", hasDropdown: false },
  { label: "Blog", to: "/blog", hasDropdown: false },
  { label: "Contact", to: "/contact", hasDropdown: false },
];

// ─── Main Navigation ──────────────────────────────────────────────────────────
export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<DropdownMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  const _navigate = useNavigate();

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keyboard listeners
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function openDropdown(menu: DropdownMenu) {
    setDropdown(menu);
  }

  function closeDropdown() {
    setDropdown(null);
  }

  function toggleMobileAccordion(label: string) {
    setMobileAccordion((prev) => (prev === label ? null : label));
  }

  return (
    <>
      {/* ─── MAIN NAV ─────────────────────────────────────────── */}
      <header
        data-ocid="nav.primary"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          height: 80,
          backgroundColor: "#FFFFFF",
          boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between gap-6 max-w-7xl">
          {/* Logo */}
          <Link
            to="/"
            data-ocid="nav.logo_link"
            className="flex items-center gap-2 flex-shrink-0"
            aria-label="Indian Treks — Home"
          >
            <span className="text-2xl">⛰️</span>
            <span className="font-bold text-green-800 text-xl">
              Indian Treks
            </span>
          </Link>

          {/* Center nav links — desktop only */}
          <nav
            className="hidden md:flex items-center gap-1 flex-1 justify-center"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.hasDropdown && item.menu
                    ? openDropdown(item.menu)
                    : undefined
                }
                onMouseLeave={() =>
                  item.hasDropdown ? closeDropdown() : undefined
                }
              >
                <Link
                  to={item.to as "/"}
                  data-ocid={`nav.${item.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                  className="font-medium text-gray-700 hover:text-green-600 text-[15px] px-3 py-2 rounded flex items-center gap-1 transition-colors duration-200"
                >
                  {item.label}
                  {item.hasDropdown && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="currentColor"
                      className={`transition-transform duration-200 ${
                        dropdown === item.menu ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <path d="M6 8L1 3h10L6 8z" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown */}
                {item.hasDropdown && dropdown === item.menu && (
                  <div
                    className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
                    data-ocid={`nav.${item.menu}_dropdown`}
                  >
                    <div className="px-3 py-1.5 text-xs font-bold text-green-700 uppercase tracking-wider">
                      {item.menu === "treks"
                        ? "Popular Treks"
                        : "Sacred Yatras"}
                    </div>
                    {(item.menu === "treks" ? TREK_LINKS : YATRA_LINKS).map(
                      (link) => (
                        <Link
                          key={link.name}
                          to={link.to as "/"}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                          onClick={() => closeDropdown()}
                        >
                          {link.name}
                        </Link>
                      ),
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side — desktop */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <Link
              to="/book"
              data-ocid="nav.book_now_button"
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2 rounded-lg transition-colors duration-200 text-sm"
            >
              Book Now
            </Link>
          </div>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            data-ocid="nav.hamburger_button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="md:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 flex-shrink-0"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 origin-center ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                mobileOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 origin-center ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* ─── MOBILE MENU OVERLAY ─────────────────────────────────── */}
      <div
        data-ocid="nav.mobile_menu"
        className={`fixed inset-0 z-[150] transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-y-0" : "-translate-y-full pointer-events-none"
        }`}
        style={{ backgroundColor: "#FFFFFF" }}
        aria-label="Mobile navigation"
        aria-modal="true"
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Mobile header */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0"
            style={{ height: 80 }}
          >
            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={() => setMobileOpen(false)}
              aria-label="Indian Treks — Home"
            >
              <span className="text-2xl">⛰️</span>
              <span className="font-bold text-green-800 text-xl">
                Indian Treks
              </span>
            </Link>
            <button
              type="button"
              data-ocid="nav.mobile_close_button"
              aria-label="Close menu"
              className="w-11 h-11 flex items-center justify-center text-gray-700 text-2xl"
              onClick={() => setMobileOpen(false)}
            >
              ×
            </button>
          </div>

          {/* Accordion sections */}
          <div className="flex-1 px-6 py-4">
            {NAV_LINKS.map((item) => (
              <div
                key={item.label}
                className="border-b border-gray-100 last:border-0"
              >
                {item.hasDropdown ? (
                  <>
                    <button
                      type="button"
                      data-ocid={`nav.mobile_${item.label.toLowerCase().replace(/\s+/g, "_")}_toggle`}
                      className="w-full flex items-center justify-between py-4 font-medium text-gray-700 text-base"
                      onClick={() => toggleMobileAccordion(item.label)}
                      aria-expanded={mobileAccordion === item.label}
                    >
                      <span>{item.label}</span>
                      <span
                        className={`transition-transform duration-200 ${
                          mobileAccordion === item.label ? "rotate-180" : ""
                        }`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 12 12"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M6 8L1 3h10L6 8z" />
                        </svg>
                      </span>
                    </button>

                    {mobileAccordion === item.label && (
                      <div className="pb-4 pl-4 space-y-1">
                        {(item.menu === "treks" ? TREK_LINKS : YATRA_LINKS).map(
                          (link) => (
                            <Link
                              key={link.name}
                              to={link.to as "/"}
                              className="block py-2 text-sm text-gray-600 hover:text-green-600 transition-colors"
                              onClick={() => setMobileOpen(false)}
                            >
                              {link.name}
                            </Link>
                          ),
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.to as "/"}
                    className="block py-4 font-medium text-gray-700 hover:text-green-600 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="px-6 pb-8 flex-shrink-0">
            <Link
              to="/book"
              data-ocid="nav.mobile_book_now_button"
              className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg transition-colors duration-200"
              onClick={() => setMobileOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
