import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    let token = null;
    if (typeof window !== 'undefined') {
      const authData = localStorage.getItem('auth');
      if (authData) {
        try {
          const parsedAuth = JSON.parse(authData);
          token = parsedAuth.token;
        } catch (error) {
          console.error('Erro ao analisar dados de autenticação:', error);
        }
      }
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          logout();
          return Promise.reject(error);
        }
        const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
        const { token } = response.data;
        updateToken(token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        logout();
        return Promise.reject(refreshError);
      }
    }
    const errorMessage = error.response?.data?.message || 'Ocorreu um erro. Tente novamente.';
    return Promise.reject({
      message: errorMessage,
      errors: error.response?.data?.errors || {},
      status: error.response?.status
    });
  }
);

function getRefreshToken() {
  if (typeof window !== 'undefined') {
    const authData = localStorage.getItem('auth');
    if (authData) {
      try {
        const parsedAuth = JSON.parse(authData);
        return parsedAuth.refreshToken;
      } catch (error) {
        console.error('Erro ao analisar dados de autenticação:', error);
      }
    }
  }
    return null;
}

function updateToken(token) {
  if (typeof window !== 'undefined') {
    const authData = localStorage.getItem('auth');
    if (authData) {
      try {
        const parsedAuth = JSON.parse(authData);
        parsedAuth.token = token;
        localStorage.setItem('auth', JSON.stringify(parsedAuth));
      } catch (error) {
        console.error('Erro ao atualizar token:', error);
      }
    }
  }
}

function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth');
    window.location.href = '/login';
  }
}

export const authService = {
  async loginTorcedora(email, password) {
    try {
      if (process.env.NODE_ENV === 'development') {
        return this.mockLoginTorcedora();
      }
      const response = await api.post('/login-torcedora', { email, password });
      if (response.data.token) {
        this.setUserData({
          ...response.data,
          role: 'torcedora'
        });
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async loginJogadora(email, password, rememberMe = false) {
    try {
      if (process.env.NODE_ENV === 'development') {
        return this.mockLoginJogadora();
      }
      const response = await api.post('/login-jogadora', { email, password, rememberMe });
      if (response.data.token) {
        this.setUserData({
          ...response.data,
          role: 'jogadora'
        });
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async registerTorcedora(firstName, lastName, email, password) {
    try {
      if (process.env.NODE_ENV === 'development') {
        return { success: true, message: 'Registro simulado com sucesso!' };
      }
      const response = await api.post('/register-torcedora', {
        firstName,
        lastName,
        email,
        password
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async registerJogadora(fullName, email, password, position, team) {
    try {
      if (process.env.NODE_ENV === 'development') {
        return { success: true, message: 'Registro simulado com sucesso!' };
      }
      const response = await api.post('/register-jogadora', {
        fullName,
        email,
        password,
        position,
        team
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async forgotPassword(email) {
    try {
      if (process.env.NODE_ENV === 'development') {
        return { success: true, message: 'Email de recuperação simulado enviado com sucesso!' };
      }
      const response = await api.post('/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  mockLoginTorcedora() {
    const mockUser = {
      id: '1',
      name: 'Maria Silva',
      email: 'maria@example.com',
      role: 'torcedora',
      token: 'mock-token-torcedora-123456',
    };
    this.setUserData(mockUser);
    return mockUser;
  },

  mockLoginJogadora() {
    const mockUser = {
      id: '2',
      name: 'Ana Santos',
      email: 'ana@example.com',
      role: 'jogadora',
      position: 'Atacante',
      team: 'Corinthians',
      token: 'mock-token-jogadora-123456',
};
    this.setUserData(mockUser);
    return mockUser;
  },

  simulateLogin(role) {
    if (role === 'torcedora') {
      return this.mockLoginTorcedora();
    } else if (role === 'jogadora') {
      return this.mockLoginJogadora();
    }
    return null;
  },

  setUserData(userData) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth', JSON.stringify(userData));
    }
  },

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth');
    }
  },

  getCurrentUser() {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('auth'));
    }
    return null;
  },

  getUserRole() {
    const user = this.getCurrentUser();
    return user?.role || null;
  },

  isAuthenticated() {
    return !!this.getCurrentUser();
  },

  getRedirectPath() {
    const role = this.getUserRole();
    if (role === 'torcedora') {
      return '/inicio';
    } else if (role === 'jogadora') {
      return '/inicio-jogadora';
    }
    return '/login';
  }
};

export default authService;