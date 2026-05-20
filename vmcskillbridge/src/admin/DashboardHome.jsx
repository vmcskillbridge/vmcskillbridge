import { useEffect, useState } from "react";
import axios from "axios";

import {
  FolderKanban,
  Mail,
  Briefcase,
  Users,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "https://vmcskillbridge.onrender.com";

function DashboardHome() {
  const [stats, setStats] = useState({
    projects: 0,
    contacts: 0,
    applications: 0,
    clients: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, contactsRes, applicationsRes] =
          await Promise.all([
            axios.get(`${API_URL}/api/projects`),
            axios.get(`${API_URL}/api/contacts`),
            axios.get(`${API_URL}/api/applications`),
          ]);

        setStats({
          projects: projectsRes.data.projects?.length || 0,
          contacts: contactsRes.data.contacts?.length || 0,
          applications: applicationsRes.data.applications?.length || 0,
          clients: contactsRes.data.contacts?.length || 0,
        });
      } catch (error) {
        console.log("Dashboard stats error:", error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Projects",
      value: stats.projects,
      icon: <FolderKanban />,
    },
    {
      title: "Contacts",
      value: stats.contacts,
      icon: <Mail />,
    },
    {
      title: "Applications",
      value: stats.applications,
      icon: <Briefcase />,
    },
    {
      title: "Clients",
      value: stats.clients,
      icon: <Users />,
    },
  ];

  return (
    <div className="dashboard-home">
      <div className="dashboard-top">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Live data from MongoDB</p>
        </div>
      </div>

      <div className="dashboard-stats">
        {cards.map((item, index) => (
          <div className="dashboard-card" key={index}>
            <div className="dashboard-card-icon">{item.icon}</div>

            <h2>{item.value}</h2>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardHome;