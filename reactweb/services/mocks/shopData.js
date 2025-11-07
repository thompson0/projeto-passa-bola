// services/mocks/shopData.js

// Mock data para produtos da loja

export const categories = [
  { id: 'todos', name: 'Produtos' },
  { id: 'camisas', name: 'Camisas' },
  { id: 'acessorios', name: 'Acessórios' },
  { id: 'copos', name: 'Copos/Canecas' }
];

export const sortOptions = [
  { id: 'relevancia', name: 'Relevância' },
  { id: 'preco-asc', name: 'Menor preço' },
  { id: 'preco-desc', name: 'Maior preço' },
  { id: 'nome-asc', name: 'A-Z' },
  { id: 'nome-desc', name: 'Z-A' },
  { id: 'lancamento', name: 'Lançamentos' }
];

export const productsData = [
  {
    id: 1,
    name: 'Camisa Oficial Feminina Corinthians 2023',
    description: 'Camisa oficial do Corinthians Feminino para a temporada 2023. Tecido leve e respirável com tecnologia Dri-FIT.',
    price: 249.90,
    discount: 199.90,
    category: 'camisas',
    images: [
      '/assets/images/shop/camisa-1.jpg',
      '/assets/images/shop/camisa-1-2.jpg',
      '/assets/images/shop/camisa-1-3.jpg'
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Branco', 'Preto'],
    inStock: true,
    featured: true,
    new: true,
    rating: 4.8,
    reviews: 124,
    specifications: [
      { name: 'Material', value: '100% Poliéster' },
      { name: 'Tecnologia', value: 'Dri-FIT' },
      { name: 'Gola', value: 'Redonda' },
      { name: 'Manga', value: 'Curta' },
      { name: 'Origem', value: 'Nacional' }
    ]
  },
  {
    id: 2,
    name: 'Camisa Oficial Feminina Palmeiras 2023',
    description: 'Camisa oficial do Palmeiras Feminino para a temporada 2023. Tecido leve e respirável com tecnologia Dri-FIT.',
    price: 249.90,
    discount: 199.90,
    category: 'camisas',
    images: [
      '/assets/images/shop/camisa-2.jpg',
      '/assets/images/shop/camisa-2-2.jpg',
      '/assets/images/shop/camisa-2-3.jpg'
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Verde', 'Branco'],
    inStock: true,
    featured: true,
    new: true,
    rating: 4.7,
    reviews: 98,
    specifications: [
      { name: 'Material', value: '100% Poliéster' },
      { name: 'Tecnologia', value: 'Dri-FIT' },
      { name: 'Gola', value: 'Redonda' },
      { name: 'Manga', value: 'Curta' },
      { name: 'Origem', value: 'Nacional' }
    ]
  },
  {
    id: 3,
    name: 'Camisa Oficial Feminina São Paulo 2023',
    description: 'Camisa oficial do São Paulo Feminino para a temporada 2023. Tecido leve e respirável com tecnologia Dri-FIT.',
    price: 249.90,
    discount: 199.90,
    category: 'camisas',
    images: [
      '/assets/images/shop/camisa-3.jpg',
      '/assets/images/shop/camisa-3-2.jpg',
      '/assets/images/shop/camisa-3-3.jpg'
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Vermelho', 'Branco', 'Preto'],
    inStock: true,
    featured: true,
    new: true,
    rating: 4.6,
    reviews: 87,
    specifications: [
      { name: 'Material', value: '100% Poliéster' },
      { name: 'Tecnologia', value: 'Dri-FIT' },
      { name: 'Gola', value: 'Redonda' },
      { name: 'Manga', value: 'Curta' },
      { name: 'Origem', value: 'Nacional' }
    ]
  },
  {
    id: 4,
    name: 'Camisa Oficial Feminina Santos 2023',
    description: 'Camisa oficial do Santos Feminino para a temporada 2023. Tecido leve e respirável com tecnologia Dri-FIT.',
    price: 249.90,
    discount: 199.90,
    category: 'camisas',
    images: [
      '/assets/images/shop/camisa-4.jpg',
      '/assets/images/shop/camisa-4-2.jpg',
      '/assets/images/shop/camisa-4-3.jpg'
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Branco', 'Preto'],
    inStock: true,
    featured: false,
    new: true,
    rating: 4.5,
    reviews: 76,
    specifications: [
      { name: 'Material', value: '100% Poliéster' },
      { name: 'Tecnologia', value: 'Dri-FIT' },
      { name: 'Gola', value: 'Redonda' },
      { name: 'Manga', value: 'Curta' },
      { name: 'Origem', value: 'Nacional' }
    ]
  },
  {
    id: 5,
    name: 'Boné Seleção Brasileira Feminina',
    description: 'Boné oficial da Seleção Brasileira Feminina. Ajuste snapback para melhor conforto.',
    price: 89.90,
    discount: 79.90,
    category: 'acessorios',
    images: [
      '/assets/images/shop/bone-1.jpg',
      '/assets/images/shop/bone-1-2.jpg',
      '/assets/images/shop/bone-1-3.jpg'
    ],
    sizes: ['Único'],
    colors: ['Amarelo', 'Verde'],
    inStock: true,
    featured: true,
    new: false,
    rating: 4.4,
    reviews: 52,
    specifications: [
      { name: 'Material', value: '100% Algodão' },
      { name: 'Ajuste', value: 'Snapback' },
      { name: 'Origem', value: 'Nacional' }
    ]
  },
  {
    id: 6,
    name: 'Caneleira Profissional Feminina',
    description: 'Caneleira profissional para jogadoras de futebol. Proteção de alto impacto e leveza.',
    price: 79.90,
    discount: 69.90,
    category: 'acessorios',
    images: [
      '/assets/images/shop/caneleira-1.jpg',
      '/assets/images/shop/caneleira-1-2.jpg',
      '/assets/images/shop/caneleira-1-3.jpg'
    ],
    sizes: ['P', 'M', 'G'],
    colors: ['Preto', 'Azul', 'Rosa'],
    inStock: true,
    featured: false,
    new: false,
    rating: 4.6,
    reviews: 38,
    specifications: [
      { name: 'Material', value: 'Polipropileno' },
      { name: 'Proteção', value: 'Alto impacto' },
      { name: 'Fixação', value: 'Velcro ajustável' },
      { name: 'Origem', value: 'Importado' }
    ]
  },
  {
    id: 7,
    name: 'Meia Oficial Seleção Brasileira',
    description: 'Meia oficial da Seleção Brasileira Feminina. Conforto e durabilidade para os jogos.',
    price: 49.90,
    discount: 39.90,
    category: 'acessorios',
    images: [
      '/assets/images/shop/meia-1.jpg',
      '/assets/images/shop/meia-1-2.jpg',
      '/assets/images/shop/meia-1-3.jpg'
    ],
    sizes: ['33-36', '37-40', '41-44'],
    colors: ['Amarelo', 'Azul', 'Branco'],
    inStock: true,
    featured: false,
    new: false,
    rating: 4.3,
    reviews: 29,
    specifications: [
      { name: 'Material', value: '78% Poliéster, 20% Algodão, 2% Elastano' },
      { name: 'Altura', value: 'Cano alto' },
      { name: 'Origem', value: 'Nacional' }
    ]
  },
  {
    id: 8,
    name: 'Caneca Corinthians Feminino',
    description: 'Caneca oficial do Corinthians Feminino. Capacidade de 350ml, ideal para seu café ou chá.',
    price: 39.90,
    discount: 34.90,
    category: 'copos',
    images: [
      '/assets/images/shop/caneca-1.jpg',
      '/assets/images/shop/caneca-1-2.jpg',
      '/assets/images/shop/caneca-1-3.jpg'
    ],
    sizes: ['350ml'],
    colors: ['Preto', 'Branco'],
    inStock: true,
    featured: true,
    new: false,
    rating: 4.7,
    reviews: 45,
    specifications: [
      { name: 'Material', value: 'Cerâmica' },
      { name: 'Capacidade', value: '350ml' },
      { name: 'Vai ao micro-ondas', value: 'Sim' },
      { name: 'Vai à lava-louças', value: 'Sim' },
      { name: 'Origem', value: 'Nacional' }
    ]
  },
  {
    id: 9,
    name: 'Copo Térmico Seleção Brasileira',
    description: 'Copo térmico oficial da Seleção Brasileira Feminina. Mantém sua bebida quente ou fria por horas.',
    price: 59.90,
    discount: 49.90,
    category: 'copos',
    images: [
      '/assets/images/shop/copo-1.jpg',
      '/assets/images/shop/copo-1-2.jpg',
      '/assets/images/shop/copo-1-3.jpg'
    ],
    sizes: ['500ml'],
    colors: ['Amarelo', 'Verde', 'Azul'],
    inStock: true,
    featured: false,
    new: true,
    rating: 4.8,
    reviews: 37,
    specifications: [
      { name: 'Material', value: 'Aço inoxidável' },
      { name: 'Capacidade', value: '500ml' },
      { name: 'Conservação térmica', value: 'Até 6 horas' },
      { name: 'Tampa', value: 'Rosqueável com vedação' },
      { name: 'Origem', value: 'Importado' }
    ]
  },
  {
    id: 10,
    name: 'Garrafa Squeeze Palmeiras Feminino',
    description: 'Garrafa squeeze oficial do Palmeiras Feminino. Ideal para hidratação durante os treinos.',
    price: 29.90,
    discount: null,
    category: 'copos',
    images: [
      '/assets/images/shop/garrafa-1.jpg',
      '/assets/images/shop/garrafa-1-2.jpg',
      '/assets/images/shop/garrafa-1-3.jpg'
    ],
    sizes: ['750ml'],
    colors: ['Verde', 'Branco'],
    inStock: true,
    featured: false,
    new: false,
    rating: 4.5,
    reviews: 28,
    specifications: [
      { name: 'Material', value: 'Polietileno' },
      { name: 'Capacidade', value: '750ml' },
      { name: 'Tampa', value: 'Flip-top' },
      { name: 'Origem', value: 'Nacional' }
    ]
  },
  {
    id: 11,
    name: 'Camisa Retrô Seleção Brasileira 1994',
    description: 'Camisa retrô da Seleção Brasileira Feminina inspirada no modelo de 1994. Edição especial comemorativa.',
    price: 299.90,
    discount: 249.90,
    category: 'camisas',
    images: [
      '/assets/images/shop/camisa-5.jpg',
      '/assets/images/shop/camisa-5-2.jpg',
      '/assets/images/shop/camisa-5-3.jpg'
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Amarelo'],
    inStock: true,
    featured: true,
    new: false,
    rating: 4.9,
    reviews: 156,
    specifications: [
      { name: 'Material', value: '100% Algodão' },
      { name: 'Gola', value: 'Redonda' },
      { name: 'Manga', value: 'Curta' },
      { name: 'Edição', value: 'Especial Comemorativa' },
      { name: 'Origem', value: 'Nacional' }
    ]
  },
  {
    id: 12,
    name: 'Cachecol Torcida Feminina',
    description: 'Cachecol oficial para torcedoras. Ideal para torcer pelo seu time com estilo e conforto.',
    price: 59.90,
    discount: null,
    category: 'acessorios',
    images: [
      '/assets/images/shop/cachecol-1.jpg',
      '/assets/images/shop/cachecol-1-2.jpg',
      '/assets/images/shop/cachecol-1-3.jpg'
    ],
    sizes: ['Único'],
    colors: ['Vermelho', 'Azul', 'Verde', 'Preto'],
    inStock: true,
    featured: false,
    new: false,
    rating: 4.4,
    reviews: 32,
    specifications: [
      { name: 'Material', value: '100% Acrílico' },
      { name: 'Comprimento', value: '150cm' },
      { name: 'Largura', value: '20cm' },
      { name: 'Origem', value: 'Nacional' }
    ]
  }
];

// Mock do carrinho de compras
let cart = {
  items: [],
  total: 0
};

// Mock da lista de desejos
let wishlist = {
  items: []
};

export const shopService = {
  getCategories: () => {
    return categories;
  },
  
  getSortOptions: () => {
    return sortOptions;
  },
  
  getProducts: (filters = {}) => {
    let filteredProducts = [...productsData];
    
    // Aplicar filtros
    if (filters.category && filters.category !== 'todos') {
      filteredProducts = filteredProducts.filter(product => product.category === filters.category);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Aplicar ordenação
    if (filters.sort) {
      switch (filters.sort) {
        case 'preco-asc':
          filteredProducts.sort((a, b) => (a.discount || a.price) - (b.discount || b.price));
          break;
        case 'preco-desc':
          filteredProducts.sort((a, b) => (b.discount || b.price) - (a.discount || a.price));
          break;
        case 'nome-asc':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'nome-desc':
          filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'lancamento':
          filteredProducts.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
          break;
        default: // relevancia
          filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
          break;
      }
    }
    
    return filteredProducts;
  },
  
  getProductById: (id) => {
    return productsData.find(product => product.id === parseInt(id)) || null;
  },
  
  // Funções do carrinho
  getCartCount: () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  },
  
  getCart: () => {
    return {
      items: [...cart.items],
      total: cart.total
    };
  },
  
  addToCart: (productId, quantity = 1, size, color) => {
    const product = productsData.find(product => product.id === parseInt(productId));
    
    if (!product) {
      return { success: false, message: 'Produto não encontrado.' };
    }
    
    if (!product.inStock) {
      return { success: false, message: 'Produto fora de estoque.' };
    }
    
    // Verificar se o produto já está no carrinho
    const existingItemIndex = cart.items.findIndex(
      item => item.productId === productId && item.size === size && item.color === color
    );
    
    if (existingItemIndex >= 0) {
      // Atualizar quantidade
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Adicionar novo item
      cart.items.push({
        id: Date.now(),
        productId: parseInt(productId),
        name: product.name,
        price: product.discount || product.price,
        quantity,
        size,
        color,
        image: product.images[0]
      });
    }
    
    // Recalcular total
    cart.total = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    return { 
      success: true, 
      message: 'Produto adicionado ao carrinho!',
      cartCount: cart.items.reduce((total, item) => total + item.quantity, 0)
    };
  },
  
  updateCartItem: (itemId, quantity) => {
    const itemIndex = cart.items.findIndex(item => item.id === itemId);
    
    if (itemIndex < 0) {
      return { success: false, message: 'Item não encontrado no carrinho.' };
    }
    
    if (quantity <= 0) {
      // Remover item
      cart.items.splice(itemIndex, 1);
    } else {
      // Atualizar quantidade
      cart.items[itemIndex].quantity = quantity;
    }
    
    // Recalcular total
    cart.total = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    return { 
      success: true, 
      message: 'Carrinho atualizado!',
      cartCount: cart.items.reduce((total, item) => total + item.quantity, 0)
    };
  },
  
  removeCartItem: (itemId) => {
    const itemIndex = cart.items.findIndex(item => item.id === itemId);
    
    if (itemIndex < 0) {
      return { success: false, message: 'Item não encontrado no carrinho.' };
    }
    
    // Remover item
    cart.items.splice(itemIndex, 1);
    
    // Recalcular total
    cart.total = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    return { 
      success: true, 
      message: 'Item removido do carrinho!',
      cartCount: cart.items.reduce((total, item) => total + item.quantity, 0)
    };
  },
  
  clearCart: () => {
    cart.items = [];
    cart.total = 0;
    
    return { 
      success: true, 
      message: 'Carrinho esvaziado!'
    };
  },
  
  // Funções da lista de desejos
  getWishlist: () => {
    return {
      items: [...wishlist.items]
    };
  },
  
  isInWishlist: (productId) => {
    return wishlist.items.some(item => item.productId === parseInt(productId));
  },
  
  toggleWishlist: (productId) => {
    const product = productsData.find(product => product.id === parseInt(productId));
    
    if (!product) {
      return { success: false, message: 'Produto não encontrado.' };
    }
    
    const existingItemIndex = wishlist.items.findIndex(item => item.productId === parseInt(productId));
    
    if (existingItemIndex >= 0) {
      // Remover da lista de desejos
      wishlist.items.splice(existingItemIndex, 1);
      return { 
        success: true, 
        message: 'Produto removido da lista de desejos!',
        inWishlist: false
      };
    } else {
      // Adicionar à lista de desejos
      wishlist.items.push({
        id: Date.now(),
        productId: parseInt(productId),
        name: product.name,
        price: product.discount || product.price,
        image: product.images[0]
      });
      return { 
        success: true, 
        message: 'Produto adicionado à lista de desejos!',
        inWishlist: true
      };
    }
  }
};