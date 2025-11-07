// Mock data para uploads

export const mediaTypes = [
  { id: 'todos', name: 'Todos' },
  { id: 'imagem', name: 'Imagens' },
  { id: 'video', name: 'Vídeos' },
  { id: 'documento', name: 'Documentos' }
];

export const dateFilters = [
  { id: 'todos', name: 'Qualquer data' },
  { id: 'hoje', name: 'Hoje' },
  { id: 'semana', name: 'Esta semana' },
  { id: 'mes', name: 'Este mês' },
  { id: 'ano', name: 'Este ano' }
];

export const visibilityFilters = [
  { id: 'todos', name: 'Todos' },
  { id: 'publico', name: 'Público' },
  { id: 'privado', name: 'Privado' },
  { id: 'equipe', name: 'Apenas equipe' }
];

export const uploadsData = [
  {
    id: 1,
    title: 'Treino de finalização',
    description: 'Treino de finalização realizado no CT do Corinthians',
    type: 'video',
    thumbnail: '/assets/images/uploads/video-1.jpg',
    url: '/assets/videos/treino-finalizacao.mp4',
    date: '2023-11-05T14:30:00',
    visibility: 'publico',
    views: 1245,
    likes: 89,
    comments: 12,
    tags: ['treino', 'finalização', 'corinthians']
  },
  {
    id: 2,
    title: 'Foto da equipe',
    description: 'Foto oficial da equipe para a temporada 2023',
    type: 'imagem',
    thumbnail: '/assets/images/uploads/image-1.jpg',
    url: '/assets/images/uploads/image-1.jpg',
    date: '2023-11-03T10:15:00',
    visibility: 'publico',
    views: 876,
    likes: 42,
    comments: 5,
    tags: ['equipe', 'foto', 'corinthians']
  },
  {
    id: 3,
    title: 'Análise tática do último jogo',
    description: 'Documento com análise tática do último jogo contra o Palmeiras',
    type: 'documento',
    thumbnail: '/assets/images/uploads/doc-1.jpg',
    url: '/assets/documents/analise-tatica.pdf',
    date: '2023-11-02T09:45:00',
    visibility: 'equipe',
    views: 34,
    likes: 8,
    comments: 3,
    tags: ['análise', 'tática', 'palmeiras']
  },
  {
    id: 4,
    title: 'Gol contra o São Paulo',
    description: 'Gol marcado no jogo contra o São Paulo pelo Campeonato Brasileiro',
    type: 'video',
    thumbnail: '/assets/images/uploads/video-2.jpg',
    url: '/assets/videos/gol-sao-paulo.mp4',
    date: '2023-10-28T16:20:00',
    visibility: 'publico',
    views: 2134,
    likes: 156,
    comments: 23,
    tags: ['gol', 'são paulo', 'campeonato brasileiro']
  },
  {
    id: 5,
    title: 'Entrevista pós-jogo',
    description: 'Entrevista concedida após a vitória contra o Santos',
    type: 'video',
    thumbnail: '/assets/images/uploads/video-3.jpg',
    url: '/assets/videos/entrevista-pos-jogo.mp4',
    date: '2023-10-25T21:30:00',
    visibility: 'publico',
    views: 987,
    likes: 76,
    comments: 14,
    tags: ['entrevista', 'santos', 'vitória']
  },
  {
    id: 6,
    title: 'Plano de treinamento',
    description: 'Plano de treinamento para a próxima semana',
    type: 'documento',
    thumbnail: '/assets/images/uploads/doc-2.jpg',
    url: '/assets/documents/plano-treinamento.pdf',
    date: '2023-10-22T08:00:00',
    visibility: 'privado',
    views: 12,
    likes: 3,
    comments: 1,
    tags: ['treinamento', 'plano', 'preparação']
  },
  {
    id: 7,
    title: 'Comemoração do título',
    description: 'Fotos da comemoração do título do Campeonato Brasileiro',
    type: 'imagem',
    thumbnail: '/assets/images/uploads/image-2.jpg',
    url: '/assets/images/uploads/image-2.jpg',
    date: '2023-10-15T20:00:00',
    visibility: 'publico',
    views: 3456,
    likes: 289,
    comments: 45,
    tags: ['título', 'comemoração', 'campeonato brasileiro']
  },
  {
    id: 8,
    title: 'Treino físico',
    description: 'Treino físico realizado na academia',
    type: 'video',
    thumbnail: '/assets/images/uploads/video-4.jpg',
    url: '/assets/videos/treino-fisico.mp4',
    date: '2023-10-10T11:00:00',
    visibility: 'equipe',
    views: 67,
    likes: 12,
    comments: 4,
    tags: ['treino', 'físico', 'academia']
  }
];

export const uploadsService = {
  getUploads: (filters = {}) => {
    let filteredUploads = [...uploadsData];
    
    // Aplicar filtros
    if (filters.type && filters.type !== 'todos') {
      filteredUploads = filteredUploads.filter(upload => upload.type === filters.type);
    }
    
    if (filters.date && filters.date !== 'todos') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const uploadDate = new Date();
      
      filteredUploads = filteredUploads.filter(upload => {
        uploadDate.setTime(Date.parse(upload.date));
        
        switch (filters.date) {
          case 'hoje':
            return uploadDate >= today;
          case 'semana':
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay());
            return uploadDate >= weekStart;
          case 'mes':
            const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
            return uploadDate >= monthStart;
          case 'ano':
            const yearStart = new Date(now.getFullYear(), 0, 1);
            return uploadDate >= yearStart;
          default:
            return true;
        }
      });
    }
    
    if (filters.visibility && filters.visibility !== 'todos') {
      filteredUploads = filteredUploads.filter(upload => upload.visibility === filters.visibility);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredUploads = filteredUploads.filter(upload => 
        upload.title.toLowerCase().includes(searchLower) || 
        upload.description.toLowerCase().includes(searchLower) ||
        upload.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    return filteredUploads;
  },
  
  getUploadById: (id) => {
    return uploadsData.find(upload => upload.id === parseInt(id)) || null;
  },
  
  getMediaTypes: () => {
    return mediaTypes;
  },
  
  getDateFilters: () => {
    return dateFilters;
  },
  
  getVisibilityFilters: () => {
    return visibilityFilters;
  },
  
  addUpload: (uploadData) => {
    // Simulação de adição de upload
    const newUpload = {
      id: uploadsData.length + 1,
      ...uploadData,
      date: new Date().toISOString(),
      views: 0,
      likes: 0,
      comments: 0
    };
    
    // Em um ambiente real, aqui seria feito o upload do arquivo e o registro no banco de dados
    
    return { 
      success: true, 
      message: 'Upload realizado com sucesso!',
      data: newUpload
    };
  },
  
  deleteUpload: (id) => {
    // Simulação de exclusão de upload
    const upload = uploadsData.find(upload => upload.id === parseInt(id));
    
    if (!upload) {
      return { success: false, message: 'Upload não encontrado.' };
    }
    
    // Em um ambiente real, aqui seria feita a exclusão do arquivo e do registro no banco de dados
    
    return { 
      success: true, 
      message: 'Upload excluído com sucesso!'
    };
  },
  
  updateUpload: (id, updateData) => {
    // Simulação de atualização de upload
    const upload = uploadsData.find(upload => upload.id === parseInt(id));
    
    if (!upload) {
      return { success: false, message: 'Upload não encontrado.' };
    }
    
    // Em um ambiente real, aqui seria feita a atualização do registro no banco de dados
    
    return { 
      success: true, 
      message: 'Upload atualizado com sucesso!',
      data: {
        ...upload,
        ...updateData
      }
    };
  }
};