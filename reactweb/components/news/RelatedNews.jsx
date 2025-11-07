import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Pill } from '@/components/ui';

const RelatedNewsCard = ({ news }) => {
  return (
    <Link 
      href={`/noticias/${news.slug}`}
      className="block bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-hover hover:scale-[1.02] transition-all duration-300"
    >
      <div className="relative h-48 w-full">
        <Image
          src={news.image || '/assets/images/placeholder.jpg'}
          alt={news.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Pill variant="primary">{news.category}</Pill>
          <span className="text-sm text-text-secondary">{news.date}</span>
        </div>
        <h3 className="text-xl font-bold text-text mb-2 line-clamp-2">{news.title}</h3>
        <p className="text-text-secondary line-clamp-3">{news.excerpt}</p>
        <div className="mt-4 flex justify-end">
          <span className="text-primary font-medium hover:underline">Ler mais</span>
        </div>
      </div>
    </Link>
  );
};

const RelatedNews = ({ news }) => {
  if (!news || news.length === 0) return null;
  
  return (
    <div className="mt-16 pt-8 border-t border-gray-800">
      <h2 className="text-2xl font-bold text-white mb-6">Notícias relacionadas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <RelatedNewsCard key={item.id} news={item} />
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <Link 
          href="/noticias"
          className="text-primary hover:text-lilac transition-colors font-medium"
        >
          Voltar para todas as notícias
        </Link>
      </div>
    </div>
  );
};

export default RelatedNews;