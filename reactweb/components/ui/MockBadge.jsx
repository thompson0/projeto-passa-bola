// components/ui/MockBadge.jsx
import React from 'react';
import { mockConfig } from '@/services/mockConfig';

const MockBadge = ({ apiName = null }) => {
  const isMocked = apiName ? mockConfig.isApiMocked(apiName) : mockConfig.isMockEnabled();
  
  if (!isMocked) {
    return null;
  }
  
  return null;
//   return (
//     <div className="fixed bottom-4 right-4 z-50 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-md shadow-lg">
//       {apiName ? `${apiName}: Dados Mockados` : 'Dados Mockados'}
//     </div>
//   );
};

export default MockBadge;