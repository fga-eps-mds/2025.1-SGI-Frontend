import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
  checkAuth: async (): Promise<AuthCheck> => {
    try {
      const response = await api.get('/api/auth/check/');
      return response.data;
    } catch {
      return { authenticated: false };
    }
  },

  getUserProfile: async (): Promise<UserProfile> => {
    const response = await api.get('/api/users/me/');
    return response.data;
  },

  getPublicProfile: async (username: string): Promise<UserProfile> => {
    const response = await api.get(`/api/users/${username}/`);
    return response.data;
  },

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

  deleteAccount: async (): Promise<void> => {
    await api.delete('/DELETE/api/users/me/');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/';
  },

  saveTokens: (tokens: { access_token: string; refresh_token: string }) => {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
  },

  getAccessToken: () => {
    return localStorage.getItem('access_token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  }
};

export default api;
