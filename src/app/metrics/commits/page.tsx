'use client'

import styles from './commits.module.css'
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


    return(
        <motion.main 
          className={styles.container}
          layoutId="commits-card-container"
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
                        <h1> COMMITS REALIZADAS</h1>
                    </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className={styles.pageBody}>
                    <div className={styles.card}>
                        <div className={styles.cardIcon}><span className={`${styles.icon} material-symbols-outlined`}>commit</span></div>
                        <div className={styles.cardContent}><div className={styles.cardTitle}><strong>#1 CONTEÚDO COMMIT</strong></div><div className={styles.cardDate}>01/01/2025</div></div>
                        <div className={styles.cardID}> <div className={styles.cardXP}><span className={`${styles.icon} material-symbols-outlined`}>trophy</span> <p>5XP</p></div><div className={styles.cardIdentifier}><p>ID Commit</p></div></div>
                    </div>
                </motion.div>
            </motion.div>
            
            <div className={styles.Bottom}>
            </div>
        </motion.main>
    );
}