// Aventura comercial para Zynka RPG 3.0 — Fantasia • Aventura • Mistério
// Coloque imagens em assets/img/ e áudios em assets/audio/ quando quiser ativar mídia real.

const aventura = {
  id: 'floresta_proibida',
  title: 'A Floresta Proibida',
  icon: '🌲',
  genre: 'Fantasia mística',
  difficulty: 'Média',
  estimatedTime: '60 a 90 min',
  desc: 'Aldeias somem sem deixar vestígios perto da lendária Floresta Proibida. Enviado pelo Conselho dos Reinos para investigar, você descobre que a floresta não é maligna — ela protege o Coração de Gaia, um artefato capaz de controlar toda a natureza, de quem não é digno dele.',
  start: 'cap01',
  maxChapters: 25,
  assets: {
    music: '',
    sfx: { click: '', attack: '', victory: '', item: '', levelup: '', puzzle: '' }
  },
  chapters: {
    cap01: {
      title: '1. O Portão de Carvalho',
      image: '',
      scene: 'Um arco de carvalho retorcido marca a entrada da floresta. Além dele, a luz do sol já não parece alcançar o chão.',
      text: 'Aldeias inteiras desaparecem perto daqui, sem vestígio nenhum. O Conselho dos Reinos enviou você para descobrir por quê — e o único aviso que recebeu até agora veio de um velho druida sentado sobre uma pedra coberta de musgo.',
      dialogue: {
        name: 'Velho Druida',
        portrait: '',
        lines: [
          'A floresta observa todos que entram. Ela não julga por maldade, mas por intenção. Cuidado com o que você deseja encontrar lá dentro.'
        ]
      },
      effect: { addItems: [{ id: 'mochila', qty: 1 }] },
      choices: [
        { text: 'Seguir pela trilha principal', to: 'cap02', addItems: [{ id: 'mapa_antigo', qty: 1 }], xp: 6, className: 'reward' },
        { text: 'Entrar pela mata fechada', to: 'cap02', addItems: [{ id: 'espada_curta', qty: 1 }], damage: 3, className: 'danger' },
        { text: 'Conversar mais com o druida', to: 'cap02', addItems: [{ id: 'cantil', qty: 1 }], xp: 8, className: 'reward' }
      ]
    },
    cap02: {
      title: '2. A Floresta Viva',
      scene: 'As árvores ao redor parecem mudar de posição quando você não está olhando diretamente para elas. A trilha que você seguia até agora simplesmente não está mais lá.',
      text: 'Orientar-se aqui exige entender a lógica da própria floresta, não apenas seguir um mapa comum.',
      randomEvent: { chance: 0.3, text: 'Uma chuva fina e morna cai por um instante entre as copas, sem motivo aparente — e você se sente estranhamente revigorado.', reward: { hp: 5 } },
      puzzle: {
        question: 'Se o musgo cresce sempre no lado mais úmido das árvores, e o vento aqui sopra sempre do rio para a montanha, de que lado do tronco o musgo aponta o caminho de volta ao rio?',
        answer: 'o lado com mais musgo',
        successText: 'Seguindo o musgo, o caminho certo finalmente se revela entre as árvores.',
        failText: 'Você se perde ainda mais, tropeçando em raízes que parecem se mover sozinhas.',
        reward: { xp: 15 },
        damage: 4,
        setFlag: 'orientacao_floresta'
      },
      choices: [
        { text: 'Seguir até o lago à frente', to: 'cap03' }
      ]
    },
    cap03: {
      title: '3. As Fadas do Lago',
      scene: 'Um lago perfeitamente cristalino reflete uma luz que não vem do céu. Pequenas fadas voam baixo sobre a água, brincando com um cristal que brilha entre as pedras da margem.',
      text: 'Elas notam sua presença quase imediatamente. O que você faz a seguir vai definir bastante sobre como a floresta inteira vai te tratar dali para frente.',
      choices: [
        { text: 'Ajudar as fadas a libertar o cristal preso nas pedras', to: 'cap04', addItems: [{ id: 'cristal_natureza', qty: 1 }], flags: { afinidade_alta: true }, xp: 15, className: 'reward' },
        { text: 'Ignorar as fadas e seguir seu caminho', to: 'cap04' },
        { text: 'Roubar o cristal mágico enquanto elas não percebem', to: 'cap04', addItems: [{ id: 'cristal_natureza', qty: 1 }], flags: { afinidade_baixa: true }, damage: 4, className: 'danger' }
      ]
    },
    cap04: {
      title: '4. A Ponte das Raízes',
      scene: 'Uma ponte viva, feita inteiramente de raízes entrelaçadas, se estende sobre um desfiladeiro profundo. Ela parece decidir, por conta própria, quem merece atravessar.',
      text: 'As raízes se movem devagar, formando e desfazendo padrões no ar. Só quem entender a lógica por trás disso vai conseguir atravessar sem que a ponte se feche pela metade.',
      puzzle: {
        question: 'As raízes sempre se abrem para quem se move na mesma velocidade da floresta ao redor. Você deve atravessar rápido, devagar, ou no ritmo da respiração da própria mata?',
        answer: 'no ritmo da respiração da propria mata',
        successText: 'A ponte se abre suavemente, reconhecendo o ritmo certo.',
        failText: 'As raízes se contraem de repente, quase derrubando você no desfiladeiro.',
        reward: { xp: 15, addItems: [{ id: 'chave_raizes', qty: 1 }] },
        damage: 5,
        setFlag: 'ponte_atravessada'
      },
      choices: [
        { text: 'Atravessar e continuar a jornada', to: 'cap04_batalha' }
      ]
    },
    cap04_batalha: {
      title: '4. Guardiãs da Ponte',
      text: 'Do outro lado da ponte, Ents corrompidos pela névoa da floresta bloqueiam a passagem, galhos afiados como lâminas.',
      enemy: { id: 'ents_corrompidos', name: 'Ents Corrompidos', hp: 28, atk: 6, def: 3, xp: 24, rewardGold: 12, rewardItems: [{ id: 'pocao_cura', qty: 1 }], image: '' },
      winTo: 'cap05',
      loseTo: 'derrota'
    },
    cap05: {
      title: '5. A Vila Esquecida',
      scene: 'Uma antiga vila humana foi completamente tomada pela vegetação, telhados afundados sob raízes e flores silvestres. Ainda assim, fumaça sobe de uma chaminé escondida.',
      text: 'Alguns sobreviventes se esconderam aqui, vivendo entre os escombros cobertos de plantas. Entre eles, uma arqueira élfica observa você com cautela antes de baixar o arco.',
      dialogue: {
        name: 'Lyra',
        portrait: '',
        lines: [
          'Você não parece um dos mercenários do rei. Isso já é alguma coisa a seu favor.',
          'Se está mesmo tentando entender a floresta, procure as cinco sementes sagradas nas Cavernas Luminosas. Elas guardam mais verdade do que qualquer mapa.'
        ]
      },
      sideQuest: { id: 'sementes_sagradas', title: 'As Cinco Sementes Sagradas', desc: 'Lyra falou sobre sementes sagradas escondidas nas Cavernas Luminosas. Encontrá-las pode revelar segredos importantes sobre a floresta.' },
      choices: [
        { text: 'Convidar Lyra para se juntar à jornada', to: 'cap06', addItems: [{ id: 'arco_elfico', qty: 1 }], xp: 10, className: 'reward' },
        { text: 'Seguir sozinho, deixando os sobreviventes em segurança', to: 'cap06' }
      ]
    },
    cap06: {
      title: '6. O Bosque dos Espíritos',
      scene: 'Névoa espessa cobre um bosque silencioso. Vultos translúcidos de antigos guardiões da floresta observam cada passo seu, como se pesassem algo invisível.',
      text: 'Os espíritos ancestrais não julgam por palavras — eles sentem a intenção por trás de cada escolha que você já fez desde que entrou na floresta.',
      choices: [
        { text: 'Deixar que os espíritos reconheçam seu respeito pela floresta', to: 'cap07', requiresFlag: 'afinidade_alta', addItems: [{ id: 'semente_ancestral', qty: 1 }], xp: 18, className: 'reward' },
        { text: 'Enfrentar os espíritos que desconfiam de você', to: 'cap06_batalha', requiresFlag: 'afinidade_baixa' },
        { text: 'Pedir para provar seu valor de outra forma', to: 'cap07', damage: 3, className: 'danger' }
      ]
    },
    cap06_batalha: {
      title: '6. O Julgamento Hostil',
      text: 'Os espíritos, corrompidos pela desconfiança que você despertou, avançam como sombras afiadas em direção a você.',
      enemy: { id: 'espiritos_corrompidos', name: 'Espíritos Corrompidos', hp: 26, atk: 6, def: 2, xp: 22, rewardGold: 10, image: '' },
      winTo: 'cap07',
      loseTo: 'derrota'
    },
    cap07: {
      title: '7. A Árvore Milenar',
      scene: 'A maior árvore que você já viu se ergue no centro da floresta, tão alta que o topo desaparece entre nuvens baixas. Em sua base, um portal de luz verde pulsa devagar.',
      text: 'Eldrin, o Guardião da Floresta, espera junto ao portal — um druida com séculos de idade, cansado, mas ainda firme.',
      dialogue: {
        name: 'Eldrin',
        portrait: '',
        lines: [
          'Você chegou mais longe do que a maioria. Isso significa que a floresta ainda não decidiu que você é uma ameaça.',
          'O que ela protege é muito maior do que um tesouro qualquer. É o Coração de Gaia — e ele está prestes a ser disputado por gente que não devia nem saber que ele existe.'
        ]
      },
      choices: [
        { text: 'Seguir para as Cavernas Luminosas', to: 'cap08' }
      ]
    },
    cap08: {
      title: '8. As Cavernas Luminosas',
      scene: 'Cristais gigantes iluminam um sistema de cavernas subterrâneas, refletindo luz em ângulos que parecem quase organizados de propósito.',
      text: 'Um anão carregando ferramentas de mineração examina as paredes com cuidado, claramente à procura de algo específico.',
      dialogue: {
        name: 'Borin',
        portrait: '',
        lines: ['Essas paredes escondem passagens que só se abrem com a luz certa. Se está atrás das sementes sagradas, preste atenção nos reflexos.']
      },
      puzzle: {
        question: 'Para abrir a passagem secreta, o reflexo do cristal central deve apontar para: a entrada da caverna, o teto, ou a parede mais escura?',
        answer: 'a parede mais escura',
        successText: 'A parede escura desliza para o lado, revelando uma câmara escondida cheia de pequenas sementes brilhantes.',
        failText: 'Os cristais piscam fora de sincronia, e um pedaço do teto racha, deixando cair pedras.',
        reward: { xp: 18 },
        damage: 5,
        setFlag: 'cavernas_resolvidas'
      },
      choices: [
        { text: 'Reunir as sementes com respeito pelo ritual da floresta', to: 'cap09', requiresFlag: 'afinidade_alta', completeSideQuest: 'sementes_sagradas', sideQuestReward: { xp: 25, gold: 15 }, flags: { digno_rainha_fadas: true }, className: 'reward' },
        { text: 'Coletar as sementes rapidamente, sem cerimônia', to: 'cap09', completeSideQuest: 'sementes_sagradas', sideQuestReward: { xp: 20, gold: 10 } }
      ]
    },
    cap09: {
      title: '9. O Exército Sombrio',
      scene: 'Fumaça de tochas surge entre as árvores. Mercenários contratados pelo Rei Valerius avançam floresta adentro, armados e decididos a encontrar o Coração de Gaia a qualquer custo.',
      text: 'Você tem segundos para decidir de que lado vai ficar — se é que vai escolher um lado.',
      choices: [
        { text: 'Defender a floresta dos mercenários', to: 'cap09_batalha', flags: { defendeu_floresta: true } },
        { text: 'Ajudar os invasores a encontrar o caminho', to: 'cap10', flags: { ajudou_invasores: true }, gold: 20, damage: 3, className: 'danger' },
        { text: 'Permanecer neutro e observar de longe', to: 'cap10', flags: { neutro_exercito: true } }
      ]
    },
    cap09_batalha: {
      title: '9. Batalha pela Floresta',
      text: 'Os mercenários não estão interessados em negociar. A luta começa entre as árvores antes mesmo que você termine de decidir sua estratégia.',
      enemy: { id: 'mercenarios_reais', name: 'Mercenários Reais', hp: 32, atk: 7, def: 3, xp: 28, rewardGold: 18, rewardItems: [{ id: 'machado_runico', qty: 1 }], image: '' },
      winTo: 'cap10',
      loseTo: 'derrota'
    },
    cap10: {
      title: '10. O Dragão Verde',
      scene: 'Uma caverna profunda esconde o último dragão da floresta, escamas verdes quase se confundindo com a vegetação ao redor. Ele desperta assim que você se aproxima.',
      text: 'Seus olhos brilham em julgamento silencioso. Por um instante, parece que ele vai atacar sem hesitar — mas há algo em sua postura que sugere um teste, não apenas uma ameaça.',
      dialogue: {
        name: 'Dragão Esmeralda',
        portrait: '',
        lines: ['Muitos chegam até aqui buscando poder. Poucos chegam prontos para provar que merecem sair vivos daqui. Vamos ver do que você é feito.']
      },
      enemy: { id: 'dragao_esmeralda', name: 'Dragão Esmeralda', hp: 44, atk: 9, def: 4, xp: 45, rewardGold: 25, rewardItems: [{ id: 'manto_folhas', qty: 1 }], image: '' },
      winTo: 'cap11',
      loseTo: 'derrota'
    },
    cap11: {
      title: '11. O Coração de Gaia',
      scene: 'No centro absoluto da floresta, uma esfera pulsante de luz verde e dourada flutua sobre um altar de pedra coberto de vinhas. O Dragão Esmeralda, agora aliado, observa de longe.',
      text: 'O Coração de Gaia tem consciência própria — e não vai entregar seu poder para quem simplesmente chegar até ele. Só para quem provar, de verdade, o que pretende fazer com essa força.',
      dialogue: {
        name: 'Coração de Gaia',
        portrait: '',
        lines: ['Todo poder tem um preço. Antes de tocar em mim, responda: o que você protege quando ninguém está olhando?']
      },
      puzzle: {
        question: 'Segundo a pergunta do Coração de Gaia, o que realmente prova o valor de alguém: o que faz quando é visto, ou o que faz quando ninguém está olhando?',
        answer: 'o que faz quando ninguem esta olhando',
        successText: 'A esfera pulsa suavemente, como se aceitasse sua resposta.',
        failText: 'Uma pontada de energia percorre seu corpo, como um aviso.',
        reward: { xp: 20, addItems: [{ id: 'coracao_gaia', qty: 1 }] },
        damage: 5,
        setFlag: 'digno_coracao'
      },
      choices: [
        { text: 'Segurar o Coração de Gaia e decidir seu destino', to: 'cap12' }
      ]
    },
    cap12: {
      title: '12. A Escolha',
      scene: 'O Coração de Gaia pulsa nas suas mãos, esperando. Eldrin, Lyra e o Dragão Esmeralda observam em silêncio — essa decisão é só sua.',
      text: 'Existem vários futuros possíveis a partir daqui. Nenhum deles pode ser desfeito depois de escolhido.',
      choices: [
        { text: 'Entregar o Coração de Gaia ao Rei Valerius, negociando proteção para a floresta', to: 'final_reino_verde' },
        { text: 'Destruir o Coração de Gaia para sempre', to: 'final_destruicao', className: 'danger' },
        { text: 'Tornar-se o novo Guardião da Floresta', to: 'final_guardiao_natureza', className: 'reward' },
        { text: 'Usar o poder do Coração de Gaia para controlar a natureza você mesmo', to: 'final_poder_absoluto', className: 'danger' },
        { text: 'Devolver o Coração à floresta, confiando em seu equilíbrio natural', to: 'final_rainha_fadas', requiresFlag: 'digno_rainha_fadas', className: 'reward' }
      ]
    },
    final_reino_verde: {
      title: '13. A Nova Era — O Reino Verde',
      text: 'Contra todas as expectativas, o Rei Valerius aceita os termos: o Coração de Gaia permanece protegido, e a floresta ganha reconhecimento oficial do reino.\n\nHumanos e criaturas mágicas passam a dividir a mesma terra, com cuidado e, aos poucos, com confiança.',
      end: true
    },
    final_destruicao: {
      title: '13. A Nova Era — A Destruição',
      text: 'O Coração de Gaia se apaga nas suas mãos, sua luz verde desaparecendo devagar. A floresta começa a murchar quase imediatamente, levando consigo espécies e lendas que nunca mais vão existir.\n\nNinguém mais vai brigar por esse poder. Esse já não é um consolo pequeno — mas também não é uma vitória.',
      end: true
    },
    final_guardiao_natureza: {
      title: '13. A Nova Era — Guardião da Natureza',
      text: 'Você entrega sua vida antiga para proteger o Coração de Gaia para sempre, tornando-se o novo Guardião da Floresta ao lado de Eldrin.\n\nA paz reina por gerações entre as árvores. Seu nome, com o tempo, vira lenda — a mesma que algum dia trouxe outro aventureiro até aqui.',
      end: true
    },
    final_poder_absoluto: {
      title: '13. A Nova Era — O Poder Absoluto',
      text: 'Você aceita o poder do Coração de Gaia para si mesmo. As florestas crescem sem limites, engolindo estradas, campos e, aos poucos, cidades inteiras.\n\nO equilíbrio que a floresta tanto protegia se rompe — só que agora, na direção oposta.',
      end: true
    },
    final_rainha_fadas: {
      title: '13. A Nova Era — A Rainha das Fadas',
      text: 'Você devolve o Coração de Gaia à própria floresta, confiando nela como ela, silenciosamente, confiou em você durante toda a jornada. A resposta vem em forma de luz: a Rainha das Fadas desperta depois de eras adormecida.\n\nA floresta se restaura por completo, e uma nova era de prosperidade começa entre todos os povos — humanos, criaturas mágicas e tudo o que vive entre as raízes.',
      end: true
    },
    derrota: {
      title: 'Derrota',
      text: 'A Floresta Proibida reivindica mais um aventureiro perdido entre suas raízes. O Coração de Gaia continua esperando, em silêncio, pelo próximo que ousar chegar até ele.',
      end: true
    }
  },
  items: {
    pao: { name: 'Frutas Silvestres', type: 'consumable', heal: 4, desc: 'Restaura 4 de vida.' },
    pocao_cura: { name: 'Poção da Cura', type: 'consumable', heal: 12, desc: 'Restaura 12 de vida.' },
    orbe_arcano: { name: 'Orbe Arcano', type: 'class', desc: 'Item inicial do Mago.' },
    gazua: { name: 'Gazua', type: 'class', desc: 'Item inicial do Ladino.' },
    mochila: { name: 'Mochila', type: 'gear', desc: 'Carrega o essencial para uma longa jornada pela floresta.' },
    mapa_antigo: { name: 'Mapa Antigo', type: 'tool', desc: 'Mostra trilhas que talvez nem existam mais.' },
    espada_curta: { name: 'Espada Curta', type: 'weapon', desc: 'Leve e rápida, ideal para os espaços fechados da mata.' },
    cantil: { name: 'Cantil', type: 'tool', desc: 'Água limpa é rara em lugares onde os rios mudam de lugar.' },
    cristal_natureza: { name: 'Cristal da Natureza', type: 'relic', desc: 'Pulsa com a mesma energia das fadas do lago.' },
    chave_raizes: { name: 'Chave das Raízes', type: 'key', desc: 'Formada pela própria ponte viva. Abre passagens que reconhecem a floresta.' },
    arco_elfico: { name: 'Arco Élfico', type: 'weapon', desc: 'Presente de Lyra, feito para caçar sem nunca desperdiçar uma flecha.' },
    semente_ancestral: { name: 'Semente Ancestral', type: 'relic', desc: 'Concedida pelos espíritos do bosque a quem eles reconhecem como digno.' },
    machado_runico: { name: 'Machado Rúnico', type: 'weapon', desc: 'Recuperado dos mercenários reais, gravado com símbolos que não são deste reino.' },
    manto_folhas: { name: 'Manto das Folhas', type: 'gear', desc: 'Tecido com folhas que nunca murcham, dado pelo Dragão Esmeralda.' },
    coracao_gaia: { name: 'Coração de Gaia', type: 'relic', desc: 'O artefato ancestral capaz de controlar toda a natureza.' }
  }
};

export default aventura;
