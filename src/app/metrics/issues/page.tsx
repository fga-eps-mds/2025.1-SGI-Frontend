'use client';

import styles from './issues.module.css';
import Link from 'next/link';
import { motion } from '@/components/FramerMotion/client-motion';
import { containerVariants, itemVariants } from '@/components/FramerMotion/motion-variants';

export default function Issues() {
    const issuesData = [
        { id: 'i1a2b3d4', content: '#1 BUG: Erro na página de login', date: '12/07/2025', xp: 20 },
        { id: 'i5f6g7h8', content: '#2 FEATURE: Implementar dark mode', date: '11/07/2025', xp: 30 },
        { id: 'i9j0k1l2', content: '#3 ENHANCEMENT: Melhorar performance', date: '10/07/2025', xp: 25 },
        { id: 'i3n4o5p6', content: '#4 BUG: Correção no menu mobile', date: '09/07/2025', xp: 15 },
    ];

    return (
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
                        <motion.div 
                            className={styles.backButtonDiv} 
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                            <span className={`${styles.icon} material-symbols-outlined`}>arrow_back</span> 
                            <p className={styles.BackButton}> Voltar</p>
                        </motion.div>
                    </Link>
                    <div className={styles.titleDiv}>
                        <h1> ISSUES ABERTAS</h1>
                    </div>
                </motion.div>
                
                <div className={styles.pageBody}>
                    {issuesData.map((issue) => (
                        <motion.div key={issue.id} className={styles.card} variants={itemVariants}>
                            <div className={styles.cardIcon}><span className={`${styles.icon} material-symbols-outlined`}>bug_report</span></div>
                            <div className={styles.cardContent}>
                                <div className={styles.cardTitle}><strong>{issue.content}</strong></div>
                                <div className={styles.cardDate}>{issue.date}</div>
                            </div>
                            <div className={styles.cardID}> 
                                <div className={styles.cardXP}>
                                    <span className={`${styles.icon} material-symbols-outlined`}>trophy</span> 
                                    <p>{issue.xp}XP</p>
                                </div>
                                <div className={styles.cardIdentifier}><p>{issue.id}</p></div>
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