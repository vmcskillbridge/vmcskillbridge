import { useEffect, useState } from "react";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/projects");
        setProjects(res.data.projects);
      } catch (error) {
        console.log("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const nextProject = () => {
    if (filteredProjects.length === 0) return;

    setCurrentIndex((prev) =>
      prev === filteredProjects.length - 1 ? 0 : prev + 1
    );
  };

  const prevProject = () => {
    if (filteredProjects.length === 0) return;

    setCurrentIndex((prev) =>
      prev === 0 ? filteredProjects.length - 1 : prev - 1
    );
  };

  const handleFilter = (category) => {
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  return (
    <section className="projects-section" id="projects">
      <div className="section-label">OUR PROJECTS</div>

      <h2 className="section-title">Work That Speaks</h2>

      <div className="projects-tabs">
        <button
          className={`tab-btn ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => handleFilter("all")}
        >
          All
        </button>

        <button
          className={`tab-btn ${activeCategory === "web" ? "active" : ""}`}
          onClick={() => handleFilter("web")}
        >
          Web Apps
        </button>

        <button
          className={`tab-btn ${activeCategory === "mobile" ? "active" : ""}`}
          onClick={() => handleFilter("mobile")}
        >
          Mobile Apps
        </button>

        <button
          className={`tab-btn ${
            activeCategory === "ecommerce" ? "active" : ""
          }`}
          onClick={() => handleFilter("ecommerce")}
        >
          E-commerce
        </button>
      </div>

      {filteredProjects.length === 0 ? (
        <p className="section-subtitle">No projects found.</p>
      ) : (
        <>
          <div className="projects-slider">
            <div
              className="projects-grid"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {filteredProjects.map((project) => (
                <div className="project-card" key={project._id}>
                  <div className="project-image">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-card-image"
                    />
                  </div>

                  <div className="project-info">
                    <div className="project-title">{project.title}</div>

                    <div className="project-tech">
                      {project.tech.map((item, i) => (
                        <span className="tech-tag" key={i}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="project-desc">{project.description}</p>

                  
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-controls">
            <button className="carousel-btn" onClick={prevProject}>
              ‹
            </button>

            <button className="carousel-btn" onClick={nextProject}>
              ›
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Projects;