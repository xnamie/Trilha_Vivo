/* =========================================================
   data.js — Mock Data & Application State
   Programa Influencer Vivo
   Dados compartilhados entre Influencer e Estagiário
   ========================================================= */

// ============ CONSTANT: ROLES ============
const ROLES = {
  INFLUENCER: 'influencer',
  ESTAGIARIO: 'estagiario'
};

// ============ APP STATE ============
let APP_STATE = {
  currentUser: null,
  notifications: [],
  feedbacks: [],
  trilhaProgress: {}
};

// ============ MOCK USERS ============
const USERS = {
  mariana: {
    id: 'u-001',
    name: 'Mariana',
    role: ROLES.INFLUENCER,
    email: 'mariana@vivo.com.br',
    avatar: 'M', // primeira letra para gradiente
    initials: 'M',
    level: 'Platina',
    points: 2450,
    badge: '👑',
    influencerSince: '03/03/2023',
    intern_count: 2,
    feedback_pending: 2
  },
  claudio: {
    id: 'u-002',
    name: 'Cláudio',
    role: ROLES.ESTAGIARIO,
    email: 'claudio@vivo.com.br',
    avatar: 'C',
    initials: 'C',
    influencerId: 'u-001', // Mariana é sua influencer
    trilhaProgress: 75,
    level: 'Nível 3',
    points: 420,
    nextDelivery: {
      title: 'Projeto API REST',
      deadline: '2026-08-22',
      status: 'em-andamento'
    }
  },
  beatriz: {
    id: 'u-003',
    name: 'Beatriz Lima',
    role: ROLES.ESTAGIARIO,
    email: 'beatriz.lima@vivo.com.br',
    avatar: 'BL',
    initials: 'BL',
    influencerId: 'u-001', // Mariana é sua influencer
    trilhaProgress: 50,
    level: 'Nível 2',
    points: 280,
    nextDelivery: {
      title: 'Documentação Técnica',
      deadline: '2026-08-25',
      status: 'não-iniciado'
    }
  }
};

// ============ MOCK INTERNS (gerenciados por Influencer) ============
const INTERNS_BY_INFLUENCER = {
  'u-001': [ // Interns de Mariana
    {
      id: 'u-002',
      name: 'Cláudio',
      area: 'Marketing',
      startDate: '03/03/2025',
      progress: 75,
      status: 'em-andamento',
      color: '#0066FF', // Azul
      feedback_pending: 1
    },
    {
      id: 'u-003',
      name: 'Beatriz Lima',
      area: 'Tecnologia',
      startDate: '10/03/2025',
      progress: 50,
      status: 'em-andamento',
      color: '#EB3C7D', // Magenta
      feedback_pending: 1
    }
  ]
};

// ============ MOCK FEEDBACKS ============
const FEEDBACKS = [
  {
    id: 'fb-001',
    fromId: 'u-001', // Mariana (influencer)
    toId: 'u-002',   // Cláudio (intern)
    date: '2026-08-10',
    category: 'Progresso',
    rating: 4,
    text: 'Ótimo progresso na trilha! Você está indo melhor que esperado. Continue assim!',
    status: 'lido',
    type: 'positive'
  },
  {
    id: 'fb-002',
    fromId: 'u-001', // Mariana (influencer)
    toId: 'u-003',   // Beatriz Lima (intern)
    date: '2026-08-09',
    category: 'Soft Skills',
    rating: 3,
    text: 'Trabalhe mais a comunicação em reuniões. Tente participar mais ativamente!',
    status: 'não-lido',
    type: 'constructive'
  },
  {
    id: 'fb-003',
    fromId: 'u-001', // Mariana
    toId: 'u-002',   // Cláudio
    date: '2026-08-05',
    category: 'Técnico',
    rating: 5,
    text: 'Seu código está muito bem estruturado. Parabéns!',
    status: 'lido',
    type: 'positive'
  }
];

// ============ MOCK TRILHA STAGES (Educacional para Estagiário) ============
const TRILHA_STAGES = [
  {
    id: 'stage-1',
    index: 0,
    icon: '🔍',
    eyebrow: 'Fase 1',
    title: 'Ser Curioso Pega Bem',
    desc: 'Objetivo: Entender suas tarefas e explorar o universo Vivo.',
    duration: 'Sprint de integração',
    format: 'Paixão Púrpura',
    badge: '🔍 Explorador Púrpura',
    missions: [
      'Completar o onboarding da sua gerência.',
      'Entender sua função na equipe.',
      'Completar os cursos no SuccessFactors.'
    ],
    xp: 100
  },
  {
    id: 'stage-2',
    index: 1,
    icon: '✨',
    eyebrow: 'Fase 2',
    title: 'Dá Para Ser Mais Simples',
    desc: 'Objetivo: Aprender a comunicar ideias de forma clara, objetiva e autêntica.',
    duration: 'Sprint de comunicação',
    format: 'Paixão Púrpura',
    badge: '💡 Comunicador Púrpura',
    missions: [
      'Praticar storytelling com uma experiência real.',
      'Transformar um conteúdo corporativo em uma mensagem mais humana.',
      'Participar de uma oficina ou conteúdo sobre comunicação.'
    ],
    xp: 100
  },
  {
    id: 'stage-3',
    index: 2,
    icon: '👥',
    eyebrow: 'Fase 3',
    title: 'Gente é a Nossa Melhor Tecnologia',
    desc: 'Objetivo: Construir conexões e aprender com diferentes perspectivas dentro da Vivo.',
    duration: 'Sprint de conexões',
    format: 'Paixão Púrpura',
    badge: '🤝 Conector Púrpura',
    missions: [
      'Realizar um café virtual ou bate-papo com o seu Influencer.',
      'Conversar com um gestor de outra área para conhecer sua trajetória.',
      'Realizar uma conversa de feedback com o seu gerente.'
    ],
    xp: 100
  },
  {
    id: 'stage-4',
    index: 3,
    icon: '🎯',
    eyebrow: 'Fase 4',
    title: 'O Tempo do Cliente é Agora',
    desc: 'Objetivo: Conhecer seus clientes e priorizar suas necessidades.',
    duration: 'Sprint de impacto',
    format: 'Paixão Púrpura',
    badge: '🎯 Embaixador do Cliente',
    missions: [
      'Compartilhar uma iniciativa que impacte clientes.',
      'Participar de oficina ou workshop que aprofunde insights de cliente.',
      'Conversar com o seu Influencer sobre projetos de impacto que ele tenha participado.'
    ],
    xp: 100
  },
  {
    id: 'stage-5',
    index: 4,
    icon: '🏆',
    eyebrow: 'Fase 5',
    title: 'Resultado é Comigo',
    desc: 'Objetivo: Mostrar seus maiores feitos.',
    duration: 'Sprint de resultados',
    format: 'Paixão Púrpura',
    badge: '👑 Influencer Púrpura',
    missions: [
      'Demonstrar engajamento contínuo na comunidade.',
      'Compartilhar com o seu Influencer projetos que você colaborou.',
      'Compartilhar seus principais aprendizados e resultados.'
    ],
    xp: 100
  }
];

// ============ MOCK CALENDAR EVENTS (Influencer Only) ============
const CALENDAR_EVENTS = [
  {
    id: 'evt-001',
    date: '2026-08-22',
    title: 'Check-in com Cláudio',
    description: 'Feedback sobre progresso na trilha',
    time: '14:00',
    duration: 30,
    interns: ['Cláudio'],
    type: 'normal',
    status: 'agendado'
  },
  {
    id: 'evt-002',
    date: '2026-08-25',
    title: 'Feedback Contínuo - Beatriz',
    description: 'Revisão de desempenho e próximos passos',
    time: '10:30',
    duration: 45,
    interns: ['Beatriz Lima'],
    type: 'alert',
    status: 'pendente'
  },
  {
    id: 'evt-003',
    date: '2026-08-28',
    title: 'Reunião de Influencers',
    description: 'Síncrono mensal com todos os influencers',
    time: '16:00',
    duration: 60,
    interns: ['Todos os influencers'],
    type: 'normal',
    status: 'agendado'
  },
  {
    id: 'evt-004',
    date: '2026-09-02',
    title: 'Revisão PDI - Cláudio',
    description: 'Análise de Plano de Desenvolvimento Individual',
    time: '11:00',
    duration: 50,
    interns: ['Cláudio'],
    type: 'success',
    status: 'agendado'
  }
];

// ============ MOCK UPCOMING ACTIVITIES ============
const ACTIVITIES = [
  // Influencer activities
  {
    id: 'act-001',
    type: 'check-in',
    title: 'Check-in semanal',
    relatedUser: 'Cláudio',
    date: '2026-08-22',
    daysUntil: 2,
    status: 'agendado',
    icon: '📅',
    action: 'Agendar',
    forRole: 'influencer'
  },
  {
    id: 'act-002',
    type: 'feedback',
    title: 'Feedback contínuo',
    relatedUser: 'Beatriz Lima',
    status: 'pendente',
    icon: '💬',
    action: 'Registrar',
    forRole: 'influencer'
  },
  {
    id: 'act-003',
    type: 'pdi',
    title: 'Revisar PDI',
    relatedUser: 'Cláudio',
    daysUntil: 5,
    status: 'agendado',
    icon: '🎯',
    action: 'Acessar',
    forRole: 'influencer'
  },
  // Estagiário activities
  {
    id: 'act-004',
    type: 'modulo',
    title: 'Etapa 3: Portfólio de Produtos',
    status: 'disponível',
    duration: '20 min',
    icon: '📱',
    action: 'Iniciar',
    forRole: 'estagiario'
  },
  {
    id: 'act-005',
    type: 'entrega',
    title: 'Projeto API REST',
    deadline: '2026-08-22',
    daysUntil: 2,
    status: 'pendente',
    icon: '📤',
    action: 'Entregar',
    forRole: 'estagiario'
  }
];

// ============ MOCK BADGES/LEVELS ============
const BADGES = [
  // Estagiário badges
  { id: 'badge-001', icon: '🟩', name: 'Iniciante', category: 'milestone', role: 'estagiario', description: 'Completou 100 XP e iniciou sua jornada', earned: true },
  { id: 'badge-002', icon: '🟨', name: 'Intermediário', category: 'milestone', role: 'estagiario', description: 'Acumulou 300 XP e progrediu na trilha', earned: false },
  { id: 'badge-003', icon: '🟥', name: 'Avançado', category: 'milestone', role: 'estagiario', description: 'Atingiu 500 XP e dominou conceitos principais', earned: false },
  { id: 'badge-004', icon: '🏆', name: 'Expert', category: 'achievement', role: 'estagiario', description: 'Alcançou 800 XP e é um expert', earned: false },
  { id: 'badge-005', icon: '⭐', name: 'Comunicação Clara', category: 'achievement', role: 'estagiario', description: 'Recebeu 3 feedbacks com rating 4+ em comunicação', earned: false },
  { id: 'badge-006', icon: '🚀', name: 'Proativo', category: 'achievement', role: 'estagiario', description: 'Entregou projetos antes do prazo', earned: true },
  { id: 'badge-007', icon: '🤝', name: 'Colaborador', category: 'achievement', role: 'estagiario', description: 'Trabalhou bem em equipe em 2+ projetos', earned: true },
  { id: 'badge-008', icon: '📚', name: 'Aprendiz Rápido', category: 'achievement', role: 'estagiario', description: 'Completou toda trilha em menos de 30 dias', earned: false },

  // Influencer badges
  { id: 'badge-101', icon: '👶', name: 'Mentor Iniciante', category: 'milestone', role: 'influencer', description: 'Começou a mentorar 1 estagiário', earned: true },
  { id: 'badge-102', icon: '🥈', name: 'Mentor Prata', category: 'milestone', role: 'influencer', description: 'Mentora 2+ estagiários', earned: true },
  { id: 'badge-103', icon: '🥇', name: 'Mentor Ouro', category: 'milestone', role: 'influencer', description: 'Mentora 5+ estagiários com excelência', earned: false },
  { id: 'badge-104', icon: '👑', name: 'Platina', category: 'achievement', role: 'influencer', description: 'Mentor de 10+ estagiários com 2.000 XP', earned: true }
];

// ============ STORAGE KEYS ============
const STORAGE_KEYS = {
  USER_ROLE: 'vivo_user_role',
  USER_ID: 'vivo_user_id',
  TRILHA_PROGRESS: 'vivo_trilha_progresso',
  FEEDBACKS_STORE: 'vivo_feedbacks_store',
  FEEDBACKS_READ: 'vivo_feedbacks_read',
  CALENDAR_EVENTS: 'vivo_calendar_events',
  NOTIFICATIONS: 'vivo_notifications'
};

// ============ UTILITY FUNCTIONS ============

/**
 * Carrega o usuário atual baseado no localStorage
 */
function loadCurrentUser() {
  try {
    const defaultUserByRole = {
      [ROLES.INFLUENCER]: 'u-001',
      [ROLES.ESTAGIARIO]: 'u-002'
    };
    const role = localStorage.getItem(STORAGE_KEYS.USER_ROLE) || ROLES.INFLUENCER;
    const userId = localStorage.getItem(STORAGE_KEYS.USER_ID) || defaultUserByRole[role] || 'u-001';
    
    const user = Object.values(USERS).find(u => u.id === userId);
    if (user && user.role === role) {
      APP_STATE.currentUser = { ...user };
      return APP_STATE.currentUser;
    }

    const fallbackByRole = Object.values(USERS).find(u => u.role === role);
    if (fallbackByRole) {
      localStorage.setItem(STORAGE_KEYS.USER_ID, fallbackByRole.id);
      APP_STATE.currentUser = { ...fallbackByRole };
      return APP_STATE.currentUser;
    }
  } catch (e) {
    console.warn('Erro ao carregar usuário:', e);
  }
  
  // fallback: Mariana como influencer
  APP_STATE.currentUser = { ...USERS.mariana };
  return APP_STATE.currentUser;
}

/**
 * Alterna entre Influencer e Estagiário
 */
function toggleUserRole() {
  if (!APP_STATE.currentUser) loadCurrentUser();
  
  const newRole = APP_STATE.currentUser.role === ROLES.INFLUENCER 
    ? ROLES.ESTAGIARIO 
    : ROLES.INFLUENCER;
  
  APP_STATE.currentUser.role = newRole;
  localStorage.setItem(STORAGE_KEYS.USER_ROLE, newRole);

  const roleDefaultUserId = newRole === ROLES.INFLUENCER ? 'u-001' : 'u-002';
  localStorage.setItem(STORAGE_KEYS.USER_ID, roleDefaultUserId);
  const roleUser = Object.values(USERS).find(u => u.id === roleDefaultUserId);
  if (roleUser) {
    APP_STATE.currentUser = { ...roleUser };
  }
  
  return newRole;
}

/**
 * Gera ID simples para registros mock
 */
function generateMockId(prefix) {
  const seed = Date.now().toString(36);
  const rnd = Math.random().toString(36).slice(2, 7);
  return `${prefix}-${seed}-${rnd}`;
}

/**
 * Retorna todos os feedbacks (base + persistidos)
 */
function getAllFeedbacks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FEEDBACKS_STORE);
    if (!raw) {
      const seed = FEEDBACKS.map(item => ({ ...item }));
      localStorage.setItem(STORAGE_KEYS.FEEDBACKS_STORE, JSON.stringify(seed));
      return seed;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (e) {
    console.warn('Erro ao carregar feedbacks persistidos:', e);
  }

  const fallback = FEEDBACKS.map(item => ({ ...item }));
  try {
    localStorage.setItem(STORAGE_KEYS.FEEDBACKS_STORE, JSON.stringify(fallback));
  } catch (e) {
    console.warn('Erro ao recuperar fallback de feedbacks:', e);
  }
  return fallback;
}

/**
 * Persiste feedbacks no localStorage
 */
function saveAllFeedbacks(feedbacks) {
  if (!Array.isArray(feedbacks)) return;
  try {
    localStorage.setItem(STORAGE_KEYS.FEEDBACKS_STORE, JSON.stringify(feedbacks));
  } catch (e) {
    console.warn('Erro ao salvar feedbacks persistidos:', e);
  }
}

/**
 * Cria novo feedback
 */
function createFeedback(payload) {
  const feedbacks = getAllFeedbacks();
  const entry = {
    id: generateMockId('fb'),
    fromId: payload.fromId,
    toId: payload.toId,
    date: payload.date || new Date().toISOString().slice(0, 10),
    category: payload.category || 'Geral',
    rating: Number(payload.rating || 3),
    text: String(payload.text || '').trim(),
    status: 'não-lido',
    type: Number(payload.rating || 3) >= 4 ? 'positive' : 'constructive'
  };

  feedbacks.unshift(entry);
  saveAllFeedbacks(feedbacks);
  return entry;
}

/**
 * Retorna atividades baseadas no papel
 */
function getActivitiesByRole(role) {
  return ACTIVITIES.filter(a => a.forRole === role);
}

/**
 * Retorna estagiários de um influencer
 */
function getInternsForInfluencer(influencerId) {
  return INTERNS_BY_INFLUENCER[influencerId] || [];
}

/**
 * Conta feedbacks não lidos para um usuário
 */
function getUnreadFeedbackCount(userId) {
  return getAllFeedbacks().filter(fb => fb.toId === userId && fb.status === 'não-lido').length;
}

/**
 * Retorna feedbacks recebidos por um usuário
 */
function getFeedbacksForUser(userId) {
  return getAllFeedbacks().filter(fb => fb.toId === userId);
}

/**
 * Retorna feedbacks enviados por um usuário
 */
function getFeedbacksSentByUser(userId) {
  return getAllFeedbacks().filter(fb => fb.fromId === userId);
}

/**
 * Marca feedback como lido
 */
function markFeedbackAsRead(feedbackId) {
  const feedbacks = getAllFeedbacks();
  const index = feedbacks.findIndex(f => f.id === feedbackId);
  if (index >= 0) {
    feedbacks[index].status = 'lido';
    saveAllFeedbacks(feedbacks);
    return feedbacks[index];
  }
}

/**
 * Calcula progresso total da trilha
 */
function calculateTrilhaProgress(completedStages) {
  const total = TRILHA_STAGES.length;
  const completed = completedStages.length;
  return Math.round((completed / total) * 100);
}

/**
 * Inicializa APP_STATE ao carregar a página
 */
function initializeApp() {
  loadCurrentUser();
  console.log('🚀 App inicializado com usuário:', APP_STATE.currentUser.name);
  console.log('Role atual:', APP_STATE.currentUser.role);
}

// Auto-init on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
