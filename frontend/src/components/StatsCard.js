import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.is_complete).length;
  const pending = total - completed;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 text-center">
        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{total}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 text-center">
        <div className="text-2xl font-bold text-green-600 dark:text-green-400">{completed}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 text-center">
        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{pending}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Pending</div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 text-center">
        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{completionRate}%</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Completion Rate</div>
      </div>
    </motion.div>
  );
};

export default StatsCard;