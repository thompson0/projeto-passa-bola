import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';

const PostComposer = ({ currentUser, onSubmit }) => {
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  
  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Em um ambiente real, aqui seria feito o upload dos arquivos
    // Para este exemplo, vamos simular URLs locais
    const newAttachments = files.map(file => ({
      type: file.type.startsWith('image/') ? 'image' : 'file',
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file)
    }));
    
    setAttachments(prev => [...prev, ...newAttachments]);
  };
  
  const handleRemoveAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async () => {
    if (!content.trim() && attachments.length === 0) return;
    
    try {
      setIsSubmitting(true);
      await onSubmit(content, attachments);
      setContent('');
      setAttachments([]);
    } catch (error) {
      console.error('Erro ao criar post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-background-light rounded-lg p-6 mb-8">
      <div className="flex space-x-4">
        <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={currentUser.avatar || '/assets/images/avatar-placeholder.jpg'}
            alt={currentUser.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-grow">
          <textarea
            placeholder="Escreva um comentário..."
            value={content}
            onChange={handleContentChange}
            className="w-full min-h-[100px] bg-background border border-gray-700 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
          
          {/* Anexos */}
          {attachments.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {attachments.map((attachment, index) => (
                <div key={index} className="relative group">
                  {attachment.type === 'image' ? (
                    <div className="relative h-24 w-full rounded-md overflow-hidden">
                      <Image
                        src={attachment.url}
                        alt={attachment.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-24 w-full rounded-md bg-background flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  )}
                  
                  <button
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveAttachment(index)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-4 flex justify-between items-center">
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
                accept="image/*,.pdf,.doc,.docx"
              />
              <button
                type="button"
                onClick={handleAttachmentClick}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
            </div>
            
            <Button
              variant="primary"
              disabled={(!content.trim() && attachments.length === 0) || isSubmitting}
              isLoading={isSubmitting}
              onClick={handleSubmit}
            >
              Publicar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;