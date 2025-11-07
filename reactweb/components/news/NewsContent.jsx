import React from 'react';

const NewsContent = ({ content }) => {
  if (!content) return null;
  
  return (
    <div className="prose prose-lg prose-invert max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default NewsContent;