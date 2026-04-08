import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative flex-1">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        id="search-input"
        type="text"
        placeholder="Search tasks... (Ctrl+K)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default SearchBar;