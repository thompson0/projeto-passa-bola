// reactweb/components/layout/Header.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { user, role, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  const isShopPage = pathname?.includes('/loja');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileDropdownOpen]);

  // Obter a inicial do nome do usuário
  const getUserInitial = () => {
    // Tentar obter o nome do usuário de diferentes fontes possíveis
    const username = user?.username || user?.name || user?.user?.username || '';

    // Verificar se temos um nome de usuário
    if (username) {
      console.log('Nome do usuário:', username); // Log para depuração
      return username.charAt(0).toUpperCase();
    }

    // Tentar obter o email como fallback
    const email = user?.email || user?.user?.email || '';
    if (email) {
      return email.charAt(0).toUpperCase();
    }

    return 'A'; // Fallback padrão
  };

  const navigationLinks = role === 'jogadora'
  ? [
    { name: 'Home', href: '/inicio-jogadora' },
    { name: 'Competições', href: '/competicoes-global' }, // Corrigido de '/competicoes-mapa' para '/competicoes-global'
    { name: 'Comunidade', href: '/comunidade' },
    { name: 'Uploads', href: '/uploads' },
    { name: 'Loja', href: '/loja' },
    { name: 'Partidas', href: '/partidas' },
    { name: 'Ranking', href: '/ranking' },
  ]
  : [
    { name: 'Início', href: '/inicio' },
    { name: 'Competições', href: '/competicoes' },
    { name: 'Loja', href: '/loja' },
    { name: 'Comunidade', href: '/comunidade' },
    { name: 'Votação', href: '/votacao' },
  ];

  const profileMenuItems = role === 'jogadora'
    ? [
      { name: 'Meu Perfil', href: '/perfil' },
      { name: 'Minha Equipe', href: '/minha-equipe' },
      { name: 'Meus Jogos', href: '/meus-jogos' },
      { name: 'Configurações', href: '/configuracoes' },
    ]
    : [
      { name: 'Meu Perfil', href: '/perfil' },
      { name: 'Inscrever-se', href: '/inscrever-se' },
      { name: 'Configurações', href: '/configuracoes' },
    ];

  return (
    <header
      className={`sticky top-0 z-50 bg-background h-[72px] ${isScrolled ? 'shadow-md' : 'shadow-sm'
        } transition-shadow duration-300`}
    >
      <div className="container max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center">
          <Link href={role === 'jogadora' ? '/inicio-jogadora' : '/inicio'} className="flex items-center">
            <Image
              src="/assets/images/logo.svg"
              alt="Passa Bola"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="ml-2 text-white font-bold text-xl hidden sm:block">Passa Bola</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          {navigationLinks.map((link) => {
            const isActive = pathname === link.href ||
              (link.href !== '/' && pathname?.startsWith(link.href));

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative
                  ${isActive
                    ? 'text-lilac'
                    : 'text-white hover:text-lilac-light'
                  }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-lilac rounded-full"></span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button
            className="text-white hover:text-lilac-light transition-colors focus:outline-none focus:ring-2 focus:ring-lilac focus:ring-offset-2 focus:ring-offset-background rounded-full p-1"
            aria-label="Buscar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {isAuthenticated && (
            <button
              className="text-white hover:text-lilac-light transition-colors focus:outline-none focus:ring-2 focus:ring-lilac focus:ring-offset-2 focus:ring-offset-background rounded-full p-1"
              aria-label="Notificações"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          )}

          {isShopPage && (
            <Link
              href="/loja/carrinho"
              className="text-white hover:text-lilac-light transition-colors focus:outline-none focus:ring-2 focus:ring-lilac focus:ring-offset-2 focus:ring-offset-background rounded-full p-1 relative"
              aria-label="Carrinho"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          )}

          {isAuthenticated ? (
            <div className="relative profile-dropdown">
              <button
                className="flex items-center focus:outline-none focus:ring-2 focus:ring-lilac focus:ring-offset-2 focus:ring-offset-background rounded-full"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                aria-expanded={isProfileDropdownOpen}
                aria-haspopup="true"
              >
                <div className="h-8 w-8 rounded-full bg-lilac flex items-center justify-center text-primary font-medium overflow-hidden">
                  {user?.profileImage ? (
                    <Image
                      src={user.profileImage}
                      alt={user.name || 'Avatar'}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span>{getUserInitial()}</span>
                  )}
                </div>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                  {profileMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-text hover:bg-lilac/10 hover:text-primary"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red hover:bg-red/10"
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      logout();
                    }}
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="text-white hover:text-lilac-light transition-colors font-medium text-sm"
            >
              Entrar
            </Link>
          )}

          <button
            className="md:hidden text-white hover:text-lilac-light transition-colors focus:outline-none focus:ring-2 focus:ring-lilac focus:ring-offset-2 focus:ring-offset-background rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Menu principal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-background-dark">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationLinks.map((link) => {
              const isActive = pathname === link.href ||
                (link.href !== '/' && pathname?.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive
                      ? 'bg-lilac/10 text-lilac'
                      : 'text-white hover:bg-lilac/5 hover:text-lilac-light'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;