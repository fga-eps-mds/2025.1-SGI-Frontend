'use client';

import styles from './PRsdone.module.css';
import Link from 'next/link';
import { motion } from '@/components/FramerMotion/client-motion';
import { containerVariants, itemVariants } from '@/components/FramerMotion/motion-variants';

export default function PRsdone() {
    const prsDoneData = [
        { id: 'pr1a2b3d4', content: '#1 MERGE: Implementação do sistema de login', date: '12/07/2025', xp: 40 },
        { id: 'pr5f6g7h8', content: '#2 MERGE: Correção de bugs críticos', date: '11/07/2025', xp: 35 },
        { id: 'pr9j0k1l2', content: '#3 MERGE: Adição de testes unitários', date: '10/07/2025', xp: 30 },
        { id: 'pr3n4o5p6', content: '#4 MERGE: Melhoria na documentação', date: '09/07/2025', xp: 20 },
    ];

    return (
        <motion.main 
          className={styles.container}
          layoutId="PRsdone-card-container"
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
                        <h1> PULL REQUESTS CONCLUÍDOS</h1>
                    </div>
                </motion.div>
                
                <div className={styles.pageBody}>
                    {prsDoneData.map((pr) => (
                        <motion.div key={pr.id} className={styles.card} variants={itemVariants}>
                            <div className={styles.cardIcon}><span className={`${styles.icon} material-symbols-outlined`}>merge</span></div>
                            <div className={styles.cardContent}>
                                <div className={styles.cardTitle}><strong>{pr.content}</strong></div>
                                <div className={styles.cardDate}>{pr.date}</div>
                            </div>
                            <div className={styles.cardID}> 
                                <div className={styles.cardXP}>
                                    <span className={`${styles.icon} material-symbols-outlined`}>trophy</span> 
                                    <p>{pr.xp}XP</p>
                                </div>
                                <div className={styles.cardIdentifier}><p>{pr.id}</p></div>
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