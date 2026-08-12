# assets

Pasta reservada para arquivos estáticos do projeto: logo oficial da Vivo, ícones
customizados (SVG/PNG) para cada etapa da trilha, imagens de fundo, favicon etc.

No momento os ícones das etapas usam emojis diretamente no `js/script.js`
(campo `icon` de cada item em `STAGES`). Para trocar por ícones/imagens reais:

1. Coloque os arquivos aqui, ex: `assets/icons/etapa-01.svg`.
2. No `js/script.js`, troque `icon:"📡"` por algo como `icon:"<img src='../assets/icons/etapa-01.svg' alt=''>"`.
3. Se for usar a logo oficial da Vivo, salve como `assets/logo-vivo.svg` e troque
   o texto `.logo` no `html/index.html` por uma tag `<img>` apontando pra ela.
