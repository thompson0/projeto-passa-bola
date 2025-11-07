'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button, FormInput, Checkbox, Select, Autocomplete } from '@/components/ui';
import authService from '@/services/auth';

// Opções para o campo de posição
const positionOptions = [
  { value: '', label: 'Selecione uma posição' },
  { value: 'goleira', label: 'Goleira' },
  { value: 'zagueira', label: 'Zagueira' },
  { value: 'lateral', label: 'Lateral' },
  { value: 'volante', label: 'Volante' },
  { value: 'meio-campo', label: 'Meio-campo' },
  { value: 'atacante', label: 'Atacante' },
];

// Opções para o campo de clube/equipe (exemplo)
const teamOptions = [
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

export default function RegisterJogadoraPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  
  const { register, handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      position: '',
      team: '',
      terms: false
    },
    mode: 'onChange'
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError('');
      setSuccess('');
      
      await authService.registerJogadora(
        data.fullName,
        data.email,
        data.password,
        data.position,
        data.team
      );
      
      setSuccess('Cadastro realizado com sucesso! Redirecionando para o login...');
      
      setTimeout(() => {
        router.push('/login-jogadora');
      }, 2000);
    } catch (error) {
      setError(error.message || 'Falha ao registrar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTeamSelect = (option) => {
    setValue('team', option.value, { shouldValidate: true });
    setSelectedTeam(option);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text">Cadastro Jogadora</h1>
        <p className="mt-2 text-text-secondary">Crie sua conta de jogadora</p>
      </div>
      
      {error && (
        <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-500 bg-opacity-10 border border-green-500 text-green-500 px-4 py-3 rounded-md">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          id="fullName"
          label="Nome completo"
          placeholder="Seu nome completo"
          {...register('fullName', { 
            required: 'Nome completo é obrigatório',
            minLength: {
              value: 3,
              message: 'O nome deve ter pelo menos 3 caracteres'
            }
          })}
          error={errors.fullName?.message}
        />
        
        <FormInput
          id="email"
          label="Email"
          type="email"
          placeholder="seu@email.com"
          {...register('email', { 
            required: 'Email é obrigatório',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email inválido'
            }
          })}
          error={errors.email?.message}
        />
        
        <FormInput
          id="password"
          label="Senha"
          type="password"
          placeholder="••••••••"
          {...register('password', { 
            required: 'Senha é obrigatória',
            minLength: {
              value: 6,
              message: 'A senha deve ter pelo menos 6 caracteres'
            }
          })}
          error={errors.password?.message}
        />
        
        <FormInput
          id="confirmPassword"
          label="Confirmar senha"
          type="password"
          placeholder="••••••••"
          {...register('confirmPassword', { 
            required: 'Confirmação de senha é obrigatória',
            validate: value => value === password || 'As senhas não coincidem'
          })}
          error={errors.confirmPassword?.message}
        />
        
        <Select
          id="position"
          label="Posição"
          options={positionOptions}
          {...register('position', { 
            required: 'Posição é obrigatória'
          })}
          error={errors.position?.message}
        />
        
        <Select
          id="team"
          label="Clube/Equipe"
          placeholder="Digite o nome do seu clube ou equipe"
          options={teamOptions}
          onSelect={handleTeamSelect}
          {...register('team', { 
            required: 'Clube/Equipe é obrigatório'
          })}
          error={errors.team?.message}
        />
        
        <div className="pt-2">
          <Checkbox
            id="terms"
            label={
              <span>
                Li e concordo com os{' '}
                <Link href="/termos" className="text-primary hover:underline">
                  Termos de Uso
                </Link>{' '}
                e{' '}
                <Link href="/privacidade" className="text-primary hover:underline">
                  Política de Privacidade
                </Link>
              </span>
            }
            {...register('terms', { 
              required: 'Você precisa aceitar os termos para continuar'
            })}
            error={errors.terms?.message}
          />
        </div>
        
        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full" 
            size="md"
            isLoading={isLoading}
            disabled={!isValid}
          >
            Cadastrar
          </Button>
        </div>
      </form>
      
      <div className="text-center">
        <p className="text-text-secondary">
          Já tem uma conta?{' '}
          <Link href="/login-jogadora" className="text-primary hover:underline">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}