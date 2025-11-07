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

export default function CartPage() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);
  
  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Em um ambiente real, isso seria uma chamada de API
        const cartData = shopService.getCart();
        setCart(cartData);
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCart();
  }, []);
  
  const handleUpdateQuantity = (itemId, quantity) => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      const result = shopService.updateCartItem(itemId, quantity);
      
      if (result.success) {
        const updatedCart = shopService.getCart();
        setCart(updatedCart);
        
        setToast({
          message: result.message,
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar carrinho:', error);
      setToast({
        message: 'Erro ao atualizar carrinho. Tente novamente.',
        type: 'error'
      });
    }
  };
  
  const handleRemoveItem = (itemId) => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      const result = shopService.removeCartItem(itemId);
      
      if (result.success) {
        const updatedCart = shopService.getCart();
        setCart(updatedCart);
        
        setToast({
          message: result.message,
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Erro ao remover item:', error);
      setToast({
        message: 'Erro ao remover item. Tente novamente.',
        type: 'error'
      });
    }
  };
  
  const handleClearCart = () => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      const result = shopService.clearCart();
      
      if (result.success) {
        setCart({ items: [], total: 0 });
        
        setToast({
          message: result.message,
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      setToast({
        message: 'Erro ao limpar carrinho. Tente novamente.',
        type: 'error'
      });
    }
  };
  
  const handleCheckout = () => {
    // Em um ambiente real, isso redirecionaria para a página de checkout
    setToast({
      message: 'Funcionalidade de checkout em desenvolvimento!',
      type: 'info'
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-accent">Carregando seu carrinho...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Seu Carrinho</h1>
        <p className="text-gray-300 mt-2">
          {cart.items.length} {cart.items.length === 1 ? 'item' : 'itens'} no carrinho
        </p>
      </div>
      
      {cart.items.length === 0 ? (
        <div className="bg-background-light rounded-lg p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-gray-300 mb-4">Seu carrinho está vazio.</p>
          <Link href="/loja">
            <Button variant="primary">
              Continuar comprando
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de itens */}
          <div className="lg:col-span-2">
            <div className="bg-background-light rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">Itens do Carrinho</h2>
                  <button
                    className="text-sm text-primary hover:text-lilac transition-colors"
                    onClick={handleClearCart}
                  >
                    Limpar carrinho
                  </button>
                </div>
                
                <div className="divide-y divide-gray-700">
                  {cart.items.map((item) => (
                    <div key={item.id} className="py-6 flex flex-col sm:flex-row">
                      {/* Imagem */}
                      <div className="flex-shrink-0 w-full sm:w-24 h-24 bg-white rounded-md overflow-hidden mb-4 sm:mb-0">
                        <div className="relative w-full h-full">
                          <Image
                            src={item.image || '/assets/images/product-placeholder.jpg'}
                            alt={item.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                      </div>
                      
                      {/* Detalhes */}
                      <div className="flex-1 sm:ml-6">
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-white">
                              <Link href={`/loja/produto/${item.productId}`} className="hover:text-lilac transition-colors">
                                {item.name}
                              </Link>
                            </h3>
                            
                            <div className="mt-1 text-sm text-gray-300">
                              {item.size && <span className="mr-4">Tamanho: {item.size}</span>}
                              {item.color && <span>Cor: {item.color}</span>}
                            </div>
                            
                            <div className="mt-2 text-primary font-medium">
                              {formatCurrency(item.price)}
                            </div>
                          </div>
                          
                          <div className="mt-4 sm:mt-0">
                            <div className="flex items-center">
                              <button
                                className="bg-background text-white w-8 h-8 rounded-l-md flex items-center justify-center border border-gray-700"
                                onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => handleUpdateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-12 h-8 border-t border-b border-gray-700 bg-background text-white text-center"
                              />
                              <button
                                className="bg-background text-white w-8 h-8 rounded-r-md flex items-center justify-center border border-gray-700"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                            
                            <button
                              className="mt-2 text-sm text-red-500 hover:text-red-400 transition-colors"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              Remover
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Resumo */}
          <div>
            <div className="bg-background-light rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-4">Resumo do Pedido</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Subtotal</span>
                  <span className="text-white">{formatCurrency(cart.total)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-300">Frete</span>
                  <span className="text-white">Grátis</span>
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-primary">{formatCurrency(cart.total)}</span>
                  </div>
                </div>
                
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={handleCheckout}
                >
                  Finalizar Compra
                </Button>
                
                <Link href="/loja">
                  <Button 
                    variant="outline" 
                    className="w-full"
                  >
                    Continuar Comprando
                  </Button>
                </Link>
              </div>
            </div>
          </div>
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