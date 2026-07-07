# Zynka RPG v2.0

Protótipo de plataforma de RPG interativo feito com HTML, CSS e JavaScript.

## O que mudou nesta versão

- Motor do jogo separado das aventuras.
- Aventuras locais em arquivos próprios na pasta `/aventuras`.
- Estrutura preparada para carregar aventuras do Firebase Firestore.
- Salvamento automático no navegador com `localStorage`.
- Guia Firebase incluído em `/docs/GUIA-FIREBASE.md`.

## Arquivos principais

```txt
index.html
css/style.css
js/app.js
js/game-engine.js
js/storage.js
js/firebase-config.js
js/firebase-service.js
aventuras/index.js
aventuras/reino-perdido.js
aventuras/cidade-dos-mortos.js
aventuras/missao-marte.js
docs/GUIA-FIREBASE.md
```

## Como testar rápido

Abra o projeto pelo Netlify ou por um servidor local. Como o JavaScript usa módulos, alguns navegadores podem bloquear se abrir apenas o arquivo `index.html` diretamente.

## Como ativar Firebase

Veja o arquivo:

```txt
docs/GUIA-FIREBASE.md
```
