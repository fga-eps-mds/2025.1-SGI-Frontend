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
  const checkAuthStatus = async () => {
    try {
      // Primeiro verificar se tem token salvo
      const hasToken = authService.isAuthenticated();
      
      if (hasToken) {
        try {
          // Tentar verificar com a API
          const authCheck = await authService.checkAuth();
          if (authCheck.authenticated) {
            setIsAuthenticated(true);
            // Buscar dados completos do perfil
            const profile = await authService.getUserProfile();
            setUser(profile);
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        } catch (error) {
          console.warn('API não disponível, mas token existe. Marcando como autenticado:', error);
          setIsAuthenticated(true);
          // Criar um usuário básico com dados dos tokens
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
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = () => {
    authService.initiateGitHubLogin();
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
      setIsLoading(true);
      const hasToken = authService.isAuthenticated();
      
      if (hasToken) {
        try {
          const authCheck = await authService.checkAuth();
          if (authCheck.authenticated) {
            setIsAuthenticated(true);
            const profile = await authService.getUserProfile();
            setUser(profile);
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        } catch (error) {
          console.warn('API não disponível durante refresh, mas token existe:', error);
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
      console.error('Erro ao atualizar perfil:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
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
