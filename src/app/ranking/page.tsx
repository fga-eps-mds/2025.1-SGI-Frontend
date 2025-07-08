import styles from './ranking.module.css'
import Image from 'next/image';

export default function Ranking(){
    return(
        <main className={styles.container}>
            <div className={styles.leftPanel}>
                <div className={styles.userImage}>
                    <Image src="/sample_profile.png" alt="Avatar" width={200} height={200} className={styles.userImage} />
                </div>
                <div className={styles.infoUser}> 
                    <p>nome usuario</p>
                    <p>Experiência:</p>
                    <p>nível 5</p>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.rankingButton}>Ranking</div>
                    <div className={styles.objectivesButton}>Objetivos</div>
                </div>

            </div>
            <div className={styles.rigthPanel}>
                <div className={styles.topPart}></div>
                <div className={styles.bottomPart}></div>

            </div>

        </main>
    );
}