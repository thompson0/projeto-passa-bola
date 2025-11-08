// reactweb/components/profile/ProfileHeader.jsx
import React from 'react';
import Image from 'next/image';

const ProfileHeader = ({ profile }) => {
  // Função para obter a inicial do nome do usuário
  const getUserInitial = () => {
    return profile.name ? profile.name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className="relative mb-8">
      {/* Imagem de capa */}
      <div className="relative h-20 md:h-20 w-full rounded-lg overflow-hidden">
      </div>
      
      {/* Informações do perfil */}
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end -mt-16 sm:-mt-20">
          <div className="relative h-32 w-32 rounded-full border-4 border-background overflow-hidden bg-lilac flex items-center justify-center">
            {profile.avatar ? (
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-5xl font-bold text-primary">{getUserInitial()}</span>
            )}
          </div>
          
          {/* Informações básicas */}
          <div className="mt-4 sm:mt-0 sm:ml-6 flex-grow">
            <div className="flex flex-col">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-primary">
                  {profile.name}
                </h1>
                
                {profile.email && (
                  <p className="text-gray-300 mt-1">{profile.email}</p>
                )}
                
                {profile.role === 'jogadora' && (
                  <div className="flex items-center mt-2">
                    {profile.team && (
                      <>
                        <span className="text-gray-300">{profile.team}</span>
                        {profile.position && <span className="mx-2 text-gray-500">•</span>}
                      </>
                    )}
                    
                    {profile.position && (
                      <span className="text-gray-300">{profile.position}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;