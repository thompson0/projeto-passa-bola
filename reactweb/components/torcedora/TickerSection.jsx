import React from 'react';
import Link from 'next/link';

const TickerSection = ({ data }) => {
  if (!data || data.length === 0) return null;
  
  return (
    <div className="bg-background-light rounded-lg overflow-hidden mb-16">
      <div className="flex overflow-x-auto scrollbar-hide">
        {data.map((match, index) => (
          <Link 
            key={match.id} 
            href={match.link}
            className="flex-shrink-0 border-r border-gray-700 last:border-r-0"
          >
            <div className="px-6 py-3 hover:bg-background-dark transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <span className="font-medium text-white">{match.home}</span>
                  <span className="mx-2 text-white">{match.homeScore}</span>
                </div>
                <span className="text-gray-400">x</span>
                <div className="flex items-center">
                  <span className="mx-2 text-white">{match.awayScore}</span>
                  <span className="font-medium text-white">{match.away}</span>
                </div>
                <span className="text-xs text-gray-400">{match.status}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TickerSection;