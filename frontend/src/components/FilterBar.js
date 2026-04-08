import React from 'react';
import { motion } from 'framer-motion';
import { FaList, FaClock, FaCheckCircle } from 'react-icons/fa';

const filters = [
  { value: 'all', label: 'All', icon: <FaList /> },
  { value: 'pending', label: 'Pending', icon: <FaClock /> },
  { value: 'completed', label: 'Completed', icon: <FaCheckCircle /> },
];

const FilterBar = ({ filter, setFilter }) => {
  return (
    <div className="flex gap-2 bg-white dark:bg-gray-800 p-1 rounded-xl shadow-sm">
      {filters.map((f) => (
        <motion.button
          key={f.value}
          whileTap={{ scale: 0.97 }}
          onClick={() => setFilter(f.value)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium transition-all ${
            filter === f.value
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {f.icon}
          {f.label}
        </motion.button>
      ))}
    </div>
  );
};

export default FilterBar;