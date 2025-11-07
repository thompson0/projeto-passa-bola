// components/shop/ShopMockBadge.jsx
import React from 'react';
import { shopService } from '@/services/apiService';

const ShopMockBadge = () => {
  if (!shopService._isMocked()) {
    return null;
  }
  
  return null;
//   return (
//     <div className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-md mb-4">
//       Loja: Dados Mockados
//     </div>
//   );
};

export default ShopMockBadge;