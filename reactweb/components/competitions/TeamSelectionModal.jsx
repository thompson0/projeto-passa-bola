'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui';

const TeamSelectionModal = ({ competition, onClose, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [activeTab, setActiveTab] = useState('join'); // 'join' ou 'create'
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Formulário para criar um novo time
  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
    city: ''
  });
  
  // Buscar times disponíveis
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        
        // Buscar times do backend
        const authData = localStorage.getItem('auth');
        if (!authData) {
          setError('Você precisa estar autenticado para ver os times');
          return;
        }
        
        const parsedAuth = JSON.parse(authData);
        const token = parsedAuth.token;
        
        if (!token) {
          setError('Token de autenticação não encontrado');
          return;
        }
        
        console.log('Token para buscar times:', token);
        
        const response = await fetch('http://localhost:3000/teams', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Verificar se a resposta é um JSON válido
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          
          if (response.ok) {
            console.log('Times recebidos:', data);
            setTeams(data);
          } else {
            setError(data.message || 'Erro ao buscar times');
          }
        } else {
          // Se não for JSON, obter o texto da resposta
          const text = await response.text();
          console.error('Resposta não-JSON:', text);
          setError(`Resposta do servidor não é JSON: ${text}`);
        }
      } catch (error) {
        console.error('Erro ao buscar times:', error);
        setError(`Erro ao buscar times: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTeams();
  }, []);
  
  // Manipular mudança nos campos do formulário de novo time
  const handleNewTeamChange = (e) => {
    const { name, value } = e.target;
    setNewTeam(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Criar um novo time
  const handleCreateTeam = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError('');
      
      // Validar campos
      if (!newTeam.name || !newTeam.description || !newTeam.city) {
        setError('Todos os campos são obrigatórios');
        setIsLoading(false);
        return;
      }
      
      // Enviar requisição para criar time
      const authData = localStorage.getItem('auth');
      if (!authData) {
        setError('Você precisa estar autenticado para criar um time');
        setIsLoading(false);
        return;
      }
      
      const parsedAuth = JSON.parse(authData);
      const token = parsedAuth.token;
      
      if (!token) {
        setError('Token de autenticação não encontrado');
        setIsLoading(false);
        return;
      }
      
      console.log('Token para criar time:', token);
      console.log('Dados do time:', newTeam);
      
      const response = await fetch('http://localhost:3000/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newTeam)
      });
      
      // Verificar se a resposta é um JSON válido
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // Se não for JSON, obter o texto da resposta
        const text = await response.text();
        console.error('Resposta não-JSON:', text);
        throw new Error(`Resposta do servidor não é JSON: ${text}`);
      }
      
      if (response.ok) {
        setSuccess('Time criado com sucesso! Como criadora, você já faz parte deste time.');
        
        // Adicionar o novo time à lista e selecioná-lo
        const newTeamWithId = data.team;
        setTeams(prev => [...prev, newTeamWithId]);
        setSelectedTeam(newTeamWithId._id);
        
        // Fechar o modal após sucesso
        setTimeout(() => {
          onSubmit({ 
            teamId: newTeamWithId._id, 
            teamName: newTeamWithId.name,
            isOwner: true 
          });
        }, 1500);
      } else {
        setError(data.message || 'Erro ao criar time');
      }
    } catch (error) {
      console.error('Erro ao criar time:', error);
      setError(`Erro ao criar time: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Ingressar em um time existente usando a nova rota
  const handleJoinTeam = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError('');
      
      // Validar seleção de time
      if (!selectedTeam) {
        setError('Selecione um time para ingressar');
        setIsLoading(false);
        return;
      }
      
      // Obter informações do usuário
      const authData = localStorage.getItem('auth');
      if (!authData) {
        setError('Você precisa estar autenticado para ingressar em um time');
        setIsLoading(false);
        return;
      }
      
      const parsedAuth = JSON.parse(authData);
      const token = parsedAuth.token;
      const userId = parsedAuth.user?.id || parsedAuth.userId || parsedAuth.id;
      
      if (!token) {
        setError('Token de autenticação não encontrado');
        setIsLoading(false);
        return;
      }
      
      // Verificar se o usuário é o dono do time
      const selectedTeamData = teams.find(team => team._id === selectedTeam);
      const isOwner = selectedTeamData && selectedTeamData.owner && 
                     (selectedTeamData.owner._id === userId || selectedTeamData.owner === userId);
      
      if (isOwner) {
        setSuccess('Você já é a dona deste time!');
        setTimeout(() => {
          onSubmit({ 
            teamId: selectedTeam, 
            teamName: selectedTeamData.name,
            isOwner: true 
          });
        }, 1500);
        return;
      }
      
      // Verificar se o usuário já faz parte do time
      const isAlreadyMember = selectedTeamData && selectedTeamData.players && 
                             selectedTeamData.players.some(player => 
                               (player._id === userId || player === userId)
                             );
      
      if (isAlreadyMember) {
        setSuccess('Você já faz parte deste time!');
        setTimeout(() => {
          onSubmit({ 
            teamId: selectedTeam, 
            teamName: selectedTeamData.name,
            isOwner: false 
          });
        }, 1500);
        return;
      }
      
      // Usar a nova rota para ingressar no time
      console.log('Ingressando no time:', selectedTeam);
      console.log('Token:', token);
      
      const response = await fetch(`http://localhost:3000/teams/${selectedTeam}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Processar a resposta
      let responseData;
      try {
        const responseText = await response.text();
        responseData = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        console.error('Erro ao analisar resposta:', e);
        throw new Error('Erro ao processar resposta do servidor');
      }
      
      if (response.ok) {
        const teamName = selectedTeamData ? selectedTeamData.name : 'time selecionado';
        setSuccess(`Você ingressou no time "${teamName}" com sucesso!`);
        
        // Atualizar a lista de times localmente
        const updatedTeams = teams.map(team => {
          if (team._id === selectedTeam) {
            return {
              ...team,
              players: [...(team.players || []), userId]
            };
          }
          return team;
        });
        setTeams(updatedTeams);
        
        // Fechar o modal após sucesso
        setTimeout(() => {
          onSubmit({ 
            teamId: selectedTeam, 
            teamName,
            isOwner: false 
          });
        }, 1500);
      } else {
        setError(responseData.message || 'Erro ao ingressar no time');
      }
    } catch (error) {
      console.error('Erro ao ingressar no time:', error);
      setError(`Erro ao ingressar no time: ${error.message}`);
    } finally {
      setIsLoading(false);
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
            <p className="text-text-secondary mb-4">Para participar desta competição, você precisa fazer parte de um time.</p>
          </div>
          
          {error && (
            <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-500 bg-opacity-10 border border-green-500 text-green-500 px-4 py-3 rounded-md mb-4">
              {success}
            </div>
          )}
          
          {/* Abas */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'join' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary'}`}
              onClick={() => setActiveTab('join')}
            >
              Ingressar em um Time
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'create' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary'}`}
              onClick={() => setActiveTab('create')}
            >
              Criar Novo Time
            </button>
          </div>
          
          {/* Conteúdo da aba "Ingressar em um Time" */}
          {activeTab === 'join' && (
            <form onSubmit={handleJoinTeam}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-text mb-1">Selecione um Time</label>
                {isLoading ? (
                  <div className="flex items-center justify-center h-20">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : teams.length > 0 ? (
                  <div className="space-y-2">
                    {teams.map(team => (
                      <div 
                        key={team._id} 
                        className={`border rounded-md p-4 cursor-pointer transition-colors ${selectedTeam === team._id ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-primary'}`}
                        onClick={() => setSelectedTeam(team._id)}
                      >
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-primary bg-opacity-20 rounded-full flex items-center justify-center text-primary font-bold mr-3">
                            {team.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-medium text-text">{team.name}</h4>
                            <p className="text-sm text-text-secondary">{team.city}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-md">
                    <p className="text-text-secondary">Nenhum time disponível.</p>
                    <p className="text-sm mt-2">Crie um novo time na aba "Criar Novo Time".</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-4">
                <button 
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-text-secondary hover:text-text border border-gray-300 rounded-md"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={!selectedTeam || isLoading}
                  className={`px-4 py-2 text-white rounded-md ${!selectedTeam || isLoading ? 'bg-primary-light cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'}`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processando...
                    </span>
                  ) : 'Ingressar no Time'}
                </button>
              </div>
            </form>
          )}
          
          {/* Conteúdo da aba "Criar Novo Time" */}
          {activeTab === 'create' && (
            <form onSubmit={handleCreateTeam}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Nome do Time</label>
                  <input
                    type="text"
                    name="name"
                    value={newTeam.name}
                    onChange={handleNewTeamChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Digite o nome do time"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Descrição</label>
                  <textarea
                    name="description"
                    value={newTeam.description}
                    onChange={handleNewTeamChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Descreva seu time"
                    rows="3"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Cidade</label>
                  <input
                    type="text"
                    name="city"
                    value={newTeam.city}
                    onChange={handleNewTeamChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Digite a cidade do time"
                  />
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-4">
                <button 
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-text-secondary hover:text-text border border-gray-300 rounded-md"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className={`px-4 py-2 text-white rounded-md ${isLoading ? 'bg-primary-light cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'}`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processando...
                    </span>
                  ) : 'Criar Time'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamSelectionModal;