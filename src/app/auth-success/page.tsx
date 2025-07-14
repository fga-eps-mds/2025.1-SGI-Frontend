'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

export default function AuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshProfile } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleAuthSuccess = async () => {
      try {
        console.log('=== AUTH SUCCESS - Iniciando processamento ===');
        console.log('URL atual:', window.location.href);
        console.log('SearchParams:', searchParams.toString());
        
        timeoutId = setTimeout(() => {
          console.log('Timeout atingido, redirecionando...');
          setError('Redirecionando automaticamente...');
          router.replace('/profile');
        }, 5000);
        
        const accessToken = searchParams.get('access_token');
        const refreshToken = searchParams.get('refresh_token');
        const username = searchParams.get('username');
        const email = searchParams.get('email');

        console.log('Tokens encontrados:', {
          accessToken: accessToken ? accessToken.substring(0, 20) + '...' : 'ausente',
          refreshToken: refreshToken ? refreshToken.substring(0, 20) + '...' : 'ausente',
          username,
          email
        });

        if (accessToken && refreshToken) {
          
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('refresh_token', refreshToken);

          try {
            await refreshProfile();
            console.log('Contexto atualizado com sucesso');
          } catch (error) {
            console.warn('Erro ao atualizar contexto, mas continuando:', error);
          }

          clearTimeout(timeoutId);
          setIsProcessing(false);
          
          setTimeout(() => {
            router.replace('/profile');
          }, 500);
        } else {
          console.error('Parâmetros disponíveis:', Array.from(searchParams.entries()));
          clearTimeout(timeoutId);
          setError('Tokens não encontrados na URL');
          
          setTimeout(() => {
            console.log('Tentando redirecionar para perfil mesmo sem tokens...');
            router.replace('/profile');
          }, 2000);
        }
      } catch (error) {
        console.error('Erro ao processar autenticação:', error);
        clearTimeout(timeoutId);
        setError('Erro no processamento - redirecionando...');
        setTimeout(() => router.replace('/profile'), 1000);
      }
    };

    const delayedStart = setTimeout(() => {
      handleAuthSuccess();
    }, 100);
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (delayedStart) clearTimeout(delayedStart);
    };
  }, [router, searchParams]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      backgroundColor: '#1E2432',
      color: 'white',
      fontFamily: 'var(--font-roboto), sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '10px' }}>Login realizado com sucesso!</h2>
        <p style={{ marginBottom: '20px', opacity: 0.9 }}>
          {error ? error : 'Processando e redirecionando...'}
        </p>
        
        {isProcessing && !error && (
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid #5F29F4', 
            borderTop: '3px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '20px auto'
          }} />
        )}
      </div>
      
      {error && (
        <button 
          onClick={() => router.replace('/')}
          style={{
            background: '#DC3545',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            marginTop: '15px'
          }}
        >
          Voltar ao Inicio
        </button>
      )}
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}