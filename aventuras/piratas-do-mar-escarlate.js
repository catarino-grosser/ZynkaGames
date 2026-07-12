// Campanha para Zynka RPG 3.0
// Arquivo pronto para colocar dentro da pasta aventuras.

const aventura = {
  id: 'piratas_do_mar_escarlate',
  title: 'Piratas do Mar Escarlate',
  icon: '🏴‍☠️',
  genre: 'Piratas',
  difficulty: 'Média',
  estimatedTime: '40 a 55 min',
  desc: 'Torne-se o capitão de um navio pirata, monte sua tripulação, procure mapas do tesouro e enfrente monstros marinhos e navios inimigos.',
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
      title: '1. O Motim no Porto Escarlate',
      image: '',
      scene: 'O Porto Escarlate está tomado por tavernas, navios mercantes e bandeiras piratas tremulando sob um céu avermelhado.',
      text: 'Durante anos, você serviu como imediato do capitão Barba de Ferro, um homem cruel que tratava a tripulação como propriedade. Naquela noite, após ele ordenar que dois marinheiros fossem abandonados no mar, a tripulação finalmente se revoltou.\n\nQuando a luta termina, Barba de Ferro foge com alguns homens leais. O navio, a Serpente Rubra, permanece no cais. Os piratas olham para você, esperando uma decisão. Pela primeira vez, o comando está ao seu alcance.',
      dialogue: {
        name: 'Marta Olho-de-Falcão',
        portrait: '',
        lines: [
          'O navio precisa de um capitão.',
          'Mas capitão sem tripulação fiel não dura até a próxima maré.',
          'Dê a ordem e veremos se você merece o leme.'
        ]
      },
      effect: {
        gold: 20,
        addItems: [
          { id: 'sabre_pirata', qty: 1 },
          { id: 'pistola_pederneira', qty: 1 },
          { id: 'mapa_incompleto', qty: 1 }
        ],
        flags: {
          tornou_se_capitao: true
        }
      },
      choices: [
        { text: 'Assumir o comando da Serpente Rubra', to: 'cap02', className: 'reward' },
        { text: 'Dividir o comando com a tripulação', to: 'cap02' },
        { text: 'Exigir obediência pela força', to: 'cap03', damage: 4, className: 'danger' }
      ]
    },

    cap02: {
      title: '2. Montando a Tripulação',
      image: '',
      scene: 'A Taverna da Sereia Quebrada está cheia de marinheiros, contrabandistas e aventureiros procurando trabalho.',
      text: 'Um navio pirata não vive apenas de madeira e canhões. Você precisa de gente capaz de navegar, lutar, consertar velas e sobreviver quando tudo dá errado.\n\nNa taverna, três candidatos chamam atenção: Marta Olho-de-Falcão, uma atiradora experiente; Brutus Maré-Funda, um timoneiro enorme; e Elian, um jovem cartógrafo que afirma conhecer parte da rota para o lendário Tesouro do Rei Carmesim.',
      sideQuest: {
        id: 'formar_tripulacao',
        title: 'Uma Tripulação de Verdade',
        desc: 'Recrute aliados capazes de ajudar durante a busca pelo tesouro.'
      },
      effect: {
        xp: 12,
        flags: {
          recrutou_marta: true,
          recrutou_brutus: true,
          recrutou_elian: true
        },
        addItems: [
          { id: 'lista_tripulacao', qty: 1 }
        ]
      },
      choices: [
        { text: 'Comprar suprimentos para a viagem', to: 'cap03', className: 'reward' },
        { text: 'Partir imediatamente antes que Barba de Ferro retorne', to: 'cap03' }
      ]
    },

    cap03: {
      title: '3. O Primeiro Fragmento do Mapa',
      image: '',
      scene: 'Um armazém abandonado fica perto do cais, protegido por homens armados e lanternas vermelhas.',
      text: 'Elian revela que o mapa incompleto só pode ser lido com três fragmentos. O primeiro está nas mãos de um contrabandista chamado Dente de Ouro, que opera em um armazém isolado.\n\nO contrabandista aceita negociar, mas exige uma fortuna. Também deixa claro que está disposto a matar quem tentar roubar sua parte do mapa.',
      dialogue: {
        name: 'Dente de Ouro',
        portrait: '',
        lines: [
          'Mapas valem mais que navios.',
          'Navios afundam. Tesouros esperam.',
          'Pague... ou tente a sorte.'
        ]
      },
      treasure: {
        id: 'cofre_contrabandista',
        text: '💰 Vasculhar o cofre do armazém',
        reward: {
          gold: 22,
          addItems: [
            { id: 'rum_especial', qty: 1 }
          ]
        }
      },
      choices: [
        { text: 'Comprar o fragmento do mapa', to: 'cap04', requiresItem: 'mapa_incompleto', className: 'reward' },
        { text: 'Desafiar Dente de Ouro', to: 'cap04' },
        { text: 'Roubar o fragmento durante a conversa', to: 'cap04', damage: 5, className: 'danger' }
      ],
      effect: {
        xp: 14,
        addItems: [
          { id: 'fragmento_mapa_1', qty: 1 }
        ]
      }
    },

    cap04: {
      title: '4. A Primeira Batalha Naval',
      image: '',
      scene: 'A Serpente Rubra deixa o porto, mas um navio inimigo surge entre a neblina com canhões preparados.',
      text: 'Poucas horas após a partida, um navio corsário intercepta sua rota. A bandeira pertence à Coroa de Valmar, conhecida por caçar piratas sem piedade.\n\nO capitão inimigo ordena que você se renda. Marta carrega sua pistola, Brutus segura o leme e a tripulação espera sua primeira ordem em combate.',
      enemy: {
        id: 'navio_corsario',
        name: 'Navio Corsário de Valmar',
        hp: 36,
        atk: 8,
        def: 4,
        xp: 40,
        rewardGold: 28,
        rewardItems: [
          { id: 'municao_canhao', qty: 2 },
          { id: 'bandeira_corsaria', qty: 1 }
        ],
        image: ''
      },
      winTo: 'cap05',
      loseTo: 'derrota'
    },

    cap05: {
      title: '5. A Ilha das Caveiras',
      image: '',
      scene: 'Uma pequena ilha rochosa aparece no horizonte. Dezenas de caveiras estão presas em estacas ao redor da praia.',
      text: 'O mapa aponta para uma ilha usada como esconderijo por antigos piratas. Segundo Elian, o segundo fragmento do mapa está enterrado ali.\n\nA praia parece deserta, mas pegadas recentes seguem até uma caverna. Na entrada, uma inscrição diz: “Só encontra o ouro quem não teme perder a vida.”',
      puzzle: {
        question: 'A caverna pergunta: “O que todo pirata deseja, mas nenhum consegue levar para o túmulo?”',
        answer: 'ouro',
        successText: 'A porta de pedra se abre, revelando uma passagem subterrânea.',
        reward: {
          xp: 18,
          addItems: [
            { id: 'fragmento_mapa_2', qty: 1 }
          ]
        },
        setFlag: 'caverna_caveiras_aberta'
      },
      choices: [
        { text: 'Entrar pela passagem aberta', to: 'cap06', requiresFlag: 'caverna_caveiras_aberta', className: 'reward' },
        { text: 'Procurar outra entrada pela encosta', to: 'cap06' }
      ]
    },

    cap06: {
      title: '6. A Caverna dos Mortos',
      image: '',
      scene: 'Tochas antigas se acendem sozinhas. Ossos de piratas cobrem o chão e moedas estão espalhadas entre eles.',
      text: 'A caverna guarda os restos de uma tripulação inteira. Muitos morreram lutando entre si. No centro, um baú fechado está preso por correntes enferrujadas.\n\nQuando você se aproxima, esqueletos armados se levantam. Eles ainda carregam as marcas do Rei Carmesim, o pirata lendário que teria escondido o maior tesouro dos mares.',
      enemy: {
        id: 'piratas_esqueletos',
        name: 'Piratas Esqueletos',
        hp: 32,
        atk: 7,
        def: 3,
        xp: 36,
        rewardGold: 30,
        rewardItems: [
          { id: 'chave_osso', qty: 1 },
          { id: 'moeda_carmesim', qty: 2 }
        ],
        image: ''
      },
      winTo: 'cap07',
      loseTo: 'derrota'
    },

    cap07: {
      title: '7. A Tempestade Rubra',
      image: '',
      scene: 'Nuvens vermelhas cobrem o céu. Raios atingem o mar e as ondas começam a girar em círculos.',
      text: 'De volta ao mar, a Serpente Rubra entra em uma tempestade diferente de qualquer outra. A chuva tem cor de sangue e a bússola gira sem direção.\n\nElian percebe que a tempestade é parte da proteção do tesouro. Se o navio seguir a rota errada, ficará preso para sempre no Mar Escarlate.',
      randomEvent: {
        chance: 0.5,
        text: 'Um raio atinge o mastro, mas Brutus consegue manter o navio no rumo.',
        damage: 5
      },
      puzzle: {
        question: 'Para atravessar a tempestade, qual direção seguir quando a bússola enlouquece: estrelas, ondas ou vento?',
        answer: 'estrelas',
        successText: 'Marta encontra uma abertura nas nuvens e guia o navio pelas estrelas.',
        reward: {
          xp: 20,
          flags: {
            atravessou_tempestade: true
          }
        },
        setFlag: 'rota_tempestade'
      },
      choices: [
        { text: 'Seguir a rota das estrelas', to: 'cap08', requiresFlag: 'rota_tempestade', className: 'reward' },
        { text: 'Confiar apenas na bússola', to: 'cap08', damage: 7, className: 'danger' }
      ]
    },

    cap08: {
      title: '8. O Porto Fantasma',
      image: '',
      scene: 'Casas abandonadas aparecem sobre palafitas. Navios destruídos estão presos no lodo e sinos tocam sem vento.',
      text: 'Após a tempestade, você chega a um porto que não aparece em nenhum mapa. As ruas estão vazias, mas lanternas se acendem quando a tripulação desembarca.\n\nNo centro do porto, um velho sem sombra espera por você. Ele afirma ter servido ao Rei Carmesim e conhece o paradeiro do terceiro fragmento.',
      dialogue: {
        name: 'Velho Marujo Sem Sombra',
        portrait: '',
        lines: [
          'O Rei Carmesim não enterrou apenas ouro.',
          'Ele enterrou um monstro.',
          'O mapa leva ao tesouro... e à prisão dele.'
        ]
      },
      effect: {
        xp: 16,
        flags: {
          descobriu_monstro_tesouro: true
        },
        addItems: [
          { id: 'medalhao_carmesim', qty: 1 }
        ]
      },
      choices: [
        { text: 'Perguntar pelo terceiro fragmento', to: 'cap09' },
        { text: 'Investigar os navios abandonados', to: 'cap09', className: 'reward' }
      ]
    },

    cap09: {
      title: '9. O Capitão Sem Rosto',
      image: '',
      scene: 'Um galeão negro surge no porto. Sua tripulação é formada por sombras e seu capitão não possui rosto.',
      text: 'O terceiro fragmento está em posse do Capitão Sem Rosto, condenado a proteger a rota do tesouro. Ele oferece um acordo: entregue sua própria sombra e receba o mapa completo.\n\nQuando você recusa, o galeão negro prepara os canhões. A batalha transforma o porto fantasma em um inferno de madeira, fogo e gritos sem corpo.',
      enemy: {
        id: 'capitao_sem_rosto',
        name: 'Capitão Sem Rosto',
        hp: 42,
        atk: 9,
        def: 4,
        xp: 52,
        rewardGold: 34,
        rewardItems: [
          { id: 'fragmento_mapa_3', qty: 1 },
          { id: 'espada_fantasma', qty: 1 }
        ],
        image: ''
      },
      winTo: 'cap10',
      loseTo: 'derrota'
    },

    cap10: {
      title: '10. O Mapa Completo',
      image: '',
      scene: 'Os três fragmentos brilham quando unidos. Linhas vermelhas aparecem sobre o pergaminho e revelam uma ilha escondida.',
      text: 'Elian junta os fragmentos do mapa. O desenho completo mostra a Ilha do Rei Carmesim, cercada por recifes, correntes violentas e um símbolo enorme no centro.\n\nMas outra informação aparece: o tesouro só pode ser alcançado por um capitão reconhecido pelo próprio mar. Para isso, será preciso atravessar o Estreito das Serpentes.',
      effect: {
        xp: 20,
        flags: {
          mapa_completo: true
        },
        addItems: [
          { id: 'mapa_completo', qty: 1 }
        ]
      },
      choices: [
        { text: 'Navegar até o Estreito das Serpentes', to: 'cap11', className: 'reward' },
        { text: 'Parar em uma ilha próxima para reparar o navio', to: 'cap11' }
      ]
    },

    cap11: {
      title: '11. O Estreito das Serpentes',
      image: '',
      scene: 'Duas muralhas de pedra formam um canal estreito. Serpentes marinhas gigantes nadam sob o navio.',
      text: 'A Serpente Rubra entra no estreito. A água parece fervilhar, e criaturas enormes circulam sob o casco.\n\nUma delas ataca o navio. Seu corpo é coberto por escamas verdes, e seus dentes são maiores que sabres. A tripulação se prepara para lutar enquanto Brutus tenta evitar as rochas.',
      enemy: {
        id: 'serpente_marinha',
        name: 'Serpente Marinha Gigante',
        hp: 48,
        atk: 10,
        def: 5,
        xp: 60,
        rewardGold: 38,
        rewardItems: [
          { id: 'escama_marinha', qty: 1 },
          { id: 'presa_serpente', qty: 1 }
        ],
        image: ''
      },
      winTo: 'cap12',
      loseTo: 'derrota'
    },

    cap12: {
      title: '12. A Ilha do Rei Carmesim',
      image: '',
      scene: 'Uma ilha cercada por penhascos surge da neblina. No alto, ruínas de uma fortaleza pirata dominam a paisagem.',
      text: 'Depois do estreito, a ilha finalmente aparece. A praia está cheia de navios naufragados, todos pertencentes a capitães que chegaram antes e nunca saíram.\n\nA trilha até a fortaleza passa por armadilhas, canhões escondidos e estátuas do Rei Carmesim apontando para o interior da montanha.',
      treasure: {
        id: 'navio_naufragado',
        text: '💰 Explorar um antigo navio naufragado',
        reward: {
          gold: 32,
          addItems: [
            { id: 'polvora_rara', qty: 1 },
            { id: 'pocao_rum', qty: 1 }
          ]
        }
      },
      choices: [
        { text: 'Subir até a fortaleza', to: 'cap13' },
        { text: 'Procurar uma entrada pelos túneis', to: 'cap13', requiresItem: 'medalhao_carmesim', className: 'reward' }
      ]
    },

    cap13: {
      title: '13. O Cofre Carmesim',
      image: '',
      scene: 'Uma porta de ferro vermelho bloqueia o centro da fortaleza. Três encaixes correspondem aos fragmentos do mapa.',
      text: 'O mapa completo funciona como chave. A porta se abre e revela uma câmara cheia de ouro, joias, coroas e armas lendárias.\n\nMas no centro do cofre há uma âncora gigantesca presa por correntes. Debaixo dela, algo respira. O tesouro inteiro foi usado como selo para manter uma criatura aprisionada.',
      treasure: {
        id: 'tesouro_carmesim',
        text: '💰 Recolher parte do Tesouro Carmesim',
        reward: {
          gold: 60,
          addItems: [
            { id: 'coroa_pirata', qty: 1 },
            { id: 'rubis_carmesins', qty: 2 }
          ]
        }
      },
      effect: {
        xp: 22,
        flags: {
          encontrou_tesouro: true
        }
      },
      choices: [
        { text: 'Não tocar nas correntes', to: 'cap14', className: 'reward' },
        { text: 'Tentar remover a âncora', to: 'cap14', className: 'danger' },
        { text: 'Investigar as inscrições do cofre', to: 'cap14', requiresItem: 'medalhao_carmesim' }
      ]
    },

    cap14: {
      title: '14. O Kraken Escarlate',
      image: '',
      scene: 'As correntes se partem. Tentáculos gigantes atravessam o teto da fortaleza e o mar invade as ruínas.',
      text: 'O verdadeiro segredo do tesouro desperta: um kraken colossal, aprisionado pelo Rei Carmesim séculos atrás. Sua pele brilha em vermelho, e seus olhos refletem o ouro acumulado ao redor.\n\nBarba de Ferro surge com seu navio e tenta roubar o tesouro durante o caos. Mas nem ele consegue controlar a criatura. Agora, capitães, piratas e monstros estão presos na mesma batalha.',
      enemy: {
        id: 'kraken_escarlate',
        name: 'Kraken Escarlate',
        hp: 62,
        atk: 11,
        def: 5,
        xp: 80,
        rewardGold: 50,
        rewardItems: [
          { id: 'coração_kraken', qty: 1 },
          { id: 'chave_rei_carmesim', qty: 1 }
        ],
        image: '',
        setFlag: 'kraken_derrotado'
      },
      winTo: 'cap15',
      loseTo: 'derrota'
    },

    cap15: {
      title: '15. O Destino do Mar Escarlate',
      image: '',
      scene: 'A fortaleza desaba enquanto ondas vermelhas cobrem a ilha. A Serpente Rubra aguarda na praia.',
      text: 'Com o kraken derrotado, o tesouro está livre. Barba de Ferro desaparece entre os destroços, e sua tripulação espera sua decisão final.\n\nVocê pode levar o ouro, esconder a ilha novamente, usar o poder do kraken para dominar os mares ou dividir tudo com aqueles que lutaram ao seu lado.',
      choices: [
        { text: 'Dividir o tesouro com a tripulação', to: 'final_capitao', requiresFlag: 'encontrou_tesouro', className: 'reward' },
        { text: 'Esconder novamente o Tesouro Carmesim', to: 'final_guardiao', requiresItem: 'chave_rei_carmesim' },
        { text: 'Usar o Coração do Kraken para dominar os mares', to: 'final_tirano', requiresItem: 'coração_kraken', className: 'danger' },
        { text: 'Libertar o tesouro para todos os piratas', to: 'final_lenda', requiresFlag: 'kraken_derrotado' }
      ]
    },

    final_capitao: {
      title: 'Final: Capitão da Serpente Rubra',
      text: 'Você divide o tesouro com a tripulação. Cada marinheiro recebe sua parte, e sua lealdade deixa de ser comprada pelo medo. A Serpente Rubra se torna o navio mais respeitado do Mar Escarlate, não por sua riqueza, mas por ter um capitão que nunca abandona os seus.',
      end: true
    },

    final_guardiao: {
      title: 'Final: Guardião do Tesouro Carmesim',
      text: 'Você fecha o cofre e esconde novamente a rota da ilha. Apenas sua tripulação conhece a verdade. Durante anos, navios perseguem rumores, mas ninguém encontra o tesouro. Você se torna seu novo guardião.',
      end: true
    },

    final_tirano: {
      title: 'Final: Senhor dos Mares',
      text: 'Você usa o Coração do Kraken para controlar criaturas marinhas. Navios inimigos afundam antes de se aproximar, portos pagam tributos e seu nome vira ameaça. Mas, aos poucos, sua tripulação percebe que Barba de Ferro não foi o último tirano daquele navio.',
      end: true
    },

    final_lenda: {
      title: 'Final Secreto: A República dos Piratas',
      text: 'Você distribui o tesouro entre capitães livres e usa a fortuna para fundar um porto onde nenhum rei governa. Piratas, mercadores e fugitivos criam uma nova república no Mar Escarlate. Seu nome vira símbolo de liberdade.',
      end: true
    },

    derrota: {
      title: 'Derrota',
      text: 'O mar fecha-se sobre a Serpente Rubra. Barris, tábuas e velas desaparecem entre as ondas vermelhas. Em tavernas distantes, sua história vira mais uma advertência sobre capitães que desafiaram o Mar Escarlate.',
      end: true
    }
  },

  items: {
    sabre_pirata: {
      name: 'Sabre Pirata',
      type: 'weapon',
      attack: 3,
      desc: 'Lâmina curva usada em combates no convés.'
    },

    pistola_pederneira: {
      name: 'Pistola de Pederneira',
      type: 'weapon',
      attack: 3,
      desc: 'Arma de fogo simples e poderosa a curta distância.'
    },

    mapa_incompleto: {
      name: 'Mapa Incompleto',
      type: 'quest',
      desc: 'Parte inicial do mapa do Tesouro Carmesim.'
    },

    lista_tripulacao: {
      name: 'Lista da Tripulação',
      type: 'quest',
      desc: 'Registro dos piratas que servem na Serpente Rubra.'
    },

    fragmento_mapa_1: {
      name: 'Primeiro Fragmento do Mapa',
      type: 'quest',
      desc: 'Uma das três partes do mapa do tesouro.'
    },

    fragmento_mapa_2: {
      name: 'Segundo Fragmento do Mapa',
      type: 'quest',
      desc: 'Uma das três partes do mapa do tesouro.'
    },

    fragmento_mapa_3: {
      name: 'Terceiro Fragmento do Mapa',
      type: 'quest',
      desc: 'A última parte do mapa do tesouro.'
    },

    mapa_completo: {
      name: 'Mapa Completo',
      type: 'key',
      desc: 'Revela a rota até a Ilha do Rei Carmesim.'
    },

    rum_especial: {
      name: 'Rum Especial',
      type: 'consumable',
      heal: 10,
      desc: 'Rum forte que restaura 10 pontos de vida.'
    },

    pocao_rum: {
      name: 'Rum Medicinal',
      type: 'consumable',
      heal: 14,
      desc: 'Mistura de ervas e rum que restaura 14 pontos de vida.'
    },

    municao_canhao: {
      name: 'Munição de Canhão',
      type: 'component',
      desc: 'Bolas de canhão usadas em combate naval.'
    },

    bandeira_corsaria: {
      name: 'Bandeira Corsária',
      type: 'treasure',
      desc: 'Bandeira capturada de um navio inimigo.'
    },

    chave_osso: {
      name: 'Chave de Osso',
      type: 'key',
      desc: 'Chave antiga retirada de piratas esqueletos.'
    },

    moeda_carmesim: {
      name: 'Moeda Carmesim',
      type: 'treasure',
      desc: 'Moeda rara cunhada pelo Rei Carmesim.'
    },

    medalhao_carmesim: {
      name: 'Medalhão Carmesim',
      type: 'relic',
      desc: 'Símbolo usado pelos piratas do Rei Carmesim.'
    },

    espada_fantasma: {
      name: 'Espada Fantasma',
      type: 'weapon',
      attack: 6,
      desc: 'Lâmina capaz de ferir criaturas sobrenaturais.'
    },

    escama_marinha: {
      name: 'Escama Marinha',
      type: 'component',
      desc: 'Escama resistente de uma serpente do mar.'
    },

    presa_serpente: {
      name: 'Presa de Serpente Marinha',
      type: 'relic',
      desc: 'Prova de vitória contra uma criatura dos mares.'
    },

    polvora_rara: {
      name: 'Pólvora Carmesim',
      type: 'component',
      desc: 'Pólvora especial encontrada em um navio naufragado.'
    },

    coroa_pirata: {
      name: 'Coroa Pirata',
      type: 'relic',
      desc: 'Coroa lendária do Rei Carmesim.'
    },

    rubis_carmesins: {
      name: 'Rubis Carmesins',
      type: 'treasure',
      desc: 'Pedras preciosas retiradas do tesouro lendário.'
    },

    coração_kraken: {
      name: 'Coração do Kraken',
      type: 'relic',
      desc: 'Artefato que permite controlar criaturas marinhas.'
    },

    chave_rei_carmesim: {
      name: 'Chave do Rei Carmesim',
      type: 'key',
      desc: 'Pode selar novamente o cofre do tesouro.'
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