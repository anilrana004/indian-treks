import { useState } from "react";

interface Review {
  name: string;
  location: string;
  review: string;
  trek: string;
  trekSlug: string;
}

const reviews: Review[] = [
  {
    name: "Arjun M.",
    location: "Delhi",
    review:
      "Roopkund was the most surreal experience of my life. TrekRoot's guides knew every stone on that path.",
    trek: "Roopkund Trek",
    trekSlug: "roopkund-trek",
  },
  {
    name: "Savitri P.",
    location: "Ahmedabad",
    review:
      "Our Char Dham Yatra with TrekRoot was divine in every sense. Flawlessly organized, deeply spiritual.",
    trek: "Char Dham Yatra",
    trekSlug: "char-dham-yatra",
  },
  {
    name: "Ramesh K.",
    location: "Pune",
    review:
      "I am 62 years old and I stood at Chandrashila summit. TrekRoot made the impossible possible.",
    trek: "Tungnath-Chandrashila",
    trekSlug: "tungnath-chandrashila-trek",
  },
  {
    name: "Priya S.",
    location: "Bangalore",
    review:
      "Spiti was like another planet. The homestays TrekRoot arranged were so warm and authentic.",
    trek: "Spiti Valley Trek",
    trekSlug: "hampta-pass-trek",
  },
  {
    name: "Vikram T.",
    location: "Mumbai",
    review:
      "Hampta Pass crossing in fog felt like walking through a dream. Best week of 2024.",
    trek: "Hampta Pass",
    trekSlug: "hampta-pass-trek",
  },
  {
    name: "Neha R.",
    location: "Hyderabad",
    review:
      "Solo woman trekker — felt completely safe throughout. The WhatsApp updates to my family were a great touch.",
    trek: "Valley of Flowers",
    trekSlug: "valley-of-flowers-trek",
  },
  {
    name: "Ankit G.",
    location: "Noida",
    review:
      "Brahmatal in February. Frozen lake. Snow everywhere. Words fail me. TrekRoot — book them.",
    trek: "Brahmatal Trek",
    trekSlug: "brahmatal-trek",
  },
  {
    name: "Sunita V.",
    location: "Jaipur",
    review:
      "The Kedarnath helicopter package was seamless. Every detail handled. Would do it every year.",
    trek: "Kedarnath Yatra",
    trekSlug: "kedarnath-yatra",
  },
  {
    name: "Kabir A.",
    location: "Chandigarh",
    review:
      "Pin Parvati Pass is brutal and beautiful. Our guide Rajan was extraordinary.",
    trek: "Pin Parvati Pass",
    trekSlug: "pin-parvati-pass-trek",
  },
  {
    name: "Mehul D.",
    location: "Surat",
    review:
      "Har Ki Dun is the most photogenic valley in India. Our photography guide was world-class.",
    trek: "Har Ki Dun",
    trekSlug: "har-ki-dun-trek",
  },
  {
    name: "Aisha F.",
    location: "Lucknow",
    review:
      "My teenage kids now want to trek every holiday. Kedarkantha converted the whole family.",
    trek: "Kedarkantha Trek",
    trekSlug: "kedarkantha-trek",
  },
  {
    name: "Parveen S.",
    location: "Amritsar",
    review:
      "Manimahesh Yatra was deeply moving. The logistics were perfect so we could focus on the spiritual journey.",
    trek: "Manimahesh Yatra",
    trekSlug: "manimahesh-yatra",
  },
  {
    name: "Rohit N.",
    location: "Indore",
    review:
      "Kuari Pass views of Nanda Devi are worth every rupee. The camp food was incredible too!",
    trek: "Kuari Pass Trek",
    trekSlug: "kuari-pass-trek",
  },
  {
    name: "Zara K.",
    location: "Kolkata",
    review:
      "From Manali to Kaza via Hampta Pass — most epic road-to-trek combo. Perfectly timed.",
    trek: "Hampta + Spiti",
    trekSlug: "hampta-pass-trek",
  },
  {
    name: "Ritu M.",
    location: "Chennai",
    review:
      "Triund was my first trek ever. The TrekRoot team held my hand sometimes. Perfect first experience.",
    trek: "Triund Trek",
    trekSlug: "triund-trek",
  },
  {
    name: "Dr. Sanjay R.",
    location: "Dehradun",
    review:
      "Auden's Col is India's toughest. TrekRoot's preparation, gear checks, and acclimatization protocol was military-grade.",
    trek: "Auden's Col",
    trekSlug: "audens-col-trek",
  },
];

// Duplicate for infinite scroll: 32 cards per row
const doubledReviews = [...reviews, ...reviews];
// Row 2 uses a slightly shifted order for visual variety
const row2Reviews = [
  ...reviews.slice(8),
  ...reviews.slice(0, 8),
  ...reviews.slice(8),
  ...reviews.slice(0, 8),
];

function ReviewCard({ review }: { review: Review }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseEnter = () => {
    setTilt({ x: 2, y: 3 });
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovering(false);
  };

  const avatarSeed = encodeURIComponent(review.name);

  return (
    <article
      data-ocid="reviews.item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: "340px",
        flexShrink: 0,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
        transform: hovering
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transition: "transform 0.3s ease",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* Top row: avatar + name + location */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
          alt={`${review.name} avatar`}
          loading="lazy"
          width={40}
          height={40}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
            background: "rgba(77,168,199,0.2)",
            flexShrink: 0,
          }}
        />
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 700,
              fontSize: "15px",
              color: "white",
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {review.name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--color-ash)",
              lineHeight: 1.2,
            }}
          >
            {review.location}
          </div>
        </div>
      </div>

      {/* Stars */}
      <div
        aria-label="5 out of 5 stars"
        style={{
          color: "var(--color-summit)",
          fontSize: "14px",
          letterSpacing: "1px",
          lineHeight: 1,
        }}
      >
        ★★★★★
      </div>

      {/* Review text */}
      <p
        className="line-clamp-3"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          fontStyle: "italic",
          color: "rgba(255,255,255,0.85)",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {review.review}
      </p>

      {/* Trek chip */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--color-glacier)",
          background: "rgba(77,168,199,0.15)",
          border: "1px solid rgba(77,168,199,0.3)",
          borderRadius: "100px",
          padding: "3px 10px",
          maxWidth: "fit-content",
          whiteSpace: "nowrap",
        }}
      >
        {review.trek}
      </div>
    </article>
  );
}

export default function ReviewsTicker() {
  return (
    <section
      data-ocid="reviews.section"
      className="grain"
      style={{
        background: "var(--color-midnight)",
        position: "relative",
        overflow: "hidden",
        padding: "80px 0",
      }}
    >
      {/* Section header */}
      <div
        style={{
          textAlign: "center",
          position: "relative",
          zIndex: 10,
          marginBottom: "60px",
          padding: "0 24px",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            color: "white",
            margin: "0 0 12px",
            lineHeight: 1.15,
          }}
          className="text-[48px] leading-tight md:text-[32px] sm:text-[32px]"
        >
          Stories from the Trail
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "18px",
            color: "var(--color-ash)",
            fontStyle: "italic",
            margin: 0,
          }}
        >
          10,000+ trekkers. One Himalayan family.
        </p>
      </div>

      {/* Fade edge — left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "12%",
          height: "100%",
          background:
            "linear-gradient(to right, var(--color-midnight) 0%, transparent 100%)",
          zIndex: 5,
          pointerEvents: "none",
        }}
      />
      {/* Fade edge — right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "12%",
          height: "100%",
          background:
            "linear-gradient(to left, var(--color-midnight) 0%, transparent 100%)",
          zIndex: 5,
          pointerEvents: "none",
        }}
      />

      {/* Row 1 — scrolls left */}
      <div
        className="pause-animation"
        style={{ overflow: "hidden", marginBottom: "24px" }}
        data-ocid="reviews.row-1"
      >
        <div
          className="animate-scroll-left"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "24px",
            width: "max-content",
          }}
        >
          {doubledReviews.map((review, i) => (
            <ReviewCard key={`r1-${review.name}-${i}`} review={review} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div
        className="pause-animation"
        style={{ overflow: "hidden" }}
        data-ocid="reviews.row-2"
      >
        <div
          className="animate-scroll-right"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "24px",
            width: "max-content",
          }}
        >
          {row2Reviews.map((review, i) => (
            <ReviewCard key={`r2-${review.name}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
