'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button, FormInput } from '@/components/ui';
import { API_URL } from '@/services/apiConfig';

export default function RegisterJogadoraPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      position: '',
      team: '',
      height: '170',
      age: '25'
    },
    mode: 'onTouched'
  });

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      setDebugInfo('Iniciando registro...');

      // Preparar os dados no formato que o backend espera
      const userData = {
        username: data.fullName,
        email: data.email,
        password: data.password,
        role: 'Player',
        position: data.position,
        height: data.height,
        age: data.age
      };

      setDebugInfo(`Dados preparados: ${JSON.stringify(userData)}`);
      console.log('Dados enviados para registro:', userData);

      // Fazer a requisição para o backend
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      console.log('Resposta do servidor:', result);
      setDebugInfo(`Resposta: ${JSON.stringify(result)}`);

      if (response.ok) {
        router.push('/login-jogadora?registered=true');
      } else {
        setError(result.message || 'Erro ao criar conta. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro no registro:', error);
      setDebugInfo(`Erro: ${error.message}`);
      setError(error.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const positionOptions = [
    { value: '', label: 'Selecione uma posição' },
    { value: 'goleira', label: 'Goleira' },
    { value: 'zagueira', label: 'Zagueira' },
    { value: 'lateral', label: 'Lateral' },
    { value: 'volante', label: 'Volante' },
    { value: 'meio-campo', label: 'Meio-Campo' },
    { value: 'atacante', label: 'Atacante' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text">Cadastro de Jogadora</h1>
        <p className="mt-2 text-text-secondary">Crie sua conta para participar</p>
      </div>

      {error && (
        <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {debugInfo && (
        <div className="bg-blue-500 bg-opacity-10 border border-blue-500 text-blue-500 px-4 py-3 rounded-md text-xs">
          <pre>{debugInfo}</pre>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          id="fullName"
          label="Nome Completo"
          placeholder="Seu nome completo"
          {...register('fullName', {
            required: 'Nome completo é obrigatório',
            minLength: {
              value: 3,
              message: 'Nome deve ter pelo menos 3 caracteres'
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
          label="Confirmar Senha"
          type="password"
          placeholder="••••••••"
          {...register('confirmPassword', {
            required: 'Confirmação de senha é obrigatória',
            validate: (value, formValues) =>
              value === formValues.password || 'As senhas não coincidem'
          })}
          error={errors.confirmPassword?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-text mb-1">
              Posição
            </label>
            <select
              id="position"
              className="w-full bg-background border border-gray-700 rounded-md p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              {...register('position', {
                required: 'Posição é obrigatória'
              })}
            >
              {positionOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.position && (
              <p className="mt-1 text-sm text-red-500">{errors.position.message}</p>
            )}
          </div>

          <FormInput
            id="team"
            label="Time"
            placeholder="Nome do seu time"
            {...register('team', {
              required: 'Time é obrigatório'
            })}
            error={errors.team?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            id="height"
            label="Altura (cm)"
            type="number"
            placeholder="170"
            {...register('height', {
              required: 'Altura é obrigatória',
              min: {
                value: 100,
                message: 'Altura mínima de 100cm'
              },
              max: {
                value: 220,
                message: 'Altura máxima de 220cm'
              }
            })}
            error={errors.height?.message}
          />

          <FormInput
            id="age"
            label="Idade"
            type="number"
            placeholder="25"
            {...register('age', {
              required: 'Idade é obrigatória',
              min: {
                value: 16,
                message: 'Idade mínima de 16 anos'
              },
              max: {
                value: 60,
                message: 'Idade máxima de 60 anos'
              }
            })}
            error={errors.age?.message}
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full"
            size="md"
            isLoading={isLoading}
          >
            Criar Conta
          </Button>
        </div>
      </form>

      <div className="text-center">
        <p className="text-text-secondary">
          Já tem uma conta?{' '}
          <Link href="/login-jogadora" className="text-primary hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}