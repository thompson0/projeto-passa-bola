import React, { useState } from 'react';
import { Button, Autocomplete, Select, Checkbox } from '@/components/ui';
import FileUpload from './FileUpload';

const positions = [
  { value: '', label: 'Selecione uma posição' },
  { value: 'goleira', label: 'Goleira' },
  { value: 'zagueira', label: 'Zagueira' },
  { value: 'lateral', label: 'Lateral' },
  { value: 'volante', label: 'Volante' },
  { value: 'meio-campo', label: 'Meio-campo' },
  { value: 'atacante', label: 'Atacante' },
];

const teams = [
  { value: 'corinthians', label: 'Corinthians' },
  { value: 'palmeiras', label: 'Palmeiras' },
  { value: 'santos', label: 'Santos' },
  { value: 'sao-paulo', label: 'São Paulo' },
  { value: 'flamengo', label: 'Flamengo' },
  { value: 'fluminense', label: 'Fluminense' },
  { value: 'botafogo', label: 'Botafogo' },
  { value: 'vasco', label: 'Vasco' },
  { value: 'gremio', label: 'Grêmio' },
  { value: 'internacional', label: 'Internacional' },
  { value: 'cruzeiro', label: 'Cruzeiro' },
  { value: 'atletico-mg', label: 'Atlético-MG' },
];

const RegistrationForm = ({ competition, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    team: '',
    position: '',
    number: '',
    document: null,
    acceptTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [selectedTeam, setSelectedTeam] = useState(null);
  
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
  
  const handleTeamSelect = (option) => {
    setSelectedTeam(option);
    handleChange('team', option.value);
  };
  
  const handleFileUpload = (file) => {
    handleChange('document', file);
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.team) {
      newErrors.team = 'Equipe é obrigatória';
    }
    
    if (!formData.position) {
      newErrors.position = 'Posição é obrigatória';
    }
    
    if (!formData.number) {
      newErrors.number = 'Número é obrigatório';
    } else if (isNaN(formData.number) || parseInt(formData.number) < 1 || parseInt(formData.number) > 99) {
      newErrors.number = 'Número deve estar entre 1 e 99';
    }
    
    if (!formData.document) {
      newErrors.document = 'Documento é obrigatório';
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-background-light p-6 rounded-lg mb-6">
        <h3 className="text-xl font-bold text-white mb-4">{competition.name}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
          <div>
            <p className="text-sm"><span className="text-accent">Local:</span> {competition.location}</p>
            <p className="text-sm"><span className="text-accent">Período:</span> {new Date(competition.startDate).toLocaleDateString('pt-BR')} a {new Date(competition.endDate).toLocaleDateString('pt-BR')}</p>
          </div>
          <div>
            <p className="text-sm"><span className="text-accent">Inscrições até:</span> {new Date(competition.registrationDeadline).toLocaleDateString('pt-BR')}</p>
            <p className="text-sm"><span className="text-accent">Status:</span> {competition.status}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Equipe (autocomplete) */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">Equipe</label>
          <Autocomplete
            id="team"
            placeholder="Digite o nome da sua equipe"
            options={teams}
            onSelect={handleTeamSelect}
            error={errors.team}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Posição */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">Posição</label>
            <Select
              id="position"
              options={positions}
              value={formData.position}
              onChange={(e) => handleChange('position', e.target.value)}
              error={errors.position}
            />
          </div>
          
          {/* Número */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">Número</label>
            <input
              type="number"
              min="1"
              max="99"
              value={formData.number}
              onChange={(e) => handleChange('number', e.target.value)}
              className={`w-full px-3 py-2 bg-background-light border ${errors.number ? 'border-red' : 'border-gray-700'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            {errors.number && <p className="mt-1 text-sm text-red">{errors.number}</p>}
          </div>
        </div>
        
        {/* Upload de documento */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">Documento (RG, CPF ou Passaporte)</label>
          <FileUpload 
            onFileUpload={handleFileUpload}
            error={errors.document}
          />
        </div>
        
        {/* Termos e condições */}
        <div className="pt-4">
          <Checkbox
            id="acceptTerms"
            checked={formData.acceptTerms}
            onChange={(e) => handleChange('acceptTerms', e.target.checked)}
            label={
              <span className="text-white">
                Li e concordo com os <a href="#" className="text-lilac hover:underline">termos e condições</a> e <a href="#" className="text-lilac hover:underline">regulamento</a> da competição.
              </span>
            }
            error={errors.acceptTerms}
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 pt-4">
        <Button 
          variant="ghost" 
          type="button"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button 
          variant="primary" 
          type="submit"
          isLoading={isLoading}
        >
          Enviar inscrição
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;