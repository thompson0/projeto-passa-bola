import React from 'react';
import Image from 'next/image';

const RankingTable = ({ ranking }) => {
  return (
    <div className="bg-background-light rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">Ranking</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-background">
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Posição
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Jogadora
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Time
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Categoria
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Votos
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {ranking.map((player, index) => (
              <tr key={player.id} className={index % 2 === 0 ? 'bg-background-light' : 'bg-background'}>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className={`
                      flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold
                      ${index === 0 ? 'bg-yellow-500 text-black' : 
                        index === 1 ? 'bg-gray-300 text-black' : 
                        index === 2 ? 'bg-amber-700 text-white' : 
                        'bg-gray-700 text-white'}
                    `}>
                      {index + 1}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
                      <Image
                        src={player.photo || '/assets/images/avatar-placeholder.jpg'}
                        alt={player.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white">{player.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-gray-300">
                  {player.team}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary">
                    {player.category}
                  </span>
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-white font-medium">
                  {player.votes.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankingTable;