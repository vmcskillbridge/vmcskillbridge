import { useEffect, useState } from "react";
import axios from "axios";

function ManageProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/projects")
      .then((res) => setProjects(res.data.projects))
      .catch((err) => console.log(err));
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
            {projects.map((item) => (
              <tr key={item._id}>
                <td>
                  <img src={item.image} alt={item.title} className="admin-thumb" />
                </td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.tech?.join(", ")}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageProjects;