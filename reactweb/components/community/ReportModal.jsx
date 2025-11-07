// components/community/ReportModal.jsx
import React, { useState } from 'react';
import { Button } from '@/components/ui';

const ReportModal = ({ isOpen, onClose, onSubmit, contentType }) => {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!isOpen) return null;
  
  const handleSubmit = async () => {
    if (!reason) return;
    
    try {
      setIsSubmitting(true);
      await onSubmit(reason);
      onClose();
    } catch (error) {
      console.error('Erro ao enviar denúncia:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const contentTypeLabel = {
    post: 'publicação',
    comment: 'comentário',
    reply: 'resposta'
  }[contentType] || 'conteúdo';
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-background-light rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold text-white mb-4">Denunciar {contentTypeLabel}</h3>
        
        <p className="text-gray-300 mb-4">
          Por favor, informe o motivo da denúncia. Nossa equipe irá analisar o conteúdo.
        </p>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Motivo da denúncia
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full bg-background border border-gray-700 rounded-lg p-2 text-white"
          >
            <option value="">Selecione um motivo</option>
            <option value="inappropriate">Conteúdo inapropriado</option>
            <option value="offensive">Conteúdo ofensivo</option>
            <option value="spam">Spam</option>
            <option value="harassment">Assédio</option>
            <option value="false_information">Informação falsa</option>
            <option value="other">Outro motivo</option>
          </select>
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={!reason || isSubmitting}
            isLoading={isSubmitting}
          >
            Enviar denúncia
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;