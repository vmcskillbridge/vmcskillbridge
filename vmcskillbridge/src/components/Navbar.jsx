import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`navbar ${
        scrolled ? "navbar-scrolled" : ""
      }`}
    >
      <div className="nav-container">
        <Link
          to="/"
          className="logo"
          onClick={() => setMenuOpen(false)}
        >
          <motion.div
            whileHover={{
              rotate: 8,
              scale: 1.08,
            }}
            className="logo-icon"
          >
            V
          </motion.div>

          <span>VMC SkillBridge</span>
        </Link>

        <nav
          className={`nav-menu ${
            menuOpen ? "active" : ""
          }`}
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <a
            href="/#services"
            onClick={() => setMenuOpen(false)}
          >
            Services
          </a>

          <a
            href="/#projects"
            onClick={() => setMenuOpen(false)}
          >
            Projects
          </a>

          <a
            href="/#about"
            onClick={() => setMenuOpen(false)}
          >
            About
          </a>

          <Link
            to="/careers"
            onClick={() => setMenuOpen(false)}
          >
            Careers
          </Link>

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="menu-toggle"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.div
                key="close"
                initial={{
                  rotate: -90,
                  opacity: 0,
                }}
                animate={{
                  rotate: 0,
                  opacity: 1,
                }}
                exit={{
                  rotate: 90,
                  opacity: 0,
                }}
              >
                <X size={28} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{
                  rotate: 90,
                  opacity: 0,
                }}
                animate={{
                  rotate: 0,
                  opacity: 1,
                }}
                exit={{
                  rotate: -90,
                  opacity: 0,
                }}
              >
                <Menu size={28} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.header>
  );
}

export default Navbar;