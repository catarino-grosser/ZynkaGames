// Aventura comercial para Zynka RPG 3.0 — Terror • Mistério • Sobrenatural
// Coloque imagens em assets/img/ e áudios em assets/audio/ quando quiser ativar mídia real.

const aventura = {
  id: 'trem_fantasma',
  title: 'O Trem Fantasma',
  icon: '🚂',
  genre: 'Terror sobrenatural',
  difficulty: 'Média',
  estimatedTime: '45 a 60 min',
  desc: 'Toda noite de lua nova, um trem sem trilhos cruza a cidade à meia-noite. Embarque, enfrente seus medos em cada vagão e descubra quem é o Maquinista antes que o trem chegue ao destino final.',
  start: 'cap01',
  maxChapters: 20,
  assets: {
    music: '',
    sfx: { click: '', attack: '', victory: '', item: '', levelup: '', puzzle: '' }
  },
  chapters: {
    cap01: {
      title: '1. A Estação Abandonada',
      image: '',
      scene: 'Trilhos enferrujados terminam no vazio. A neblina cobre os bancos quebrados e um relógio de parede está parado às 23h58.',
      text: 'Você chega à velha estação depois de receber uma carta anônima, sem remetente, apenas uma frase: "Última parada... o destino." Ninguém usa essa linha há vinte anos — não desde que os trilhos foram arrancados.\n\nO silêncio aqui tem peso. Falta pouco para a meia-noite, e você sente que algo está prestes a atravessar o tempo para chegar até esta plataforma.',
      choices: [
        { text: 'Investigar a plataforma', to: 'cap02', addItems: [{ id: 'lanterna_antiga', qty: 1 }], className: 'reward' },
        { text: 'Explorar a sala do chefe da estação', to: 'cap02', addItems: [{ id: 'chave_bronze', qty: 1 }], className: 'reward' },
        { text: 'Esperar imóvel pelo trem', to: 'cap02', damage: 2, className: 'danger' }
      ]
    },
    cap02: {
      title: '2. Embarque',
      scene: 'Um trem negro surge envolto em névoa, sem fazer nenhum som sobre trilhos que não existem. As portas se abrem sozinhas.',
      text: 'Uma voz sussurra de dentro dos vagões: "Última parada... o destino." Ao seu lado, um passageiro de casaco surrado espera há muito mais tempo do que deveria ser possível.',
      dialogue: {
        name: 'Velho Passageiro',
        portrait: '',
        lines: [
          'Você também recebeu a carta, não é? Cinco pessoas desapareceram nesta linha nos últimos meses.',
          'Se entrar, procure por elas. E guarde este bilhete — pode valer mais do que imagina.'
        ]
      },
      effect: { addItems: [{ id: 'bilhete_enferrujado', qty: 1 }] },
      sideQuest: { id: 'passageiros_perdidos', title: 'Os Passageiros Desaparecidos', desc: 'O Velho Passageiro pediu que você encontre os cinco viajantes que sumiram nesta linha fantasma.' },
      choices: [
        { text: 'Entrar sem hesitar', to: 'cap03', xp: 5 },
        { text: 'Perguntar mais sobre os desaparecidos', to: 'cap03', xp: 8, className: 'reward' },
        { text: 'Tentar fugir da estação', to: 'cap03', damage: 4, className: 'danger' }
      ]
    },
    cap03: {
      title: '3. Vagão das Memórias',
      scene: 'Cabines de vidro embaçado alinham o corredor. Em cada uma, uma lembrança sua se repete como um filme quebrado.',
      text: 'Três versões da mesma noite se repetem nas cabines: em uma, você chega cedo em casa; em outra, chega tarde; na terceira, nunca chega. Só uma delas é real — as outras querem que você esqueça quem é.\n\nUm medalhão de prata brilha esquecido no chão, entre duas cabines.',
      puzzle: {
        question: 'Das três lembranças, qual é sempre a única real: a que chega cedo, a que chega tarde, ou a que nunca chega?',
        answer: 'a que chega tarde',
        successText: 'A lembrança verdadeira se firma na sua mente. Você sabe exatamente quem é.',
        failText: 'As cabines piscam e uma dor aguda atravessa sua cabeça.',
        reward: { xp: 12 },
        damage: 4,
        setFlag: 'memoria_verdadeira'
      },
      treasure: { id: 'medalhao_vagao', text: '🔍 Pegar o medalhão de prata no chão', reward: { addItems: [{ id: 'medalhao_memoria', qty: 1 }], xp: 5 } },
      choices: [
        { text: 'Seguir com a mente clara para o próximo vagão', to: 'cap04', requiresFlag: 'memoria_verdadeira', className: 'reward' },
        { text: 'Forçar a porta sem ter certeza de nada', to: 'cap04', damage: 5, className: 'danger' }
      ]
    },
    cap04: {
      title: '4. Vagão dos Espelhos',
      scene: 'Espelhos do chão ao teto refletem versões suas: uma de armadura dourada, outra coberta de cinzas, outra sorrindo com dentes errados demais.',
      text: 'Um dos reflexos não copia seus movimentos. Ele dá um passo à frente, sai do vidro e assume sua forma exata — só que os olhos estão vazios.\n\n"Só um de nós dois sai deste vagão", ele diz com a sua própria voz.',
      enemy: { id: 'doppelganger_espelho', name: 'Doppelgänger do Espelho', hp: 22, atk: 5, def: 2, xp: 20, rewardGold: 10, rewardItems: [{ id: 'pocao_vida', qty: 1 }], image: '' },
      winTo: 'cap05',
      loseTo: 'derrota'
    },
    cap05: {
      title: '5. Vagão Silencioso',
      scene: 'Cortinas grossas abafam qualquer som. No fim do corredor, formas altas e imóveis parecem ouvir cada respiração.',
      text: 'Uma placa entalhada avisa: "Aqui, o som é sangue." Criaturas sem olhos — marionetes de pano e ossos — vagam entre os bancos, guiadas apenas pelo ouvido.\n\nSeu coração bate alto demais para o seu gosto.',
      randomEvent: { chance: 0.4, text: 'Uma tábua range sob seus pés. As marionetes viram a cabeça de uma vez, na sua direção.', damage: 6 },
      choices: [
        { text: 'Usar a lanterna para enxergar o caminho sem tropeçar', to: 'cap06', requiresItem: 'lanterna_antiga', className: 'reward' },
        { text: 'Avançar devagar, um passo de cada vez', to: 'cap06' },
        { text: 'Correr para atravessar logo', to: 'cap06', damage: 5, className: 'danger' }
      ]
    },
    cap06: {
      title: '6. Vagão do Relógio',
      scene: 'Ponteiros gigantes cortam o vagão ao meio, girando em direções opostas. Um relógio de bolso quebrado bate sobre o assoalho, no ritmo errado.',
      text: 'Aqui o tempo não obedece a ninguém. Cada escolha errada acrescenta rugas às suas mãos, cansaço aos seus ossos. Para atravessar, é preciso responder ao relógio antes que ele responda por você.',
      puzzle: {
        question: 'Se o ponteiro das horas anda para trás e o dos minutos para frente, qual deles chega primeiro à meia-noite?',
        answer: 'o das horas',
        successText: 'Os ponteiros param. O relógio quebrado a seus pés volta a fazer tic-tac normalmente.',
        failText: 'Os ponteiros avançam sobre você. Suas mãos envelhecem um pouco diante dos seus olhos.',
        reward: { xp: 15, addItems: [{ id: 'relogio_quebrado', qty: 1 }] },
        damage: 5,
        setFlag: 'venceu_relogio'
      },
      choices: [
        { text: 'Seguir para o restaurante do trem', to: 'cap07' }
      ]
    },
    cap07: {
      title: '7. Restaurante Fantasma',
      scene: 'Talheres de prata batem em pratos vazios. Passageiros bem vestidos mastigam com educação, embora nada exista em seus garfos.',
      text: 'Ninguém aqui percebe que está morto. Eles riem, brindam e comentam sobre uma viagem que nunca termina. Um deles vira o rosto na sua direção — pálido demais, sorriso largo demais.',
      dialogue: {
        name: 'Passageiro do Jantar',
        portrait: '',
        lines: [
          'Sente-se, sente-se! A viagem é longa, mas a companhia é ótima.',
          'Você não vai querer chegar ao fim antes da hora... ninguém quer.'
        ]
      },
      treasure: { id: 'jantar_fantasma', text: '🍽️ Aceitar o prato oferecido', reward: { hp: 6 } },
      choices: [
        { text: 'Recusar educadamente e seguir em frente', to: 'cap08' },
        { text: 'Perguntar sobre o Maquinista', to: 'cap08', xp: 6, className: 'reward' }
      ]
    },
    cap08: {
      title: '8. Biblioteca das Almas',
      scene: 'Estantes infinitas guardam livros sem nome no lombo. No centro, um único volume brilha fracamente: o seu.',
      text: 'Cada livro nesta sala é a vida inteira de um passageiro. O seu está aberto na mesa central, esperando. Você pode ler o que ainda não viveu, queimar o que já foi, ou simplesmente fechá-lo e seguir sem saber.',
      choices: [
        { text: 'Ler o próprio livro', to: 'cap09', addItems: [{ id: 'livro_almas', qty: 1 }], xp: 15, flags: { leu_livro: true }, className: 'reward' },
        { text: 'Queimar o livro', to: 'cap09', atk: 1, def: 1, flags: { queimou_livro: true }, className: 'danger' },
        { text: 'Fechar o livro sem ler', to: 'cap09', flags: { fechou_livro: true } }
      ]
    },
    cap09: {
      title: '9. O Vagão Perdido',
      scene: 'Um vagão escondido entre dois outros, sem numeração. Dentro, pessoas sentadas em silêncio, esperando alguém lembrar delas.',
      text: 'Você encontra os desaparecidos: uma jovem chamada Helena, presa ali há vinte anos, e uma criança que não envelheceu um dia sequer. Um baú de metal, trancado, guarda os pertences que tiraram de todos eles.',
      dialogue: {
        name: 'Helena',
        portrait: '',
        lines: [
          'Achei que ninguém mais viria. O Maquinista só liberta quem encontra alguém digno de tomar seu lugar.',
          'Leve esta rosa. Ela murcha perto de mentiras — pode te ajudar a saber em quem confiar.'
        ]
      },
      effect: { addItems: [{ id: 'rosa_negra', qty: 1 }] },
      treasure: { id: 'bau_pertences', text: '🔑 Abrir o baú com a Chave de Bronze', requiresItem: 'chave_bronze', reward: { gold: 15, addItems: [{ id: 'pao', qty: 2 }] } },
      enemy: { id: 'sombras_vagao_perdido', name: 'Sombras dos Esquecidos', hp: 18, atk: 5, def: 1, xp: 22, rewardGold: 8, image: '', completeSideQuest: 'passageiros_perdidos', sideQuestReward: { xp: 25, gold: 15 } },
      winTo: 'cap10',
      loseTo: 'derrota'
    },
    cap10: {
      title: '10. O Cobrador',
      scene: 'Entre um vagão e outro, um homem alto de uniforme surrado bloqueia a passagem, perfurador de bilhetes em mãos.',
      text: 'O Cobrador não pisca. Ele examina você da cabeça aos pés e pergunta, com uma calma que gela mais que qualquer grito:\n\n"Você realmente pagou pelo que deseja?"',
      dialogue: {
        name: 'O Cobrador',
        portrait: '',
        lines: ['Toda passagem tem um preço. A pergunta é: você sabe qual é o seu?']
      },
      choices: [
        { text: 'Entregar o bilhete enferrujado do Velho Passageiro', to: 'cap11', requiresItem: 'bilhete_enferrujado', className: 'reward' },
        { text: 'Recusar-se a pagar e enfrentá-lo', to: 'cap10_batalha' }
      ]
    },
    cap10_batalha: {
      title: '10. O Preço Cobrado',
      text: 'O Cobrador guarda o perfurador de bilhetes e estala os dedos. As luzes do vagão piscam, e sua sombra ganha vida própria atrás dele.',
      enemy: { id: 'cobrador', name: 'O Cobrador', hp: 30, atk: 7, def: 3, xp: 30, rewardGold: 20, image: '' },
      winTo: 'cap11',
      loseTo: 'derrota'
    },
    cap11: {
      title: '11. A Locomotiva',
      scene: 'O corredor termina numa porta de ferro quente ao toque. Do outro lado, um coração de metal bate como um motor vivo.',
      text: 'Você chega perto o bastante da frente do trem para entender a verdade: o Trem Fantasma não é feito de madeira e aço. Ele respira. Ele sempre respirou.\n\nUma criança pequena aparece ao seu lado, séria demais para a idade que aparenta.',
      dialogue: {
        name: 'Criança do Último Vagão',
        portrait: '',
        lines: [
          'Todo mundo pergunta como parar o trem. Ninguém pergunta o que acontece depois.',
          'Ele só para de vez quando alguém decide ficar... ou quando alguém tem coragem de deixá-lo partir sozinho.'
        ]
      },
      choices: [
        { text: 'Seguir em frente, até o Maquinista', to: 'cap12' }
      ]
    },
    cap12: {
      title: '12. O Maquinista',
      scene: 'A cabine da locomotiva é maior por dentro do que por fora. Relógios param todos ao mesmo tempo quando você entra.',
      text: 'O Maquinista não levanta a voz. Ele nunca precisou. Há séculos guia este trem, à procura de alguém forte o bastante para assumir seu lugar — e cansado o bastante para aceitar.',
      dialogue: {
        name: 'O Maquinista',
        portrait: '',
        lines: [
          'Você chegou mais longe do que a maioria. Isso já diz algo sobre você.',
          'Qualquer um pode guiar este trem. A pergunta nunca foi se você consegue. É se você quer.'
        ]
      },
      enemy: { id: 'maquinista', name: 'O Maquinista', hp: 46, atk: 9, def: 4, xp: 50, rewardGold: 30, rewardItems: [{ id: 'apito_maquinista', qty: 1 }], image: '' },
      winTo: 'cap13',
      loseTo: 'final_passageiro_eterno'
    },
    cap13: {
      title: '13. Escolha Final',
      scene: 'O trem desacelera pela primeira vez em séculos. Lá fora, através da névoa, você consegue ver as luzes distantes da sua cidade.',
      text: 'O Maquinista está vencido, mas o trem continua vivo, esperando uma decisão. Você segura o apito nas mãos. Pode destruí-lo, guardá-lo... ou usá-lo.\n\nQualquer escolha, a partir daqui, é definitiva.',
      choices: [
        { text: 'Destruir o trem com o Apito do Maquinista', to: 'final_libertacao', requiresItem: 'apito_maquinista', className: 'reward' },
        { text: 'Assumir o comando e tornar-se o novo Maquinista', to: 'final_novo_maquinista', requiresFlag: 'leu_livro', className: 'danger' },
        { text: 'Fugir pela porta antes que ela se feche', to: 'final_trem_continua' }
      ]
    },
    final_libertacao: {
      title: 'Final: Libertação',
      text: 'O apito racha ao meio entre seus dedos. O Trem Fantasma solta um último suspiro metálico e se desfaz em cinzas e neblina. Helena, a criança e todos os passageiros perdidos somem em uma luz calma, finalmente livres.\n\nVocê volta a pé para a estação vazia. Na próxima lua nova, nada vai cruzar aqueles trilhos que não existem mais.',
      end: true
    },
    final_novo_maquinista: {
      title: 'Final: Novo Maquinista',
      text: 'Você entende, ao ler o próprio livro, que já sabia como essa história terminaria. Veste o casaco surrado, segura os controles e sente o trem reconhecer um novo dono.\n\nAgora é você quem sussurra "última parada" para os próximos que embarcarem — guiando-os, com paciência, até que alguém digno venha tomar o seu lugar.',
      end: true
    },
    final_trem_continua: {
      title: 'Final: O Trem Continua',
      text: 'Você salta pela porta um segundo antes dela travar, rolando pela plataforma da estação abandonada. Está vivo. Está livre.\n\nMas, ao longe, ainda ouve o apito. O Trem Fantasma segue os trilhos que não existem, à procura da próxima lua nova — e do próximo passageiro.',
      end: true
    },
    final_passageiro_eterno: {
      title: 'Final: Passageiro Eterno',
      text: 'O Maquinista nem precisa sorrir para vencer. Suas forças se esvaem no chão frio da cabine, e a última coisa que você ouve é a mesma frase sussurrada na estação: "Última parada... o destino."\n\nVocê se torna mais um passageiro do trem, esperando, como tantos outros, que alguém digno venha libertá-lo algum dia.',
      end: true
    },
    derrota: {
      title: 'Derrota',
      text: 'A escuridão do vagão engole tudo. Talvez, numa próxima lua nova, você tenha coragem de tentar de novo.',
      end: true
    }
  },
  items: {
    pao: { name: 'Pão de Viagem', type: 'consumable', heal: 4, desc: 'Restaura 4 de vida.' },
    pocao_vida: { name: 'Poção de Vida', type: 'consumable', heal: 12, desc: 'Restaura 12 de vida.' },
    orbe_arcano: { name: 'Orbe Arcano', type: 'class', desc: 'Item inicial do Mago.' },
    gazua: { name: 'Gazua', type: 'class', desc: 'Item inicial do Ladino.' },
    lanterna_antiga: { name: 'Lanterna Antiga', type: 'tool', desc: 'Ilumina o caminho em vagões escuros.' },
    chave_bronze: { name: 'Chave de Bronze', type: 'key', desc: 'Abre compartimentos e baús trancados do trem.' },
    bilhete_enferrujado: { name: 'Bilhete Enferrujado', type: 'key', desc: 'Um bilhete antigo que talvez pague uma dívida esquecida.' },
    medalhao_memoria: { name: 'Medalhão da Memória', type: 'quest', desc: 'Guarda o reflexo de uma lembrança verdadeira.' },
    relogio_quebrado: { name: 'Relógio Quebrado', type: 'quest', desc: 'Parou no exato instante em que o trem chegou.' },
    livro_almas: { name: 'Livro das Almas', type: 'relic', desc: 'A história da sua própria vida, escrita antes de você vivê-la.' },
    rosa_negra: { name: 'Rosa Negra', type: 'relic', desc: 'Presente de Helena. Murcha perto de mentiras.' },
    apito_maquinista: { name: 'Apito do Maquinista', type: 'relic', desc: 'O símbolo de comando do Trem Fantasma.' }
  }
};

export default aventura;
