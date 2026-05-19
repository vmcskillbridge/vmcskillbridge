import { useEffect, useState } from "react";
import axios from "axios";

function ManageApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/applications")
      .then((res) => setApplications(res.data.applications))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="admin-section">
      <h1>Applications</h1>
      <p>Job applications from candidates</p>

      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Position</th>
              <th>Experience</th>
              <th>Location</th>
              <th>Resume</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((item) => (
              <tr key={item._id}>
                <td>{item.fullName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.position}</td>
                <td>{item.experience}</td>
                <td>{item.location}</td>
                <td>
                  {item.fileUrl ? (
                    <a
                      href={`http://localhost:5000${item.fileUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="admin-link"
                    >
                      Open Resume
                    </a>
                  ) : (
                    "No resume"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageApplications;