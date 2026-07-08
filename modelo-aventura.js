// MODELO DE AVENTURA PARA ZYNKA RPG 3.0
// Copie este arquivo, renomeie e coloque dentro da pasta aventuras.
// Depois adicione o caminho do novo arquivo em aventuras/catalogo.js.

const aventura = {
  id: 'minha_aventura',
  title: 'Minha Nova Aventura',
  icon: '🐉',
  genre: 'Fantasia',
  difficulty: 'Fácil',
  estimatedTime: '25 a 40 min',
  desc: 'Descrição curta da aventura.',
  start: 'cap01',
  maxChapters: 15,
  assets: {
    music: '',
    sfx: {
      click: '',
      attack: '',
      victory: '',
      item: '',
      levelup: '',
      puzzle: ''
    }
  },
  chapters: {
    cap01: {
      title: '1. Introdução',
      image: '',
      music: '',
      scene: 'Descrição visual do cenário.',
      text: 'Texto narrativo com 2 ou 3 parágrafos.\n\nSegundo parágrafo da cena.',
      dialogue: {
        name: 'Nome do NPC',
        portrait: '',
        lines: ['Primeira fala do personagem.', 'Segunda fala do personagem.']
      },
      sideQuest: {
        id: 'missao_exemplo',
        title: 'Missão Exemplo',
        desc: 'Descrição da missão secundária.'
      },
      effect: {
        gold: 5,
        addItems: [{ id: 'pocao_vida', qty: 1 }]
      },
      choices: [
        { text: 'Começar jornada', to: 'cap02' }
      ]
    },
    cap02: {
      title: '2. Tesouro e Evento Aleatório',
      text: 'Aqui o jogador pode encontrar um tesouro escondido e sofrer ou ganhar algo por evento aleatório.',
      randomEvent: {
        chance: 0.5,
        text: 'Um viajante misterioso passa por você e deixa cair uma moeda.',
        reward: { gold: 5 }
      },
      treasure: {
        id: 'bau_exemplo',
        text: '💰 Procurar baú escondido',
        reward: { gold: 10, addItems: [{ id: 'gema_azul', qty: 1 }] }
      },
      choices: [
        { text: 'Seguir em frente', to: 'cap03' }
      ]
    },
    cap03: {
      title: '3. Primeiro Combate',
      text: 'Um inimigo aparece no caminho.',
      enemy: {
        id: 'inimigo_01',
        name: 'Inimigo Inicial',
        hp: 14,
        atk: 4,
        def: 1,
        xp: 10,
        rewardGold: 5,
        rewardItems: [{ id: 'trofeu_inicial', qty: 1 }],
        image: ''
      },
      winTo: 'cap04',
      loseTo: 'derrota'
    },
    cap04: {
      title: '4. Enigma',
      text: 'Uma porta antiga bloqueia o caminho.',
      puzzle: {
        question: 'Qual palavra abre a porta?',
        answer: 'verdade',
        successText: 'A porta se abre.',
        failText: 'A porta permanece fechada.',
        reward: { xp: 10 },
        setFlag: 'porta_aberta'
      },
      choices: [
        { text: 'Entrar pela porta aberta', to: 'cap05', requiresFlag: 'porta_aberta' },
        { text: 'Procurar outro caminho', to: 'cap05', damage: 3, className: 'danger' }
      ]
    },
    cap05: {
      title: '5. Final',
      text: 'A aventura termina aqui. Expanda este modelo até 15, 20 ou 50 capítulos.',
      end: true
    },
    derrota: {
      title: 'Derrota',
      text: 'Você caiu em combate. Tente novamente.',
      end: true
    }
  },
  items: {
    pao: { name: 'Pão de Viagem', type: 'consumable', heal: 4, desc: 'Restaura 4 de vida.' },
    pocao_vida: { name: 'Poção de Vida', type: 'consumable', heal: 12, desc: 'Restaura 12 de vida.' },
    gema_azul: { name: 'Gema Azul', type: 'treasure', desc: 'Um tesouro raro.' },
    trofeu_inicial: { name: 'Troféu Inicial', type: 'quest', desc: 'Prova da primeira vitória.' }
  }
};

export default aventura;
