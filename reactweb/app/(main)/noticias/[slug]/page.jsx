'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import NewsHeader from '@/components/news/NewsHeader';
import NewsContent from '@/components/news/NewsContent';
import NewsSidebar from '@/components/news/NewsSidebar';
import RelatedNews from '@/components/news/RelatedNews';
import { newsService } from '@/services/mocks/newsData';

export default function NewsDetailPage() {
  const { slug } = useParams();
  const [newsData, setNewsData] = useState(null);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Em um ambiente real, isso seria uma chamada de API
        const news = newsService.getNewsDetail(slug);
        const matches = newsService.getUpcomingMatches();
        
        setNewsData(news);
        setUpcomingMatches(matches);
      } catch (error) {
        console.error('Erro ao carregar notícia:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-accent">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!newsData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white mb-4">Notícia não encontrada</h1>
        <p className="text-text-secondary mb-6">A notícia que você está procurando não existe ou foi removida.</p>
        <Link 
          href="/noticias"
          className="text-primary hover:text-lilac transition-colors font-medium"
        >
          Voltar para todas as notícias
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header da notícia */}
      <NewsHeader news={newsData} />
      
      {/* Conteúdo principal e sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <NewsContent content={newsData.content} />
          
          {/* Tags */}
          {newsData.tags && newsData.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-white mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {newsData.tags.map((tag, index) => (
                  <Link 
                    key={index} 
                    href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-background-light text-white text-sm px-3 py-1 rounded-full hover:bg-background-dark transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <NewsSidebar upcomingMatches={upcomingMatches} />
        </div>
      </div>
      
      {/* Notícias relacionadas */}
      {newsData.related && newsData.related.length > 0 && (
        <RelatedNews news={newsData.related} />
      )}
    </div>
  );
}