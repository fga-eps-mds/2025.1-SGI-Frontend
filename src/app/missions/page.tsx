'use client';
import styles from './missions.module.css';
import Link from 'next/link';

export default function Missions(){

    return(

        <main className={styles.container}>
            <div className={styles.mainPanel}>
                <div className={styles.missionsTitle}>
                    <h3> Missões</h3>
                </div>
                <Link href="/rewards_history" className={styles.rewardsBox}>
                    <span className="material-icons">history</span>
                    <span>Histórico de recompensas</span>
                </Link>
                 <div className={styles.tabs}>
                    <span>Diárias</span>
                    <span>Semanais</span>
                    <span>Mensais</span>
                </div>
                <div className={styles.choiceBar}></div>
                <div className={styles.separationBar}></div>
                <div className={styles.boxSpace}>
                    <div className={styles.taskBox}>
                        <div className={styles.rewardTitle}>
                        <span className="material-symbols-outlined">rewarded_ads</span>
                        <span>50XP</span>
                        </div>
                        <div className={styles.taskContent}>
                            <div className={styles.checkPosition}>
                                <span className="material-icons">check_box_outline_blank</span>
                            </div>
                            <div className={styles.taskTitle}>Finalizar 2 issues</div>
                        </div>
                        <div className={styles.xpBar}>
                            <div className={styles.xpFill} style={{ width: '50%' }}></div>
                        </div>
                    </div>
                    <div className={styles.taskBox}>
                        <div className={styles.rewardTitle}>
                        <span className="material-symbols-outlined">rewarded_ads</span>
                        <span>100XP</span>
                    </div>
                        <div className={styles.taskContent}>
                            <div className={styles.checkPosition}>
                                <span className="material-icons">check_box_outline_blank</span>
                            </div>
                            <div className={styles.taskTitle}>Fechar um Pull Request</div>
                        </div>
                        <div className={styles.xpBar}></div>
                    </div>
                    <div className={styles.taskBox}>
                        <div className={styles.rewardTitle}>
                        <span className="material-symbols-outlined">rewarded_ads</span>
                        <span>+100XP</span>
                    </div>
                        <div className={styles.taskContent}>
                            <div className={styles.checkPosition}>
                                <span className= {`material-icons ${styles.check_boxIcon}`}>check_box</span>
                            </div>
                            <div className={styles.taskTitle}>Pull Request aceito</div>
                        </div>
                        <div className={styles.xpBar}>
                            <div className={styles.xpFull}></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>    
        















    )
}