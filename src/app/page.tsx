'use client'

import styles from './page.module.css'; // importando os estilos do arquivo page.module.css

export default function Home() { // definir o componente principal da página 
  return (
    <>

      {/* Segunda seção com icone do GitFica*/}
      <div className={styles.logoContainer}>
        <img src="gitfica_icon.png" alt= "GitFica Logo" className={styles.logoIcon} />
        <span>GitFica</span>
        </div>

      {/* Terceira seção com login do GitHub */}
      <div className={styles.container}>
        <div className={styles.card}>
          <button 
            className={styles.button} 
            onClick={() => window.location.href = 'https://github.com/'}
          >
            <img src="/github_icon.png" alt="GitHub Logo" className={styles.icon} />
            <span>Logar com GitHub</span>
          </button>
        </div>
      </div>
    </>
  );
}