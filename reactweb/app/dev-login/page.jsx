'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import authService from '@/services/auth';

export default function DevLoginPage() {
  const router = useRouter();

  const handleLoginAsTorcedora = () => {
    authService.simulateLogin('torcedora');
    router.push('/inicio');
  };

  const handleLoginAsJogadora = () => {
    authService.simulateLogin('jogadora');
    router.push('/inicio-jogadora');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background-dark p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Modo de Desenvolvimento</h1>
        <p className="text-text-secondary mb-8 text-center">
          Escolha qual interface você deseja visualizar sem precisar fazer login real.
        </p>
        
        <div className="space-y-4">
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleLoginAsTorcedora}
          >
            Entrar como Torcedora
          </Button>
          
          <Button 
            variant="outline"
            className="w-full" 
            size="lg"
            onClick={handleLoginAsJogadora}
          >
            Entrar como Jogadora
          </Button>
          
          <div className="text-center mt-6 space-y-2">
            <p className="text-sm text-text-secondary">
              Páginas disponíveis após login:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <a 
                href="/inicio" 
                className="text-primary hover:underline text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  authService.simulateLogin('torcedora');
                  router.push('/inicio');
                }}
              >
                Feed Torcedora
              </a>
              <span className="text-text-secondary">|</span>
              <a 
                href="/inicio-jogadora" 
                className="text-primary hover:underline text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  authService.simulateLogin('jogadora');
                  router.push('/inicio-jogadora');
                }}
              >
                Feed Jogadora
              </a>
            </div>
            <div className="mt-4">
              <a 
                href="/login" 
                className="text-text-secondary hover:underline text-sm"
              >
                Ir para o login real
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}