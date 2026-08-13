# 📋 Requisitos Funcionais e Não-Funcionais
## Programa Influencer Vivo — Hackathon Interface

---

## 🎯 **1. REQUISITOS FUNCIONAIS (RF)**

### **1.1 Autenticação & Perfil**

| ID | Descrição | Prioridade | Status |
|----|-----------|-----------|----|
| RF-001 | Usuário pode alternar entre interface Influencer e Estagiário | ALTA | ⏳ |
| RF-002 | Sistema persiste perfil ativo (localStorage) | ALTA | ⏳ |
| RF-003 | Exibir nome e rol do usuário no topbar | ALTA | ⏳ |
| RF-004 | Mostrar avatar com iniciais do nome | MÉDIA | ⏳ |

---

### **1.2 Dashboard Influencer**

| ID | Descrição | Prioridade | Status |
|----|-----------|-----------|----|
| RF-101 | Exibir contador de estagiários acompanhados | ALTA | ✅ |
| RF-102 | Exibir contador de pendências de feedback | ALTA | ✅ |
| RF-103 | Listar próximas atividades (reuniões, feedbacks) | ALTA | ✅ |
| RF-104 | Exibir estagiários com nome + progresso trilha (mini-ring) | ALTA | ✅ |
| RF-105 | Card com estatística: Progresso da trilha influencer | ALTA | ✅ |
| RF-106 | Link direto para comunidade Workvivo | MÉDIA | ⏳ |
| RF-107 | Mostrar nível/badges desbloqueados (Platina, etc) | MÉDIA | ⏳ |

---

### **1.3 Dashboard Estagiário**

| ID | Descrição | Prioridade | Status |
|----|-----------|-----------|----|
| RF-201 | Exibir evolução da trilha (progresso geral %) | ALTA | ⏳ |
| RF-202 | Informações do influencer atribuído (nome, avatar, link contato) | ALTA | ⏳ |
| RF-203 | Exibir próxima entrega com deadline | ALTA | ⏳ |
| RF-204 | Listar próximas atividades (módulos, desafios) | ALTA | ⏳ |
| RF-205 | Atalho para comunidade estagiários (Workvivo) | MÉDIA | ⏳ |
| RF-206 | Contador de pendências (feedbacks não lidos) | MÉDIA | ⏳ |
| RF-207 | Visualizar nível + badges acumulados | MÉDIA | ⏳ |

---

### **1.4 Trilha Educacional**

| ID | Descrição | Prioridade | Status |
|----|-----------|-----------|----|
| RF-301 | Influencer: Visualizar trilha própria (etapas progressivas) | ALTA | ✅ |
| RF-302 | Influencer: Marcar etapas como concluídas | ALTA | ✅ |
| RF-303 | Estagiário: Visualizar trilha educacional (onboarding) | ALTA | ⏳ |
| RF-304 | Estagiário: Iniciar/completar módulos | ALTA | ⏳ |
| RF-305 | Estagiário: Visualizar progresso por módulo (%) | ALTA | ⏳ |
| RF-306 | Trilha: Exibir etapas bloqueadas/liberadas (sequencial) | ALTA | ⏳ |
| RF-307 | Trilha: Modal com detalhes da etapa (duração, formato, XP) | ALTA | ⏳ |

---

### **1.5 Feedbacks**

| ID | Descrição | Prioridade | Status |
|----|-----------|-----------|----|
| RF-401 | Influencer: Registrar feedback para estagiário | ALTA | ⏳ |
| RF-402 | Influencer: Visualizar histórico de feedbacks enviados | MÉDIA | ⏳ |
| RF-403 | Estagiário: Visualizar feedbacks recebidos do influencer | ALTA | ⏳ |
| RF-404 | Estagiário: Marcar feedback como lido | MÉDIA | ⏳ |
| RF-405 | Feedback: Mostrar data, autor, e rating (⭐) | MÉDIA | ⏳ |
| RF-406 | Feedback: Categorias (Progresso, Comportamento, Técnico, Soft Skills) | MÉDIA | ⏳ |

---

### **1.6 Calendário (Influencer)**

| ID | Descrição | Prioridade | Status |
|----|-----------|-----------|----|
| RF-501 | Exibir calendário mensal de encontros | MÉDIA | ⏳ |
| RF-502 | Marcar datas de check-in, feedbacks, reuniões | MÉDIA | ⏳ |
| RF-503 | Evento: Mostrar hora, duração, participantes | MÉDIA | ⏳ |
| RF-504 | Agendar novo evento/encontro | MÉDIA | ⏳ |

---

### **1.7 Plano de Desenvolvimento (Influencer)**

| ID | Descrição | Prioridade | Status |
|----|-----------|-----------|----|
| RF-601 | Visualizar PDI (Plano de Desenvolvimento Individual) | MÉDIA | ⏳ |
| RF-602 | Editar metas do estagiário | MÉDIA | ⏳ |
| RF-603 | Acompanhar progresso das metas | MÉDIA | ⏳ |

---

### **1.8 Nível & Badges**

| ID | Descrição | Prioridade | Status |
|----|-----------|-----------|----|
| RF-701 | Influencer: Nível sobe com badges dos estagiários | ALTA | ⏳ |
| RF-702 | Estagiário: Sistema de pontos (XP) por etapas concluídas | ALTA | ⏳ |
| RF-703 | Estagiário: Badges desbloqueadas ao atingir milestones | ALTA | ⏳ |
| RF-704 | Visualizar lista de badges desejadas | MÉDIA | ⏳ |

---

### **1.9 Navegação & Componentes Globais**

| ID | Descrição | Prioridade | Status |
|----|-----------|-----------|----|
| RF-801 | Sidebar com navegação (ambas as interfaces) | ALTA | ✅ |
| RF-802 | Topbar com bell (notificações), user-chip, perfil | ALTA | ✅ |
| RF-803 | Link "Ajuda" → contato time do programa | MÉDIA | ⏳ |
| RF-804 | Botão toggle Influencer ↔ Estagiário (topo) | ALTA | ⏳ |
| RF-805 | Breadcrumb ou título de página | MÉDIA | ⏳ |

---

## ⚙️ **2. REQUISITOS NÃO-FUNCIONAIS (RNF)**

### **2.1 Performance**

| ID | Descrição | Métrica | Prioridade |
|----|-----------|----|-----------|
| RNF-101 | Tempo de carregamento inicial | < 2s | ALTA |
| RNF-102 | Time to Interactive (TTI) | < 3s | ALTA |
| RNF-103 | Renderização suave (60 FPS) | Não fazer jank | MÉDIA |
| RNF-104 | Tamanho do bundle CSS | < 50KB | MÉDIA |
| RNF-105 | Tamanho do bundle JS | < 100KB | MÉDIA |

---

### **2.2 Responsividade**

| ID | Descrição | Breakpoints | Prioridade |
|----|-----------|----|-----------|
| RNF-201 | Mobile First | 320px, 480px | ALTA |
| RNF-202 | Tablet | 768px, 1024px | ALTA |
| RNF-203 | Desktop | 1200px+ | ALTA |
| RNF-204 | Layout adapta sidebar (collapse em mobile) | < 768px | ALTA |

---

### **2.3 Acessibilidade (WCAG 2.1 AA)**

| ID | Descrição | Critério | Prioridade |
|----|-----------|----|-----------|
| RNF-301 | Contraste mínimo texto/fundo | 4.5:1 (AA) | ALTA |
| RNF-302 | Todos os elementos interativos com `aria-label` | Sem omitir | ALTA |
| RNF-303 | Navegação por teclado (Tab, Enter, Esc) | 100% funcional | ALTA |
| RNF-304 | Alt-text em imagens/ícones | Obrigatório | ALTA |
| RNF-305 | Cores não como único indicador | Adicionar símbolos | MÉDIA |
| RNF-306 | Suporte a leitores de tela | nvda, jaws | MÉDIA |

---

### **2.4 Compatibilidade**

| ID | Browser | Versão | Suporte |
|----|----|-----------|-----------|
| RNF-401 | Chrome | Últimas 2 | Obrigatório |
| RNF-402 | Firefox | Últimas 2 | Obrigatório |
| RNF-403 | Safari | Últimas 2 | Obrigatório |
| RNF-404 | Edge | Últimas 2 | Obrigatório |
| RNF-405 | Mobile Safari (iOS) | 12+ | Obrigatório |
| RNF-406 | Chrome (Android) | 8+ | Obrigatório |

---

### **2.5 Segurança**

| ID | Descrição | Medida | Prioridade |
|----|-----------|----|-----------|
| RNF-501 | Prevenção XSS | Sanitizar inputs/outputs | ALTA |
| RNF-502 | Proteção CSRF | Validar origem de requests | MÉDIA |
| RNF-503 | Dados sensíveis (feedbacks) | Nunca em localStorage sem criptografia | ALTA |
| RNF-504 | Injeção JS | Usar textContent, não innerHTML | ALTA |

---

### **2.6 Persistência & Dados**

| ID | Descrição | Solução | Prioridade |
|----|-----------|----|-----------|
| RNF-601 | Progresso da trilha | localStorage + JSON | ALTA |
| RNF-602 | Feedbacks | localStorage (ou Backend API futura) | ALTA |
| RNF-603 | Perfil ativo (Influencer/Estagiário) | localStorage com key `userRole` | ALTA |
| RNF-604 | Notificações não lidas | localStorage com array de IDs | MÉDIA |
| RNF-605 | Limpeza de dados expirados | TTL de 30 dias | MÉDIA |

---

### **2.7 Design System & Branding**

| ID | Descrição | Especificação | Prioridade |
|----|-----------|----|-----------|
| RNF-701 | Paleta Vivo | Roxo #660099, Azul #0066FF, Pink #FF97B2, etc | ALTA |
| RNF-702 | Tipografia | Poppins (web font) + fallback system | ALTA |
| RNF-703 | Spacing (Grid 4px) | Múltiplos de 4 (8, 12, 16, 20, 24, 28, 32) | ALTA |
| RNF-704 | Raios (Radius) | sm:10px, md:14px, lg:20px, xl:26px | ALTA |
| RNF-705 | Sombras (Elevation) | 3 níveis (sm, md, lg) | ALTA |
| RNF-706 | Ícones | SVG inline (scalable, colorable) | ALTA |

---

### **2.8 Usabilidade**

| ID | Descrição | Critério | Prioridade |
|----|-----------|----|-----------|
| RNF-801 | Feedback visual | Hover, active, focus estados | ALTA |
| RNF-802 | Mensagens de erro | Claras e acionáveis | ALTA |
| RNF-803 | Loading states | Spinners/skeletons | MÉDIA |
| RNF-804 | Confirmação destrutiva | Modal antes de deletar | MÉDIA |
| RNF-805 | Tooltip/Help text | Em elementos complexos | MÉDIA |

---

### **2.9 Localização & Internacionalização**

| ID | Descrição | Especificação | Prioridade |
|----|-----------|----|-----------|
| RNF-901 | Idioma padrão | Português (Brasil) | ALTA |
| RNF-902 | Formato de data | DD/MM/YYYY (pt-BR) | ALTA |
| RNF-903 | Moeda (futuro) | BRL (R$) | BAIXA |

---

## 📊 **3. CRITÉRIOS DE ACEIÇÃO**

### **Trilha Influencer (Existente)**
- ✅ Etapas aparecem sequencialmente
- ✅ Progresso persiste em localStorage
- ✅ Modal detalhado ao clicar na etapa
- ✅ Cálculo automático de XP total

### **Dashboard Influencer (Melhorado)**
- ✅ Botão toggle Influencer/Estagiário visível no topbar
- ✅ Cards de estatística responsive
- ✅ Links funcionais para seções (Feedbacks, Calendário, etc)
- ✅ Badge de notificações atualiza corretamente

### **Dashboard Estagiário (Novo)**
- ⏳ Exibir influencer atribuído com foto
- ⏳ Progresso trilha em % visível
- ⏳ Próxima entrega com countdown
- ⏳ Aceitar/visualizar feedbacks

### **Responsividade**
- ⏳ Em mobile (< 768px): sidebar collapse ou drawer
- ⏳ Cards stackam verticalmente
- ⏳ Textos legíveis sem zoom

### **Acessibilidade**
- ⏳ Site navegável apenas com teclado
- ⏳ Contraste atende WCAG AA
- ⏳ Leitores de tela entendem estrutura

---

## 📝 **4. NOTAS & CONSIDERAÇÕES**

### **Estrutura de Dados (mock)**
```javascript
// Usuário
{ id, name, role: 'influencer' | 'estagiario', avatar, email }

// Estagiário (gerenciado por influencer)
{ id, name, role: 'estagiario', influencerId, progress: %, trilhaProgress: [...] }

// Feedback
{ id, fromId, toId, date, category, rating, text, status: 'lido'|'não-lido' }

// Trilha
{ id, stages: [...], currentStage, completed: [...] }

// Evento/Calendário
{ id, date, title, time, duration, participants: [...] }
```

### **Página: Transição entre Influencer ↔ Estagiário**
- Botão no topbar (direita, próximo ao user-chip)
- Confirm modal: "Alternar para Estagiário?"
- Reload página com nova role em localStorage
- Sidebar + conteúdo ajustam automaticamente

### **Futuro (Out of Scope)**
- Integração Backend API (salvar dados no servidor)
- Autenticação real (JWT, OAuth)
- Notificações push
- Integração Workvivo
- Mobile app (React Native / Flutter)

---

**Documento de Requisitos v1.0** | Agosto 2026 | Programa Influencer Vivo
