// Campanha para Zynka RPG 3.0
// Arquivo pronto para colocar dentro da pasta aventuras.

const aventura = {
  id: 'cidade_zumbi',
  title: 'Cidade Zumbi',
  icon: '🧟',
  genre: 'Terror e sobrevivência',
  difficulty: 'Média',
  estimatedTime: '40 a 55 min',
  desc: 'Um vírus transformou a população em mortos-vivos. Escolha aliados, encontre suprimentos e decida em quem confiar para sobreviver.',
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
      title: '1. O Primeiro Alarme',
      image: '',
      scene: 'Sirenas ecoam entre prédios apagados. Carros abandonados bloqueiam as ruas e uma fumaça negra cobre o centro da cidade.',
      text: 'Você acorda no apartamento com o som de explosões ao longe. O celular está sem sinal, a televisão transmite apenas uma mensagem de emergência e alguém bate desesperadamente na porta do corredor.\n\nA mensagem oficial diz que um vírus desconhecido provocou surtos de violência extrema. A população deve permanecer em casa. Pela janela, porém, você vê pessoas correndo enquanto outras avançam sobre elas de maneira desumana.',
      dialogue: {
        name: 'Transmissão de Emergência',
        portrait: '',
        lines: [
          'Permaneça em local seguro.',
          'Evite contato com pessoas infectadas.',
          'Aguarde instruções das autoridades.'
        ]
      },
      effect: {
        gold: 8,
        addItems: [
          { id: 'faca_cozinha', qty: 1 },
          { id: 'garrafa_agua', qty: 1 },
          { id: 'kit_primeiros_socorros', qty: 1 }
        ],
        flags: {
          surto_iniciado: true
        }
      },
      choices: [
        { text: 'Abrir a porta para quem está no corredor', to: 'cap02', className: 'reward' },
        { text: 'Bloquear a porta e procurar uma saída pelos fundos', to: 'cap03' },
        { text: 'Descer imediatamente pelas escadas', to: 'cap03', damage: 4, className: 'danger' }
      ]
    },

    cap02: {
      title: '2. A Vizinha Ferida',
      image: '',
      scene: 'O corredor está escuro. Uma mulher ferida segura o braço enquanto passos pesados sobem pelas escadas.',
      text: 'Do outro lado da porta está Júlia, sua vizinha e estudante de enfermagem. Ela tem sangue na roupa, mas afirma que pertence a outra pessoa. Seu irmão desapareceu durante a evacuação e ela pretende encontrá-lo.\n\nAntes que você consiga decidir, um homem infectado surge no fim do corredor. Ele se move com dificuldade, mas reage ao menor ruído.',
      dialogue: {
        name: 'Júlia',
        portrait: '',
        lines: [
          'Eu não fui mordida.',
          'Se ficarmos aqui, eles vão nos cercar.',
          'O hospital pode ter remédios e informações sobre o vírus.'
        ]
      },
      effect: {
        xp: 10,
        flags: {
          aliada_julia: true
        },
        addItems: [
          { id: 'cracha_hospital', qty: 1 }
        ]
      },
      choices: [
        { text: 'Aceitar Júlia como aliada', to: 'cap03', className: 'reward' },
        { text: 'Mandar Júlia seguir sozinha', to: 'cap03' }
      ]
    },

    cap03: {
      title: '3. As Ruas Mortas',
      image: '',
      scene: 'As avenidas estão cobertas de destroços. Alarmes de carros tocam sem parar e infectados vagam entre os veículos.',
      text: 'Ao deixar o prédio, você entende a dimensão do desastre. Lojas foram saqueadas, ônibus estão atravessados nas ruas e dezenas de infectados caminham sem direção.\n\nUm rádio dentro de um carro transmite uma mensagem: sobreviventes devem seguir para o Estádio Municipal, onde haveria uma zona de evacuação. Outra voz interrompe a transmissão, alertando que o estádio foi tomado.',
      randomEvent: {
        chance: 0.5,
        text: 'Você encontra uma mochila abandonada dentro de um carro destrancado.',
        reward: {
          xp: 6,
          addItems: [
            { id: 'barra_cereal', qty: 1 },
            { id: 'pilhas', qty: 1 }
          ]
        }
      },
      choices: [
        { text: 'Seguir para a farmácia da esquina', to: 'cap04', className: 'reward' },
        { text: 'Ir diretamente ao hospital', to: 'cap05' },
        { text: 'Tentar atravessar a avenida correndo', to: 'cap05', damage: 5, className: 'danger' }
      ]
    },

    cap04: {
      title: '4. A Farmácia Saqueada',
      image: '',
      scene: 'Prateleiras derrubadas cobrem o chão. O gerador ainda mantém algumas luzes acesas.',
      text: 'A farmácia foi quase completamente saqueada, mas alguns armários permanecem trancados. No depósito, você escuta alguém respirando atrás de uma porta metálica.\n\nLá dentro está Marcos, um ex-policial armado. Ele diz que perdeu sua equipe durante a evacuação e que pretende chegar até uma delegacia próxima para buscar equipamentos.',
      dialogue: {
        name: 'Marcos',
        portrait: '',
        lines: [
          'As autoridades não vêm mais.',
          'Quem quiser sobreviver precisa parar de esperar resgate.',
          'Tenho uma arma, mas preciso de gente que saiba obedecer.'
        ]
      },
      treasure: {
        id: 'armario_farmacia',
        text: '💰 Abrir o armário de medicamentos',
        reward: {
          gold: 10,
          addItems: [
            { id: 'antibiotico', qty: 1 },
            { id: 'kit_primeiros_socorros', qty: 1 }
          ]
        }
      },
      effect: {
        xp: 12,
        flags: {
          encontrou_marcos: true
        }
      },
      choices: [
        { text: 'Convidar Marcos para o grupo', to: 'cap05', className: 'reward' },
        { text: 'Recusar ajuda e seguir ao hospital', to: 'cap05' }
      ]
    },

    cap05: {
      title: '5. O Hospital Abandonado',
      image: '',
      scene: 'O hospital está escuro. Macas bloqueiam os corredores e mensagens de quarentena cobrem as paredes.',
      text: 'O hospital parece ter sido evacuado às pressas. Há marcas de sangue nos elevadores e portas de isolamento foram fechadas por dentro.\n\nJúlia encontra registros indicando que o vírus se espalha por mordidas e contato com sangue contaminado. O relatório também menciona pacientes que mantiveram consciência por várias horas após a infecção.',
      effect: {
        xp: 15,
        flags: {
          descobriu_transmissao: true
        },
        addItems: [
          { id: 'relatorio_virus', qty: 1 }
        ]
      },
      choices: [
        { text: 'Procurar medicamentos no laboratório', to: 'cap06', className: 'reward' },
        { text: 'Investigar a ala de isolamento', to: 'cap07' }
      ]
    },

    cap06: {
      title: '6. O Laboratório',
      image: '',
      scene: 'Tubos quebrados, computadores desligados e caixas térmicas ocupam o laboratório subterrâneo.',
      text: 'No laboratório, você encontra amostras do vírus e anotações incompletas. Um pesquisador chamado Dr. Elias deixou uma gravação dizendo que desenvolveu um soro experimental capaz de retardar a infecção.\n\nA gravação termina com um pedido: leve a pesquisa para a universidade, onde existe um equipamento capaz de produzir o soro em maior quantidade.',
      dialogue: {
        name: 'Dr. Elias',
        portrait: '',
        lines: [
          'Não é uma cura.',
          'Mas pode dar algumas horas a quem foi infectado.',
          'Essas horas podem salvar muita gente.'
        ]
      },
      treasure: {
        id: 'caixa_soro',
        text: '💰 Abrir a caixa térmica do laboratório',
        reward: {
          addItems: [
            { id: 'soro_experimental', qty: 1 }
          ],
          xp: 12
        }
      },
      effect: {
        flags: {
          descobriu_soro: true
        },
        addItems: [
          { id: 'dados_pesquisa', qty: 1 }
        ]
      },
      choices: [
        { text: 'Levar a pesquisa para a universidade', to: 'cap08', className: 'reward' },
        { text: 'Voltar e investigar a ala de isolamento', to: 'cap07' }
      ]
    },

    cap07: {
      title: '7. A Ala de Isolamento',
      image: '',
      scene: 'Portas de vidro reforçado cercam um corredor tomado por luzes vermelhas.',
      text: 'A ala de isolamento está cheia de infectados presos em quartos. Alguns batem contra o vidro. Outros permanecem imóveis, como se estivessem mortos.\n\nQuando o sistema elétrico falha, todas as portas se abrem ao mesmo tempo. Um infectado maior e deformado surge entre os pacientes.',
      enemy: {
        id: 'infectado_brutamontes',
        name: 'Infectado Brutamontes',
        hp: 34,
        atk: 8,
        def: 3,
        xp: 38,
        rewardGold: 14,
        rewardItems: [
          { id: 'chave_ambulancia', qty: 1 },
          { id: 'colete_protecao', qty: 1 }
        ],
        image: ''
      },
      winTo: 'cap08',
      loseTo: 'derrota'
    },

    cap08: {
      title: '8. O Abrigo na Escola',
      image: '',
      scene: 'Uma escola foi transformada em abrigo improvisado. Barricadas cobrem janelas e sobreviventes observam com desconfiança.',
      text: 'No caminho para a universidade, o grupo encontra um abrigo montado em uma escola. Cerca de vinte pessoas vivem ali sob o comando de Roberto, um comerciante que controla os alimentos.\n\nRoberto oferece comida e descanso, mas exige que você entregue armas e medicamentos. Alguns sobreviventes parecem com medo dele.',
      dialogue: {
        name: 'Roberto',
        portrait: '',
        lines: [
          'Aqui todos contribuem.',
          'Armas comigo. Remédios comigo.',
          'Quem não aceita as regras pode voltar para a rua.'
        ]
      },
      sideQuest: {
        id: 'libertar_abrigo',
        title: 'O Tirano da Escola',
        desc: 'Descubra se Roberto está escondendo suprimentos dos sobreviventes.'
      },
      choices: [
        { text: 'Aceitar as regras de Roberto temporariamente', to: 'cap09' },
        { text: 'Investigar o depósito escondido', to: 'cap09', className: 'reward' },
        { text: 'Confrontar Roberto imediatamente', to: 'cap09', damage: 4, className: 'danger' }
      ]
    },

    cap09: {
      title: '9. Em Quem Confiar',
      image: '',
      scene: 'Uma discussão explode dentro do abrigo. Alimentos desapareceram e alguém acusa Júlia de estar infectada.',
      text: 'Durante a noite, uma caixa de comida some. Roberto acusa seu grupo e afirma que Júlia está escondendo uma mordida. Marcos exige que ela mostre o braço ferido.\n\nA ferida parece profunda, mas não há marcas claras de dentes. Você precisa decidir em quem confiar antes que o abrigo se divida.',
      dialogue: {
        name: 'Júlia',
        portrait: '',
        lines: [
          'Eu cortei o braço no hospital.',
          'Não estou infectada.',
          'Mas se não acredita em mim, diga agora.'
        ]
      },
      choices: [
        { text: 'Defender Júlia diante de todos', to: 'cap10', className: 'reward', flags: { confiou_julia: true } },
        { text: 'Apoiar Marcos e afastar Júlia', to: 'cap10', flags: { afastou_julia: true } },
        { text: 'Revistar o depósito de Roberto', to: 'cap10', flags: { descobriu_estoque_roberto: true } }
      ]
    },

    cap10: {
      title: '10. A Universidade Cercada',
      image: '',
      scene: 'O campus está cercado por centenas de infectados. Um helicóptero destruído permanece no pátio.',
      text: 'A universidade abriga o equipamento necessário para produzir o soro. Porém, os portões estão bloqueados e uma multidão de infectados ocupa a entrada principal.\n\nHá três possíveis acessos: os túneis de manutenção, a biblioteca lateral e o estacionamento subterrâneo.',
      puzzle: {
        question: 'Qual acesso oferece mais proteção contra uma multidão: biblioteca, estacionamento ou túnel?',
        answer: 'túnel',
        successText: 'Você entra pelos túneis de manutenção sem chamar atenção da horda.',
        reward: {
          xp: 20,
          addItems: [
            { id: 'mapa_universidade', qty: 1 }
          ]
        },
        setFlag: 'entrada_segura_universidade'
      },
      choices: [
        { text: 'Usar os túneis de manutenção', to: 'cap11', requiresFlag: 'entrada_segura_universidade', className: 'reward' },
        { text: 'Entrar pelo estacionamento', to: 'cap11' },
        { text: 'Abrir caminho pela entrada principal', to: 'cap11', damage: 8, className: 'danger' }
      ]
    },

    cap11: {
      title: '11. O Cientista Sobrevivente',
      image: '',
      scene: 'Um laboratório universitário ainda tem energia. Um homem armado observa através de uma porta de vidro.',
      text: 'No laboratório, você encontra o Dr. Elias, ainda vivo. Ele explica que o vírus foi desenvolvido como arma biológica por uma empresa chamada Genova Biotec.\n\nElias acredita que pode aperfeiçoar o soro, mas precisa de uma amostra retirada de um infectado especial conhecido como Paciente Zero.',
      dialogue: {
        name: 'Dr. Elias',
        portrait: '',
        lines: [
          'O surto não foi acidente.',
          'A Genova perdeu o controle e tentou apagar as provas.',
          'O Paciente Zero está no centro de pesquisa da empresa.'
        ]
      },
      effect: {
        xp: 18,
        flags: {
          encontrou_elias: true,
          descobriu_genova: true
        },
        addItems: [
          { id: 'cartao_genova', qty: 1 }
        ]
      },
      choices: [
        { text: 'Ajudar Elias a produzir o soro', to: 'cap12', className: 'reward' },
        { text: 'Levar apenas os dados e procurar evacuação', to: 'cap12' }
      ]
    },

    cap12: {
      title: '12. O Comboio Militar',
      image: '',
      scene: 'Veículos militares bloqueiam uma avenida. Soldados mascarados apontam armas para qualquer sobrevivente.',
      text: 'No caminho para a Genova Biotec, você encontra um comboio militar. O comandante afirma que a cidade será bombardeada ao amanhecer para impedir a expansão do vírus.\n\nEle oferece transporte para fora da cidade, mas exige todas as amostras e dados da pesquisa. Elias diz que os militares trabalham para a própria Genova.',
      dialogue: {
        name: 'Comandante Ferraz',
        portrait: '',
        lines: [
          'Entreguem a pesquisa e entram no comboio.',
          'Recusem e permanecerão na zona de contenção.',
          'Não temos tempo para heroísmo.'
        ]
      },
      choices: [
        { text: 'Recusar e seguir para a Genova', to: 'cap13', className: 'reward' },
        { text: 'Entregar parte dos dados e entrar no comboio', to: 'cap13' },
        { text: 'Atacar os soldados e roubar equipamentos', to: 'cap13', damage: 7, className: 'danger' }
      ]
    },

    cap13: {
      title: '13. O Centro da Genova',
      image: '',
      scene: 'O prédio da Genova Biotec está intacto, protegido por portas blindadas e sistemas automáticos.',
      text: 'Usando o cartão de acesso, você entra no centro de pesquisa. Arquivos internos confirmam que o vírus foi criado para aumentar resistência física, mas provocou agressividade, perda de consciência e mutações.\n\nO Paciente Zero está mantido no subsolo. Os registros mostram que ele ainda produz anticorpos raros, mas também se tornou a criatura mais perigosa da cidade.',
      treasure: {
        id: 'arsenal_genova',
        text: '💰 Abrir o armário de segurança',
        reward: {
          gold: 24,
          addItems: [
            { id: 'espingarda', qty: 1 },
            { id: 'municao', qty: 2 }
          ]
        }
      },
      effect: {
        xp: 20,
        flags: {
          encontrou_provas_genova: true
        },
        addItems: [
          { id: 'arquivos_genova', qty: 1 }
        ]
      },
      choices: [
        { text: 'Descer até o Paciente Zero', to: 'cap14', className: 'reward' },
        { text: 'Tentar destruir o laboratório inteiro', to: 'cap14', damage: 6, className: 'danger' }
      ]
    },

    cap14: {
      title: '14. Paciente Zero',
      image: '',
      scene: 'Uma câmara subterrânea está destruída por dentro. Correntes partidas cobrem o chão.',
      text: 'O Paciente Zero não se parece mais humano. Seu corpo cresceu de forma descontrolada, com músculos expostos e ossos deformados. Ele reage à sua presença com um rugido que faz as luzes piscarem.\n\nElias prepara o equipamento de coleta. Para produzir uma cura real, será necessário sobreviver tempo suficiente para obter a amostra.',
      enemy: {
        id: 'paciente_zero',
        name: 'Paciente Zero',
        hp: 60,
        atk: 11,
        def: 5,
        xp: 82,
        rewardGold: 38,
        rewardItems: [
          { id: 'amostra_paciente_zero', qty: 1 },
          { id: 'chave_evacuação', qty: 1 }
        ],
        image: '',
        setFlag: 'paciente_zero_derrotado'
      },
      winTo: 'cap15',
      loseTo: 'derrota'
    },

    cap15: {
      title: '15. A Última Escolha',
      image: '',
      scene: 'O amanhecer se aproxima. Helicópteros militares sobrevoam a cidade e explosões começam nos bairros distantes.',
      text: 'Com a amostra em mãos, Elias consegue produzir doses limitadas de uma possível cura. Contudo, não há tempo para salvar todos antes do bombardeio.\n\nVocê precisa decidir entre fugir com seus aliados, divulgar as provas contra a Genova, distribuir o soro aos sobreviventes ou entregar a pesquisa aos militares em troca de segurança.',
      choices: [
        { text: 'Distribuir o soro e evacuar os sobreviventes', to: 'final_esperanca', requiresItem: 'amostra_paciente_zero', className: 'reward' },
        { text: 'Divulgar os arquivos da Genova para o mundo', to: 'final_verdade', requiresItem: 'arquivos_genova' },
        { text: 'Entregar a pesquisa aos militares', to: 'final_acordo', requiresItem: 'dados_pesquisa' },
        { text: 'Ficar para salvar o maior número possível de pessoas', to: 'final_sacrificio', requiresFlag: 'paciente_zero_derrotado', className: 'reward' }
      ]
    },

    final_esperanca: {
      title: 'Final: A Primeira Cura',
      text: 'Você distribui as primeiras doses do soro e conduz os sobreviventes pelos túneis de evacuação. Nem todos conseguem sair, mas muitos infectados recuperam a consciência antes da transformação completa. Meses depois, a pesquisa de Elias se torna a base para uma cura verdadeira.',
      end: true
    },

    final_verdade: {
      title: 'Final: A Verdade Sobre a Genova',
      text: 'Você transmite os arquivos da Genova para jornalistas, governos e redes independentes. A empresa tenta negar, mas as provas são incontestáveis. A cidade é perdida, porém os responsáveis pelo surto não conseguem esconder seus crimes.',
      end: true
    },

    final_acordo: {
      title: 'Final: Zona Segura',
      text: 'Você entrega a pesquisa aos militares e consegue um lugar no comboio. Enquanto deixa a cidade, percebe caixas com o símbolo da Genova dentro dos veículos. Você sobrevive, mas nunca descobre se a pesquisa será usada para criar a cura ou uma arma ainda pior.',
      end: true
    },

    final_sacrificio: {
      title: 'Final Secreto: O Último Sobrevivente',
      text: 'Você permanece na cidade e ajuda grupos presos a alcançar os túneis. Quando o bombardeio começa, centenas já escaparam graças às suas escolhas. Seu destino permanece desconhecido, mas histórias sobre alguém que enfrentou a horda para salvar desconhecidos se espalham entre os sobreviventes.',
      end: true
    },

    derrota: {
      title: 'Derrota',
      text: 'Você cai entre as ruas silenciosas da cidade. Horas depois, levanta novamente, mas já não reconhece os lugares, as pessoas ou seu próprio nome. A cidade ganha mais um morto-vivo.',
      end: true
    }
  },

  items: {
    faca_cozinha: {
      name: 'Faca de Cozinha',
      type: 'weapon',
      attack: 2,
      desc: 'Uma faca improvisada para defesa.'
    },

    garrafa_agua: {
      name: 'Garrafa de Água',
      type: 'consumable',
      heal: 6,
      desc: 'Água potável que restaura 6 pontos de vida.'
    },

    barra_cereal: {
      name: 'Barra de Cereal',
      type: 'consumable',
      heal: 5,
      desc: 'Alimento rápido que restaura 5 pontos de vida.'
    },

    kit_primeiros_socorros: {
      name: 'Kit de Primeiros Socorros',
      type: 'consumable',
      heal: 14,
      desc: 'Restaura 14 pontos de vida.'
    },

    antibiotico: {
      name: 'Antibiótico',
      type: 'consumable',
      heal: 10,
      desc: 'Medicamento útil para tratar ferimentos.'
    },

    cracha_hospital: {
      name: 'Crachá do Hospital',
      type: 'key',
      desc: 'Permite acessar setores restritos do hospital.'
    },

    pilhas: {
      name: 'Pilhas',
      type: 'component',
      desc: 'Mantêm rádios e lanternas funcionando.'
    },

    relatorio_virus: {
      name: 'Relatório do Vírus',
      type: 'quest',
      desc: 'Documento com informações sobre a transmissão.'
    },

    soro_experimental: {
      name: 'Soro Experimental',
      type: 'consumable',
      heal: 18,
      desc: 'Retarda a infecção e restaura 18 pontos de vida.'
    },

    dados_pesquisa: {
      name: 'Dados da Pesquisa',
      type: 'quest',
      desc: 'Arquivos necessários para produzir o soro.'
    },

    chave_ambulancia: {
      name: 'Chave da Ambulância',
      type: 'key',
      desc: 'Chave de um veículo de emergência.'
    },

    colete_protecao: {
      name: 'Colete de Proteção',
      type: 'armor',
      defense: 3,
      desc: 'Reduz danos causados por ataques.'
    },

    mapa_universidade: {
      name: 'Mapa da Universidade',
      type: 'quest',
      desc: 'Mostra túneis e laboratórios do campus.'
    },

    cartao_genova: {
      name: 'Cartão da Genova',
      type: 'key',
      desc: 'Permite acessar o centro de pesquisa da empresa.'
    },

    espingarda: {
      name: 'Espingarda',
      type: 'weapon',
      attack: 6,
      desc: 'Arma poderosa para combates próximos.'
    },

    municao: {
      name: 'Munição',
      type: 'component',
      desc: 'Cartuchos para armas de fogo.'
    },

    arquivos_genova: {
      name: 'Arquivos da Genova',
      type: 'quest',
      desc: 'Provas de que a empresa criou o vírus.'
    },

    amostra_paciente_zero: {
      name: 'Amostra do Paciente Zero',
      type: 'relic',
      desc: 'Material biológico essencial para desenvolver a cura.'
    },

    chave_evacuação: {
      name: 'Chave de Evacuação',
      type: 'key',
      desc: 'Abre os túneis de saída da Genova.'
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