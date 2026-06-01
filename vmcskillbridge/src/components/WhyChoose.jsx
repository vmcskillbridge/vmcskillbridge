import { motion } from "framer-motion";

function WhyChoose() {
  const reasons = [
    {
      icon: "⚡",
      title: "Fast Delivery",
      desc: "We respect your time and deliver projects on schedule.",
    },
    {
      icon: "👥",
      title: "Skilled Developers",
      desc: "Our team consists of experienced and passionate developers.",
    },
    {
      icon: "💵",
      title: "Affordable Pricing",
      desc: "High-quality solutions at prices that fit your budget.",
    },
    {
      icon: "🎧",
      title: "24/7 Support",
      desc: "We are always here to help you anytime, anywhere.",
    },
  ];

  return (
    <section className="why-choose-section" id="about">
      <motion.div
        className="section-label"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        WHY CHOOSE US
      </motion.div>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        We Deliver More Than Expected
      </motion.h2>

      <div className="reasons-grid">
        {reasons.map((item, index) => (
          <motion.div
            className="reason-card"
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
            <div className="reason-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default WhyChoose;