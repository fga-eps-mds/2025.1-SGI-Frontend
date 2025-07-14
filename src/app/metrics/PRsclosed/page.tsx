'use client'

import styles from './PRsclosed.module.css'
import Link from 'next/link'

export default function PRsclosed(){

    return(
        <main className={styles.container}>
            <div className={styles.Top}>
                <Link href="/metrics" className={styles.link}>
                    <div className={styles.backButtonDiv}>
                         <span className={`${styles.icon} material-symbols-outlined`}>arrow_back</span> <p className={styles.BackButton}> Voltar</p>
                    </div>
                </Link>
                <div className={styles.titleDiv}>
                    <h1> PRs FECHADAS POR TERCEIROS</h1>
                </div>
            </div>
            <div className={styles.Bottom}>
            </div>
            <div className={styles.pageBody}>
                <div className={styles.card}>
                    <div className={styles.cardIcon}><span className={`${styles.icon} material-symbols-outlined`}>commit</span></div>
                    <div className={styles.cardContent}><div className={styles.cardTitle}><strong>#1 CONTEÚDO PR</strong></div><div className={styles.cardDate}>01/01/2025</div></div>
                    <div className={styles.cardID}> <div className={styles.cardXP}><span className={`${styles.icon} material-symbols-outlined`}>trophy</span> <p>5XP</p></div><div className={styles.cardIdentifier}><p>ID PR</p></div></div>
                </div>
            </div>
        </main>
    );
}