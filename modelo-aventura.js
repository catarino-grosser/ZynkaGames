// MODELO DE AVENTURA PARA ZYNKA RPG 2.0
// Copie este bloco para dentro do objeto `adventures` no script.js.

const modeloAventura = {
  minha_aventura: {
    id: 'minha_aventura',
    title: 'Minha Nova Aventura',
    icon: '🐉',
    genre: 'Fantasia',
    difficulty: 'Fácil',
    estimatedTime: '15 a 20 min',
    desc: 'Descrição curta da aventura.',
    start: 'cap01',
    maxChapters: 10,
    assets: {
      music: '',
      sfx: {
        click: '',
        attack: '',
        victory: '',
        item: '',
        levelup: ''
      }
    },
    chapters: {
      cap01: {
        title: '1. Introdução',
        image: '',
        text: 'Texto inicial da aventura.',
        choices: [
          { text: 'Começar jornada', to: 'cap02' }
        ]
      },
      cap02: {
        title: '2. Primeiro Encontro',
        text: 'Aqui o jogador encontra um NPC, uma pista ou um item.',
        effect: {
          gold: 5,
          addItems: [{ id: 'pocao_vida', qty: 1 }]
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
          hp: 12,
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
        title: '4. Escolha Importante',
        text: 'Aqui o jogador toma uma decisão que muda a aventura.',
        choices: [
          { text: 'Caminho seguro', to: 'cap05', className: 'reward' },
          { text: 'Caminho perigoso', to: 'cap06', damage: 4, className: 'danger' }
        ]
      },
      cap05: {
        title: '5. Recompensa',
        text: 'O jogador recebe uma recompensa por ter escolhido bem.',
        effect: {
          xp: 10,
          addItems: [{ id: 'chave_especial', qty: 1 }]
        },
        choices: [
          { text: 'Continuar', to: 'cap07' }
        ]
      },
      cap06: {
        title: '6. Perigo',
        text: 'O jogador sofre uma consequência, mas pode continuar.',
        choices: [
          { text: 'Continuar ferido', to: 'cap07' }
        ]
      },
      cap07: {
        title: '7. Porta Trancada',
        text: 'Uma porta exige um item específico.',
        choices: [
          { text: 'Abrir com a chave especial', to: 'cap08', requiresItem: 'chave_especial' },
          { text: 'Procurar outro caminho', to: 'cap09' }
        ]
      },
      cap08: {
        title: '8. Caminho Secreto',
        text: 'O jogador encontrou o melhor caminho.',
        choices: [
          { text: 'Enfrentar o chefe', to: 'cap10' }
        ]
      },
      cap09: {
        title: '9. Caminho Difícil',
        text: 'O jogador chega ao chefe por um caminho mais perigoso.',
        choices: [
          { text: 'Enfrentar o chefe', to: 'cap10', damage: 3, className: 'danger' }
        ]
      },
      cap10: {
        title: '10. Chefe Final',
        text: 'O grande inimigo aparece.',
        enemy: {
          id: 'chefe_final',
          name: 'Chefe Final',
          hp: 26,
          atk: 7,
          def: 2,
          xp: 30,
          rewardGold: 20,
          rewardItems: [{ id: 'reliquia_final', qty: 1 }],
          image: ''
        },
        winTo: 'final_bom',
        loseTo: 'derrota'
      },
      final_bom: {
        title: 'Final Bom',
        text: 'O jogador venceu a aventura.',
        end: true
      },
      derrota: {
        title: 'Derrota',
        text: 'O jogador foi derrotado, mas pode tentar novamente.',
        end: true
      }
    },
    items: {
      pocao_vida: { name: 'Poção de Vida', type: 'consumable', heal: 12, desc: 'Restaura 12 de vida.' },
      chave_especial: { name: 'Chave Especial', type: 'key', desc: 'Abre uma porta importante.' },
      trofeu_inicial: { name: 'Troféu Inicial', type: 'quest', desc: 'Prova da primeira vitória.' },
      reliquia_final: { name: 'Relíquia Final', type: 'quest', desc: 'Recompensa da aventura.' }
    }
  }
};
