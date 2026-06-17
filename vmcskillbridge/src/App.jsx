import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { useEffect, useState } from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Loader from "./components/Loader";

import Home from "./pages/Home";
import Careers from "./pages/Careers";
import Apply from "./pages/Apply";
import Contact from "./pages/Contact";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AddProject from "./admin/AddProject";
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute";

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -40,
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="page-transition"
    >
      {children}
    </motion.div>
  );
}

function Layout() {
  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes
          location={location}
          key={location.pathname}
        >
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />

          <Route
            path="/careers"
            element={
              <PageWrapper>
                <Careers />
              </PageWrapper>
            }
          />

          <Route
            path="/apply"
            element={
              <PageWrapper>
                <Apply />
              </PageWrapper>
            }
          />

          <Route
            path="/contact"
            element={
              <PageWrapper>
                <Contact />
              </PageWrapper>
            }
          />

          <Route
            path="/admin"
            element={<AdminLogin />}
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/add-project"
            element={
              <ProtectedAdminRoute>
                <AddProject />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </AnimatePresence>

      {!isAdminPage && <Footer />}
      {!isAdminPage && <Chatbot />}
    </>
  );
}

function AppContent() {
  const [scrollProgress, setScrollProgress] =
    useState(0);

  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress =
        totalHeight > 0
          ? (window.scrollY / totalHeight) * 100
          : 0;

      setScrollProgress(progress);
    };

    const handleMouseMove = (e) => {
      setCursor({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  useEffect(() => {
    const reveals =
      document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "active"
            );
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    reveals.forEach((el) =>
      observer.observe(el)
    );

    return () => {
      reveals.forEach((el) =>
        observer.unobserve(el)
      );
    };
  }, []);

  return (
    <>
      <div
        className="scroll-progress"
        style={{
          width: `${scrollProgress}%`,
        }}
      />

      <div
        className="cursor-glow"
        style={{
          left: `${cursor.x}px`,
          top: `${cursor.y}px`,
        }}
      />

      <div className="app">
        <Layout />
      </div>
    </>
  );
}

function App() {
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;