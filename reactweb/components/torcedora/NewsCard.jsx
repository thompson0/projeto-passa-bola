import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Pill } from '@/components/ui';

const NewsCard = ({ news }) => {
  return (
    <Link 
      href={news.link}
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

export default NewsCard;