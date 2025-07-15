'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function CallbackContent() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const errorParam = searchParams?.get('error');

        if (errorParam) {
          console.error('OAuth error:', errorParam);
          setError('Erro na autenticação. Tente novamente.');
          setIsLoading(false);
          return;
        }

        console.log('Aguardando processamento do backend...');
        
      } catch (err) {
        console.error('Callback error:', err);
        setError('Erro no processamento da autenticação.');
        setIsLoading(false);
      }
    };

    handleCallback();
  }, [router, searchParams]);

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
    <Suspense fallback={<div>Carregando...</div>}>
      <CallbackContent />
    </Suspense>
  );
}