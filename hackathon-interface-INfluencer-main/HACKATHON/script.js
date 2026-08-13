/* =========================================================
   Programa Influencer Vivo — script único (MarcaVivo)
   REFATORADO v2.0 — Suporte para Influencer + Estagiário
   Um só arquivo para o Dashboard e a Minha Trilha.
   Cada bloco só roda se os elementos existirem na página.
   ========================================================= */

/* ---------------------------------------------------------
   0) CONTROLE DE PERFIL — Toggle Influencer ↔ Estagiário
   --------------------------------------------------------- */
(function initRoleToggle(){
  const ROLE_INFLUENCER = 'influencer';
  const ROLE_ESTAGIARIO = 'estagiario';
  const ROLE_DEFAULT_USER = {
    [ROLE_INFLUENCER]: 'u-001',
    [ROLE_ESTAGIARIO]: 'u-002'
  };
  const ROLE_DEFAULT_PAGE = {
    [ROLE_INFLUENCER]: 'index.html',
    [ROLE_ESTAGIARIO]: 'estagiario-dashboard.html'
  };
  const PAGE_SWITCH_MAP = {
    'index.html': {
      [ROLE_INFLUENCER]: 'index.html',
      [ROLE_ESTAGIARIO]: 'estagiario-dashboard.html'
    },
    'estagiario-dashboard.html': {
      [ROLE_INFLUENCER]: 'index.html',
      [ROLE_ESTAGIARIO]: 'estagiario-dashboard.html'
    },
    'trilha.html': {
      [ROLE_INFLUENCER]: 'trilha.html',
      [ROLE_ESTAGIARIO]: 'estagiario-trilha.html'
    },
    'estagiario-trilha.html': {
      [ROLE_INFLUENCER]: 'trilha.html',
      [ROLE_ESTAGIARIO]: 'estagiario-trilha.html'
    }
  };
  const INFLUENCER_ONLY_PAGES = ['index.html', 'trilha.html', 'gestao-estagiarios.html', 'calendario.html'];
  const ESTAGIARIO_ONLY_PAGES = ['estagiario-dashboard.html', 'estagiario-trilha.html'];

  function getCurrentRole() {
    const stored = localStorage.getItem('vivo_user_role');
    return stored === ROLE_ESTAGIARIO ? ROLE_ESTAGIARIO : ROLE_INFLUENCER;
  }

  function getCurrentPage() {
    const chunks = window.location.pathname.split('/');
    return chunks[chunks.length - 1] || 'index.html';
  }

  function ensureUserIdForRole(role) {
    const defaultUserId = ROLE_DEFAULT_USER[role];
    const currentUserId = localStorage.getItem('vivo_user_id');
    if (!currentUserId) {
      localStorage.setItem('vivo_user_id', defaultUserId);
      return;
    }

    if (typeof USERS === 'undefined') return;
    const currentUser = Object.values(USERS).find(item => item.id === currentUserId);
    if (!currentUser || currentUser.role !== role) {
      localStorage.setItem('vivo_user_id', defaultUserId);
    }
  }

  function getTargetPageForRole(role, page) {
    const exact = PAGE_SWITCH_MAP[page];
    if (exact && exact[role]) {
      return exact[role];
    }

    if (role === ROLE_ESTAGIARIO && INFLUENCER_ONLY_PAGES.includes(page)) {
      return ROLE_DEFAULT_PAGE[ROLE_ESTAGIARIO];
    }
    if (role === ROLE_INFLUENCER && ESTAGIARIO_ONLY_PAGES.includes(page)) {
      return ROLE_DEFAULT_PAGE[ROLE_INFLUENCER];
    }

    return page;
  }

  function updateToggleDisplay() {
    const currentRole = getCurrentRole();
    const roleLabel = document.querySelector('.role-label');
    if (roleLabel) {
      roleLabel.textContent = currentRole === ROLE_INFLUENCER ? 'Influencer' : 'Estagiário';
    }
  }

  function applyRoleRouteGuard() {
    const currentRole = getCurrentRole();
    const currentPage = getCurrentPage();
    const targetPage = getTargetPageForRole(currentRole, currentPage);

    if (targetPage !== currentPage) {
      window.location.replace(targetPage);
      return true;
    }
    return false;
  }

  if (applyRoleRouteGuard()) return;

  ensureUserIdForRole(getCurrentRole());
  updateToggleDisplay();

  const toggleBtn = document.getElementById('roleToggleBtn');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const currentRole = getCurrentRole();
    const newRole = currentRole === ROLE_INFLUENCER ? ROLE_ESTAGIARIO : ROLE_INFLUENCER;
    const accepted = window.confirm(
      `Deseja alternar para ${newRole === ROLE_INFLUENCER ? 'Influencer' : 'Estagiário'}?`
    );
    if (!accepted) return;

    localStorage.setItem('vivo_user_role', newRole);
    localStorage.setItem('vivo_user_id', ROLE_DEFAULT_USER[newRole]);

    const currentPage = getCurrentPage();
    const targetPage = getTargetPageForRole(newRole, currentPage);
    window.location.href = targetPage;
  });
})();

/* ---------------------------------------------------------
   0.5) RENDERIZAÇÃO CONDICIONAL POR PERFIL
   --------------------------------------------------------- */
(function initRoleBasedUI(){
  const currentRole = localStorage.getItem('vivo_user_role') || 'influencer';
  
  // Elementos específicos de Influencer
  const influencerOnly = document.querySelectorAll('[data-role="influencer-only"]');
  // Elementos específicos de Estagiário
  const estagiarioOnly = document.querySelectorAll('[data-role="estagiario-only"]');
  
  influencerOnly.forEach(el => {
    el.style.display = currentRole === 'influencer' ? '' : 'none';
  });
  estagiarioOnly.forEach(el => {
    el.style.display = currentRole === 'estagiario' ? '' : 'none';
  });
})();

/* ---------------------------------------------------------
   0.6) ESTADO GLOBAL — Progresso, pontos e conquistas
   --------------------------------------------------------- */
(function initProgressState(){
  const PROGRESS_KEY = 'vivo_trilha_progresso';
  const POINTS_KEY = 'vivo_user_points';

  function safeReadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function getCurrentRole() {
    return localStorage.getItem('vivo_user_role') || 'influencer';
  }

  function getStageXp(stageIndex) {
    if (typeof TRILHA_STAGES !== 'undefined' && TRILHA_STAGES[stageIndex]) {
      return Number(TRILHA_STAGES[stageIndex].xp || 0);
    }
    return [100, 100, 100, 100, 100][stageIndex] || 0;
  }

  function getBasePoints(role) {
    return role === 'influencer' ? 2450 : 420;
  }

  function getCompletedStages() {
    const state = safeReadJSON(PROGRESS_KEY, { completed: [] });
    if (!state || !Array.isArray(state.completed)) return [];
    return state.completed
      .map(Number)
      .filter(n => Number.isInteger(n) && n >= 0)
      .sort((a, b) => a - b);
  }

  function getTrilhaSnapshot() {
    const role = getCurrentRole();
    const totalStages = (typeof TRILHA_STAGES !== 'undefined' && Array.isArray(TRILHA_STAGES))
      ? TRILHA_STAGES.length
      : 5;
    const completedStages = getCompletedStages().filter(index => index < totalStages);
    const xpFromTrilha = completedStages.reduce((sum, index) => sum + getStageXp(index), 0);
    const basePoints = getBasePoints(role);
    const totalPoints = basePoints + xpFromTrilha;
    return {
      role,
      completedStages,
      completedCount: completedStages.length,
      totalStages,
      xpFromTrilha,
      basePoints,
      totalPoints
    };
  }

  function updateLevelDisplays() {
    const snapshot = getTrilhaSnapshot();

    document.querySelectorAll('.level-points').forEach(el => {
      el.textContent = `${snapshot.totalPoints.toLocaleString('pt-BR')} pontos`;
    });
    const levelPoints = document.getElementById('levelPoints');
    if (levelPoints) {
      levelPoints.textContent = `${snapshot.totalPoints.toLocaleString('pt-BR')} pontos`;
    }

    const levelBars = document.querySelectorAll('.level-bar span, .lc-fill');
    if (levelBars.length) {
      const pct = Math.min(100, Math.max(8, Math.round((snapshot.completedCount / snapshot.totalStages) * 100)));
      levelBars.forEach(bar => {
        bar.style.width = `${pct}%`;
      });
    }

    document.querySelectorAll('.level-link').forEach(link => {
      if (/ranking/i.test(link.textContent || '')) {
        link.remove();
      }
    });

    localStorage.setItem(POINTS_KEY, JSON.stringify({
      role: snapshot.role,
      points: snapshot.totalPoints,
      updatedAt: new Date().toISOString()
    }));
  }

  window.getTrilhaSnapshot = getTrilhaSnapshot;
  window.refreshGlobalProgress = updateLevelDisplays;
  updateLevelDisplays();
})();

/* ---------------------------------------------------------
   1) DASHBOARD — anéis de progresso dos estagiários
   --------------------------------------------------------- */
(function initMiniRings(){
  const rings = document.querySelectorAll('.mini-ring');
  if(!rings.length) return;

  const R = 24;                       // raio dos círculos (viewBox 56x56)
  const CIRC = 2 * Math.PI * R;       // ~150.8

  rings.forEach(ring => {
    const pct = Math.max(0, Math.min(100, parseFloat(ring.dataset.pct) || 0));
    const fg = ring.querySelector('.mr-fg');
    if(!fg) return;
    fg.setAttribute('stroke-dasharray', CIRC.toFixed(1));
    fg.style.strokeDashoffset = CIRC;      // começa vazio
    // anima no próximo frame para disparar a transição CSS
    requestAnimationFrame(() => {
      fg.style.strokeDashoffset = (CIRC - CIRC * pct / 100).toFixed(1);
    });
  });
})();

/* ---------------------------------------------------------
   2) MINHA TRILHA — jornada de etapas (Influencer + Estagiário)
   --------------------------------------------------------- */
(function initTrilha(){
  const trail = document.getElementById('trail');
  if(!trail) return; // não estamos na página da trilha

  // Usar dados do data.js (TRILHA_STAGES) se disponível
  // Caso contrário, usar dados internos (compatibilidade com código antigo)
  let STAGES = [];
  
  if(typeof TRILHA_STAGES !== 'undefined' && TRILHA_STAGES.length > 0) {
    // Converter TRILHA_STAGES do data.js para formato esperado
    STAGES = TRILHA_STAGES.map(stage => ({
      icon: stage.icon,
      eyebrow: stage.eyebrow,
      title: stage.title,
      desc: stage.desc,
      duration: stage.duration,
      format: stage.format,
      missions: Array.isArray(stage.missions) ? stage.missions : [],
      badge: stage.badge || '',
      xp: Number(stage.xp || 0)
    }));
  } else {
    // Fallback: dados internos (compatibilidade)
    STAGES = [
      {
        icon:"🔍",
        eyebrow:"Fase 1",
        title:"Ser Curioso Pega Bem",
        desc:"Objetivo: Entender suas tarefas e explorar o universo Vivo.",
        duration:"Sprint de integração",
        format:"Paixão Púrpura",
        missions:[
          "Completar o onboarding da sua gerência.",
          "Entender sua função na equipe.",
          "Completar os cursos no SuccessFactors."
        ],
        badge:"🔍 Explorador Púrpura",
        xp:100
      },
      {
        icon:"✨",
        eyebrow:"Fase 2",
        title:"Dá Para Ser Mais Simples",
        desc:"Objetivo: Aprender a comunicar ideias de forma clara, objetiva e autêntica.",
        duration:"Sprint de comunicação",
        format:"Paixão Púrpura",
        missions:[
          "Praticar storytelling com uma experiência real.",
          "Transformar um conteúdo corporativo em uma mensagem mais humana.",
          "Participar de uma oficina ou conteúdo sobre comunicação."
        ],
        badge:"💡 Comunicador Púrpura",
        xp:100
      },
      {
        icon:"👥",
        eyebrow:"Fase 3",
        title:"Gente é a Nossa Melhor Tecnologia",
        desc:"Objetivo: Construir conexões e aprender com diferentes perspectivas dentro da Vivo.",
        duration:"Sprint de conexões",
        format:"Paixão Púrpura",
        missions:[
          "Realizar um café virtual ou bate-papo com o seu Influencer.",
          "Conversar com um gestor de outra área para conhecer sua trajetória.",
          "Realizar uma conversa de feedback com o seu gerente."
        ],
        badge:"🤝 Conector Púrpura",
        xp:100
      },
      {
        icon:"🎯",
        eyebrow:"Fase 4",
        title:"O Tempo do Cliente é Agora",
        desc:"Objetivo: Conhecer seus clientes e priorizar suas necessidades.",
        duration:"Sprint de impacto",
        format:"Paixão Púrpura",
        missions:[
          "Compartilhar uma iniciativa que impacte clientes.",
          "Participar de oficina ou workshop que aprofunde insights de cliente.",
          "Conversar com o seu Influencer sobre projetos de impacto que ele tenha participado."
        ],
        badge:"🎯 Embaixador do Cliente",
        xp:100
      },
      {
        icon:"🏆",
        eyebrow:"Fase 5",
        title:"Resultado é Comigo",
        desc:"Objetivo: Mostrar seus maiores feitos.",
        duration:"Sprint de resultados",
        format:"Paixão Púrpura",
        missions:[
          "Demonstrar engajamento contínuo na comunidade.",
          "Compartilhar com o seu Influencer projetos que você colaborou.",
          "Compartilhar seus principais aprendizados e resultados."
        ],
        badge:"👑 Influencer Púrpura",
        xp:100
      }
    ];
  }

  const STORAGE_KEY = 'vivo_trilha_progresso';
  const DELIVERY_KEY = 'vivo_trilha_entregas';
  const ACHIEVEMENTS_KEY = 'vivo_conquistas_registro';
  const POINTS_KEY = 'vivo_user_points';

  function loadProgress(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(raw) return JSON.parse(raw);
    }catch(e){}
    return { completed: [] };
  }
  function saveProgress(state){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }catch(e){}
  }

  function loadDeliveries(){
    try{
      const raw = localStorage.getItem(DELIVERY_KEY);
      if(raw) return JSON.parse(raw);
    }catch(e){}
    return {};
  }

  function saveDeliveries(entries){
    try{ localStorage.setItem(DELIVERY_KEY, JSON.stringify(entries)); }catch(e){}
  }

  function saveAchievement(stageIndex){
    const stage = STAGES[stageIndex];
    if(!stage) return;
    let log = [];
    try {
      const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
      log = raw ? JSON.parse(raw) : [];
    } catch (e) {
      log = [];
    }
    if (!Array.isArray(log)) log = [];
    const exists = log.some(entry => Number(entry.stageIndex) === Number(stageIndex));
    if (!exists) {
      log.push({
        stageIndex,
        title: stage.title,
        xp: Number(stage.xp || 0),
        completedAt: new Date().toISOString()
      });
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(log));
    }
  }

  let state = loadProgress();
  if (!Array.isArray(state.completed)) {
    state.completed = [];
  }
  state.completed = state.completed
    .map(Number)
    .filter(index => Number.isInteger(index) && index >= 0 && index < STAGES.length)
    .sort((a, b) => a - b);
  saveProgress(state);
  let deliveries = loadDeliveries();

  function stageStatus(index){
    if(state.completed.includes(index)) return 'done';
    const prevDone = index === 0 || state.completed.includes(index - 1);
    return prevDone ? 'current' : 'locked';
  }

  function render(){
    trail.querySelectorAll('.node').forEach(n => n.remove());

    STAGES.forEach((stage, i) => {
      const status = stageStatus(i);
      const node = document.createElement('div');
      node.className = 'node ' + status;
      node.dataset.index = i;
      node.innerHTML = `
        <div class="badge">
          <span class="step-no">${i+1}</span>
          <span class="icon">${stage.icon}</span>
        </div>
        <div class="node-card">
          <div class="eyebrow-mini">${stage.eyebrow}</div>
          <h3>${stage.title}</h3>
          <p>${stage.desc}</p>
          <span class="status-chip">${
            status === 'done' ? '✓ Concluído' : status === 'current' ? '● Disponível agora' : '🔒 Bloqueado'
          }</span>
        </div>
      `;
      node.addEventListener('click', () => openPanel(i));
      trail.appendChild(node);
    });

    updateFinish();
    requestAnimationFrame(drawPath);
  }

  function updateFinish(){
    const allDone = state.completed.length === STAGES.length;
    const finishBadge = document.getElementById('finishBadge');
    if(!finishBadge) return;
    finishBadge.style.background = allDone ? 'linear-gradient(135deg, var(--vivo-purple), var(--vivo-amber))' : '';
    finishBadge.style.color = allDone ? '#fff' : '';
    finishBadge.style.borderColor = allDone ? 'var(--vivo-amber)' : '';

    // Atualizar contadores de progresso (estagiario-trilha.html)
    const progressPercentEl = document.getElementById('progressPercent');
    const stagesCompleteEl = document.getElementById('stagesComplete');
    const overallProgressEl = document.getElementById('overallProgress');
    
    if(progressPercentEl || stagesCompleteEl || overallProgressEl) {
      const totalStages = STAGES.length;
      const completedCount = state.completed.length;
      const progressPercent = Math.round((completedCount / totalStages) * 100);
      
      if(progressPercentEl) progressPercentEl.textContent = progressPercent;
      if(stagesCompleteEl) stagesCompleteEl.textContent = completedCount;
      if(overallProgressEl) overallProgressEl.style.width = progressPercent + '%';
    }
  }

  function drawPath(){
    const svg = document.getElementById('pathSvg');
    const trailRect = trail.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${trailRect.width} ${trailRect.height}`);
    svg.setAttribute('width', trailRect.width);
    svg.setAttribute('height', trailRect.height);

    const nodes = Array.from(trail.querySelectorAll('.node .badge'));
    if(nodes.length < 2) return;

    const points = nodes.map(el => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width/2 - trailRect.left,
        y: r.top + r.height/2 - trailRect.top
      };
    });

    function smoothPath(pts){
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for(let i=0; i<pts.length-1; i++){
        const p0 = pts[i], p1 = pts[i+1];
        const midX = (p0.x + p1.x) / 2;
        d += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
      }
      return d;
    }

    document.getElementById('pathBg').setAttribute('d', smoothPath(points));

    const doneCount = state.completed.length;
    const progressIndex = Math.min(doneCount, points.length - 1);
    const progressPoints = points.slice(0, progressIndex + 1);
    const fgPath = document.getElementById('pathFg');
    if(progressPoints.length > 1){
      fgPath.setAttribute('d', smoothPath(progressPoints));
      fgPath.style.strokeDasharray = 'none';
      fgPath.style.strokeDashoffset = '0';
    } else {
      fgPath.setAttribute('d', '');
    }
  }

  // ----- Modal -----
  const overlay = document.getElementById('overlay');
  let activeIndex = null;

  function buildPanelDescription(stage){
    const missions = Array.isArray(stage.missions) && stage.missions.length
      ? `\n\nMissões:\n${stage.missions.map(item => `• ${item}`).join('\n')}`
      : '';
    const badge = stage.badge ? `\n\nBadge: ${stage.badge}` : '';
    return `${stage.desc}${missions}${badge}`;
  }

  function openPanel(i){
    const status = stageStatus(i);
    if(status === 'locked') return;
    activeIndex = i;
    const stage = STAGES[i];
    document.getElementById('panelIcon').textContent = stage.icon;
    document.getElementById('panelEyebrow').textContent = stage.eyebrow;
    document.getElementById('panelTitle').textContent = stage.title;
    document.getElementById('panelDesc').textContent = buildPanelDescription(stage);
    document.getElementById('panelDuration').textContent = stage.duration;
    document.getElementById('panelFormat').textContent = stage.format;
    document.getElementById('panelXp').textContent = `+${stage.xp} XP`;

    const completeBtn = document.getElementById('completeBtn');
    const deliverBtn = document.getElementById('deliverBtn');
    const deliveryInfo = document.getElementById('deliveryInfo');
    const uploaded = deliveries[i];
    if(status === 'done'){
      completeBtn.textContent = 'Concluído ✓';
      completeBtn.disabled = true;
      if(deliverBtn) deliverBtn.disabled = true;
      if(deliveryInfo) {
        deliveryInfo.textContent = uploaded
          ? `Entrega registrada: ${uploaded.name}`
          : 'Etapa concluída sem histórico de entrega local.';
      }
    } else {
      completeBtn.textContent = 'Marcar como concluído';
      completeBtn.disabled = !uploaded;
      if(deliverBtn) deliverBtn.disabled = false;
      if(deliveryInfo) {
        deliveryInfo.textContent = uploaded
          ? `Entrega pronta: ${uploaded.name}`
          : 'Envie um arquivo em Entregar para concluir a etapa.';
      }
    }
    overlay.classList.add('open');
  }

  function closePanel(){
    overlay.classList.remove('open');
    activeIndex = null;
  }

  document.getElementById('closeBtn').addEventListener('click', closePanel);
  document.getElementById('cancelBtn').addEventListener('click', closePanel);
  overlay.addEventListener('click', (e) => { if(e.target === overlay) closePanel(); });

  const deliverBtn = document.getElementById('deliverBtn');
  const deliverInput = document.getElementById('deliverInput');
  const deliveryInfo = document.getElementById('deliveryInfo');
  const resetTrailBtn = document.getElementById('resetTrailBtn');

  if (deliverBtn && deliverInput) {
    deliverBtn.addEventListener('click', () => {
      if (activeIndex === null) return;
      deliverInput.click();
    });

    deliverInput.addEventListener('change', () => {
      if (activeIndex === null) return;
      const file = deliverInput.files && deliverInput.files[0];
      if (!file) return;

      deliveries[activeIndex] = {
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
        deliveredAt: new Date().toISOString()
      };
      saveDeliveries(deliveries);
      deliverInput.value = '';

      const completeBtn = document.getElementById('completeBtn');
      if (completeBtn && !state.completed.includes(activeIndex)) {
        completeBtn.disabled = false;
      }
      if (deliveryInfo) {
        deliveryInfo.textContent = `Entrega pronta: ${deliveries[activeIndex].name}`;
      }
    });
  }

  document.getElementById('completeBtn').addEventListener('click', () => {
    if(activeIndex === null) return;
    if(!deliveries[activeIndex]) {
      alert('Envie um arquivo em Entregar antes de concluir a etapa.');
      return;
    }
    if(!state.completed.includes(activeIndex)){
      state.completed.push(activeIndex);
      saveProgress(state);
      saveAchievement(activeIndex);
    }
    closePanel();
    render();
    if (typeof window.refreshGlobalProgress === 'function') {
      window.refreshGlobalProgress();
    }
  });

  if (resetTrailBtn) {
    resetTrailBtn.addEventListener('click', () => {
      const confirmed = window.confirm('Deseja resetar toda a trilha? Isso limpará progresso, entregas e conquistas registradas.');
      if (!confirmed) return;

      state = { completed: [] };
      deliveries = {};
      saveProgress(state);
      saveDeliveries(deliveries);
      localStorage.removeItem(ACHIEVEMENTS_KEY);
      localStorage.removeItem(POINTS_KEY);

      closePanel();
      render();
      if (typeof window.refreshGlobalProgress === 'function') {
        window.refreshGlobalProgress();
      }
    });
  }

  window.addEventListener('resize', () => requestAnimationFrame(drawPath));
  window.addEventListener('load', () => requestAnimationFrame(drawPath));

  render();
})();

/* ---------------------------------------------------------
   3) NOTIFICAÇÕES — Badge de bell (topo)
   --------------------------------------------------------- */
(function initNotifications(){
  const bellBtn = document.querySelector('.icon-btn[aria-label="Notificações"]');
  if(!bellBtn) return;

  const dotBadge = bellBtn.querySelector('.dot-badge');
  if(!dotBadge) return;

  function updateNotificationBadge() {
    let unreadCount = 0;
    const currentUser = typeof loadCurrentUser === 'function' ? loadCurrentUser() : null;
    if (currentUser && typeof getUnreadFeedbackCount === 'function') {
      unreadCount = getUnreadFeedbackCount(currentUser.id);
    }

    dotBadge.textContent = String(unreadCount);
    dotBadge.style.display = unreadCount > 0 ? 'flex' : 'none';
  }

  window.refreshNotificationBadge = updateNotificationBadge;
  updateNotificationBadge();
  
  bellBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('🔔 Notificações clicadas');
    // TODO: abrir painel de notificações
  });
})();

/* ---------------------------------------------------------
   4) FEEDBACKS — Renderização condicional e interações
   --------------------------------------------------------- */
(function initFeedbacks(){
  const feedbackSection = document.querySelector('[data-section="feedbacks"]');
  if(!feedbackSection) return;

  const currentRole = localStorage.getItem('vivo_user_role') || 'influencer';
  const currentUser = typeof loadCurrentUser === 'function' ? loadCurrentUser() : null;
  const pageTitle = document.getElementById('feedbackPageTitle');
  const pageDesc = document.getElementById('feedbackPageDesc');
  const roleBadge = document.getElementById('feedbackRoleBadge');
  const backLink = document.getElementById('feedbackBackLink');
  const composeCard = document.getElementById('feedbackComposeCard');
  const feedList = document.getElementById('feedbackList');
  const emptyState = document.getElementById('feedbackEmptyState');
  const countChip = document.getElementById('feedbackCountChip');

  if (!currentUser || !feedList) return;

  if (backLink) {
    backLink.href = currentRole === 'influencer' ? 'index.html' : 'estagiario-dashboard.html';
  }

  if (roleBadge) {
    roleBadge.textContent = currentRole === 'influencer' ? 'Influencer' : 'Estagiário';
  }

  if (currentRole === 'influencer') {
    if (pageTitle) pageTitle.textContent = 'Feedback Contínuo';
    if (pageDesc) pageDesc.textContent = 'Registre feedbacks frequentes para estagiários e acompanhe o histórico da jornada.';
    if (composeCard) composeCard.style.display = 'block';
    initInfluencerFeedbacks();
  } else {
    if (pageTitle) pageTitle.textContent = 'Meus Feedbacks';
    if (pageDesc) pageDesc.textContent = 'Acompanhe feedbacks recebidos do seu influencer e marque como lidos.';
    if (composeCard) composeCard.style.display = 'none';
    initEstagiarioFeedbacks();
  }

  function getUserById(userId) {
    if (typeof USERS === 'undefined') return null;
    return Object.values(USERS).find(user => user.id === userId) || null;
  }

  function formatDateBR(isoDate) {
    const date = new Date(`${isoDate}T12:00:00`);
    if (Number.isNaN(date.getTime())) return isoDate;
    return date.toLocaleDateString('pt-BR');
  }

  function ratingLabel(value) {
    const stars = '★'.repeat(value) + '☆'.repeat(Math.max(0, 5 - value));
    return `${stars} (${Number(value).toFixed(1)})`;
  }

  function updateCount(value) {
    if (!countChip) return;
    countChip.textContent = String(value);
  }

  function setEmpty(isEmpty, message) {
    if (!emptyState) return;
    emptyState.style.display = isEmpty ? 'block' : 'none';
    emptyState.textContent = message || 'Nenhum feedback para exibir.';
  }

  function initInfluencerFeedbacks() {
    const form = document.getElementById('feedbackForm');
    const toSelect = document.getElementById('feedbackTo');
    const filterSelect = document.getElementById('feedbackFilterTo');
    const categoryInput = document.getElementById('feedbackCategory');
    const ratingInput = document.getElementById('feedbackRating');
    const textInput = document.getElementById('feedbackText');

    if (!form || !toSelect || !filterSelect || !categoryInput || !ratingInput || !textInput) return;

    const interns = typeof getInternsForInfluencer === 'function'
      ? getInternsForInfluencer(currentUser.id)
      : [];

    const options = interns.map(intern => `<option value="${intern.id}">${intern.name}</option>`).join('');
    toSelect.innerHTML = `<option value="">Selecione um estagiário</option>${options}`;
    filterSelect.innerHTML = `<option value="all">Todos os estagiários</option>${options}`;

    function renderHistory() {
      const selected = filterSelect.value;
      const sent = typeof getFeedbacksSentByUser === 'function'
        ? getFeedbacksSentByUser(currentUser.id)
        : [];

      const sorted = sent
        .slice()
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .filter(item => selected === 'all' ? true : item.toId === selected);

      updateCount(sorted.length);
      setEmpty(sorted.length === 0, 'Nenhum feedback enviado com esse filtro.');

      feedList.innerHTML = sorted.map(item => {
        const target = getUserById(item.toId);
        const statusClass = item.status === 'não-lido' ? 'open' : 'read';
        return `
          <article class="feedback-log-item">
            <header class="fli-top">
              <strong>${item.category}</strong>
              <span>${formatDateBR(item.date)}</span>
            </header>
            <div class="fli-meta">
              <span>Para: ${target ? target.name : item.toId}</span>
              <span class="feedback-state ${statusClass}">${item.status}</span>
            </div>
            <div class="fli-rating">${ratingLabel(Number(item.rating || 0))}</div>
            <p>${item.text}</p>
          </article>
        `;
      }).join('');
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const toId = toSelect.value;
      const category = categoryInput.value;
      const rating = Number(ratingInput.value);
      const text = textInput.value.trim();

      if (!toId || !category || !rating || !text) {
        window.alert('Preencha todos os campos para enviar o feedback.');
        return;
      }

      if (typeof createFeedback === 'function') {
        createFeedback({
          fromId: currentUser.id,
          toId,
          category,
          rating,
          text
        });
      }

      form.reset();
      renderHistory();
      if (typeof window.refreshNotificationBadge === 'function') {
        window.refreshNotificationBadge();
      }
    });

    filterSelect.addEventListener('change', renderHistory);
    renderHistory();
  }

  function initEstagiarioFeedbacks() {
    const filterSelect = document.getElementById('feedbackFilterTo');
    if (filterSelect) {
      filterSelect.style.display = 'none';
    }

    function renderInbox() {
      const received = typeof getFeedbacksForUser === 'function'
        ? getFeedbacksForUser(currentUser.id)
        : [];

      const sorted = received
        .slice()
        .sort((a, b) => (a.date < b.date ? 1 : -1));

      const unreadCount = sorted.filter(item => item.status === 'não-lido').length;
      updateCount(unreadCount);
      setEmpty(sorted.length === 0, 'Ainda não há feedbacks recebidos.');

      feedList.innerHTML = sorted.map(item => {
        const author = getUserById(item.fromId);
        const unreadClass = item.status === 'não-lido' ? 'is-unread' : '';
        const action = item.status === 'não-lido'
          ? `<button class="pill-btn js-mark-read" data-feedback-id="${item.id}">Marcar como lido</button>`
          : '<span class="feedback-state read">lido</span>';
        return `
          <article class="feedback-log-item ${unreadClass}">
            <header class="fli-top">
              <strong>${item.category}</strong>
              <span>${formatDateBR(item.date)}</span>
            </header>
            <div class="fli-meta">
              <span>De: ${author ? author.name : item.fromId}</span>
              <span>${ratingLabel(Number(item.rating || 0))}</span>
            </div>
            <p>${item.text}</p>
            <footer class="fli-actions">${action}</footer>
          </article>
        `;
      }).join('');

      feedList.querySelectorAll('.js-mark-read').forEach(button => {
        button.addEventListener('click', () => {
          const feedbackId = button.getAttribute('data-feedback-id');
          if (typeof markFeedbackAsRead === 'function') {
            markFeedbackAsRead(feedbackId);
          }
          renderInbox();
          if (typeof window.refreshNotificationBadge === 'function') {
            window.refreshNotificationBadge();
          }
        });
      });
    }

    renderInbox();
  }
})();

/* ---------------------------------------------------------
   5) CALENDÁRIO — Evento do Influencer
   --------------------------------------------------------- */
(function initCalendar(){
  const calendarSection = document.querySelector('[data-section="calendar"]');
  if(!calendarSection) return;

  const currentRole = localStorage.getItem('vivo_user_role') || 'influencer';
  if(currentRole !== 'influencer') {
    calendarSection.style.display = 'none';
    return;
  }

  console.log('📅 Módulo de Calendário (Influencer Only)');
  // TODO: renderizar calendar com events
})();

/* ---------------------------------------------------------
   6) MENU SIDEBAR — Adaptar itens por perfil
   --------------------------------------------------------- */
(function initSidebarAdaptation(){
  const navItems = document.querySelectorAll('.nav-item');
  const currentRole = localStorage.getItem('vivo_user_role') || 'influencer';

  navItems.forEach(item => {
    const href = item.getAttribute('href');
    
    // Controlar visibilidade baseado no perfil
    // (data-role="influencer-only" ou "estagiario-only")
    const roleAttr = item.getAttribute('data-role');
    
    if(roleAttr === 'influencer-only' && currentRole !== 'influencer'){
      item.style.display = 'none';
    } else if(roleAttr === 'estagiario-only' && currentRole !== 'estagiario'){
      item.style.display = 'none';
    }
  });
})();

/* ---------------------------------------------------------
   7) USER CHIP — Atualizar nome e role no topbar
   --------------------------------------------------------- */
(function initUserChip(){
  const userNameEl = document.querySelector('.u-name');
  const userRoleEl = document.querySelector('.u-role');
  
  if(!userNameEl || !userRoleEl) return;

  const user = typeof loadCurrentUser === 'function' ? loadCurrentUser() : null;
  const currentRole = localStorage.getItem('vivo_user_role') || 'influencer';
  const roleLabel = currentRole === 'influencer' ? 'Influencer | Vivo' : 'Estagiário | Vivo';
  const roleName = currentRole === 'influencer' ? 'Influencer' : 'Estagiário';

  userRoleEl.textContent = roleLabel;
  if (user && userNameEl) {
    userNameEl.textContent = `Olá, ${user.name}!`;
  }

  const levelLabel = document.querySelector('.lvl-label');
  if (levelLabel) {
    levelLabel.textContent = `Nível ${roleName}`;
  }

  const levelName = document.querySelector('.lvl-name');
  if (levelName && user) {
    levelName.textContent = user.level || levelName.textContent;
  }

  const avatarText = document.querySelector('.user-chip .avatar text');
  if (avatarText && user) {
    avatarText.textContent = user.initials || user.avatar || user.name.slice(0, 1).toUpperCase();
  }
})();

/* ---------------------------------------------------------
   8) INICIALIZAÇÃO GLOBAL
   --------------------------------------------------------- */
(function initApp(){
  console.log('✅ App Influencer Vivo inicializado');
  console.log('Perfil ativo:', localStorage.getItem('vivo_user_role') || 'influencer');
})();

