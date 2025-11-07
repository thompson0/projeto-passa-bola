import React from 'react';
import Link from 'next/link';
import MatchItem from './MatchItem';
import { Button } from '@/components/ui';

const MatchesSection = ({ matches }) => {
  if (!matches || matches.length === 0) return null;
  
  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Próximas partidas</h2>
        <Link href="/partidas">
          <Button variant="outline" size="sm">Ver todas</Button>
        </Link>
      </div>
      
      <div className="bg-background-light rounded-lg p-6">
        <div className="space-y-4">
          {matches.map((match) => (
            <MatchItem key={match.id} match={match} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchesSection;