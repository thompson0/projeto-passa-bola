// components/voting/VotingMockBadge.jsx
import React from 'react';
import { votingService } from '@/services/apiService';

const VotingMockBadge = () => {
  if (!votingService._isMocked()) {
    return null;
  }
  
  return (
    <div className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-md mb-4">
      Votação: Dados Mockados
    </div>
  );
};

export default VotingMockBadge;