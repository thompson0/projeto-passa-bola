import React from 'react';
import Link from 'next/link';
import NewsCard from './NewsCard';
import { Button } from '@/components/ui';

const NewsSection = ({ news }) => {
  if (!news || news.length === 0) return null;
  
  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white">O que está rolando...</h2>
        <Link href="/noticias">
          <Button variant="outline" size="sm">Ver mais notícias</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </div>
  );
};

export default NewsSection;