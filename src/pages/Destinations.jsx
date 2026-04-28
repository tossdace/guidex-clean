import { Link, useNavigate } from "react-router-dom";

const destinations = [
  {
    name: "Kochi",
    desc: "City + culture + food",
    guides: 12,
  },
  {
    name: "Munnar",
    desc: "Tea hills + nature + viewpoints",
    guides: 8,
  },
  {
    name: "Alleppey",
    desc: "Backwaters + villages + slow travel",
    guides: 10,
  },
];

const Destinations = () => {
  const navigate = useNavigate();

  const openGuidesFor = (destinationName) => {
    navigate(`/guides?location=${encodeURIComponent(destinationName)}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #020617 0%, #020617 58%, #03122c 100%)",
        color: "white",
        padding: "4rem 1.5rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "72rem",
        }}
      >
        <div style={{ marginBottom: "2.5rem" }}>
          <Link
            to="/"
            style={{
              color: "#4ade80",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            ← Back to Home
          </Link>
        </div>

        <div style={{ marginBottom: "3rem", textAlign: "center" }}>
          <h1
            style={{
              margin: "0 0 1rem",
              fontSize: "clamp(2.25rem, 6vw, 3rem)",
              lineHeight: 1.1,
              fontWeight: "700",
            }}
          >
            Explore Destinations
          </h1>
          <p
            style={{
              margin: 0,
              color: "#94a3b8",
              fontSize: "1.125rem",
            }}
          >
            Pick a Kerala destination and find trusted local guides.
          </p>
        </div>

        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <p style={{ color: "#4ade80", fontWeight: "500" }}>
            Limited guides available per location
          </p>
        </div>

        <div className="destinations-grid">
          {destinations.map((destination) => (
            <div
              key={destination.name}
              className="animate-fadeInUp"
              onClick={() => openGuidesFor(destination.name)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-0.5rem)";
                e.currentTarget.style.borderColor = "#22c55e";
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(34,197,94,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "#1f2937";
                e.currentTarget.style.boxShadow = "none";
              }}
              style={{
                padding: "1.5rem",
                borderRadius: "1rem",
                background: "#0f172a",
                cursor: "pointer",
                transition: "all 0.3s ease",
                border: "1px solid #1f2937",
              }}
            >
              <h2
                style={{
                  margin: "0 0 0.25rem",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "white",
                }}
              >
                {destination.name}
              </h2>

              <p
                style={{
                  color: "#4ade80",
                  fontSize: "0.875rem",
                  marginBottom: "0.5rem",
                }}
              >
                ✓ {destination.guides} verified local guides
              </p>

              <p style={{ color: "#94a3b8", marginBottom: "1rem" }}>
                {destination.desc}
              </p>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openGuidesFor(destination.name);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#4ade80";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#22c55e";
                }}
                style={{
                  width: "100%",
                  padding: "0.65rem 1rem",
                  background: "#22c55e",
                  border: "none",
                  borderRadius: "0.5rem",
                  color: "#020617",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "background 0.2s ease",
                }}
              >
                Find Guides in {destination.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
