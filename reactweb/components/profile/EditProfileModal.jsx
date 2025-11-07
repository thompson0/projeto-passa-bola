import React, { useState } from 'react';
import { Button } from '@/components/ui';

const EditProfileModal = ({ profile, onClose, onSave, isLoading }) => {
  const [formData, setFormData] = useState({
    nickname: profile.nickname || '',
    bio: profile.bio || '',
    height: profile.height || '',
    weight: profile.weight || '',
    instagram: profile.socialMedia?.instagram || '',
    twitter: profile.socialMedia?.twitter || '',
    facebook: profile.socialMedia?.facebook || '',
    youtube: profile.socialMedia?.youtube || ''
  });
  
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedProfile = {
      ...profile,
      nickname: formData.nickname,
      bio: formData.bio,
      height: formData.height,
      weight: formData.weight,
      socialMedia: {
        instagram: formData.instagram,
        twitter: formData.twitter,
        facebook: formData.facebook,
        youtube: formData.youtube
      }
    };
    
    onSave(updatedProfile);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-background-light rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Editar perfil</h2>
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
            <div>
              <label className="block text-sm font-medium text-white mb-1">Apelido</label>
              <input
                type="text"
                value={formData.nickname}
                onChange={(e) => handleChange('nickname', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-1">Biografia</label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                rows="4"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">Altura</label>
                <input
                  type="text"
                  value={formData.height}
                  onChange={(e) => handleChange('height', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ex: 1.72m"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-1">Peso</label>
                <input
                  type="text"
                  value={formData.weight}
                  onChange={(e) => handleChange('weight', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ex: 65kg"
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Redes sociais</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Instagram</label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => handleChange('instagram', e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://instagram.com/seu_usuario"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Twitter</label>
                  <input
                    type="text"
                    value={formData.twitter}
                    onChange={(e) => handleChange('twitter', e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://twitter.com/seu_usuario"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Facebook</label>
                  <input
                    type="text"
                    value={formData.facebook}
                    onChange={(e) => handleChange('facebook', e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://facebook.com/seu_usuario"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-1">YouTube</label>
                  <input
                    type="text"
                    value={formData.youtube}
                    onChange={(e) => handleChange('youtube', e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://youtube.com/seu_canal"
                  />
                </div>
              </div>
            </div>
            
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
                isLoading={isLoading}
              >
                Salvar alterações
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;