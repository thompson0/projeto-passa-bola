export const postsData = [
  {
    id: 1,
    author: {
      id: 1,
      name: 'Marta Silva',
      avatar: '/assets/images/avatars/marta.jpg',
      role: 'jogadora',
      team: 'Orlando Pride'
    },
    content: 'Muito feliz em anunciar que estarei de volta aos gramados na próxima semana! Obrigada pelo apoio de todos durante minha recuperação. 💪⚽️',
    attachments: [],
    date: '2023-11-05T14:30:00',
    likes: 1245,
    comments: [
      {
        id: 101,
        author: {
          id: 5,
          name: 'Ana Santos',
          avatar: '/assets/images/avatars/ana.jpg',
          role: 'torcedora'
        },
        content: 'Que notícia maravilhosa! Estamos ansiosos para te ver jogar novamente! 🎉',
        date: '2023-11-05T14:45:00',
        likes: 56,
        replies: [
          {
            id: 1001,
            author: {
              id: 1,
              name: 'Marta Silva',
              avatar: '/assets/images/avatars/marta.jpg',
              role: 'jogadora',
              team: 'Orlando Pride'
            },
            content: 'Muito obrigada pelo apoio! ❤️',
            date: '2023-11-05T15:00:00',
            likes: 32
          }
        ]
      },
      {
        id: 102,
        author: {
          id: 6,
          name: 'Carolina Oliveira',
          avatar: '/assets/images/avatars/carolina.jpg',
          role: 'torcedora'
        },
        content: 'A rainha está voltando! Não vejo a hora de assistir seus dribles novamente.',
        date: '2023-11-05T15:10:00',
        likes: 43,
        replies: []
      }
    ]
  },
  {
    id: 2,
    author: {
      id: 2,
      name: 'Formiga',
      avatar: '/assets/images/avatars/formiga.jpg',
      role: 'jogadora',
      team: 'São Paulo'
    },
    content: 'Hoje é dia de celebrar mais um ano de carreira! Gratidão por todos que fizeram parte dessa jornada incrível no futebol feminino. 🙏⚽️',
    attachments: [
      {
        type: 'image',
        url: '/assets/images/posts/formiga-1.jpg'
      }
    ],
    date: '2023-11-03T09:45:00',
    likes: 2134,
    comments: [
      {
        id: 103,
        author: {
          id: 7,
          name: 'Pedro Almeida',
          avatar: '/assets/images/avatars/pedro.jpg',
          role: 'torcedor'
        },
        content: 'Parabéns pela trajetória incrível! Você é uma inspiração para todos nós.',
        date: '2023-11-03T10:15:00',
        likes: 78,
        replies: []
      }
    ]
  },
  {
    id: 3,
    author: {
      id: 3,
      name: 'Cristiane',
      avatar: '/assets/images/avatars/cristiane.jpg',
      role: 'jogadora',
      team: 'Santos'
    },
    content: 'Treino intenso hoje! Preparando para o próximo desafio. Vamos com tudo! 💪⚽️',
    attachments: [
      {
        type: 'image',
        url: '/assets/images/posts/cristiane-1.jpg'
      },
      {
        type: 'image',
        url: '/assets/images/posts/cristiane-2.jpg'
      }
    ],
    date: '2023-11-02T16:20:00',
    likes: 1567,
    comments: []
  },
  {
    id: 4,
    author: {
      id: 4,
      name: 'Debinha',
      avatar: '/assets/images/avatars/debinha.jpg',
      role: 'jogadora',
      team: 'Kansas City Current'
    },
    content: 'Feliz em compartilhar que fui eleita a melhor jogadora da partida de ontem! Obrigada a todos pelo apoio. ❤️⚽️',
    attachments: [
      {
        type: 'image',
        url: '/assets/images/posts/debinha-1.jpg'
      }
    ],
    date: '2023-11-01T10:15:00',
    likes: 1876,
    comments: [
      {
        id: 104,
        author: {
          id: 8,
          name: 'Mariana Costa',
          avatar: '/assets/images/avatars/mariana.jpg',
          role: 'torcedora'
        },
        content: 'Merecidíssimo! Você arrasou em campo!',
        date: '2023-11-01T10:30:00',
        likes: 45,
        replies: []
      },
      {
        id: 105,
        author: {
          id: 9,
          name: 'Lucas Mendes',
          avatar: '/assets/images/avatars/lucas.jpg',
          role: 'torcedor'
        },
        content: 'Aquele gol foi sensacional! Parabéns!',
        date: '2023-11-01T11:00:00',
        likes: 38,
        replies: [
          {
            id: 1002,
            author: {
              id: 4,
              name: 'Debinha',
              avatar: '/assets/images/avatars/debinha.jpg',
              role: 'jogadora',
              team: 'Kansas City Current'
            },
            content: 'Obrigada! Foi um momento especial mesmo. 😊',
            date: '2023-11-01T12:15:00',
            likes: 27
          }
        ]
      }
    ]
  }
];

export const currentUser = {
  id: 5,
  name: 'Ana Santos',
  avatar: '/assets/images/avatars/ana.jpg',
  role: 'torcedora'
};

export const communityService = {
  getPosts: (page = 1, limit = 10) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return postsData.slice(start, end);
  },
  
  getPostById: (id) => {
    return postsData.find(post => post.id === parseInt(id)) || null;
  },
  
  getCurrentUser: () => {
    return currentUser;
  },
  
  createPost: (content, attachments = []) => {
    const newPost = {
      id: postsData.length + 1,
      author: currentUser,
      content,
      attachments,
      date: new Date().toISOString(),
      likes: 0,
      comments: []
    };
    postsData.unshift(newPost);
    return { 
      success: true, 
      message: 'Post criado com sucesso!',
      data: newPost
    };
  },
  
  createComment: (postId, content) => {
    const post = postsData.find(p => p.id === parseInt(postId));
    if (!post) {
      return { success: false, message: 'Post não encontrado.' };
    }
    const newComment = {
      id: Math.max(0, ...post.comments.map(c => c.id)) + 1,
      author: currentUser,
      content,
      date: new Date().toISOString(),
      likes: 0,
      replies: []
    };
    post.comments.push(newComment);
    return { 
      success: true, 
      message: 'Comentário adicionado com sucesso!',
      data: newComment
    };
  },
  
  createReply: (postId, commentId, content) => {
    const post = postsData.find(p => p.id === parseInt(postId));
    if (!post) {
      return { success: false, message: 'Post não encontrado.' };
    }
    const comment = post.comments.find(c => c.id === parseInt(commentId));
    if (!comment) {
      return { success: false, message: 'Comentário não encontrado.' };
    }
    const newReply = {
      id: Math.max(0, ...comment.replies.map(r => r.id), 1000) + 1,
      author: currentUser,
      content,
      date: new Date().toISOString(),
      likes: 0
    };
    comment.replies.push(newReply);
    return { 
      success: true, 
      message: 'Resposta adicionada com sucesso!',
      data: newReply
    };
  },
  
  likePost: (postId) => {
    const post = postsData.find(p => p.id === parseInt(postId));
    if (!post) {
      return { success: false, message: 'Post não encontrado.' };
    }
    post.likes += 1;
    return { 
      success: true, 
      message: 'Post curtido com sucesso!',
      likes: post.likes
    };
  },
  
  likeComment: (postId, commentId) => {
    const post = postsData.find(p => p.id === parseInt(postId));
    if (!post) {
      return { success: false, message: 'Post não encontrado.' };
    }
    const comment = post.comments.find(c => c.id === parseInt(commentId));
    if (!comment) {
      return { success: false, message: 'Comentário não encontrado.' };
    }
    comment.likes += 1;
    return { 
      success: true, 
      message: 'Comentário curtido com sucesso!',
      likes: comment.likes
    };
  },
  
  likeReply: (postId, commentId, replyId) => {
    const post = postsData.find(p => p.id === parseInt(postId));
    if (!post) {
      return { success: false, message: 'Post não encontrado.' };
    }
    const comment = post.comments.find(c => c.id === parseInt(commentId));
    if (!comment) {
      return { success: false, message: 'Comentário não encontrado.' };
    }
    const reply = comment.replies.find(r => r.id === parseInt(replyId));
    if (!reply) {
      return { success: false, message: 'Resposta não encontrada.' };
    }
    reply.likes += 1;
    return { 
      success: true, 
      message: 'Resposta curtida com sucesso!',
      likes: reply.likes
    };
  },
  
  deletePost: (postId) => {
    const postIndex = postsData.findIndex(post => post.id === parseInt(postId));
    if (postIndex < 0) {
      return { success: false, message: 'Post não encontrado.' };
    }
    if (postsData[postIndex].author.id !== currentUser.id) {
      return { success: false, message: 'Você não tem permissão para excluir este post.' };
    }
    postsData.splice(postIndex, 1);
    return { 
      success: true, 
      message: 'Post excluído com sucesso!'
    };
  },

  deleteComment: (postId, commentId) => {
    const post = postsData.find(p => p.id === parseInt(postId));
    if (!post) {
      return { success: false, message: 'Post não encontrado.' };
    }
    const commentIndex = post.comments.findIndex(c => c.id === parseInt(commentId));
    if (commentIndex < 0) {
      return { success: false, message: 'Comentário não encontrado.' };
    }
    if (post.comments[commentIndex].author.id !== currentUser.id) {
      return { success: false, message: 'Você não tem permissão para excluir este comentário.' };
    }
    post.comments.splice(commentIndex, 1);
    return {
      success: true,
      message: 'Comentário excluído com sucesso!'
    };
  },

  deleteReply: (postId, commentId, replyId) => {
    const post = postsData.find(p => p.id === parseInt(postId));
    if (!post) {
      return { success: false, message: 'Post não encontrado.' };
    }
    const comment = post.comments.find(c => c.id === parseInt(commentId));
    if (!comment) {
      return { success: false, message: 'Comentário não encontrado.' };
    }
    const replyIndex = comment.replies.findIndex(r => r.id === parseInt(replyId));
    if (replyIndex < 0) {
      return { success: false, message: 'Resposta não encontrada.' };
    }
    if (comment.replies[replyIndex].author.id !== currentUser.id) {
      return { success: false, message: 'Você não tem permissão para excluir esta resposta.' };
    }
    comment.replies.splice(replyIndex, 1);
    return {
      success: true,
      message: 'Resposta excluída com sucesso!'
    };
  },

  reportContent: (type, id, reason = '') => {
    console.log(`Denúncia de ${type} (ID: ${id}) - Motivo: ${reason}`);
    return {
      success: true,
      message: 'Conteúdo denunciado com sucesso. Nossa equipe irá analisar.'
    };
  }
};
