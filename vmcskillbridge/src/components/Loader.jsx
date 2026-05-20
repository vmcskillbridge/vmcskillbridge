import { motion } from "framer-motion";

function Loader() {
  return (
    <div className="loader-screen">
      <motion.div
        className="loader-logo"
        initial={{
          scale: 0.7,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        <div className="loader-circle">
          V
        </div>

        <h1>VMC SkillBridge</h1>

        <div className="loader-bar">
          <motion.div
            className="loader-progress"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default Loader;