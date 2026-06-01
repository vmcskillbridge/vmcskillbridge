import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function CTA() {
  const navigate = useNavigate();

  return (
    <motion.section
      className="cta"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Ready To Build Your Next{" "}
        <span className="gradient-text">Digital Project?</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        Let’s create modern websites, applications, and scalable solutions together.
      </motion.p>

      <motion.button
        className="hero-btn"
        onClick={() => navigate("/contact")}
        whileHover={{
          scale: 1.08,
          y: -3,
        }}
        whileTap={{
          scale: 0.95,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
        }}
      >
        Get Started
      </motion.button>
    </motion.section>
  );
}

export default CTA;