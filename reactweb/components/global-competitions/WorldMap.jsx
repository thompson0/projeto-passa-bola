import React, { useState } from 'react';

const WorldMap = ({ continents, selectedContinent, onSelectContinent }) => {
  const [hoveredContinent, setHoveredContinent] = useState(null);
  
  // Dimensões do canvas
  const width = 1000;
  const height = 500; // Proporção 2:1 para mapa mundi
  
  return (
    <div className="relative w-full h-full">
      {/* Mapa mundi simplificado */}
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full h-full"
        style={{ backgroundColor: '#1A0533' }}
      >
        {/* Contornos simplificados dos continentes */}
        {/* América do Norte */}
        <path 
          d="M150,50 C200,30 250,40 280,80 C310,120 330,150 300,200 C270,250 200,270 150,250 C100,230 80,180 100,130 C120,80 130,60 150,50 Z" 
          fill="#2D0A5A" 
          stroke="#4A158A" 
          strokeWidth="2"
        />
        
        {/* América do Sul */}
        <path 
          d="M250,250 C280,230 310,240 330,270 C350,300 360,350 340,400 C320,450 280,470 240,450 C200,430 190,380 200,330 C210,280 230,260 250,250 Z" 
          fill="#2D0A5A" 
          stroke="#4A158A" 
          strokeWidth="2"
        />
        
        {/* Europa */}
        <path 
          d="M450,50 C500,30 550,40 580,80 C610,120 620,150 600,180 C580,210 540,220 500,210 C460,200 440,170 450,130 C460,90 470,60 450,50 Z" 
          fill="#2D0A5A" 
          stroke="#4A158A" 
          strokeWidth="2"
        />
        
        {/* África */}
        <path 
          d="M450,200 C500,180 550,190 580,230 C610,270 620,320 600,370 C580,420 530,440 480,430 C430,420 410,380 420,330 C430,280 440,210 450,200 Z" 
          fill="#2D0A5A" 
          stroke="#4A158A" 
          strokeWidth="2"
        />
        
        {/* Ásia */}
        <path 
          d="M600,50 C650,30 700,40 750,80 C800,120 830,180 800,250 C770,320 700,350 630,330 C560,310 540,250 560,180 C580,110 600,60 600,50 Z" 
          fill="#2D0A5A" 
          stroke="#4A158A" 
          strokeWidth="2"
        />
        
        {/* Oceania */}
        <path 
          d="M800,300 C830,290 860,300 880,320 C900,340 910,370 900,400 C890,430 860,440 830,430 C800,420 790,390 800,360 C810,330 820,310 800,300 Z" 
          fill="#2D0A5A" 
          stroke="#4A158A" 
          strokeWidth="2"
        />
        
        {/* Pins para cada continente */}
        {continents.map((continent) => {
          const isSelected = selectedContinent === continent.id;
          const isHovered = hoveredContinent === continent.id;
          
          // Calcular posição do pin
          const x = (continent.coordinates.x / 100) * width;
          const y = (continent.coordinates.y / 100) * height;
          
          return (
            <g 
              key={continent.id}
              onClick={() => onSelectContinent(continent.id)}
              onMouseEnter={() => setHoveredContinent(continent.id)}
              onMouseLeave={() => setHoveredContinent(null)}
              className="cursor-pointer"
            >
              {/* Pin */}
              <circle 
                cx={x} 
                cy={y} 
                r={isSelected || isHovered ? 16 : 12} 
                fill={isSelected ? '#D8B4FE' : '#6E2BB9'} 
                stroke="#FFFFFF" 
                strokeWidth="2"
                className="transition-all duration-300"
              />
              
              {/* Tooltip */}
              {isHovered && (
                <g>
                  <rect 
                    x={x + 20} 
                    y={y - 15} 
                    width={continent.name.length * 8 + 20} 
                    height="30" 
                    rx="5" 
                    fill="#FFFFFF" 
                    opacity="0.9"
                  />
                  <text 
                    x={x + 30} 
                    y={y + 5} 
                    fill="#2D0A5A" 
                    fontSize="14"
                    fontWeight="medium"
                  >
                    {continent.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default WorldMap;