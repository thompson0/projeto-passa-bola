import React from 'react';
import Link from 'next/link';
import CommunityPostItem from './CommunityPostItem';
import { Button } from '@/components/ui';

const CommunitySection = ({ posts }) => {
  if (!posts || posts.length === 0) return null;
  
  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Destaques da comunidade</h2>
        <Link href="/comunidade">
          <Button variant="outline" size="sm">Ver mais</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <CommunityPostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default CommunitySection;