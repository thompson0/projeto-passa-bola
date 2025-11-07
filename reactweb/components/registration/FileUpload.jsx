import React, { useState, useRef } from 'react';

const FileUpload = ({ onFileUpload, error }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileUpload(selectedFile);
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      onFileUpload(droppedFile);
    }
  };
  
  const handleClick = () => {
    fileInputRef.current.click();
  };
  
  return (
    <div>
      <div 
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          ${isDragging ? 'border-lilac bg-lilac/10' : error ? 'border-red bg-red/5' : 'border-gray-700 bg-background-light'}
          hover:border-lilac hover:bg-lilac/5 transition-colors
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input 
          type="file" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png"
        />
        
        <div className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          
          {file ? (
            <div>
              <p className="text-sm font-medium text-white">{file.name}</p>
              <p className="text-xs text-gray-400 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium text-white">Arraste e solte um arquivo ou clique para selecionar</p>
              <p className="text-xs text-gray-400 mt-1">PDF, JPG ou PNG (máx. 5MB)</p>
            </div>
          )}
        </div>
      </div>
      
      {error && <p className="mt-1 text-sm text-red">{error}</p>}
    </div>
  );
};

export default FileUpload;