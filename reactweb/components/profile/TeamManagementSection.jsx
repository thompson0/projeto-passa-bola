import React, { useState, useEffect } from 'react';
import { Button, Toast } from '@/components/ui';

const TeamManagementSection = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [team, setTeam] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showConfirmLeaveModal, setShowConfirmLeaveModal] = useState(false);
  const [playerToRemove, setPlayerToRemove] = useState(null);
  const [showConfirmRemoveModal, setShowConfirmRemoveModal] = useState(false);
  const [toast, setToast] = useState(null);

  // Buscar informações do time do usuário
  useEffect(() => {
    const fetchUserTeam = async () => {
      try {
        setIsLoading(true);
        setError('');

        // Obter token de autenticação
        const authData = localStorage.getItem('auth');
        if (!authData) {
          setError('Você precisa estar autenticado');
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

        // Buscar todos os times
        const response = await fetch('http://localhost:3000/teams', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar times');
        }

        const teams = await response.json();

        // Encontrar o time do usuário (onde ele é dono ou membro)
        let userTeam = null;
        let userIsOwner = false;

        for (const team of teams) {
          // Verificar se o usuário é dono do time
          if (team.owner && (team.owner._id === userId || team.owner === userId)) {
            userTeam = team;
            userIsOwner = true;
            break;
          }

          // Verificar se o usuário é membro do time
          if (team.players && team.players.some(player => 
            (player._id === userId || player === userId)
          )) {
            userTeam = team;
            userIsOwner = false;
            break;
          }
        }

        setTeam(userTeam);
        setIsOwner(userIsOwner);
        if (userTeam) {
          setNewTeamName(userTeam.name);
        }
      } catch (error) {
        console.error('Erro ao buscar time do usuário:', error);
        setError('Erro ao buscar informações do time');
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserTeam();
    }
  }, [userId]);

  // Alterar nome do time
  const handleUpdateTeamName = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError('');

      if (!newTeamName.trim()) {
        setError('O nome do time não pode estar vazio');
        setIsLoading(false);
        return;
      }

      // Obter token de autenticação
      const authData = localStorage.getItem('auth');
      if (!authData) {
        setError('Você precisa estar autenticado');
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

      // Atualizar nome do time
      const response = await fetch(`http://localhost:3000/teams/${team._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: newTeamName })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao atualizar nome do time');
      }

      // Atualizar time localmente
      setTeam(prev => ({ ...prev, name: newTeamName }));
      setSuccess('Nome do time atualizado com sucesso!');
      setShowEditNameModal(false);
      
      setToast({
        message: 'Nome do time atualizado com sucesso!',
        type: 'success'
      });
    } catch (error) {
      console.error('Erro ao atualizar nome do time:', error);
      setError(`Erro ao atualizar nome do time: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Remover jogadora do time
  const handleRemovePlayer = async () => {
    if (!playerToRemove) return;
    
    try {
      setIsLoading(true);
      setError('');

      // Obter token de autenticação
      const authData = localStorage.getItem('auth');
      if (!authData) {
        setError('Você precisa estar autenticado');
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

      // Remover jogadora do time
      const response = await fetch(`http://localhost:3000/teams/${team._id}/players/${playerToRemove._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao remover jogadora do time');
      }

      // Atualizar time localmente
      setTeam(prev => ({
        ...prev,
        players: prev.players.filter(player => player._id !== playerToRemove._id)
      }));
      
      setShowConfirmRemoveModal(false);
      setPlayerToRemove(null);
      
      setToast({
        message: 'Jogadora removida do time com sucesso!',
        type: 'success'
      });
    } catch (error) {
      console.error('Erro ao remover jogadora do time:', error);
      setError(`Erro ao remover jogadora do time: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Sair do time
  const handleLeaveTeam = async () => {
    try {
      setIsLoading(true);
      setError('');

      // Obter token de autenticação
      const authData = localStorage.getItem('auth');
      if (!authData) {
        setError('Você precisa estar autenticado');
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

      // Remover o próprio usuário do time
      const response = await fetch(`http://localhost:3000/teams/${team._id}/players/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao sair do time');
      }

      // Atualizar estado
      setTeam(null);
      setShowConfirmLeaveModal(false);
      
      setToast({
        message: 'Você saiu do time com sucesso!',
        type: 'success'
      });
    } catch (error) {
      console.error('Erro ao sair do time:', error);
      setError(`Erro ao sair do time: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Deletar time
  const handleDeleteTeam = async () => {
    try {
      setIsLoading(true);
      setError('');

      // Obter token de autenticação
      const authData = localStorage.getItem('auth');
      if (!authData) {
        setError('Você precisa estar autenticado');
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

      // Deletar time
      const response = await fetch(`http://localhost:3000/teams/${team._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao deletar time');
      }

      // Atualizar estado
      setTeam(null);
      setShowConfirmDeleteModal(false);
      
      setToast({
        message: 'Time deletado com sucesso!',
        type: 'success'
      });
    } catch (error) {
      console.error('Erro ao deletar time:', error);
      setError(`Erro ao deletar time: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-background-light rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Meu Time</h2>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background-light rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Meu Time</h2>
        <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="bg-background-light rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Meu Time</h2>
        <div className="text-center py-8">
          <p className="text-gray-300 mb-4">Você ainda não faz parte de nenhum time.</p>
          <Button 
            variant="primary"
            onClick={() => window.location.href = '/competicoes-global'}
          >
            Encontrar um Time
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">Meu Time</h2>
      
      {success && (
        <div className="bg-green-500 bg-opacity-10 border border-green-500 text-green-500 px-4 py-3 rounded-md mb-4">
          {success}
        </div>
      )}
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">{team.name}</h3>
          {isOwner && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowEditNameModal(true)}
            >
              Editar Nome
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-background p-3 rounded-md">
            <span className="text-gray-400 text-sm">Cidade</span>
            <p className="text-white">{team.city}</p>
          </div>
          
          <div className="bg-background p-3 rounded-md">
            <span className="text-gray-400 text-sm">Descrição</span>
            <p className="text-white">{team.description}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Jogadoras</h3>
          <span className="text-sm text-gray-400">{team.players?.length || 0} jogadoras</span>
        </div>
        
        <div className="space-y-2">
          {team.players && team.players.map(player => (
            <div 
              key={player._id} 
              className="flex justify-between items-center bg-background p-3 rounded-md"
            >
              <div className="flex items-center">
                <div className="h-8 w-8 bg-primary bg-opacity-20 rounded-full flex items-center justify-center text-primary font-bold mr-3">
                  {player.username ? player.username.charAt(0).toUpperCase() : 'J'}
                </div>
                <div>
                  <p className="text-white">{player.username || 'Jogadora'}</p>
                  {player._id === team.owner || player === team.owner ? (
                    <span className="text-xs text-primary">Dona do time</span>
                  ) : null}
                </div>
              </div>
              
              {isOwner && player._id !== team.owner && player !== team.owner && (
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => {
                    setPlayerToRemove(player);
                    setShowConfirmRemoveModal(true);
                  }}
                >
                  Remover
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t border-gray-700 pt-6">
        {isOwner ? (
          <Button 
            variant="danger" 
            onClick={() => setShowConfirmDeleteModal(true)}
          >
            Deletar Time
          </Button>
        ) : (
          <Button 
            variant="danger" 
            onClick={() => setShowConfirmLeaveModal(true)}
          >
            Sair do Time
          </Button>
        )}
      </div>
      
      {/* Modal para editar nome do time */}
      {showEditNameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-text mb-4">Editar Nome do Time</h3>
            
            {error && (
              <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded-md mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleUpdateTeamName}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-text mb-1">Nome do Time</label>
                <input
                  type="text"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditNameModal(false)}
                  className="px-4 py-2 text-text-secondary hover:text-text border border-gray-300 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  {isLoading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Modal para confirmar remoção de jogadora */}
      {showConfirmRemoveModal && playerToRemove && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-text mb-4">Remover Jogadora</h3>
            
            <p className="text-text-secondary mb-6">
              Tem certeza que deseja remover <strong>{playerToRemove.username || 'esta jogadora'}</strong> do time?
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmRemoveModal(false)}
                className="px-4 py-2 text-text-secondary hover:text-text border border-gray-300 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleRemovePlayer}
                disabled={isLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                {isLoading ? 'Removendo...' : 'Remover'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal para confirmar saída do time */}
      {showConfirmLeaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-text mb-4">Sair do Time</h3>
            
            <p className="text-text-secondary mb-6">
              Tem certeza que deseja sair do time <strong>{team.name}</strong>?
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmLeaveModal(false)}
                className="px-4 py-2 text-text-secondary hover:text-text border border-gray-300 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleLeaveTeam}
                disabled={isLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                {isLoading ? 'Saindo...' : 'Sair do Time'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal para confirmar exclusão do time */}
      {showConfirmDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-text mb-4">Deletar Time</h3>
            
            <p className="text-text-secondary mb-2">
              Tem certeza que deseja deletar o time <strong>{team.name}</strong>?
            </p>
            
            <p className="text-red-500 text-sm mb-6">
              Esta ação não pode ser desfeita e todas as jogadoras serão removidas do time.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmDeleteModal(false)}
                className="px-4 py-2 text-text-secondary hover:text-text border border-gray-300 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteTeam}
                disabled={isLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                {isLoading ? 'Deletando...' : 'Deletar Time'}
              </button>
            </div>
          </div>
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
};

export default TeamManagementSection;