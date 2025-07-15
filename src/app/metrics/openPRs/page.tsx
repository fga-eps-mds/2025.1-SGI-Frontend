'use client';

import styles from './openPRs.module.css';
import Link from 'next/link';
import { motion } from '@/components/FramerMotion/client-motion';
import { containerVariants, itemVariants } from '@/components/FramerMotion/motion-variants';

export default function OpenPRs() {
    const openPRsData = [
        { id: 'pro1a2b3d4', content: '#1 OPEN: Implementação de filtros avançados', date: '12/07/2025', xp: 0 },
        { id: 'pro5f6g7h8', content: '#2 OPEN: Correção de responsividade', date: '11/07/2025', xp: 0 },
        { id: 'pro9j0k1l2', content: '#3 OPEN: Adição de gráficos interativos', date: '10/07/2025', xp: 0 },
        { id: 'pro3n4o5p6', content: '#4 OPEN: Melhoria na acessibilidade', date: '09/07/2025', xp: 0 },
    ];


    return(
        <motion.main 
          className={styles.container}
          layoutId="openPRs-card-container"
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
                        <h1> PULL REQUESTS ABERTOS</h1>
                    </div>
                </motion.div>
                
                <div className={styles.pageBody}>
                    {openPRsData.map((pr) => (
                        <motion.div key={pr.id} className={styles.card} variants={itemVariants}>
                            <div className={styles.cardIcon}><span className={`${styles.icon} material-symbols-outlined`}>pending</span></div>
                            <div className={styles.cardContent}>
                                <div className={styles.cardTitle}><strong>{pr.content}</strong></div>
                                <div className={styles.cardDate}>{pr.date}</div>
                            </div>
                            <div className={styles.cardID}> 
                                <div className={styles.cardXP}>
                                    <span className={`${styles.icon} material-symbols-outlined`}>hourglass_empty</span> 
                                    <p>Aguardando</p>
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