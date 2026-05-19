function Services() {
  const services = [
    {
      title: "Frontend Development",
      desc: "Modern responsive websites with beautiful UI and smooth experience.",
    },
    {
      title: "Backend Development",
      desc: "Secure APIs, authentication systems, databases, and scalable backend.",
    },
    {
      title: "Ecommerce Solutions",
      desc: "Complete online stores with payments, dashboards, and management.",
    },
  ];

  return (
    <section class="services-section" id="services">
        <div class="section-label">OUR SERVICES</div>
        <h2 class="section-title">We Provide End-to-End Solutions</h2>
        <div class="services-grid">
            <div class="service-card">
                <div class="service-icon">&lt;/&gt;</div>
                <h3>Frontend Development</h3>
                <p>Pixel-perfect, responsive websites with modern technologies.</p>
            </div>
            <div class="service-card">
                <div class="service-icon">🗄️</div>
                <h3>Backend Development</h3>
                <p>Robust, secure, and scalable backend solutions.</p>
            </div>
            <div class="service-card">
                <div class="service-icon">📦</div>
                <h3>Full Stack Development</h3>
                <p>End-to-end web applications tailored to your needs.</p>
            </div>
            <div class="service-card">
                <div class="service-icon">✏️</div>
                <h3>UI/UX Design</h3>
                <p>Beautiful, intuitive, and user-centered designs that convert.</p>
            </div>
            <div class="service-card">
                <div class="service-icon">🛒</div>
                <h3>E-commerce Solutions</h3>
                <p>Secure and high-performing online stores that drive sales.</p>
            </div>
        </div>
    </section>

  );
}

export default Services;