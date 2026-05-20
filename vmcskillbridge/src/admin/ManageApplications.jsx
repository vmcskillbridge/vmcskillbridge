import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://vmcskillbridge.onrender.com";

function ManageApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/applications`)
      .then((res) =>
        setApplications(res.data.applications || [])
      )
      .catch((err) =>
        console.log("Applications fetch error:", err)
      );
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
            {applications.length > 0 ? (
              applications.map((item) => (
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
                        href={`${API_URL}${item.fileUrl}`}
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
              ))
            ) : (
              <tr>
                <td colSpan="7">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageApplications;