import {
  LayoutDashboard,
  FolderKanban,
  Mail,
  Briefcase,
  Settings,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Sidebar({ activePage, setActivePage }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");

    navigate("/admin");
  };

  return (
    <aside className="admin-sidebar">
      <div>
        {/* LOGO */}

        <div className="sidebar-logo">
          <div className="sidebar-icon">
            V
          </div>

          <div>
            <h2>VMC</h2>
            <p>Admin Panel</p>
          </div>
        </div>

        {/* NAVIGATION */}

        <nav className="sidebar-links">

          {/* DASHBOARD */}

          <button
            className={`sidebar-link ${
              activePage === "dashboard"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage("dashboard")
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          {/* PROJECTS */}

          <button
            className={`sidebar-link ${
              activePage === "projects"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage("projects")
            }
          >
            <FolderKanban size={20} />
            Projects
          </button>

          {/* CONTACTS */}

          <button
            className={`sidebar-link ${
              activePage === "contacts"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage("contacts")
            }
          >
            <Mail size={20} />
            Contacts
          </button>

          {/* APPLICATIONS */}

          <button
            className={`sidebar-link ${
              activePage === "applications"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage("applications")
            }
          >
            <Briefcase size={20} />
            Applications
          </button>

          {/* SETTINGS */}

          <button
            className={`sidebar-link ${
              activePage === "settings"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage("settings")
            }
          >
            <Settings size={20} />
            Settings
          </button>
        </nav>
      </div>

      {/* LOGOUT */}

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;