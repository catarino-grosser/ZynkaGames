// Campanha para Zynka RPG 3.0
// Arquivo: aventuras/a-maquina-do-tempo.js

const aventura = {
  id: 'a_maquina_do_tempo',
  title: 'A Máquina do Tempo',
  icon: '⏳',
  genre: 'Aventura Histórica',
  difficulty: 'Média',
  estimatedTime: '50 a 70 min',
  desc: 'Um experimento dá errado e lança você entre diferentes épocas. Cada decisão altera o futuro e pode transformar o presente para sempre.',
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
      title: '1. O Experimento Cronos',
      image: '',
      scene: 'Um laboratório subterrâneo abriga uma máquina circular cercada por bobinas, cabos e dezenas de relógios sincronizados.',
      text: 'O Projeto Cronos está prestes a realizar a primeira viagem temporal controlada da humanidade. A máquina foi criada pela física Dra. Laura Mendes e financiada pela poderosa Corporação Vértice.\n\nVocê participa do teste final quando uma transmissão desconhecida invade os sistemas. Os relógios começam a girar em sentidos diferentes, objetos desaparecem e imagens de cidades antigas surgem no centro do portal.\n\nUma sobrecarga rompe o núcleo. Antes que Laura consiga desligá-lo, uma explosão temporal lança você para dentro da passagem.',
      dialogue: {
        name: 'Dra. Laura Mendes',
        portrait: '',
        lines: [
          'A energia não está vindo do nosso laboratório.',
          'Alguém está acessando o núcleo a partir de outra época.',
          'Pegue o estabilizador! Ele pode ser sua única forma de voltar.'
        ]
      },
      effect: {
        gold: 12,
        xp: 10,
        addItems: [
          { id: 'estabilizador_temporal', qty: 1 },
          { id: 'comunicador_cronos', qty: 1 },
          { id: 'kit_medico', qty: 1 }
        ],
        flags: {
          experimento_cronos: true
        }
      },
      choices: [
        {
          text: 'Proteger Laura da explosão',
          to: 'cap02',
          damage: 4,
          className: 'reward'
        },
        {
          text: 'Tentar desligar o núcleo',
          to: 'cap02'
        },
        {
          text: 'Saltar voluntariamente no portal',
          to: 'cap02',
          className: 'danger'
        }
      ]
    },

    cap02: {
      title: '2. Roma em Chamas',
      image: '',
      scene: 'Você desperta em uma rua de pedras enquanto prédios queimam e uma multidão foge em meio à fumaça.',
      text: 'O comunicador identifica Roma, ano 64. O grande incêndio avança pela cidade, mas algo está errado: alguns soldados carregam armas com peças metálicas que não pertencem àquela época.\n\nO estabilizador detecta um fragmento do núcleo temporal nas proximidades. Sem ele, será impossível controlar a próxima viagem.\n\nUma jovem chamada Lívia tenta retirar moradores de um edifício em chamas. Ao mesmo tempo, um homem encapuzado foge carregando o fragmento.',
      dialogue: {
        name: 'Lívia',
        portrait: '',
        lines: [
          'Ainda há pessoas lá dentro!',
          'Os guardas estão perseguindo quem tenta ajudar.',
          'Por favor, não deixe essas famílias morrerem.'
        ]
      },
      choices: [
        {
          text: 'Salvar os moradores com Lívia',
          to: 'cap03',
          damage: 3,
          className: 'reward'
        },
        {
          text: 'Perseguir imediatamente o encapuzado',
          to: 'cap03'
        },
        {
          text: 'Roubar um manto e avançar disfarçado',
          to: 'cap03',
          className: 'danger'
        }
      ]
    },

    cap03: {
      title: '3. O Primeiro Paradoxo',
      image: '',
      scene: 'Catacumbas sob um templo escondem caixas modernas, mapas históricos e soldados vestidos como legionários.',
      text: 'A perseguição leva até uma base secreta construída sob Roma. Ali você encontra Silas Voss, diretor da Corporação Vértice e responsável pela sabotagem do Projeto Cronos.\n\nSilas explica que foi lançado ao passado durante um teste secreto realizado meses antes. Desde então, vem espalhando tecnologia futura em pontos estratégicos da história para criar uma civilização controlada por sua corporação.\n\nAntes de escapar, ele ordena que seus guardas eliminem você.',
      dialogue: {
        name: 'Silas Voss',
        portrait: '',
        lines: [
          'O presente que você conhece é apenas uma possibilidade.',
          'Eu construirei uma história sem acaso, sem fraqueza e sem oposição.',
          'Quando você voltar, talvez nem se lembre do mundo que perdeu.'
        ]
      },
      enemy: {
        id: 'guardas_temporais_roma',
        name: 'Guardas Temporais de Roma',
        hp: 32,
        atk: 7,
        def: 3,
        xp: 38,
        rewardGold: 18,
        rewardItems: [
          { id: 'fragmento_roma', qty: 1 },
          { id: 'gladio_romano', qty: 1 }
        ],
        image: '',
        setFlag: 'fragmento_roma_obtido'
      },
      winTo: 'cap04',
      loseTo: 'derrota'
    },

    cap04: {
      title: '4. O Castelo que Não Deveria Cair',
      image: '',
      scene: 'O portal se abre sobre um campo medieval. Catapultas cercam um castelo enquanto estrondos ecoam pelas muralhas.',
      text: 'Você chega ao ano de 1191, durante o cerco ao Castelo de Valmont. Segundo os registros do comunicador, a fortaleza deveria resistir por mais três dias, tempo suficiente para receber reforços e formar uma importante aliança.\n\nEntretanto, o exército invasor possui explosivos modernos fornecidos pelos agentes de Silas. Se o castelo cair, o território será conquistado e milhões de vidas futuras seguirão outro caminho.',
      dialogue: {
        name: 'Sir Aldren',
        portrait: '',
        lines: [
          'Suas roupas e armas não pertencem a nenhum reino que conheço.',
          'Nossos inimigos também receberam presentes de homens estranhos.',
          'Ajude-nos a sobreviver até o amanhecer.'
        ]
      },
      effect: {
        xp: 14,
        addItems: [
          { id: 'brasao_valmont', qty: 1 }
        ],
        flags: {
          conheceu_aldren: true
        }
      },
      choices: [
        {
          text: 'Destruir os explosivos inimigos',
          to: 'cap05',
          damage: 5,
          className: 'reward'
        },
        {
          text: 'Ensinar os defensores a usar armas modernas',
          to: 'cap05',
          className: 'danger'
        },
        {
          text: 'Procurar o fragmento e evitar interferir',
          to: 'cap05'
        }
      ]
    },

    cap05: {
      title: '5. A Alquimista e a Ampulheta',
      image: '',
      scene: 'Frascos, mapas celestes e mecanismos de bronze preenchem uma oficina escondida na torre do castelo.',
      text: 'Sir Aldren apresenta Miriam, uma alquimista que encontrou o segundo fragmento temporal dentro de uma cratera. A energia do objeto permitiu que ela construísse uma ampulheta capaz de prever alguns segundos do futuro.\n\nO fragmento está preso em um mecanismo com três engrenagens: passado, presente e futuro. Uma remoção incorreta pode apagar tudo ao redor.',
      dialogue: {
        name: 'Miriam',
        portrait: '',
        lines: [
          'O fragmento recorda acontecimentos que ainda não ocorreram.',
          'Ele não abre apenas caminhos. Ele escolhe possibilidades.',
          'Para retirá-lo, precisamos colocar o tempo na ordem correta.'
        ]
      },
      puzzle: {
        question: 'Qual elemento deve permanecer entre o passado e o futuro?',
        answer: 'presente',
        successText: 'As engrenagens se alinham. O fragmento se desprende sem destruir a oficina.',
        reward: {
          xp: 22,
          addItems: [
            { id: 'fragmento_medieval', qty: 1 },
            { id: 'ampulheta_miriam', qty: 1 }
          ],
          flags: {
            fragmento_medieval_obtido: true,
            valmont_preservado: true
          }
        },
        setFlag: 'enigma_ampulheta_resolvido'
      },
      choices: [
        {
          text: 'Abrir uma passagem usando o fragmento estabilizado',
          to: 'cap06',
          requiresFlag: 'enigma_ampulheta_resolvido',
          className: 'reward'
        },
        {
          text: 'Forçar o mecanismo e atravessar a explosão',
          to: 'cap06',
          damage: 9,
          className: 'danger'
        }
      ]
    },

    cap06: {
      title: '6. O Ateliê do Amanhã',
      image: '',
      scene: 'Você surge em um ateliê de Florença cercado por pinturas, projetos de máquinas e modelos de asas mecânicas.',
      text: 'O comunicador marca o ano de 1504. No entanto, locomotivas em miniatura, motores elétricos e armas automáticas aparecem entre os projetos renascentistas.\n\nA inventora Isabella Ferretti recebeu de Silas conhecimentos do futuro. Ela acredita que pode usar essas ideias para acabar com a fome, mas foi obrigada a desenhar armas para os aliados da Vértice.',
      dialogue: {
        name: 'Isabella Ferretti',
        portrait: '',
        lines: [
          'Com esta energia, poderíamos iluminar cidades inteiras.',
          'Mas Silas deseja canhões capazes de destruir muralhas em segundos.',
          'Não sei se devo destruir o conhecimento ou salvá-lo.'
        ]
      },
      sideQuest: {
        id: 'manuscrito_amanha',
        title: 'O Manuscrito do Amanhã',
        desc: 'Recupere os projetos roubados por Silas e decida o destino do conhecimento futuro.'
      },
      effect: {
        xp: 16,
        addItems: [
          { id: 'mapa_florenca', qty: 1 }
        ],
        flags: {
          conheceu_isabella: true
        }
      },
      choices: [
        {
          text: 'Preservar apenas os projetos médicos e energéticos',
          to: 'cap07',
          className: 'reward'
        },
        {
          text: 'Destruir todos os projetos futuros',
          to: 'cap07'
        },
        {
          text: 'Manter todos os projetos para usar depois',
          to: 'cap07',
          className: 'danger'
        }
      ]
    },

    cap07: {
      title: '7. Os Autômatos de Florença',
      image: '',
      scene: 'Máquinas de madeira e metal marcham pela praça enquanto sinos de alerta ecoam pela cidade.',
      text: 'Silas ativa autômatos construídos com peças renascentistas e componentes do futuro. As máquinas cercam o ateliê para recuperar o manuscrito de Isabella.\n\nSe os projetos forem capturados, a Vértice poderá iniciar uma revolução militar séculos antes do momento correto.',
      enemy: {
        id: 'automatos_florenca',
        name: 'Autômatos de Florença',
        hp: 42,
        atk: 9,
        def: 4,
        xp: 52,
        rewardGold: 25,
        rewardItems: [
          { id: 'fragmento_renascimento', qty: 1 },
          { id: 'manuscrito_isabella', qty: 1 },
          { id: 'engrenagem_automato', qty: 1 }
        ],
        image: '',
        setFlag: 'fragmento_renascimento_obtido'
      },
      winTo: 'cap08',
      loseTo: 'derrota'
    },

    cap08: {
      title: '8. O Navio Apagado da História',
      image: '',
      scene: 'Uma tempestade envolve um navio de madeira. Relâmpagos verdes iluminam ondas gigantescas.',
      text: 'Você chega ao Oceano Atlântico em 1718, a bordo do Estrela do Norte. Nos registros originais, esse navio desapareceu sem deixar vestígios.\n\nA capitã Amara Vale revela que uma criatura metálica persegue a embarcação. Entre os passageiros está um jovem médico cujas pesquisas, se chegarem à Europa, salvarão milhares de pessoas durante uma futura epidemia.\n\nSilas pretende afundar o navio e apagar essa descoberta.',
      dialogue: {
        name: 'Capitã Amara Vale',
        portrait: '',
        lines: [
          'O mar está obedecendo àquela criatura.',
          'Cada onda nos empurra para o centro da tempestade.',
          'Salve meus passageiros e eu levarei você até o monstro.'
        ]
      },
      treasure: {
        id: 'bau_estrela_norte',
        text: '💰 Abrir o baú da cabine do navegador',
        reward: {
          gold: 24,
          addItems: [
            { id: 'pistola_pederneira', qty: 1 },
            { id: 'bussola_temporal', qty: 1 }
          ]
        }
      },
      choices: [
        {
          text: 'Defender os passageiros',
          to: 'cap09',
          damage: 4,
          className: 'reward'
        },
        {
          text: 'Atacar diretamente a criatura',
          to: 'cap09'
        },
        {
          text: 'Abandonar o navio e proteger apenas o fragmento',
          to: 'cap09',
          className: 'danger'
        }
      ]
    },

    cap09: {
      title: '9. O Leviatã Mecânico',
      image: '',
      scene: 'Uma serpente de metal emerge das águas, com olhos vermelhos e placas cobertas por algas.',
      text: 'O monstro é uma máquina temporal construída para controlar tempestades e eliminar embarcações escolhidas pela Vértice.\n\nO quarto fragmento está instalado no peito da criatura. A Capitã Amara posiciona o Estrela do Norte para o combate enquanto você procura um ponto fraco entre as placas metálicas.',
      enemy: {
        id: 'leviata_mecanico',
        name: 'Leviatã Mecânico',
        hp: 52,
        atk: 10,
        def: 5,
        xp: 66,
        rewardGold: 32,
        rewardItems: [
          { id: 'fragmento_oceano', qty: 1 },
          { id: 'nucleo_leviata', qty: 1 }
        ],
        image: '',
        setFlag: 'fragmento_oceano_obtido'
      },
      winTo: 'cap10',
      loseTo: 'derrota'
    },

    cap10: {
      title: '10. A Revolução Antecipada',
      image: '',
      scene: 'Fábricas cobrem o horizonte. Veículos elétricos dividem as ruas com carruagens e soldados mecanizados.',
      text: 'Você chega a Londres em 1851, mas encontra uma cidade tecnologicamente avançada e socialmente destruída. As intervenções de Silas aceleraram a Revolução Industrial.\n\nA Corporação Vértice controla fábricas, jornais e forças de segurança. Trabalhadores vivem sob vigilância enquanto máquinas automáticas substituem milhares de pessoas.\n\nA jornalista Eleanor Reed reuniu provas de que a tecnologia da Vértice veio de outras épocas.',
      dialogue: {
        name: 'Eleanor Reed',
        portrait: '',
        lines: [
          'A Vértice afirma que suas máquinas são presentes do destino.',
          'Mas encontrei projetos assinados por pessoas que ainda nem nasceram.',
          'Ajude-me a publicar a verdade.'
        ]
      },
      effect: {
        xp: 20,
        addItems: [
          { id: 'jornal_vertice', qty: 1 }
        ],
        flags: {
          presente_em_risco: true,
          conheceu_eleanor: true
        }
      },
      choices: [
        {
          text: 'Publicar as provas contra a Vértice',
          to: 'cap11',
          className: 'reward'
        },
        {
          text: 'Sabotar as fábricas temporais',
          to: 'cap11',
          damage: 5
        },
        {
          text: 'Tomar a tecnologia para si',
          to: 'cap11',
          className: 'danger'
        }
      ]
    },

    cap11: {
      title: '11. A Torre das Datas Perdidas',
      image: '',
      scene: 'Uma torre de aço e vidro se ergue acima da cidade vitoriana, protegida por guardas mecanizados.',
      text: 'No topo da torre está o quinto fragmento e uma versão primitiva da Máquina do Tempo. Silas usa a instalação para enviar instruções aos seus agentes espalhados pela história.\n\nA entrada do núcleo é protegida por um sistema que exige compreender como os paradoxos se formam.',
      puzzle: {
        question: 'Em uma sequência temporal, o que deve existir antes de uma consequência?',
        answer: 'causa',
        successText: 'O sistema reconhece a resposta e abre a câmara do núcleo.',
        reward: {
          xp: 24,
          addItems: [
            { id: 'fragmento_industrial', qty: 1 },
            { id: 'chave_vertice', qty: 1 }
          ],
          flags: {
            fragmento_industrial_obtido: true
          }
        },
        setFlag: 'torre_temporal_aberta'
      },
      choices: [
        {
          text: 'Usar os cinco fragmentos para retornar ao presente',
          to: 'cap12',
          requiresFlag: 'torre_temporal_aberta',
          className: 'reward'
        },
        {
          text: 'Sobrecarregar a torre e atravessar a ruptura',
          to: 'cap12',
          damage: 9,
          className: 'danger'
        }
      ]
    },

    cap12: {
      title: '12. O Presente que Nunca Existiu',
      image: '',
      scene: 'Você retorna ao local do laboratório, mas encontra uma cidade dominada por torres negras e drones de vigilância.',
      text: 'O ano é o mesmo, mas o mundo foi transformado. A Corporação Vértice controla governos, escolas, redes de comunicação e arquivos históricos.\n\nMonumentos mostram Silas como fundador de uma dinastia iniciada na Roma antiga. O Projeto Cronos tornou-se uma prisão científica onde Laura é obrigada a aperfeiçoar as viagens temporais.\n\nAlgumas mudanças positivas também sobreviveram: doenças foram erradicadas e fontes de energia limpa surgiram antes do esperado. Corrigir a história poderá apagar esses avanços.',
      dialogue: {
        name: 'Dra. Laura Mendes',
        portrait: '',
        lines: [
          'Você voltou, mas esta não é nossa realidade.',
          'Cada alteração criou benefícios e tragédias.',
          'Para restaurar o presente, precisamos alcançar o Ponto de Origem.'
        ]
      },
      effect: {
        xp: 24,
        addItems: [
          { id: 'registro_linha_original', qty: 1 }
        ],
        flags: {
          presente_alterado: true
        }
      },
      choices: [
        {
          text: 'Libertar Laura e reconstruir a máquina',
          to: 'cap13',
          damage: 4,
          className: 'reward'
        },
        {
          text: 'Invadir os arquivos centrais da Vértice',
          to: 'cap13'
        },
        {
          text: 'Aceitar temporariamente a autoridade da Vértice',
          to: 'cap13',
          className: 'danger'
        }
      ]
    },

    cap13: {
      title: '13. O Ponto de Origem',
      image: '',
      scene: 'Castelos, fábricas, navios e cidades modernas aparecem unidos em um espaço fora do tempo.',
      text: 'Laura reúne os fragmentos e abre uma passagem para o Ponto de Origem, uma dimensão criada no instante da explosão do Projeto Cronos.\n\nAli, todas as épocas alteradas coexistem. Soldados romanos atravessam fábricas vitorianas, navios flutuam sobre castelos e versões alternativas de pessoas aparecem como lembranças vivas.\n\nNo centro está o Núcleo Primordial, capaz de preservar, combinar ou apagar linhas temporais inteiras.',
      dialogue: {
        name: 'Dra. Laura Mendes',
        portrait: '',
        lines: [
          'Todas as possibilidades estão se chocando aqui.',
          'Silas pretende escolher uma única história e destruir as outras.',
          'Se o núcleo entrar em colapso, nenhum presente sobreviverá.'
        ]
      },
      randomEvent: {
        chance: 0.5,
        text: 'Uma versão alternativa de você entrega uma proteção construída em uma linha temporal mais avançada.',
        reward: {
          xp: 14,
          addItems: [
            { id: 'armadura_cronal', qty: 1 }
          ]
        }
      },
      choices: [
        {
          text: 'Seguir o sinal da linha temporal original',
          to: 'cap14',
          requiresItem: 'registro_linha_original',
          className: 'reward'
        },
        {
          text: 'Seguir a energia deixada por Silas',
          to: 'cap14'
        }
      ]
    },

    cap14: {
      title: '14. Silas, Senhor do Tempo',
      image: '',
      scene: 'Silas flutua diante do Núcleo Primordial, cercado por versões alternativas de si mesmo.',
      text: 'Silas absorveu a energia das alterações históricas. Agora ele existe simultaneamente como imperador romano, senhor medieval, inventor renascentista e governante moderno.\n\nEle oferece uma aliança. Afirma que, juntos, vocês poderão impedir guerras, curar doenças e eliminar os erros da humanidade. Laura alerta que esse poder transformará qualquer salvador em tirano.',
      dialogue: {
        name: 'Silas Voss',
        portrait: '',
        lines: [
          'Quantas tragédias você aceitaria apenas para preservar sua memória do presente?',
          'A história não é sagrada. Ela é defeituosa.',
          'Ajude-me a construir um mundo sem acaso.'
        ]
      },
      enemy: {
        id: 'silas_senhor_tempo',
        name: 'Silas, Senhor do Tempo',
        hp: 72,
        atk: 13,
        def: 7,
        xp: 100,
        rewardGold: 60,
        rewardItems: [
          { id: 'nucleo_primordial', qty: 1 },
          { id: 'relogio_silas', qty: 1 }
        ],
        image: '',
        setFlag: 'silas_derrotado'
      },
      winTo: 'cap15',
      loseTo: 'derrota'
    },

    cap15: {
      title: '15. A Última Escolha',
      image: '',
      scene: 'Milhares de futuros aparecem ao redor do Núcleo Primordial como espelhos suspensos no vazio.',
      text: 'Com Silas derrotado, o controle da história passa para suas mãos. Você vê a linha original, o império da Vértice e incontáveis realidades criadas pelas suas próprias decisões.\n\nRestaurar tudo apagará pessoas e avanços que nasceram nas novas linhas. Preservar as mudanças manterá consequências imprevisíveis. Destruir o núcleo encerrará as viagens, mas talvez aprisione você fora do tempo.\n\nNão existe escolha sem perdas.',
      choices: [
        {
          text: 'Restaurar completamente a linha temporal original',
          to: 'final_original',
          requiresItem: 'registro_linha_original',
          className: 'reward'
        },
        {
          text: 'Criar uma nova história com os melhores resultados',
          to: 'final_nova_linha',
          requiresItem: 'nucleo_primordial'
        },
        {
          text: 'Destruir a Máquina do Tempo para sempre',
          to: 'final_sem_maquina',
          requiresFlag: 'silas_derrotado',
          className: 'reward'
        },
        {
          text: 'Assumir o controle de todas as épocas',
          to: 'final_guardiao',
          requiresItem: 'relogio_silas',
          className: 'danger'
        }
      ]
    },

    final_original: {
      title: 'Final: O Presente Restaurado',
      text: 'Você usa o Registro da Linha Original para desfazer as intervenções de Silas. Roma, Valmont, Florença, o Estrela do Norte e Londres retornam aos seus caminhos históricos.\n\nVocê desperta no laboratório segundos antes da explosão. Desta vez, consegue desligar a máquina. Ninguém além de você se lembra das viagens, das pessoas salvas ou dos mundos apagados.',
      end: true
    },

    final_nova_linha: {
      title: 'Final: Uma Nova História',
      text: 'Você preserva os conhecimentos médicos, a energia limpa e as pessoas salvas, mas remove as armas e o domínio da Vértice.\n\nO presente resultante é mais avançado e pacífico, porém diferente. Alguns amigos nunca nasceram e cidades inteiras possuem outros nomes. Você decide viver nessa realidade e carregar a responsabilidade por tudo o que mudou.',
      end: true
    },

    final_sem_maquina: {
      title: 'Final: O Fim das Viagens',
      text: 'Você destrói o Núcleo Primordial e todos os fragmentos. As linhas temporais se separam e a história se estabiliza.\n\nLaura encerra o Projeto Cronos e apaga os projetos da máquina. O passado volta a pertencer à memória, e o futuro volta a ser desconhecido.',
      end: true
    },

    final_guardiao: {
      title: 'Final Sombrio: O Guardião das Eras',
      text: 'Você coloca o relógio de Silas e se conecta ao Núcleo Primordial. Passado, presente e futuro tornam-se visíveis ao mesmo tempo.\n\nNo início, você impede guerras e tragédias. Depois, cada mudança exige outra correção. Séculos passam enquanto você perde suas lembranças humanas e se transforma em uma presença invisível que controla a história.',
      end: true
    },

    derrota: {
      title: 'Derrota',
      text: 'Silas assume o controle do Núcleo Primordial e remove você da história. Seu nascimento, suas escolhas e suas viagens deixam de existir.\n\nNo presente governado pela Corporação Vértice, ninguém se lembra de que outra realidade já foi possível.',
      end: true
    }
  },

  items: {
    estabilizador_temporal: {
      name: 'Estabilizador Temporal',
      type: 'tool',
      desc: 'Detecta e reduz distorções temporais.'
    },

    comunicador_cronos: {
      name: 'Comunicador Cronos',
      type: 'tool',
      desc: 'Identifica datas, alterações históricas e sinais do núcleo.'
    },

    kit_medico: {
      name: 'Kit Médico',
      type: 'consumable',
      heal: 15,
      desc: 'Restaura 15 pontos de vida.'
    },

    fragmento_roma: {
      name: 'Fragmento de Roma',
      type: 'relic',
      desc: 'Primeira parte do núcleo temporal.'
    },

    gladio_romano: {
      name: 'Gládio Romano',
      type: 'weapon',
      attack: 3,
      desc: 'Espada curta utilizada pelos legionários.'
    },

    brasao_valmont: {
      name: 'Brasão de Valmont',
      type: 'quest',
      desc: 'Símbolo de confiança dos defensores do castelo.'
    },

    fragmento_medieval: {
      name: 'Fragmento Medieval',
      type: 'relic',
      desc: 'Fragmento estabilizado pela alquimista Miriam.'
    },

    ampulheta_miriam: {
      name: 'Ampulheta de Miriam',
      type: 'relic',
      desc: 'Permite prever brevemente movimentos e perigos.'
    },

    mapa_florenca: {
      name: 'Mapa de Florença',
      type: 'quest',
      desc: 'Mostra oficinas e passagens secretas da cidade.'
    },

    fragmento_renascimento: {
      name: 'Fragmento do Renascimento',
      type: 'relic',
      desc: 'Fragmento utilizado para alimentar os autômatos.'
    },

    manuscrito_isabella: {
      name: 'Manuscrito de Isabella',
      type: 'quest',
      desc: 'Projetos científicos capazes de alterar o desenvolvimento da humanidade.'
    },

    engrenagem_automato: {
      name: 'Engrenagem de Autômato',
      type: 'component',
      desc: 'Peça criada com tecnologia de duas épocas.'
    },

    pistola_pederneira: {
      name: 'Pistola de Pederneira',
      type: 'weapon',
      attack: 4,
      desc: 'Arma de fogo utilizada pela tripulação do Estrela do Norte.'
    },

    bussola_temporal: {
      name: 'Bússola Temporal',
      type: 'tool',
      desc: 'Aponta para distorções e fragmentos do núcleo.'
    },

    fragmento_oceano: {
      name: 'Fragmento do Oceano',
      type: 'relic',
      desc: 'Fragmento retirado do Leviatã Mecânico.'
    },

    nucleo_leviata: {
      name: 'Núcleo do Leviatã',
      type: 'component',
      desc: 'Fonte de energia capaz de manipular tempestades.'
    },

    jornal_vertice: {
      name: 'Jornal da Vértice',
      type: 'quest',
      desc: 'Documento de uma realidade dominada pela corporação.'
    },

    fragmento_industrial: {
      name: 'Fragmento Industrial',
      type: 'relic',
      desc: 'Quinto fragmento necessário para controlar a viagem de retorno.'
    },

    chave_vertice: {
      name: 'Chave da Vértice',
      type: 'key',
      desc: 'Permite acessar sistemas e arquivos secretos da corporação.'
    },

    registro_linha_original: {
      name: 'Registro da Linha Original',
      type: 'quest',
      desc: 'Arquivo contendo os acontecimentos do presente original.'
    },

    armadura_cronal: {
      name: 'Armadura Cronal',
      type: 'armor',
      defense: 5,
      desc: 'Protege contra ataques e distorções temporais.'
    },

    nucleo_primordial: {
      name: 'Núcleo Primordial',
      type: 'relic',
      desc: 'Fonte capaz de preservar, combinar ou apagar linhas temporais.'
    },

    relogio_silas: {
      name: 'Relógio de Silas',
      type: 'relic',
      desc: 'Artefato que permite observar diferentes futuros.'
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