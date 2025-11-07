'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button, FormInput, Checkbox } from '@/components/ui';
import authService from '@/services/auth';

export default function RegisterTorcedoraPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
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
      
      await authService.registerTorcedora(
        data.firstName,
        data.lastName,
        data.email,
        data.password
      );
      
      setSuccess('Cadastro realizado com sucesso! Redirecionando para o login...');
      
      setTimeout(() => {
        router.push('/login-torcedora');
      }, 2000);
    } catch (error) {
      setError(error.message || 'Falha ao registrar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text">Cadastro Torcedora</h1>
        <p className="mt-2 text-text-secondary">Crie sua conta de torcedora</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            id="firstName"
            label="Nome"
            placeholder="Seu nome"
            {...register('firstName', { 
              required: 'Nome é obrigatório',
              minLength: {
                value: 2,
                message: 'O nome deve ter pelo menos 2 caracteres'
              }
            })}
            error={errors.firstName?.message}
          />
          
          <FormInput
            id="lastName"
            label="Sobrenome"
            placeholder="Seu sobrenome"
            {...register('lastName', { 
              required: 'Sobrenome é obrigatório',
              minLength: {
                value: 2,
                message: 'O sobrenome deve ter pelo menos 2 caracteres'
              }
            })}
            error={errors.lastName?.message}
          />
        </div>
        
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
            Criar conta
          </Button>
        </div>
      </form>
      
      <div className="text-center">
        <p className="text-text-secondary">
          Já tem uma conta?{' '}
          <Link href="/login-torcedora" className="text-primary hover:underline">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}