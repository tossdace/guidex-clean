import { Link, useParams } from "react-router-dom";
import guides from "../data/guides";

const GuideProfile = () => {
  const { id } = useParams();

  const guide = guides.find((g) => g.id === id);

  if (!guide) return <h2>Guide not found</h2>;

  const similarGuides = guides
    .filter((g) => g.id !== guide.id)
    .slice(0, 2);

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>{guide.name}</h1>
      <p>
        <strong>Location:</strong> {guide.location}
      </p>
      <p>
        <strong>Price:</strong> ₹{guide.price}
      </p>
      <p>
        <strong>Language:</strong> {guide.language}
      </p>
      <p>
        <strong>Rating:</strong> ⭐ {guide.rating}
      </p>

      <p style={{ color: "#22c55e", fontWeight: "bold" }}>
        ✔ Verified Guide
      </p>

      <p style={{ color: "#94a3b8" }}>👥 50+ Travelers guided</p>

      <p style={{ color: "#94a3b8" }}>⏱ 3+ years experience</p>

      <div style={{ marginTop: "1rem", lineHeight: "1.6" }}>
        <strong>About:</strong>
        <p>{guide.description}</p>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <strong>Why choose this guide?</strong>
        <ul style={{ marginTop: "0.5rem" }}>
          <li>Local expertise in {guide.location}</li>
          <li>Friendly and flexible tours</li>
          <li>Trusted by travelers</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "2rem" }}>Similar Guides</h3>

      <div style={{ display: "grid", gap: "0.75rem" }}>
        {similarGuides.map((similarGuide) => (
          <Link
            key={similarGuide.id}
            to={`/guides/${similarGuide.id}`}
            style={{
              padding: "1rem",
              borderRadius: "8px",
              background: "#1e293b",
              color: "white",
              textDecoration: "none",
            }}
          >
            <strong>{similarGuide.name}</strong>
            <p style={{ margin: "0.35rem 0 0" }}>
              {similarGuide.location} • ₹{similarGuide.price} • ⭐{" "}
              {similarGuide.rating}
            </p>
          </Link>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          const msg = `Hi, I found Hirevoy.

I'm interested in booking a guide.

Location: ${guide.location}
Guide: ${guide.name}
Budget: ₹${guide.price}`;
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
          marginTop: "20px",
          padding: "12px 20px",
          background: "#22c55e",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "transform 0.2s ease",
        }}
      >
        Contact on WhatsApp
      </button>
    </div>
  );
};

export default GuideProfile;
