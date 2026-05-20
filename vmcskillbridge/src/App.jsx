import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Careers from "./pages/Careers";
import Apply from "./pages/Apply";
import Contact from "./pages/Contact";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

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
</Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;