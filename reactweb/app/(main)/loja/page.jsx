// app/(main)/loja/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import CategoryTabs from '@/components/shop/CategoryTabs';
import SortDropdown from '@/components/shop/SortDropdown';
import ProductCard from '@/components/shop/ProductCard';
import CartIcon from '@/components/shop/CartIcon';
import { Toast } from '@/components/ui';
import { shopService } from '@/services/apiService';

export default function ShopPage() {
  const [categories, setCategories] = useState([]);
  const [sortOptions, setSortOptions] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  
  const [activeCategory, setActiveCategory] = useState('todos');
  const [activeSort, setActiveSort] = useState('relevancia');
  const [wishlist, setWishlist] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Em um ambiente real, isso seria uma chamada de API
        const categoriesData = shopService.getCategories();
        const sortOptionsData = shopService.getSortOptions();
        const productsData = shopService.getProducts();
        const cartCountData = shopService.getCartCount();
        const wishlistData = shopService.getWishlist();
        
        setCategories(categoriesData);
        setSortOptions(sortOptionsData);
        setProducts(productsData);
        setCartCount(cartCountData);
        setWishlist(wishlistData.items.map(item => item.id));
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    // Atualizar produtos quando os filtros mudarem
    const fetchFilteredProducts = async () => {
      try {
        // Em um ambiente real, isso seria uma chamada de API
        const filteredData = shopService.getProducts({
          category: activeCategory,
          sort: activeSort
        });
        setProducts(filteredData);
      } catch (error) {
        console.error('Erro ao filtrar produtos:', error);
      }
    };

    fetchFilteredProducts();
  }, [activeCategory, activeSort]);
  
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };
  
  const handleSortChange = (sortId) => {
    setActiveSort(sortId);
  };
  
  const handleAddToCart = (productId) => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      // Aqui estamos usando valores padrão para tamanho e cor
      const product = products.find(p => p.id === productId);
      const result = shopService.addToCart(
        productId, 
        1, 
        product.sizes[0], 
        product.colors[0]
      );
      
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
        if (result.inWishlist) {
          setWishlist(prev => [...prev, productId]);
        } else {
          setWishlist(prev => prev.filter(id => id !== productId));
        }
        
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

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Loja</h1>
        <CartIcon count={cartCount} />
      </div>
  
      
      {/* Tabs de categorias */}
      <CategoryTabs 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      {/* Barra de filtros e ordenação */}
      <div className="flex justify-between items-center mb-8">
        <p className="text-gray-300">
          {products.length} {products.length === 1 ? 'produto' : 'produtos'} encontrados
        </p>
        
        <SortDropdown 
          sortOptions={sortOptions}
          activeSort={activeSort}
          onSortChange={handleSortChange}
        />
      </div>
      
      {/* Grid de produtos */}
      {products.length === 0 ? (
        <div className="bg-background-light rounded-lg p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-gray-300 mb-4">Nenhum produto encontrado nesta categoria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              isInWishlist={wishlist.includes(product.id)}
            />
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