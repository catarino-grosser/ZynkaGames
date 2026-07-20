// Campanha para Zynka RPG 3.0
// Arquivo pronto para colocar dentro da pasta aventuras.

const aventura = {
  id: 'a_piramide_perdida',
  title: 'A Pirâmide Perdida',
  icon: '🏺',
  genre: 'Exploração',
  difficulty: 'Média',
  estimatedTime: '40 a 55 min',
  desc: 'No deserto, uma pirâmide recém-descoberta esconde armadilhas, múmias e um artefato capaz de mudar a história da humanidade.',
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
      title: '1. A Descoberta no Deserto',
      image: '',
      scene: 'Uma tempestade de areia revela o topo de uma pirâmide enterrada há milhares de anos.',
      text: 'Durante uma expedição arqueológica no Deserto de Kharim, uma tempestade violenta muda completamente a paisagem. Quando a poeira finalmente baixa, algo impossível aparece no horizonte: o topo de uma pirâmide que não existe em nenhum registro histórico.\n\nA estrutura parece mais antiga do que qualquer monumento conhecido. Em sua entrada, símbolos desconhecidos brilham sob a luz do sol. A descoberta pode reescrever toda a história da humanidade.',
      dialogue: {
        name: 'Dra. Helena Vasques',
        portrait: '',
        lines: [
          'Esta pirâmide não pertence a nenhuma dinastia registrada.',
          'Os símbolos parecem anteriores à própria escrita.',
          'Se entrarmos, talvez encontremos respostas que ninguém está preparado para ouvir.'
        ]
      },
      effect: {
        gold: 10,
        addItems: [
          { id: 'lanterna_expedicao', qty: 1 },
          { id: 'kit_arqueologia', qty: 1 },
          { id: 'cantina_agua', qty: 1 }
        ],
        flags: {
          encontrou_piramide: true
        }
      },
      choices: [
        { text: 'Entrar com a equipe pela passagem principal', to: 'cap02', className: 'reward' },
        { text: 'Examinar os símbolos antes de entrar', to: 'cap03' },
        { text: 'Forçar a porta de pedra', to: 'cap02', damage: 4, className: 'danger' }
      ]
    },

    cap02: {
      title: '2. O Corredor dos Escaravelhos',
      image: '',
      scene: 'Um corredor estreito desce para a escuridão. Escaravelhos dourados cobrem as paredes.',
      text: 'A entrada principal leva a um corredor inclinado. As paredes são decoradas com milhares de escaravelhos de ouro, todos voltados para o interior da pirâmide.\n\nQuando a equipe atravessa a metade do caminho, o chão vibra. Alguns dos escaravelhos se soltam das paredes e começam a se mover. Em segundos, uma nuvem de insetos cobre o corredor.',
      randomEvent: {
        chance: 0.5,
        text: 'Você encontra um nicho lateral e evita a maior parte dos escaravelhos.',
        reward: {
          xp: 8,
          addItems: [
            { id: 'escaravelho_ouro', qty: 1 }
          ]
        }
      },
      choices: [
        { text: 'Usar uma tocha para afastar os escaravelhos', to: 'cap04' },
        { text: 'Correr até a próxima câmara', to: 'cap04', damage: 5, className: 'danger' },
        { text: 'Procurar uma passagem lateral', to: 'cap03', className: 'reward' }
      ]
    },

    cap03: {
      title: '3. A Linguagem Esquecida',
      image: '',
      scene: 'Uma pequena sala está coberta por símbolos que parecem mudar quando observados por muito tempo.',
      text: 'Os símbolos da entrada não pertencem a nenhuma escrita conhecida. Helena percebe que eles representam ideias, não sons: céu, nascimento, memória, estrela e retorno.\n\nNo centro da parede há uma frase incompleta. O último símbolo foi arrancado, mas marcas indicam que ele pode ser reconstruído.',
      puzzle: {
        question: 'A frase diz: “Do céu viemos, pela memória vivemos e às estrelas iremos...” Qual palavra completa a ideia?',
        answer: 'retorno',
        successText: 'Os símbolos brilham e uma passagem oculta se abre.',
        reward: {
          xp: 18,
          addItems: [
            { id: 'placa_estelar', qty: 1 }
          ]
        },
        setFlag: 'passagem_secreta_aberta'
      },
      choices: [
        { text: 'Entrar pela passagem secreta', to: 'cap05', requiresFlag: 'passagem_secreta_aberta', className: 'reward' },
        { text: 'Voltar ao corredor principal', to: 'cap04' }
      ]
    },

    cap04: {
      title: '4. A Câmara das Lâminas',
      image: '',
      scene: 'Discos metálicos e lâminas ocultas cercam uma sala coberta de areia.',
      text: 'A equipe entra em uma câmara onde pequenas marcas no chão formam um padrão geométrico. Helena percebe tarde demais que cada placa pode ativar uma armadilha diferente.\n\nUma lâmina surge da parede e corta uma mochila ao meio. Para atravessar, será necessário seguir exatamente o caminho indicado pelos desenhos no teto.',
      puzzle: {
        question: 'O teto mostra uma sequência: sol, lua, estrela, sol, lua... Qual símbolo vem depois?',
        answer: 'estrela',
        successText: 'Você atravessa a câmara sem ativar as lâminas.',
        reward: {
          xp: 16,
          addItems: [
            { id: 'chave_bronze', qty: 1 }
          ]
        },
        setFlag: 'armadilha_laminas_superada'
      },
      choices: [
        { text: 'Seguir o padrão correto', to: 'cap05', requiresFlag: 'armadilha_laminas_superada', className: 'reward' },
        { text: 'Correr pela sala', to: 'cap05', damage: 7, className: 'danger' }
      ]
    },

    cap05: {
      title: '5. O Salão dos Reis Sem Nome',
      image: '',
      scene: 'Estátuas gigantes ocupam o salão. Nenhuma possui rosto ou nome gravado.',
      text: 'A próxima câmara é maior do que deveria caber dentro da pirâmide. Dezenas de estátuas representam reis e rainhas, mas seus rostos foram apagados e seus nomes removidos.\n\nNo centro, uma inscrição afirma que esses governantes foram esquecidos de propósito. Alguém tentou eliminar a existência de uma civilização inteira.',
      dialogue: {
        name: 'Professor Malik',
        portrait: '',
        lines: [
          'Isto não é apenas uma tumba.',
          'É um arquivo.',
          'Alguém construiu esta pirâmide para esconder a história do mundo.'
        ]
      },
      effect: {
        xp: 14,
        flags: {
          conheceu_malik: true,
          descobriu_reis_sem_nome: true
        },
        addItems: [
          { id: 'fragmento_cronica', qty: 1 }
        ]
      },
      choices: [
        { text: 'Examinar o trono central', to: 'cap06', className: 'reward' },
        { text: 'Seguir pela porta dos sacerdotes', to: 'cap07' }
      ]
    },

    cap06: {
      title: '6. A Tumba do Guardião',
      image: '',
      scene: 'Um sarcófago negro repousa diante de uma porta coberta por correntes.',
      text: 'Atrás do trono central, a equipe encontra uma tumba isolada. O sarcófago não tem nome, apenas um símbolo de olho cercado por estrelas.\n\nQuando Helena usa a Chave de Bronze, as correntes caem. O sarcófago se abre, revelando uma múmia coberta por placas metálicas e pedras azuis.',
      enemy: {
        id: 'guardiao_mumificado',
        name: 'Guardião Mumificado',
        hp: 34,
        atk: 8,
        def: 4,
        xp: 40,
        rewardGold: 18,
        rewardItems: [
          { id: 'amuleto_guardiao', qty: 1 },
          { id: 'bandagens_antigas', qty: 1 }
        ],
        image: ''
      },
      winTo: 'cap07',
      loseTo: 'derrota'
    },

    cap07: {
      title: '7. O Rio Sob a Pirâmide',
      image: '',
      scene: 'Um rio subterrâneo atravessa a pirâmide. Barcos funerários estão presos às margens.',
      text: 'A passagem dos sacerdotes leva a um rio subterrâneo. A água corre em direção ao coração da pirâmide, iluminada por minerais azuis.\n\nOs barcos funerários parecem intactos. Um deles carrega inscrições que descrevem uma viagem para “a casa além das estrelas”.',
      treasure: {
        id: 'barco_funerario',
        text: '💰 Examinar o barco funerário',
        reward: {
          gold: 20,
          addItems: [
            { id: 'moeda_antiga', qty: 2 },
            { id: 'mapa_subterraneo', qty: 1 }
          ]
        }
      },
      randomEvent: {
        chance: 0.45,
        text: 'Uma criatura se move sob a água, mas foge diante da luz da lanterna.',
        reward: {
          xp: 8
        }
      },
      choices: [
        { text: 'Usar o barco para seguir o rio', to: 'cap08', className: 'reward' },
        { text: 'Seguir pela margem estreita', to: 'cap08', damage: 4, className: 'danger' }
      ]
    },

    cap08: {
      title: '8. A Câmara das Estrelas',
      image: '',
      scene: 'O teto da câmara mostra um mapa do céu com estrelas que não são visíveis da Terra.',
      text: 'Ao fim do rio, você encontra uma sala circular. O teto representa constelações desconhecidas. Algumas estrelas estão ligadas por linhas que formam rotas.\n\nMalik percebe que não se trata de religião. É um mapa astronômico extremamente preciso, criado milhares de anos antes de qualquer telescópio.',
      puzzle: {
        question: 'No mapa, três símbolos se repetem: origem, viagem e destino. Qual deles deve ser ativado primeiro?',
        answer: 'origem',
        successText: 'O mapa celeste se ilumina e revela as coordenadas de uma estrela distante.',
        reward: {
          xp: 20,
          addItems: [
            { id: 'mapa_estelar', qty: 1 }
          ]
        },
        setFlag: 'mapa_estelar_ativado'
      },
      choices: [
        { text: 'Registrar as coordenadas', to: 'cap09', requiresFlag: 'mapa_estelar_ativado', className: 'reward' },
        { text: 'Ignorar o mapa e seguir adiante', to: 'cap09' }
      ]
    },

    cap09: {
      title: '9. A Maldição dos Sacerdotes',
      image: '',
      scene: 'Um salão cheio de sarcófagos começa a tremer. Tampas de pedra deslizam lentamente.',
      text: 'A ativação do mapa desperta os antigos sacerdotes da pirâmide. Um a um, sarcófagos se abrem. As múmias usam máscaras douradas e carregam lanças cobertas de símbolos.\n\nElas não atacam por fome ou raiva. Parecem cumprir uma ordem: impedir que o segredo da pirâmide deixe o deserto.',
      enemy: {
        id: 'sacerdotes_mumificados',
        name: 'Sacerdotes Mumificados',
        hp: 40,
        atk: 9,
        def: 4,
        xp: 48,
        rewardGold: 24,
        rewardItems: [
          { id: 'mascara_sacerdote', qty: 1 },
          { id: 'runa_protecao', qty: 1 }
        ],
        image: ''
      },
      winTo: 'cap10',
      loseTo: 'derrota'
    },

    cap10: {
      title: '10. O Acampamento dos Saqueadores',
      image: '',
      scene: 'Uma passagem leva para fora da pirâmide, onde mercenários montaram um acampamento secreto.',
      text: 'Ao sair por uma abertura lateral, você descobre que outra expedição já conhecia a pirâmide. Um grupo de mercenários liderado por Victor Kane está escavando uma entrada secundária.\n\nKane oferece dinheiro e proteção em troca de todos os mapas e artefatos encontrados. Quando você recusa, ele deixa claro que não pretende permitir que sua equipe saia viva.',
      dialogue: {
        name: 'Victor Kane',
        portrait: '',
        lines: [
          'História não pertence a museus.',
          'Pertence a quem paga mais.',
          'Entreguem os artefatos e talvez saiam deste deserto.'
        ]
      },
      enemy: {
        id: 'mercenarios_kane',
        name: 'Mercenários de Kane',
        hp: 42,
        atk: 9,
        def: 4,
        xp: 50,
        rewardGold: 32,
        rewardItems: [
          { id: 'explosivos', qty: 1 },
          { id: 'radio_militar', qty: 1 }
        ],
        image: ''
      },
      winTo: 'cap11',
      loseTo: 'derrota'
    },

    cap11: {
      title: '11. A Escadaria Infinita',
      image: '',
      scene: 'Uma escadaria desce em espiral por centenas de metros, muito além da base da pirâmide.',
      text: 'Usando o Mapa Subterrâneo, você encontra a passagem para os níveis mais profundos. A escadaria parece não terminar. As paredes mostram cenas de cidades avançadas, máquinas voadoras e seres vindos do céu.\n\nHelena conclui que a pirâmide pode ser muito mais antiga que qualquer civilização humana conhecida.',
      randomEvent: {
        chance: 0.5,
        text: 'Parte da escadaria desaba, mas a Runa de Proteção impede uma queda fatal.',
        reward: {
          xp: 10
        }
      },
      choices: [
        { text: 'Continuar até o fundo', to: 'cap12', className: 'reward' },
        { text: 'Usar explosivos para abrir um atalho', to: 'cap12', requiresItem: 'explosivos', damage: 5, className: 'danger' }
      ]
    },

    cap12: {
      title: '12. A Cidade Enterrada',
      image: '',
      scene: 'Sob a pirâmide existe uma cidade inteira, preservada dentro de uma caverna colossal.',
      text: 'A escadaria termina diante de algo impossível: uma cidade subterrânea feita de pedra branca e metal. Torres finas cercam uma estrutura central que pulsa com energia.\n\nAs inscrições revelam que os construtores da pirâmide não eram deuses. Eram sobreviventes de uma civilização muito mais antiga, talvez vinda de outro mundo.',
      dialogue: {
        name: 'Dra. Helena',
        portrait: '',
        lines: [
          'Isto muda tudo.',
          'A história humana não começou onde imaginávamos.',
          'Talvez nem tenha começado neste planeta.'
        ]
      },
      effect: {
        xp: 24,
        flags: {
          descobriu_cidade_enterrada: true
        },
        addItems: [
          { id: 'disco_cristal', qty: 1 }
        ]
      },
      choices: [
        { text: 'Entrar no templo central', to: 'cap13', className: 'reward' },
        { text: 'Explorar as torres laterais', to: 'cap13' }
      ]
    },

    cap13: {
      title: '13. O Arquivo da Humanidade',
      image: '',
      scene: 'Milhares de placas de cristal flutuam dentro de uma sala iluminada por energia azul.',
      text: 'No templo central, você encontra um arquivo gigantesco. Cada cristal contém imagens, idiomas e memórias de povos antigos.\n\nO Disco de Cristal ativa uma mensagem. Uma figura humana aparece e explica que a pirâmide foi construída para guardar conhecimento até que a humanidade estivesse pronta para recebê-lo.',
      dialogue: {
        name: 'Arquivo Ancestral',
        portrait: '',
        lines: [
          'Vocês esqueceram de onde vieram.',
          'O artefato pode restaurar o conhecimento perdido.',
          'Mas também pode entregar poder demais a um mundo despreparado.'
        ]
      },
      effect: {
        xp: 22,
        flags: {
          acessou_arquivo: true
        },
        addItems: [
          { id: 'chave_ancestral', qty: 1 }
        ]
      },
      choices: [
        { text: 'Aceitar o julgamento do arquivo', to: 'cap14', className: 'reward' },
        { text: 'Tentar tomar o artefato à força', to: 'cap14', damage: 6, className: 'danger' }
      ]
    },

    cap14: {
      title: '14. O Guardião Ancestral',
      image: '',
      scene: 'Uma máquina colossal desperta no centro da cidade enterrada.',
      text: 'Antes que você alcance o artefato, o Guardião Ancestral desperta. Ele foi criado para testar qualquer pessoa que tentasse levar o conhecimento para a superfície.\n\nSua voz ecoa por toda a caverna: “Poder sem sabedoria destruiu nossos criadores. Provem que não repetirão o mesmo erro.”',
      enemy: {
        id: 'guardiao_ancestral',
        name: 'Guardião Ancestral',
        hp: 62,
        atk: 11,
        def: 6,
        xp: 85,
        rewardGold: 42,
        rewardItems: [
          { id: 'artefato_origem', qty: 1 },
          { id: 'nucleo_guardiao', qty: 1 }
        ],
        image: '',
        setFlag: 'guardiao_ancestral_vencido'
      },
      winTo: 'cap15',
      loseTo: 'derrota'
    },

    cap15: {
      title: '15. O Segredo da Origem',
      image: '',
      scene: 'O Artefato da Origem flutua sobre um pedestal, cercado por imagens da história humana.',
      text: 'Com o Guardião derrotado, o Artefato da Origem está ao seu alcance. Ele contém conhecimentos sobre energia, medicina, astronomia e a verdadeira origem da humanidade.\n\nHelena quer entregar a descoberta a pesquisadores do mundo inteiro. Malik acredita que a informação deve ser protegida. Kane, ainda vivo, tenta convencer você a vender o artefato. A decisão final está em suas mãos.',
      choices: [
        { text: 'Compartilhar o conhecimento com toda a humanidade', to: 'final_conhecimento', requiresItem: 'artefato_origem', className: 'reward' },
        { text: 'Selar novamente a pirâmide', to: 'final_guardiao', requiresItem: 'chave_ancestral' },
        { text: 'Vender o artefato ao maior comprador', to: 'final_ganancia', requiresItem: 'artefato_origem', className: 'danger' },
        { text: 'Usar o artefato para revelar a origem humana', to: 'final_revelacao', requiresFlag: 'acessou_arquivo', className: 'reward' }
      ]
    },

    final_conhecimento: {
      title: 'Final: Uma Nova Era',
      text: 'Você compartilha os arquivos com universidades, cientistas e instituições de todo o mundo. Novas tecnologias transformam medicina, energia e exploração espacial. A humanidade entra em uma nova era, mas antigos conflitos também ganham armas mais poderosas.',
      end: true
    },

    final_guardiao: {
      title: 'Final: O Segredo Permanece',
      text: 'Você usa a Chave Ancestral para selar novamente a cidade enterrada. A pirâmide desaparece sob a areia após outra tempestade. Apenas sua equipe conhece a verdade, e todos juram guardar o segredo até que a humanidade esteja pronta.',
      end: true
    },

    final_ganancia: {
      title: 'Final: O Artefato Perdido',
      text: 'Você vende o Artefato da Origem. Durante alguns anos, sua riqueza parece compensar a escolha. Então surgem notícias de armas desconhecidas, desaparecimentos e laboratórios secretos. O artefato muda a história, mas não da maneira que você imaginava.',
      end: true
    },

    final_revelacao: {
      title: 'Final Secreto: Filhos das Estrelas',
      text: 'Você ativa o Artefato diante do mundo. A mensagem ancestral revela que parte da humanidade descende de viajantes de outro sistema estelar. A descoberta une alguns povos e divide outros, mas ninguém volta a olhar para o céu da mesma maneira.',
      end: true
    },

    derrota: {
      title: 'Derrota',
      text: 'As portas da pirâmide se fecham. A areia cobre novamente a entrada e apaga todas as marcas da expedição. Séculos depois, outra tempestade poderá revelar o monumento mais uma vez.',
      end: true
    }
  },

  items: {
    lanterna_expedicao: {
      name: 'Lanterna de Expedição',
      type: 'tool',
      desc: 'Ilumina corredores e revela detalhes ocultos.'
    },

    kit_arqueologia: {
      name: 'Kit de Arqueologia',
      type: 'tool',
      desc: 'Ferramentas usadas para examinar ruínas e artefatos.'
    },

    cantina_agua: {
      name: 'Cantina de Água',
      type: 'consumable',
      heal: 8,
      desc: 'Água potável que restaura 8 pontos de vida.'
    },

    escaravelho_ouro: {
      name: 'Escaravelho de Ouro',
      type: 'treasure',
      desc: 'Pequeno artefato encontrado no corredor de entrada.'
    },

    placa_estelar: {
      name: 'Placa Estelar',
      type: 'quest',
      desc: 'Placa com símbolos ligados à origem da pirâmide.'
    },

    chave_bronze: {
      name: 'Chave de Bronze',
      type: 'key',
      desc: 'Abre antigos mecanismos da pirâmide.'
    },

    fragmento_cronica: {
      name: 'Fragmento da Crônica',
      type: 'quest',
      desc: 'Parte de um registro sobre os reis sem nome.'
    },

    amuleto_guardiao: {
      name: 'Amuleto do Guardião',
      type: 'relic',
      desc: 'Protege contra algumas maldições antigas.'
    },

    bandagens_antigas: {
      name: 'Bandagens Antigas',
      type: 'component',
      desc: 'Material retirado do guardião mumificado.'
    },

    moeda_antiga: {
      name: 'Moeda Antiga',
      type: 'treasure',
      desc: 'Moeda de uma civilização desconhecida.'
    },

    mapa_subterraneo: {
      name: 'Mapa Subterrâneo',
      type: 'quest',
      desc: 'Mostra passagens abaixo da pirâmide.'
    },

    mapa_estelar: {
      name: 'Mapa Estelar',
      type: 'quest',
      desc: 'Representa rotas entre a Terra e uma estrela distante.'
    },

    mascara_sacerdote: {
      name: 'Máscara de Sacerdote',
      type: 'relic',
      desc: 'Máscara usada pelos guardiões da pirâmide.'
    },

    runa_protecao: {
      name: 'Runa de Proteção',
      type: 'armor',
      defense: 3,
      desc: 'Reduz danos causados por armadilhas e energia antiga.'
    },

    explosivos: {
      name: 'Explosivos',
      type: 'tool',
      desc: 'Podem abrir passagens bloqueadas, mas são perigosos.'
    },

    radio_militar: {
      name: 'Rádio Militar',
      type: 'tool',
      desc: 'Permite comunicação com o exterior.'
    },

    disco_cristal: {
      name: 'Disco de Cristal',
      type: 'key',
      desc: 'Ativa sistemas da cidade enterrada.'
    },

    chave_ancestral: {
      name: 'Chave Ancestral',
      type: 'key',
      desc: 'Controla os mecanismos finais da pirâmide.'
    },

    artefato_origem: {
      name: 'Artefato da Origem',
      type: 'relic',
      desc: 'Objeto capaz de mudar a história da humanidade.'
    },

    nucleo_guardiao: {
      name: 'Núcleo do Guardião',
      type: 'component',
      desc: 'Fonte de energia da máquina ancestral.'
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