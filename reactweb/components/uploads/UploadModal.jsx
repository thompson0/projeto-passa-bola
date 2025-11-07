import React, { useState } from 'react';
import { Button } from '@/components/ui';
import FileUpload from '@/components/registration/FileUpload';

const UploadModal = ({ onClose, onSubmit, isEditing = false, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    type: initialData?.type || 'imagem',
    file: null,
    visibility: initialData?.visibility || 'publico',
    tags: initialData?.tags?.join(', ') || ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpar erro do campo quando o usuário digita
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  const handleFileUpload = (file) => {
    handleChange('file', file);
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }
    
    if (!formData.type) {
      newErrors.type = 'Tipo é obrigatório';
    }
    
    if (!isEditing && !formData.file) {
      newErrors.file = 'Arquivo é obrigatório';
    }
    
    if (!formData.visibility) {
      newErrors.visibility = 'Visibilidade é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Processar tags
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      onSubmit({
        ...formData,
        tags
      });
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-background-light rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {isEditing ? 'Editar mídia' : 'Enviar nova mídia'}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className={`w-full px-3 py-2 bg-background border ${errors.title ? 'border-red' : 'border-gray-700'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="Título da mídia"
              />
              {errors.title && <p className="mt-1 text-sm text-red">{errors.title}</p>}
            </div>
            
            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">Descrição</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className={`w-full px-3 py-2 bg-background border ${errors.description ? 'border-red' : 'border-gray-700'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="Descrição da mídia"
                rows="3"
              />
              {errors.description && <p className="mt-1 text-sm text-red">{errors.description}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tipo */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">Tipo</label>
                <select
                  value={formData.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className={`w-full px-3 py-2 bg-background border ${errors.type ? 'border-red' : 'border-gray-700'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                >
                  <option value="imagem">Imagem</option>
                  <option value="video">Vídeo</option>
                  <option value="documento">Documento</option>
                </select>
                {errors.type && <p className="mt-1 text-sm text-red">{errors.type}</p>}
              </div>
              
              {/* Visibilidade */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">Visibilidade</label>
                <select
                  value={formData.visibility}
                  onChange={(e) => handleChange('visibility', e.target.value)}
                  className={`w-full px-3 py-2 bg-background border ${errors.visibility ? 'border-red' : 'border-gray-700'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                >
                  <option value="publico">Público</option>
                  <option value="privado">Privado</option>
                  <option value="equipe">Apenas equipe</option>
                </select>
                {errors.visibility && <p className="mt-1 text-sm text-red">{errors.visibility}</p>}
              </div>
            </div>
            
            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">Tags (separadas por vírgula)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="treino, gol, jogo, etc."
              />
            </div>
            
            {/* Upload de arquivo */}
            {!isEditing && (
              <div>
                <label className="block text-sm font-medium text-white mb-1">Arquivo</label>
                <FileUpload 
                  onFileUpload={handleFileUpload}
                  error={errors.file}
                />
              </div>
            )}
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                variant="ghost" 
                type="button"
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary" 
                type="submit"
              >
                {isEditing ? 'Salvar alterações' : 'Enviar mídia'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;