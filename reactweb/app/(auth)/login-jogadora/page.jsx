// reactweb/app/(auth)/login-jogadora/page.jsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button, FormInput, Checkbox } from '@/components/ui';

export default function LoginJogadoraPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState('');
  
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
      setDebugInfo('Iniciando login de jogadora...');

      // Preparar os dados para o login
      const loginData = {
        email: data.email,
        password: data.password
      };

      console.log('Dados enviados para login:', loginData);
      setDebugInfo(`Dados preparados: ${JSON.stringify(loginData)}`);

      // Fazer a requisição para o backend
      const response = await fetch('http://localhost:3000/login', {
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
        // Decodificar o token JWT para obter informações do usuário
        const tokenParts = result.token.split('.');
        if (tokenParts.length === 3) {
          try {
            const payload = JSON.parse(atob(tokenParts[1]));
            console.log('Payload do token JWT:', payload);
            
            // Buscar informações do usuário usando o ID do token
            setDebugInfo('Buscando informações do usuário...');
            
            // Primeiro, vamos salvar o token para poder fazer requisições autenticadas
            const initialAuthData = {
              token: result.token,
              userId: payload.id,
              role: payload.role || 'jogadora'
            };
            
            localStorage.setItem('auth', JSON.stringify(initialAuthData));
            
            // Agora vamos buscar os dados do usuário
            try {
              const userResponse = await fetch(`http://localhost:3000/users/${payload.id}`, {
                headers: {
                  'Authorization': `Bearer ${result.token}`
                }
              });
              
              if (userResponse && userResponse.ok) {
                const userData = await userResponse.json();
                console.log('Dados do usuário obtidos:', userData);
                setDebugInfo(`Dados do usuário: ${JSON.stringify(userData)}`);
                
                // Atualizar os dados no localStorage com as informações completas
                const authData = {
                  token: result.token,
                  user: {
                    id: payload.id,
                    username: userData.username || '',
                    email: data.email,
                    role: payload.role || 'jogadora',
                    position: userData.position,
                    height: userData.height,
                    age: userData.age
                  },
                  role: 'jogadora'
                };
                
                localStorage.setItem('auth', JSON.stringify(authData));
                localStorage.setItem('user', JSON.stringify(authData));
              } else {
                console.log('Não foi possível obter dados do usuário, usando dados básicos');
                
                // Se não conseguir obter os dados completos, usar os dados básicos
                const basicAuthData = {
                  token: result.token,
                  user: {
                    id: payload.id,
                    email: data.email,
                    role: payload.role || 'jogadora'
                  },
                  role: 'jogadora'
                };
                
                localStorage.setItem('auth', JSON.stringify(basicAuthData));
                localStorage.setItem('user', JSON.stringify(basicAuthData));
              }
            } catch (fetchError) {
              console.error('Erro ao buscar dados do usuário:', fetchError);
              setDebugInfo(`Erro ao buscar dados: ${fetchError.message}`);
              
              // Se ocorrer um erro, usar os dados básicos
              const fallbackAuthData = {
                token: result.token,
                user: {
                  id: payload.id,
                  email: data.email,
                  role: payload.role || 'jogadora'
                },
                role: 'jogadora'
              };
              
              localStorage.setItem('auth', JSON.stringify(fallbackAuthData));
              localStorage.setItem('user', JSON.stringify(fallbackAuthData));
            }
          } catch (e) {
            console.error('Erro ao decodificar token:', e);
            setDebugInfo(`Erro ao decodificar token: ${e.message}`);
            
            // Em caso de erro na decodificação, salvar apenas o token
            const errorAuthData = {
              token: result.token,
              role: 'jogadora'
            };
            
            localStorage.setItem('auth', JSON.stringify(errorAuthData));
            localStorage.setItem('user', JSON.stringify(errorAuthData));
          }
        } else {
          // Se o token não tiver o formato esperado
          const simpleAuthData = {
            token: result.token,
            role: 'jogadora'
          };
          
          localStorage.setItem('auth', JSON.stringify(simpleAuthData));
          localStorage.setItem('user', JSON.stringify(simpleAuthData));
        }
        
        setDebugInfo('Login bem-sucedido! Redirecionando...');
        
        // Forçar o redirecionamento usando window.location
        window.location.href = '/inicio-jogadora';
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
        <h1 className="text-2xl font-bold text-text">Login Jogadora</h1>
        <p className="mt-2 text-text-secondary">Acesse sua conta de jogadora</p>
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