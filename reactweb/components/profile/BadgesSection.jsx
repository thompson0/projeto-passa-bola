import React from 'react';

const BadgesSection = ({ badges }) => {
  return (
    <div className="bg-background-light rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-white mb-6">Conquistas e Badges</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {badges.map((badge) => (
          <div 
            key={badge.id}
            className="bg-background rounded-lg p-4 text-center hover:bg-background-dark transition-colors"
            title={badge.description}
          >
            <div className="text-4xl mb-2">{badge.icon}</div>
            <div className="text-sm font-medium text-white">{badge.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgesSection;