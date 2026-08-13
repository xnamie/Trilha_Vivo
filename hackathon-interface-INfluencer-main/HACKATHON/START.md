# 🚀 COMECE AQUI — Programa Influencer Vivo

## Como Acessar o Site

### 1️⃣ Abra o navegador e vá para:
```
file:///c:\Users\40418550\Downloads\projeto07\hackathon-interface-INfluencer-main\HACKATHON\index.html
```

Ou simplesmente abra o arquivo `index.html` em seu navegador (clique com botão direito → "Abrir com" → Chrome/Firefox/Safari)

### 2️⃣ Você verá o Dashboard do Influencer Mariana

🎯 **Função do Botão Toggle** (canto superior direito):
- Clique no botão **"Influencer"** no topo direito
- Confirm a mudança
- A página recarrega com o Dashboard do Estagiário (João Pedro)
- Clique novamente para voltar

### 3️⃣ Navegue pelos menus

**Como Influencer (Mariana):**
- 📊 Dashboard Inicial
- 🎓 Minha Trilha
- 💬 Feedback Contínuo (novo!)
- 📅 Calendário (novo!)
- 🏆 Minhas Conquistas (novo!)

**Como Estagiário (João Pedro):**
- 📊 Dashboard Inicial
- 🎓 Minha Trilha
- 💬 Meus Feedbacks (novo!)
- 🏆 Minhas Conquistas (novo!)
- *(Calendário não aparece — é só para Influencer)*

---

## 📋 O Que Está Pronto (Fase 3)

✅ **7 páginas HTML** — Totalmente funcionais
✅ **Toggle Influencer ↔ Estagiário** — Com localStorage
✅ **Feedbacks bidirecional** — Influencer registra, Estagiário visualiza
✅ **Calendário** — Visualizar e criar eventos
✅ **Badges/Conquistas** — Grid, filtros, modal
✅ **Responsivo** — Funciona em mobile, tablet, desktop
✅ **Acessível** — WCAG 2.1

---

## 🎮 Teste as Funcionalidades

### Feedbacks (feedbacks.html)
1. Como **Influencer**: Clique "Feedback Contínuo"
   - Preencha: Estagiário, Rating (1-5 ⭐), Categoria, Texto
   - Clique "Enviar Feedback"
   - Vê seu feedback na lista abaixo

2. Como **Estagiário**: Clique "Meus Feedbacks"
   - Vê feedbacks recebidos de Mariana
   - Tem badge "Não lido" em roxo
   - Clique para ler (marca como lido)

### Calendário (calendario.html)
1. Como **Influencer**: Clique "Calendário"
   - Navegue entre meses (← Anterior, Próximo →)
   - Clique em qualquer data para criar evento
   - Preencha: Data, Hora, Título, Descrição, Participantes
   - Clique "Salvar Evento"
   - Vê eventos no calendário e na lista abaixo

### Badges (badges.html)
1. Como **Influencer** ou **Estagiário**: Clique "Minhas Conquistas"
   - Vê grid de 12 badges
   - 8 conquistadas (verde ✓), 4 bloqueadas (cinza 🔒)
   - Clique em qualquer badge para detalhes
   - Use filtros (Todas, Conquistadas, Em Progresso, etc)

### Trilha (trilha.html ou estagiario-trilha.html)
1. Como **Influencer**: Clique "Minha Trilha"
   - 8 etapas com ícones (Onboarding Vivo)
   - Clique em etapa para abrir modal
   - Clique "Marcar como Concluído" para adicionar XP
   - Vê progresso na linha verde

2. Como **Estagiário**: Clique "Minha Trilha"
   - Mostra: "75% concluído · 6/8 etapas"
   - Barra de progresso visual
   - Mesma funcionalidade do Influencer

---

## 💾 Dados Estão Salvos (localStorage)

Seus dados (feedbacks, eventos, progresso trilha) são salvos automaticamente em **localStorage** do navegador:
- Feche a aba, abra novamente → dados ainda estão lá
- Limpe cache → dados apagam
- Mude de navegador (Chrome → Firefox) → dados não sincronizam (ainda)

---

## 🔐 Usuários de Teste

### Influencer
- **Nome**: Mariana Silva
- **ID**: u-001
- **Role**: Influencer (Platina)
- **Pontos**: 980 XP

### Estagiários
- **Nome**: João Pedro da Silva
  - **ID**: u-002
  - **Role**: Estagiário (Nível 3)
  - **Pontos**: 420 XP

- **Nome**: Beatriz Costa Oliveira
  - **ID**: u-003
  - **Role**: Estagiário (Nível 2)
  - **Pontos**: 280 XP

---

## 📚 Documentação Completa

Para mais detalhes, veja:
- **README.md** — Visão geral técnica
- **REQUISITOS.md** — Especificação de requisitos (RF + RNF)
- **CHANGELOG.md** — Histórico de versões

---

## ⚠️ Problemas Comuns

### "A página não carrega"
- Certifique-se que o arquivo está em: `c:\Users\40418550\Downloads\projeto07\hackathon-interface-INfluencer-main\HACKATHON\`
- Abra o DevTools (F12) → Console → procure por erros

### "Toggle não funciona"
- Certifique-se que localStorage está habilitado (não é navegação privada)
- Verifique se `data.js` está sendo carregado (DevTools → Network)

### "Dados não aparecem"
- Abra DevTools → Console
- Digite: `localStorage.getItem('vivo_user_role')` → deve retornar `"influencer"` ou `"estagiario"`
- Se retorna `null`, os dados foram deletados

---

## 🎉 Próximos Passos (Fase 4)

- Backend API para persistir dados em servidor
- Autenticação real (login/senha)
- Notificações em tempo real
- Deploy em produção

---

**Versão**: 1.2  
**Status**: ✅ Pronto para usar  
**Atualizado**: 12 de Agosto de 2026

Aproveite! 🚀
