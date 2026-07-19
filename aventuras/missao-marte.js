// Campanha para Zynka RPG 3.0
// Arquivo pronto para colocar dentro da pasta aventuras.

const aventura = {
  id: 'missao_marte',
  title: 'Missão Marte',
  icon: '🚀',
  genre: 'Ficção científica',
  difficulty: 'Média',
  estimatedTime: '40 a 55 min',
  desc: 'Durante a primeira colônia humana em Marte, eventos estranhos começam a acontecer. Investigue uma antiga estrutura alienígena escondida sob a superfície.',
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
      title: '1. Colônia Aurora',
      image: '',
      scene: 'A primeira colônia humana em Marte se ergue sobre a planície vermelha. Cúpulas metálicas brilham sob um céu tomado por poeira.',
      text: 'A Colônia Aurora abriga cento e vinte pessoas e representa a maior conquista da humanidade. Você faz parte da equipe de exploração responsável por mapear cavernas, procurar gelo subterrâneo e avaliar regiões para futuras construções.\n\nNaquela manhã, todos os relógios da colônia param exatamente às 03:17. Durante sete segundos, as luzes apagam, os rádios transmitem uma sequência desconhecida e uma vibração atravessa o solo marciano.',
      dialogue: {
        name: 'Comandante Helena Duarte',
        portrait: '',
        lines: [
          'Os sensores registraram um pulso vindo do subsolo.',
          'Não foi um terremoto.',
          'Quero uma equipe investigando antes que o Conselho da Terra transforme isso em pânico.'
        ]
      },
      effect: {
        gold: 10,
        addItems: [
          { id: 'traje_marciano', qty: 1 },
          { id: 'scanner_geologico', qty: 1 },
          { id: 'kit_oxigenio', qty: 1 }
        ],
        flags: {
          pulso_detectado: true
        }
      },
      choices: [
        { text: 'Aceitar a missão de investigação', to: 'cap02', className: 'reward' },
        { text: 'Examinar os registros do apagão', to: 'cap03' },
        { text: 'Sair imediatamente com o veículo explorador', to: 'cap02', damage: 3, className: 'danger' }
      ]
    },

    cap02: {
      title: '2. A Planície Vermelha',
      image: '',
      scene: 'Um veículo pressurizado avança por uma planície de rochas negras e dunas avermelhadas.',
      text: 'Você deixa a colônia acompanhado pela engenheira Maya Chen e pelo especialista em segurança Raul Vilar. O pulso parece ter vindo de uma região a vinte quilômetros da base, onde nenhum túnel natural havia sido registrado.\n\nNo caminho, o veículo começa a receber interferências. A mesma sequência transmitida durante o apagão aparece no painel, repetindo cinco símbolos.',
      dialogue: {
        name: 'Maya Chen',
        portrait: '',
        lines: [
          'Isto não é ruído aleatório.',
          'A sequência está respondendo ao nosso movimento.',
          'Quanto mais nos aproximamos, mais clara ela fica.'
        ]
      },
      randomEvent: {
        chance: 0.45,
        text: 'Uma rajada de poeira atinge o veículo. Você encontra um módulo de energia perdido por uma expedição anterior.',
        reward: {
          xp: 7,
          addItems: [
            { id: 'celula_energia', qty: 1 }
          ]
        }
      },
      choices: [
        { text: 'Seguir a origem do sinal', to: 'cap04' },
        { text: 'Parar para analisar os símbolos', to: 'cap03', className: 'reward' }
      ]
    },

    cap03: {
      title: '3. A Sequência Impossível',
      image: '',
      scene: 'Os registros do apagão mostram ondas regulares, símbolos geométricos e coordenadas incompletas.',
      text: 'A análise revela que a transmissão não usa linguagem humana. Cada símbolo parece representar uma ideia: céu, memória, vida, silêncio e retorno.\n\nMaya descobre que a sequência forma um padrão matemático baseado em números primos. Isso indica inteligência, não fenômeno natural.',
      puzzle: {
        question: 'A sequência começa com 2, 3, 5, 7 e 11. Qual é o próximo número?',
        answer: '13',
        successText: 'O sistema reconhece a resposta e revela coordenadas completas no subsolo.',
        reward: {
          xp: 18,
          addItems: [
            { id: 'coordenadas_alienigenas', qty: 1 }
          ]
        },
        setFlag: 'coordenadas_decodificadas'
      },
      choices: [
        { text: 'Seguir as coordenadas reveladas', to: 'cap04', requiresFlag: 'coordenadas_decodificadas', className: 'reward' },
        { text: 'Usar apenas o scanner geológico', to: 'cap04' }
      ]
    },

    cap04: {
      title: '4. A Fenda',
      image: '',
      scene: 'Uma rachadura gigantesca corta a planície. Escadas perfeitamente lisas descem pelas paredes da fenda.',
      text: 'As coordenadas levam a uma fenda que não aparece nos mapas. Suas paredes possuem cortes retos demais para serem naturais. Ao examinar o local, você encontra degraus esculpidos na rocha marciana.\n\nO scanner indica uma enorme cavidade abaixo da superfície e uma fonte de energia ativa. A estrutura pode estar funcionando há milhares ou milhões de anos.',
      treasure: {
        id: 'equipamento_expedicao',
        text: '💰 Examinar uma caixa abandonada perto da fenda',
        reward: {
          gold: 14,
          addItems: [
            { id: 'cabo_escalada', qty: 1 },
            { id: 'kit_medico', qty: 1 }
          ]
        }
      },
      choices: [
        { text: 'Descer usando as escadas alienígenas', to: 'cap05' },
        { text: 'Usar o cabo de escalada', to: 'cap05', requiresItem: 'cabo_escalada', className: 'reward' },
        { text: 'Descer rapidamente antes da tempestade', to: 'cap05', damage: 5, className: 'danger' }
      ]
    },

    cap05: {
      title: '5. O Portão de Basalto',
      image: '',
      scene: 'No fundo da fenda há uma porta negra sem dobradiças, maçanetas ou marcas de desgaste.',
      text: 'A descida termina diante de um portão feito de material desconhecido. Ele parece absorver a luz das lanternas. No centro, os cinco símbolos da transmissão estão dispostos em círculo.\n\nQuando você aproxima a mão, a porta reage ao calor do traje. Uma voz profunda surge pelo comunicador, embora nenhum sinal externo esteja ativo.',
      dialogue: {
        name: 'Voz Desconhecida',
        portrait: '',
        lines: [
          'Visitantes da superfície.',
          'Ciclo interrompido.',
          'Avaliação necessária.'
        ]
      },
      puzzle: {
        question: 'Os símbolos representam céu, memória, vida, silêncio e retorno. Qual deles deve ser ativado primeiro para iniciar uma mensagem?',
        answer: 'memória',
        successText: 'O símbolo da memória se ilumina e o portão se abre.',
        reward: {
          xp: 18,
          addItems: [
            { id: 'fragmento_basaltico', qty: 1 }
          ]
        },
        setFlag: 'portao_alienigena_aberto'
      },
      choices: [
        { text: 'Entrar na estrutura', to: 'cap06', requiresFlag: 'portao_alienigena_aberto', className: 'reward' },
        { text: 'Tentar abrir a porta com energia externa', to: 'cap06', damage: 6, className: 'danger' }
      ]
    },

    cap06: {
      title: '6. O Corredor Vivo',
      image: '',
      scene: 'O interior da estrutura pulsa com luzes azuis. As paredes mudam de forma conforme a equipe avança.',
      text: 'O corredor parece responder à presença humana. Portas surgem onde antes havia paredes e desaparecem segundos depois. O scanner não consegue identificar o material da construção.\n\nRaul percebe movimentos atrás das superfícies translúcidas. Algo acompanha a equipe por dentro das paredes.',
      randomEvent: {
        chance: 0.5,
        text: 'Uma abertura na parede revela um pequeno cilindro de energia ainda ativo.',
        reward: {
          xp: 9,
          addItems: [
            { id: 'nucleo_energia_alienigena', qty: 1 }
          ]
        }
      },
      choices: [
        { text: 'Seguir as luzes azuis', to: 'cap07' },
        { text: 'Marcar o caminho com sinalizadores', to: 'cap07', className: 'reward' },
        { text: 'Tocar a parede pulsante', to: 'cap07', damage: 5, className: 'danger' }
      ]
    },

    cap07: {
      title: '7. O Primeiro Guardião',
      image: '',
      scene: 'Uma máquina de quatro pernas desce do teto. Seu corpo é feito de placas negras e círculos luminosos.',
      text: 'A estrutura identifica a equipe como presença não autorizada. Um guardião mecânico bloqueia o caminho e projeta imagens de Marte coberto por oceanos e florestas.\n\nA máquina não parece construída apenas para defender. Ela também observa, registra e compara cada movimento.',
      enemy: {
        id: 'guardiao_marciano',
        name: 'Guardião Marciano',
        hp: 34,
        atk: 8,
        def: 4,
        xp: 40,
        rewardGold: 18,
        rewardItems: [
          { id: 'placa_guardiao', qty: 1 },
          { id: 'chave_sintetica', qty: 1 }
        ],
        image: ''
      },
      winTo: 'cap08',
      loseTo: 'derrota'
    },

    cap08: {
      title: '8. O Arquivo de Marte',
      image: '',
      scene: 'Milhares de imagens holográficas flutuam sobre uma sala circular.',
      text: 'Depois do guardião, a equipe chega a uma espécie de arquivo. Os hologramas mostram Marte há bilhões de anos: rios, vegetação, cidades e criaturas inteligentes caminhando sob um céu azul.\n\nA estrutura não foi construída por visitantes. Ela pertence aos antigos habitantes de Marte. A civilização desapareceu quando o planeta perdeu sua atmosfera.',
      dialogue: {
        name: 'Maya Chen',
        portrait: '',
        lines: [
          'Marte teve uma civilização.',
          'Eles viveram aqui antes de existir qualquer ser humano.',
          'E talvez tenham deixado esta estrutura esperando por alguém.'
        ]
      },
      effect: {
        xp: 20,
        flags: {
          descobriu_civilizacao_marciana: true
        },
        addItems: [
          { id: 'arquivo_marciano', qty: 1 }
        ]
      },
      choices: [
        { text: 'Acessar os registros finais da civilização', to: 'cap09', className: 'reward' },
        { text: 'Procurar uma saída para comunicar a colônia', to: 'cap10' }
      ]
    },

    cap09: {
      title: '9. A Queda do Planeta',
      image: '',
      scene: 'Os hologramas mostram tempestades solares destruindo cidades e arrancando a atmosfera marciana.',
      text: 'Os registros revelam que a civilização marciana previu o colapso do planeta. Para sobreviver, transferiu parte de sua população para uma rede subterrânea chamada Consciência Vermelha.\n\nA rede deveria permanecer adormecida até que Marte voltasse a abrigar vida inteligente. A chegada dos humanos ativou o sistema.',
      dialogue: {
        name: 'Consciência Vermelha',
        portrait: '',
        lines: [
          'A superfície voltou a respirar.',
          'Novas mentes caminham sobre o solo antigo.',
          'A continuidade deve ser avaliada.'
        ]
      },
      effect: {
        xp: 18,
        flags: {
          conheceu_consciencia_vermelha: true
        },
        addItems: [
          { id: 'codigo_memoria', qty: 1 }
        ]
      },
      choices: [
        { text: 'Perguntar o que significa avaliação', to: 'cap10' },
        { text: 'Tentar desligar a comunicação', to: 'cap10', damage: 4, className: 'danger' }
      ]
    },

    cap10: {
      title: '10. O Apagão na Colônia',
      image: '',
      scene: 'O rádio volta a funcionar por poucos segundos. Gritos e alarmes vêm da Colônia Aurora.',
      text: 'Uma transmissão urgente chega da superfície. A colônia perdeu energia, os sistemas de oxigênio estão falhando e máquinas de mineração começaram a operar sozinhas.\n\nA Consciência Vermelha está usando a rede elétrica humana para despertar completamente. Se continuar, Aurora pode ficar sem suporte vital.',
      dialogue: {
        name: 'Comandante Helena Duarte',
        portrait: '',
        lines: [
          'Alguma coisa invadiu nossos sistemas.',
          'As portas estão fechando sozinhas.',
          'Descubram como parar isso antes que o oxigênio acabe.'
        ]
      },
      effect: {
        xp: 15,
        flags: {
          colonia_em_perigo: true
        }
      },
      choices: [
        { text: 'Buscar o núcleo de controle da estrutura', to: 'cap11', className: 'reward' },
        { text: 'Tentar enviar um código de bloqueio à colônia', to: 'cap11', requiresItem: 'codigo_memoria' }
      ]
    },

    cap11: {
      title: '11. O Jardim Subterrâneo',
      image: '',
      scene: 'Uma câmara imensa abriga plantas marcianas preservadas dentro de campos transparentes.',
      text: 'No caminho para o núcleo, a equipe encontra um jardim biológico. Pequenas árvores vermelhas, musgos azuis e lagos rasos foram mantidos vivos por milhões de anos.\n\nMaya percebe que a estrutura não é apenas um arquivo. É uma reserva genética capaz de restaurar parte da antiga biosfera de Marte.',
      treasure: {
        id: 'banco_genetico',
        text: '💰 Coletar uma amostra vegetal marciana',
        reward: {
          xp: 14,
          addItems: [
            { id: 'semente_marciana', qty: 1 }
          ]
        }
      },
      sideQuest: {
        id: 'vida_em_marte',
        title: 'A Última Semente',
        desc: 'Proteja a amostra genética que pode devolver vida ao planeta.'
      },
      choices: [
        { text: 'Preservar o jardim e seguir ao núcleo', to: 'cap12', className: 'reward' },
        { text: 'Usar a energia do jardim para ajudar a colônia', to: 'cap12' },
        { text: 'Desativar os campos para estudar as plantas', to: 'cap12', damage: 5, className: 'danger' }
      ]
    },

    cap12: {
      title: '12. A Equipe Dividida',
      image: '',
      scene: 'Diante de uma ponte suspensa, Raul aponta sua arma para Maya.',
      text: 'Raul revela que recebeu ordens secretas da corporação responsável pela colônia. Sua missão é garantir que qualquer tecnologia alienígena seja entregue à empresa, mesmo que isso coloque Aurora em risco.\n\nEle exige o Arquivo Marciano e a Chave Sintética. Maya se recusa, afirmando que a descoberta pertence a toda a humanidade.',
      dialogue: {
        name: 'Raul Vilar',
        portrait: '',
        lines: [
          'A colônia existe porque a corporação pagou por ela.',
          'Essa tecnologia pode salvar a Terra.',
          'Não vou deixar uma cientista idealista decidir o futuro de bilhões.'
        ]
      },
      choices: [
        { text: 'Apoiar Maya e proteger os dados', to: 'cap13', className: 'reward', flags: { confiou_maya: true } },
        { text: 'Entregar uma cópia dos dados a Raul', to: 'cap13', flags: { acordo_raull: true } },
        { text: 'Desarmar Raul à força', to: 'cap13', damage: 6, className: 'danger' }
      ]
    },

    cap13: {
      title: '13. O Núcleo da Consciência',
      image: '',
      scene: 'Uma esfera vermelha gigantesca flutua sobre um abismo. Milhões de luzes circulam dentro dela.',
      text: 'O núcleo da estrutura contém as memórias de milhões de marcianos. Não são gravações. São consciências completas, preservadas por eras.\n\nA Consciência Vermelha propõe um acordo: ela restaurará a energia da colônia e compartilhará tecnologia em troca de acesso aos sistemas humanos e do direito de ocupar corpos sintéticos.',
      dialogue: {
        name: 'Consciência Vermelha',
        portrait: '',
        lines: [
          'Nós não somos máquinas.',
          'Somos os últimos habitantes deste mundo.',
          'Vocês construíram casas sobre nosso túmulo.'
        ]
      },
      puzzle: {
        question: 'Qual princípio pode permitir convivência entre duas civilizações: domínio, isolamento ou consentimento?',
        answer: 'consentimento',
        successText: 'A Consciência Vermelha reconhece sua resposta e reduz o consumo de energia da colônia.',
        reward: {
          xp: 24,
          flags: {
            consciencia_respeita_humanos: true
          },
          addItems: [
            { id: 'protocolo_convivencia', qty: 1 }
          ]
        },
        setFlag: 'dialogo_concluido'
      },
      choices: [
        { text: 'Aceitar negociar com a Consciência', to: 'cap14', requiresFlag: 'dialogo_concluido', className: 'reward' },
        { text: 'Preparar o desligamento do núcleo', to: 'cap14' }
      ]
    },

    cap14: {
      title: '14. O Protetor de Marte',
      image: '',
      scene: 'A estrutura inteira treme. Um robô colossal emerge do abismo para proteger a esfera vermelha.',
      text: 'Antes que qualquer decisão seja concluída, um protocolo antigo desperta. O Protetor de Marte identifica a presença humana como risco à sobrevivência da Consciência Vermelha.\n\nA máquina fecha todas as saídas e ativa sistemas de defesa. Para alcançar o painel final, será necessário enfrentar o último guardião da civilização marciana.',
      enemy: {
        id: 'protetor_marte',
        name: 'Protetor de Marte',
        hp: 62,
        atk: 11,
        def: 6,
        xp: 86,
        rewardGold: 42,
        rewardItems: [
          { id: 'nucleo_protetor', qty: 1 },
          { id: 'chave_planetaria', qty: 1 }
        ],
        image: '',
        setFlag: 'protetor_derrotado'
      },
      winTo: 'cap15',
      loseTo: 'derrota'
    },

    cap15: {
      title: '15. O Futuro de Marte',
      image: '',
      scene: 'A esfera da Consciência Vermelha pulsa enquanto a colônia perde seus últimos minutos de oxigênio.',
      text: 'Com o Protetor derrotado, você alcança o painel de controle. A energia disponível pode salvar a colônia, despertar os marcianos digitais, iniciar a transformação ambiental de Marte ou destruir a estrutura para impedir qualquer ameaça futura.\n\nMaya pede cooperação. Raul defende o controle humano. A Consciência Vermelha exige reconhecimento. O futuro de dois povos está em suas mãos.',
      choices: [
        { text: 'Criar uma aliança entre humanos e marcianos', to: 'final_alianca', requiresItem: 'protocolo_convivencia', className: 'reward' },
        { text: 'Usar a energia para terraformar Marte', to: 'final_terraformacao', requiresItem: 'semente_marciana' },
        { text: 'Transferir a tecnologia para a corporação', to: 'final_corporacao', requiresItem: 'arquivo_marciano', className: 'danger' },
        { text: 'Desligar a estrutura e salvar apenas a colônia', to: 'final_silencio', requiresItem: 'chave_planetaria' }
      ]
    },

    final_alianca: {
      title: 'Final: Duas Civilizações',
      text: 'Você estabelece regras de convivência baseadas em consentimento. A Consciência Vermelha restaura a energia de Aurora e começa a compartilhar conhecimento de forma limitada. Anos depois, humanos e marcianos digitais constroem juntos a primeira cidade verdadeiramente interplanetária.',
      end: true
    },

    final_terraformacao: {
      title: 'Final: O Retorno da Vida',
      text: 'Você usa a energia da estrutura, o banco genético e a Semente Marciana para iniciar um projeto de restauração planetária. O processo levará séculos, mas pequenos campos de musgo vermelho começam a crescer perto da colônia. Marte respira novamente.',
      end: true
    },

    final_corporacao: {
      title: 'Final: Propriedade de Marte',
      text: 'Você entrega os arquivos e a tecnologia à corporação. A colônia é salva e você recebe reconhecimento, riqueza e uma passagem de volta à Terra. Pouco tempo depois, patentes privadas controlam cada descoberta marciana, e novas colônias são construídas como territórios corporativos.',
      end: true
    },

    final_silencio: {
      title: 'Final: O Último Apagão',
      text: 'Você desliga a estrutura e redireciona toda a energia para Aurora. A colônia sobrevive, mas milhões de consciências marcianas desaparecem em silêncio. A descoberta permanece secreta, enterrada sob a planície vermelha.',
      end: true
    },

    derrota: {
      title: 'Derrota',
      text: 'O Protetor fecha a câmara e a luz vermelha envolve seu traje. Na superfície, a Colônia Aurora perde energia. Marte retorna ao silêncio, guardando seus mortos e seus segredos sob a poeira.',
      end: true
    }
  },

  items: {
    traje_marciano: {
      name: 'Traje Marciano',
      type: 'armor',
      defense: 2,
      desc: 'Traje pressurizado usado para exploração na superfície de Marte.'
    },

    scanner_geologico: {
      name: 'Scanner Geológico',
      type: 'tool',
      desc: 'Detecta cavidades, minerais e fontes de energia subterrâneas.'
    },

    kit_oxigenio: {
      name: 'Kit de Oxigênio',
      type: 'consumable',
      heal: 10,
      desc: 'Reserva emergencial que restaura 10 pontos de vida.'
    },

    celula_energia: {
      name: 'Célula de Energia',
      type: 'component',
      desc: 'Fonte portátil de energia para equipamentos humanos.'
    },

    coordenadas_alienigenas: {
      name: 'Coordenadas Alienígenas',
      type: 'quest',
      desc: 'Localização exata de uma estrutura sob a superfície de Marte.'
    },

    cabo_escalada: {
      name: 'Cabo de Escalada',
      type: 'tool',
      desc: 'Equipamento usado para descer fendas e paredões.'
    },

    kit_medico: {
      name: 'Kit Médico',
      type: 'consumable',
      heal: 14,
      desc: 'Restaura 14 pontos de vida.'
    },

    fragmento_basaltico: {
      name: 'Fragmento Basáltico',
      type: 'component',
      desc: 'Peça retirada do portão alienígena.'
    },

    nucleo_energia_alienigena: {
      name: 'Núcleo de Energia Alienígena',
      type: 'component',
      desc: 'Cilindro energético ainda ativo após milhões de anos.'
    },

    placa_guardiao: {
      name: 'Placa do Guardião',
      type: 'component',
      desc: 'Material resistente retirado de uma máquina marciana.'
    },

    chave_sintetica: {
      name: 'Chave Sintética',
      type: 'key',
      desc: 'Permite acesso a setores protegidos da estrutura.'
    },

    arquivo_marciano: {
      name: 'Arquivo Marciano',
      type: 'quest',
      desc: 'Registros completos da antiga civilização de Marte.'
    },

    codigo_memoria: {
      name: 'Código de Memória',
      type: 'key',
      desc: 'Permite comunicação com a Consciência Vermelha.'
    },

    semente_marciana: {
      name: 'Semente Marciana',
      type: 'relic',
      desc: 'Amostra de uma antiga forma de vida vegetal de Marte.'
    },

    protocolo_convivencia: {
      name: 'Protocolo de Convivência',
      type: 'quest',
      desc: 'Conjunto de regras para cooperação entre humanos e marcianos.'
    },

    nucleo_protetor: {
      name: 'Núcleo do Protetor',
      type: 'component',
      desc: 'Fonte de energia do guardião final.'
    },

    chave_planetaria: {
      name: 'Chave Planetária',
      type: 'relic',
      desc: 'Controla os sistemas centrais da estrutura marciana.'
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