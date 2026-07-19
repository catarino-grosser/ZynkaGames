# Zynka RPG 3.0 — Motor de Campanhas Narrativas

Esta versão mantém o visual da 2.1 e evolui o motor para aventuras com aparência de RPG narrativo comercial.

## Principais recursos

- Aventuras/campanhas com até 50 capítulos.
- Catálogo em `aventuras/catalogo.js`.
- Inventário completo com itens consumíveis, chaves, relíquias e itens de missão.
- Sistema de batalha por turno.
- Experiência, níveis, vida, ataque, defesa e ouro.
- Salvamento automático no aparelho do jogador.
- Imagem de cenário por capítulo.
- Retratos de personagens em diálogos.
- Imagens de inimigos em batalhas.
- Música global ou por capítulo.
- Efeitos sonoros por ação.
- Eventos aleatórios.
- Tesouros escondidos.
- Enigmas simples com resposta digitada.
- Missões secundárias.
- Múltiplos finais.

## Estrutura

```txt
index.html
style.css
script.js
modelo-aventura.js
aventuras/
├── catalogo.js
├── reino-perdido.js
└── fortaleza-rei-esquecido.js
```

## Como adicionar uma nova aventura

1. Crie um arquivo dentro da pasta `aventuras`, por exemplo:

```txt
aventuras/piratas-do-norte.js
```

2. O arquivo precisa exportar uma aventura:

```js
const aventura = {
  id: 'piratas_do_norte',
  title: 'Piratas do Norte',
  icon: '🏴‍☠️',
  genre: 'Piratas',
  difficulty: 'Média',
  estimatedTime: '30 a 45 min',
  desc: 'Uma aventura de piratas, mapas, batalhas e tesouros.',
  start: 'cap01',
  maxChapters: 15,
  assets: { music: '', sfx: {} },
  chapters: {
    cap01: {
      title: '1. O Porto em Chamas',
      image: '',
      scene: 'Descrição visual do cenário.',
      text: 'Texto narrativo com 2 ou 3 parágrafos.',
      dialogue: {
        name: 'Capitã Marina',
        portrait: '',
        lines: ['Texto do diálogo.']
      },
      choices: [{ text: 'Continuar', to: 'cap02' }]
    },
    cap02: {
      title: '2. Emboscada',
      text: 'Um inimigo bloqueia o caminho.',
      enemy: {
        name: 'Bandido',
        hp: 14,
        atk: 4,
        def: 1,
        xp: 10,
        rewardGold: 5
      },
      winTo: 'cap03',
      loseTo: 'derrota'
    },
    derrota: {
      title: 'Derrota',
      text: 'Você caiu em combate.',
      end: true
    }
  },
  items: {}
};

export default aventura;
```

### Capítulos de combate (`enemy`)

Todo capítulo com o campo `enemy` vira uma batalha automaticamente e
precisa de dois destinos obrigatórios:

- `winTo`: capítulo para onde o jogador vai ao vencer.
- `loseTo`: capítulo para onde o jogador vai ao perder (normalmente
  `'derrota'`). Se omitido, o motor usa `'derrota'` como padrão — então
  toda aventura deve ter um capítulo com esse id.

### Itens consumíveis em batalha

Durante uma batalha, o jogo mostra automaticamente um botão para cada
item do inventário do herói que tenha a propriedade `heal` em `items`,
por exemplo:

```js
items: {
  pao: { name: 'Pão de Viagem', type: 'consumable', heal: 4 },
  pocao_vida: { name: 'Poção de Vida', type: 'consumable', heal: 12 }
}
```

Se a sua aventura não distribuir nenhum item com `heal` (via `effect`,
`treasure` ou `reward`), nenhum botão de cura aparece em combate — o
que é válido, mas vale decidir isso de propósito.

3. Adicione o arquivo no catálogo:

```js
export const aventuraArquivos = [
  './aventuras/reino-perdido.js',
  './aventuras/fortaleza-rei-esquecido.js',
  './aventuras/piratas-do-norte.js'
];
```

4. Envie para GitHub/Netlify.

## Como usar imagens e sons

Você pode criar estas pastas:

```txt
assets/
├── img/
└── audio/
```

Exemplos:

```js
image: 'assets/img/fortaleza.jpg'
portrait: 'assets/img/guarda.png'
enemy: { image: 'assets/img/goblin.png' }
assets: { music: 'assets/audio/tema.mp3' }
```

Se deixar o campo vazio (`''`), o jogo funciona normalmente sem imagem ou áudio.

## Campos novos da versão 3.0

### Cenário

```js
scene: 'Descrição visual curta do local.'
```

### Diálogo com retrato

```js
dialogue: {
  name: 'Nome do personagem',
  portrait: 'assets/img/personagem.png',
  lines: ['Primeira fala.', 'Segunda fala.']
}
```

### Evento aleatório

```js
randomEvent: {
  chance: 0.5,
  text: 'Algo inesperado acontece.',
  reward: { gold: 10 },
  damage: 3
}
```

### Tesouro escondido

```js
treasure: {
  id: 'bau_secreto',
  text: '💰 Procurar baú secreto',
  requiresItem: 'chave_antiga',
  reward: { gold: 20, addItems: [{ id: 'rubi', qty: 1 }] }
}
```

### Enigma

```js
puzzle: {
  question: 'Qual palavra abre a porta?',
  answer: 'verdade',
  successText: 'A porta se abre.',
  reward: { xp: 10 },
  setFlag: 'porta_aberta'
}
```

Se `successTo` não for definido, o jogador continua no mesmo capítulo
após acertar (útil quando o enigma só libera uma escolha via
`requiresFlag`, como no `modelo-aventura.js`). O enigma não é
mostrado novamente depois de resolvido, mesmo sem `successTo`.

### Missão secundária

```js
sideQuest: {
  id: 'flores_tumulo',
  title: 'Flores para os Caídos',
  desc: 'Encontre flores e leve ao túmulo dos soldados.'
}
```

Para concluir uma missão em uma escolha:

```js
{
  text: 'Entregar flores',
  to: 'cap10',
  completeSideQuest: 'flores_tumulo',
  sideQuestReward: { xp: 20, gold: 10 }
}
```

Ou em um inimigo:

```js
enemy: {
  name: 'Gárgula',
  hp: 25,
  atk: 7,
  def: 3,
  xp: 20,
  completeSideQuest: 'flores_tumulo',
  sideQuestReward: { xp: 20 }
}
```

## Aventuras incluídas

- `O Reino Perdido` — aventura original maior.
- `A Fortaleza do Rei Esquecido` — campanha 3.0 com 15 capítulos e todos os novos recursos.
