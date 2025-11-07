'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, role, isLoading } = useAuth();
  
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        if (role === 'torcedora') {
          router.push('/inicio');
        } else if (role === 'jogadora') {
          router.push('/inicio-jogadora');
        }
      } else {
        // Em produção, descomentar esta linha:
        // router.push('/login');
      }
    }
  }, [isAuthenticated, role, isLoading, router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background-dark">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
        <h1 className="text-2xl font-bold mb-4">Passa Bola</h1>
        <p className="mb-8 text-text-secondary">
          Plataforma dedicada ao futebol feminino, conectando jogadoras, torcedoras e amantes do esporte.
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/login" 
            className="block w-full bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-md text-center transition-colors"
          >
            Login Normal
          </Link>
          
          <Link 
            href="/dev-login" 
            className="block w-full bg-lilac hover:bg-lilac-dark text-primary py-3 px-4 rounded-md text-center transition-colors"
          >
            Modo de Desenvolvimento
          </Link>
          
          <p className="text-sm text-text-secondary mt-4">
            Use o modo de desenvolvimento para visualizar as interfaces sem precisar de uma API.
          </p>
        </div>
      </div>
    </div>
  );
}