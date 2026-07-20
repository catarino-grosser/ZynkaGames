// Campanha para Zynka RPG 3.0
// Arquivo pronto para colocar dentro da pasta aventuras.

const aventura = {
  id: 'castelo_das_sombras',
  title: 'O Castelo das Sombras',
  icon: '🏰',
  genre: 'Fantasia sombria',
  difficulty: 'Média',
  estimatedTime: '35 a 50 min',
  desc: 'Um castelo surge apenas nas noites de lua cheia. Dizem que um rei amaldiçoado guarda um tesouro lendário, mas ninguém jamais voltou de lá.',
  start: 'cap01',
  maxChapters: 15,

  assets: {
    music: './assets/musicas/TrilhaTerror.mp3',
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
      title: '1. A Noite da Lua Cheia',
      image: '',
      scene: 'A lua cheia ilumina uma colina vazia. Pouco a pouco, pedras negras surgem da névoa, formando torres, muralhas e portões enferrujados.',
      text: 'Durante gerações, os aldeões de Valdória contaram a mesma história: quando a lua cheia alcança o ponto mais alto do céu, um castelo surge no alto da colina morta. Ao amanhecer, ele desaparece, levando consigo todos que ousaram entrar.\n\nVocê chega à colina carregando uma lanterna, uma lâmina simples e uma promessa: encontrar o tesouro lendário do Rei Arvand, o monarca que condenou seu reino ao tentar vencer a morte.',
      dialogue: {
        name: 'Velha Elsbeth',
        portrait: '',
        lines: [
          'Não siga vozes dentro do castelo.',
          'Não aceite presentes de sombras.',
          'E se encontrar o rei... não olhe apenas para a coroa. Olhe para os olhos.'
        ]
      },
      effect: {
        gold: 10,
        addItems: [
          { id: 'lanterna_prata', qty: 1 },
          { id: 'espada_gasta', qty: 1 },
          { id: 'pocao_cura', qty: 1 }
        ]
      },
      choices: [
        { text: 'Entrar pelo portão principal', to: 'cap02' },
        { text: 'Procurar uma entrada lateral', to: 'cap03', className: 'reward' },
        { text: 'Forçar a grade enferrujada', to: 'cap02', damage: 4, className: 'danger' }
      ]
    },

    cap02: {
      title: '2. O Portão dos Condenados',
      image: '',
      scene: 'O portão principal se abre sozinho. Estátuas de cavaleiros sem rosto observam sua entrada.',
      text: 'Assim que você cruza o portão, o som da aldeia desaparece. Não há grilos, vento ou passos além dos seus. As estátuas ao longo do caminho seguram espadas apontadas para baixo, como se estivessem em luto.\n\nNo centro do pátio, uma inscrição surge nas pedras: “Todo visitante deve deixar algo para trás.” A sombra da lua parece se mover contra você.',
      treasure: {
        id: 'fonte_patio',
        text: '💰 Vasculhar a fonte seca do pátio',
        reward: {
          gold: 14,
          addItems: [{ id: 'moeda_real_negra', qty: 1 }]
        }
      },
      randomEvent: {
        chance: 0.45,
        text: 'Uma corrente fria atravessa seu corpo. Por um instante, você ouve centenas de súplicas nas paredes.',
        damage: 3
      },
      choices: [
        { text: 'Seguir para o salão principal', to: 'cap04' },
        { text: 'Investigar as estátuas dos cavaleiros', to: 'cap03' }
      ]
    },

    cap03: {
      title: '3. O Jardim Murcho',
      image: '',
      scene: 'Um jardim morto se esconde ao lado do castelo. Rosas negras crescem entre ossos brancos e raízes retorcidas.',
      text: 'A entrada lateral leva a um jardim que não deveria existir. As flores estão mortas, mas ainda exalam perfume. No centro, uma fonte quebrada reflete um céu sem lua, embora a lua cheia brilhe acima de você.\n\nUma criança fantasma aparece perto das roseiras. Ela segura uma chave pequena e canta uma canção sobre um rei que trancou o próprio coração.',
      dialogue: {
        name: 'Criança Fantasma',
        portrait: '',
        lines: [
          'O rei perdeu a luz quando escondeu o tesouro.',
          'A chave abre portas pequenas... mas também memórias grandes.'
        ]
      },
      effect: {
        xp: 10,
        addItems: [{ id: 'chave_jardim', qty: 1 }],
        flags: { conheceu_crianca_fantasma: true }
      },
      choices: [
        { text: 'Agradecer a criança e entrar pela porta lateral', to: 'cap04', className: 'reward' },
        { text: 'Perguntar sobre o tesouro do rei', to: 'cap05' }
      ]
    },

    cap04: {
      title: '4. O Salão dos Ecos',
      image: '',
      scene: 'O salão principal é imenso. Lustres apagados balançam sem vento e tapeçarias rasgadas mostram batalhas antigas.',
      text: 'O salão parece maior por dentro do que o castelo por fora. Cada passo seu ecoa três vezes, mas o último eco sempre vem atrasado, como se alguém imitasse você nas sombras.\n\nDas tapeçarias rasgadas, figuras bordadas movem os olhos. Uma delas mostra o Rei Arvand ajoelhado diante de uma coroa feita de trevas.',
      puzzle: {
        question: 'A tapeçaria pergunta: “O que cresce quando é dividido?”',
        answer: 'sombra',
        successText: 'As tapeçarias se abrem, revelando um corredor secreto.',
        reward: {
          xp: 15,
          addItems: [{ id: 'fragmento_sombra', qty: 1 }]
        },
        setFlag: 'corredor_secreto_aberto'
      },
      choices: [
        { text: 'Entrar pelo corredor secreto', to: 'cap05', requiresFlag: 'corredor_secreto_aberto' },
        { text: 'Subir a escadaria principal', to: 'cap06' }
      ]
    },

    cap05: {
      title: '5. A Biblioteca Proibida',
      image: '',
      scene: 'Estantes altas cercam uma sala circular. Livros acorrentados sussurram quando você passa.',
      text: 'A biblioteca guarda livros que parecem respirar. Alguns títulos mudam enquanto você lê. Outros se fecham violentamente, como mandíbulas. No centro da sala, um tomo negro repousa sobre um pedestal de prata.\n\nAo abrir o livro, você descobre que o Rei Arvand fez um pacto com a Sombra Primordial para proteger seu reino de uma praga. O preço foi sua alma, sua família e todos os que entrassem no castelo em noites de lua cheia.',
      treasure: {
        id: 'gaveta_biblioteca',
        text: '💰 Abrir a gaveta trancada com a Chave do Jardim',
        reward: {
          gold: 18,
          addItems: [{ id: 'anel_lua', qty: 1 }]
        },
        requiresItem: 'chave_jardim'
      },
      effect: {
        xp: 12,
        flags: { descobriu_pacto_rei: true },
        addItems: [{ id: 'tomo_negro', qty: 1 }]
      },
      choices: [
        { text: 'Levar o tomo negro', to: 'cap06', className: 'reward' },
        { text: 'Deixar o livro e seguir em frente', to: 'cap06' }
      ]
    },

    cap06: {
      title: '6. Armaduras Vivas',
      image: '',
      scene: 'Um corredor estreito é ladeado por armaduras antigas. Quando você passa, elmos vazios se viram em sua direção.',
      text: 'As armaduras do corredor não protegem ninguém há séculos. Ainda assim, quando você se aproxima, mãos metálicas apertam lanças enferrujadas. Uma voz grave ecoa de dentro de todos os elmos ao mesmo tempo.\n\n“Somente os mortos servem ao rei. Prove que está vivo.”',
      enemy: {
        id: 'armadura_viva',
        name: 'Armadura Viva',
        hp: 30,
        atk: 7,
        def: 4,
        xp: 32,
        rewardGold: 16,
        rewardItems: [
          { id: 'placa_prata', qty: 1 },
          { id: 'pocao_cura', qty: 1 }
        ],
        image: ''
      },
      winTo: 'cap07',
      loseTo: 'derrota'
    },

    cap07: {
      title: '7. A Capela Sem Santos',
      image: '',
      scene: 'A capela do castelo não tem imagens sagradas. No altar, há apenas uma coroa escura flutuando sobre uma chama azul.',
      text: 'A capela foi esvaziada de toda fé. As paredes mostram marcas onde símbolos foram arrancados. No altar, a chama azul ilumina uma coroa que não projeta sombra.\n\nUma mulher vestida de branco aparece entre os bancos quebrados. Ela não pisa no chão. Seu rosto lembra o da rainha nas pinturas antigas.',
      dialogue: {
        name: 'Rainha Elenora',
        portrait: '',
        lines: [
          'Arvand não nasceu monstro. Ele teve medo.',
          'O tesouro não é ouro. É aquilo que a Sombra usou para prender o coração dele.',
          'Se quiser sair vivo, encontre os três fragmentos da luz lunar.'
        ]
      },
      sideQuest: {
        id: 'fragmentos_lua',
        title: 'Os Três Fragmentos da Luz Lunar',
        desc: 'Encontre os fragmentos capazes de enfraquecer a maldição do Rei Arvand.'
      },
      effect: {
        xp: 15,
        flags: { conheceu_rainha: true },
        addItems: [{ id: 'fragmento_lua_1', qty: 1 }]
      },
      choices: [
        { text: 'Prometer libertar o rei', to: 'cap08', className: 'reward' },
        { text: 'Dizer que veio apenas pelo tesouro', to: 'cap08' }
      ]
    },

    cap08: {
      title: '8. A Cozinha dos Famintos',
      image: '',
      scene: 'Panelas vazias fervem sobre fogões apagados. Talheres se movem sozinhos sobre mesas cobertas de poeira.',
      text: 'A cozinha do castelo está cheia de cheiros impossíveis: pão fresco, carne assada, vinho doce. Mas todos os pratos estão vazios. Nas paredes, sombras magras se arrastam, famintas por calor humano.\n\nUma porta de ferro leva às adegas. Sobre ela, uma frase foi riscada com unhas: “A fome da sombra nunca termina.”',
      randomEvent: {
        chance: 0.5,
        text: 'Você encontra uma garrafa de vinho lunar intacta. O líquido restaura sua coragem.',
        reward: {
          xp: 8,
          addItems: [{ id: 'vinho_lunar', qty: 1 }]
        }
      },
      choices: [
        { text: 'Descer para as adegas', to: 'cap09' },
        { text: 'Procurar suprimentos escondidos', to: 'cap09', className: 'reward' },
        { text: 'Comer a comida das sombras', to: 'cap09', damage: 8, className: 'danger' }
      ]
    },

    cap09: {
      title: '9. As Adegas da Lua Negra',
      image: '',
      scene: 'As adegas são frias e profundas. Barris antigos vazam um líquido escuro que parece se mover sozinho.',
      text: 'Nas adegas, o ar é pesado. Você encontra marcas de correntes no chão e velhos símbolos desenhados com sal. Ali, prisioneiros foram oferecidos à Sombra Primordial durante as primeiras luas cheias da maldição.\n\nNo fundo da adega, uma criatura feita de vinho negro, ossos e sombras ergue-se diante de você.',
      enemy: {
        id: 'devorador_adega',
        name: 'Devorador da Adega',
        hp: 36,
        atk: 8,
        def: 3,
        xp: 40,
        rewardGold: 20,
        rewardItems: [
          { id: 'fragmento_lua_2', qty: 1 },
          { id: 'essencia_sombra', qty: 1 }
        ],
        image: ''
      },
      winTo: 'cap10',
      loseTo: 'derrota'
    },

    cap10: {
      title: '10. A Torre do Astrônomo',
      image: '',
      scene: 'No alto da torre, um telescópio enorme mira a lua cheia. Mapas celestes cobrem o chão.',
      text: 'A Torre do Astrônomo revela que o castelo não surge por magia comum. Ele atravessa uma fenda entre o mundo dos vivos e o Reino das Sombras sempre que a lua cheia abre caminho.\n\nUm diário antigo mostra que há apenas uma forma de impedir o desaparecimento do castelo ao amanhecer: tocar o Sino de Prata antes que a última estrela desapareça.',
      puzzle: {
        question: 'O mapa celeste pergunta: “Quem ilumina sem queimar?”',
        answer: 'lua',
        successText: 'O telescópio se move sozinho e revela o esconderijo do Sino de Prata.',
        reward: {
          xp: 18,
          addItems: [{ id: 'sino_prata', qty: 1 }]
        },
        setFlag: 'sino_encontrado'
      },
      choices: [
        { text: 'Tocar o Sino de Prata', to: 'cap11', requiresItem: 'sino_prata', className: 'reward' },
        { text: 'Descer para o salão do trono', to: 'cap11' }
      ]
    },

    cap11: {
      title: '11. O Baile dos Mortos',
      image: '',
      scene: 'Um salão de baile aparece onde antes havia apenas ruínas. Nobres fantasmagóricos dançam em silêncio absoluto.',
      text: 'Ao tocar o sino ou atravessar a porta do salão, você vê o castelo como era antes da maldição. Nobres dançam sob lustres acesos, músicos sem rosto tocam violinos invisíveis e a Rainha Elenora observa tudo com tristeza.\n\nNo centro do baile, o Rei Arvand dança sozinho com uma sombra usando a forma da rainha. Se você interromper a dança, a ilusão ruirá.',
      dialogue: {
        name: 'Rainha Elenora',
        portrait: '',
        lines: [
          'Ele revive esta noite eternamente.',
          'A Sombra usa meu rosto para mantê-lo preso.',
          'Mostre a ele a verdade.'
        ]
      },
      effect: {
        xp: 16,
        flags: { viu_baile_mortos: true }
      },
      choices: [
        { text: 'Mostrar o Tomo Negro ao rei', to: 'cap12', requiresItem: 'tomo_negro', className: 'reward' },
        { text: 'Atacar a sombra disfarçada', to: 'cap12' },
        { text: 'Entrar na dança dos mortos', to: 'cap12', damage: 6, className: 'danger' }
      ]
    },

    cap12: {
      title: '12. A Sombra da Rainha',
      image: '',
      scene: 'A falsa rainha se desfaz em névoa escura. O salão apodrece em segundos, revelando ossos sob o piso.',
      text: 'A ilusão se quebra. A criatura que usava o rosto da rainha revela sua forma verdadeira: uma sombra alta, sem olhos, com uma coroa de espinhos negros. Ela ri com a voz de todos os mortos do castelo.\n\n“Arvand é meu”, ela sussurra. “E todo coração que deseja tesouro também será.”',
      enemy: {
        id: 'sombra_rainha',
        name: 'Sombra da Rainha',
        hp: 42,
        atk: 9,
        def: 4,
        xp: 50,
        rewardGold: 26,
        rewardItems: [
          { id: 'fragmento_lua_3', qty: 1 },
          { id: 'coroa_espinhos', qty: 1 }
        ],
        image: ''
      },
      winTo: 'cap13',
      loseTo: 'derrota'
    },

    cap13: {
      title: '13. O Cofre do Rei',
      image: '',
      scene: 'Atrás do salão destruído, uma escadaria desce até uma porta circular feita de ouro escurecido.',
      text: 'O cofre do rei está protegido por três encaixes em forma de lua. Se os fragmentos lunares forem colocados ali, a porta se abre sem ruído. Se não, a própria sombra cobrará o preço.\n\nLá dentro não há pilhas de moedas. Há armas encantadas, cartas antigas, retratos da família real e uma pequena caixa de cristal pulsando como um coração.',
      treasure: {
        id: 'cofre_real',
        text: '💰 Abrir o Cofre do Rei',
        reward: {
          gold: 45,
          addItems: [
            { id: 'coração_cristal', qty: 1 },
            { id: 'espada_lunar', qty: 1 }
          ]
        }
      },
      effect: {
        xp: 20,
        flags: { abriu_cofre_real: true }
      },
      choices: [
        { text: 'Levar o Coração de Cristal ao trono', to: 'cap14', requiresItem: 'coração_cristal', className: 'reward' },
        { text: 'Pegar apenas o tesouro e fugir', to: 'final_ganancia', className: 'danger' },
        { text: 'Seguir ao trono sem abrir o cofre', to: 'cap14' }
      ]
    },

    cap14: {
      title: '14. O Rei Amaldiçoado',
      image: '',
      scene: 'O salão do trono está coberto por sombras vivas. No trono, o Rei Arvand segura uma espada quebrada e uma coroa negra.',
      text: 'O Rei Arvand ergue os olhos quando você entra. Eles não são cruéis. São cansados. Atrás dele, a Sombra Primordial se espalha pelas paredes como uma noite sem estrelas.\n\nO rei diz que guardou o tesouro para impedir que outros repetissem seu erro. Mas a sombra afirma que nenhum humano resiste ao desejo de possuir aquilo que promete poder eterno.',
      dialogue: {
        name: 'Rei Arvand',
        portrait: '',
        lines: [
          'Eu quis salvar meu povo.',
          'Sacrifiquei tudo o que amava para vencer a morte.',
          'Agora a morte usa minha coroa.'
        ]
      },
      enemy: {
        id: 'rei_arvand',
        name: 'Rei Arvand Amaldiçoado',
        hp: 55,
        atk: 10,
        def: 5,
        xp: 70,
        rewardGold: 35,
        rewardItems: [
          { id: 'coroa_negra', qty: 1 }
        ],
        image: '',
        setFlag: 'rei_vencido'
      },
      winTo: 'cap15',
      loseTo: 'derrota'
    },

    cap15: {
      title: '15. Antes do Amanhecer',
      image: '',
      scene: 'As primeiras linhas de luz surgem no horizonte. O castelo começa a tremer, pronto para desaparecer novamente.',
      text: 'Com o rei derrotado, enfraquecido ou finalmente desperto da ilusão, o castelo inteiro ruge. A Sombra Primordial perde parte de seu domínio, mas ainda tenta arrastar tudo para o outro lado.\n\nO Coração de Cristal pulsa em suas mãos. Ele é o verdadeiro tesouro lendário: a última parte humana de Arvand, arrancada para selar o pacto. Agora você precisa decidir o destino do rei, do castelo e da maldição.',
      choices: [
        { text: 'Devolver o Coração de Cristal ao rei', to: 'final_redencao', requiresItem: 'coração_cristal', className: 'reward' },
        { text: 'Destruir a Coroa Negra', to: 'final_libertacao', requiresItem: 'coroa_negra' },
        { text: 'Ficar com o Coração de Cristal', to: 'final_ganancia', className: 'danger' },
        { text: 'Unir os três fragmentos lunares e banir a Sombra', to: 'final_secreto', requiresItem: 'fragmento_lua_3', className: 'reward' }
      ]
    },

    final_redencao: {
      title: 'Final: A Redenção do Rei',
      text: 'Você devolve o Coração de Cristal ao Rei Arvand. Pela primeira vez em séculos, ele chora. A coroa negra cai, a sombra recua e o castelo permanece sob a luz do amanhecer. O tesouro lendário desaparece, mas Valdória ganha algo maior: o fim da maldição.',
      end: true
    },

    final_libertacao: {
      title: 'Final: O Castelo em Ruínas',
      text: 'Você destrói a Coroa Negra. A maldição se parte violentamente, libertando as almas presas, mas o castelo começa a desabar. Você escapa ao amanhecer levando cicatrizes, algumas moedas antigas e a certeza de que nenhuma coroa vale uma alma.',
      end: true
    },

    final_ganancia: {
      title: 'Final: O Novo Senhor das Sombras',
      text: 'Você escolhe ficar com o tesouro. O Coração de Cristal pulsa em sua mão e promete poder, riqueza e vida eterna. Quando o sol nasce, Valdória vê o castelo desaparecer. Na próxima lua cheia, ele retorna com um novo senhor no trono.',
      end: true
    },

    final_secreto: {
      title: 'Final Secreto: A Lua Sobre Valdória',
      text: 'Você une os três fragmentos lunares, toca o Sino de Prata e ergue a Lanterna de Prata diante da Sombra Primordial. A luz da lua atravessa o castelo inteiro. As almas são libertas, Arvand reencontra Elenora e o castelo se transforma em ruínas pacíficas cobertas por flores brancas.',
      end: true
    },

    derrota: {
      title: 'Derrota',
      text: 'As sombras envolvem seu corpo antes que você alcance a saída. Quando a lua cheia desaparece, o castelo some com você dentro dele. Em Valdória, os aldeões acendem velas por mais uma alma que não voltou.',
      end: true
    }
  },

  items: {
    lanterna_prata: {
      name: 'Lanterna de Prata',
      type: 'tool',
      desc: 'Uma lanterna capaz de revelar ilusões fracas.'
    },
    espada_gasta: {
      name: 'Espada Gasta',
      type: 'weapon',
      attack: 2,
      desc: 'Uma espada simples, mas confiável.'
    },
    espada_lunar: {
      name: 'Espada Lunar',
      type: 'weapon',
      attack: 6,
      desc: 'Lâmina encantada pela luz da lua cheia.'
    },
    pocao_cura: {
      name: 'Poção de Cura',
      type: 'consumable',
      heal: 14,
      desc: 'Restaura 14 pontos de vida.'
    },
    vinho_lunar: {
      name: 'Vinho Lunar',
      type: 'consumable',
      heal: 10,
      desc: 'Bebida encantada que restaura energia e coragem.'
    },
    chave_jardim: {
      name: 'Chave do Jardim',
      type: 'key',
      desc: 'Pequena chave entregue pela criança fantasma.'
    },
    moeda_real_negra: {
      name: 'Moeda Real Negra',
      type: 'treasure',
      desc: 'Moeda antiga cunhada antes da maldição.'
    },
    fragmento_sombra: {
      name: 'Fragmento de Sombra',
      type: 'component',
      desc: 'Parte condensada da magia sombria do castelo.'
    },
    tomo_negro: {
      name: 'Tomo Negro',
      type: 'quest',
      desc: 'Livro que revela o pacto do Rei Arvand.'
    },
    anel_lua: {
      name: 'Anel da Lua',
      type: 'relic',
      desc: 'Anel de prata usado pela antiga rainha.'
    },
    placa_prata: {
      name: 'Placa de Prata',
      type: 'component',
      desc: 'Metal retirado de uma armadura viva.'
    },
    fragmento_lua_1: {
      name: 'Primeiro Fragmento Lunar',
      type: 'relic',
      desc: 'Um dos três fragmentos da luz lunar.'
    },
    fragmento_lua_2: {
      name: 'Segundo Fragmento Lunar',
      type: 'relic',
      desc: 'Um dos três fragmentos da luz lunar.'
    },
    fragmento_lua_3: {
      name: 'Terceiro Fragmento Lunar',
      type: 'relic',
      desc: 'Um dos três fragmentos da luz lunar.'
    },
    essencia_sombra: {
      name: 'Essência de Sombra',
      type: 'component',
      desc: 'Matéria escura retirada de uma criatura amaldiçoada.'
    },
    sino_prata: {
      name: 'Sino de Prata',
      type: 'quest',
      desc: 'Sino capaz de prender o castelo ao mundo até o amanhecer.'
    },
    coroa_espinhos: {
      name: 'Coroa de Espinhos Negros',
      type: 'component',
      desc: 'Parte da falsa rainha sombria.'
    },
    coração_cristal: {
      name: 'Coração de Cristal',
      type: 'relic',
      desc: 'O verdadeiro tesouro do Rei Arvand.'
    },
    coroa_negra: {
      name: 'Coroa Negra',
      type: 'relic',
      desc: 'Símbolo do pacto entre o rei e a Sombra Primordial.'
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