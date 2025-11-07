import React from 'react';
import Image from 'next/image';
import { Button, Pill } from '@/components/ui';

const MatchesTable = ({ matches, onViewDetails, onConfirmPresence }) => {
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
  
  const getStatusVariant = (status) => {
    switch (status) {
      case 'Agendado':
        return 'primary';
      case 'Em andamento':
        return 'warning';
      case 'Finalizado':
        return 'success';
      case 'Cancelado':
        return 'danger';
      default:
        return 'info';
    }
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-background-light rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-background">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Data</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Adversário</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Competição</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Local</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {matches.map((match) => (
            <tr key={match.id} className="hover:bg-background-dark transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {formatDate(match.date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="relative h-8 w-8 mr-3">
                    <Image
                      src={match.opponentLogo || '/assets/images/team-placeholder.png'}
                      alt={match.opponent}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm text-white">{match.opponent}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {match.competition}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {match.location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Pill variant={getStatusVariant(match.status)}>
                  {match.status === 'Finalizado' && match.result ? `${match.status} (${match.result})` : match.status}
                </Pill>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onViewDetails(match)}
                  >
                    Ver detalhes
                  </Button>
                  
                  {match.status === 'Agendado' && !match.confirmed && (
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => onConfirmPresence(match)}
                    >
                      Confirmar presença
                    </Button>
                  )}
                  
                  {match.status === 'Agendado' && match.confirmed && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      disabled
                    >
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Presença confirmada
                      </span>
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchesTable;