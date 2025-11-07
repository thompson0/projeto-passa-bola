import React from 'react';

const StatsCard = ({ stats }) => {
  return (
    <div className="bg-background-light rounded-lg p-6 h-full">
      <h2 className="text-xl font-bold text-white mb-6">Estatísticas da temporada</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-background rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green mb-1">{stats.wins}</div>
          <div className="text-xs text-gray-400">Vitórias</div>
        </div>
        
        <div className="bg-background rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-yellow-500 mb-1">{stats.draws}</div>
          <div className="text-xs text-gray-400">Empates</div>
        </div>
        
        <div className="bg-background rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-red mb-1">{stats.losses}</div>
          <div className="text-xs text-gray-400">Derrotas</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Gols marcados</span>
          <span className="text-sm font-medium text-white">{stats.goalsScored}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Gols sofridos</span>
          <span className="text-sm font-medium text-white">{stats.goalsConceded}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Clean sheets</span>
          <span className="text-sm font-medium text-white">{stats.cleanSheets}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Média de gols</span>
          <span className="text-sm font-medium text-white">
            {(stats.goalsScored / (stats.wins + stats.draws + stats.losses)).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;