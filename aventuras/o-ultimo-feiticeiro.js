// Campanha para Zynka RPG 3.0
// Arquivo pronto para colocar dentro da pasta aventuras.

const aventura = {
  id: 'o_ultimo_feiticeiro',
  title: 'O Último Feiticeiro',
  icon: '🧙‍♂️',
  genre: 'Fantasia medieval',
  difficulty: 'Média',
  estimatedTime: '40 a 55 min',
  desc: 'A magia está desaparecendo do mundo. Como o último feiticeiro, você precisa recuperar cinco cristais mágicos antes que as trevas dominem o reino.',
  start: 'cap01',
  maxChapters: 15,

  assets: {
    music: './assets/musicas/TrilhaAventuraEpica.mp3',
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
      title: '1. A Última Chama',
      image: '',
      scene: 'No alto de uma torre em ruínas, a última chama mágica do reino vacila dentro de uma lamparina de cristal.',
      text: 'Durante séculos, a magia protegeu o reino de Eldoria. Feiticeiros curavam doenças, afastavam monstros e mantinham as colheitas vivas. Mas, pouco a pouco, os encantamentos começaram a falhar. As runas se apagaram, os portais se fecharam e os magos perderam seus poderes.\n\nAgora, você é o último feiticeiro capaz de conjurar uma centelha verdadeira. Diante de você, Mestre Orlan, o antigo guardião da torre, revela que a magia do mundo foi dividida em cinco Cristais Primordiais. Se eles não forem reunidos antes do eclipse negro, as trevas consumirão Eldoria.',
      dialogue: {
        name: 'Mestre Orlan',
        portrait: '',
        lines: [
          'O Cristal do Fogo está nas Montanhas Rubras.',
          'O Cristal da Água dorme no Lago Profundo.',
          'O Cristal da Terra foi perdido nas minas de Dhoran.',
          'O Cristal do Ar está preso na Torre dos Ventos.',
          'E o Cristal da Luz... foi levado pelo Rei Sombrio.'
        ]
      },
      effect: {
        gold: 12,
        addItems: [
          { id: 'cajado_antigo', qty: 1 },
          { id: 'grimorio_orlan', qty: 1 },
          { id: 'pocao_mana', qty: 1 }
        ],
        flags: {
          iniciou_jornada: true
        }
      },
      choices: [
        { text: 'Jurar recuperar os cinco cristais', to: 'cap02', className: 'reward' },
        { text: 'Perguntar sobre o Rei Sombrio', to: 'cap02' },
        { text: 'Tentar reacender a chama da torre', to: 'cap02', damage: 4, className: 'danger' }
      ]
    },

    cap02: {
      title: '2. A Floresta Sem Encantos',
      image: '',
      scene: 'Uma floresta antes luminosa agora está cinzenta. Árvores mortas cobrem o caminho e criaturas silenciosas observam entre os galhos.',
      text: 'A primeira rota leva pela Floresta de Lúmen, onde a magia da natureza costumava ser mais forte. Agora, as fontes secaram e as criaturas encantadas desapareceram.\n\nNo centro da mata, você encontra Lyra, uma arqueira que protege os poucos aldeões restantes. Ela diz que sombras têm levado pessoas para as Montanhas Rubras e que criaturas deformadas surgem à noite.',
      dialogue: {
        name: 'Lyra',
        portrait: '',
        lines: [
          'A floresta está morrendo junto com a magia.',
          'Se realmente é o último feiticeiro, então talvez ainda exista esperança.',
          'Eu conheço o caminho até as montanhas. Mas não será seguro.'
        ]
      },
      sideQuest: {
        id: 'aldeoes_desaparecidos',
        title: 'Os Desaparecidos de Lúmen',
        desc: 'Encontre os aldeões levados pelas sombras.'
      },
      effect: {
        xp: 12,
        flags: {
          conheceu_lyra: true
        },
        addItems: [
          { id: 'amuleto_floresta', qty: 1 }
        ]
      },
      choices: [
        { text: 'Viajar com Lyra até as montanhas', to: 'cap03', className: 'reward' },
        { text: 'Investigar as sombras na floresta', to: 'cap04' }
      ]
    },

    cap03: {
      title: '3. As Montanhas Rubras',
      image: '',
      scene: 'Picos vermelhos cortam o céu. Rios de lava descem por encostas negras e o ar queima os pulmões.',
      text: 'As Montanhas Rubras abrigam o primeiro cristal. Antigamente, dragões de fogo protegiam suas cavernas. Hoje, apenas cinzas, rochas quebradas e criaturas corrompidas permanecem.\n\nUma ponte de pedra leva até o Templo da Chama. No entanto, runas antigas bloqueiam a entrada, exigindo que o visitante prove compreender o verdadeiro significado do fogo.',
      puzzle: {
        question: 'O templo pergunta: “O fogo destrói, aquece e transforma. Qual destas forças o torna sagrado?”',
        answer: 'transforma',
        successText: 'As runas brilham e a porta do templo se abre.',
        reward: {
          xp: 18,
          addItems: [
            { id: 'runa_fogo', qty: 1 }
          ]
        },
        setFlag: 'templo_fogo_aberto'
      },
      choices: [
        { text: 'Entrar no Templo da Chama', to: 'cap05', requiresFlag: 'templo_fogo_aberto', className: 'reward' },
        { text: 'Escalar pela lateral da montanha', to: 'cap05', damage: 6, className: 'danger' }
      ]
    },

    cap04: {
      title: '4. As Sombras de Lúmen',
      image: '',
      scene: 'Uma clareira está coberta por névoa negra. Figuras humanas permanecem presas em casulos de sombra.',
      text: 'Ao investigar a floresta, você encontra os aldeões desaparecidos. Eles foram presos por uma criatura chamada Devorador Arcano, que se alimenta dos últimos vestígios de magia dentro das pessoas.\n\nA criatura percebe sua presença e se volta imediatamente para você. Para ela, um feiticeiro vivo é uma fonte de poder irresistível.',
      enemy: {
        id: 'devorador_arcano',
        name: 'Devorador Arcano',
        hp: 30,
        atk: 7,
        def: 3,
        xp: 34,
        rewardGold: 18,
        rewardItems: [
          { id: 'essencia_sombria', qty: 1 },
          { id: 'pocao_mana', qty: 1 }
        ],
        image: ''
      },
      winTo: 'cap03',
      loseTo: 'derrota'
    },

    cap05: {
      title: '5. O Guardião das Chamas',
      image: '',
      scene: 'No coração da montanha, um dragão feito de fogo líquido protege um cristal vermelho.',
      text: 'Dentro do templo, o calor aumenta a cada passo. No centro da câmara, o Cristal do Fogo flutua sobre um lago de lava. Diante dele, um dragão antigo desperta.\n\nO guardião não está corrompido. Ele apenas cumpre seu juramento: ninguém indigno deve levar o cristal.',
      dialogue: {
        name: 'Ignar, Guardião das Chamas',
        portrait: '',
        lines: [
          'A magia não desapareceu.',
          'Ela foi ferida pela ambição dos homens.',
          'Mostre que deseja restaurá-la, não dominá-la.'
        ]
      },
      enemy: {
        id: 'ignar_dragao_fogo',
        name: 'Ignar, Dragão de Fogo',
        hp: 38,
        atk: 9,
        def: 4,
        xp: 46,
        rewardGold: 24,
        rewardItems: [
          { id: 'cristal_fogo', qty: 1 }
        ],
        image: '',
        setFlag: 'cristal_fogo_obtido'
      },
      winTo: 'cap06',
      loseTo: 'derrota'
    },

    cap06: {
      title: '6. O Lago Profundo',
      image: '',
      scene: 'Um lago escuro se estende entre penhascos. A água é imóvel e reflete um céu diferente daquele acima.',
      text: 'O segundo cristal está escondido no Lago Profundo. A água parece calma, mas antigas canções dizem que criaturas gigantes vivem sob a superfície.\n\nNa margem, uma sacerdotisa chamada Selene espera por você. Ela protege o Santuário das Marés e afirma que o Cristal da Água só despertará diante de alguém capaz de abandonar o medo.',
      dialogue: {
        name: 'Selene',
        portrait: '',
        lines: [
          'A água não resiste. Ela contorna.',
          'Quem tenta dominá-la afunda.',
          'Quem aprende com ela encontra passagem.'
        ]
      },
      effect: {
        xp: 14,
        flags: {
          conheceu_selene: true
        },
        addItems: [
          { id: 'concha_sagrada', qty: 1 }
        ]
      },
      choices: [
        { text: 'Entrar no lago com Selene', to: 'cap07', className: 'reward' },
        { text: 'Procurar uma passagem pelas cavernas', to: 'cap07' }
      ]
    },

    cap07: {
      title: '7. O Santuário das Marés',
      image: '',
      scene: 'Sob as águas, um templo de cristal azul permanece intacto, cercado por peixes luminosos.',
      text: 'A Concha Sagrada permite que você respire debaixo d’água. O santuário parece suspenso no fundo do lago, protegido por correntes mágicas.\n\nNo salão central, três fontes representam passado, presente e futuro. Para alcançar o Cristal da Água, você precisa escolher qual delas guarda a verdade.',
      puzzle: {
        question: 'Qual tempo pode ser mudado: passado, presente ou futuro?',
        answer: 'presente',
        successText: 'A fonte do presente se abre, revelando o caminho até o cristal.',
        reward: {
          xp: 20,
          addItems: [
            { id: 'runa_agua', qty: 1 }
          ]
        },
        setFlag: 'caminho_cristal_agua'
      },
      choices: [
        { text: 'Seguir até a câmara do cristal', to: 'cap08', requiresFlag: 'caminho_cristal_agua', className: 'reward' },
        { text: 'Forçar a barreira mágica', to: 'cap08', damage: 7, className: 'danger' }
      ]
    },

    cap08: {
      title: '8. A Serpente do Lago',
      image: '',
      scene: 'Uma serpente marinha colossal surge entre as colunas, coberta por escamas azuis.',
      text: 'Antes que você alcance o cristal, uma serpente antiga bloqueia o caminho. Ela foi corrompida pela mesma força que está drenando a magia do mundo.\n\nSelene percebe que a criatura ainda luta contra a escuridão dentro de si. Derrotá-la talvez seja a única forma de libertá-la.',
      enemy: {
        id: 'serpente_lago',
        name: 'Serpente do Lago Profundo',
        hp: 42,
        atk: 9,
        def: 4,
        xp: 50,
        rewardGold: 26,
        rewardItems: [
          { id: 'cristal_agua', qty: 1 },
          { id: 'escama_azul', qty: 1 }
        ],
        image: '',
        setFlag: 'cristal_agua_obtido'
      },
      winTo: 'cap09',
      loseTo: 'derrota'
    },

    cap09: {
      title: '9. As Minas de Dhoran',
      image: '',
      scene: 'Túneis abandonados descem para o coração da montanha. Estátuas de anões guardam entradas desmoronadas.',
      text: 'O terceiro cristal pertence à Terra. Ele foi escondido pelos anões de Dhoran quando as primeiras sombras surgiram. Mas as minas foram seladas após os trabalhadores começarem a desaparecer.\n\nDentro dos túneis, você encontra Thorgar, o último guardião anão. Ele diz que algo despertou nas profundezas e transformou pedra em carne.',
      dialogue: {
        name: 'Thorgar',
        portrait: '',
        lines: [
          'A montanha lembra tudo.',
          'Cada golpe de picareta, cada juramento, cada traição.',
          'E agora ela está furiosa.'
        ]
      },
      effect: {
        xp: 16,
        flags: {
          conheceu_thorgar: true
        },
        addItems: [
          { id: 'martelo_dhoran', qty: 1 }
        ]
      },
      choices: [
        { text: 'Seguir Thorgar pelas galerias antigas', to: 'cap10', className: 'reward' },
        { text: 'Descer pelo poço principal', to: 'cap10', damage: 5, className: 'danger' }
      ]
    },

    cap10: {
      title: '10. O Colosso de Pedra',
      image: '',
      scene: 'Uma criatura de rocha, metal e ossos bloqueia a câmara central da mina.',
      text: 'O Cristal da Terra foi absorvido por uma criatura formada pela própria montanha. O Colosso de Pedra desperta quando você se aproxima, fazendo o teto tremer.\n\nThorgar grita que o núcleo da criatura deve ser atingido quando as rachaduras brilharem.',
      enemy: {
        id: 'colosso_pedra',
        name: 'Colosso de Pedra',
        hp: 48,
        atk: 10,
        def: 6,
        xp: 58,
        rewardGold: 30,
        rewardItems: [
          { id: 'cristal_terra', qty: 1 },
          { id: 'nucleo_pedra', qty: 1 }
        ],
        image: '',
        setFlag: 'cristal_terra_obtido'
      },
      winTo: 'cap11',
      loseTo: 'derrota'
    },

    cap11: {
      title: '11. A Torre dos Ventos',
      image: '',
      scene: 'Uma torre branca flutua acima das nuvens, ligada ao solo por correntes de prata.',
      text: 'O quarto cristal está no alto da Torre dos Ventos. Ela pertenceu aos magos do ar, mas agora gira descontroladamente em meio a tempestades.\n\nPara chegar até ela, você precisa usar antigos elevadores mágicos alimentados pelos três cristais já recuperados.',
      randomEvent: {
        chance: 0.5,
        text: 'Uma rajada mágica quase lança você para fora da plataforma, mas o Amuleto da Floresta protege sua queda.',
        reward: {
          xp: 10
        }
      },
      choices: [
        { text: 'Ativar o elevador mágico', to: 'cap12', requiresItem: 'cristal_terra', className: 'reward' },
        { text: 'Escalar pelas correntes de prata', to: 'cap12', damage: 8, className: 'danger' }
      ]
    },

    cap12: {
      title: '12. A Rainha das Tempestades',
      image: '',
      scene: 'No topo da torre, uma feiticeira envolta em relâmpagos segura o Cristal do Ar.',
      text: 'A guardiã da torre foi corrompida pelas trevas. Ela se apresenta como Vaelira, Rainha das Tempestades, e afirma que a magia deve desaparecer para que o mundo finalmente se liberte dos feiticeiros.\n\nEla oferece o cristal em troca de seu grimório e da promessa de nunca mais conjurar magia.',
      dialogue: {
        name: 'Vaelira',
        portrait: '',
        lines: [
          'A magia criou reis, guerras e monstros.',
          'Talvez o mundo esteja melhor sem nós.',
          'Entregue seu grimório e deixe o silêncio vencer.'
        ]
      },
      enemy: {
        id: 'vaelira',
        name: 'Vaelira, Rainha das Tempestades',
        hp: 50,
        atk: 10,
        def: 5,
        xp: 62,
        rewardGold: 34,
        rewardItems: [
          { id: 'cristal_ar', qty: 1 },
          { id: 'capa_tempestade', qty: 1 }
        ],
        image: '',
        setFlag: 'cristal_ar_obtido'
      },
      winTo: 'cap13',
      loseTo: 'derrota'
    },

    cap13: {
      title: '13. O Reino em Trevas',
      image: '',
      scene: 'Ao retornar, você encontra Eldoria coberta por nuvens negras. O castelo real está cercado por sombras.',
      text: 'Com quatro cristais reunidos, você retorna ao reino. Mas o eclipse negro já começou. O Rei Sombrio tomou a capital e aprisionou os últimos defensores.\n\nMestre Orlan revela a verdade: o Rei Sombrio foi um antigo feiticeiro chamado Malachar. Ele tentou reunir os cristais para se tornar imortal e, ao falhar, drenou a magia do mundo.',
      dialogue: {
        name: 'Mestre Orlan',
        portrait: '',
        lines: [
          'Malachar não quer apenas o Cristal da Luz.',
          'Ele quer que você traga os outros quatro até ele.',
          'A jornada inteira pode ter sido parte do plano.'
        ]
      },
      effect: {
        xp: 20,
        flags: {
          descobriu_malachar: true
        },
        addItems: [
          { id: 'selo_orlan', qty: 1 }
        ]
      },
      choices: [
        { text: 'Entrar no castelo pela passagem secreta', to: 'cap14', requiresItem: 'selo_orlan', className: 'reward' },
        { text: 'Atacar o portão principal', to: 'cap14', damage: 8, className: 'danger' }
      ]
    },

    cap14: {
      title: '14. O Rei Sombrio',
      image: '',
      scene: 'No salão do trono, uma figura envolta em escuridão segura o Cristal da Luz dentro de uma gaiola negra.',
      text: 'Malachar espera por você no antigo salão real. Os quatro cristais começam a vibrar, atraídos pelo quinto. Ele sorri ao perceber que seu plano funcionou.\n\nO Rei Sombrio revela que os cristais unidos podem restaurar a magia ou destruí-la para sempre. Ele pretende absorver todos e se tornar a única fonte de poder do mundo.',
      dialogue: {
        name: 'Malachar',
        portrait: '',
        lines: [
          'Você fez exatamente o que eu precisava.',
          'Trouxe o fogo, a água, a terra e o ar até mim.',
          'Agora entregue sua vontade... e assista ao nascimento de um deus.'
        ]
      },
      enemy: {
        id: 'malachar_rei_sombrio',
        name: 'Malachar, o Rei Sombrio',
        hp: 64,
        atk: 12,
        def: 6,
        xp: 90,
        rewardGold: 50,
        rewardItems: [
          { id: 'cristal_luz', qty: 1 },
          { id: 'coroa_sombria', qty: 1 }
        ],
        image: '',
        setFlag: 'malachar_derrotado'
      },
      winTo: 'cap15',
      loseTo: 'derrota'
    },

    cap15: {
      title: '15. O Destino da Magia',
      image: '',
      scene: 'Os cinco cristais flutuam sobre o salão destruído. O eclipse começa a recuar.',
      text: 'Com Malachar derrotado, os cinco Cristais Primordiais se unem diante de você. O mundo inteiro parece prender a respiração.\n\nVocê pode restaurar a magia, destruí-la para impedir novas guerras, dividir seu poder entre todos os povos ou absorvê-la e se tornar o único grande feiticeiro de Eldoria.',
      choices: [
        { text: 'Restaurar a magia do mundo', to: 'final_restauracao', requiresItem: 'cristal_luz', className: 'reward' },
        { text: 'Destruir os cinco cristais', to: 'final_sem_magia', requiresFlag: 'malachar_derrotado' },
        { text: 'Dividir a magia entre todos os povos', to: 'final_magia_livre', requiresItem: 'grimorio_orlan', className: 'reward' },
        { text: 'Absorver os cinco cristais', to: 'final_poder', requiresItem: 'coroa_sombria', className: 'danger' }
      ]
    },

    final_restauracao: {
      title: 'Final: O Retorno da Magia',
      text: 'Você une os cinco cristais e restaura as linhas mágicas de Eldoria. Florestas florescem, rios voltam a brilhar e antigos encantamentos despertam. Você deixa de ser o último feiticeiro, pois novas crianças começam a nascer com o dom.',
      end: true
    },

    final_sem_magia: {
      title: 'Final: O Mundo dos Homens',
      text: 'Você destrói os cristais. A magia desaparece para sempre, levando consigo monstros, maldições e milagres. Eldoria entra em uma nova era baseada em trabalho, conhecimento e coragem humana. Seu nome é lembrado como o feiticeiro que encerrou a própria era.',
      end: true
    },

    final_magia_livre: {
      title: 'Final Secreto: A Magia de Todos',
      text: 'Você usa o Grimório de Orlan para dividir o poder dos cristais entre todos os povos. A magia deixa de pertencer a reis, ordens e feiticeiros. Camponeses curam plantações, artesãos encantam ferramentas e povos antigos voltam a compartilhar seus conhecimentos.',
      end: true
    },

    final_poder: {
      title: 'Final: O Novo Arquimago',
      text: 'Você absorve os cinco cristais. Por um instante, todas as vozes mágicas do mundo falam dentro de sua mente. Você derrota as trevas, mas se torna a única fonte de magia existente. Com o tempo, o reino passa a temer você tanto quanto temia Malachar.',
      end: true
    },

    derrota: {
      title: 'Derrota',
      text: 'A última centelha de magia se apaga dentro de você. O eclipse negro cobre Eldoria, e as sombras tomam o reino. Durante gerações, histórias são contadas sobre o último feiticeiro que tentou salvar o mundo.',
      end: true
    }
  },

  items: {
    cajado_antigo: {
      name: 'Cajado Antigo',
      type: 'weapon',
      attack: 3,
      desc: 'Cajado do último feiticeiro, capaz de canalizar magia residual.'
    },

    grimorio_orlan: {
      name: 'Grimório de Orlan',
      type: 'quest',
      desc: 'Livro que contém conhecimentos sobre os cinco cristais.'
    },

    pocao_mana: {
      name: 'Poção de Mana',
      type: 'consumable',
      heal: 12,
      desc: 'Restaura 12 pontos de vida e energia mágica.'
    },

    amuleto_floresta: {
      name: 'Amuleto da Floresta',
      type: 'relic',
      desc: 'Protege contra pequenas maldições e perigos naturais.'
    },

    essencia_sombria: {
      name: 'Essência Sombria',
      type: 'component',
      desc: 'Energia retirada de uma criatura corrompida.'
    },

    runa_fogo: {
      name: 'Runa do Fogo',
      type: 'key',
      desc: 'Runa necessária para acessar o Templo da Chama.'
    },

    cristal_fogo: {
      name: 'Cristal do Fogo',
      type: 'relic',
      desc: 'Um dos cinco Cristais Primordiais.'
    },

    concha_sagrada: {
      name: 'Concha Sagrada',
      type: 'tool',
      desc: 'Permite respirar debaixo d’água por tempo limitado.'
    },

    runa_agua: {
      name: 'Runa da Água',
      type: 'key',
      desc: 'Símbolo mágico do Santuário das Marés.'
    },

    cristal_agua: {
      name: 'Cristal da Água',
      type: 'relic',
      desc: 'Um dos cinco Cristais Primordiais.'
    },

    escama_azul: {
      name: 'Escama Azul',
      type: 'component',
      desc: 'Escama da serpente do Lago Profundo.'
    },

    martelo_dhoran: {
      name: 'Martelo de Dhoran',
      type: 'weapon',
      attack: 4,
      desc: 'Martelo anão capaz de quebrar pedras encantadas.'
    },

    cristal_terra: {
      name: 'Cristal da Terra',
      type: 'relic',
      desc: 'Um dos cinco Cristais Primordiais.'
    },

    nucleo_pedra: {
      name: 'Núcleo de Pedra',
      type: 'component',
      desc: 'Coração mágico do Colosso de Pedra.'
    },

    cristal_ar: {
      name: 'Cristal do Ar',
      type: 'relic',
      desc: 'Um dos cinco Cristais Primordiais.'
    },

    capa_tempestade: {
      name: 'Capa da Tempestade',
      type: 'armor',
      defense: 3,
      desc: 'Protege contra ventos e descargas mágicas.'
    },

    selo_orlan: {
      name: 'Selo de Orlan',
      type: 'key',
      desc: 'Abre passagens secretas no castelo real.'
    },

    cristal_luz: {
      name: 'Cristal da Luz',
      type: 'relic',
      desc: 'O quinto e mais poderoso Cristal Primordial.'
    },

    coroa_sombria: {
      name: 'Coroa Sombria',
      type: 'relic',
      desc: 'Artefato usado por Malachar para controlar as trevas.'
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