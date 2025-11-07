import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const formatCurrency = (value) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

const ShopItem = ({ item }) => {
  const hasDiscount = item.discount !== null && item.discount < item.price;
  
  return (
    <Link 
      href={item.link}
      className="block bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-hover hover:scale-[1.02] transition-all duration-300"
    >
      <div className="relative h-48 w-full">
        <Image
          src={item.image || '/assets/images/shop-placeholder.jpg'}
          alt={item.name}
          fill
          className="object-cover"
        />
        
        {hasDiscount && (
          <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
            {Math.round((1 - item.discount / item.price) * 100)}% OFF
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-text mb-2 line-clamp-2">{item.name}</h3>
        <div className="flex items-center">
          {hasDiscount ? (
            <>
              <span className="text-lg font-bold text-primary mr-2">{formatCurrency(item.discount)}</span>
              <span className="text-sm text-text-secondary line-through">{formatCurrency(item.price)}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-primary">{formatCurrency(item.price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ShopItem;