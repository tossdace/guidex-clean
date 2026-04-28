import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import guides from "../data/guides";

const Guides = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const locationFilter = searchParams.get("location") || "";
  const [search, setSearch] = useState(() => locationFilter);
  const [budget, setBudget] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (search) {
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
  }, [search]);

  const filtered = guides.filter((g) => {
    return (
      g.location.toLowerCase().includes(search.toLowerCase()) &&
      (budget === "" || g.price <= budget) &&
      (language === "" || g.language === language)
    );
  });

  if (loading) {
    return (
      <p
        style={{
          padding: "2rem",
          minHeight: "100vh",
          background: "#020617",
          color: "white",
        }}
      >
        Loading guides...
      </p>
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        minHeight: "100vh",
        background: "#020617",
        color: "white",
      }}
    >
      <h1 style={{ marginBottom: "1rem", fontWeight: "700" }}>
        Find Trusted Local Guides
      </h1>

      {search && (
        <p
          style={{
            marginBottom: "1rem",
            color: "#22c55e",
            fontWeight: "bold",
          }}
        >
          Showing guides for: {search}
        </p>
      )}

      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          style={{
            marginBottom: "1rem",
            padding: "6px 10px",
            background: "#ef4444",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            color: "white",
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
          background: "#0f172a",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "white",
          borderRadius: "6px",
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
          style={{
            padding: "8px",
            background: "#0f172a",
            color: "white",
            border: "1px solid rgba(255,255,255,0.1)",
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
            background: "#0f172a",
            color: "white",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "6px",
          }}
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
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0 12px 35px rgba(34,197,94,0.15)";
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
                const confirm = window.confirm(
                  "Continue to WhatsApp to chat with this guide?"
                );

                if (!confirm) return;

                const msg = `Hi! I found Hirevoy 👋

I'm interested in booking a local guide.

📍 Location: ${g.location}
👤 Guide: ${g.name}
💰 Budget: ₹${g.price}

Can you share details and availability?`;
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
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "0 6px 20px rgba(34,197,94,0.3)",
                transition: "transform 0.2s ease",
              }}
            >
              Chat with Guide
            </button>
            <p
              style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: "6px" }}
            >
              Usually responds within minutes ⚡
            </p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ marginTop: "2rem" }}>
          <p style={{ color: "#94a3b8" }}>No guides found for "{search}"</p>

          <button
            type="button"
            onClick={() => setSearch("")}
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              background: "#22c55e",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            View All Guides
          </button>
        </div>
      )}
    </div>
  );
};

export default Guides;
