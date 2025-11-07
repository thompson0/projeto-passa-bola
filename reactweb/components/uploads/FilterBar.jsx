import React from 'react';
import { Button } from '@/components/ui';

const FilterBar = ({ 
  mediaTypes, 
  dateFilters, 
  visibilityFilters, 
  filters, 
  onFilterChange,
  onSearch,
  onAddMedia
}) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };
  
  return (
    <div className="bg-background-light rounded-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white mb-4 md:mb-0">Minha Galeria</h2>
        
        <Button 
          variant="primary" 
          onClick={onAddMedia}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Enviar mídia
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Campo de busca */}
        <div className="md:col-span-1">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full bg-background border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={handleSearchChange}
          />
        </div>
        
        {/* Filtro de Tipo */}
        <div>
          <select
            value={filters.type || 'todos'}
            onChange={(e) => onFilterChange('type', e.target.value)}
            className="w-full bg-background border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {mediaTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Filtro de Data */}
        <div>
          <select
            value={filters.date || 'todos'}
            onChange={(e) => onFilterChange('date', e.target.value)}
            className="w-full bg-background border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {dateFilters.map((date) => (
              <option key={date.id} value={date.id}>
                {date.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Filtro de Visibilidade */}
        <div>
          <select
            value={filters.visibility || 'todos'}
            onChange={(e) => onFilterChange('visibility', e.target.value)}
            className="w-full bg-background border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {visibilityFilters.map((visibility) => (
              <option key={visibility.id} value={visibility.id}>
                {visibility.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;