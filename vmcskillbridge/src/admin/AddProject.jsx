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
    <div className="admin-section">
      <h1>Add Project</h1>

      <form className="project-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="tech"
          placeholder="React, Node.js, MongoDB"
          value={formData.tech}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">
          Add Project
        </button>
      </form>
    </div>
  );
}

export default AddProject;