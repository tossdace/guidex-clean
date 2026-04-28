import { Link, useNavigate } from "react-router-dom";

const destinations = [
  {
    name: "Fort Kochi",
    desc: "Historic coastal neighborhood known for colonial architecture, Chinese fishing nets, and walkable seaside charm.",
    longDesc:
      "Fort Kochi is a historic, water-bound neighborhood in Kochi, Kerala, renowned for its rich colonial heritage, distinct European architecture (Portuguese, Dutch, and British), and iconic Chinese fishing nets. As the site of the first European fort in India, Fort Manuel, it serves as a major cultural tourism hub featuring walkable streets, heritage bungalows, and seaside charm.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
    guides: 12,
  },
  {
    name: "Cherai Beach",
    desc: "Pristine golden sand beach with calm waters, palm-lined shoreline, and scenic backwater views near Kochi.",
    longDesc:
      "Cherai Beach, located on Vypin Island near Kochi, Kerala, is a 10 km long, pristine coastal destination known for its shallow, gentle waters ideal for swimming. Often called the Princess of the Arabian Sea, it offers a unique combination of scenic backwaters and the sea in one view, featuring golden sands, coconut groves, and frequent dolphin sightings.",
    image: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b",
    guides: 8,
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
              className="destination-card animate-fadeInUp"
              onClick={() => openGuidesFor(destination.name)}
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="destination-card-image"
              />

              <div className="destination-card-overlay" />

              <div className="destination-card-content">
                <h2 className="destination-card-title">{destination.name}</h2>

                <p className="destination-card-desc line-clamp-2">
                  {destination.desc}
                </p>

                <p className="destination-card-guides">✓ Verified guides available</p>

                <button
                  type="button"
                  className="destination-card-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openGuidesFor(destination.name);
                  }}
                >
                  Explore Guides
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
