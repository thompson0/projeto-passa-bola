'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import HeroSection from '@/components/torcedora/HeroSection';
import TickerSection from '@/components/torcedora/TickerSection';
import NewsSection from '@/components/torcedora/NewsSection';
import MatchesSection from '@/components/torcedora/MatchesSection';
import MediaSection from '@/components/torcedora/MediaSection';
import { fanFeedService } from '@/services/mocks/fanData';

export default function InicioTorcedoraPage() {
  const router = useRouter();
  const { user, role, isAuthenticated, isLoading } = useAuth();
  const [feedData, setFeedData] = useState(null);
  const [isLoadingFeed, setIsLoadingFeed] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login-torcedora');
    } else if (!isLoading && role !== 'torcedora') {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, role, router]);

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        // Em um ambiente real, isso seria uma chamada de API
        const data = fanFeedService.getFeed();
        setFeedData(data);
      } catch (error) {
        console.error('Erro ao carregar feed:', error);
      } finally {
        setIsLoadingFeed(false);
      }
    };

    fetchFeedData();
  }, []);

  if (isLoading || !isAuthenticated || role !== 'torcedora' || isLoadingFeed) {
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
      
      {/* Ticker Section */}
      <TickerSection data={feedData?.ticker} />
      
      {/* News Section */}
      <NewsSection news={feedData?.news} />
      
      {/* Matches Section */}
      <MatchesSection matches={feedData?.upcomingMatches} />
      
      {/* Media Section */}
      <MediaSection media={feedData?.mediaHighlights} />
    </div>
  );
}