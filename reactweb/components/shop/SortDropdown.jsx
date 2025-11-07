import React from 'react';

const SortDropdown = ({ sortOptions, activeSort, onSortChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort" className="text-sm text-gray-300">
        Ordenar por:
      </label>
      <select
        id="sort"
        value={activeSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="bg-background border border-gray-700 rounded-md py-1 px-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {sortOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;