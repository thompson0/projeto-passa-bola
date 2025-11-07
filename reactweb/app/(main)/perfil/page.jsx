'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ProfileHeader from '@/components/profile/ProfileHeader';
import StatsSection from '@/components/profile/StatsSection';
import BadgesSection from '@/components/profile/BadgesSection';
import AchievementsSection from '@/components/profile/AchievementsSection';
import BioSection from '@/components/profile/BioSection';
import RankingSection from '@/components/profile/RankingSection';
import EditProfileModal from '@/components/profile/EditProfileModal';
import { Toast } from '@/components/ui';
import { playerProfileService } from '@/services/mocks/playerProfileData';

export default function PlayerProfilePage() {
  const router = useRouter();
  const { user, role, isAuthenticated, isLoading: authLoading } = useAuth();
  
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login-jogadora');
    } else if (!authLoading && role !== 'jogadora') {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, role, router]);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Em um ambiente real, isso seria uma chamada de API
        const profileData = playerProfileService.getPlayerProfile();
        setProfile(profileData);
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);
  
  const handleEditProfile = () => {
    setShowEditModal(true);
  };
  
  const handleShareProfile = () => {
    // Em um ambiente real, isso geraria um link compartilhável
    const result = playerProfileService.shareProfile(profile.id);
    
    if (result.success) {
      // Simular cópia para a área de transferência
      navigator.clipboard.writeText(result.shareLink);
      
      setToast({
        message: result.message,
        type: 'success'
      });
    }
  };
  
  const handleSaveProfile = async (updatedProfile) => {
    try {
      setIsSaving(true);
      
      // Em um ambiente real, isso seria uma chamada de API
      const result = playerProfileService.updatePlayerProfile(profile.id, updatedProfile);
      
      if (result.success) {
        setProfile(result.data);
        setShowEditModal(false);
        
        setToast({
          message: result.message,
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setToast({
        message: 'Erro ao atualizar perfil. Tente novamente.',
        type: 'error'
      });
    } finally {
      setIsSaving(false);
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
  
  if (!profile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">Perfil não encontrado</h2>
        <p className="text-gray-300">Não foi possível carregar as informações do perfil.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header do perfil */}
      <ProfileHeader 
        profile={profile}
        onEdit={handleEditProfile}
        onShare={handleShareProfile}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna principal */}
        <div className="lg:col-span-2 space-y-8">
          {/* Estatísticas */}
          <StatsSection stats={profile.stats} />
          
          {/* Badges */}
          <BadgesSection badges={profile.badges} />
          
          {/* Conquistas */}
          <AchievementsSection achievements={profile.achievements} />
          
          {/* Bio e informações */}
          <BioSection profile={profile} />
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Ranking */}
          <RankingSection ranking={profile.ranking} />
        </div>
      </div>
      
      {/* Modal de edição */}
      {showEditModal && (
        <EditProfileModal 
          profile={profile}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveProfile}
          isLoading={isSaving}
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