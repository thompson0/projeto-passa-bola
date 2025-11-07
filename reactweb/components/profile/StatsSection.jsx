import React from 'react';

const StatsSection = ({ stats }) => {
  return (
    <div className="bg-background-light rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-white mb-6">Estatísticas</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-background rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-lilac mb-1">{stats.games}</div>
          <div className="text-sm text-gray-300">Jogos</div>
        </div>
        
        <div className="bg-background rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-lilac mb-1">{stats.goals}</div>
          <div className="text-sm text-gray-300">Gols</div>
        </div>
        
        <div className="bg-background rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-lilac mb-1">{stats.assists}</div>
          <div className="text-sm text-gray-300">Assistências</div>
        </div>
        
        <div className="bg-background rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-lilac mb-1">{stats.votes}</div>
          <div className="text-sm text-gray-300">Votos</div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium text-white mb-4">Estatísticas adicionais</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-between items-center p-3 bg-background rounded-lg">
            <span className="text-gray-300">Cartões amarelos</span>
            <span className="text-white font-medium">{stats.yellowCards}</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-background rounded-lg">
            <span className="text-gray-300">Cartões vermelhos</span>
            <span className="text-white font-medium">{stats.redCards}</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-background rounded-lg">
            <span className="text-gray-300">Minutos jogados</span>
            <span className="text-white font-medium">{stats.minutesPlayed}</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-background rounded-lg">
            <span className="text-gray-300">Média de gols</span>
            <span className="text-white font-medium">
              {(stats.goals / stats.games).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;