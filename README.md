# Zynka RPG 2.0

Esta versão mantém o visual do protótipo inicial, mas troca o motor por uma base mais forte para aventuras maiores.

## O que foi adicionado

- Aventuras com limite seguro de até 50 capítulos.
- Inventário completo com itens e quantidades.
- Sistema de batalha por turno.
- Vida máxima, ataque, defesa, ouro, XP e níveis.
- Salvamento automático no navegador com `localStorage`.
- Suporte a imagem por capítulo.
- Suporte a imagem por inimigo.
- Suporte a música de fundo e efeitos sonoros.
- Formato de aventura mais rico, para criar histórias sem mexer no motor.

## Arquivos principais

- `index.html`: estrutura da página.
- `style.css`: visual do app.
- `script.js`: motor RPG 2.0 e aventuras cadastradas.
- `modelo-aventura.js`: modelo limpo para criar novas aventuras.

## Como criar uma aventura nova

No arquivo `script.js`, procure:

```js
const adventures = {
```

Dentro desse objeto, adicione uma nova aventura no mesmo formato da aventura `reino`.

Cada aventura precisa ter:

```js
id: 'minha_aventura',
title: 'Minha Aventura',
icon: '🐉',
genre: 'Fantasia',
difficulty: 'Fácil',
estimatedTime: '15 min',
desc: 'Descrição curta.',
start: 'cap01',
chapters: {},
items: {}
```

## Como adicionar imagens

Crie uma pasta, por exemplo:

```text
assets/reino/cap01.jpg
assets/reino/goblin.jpg
```

Depois coloque no capítulo:

```js
image: 'assets/reino/cap01.jpg'
```

E no inimigo:

```js
enemy: {
  name: 'Goblin',
  image: 'assets/reino/goblin.jpg'
}
```

## Como adicionar música e sons

Coloque os arquivos em uma pasta, por exemplo:

```text
assets/audio/musica-reino.mp3
assets/audio/ataque.mp3
assets/audio/vitoria.mp3
```

Depois preencha:

```js
assets: {
  music: 'assets/audio/musica-reino.mp3',
  sfx: {
    attack: 'assets/audio/ataque.mp3',
    victory: 'assets/audio/vitoria.mp3'
  }
}
```

Se deixar vazio, o jogo funciona normalmente sem áudio.

## Tipos de capítulo

### Capítulo narrativo

```js
cap01: {
  title: '1. Começo',
  text: 'Texto da história.',
  choices: [
    { text: 'Seguir', to: 'cap02' }
  ]
}
```

### Capítulo com efeito

```js
cap02: {
  title: 'Tesouro',
  text: 'Você encontrou ouro e uma poção.',
  effect: {
    gold: 10,
    addItems: [{ id: 'pocao_vida', qty: 1 }]
  },
  choices: [
    { text: 'Continuar', to: 'cap03' }
  ]
}
```

### Capítulo com batalha

```js
cap03: {
  title: 'O Goblin',
  text: 'Um goblin aparece.',
  enemy: {
    id: 'goblin',
    name: 'Goblin',
    hp: 12,
    atk: 4,
    def: 1,
    xp: 10,
    rewardGold: 5,
    rewardItems: [{ id: 'dente_goblin', qty: 1 }]
  },
  winTo: 'cap04',
  loseTo: 'derrota'
}
```

### Escolha com item obrigatório

```js
{ text: 'Abrir porta secreta', to: 'cap10', requiresItem: 'chave_coroa' }
```

## Observação importante

O salvamento é local. Isso quer dizer que salva no aparelho e no navegador onde o jogador está usando. Para salvar na nuvem com Firebase, o próximo passo seria ligar o `save()` e o `load()` ao Firestore.
