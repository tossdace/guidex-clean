import { Link, useNavigate } from "react-router-dom";
import destinations from "../data/destinations";
import { motion as Motion } from "framer-motion";

const pageTransition = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
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
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const headerSlide = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const Destinations = () => {
  const navigate = useNavigate();

  return (
    <Motion.div
      initial="hidden"
      animate="visible"
      variants={pageTransition}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #061612 0%, #061612 58%, #081f16 100%)",
        color: "white",
        padding: "4rem 1.5rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div className="floating-orb floating-orb-1" style={{ top: "15%", left: "-8%" }} />
        <div className="floating-orb floating-orb-3" style={{ bottom: "25%", right: "-5%" }} />
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            width: "100%",
            maxWidth: "72rem",
          }}
        >
          <Motion.div initial="hidden" animate="visible" variants={headerSlide} style={{ marginBottom: "2.5rem" }}>
            <Link
              to="/"
              style={{
                color: "#6ee7b7",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              ← Back to Home
            </Link>
          </Motion.div>

          <div className="section-container">
            <Motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>Explore Destinations</Motion.h1>
            <p>Pick a Kerala destination and find trusted local guides.</p>

            <Motion.div className="destinations-grid" initial="hidden" animate="visible" variants={staggerGrid}>
              {destinations.map((d) => (
                <Motion.div key={d.id} className="destination-card" variants={cardVariant} whileHover={{ y: -6, scale: 1.015 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
                  <img src={d.image} alt={d.name} />

                  <div className="card-content">
                    <span className="destination-tag">{d.tag}</span>
                    <h3>{d.name}</h3>
                    <p>{d.description}</p>

                    <button
                      className="primary-btn"
                      onClick={() => navigate(`/guides?location=${d.name}`)}
                    >
                      Explore with a Guide
                    </button>
                  </div>
                </Motion.div>
              ))}
            </Motion.div>
          </div>
        </div>
      </div>
    </Motion.div>
  );
};

export default Destinations;
