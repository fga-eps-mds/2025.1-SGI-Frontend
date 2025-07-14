'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams?.get('code');
        const error = searchParams?.get('error');

        if (error) {
          console.error('Erro na autenticação GitHub:', error);
          router.push('/?error=auth_failed');
          return;
        }

        if (!code) {
          console.error('Código de autorização não encontrado');
          router.push('/?error=no_code');
          return;
        }

        window.location.href = `http://localhost:8000/callback/?code=${code}`;
        
      } catch (error) {
        console.error('Erro no callback:', error);
        router.push('/?error=callback_failed');
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
      <h2>Processando login...</h2>
      <p>Aguarde enquanto finalizamos seu login com GitHub.</p>
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