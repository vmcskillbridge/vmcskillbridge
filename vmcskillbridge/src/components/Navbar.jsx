import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <div className="logo-icon">V</div>
          <span>VMC SkillBridge</span>
        </Link>

        <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <a href="/#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="/#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="/#about" onClick={() => setMenuOpen(false)}>About</a>
          <Link to="/careers" onClick={() => setMenuOpen(false)}>Careers</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </nav>

        

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;