import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';

const HeroSection = ({ data }) => {
  if (!data) return null;
  
  return (
    <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden rounded-lg mb-16">
      {/* Imagem de fundo */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${data.image})` }}
      />
      
      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-90"></div>
      
      {/* Conteúdo */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {data.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            {data.subtitle}
          </p>
          <Link href={data.ctaLink}>
            <Button size="lg">
              {data.cta}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;