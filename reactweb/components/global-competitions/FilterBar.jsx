import React from 'react';

const FilterBar = ({ 
  continents, 
  years, 
  categories, 
  filters, 
  onFilterChange 
}) => {
  return (
    <div className="bg-background-light rounded-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Filtro de Continente */}
        <div>
          <label className="block text-sm font-medium text-accent mb-2">
            Continente
          </label>
          <select
            value={filters.continent || 'todos'}
            onChange={(e) => onFilterChange('continent', e.target.value)}
            className="w-full bg-background border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="todos">Todos os continentes</option>
            {continents.map((continent) => (
              <option key={continent.id} value={continent.id}>
                {continent.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Filtro de Ano */}
        <div>
          <label className="block text-sm font-medium text-accent mb-2">
            Ano
          </label>
          <select
            value={filters.year || 'todos'}
            onChange={(e) => onFilterChange('year', e.target.value)}
            className="w-full bg-background border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="todos">Todos os anos</option>
            {years.map((year) => (
              <option key={year.id} value={year.id}>
                {year.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Filtro de Categoria */}
        <div>
          <label className="block text-sm font-medium text-accent mb-2">
            Categoria
          </label>
          <select
            value={filters.category || 'todos'}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full bg-background border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="todos">Todas as categorias</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;