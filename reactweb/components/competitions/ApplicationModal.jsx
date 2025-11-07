import React, { useState } from 'react';
import { Button } from '@/components/ui';

const ApplicationModal = ({ competition, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    teamName: '',
    teamCategory: '',
    teamSize: '',
    acceptTerms: false
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpar erro do campo quando o usuário digita
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }
    
    if (!formData.teamName.trim()) {
      newErrors.teamName = 'Nome da equipe é obrigatório';
    }
    
    if (!formData.teamCategory.trim()) {
      newErrors.teamCategory = 'Categoria da equipe é obrigatória';
    }
    
    if (!formData.teamSize.trim()) {
      newErrors.teamSize = 'Tamanho da equipe é obrigatório';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Você precisa aceitar os termos para continuar';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-text">Inscrição na Competição</h2>
            <button 
              onClick={onClose}
              className="text-text-secondary hover:text-text"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-text mb-2">{competition.name}</h3>
            <p className="text-text-secondary mb-4">{competition.description}</p>
            
            <div className="bg-background-light p-4 rounded-md text-white mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm"><span className="text-accent">Local:</span> {competition.location}</p>
                  <p className="text-sm"><span className="text-accent">Período:</span> {new Date(competition.startDate).toLocaleDateString('pt-BR')} a {new Date(competition.endDate).toLocaleDateString('pt-BR')}</p>
                  <p className="text-sm"><span className="text-accent">Inscrições até:</span> {new Date(competition.registrationDeadline).toLocaleDateString('pt-BR')}</p>
                </div>
                <div>
                  <p className="text-sm"><span className="text-accent">Taxa:</span> {competition.registrationFee}</p>
                  <p className="text-sm"><span className="text-accent">Premiação:</span> {competition.prize}</p>
                  <p className="text-sm"><span className="text-accent">Formato:</span> {competition.format}</p>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Nome do responsável</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red">{errors.email}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text mb-1">Telefone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.phone ? 'border-red' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red">{errors.phone}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text mb-1">Nome da equipe</label>
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.teamName ? 'border-red' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary`}
                />
                {errors.teamName && <p className="mt-1 text-sm text-red">{errors.teamName}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Categoria da equipe</label>
                  <select
                    name="teamCategory"
                    value={formData.teamCategory}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${errors.teamCategory ? 'border-red' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary`}
                  >
                    <option value="">Selecione...</option>
                    <option value="adulto">Adulto</option>
                    <option value="sub20">Sub-20</option>
                    <option value="sub17">Sub-17</option>
                    <option value="sub15">Sub-15</option>
                  </select>
                  {errors.teamCategory && <p className="mt-1 text-sm text-red">{errors.teamCategory}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Tamanho da equipe</label>
                  <select
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${errors.teamSize ? 'border-red' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary`}
                  >
                    <option value="">Selecione...</option>
                    <option value="11-15">11-15 jogadoras</option>
                    <option value="16-20">16-20 jogadoras</option>
                    <option value="21-25">21-25 jogadoras</option>
                    <option value="26+">26+ jogadoras</option>
                  </select>
                  {errors.teamSize && <p className="mt-1 text-sm text-red">{errors.teamSize}</p>}
                </div>
              </div>
              
              <div className="flex items-start mt-4">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="text-text-secondary">
                    Li e concordo com os <a href="#" className="text-primary hover:underline">termos e condições</a> e <a href="#" className="text-primary hover:underline">regulamento</a> da competição.
                  </label>
                  {errors.acceptTerms && <p className="mt-1 text-sm text-red">{errors.acceptTerms}</p>}
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-4">
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
                Confirmar inscrição
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;