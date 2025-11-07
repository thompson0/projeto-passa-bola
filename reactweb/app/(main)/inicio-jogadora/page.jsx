'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import HeroSection from '@/components/jogadora/HeroSection';
import MatchesSection from '@/components/jogadora/MatchesSection';
import CommunitySection from '@/components/jogadora/CommunitySection';
import ShopSection from '@/components/jogadora/ShopSection';
import { Toast } from '@/components/ui';
import { playerFeedService } from '@/services/mocks/playerData';

export default function InicioJogadoraPage() {
  const router = useRouter();
  const { user, role, isAuthenticated, isLoading } = useAuth();
  const [feedData, setFeedData] = useState(null);
  const [isLoadingFeed, setIsLoadingFeed] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login-jogadora');
    } else if (!isLoading && role !== 'jogadora') {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, role, router]);

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        // Em um ambiente real, isso seria uma chamada de API
        const data = playerFeedService.getFeed();
        setFeedData(data);
      } catch (error) {
        console.error('Erro ao carregar feed:', error);
      } finally {
        setIsLoadingFeed(false);
      }
    };

    fetchFeedData();
  }, []);

  const handleConfirmMatch = (matchId) => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      const result = playerFeedService.confirmMatch(matchId);
      
      if (result.success) {
        // Atualizar o estado local para refletir a confirmação
        setFeedData(prevData => {
          if (!prevData) return prevData;
          
          return {
            ...prevData,
            matches: prevData.matches.map(match => 
              match.id === matchId ? { ...match, confirmed: true } : match
            )
          };
        });
        
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
      console.error('Erro ao confirmar presença:', error);
      setToast({
        message: 'Erro ao confirmar presença. Tente novamente.',
        type: 'error'
      });
    }
  };

  if (isLoading || !isAuthenticated || role !== 'jogadora' || isLoadingFeed) {
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
    <div className="space-y-12">
      {/* Hero Section */}
      <HeroSection data={feedData?.hero} />
      
      {/* Matches Section */}
      <MatchesSection 
        matches={feedData?.matches} 
        onConfirmMatch={handleConfirmMatch}
      />
      
      {/* Community Section */}
      <CommunitySection posts={feedData?.communityHighlights} />
      
      {/* Shop Section */}
      <ShopSection items={feedData?.shopItems} />
      
      {/* Toast Notification */}
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