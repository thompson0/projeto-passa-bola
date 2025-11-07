// components/community/CommentList.jsx (sem date-fns)
import React, { useState } from 'react';
import Image from 'next/image';
import CommentComposer from './CommentComposer';

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

const Comment = ({ 
  comment, 
  postId, 
  currentUser,
  onReply, 
  onLikeComment, 
  onLikeReply,
  onReport,
  onDeleteComment,
  onDeleteReply
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyComposer, setShowReplyComposer] = useState(false);
  
  const handleLike = () => {
    onLikeComment(postId, comment.id);
  };
  
  const handleReply = () => {
    setShowReplies(true);
    setShowReplyComposer(true);
  };
  
  const handleReport = () => {
    onReport('comment', comment.id);
  };
  
  const handleDelete = () => {
    onDeleteComment(postId, comment.id);
  };
  
  const handleSubmitReply = async (content) => {
    await onReply(postId, comment.id, content);
    setShowReplyComposer(false);
  };
  
  const handleLikeReply = (replyId) => {
    onLikeReply(postId, comment.id, replyId);
  };
  
  const handleReportReply = (replyId) => {
    onReport('reply', replyId);
  };
  
  const handleDeleteReply = (replyId) => {
    onDeleteReply(postId, comment.id, replyId);
  };
  
  const isCommentOwner = currentUser && comment.author.id === currentUser.id;
  
  return (
    <div className="mb-4">
      <div className="flex">
        <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
          <Image
            src={comment.author.avatar || '/assets/images/avatar-placeholder.jpg'}
            alt={comment.author.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-grow">
          <div className="bg-background rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <h5 className="font-medium text-white text-sm">{comment.author.name}</h5>
                {comment.author.role === 'jogadora' && (
                  <span className="ml-2 bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded-full">
                    Jogadora
                  </span>
                )}
              </div>
              
              {isCommentOwner && (
                <button 
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={handleDelete}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
            
            <p className="text-white text-sm">{comment.content}</p>
          </div>
          
          <div className="flex items-center mt-1 text-xs space-x-4">
            <span className="text-gray-400">{formatDate(comment.date)}</span>
            
            <button 
              className="text-gray-400 hover:text-white transition-colors"
              onClick={handleLike}
            >
              Curtir ({comment.likes})
            </button>
            
            <button 
              className="text-gray-400 hover:text-white transition-colors"
              onClick={handleReply}
            >
              Responder
            </button>
            
            {!isCommentOwner && (
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={handleReport}
              >
                Denunciar
              </button>
            )}
          </div>
          
          {/* Respostas */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-2">
              <button 
                className="text-primary hover:text-lilac transition-colors text-xs flex items-center"
                onClick={() => setShowReplies(!showReplies)}
              >
                {showReplies ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    Ocultar {comment.replies.length} {comment.replies.length === 1 ? 'resposta' : 'respostas'}
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Ver {comment.replies.length} {comment.replies.length === 1 ? 'resposta' : 'respostas'}
                  </>
                )}
              </button>
              
              {showReplies && (
                <div className="ml-6 mt-2 space-y-3">
                  {comment.replies.map((reply) => {
                    const isReplyOwner = currentUser && reply.author.id === currentUser.id;
                    
                    return (
                      <div key={reply.id} className="flex">
                        <div className="relative h-6 w-6 rounded-full overflow-hidden mr-2 flex-shrink-0">
                          <Image
                            src={reply.author.avatar || '/assets/images/avatar-placeholder.jpg'}
                            alt={reply.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="bg-background rounded-lg p-2">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center">
                                <h6 className="font-medium text-white text-xs">{reply.author.name}</h6>
                                {reply.author.role === 'jogadora' && (
                                  <span className="ml-1 bg-primary/20 text-primary text-xs px-1 py-0.5 rounded-full text-[10px]">
                                    Jogadora
                                  </span>
                                )}
                              </div>
                              
                              {isReplyOwner && (
                                <button 
                                  className="text-gray-400 hover:text-white transition-colors"
                                  onClick={() => handleDeleteReply(reply.id)}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              )}
                            </div>
                            
                            <p className="text-white text-xs">{reply.content}</p>
                          </div>
                          
                          <div className="flex items-center mt-1 text-xs space-x-3">
                            <span className="text-gray-400 text-[10px]">{formatDate(reply.date)}</span>
                            
                            <button 
                              className="text-gray-400 hover:text-white transition-colors text-[10px]"
                              onClick={() => handleLikeReply(reply.id)}
                            >
                              Curtir ({reply.likes})
                            </button>
                            
                            {!isReplyOwner && (
                              <button 
                                className="text-gray-400 hover:text-white transition-colors text-[10px]"
                                onClick={() => handleReportReply(reply.id)}
                              >
                                Denunciar
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          
          {/* Composer de resposta */}
          {showReplyComposer && (
            <div className="mt-2 ml-6">
              <CommentComposer 
                currentUser={currentUser}
                onSubmit={handleSubmitReply}
                isReply={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CommentList = ({ 
  comments, 
  postId, 
  currentUser,
  onReply, 
  onLikeComment, 
  onLikeReply,
  onReport,
  onDeleteComment,
  onDeleteReply
}) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Comment 
          key={comment.id} 
          comment={comment} 
          postId={postId}
          currentUser={currentUser}
          onReply={onReply}
          onLikeComment={onLikeComment}
          onLikeReply={onLikeReply}
          onReport={onReport}
          onDeleteComment={onDeleteComment}
          onDeleteReply={onDeleteReply}
        />
      ))}
    </div>
  );
};

export default CommentList;