import { motion } from "framer-motion"; 
import Hero from "../components/Hero"; 
import Services from "../components/Services"; 
import Projects from "../components/Projects"; 
import WhyChoose from "../components/WhyChoose"; 
import CTA from "../components/CTA"; 
function Home() { 
  return ( <> <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} > 
  <Hero /> </motion.div> 
  <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} > 
    <Services /> </motion.div> 
    <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} > 
      <Projects /> </motion.div> 
      <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} > 
        <WhyChoose /> </motion.div> 
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} > 
          <CTA /> </motion.div> </> ); }
export default Home;