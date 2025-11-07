'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import TeamHeader from '@/components/team/TeamHeader';
import RosterCard from '@/components/team/RosterCard';
import MatchesCard from '@/components/team/MatchesCard';
import RegistrationsCard from '@/components/team/RegistrationsCard';
import StatsCard from '@/components/team/StatsCard';
import { teamService } from '@/services/mocks/teamData';

export default function TeamDashboardPage() {
  const router = useRouter();
  const { user, role, isAuthenticated, isLoading: authLoading } = useAuth();
  
  const [team, setTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login-jogadora');
    } else if (!authLoading && role !== 'jogadora') {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, role, router]);
  
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        // Em um ambiente real, isso seria uma chamada de API
        const teamData = teamService.getTeamData();
        setTeam(teamData);
      } catch (error) {
        console.error('Erro ao carregar dados da equipe:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, []);

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
  
  if (!team) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">Equipe não encontrada</h2>
        <p className="text-gray-300">Não foi possível carregar as informações da equipe.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header da equipe */}
      <TeamHeader team={team} />
      
      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1">
          <RosterCard roster={team.roster} />
        </div>
        
        <div className="lg:col-span-1">
          <MatchesCard matches={team.upcomingMatches} />
        </div>
        
        <div className="lg:col-span-1">
          <RegistrationsCard registrations={team.registrations} />
        </div>
      </div>
      
      {/* Estatísticas */}
      <div className="mb-8">
        <StatsCard stats={team.stats} />
      </div>
    </div>
  );
}