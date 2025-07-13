'use client';
import styles from './mission_detail.module.css';
import Link from 'next/link';

export default function Mission_detail(){
    return(

        <main className={styles.container}>
            <Link href="/missions" className={styles.backButton}>
                <span className="material-icons">arrow_back</span>
                <span>Voltar</span>
            </Link>
            <div className={styles.mainPanel}>
                <div className={styles.missionTitle}>
                    <h3> Missão</h3>
                </div>
                <div className={styles.separationBar}></div>
                <div className={styles.detailPanel}>
                    <div className={styles.detailTitle}>
                        <h3> Finalizar 2 issues</h3>
                    </div>
                    <div className={styles.detailExplanation}>
                        <span>Trabalhe em duas issues  e finalize-as conforme o andamento</span>
                    </div>
                <div className={styles.detail_separationBar}></div>
                <div className={styles.tabs}>
                    <div className={styles.infoTitle}>
                        <span>Tipo</span>
                        <span>Status</span>
                        <span>Recompensa</span>
                    </div>
                    <div className={styles.infoDescription}>
                        <span>Diária</span>
                        <span>Em progresso</span>
                        <span>+50xp</span>
                    </div>
                    </div>
                <div className={styles.xpBar}>
                    <div className={styles.xpFill} style={{ width: '50%' }}></div>
                </div>
                </div>
                <div className={styles.completedBox}>
                    <span>Marcar como concluída</span>
                </div>
            </div>
        </main>



















    )
}