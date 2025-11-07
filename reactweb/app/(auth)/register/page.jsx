'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button, Card, CardContent, CardHeader, CardTitle, FormInput } from '@/components/ui';
import authService from '@/services/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError('');
      setSuccess('');
      await authService.register(data.name, data.email, data.password);
      setSuccess('Cadastro realizado com sucesso! Redirecionando para o login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      setError(typeof error === 'string' ? error : 'Falha ao registrar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background-dark p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-accent">Crie sua conta</h1>
          <p className="text-gray-300 mt-2">Preencha os dados abaixo para começar</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Cadastro</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-500 bg-opacity-20 border border-green-500 text-green-500 px-4 py-3 rounded mb-4">
                {success}
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                id="name"
                label="Nome completo"
                placeholder="Seu nome"
                {...register('name', { 
                  required: 'Nome é obrigatório',
                  minLength: {
                    value: 3,
                    message: 'O nome deve ter pelo menos 3 caracteres'
                  }
                })}
                error={errors.name?.message}
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
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  isLoading={isLoading}
                >
                  Cadastrar
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Já tem uma conta?{' '}
                <Link href="/login" className="text-accent hover:underline">
                  Faça login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}