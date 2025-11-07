import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';

const SuccessMessage = ({ competition, registrationData }) => {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green/10 text-green mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-4">Inscrição realizada com sucesso!</h2>
      
      <p className="text-gray-300 mb-6">
        Sua inscrição para a competição <span className="text-lilac font-medium">{competition.name}</span> foi recebida e está sendo processada.
      </p>
      
      <div className="bg-background-light rounded-lg p-6 mb-8 text-left">
        <h3 className="text-lg font-medium text-white mb-4">Detalhes da inscrição</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-300">
              <span className="text-accent">Competição:</span> {competition.name}
            </p>
            <p className="text-sm text-gray-300">
              <span className="text-accent">Equipe:</span> {registrationData.teamName}
            </p>
            <p className="text-sm text-gray-300">
              <span className="text-accent">Posição:</span> {registrationData.position}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-300">
              <span className="text-accent">Número:</span> {registrationData.number}
            </p>
            <p className="text-sm text-gray-300">
              <span className="text-accent">Data de inscrição:</span> {new Date().toLocaleDateString('pt-BR')}
            </p>
            <p className="text-sm text-gray-300">
              <span className="text-accent">Status:</span> <span className="text-green">Confirmada</span>
            </p>
          </div>
        </div>
      </div>
      
      <p className="text-gray-300 mb-8">
        Você receberá um email com mais informações sobre a competição e os próximos passos.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Link href="/competicoes-global">
          <Button variant="outline">Ver outras competições</Button>
        </Link>
        <Link href="/partidas">
          <Button variant="primary">Ver minhas partidas</Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessMessage;