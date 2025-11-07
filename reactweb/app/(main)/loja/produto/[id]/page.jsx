'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ProductDetail from '@/components/shop/ProductDetail';
import CartIcon from '@/components/shop/CartIcon';
import { Toast } from '@/components/ui';
import { shopService } from '@/services/mocks/shopData';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Em um ambiente real, isso seria uma chamada de API
        const productData = shopService.getProductById(parseInt(id));
        const cartCountData = shopService.getCartCount();
        const isInWishlistData = shopService.isInWishlist(parseInt(id));
        
        if (!productData) {
          router.push('/loja');
          return;
        }
        
        setProduct(productData);
        setCartCount(cartCountData);
        setIsInWishlist(isInWishlistData);
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, router]);
  
  const handleAddToCart = (productId, quantity, size, color) => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      const result = shopService.addToCart(productId, quantity, size, color);
      
      if (result.success) {
        setCartCount(result.cartCount);
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
  
  const handleToggleWishlist = (productId) => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      const result = shopService.toggleWishlist(productId);
      
      if (result.success) {
        setIsInWishlist(result.inWishlist);
        setToast({
          message: result.message,
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar favoritos:', error);
      setToast({
        message: 'Erro ao atualizar favoritos. Tente novamente.',
        type: 'error'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-accent">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white mb-4">Produto não encontrado</h1>
        <p className="text-text-secondary mb-6">O produto que você está procurando não existe ou foi removido.</p>
        <Link 
          href="/loja"
          className="text-primary hover:text-lilac transition-colors font-medium"
        >
          Voltar para a loja
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center text-sm text-gray-400 mb-2">
            <Link href="/loja" className="hover:text-white transition-colors">Loja</Link>
            <span className="mx-2">/</span>
            <Link href={`/loja?category=${product.category}`} className="hover:text-white transition-colors">
              {product.category === 'camisas' ? 'Camisas' : 
               product.category === 'acessorios' ? 'Acessórios' : 
               product.category === 'copos' ? 'Copos e Canecas' : 'Produtos'}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{product.name}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Detalhes do Produto</h1>
        </div>
        <CartIcon count={cartCount} />
      </div>
      
      {/* Detalhes do produto */}
      <ProductDetail 
        product={product}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isInWishlist={isInWishlist}
      />
      
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