import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/projects`);
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
      <motion.div
        className="section-label"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        OUR PROJECTS
      </motion.div>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Work That Speaks
      </motion.h2>

      <motion.div
        className="projects-tabs"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <button className={`tab-btn ${activeCategory === "all" ? "active" : ""}`} onClick={() => handleFilter("all")}>All</button>
        <button className={`tab-btn ${activeCategory === "web" ? "active" : ""}`} onClick={() => handleFilter("web")}>Web Apps</button>
        <button className={`tab-btn ${activeCategory === "mobile" ? "active" : ""}`} onClick={() => handleFilter("mobile")}>Mobile Apps</button>
        <button className={`tab-btn ${activeCategory === "ecommerce" ? "active" : ""}`} onClick={() => handleFilter("ecommerce")}>E-commerce</button>
      </motion.div>

      {filteredProjects.length === 0 ? (
        <p className="section-subtitle">No projects found.</p>
      ) : (
        <>
          <motion.div
            className="projects-slider"
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="projects-grid"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {filteredProjects.map((project) => (
                <motion.div
                  className="project-card"
                  key={project._id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6 }}
                >
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
                      {project.tech?.map((item, i) => (
                        <span className="tech-tag" key={i}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="project-desc">{project.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="carousel-controls"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <button className="carousel-btn" onClick={prevProject}>‹</button>
            <button className="carousel-btn" onClick={nextProject}>›</button>
          </motion.div>
        </>
      )}
    </section>
  );
}

export default Projects;