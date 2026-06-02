import { useEffect, useState } from "react";

// Extend Window for beforeinstallprompt
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function WhatsAppIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="white"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

export default function FloatingWidgets() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 300);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Capture beforeinstallprompt and show banner after 30s
  useEffect(() => {
    function handleBeforeInstall(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    }
    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () =>
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  useEffect(() => {
    if (!deferredPrompt) return;
    const timer = setTimeout(() => setShowInstallBanner(true), 30000);
    return () => clearTimeout(timer);
  }, [deferredPrompt]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleInstall() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  }

  return (
    <>
      {/* WhatsApp float */}
      <div style={{ position: "relative" }}>
        {/* Tooltip */}
        {showTooltip && (
          <div
            role="tooltip"
            style={{
              position: "fixed",
              bottom: "36px",
              right: "90px",
              background: "white",
              color: "#0a0e1a",
              fontFamily: "var(--font-ui)",
              fontSize: "13px",
              fontWeight: 600,
              padding: "6px 14px",
              borderRadius: "100px",
              whiteSpace: "nowrap",
              zIndex: 9998,
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              pointerEvents: "none",
            }}
          >
            Chat with a Trek Expert
          </div>
        )}

        <a
          href="https://wa.me/911234567890?text=Hi!%20I'm%20interested%20in%20booking%20a%20trek%20with%20TrekRoot.%20Please%20help%20me."
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float"
          aria-label="Chat with a Trek Expert on WhatsApp"
          data-ocid="whatsapp.button"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
        >
          {/* Pulse ring */}
          <span className="pulse-ring" aria-hidden="true" />
          <WhatsAppIcon />
        </a>
      </div>

      {/* Back-to-top */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`back-to-top${isVisible ? " visible" : ""}`}
        aria-label="Back to top of page"
        data-ocid="back_to_top.button"
      >
        <ArrowUpIcon />
      </button>

      {/* PWA Install Banner */}
      {showInstallBanner && (
        <div
          role="banner"
          aria-label="Install app prompt"
          data-ocid="pwa.install_banner"
          style={{
            position: "fixed",
            bottom: "80px",
            left: "20px",
            zIndex: 9998,
            background: "var(--color-midnight)",
            border: "1px solid var(--color-glacier)",
            borderRadius: "12px",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            maxWidth: "280px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "13px",
              color: "var(--color-snow)",
              lineHeight: 1.4,
              flex: 1,
            }}
          >
            📲 Add TrekRoot to your home screen
          </span>
          <button
            type="button"
            onClick={handleInstall}
            data-ocid="pwa.install_button"
            style={{
              background: "var(--color-summit)",
              color: "var(--color-midnight)",
              border: "none",
              borderRadius: "4px",
              padding: "6px 12px",
              fontFamily: "var(--font-ui)",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Install
          </button>
          <button
            type="button"
            onClick={() => setShowInstallBanner(false)}
            aria-label="Dismiss install prompt"
            data-ocid="pwa.dismiss_button"
            style={{
              background: "transparent",
              border: "none",
              color: "var(--color-ash)",
              cursor: "pointer",
              fontSize: "18px",
              lineHeight: 1,
              padding: "2px 4px",
            }}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
