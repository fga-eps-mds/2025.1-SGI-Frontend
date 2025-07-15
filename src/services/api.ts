import axios from 'axios';

// se não estiver salvo na env a url, vai usar o localhost
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL; 

// Configurar axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Caso de erro ele vai tratar aqui
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido ou expirado
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export interface UserProfile {
  username: string;
  email: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
}

export interface AuthResponse {
  username: string;
  email: string;
  access_token: string;
  refresh_token: string;
}

export interface AuthCheck {
  authenticated: boolean;
  username?: string;
  email?: string;
}

export const authService = {
  // Iniciar login com GitHub
  initiateGitHubLogin: () => {
    window.location.href = `${API_BASE_URL}/api/auth/github/`;
  },

  // Verificar se o usuário está autenticado
  checkAuth: async (): Promise<AuthCheck> => {
    try {
      const response = await api.get('/api/auth/check/');
      return response.data;
    } catch {
      return { authenticated: false };
    }
  },

  // Obter perfil do usuário
  getUserProfile: async (): Promise<UserProfile> => {
    const response = await api.get('/api/users/me/');
    return response.data;
  },

  // Obter perfil público do GitHub
  getPublicProfile: async (username: string): Promise<UserProfile> => {
    const response = await api.get(`/api/users/${username}/`);
    return response.data;
  },

  // Fazer logout
  logout: async (): Promise<void> => {
    try {
      await api.post('/api/auth/logout/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/';
    }
  },

  // Deletar conta
  deleteAccount: async (): Promise<void> => {
    await api.delete('/DELETE/api/users/me/');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/';
  },

  // Salvar tokens no localStorage
  saveTokens: (tokens: { access_token: string; refresh_token: string }) => {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
  },

  // Obter token do localStorage
  getAccessToken: () => {
    return localStorage.getItem('access_token');
  },

  // Verificar se está logado
  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  }
};

export default api;
