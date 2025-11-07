import React from 'react';

const AchievementsSection = ({ achievements }) => {
  return (
    <div className="bg-background-light rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-white mb-6">Conquistas</h2>
      
      <div className="space-y-4">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id}
            className="bg-background rounded-lg p-4 flex items-center justify-between hover:bg-background-dark transition-colors"
          >
            <div>
              <h3 className="font-medium text-white">{achievement.title}</h3>
              <p className="text-sm text-gray-300">{achievement.description}</p>
            </div>
            <div className="text-lilac font-medium">{achievement.year}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;