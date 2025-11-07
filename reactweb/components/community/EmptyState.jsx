import React from 'react';

const EmptyState = () => {
  return (
    <div className="bg-background-light rounded-lg p-8 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      <h3 className="text-xl font-bold text-white mb-2">Nenhuma publicação ainda</h3>
      <p className="text-gray-300 mb-6">
        Seja o primeiro a compartilhar algo com a comunidade!
      </p>
      <p className="text-gray-400 text-sm">
        Compartilhe suas experiências, fotos, vídeos ou faça perguntas para a comunidade.
      </p>
    </div>
  );
};

export default EmptyState;