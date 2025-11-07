// components/community/Post.jsx (sem date-fns)
import React, { useState } from 'react';
import Image from 'next/image';
import CommentList from './CommentList';
import CommentComposer from './CommentComposer';
import ReportModal from './ReportModal';

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return dateString;
  }
};

const Post = ({ 
  post, 
  currentUser, 
  onLike, 
  onComment, 
  onReply, 
  onLikeComment, 
  onLikeReply,
  onReport,
  onDeletePost,
  onDeleteComment,
  onDeleteReply
}) => {
  const [showComments, setShowComments] = useState(false);
  const [showComposer, setShowComposer] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportType, setReportType] = useState('');
  const [reportId, setReportId] = useState(null);
  
  const handleLike = () => {
    onLike(post.id);
  };
  
  const handleComment = () => {
    setShowComments(true);
    setShowComposer(true);
  };
  
  const handleReportPost = () => {
    setReportType('post');
    setReportId(post.id);
    setReportModalOpen(true);
  };
  
  const handleDeletePost = () => {
    onDeletePost(post.id);
  };
  
  const handleSubmitComment = async (content) => {
    await onComment(post.id, content);
  };
  
  const handleReportContent = (type, id) => {
    setReportType(type);
    setReportId(id);
    setReportModalOpen(true);
  };
  
  const handleSubmitReport = async (reason) => {
    await onReport(reportType, reportId, reason);
  };
  
  const isPostOwner = currentUser && post.author.id === currentUser.id;
  
  return (
    <div className="bg-background-light rounded-lg p-6 mb-6">
      {/* Cabeçalho do post */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
            <Image
              src={post.author.avatar || '/assets/images/avatar-placeholder.jpg'}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center">
              <h4 className="font-medium text-white">{post.author.name}</h4>
              {post.author.role === 'jogadora' && (
                <span className="ml-2 bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                  Jogadora
                </span>
              )}
            </div>
            <div className="flex items-center text-xs text-gray-400">
              {post.author.team && (
                <>
                  <span>{post.author.team}</span>
                  <span className="mx-1">•</span>
                </>
              )}
              <span>{formatDate(post.date)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          {isPostOwner ? (
            <button 
              className="text-gray-400 hover:text-white transition-colors"
              onClick={handleDeletePost}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          ) : (
            <button 
              className="text-gray-400 hover:text-white transition-colors"
              onClick={handleReportPost}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Conteúdo do post */}
      <div className="mb-4">
        <p className="text-white whitespace-pre-line">{post.content}</p>
      </div>
      
      {/* Anexos */}
      {post.attachments && post.attachments.length > 0 && (
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {post.attachments.map((attachment, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden">
              {attachment.type === 'image' && (
                <div className="relative aspect-video w-full">
                  <Image
                    src={attachment.url}
                    alt={`Anexo ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Ações */}
      <div className="flex items-center justify-between border-t border-gray-700 pt-4">
        <div className="flex items-center space-x-6">
          <button 
            className="flex items-center text-gray-300 hover:text-white transition-colors"
            onClick={handleLike}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{post.likes}</span>
          </button>
          
          <button 
            className="flex items-center text-gray-300 hover:text-white transition-colors"
            onClick={handleComment}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{post.comments.length}</span>
          </button>
        </div>
      </div>
      
      {/* Comentários */}
      {(showComments || post.comments.length > 0) && (
        <div className="mt-6 border-t border-gray-700 pt-4">
          {post.comments.length > 0 && (
            <CommentList 
              comments={post.comments} 
              postId={post.id}
              currentUser={currentUser}
              onReply={onReply}
              onLikeComment={onLikeComment}
              onLikeReply={onLikeReply}
              onReport={handleReportContent}
              onDeleteComment={onDeleteComment}
              onDeleteReply={onDeleteReply}
            />
          )}
          
          {showComposer && (
            <div className="mt-4">
              <CommentComposer 
                currentUser={currentUser}
                onSubmit={handleSubmitComment}
              />
            </div>
          )}
          
          {!showComposer && post.comments.length > 0 && (
            <button 
              className="mt-4 text-primary hover:text-lilac transition-colors text-sm"
              onClick={() => setShowComposer(true)}
            >
              Adicionar comentário
            </button>
          )}
        </div>
      )}
      
      {/* Modal de denúncia */}
      {reportModalOpen && (
        <ReportModal 
          isOpen={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
          onSubmit={handleSubmitReport}
          contentType={reportType}
        />
      )}
    </div>
  );
};

export default Post;