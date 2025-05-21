'use client'

import styles from './page.module.css'; // importando os estilos do arquivo page.module.css

export default function Home() { // definir o componente principal da página

  const handleGitHubLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const redirectUri = `${window.location.origin}/api/auth/callback/github`;

    const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;

    //window.location.href = githubOAuthUrl;

    //mock: simula como se tivesse voltado do github
    window.location.href = '/api/auth/callback/github?code=CODIGO_TESTE'
  };

  return (
    <>

      {/* Terceira seção com login do GitHub */}
      <div className={styles.container}>
        <div className={styles.card}>
          <button 
            className={styles.button} 
            onClick={handleGitHubLogin}
          >
            <img src="/github_icon.png" alt="GitHub Logo" className={styles.icon} />
            <span>Logar com GitHub</span>
          </button>
        </div>
      </div>
    </>
  );
}