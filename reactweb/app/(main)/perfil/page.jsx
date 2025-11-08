'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProfileHeader from '@/components/profile/ProfileHeader';
import BioSection from '@/components/profile/BioSection';
import TeamManagementSection from '@/components/profile/TeamManagementSection';
import { Toast } from '@/components/ui';

export default function PlayerProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Verificar se o usuário está autenticado
        const authData = localStorage.getItem('auth');
        if (!authData) {
          router.push('/login');
          return;
        }

        const userData = JSON.parse(authData);
        
        // Criar um objeto de perfil com os dados disponíveis do usuário
        const profileData = {
          id: userData.user?.id || userData.id,
          name: userData.user?.username || userData.username || 'Usuário',
          email: userData.user?.email || userData.email,
          role: userData.role,
          position: userData.user?.position || userData.position,
          height: userData.user?.height || userData.height,
          age: userData.user?.age || userData.age,
        };
        
        setProfile(profileData);
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        setToast({
          message: 'Erro ao carregar dados do perfil',
          type: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

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
      <ProfileHeader profile={profile} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna principal */}
        <div className="lg:col-span-2 space-y-8">
          {/* Bio e informações */}
          <BioSection profile={profile} />
          
          {/* Seção de gerenciamento de time (apenas para jogadoras) */}
          {profile.role === 'jogadora' && (
            <TeamManagementSection userId={profile.id} />
          )}
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Conteúdo da sidebar */}
        </div>
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