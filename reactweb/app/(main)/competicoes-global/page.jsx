'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WorldMap from '@/components/global-competitions/WorldMap';
import FilterBar from '@/components/global-competitions/FilterBar';
import CompetitionCard from '@/components/global-competitions/CompetitionCard';
import { Toast } from '@/components/ui';
import { globalCompetitionsService } from '@/services/mocks/globalCompetitionsData';

export default function GlobalCompetitionsPage() {
  const router = useRouter();
  const [continents, setContinents] = useState([]);
  const [years, setYears] = useState([]);
  const [categories, setCategories] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);
  
  const [filters, setFilters] = useState({
    continent: 'todos',
    year: 'todos',
    category: 'todos'
  });
  
  const [selectedContinent, setSelectedContinent] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Em um ambiente real, isso seria uma chamada de API
        const continentsData = globalCompetitionsService.getContinents();
        const yearsData = globalCompetitionsService.getYears();
        const categoriesData = globalCompetitionsService.getCategories();
        const competitionsData = globalCompetitionsService.getCompetitions();
        
        setContinents(continentsData);
        setYears(yearsData);
        setCategories(categoriesData);
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
        const filteredData = globalCompetitionsService.getCompetitions(filters);
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
    
    if (filterName === 'continent') {
      setSelectedContinent(value === 'todos' ? null : value);
    }
  };
  
  const handleSelectContinent = (continentId) => {
    setSelectedContinent(continentId);
    setFilters(prev => ({
      ...prev,
      continent: continentId
    }));
  };
  
  const handleApply = (competitionId) => {
    const competition = competitions.find(comp => comp.id === competitionId);
    
    if (competition && competition.registrationOpen) {
      // Redirecionar para a página de inscrição
      router.push(`/inscricao?competitionId=${competitionId}`);
    } else {
      setToast({
        message: 'As inscrições para esta competição não estão abertas',
        type: 'warning'
      });
    }
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
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Competições Globais</h1>
        <p className="text-gray-300">
          Explore as competições de futebol feminino ao redor do mundo e inscreva sua equipe.
        </p>
      </div>
      
      {/* Mapa Mundi */}
      <div className="bg-background-light rounded-lg p-6 mb-8">
        <div className="aspect-w-2 aspect-h-1 w-full">
          <WorldMap 
            continents={continents}
            selectedContinent={selectedContinent}
            onSelectContinent={handleSelectContinent}
          />
        </div>
      </div>
      
      {/* Barra de filtros */}
      <FilterBar 
        continents={continents}
        years={years}
        categories={categories}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      {/* Lista de competições */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Competições disponíveis</h2>
        
        {competitions.length === 0 ? (
          <div className="bg-background-light rounded-lg p-8 text-center">
            <p className="text-gray-300">Nenhuma competição encontrada com os filtros selecionados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitions.map((competition) => (
              <CompetitionCard 
                key={competition.id} 
                competition={competition}
                onApply={handleApply}
              />
            ))}
          </div>
        )}
      </div>
      
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