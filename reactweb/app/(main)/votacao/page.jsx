'use client';

import React, { useState, useEffect } from 'react';
import CandidateCard from '@/components/voting/CandidateCard';
import FilterBar from '@/components/voting/FilterBar';
import RankingTable from '@/components/voting/RankingTable';
import { Toast } from '@/components/ui';
import { votingService } from '@/services/apiService';

export default function VotingPage() {
  const [filters, setFilters] = useState([]);
  const [activeFilter, setActiveFilter] = useState('semana-atual');
  const [candidates, setCandidates] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Em um ambiente real, isso seria uma chamada de API
        const filtersData = votingService.getFilterOptions();
        const candidatesData = votingService.getCandidates(activeFilter);
        const rankingData = votingService.getRanking(activeFilter);
        
        setFilters(filtersData);
        setCandidates(candidatesData);
        setRanking(rankingData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeFilter]);
  
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };
  
  const handleVote = async (candidateId) => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      const result = votingService.vote(candidateId);
      
      if (result.success) {
        // Atualizar o estado das candidatas
        setCandidates(prev => prev.map(candidate => 
          candidate.id === candidateId 
            ? { ...candidate, votes: result.votes, hasVoted: true } 
            : candidate
        ));
        
        // Atualizar o ranking
        const updatedRanking = votingService.getRanking(activeFilter);
        setRanking(updatedRanking);
        
        // Mostrar toast de sucesso
        setToast({
          message: result.message,
          type: 'success'
        });
      } else {
        // Mostrar toast de erro
        setToast({
          message: result.message,
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Erro ao votar:', error);
      setToast({
        message: 'Erro ao registrar voto. Tente novamente.',
        type: 'error'
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
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Votação</h1>
        <p className="text-gray-300">
          Vote nas suas jogadoras favoritas e acompanhe os resultados em tempo real.
        </p>
      </div>
      
      {/* Filtro */}
      <FilterBar 
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
      
      {/* Grid de candidatas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
        {candidates.map((candidate) => (
          <CandidateCard 
            key={candidate.id} 
            candidate={candidate}
            onVote={handleVote}
          />
        ))}
      </div>
      
      {/* Tabela de ranking */}
      <RankingTable ranking={ranking} />
      
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