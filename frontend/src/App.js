import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import StatsCard from './components/StatsCard';
import SearchBar from './components/SearchBar';
import DarkModeToggle from './components/DarkModeToggle';

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (task) => {
    try {
      const res = await axios.post(API_URL, task);
      setTasks(prev => [res.data, ...prev]);
      toast.success('Task added ✨');
    } catch (err) {
      toast.error('Failed to add task');
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, { is_complete: !currentStatus });
      setTasks(prev => prev.map(t => t.id === id ? res.data : t));
      toast.success(!currentStatus ? '🎉 Completed!' : 'Reopened');
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const deleteTask = async (id) => {
    if (window.confirm('Delete this task?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setTasks(prev => prev.filter(t => t.id !== id));
        toast.success('Task deleted');
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  const updateTask = async (id, updatedData) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedData);
      setTasks(prev => prev.map(t => t.id === id ? res.data : t));
      toast.success('Task updated');
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter =
      filter === 'all' ? true : filter === 'pending' ? !task.is_complete : task.is_complete;
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
      if (e.key === 'Escape') setSearchTerm('');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50'}`}>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
            <div className="text-4xl">📋</div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">TaskMaster Pro</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Organize, prioritize, succeed</p>
            </div>
          </motion.div>
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        <StatsCard tasks={tasks} />
        <TaskForm onAdd={addTask} />

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <FilterBar filter={filter} setFilter={setFilter} />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <TaskList
              key={filter + searchTerm}
              tasks={filteredTasks}
              onToggle={toggleComplete}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default App;