import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import guides from "../data/guides";

const ctaStyle = {
  width: "100%",
  padding: "0.85rem 1rem",
  background: "linear-gradient(135deg, #10b981, #34d399)",
  border: "none",
  borderRadius: "0.75rem",
  color: "#061612",
  cursor: "pointer",
  fontWeight: "600",
  transition: "background 0.2s ease, transform 0.2s ease",
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

- Budget: ₹${guide.price}
- Dates: [your dates]

Are you available? Can you suggest a plan?`;

    window.open(
      `https://wa.me/919778405403?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#061612",
        color: "white",
        padding: "2.5rem 1rem",
      }}
    >
      <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
        <section
          className="animate-fadeInUp backdrop-blur-xl"
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
            {languageText} • ₹{guide.price}/day
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

          <button
            type="button"
            onClick={chatWithGuide}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #34d399, #6ee7b7)";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #10b981, #34d399)";
              e.currentTarget.style.transform = "scale(1)";
            }}
            style={{ ...ctaStyle, marginTop: "1.5rem" }}
          >
            Chat with Guide on WhatsApp
          </button>

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
        </section>

        <section style={{ marginTop: "2.5rem" }}>
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
        </section>

        <section style={{ marginTop: "2.5rem" }}>
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
        </section>

        <section style={{ marginTop: "3rem" }}>
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
              <div
                key={similarGuide.id}
                className="backdrop-blur-xl"
                onClick={() => {
                  if (window.gtag) {
                    window.gtag('event', 'guide_click', { guide: similarGuide.name });
                  }
                  navigate(`/guides/${similarGuide.id}`);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#34d399";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.13)";
                }}
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
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: "3rem", textAlign: "center" }}>
          <button
            type="button"
            onClick={chatWithGuide}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #34d399, #6ee7b7)";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #10b981, #34d399)";
              e.currentTarget.style.transform = "scale(1)";
            }}
            style={{
              ...ctaStyle,
              width: "auto",
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
            }}
          >
            Chat with Guide
          </button>

          <p style={{ color: "#6ee7b7", fontSize: "0.75rem", marginTop: "0.5rem" }}>
            Limited slots available
          </p>
        </section>
      </div>
    </div>
  );
};

export default GuideProfile;
