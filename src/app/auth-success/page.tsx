import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

export default function AuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshProfile } = useAuth();
  useEffect(() => {
    const handleAuthSuccess = async () => {
      try {
        // Obter os tokens dos parâmetros da URL, caso vocês adicionem mais dados puxando do login do github o de token do backend, pode adicionar aqui em baixo
        const accessToken = searchParams.get('access_token');
        const refreshToken = searchParams.get('refresh_token');
        const username = searchParams.get('username');
        const email = searchParams.get('email');

        if (accessToken && refreshToken) {
          // Salvar tokens, para ficar mais fácil de usar depois
          authService.saveTokens({
            access_token: accessToken,
            refresh_token: refreshToken
          });

          try {
            await refreshProfile();
          } catch (error) {
            console.warn('Erro ao atualizar perfil', error);
          }

          // Redirecionar para o perfil
          setTimeout(() => {
            router.push('/profile');
          }, 1000);
        } else {
          console.error('Tokens não encontrados nos parâmetros');
          router.push('/?error=no_tokens');
        }
      } catch (error) {
        console.error('Erro ao processar autenticação:', error);
        router.push('/?error=auth_processing_failed');
      }
    };

    handleAuthSuccess();
  }, [router, searchParams, refreshProfile]);

  // Feedback visual para o usuário, tive problema ao carregar o perfil, caso não carregar o perfil por n motivos, ele ficará travado nessa etapa
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column' 
    }}>
      <h2>Login realizado com sucesso!</h2>
      <p>Redirecionando para seu perfil...</p>
    </div>
  );
}
