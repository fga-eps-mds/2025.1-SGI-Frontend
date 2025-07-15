'use client';

import Link from 'next/link';
import { motion } from '@/components/FramerMotion/client-motion';
import { containerVariants, itemVariants } from '@/components/FramerMotion/motion-variants';

interface MetricItem {
  id: string;
  content: string;
  date: string;
  xp: number;
}

interface MetricsPageProps {
  title: string;
  layoutId: string;
  data: MetricItem[];
  iconName: string;
  styles: {
    readonly [key: string]: string;
  };
}

export default function MetricsPage({ 
  title, 
  layoutId, 
  data, 
  iconName,
  styles
}: MetricsPageProps) {
  return (
    <motion.main 
      className={styles.container}
      layoutId={layoutId}
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
            <h1>{title}</h1>
          </div>
        </motion.div>
        
        <div className={styles.pageBody}>
          {data.map((item) => (
            <motion.div key={item.id} className={styles.card} variants={itemVariants}>
              <div className={styles.cardIcon}>
                <span className={`${styles.icon} material-symbols-outlined`}>{iconName}</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardTitle}><strong>{item.content}</strong></div>
                <div className={styles.cardDate}>{item.date}</div>
              </div>
              <div className={styles.cardID}> 
                <div className={styles.cardXP}>
                  <span className={`${styles.icon} material-symbols-outlined`}>trophy</span> 
                  <p>{item.xp}XP</p>
                </div>
                <div className={styles.cardIdentifier}><p>{item.id}</p></div>
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
