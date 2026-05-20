import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://vmcskillbridge.onrender.com";

function ManageContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/contacts`
      );

      setContacts(res.data.contacts || []);
    } catch (error) {
      console.log("Contacts fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const deleteContact = async (id) => {
    const confirmDelete =
      window.confirm("Delete this contact?");

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_URL}/api/contacts/${id}`
      );

      fetchContacts();
    } catch (error) {
      console.log("Delete error:", error);
      alert("Failed to delete contact");
    }
  };

  return (
    <div className="admin-section">
      <h1>Contacts</h1>

      <p>Project requests from users</p>

      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Project</th>
              <th>Budget</th>
              <th>Timeline</th>
              <th>File</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8">
                  Loading contacts...
                </td>
              </tr>
            ) : contacts.length > 0 ? (
              contacts.map((item) => (
                <tr key={item._id}>
                  <td>{item.fullName}</td>

                  <td>{item.email}</td>

                  <td>{item.phone}</td>

                  <td>{item.projectType}</td>

                  <td>{item.budget}</td>

                  <td>{item.timeline}</td>

                  <td>
                    {item.fileUrl ? (
                      <a
                        href={`${API_URL}${item.fileUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="admin-link"
                      >
                        Open File
                      </a>
                    ) : (
                      "No file"
                    )}
                  </td>

                  <td>
                    <button
                      className="admin-delete-btn"
                      onClick={() =>
                        deleteContact(item._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">
                  No contacts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageContacts;