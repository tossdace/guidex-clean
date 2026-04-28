import { Link, useNavigate } from "react-router-dom";

const destinations = [
  {
    name: "Kochi",
    desc: "City + culture + food",
  },
  {
    name: "Munnar",
    desc: "Tea hills + nature + viewpoints",
  },
  {
    name: "Alleppey",
    desc: "Backwaters + villages + slow travel",
  },
];

const Destinations = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        background: "#020617",
        color: "white",
      }}
    >
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginBottom: "1.5rem",
          color: "#22c55e",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Home
      </Link>

      <h1 style={{ marginBottom: "0.75rem" }}>Explore Destinations</h1>
      <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
        Pick a Kerala destination and find trusted local guides for that place.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {destinations.map((destination) => (
          <div
            key={destination.name}
            onClick={() =>
              navigate(`/guides?location=${encodeURIComponent(destination.name)}`)
            }
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
            style={{
              padding: "1.5rem",
              borderRadius: "14px",
              background: "#1e293b",
              cursor: "pointer",
              transition: "all 0.25s ease",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h2 style={{ marginTop: 0 }}>{destination.name}</h2>
            <p style={{ color: "#94a3b8" }}>{destination.desc}</p>
            <p style={{ color: "#22c55e", fontWeight: "bold" }}>
              Find guides
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
