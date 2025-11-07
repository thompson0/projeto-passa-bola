import React from 'react';
import Link from 'next/link';
import ShopItem from './ShopItem';
import { Button } from '@/components/ui';

const ShopSection = ({ items }) => {
  if (!items || items.length === 0) return null;
  
  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Destaques da loja</h2>
        <Link href="/loja">
          <Button variant="outline" size="sm">Ver loja completa</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <ShopItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ShopSection;