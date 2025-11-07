import React from 'react';

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="mb-8">
      <div className="border-b border-gray-700">
        <nav className="-mb-px flex space-x-8 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeCategory === category.id
                  ? 'border-lilac text-lilac'
                  : 'border-transparent text-gray-300 hover:text-white hover:border-gray-500'}
              `}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CategoryTabs;