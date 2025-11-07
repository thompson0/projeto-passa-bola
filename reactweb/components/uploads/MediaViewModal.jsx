import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';

const MediaViewModal = ({ media, onClose, onEdit, onDelete, onDownload, onCopyLink }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getVisibilityLabel = () => {
    switch (media.visibility) {
      case 'publico':
        return 'Público';
      case 'privado':
        return 'Privado';
      case 'equipe':
        return 'Apenas equipe';
      default:
        return media.visibility;
    }
  };
  
  const renderMediaContent = () => {
    switch (media.type) {
      case 'video':
        return (
          <div className="relative aspect-video w-full">
            <video 
              src={media.url} 
              controls 
              className="w-full h-full rounded-lg"
              poster={media.thumbnail}
            />
          </div>
        );
      case 'imagem':
        return (
          <div className="relative aspect-video w-full">
            <Image
              src={media.url || '/assets/images/media-placeholder.jpg'}
              alt={media.title}
              fill
              className="object-contain rounded-lg"
            />
          </div>
        );
      case 'documento':
        return (
          <div className="bg-background p-8 rounded-lg flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-white text-center">
              Este documento não pode ser visualizado diretamente. Clique em "Baixar" para visualizá-lo.
            </p>
          </div>
        );
      default:
        return (
          <div className="bg-background p-8 rounded-lg flex items-center justify-center">
            <p className="text-white">Tipo de mídia não suportado.</p>
          </div>
        );
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-background-light rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">{media.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Conteúdo da mídia */}
          <div className="mb-6">
            {renderMediaContent()}
          </div>
          
          {/* Informações da mídia */}
          <div className="mb-6">
            <p className="text-gray-300 mb-4">{media.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-300">
                  <span className="text-accent">Data:</span> {formatDate(media.date)}
                </p>
                <p className="text-gray-300">
                  <span className="text-accent">Visibilidade:</span> {getVisibilityLabel()}
                </p>
              </div>
              <div>
                <p className="text-gray-300">
                  <span className="text-accent">Visualizações:</span> {media.views}
                </p>
                <p className="text-gray-300">
                  <span className="text-accent">Curtidas:</span> {media.likes}
                </p>
              </div>
            </div>
            
            {/* Tags */}
            {media.tags && media.tags.length > 0 && (
              <div className="mt-4">
                <p className="text-accent mb-2">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {media.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-background text-white text-xs px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Ações */}
          <div className="flex flex-wrap justify-end gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onCopyLink(media)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
              Copiar link
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onDownload(media)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Baixar
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEdit(media)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Editar
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onDelete(media)}
              className="text-red hover:bg-red/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Excluir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaViewModal;