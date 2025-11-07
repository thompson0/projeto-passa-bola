import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Pill } from '@/components/ui';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      return `${diffMinutes} min atrás`;
    }
    return `${diffHours} h atrás`;
  } else if (diffDays === 1) {
    return 'Ontem';
  } else {
    return date.toLocaleDateString('pt-BR');
  }
};

const CommunityPostItem = ({ post }) => {
  return (
    <Link 
      href={post.link}
      className="block bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-hover hover:scale-[1.01] transition-all duration-300"
    >
      <div className="p-6">
        {/* Cabeçalho do post */}
        <div className="flex items-center mb-4">
          <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
            <Image
              src={post.author.avatar || '/assets/images/avatar-placeholder.jpg'}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-medium text-text">{post.author.name}</h4>
            <div className="flex items-center">
              <span className="text-xs text-text-secondary">{post.author.team}</span>
              <span className="mx-2 text-text-secondary">•</span>
              <span className="text-xs text-text-secondary">{formatDate(post.date)}</span>
            </div>
          </div>
        </div>
        
        {/* Conteúdo do post */}
        {post.type === 'post' ? (
          <p className="text-text mb-4">{post.content}</p>
        ) : (
          <div className="mb-4">
            <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-2">
              <Image
                src={post.thumbnail || '/assets/images/media-placeholder.jpg'}
                alt={post.title}
                fill
                className="object-cover"
              />
              
              {/* Ícone de play para vídeos */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-primary/80 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              {/* Duração do vídeo */}
              {post.duration && (
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {post.duration}
                </div>
              )}
            </div>
            <h3 className="font-medium text-text">{post.title}</h3>
          </div>
        )}
        
        {/* Rodapé do post */}
        <div className="flex items-center text-text-secondary text-sm">
          <div className="flex items-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{post.likes}</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{post.comments}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CommunityPostItem;