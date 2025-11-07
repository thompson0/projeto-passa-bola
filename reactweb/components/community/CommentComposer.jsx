import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';

const CommentComposer = ({ currentUser, onSubmit, isReply = false }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  
  const handleSubmit = async () => {
    if (!content.trim()) return;
    
    try {
      setIsSubmitting(true);
      await onSubmit(content);
      setContent('');
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex space-x-3">
      <div className="relative h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
        <Image
          src={currentUser?.avatar || '/assets/images/avatar-placeholder.jpg'}
          alt={currentUser?.name || 'Usuário'}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="flex-grow flex">
        <input
          type="text"
          placeholder={isReply ? "Escreva uma resposta..." : "Escreva um comentário..."}
          value={content}
          onChange={handleContentChange}
          className="flex-grow bg-background border border-gray-700 rounded-l-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Button
          variant="primary"
          className="rounded-l-none"
          disabled={!content.trim() || isSubmitting}
          isLoading={isSubmitting}
          onClick={handleSubmit}
        >
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default CommentComposer;