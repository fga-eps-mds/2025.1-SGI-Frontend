'use client';
import styles from './metrics.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MotionLink = motion(Link);

export default function Home() {

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    };

    const bottomContainerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delay: 0.5,
          staggerChildren: 0.1,
        },
      },
    };
    
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };

    const achievementsData = [
      { active: false, icon: 'filter_1', text: 'Primeiro PR' },
      { active: false, icon: 'commit', text: '100 Commits' },
      { active: false, icon: 'groups', text: 'Líder de Equipe' },
      { active: false, icon: 'bug_report', text: 'Caçador de Bugs' },
      { active: false, icon: 'star_shine', text: 'Estrela do Mês' },
      { active: false, icon: 'rocket', text: 'Contribuidor VIP' },
    ];

    return(
        <motion.main 
            className={styles.container}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
      <div className={styles.topPanel}>
        <motion.section 
            className={styles.leftPanel}
            variants={itemVariants}
        >
          <div className={styles.userCard}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 150 }}
            >
              <Image src="/sample_profile.png" alt="Avatar" width={120} height={120} className={styles.profileImage} />
            </motion.div>
            <h2>nome usuário</h2>
            <p className={styles.rank}> Mestre dos Pull Requests</p>
            <div className={styles.xpBar}>
              <motion.div 
                className={styles.xpFill} 
                initial={{ width: '0%' }}
                animate={{ width: '39%' }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <div className={styles.xp}><span className={`material-symbols-outlined`}>star</span><p> Experiência: 390/1000</p></div>
            <p> Nível 10</p>
          </div>
          <div className={styles.separationBar}></div>
          <motion.div 
            className={styles.achievements}
            variants={containerVariants}
          >
            <div className={styles.achievementsTitle}>
              <span className={`${styles.icon} material-symbols-outlined`}>trophy</span><h3> Conquistas</h3>
            </div>
            <div className={styles.badges}>
              {achievementsData.map((ach, index) => (
                <motion.div
                  key={index}
                  className={ach.active ? styles.active : ''}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, color: '#fff' }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <span className={`${styles.icon} material-symbols-outlined`}>{ach.icon}</span>
                  <span>{ach.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

          <motion.section 
            className={styles.rightPanel}
            variants={itemVariants}
          >
            <motion.div 
                className={styles.containerMetrics}
                variants={containerVariants}
            >
              <div className={styles.titleMetrics}><span className={`${styles.icon} material-symbols-outlined`}>dashboard</span> <h3> RESUMO</h3></div>
              <div className={styles.metrics}>
                <MotionLink href={"/metrics/commits"} className={styles.linkCard} variants={itemVariants} whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
                    <div> <span className={`${styles.icon} material-symbols-outlined`}>commit</span>Total de commits: <strong className={styles.quantityMetric}>120</strong></div>
                </MotionLink>
                <MotionLink href={"/metrics/openPRs"} className={styles.linkCard} variants={itemVariants} whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
                    <div> <span className={`${styles.icon} material-symbols-outlined`}>graph_1</span>Total de pull requests abertos: <strong className={styles.quantityMetric}>8</strong></div>
                </MotionLink>
                <MotionLink href={"/metrics/issues"} className={styles.linkCard} variants={itemVariants} whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
                    <div> <span className={`${styles.icon} material-symbols-outlined`}>error</span>Total de issues abertas: <strong className={styles.quantityMetric}>15</strong></div>
                </MotionLink>
                <MotionLink href={"/metrics/PRsdone"} className={styles.linkCard} variants={itemVariants} whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
                    <div> <span className={`${styles.icon} material-symbols-outlined`}>task</span>Total de PRs de terceiros fechados: <strong className={styles.quantityMetric}>5</strong></div>
                </MotionLink>
                <MotionLink href={"/metrics/PRsclosed"} className={styles.linkCard} variants={itemVariants} whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
                    <div> <span className={`${styles.icon} material-symbols-outlined`}>task_alt</span>Total de PRs resolvidos por terceiros: <strong className={styles.quantityMetric}>4</strong></div>
                </MotionLink>
                <MotionLink href={"/metrics/merges"} className={styles.linkCard} variants={itemVariants} whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
                    <div> <span className={`${styles.icon} material-symbols-outlined`}>merge</span>Total de merges: <strong className={styles.quantityMetric}>11</strong></div>
                </MotionLink>
              </div>
              <div className={styles.points}><span className={`${styles.icon} material-symbols-outlined`}>trophy</span> <p>Total de pontos: <strong>850</strong></p></div>
            </motion.div>
                      <Link href="/metrics#statistics" className={styles.link}><div className={styles.statisticsScroll}> ESTATÍSTICAS GERAIS <span className={`material-symbols-outlined ${styles.iconRight}`}>arrow_downward</span></div></Link>  
          </motion.section>
      </div>

      <motion.div 
        id='statistics' 
        className={styles.bottomPanel}
        variants={bottomContainerVariants}
      >
        <motion.div variants={itemVariants} className={styles.statisticCard}>
          <h3 className={styles.statisticCardTitle}>COMMITS</h3>
          <p className={styles.statisticCardContent}>Commits desde a criação da conta:</p>
          <p className={styles.statisticCardContent}>Última semana:</p>
          <p className={styles.statisticCardContent}>Repositório com mais commits:</p>
        </motion.div>
        <motion.div variants={itemVariants} className={styles.statisticCard}>
          <h3 className={styles.statisticCardTitle}>ISSUES</h3>
          <p className={styles.statisticCardContent}>Issues cadastradas desde a criação da conta:</p>
          <p className={styles.statisticCardContent}>Última semana:</p>
          <p className={styles.statisticCardContent}>Repositório com mais issues cadastradas:</p>
        </motion.div>
        <motion.div variants={itemVariants} className={styles.statisticCard}>
          <h3 className={styles.statisticCardTitle}>MERGES</h3>
          <p className={styles.statisticCardContent}>Merges desde a criação da conta:</p>
          <p className={styles.statisticCardContent}>Última semana:</p>
          <p className={styles.statisticCardContent}>Repositório com mais merges:</p>
        </motion.div>
        <motion.div variants={itemVariants} className={styles.statisticCard}>
          <h3 className={styles.statisticCardTitle}>PULL REQUESTS</h3>
          <p className={styles.statisticCardContent}>Abertos:</p>
          <p className={styles.statisticCardContent}>Última semana:</p>
          <p className={styles.statisticCardContent}>Repositório com mais commits:</p>
        </motion.div>
        <motion.div variants={itemVariants} className={styles.statisticCard}>
          <h3 className={styles.statisticCardTitle}>TOTAL DE PONTOS</h3>
        </motion.div>
      </motion.div>

    </motion.main>        
    );
}