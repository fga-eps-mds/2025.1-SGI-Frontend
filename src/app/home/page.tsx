'use client';
import styles from './metrics.module.css';
import Image from 'next/image';


export default function Home() {

    return(
        <main className={styles.container}>
      <div className={styles.topPanel}>
        <section className={styles.leftPanel}>
          <div className={styles.userCard}>
            <div >
              <Image src="/sample_profile.png" alt="Avatar" width={120} height={120} className={styles.profileImage} />
            </div>
            <h2>nome usuário</h2>
            <p className={styles.rank}> Mestre dos Pull Requests</p>
            <div className={styles.xpBar}>
              <div className={styles.xpFill} style={{ width: '39%' }}></div>
            </div>
            <p> Experiência: 390/1000</p>
            <p> Nível 10</p>
          </div>
          <div className={styles.separationBar}></div>
          <div className={styles.achievements}>
            <div className={styles.achievementsTitle}>
              <h3> Conquistas</h3>
            </div>
            <div className={styles.badges}>
              <span className={styles.active}>Primeiro PR</span>
              <span className={styles.active}>100 Commits</span>
              <span>Líder de Equipe</span>
              <span className={styles.active}>Caçador de Bugs</span>
              <span>Estrela do Mês</span>
              <span>Contribuidor VIP</span>
            </div>
          </div>
        </section>
          <section className={styles.rightPanel}>
            <div className={styles.containerMetrics}>
              <h3> RESUMO</h3>
              <div className={styles.metrics}>
                <div>Total de commits: <strong>120</strong></div>
                <div>Total de issues abertas: <strong>15</strong></div>
                <div>Total de pull requests abertos: <strong>8</strong></div>
                <div>Total de PRs de terceiros fechados: <strong>5</strong></div>
                <div>Total de PRs resolvidos por terceiros: <strong>4</strong></div>
                <div>Total de merges: <strong>11</strong></div>
              </div>
              <div className={styles.points}> Total de pontos: <strong>850</strong></div>
            </div>
                        <div className={styles.statisticsScroll}> ESTATÍSTICAS GERAIS</div>
          </section>
      </div>
      <div className={styles.bottomPanel}>
        <div className={styles.statisticCard}>
          <h3 className={styles.statisticCardTitle}>COMMITS</h3>
          <p className={styles.statisticCardContent}>Commits desde a criação da conta:</p>
          <p className={styles.statisticCardContent}>Última semana:</p>
          <p className={styles.statisticCardContent}>Repositório com mais commits:</p>
        </div>
        <div className={styles.statisticCard}>
          <h3 className={styles.statisticCardTitle}>ISSUES</h3>
          <p className={styles.statisticCardContent}>Issues cadastradas desde a criação da conta:</p>
          <p className={styles.statisticCardContent}>Última semana:</p>
          <p className={styles.statisticCardContent}>Repositório com mais issues cadastradas:</p>
        </div>
        <div className={styles.statisticCard}>
          <h3 className={styles.statisticCardTitle}>MERGES</h3>
          <p className={styles.statisticCardContent}>Merges desde a criação da conta:</p>
          <p className={styles.statisticCardContent}>Última semana:</p>
          <p className={styles.statisticCardContent}>Repositório com mais merges:</p>
        </div>
        <div className={styles.statisticCard}>
          <h3 className={styles.statisticCardTitle}>PULL REQUESTS</h3>
          <p className={styles.statisticCardContent}>Abertos:</p>
          <p className={styles.statisticCardContent}>Última semana:</p>
          <p className={styles.statisticCardContent}>Repositório com mais commits:</p>
        </div>
        <div className={styles.statisticCard}>
          <h3 className={styles.statisticCardTitle}>TOTAL DE PONTOS</h3>
        </div>
      </div>

    </main>        
    );
}