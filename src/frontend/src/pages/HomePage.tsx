import { useEffect } from "react";
import BlogSection from "../components/BlogSection";
import DestinationCards from "../components/DestinationCards";
import ExperiencesSection from "../components/ExperiencesSection";
import FeaturedTreks from "../components/FeaturedTreks";
import FloatingWidgets from "../components/FloatingWidgets";
import HeroSection from "../components/HeroSection";
import Navigation from "../components/Navigation";
import NewsletterFooter from "../components/NewsletterFooter";
import ReviewsTicker from "../components/ReviewsTicker";
import SeasonalGuide from "../components/SeasonalGuide";
import SocialSection from "../components/SocialSection";
import WhyTrekRoot from "../components/WhyTrekRoot";
import YatraSection from "../components/YatraSection";

export default function HomePage() {
  // Intersection Observer for .reveal elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    const revealElements = document.querySelectorAll(".reveal");
    for (const el of revealElements) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // SEO meta tags
  useEffect(() => {
    document.title =
      "TrekRoot — Trek the Himalayas | Uttarakhand & Himachal Pradesh";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "TrekRoot — India's most trusted Himalayan trekking & yatra platform. 40+ treks, 15+ sacred yatras in Uttarakhand & Himachal Pradesh. Book your Himalayan adventure today.",
    );
  }, []);

  return (
    <div className="bg-white" data-ocid="home.page">
      <Navigation />
      <main id="main-content" aria-label="Main content">
        <HeroSection />
        <DestinationCards />
        <FeaturedTreks />
        <YatraSection />
        <ExperiencesSection />
        <SeasonalGuide />
        <ReviewsTicker />
        <WhyTrekRoot />
        <SocialSection />
        <BlogSection />
      </main>
      <NewsletterFooter />
      <FloatingWidgets />
    </div>
  );
}
