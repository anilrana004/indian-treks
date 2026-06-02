import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "Home", icon: "🏠", href: "/", ocid: "home" },
  { label: "Treks", icon: "⛰️", href: "/all-treks", ocid: "treks" },
  { label: "Yatra", icon: "🙏", href: "/all-yatras", ocid: "yatra" },
  { label: "Offers", icon: "🏷️", href: "/book", ocid: "offers" },
  { label: "Account", icon: "👤", href: "/about", ocid: "account" },
];

export default function MobileBottomNav() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    const interval = setInterval(() => {
      if (window.location.pathname !== pathname) {
        setPathname(window.location.pathname);
      }
    }, 200);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      clearInterval(interval);
    };
  }, [pathname]);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      data-ocid="mobile.bottom_nav"
      aria-label="Mobile bottom navigation"
    >
      <div className="flex items-center justify-around h-16">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.ocid}
              to={item.href as "/"}
              data-ocid={`mobile.nav.${item.ocid}_tab`}
              className={`relative flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-colors ${
                isActive
                  ? "text-green-600"
                  : "text-gray-500 hover:text-green-500"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="text-[22px] leading-none" aria-hidden="true">
                {item.icon}
              </span>
              <span
                className={`text-[10px] font-semibold tracking-wide leading-tight ${
                  isActive ? "text-green-600" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-green-600 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
