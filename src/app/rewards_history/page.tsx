'use client';
import styles from './rewards_history.module.css';
import Link from 'next/link';

export default function Rewards_history(){
    
    return(

        <main className={styles.container}>
            <Link href="/missions" className={styles.backButton}>
                <span className="material-icons">arrow_back</span>
                <span>Voltar</span>
            </Link>
            <div className={styles.mainPanel}>
                <div className={styles.rewardsTitle}>
                    <h3> Histórico de recompensa</h3>
                </div>
                <div className={styles.tabs}>
                    <span>Hoje</span>
                    <span>Essa semana</span>
                    <span>Esse mês</span>
                </div>
                <div className={styles.choiceBar}></div>
                <div className={styles.separationBar}></div>
                <div className={styles.xpTitle}>
                    <h1>100 XP</h1>
                </div>
                <div className={styles.boxSpace}>
                    <div className={styles.taskBox}>
                        <div className={styles.taskTitle}>Pull Request aceito</div>
                        <div className={styles.rewardTitle}>
                            <span>+50 XP</span>
                        </div>
                    </div>
                    <div className={styles.taskBox}>
                        <div className={styles.taskTitle}>Fechar um Pull Request</div>
                        <div className={styles.rewardTitle}>
                            <span>+25 XP</span>
                        </div>
                    </div>
                    <div className={styles.taskBox}>
                        <div className={styles.taskTitle}>Finalizar 2 issues</div>
                        <div className={styles.rewardTitle}>
                            <span>+25 XP</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>














    )
}
