import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('medium');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title required';
    if (!deadline) newErrors.deadline = 'Deadline required';
    else if (new Date(deadline) < new Date().setHours(0, 0, 0, 0)) newErrors.deadline = 'Cannot be in past';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onAdd({ title, description, deadline, priority });
    setTitle('');
    setDescription('');
    setDeadline('');
    setPriority('medium');
    setErrors({});
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">➕ New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="Task title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:text-white ${errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
          <div>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:text-white ${errors.deadline ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            />
            {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
          </div>
          <div className="md:col-span-2">
            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="2"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="low">🟢 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
          </div>
          <div>
            <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition-all transform hover:scale-[1.02]">
              Add Task
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default TaskForm;