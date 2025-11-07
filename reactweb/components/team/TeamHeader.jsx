import React from 'react';
import Image from 'next/image';

const TeamHeader = ({ team }) => {
  return (
    <div className="bg-background-light rounded-lg overflow-hidden mb-8">
      {/* Imagem de capa */}
      <div className="relative h-48 w-full">
        <Image
          src={team.coverImage || '/assets/images/team-cover-placeholder.jpg'}
          alt={team.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-light to-transparent opacity-90"></div>
      </div>
      
      {/* Informações da equipe */}
      <div className="p-6 flex flex-col md:flex-row md:items-center">
        <div className="relative h-24 w-24 rounded-full border-4 border-background-light overflow-hidden -mt-16 md:-mt-20 mb-4 md:mb-0">
          <Image
            src={team.logo || '/assets/images/team-placeholder.png'}
            alt={team.name}
            fill
            className="object-contain bg-white"
          />
        </div>
        
        <div className="md:ml-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">{team.name}</h1>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lilac mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-300">{team.city}, {team.country}</span>
            </div>
            
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lilac mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-gray-300">{team.stadium}</span>
            </div>
            
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lilac mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-gray-300">Técnico: {team.coach}</span>
            </div>
            
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lilac mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-gray-300">Capitã: {team.captain}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamHeader;