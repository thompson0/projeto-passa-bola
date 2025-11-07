import React, { useState } from 'react';
import Image from 'next/image';

const MediaCard = ({ media, onView, onEdit, onDelete, onDownload, onCopyLink }) => {
  const [showActions, setShowActions] = useState(false);
  
  const getMediaTypeIcon = () => {
    switch (media.type) {
      case 'video':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        );
      case 'imagem':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        );
      case 'documento':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a3 3 0 006 0V7a1 1 0 112 0v4a5 5 0 01-10 0V7a5 5 0 0110 0v1.5a1.5 1.5 0 01-3 0V6a1 1 0 012 0v1.5a3.5 3.5 0 01-7 0V6a3 3 0 013-3h6a3 3 0 013 3v8a3 3 0 01-3 3H6a3 3 0 01-3-3V7a1 1 0 012 0v7a1 1 0 001 1h8a1 1 0 001-1V7a1 1 0 00-1-1H6a1 1 0 00-1 1v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
          </svg>
        );
    }
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
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Thumbnail */}
      <div className="relative h-48 w-full cursor-pointer" onClick={() => onView(media)}>
        <Image
          src={media.thumbnail || '/assets/images/media-placeholder.jpg'}
          alt={media.title}
          fill
          className="object-cover"
        />
        
        {/* Overlay para tipo de mídia */}
        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
          <span className="mr-1">{getMediaTypeIcon()}</span>
          <span className="capitalize">{media.type}</span>
        </div>
        
        {/* Overlay para visibilidade */}
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
          {getVisibilityLabel()}
        </div>
        
        {/* Overlay para ações */}
        {showActions && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onView(media); }}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
              title="Ver"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onEdit(media); }}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
              title="Editar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(media); }}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
              title="Excluir"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onDownload(media); }}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
              title="Baixar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onCopyLink(media); }}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
              title="Copiar link"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
      
      {/* Conteúdo */}
      <div className="p-4">
        <h3 className="font-medium text-text mb-1 truncate" title={media.title}>{media.title}</h3>
        
        <p className="text-text-secondary text-sm mb-3 line-clamp-2" title={media.description}>
          {media.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>{formatDate(media.date)}</span>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{media.views}</span>
            </div>
            
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{media.likes}</span>
            </div>
            
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{media.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;