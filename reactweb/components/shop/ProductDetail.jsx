import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';

const ProductDetail = ({ product, onAddToCart, onToggleWishlist, isInWishlist }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  
  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };
  
  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 1) {
      setError('Por favor, selecione um tamanho');
      return;
    }
    
    if (!selectedColor && product.colors.length > 1) {
      setError('Por favor, selecione uma cor');
      return;
    }
    
    setError('');
    onAddToCart(
      product.id, 
      quantity, 
      selectedSize || product.sizes[0], 
      selectedColor || product.colors[0]
    );
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Galeria de imagens */}
      <div>
        <div className="bg-white rounded-lg overflow-hidden mb-4">
          <div className="relative aspect-square w-full">
            <Image
              src={product.images[selectedImage] || '/assets/images/shop/product-placeholder.jpg'}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
          </div>
        </div>
        
        {/* Miniaturas */}
        {product.images.length > 1 && (
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`relative h-20 w-20 bg-white rounded border-2 ${selectedImage === index ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image}
                  alt={`${product.name} - Imagem ${index + 1}`}
                  fill
                  className="object-contain p-1"
                />
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Informações do produto */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">{product.name}</h1>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center text-yellow-500 mr-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-300">{product.rating} ({product.reviews} avaliações)</span>
        </div>
        
        <div className="mb-6">
          {product.discount ? (
            <div className="flex items-center">
              <span className="text-3xl font-bold text-white mr-3">{formatCurrency(product.discount)}</span>
              <span className="text-xl text-gray-400 line-through">{formatCurrency(product.price)}</span>
              <span className="ml-3 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
                {Math.round((1 - product.discount / product.price) * 100)}% OFF
              </span>
            </div>
          ) : (
            <span className="text-3xl font-bold text-white">{formatCurrency(product.price)}</span>
          )}
        </div>
        
        <p className="text-gray-300 mb-6">{product.description}</p>
        
        {/* Seleção de tamanho */}
        {product.sizes.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white mb-2">Tamanho</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`
                    px-4 py-2 rounded-md border text-sm font-medium
                    ${selectedSize === size 
                      ? 'border-lilac bg-lilac/10 text-lilac' 
                      : 'border-gray-700 text-gray-300 hover:border-gray-500'}
                  `}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Seleção de cor */}
        {product.colors.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white mb-2">Cor</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`
                    px-4 py-2 rounded-md border text-sm font-medium
                    ${selectedColor === color 
                      ? 'border-lilac bg-lilac/10 text-lilac' 
                      : 'border-gray-700 text-gray-300 hover:border-gray-500'}
                  `}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Seleção de quantidade */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-white mb-2">Quantidade</h3>
          <div className="flex items-center">
            <button
              className="bg-background-light text-white w-10 h-10 rounded-l-md flex items-center justify-center border border-gray-700"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 h-10 border-t border-b border-gray-700 bg-background-light text-white text-center"
            />
            <button
              className="bg-background-light text-white w-10 h-10 rounded-r-md flex items-center justify-center border border-gray-700"
              onClick={() => setQuantity(quantity + 1)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mensagem de erro */}
        {error && (
          <div className="mb-4 text-red text-sm">{error}</div>
        )}
        
        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            variant="primary" 
            className="flex-1"
            onClick={handleAddToCart}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Adicionar ao carrinho
          </Button>
          
          <Button 
            variant={isInWishlist ? 'primary' : 'outline'}
            className="sm:w-auto"
            onClick={() => onToggleWishlist(product.id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </Button>
        </div>
        
        {/* Estoque */}
        <div className="mt-6 text-sm text-gray-300">
          <span className="font-medium">Disponibilidade:</span> {product.stock > 0 ? `${product.stock} em estoque` : 'Esgotado'}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;