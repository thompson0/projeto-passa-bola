import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

const RegistrationsCard = ({ registrations }) => {
  return (
    <div className="bg-background-light rounded-lg p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Inscrições</h2>
        <Link href="/equipe/inscricoes">
          <Button variant="outline" size="sm">Gerenciar</Button>
        </Link>
      </div>
      
      <div className="space-y-4">
        {registrations.map((registration) => (
          <div key={registration.id} className="bg-background rounded-lg p-4">
            <h3 className="font-medium text-white mb-2">{registration.competition}</h3>
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Prazo:</span>
              <span className="text-sm text-white">{formatDate(registration.deadline)}</span>
            </div>
            
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-400">Status:</span>
              <span className={`text-sm font-medium ${
                registration.status === 'Aberta' ? 'text-green' : 
                registration.status === 'Em breve' ? 'text-yellow-500' : 
                'text-red'
              }`}>
                {registration.status}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-400">Jogadoras inscritas</span>
                <span className="text-xs text-white">
                  {registration.registeredPlayers}/{registration.totalPlayers}
                </span>
              </div>
              <div className="w-full bg-background-dark rounded-full h-2">
                <div 
                  className="bg-lilac h-2 rounded-full" 
                  style={{ width: `${(registration.registeredPlayers / registration.totalPlayers) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {registration.status === 'Aberta' && (
              <Link href={`/equipe/inscricoes/${registration.id}`}>
                <Button variant="primary" size="sm" className="w-full">
                  {registration.registeredPlayers > 0 ? 'Continuar inscrição' : 'Inscrever equipe'}
                </Button>
              </Link>
            )}
            
            {registration.status === 'Em breve' && (
              <Button variant="outline" size="sm" className="w-full" disabled>
                Em breve
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationsCard;