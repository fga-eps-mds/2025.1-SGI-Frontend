export interface MetricItem {
  id: string;
  content: string;
  date: string;
  xp: number;
}

// Dados das métricas no mesmo arquivo para evitar duplicação
export const metricsData = {
  commits: [
    { id: 'c1a2b3d4', content: '#1 REFACTOR: MELHORIA NA AUTENTICAÇÃO', date: '12/07/2025', xp: 15 },
    { id: 'e5f6g7h8', content: '#2 FIX: CORREÇÃO DE BUG NO HEADER', date: '11/07/2025', xp: 10 },
    { id: 'i9j0k1l2', content: '#3 FEATURE: ADIÇÃO DE ANIMAÇÕES', date: '10/07/2025', xp: 25 },
    { id: 'm3n4o5p6', content: '#4 DOCS: ATUALIZAÇÃO DO README', date: '09/07/2025', xp: 5 },
  ],
  
  issues: [
    { id: 'i1a2b3d4', content: '#1 BUG: Erro na página de login', date: '12/07/2025', xp: 20 },
    { id: 'i5f6g7h8', content: '#2 FEATURE: Implementar dark mode', date: '11/07/2025', xp: 30 },
    { id: 'i9j0k1l2', content: '#3 ENHANCEMENT: Melhorar performance', date: '10/07/2025', xp: 25 },
    { id: 'i3n4o5p6', content: '#4 BUG: Correção no menu mobile', date: '09/07/2025', xp: 15 },
  ],
  
  prsDone: [
    { id: 'pr1a2b3d4', content: '#1 MERGE: Implementação do sistema de login', date: '12/07/2025', xp: 40 },
    { id: 'pr5f6g7h8', content: '#2 MERGE: Correção de bugs críticos', date: '11/07/2025', xp: 35 },
    { id: 'pr9j0k1l2', content: '#3 MERGE: Adição de testes unitários', date: '10/07/2025', xp: 30 },
    { id: 'pr3n4o5p6', content: '#4 MERGE: Melhoria na documentação', date: '09/07/2025', xp: 20 },
  ],
  
  merges: [
    { id: 'm1a2b3d4', content: '#1 MERGE: Integração da feature de dashboard', date: '12/07/2025', xp: 50 },
    { id: 'm5f6g7h8', content: '#2 MERGE: Correção de conflitos no main', date: '11/07/2025', xp: 30 },
    { id: 'm9j0k1l2', content: '#3 MERGE: Adição do sistema de notificações', date: '10/07/2025', xp: 45 },
    { id: 'm3n4o5p6', content: '#4 MERGE: Otimização de performance', date: '09/07/2025', xp: 35 },
  ],
  
  prsClosed: [
    { id: 'prc1a2b3d4', content: '#1 CLOSE: PR rejeitado por falta de testes', date: '12/07/2025', xp: 5 },
    { id: 'prc5f6g7h8', content: '#2 CLOSE: PR duplicado', date: '11/07/2025', xp: 3 },
    { id: 'prc9j0k1l2', content: '#3 CLOSE: Mudança de requisitos', date: '10/07/2025', xp: 8 },
    { id: 'prc3n4o5p6', content: '#4 CLOSE: Conflitos não resolvidos', date: '09/07/2025', xp: 5 },
  ],
  
  openPRs: [
    { id: 'pro1a2b3d4', content: '#1 OPEN: Implementação de filtros avançados', date: '12/07/2025', xp: 0 },
    { id: 'pro5f6g7h8', content: '#2 OPEN: Correção de responsividade', date: '11/07/2025', xp: 0 },
    { id: 'pro9j0k1l2', content: '#3 OPEN: Adição de gráficos interativos', date: '10/07/2025', xp: 0 },
    { id: 'pro3n4o5p6', content: '#4 OPEN: Melhoria na acessibilidade', date: '09/07/2025', xp: 0 },
  ],
};

export const pageConfigs = {
  commits: {
    title: 'COMMITS REALIZADAS',
    layoutId: 'commits-card-container',
    iconName: 'commit',
  },
  
  issues: {
    title: 'ISSUES ABERTAS',
    layoutId: 'issues-card-container',
    iconName: 'bug_report',
  },
  
  prsDone: {
    title: 'PULL REQUESTS CONCLUÍDOS',
    layoutId: 'PRsdone-card-container',
    iconName: 'merge',
  },
  
  merges: {
    title: 'MERGES REALIZADOS',
    layoutId: 'merges-card-container',
    iconName: 'merge_type',
  },
  
  prsClosed: {
    title: 'PULL REQUESTS FECHADOS',
    layoutId: 'PRsclosed-card-container',
    iconName: 'close',
  },
  
  openPRs: {
    title: 'PULL REQUESTS ABERTOS',
    layoutId: 'openPRs-card-container',
    iconName: 'pending',
  },
};
