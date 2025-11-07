import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui';

const RosterCard = ({ roster }) => {
  // Mostrar apenas os primeiros 5 jogadores
  const displayedRoster = roster.slice(0, 5);
  
  return (
    <div className="bg-background-light rounded-lg p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Elenco</h2>
        <Link href="/equipe/elenco">
          <Button variant="outline" size="sm">Gerenciar</Button>
        </Link>
      </div>
      
      <div className="space-y-4">
        {displayedRoster.map((player) => (
          <div key={player.id} className="flex items-center">
            <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
              <Image
                src={player.avatar || '/assets/images/avatar-placeholder.jpg'}
                alt={player.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between">
                <span className="font-medium text-white">{player.name}</span>
                <span className="text-gray-400">#{player.number}</span>
              </div>
              <span className="text-sm text-gray-400">{player.position}</span>
            </div>
          </div>
        ))}
      </div>
      
      {roster.length > 5 && (
        <div className="mt-6 text-center">
          <Link href="/equipe/elenco" className="text-lilac hover:text-lilac-light transition-colors text-sm">
            Ver todos os {roster.length} jogadores
          </Link>
        </div>
      )}
    </div>
  );
};

export default RosterCard;