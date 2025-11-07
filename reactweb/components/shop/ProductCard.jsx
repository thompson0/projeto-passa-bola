import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui';

const formatCurrency = (value) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

const ProductCard = ({ product, onAddToCart, onToggleWishlist, isInWishlist }) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product.id);
  };
  
  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleWishlist(product.id);
  };
  
  return (
    <Link 
      href={`/loja/produto/${product.id}`}
      className="group"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300">
        {/* Imagem */}
        <div className="relative h-64 w-full bg-white">
          <Image
            src={product.images[0] || '/assets/images/product-placeholder.jpg'}
            alt={product.name}
            fill
            className="object-contain p-4"
          />
          
          {/* Badge de desconto */}
          {product.discount && (
            <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
              {Math.round((1 - product.discount / product.price) * 100)}% OFF
            </div>
          )}
          
          {/* Badge de novo */}
          {product.new && (
            <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
              Novo
            </div>
          )}
          
          {/* Botão de wishlist */}
          <button 
            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-primary p-2 rounded-full transition-colors"
            onClick={handleToggleWishlist}
            aria-label={isInWishlist ? "Remover da lista de desejos" : "Adicionar à lista de desejos"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 24 24" 
              fill={isInWishlist ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={isInWishlist ? "0" : "2"}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
          </button>
        </div>
        
        {/* Conteúdo */}
        <div className="p-4">
          <h3 className="text-lg font-medium text-text mb-2 line-clamp-2 h-14" title={product.name}>
            {product.name}
          </h3>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-text-secondary">({product.reviews})</span>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              {product.discount ? (
                <div>
                  <span className="text-lg font-bold text-primary">{formatCurrency(product.discount)}</span>
                  <span className="text-sm text-text-secondary line-through ml-2">{formatCurrency(product.price)}</span>
                </div>
              ) : (
                <span className="text-lg font-bold text-primary">{formatCurrency(product.price)}</span>
              )}
            </div>
          </div>
          
          <Button 
            variant="primary" 
            className="w-full"
            onClick={handleAddToCart}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Comprar
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;