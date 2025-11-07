import React, { useState } from 'react';

const BrazilMap = ({ states, selectedState, onSelectState }) => {
  const [hoveredState, setHoveredState] = useState(null);
  
  // Dimensões do canvas
  const width = 1000;
  const height = 625; // Proporção 16:10
  
  return (
    <div className="relative w-full h-full">
      {/* Mapa do Brasil (simplificado) */}
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full h-full"
        style={{ backgroundColor: '#1A0533' }}
      >
        {/* Contorno do Brasil (simplificado) */}
        <path 
          d="M200,100 C300,50 400,50 500,100 C600,150 700,150 800,200 C850,250 900,300 850,400 C800,500 700,550 600,500 C500,450 400,450 300,500 C200,550 150,500 200,400 C250,300 250,200 200,100 Z" 
          fill="#2D0A5A" 
          stroke="#4A158A" 
          strokeWidth="2"
        />
        
        {/* Pins para cada estado */}
        {states.map((state) => {
          const isSelected = selectedState === state.id;
          const isHovered = hoveredState === state.id;
          
          // Calcular posição do pin
          const x = (state.coordinates.x / 100) * width;
          const y = (state.coordinates.y / 100) * height;
          
          return (
            <g 
              key={state.id}
              onClick={() => onSelectState(state.id)}
              onMouseEnter={() => setHoveredState(state.id)}
              onMouseLeave={() => setHoveredState(null)}
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
              
              {/* Código do estado */}
              <text 
                x={x} 
                y={y} 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill="#FFFFFF" 
                fontSize={isSelected || isHovered ? "12" : "10"}
                fontWeight="bold"
                className="transition-all duration-300"
              >
                {state.id}
              </text>
              
              {/* Tooltip */}
              {isHovered && (
                <g>
                  <rect 
                    x={x + 20} 
                    y={y - 15} 
                    width={state.name.length * 8 + 20} 
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
                    {state.name}
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

export default BrazilMap;