// Campanha para Zynka RPG 3.0
// Arquivo pronto para colocar dentro da pasta aventuras.

const aventura = {
  id: 'ilha_dos_dinossauros',
  title: 'A Ilha dos Dinossauros',
  icon: '🦖',
  genre: 'Aventura',
  difficulty: 'Média',
  estimatedTime: '35 a 50 min',
  desc: 'Após um naufrágio, você chega a uma ilha onde dinossauros ainda vivem. Para escapar, será preciso explorar ruínas antigas e sobreviver aos predadores.',
  start: 'cap01',
  maxChapters: 15,

  assets: {
    music: './assets/musicas/TrilhaHistorica.mp3',
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
      title: '1. O Naufrágio',
      image: '',
      scene: 'Ondas violentas quebram contra rochas negras. Pedaços do navio flutuam entre espuma, chuva e madeira partida.',
      text: 'Você acorda na areia, tossindo água salgada. O navio em que viajava foi destruído durante uma tempestade repentina. Ao redor, caixas quebradas, cordas, barris e destroços chegam à praia.\n\nQuando tenta se levantar, ouve um rugido distante vindo da selva. Não é de nenhum animal que você conheça. As árvores tremem, pássaros fogem em nuvens coloridas e algo enorme se move além da linha da floresta.',
      dialogue: {
        name: 'Voz distante',
        portrait: '',
        lines: [
          'Ei! Tem alguém vivo aí?',
          'Pegue o que puder dos destroços. A maré vai levar tudo!'
        ]
      },
      effect: {
        gold: 6,
        addItems: [
          { id: 'faca_enferrujada', qty: 1 },
          { id: 'cantina_agua', qty: 1 },
          { id: 'kit_primeiros_socorros', qty: 1 }
        ]
      },
      choices: [
        { text: 'Vasculhar os destroços do navio', to: 'cap02', className: 'reward' },
        { text: 'Correr para a selva em busca de abrigo', to: 'cap03' },
        { text: 'Nadar até uma caixa presa nas pedras', to: 'cap02', damage: 4, className: 'danger' }
      ]
    },

    cap02: {
      title: '2. Sobreviventes na Praia',
      image: '',
      scene: 'A praia se estende diante de penhascos cobertos por vegetação. Pegadas enormes marcam a areia molhada.',
      text: 'Entre os destroços, você encontra Lina, uma cartógrafa que também sobreviveu ao naufrágio. Ela está ferida, mas consciente. Em suas mãos há um mapa antigo, protegido por couro impermeável.\n\nLina explica que o navio estava seguindo rumores sobre uma ilha perdida chamada Kalunga. Segundo lendas de marinheiros, nenhum mapa moderno mostra a ilha porque ela “se move” entre neblinas e tempestades.',
      dialogue: {
        name: 'Lina, a Cartógrafa',
        portrait: '',
        lines: [
          'Aquelas pegadas não são de elefante.',
          'Se queremos sair daqui, precisamos encontrar água, abrigo e um ponto alto para sinalizar resgate.',
          'E talvez descobrir por que esta ilha foi apagada dos mapas.'
        ]
      },
      treasure: {
        id: 'caixa_praia',
        text: '💰 Abrir uma caixa de suprimentos quebrada',
        reward: {
          gold: 12,
          addItems: [
            { id: 'corda', qty: 1 },
            { id: 'sinalizador', qty: 1 }
          ]
        }
      },
      effect: {
        xp: 10,
        flags: { encontrou_lina: true },
        addItems: [{ id: 'mapa_antigo', qty: 1 }]
      },
      choices: [
        { text: 'Seguir com Lina para a selva', to: 'cap03', className: 'reward' },
        { text: 'Investigar as pegadas enormes', to: 'cap04' }
      ]
    },

    cap03: {
      title: '3. A Selva Primordial',
      image: '',
      scene: 'Árvores gigantes bloqueiam o céu. Cipós grossos, flores venenosas e insetos enormes transformam cada passo em risco.',
      text: 'A selva da ilha é antiga demais. Algumas folhas são maiores que escudos, raízes formam túneis naturais e plantas carnívoras se fecham quando pequenos animais passam perto.\n\nVocê encontra frutos vermelhos brilhantes pendurados em uma árvore baixa. O cheiro é doce, mas Lina avisa que cores vivas na natureza quase sempre significam perigo.',
      randomEvent: {
        chance: 0.5,
        text: 'Você encontra uma nascente limpa escondida entre pedras. A água fresca renova suas forças.',
        reward: {
          xp: 6,
          addItems: [{ id: 'cantina_agua', qty: 1 }]
        }
      },
      choices: [
        { text: 'Coletar cipós e madeira para montar abrigo', to: 'cap05', className: 'reward' },
        { text: 'Seguir o som de água corrente', to: 'cap04' },
        { text: 'Comer os frutos vermelhos', to: 'cap04', damage: 6, className: 'danger' }
      ]
    },

    cap04: {
      title: '4. O Primeiro Predador',
      image: '',
      scene: 'A mata se abre em uma clareira coberta de ossos. Algo observa atrás das folhas.',
      text: 'As pegadas levam até uma clareira onde carcaças antigas se acumulam. Antes que você consiga recuar, um velociraptor salta de trás das árvores. Ele é menor que o rugido distante, mas rápido, inteligente e faminto.\n\nLina grita para você mirar nos olhos e não virar as costas. A criatura inclina a cabeça, estudando seus movimentos como se soubesse esperar o momento certo.',
      enemy: {
        id: 'velociraptor',
        name: 'Velociraptor da Selva',
        hp: 26,
        atk: 7,
        def: 2,
        xp: 28,
        rewardGold: 10,
        rewardItems: [
          { id: 'garra_raptor', qty: 1 },
          { id: 'couro_resistente', qty: 1 }
        ],
        image: ''
      },
      winTo: 'cap05',
      loseTo: 'derrota'
    },

    cap05: {
      title: '5. O Acampamento Provisório',
      image: '',
      scene: 'Entre raízes altas e rochas, um pequeno acampamento começa a tomar forma. A noite se aproxima depressa.',
      text: 'Com cipós, madeira e lona arrancada dos destroços, você monta um abrigo simples. A selva fica mais barulhenta conforme escurece. Rugidos graves ecoam longe, e olhos pequenos brilham entre as árvores.\n\nLina estende o mapa antigo no chão. Há desenhos de ruínas no centro da ilha e uma marca chamada “Templo do Sol Enterrado”. Se existir algum segredo para escapar, provavelmente está lá.',
      sideQuest: {
        id: 'sobreviventes_perdidos',
        title: 'Sobreviventes Perdidos',
        desc: 'Procure outros náufragos antes de deixar a ilha.'
      },
      effect: {
        xp: 12,
        flags: { acampamento_montado: true }
      },
      choices: [
        { text: 'Seguir para as ruínas indicadas no mapa', to: 'cap06' },
        { text: 'Procurar outros sobreviventes próximos', to: 'cap07', className: 'reward' }
      ]
    },

    cap06: {
      title: '6. O Rio dos Saurópodes',
      image: '',
      scene: 'Um rio largo corta a selva. Do outro lado, dinossauros gigantes bebem água em silêncio.',
      text: 'Para chegar ao centro da ilha, você precisa atravessar um rio. Na margem oposta, saurópodes enormes movem seus longos pescoços entre as árvores. Eles parecem pacíficos, mas qualquer susto poderia transformar suas patas em terremotos.\n\nHá troncos caídos, pedras escorregadias e uma canoa antiga meio enterrada na lama. A escolha errada pode chamar atenção de predadores aquáticos.',
      puzzle: {
        question: 'Lina pergunta: “Qual caminho é mais seguro perto de gigantes: pressa, silêncio ou fogo?”',
        answer: 'silêncio',
        successText: 'Você atravessa o rio sem assustar os saurópodes.',
        reward: {
          xp: 16,
          addItems: [{ id: 'escama_sauropode', qty: 1 }]
        },
        setFlag: 'atravessou_rio_seguro'
      },
      choices: [
        { text: 'Atravessar silenciosamente pelas pedras', to: 'cap08', requiresFlag: 'atravessou_rio_seguro', className: 'reward' },
        { text: 'Usar a canoa antiga', to: 'cap08' },
        { text: 'Correr pelos troncos caídos', to: 'cap08', damage: 6, className: 'danger' }
      ]
    },

    cap07: {
      title: '7. O Médico do Navio',
      image: '',
      scene: 'Um sinal de fumaça sobe atrás de uma encosta. Ali há restos de uma vela presa entre bambus.',
      text: 'Você segue sinais de presença humana e encontra Dr. Raul, o médico do navio. Ele sobreviveu, mas está cercado por pequenos dinossauros curiosos que roubam objetos brilhantes.\n\nRaul diz que viu homens armados antes do naufrágio. Eles não pareciam passageiros. Carregavam mapas da ilha e falavam sobre um tesouro escondido nas ruínas.',
      dialogue: {
        name: 'Dr. Raul',
        portrait: '',
        lines: [
          'Esta ilha não é só perigosa. Ela foi procurada.',
          'Alguém queria chegar aqui antes de nós.',
          'Leve este kit. Você vai precisar mais do que eu.'
        ]
      },
      effect: {
        xp: 14,
        flags: { encontrou_raul: true },
        addItems: [
          { id: 'kit_primeiros_socorros', qty: 1 },
          { id: 'antidoto', qty: 1 }
        ]
      },
      choices: [
        { text: 'Levar Raul até o acampamento', to: 'cap06', className: 'reward' },
        { text: 'Perguntar sobre os homens armados', to: 'cap08' }
      ]
    },

    cap08: {
      title: '8. Ruínas dos Antigos',
      image: '',
      scene: 'Pedras cobertas de musgo formam arcos gigantes. Esculturas mostram humanos caminhando ao lado de dinossauros.',
      text: 'As ruínas no centro da ilha são muito antigas. Não parecem construídas por povos conhecidos. Nas paredes, desenhos mostram sacerdotes usando máscaras de dinossauro, calendários solares e um cristal brilhando dentro de uma montanha.\n\nLina percebe que os símbolos do mapa combinam com os relevos. A ilha talvez não seja apenas um refúgio de criaturas pré-históricas. Talvez seja um santuário guardado há milênios.',
      treasure: {
        id: 'altar_ruinas',
        text: '💰 Examinar o altar coberto de musgo',
        reward: {
          gold: 18,
          addItems: [
            { id: 'medalhao_solar', qty: 1 },
            { id: 'fragmento_mapa', qty: 1 }
          ]
        }
      },
      effect: {
        xp: 16,
        flags: { encontrou_ruinas: true }
      },
      choices: [
        { text: 'Entrar na passagem sob o altar', to: 'cap09', requiresItem: 'medalhao_solar', className: 'reward' },
        { text: 'Seguir pelo caminho das estátuas', to: 'cap10' }
      ]
    },

    cap09: {
      title: '9. O Templo Submerso',
      image: '',
      scene: 'Escadas descem até uma câmara parcialmente inundada. Peixes cegos nadam entre colunas antigas.',
      text: 'A passagem sob o altar leva a um templo submerso. A água é fria e clara, iluminada por cristais verdes no teto. No centro, há uma porta de pedra com três símbolos: garra, sol e onda.\n\nUma inscrição diz: “Aquele que domina a ilha não vence pela força, mas por entender quem bebe, quem caça e quem espera.”',
      puzzle: {
        question: 'Qual símbolo deve ser tocado primeiro para abrir a porta: garra, sol ou onda?',
        answer: 'onda',
        successText: 'A água se move sozinha e a porta de pedra se abre.',
        reward: {
          xp: 18,
          addItems: [{ id: 'chave_do_templo', qty: 1 }]
        },
        setFlag: 'porta_templo_aberta'
      },
      choices: [
        { text: 'Entrar na câmara secreta', to: 'cap11', requiresFlag: 'porta_templo_aberta' },
        { text: 'Voltar para as ruínas externas', to: 'cap10' }
      ]
    },

    cap10: {
      title: '10. Caçadores na Ilha',
      image: '',
      scene: 'Marcas de botas aparecem na lama. Vozes humanas ecoam entre as árvores, acompanhadas por ruídos metálicos.',
      text: 'Você descobre que não está sozinho. Um grupo de caçadores mercenários chegou à ilha antes da tempestade. Eles querem capturar dinossauros vivos e encontrar o tesouro do Templo do Sol Enterrado.\n\nO líder deles, Vargas, segura um rifle e sorri como alguém que não teme monstros porque se considera pior que eles.',
      dialogue: {
        name: 'Vargas',
        portrait: '',
        lines: [
          'Náufragos? Que azar.',
          'Esta ilha vale uma fortuna.',
          'Afastem-se das ruínas e talvez eu deixe vocês correrem quando os bichos vierem.'
        ]
      },
      enemy: {
        id: 'cacador_mercenario',
        name: 'Caçador Mercenário',
        hp: 34,
        atk: 8,
        def: 3,
        xp: 38,
        rewardGold: 24,
        rewardItems: [
          { id: 'rifle_sinalizador', qty: 1 },
          { id: 'municao', qty: 1 }
        ],
        image: ''
      },
      winTo: 'cap11',
      loseTo: 'derrota'
    },

    cap11: {
      title: '11. O Ninho dos Pteranodontes',
      image: '',
      scene: 'No topo de um penhasco, ninhos gigantes ocupam rochas expostas ao vento. O mar aparece distante lá embaixo.',
      text: 'A trilha até a próxima ruína passa por um penhasco cheio de ninhos. Pteranodontes circulam no céu, gritando para proteger seus filhotes. Entre os ninhos, há restos de equipamentos dos mercenários.\n\nUm rádio quebrado ainda transmite chiados. Com peças certas, talvez seja possível montar um sinal de resgate.',
      randomEvent: {
        chance: 0.5,
        text: 'Você encontra uma peça de rádio presa em um ninho abandonado.',
        reward: {
          xp: 12,
          addItems: [{ id: 'peca_radio', qty: 1 }]
        }
      },
      choices: [
        { text: 'Descer com cuidado usando a corda', to: 'cap12', requiresItem: 'corda', className: 'reward' },
        { text: 'Usar o rifle sinalizador para afastar as criaturas', to: 'cap12', requiresItem: 'rifle_sinalizador' },
        { text: 'Correr entre os ninhos', to: 'cap12', damage: 7, className: 'danger' }
      ]
    },

    cap12: {
      title: '12. O Vale do Tiranossauro',
      image: '',
      scene: 'O chão treme. Árvores quebradas formam uma trilha de destruição que leva até um vale aberto.',
      text: 'O caminho final até o Templo do Sol Enterrado passa por território de um tiranossauro. Ossos enormes se espalham pelo vale. A cada rugido, pássaros fogem e até os velociraptores se escondem.\n\nLina sugere evitar confronto direto. Mas Vargas e seus homens aparecem correndo, trazendo o predador atrás deles. Agora todos estão presos no mesmo vale.',
      enemy: {
        id: 'tiranossauro',
        name: 'Tiranossauro Rei da Ilha',
        hp: 52,
        atk: 10,
        def: 5,
        xp: 65,
        rewardGold: 35,
        rewardItems: [
          { id: 'dente_tiranossauro', qty: 1 },
          { id: 'chave_solar', qty: 1 }
        ],
        image: ''
      },
      winTo: 'cap13',
      loseTo: 'derrota'
    },

    cap13: {
      title: '13. O Templo do Sol Enterrado',
      image: '',
      scene: 'Uma pirâmide coberta pela selva surge dentro de uma cratera. No topo, um cristal dourado reflete a luz do entardecer.',
      text: 'Com a Chave Solar, você abre a entrada da pirâmide. Lá dentro, murais revelam a verdade: a ilha foi criada como santuário por uma civilização antiga que salvou espécies condenadas à extinção.\n\nO tesouro não é ouro. É o Coração Solar, um cristal capaz de manter a ilha escondida, curar a natureza e controlar o equilíbrio entre predadores e presas.',
      effect: {
        xp: 20,
        flags: { descobriu_segredo_ilha: true },
        addItems: [{ id: 'diario_sacerdotes', qty: 1 }]
      },
      choices: [
        { text: 'Proteger o Coração Solar', to: 'cap14', className: 'reward' },
        { text: 'Pegar o cristal para escapar da ilha', to: 'cap14', className: 'danger' }
      ]
    },

    cap14: {
      title: '14. Vargas e o Coração Solar',
      image: '',
      scene: 'A câmara central brilha com luz dourada. Vargas surge das sombras, ferido, mas ainda armado.',
      text: 'Vargas seguiu você até o coração do templo. Ele vê o cristal e entende seu valor imediatamente. Para ele, a ilha não é milagre, é mercado. Os dinossauros não são vida, são produto.\n\nQuando ele tenta arrancar o Coração Solar do pedestal, o templo começa a desabar. A ilha inteira reage como se estivesse ferida.',
      enemy: {
        id: 'vargas',
        name: 'Vargas, Caçador de Relíquias',
        hp: 46,
        atk: 9,
        def: 4,
        xp: 58,
        rewardGold: 40,
        rewardItems: [
          { id: 'coração_solar', qty: 1 }
        ],
        image: '',
        setFlag: 'vargas_derrotado'
      },
      winTo: 'cap15',
      loseTo: 'derrota'
    },

    cap15: {
      title: '15. Fuga da Ilha',
      image: '',
      scene: 'O vulcão distante desperta. Dinossauros correm pela selva enquanto o mar recua antes de uma onda gigantesca.',
      text: 'Com Vargas derrotado, resta decidir o que fazer. O Coração Solar pulsa diante de você. Se for removido, talvez consiga alimentar um rádio poderoso e chamar resgate. Se permanecer, a ilha continuará escondida e protegida.\n\nLina, Raul e os sobreviventes aguardam sua decisão. Ao longe, o rugido do tiranossauro ecoa mais uma vez, mas agora parece menos ameaça e mais aviso.',
      choices: [
        { text: 'Usar o Coração Solar para proteger a ilha', to: 'final_guardiao', requiresItem: 'coração_solar', className: 'reward' },
        { text: 'Usar peças do rádio e sinalizador para chamar resgate', to: 'final_resgate', requiresItem: 'peca_radio' },
        { text: 'Levar o Coração Solar para fora da ilha', to: 'final_ganancia', requiresItem: 'coração_solar', className: 'danger' },
        { text: 'Ficar na ilha para estudar seus segredos', to: 'final_explorador', requiresFlag: 'descobriu_segredo_ilha' }
      ]
    },

    final_guardiao: {
      title: 'Final: Guardiões de Kalunga',
      text: 'Você devolve o Coração Solar ao pedestal. A ilha para de tremer, as ruínas se estabilizam e uma luz dourada cobre a selva. Dias depois, um resgate encontra apenas parte dos sobreviventes na praia. Você e Lina permanecem para proteger Kalunga dos próximos Vargas que o mundo enviará.',
      end: true
    },

    final_resgate: {
      title: 'Final: Sinal no Horizonte',
      text: 'Com a peça de rádio, o sinalizador e energia das ruínas, você envia um pedido de socorro. Ao amanhecer, um navio aparece no horizonte. A ilha desaparece atrás da neblina assim que vocês partem, levando consigo rugidos, mistérios e a promessa de nunca revelar sua localização.',
      end: true
    },

    final_ganancia: {
      title: 'Final: O Preço do Tesouro',
      text: 'Você leva o Coração Solar. No começo, parece vitória: resgate, fama e riqueza. Mas meses depois, tempestades estranhas surgem nos oceanos, espécies começam a morrer e rumores dizem que uma ilha inteira afundou. Nem todo tesouro foi feito para sair do lugar onde nasceu.',
      end: true
    },

    final_explorador: {
      title: 'Final Secreto: O Chamado da Selva Antiga',
      text: 'Você decide ficar. Com Lina, Raul e alguns sobreviventes, constrói um abrigo permanente. Aos poucos, a ilha aceita sua presença. Anos depois, você se torna parte de sua lenda: o náufrago que caminhava entre dinossauros e guardava o segredo dos antigos.',
      end: true
    },

    derrota: {
      title: 'Derrota',
      text: 'A selva fica silenciosa por um instante. Depois, a vida continua como sempre continuou em Kalunga: predadores caçam, rios correm e a ilha guarda mais um segredo entre suas folhas.',
      end: true
    }
  },

  items: {
    faca_enferrujada: {
      name: 'Faca Enferrujada',
      type: 'weapon',
      attack: 2,
      desc: 'Uma faca simples encontrada nos destroços do navio.'
    },
    cantina_agua: {
      name: 'Cantina de Água',
      type: 'consumable',
      heal: 8,
      desc: 'Água potável. Restaura 8 pontos de vida.'
    },
    kit_primeiros_socorros: {
      name: 'Kit de Primeiros Socorros',
      type: 'consumable',
      heal: 14,
      desc: 'Restaura 14 pontos de vida.'
    },
    corda: {
      name: 'Corda',
      type: 'tool',
      desc: 'Útil para escalar, atravessar rios e descer penhascos.'
    },
    sinalizador: {
      name: 'Sinalizador',
      type: 'tool',
      desc: 'Pode chamar atenção de resgate ou assustar animais.'
    },
    mapa_antigo: {
      name: 'Mapa Antigo',
      type: 'quest',
      desc: 'Mapa com marcações das ruínas centrais da ilha.'
    },
    garra_raptor: {
      name: 'Garra de Raptor',
      type: 'component',
      desc: 'Garra afiada de um velociraptor.'
    },
    couro_resistente: {
      name: 'Couro Resistente',
      type: 'component',
      desc: 'Material forte retirado de criatura pré-histórica.'
    },
    escama_sauropode: {
      name: 'Escama de Saurópode',
      type: 'relic',
      desc: 'Escama rara de um gigante herbívoro.'
    },
    antidoto: {
      name: 'Antídoto',
      type: 'consumable',
      heal: 10,
      desc: 'Combate venenos e restaura 10 pontos de vida.'
    },
    medalhao_solar: {
      name: 'Medalhão Solar',
      type: 'key',
      desc: 'Peça antiga usada para abrir passagens nas ruínas.'
    },
    fragmento_mapa: {
      name: 'Fragmento de Mapa',
      type: 'quest',
      desc: 'Parte de um mapa das estruturas subterrâneas da ilha.'
    },
    chave_do_templo: {
      name: 'Chave do Templo',
      type: 'key',
      desc: 'Abre câmaras secretas do templo submerso.'
    },
    rifle_sinalizador: {
      name: 'Rifle Sinalizador',
      type: 'weapon',
      attack: 4,
      desc: 'Arma improvisada que dispara luz e ruído.'
    },
    municao: {
      name: 'Munição',
      type: 'component',
      desc: 'Pequeno conjunto de disparos para armas improvisadas.'
    },
    peca_radio: {
      name: 'Peça de Rádio',
      type: 'quest',
      desc: 'Componente essencial para montar um pedido de socorro.'
    },
    dente_tiranossauro: {
      name: 'Dente de Tiranossauro',
      type: 'relic',
      desc: 'Prova de sobrevivência contra o maior predador da ilha.'
    },
    chave_solar: {
      name: 'Chave Solar',
      type: 'key',
      desc: 'Chave usada para abrir o Templo do Sol Enterrado.'
    },
    diario_sacerdotes: {
      name: 'Diário dos Sacerdotes',
      type: 'quest',
      desc: 'Relato dos antigos guardiões da ilha.'
    },
    coração_solar: {
      name: 'Coração Solar',
      type: 'relic',
      desc: 'Cristal lendário que mantém a ilha escondida e equilibrada.'
    },
    orbe_arcano: {
      name: 'Orbe Arcano',
      type: 'class',
      desc: 'Item inicial do Mago.'
    },
    gazua: {
      name: 'Gazua',
      type: 'class',
      desc: 'Item inicial do Ladino.'
    }
  }
};

export default aventura;