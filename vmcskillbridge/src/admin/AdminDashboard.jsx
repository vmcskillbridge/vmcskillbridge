import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import DashboardHome from "./DashboardHome";
import ManageProjects from "./ManageProjects";
import ManageContacts from "./ManageContacts";
import ManageApplications from "./ManageApplications";
import AdminSettings from "./AdminSettings";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");

    if (isLoggedIn !== "true") {
      navigate("/admin");
    }
  }, [navigate]);

  const renderPage = () => {
    if (activePage === "projects") return <ManageProjects />;
    if (activePage === "contacts") return <ManageContacts />;
    if (activePage === "applications") return <ManageApplications />;
    if (activePage === "settings") return <AdminSettings />;

    return <DashboardHome />;
  };

  return (
    <main className="admin-dashboard">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="admin-main-content">
        {renderPage()}
      </div>
    </main>
  );
}

export default AdminDashboard;