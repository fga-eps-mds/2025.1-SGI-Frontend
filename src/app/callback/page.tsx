'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function CallbackContent() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isLoading && !hasProcessed) {
      const handleCallback = async () => {
        try {
          const code = searchParams?.get('code');
          const errorParam = searchParams?.get('error');

          const processedCode = sessionStorage.getItem('processed_code');
          if (processedCode === code) {
            console.log('Código já foi processado, redirecionando...');
            setError('Login já processado, redirecionando...');
            setTimeout(() => router.push('/profile'), 1000);
            return;
          }

          if (errorParam) {
            console.error('Erro na autenticação GitHub:', errorParam);
            setError('Erro na autenticação GitHub');
            return;
          }

          if (!code) {
            console.error('Código de autorização não encontrado');
            setError('Código de autorização não encontrado');
            return;
          }

          setIsLoading(true);
          setHasProcessed(true);
          sessionStorage.setItem('processed_code', code);

          const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
          
          const response = await fetch(`${API_BASE_URL}/callback/?code=${code}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro na resposta do backend:', errorText);
            throw new Error(`Erro na resposta: ${response.status} - ${errorText}`);
          }

          const data = await response.json();
          
          if (data.access_token) {
            localStorage.setItem('access_token', data.access_token);
            if (data.refresh_token) {
              localStorage.setItem('refresh_token', data.refresh_token);
            }
            
            sessionStorage.removeItem('processed_code');
            router.push('/profile');
          } else {
            throw new Error('Token não recebido');
          }
          
        } catch (error) {
          console.error('Erro no callback:', error);
          setError('Falha ao fazer login com o GitHub');
          setIsLoading(false);
          setHasProcessed(false);
        }
      };

      handleCallback();
    }
  }, [router, searchParams, isLoading, hasProcessed]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column' 
    }}>
      {error ? (
        <>
          <h2>Erro na autenticação</h2>
          <p>{error}</p>
          <button 
            onClick={() => router.push('/')}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Voltar ao início
          </button>
        </>
      ) : isLoading ? (
        <>
          <h2>Autenticando...</h2>
          <p>Por favor aguarde enquanto processamos seu login.</p>
        </>
      ) : (
        <>
          <h2>Redirecionando...</h2>
          <p>Preparando sua sessão...</p>
        </>
      )}
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column' 
      }}>
        <h2>Carregando...</h2>
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}