import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
function ManageContacts() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await axios.get(`${API_URL}/contacts`);
    setContacts(res.data.contacts);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const deleteContact = async (id) => {
    const confirmDelete = window.confirm("Delete this contact?");

    if (!confirmDelete) return;

    await axios.delete(`${API_URL}/contacts/${id}`);
    fetchContacts();
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
            {contacts.map((item) => (
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
                    onClick={() => deleteContact(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageContacts;