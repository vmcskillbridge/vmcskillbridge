import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://vmcskillbridge.onrender.com";

function ManageApplications() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/applications`);
      setApplications(res.data.applications || []);
    } catch (error) {
      console.log("Applications fetch error:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/api/applications/${id}/status`, {
        status,
      });

      alert(`Application ${status}`);
      fetchApplications();
    } catch (error) {
      console.log("Status update error:", error);
      alert("Failed to update application status");
    }
  };

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
              <th>Status</th>
              <th>Resume</th>
              <th>Action</th>
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
                  <td>{item.status || "Pending"}</td>
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
                  <td>
                    <button
                      className="admin-action-btn"
                      onClick={() => updateStatus(item._id, "Accepted")}
                    >
                      Accept
                    </button>

                    <button
                      className="admin-delete-btn"
                      onClick={() => updateStatus(item._id, "Rejected")}
                      style={{ marginLeft: "8px" }}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No applications found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageApplications;