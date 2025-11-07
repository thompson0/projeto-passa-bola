'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import FilterBar from '@/components/uploads/FilterBar';
import MediaCard from '@/components/uploads/MediaCard';
import UploadModal from '@/components/uploads/UploadModal';
import MediaViewModal from '@/components/uploads/MediaViewModal';
import DeleteConfirmationModal from '@/components/uploads/DeleteConfirmationModal';
import { Toast } from '@/components/ui';
import { uploadsService } from '@/services/mocks/uploadsData';

export default function UploadsPage() {
  const router = useRouter();
  const { user, role, isAuthenticated, isLoading: authLoading } = useAuth();
  
  const [mediaTypes, setMediaTypes] = useState([]);
  const [dateFilters, setDateFilters] = useState([]);
  const [visibilityFilters, setVisibilityFilters] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);
  
  const [filters, setFilters] = useState({
    type: 'todos',
    date: 'todos',
    visibility: 'todos',
    search: ''
  });
  
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login-jogadora');
    } else if (!authLoading && role !== 'jogadora') {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, role, router]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Em um ambiente real, isso seria uma chamada de API
        const mediaTypesData = uploadsService.getMediaTypes();
        const dateFiltersData = uploadsService.getDateFilters();
        const visibilityFiltersData = uploadsService.getVisibilityFilters();
        const uploadsData = uploadsService.getUploads();
        
        setMediaTypes(mediaTypesData);
        setDateFilters(dateFiltersData);
        setVisibilityFilters(visibilityFiltersData);
        setUploads(uploadsData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    // Atualizar uploads quando os filtros mudarem
    const fetchFilteredUploads = async () => {
      try {
        // Em um ambiente real, isso seria uma chamada de API
        const filteredData = uploadsService.getUploads(filters);
        setUploads(filteredData);
      } catch (error) {
        console.error('Erro ao filtrar uploads:', error);
      }
    };

    fetchFilteredUploads();
  }, [filters]);
  
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };
  
  const handleSearch = (searchTerm) => {
    setFilters(prev => ({
      ...prev,
      search: searchTerm
    }));
  };
  
  const handleAddMedia = () => {
    setIsEditing(false);
    setSelectedMedia(null);
    setShowUploadModal(true);
  };
  
  const handleViewMedia = (media) => {
    setSelectedMedia(media);
    setShowViewModal(true);
  };
  
  const handleEditMedia = (media) => {
    setSelectedMedia(media);
    setIsEditing(true);
    setShowViewModal(false);
    setShowUploadModal(true);
  };
  
  const handleDeleteMedia = (media) => {
    setSelectedMedia(media);
    setShowViewModal(false);
    setShowDeleteModal(true);
  };
  
  const handleDownloadMedia = (media) => {
    // Em um ambiente real, isso iniciaria o download do arquivo
    setToast({
      message: `Download de "${media.title}" iniciado`,
      type: 'success'
    });
  };
  
  const handleCopyLink = (media) => {
    // Em um ambiente real, isso copiaria o link para a área de transferência
    navigator.clipboard.writeText(`https://passabola.com/media/${media.id}`);
    
    setToast({
      message: 'Link copiado para a área de transferência',
      type: 'success'
    });
  };
  
  const handleSubmitUpload = async (formData) => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      let result;
      
      if (isEditing && selectedMedia) {
        result = uploadsService.updateUpload(selectedMedia.id, formData);
        
        if (result.success) {
          // Atualizar a lista de uploads
          setUploads(prev => prev.map(upload => 
            upload.id === selectedMedia.id ? result.data : upload
          ));
          
          setToast({
            message: 'Mídia atualizada com sucesso',
            type: 'success'
          });
        }
      } else {
        result = uploadsService.addUpload(formData);
        
        if (result.success) {
          // Adicionar o novo upload à lista
          setUploads(prev => [result.data, ...prev]);
          
          setToast({
            message: 'Mídia enviada com sucesso',
            type: 'success'
          });
        }
      }
      
      setShowUploadModal(false);
    } catch (error) {
      console.error('Erro ao enviar mídia:', error);
      setToast({
        message: 'Erro ao enviar mídia. Tente novamente.',
        type: 'error'
      });
    }
  };
  
  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      
      // Em um ambiente real, isso seria uma chamada de API
      const result = uploadsService.deleteUpload(selectedMedia.id);
      
      if (result.success) {
        // Remover o upload da lista
        setUploads(prev => prev.filter(upload => upload.id !== selectedMedia.id));
        
        setToast({
          message: 'Mídia excluída com sucesso',
          type: 'success'
        });
        
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error('Erro ao excluir mídia:', error);
      setToast({
        message: 'Erro ao excluir mídia. Tente novamente.',
        type: 'error'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-accent">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Uploads e Galeria</h1>
        <p className="text-gray-300">
          Gerencie suas mídias, compartilhe com sua equipe e fãs.
        </p>
      </div>
      
      {/* Barra de filtros */}
      <FilterBar 
        mediaTypes={mediaTypes}
        dateFilters={dateFilters}
        visibilityFilters={visibilityFilters}
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onAddMedia={handleAddMedia}
      />
      
      {/* Grid de mídias */}
      {uploads.length === 0 ? (
        <div className="bg-background-light rounded-lg p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-300 mb-4">Nenhuma mídia encontrada com os filtros selecionados.</p>
          <button 
            onClick={handleAddMedia}
            className="text-primary hover:underline"
          >
            Enviar sua primeira mídia
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {uploads.map((media) => (
            <MediaCard 
              key={media.id} 
              media={media}
              onView={handleViewMedia}
              onEdit={handleEditMedia}
              onDelete={handleDeleteMedia}
              onDownload={handleDownloadMedia}
              onCopyLink={handleCopyLink}
            />
          ))}
        </div>
      )}
      
      {/* Modal de upload */}
      {showUploadModal && (
        <UploadModal 
          onClose={() => setShowUploadModal(false)}
          onSubmit={handleSubmitUpload}
          isEditing={isEditing}
          initialData={isEditing ? selectedMedia : null}
        />
      )}
      
      {/* Modal de visualização */}
      {showViewModal && selectedMedia && (
        <MediaViewModal 
          media={selectedMedia}
          onClose={() => setShowViewModal(false)}
          onEdit={handleEditMedia}
          onDelete={handleDeleteMedia}
          onDownload={handleDownloadMedia}
          onCopyLink={handleCopyLink}
        />
      )}
      
      {/* Modal de confirmação de exclusão */}
      {showDeleteModal && selectedMedia && (
        <DeleteConfirmationModal 
          media={selectedMedia}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          isLoading={isDeleting}
        />
      )}
      
      {/* Toast de notificação */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}