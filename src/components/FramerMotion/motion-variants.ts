'use client';

// Variantes de animação reutilizáveis para as páginas de métricas, fiz essa alteração pois o SonarClude estava reclamando do código duplicado
export const containerVariants = {
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

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const pageTransitionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};
