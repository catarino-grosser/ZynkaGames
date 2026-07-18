// Campanha para Zynka RPG 3.0
// Arquivo pronto para colocar dentro da pasta aventuras.

const aventura = {
  id: 'o_reino_congelado',
  title: 'O Reino Congelado',
  icon: '❄️',
  genre: 'Fantasia',
  difficulty: 'Média',
  estimatedTime: '40 a 55 min',
  desc: 'Um inverno eterno ameaça destruir o reino. Viaje por montanhas geladas, enfrente gigantes de gelo e desperte um dragão lendário.',
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
      title: '1. O Último Fogo de Nórdor',
      image: '',
      scene: 'Uma pequena fogueira arde no centro de uma vila coberta por neve. Ao redor, casas abandonadas desaparecem sob o gelo.',
      text: 'Há cem anos, o Reino de Nórdor vive sob um inverno que nunca termina. O sol tornou-se uma mancha pálida atrás das nuvens, os rios congelaram e as plantações desapareceram sob metros de neve.\n\nVocê chega à Vila de Vinter, um dos últimos povoados habitados. No centro da praça, os aldeões protegem uma chama antiga que nunca pode se apagar. A anciã Freya afirma que o inverno começou quando a Rainha Isolde aprisionou a luz do reino dentro de quatro cristais mágicos.',
      dialogue: {
        name: 'Anciã Freya',
        portrait: '',
        lines: [
          'Os quatro Corações do Inverno foram espalhados pelo reino.',
          'Somente reunidos poderão despertar Asterion, o Dragão Branco.',
          'Sem ele, Nórdor não verá outro verão.'
        ]
      },
      effect: {
        gold: 12,
        addItems: [
          { id: 'espada_ferro', qty: 1 },
          { id: 'manto_inverno', qty: 1 },
          { id: 'pocao_calor', qty: 1 }
        ],
        flags: {
          iniciou_jornada: true
        }
      },
      choices: [
        { text: 'Jurar encontrar os quatro cristais', to: 'cap02', className: 'reward' },
        { text: 'Perguntar sobre a Rainha de Gelo', to: 'cap02' },
        { text: 'Seguir imediatamente para a floresta', to: 'cap03', damage: 3, className: 'danger' }
      ]
    },

    cap02: {
      title: '2. Os Filhos do Inverno',
      image: '',
      scene: 'Pegadas pequenas desaparecem na neve além das últimas casas da vila.',
      text: 'Antes de partir, Freya revela que cinco crianças desapareceram durante uma nevasca. Os aldeões acreditam que foram levadas por espíritos da montanha.\n\nUma jovem caçadora chamada Astrid oferece ajuda. Ela conhece trilhas antigas, sabe reconhecer rastros na neve e afirma ter visto luzes azuis seguindo as crianças.',
      dialogue: {
        name: 'Astrid',
        portrait: '',
        lines: [
          'Não foram lobos.',
          'As marcas terminam onde a nevasca começa.',
          'Se as encontrarmos, elas poderão saber o caminho para o primeiro cristal.'
        ]
      },
      sideQuest: {
        id: 'filhos_do_inverno',
        title: 'Os Filhos do Inverno',
        desc: 'Encontre as cinco crianças desaparecidas nas montanhas.'
      },
      effect: {
        xp: 12,
        flags: {
          conheceu_astrid: true
        },
        addItems: [
          { id: 'mapa_nordor', qty: 1 }
        ]
      },
      choices: [
        { text: 'Seguir os rastros das crianças', to: 'cap03', className: 'reward' },
        { text: 'Ir diretamente à Floresta de Cristal', to: 'cap04' }
      ]
    },

    cap03: {
      title: '3. A Nevasca dos Lobos',
      image: '',
      scene: 'Ventos violentos cobrem a trilha. Olhos azuis aparecem entre pinheiros congelados.',
      text: 'A trilha entra em uma nevasca tão intensa que o céu e o chão se tornam uma única parede branca. Astrid encontra pedaços de tecido infantil presos aos galhos.\n\nAntes que vocês avancem, uma alcateia de lobos de gelo surge ao redor. Seus corpos são cobertos por placas cristalinas, e vapor azul escapa de suas presas.',
      enemy: {
        id: 'lobos_gelo',
        name: 'Alcateia de Lobos de Gelo',
        hp: 30,
        atk: 7,
        def: 3,
        xp: 34,
        rewardGold: 14,
        rewardItems: [
          { id: 'presa_gelo', qty: 1 },
          { id: 'pele_lobo_gelo', qty: 1 }
        ],
        image: ''
      },
      winTo: 'cap04',
      loseTo: 'derrota'
    },

    cap04: {
      title: '4. A Floresta de Cristal',
      image: '',
      scene: 'Árvores transparentes refletem a luz como milhares de espelhos. O vento faz os galhos cantarem.',
      text: 'A Floresta de Cristal é um dos poucos lugares onde a magia antiga ainda sobrevive. Cada árvore guarda memórias congeladas de pessoas que passaram por ali.\n\nNo centro da floresta, quatro estátuas representam os ventos do norte, sul, leste e oeste. Para abrir o caminho até o primeiro cristal, será preciso ativá-las na ordem correta.',
      puzzle: {
        question: 'A inscrição diz: “O sol nasce no leste, aquece o sul, morre no oeste e dorme no norte.” Qual direção deve ser ativada primeiro?',
        answer: 'leste',
        successText: 'A estátua do leste se ilumina e as demais respondem em sequência.',
        reward: {
          xp: 18,
          addItems: [
            { id: 'chave_vento', qty: 1 }
          ]
        },
        setFlag: 'estatuas_ativadas'
      },
      choices: [
        { text: 'Seguir pela passagem revelada', to: 'cap05', requiresFlag: 'estatuas_ativadas', className: 'reward' },
        { text: 'Abrir caminho entre as árvores', to: 'cap05', damage: 5, className: 'danger' }
      ]
    },

    cap05: {
      title: '5. O Primeiro Coração',
      image: '',
      scene: 'Uma clareira abriga um altar coberto por raízes congeladas. Um cristal azul pulsa em seu centro.',
      text: 'A passagem leva ao Altar do Leste. Sobre ele está o primeiro Coração do Inverno, um cristal que guarda o poder das auroras boreais.\n\nAo se aproximar, um espírito coberto por galhos e gelo desperta. Ele afirma que nenhum humano pode carregar o cristal sem provar respeito pelo equilíbrio da floresta.',
      dialogue: {
        name: 'Guardião Boreal',
        portrait: '',
        lines: [
          'O inverno não é maldade.',
          'Ele é descanso, silêncio e preparação.',
          'A maldição nasceu quando alguém tentou fazê-lo eterno.'
        ]
      },
      enemy: {
        id: 'guardiao_boreal',
        name: 'Guardião Boreal',
        hp: 38,
        atk: 8,
        def: 4,
        xp: 46,
        rewardGold: 20,
        rewardItems: [
          { id: 'cristal_leste', qty: 1 },
          { id: 'arco_boreal', qty: 1 }
        ],
        image: '',
        setFlag: 'cristal_leste_obtido'
      },
      winTo: 'cap06',
      loseTo: 'derrota'
    },

    cap06: {
      title: '6. O Lago que Mostra o Futuro',
      image: '',
      scene: 'Um lago congelado reflete imagens que não existem ao redor.',
      text: 'Para alcançar as Montanhas do Eco, você precisa atravessar o Lago de Vidro. Sob a camada transparente, sombras enormes nadam lentamente.\n\nQuando você olha para o gelo, vê três futuros: Nórdor destruído, você sentado em um trono de gelo e um dragão voando sob um sol renascido.',
      puzzle: {
        question: 'O lago pergunta: “Qual futuro ainda pode ser alterado?”',
        answer: 'todos',
        successText: 'As imagens se desfazem, e uma trilha segura aparece sobre o gelo.',
        reward: {
          xp: 20,
          addItems: [
            { id: 'fragmento_profecia', qty: 1 }
          ]
        },
        setFlag: 'trilha_lago_aberta'
      },
      choices: [
        { text: 'Atravessar pela trilha segura', to: 'cap07', requiresFlag: 'trilha_lago_aberta', className: 'reward' },
        { text: 'Atravessar correndo pelo gelo', to: 'cap07', damage: 7, className: 'danger' }
      ]
    },

    cap07: {
      title: '7. As Crianças da Caverna',
      image: '',
      scene: 'Uma caverna aquecida por cristais vermelhos abriga pequenas figuras enroladas em peles.',
      text: 'Do outro lado do lago, Astrid encontra os rastros das crianças. Elas estão escondidas em uma caverna, protegidas por um velho troll chamado Borin.\n\nBorin afirma que salvou as crianças de espíritos da nevasca. Em troca de libertá-las, pede ajuda para recuperar um sino roubado por gigantes de gelo.',
      dialogue: {
        name: 'Borin, o Troll',
        portrait: '',
        lines: [
          'Humanos chamam monstros de monstros sem perguntar por quê.',
          'Eu salvei os pequenos.',
          'Recupere meu sino, e mostrarei um caminho secreto pela montanha.'
        ]
      },
      effect: {
        xp: 16,
        flags: {
          encontrou_criancas: true,
          filhos_inverno_salvos: true
        },
        addItems: [
          { id: 'pedra_calor', qty: 1 }
        ]
      },
      choices: [
        { text: 'Prometer recuperar o sino de Borin', to: 'cap08', className: 'reward' },
        { text: 'Levar as crianças de volta imediatamente', to: 'cap08' }
      ]
    },

    cap08: {
      title: '8. As Montanhas do Eco',
      image: '',
      scene: 'Picos gigantescos cercam um vale profundo. Cada palavra retorna como dezenas de vozes.',
      text: 'As Montanhas do Eco são dominadas por gigantes de gelo. Suas fortalezas foram esculpidas diretamente nas encostas, e pontes de pedra ligam picos separados por abismos.\n\nO segundo cristal está dentro da Fortaleza de Skoll, onde os gigantes guardam o Sino de Borin e escravizam viajantes capturados.',
      randomEvent: {
        chance: 0.5,
        text: 'Você encontra um abrigo abandonado com suprimentos de antigos exploradores.',
        reward: {
          xp: 10,
          addItems: [
            { id: 'pocao_calor', qty: 1 },
            { id: 'corda_montanha', qty: 1 }
          ]
        }
      },
      choices: [
        { text: 'Subir pela trilha principal', to: 'cap09' },
        { text: 'Usar a passagem secreta de Borin', to: 'cap09', requiresFlag: 'filhos_inverno_salvos', className: 'reward' },
        { text: 'Escalar o penhasco', to: 'cap09', requiresItem: 'corda_montanha', damage: 4, className: 'danger' }
      ]
    },

    cap09: {
      title: '9. A Fortaleza dos Gigantes',
      image: '',
      scene: 'Muralhas de gelo azul cercam um pátio onde gigantes treinam com machados enormes.',
      text: 'Dentro da fortaleza, você encontra o Sino de Borin pendurado acima do salão principal. Ao lado dele está o segundo Coração do Inverno.\n\nO líder dos gigantes, Hroth, afirma que recebeu ordens da Rainha Isolde para guardar o cristal e impedir o despertar do Dragão Branco.',
      dialogue: {
        name: 'Hroth, Senhor dos Gigantes',
        portrait: '',
        lines: [
          'O dragão não salvará seu reino.',
          'Ele o queimará sob gelo branco.',
          'A rainha nos prometeu sobrevivência.'
        ]
      },
      enemy: {
        id: 'hroth_gigante',
        name: 'Hroth, Gigante de Gelo',
        hp: 50,
        atk: 10,
        def: 5,
        xp: 64,
        rewardGold: 32,
        rewardItems: [
          { id: 'cristal_norte', qty: 1 },
          { id: 'sino_borin', qty: 1 },
          { id: 'machado_runico', qty: 1 }
        ],
        image: '',
        setFlag: 'cristal_norte_obtido'
      },
      winTo: 'cap10',
      loseTo: 'derrota'
    },

    cap10: {
      title: '10. O Relógio de Gelo',
      image: '',
      scene: 'Uma torre abandonada contém engrenagens congeladas e um grande relógio sem ponteiros.',
      text: 'No caminho para o sul, você encontra a Torre das Horas. Dizem que ali o tempo parou no instante em que o inverno eterno começou.\n\nO terceiro cristal está preso dentro do mecanismo do relógio. Para libertá-lo, é necessário colocar o tempo novamente em movimento.',
      puzzle: {
        question: 'O relógio mostra noite eterna. O que deve vir depois da noite?',
        answer: 'amanhecer',
        successText: 'As engrenagens começam a girar e o gelo se parte.',
        reward: {
          xp: 22,
          addItems: [
            { id: 'cristal_sul', qty: 1 }
          ],
          flags: {
            cristal_sul_obtido: true
          }
        },
        setFlag: 'relogio_ativado'
      },
      choices: [
        { text: 'Retirar o cristal do mecanismo', to: 'cap11', requiresFlag: 'relogio_ativado', className: 'reward' },
        { text: 'Quebrar o relógio à força', to: 'cap11', damage: 8, className: 'danger' }
      ]
    },

    cap11: {
      title: '11. O Templo do Dragão',
      image: '',
      scene: 'Um templo branco está escondido dentro de uma geleira. Esculturas mostram um dragão protegendo humanos.',
      text: 'Com três cristais reunidos, o Mapa de Nórdor revela o caminho para o Templo de Asterion. O quarto cristal está guardado ali, junto ao corpo adormecido do dragão.\n\nA porta do templo possui quatro encaixes e uma inscrição: “Fogo sem bondade destrói. Gelo sem mudança mata. Poder sem escolha escraviza.”',
      puzzle: {
        question: 'Qual qualidade deve guiar o poder: medo, domínio ou compaixão?',
        answer: 'compaixão',
        successText: 'A porta do templo reconhece sua intenção e se abre.',
        reward: {
          xp: 24,
          addItems: [
            { id: 'runa_dragao', qty: 1 }
          ]
        },
        setFlag: 'templo_dragao_aberto'
      },
      choices: [
        { text: 'Entrar no templo', to: 'cap12', requiresFlag: 'templo_dragao_aberto', className: 'reward' },
        { text: 'Abrir a porta com os cristais', to: 'cap12', requiresItem: 'cristal_sul' }
      ]
    },

    cap12: {
      title: '12. O Guardião de Cristal',
      image: '',
      scene: 'Uma estátua colossal se ergue diante de uma câmara onde o quarto cristal flutua.',
      text: 'O templo é protegido por um Golem de Cristal, criado para impedir que pessoas ambiciosas despertem Asterion.\n\nA criatura lê suas memórias e mostra imagens de todas as escolhas feitas durante a jornada. Só então ela prepara os punhos de cristal.',
      enemy: {
        id: 'golem_cristal',
        name: 'Golem de Cristal',
        hp: 56,
        atk: 11,
        def: 6,
        xp: 74,
        rewardGold: 38,
        rewardItems: [
          { id: 'cristal_oeste', qty: 1 },
          { id: 'armadura_glacial', qty: 1 }
        ],
        image: '',
        setFlag: 'cristal_oeste_obtido'
      },
      winTo: 'cap13',
      loseTo: 'derrota'
    },

    cap13: {
      title: '13. O Despertar de Asterion',
      image: '',
      scene: 'Um dragão branco gigantesco dorme preso dentro de uma montanha de gelo.',
      text: 'Os quatro cristais flutuam ao redor do corpo de Asterion. Quando se unem, uma luz atravessa a geleira e o dragão abre os olhos pela primeira vez em cem anos.\n\nAsterion revela que a Rainha Isolde não criou o inverno por crueldade. Ela tentou impedir uma entidade chamada Vazio Branco de atravessar para Nórdor. O feitiço salvou o reino, mas aprisionou Isolde à maldição.',
      dialogue: {
        name: 'Asterion',
        portrait: '',
        lines: [
          'A rainha não é a origem das trevas.',
          'Ela é a última muralha contra elas.',
          'Se a destruir sem quebrar o vínculo, libertará algo pior.'
        ]
      },
      effect: {
        xp: 26,
        flags: {
          despertou_asterion: true,
          descobriu_vazio_branco: true
        },
        addItems: [
          { id: 'escama_asterion', qty: 1 }
        ]
      },
      choices: [
        { text: 'Voar com Asterion até o castelo', to: 'cap14', className: 'reward' },
        { text: 'Pedir ao dragão para destruir a rainha', to: 'cap14' }
      ]
    },

    cap14: {
      title: '14. A Rainha de Gelo',
      image: '',
      scene: 'O castelo da rainha ergue-se no centro de uma tempestade. Torres de gelo cercam um trono azul.',
      text: 'Asterion leva você até o Castelo de Isolde. Dentro do salão do trono, a rainha permanece ligada a milhares de correntes mágicas que atravessam o reino.\n\nEla confirma a verdade: durante décadas, sacrificou sua própria humanidade para manter o Vazio Branco aprisionado. Agora a entidade assumiu parte de seu corpo e tenta usar o combate para se libertar.',
      dialogue: {
        name: 'Rainha Isolde',
        portrait: '',
        lines: [
          'Eu ouvi meu povo me chamar de monstro.',
          'Aceitei o ódio porque era melhor que vê-los mortos.',
          'Se ainda existe luz em mim, encontre-a antes que seja tarde.'
        ]
      },
      enemy: {
        id: 'rainha_isolde',
        name: 'Rainha Isolde, Senhora do Inverno',
        hp: 66,
        atk: 12,
        def: 6,
        xp: 92,
        rewardGold: 52,
        rewardItems: [
          { id: 'coroa_inverno', qty: 1 },
          { id: 'coração_isolde', qty: 1 }
        ],
        image: '',
        setFlag: 'isolde_derrotada'
      },
      winTo: 'cap15',
      loseTo: 'derrota'
    },

    cap15: {
      title: '15. O Destino do Inverno',
      image: '',
      scene: 'As correntes mágicas se rompem. O Vazio Branco surge como uma tempestade sem forma sobre o castelo.',
      text: 'Com Isolde vencida, enfraquecida ou finalmente livre da influência do Vazio, os quatro cristais começam a se partir. Asterion prepara seu fogo branco, enquanto o reino inteiro treme.\n\nVocê pode restaurar o ciclo das estações, tornar-se guardião do norte, absorver o poder do inverno ou preservar parte da neve eterna para manter o equilíbrio mágico.',
      choices: [
        { text: 'Restaurar o sol e o ciclo das estações', to: 'final_sol', requiresItem: 'coração_isolde', className: 'reward' },
        { text: 'Unir-se a Asterion como Cavaleiro do Dragão', to: 'final_dragao', requiresItem: 'escama_asterion', className: 'reward' },
        { text: 'Absorver o poder da Coroa do Inverno', to: 'final_rei_gelo', requiresItem: 'coroa_inverno', className: 'danger' },
        { text: 'Manter o inverno apenas nas montanhas', to: 'final_equilibrio', requiresFlag: 'descobriu_vazio_branco' }
      ]
    },

    final_sol: {
      title: 'Final: O Retorno do Sol',
      text: 'Você devolve o coração de Isolde aos quatro cristais. Asterion libera uma chama branca que atravessa as nuvens. Pela primeira vez em cem anos, o sol ilumina Nórdor. Rios voltam a correr, flores surgem sob a neve e o reino começa a renascer.',
      end: true
    },

    final_dragao: {
      title: 'Final Secreto: O Cavaleiro do Dragão',
      text: 'Asterion reconhece sua coragem e oferece um lugar sobre suas asas. Juntos, vocês selam o Vazio Branco e partem para proteger os reinos do norte. Seu nome torna-se lenda entre humanos, gigantes e dragões.',
      end: true
    },

    final_rei_gelo: {
      title: 'Final Sombrio: O Novo Rei do Gelo',
      text: 'Você coloca a Coroa do Inverno. O frio entra em seus ossos e responde à sua vontade. O Vazio é contido, mas o inverno permanece. Do trono de Isolde, você se torna o novo soberano de um reino silencioso e congelado.',
      end: true
    },

    final_equilibrio: {
      title: 'Final: O Equilíbrio do Norte',
      text: 'Você usa os cristais para limitar o inverno às montanhas. Os vales voltam a florescer, enquanto os picos permanecem cobertos de neve, guardando a prisão do Vazio Branco. Humanos e criaturas antigas aprendem a dividir o reino.',
      end: true
    },

    derrota: {
      title: 'Derrota',
      text: 'A nevasca cobre seus rastros. O inverno avança sobre as últimas vilas, e a chama de Nórdor se apaga. Nas noites mais frias, alguns ainda contam histórias sobre alguém que tentou despertar o Dragão Branco.',
      end: true
    }
  },

  items: {
    espada_ferro: {
      name: 'Espada de Ferro',
      type: 'weapon',
      attack: 2,
      desc: 'Uma espada simples entregue pelos aldeões de Vinter.'
    },

    manto_inverno: {
      name: 'Manto de Inverno',
      type: 'armor',
      defense: 2,
      desc: 'Protege contra frio intenso e pequenos ataques.'
    },

    pocao_calor: {
      name: 'Poção de Calor',
      type: 'consumable',
      heal: 12,
      desc: 'Restaura 12 pontos de vida e combate o frio.'
    },

    mapa_nordor: {
      name: 'Mapa de Nórdor',
      type: 'quest',
      desc: 'Mostra as principais regiões do reino congelado.'
    },

    presa_gelo: {
      name: 'Presa de Gelo',
      type: 'component',
      desc: 'Presa cristalina retirada de um lobo de gelo.'
    },

    pele_lobo_gelo: {
      name: 'Pele de Lobo de Gelo',
      type: 'component',
      desc: 'Material resistente ao frio extremo.'
    },

    chave_vento: {
      name: 'Chave dos Ventos',
      type: 'key',
      desc: 'Abre os caminhos secretos da Floresta de Cristal.'
    },

    cristal_leste: {
      name: 'Coração do Leste',
      type: 'relic',
      desc: 'O primeiro dos quatro Corações do Inverno.'
    },

    arco_boreal: {
      name: 'Arco Boreal',
      type: 'weapon',
      attack: 5,
      desc: 'Arco mágico que dispara flechas de luz fria.'
    },

    fragmento_profecia: {
      name: 'Fragmento da Profecia',
      type: 'quest',
      desc: 'Parte de uma visão sobre o destino de Nórdor.'
    },

    pedra_calor: {
      name: 'Pedra de Calor',
      type: 'relic',
      desc: 'Pedra mágica capaz de aquecer pequenos abrigos.'
    },

    corda_montanha: {
      name: 'Corda de Montanha',
      type: 'tool',
      desc: 'Usada para escalar penhascos e atravessar abismos.'
    },

    cristal_norte: {
      name: 'Coração do Norte',
      type: 'relic',
      desc: 'O segundo dos quatro Corações do Inverno.'
    },

    sino_borin: {
      name: 'Sino de Borin',
      type: 'quest',
      desc: 'Sino roubado pelos gigantes de gelo.'
    },

    machado_runico: {
      name: 'Machado Rúnico',
      type: 'weapon',
      attack: 6,
      desc: 'Arma dos gigantes, gravada com runas antigas.'
    },

    cristal_sul: {
      name: 'Coração do Sul',
      type: 'relic',
      desc: 'O terceiro dos quatro Corações do Inverno.'
    },

    runa_dragao: {
      name: 'Runa do Dragão',
      type: 'key',
      desc: 'Permite acessar a câmara de Asterion.'
    },

    cristal_oeste: {
      name: 'Coração do Oeste',
      type: 'relic',
      desc: 'O quarto dos quatro Corações do Inverno.'
    },

    armadura_glacial: {
      name: 'Armadura Glacial',
      type: 'armor',
      defense: 5,
      desc: 'Armadura feita com cristais mágicos do templo.'
    },

    escama_asterion: {
      name: 'Escama de Asterion',
      type: 'relic',
      desc: 'Símbolo da confiança do Dragão Branco.'
    },

    coroa_inverno: {
      name: 'Coroa do Inverno',
      type: 'relic',
      desc: 'Concede controle sobre o gelo e as tempestades.'
    },

    coração_isolde: {
      name: 'Coração de Isolde',
      type: 'relic',
      desc: 'A última parte humana da Rainha de Gelo.'
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