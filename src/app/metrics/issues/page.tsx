'use client'

import styles from './issues.module.css'
import Link from 'next/link'
import { motion } from 'framer-motion' 

export default function Commits(){

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.1 
        },
      },
      exit: {
        opacity: 0,
        transition: {
            duration: 0.2
        }
      }
    };
    
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };

    const commitsData = [
        { id: 'c1a2b3d4', content: '#1 REFACTOR: MELHORIA NA AUTENTICAÇÃO', date: '12/07/2025', xp: 15 },
        { id: 'e5f6g7h8', content: '#2 FIX: CORREÇÃO DE BUG NO HEADER', date: '11/07/2025', xp: 10 },
        { id: 'i9j0k1l2', content: '#3 FEATURE: ADIÇÃO DE ANIMAÇÕES', date: '10/07/2025', xp: 25 },
        { id: 'm3n4o5p6', content: '#4 DOCS: ATUALIZAÇÃO DO README', date: '09/07/2025', xp: 5 },
    ];


    return(
        <motion.main 
          className={styles.container}
          layoutId="issues-card-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
            <motion.div 
              className={styles.pageContentContainer} 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit" 
            >
                <motion.div variants={itemVariants} className={styles.Top}>
                    <Link href="/metrics" className={styles.link}>
                        <div className={styles.backButtonDiv}>
                            <span className={`${styles.icon} material-symbols-outlined`}>arrow_back</span> <p className={styles.BackButton}> Voltar</p>
                        </div>
                    </Link>
                    <div className={styles.titleDiv}>
                        <h1> ISSUES ABERTAS</h1>
                    </div>
                </motion.div>
                
                <div className={styles.pageBody}>
                    {commitsData.map((commit) => (
                        <motion.div key={commit.id} className={styles.card} variants={itemVariants}>
                            <div className={styles.cardIcon}><span className={`${styles.icon} material-symbols-outlined`}>commit</span></div>
                            <div className={styles.cardContent}>
                                <div className={styles.cardTitle}><strong>{commit.content}</strong></div>
                                <div className={styles.cardDate}>{commit.date}</div>
                            </div>
                            <div className={styles.cardID}> 
                                <div className={styles.cardXP}>
                                    <span className={`${styles.icon} material-symbols-outlined`}>trophy</span> 
                                    <p>{commit.xp}XP</p>
                                </div>
                                <div className={styles.cardIdentifier}><p>{commit.id}</p></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            
            <div className={styles.Bottom}>
            </div>
        </motion.main>
    );
}