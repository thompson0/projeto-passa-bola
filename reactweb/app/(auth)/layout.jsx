'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Determinar se deve mostrar o botão de voltar
  // Não mostrar na página principal de login
  const showBackButton = pathname !== '/login';
  
  // Determinar para onde voltar
  const getBackPath = () => {
    if (pathname.includes('register-torcedora')) return '/login-torcedora';
    if (pathname.includes('register-jogadora')) return '/login-jogadora';
    if (pathname.includes('login-torcedora') || pathname.includes('login-jogadora')) return '/login';
    if (pathname.includes('esqueci-senha')) {
      // Se veio de login-torcedora ou login-jogadora, voltar para lá
      // Caso contrário, voltar para login geral
      const referrer = document.referrer;
      if (referrer.includes('login-torcedora')) return '/login-torcedora';
      if (referrer.includes('login-jogadora')) return '/login-jogadora';
      return '/login';
    }
    return '/login';
  };

  const handleBack = () => {
    router.push(getBackPath());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-hero-gradient bg-cover bg-center bg-no-repeat relative p-4"
         style={{ backgroundImage: 'url(/assets/images/stadium-background.jpg)' }}>
      <div className="absolute inset-0 bg-hero-gradient"></div>
      
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Logo */}
        <Link href="/" className="mb-8">
          <Image 
            src="/assets/images/logo.svg" 
            alt="Logo Passa Bola" 
            width={180} 
            height={60}
            className="h-auto"
          />
        </Link>
        
        {/* Auth Card */}
        <div className="w-full max-w-[460px] bg-white rounded-[20px] shadow-modal">
          {/* Back Button */}
          {showBackButton && (
            <div className="p-4 border-b border-gray-100">
              <button 
                onClick={handleBack}
                className="flex items-center text-text-secondary hover:text-primary transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-1" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
                Voltar
              </button>
            </div>
          )}
          
          {/* Content */}
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}