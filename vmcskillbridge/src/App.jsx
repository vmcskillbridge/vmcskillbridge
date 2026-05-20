import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Careers from "./pages/Careers";
import Apply from "./pages/Apply";
import Contact from "./pages/Contact";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AddProject from "./admin/AddProject";
import Chatbot from "./components/Chatbot";

function Layout() {
  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />
        <Route path="/admin/add-project" element={<AddProject />}
        />
      </Routes>
      

      {!isAdminPage && <Footer />}
      {!isAdminPage && <Chatbot />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Layout />
      </div>
    </BrowserRouter>
  );
}

export default App;