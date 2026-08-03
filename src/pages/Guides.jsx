import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import guides from "../data/guides";
import { motion as Motion, AnimatePresence } from "framer-motion";

const pageTransition = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerGrid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const filterFade = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
};

const handleWhatsAppClick = (guide) => {
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

  const msg = `Hi! I found Hirevoy 👋

I'm interested in booking a local guide.

📍 Location: ${guide.location}
👤 Guide: ${guide.name}
💰 Budget: Min ₹${guide.price}

Can you share details and availability?`;

  window.open(
    `https://wa.me/919778405403?text=${encodeURIComponent(msg)}`,
    "_blank",
    "noopener,noreferrer"
  );
};

const GuideCard = ({ guide, index = 0 }) => {
  const navigate = useNavigate();

  return (
    <div
      className="guide-card backdrop-blur-xl"
      onClick={() => {
        if (window.gtag) {
          window.gtag('event', 'guide_click', { guide: guide.name });
        }
        navigate(`/guides/${guide.id}`);
      }}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <h3 className="guide-name">{guide.name}</h3>

      <p className="guide-meta">
        {guide.languages.join(", ")} • ₹{guide.price} min/day
      </p>

      <div className="guide-trust">
        <span>✓ Verified</span>
        <span>{guide.location}</span>
        <span>{guide.travelers || 120}+ travelers</span>
      </div>

      <button
        className="guide-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleWhatsAppClick(guide);
        }}
      >
        Chat with Guide
      </button>
    </div>
  );
};

const Guides = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const locationFilter = searchParams.get("location") || "";
  const [search, setSearch] = useState(() => locationFilter);
  const [budget, setBudget] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(true);

  const hasActiveFilters = search || budget || language;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', { page_title: 'Guides' });
    }
  }, []);

  useEffect(() => {
    if (hasActiveFilters) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hasActiveFilters]);

  const clearFilters = () => {
    setSearch("");
    setBudget("");
    setLanguage("");
  };

  const filtered = guides.filter((guide) => {
    return (
      guide.location.toLowerCase().includes(search.toLowerCase()) &&
      (budget === "" || guide.price <= budget) &&
      (language === "" || guide.language === language)
    );
  });

  if (loading) {
    return (
      <p
        style={{
          padding: "2rem",
          minHeight: "100vh",
          background: "#061612",
          color: "#ecfdf5",
        }}
      >
        Loading guides...
      </p>
    );
  }

  return (
    <Motion.div
      initial="hidden" animate="visible" variants={pageTransition}
      style={{
        padding: "2rem",
        minHeight: "100vh",
        background: "#061612",
        color: "#ecfdf5",
      }}
    >
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div className="floating-orb floating-orb-1" style={{ top: "20%", right: "-10%" }} />
        <div className="floating-orb floating-orb-2" style={{ bottom: "30%", left: "-8%" }} />
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <Motion.h1
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ marginBottom: "1rem", fontWeight: "700", color: "#ecfdf5" }}
          >
            Find Trusted Local Guides
          </Motion.h1>

          <AnimatePresence>
            {search && (
              <Motion.div initial="hidden" animate="visible" exit="exit" variants={filterFade} style={{ marginBottom: "1.5rem", textAlign: "center" }}>
                <p style={{ color: "#6ee7b7", fontWeight: "500" }}>
                  Showing trusted guides in {search}
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/destinations')}
                  style={{
                    marginTop: "0.5rem",
                    padding: "0.5rem 1rem",
                    background: "rgba(255,255,255,0.055)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(52, 211, 153, 0.4)",
                    borderRadius: "0.5rem",
                    color: "#6ee7b7",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                  }}
                >
                  Change location
                </button>
              </Motion.div>
            )}
          </AnimatePresence>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              style={{
                marginBottom: "1rem",
                padding: "6px 10px",
                background: "rgba(239, 68, 68, 0.25)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(239, 68, 68, 0.35)",
                borderRadius: "6px",
                cursor: "pointer",
                color: "#ecfdf5",
              }}
            >
              Clear Filter
            </button>
          )}

          <input
            type="text"
            placeholder="Search by location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px",
              width: "100%",
              maxWidth: "300px",
              marginBottom: "1.5rem",
              background: "rgba(255,255,255,0.055)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "#ecfdf5",
              borderRadius: "6px",
            }}
          />

          <div
            style={{
              marginBottom: "2rem",
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <select
              value={budget}
              onChange={(e) =>
                setBudget(e.target.value === "" ? "" : Number(e.target.value))
              }
              style={{
                padding: "8px",
                background: "rgba(255,255,255,0.055)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                color: "#ecfdf5",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: "6px",
              }}
            >
              <option value="">All Budgets</option>
              <option value="1000">Under ₹1000</option>
              <option value="1500">Under ₹1500</option>
            </select>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                padding: "8px",
                background: "rgba(255,255,255,0.055)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                color: "#ecfdf5",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: "6px",
              }}
            >
              <option value="">All Languages</option>
              <option value="English">English</option>
              <option value="Malayalam">Malayalam</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 0" }}>
              <p style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>
                No guides found for "{search}"
              </p>

              <button
                type="button"
                onClick={clearFilters}
                style={{
                  marginTop: "0.75rem",
                  padding: "0.6rem 1rem",
                  background: "rgba(52, 211, 153, 0.10)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(52, 211, 153, 0.35)",
                  borderRadius: "0.5rem",
                  color: "#6ee7b7",
                  cursor: "pointer",
                  fontWeight: "600",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10), 0 4px 20px rgba(52,211,153,0.12)",
                }}
              >
                View All Guides
              </button>
            </div>
          ) : (
            <div className="section-container">
              <Motion.div className="grid-3" initial="hidden" animate="visible" variants={staggerGrid}>
                {filtered.map((guide) => (
                  <Motion.div key={guide.id} className="card backdrop-blur-xl" variants={cardVariant} whileHover={{ y: -4, scale: 1.01 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
                    <h3 className="card-title">{guide.name}</h3>

                    <p className="card-desc">
                      {guide.location} • ₹{guide.price} min/day
                    </p>

                    <p className="card-desc">
                      ✓ Verified • {guide.travelers || 120}+ travelers
                    </p>

                    <Motion.button
                      className="card-btn"
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={() => handleWhatsAppClick(guide)}
                    >
                      Chat with Guide
                    </Motion.button>
                  </Motion.div>
                ))}
              </Motion.div>
            </div>
          )}
        </div>
      </div>
    </Motion.div>
  );
};

export default Guides;
