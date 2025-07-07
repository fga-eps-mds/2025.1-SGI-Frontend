'use client'

import styles from './commits.module.css'


export default function Commits(){

    return(
        <main className={styles.container}>
            <div className={styles.Top}>
                <div className={styles.backButtonDiv}>
                     <span className={`${styles.icon} material-symbols-outlined`}>arrow_back</span> <p className={styles.BackButton}> Voltar</p>
                </div>
                <div className={styles.titleDiv}>
                    <h1> COMMITS REALIZADAS</h1>
                </div>
            </div>
            <div className={styles.Bottom}>

            </div>
        </main>
    );
}