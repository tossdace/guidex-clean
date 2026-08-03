import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import guides from "../data/guides";
import { motion as Motion } from "framer-motion";

const pageTransition = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const slideUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const staggerSection = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const ctaStyle = {
  width: "100%",
  padding: "0.85rem 1rem",
  background: "rgba(52, 211, 153, 0.10)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(52, 211, 153, 0.35)",
  borderRadius: "0.75rem",
  color: "#6ee7b7",
  cursor: "pointer",
  fontWeight: "600",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10), 0 4px 20px rgba(52,211,153,0.12)",
  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
};

const GuideProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const guide = guides.find((g) => g.id === id);

  useEffect(() => {
    if (guide && window.gtag) {
      window.gtag('event', 'page_view', { page_title: 'Guide Profile', guide: guide.name });
    }
  }, [guide]);

  if (!guide) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#061612",
          color: "white",
          padding: "2rem",
        }}
      >
        <h2 style={{ color: "#ecfdf5" }}>Guide not found</h2>
      </div>
    );
  }

  const languages = guide.languages || [guide.language];
  const languageText = languages.join(", ");
  const similarGuides = guides
    .filter((g) => g.id !== guide.id)
    .slice(0, 2);

  const chatWithGuide = () => {
    // Persist lead intent
    const payload = {
      guideId: guide.id,
      guideName: guide.name,
      location: guide.location,
      ts: Date.now()
    };
    localStorage.setItem("lastLead", JSON.stringify(payload));

    // Track event
    if (window.gtag) {
      window.gtag('event', 'whatsapp_click', { guide: guide.name });
    }

    const message = `Hi ${guide.name},

I'm planning a trip to ${guide.location}.

- Budget: Min ₹${guide.price}
- Dates: [your dates]

Are you available? Can you suggest a plan?`;

    window.open(
      `https://wa.me/919778405403?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Motion.div
      initial="hidden"
      animate="visible"
      variants={pageTransition}
      style={{
        minHeight: "100vh",
        background: "#061612",
        color: "white",
        padding: "2.5rem 1rem",
      }}
    >
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div className="floating-orb floating-orb-2" style={{ top: "10%", right: "-5%" }} />
        <div className="floating-orb floating-orb-3" style={{ bottom: "20%", left: "-10%" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
          <Motion.section
            initial="hidden"
            animate="visible"
            variants={slideUp}
            className="backdrop-blur-xl"
            style={{
              padding: "1.5rem",
              borderRadius: "1rem",
              background: "rgba(255,255,255,0.055)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.13)",
              boxShadow: "0 0 36px rgba(52,211,153,0.18)",
            }}
          >
            <h1
              style={{
                margin: 0,
                color: "#ecfdf5",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: "700",
                lineHeight: 1.1,
              }}
            >
              {guide.name}
            </h1>

            <p style={{ color: "#6ee7b7", marginTop: "0.25rem" }}>
              ✓ Verified Local Guide • {guide.location}
              {guide.verified && (
                <span style={{ marginLeft: "0.5rem", fontSize: "0.75rem" }}>
                  Verified via WhatsApp
                </span>
              )}
            </p>

            <p style={{ color: "#86efac", marginTop: "0.5rem" }}>
              {languageText} • ₹{guide.price} min/day
            </p>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                color: "#6ee7b7",
                fontSize: "0.875rem",
                marginTop: "0.75rem",
              }}
            >
              <span>✓ Verified Guide</span>
              <span>120+ Travelers</span>
              <span>⏱ Responds in minutes</span>
            </div>

            <Motion.button
              type="button"
              onClick={chatWithGuide}
              whileHover={{ scale: 1.03, background: "rgba(52,211,153,0.22)", borderColor: "rgba(52,211,153,0.55)", color: "#ecfdf5", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14), 0 0 30px rgba(52,211,153,0.22), 0 10px 35px rgba(52,211,153,0.15)" }}
              whileTap={{ scale: 0.97 }}
              style={{ ...ctaStyle, marginTop: "1.5rem" }}
            >
              Chat with Guide on WhatsApp
            </Motion.button>

            <p className="text-xs text-[#6ee7b7] mt-2 text-center">
              Opens WhatsApp • No commitment
            </p>

            <div
              style={{
                marginTop: "1rem",
                color: "#86efac",
                fontSize: "0.875rem",
                textAlign: "center",
              }}
            >
              🔥 New on Hirevoy • Accepting traveler inquiries
            </div>
          </Motion.section>

          <Motion.div initial="hidden" animate="visible" variants={staggerSection}>
            <Motion.section variants={slideUp} style={{ marginTop: "2.5rem" }}>
              <h2
                style={{
                  color: "#ecfdf5",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Why choose this guide?
              </h2>

              <ul
                style={{
                  display: "grid",
                  gap: "0.5rem",
                  color: "#d1fae5",
                  paddingLeft: "1.25rem",
                  margin: 0,
                }}
              >
                <li>✔ Knows hidden local spots tourists miss</li>
                <li>✔ Speaks {languageText}</li>
                <li>✔ Trusted by 100+ travelers</li>
                <li>✔ Plans based on your budget & time</li>
              </ul>
            </Motion.section>

            <Motion.section variants={slideUp} style={{ marginTop: "2.5rem" }}>
              <h2
                style={{
                  color: "#ecfdf5",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                What you'll get
              </h2>

              <ul
                style={{
                  display: "grid",
                  gap: "0.5rem",
                  color: "#d1fae5",
                  paddingLeft: "1.25rem",
                  margin: 0,
                }}
              >
                <li>• Custom itinerary for your trip</li>
                <li>• Local food & hidden spots</li>
                <li>• Help with transport & planning</li>
                <li>• Real local experience, not tourist traps</li>
              </ul>
            </Motion.section>

            <Motion.section variants={slideUp} style={{ marginTop: "3rem" }}>
              <h2
                style={{
                  color: "#ecfdf5",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Similar Guides
              </h2>

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  overflowX: "auto",
                  paddingBottom: "0.25rem",
                }}
              >
                {similarGuides.map((similarGuide) => (
                  <Motion.div
                    key={similarGuide.id}
                    className="backdrop-blur-xl"
                    onClick={() => {
                      if (window.gtag) {
                        window.gtag('event', 'guide_click', { guide: similarGuide.name });
                      }
                      navigate(`/guides/${similarGuide.id}`);
                    }}
                    whileHover={{ y: -4, scale: 1.02, borderColor: "#34d399" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{
                      minWidth: "200px",
                      padding: "1rem",
                      background: "rgba(255,255,255,0.06)",
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                      borderRadius: "0.75rem",
                      cursor: "pointer",
                      border: "1px solid rgba(255,255,255,0.13)",
                      transition: "border-color 0.2s ease",
                    }}
                  >
                    <p style={{ fontWeight: "600" }}>{similarGuide.name}</p>
                    <p style={{ color: "#86efac", fontSize: "0.875rem" }}>
                      {similarGuide.location}
                    </p>
                  </Motion.div>
                ))}
              </div>
            </Motion.section>

            <Motion.section variants={slideUp} style={{ marginTop: "3rem", textAlign: "center" }}>
              <Motion.button
                type="button"
                onClick={chatWithGuide}
                whileHover={{ scale: 1.03, background: "rgba(52,211,153,0.22)", borderColor: "rgba(52,211,153,0.55)", color: "#ecfdf5", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14), 0 0 30px rgba(52,211,153,0.22), 0 10px 35px rgba(52,211,153,0.15)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  ...ctaStyle,
                  width: "auto",
                  paddingLeft: "1.5rem",
                  paddingRight: "1.5rem",
                }}
              >
                Chat with Guide
              </Motion.button>

              <p style={{ color: "#6ee7b7", fontSize: "0.75rem", marginTop: "0.5rem" }}>
                Limited slots available
              </p>
            </Motion.section>
          </Motion.div>
        </div>
      </div>
    </Motion.div>
  );
};

export default GuideProfile;
