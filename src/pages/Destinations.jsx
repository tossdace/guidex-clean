import { Link, useNavigate } from "react-router-dom";

const destinations = [
  {
    name: "Fort Kochi",
    desc: "Historic coastal area known for colonial architecture, Chinese fishing nets, and cultural streets.",
    location: "Kochi"
  },
  {
    name: "Cherai Beach",
    desc: "A long, calm beach with shallow waters, coconut groves, and occasional dolphin sightings.",
    location: "Kochi"
  },
  {
    name: "Munnar",
    desc: "Hill station famous for tea plantations, misty valleys, and scenic viewpoints.",
    location: "Munnar"
  },
  {
    name: "Alleppey",
    desc: "Backwater paradise with houseboats, canals, and slow village life.",
    location: "Alleppey"
  },
  {
    name: "Wayanad",
    desc: "Forest-covered hills with waterfalls, caves, and wildlife experiences.",
    location: "Wayanad"
  },
  {
    name: "Varkala",
    desc: "Cliffside beach destination with cafes, sunsets, and spiritual vibes.",
    location: "Varkala"
  }
];

const Destinations = () => {
  const navigate = useNavigate();

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
          {destinations.map((d, i) => (
            <div key={i} className="destination-card">
              <h3 className="destination-title">{d.name}</h3>
              <p className="destination-desc">{d.desc}</p>

              <button
                className="destination-btn"
                onClick={() => navigate(`/guides?location=${d.location}`)}
              >
                Find Guides in {d.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
