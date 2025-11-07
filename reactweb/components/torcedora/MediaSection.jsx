import React from 'react';
import Link from 'next/link';
import MediaItem from './MediaItem';
import { Button } from '@/components/ui';

const MediaSection = ({ media }) => {
  if (!media || media.length === 0) return null;
  
  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Galeria e vídeos</h2>
        <Link href="/videos">
          <Button variant="outline" size="sm">Ver todos</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {media.map((item) => (
          <MediaItem key={item.id} media={item} />
        ))}
      </div>
    </div>
  );
};

export default MediaSection;