'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from '@/components/FramerMotion/client-motion';
import { containerVariants, itemVariants, pageTransitionVariants } from '@/components/FramerMotion/motion-variants';

interface MetricItem {
  id: string;
  content: string;
  date: string;
  xp: number;
}

interface MetricsPageLayoutProps {
  title: string;
  layoutId: string;
  data: MetricItem[];
  styles: {
    readonly [key: string]: string;
  };
  children?: ReactNode;
}

export default function MetricsPageLayout({ 
  title, 
  layoutId, 
  data, 
  styles,
  children 
}: MetricsPageLayoutProps) {
  return (
    <motion.main 
      className={styles.container}
      layoutId={layoutId}
      {...pageTransitionVariants}
    >
      <motion.div 
        className={styles.pageContentContainer} 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div className={styles.header} variants={itemVariants}>
          <h1 className={styles.title}>{title}</h1>
          <Link href="/metrics" className={styles.backButton}>
            ← Voltar para Métricas
          </Link>
        </motion.div>

        <motion.div className={styles.metricsGrid} variants={itemVariants}>
          {data.map((item) => (
            <motion.div
              key={item.id}
              className={styles.metricCard}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.cardHeader}>
                <span className={styles.commitId}>{item.id}</span>
                <span className={styles.date}>{item.date}</span>
              </div>
              <div className={styles.commitContent}>
                {item.content}
              </div>
              <div className={styles.xpBadge}>
                +{item.xp} XP
              </div>
            </motion.div>
          ))}
        </motion.div>

        {children}
      </motion.div>
    </motion.main>
  );
}
