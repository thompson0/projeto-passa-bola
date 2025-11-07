// components/community/CommunityMockBadge.jsx
import React from 'react';
import { communityService } from '@/services/apiService';

const CommunityMockBadge = () => {
  if (!communityService._isMocked()) {
    return null;
  }
  
  return (
    <div className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-md mb-4">
      Comunidade: Dados Mockados
    </div>
  );
};

export default CommunityMockBadge;