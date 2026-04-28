import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import guides from "../data/guides";

const Guides = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [budget, setBudget] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);

    return () => clearTimeout(timer);
  }, []);

  const filtered = guides.filter((g) => {
    return (
      g.location.toLowerCase().includes(search.toLowerCase()) &&
      (budget === "" || g.price <= budget) &&
      (language === "" || g.language === language)
    );
  });

  if (loading) return <p style={{ padding: "2rem" }}>Loading guides...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Find Trusted Local Guides</h1>

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
        }}
      />

      <div
        style={{
          marginBottom: "1.5rem",
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
          style={{ padding: "8px" }}
        >
          <option value="">All Budgets</option>
          <option value="1000">Under ₹1000</option>
          <option value="1500">Under ₹1500</option>
        </select>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="">All Languages</option>
          <option value="English">English</option>
          <option value="Malayalam">Malayalam</option>
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filtered.map((g) => (
          <div
            key={g.id}
            onClick={() => navigate(`/guides/${g.id}`)}
            style={{
              padding: "1.5rem",
              borderRadius: "14px",
              background: "#1e293b",
              color: "white",
              cursor: "pointer",
              transition: "all 0.25s ease",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <h3 style={{ marginBottom: "0.5rem" }}>{g.name}</h3>

            <p style={{ color: "#94a3b8" }}>{g.location}</p>

            <p style={{ marginTop: "0.5rem" }}>
              ⭐ {g.rating} • ₹{g.price}
            </p>

            <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
              {g.language}
            </p>

            <p
              style={{
                color: "#22c55e",
                marginTop: "0.8rem",
                fontWeight: "bold",
              }}
            >
              ✔ Verified Guide
            </p>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const msg = `Hi, I found Hirevoy.

I'm interested in booking a guide.

Location: ${g.location}
Guide: ${g.name}
Budget: ₹${g.price}`;
                window.open(
                  `https://wa.me/919778405403?text=${encodeURIComponent(msg)}`
                );
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
              style={{
                marginTop: "1rem",
                padding: "8px 12px",
                background: "#22c55e",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
            >
              Contact
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ marginTop: "2rem", color: "#94a3b8" }}>
          No guides found. Try a different search.
        </p>
      )}
    </div>
  );
};

export default Guides;
