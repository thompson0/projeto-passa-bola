'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import MatchesTable from '@/components/matches/MatchesTable';
import MatchDetailsDrawer from '@/components/matches/MatchDetailsDrawer';
import { Toast } from '@/components/ui';
import { matchesService } from '@/services/mocks/matchesData';

export default function MatchesPage() {
  const router = useRouter();
  const { user, role, isAuthenticated, isLoading: authLoading } = useAuth();
  
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);
  
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login-jogadora');
    } else if (!authLoading && role !== 'jogadora') {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, role, router]);
  
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // Em um ambiente real, isso seria uma chamada de API
        const matchesData = matchesService.getMatches();
        setMatches(matchesData);
      } catch (error) {
        console.error('Erro ao carregar partidas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, []);
  
  const handleViewDetails = (match) => {
    setSelectedMatch(match);
    setShowDetailsDrawer(true);
  };
  
  const handleConfirmPresence = async (match) => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      const result = matchesService.confirmMatch(match.id);
      
      if (result.success) {
        // Atualizar a lista de partidas
        setMatches(prev => prev.map(m => 
          m.id === match.id ? { ...m, confirmed: true } : m
        ));
        
        // Atualizar o match selecionado se estiver aberto
        if (selectedMatch && selectedMatch.id === match.id) {
          setSelectedMatch({ ...selectedMatch, confirmed: true });
        }
        
        setToast({
          message: result.message,
          type: 'success'
        });
      } else {
        setToast({
          message: result.message,
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Erro ao confirmar presença:', error);
      setToast({
        message: 'Erro ao confirmar presença. Tente novamente.',
        type: 'error'
      });
    }
  };

  if (authLoading || isLoading) {
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
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Minhas Partidas</h1>
        <p className="text-gray-300">
          Acompanhe suas próximas partidas e confirme sua presença.
        </p>
      </div>
      
      {/* Tabela de partidas */}
      <div className="bg-background-light rounded-lg p-6 mb-8">
        <MatchesTable 
          matches={matches}
          onViewDetails={handleViewDetails}
          onConfirmPresence={handleConfirmPresence}
        />
      </div>
      
      {/* Drawer de detalhes */}
      {showDetailsDrawer && selectedMatch && (
        <MatchDetailsDrawer 
          match={selectedMatch}
          onClose={() => setShowDetailsDrawer(false)}
          onConfirmPresence={handleConfirmPresence}
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