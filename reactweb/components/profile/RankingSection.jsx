import React from 'react';

const RankingSection = ({ ranking }) => {
  return (
    <div className="bg-background-light rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6">Ranking</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center p-3 bg-background rounded-lg">
          <span className="text-gray-300">Ranking geral</span>
          <span className="text-white font-medium">#{ranking.overall}</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-background rounded-lg">
          <span className="text-gray-300">Ranking por posição</span>
          <span className="text-white font-medium">#{ranking.position}</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-background rounded-lg">
          <span className="text-gray-300">Ranking no time</span>
          <span className="text-white font-medium">#{ranking.team}</span>
        </div>
      </div>
      
      <h3 className="text-lg font-medium text-white mb-4">Histórico de ranking</h3>
      
      <div className="h-48 relative">
        {/* Em um ambiente real, aqui seria um gráfico de linha */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            <p className="text-gray-400">Gráfico de evolução do ranking</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingSection;