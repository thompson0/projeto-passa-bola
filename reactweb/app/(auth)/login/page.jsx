'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui';

export default function LoginSelectionPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text">Bem-vinda</h1>
        <p className="mt-2 text-text-secondary">Escolha como deseja entrar</p>
      </div>
      
      <div className="space-y-4">
        <Link href="/login-torcedora" className="block w-full">
          <Button 
            className="w-full flex items-center justify-center" 
            size="lg"
          >
            <div className="flex items-center">
              <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </span>
              Entrar como Torcedora
            </div>
          </Button>
        </Link>
        
        <Link href="/login-jogadora" className="block w-full">
          <Button 
            variant="outline"
            className="w-full flex items-center justify-center" 
            size="lg"
          >
            <div className="flex items-center">
              <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </span>
              Entrar como Jogadora
            </div>
          </Button>
        </Link>
      </div>
      
      <div className="text-center space-y-4">
        <p className="text-text-secondary">
          Não tem uma conta ainda?
        </p>
      </div>
    </div>
  );
}