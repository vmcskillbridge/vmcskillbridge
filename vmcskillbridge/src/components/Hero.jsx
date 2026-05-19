import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const scrollToServices = () => {
    const section = document.getElementById("services");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <span className="badge">🚀 VMC SkillBridge</span>

        <h1 className="hero-title">
          Build Your Digital Future With{" "}
          <span className="gradient-text">
            Expert Developers
          </span>
        </h1>

        <p className="hero-text">
          We create modern websites, full-stack applications,
          ecommerce platforms, and digital solutions for startups,
          businesses, and freelancers.
        </p>

        <div className="hero-buttons">
          <button
            className="hero-btn"
            onClick={() => navigate("/contact")}
          >
            Start a Project
          </button>

          <button
            className="btn-outline"
            onClick={scrollToServices}
          >
            Explore Services
          </button>
        </div>
      </div>

      <div className="hero-visual">
        <img
          src="/heroimg.png"
          alt="Hero Visual"
        />
      </div>
    </section>
  );
}

export default Hero;