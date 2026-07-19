// Aventura comercial para Zynka RPG 3.0 — Aventura • Exploração • Fantasia • Mistério
// Coloque imagens em assets/img/ e áudios em assets/audio/ quando quiser ativar mídia real.

const aventura = {
  id: 'cidade_submersa',
  title: 'A Cidade Submersa',
  icon: '🔱',
  genre: 'Fantasia aquática',
  difficulty: 'Média',
  estimatedTime: '50 a 70 min',
  desc: 'Um terremoto submarino traz à superfície as ruínas da lendária Atlântica. Explore templos afogados, enfrente criaturas marinhas e decida o destino do Tridente das Marés.',
  start: 'cap01',
  maxChapters: 25,
  assets: {
    music: './assets/musicas/TrilhaAventuraEpica1.mp3',
    sfx: { click: '', attack: '', victory: '', item: '', levelup: '', puzzle: '' }
  },
  chapters: {
    cap01: {
      title: '1. O Chamado do Oceano',
      image: '',
      scene: 'O navio de expedição corta águas calmas rumo a coordenadas que, até a semana passada, marcavam apenas oceano vazio no mapa.',
      text: 'Um terremoto submarino trouxe à tona algo que os livros de história chamavam de lenda: Atlântica, a cidade que desafiou os deuses e foi engolida pelo mar. Torres cristalinas e templos cobertos de coral agora rasgam a superfície das ondas.\n\nVocê faz parte de uma pequena expedição, com poucos dias antes que a cidade volte a afundar — se é que ela vai esperar tanto assim.',
      dialogue: {
        name: 'Capitã Marina',
        portrait: '',
        lines: [
          'Ninguém nunca chegou tão perto de Atlântica e voltou para contar história. Vamos ser os primeiros.',
          'Se algo parecer errado demais para ser verdade lá embaixo, é porque provavelmente é.'
        ]
      },
      choices: [
        { text: 'Conversar com a tripulação sobre lendas locais', to: 'cap02', xp: 6, className: 'reward' },
        { text: 'Examinar os mapas náuticos antigos', to: 'cap02', addItems: [{ id: 'mapa_nautico', qty: 1 }], className: 'reward' },
        { text: 'Preparar os equipamentos de mergulho', to: 'cap02', addItems: [{ id: 'faca_mergulho', qty: 1 }], className: 'reward' }
      ]
    },
    cap02: {
      title: '2. As Ruínas Emergidas',
      scene: 'Praças de mármore rachado emergem cobertas de coral vivo. A água escorre pelas pedras como se a cidade ainda estivesse decidindo se quer ficar na superfície.',
      text: 'As primeiras construções de Atlântica se erguem diante de você, silenciosas e imensas. Em cada parede, símbolos entalhados formam frases em um idioma que ninguém fala há milênios — exceto, talvez, uma pessoa a bordo.',
      dialogue: {
        name: 'Kael',
        portrait: '',
        lines: [
          'Isso não é apenas decoração. São avisos. "Quem entra sem ouvir, não sai sem pagar."',
          'Me dê um momento. Acho que consigo traduzir o resto da inscrição.'
        ]
      },
      puzzle: {
        question: 'Segundo a inscrição, o que acontece com quem entra sem ouvir?',
        answer: 'não sai sem pagar',
        successText: 'Kael sorri, satisfeito. "Isso vai nos ajudar mais à frente."',
        failText: 'Kael franze a testa. "Tradução errada pode ser perigosa aqui."',
        reward: { xp: 12 },
        damage: 3,
        setFlag: 'traducao_correta'
      },
      treasure: { id: 'mascara_ruinas', text: '🔍 Recolher uma máscara de mergulho antiga presa no coral', reward: { addItems: [{ id: 'mascara_mergulho', qty: 1 }] } },
      choices: [
        { text: 'Seguir para o templo principal', to: 'cap03' }
      ]
    },
    cap03: {
      title: '3. O Templo das Marés',
      scene: 'Um templo colossal guarda a entrada para o coração de Atlântica. Três comportas de pedra controlam o nível da água no salão de entrada.',
      text: 'Para atravessar, é preciso abrir as comportas na ordem certa — alta, média e baixa — sem afogar a passagem nem deixá-la seca demais para os mecanismos antigos funcionarem.\n\nUma placa de bronze, gasta pelo tempo, ainda mostra parte das instruções originais.',
      puzzle: {
        question: 'Para equilibrar as marés do templo, qual comporta deve abrir primeiro: a alta, a média ou a baixa?',
        answer: 'a baixa',
        successText: 'A água escorre suavemente pelas comportas. O caminho se abre sem resistência.',
        failText: 'A água jorra descontrolada por um instante, arrastando você contra as pedras.',
        reward: { xp: 15, addItems: [{ id: 'chave_concha', qty: 1 }] },
        damage: 5,
        setFlag: 'templo_equilibrado'
      },
      choices: [
        { text: 'Entrar no coração da cidade', to: 'cap04' }
      ]
    },
    cap04: {
      title: '4. As Ruas de Cristal',
      scene: 'Ruas inteiras talhadas em cristal azul refletem a luz do sol que atravessa a água rasa. O efeito seria bonito, se não fosse pelo que se move nas sombras entre os prédios.',
      text: 'Uma sombra rápida corta a água entre duas torres cristalinas. Antes que você entenda o que viu, uma criatura marinha do tamanho de um bote emerge das ruínas, eletricidade crepitando ao redor de seu corpo.',
      enemy: { id: 'enguia_gigante', name: 'Enguia Elétrica Gigante', hp: 24, atk: 6, def: 1, xp: 22, rewardGold: 12, rewardItems: [{ id: 'pao', qty: 1 }], image: '' },
      winTo: 'cap05',
      loseTo: 'derrota'
    },
    cap05: {
      title: '5. O Mercado Esquecido',
      scene: 'Bancas de pedra ainda guardam potes selados e ferramentas intactas, como se os vendedores tivessem saído para um intervalo que durou milênios.',
      text: 'O antigo mercado de Atlântica está surpreendentemente bem preservado. Relíquias históricas — moedas, ferramentas, joias — estão espalhadas entre os destroços, esperando por alguém disposto a catalogá-las antes que a cidade afunde de novo.',
      sideQuest: { id: 'reliquias_historicas', title: 'Relíquias do Mercado', desc: 'Recupere o máximo de relíquias históricas possível antes de deixar o mercado esquecido.' },
      treasure: { id: 'bau_mercado', text: '🔑 Abrir um baú selado com a Chave de Concha', requiresItem: 'chave_concha', reward: { gold: 18, addItems: [{ id: 'cristal_atlante', qty: 1 }] } },
      choices: [
        { text: 'Catalogar as relíquias e seguir em frente', to: 'cap06', completeSideQuest: 'reliquias_historicas', sideQuestReward: { xp: 18, gold: 10 }, className: 'reward' },
        { text: 'Ignorar as relíquias e seguir depressa', to: 'cap06' }
      ]
    },
    cap06: {
      title: '6. O Jardim dos Corais',
      scene: 'Corais bioluminescentes pulsam em azul e violeta, iluminando um jardim submerso onde plantas medicinais crescem ao lado de flores venenosas quase idênticas.',
      text: 'Uma figura solitária caminha entre os corais, tocando cada planta como se as reconhecesse pelo nome. Ela nota sua presença antes que você diga qualquer coisa.',
      dialogue: {
        name: 'Nereia',
        portrait: '',
        lines: [
          'Vocês, da superfície, sempre chegam com pressa. O jardim não perdoa pressa.',
          'Toquem apenas no que eu indicar. O resto pode curar ou matar, dependendo de quem pergunta.'
        ]
      },
      randomEvent: { chance: 0.35, text: 'Uma flor roxa solta um pólen urticante quando você passa perto demais.', damage: 4 },
      choices: [
        { text: 'Seguir apenas as plantas indicadas por Nereia', to: 'cap07', flags: { respeitou_jardim: true }, className: 'reward' },
        { text: 'Colher amostras por conta própria', to: 'cap07', damage: 3, className: 'danger' }
      ]
    },
    cap07: {
      title: '7. O Guardião das Profundezas',
      scene: 'No centro de uma arena de pedra, um guerreiro imenso permanece imóvel há tanto tempo que corais cresceram em sua armadura. Seus olhos se abrem no instante em que você se aproxima.',
      text: 'Ele protege Atlântica há milhares de anos, e nunca deixou ninguém passar sem provar sua intenção. A lança em suas mãos não hesita, mas também não ataca — ainda.',
      dialogue: {
        name: 'Guardião das Profundezas',
        portrait: '',
        lines: ['Fale, viajante. Vim ou pela cidade, ou pelo que ela guarda. Poucos vêm por outro motivo.']
      },
      choices: [
        { text: 'Abaixar as armas e pedir passagem em paz', to: 'cap08', flags: { guardiao_aliado: true }, xp: 15, className: 'reward' },
        { text: 'Provar sua coragem enfrentando o olhar dele sem recuar', to: 'cap08', damage: 4, xp: 10, flags: { guardiao_respeito: true } },
        { text: 'Atacar antes que ele reaja', to: 'cap07_batalha' }
      ]
    },
    cap07_batalha: {
      title: '7. A Fúria do Guardião',
      text: 'O Guardião ergue a lança e milênios de paciência se transformam em um único golpe. Ele não queria lutar — mas agora não vai parar até um de vocês cair.',
      enemy: { id: 'guardiao_profundezas', name: 'Guardião das Profundezas', hp: 34, atk: 8, def: 3, xp: 30, rewardGold: 15, image: '' },
      winTo: 'cap08',
      loseTo: 'derrota'
    },
    cap08: {
      title: '8. O Palácio do Rei Oceânico',
      scene: 'Colunas de coral branco sustentam um salão vazio, exceto por um trono de pedra e uma luz azul que pulsa no ar, formando lentamente a silhueta de um homem coroado.',
      text: 'A visão do último Rei de Atlântica paira diante de você, tão real quanto uma memória e tão frágil quanto neblina. Ele conta, sem pressa, a verdadeira razão da queda da cidade.',
      dialogue: {
        name: 'Rei Oceânico',
        portrait: '',
        lines: [
          'Não fomos destruídos por desafiar os deuses. Afundamos por escolha, para impedir que um poder ainda pior escapasse para o mundo.',
          'O Tridente das Marés ainda guarda esse poder. Leve este medalhão — ele pode acalmar o que desperta lá no fundo.'
        ]
      },
      effect: { addItems: [{ id: 'medalhao_oceanico', qty: 1 }], xp: 10 },
      choices: [
        { text: 'Seguir para a Câmara das Pérolas', to: 'cap09' }
      ]
    },
    cap09: {
      title: '9. A Câmara das Pérolas',
      scene: 'Espelhos de água vertical flutuam no ar sem cair, refletindo pérolas luminosas presas no teto como estrelas.',
      text: 'Cada espelho mostra um reflexo levemente diferente do salão. Só um deles mostra a verdade. Escolher errado desperta os espíritos que guardam a câmara.',
      puzzle: {
        question: 'Os espelhos mentem, exceto aquele que reflete algo que ainda não aconteceu. O que ele mostra?',
        answer: 'o futuro',
        successText: 'O espelho verdadeiro se abre como uma porta, liberando as pérolas presas em seu reflexo.',
        failText: 'Os outros espelhos racham ao mesmo tempo, e uma corrente fria de espíritos passa por você.',
        reward: { xp: 18, addItems: [{ id: 'perola_luz', qty: 1 }, { id: 'armadura_coral', qty: 1 }] },
        damage: 6,
        setFlag: 'pérolas_recuperadas'
      },
      choices: [
        { text: 'Seguir com as pérolas em direção às profundezas', to: 'cap10' }
      ]
    },
    cap10: {
      title: '10. O Leviatã',
      scene: 'A água escurece de repente. Um vulto maior que qualquer navio se move devagar entre as ruínas mais fundas, como se apenas agora tivesse notado sua presença.',
      text: 'O Leviatã desperta. Ele não é apenas uma criatura — é o motivo pelo qual Atlântica precisou afundar. Enfrentá-lo é arriscado. Fugir talvez não seja possível. Acalmá-lo pode exigir algo que você já carrega.',
      choices: [
        { text: 'Enfrentar o Leviatã de frente', to: 'cap10_batalha' },
        { text: 'Tentar fugir nadando o mais rápido possível', to: 'cap11', damage: 8, className: 'danger' },
        { text: 'Usar o Medalhão Oceânico para acalmá-lo', to: 'cap11', requiresItem: 'medalhao_oceanico', flags: { leviata_pacificado: true }, xp: 25, className: 'reward' }
      ]
    },
    cap10_batalha: {
      title: '10. A Fúria das Profundezas',
      text: 'Não há como negociar agora. O Leviatã ataca com o peso de uma era inteira submersa, e cada movimento seu levanta correntes capazes de virar navios.',
      enemy: { id: 'leviata', name: 'Leviatã', hp: 48, atk: 10, def: 4, xp: 55, rewardGold: 30, rewardItems: [{ id: 'pocao_vida', qty: 2 }], image: '' },
      winTo: 'cap11',
      loseTo: 'derrota'
    },
    cap11: {
      title: '11. O Tridente das Marés',
      scene: 'No ponto mais fundo da cidade, o Tridente das Marés flutua sozinho sobre um pedestal de coral petrificado, brilhando como se ainda se lembrasse de comandar o oceano.',
      text: 'Você finalmente encontra o artefato que Atlântica escondeu por milênios. A pergunta não é mais se você consegue pegá-lo — é o que fazer com ele depois.',
      choices: [
        { text: 'Segurar o Tridente você mesmo', to: 'cap12', addItems: [{ id: 'tridente_mares', qty: 1 }], className: 'reward' },
        { text: 'Confiar o Tridente a Nereia, guardiã do jardim', to: 'cap12', flags: { tridente_nereia: true } }
      ]
    },
    cap12: {
      title: '12. A Cidade Afunda Novamente',
      scene: 'O chão treme. As torres cristalinas começam a ceder de volta para as profundezas, e a água que antes recuava agora avança rápido demais.',
      text: 'Atlântica está afundando de novo — desta vez, talvez para sempre. Você tem apenas minutos para escapar antes que a cidade inteira selecione quem fica e quem sai.',
      choices: [
        { text: 'Seguir pela rota segura que Kael mapeou', to: 'cap13', requiresFlag: 'traducao_correta', className: 'reward' },
        { text: 'Arriscar um atalho pelas ruínas em colapso', to: 'cap13', damage: 6, className: 'danger' }
      ]
    },
    cap13: {
      title: '13. O Destino de Atlântica',
      scene: 'Na superfície, o navio de expedição espera. Mas antes de subir a bordo, uma última decisão precisa ser tomada — uma que vai decidir o que Atlântica se torna.',
      text: 'Selar a cidade, revelar seu segredo ao mundo, ou reivindicar o poder que ela escondeu por tanto tempo. Qualquer escolha, a partir daqui, é definitiva.',
      choices: [
        { text: 'Selar Atlântica novamente e tornar-se seu novo Guardião', to: 'final_guardiao' },
        { text: 'Revelar a localização de Atlântica ao mundo', to: 'final_revelacao', requiresItem: 'mapa_nautico' },
        { text: 'Usar o Tridente para proteger os oceanos com justiça', to: 'final_tridente_justo', requiresItem: 'tridente_mares', requiresFlag: 'guardiao_aliado', className: 'reward' },
        { text: 'Usar o Tridente para dominar os mares', to: 'final_tridente_tirano', requiresItem: 'tridente_mares', className: 'danger' },
        { text: 'Destruir o Tridente para que seu poder nunca mais seja usado', to: 'final_sacrificio', requiresItem: 'tridente_mares', className: 'danger' }
      ]
    },
    final_guardiao: {
      title: 'Final: Guardião do Oceano',
      text: 'Você fica para trás quando o navio parte, observando Atlântica se acomodar de volta nas profundezas. A partir de hoje, os segredos da cidade têm um novo protetor — e o oceano, um novo guardião silencioso.',
      end: true
    },
    final_revelacao: {
      title: 'Final: O Mundo Descobre Atlântica',
      text: 'Com o mapa náutico em mãos, você guia o mundo até as coordenadas exatas. Atlântica se torna o maior achado arqueológico da história — mas também um alvo, agora que todos sabem exatamente onde procurar.',
      end: true
    },
    final_tridente_justo: {
      title: 'Final: O Poder do Tridente — Guardião Justo',
      text: 'Com o Tridente em mãos e a confiança do Guardião das Profundezas ao seu lado, você usa o poder dos mares para proteger, não para dominar. Tempestades se acalmam onde antes destruíam. Os oceanos ganham, enfim, alguém que escuta antes de comandar.',
      end: true
    },
    final_tridente_tirano: {
      title: 'Final: O Poder do Tridente — Tirano dos Mares',
      text: 'O poder do Tridente é vasto demais para dividir com paciência. Aos poucos, você deixa de proteger os oceanos e passa a governá-los. Os mares agora obedecem — e temem — quem um dia foi apenas um explorador entre tantos outros.',
      end: true
    },
    final_sacrificio: {
      title: 'Final: O Sacrifício',
      text: 'Você quebra o Tridente das Marés na pedra do pedestal. Atlântica afunda pela última vez, levando consigo qualquer chance de seu poder ser usado de novo — para o bem ou para o mal. O equilíbrio dos oceanos permanece, mas o preço foi a própria lenda.',
      end: true
    },
    derrota: {
      title: 'Derrota',
      text: 'As correntes escuras de Atlântica se fecham sobre você. A cidade guarda mais um segredo: o seu. Talvez, numa próxima expedição, alguém tenha mais sorte.',
      end: true
    }
  },
  items: {
    pao: { name: 'Pão de Viagem', type: 'consumable', heal: 4, desc: 'Restaura 4 de vida.' },
    pocao_vida: { name: 'Poção de Vida', type: 'consumable', heal: 12, desc: 'Restaura 12 de vida.' },
    orbe_arcano: { name: 'Orbe Arcano', type: 'class', desc: 'Item inicial do Mago.' },
    gazua: { name: 'Gazua', type: 'class', desc: 'Item inicial do Ladino.' },
    mapa_nautico: { name: 'Mapa Náutico', type: 'tool', desc: 'Marca a localização exata de Atlântica.' },
    faca_mergulho: { name: 'Faca de Mergulho', type: 'tool', desc: 'Uma lâmina curta, útil para cortar redes e corais.' },
    bussola_antiga: { name: 'Bússola Antiga', type: 'tool', desc: 'Aponta sempre para o coração da cidade submersa.' },
    mascara_mergulho: { name: 'Máscara de Mergulho Antiga', type: 'relic', desc: 'Pertenceu a um explorador que nunca voltou à superfície.' },
    chave_concha: { name: 'Chave de Concha', type: 'key', desc: 'Esculpida para abrir os mecanismos do Templo das Marés.' },
    cristal_atlante: { name: 'Cristal Atlante', type: 'treasure', desc: 'Um fragmento raro da arquitetura original de Atlântica.' },
    medalhao_oceanico: { name: 'Medalhão Oceânico', type: 'relic', desc: 'Dado pelo Rei Oceânico. Acalma criaturas antigas do fundo do mar.' },
    perola_luz: { name: 'Pérola da Luz', type: 'relic', desc: 'Brilha mesmo na escuridão mais profunda.' },
    armadura_coral: { name: 'Armadura Coral', type: 'armor', desc: 'Forjada com coral petrificado, endurecido por milênios sob pressão.' },
    tridente_mares: { name: 'Tridente das Marés', type: 'relic', desc: 'O artefato que Atlântica escondeu do mundo por milênios.' }
  }
};

export default aventura;
