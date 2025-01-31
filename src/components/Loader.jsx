import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      ></motion.div>
    </motion.div>
  );
};

export default Loader;
