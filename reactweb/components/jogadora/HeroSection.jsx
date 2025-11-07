import React from 'react';
import { Pill } from '@/components/ui';

const HeroSection = ({ data }) => {
  if (!data) return null;
  
  return (
    <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden rounded-lg mb-16">
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
          <div className="flex items-center space-x-3 mb-3">
            <Pill variant="primary">{data.position}</Pill>
            <Pill variant="info">{data.team}</Pill>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {data.title}
          </h1>
          <p className="text-lg text-gray-200">
            {data.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;