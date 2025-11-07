'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button, FormInput, Checkbox } from '@/components/ui';
import authService from '@/services/auth';

export default function LoginJogadoraPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    mode: 'onChange'
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError('');
      await authService.loginJogadora(data.email, data.password, data.rememberMe);
      router.push('/inicio-jogadora');
    } catch (error) {
      setError(error.message || 'Falha ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text">Login Jogadora</h1>
        <p className="mt-2 text-text-secondary">Acesse sua conta de jogadora</p>
      </div>
      
      {error && (
        <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        
        <div className="flex items-center justify-between">
          <Checkbox
            id="rememberMe"
            label="Lembrar-me"
            {...register('rememberMe')}
          />
          
          <Link href="/esqueci-senha" className="text-sm text-primary hover:underline">
            Esqueci minha senha
          </Link>
        </div>
        
        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full" 
            size="md"
            isLoading={isLoading}
            disabled={!isValid}
          >
            Entrar
          </Button>
        </div>
      </form>
      
      <div className="text-center">
        <p className="text-text-secondary">
          Não tem uma conta?{' '}
          <Link href="/register-jogadora" className="text-primary hover:underline">
            Cadastrar
          </Link>
        </p>
      </div>
    </div>
  );
}