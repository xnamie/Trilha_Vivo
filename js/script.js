(function(){
  const STAGES = [
    { icon:"📡", eyebrow:"Etapa 1", title:"Boas-vindas ao universo Vivo", desc:"Conheça a história da companhia, o jeito Vivo de ser e o que esperamos de quem veste a camisa roxa.", duration:"12 min", format:"Vídeo + quiz", xp:"+50 XP" },
    { icon:"🧭", eyebrow:"Etapa 2", title:"Propósito, missão e valores", desc:"Entenda para onde a empresa está indo e como o seu trabalho se conecta com a estratégia de negócio.", duration:"15 min", format:"Leitura interativa", xp:"+50 XP" },
    { icon:"📱", eyebrow:"Etapa 3", title:"Portfólio de produtos e serviços", desc:"Um tour pelos principais planos, serviços digitais e soluções que você vai apresentar para o cliente.", duration:"20 min", format:"Vídeo + simulação", xp:"+75 XP" },
    { icon:"💬", eyebrow:"Etapa 4", title:"Atendimento que encanta", desc:"Técnicas de escuta ativa e resolução de problemas para transformar reclamação em fidelização.", duration:"18 min", format:"Estudo de caso", xp:"+75 XP" },
    { icon:"🛠️", eyebrow:"Etapa 5", title:"Ferramentas do dia a dia", desc:"Aprenda a navegar pelos sistemas internos que você vai usar todos os dias no seu novo time.", duration:"25 min", format:"Prática guiada", xp:"+100 XP" },
    { icon:"🔒", eyebrow:"Etapa 6", title:"Segurança da informação & LGPD", desc:"O que pode e o que não pode na hora de lidar com dados de clientes — e por que isso importa.", duration:"14 min", format:"Vídeo + quiz", xp:"+75 XP" },
    { icon:"🤝", eyebrow:"Etapa 7", title:"Colaboração e trabalho em equipe", desc:"Como funciona a rotina ágil dos times Vivo e as ferramentas que mantêm todo mundo alinhado.", duration:"16 min", format:"Dinâmica em grupo", xp:"+75 XP" },
    { icon:"🎓", eyebrow:"Etapa 8", title:"Avaliação final", desc:"Um quiz completo cobrindo tudo que você aprendeu na trilha. Acerte 70% para se certificar.", duration:"20 min", format:"Avaliação", xp:"+150 XP" }
  ];

  const trail = document.getElementById('trail');
  const STORAGE_KEY = 'vivo_trilha_progresso';

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

  let state = loadProgress();

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
    updateProgressCard();
    requestAnimationFrame(drawPath);
  }

  function updateFinish(){
    const allDone = state.completed.length === STAGES.length;
    const finishBadge = document.getElementById('finishBadge');
    finishBadge.style.background = allDone ? 'linear-gradient(135deg, var(--vivo-purple), var(--vivo-gold))' : '';
    finishBadge.style.color = allDone ? '#fff' : '';
    finishBadge.style.borderColor = allDone ? 'var(--vivo-gold)' : '';
  }

  function updateProgressCard(){
    const done = state.completed.length;
    const total = STAGES.length;
    const pct = Math.round((done/total) * 100);
    const circumference = 282.7;
    const offset = circumference - (circumference * pct / 100);
    document.getElementById('ringFg').style.strokeDashoffset = offset;
    document.getElementById('ringNum').textContent = done;
    document.getElementById('progressMain').textContent =
      done === 0 ? 'Vamos começar' : done === total ? 'Trilha concluída! 🎉' : 'Continue assim!';
    document.getElementById('progressSub').textContent =
      `${pct}% concluído · ${total - done} etapa${total-done===1?'':'s'} restante${total-done===1?'':'s'}`;
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

    const fullPath = smoothPath(points);
    document.getElementById('pathBg').setAttribute('d', fullPath);

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

  // Panel logic
  const overlay = document.getElementById('overlay');
  let activeIndex = null;

  function openPanel(i){
    const status = stageStatus(i);
    if(status === 'locked') return;
    activeIndex = i;
    const stage = STAGES[i];
    document.getElementById('panelIcon').textContent = stage.icon;
    document.getElementById('panelEyebrow').textContent = stage.eyebrow;
    document.getElementById('panelTitle').textContent = stage.title;
    document.getElementById('panelDesc').textContent = stage.desc;
    document.getElementById('panelDuration').textContent = stage.duration;
    document.getElementById('panelFormat').textContent = stage.format;
    document.getElementById('panelXp').textContent = stage.xp;

    const completeBtn = document.getElementById('completeBtn');
    if(status === 'done'){
      completeBtn.textContent = 'Concluído ✓';
      completeBtn.disabled = true;
    } else {
      completeBtn.textContent = 'Marcar como concluído';
      completeBtn.disabled = false;
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

  document.getElementById('completeBtn').addEventListener('click', () => {
    if(activeIndex === null) return;
    if(!state.completed.includes(activeIndex)){
      state.completed.push(activeIndex);
      saveProgress(state);
    }
    closePanel();
    render();
  });

  window.addEventListener('resize', () => requestAnimationFrame(drawPath));
  window.addEventListener('load', () => requestAnimationFrame(drawPath));

  render();
})();