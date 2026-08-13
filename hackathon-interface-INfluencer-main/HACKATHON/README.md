# 🎯 Programa Influencer Vivo — Hackathon Interface
**Documentação v1.2** | Agosto 2026 | Design System: MarcaVivo

---

## 📋 Visão Geral

Sistema de dashboard duplo para o Programa Influencer Vivo, permitindo que **Influencers** gerenciem estagiários e que **Estagiários** acompanhem seu desenvolvimento em trilhas educacionais.

**Status**: ✅ Fase 1, 2 & 3 completas | 🚀 Pronto para acessar

---

## 📦 Estrutura de Arquivos

```
HACKATHON/
├── 📄 index.html               ← Dashboard Influencer ✅
├── 📄 trilha.html              ← Trilha Influencer ✅
├── 📄 estagiario-dashboard.html ← Dashboard Estagiário ✅
├── 📄 estagiario-trilha.html   ← Trilha Estagiário ✅
├── 📄 feedbacks.html           ← Feedbacks (compartilhado) ✅
├── 📄 calendario.html          ← Calendário (influencer-only) ✅
├── 📄 badges.html              ← Conquistas (compartilhado) ✅
├── 📄 style.css                ← Design System compartilhado ✅
├── 📄 script.js                ← Lógica JS modularizada (v2.0) ✅
├── 📄 data.js                  ← Mock data + utilitários ✅
├── 📄 REQUISITOS.md            ← Requisitos Funcionais & Não-Funcionais ✅
├── 📄 CHANGELOG.md             ← Histórico de versões ✅
└── 📄 README.md                ← Este arquivo
```

### Próximos (A implementar - Fase 4)
```
├── 📄 pdi.html                 (PDI - Plano de Desenvolvimento Individual)
├── 📄 materiais.html           (Biblioteca de materiais)
├── /api/                       (Backend API - Node.js/Python)
└── /assets/                    (Imagens, ícones em alta resolução)
```

---

## 🔧 Requisitos Técnicos

- **Navegador**: Chrome, Firefox, Safari, Edge (2 últimas versões)
- **Linguagens**: HTML5, CSS3, JavaScript (ES6+)
- **Dependências**: Nenhuma (sem frameworks)
- **Storage**: localStorage (para persistência)
- **Design System**: Paleta Vivo + Tipografia Poppins

---

## 🚀 Como Usar

### 1. **Abrir o Projeto**
```bash
# Abra index.html em seu navegador (ou use um servidor local)
# Recomendado: VS Code + Live Server
```

### 2. **Alternar entre Influencer e Estagiário**
- Clique no botão **"Influencer"** no topo direito (ao lado da bell de notificações)
- Confirme a mudança
- A página recarrega com a nova interface

### 3. **Dados Persistem Localmente**
- localStorage armazena o perfil atual
- Progresso da trilha é mantido mesmo após recarregar

---

## 📊 Arquivos Principais

### **data.js** — Mock Data & State Management
Contém toda a estrutura de dados compartilhada entre Influencer e Estagiário.

**Estruturas principais:**
```javascript
// Usuários
USERS.mariana          // Influencer (ID: u-001)
USERS.joao            // Estagiário (ID: u-002)
USERS.beatriz         // Estagiária (ID: u-003)

// Funções principais
loadCurrentUser()           // Carrega usuário do localStorage
toggleUserRole()            // Alterna entre roles
getActivitiesByRole(role)   // Retorna atividades por perfil
getUnreadFeedbackCount()    // Conta feedbacks não-lidos
calculateTrilhaProgress()   // % de progresso
```

**Storage Keys:**
```javascript
vivo_user_role              // 'influencer' ou 'estagiario'
vivo_user_id                // ID do usuário atual
vivo_trilha_progresso       // Array de etapas concluídas
vivo_feedbacks_read         // Array de feedbacks lidos
```

---

### **script.js** — Lógica Refatorada (v2.0)

**Módulos inicializados automaticamente:**

1. **initRoleToggle()** — Botão toggle Influencer ↔ Estagiário
2. **initRoleBasedUI()** — Renderização condicional por `[data-role]`
3. **initMiniRings()** — Anéis de progresso dos estagiários
4. **initTrilha()** — Jornada educacional (etapas, modal, progresso)
5. **initNotifications()** — Badge de notificações (bell)
6. **initFeedbacks()** — Módulo de feedbacks (adaptativo)
7. **initCalendar()** — Calendário de eventos (influencer-only)
8. **initSidebarAdaptation()** — Adapta menu lateral por perfil
9. **initUserChip()** — Atualiza nome/role no topbar

---

### **style.css** — Design System

**Variáveis CSS principais:**
```css
--vivo-purple: #660099      /* Cor primária */
--vivo-blue: #0066FF        /* Cor secundária */
--vivo-purple-light: #BC4AFF
--vivo-pink: #FF97B2
--vivo-green: #B2D681
--vivo-lime: #81D300
--radius-sm: 10px
--radius-md: 14px
--radius-lg: 20px
--radius-xl: 26px
--shadow: 0 14px 34px -18px rgba(55,0,83,0.35)
```

**Sistema de Renderização Condicional:**
```html
<!-- Visível apenas para Influencer -->
<div data-role="influencer-only">
  Gestão dos Estagiários
</div>

<!-- Visível apenas para Estagiário -->
<div data-role="estagiario-only">
  Meu Influencer
</div>
```

---

### **REQUISITOS.md** — Especificação Completa

Documento detalhado com:
- ✅ Requisitos Funcionais (RF-001 até RF-805)
- ⚙️ Requisitos Não-Funcionais (RNF-101 até RNF-901)
- 📋 Tabelas de Status (não iniciado, em progresso, concluído)
- 🎯 Critérios de Aceição
- 📝 Estrutura de Dados esperada

**Ver**: [REQUISITOS.md](./REQUISITOS.md)

---

## 🎨 Design Patterns Utilizados

### 1. **IIFE (Immediately Invoked Function Expression)**
Cada módulo roda em seu próprio escopo para evitar conflitos:
```javascript
(function initModulo(){
  // Código isolado
  if(!element) return; // pula se não existir
})();
```

### 2. **Data Attributes para Renderização Condicional**
```html
<div data-role="influencer-only">...</div>
<div data-section="feedbacks">...</div>
```

### 3. **localStorage para Persistência**
```javascript
localStorage.getItem('vivo_user_role')
localStorage.setItem('vivo_user_role', newRole)
```

### 4. **SVG Symbols para Ícones**
Reutilizáveis e escaláveis:
```html
<svg><use href="#i-home"/></svg>
```

---

## 🔄 Fluxo: Toggle Influencer ↔ Estagiário

```
┌─────────────────────────────────────┐
│   Clique no botão "Influencer"      │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   Confirm dialog: trocar perfil?    │
└──────────────┬──────────────────────┘
               │
         [SIM] │ [NÃO]
               ▼
┌─────────────────────────────────────┐
│ Salva nova role em localStorage     │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ location.reload() após 300ms        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ script.js lê novo role do storage   │
│ renderização condicional ativa      │
│ dados adaptam-se automaticamente    │
└─────────────────────────────────────┘
```

---

## 🧪 Dados de Teste

### Usuários Disponíveis
| ID | Nome | Role | Status |
|---|---|---|---|
| u-001 | Mariana | Influencer | ✅ Principal |
| u-002 | João Pedro | Estagiário | ⏳ Estagiário de Mariana |
| u-003 | Beatriz Lima | Estagiário | ⏳ Estagiária de Mariana |

### Mudança de Usuário
Atualmente, o sistema presume o usuário. Para implementar autenticação real:

**TODO:**
```javascript
// data.js - adicionar função de login
function loginAs(userId) {
  const user = Object.values(USERS).find(u => u.id === userId);
  if(user) {
    localStorage.setItem('vivo_user_id', userId);
    location.reload();
  }
}
```

---

## 📝 Console Logs para Debugging

Abra o **Console do Navegador** (F12) para ver logs:

```
✅ App Influencer Vivo inicializado
🚀 App inicializado com usuário: Mariana
Role atual: influencer
📡 Módulo de Notificações
📝 Módulo de Feedbacks do Influencer
📅 Módulo de Calendário (Influencer Only)
```

---

## 🎯 Próximos Passos (Roadmap)

### Fase 1: Estrutura ✅ (Concluída)
- ✅ Refatoração do código (script.js v2.0)
- ✅ Criação de data.js com mock data
- ✅ Botão toggle Influencer ↔ Estagiário
- ✅ CSS modularizado para ambos os perfis
- ✅ Documento de Requisitos (RF + RNF)

### Fase 2: Interfaces ✅ (Concluída)
- ✅ Criar estagiario-dashboard.html (novo dashboard do estagiário)
- ✅ Criar estagiario-trilha.html (trilha educacional com contadores)
- ✅ Adaptar script.js para suportar ambas as trilhas
- ✅ Adicionar CSS para componentes do estagiário

### Fase 3: Funcionalidades ✅ (Concluída)
- ✅ **feedbacks.html** — Página de feedbacks bidirecional (Influencer + Estagiário)
- ✅ **calendario.html** — Calendário de eventos (Influencer-only, navegável, criar eventos)
- ✅ **badges.html** — Página de badges/conquistas (Grid, filtros, modal detalhado)
- ✅ Links atualizados em todos os sidebars
- ✅ Renderização condicional (data-role) para Influencer vs Estagiário

### Fase 4: Backend & Deploy (A Implementar)
- ⏳ Backend API (Node.js / Python)
- ⏳ Banco de dados (PostgreSQL / MongoDB)
- ⏳ Autenticação real (JWT/OAuth)
- ⏳ Sincronização servidor
- ⏳ Notificações push (WebSockets)
- ⏳ Deploy staging → produção
- ⏳ PDI.html (Plano de Desenvolvimento Individual)
- ⏳ materiais.html (Biblioteca de conteúdo)

---

## 🐛 Troubleshooting

### Problema: Botão toggle não aparece
**Solução:** Verifique se `data.js` é carregado ANTES de `script.js`
```html
<script src="data.js"></script>  <!-- Ordem importante! -->
<script src="script.js"></script>
```

### Problema: localStorage não persiste
**Solução:** Verifique se o navegador permite localStorage
```javascript
// No console:
localStorage.getItem('vivo_user_role')  // deve retornar algo
```

### Problema: Trilha não anima
**Solução:** Abra Console e procure por erros de referência
```
Erro: Cannot find element with id "trail"
// = Você não está na página trilha.html
```

---

## 📞 Contato & Suporte

- **Time do Programa**: programainfluencer@vivo.com.br
- **Repositório**: (adicionar link futura)
- **Issues**: (adicionar link futura)

---

## 📄 Licença

Projeto interno Vivo — Todos os direitos reservados.

---

**Última atualização**: Agosto 12, 2026
**Versão**: 1.2 (Fase 3 - Funcionalidades: Feedbacks, Calendário, Badges)
