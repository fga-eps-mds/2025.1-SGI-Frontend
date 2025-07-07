'use client'

import styles from './commits.module.css'


export default function Commits(){

    return(
        <main>
            <div className={styles.Top}>
                <p className={styles.BackButton}> Voltar</p>
                <h1> COMMITS REALIZADAS</h1>
            </div>
            <div className={styles.Bottom}>

            </div>
        </main>
    );
}