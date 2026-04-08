import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaCheck, FaUndo } from 'react-icons/fa';

const priorityColors = {
  low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const TaskItem = ({ task, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editDeadline, setEditDeadline] = useState(task.deadline.split('T')[0]);
  const [editPriority, setEditPriority] = useState(task.priority || 'medium');

  const isOverdue = !task.is_complete && new Date(task.deadline) < new Date();
  const today = new Date().toDateString();
  const deadlineDate = new Date(task.deadline).toDateString();

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return;
    onUpdate(task.id, {
      title: editTitle,
      description: editDescription,
      deadline: editDeadline,
      priority: editPriority,
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <motion.div layout className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-3">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full mb-2 px-3 py-1 border rounded dark:bg-gray-700"
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="w-full mb-2 px-3 py-1 border rounded dark:bg-gray-700"
          rows="2"
        />
        <input
          type="date"
          value={editDeadline}
          onChange={(e) => setEditDeadline(e.target.value)}
          className="w-full mb-2 px-3 py-1 border rounded dark:bg-gray-700"
        />
        <select
          value={editPriority}
          onChange={(e) => setEditPriority(e.target.value)}
          className="w-full mb-2 px-3 py-1 border rounded dark:bg-gray-700"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <div className="flex gap-2">
          <button onClick={handleSaveEdit} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-3 py-1 rounded">Cancel</button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ scale: 1.01 }}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-3 border-l-8 transition-all ${
        task.is_complete ? 'border-green-500 opacity-75' : isOverdue ? 'border-red-500' : 'border-indigo-500'
      }`}
    >
      <div className="flex flex-col md:flex-row md:justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className={`text-lg font-semibold ${task.is_complete ? 'line-through text-gray-500' : 'text-gray-800 dark:text-white'}`}>
              {task.title}
            </h3>
            <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority || 'medium']}`}>
              {task.priority === 'high' ? '🔴 High' : task.priority === 'medium' ? '🟡 Medium' : '🟢 Low'}
            </span>
            {isOverdue && <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">⏰ Overdue</span>}
            {deadlineDate === today && !task.is_complete && <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">Due today</span>}
          </div>
          {task.description && <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{task.description}</p>}
          <div className="text-xs text-gray-500 dark:text-gray-400 flex gap-4">
            <span>📅 {new Date(task.deadline).toDateString()}</span>
            <span>🕒 {new Date(task.created_at).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onToggle(task.id, task.is_complete)}
            className="p-2 rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition"
            title={task.is_complete ? 'Undo' : 'Complete'}
          >
            {task.is_complete ? <FaUndo /> : <FaCheck />}
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;