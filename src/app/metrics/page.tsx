'use client';
import styles from './metrics.module.css';
import Image from 'next/image';
import Link from 'next/link';


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
            <div className={styles.xp}><span className={`material-symbols-outlined`}>star</span><p> Experiência: 390/1000</p></div>
            <p> Nível 10</p>
          </div>
          <div className={styles.separationBar}></div>
          <div className={styles.achievements}>
            <div className={styles.achievementsTitle}>
              <span className={`${styles.icon} material-symbols-outlined`}>trophy</span><h3> Conquistas</h3>
            </div>
            <div className={styles.badges}>
              <div  className={styles.active}><span className={`${styles.icon} material-symbols-outlined`}>filter_1</span><span>Primeiro PR</span></div>
              <div  className={styles.active}><span className={`${styles.icon} material-symbols-outlined`}>commit</span><span>100 Commits</span></div>
              <div><span className={`${styles.icon} material-symbols-outlined`}>groups</span><span>Líder de Equipe</span></div>
              <div  className={styles.active}><span className={`${styles.icon} material-symbols-outlined`}>bug_report</span><span >Caçador de Bugs</span></div>
              <div><span className={`${styles.icon} material-symbols-outlined`}>star_shine</span><span>Estrela do Mês</span></div>
              <div><span className={`${styles.icon} material-symbols-outlined`}>rocket</span><span>Contribuidor VIP</span></div>
            </div>
          </div>
        </section>
          <section className={styles.rightPanel}>
            <div className={styles.containerMetrics}>
              <div className={styles.titleMetrics}><span className={`${styles.icon} material-symbols-outlined`}>dashboard</span> <h3> RESUMO</h3></div>
              <div className={styles.metrics}>
                <Link href={"/metrics/commits"} className={styles.linkCard}>
                  <div> <span className={`${styles.icon} material-symbols-outlined`}>commit</span>Total de commits: <strong className={styles.quantityMetric}>120</strong></div>
                </Link>
                <Link href={"/metrics/openPRs"} className={styles.linkCard}>
                  <div> <span className={`${styles.icon} material-symbols-outlined`}>graph_1</span>Total de pull requests abertos: <strong className={styles.quantityMetric}>8</strong></div>
                </Link>
                <Link href={"/metrics/issues"} className={styles.linkCard}>
                  <div> <span className={`${styles.icon} material-symbols-outlined`}>error</span>Total de issues abertas: <strong className={styles.quantityMetric}>15</strong></div>
                </Link>
                <Link href={"/metrics/PRsdone"} className={styles.linkCard}>
                  <div> <span className={`${styles.icon} material-symbols-outlined`}>task</span>Total de PRs de terceiros fechados: <strong className={styles.quantityMetric}>5</strong></div>
                </Link>
                <Link href={"/metrics/PRsclosed"} className={styles.linkCard}>
                  <div> <span className={`${styles.icon} material-symbols-outlined`}>task_alt</span>Total de PRs resolvidos por terceiros: <strong className={styles.quantityMetric}>4</strong></div>
                </Link>
                <Link href={"/metrics/merges"} className={styles.linkCard}>
                  <div> <span className={`${styles.icon} material-symbols-outlined`}>merge</span>Total de merges: <strong className={styles.quantityMetric}>11</strong></div>
                </Link>
              </div>
              <div className={styles.points}><span className={`${styles.icon} material-symbols-outlined`}>trophy</span> <p>Total de pontos: <strong>850</strong></p></div>
            </div>
                      <Link href="/metrics#statistics" className={styles.link}><div className={styles.statisticsScroll}> ESTATÍSTICAS GERAIS <span className={`material-symbols-outlined ${styles.iconRight}`}>arrow_downward</span></div></Link>  
          </section>
      </div>
      <div id='statistics' className={styles.bottomPanel}>
        <div  className={styles.statisticCard}>
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