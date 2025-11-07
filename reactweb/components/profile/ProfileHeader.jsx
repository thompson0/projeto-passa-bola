import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';

const ProfileHeader = ({ profile, onEdit, onShare }) => {
  return (
    <div className="relative mb-8">
      {/* Imagem de capa */}
      <div className="relative h-48 md:h-64 w-full rounded-lg overflow-hidden">
        <Image
          src={profile.coverImage || '/assets/images/cover-placeholder.jpg'}
          alt="Capa"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-90"></div>
      </div>
      
      {/* Informações do perfil */}
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end -mt-16 sm:-mt-20">
          {/* Avatar */}
          <div className="relative h-32 w-32 rounded-full border-4 border-background overflow-hidden">
            <Image
              src={profile.avatar || '/assets/images/avatar-placeholder.jpg'}
              alt={profile.name}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Informações básicas */}
          <div className="mt-4 sm:mt-0 sm:ml-6 flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {profile.name}
                  {profile.nickname && profile.nickname !== profile.name && (
                    <span className="text-lg md:text-xl text-gray-300 ml-2">
                      "{profile.nickname}"
                    </span>
                  )}
                </h1>
                
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <div className="relative h-6 w-6 mr-2">
                      <Image
                        src={profile.teamLogo || '/assets/images/team-placeholder.png'}
                        alt={profile.team}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-gray-300">{profile.team}</span>
                  </div>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-gray-300">{profile.position}</span>
                  {profile.number && (
                    <>
                      <span className="mx-2 text-gray-500">•</span>
                      <span className="text-gray-300">#{profile.number}</span>
                    </>
                  )}
                </div>
              </div>
              
              {/* Ações */}
              <div className="flex space-x-3 mt-4 sm:mt-0">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onShare}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  Compartilhar
                </Button>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={onEdit}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Editar perfil
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;