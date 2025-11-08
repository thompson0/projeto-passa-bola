"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { API_URL } from '@/services/apiConfig';

// Criação do contexto
const AuthContext = createContext({
  user: null,
  role: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  toggleRole: () => {},
});


// Provider do contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Efeito para verificar se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setRole(parsedUser.role);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Configuração dos interceptores do Axios
  useEffect(() => {
    // Interceptor para adicionar o token em todas as requisições
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor para tratar erros de autenticação (401)
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expirado ou inválido
          logout();
          router.push('/login');
        }
        return Promise.reject(error);
      }
    );

    // Limpeza dos interceptores quando o componente for desmontado
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [user, router]);

  // Função de login
  const login = async (email, password, loginRole = 'torcedora') => {
    try {
      // Determinar a URL de login com base no papel
      const loginUrl = loginRole === 'jogadora' ? '/login-jogadora' : '/login-torcedora';
      
      // Fazer a requisição de login
      const response = await axios.post(`${API_URL}${loginUrl}`, { email, password });
      
      // Se a requisição for bem-sucedida, armazenar os dados do usuário
      if (response.data && response.data.token) {
        const userData = {
          ...response.data,
          role: loginRole
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setRole(loginRole);
        
        return userData;
      }
      
      throw new Error('Resposta inválida do servidor');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setRole(null);
    router.push('/login');
  };

  // Função para alternar entre os papéis (torcedora/jogadora)
  const toggleRole = () => {
    if (!user) return;
    
    const newRole = role === 'torcedora' ? 'jogadora' : 'torcedora';
    
    // Atualizar o papel no localStorage
    const updatedUser = { ...user, role: newRole };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Atualizar o estado
    setUser(updatedUser);
    setRole(newRole);
    
    // Redirecionar para a página inicial do novo papel
    const redirectPath = newRole === 'jogadora' ? '/inicio-jogadora' : '/inicio';
    router.push(redirectPath);
  };

  // Valores expostos pelo contexto
  const value = {
    user,
    role,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    toggleRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar o contexto
export const useAuth = () => useContext(AuthContext);

export default AuthContext;