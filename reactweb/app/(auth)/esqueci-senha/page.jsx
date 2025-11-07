'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button, FormInput } from '@/components/ui';
import authService from '@/services/auth';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [referrer, setReferrer] = useState('/login');
  
  useEffect(() => {
    // Tentar determinar de onde o usuário veio
    if (typeof window !== 'undefined') {
      const path = document.referrer;
      if (path.includes('login-torcedora')) {
        setReferrer('/login-torcedora');
      } else if (path.includes('login-jogadora')) {
        setReferrer('/login-jogadora');
      }
    }
  }, []);
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError('');
      setSuccess('');
      
      await authService.forgotPassword(data.email);
      
      setSuccess('Enviamos um email com instruções para redefinir sua senha.');
    } catch (error) {
      setError(error.message || 'Falha ao enviar email de recuperação. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text">Esqueci minha senha</h1>
        <p className="mt-2 text-text-secondary">
          Digite seu email para receber instruções de recuperação
        </p>
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
        
        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full" 
            size="md"
            isLoading={isLoading}
            disabled={!isValid}
          >
            Enviar instruções
          </Button>
        </div>
      </form>
      
      <div className="text-center">
        <p className="text-text-secondary">
          Lembrou sua senha?{' '}
          <Link href={referrer} className="text-primary hover:underline">
            Voltar para o login
          </Link>
        </p>
      </div>
    </div>
  );
}