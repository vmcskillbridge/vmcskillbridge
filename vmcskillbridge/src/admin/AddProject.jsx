import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function AddProject() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tech: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/api/projects`, {
        ...formData,
        tech: formData.tech.split(","),
      });

      alert("Project Added Successfully");

      setFormData({
        title: "",
        category: "",
        tech: "",
        description: "",
        image: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to add project");
    }
  };

  return (
    <main className="add-project-page">
      <div className="add-project-card">
        <div className="add-project-top">
          <h1>Add New Project</h1>
          <p>Add portfolio projects to VMC SkillBridge</p>
        </div>

        <form
          className="add-project-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>Project Title</label>

            <input
              type="text"
              name="title"
              placeholder="Enter project title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <input
              type="text"
              name="category"
              placeholder="Web Development"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Tech Stack</label>

            <input
              type="text"
              name="tech"
              placeholder="React, Node.js, MongoDB"
              value={formData.tech}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Project Image URL</label>

            <input
              type="text"
              name="image"
              placeholder="https://image-url.com"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              placeholder="Write project description..."
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            className="add-project-btn"
            type="submit"
          >
            Add Project
          </button>
        </form>
      </div>
    </main>
  );
}

export default AddProject;