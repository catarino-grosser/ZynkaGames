# Zynka RPG 2.1 — Sistema de Catálogo

Esta versão mantém o visual e o motor RPG 2.0, mas adiciona um sistema simples para cadastrar novas aventuras sem mexer no `index.html` nem no motor principal.

## O que mudou

- Nova pasta `aventuras/`.
- Novo arquivo `aventuras/catalogo.js`.
- A aventura exemplo `O Reino Perdido` foi movida para `aventuras/reino-perdido.js`.
- O `script.js` agora carrega automaticamente todas as aventuras listadas no catálogo.
- O `index.html` usa `<script type="module" src="script.js"></script>` para permitir importar aventuras.

## Como adicionar uma nova aventura

1. Crie um novo arquivo dentro da pasta `aventuras`.

Exemplo:

```txt
aventuras/floresta-sombria.js
```

2. O arquivo precisa exportar uma aventura.

Exemplo resumido:

```js
const aventura = {
  id: 'floresta_sombria',
  title: 'A Floresta Sombria',
  icon: '🌲',
  genre: 'Fantasia',
  difficulty: 'Fácil',
  estimatedTime: '15 a 25 min',
  desc: 'Uma aventura nova com exploração, itens e batalhas.',
  start: 'cap01',
  maxChapters: 10,
  assets: { music: '', sfx: {} },
  chapters: {
    cap01: {
      title: '1. Entrada da Floresta',
      text: 'Texto do capítulo...',
      choices: [{ text: 'Continuar', to: 'cap02' }]
    }
  },
  items: {}
};

export default aventura;
```

3. Abra `aventuras/catalogo.js` e adicione uma linha com o arquivo novo:

```js
export const aventuraArquivos = [
  './aventuras/reino-perdido.js',
  './aventuras/floresta-sombria.js'
];
```

4. Envie os arquivos para o GitHub/Netlify.

A nova aventura aparecerá na tela inicial automaticamente.

## Importante

Em sites estáticos como Netlify e GitHub Pages, o navegador não consegue listar sozinho todos os arquivos de uma pasta. Por isso usamos o `catalogo.js` como uma lista simples e segura.

## Recursos mantidos

- aventuras de até 50 capítulos;
- inventário;
- batalha por turno;
- XP e níveis;
- ouro;
- salvamento automático no aparelho;
- imagens por capítulo e inimigo;
- música e efeitos sonoros;
- formato rico de aventura em JavaScript/JSON.
