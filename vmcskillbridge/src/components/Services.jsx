import { motion } from "framer-motion";

function Services() {
  const services = [
    {
      icon: "</>",
      title: "Frontend Development",
      desc: "Pixel-perfect, responsive websites with modern technologies.",
    },
    {
      icon: "🗄️",
      title: "Backend Development",
      desc: "Robust, secure, and scalable backend solutions.",
    },
    {
      icon: "📦",
      title: "Full Stack Development",
      desc: "End-to-end web applications tailored to your needs.",
    },
    {
      icon: "✏️",
      title: "UI/UX Design",
      desc: "Beautiful, intuitive, and user-centered designs that convert.",
    },
    {
      icon: "🛒",
      title: "E-commerce Solutions",
      desc: "Secure and high-performing online stores that drive sales.",
    },
  ];

  return (
    <section className="services-section" id="services">
      <motion.div
        className="section-label"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        OUR SERVICES
      </motion.div>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        We Provide End-to-End Solutions
      </motion.h2>

      <div className="services-grid">
        {services.map((service, index) => (
          <motion.div
            className="service-card"
            key={index}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.65,
              delay: index * 0.12,
              ease: "easeOut",
            }}
          >
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Services;