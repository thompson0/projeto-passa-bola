import React from 'react';
import { Button } from '@/components/ui';

const DeleteConfirmationModal = ({ media, onClose, onConfirm, isLoading }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-background-light rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-red/10 rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-white text-center mb-4">Confirmar exclusão</h2>
          
          <p className="text-gray-300 text-center mb-6">
            Tem certeza que deseja excluir <span className="font-medium text-white">"{media.title}"</span>? Esta ação não pode ser desfeita.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button 
              variant="primary" 
              className="bg-red hover:bg-red-600"
              onClick={onConfirm}
              isLoading={isLoading}
            >
              Excluir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;