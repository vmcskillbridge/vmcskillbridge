import { useNavigate } from "react-router-dom";
function CTA() {
  const navigate = useNavigate();

  return (
    <section className="cta">
      <h2>
        Ready To Build Your Next{" "}
        <span className="gradient-text">Digital Project?</span>
      </h2>

      <p>
        Let’s create modern websites, applications, and scalable solutions together.
      </p>

      <button className="hero-btn" onClick={() => navigate("/contact")}>
        Get Started
      </button>
    </section>
  );
}

export default CTA;