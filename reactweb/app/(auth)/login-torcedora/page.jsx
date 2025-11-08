// reactweb/app/(auth)/login-torcedora/page.jsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button, FormInput } from '@/components/ui';
import { API_URL } from '@/services/apiConfig';

export default function LoginTorcedoraPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState('');
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError('');
      setDebugInfo('Iniciando login de torcedora...');

      // Preparar os dados para o login
      const loginData = {
        email: data.email,
        password: data.password
      };

      console.log('Dados enviados para login:', loginData);
      setDebugInfo(`Dados preparados: ${JSON.stringify(loginData)}`);

      // Fazer a requisição para o backend
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      console.log('Resposta do servidor:', result);
      setDebugInfo(`Resposta: ${JSON.stringify(result)}`);

      if (response.ok && result.token) {
        // Salvar os dados do usuário no localStorage
        localStorage.setItem('auth', JSON.stringify({
          ...result,
          role: 'torcedora'
        }));
        setDebugInfo('Login bem-sucedido! Redirecionando...');
        
        // Forçar o redirecionamento usando window.location
        router.push('/inicio');
        return; // Importante para evitar que o código continue executando
      } else {
        setError(result.message || 'Falha ao fazer login. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setDebugInfo(`Erro: ${error.message}`);
      setError(error.message || 'Falha ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text">Login Torcedora</h1>
        <p className="mt-2 text-text-secondary">Acesse sua conta de torcedora</p>
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
        
        <div className="flex justify-end">
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
          <Link href="/register-torcedora" className="text-primary hover:underline">
            Cadastrar
          </Link>
        </p>
      </div>
    </div>
  );
}