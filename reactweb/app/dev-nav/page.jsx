// app/dev-nav/page.jsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function DevNavPage() {
  const pages = [
    { name: 'Início (Torcedora)', path: '/inicio' },
    { name: 'Início (Jogadora)', path: '/inicio-jogadora' },
    { name: 'Comunidade', path: '/comunidade' },
    { name: 'Loja', path: '/loja' },
    { name: 'Carrinho', path: '/loja/carrinho' },
    { name: 'Favoritos', path: '/loja/favoritos' },
    { name: 'Detalhe do Produto', path: '/loja/produto/1' },
    { name: 'Votação', path: '/votacao' },
    { name: 'Partidas', path: '/partidas' },
    { name: 'Perfil', path: '/perfil' },
    { name: 'Equipe', path: '/equipe' },
    { name: 'Inscrição', path: '/inscricao' },
    { name: 'Uploads', path: '/uploads' },
    { name: 'Competições', path: '/competicoes' },
    { name: 'Competições Globais', path: '/competicoes-global' },
    { name: 'Notícia Exemplo', path: '/noticias/exemplo' },
    { name: 'Configuração de Mocks', path: '/dev-config' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Navegação de Desenvolvimento</h1>
      
      <div className="bg-background-light rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Páginas Disponíveis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pages.map((page) => (
            <Link 
              key={page.path} 
              href={page.path}
              className="bg-background p-4 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-white">{page.name}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="mt-8 bg-background-light rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Páginas de Autenticação</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/login" className="bg-background p-4 rounded-lg hover:bg-gray-800 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-white">Login</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>
          <Link href="/login-torcedora" className="bg-background p-4 rounded-lg hover:bg-gray-800 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-white">Login Torcedora</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>
          <Link href="/login-jogadora" className="bg-background p-4 rounded-lg hover:bg-gray-800 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-white">Login Jogadora</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>
          <Link href="/register" className="bg-background p-4 rounded-lg hover:bg-gray-800 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-white">Registro</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>
          <Link href="/register-torcedora" className="bg-background p-4 rounded-lg hover:bg-gray-800 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-white">Registro Torcedora</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>
          <Link href="/register-jogadora" className="bg-background p-4 rounded-lg hover:bg-gray-800 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-white">Registro Jogadora</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>
          <Link href="/esqueci-senha" className="bg-background p-4 rounded-lg hover:bg-gray-800 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-white">Esqueci Senha</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}