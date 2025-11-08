// reactweb/app/(main)/competicoes/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import BrazilMap from '@/components/competitions/BrazilMap';
import FilterPanel from '@/components/competitions/FilterPanel';
import CompetitionsList from '@/components/competitions/CompetitionsList';
import TeamSelectionModal from '@/components/competitions/TeamSelectionModal';
import { Toast } from '@/components/ui';
import { competitionsService } from '@/services/mocks/competitionsData';

export default function CompetitionsPage() {
  const [states, setStates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    state: '',
    category: '',
    type: ''
  });
  
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [showTeamSelectionModal, setShowTeamSelectionModal] = useState(false);
  const [toast, setToast] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Em um ambiente real, isso seria uma chamada de API
        const statesData = competitionsService.getStates();
        const categoriesData = competitionsService.getCategories();
        const typesData = competitionsService.getTypes();
        const competitionsData = competitionsService.getCompetitions();
        
        setStates(statesData);
        setCategories(categoriesData);
        setTypes(typesData);
        setCompetitions(competitionsData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    // Atualizar competições quando os filtros mudarem
    const fetchFilteredCompetitions = async () => {
      try {
        // Em um ambiente real, isso seria uma chamada de API
        const filteredData = competitionsService.getCompetitions(filters);
        setCompetitions(filteredData);
      } catch (error) {
        console.error('Erro ao filtrar competições:', error);
      }
    };

    fetchFilteredCompetitions();
  }, [filters]);
  
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    
    if (filterName === 'state') {
      setSelectedState(value || null);
    }
  };
  
  const handleClearFilters = () => {
    setFilters({
      state: '',
      category: '',
      type: ''
    });
    setSelectedState(null);
    setSelectedCompetition(null);
  };
  
  const handleSelectState = (stateId) => {
    setSelectedState(stateId);
    setFilters(prev => ({
      ...prev,
      state: stateId
    }));
  };
  
  const handleSelectCompetition = (competition) => {
    setSelectedCompetition(competition);
  };
  
  const handleViewRegulations = (competitionId) => {
    // Em um ambiente real, isso abriria o regulamento da competição
    setToast({
      message: 'Regulamento aberto em uma nova aba',
      type: 'info'
    });
  };
  
  const handleApply = (competitionId) => {
    const competition = competitions.find(comp => comp.id === competitionId);
    if (competition && competition.status === 'Inscrições abertas') {
      setShowTeamSelectionModal(true);
    } else {
      setToast({
        message: 'As inscrições para esta competição não estão abertas',
        type: 'warning'
      });
    }
  };
  
  const handleTeamSelection = (data) => {
    // Em um ambiente real, isso enviaria os dados para a API
    setShowTeamSelectionModal(false);
    
    setToast({
      message: `Inscrição realizada com sucesso para o time ${data.teamId}!`,
      type: 'success'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-accent">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Competições no Brasil</h1>
        <p className="text-gray-300">
          Explore as competições de futebol feminino pelo Brasil e inscreva sua equipe.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mapa do Brasil (ocupa 2/3 da largura em telas grandes) */}
        <div className="lg:col-span-2 bg-background-light rounded-lg p-6">
          <div className="aspect-w-16 aspect-h-10 w-full">
            <BrazilMap 
              states={states}
              selectedState={selectedState}
              onSelectState={handleSelectState}
            />
          </div>
        </div>
        
        {/* Painel de filtros (ocupa 1/3 da largura em telas grandes) */}
        <div className="lg:col-span-1">
          <FilterPanel 
            states={states}
            categories={categories}
            types={types}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            selectedState={selectedState}
            selectedCompetition={selectedCompetition}
            onViewRegulations={handleViewRegulations}
            onApply={handleApply}
          />
        </div>
      </div>
      
      {/* Lista de competições */}
      <div className="mt-8">
        <CompetitionsList 
          competitions={competitions}
          selectedCompetition={selectedCompetition}
          onSelectCompetition={handleSelectCompetition}
        />
      </div>
      
      {/* Modal de seleção de time */}
      {showTeamSelectionModal && selectedCompetition && (
        <TeamSelectionModal 
          competition={selectedCompetition}
          onClose={() => setShowTeamSelectionModal(false)}
          onSubmit={handleTeamSelection}
        />
      )}
      
      {/* Toast de notificação */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}