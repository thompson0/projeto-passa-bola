'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import RegistrationForm from '@/components/registration/RegistrationForm';
import SuccessMessage from '@/components/registration/SuccessMessage';
import { Button } from '@/components/ui';
import { globalCompetitionsService } from '@/services/mocks/globalCompetitionsData';

export default function RegistrationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const competitionId = searchParams.get('competitionId');
  
  const [competition, setCompetition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  
  useEffect(() => {
    const fetchCompetition = async () => {
      try {
        if (!competitionId) {
          return;
        }
        
        // Em um ambiente real, isso seria uma chamada de API
        const competitionData = globalCompetitionsService.getCompetitionById(competitionId);
        
        if (!competitionData) {
          router.push('/competicoes-global');
          return;
        }
        
        if (!competitionData.registrationOpen) {
          router.push('/competicoes-global');
          return;
        }
        
        setCompetition(competitionData);
      } catch (error) {
        console.error('Erro ao carregar competição:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompetition();
  }, [competitionId, router]);
  
  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      
      // Em um ambiente real, isso seria uma chamada de API
      // Simulando um delay para mostrar o estado de loading
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulando uma resposta de sucesso
      const response = {
        success: true,
        competitionId,
        competitionName: competition.name,
        teamName: formData.team,
        position: formData.position,
        number: formData.number,
        registrationDate: new Date().toISOString()
      };
      
      setRegistrationData(response);
      setRegistrationSuccess(true);
    } catch (error) {
      console.error('Erro ao enviar inscrição:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    router.push('/competicoes-global');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-accent">Carregando...</p>
        </div>
      </div>
    );
  }
  
  if (!competition) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white mb-4">Competição não encontrada</h1>
        <p className="text-text-secondary mb-6">A competição que você está procurando não existe ou as inscrições não estão abertas.</p>
        <Link href="/competicoes-global">
          <Button variant="primary">Ver competições disponíveis</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Inscrição na Competição</h1>
        <p className="text-gray-300">
          Preencha o formulário abaixo para se inscrever na competição.
        </p>
      </div>
      
      {registrationSuccess ? (
        <SuccessMessage 
          competition={competition}
          registrationData={registrationData}
        />
      ) : (
        <RegistrationForm 
          competition={competition}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isSubmitting}
        />
      )}
    </div>
  );
}