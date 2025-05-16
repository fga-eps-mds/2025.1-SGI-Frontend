'use client'

import styles from './page.module.css'; // importando os estilos do arquivo page.module.css

export default function Home() { // definir o componente principal da página 
  return (
    <>
      {/* Primeira seção com retângulos */}
      <main> {/* tag semântica para o conteúdo principal */}
        <div className={styles.retanguloTopo}></div> {/* aplicar a classe importada */}
        <div className={styles.retanguloEntrar}>
          Entrar
        </div>
      </main>

      {/* Segunda seção com login do GitHub */}
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