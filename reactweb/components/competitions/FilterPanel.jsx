import React from 'react';
import { Button } from '@/components/ui';

const FilterPanel = ({ 
  states, 
  categories, 
  types, 
  filters, 
  onFilterChange, 
  onClearFilters,
  selectedState,
  selectedCompetition,
  onViewRegulations,
  onApply
}) => {
  return (
    <div className="bg-background-light rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6">Filtros</h2>
      
      {/* Estado */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-accent mb-2">
          Estado
        </label>
        <select
          value={filters.state || ''}
          onChange={(e) => onFilterChange('state', e.target.value)}
          className="w-full bg-background border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Todos os estados</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Categoria */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-accent mb-2">
          Categoria
        </label>
        <select
          value={filters.category || ''}
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="w-full bg-background border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Todas as categorias</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Tipo */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-accent mb-2">
          Tipo
        </label>
        <select
          value={filters.type || ''}
          onChange={(e) => onFilterChange('type', e.target.value)}
          className="w-full bg-background border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Todos os tipos</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Botão para limpar filtros */}
      <div className="mb-8">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={onClearFilters}
        >
          Limpar filtros
        </Button>
      </div>
      
      {/* Detalhes da competição selecionada */}
      {selectedCompetition && (
        <div className="border-t border-gray-700 pt-6">
          <h3 className="text-lg font-bold text-white mb-4">
            {selectedCompetition.name}
          </h3>
          
          <div className="space-y-3 mb-6">
            <p className="text-sm text-gray-300">
              <span className="text-accent">Local:</span> {selectedCompetition.location}
            </p>
            <p className="text-sm text-gray-300">
              <span className="text-accent">Período:</span> {new Date(selectedCompetition.startDate).toLocaleDateString('pt-BR')} a {new Date(selectedCompetition.endDate).toLocaleDateString('pt-BR')}
            </p>
            <p className="text-sm text-gray-300">
              <span className="text-accent">Inscrições até:</span> {new Date(selectedCompetition.registrationDeadline).toLocaleDateString('pt-BR')}
            </p>
            <p className="text-sm text-gray-300">
              <span className="text-accent">Taxa:</span> {selectedCompetition.registrationFee}
            </p>
            <p className="text-sm text-gray-300">
              <span className="text-accent">Status:</span> {selectedCompetition.status}
            </p>
          </div>
          
          <div className="space-y-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => onViewRegulations(selectedCompetition.id)}
            >
              Ver regulamento
            </Button>
            
            <Button 
              variant="primary" 
              size="sm" 
              className="w-full"
              onClick={() => onApply(selectedCompetition.id)}
              disabled={selectedCompetition.status !== 'Inscrições abertas'}
            >
              Inscrever-se
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;