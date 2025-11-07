import React from 'react';
import { Select } from '@/components/ui';

const FilterBar = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-white">Candidatas</h2>
      
      <div className="flex items-center">
        <label htmlFor="filter" className="text-sm text-gray-300 mr-2">
          Filtrar por:
        </label>
        <Select
          id="filter"
          value={activeFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          options={filters.map(filter => ({
            value: filter.id,
            label: filter.name
          }))}
          className="w-40"
        />
      </div>
    </div>
  );
};

export default FilterBar;