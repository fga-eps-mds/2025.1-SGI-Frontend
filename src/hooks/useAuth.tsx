'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { authService, UserProfile } from '../services/api';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  
  const checkAuthStatus = async () => {
    if (hasInitialized) return;
    
    try {
      console.log('CheckAuthStatus: Iniciando verificação...');
      const hasToken = authService.isAuthenticated();
      
      if (hasToken) {
        try {
          const authCheck = await authService.checkAuth();
          if (authCheck.authenticated) {
            setIsAuthenticated(true);
            const profile = await authService.getUserProfile();
            setUser(profile);
            console.log('CheckAuthStatus: Usuário autenticado e perfil carregado');
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        } catch (error) {
          console.warn('API não disponível, mas token existe. Marcando como autenticado:', error);
          setIsAuthenticated(true);
          setUser({
            username: 'Usuário',
            email: '',
            name: 'Usuário',
            avatar_url: undefined,
            bio: undefined,
            public_repos: 0,
            followers: 0,
            following: 0,
          });
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
      setHasInitialized(true);
      console.log('CheckAuthStatus: Finalizado');
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, [hasInitialized]);

  const login = () => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${API_BASE_URL}/api/auth/github/`;
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const deleteAccount = async () => {
    try {
      await authService.deleteAccount();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Erro ao deletar conta:', error);
      throw error;
    }
  };  const refreshProfile = async () => {
    try {
      console.log('RefreshProfile: Iniciando...');
      const hasToken = authService.isAuthenticated();
      console.log('RefreshProfile: hasToken =', hasToken);
      
      if (hasToken) {
        console.log('RefreshProfile: Token encontrado, marcando como autenticado');
        setIsAuthenticated(true);
        
        try {
          console.log('RefreshProfile: Buscando dados do perfil...');
          const profile = await authService.getUserProfile();
          console.log('RefreshProfile: Perfil obtido:', profile.username);
          setUser(profile);
        } catch (error) {
          console.warn('RefreshProfile: Erro ao buscar perfil, mas mantendo autenticado:', error);
          setUser({
            username: 'Usuario',
            email: '',
            name: 'Usuario',
            avatar_url: undefined,
            bio: undefined,
            public_repos: 0,
            followers: 0,
            following: 0,
          });
        }
      } else {
        console.log('RefreshProfile: Sem token, marcando como não autenticado');
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('RefreshProfile: Erro geral:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      console.log('RefreshProfile: Finalizado');
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    deleteAccount,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};