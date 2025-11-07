// app/(main)/comunidade/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import PostComposer from '@/components/community/PostComposer';
import Post from '@/components/community/Post';
import EmptyState from '@/components/community/EmptyState';
import { Toast, Button } from '@/components/ui';
import { communityService } from '@/services/apiService';

export default function CommunityPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Em um ambiente real, isso seria uma chamada de API
        const userData = communityService.getCurrentUser();
        const postsData = communityService.getPosts(1); // Primeira página
        
        setCurrentUser(userData);
        setPosts(postsData);
        setHasMore(postsData.length >= 10); // Assumindo 10 posts por página
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const loadMorePosts = async () => {
    if (isLoadingMore || !hasMore) return;
    
    try {
      setIsLoadingMore(true);
      const nextPage = page + 1;
      
      // Em um ambiente real, isso seria uma chamada de API
      const morePosts = communityService.getPosts(nextPage);
      
      if (morePosts.length > 0) {
        setPosts(prev => [...prev, ...morePosts]);
        setPage(nextPage);
        setHasMore(morePosts.length >= 10); // Assumindo 10 posts por página
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Erro ao carregar mais posts:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };
  
  const handleCreatePost = async (content, attachments) => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      const result = communityService.createPost(content, attachments);
      
      if (result.success) {
        setPosts(prev => [result.data, ...prev]);
        setToast({
          message: result.message,
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Erro ao criar post:', error);
      setToast({
        message: 'Erro ao criar post. Tente novamente.',
        type: 'error'
      });
    }
  };
  
  const handleLikePost = async (postId) => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      const result = communityService.likePost(postId);
      
      if (result.success) {
        setPosts(prev => prev.map(post => 
          post.id === parseInt(postId) ? { ...post, likes: result.likes } : post
        ));
      }
    } catch (error) {
      console.error('Erro ao curtir post:', error);
      setToast({
        message: 'Erro ao curtir post. Tente novamente.',
        type: 'error'
      });
    }
  };
  
  const handleCreateComment = async (postId, content) => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      const result = communityService.createComment(postId, content);
      
      if (result.success) {
        setPosts(prev => prev.map(post => 
          post.id === parseInt(postId) 
            ? { ...post, comments: [...post.comments, result.data] } 
            : post
        ));
        
        setToast({
          message: result.message,
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Erro ao criar comentário:', error);
      setToast({
        message: 'Erro ao criar comentário. Tente novamente.',
        type: 'error'
      });
    }
  };
  
  const handleCreateReply = async (postId, commentId, content) => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      const result = communityService.createReply(postId, commentId, content);
      
      if (result.success) {
        setPosts(prev => prev.map(post => {
          if (post.id === parseInt(postId)) {
            return {
              ...post,
              comments: post.comments.map(comment => 
                comment.id === parseInt(commentId)
                  ? { ...comment, replies: [...comment.replies, result.data] }
                  : comment
              )
            };
          }
          return post;
        }));
        
        setToast({
          message: result.message,
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Erro ao criar resposta:', error);
      setToast({
        message: 'Erro ao criar resposta. Tente novamente.',
        type: 'error'
      });
    }
  };
  
  const handleLikeComment = async (postId, commentId) => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      const result = communityService.likeComment(postId, commentId);
      
      if (result.success) {
        setPosts(prev => prev.map(post => {
          if (post.id === parseInt(postId)) {
            return {
              ...post,
              comments: post.comments.map(comment => 
                comment.id === parseInt(commentId)
                  ? { ...comment, likes: result.likes }
                  : comment
              )
            };
          }
          return post;
        }));
      }
    } catch (error) {
      console.error('Erro ao curtir comentário:', error);
      setToast({
        message: 'Erro ao curtir comentário. Tente novamente.',
        type: 'error'
      });
    }
  };
  
  const handleLikeReply = async (postId, commentId, replyId) => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      const result = communityService.likeReply(postId, commentId, replyId);
      
      if (result.success) {
        setPosts(prev => prev.map(post => {
          if (post.id === parseInt(postId)) {
            return {
              ...post,
              comments: post.comments.map(comment => {
                if (comment.id === parseInt(commentId)) {
                  return {
                    ...comment,
                    replies: comment.replies.map(reply => 
                      reply.id === parseInt(replyId)
                        ? { ...reply, likes: result.likes }
                        : reply
                    )
                  };
                }
                return comment;
              })
            };
          }
          return post;
        }));
      }
    } catch (error) {
      console.error('Erro ao curtir resposta:', error);
      setToast({
        message: 'Erro ao curtir resposta. Tente novamente.',
        type: 'error'
      });
    }
  };
  
  const handleReport = async (type, id, reason) => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      const result = communityService.reportContent(type, id, reason);
      
      if (result.success) {
        setToast({
          message: result.message,
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Erro ao denunciar conteúdo:', error);
      setToast({
        message: 'Erro ao denunciar conteúdo. Tente novamente.',
        type: 'error'
      });
    }
  };
  
  const handleDeletePost = async (postId) => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      const result = communityService.deletePost(postId);
      
      if (result.success) {
        setPosts(prev => prev.filter(post => post.id !== parseInt(postId)));
        
        setToast({
          message: result.message,
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Erro ao excluir post:', error);
      setToast({
        message: 'Erro ao excluir post. Tente novamente.',
        type: 'error'
      });
    }
  };
  
  const handleDeleteComment = async (postId, commentId) => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      const result = communityService.deleteComment(postId, commentId);
      
      if (result.success) {
        setPosts(prev => prev.map(post => {
          if (post.id === parseInt(postId)) {
            return {
              ...post,
              comments: post.comments.filter(comment => comment.id !== parseInt(commentId))
            };
          }
          return post;
        }));
        
        setToast({
          message: result.message,
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Erro ao excluir comentário:', error);
      setToast({
        message: 'Erro ao excluir comentário. Tente novamente.',
        type: 'error'
      });
    }
  };
  
  const handleDeleteReply = async (postId, commentId, replyId) => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      const result = communityService.deleteReply(postId, commentId, replyId);
      
      if (result.success) {
        setPosts(prev => prev.map(post => {
          if (post.id === parseInt(postId)) {
            return {
              ...post,
              comments: post.comments.map(comment => {
                if (comment.id === parseInt(commentId)) {
                  return {
                    ...comment,
                    replies: comment.replies.filter(reply => reply.id !== parseInt(replyId))
                  };
                }
                return comment;
              })
            };
          }
          return post;
        }));
        
        setToast({
          message: result.message,
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Erro ao excluir resposta:', error);
      setToast({
        message: 'Erro ao excluir resposta. Tente novamente.',
        type: 'error'
      });
    }
  };

  if (isLoading) {
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
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Comunidade</h1>
        <p className="text-gray-300">
          Compartilhe suas experiências e conecte-se com outras pessoas do futebol feminino.
        </p>
      </div>
      
      {/* Composer */}
      {currentUser && (
        <PostComposer 
          currentUser={currentUser}
          onSubmit={handleCreatePost}
        />
      )}
      
      {/* Lista de posts */}
      {posts.length === 0 ? (
        <EmptyState />
      ) : (
        <div>
          {posts.map((post) => (
            <Post 
              key={post.id} 
              post={post}
              currentUser={currentUser}
              onLike={handleLikePost}
              onComment={handleCreateComment}
              onReply={handleCreateReply}
              onLikeComment={handleLikeComment}
              onLikeReply={handleLikeReply}
              onReport={handleReport}
              onDeletePost={handleDeletePost}
              onDeleteComment={handleDeleteComment}
              onDeleteReply={handleDeleteReply}
            />
          ))}
          
          {/* Botão "Carregar mais" */}
          {hasMore && (
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                onClick={loadMorePosts}
                isLoading={isLoadingMore}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? 'Carregando...' : 'Carregar mais posts'}
              </Button>
            </div>
          )}
        </div>
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