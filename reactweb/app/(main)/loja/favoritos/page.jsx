'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Toast } from '@/components/ui';
import { shopService } from '@/services/mocks/shopData';

const formatCurrency = (value) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState({ items: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);
  
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        // Em um ambiente real, isso seria uma chamada de API
        const wishlistData = shopService.getWishlist();
        setWishlist(wishlistData);
      } catch (error) {
        console.error('Erro ao carregar lista de desejos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWishlist();
  }, []);
  
  const handleRemoveFromWishlist = (productId) => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      const result = shopService.toggleWishlist(productId);
      
      if (result.success) {
        const updatedWishlist = shopService.getWishlist();
        setWishlist(updatedWishlist);
        
        setToast({
          message: result.message,
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Erro ao remover da lista de desejos:', error);
      setToast({
        message: 'Erro ao remover da lista de desejos. Tente novamente.',
        type: 'error'
      });
    }
  };
  
  const handleAddToCart = (productId) => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      const result = shopService.addToCart(productId, 1);
      
      if (result.success) {
        setToast({
          message: result.message,
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      setToast({
        message: 'Erro ao adicionar ao carrinho. Tente novamente.',
        type: 'error'
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-accent">Carregando sua lista de desejos...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Lista de Desejos</h1>
        <p className="text-gray-300 mt-2">
          {wishlist.items.length} {wishlist.items.length === 1 ? 'item' : 'itens'} na sua lista
        </p>
      </div>
      
      {wishlist.items.length === 0 ? (
        <div className="bg-background-light rounded-lg p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <p className="text-gray-300 mb-4">Sua lista de desejos está vazia.</p>
          <Link href="/loja">
            <Button variant="primary">
              Explorar produtos
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.items.map((item) => (
            <div key={item.id} className="bg-background-light rounded-lg overflow-hidden">
              <Link href={`/loja/produto/${item.productId}`}>
                <div className="relative h-48 w-full bg-white">
                  <Image
                    src={item.image || '/assets/images/product-placeholder.jpg'}
                    alt={item.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </Link>
              
              <div className="p-4">
                <Link href={`/loja/produto/${item.productId}`}>
                  <h3 className="text-lg font-medium text-white mb-2 hover:text-lilac transition-colors">
                    {item.name}
                  </h3>
                </Link>
                
                <div className="text-primary font-medium mb-4">
                  {formatCurrency(item.price)}
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="primary" 
                    className="flex-1"
                    onClick={() => handleAddToCart(item.productId)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Comprar
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => handleRemoveFromWishlist(item.productId)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Toast de notificação */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}