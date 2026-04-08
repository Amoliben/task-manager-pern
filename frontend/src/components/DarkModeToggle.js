import React from 'react';
import { motion } from 'framer-motion';

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => setDarkMode(!darkMode)}
      className="relative w-14 h-7 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors duration-300 focus:outline-none"
    >
      <div
        className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
          darkMode ? 'translate-x-7' : 'translate-x-0'
        }`}
      />
      <span className="absolute left-1.5 top-1 text-xs">☀️</span>
      <span className="absolute right-1.5 top-1 text-xs">🌙</span>
    </motion.button>
  );
};

export default DarkModeToggle;