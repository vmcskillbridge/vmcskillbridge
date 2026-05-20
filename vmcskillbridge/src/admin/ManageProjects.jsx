import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://vmcskillbridge.onrender.com";

function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/projects`)
      .then((res) => {
        setProjects(res.data.projects || []);
      })
      .catch((err) => {
        console.log("Projects fetch error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="admin-section">
      <h1>Projects</h1>
      <p>All projects from MongoDB</p>

      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Tech</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5">Loading projects...</td>
              </tr>
            ) : projects.length > 0 ? (
              projects.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="admin-thumb"
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.tech?.join(", ")}</td>
                  <td>{item.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No projects found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageProjects;