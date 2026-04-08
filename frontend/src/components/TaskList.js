import React from 'react';
import { AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggle, onDelete, onUpdate }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <p className="text-gray-500 dark:text-gray-400">✨ No tasks match. Create a new one! ✨</p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </AnimatePresence>
  );
};

export default TaskList;