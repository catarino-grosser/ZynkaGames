// Aventura comercial para Zynka RPG 3.0 — Mitologia • Fantasia • Aventura
// Coloque imagens em assets/img/ e áudios em assets/audio/ quando quiser ativar mídia real.

const aventura = {
  id: 'portal_dos_deuses',
  title: 'O Portal dos Deuses',
  icon: '⚡',
  genre: 'Mitologia e fantasia',
  difficulty: 'Média',
  estimatedTime: '60 a 90 min',
  desc: 'O Portal dos Deuses foi violado, e os reinos da mitologia grega, nórdica, egípcia, japonesa e asteca começam a colidir. Como novo Guardião do Portal, recupere cinco Relíquias Divinas e impeça o despertar do Devorador de Mundos antes que seja tarde demais.',
  start: 'cap01',
  maxChapters: 25,
  assets: {
    music: './assets/musicas/TrilhaHistorica.mp3',
    sfx: { click: '', attack: '', victory: '', item: '', levelup: '', puzzle: '' }
  },
  chapters: {
    cap01: {
      title: '1. O Despertar',
      image: '',
      scene: 'Um templo em ruínas se ilumina de dentro para fora. No centro, um arco de pedra pulsa com uma luz que não parece pertencer a este mundo.',
      text: 'Você não devia estar aqui a esta hora, mas alguma coisa o trouxe até este templo esquecido bem quando o Portal dos Deuses se abriu. Uma voz antiga ecoa das pedras, reconhecendo você como o novo Guardião — quer você queira o cargo ou não.',
      dialogue: {
        name: 'Guardião Antigo',
        portrait: '',
        lines: [
          'O selo que prendia o Devorador de Mundos está se rompendo. Os reinos vão colidir, e alguém precisa atravessá-los para restaurar o equilíbrio.',
          'Eu já dei tudo o que podia dar a esta tarefa. Agora é sua vez.'
        ]
      },
      choices: [
        { text: 'Aceitar a missão como novo Guardião', to: 'cap02', addItems: [{ id: 'amuleto_guardiao', qty: 1 }], xp: 8, className: 'reward' },
        { text: 'Tentar fugir do templo', to: 'cap02', damage: 4, className: 'danger' },
        { text: 'Investigar o templo antes de decidir', to: 'cap02', addItems: [{ id: 'mapa_reinos', qty: 1 }], xp: 6 }
      ]
    },
    cap02: {
      title: '2. Monte Olimpo',
      scene: 'Nuvens douradas sustentam colunas de mármore mais altas que qualquer construção humana. O ar cheira a ozônio e a néctar.',
      text: 'O Portal leva você direto ao topo do Olimpo, onde Zeus, Atena e Hermes discutem em voz alta. Criaturas do submundo invadiram o salão do trono e roubaram o Raio Sagrado enquanto os deuses ainda debatiam de quem era a culpa.',
      dialogue: {
        name: 'Zeus',
        portrait: '',
        lines: [
          'Um mortal, Guardião? Interessante escolha do velho templo. Prove seu valor: recupere meu raio das mãos daquela besta do submundo.'
        ]
      },
      sideQuest: { id: 'fenix_olimpo', title: 'A Fênix Aprisionada', desc: 'Hermes mencionou, discretamente, que a Fênix do Olimpo está presa em algum lugar entre os reinos. Encontre-a.' },
      enemy: { id: 'minotauro_olimpo', name: 'Minotauro do Submundo', hp: 26, atk: 6, def: 2, xp: 22, rewardGold: 12, rewardItems: [{ id: 'raio_zeus', qty: 1 }], image: '' },
      winTo: 'cap03',
      loseTo: 'derrota'
    },
    cap03: {
      title: '3. Asgard',
      scene: 'Um céu cinza e pesado cobre montanhas nevadas. Ao longe, o som de martelos batendo em gelo ecoa como um trovão constante.',
      text: 'O Portal leva você a Asgard, onde Thor enfrenta sozinho uma horda de gigantes de gelo avançando sobre as muralhas do reino.',
      dialogue: {
        name: 'Thor',
        portrait: '',
        lines: [
          'Guardião! Chegou bem a tempo — ou bem tarde, dependendo de como os próximos minutos correrem. Ajude-me a conter esses gigantes!'
        ]
      },
      enemy: { id: 'gigante_gelo', name: 'Gigante de Gelo', hp: 30, atk: 7, def: 3, xp: 25, rewardGold: 15, rewardItems: [{ id: 'mjolnir', qty: 1 }], image: '' },
      winTo: 'cap04',
      loseTo: 'derrota'
    },
    cap04: {
      title: '4. O Julgamento de Anúbis',
      scene: 'Um salão subterrâneo iluminado por tochas eternas. No centro, uma balança de ouro espera, com uma pena de avestruz em um dos pratos.',
      text: 'No Egito Antigo, Anúbis não deixa ninguém passar sem provar sua honestidade. Hieróglifos cobrem as paredes, formando uma pergunta que só quem realmente entende o peso de suas próprias ações consegue responder.',
      dialogue: {
        name: 'Anúbis',
        portrait: '',
        lines: ['Seu coração será pesado contra a pena da verdade. Responda com sinceridade, ou a balança decidirá por você.']
      },
      puzzle: {
        question: 'Segundo o julgamento, o que deve pesar menos que a pena da verdade para que uma alma passe?',
        answer: 'o coração',
        successText: 'A balança permanece em equilíbrio perfeito. Anúbis acena, satisfeito.',
        failText: 'A balança pende bruscamente, e uma dor aguda atravessa seu peito.',
        reward: { xp: 15, addItems: [{ id: 'chave_anubis', qty: 1 }] },
        damage: 5,
        setFlag: 'julgamento_anubis'
      },
      choices: [
        { text: 'Seguir para o Reino de Amaterasu', to: 'cap05' }
      ]
    },
    cap05: {
      title: '5. O Reino de Amaterasu',
      scene: 'Um Japão mitológico mergulhado em penumbra permanente. Sem a luz da deusa do Sol, sombras de yokais se movem livremente entre as árvores.',
      text: 'Amaterasu desapareceu, e sem ela o mundo perde o brilho aos poucos. Espíritos e yokais testam sua coragem a cada passo, mas o verdadeiro desafio é encontrar uma forma de trazer a luz de volta.',
      randomEvent: { chance: 0.35, text: 'Um yokai zombeteiro aparece das sombras e some antes que você reaja, levando um pouco da sua energia.', damage: 4 },
      puzzle: {
        question: 'Segundo a lenda, o que fez Amaterasu finalmente sair de sua caverna e devolver a luz ao mundo?',
        answer: 'curiosidade',
        successText: 'Um espelho encontrado no chão da floresta brilha com uma luz suave e constante.',
        failText: 'As sombras ao redor parecem engolir um pouco mais da pouca luz que resta.',
        reward: { xp: 15, addItems: [{ id: 'espelho_amaterasu', qty: 1 }] },
        damage: 4,
        setFlag: 'luz_devolvida'
      },
      choices: [
        { text: 'Seguir para o Templo Asteca', to: 'cap06' }
      ]
    },
    cap06: {
      title: '6. O Templo Asteca',
      scene: 'Uma pirâmide coberta de vegetação esconde armadilhas antigas em cada degrau. No topo, uma serpente emplumada de pedra parece observar cada movimento.',
      text: 'Guerreiros ancestrais despertam para proteger o último fragmento entre as cinco Relíquias Divinas. Passar por eles é a única forma de alcançar a Máscara de Quetzalcóatl.',
      enemy: { id: 'guerreiros_serpente', name: 'Guerreiros da Serpente Emplumada', hp: 32, atk: 7, def: 3, xp: 28, rewardGold: 16, rewardItems: [{ id: 'mascara_quetzalcoatl', qty: 1 }], image: '' },
      winTo: 'cap07',
      loseTo: 'derrota'
    },
    cap07: {
      title: '7. A Guerra dos Deuses',
      scene: 'Um salão neutro entre reinos, criado apressadamente para uma reunião que já começa mal. Cada panteão culpa os outros pela ruptura do Portal.',
      text: 'Zeus culpa os nórdicos. Thor culpa os egípcios. Ninguém quer assumir responsabilidade, e o tempo para deter o Devorador está se esgotando enquanto os deuses discutem.',
      choices: [
        { text: 'Apoiar abertamente uma das divindades', to: 'cap08', flags: { apoiou_divindade: true }, xp: 10 },
        { text: 'Tentar convencer todos a cooperarem', to: 'cap08', flags: { uniu_deuses: true }, xp: 15, className: 'reward' },
        { text: 'Permanecer neutro e seguir em frente', to: 'cap08', flags: { neutro: true } }
      ]
    },
    cap08: {
      title: '8. O Labirinto Celestial',
      scene: 'Um labirinto flutuante conecta todos os cinco reinos ao mesmo tempo. Cada porta parece levar a um lugar — ou a uma época — diferente.',
      text: 'Entre os corredores impossíveis do labirinto, um brilho dourado chama sua atenção: uma gaiola de luz, esquecida entre duas portas, prendendo algo que definitivamente não deveria estar preso.',
      treasure: { id: 'fenix_presa', text: '✨ Libertar a criatura presa na gaiola de luz', reward: { addItems: [{ id: 'pena_fenix', qty: 1 }], xp: 10 } },
      puzzle: {
        question: 'Das cinco portas do labirinto, qual sempre leva de volta ao início: a mais brilhante, a mais escura, ou a que não tem maçaneta?',
        answer: 'a que não tem maçaneta',
        successText: 'Você evita a porta errada e segue direto para o coração do labirinto.',
        failText: 'Uma porta se fecha atrás de você com força, arrastando-o contra a parede.',
        reward: { xp: 15 },
        damage: 5,
        setFlag: 'labirinto_resolvido'
      },
      choices: [
        { text: 'Levar a Fênix libertada e seguir em frente', to: 'cap09', requiresItem: 'pena_fenix', completeSideQuest: 'fenix_olimpo', sideQuestReward: { xp: 20, gold: 15 }, className: 'reward' },
        { text: 'Seguir em frente sem se desviar mais', to: 'cap09' }
      ]
    },
    cap09: {
      title: '9. As Cinco Relíquias',
      scene: 'No centro do labirinto, um altar circular espera. Cada relíquia que você carrega pulsa levemente ao se aproximar dele.',
      text: 'Raio de Zeus, Mjölnir, Chave de Anúbis, Espelho de Amaterasu, Máscara de Quetzalcóatl — juntas, essas relíquias são a única chave capaz de abrir o Portal Final antes que o selo se rompa por completo.',
      choices: [
        { text: 'Depositar as relíquias no altar e abrir o Portal Final', to: 'cap10' }
      ]
    },
    cap10: {
      title: '10. O Devorador Desperta',
      scene: 'O Portal Final se abre para um vazio que não deveria existir dentro da realidade. De dentro dele, uma presença antiga finalmente acorda.',
      text: 'Mesmo com as cinco relíquias reunidas, o selo enfraquece rápido demais. O Devorador de Mundos não é um deus, nem um monstro — é o que existia antes de qualquer um dos dois, e os deuses o selaram há eras para que ninguém mais precisasse descobrir isso.',
      dialogue: {
        name: 'Guardião Antigo',
        portrait: '',
        lines: [
          'Os deuses não criaram o Devorador. Eles o encontraram, já acordado, devorando tudo o que existia antes deles mesmos.',
          'Selar não foi covardia. Foi a única vitória possível. Agora é sua vez de escolher como continuar essa vitória.'
        ]
      },
      choices: [
        { text: 'Avançar para a Batalha Divina', to: 'cap11' }
      ]
    },
    cap11: {
      title: '11. Batalha Divina',
      scene: 'Todos os panteões, ainda que a contragosto, unem forças diante de uma ameaça maior que qualquer rivalidade entre eles.',
      text: 'Zeus, Thor, Anúbis, Amaterasu e Quetzalcóatl lutam ao seu lado, mas cabe a você liderar o combate. Cada escolha durante a batalha decide quem resiste até o fim.',
      enemy: { id: 'devorador_mundos', name: 'O Devorador de Mundos', hp: 55, atk: 10, def: 4, xp: 60, rewardGold: 35, rewardItems: [{ id: 'pocao_vida', qty: 2 }], image: '' },
      winTo: 'cap12',
      loseTo: 'derrota'
    },
    cap12: {
      title: '12. O Novo Guardião',
      scene: 'Com o Devorador contido novamente, o Portal dos Deuses pulsa, instável, esperando por uma decisão final sobre o que ele deve se tornar.',
      text: 'O selo pode ser refeito de várias formas. Cada uma delas muda para sempre a relação entre os deuses, os reinos e a humanidade — e cabe a você, o Guardião escolhido, decidir qual caminho seguir.',
      choices: [
        { text: 'Convencer os deuses a cooperarem em paz duradoura', to: 'final_uniao_divina', requiresFlag: 'uniu_deuses', className: 'reward' },
        { text: 'Absorver o poder das relíquias e tornar-se uma nova divindade', to: 'final_novo_deus', requiresItem: 'mascara_quetzalcoatl', className: 'danger' },
        { text: 'Aceitar que os panteões continuarão em conflito, mas o mundo está salvo', to: 'final_guerra_eterna' },
        { text: 'Destruir o Portal para sempre, encerrando a era dos deuses', to: 'final_fim_dos_deuses', requiresItem: 'amuleto_guardiao', className: 'danger' }
      ]
    },
    final_uniao_divina: {
      title: '13. O Destino dos Reinos — União Divina',
      text: 'Contra todas as expectativas, os deuses aceitam cooperar. O Portal é restaurado, os reinos permanecem separados, mas pela primeira vez em eras, em paz uns com os outros.\n\nA humanidade nunca saberá o quão perto esteve do fim — só vai notar que, de alguma forma, o mundo parece um pouco mais equilibrado.',
      end: true
    },
    final_novo_deus: {
      title: '13. O Destino dos Reinos — Novo Deus',
      text: 'Você absorve o poder das cinco relíquias, uma a uma. A dor dá lugar a algo maior do que qualquer nome mortal consegue descrever. Você ascende como uma nova divindade, o Guardião eterno do Portal.\n\nOs outros deuses o tratam agora como igual — alguns com respeito, outros com um medo que nunca vão admitir em voz alta.',
      end: true
    },
    final_guerra_eterna: {
      title: '13. O Destino dos Reinos — Guerra Eterna',
      text: 'O Devorador foi derrotado, e isso já é mais do que a maioria esperava conseguir. Mas os panteões continuam divididos, cada um convencido de que os outros são o verdadeiro problema.\n\nO mundo está salvo, por enquanto. Mas o Portal segue instável, e alguém, algum dia, vai ter que lidar com essa guerra que nunca termina de verdade.',
      end: true
    },
    final_fim_dos_deuses: {
      title: '13. O Destino dos Reinos — O Fim dos Deuses',
      text: 'Você quebra o Amuleto do Guardião sobre o Portal, e a estrutura inteira desmorona em silêncio. Os deuses perdem, para sempre, o acesso ao mundo dos mortais.\n\nSuas eras chegam ao fim. A humanidade, pela primeira vez em milênios, segue seu próprio destino — sem saber exatamente o que foi embora junto com o Portal.',
      end: true
    },
    derrota: {
      title: 'Derrota',
      text: 'O Devorador de Mundos consome mais do que apenas você. Em algum lugar entre os reinos, o Portal continua se rompendo, sem ninguém para impedir o que vem a seguir.',
      end: true
    }
  },
  items: {
    pao: { name: 'Pão dos Viajantes', type: 'consumable', heal: 4, desc: 'Restaura 4 de vida.' },
    pocao_vida: { name: 'Néctar Divino', type: 'consumable', heal: 12, desc: 'Restaura 12 de vida.' },
    orbe_arcano: { name: 'Orbe Arcano', type: 'class', desc: 'Item inicial do Mago.' },
    gazua: { name: 'Gazua', type: 'class', desc: 'Item inicial do Ladino.' },
    amuleto_guardiao: { name: 'Amuleto do Guardião', type: 'relic', desc: 'Símbolo da escolha do Guardião Antigo. Liga você diretamente ao Portal.' },
    espada_cerimonial: { name: 'Espada Cerimonial', type: 'weapon', desc: 'Forjada para rituais, mas afiada o bastante para lutas de verdade.' },
    mapa_reinos: { name: 'Mapa dos Reinos', type: 'tool', desc: 'Mostra as passagens conhecidas entre os cinco panteões.' },
    raio_zeus: { name: 'Raio de Zeus', type: 'relic', desc: 'Uma das cinco Relíquias Divinas. Pulsa com energia grega bruta.' },
    mjolnir: { name: 'Mjölnir (Martelo de Thor)', type: 'relic', desc: 'Uma das cinco Relíquias Divinas. Pesado demais para mãos comuns.' },
    chave_anubis: { name: 'Chave de Anúbis', type: 'relic', desc: 'Uma das cinco Relíquias Divinas. Abre passagens entre a vida e a morte.' },
    espelho_amaterasu: { name: 'Espelho de Amaterasu', type: 'relic', desc: 'Uma das cinco Relíquias Divinas. Reflete uma luz que nunca se apaga.' },
    mascara_quetzalcoatl: { name: 'Máscara de Quetzalcóatl', type: 'relic', desc: 'Uma das cinco Relíquias Divinas. Representa sabedoria e renovação.' },
    pena_fenix: { name: 'Pena da Fênix', type: 'quest', desc: 'Deixada para trás pela Fênix libertada do Labirinto Celestial.' }
  }
};

export default aventura;
