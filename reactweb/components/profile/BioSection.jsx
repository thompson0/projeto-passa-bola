// reactweb/components/profile/BioSection.jsx
import React from 'react';

const BioSection = ({ profile }) => {
  const isJogadora = profile.role === 'jogadora';
  
  return (
    <div className="bg-background-light rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-white mb-4">Informações do Perfil</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Informações comuns para todos os usuários */}
        <div className="flex justify-between items-center p-3 bg-background rounded-lg">
          <span className="text-gray-300">Tipo de conta</span>
          <span className="text-white font-medium capitalize">
            {profile.role === 'jogadora' ? 'Jogadora' : 'Torcedor(a)'}
          </span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-background rounded-lg">
          <span className="text-gray-300">Email</span>
          <span className="text-white font-medium">{profile.email || 'Não informado'}</span>
        </div>
        
        {/* Informações específicas para jogadoras */}
        {isJogadora && (
          <>
            {profile.position && (
              <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                <span className="text-gray-300">Posição</span>
                <span className="text-white font-medium">{profile.position}</span>
              </div>
            )}
            
            {profile.team && (
              <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                <span className="text-gray-300">Time</span>
                <span className="text-white font-medium">{profile.team}</span>
              </div>
            )}
            
            {profile.height && (
              <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                <span className="text-gray-300">Altura</span>
                <span className="text-white font-medium">{profile.height} cm</span>
              </div>
            )}
            
            {profile.age && (
              <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                <span className="text-gray-300">Idade</span>
                <span className="text-white font-medium">{profile.age} anos</span>
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="mt-6 text-center text-gray-400">
        <p>
          {isJogadora 
            ? 'Você está logado como jogadora. Você pode participar de times, competições e compartilhar conteúdo.' 
            : 'Você está logado como torcedor(a). Você pode acompanhar times, jogadoras e competições.'}
        </p>
      </div>
    </div>
  );
};

export default BioSection;