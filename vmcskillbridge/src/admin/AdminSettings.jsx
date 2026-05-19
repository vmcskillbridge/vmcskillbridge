import { useState } from "react";

function AdminSettings() {
  const [adminEmail, setAdminEmail] = useState(
    localStorage.getItem("adminEmail") || "admin@vmcskillbridge.com"
  );

  const [newPassword, setNewPassword] = useState("");

  const [websiteInfo, setWebsiteInfo] = useState({
    brand: localStorage.getItem("brandName") || "VMC SkillBridge",
    location: localStorage.getItem("brandLocation") || "Hyderabad, India",
    email:
      localStorage.getItem("brandEmail") || "vmcskillbridge@gmail.com",
  });

  const changePassword = () => {
    if (!newPassword.trim()) {
      alert("Enter new password");
      return;
    }

    localStorage.setItem("adminPassword", newPassword);
    setNewPassword("");
    alert("Password changed successfully");
  };

  const saveAdminEmail = () => {
    localStorage.setItem("adminEmail", adminEmail);
    alert("Admin email updated successfully");
  };

  const saveWebsiteInfo = () => {
    localStorage.setItem("brandName", websiteInfo.brand);
    localStorage.setItem("brandLocation", websiteInfo.location);
    localStorage.setItem("brandEmail", websiteInfo.email);

    alert("Website info updated successfully");
  };

  return (
    <div className="admin-section">
      <h1>Settings</h1>
      <p>Manage admin preferences and website settings.</p>

      <div className="settings-grid">
        <div className="settings-card">
          <h3>Admin Account</h3>

          <label>Admin Email</label>
          <input
            className="settings-input"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />

          <button className="admin-action-btn" onClick={saveAdminEmail}>
            Save Email
          </button>
        </div>

        <div className="settings-card">
          <h3>Change Password</h3>

          <label>New Password</label>
          <input
            className="settings-input"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button className="admin-action-btn" onClick={changePassword}>
            Change Password
          </button>
        </div>

        <div className="settings-card">
          <h3>Website Info</h3>

          <label>Brand Name</label>
          <input
            className="settings-input"
            value={websiteInfo.brand}
            onChange={(e) =>
              setWebsiteInfo({ ...websiteInfo, brand: e.target.value })
            }
          />

          <label>Location</label>
          <input
            className="settings-input"
            value={websiteInfo.location}
            onChange={(e) =>
              setWebsiteInfo({ ...websiteInfo, location: e.target.value })
            }
          />

          <label>Email</label>
          <input
            className="settings-input"
            value={websiteInfo.email}
            onChange={(e) =>
              setWebsiteInfo({ ...websiteInfo, email: e.target.value })
            }
          />

          <button className="admin-action-btn" onClick={saveWebsiteInfo}>
            Edit Info
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;