import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const MediaItem = ({ media }) => {
  return (
    <Link 
      href={media.link}
      className="block relative rounded-lg overflow-hidden hover:scale-[1.03] transition-all duration-300"
    >
      <div className="relative aspect-video w-full">
        <Image
          src={media.thumbnail || '/assets/images/media-placeholder.jpg'}
          alt={media.title}
          fill
          className="object-cover"
        />
        
        {/* Overlay para melhor legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {/* Ícone de play para vídeos */}
        {media.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-primary/80 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
        
        {/* Duração do vídeo */}
        {media.duration && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {media.duration}
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-medium line-clamp-2">{media.title}</h3>
      </div>
    </Link>
  );
};

export default MediaItem;