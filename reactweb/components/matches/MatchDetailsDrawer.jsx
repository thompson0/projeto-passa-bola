import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';

const MatchDetailsDrawer = ({ match, onClose, onConfirmPresence }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handleViewRoute = () => {
    // Em um ambiente real, isso abriria o Google Maps ou outra aplicação de mapas
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${match.coordinates.lat},${match.coordinates.lng}`;
    window.open(mapsUrl, '_blank');
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-background-light w-full max-w-md h-full overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Detalhes da Partida</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Confronto */}
          <div className="bg-background rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col items-center w-5/12">
                <div className="relative h-16 w-16 mb-2">
                  <Image
                    src={match.homeTeamLogo || '/assets/images/team-placeholder.png'}
                    alt={match.homeTeam}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-center font-medium text-white">{match.homeTeam}</span>
              </div>
              
              <div className="flex flex-col items-center w-2/12">
                {match.status === 'Finalizado' && match.result ? (
                  <span className="text-xl font-bold text-white">{match.result}</span>
                ) : (
                  <span className="text-xl font-bold text-white">x</span>
                )}
                <span className="text-xs text-gray-400 mt-1">{match.status}</span>
              </div>
              
              <div className="flex flex-col items-center w-5/12">
                <div className="relative h-16 w-16 mb-2">
                  <Image
                    src={match.awayTeamLogo || '/assets/images/team-placeholder.png'}
                    alt={match.awayTeam}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-center font-medium text-white">{match.awayTeam}</span>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-300">
              <p>{match.competition}</p>
              <p>{formatDate(match.date)}</p>
            </div>
          </div>
          
          {/* Informações */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-3">Informações</h3>
            <div className="bg-background rounded-lg p-4 space-y-2">
              <p className="text-sm text-gray-300">
                <span className="text-accent">Local:</span> {match.location}
              </p>
              <p className="text-sm text-gray-300">
                <span className="text-accent">Tipo:</span> {match.type}
              </p>
              <p className="text-sm text-gray-300">
                <span className="text-accent">Mando:</span> {match.isHome ? 'Casa' : 'Fora'}
              </p>
              <p className="text-sm text-gray-300">
                <span className="text-accent">Status:</span> {match.status}
              </p>
              {match.status === 'Agendado' && (
                <p className="text-sm text-gray-300">
                  <span className="text-accent">Presença:</span> {match.confirmed ? 'Confirmada' : 'Não confirmada'}
                </p>
              )}
            </div>
          </div>
          
          {/* Mapa */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-3">Localização</h3>
            <div className="bg-background rounded-lg p-4">
              <div className="relative h-48 w-full mb-3 bg-gray-700 rounded">
                {/* Em um ambiente real, aqui seria um mapa */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={handleViewRoute}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                </svg>
                Ver rota
              </Button>
            </div>
          </div>
          
          {/* Escalação */}
          {match.lineup && match.lineup.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-3">Escalação</h3>
              <div className="bg-background rounded-lg p-4">
                <div className="space-y-2">
                  {match.lineup.map((player, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-white mr-3">
                          {player.number}
                        </span>
                        <span className="text-white">{player.name}</span>
                      </div>
                      <span className="text-sm text-gray-400">{player.position}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Ações */}
          <div className="mt-8">
            {match.status === 'Agendado' && !match.confirmed ? (
              <Button 
                variant="primary" 
                className="w-full"
                onClick={() => onConfirmPresence(match)}
              >
                Confirmar presença
              </Button>
            ) : match.status === 'Agendado' && match.confirmed ? (
              <Button 
                variant="ghost" 
                className="w-full"
                disabled
              >
                <span className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Presença confirmada
                </span>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailsDrawer;