function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-brand">
            <div className="footer-brand-icon">V</div>
            <span>VMC SkillBridge</span>
          </div>

          <p>
            We help startups and businesses turn their ideas into powerful
            digital products.
          </p>

          <div className="footer-social">
            <a className="social-icon"  title="Facebook">f</a>
            <a className="social-icon"  title="Twitter">𝕏</a>
            <a className="social-icon"  title="LinkedIn">in</a>
            <a className="social-icon"  title="GitHub">⚙</a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><a href="/#about">About Us</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/#team">Our Team</a></li>
            <li><a href="/#blog">Blog</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            <li><a href="/#services">Frontend Development</a></li>
            <li><a href="/#services">Backend Development</a></li>
            <li><a href="/#services">Full Stack Development</a></li>
            <li><a href="/#services">UI/UX Design</a></li>
            <li><a href="/#services">E-commerce Solutions</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li>Case Studies</li>
            <li>Documentation</li>
            <li>FAQs</li>
            <li>Pricing</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li><a href="mailto:vmcskillbridge@gmail.com">📧 vmcskillbridge@gmail.com</a></li>
            <li><a href="tel:+91 9876543210">📞 +91 9876543210</a></li>
            <li><a href="/contact">📍 Hyderabad, India</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 VMC SkillBridge. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;