import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';

const CandidateCard = ({ candidate, onVote }) => {
  const handleVote = () => {
    onVote(candidate.id);
  };
  
  return (
    <div className="bg-background-light rounded-lg overflow-hidden">
      <div className="relative aspect-square w-full">
        <Image
          src={candidate.photo || '/assets/images/avatar-placeholder.jpg'}
          alt={candidate.name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-1">
          <h3 className="font-bold text-white">{candidate.name}</h3>
          {candidate.category && (
            <span className="ml-2 bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
              {candidate.category}
            </span>
          )}
        </div>
        
        <div className="text-sm text-gray-300 mb-4">
          <p>{candidate.team} • {candidate.position}</p>
        </div>
        
        <Button
          variant={candidate.hasVoted ? "success" : "primary"}
          className="w-full"
          onClick={handleVote}
          disabled={candidate.hasVoted}
        >
          {candidate.hasVoted ? (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Votado
            </div>
          ) : (
            'Votar'
          )}
        </Button>
      </div>
    </div>
  );
};

export default CandidateCard;