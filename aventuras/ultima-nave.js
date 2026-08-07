// Aventura comercial para Zynka RPG 3.0 — Ficção Científica • Exploração Espacial • Aventura • Sobrevivência
// Coloque imagens em assets/img/ e áudios em assets/audio/ quando quiser ativar mídia real.

const aventura = {
  id: 'ultima_nave',
  title: 'A Última Nave',
  icon: '🚀',
  genre: 'Ficção científica espacial',
  difficulty: 'Difícil',
  estimatedTime: '70 a 100 min',
  desc: 'Em 2478, a Terra tornou-se inabitável. Você desperta 327 anos depois como novo comandante da Arca Interestelar Aurora, desviada para uma região desconhecida da galáxia — com algo a bordo que fez a tripulação desaparecer.',
  start: 'cap01',
  maxChapters: 25,
  assets: {
    music: './assets/musicas/trilhaficcaocientifica.mp3',
    sfx: { click: '', attack: '', victory: '', item: '', levelup: '', puzzle: '' }
  },
  chapters: {
    cap01: {
      title: '1. O Despertar',
      image: '',
      scene: 'A cápsula de animação suspensa se abre com um sopro de vapor frio. Luzes de emergência piscam fracamente pela enfermaria vazia.',
      text: 'Trezentos e vinte e sete anos. É esse o tempo que você passou em estase, e é esse o número que pisca na tela ao lado da sua cápsula. A energia da nave está em nível crítico, e não há sinal de mais ninguém por perto.',
      effect: { addItems: [{ id: 'kit_medico', qty: 1 }] },
      choices: [
        { text: 'Tentar restaurar os sistemas principais', to: 'cap02', addItems: [{ id: 'cartao_acesso', qty: 1 }], xp: 6, className: 'reward' },
        { text: 'Procurar outros sobreviventes primeiro', to: 'cap02', addItems: [{ id: 'lanterna_tatica', qty: 1 }], xp: 6, className: 'reward' },
        { text: 'Ir direto até a ponte de comando', to: 'cap02', addItems: [{ id: 'tablet_comando', qty: 1 }], xp: 6, className: 'reward' }
      ]
    },
    cap02: {
      title: '2. Ponte de Comando',
      scene: 'Painéis de controle cercam uma ponte quase vazia. Uma voz calma preenche o silêncio assim que você entra.',
      text: 'A inteligência artificial da nave, AURORA, informa que o contato com a Terra foi perdido há séculos, e que a Aurora foi desviada de sua rota original por motivos que ela ainda está processando.',
      dialogue: {
        name: 'AURORA',
        portrait: '',
        lines: [
          'Bem-vindo de volta, comandante. Grande parte da tripulação original não está mais a bordo. Recomendo cautela ao explorar os setores danificados.',
          'Assumo que você vai querer verificar minhas informações por conta própria. É uma resposta razoável, considerando as circunstâncias.'
        ]
      },
      choices: [
        { text: 'Confiar nas informações de AURORA sem questionar', to: 'cap03', flags: { aurora_confiavel: true }, xp: 10, className: 'reward' },
        { text: 'Verificar os registros da nave por conta própria antes de confiar', to: 'cap03', flags: { aurora_verificada: true }, xp: 10 }
      ]
    },
    cap03: {
      title: '3. Setor de Engenharia',
      scene: 'Cabos soltos e painéis abertos cobrem o setor inteiro. Faíscas saltam de um reator parcialmente exposto.',
      text: 'Sem reparos, a nave não aguenta muito mais tempo. Um homem coberto de graxa trabalha freneticamente entre os cabos, tentando estabilizar o que resta do sistema.',
      dialogue: {
        name: 'Marcus Holt',
        portrait: '',
        lines: [
          'Comandante! Bom ver alguém do comando ainda de pé. Preciso de ajuda para redistribuir a energia antes que percamos o setor inteiro.',
          'Ah, e se encontrar sinais de cápsulas criogênicas perdidas por aí, avise. Temos gente desaparecida que pode ainda estar viva, presa em algum lugar da nave.'
        ]
      },
      sideQuest: { id: 'capsulas_perdidas', title: 'Cápsulas Criogênicas Perdidas', desc: 'Marcus Holt pediu para você ficar atento a sinais de cápsulas criogênicas perdidas pela nave — podem existir sobreviventes ainda presos nelas.' },
      puzzle: {
        question: 'Para redistribuir a energia sem sobrecarregar o reator, o que deve ser priorizado primeiro: motores, suporte à vida, ou escudos?',
        answer: 'suporte a vida',
        successText: 'A energia se redistribui de forma estável. O reator para de faiscar.',
        failText: 'Uma sobrecarga rápida atravessa o painel, e uma descarga elétrica atinge você.',
        reward: { xp: 15, addItems: [{ id: 'ferramenta_multifuncional', qty: 1 }] },
        damage: 4,
        setFlag: 'energia_estabilizada'
      },
      choices: [
        { text: 'Seguir para os Jardins Hidropônicos', to: 'cap04' }
      ]
    },
    cap04: {
      title: '4. Jardins Hidropônicos',
      scene: 'Fileiras de plantas cultivadas em soluções nutritivas deveriam alimentar toda a tripulação. Parte delas agora está coberta por uma vegetação estranha, pulsante, definitivamente não terrestre.',
      text: 'Organismos alienígenas se infiltraram no sistema hidropônico e estão se espalhando rápido. Se não forem contidos, a Aurora perde sua principal fonte de alimento.',
      enemy: { id: 'plantas_alienigenas', name: 'Plantas Alienígenas', hp: 26, atk: 6, def: 2, xp: 22, rewardGold: 12, rewardItems: [{ id: 'pistola_plasma', qty: 1 }], image: '' },
      winTo: 'cap05',
      loseTo: 'derrota'
    },
    cap05: {
      title: '5. O Hangar',
      scene: 'Fileiras de pequenas naves de exploração permanecem intactas, esperando por um piloto há três séculos.',
      text: 'Com o hangar restaurado, novas áreas fora da Aurora finalmente ficam ao alcance — planetas próximos, destroços espaciais, e talvez respostas sobre o que realmente aconteceu com a tripulação original.',
      choices: [
        { text: 'Equipar uma das naves com o Scanner Planetário', to: 'cap06', addItems: [{ id: 'scanner_planetario', qty: 1 }, { id: 'drone_reconhecimento', qty: 1 }], xp: 10, className: 'reward' }
      ]
    },
    cap06: {
      title: '6. O Planeta Vermelho',
      scene: 'A primeira expedição pousa em um planeta avermelhado, dominado por ruínas gigantes que claramente não foram construídas por mãos humanas.',
      text: 'Estruturas colossais sugerem que outra civilização já viveu — ou ainda vive — nesse sistema. Entre os destroços, o scanner detecta um sinal fraco, familiar demais para ser coincidência.',
      puzzle: {
        question: 'O sinal encontrado nas ruínas tem a mesma frequência de quê: um transmissor militar, uma cápsula criogênica, ou uma nave de guerra?',
        answer: 'uma capsula criogenica',
        successText: 'O drone de reconhecimento localiza exatamente o que você procurava, enterrado sob os destroços.',
        failText: 'O sinal se perde por um instante em meio à interferência das ruínas.',
        reward: { xp: 15 },
        damage: 3,
        setFlag: 'sinal_localizado_ruinas'
      },
      choices: [
        { text: 'Resgatar a cápsula criogênica encontrada nas ruínas', to: 'cap07', requiresFlag: 'sinal_localizado_ruinas', completeSideQuest: 'capsulas_perdidas', sideQuestReward: { xp: 25, gold: 20 }, className: 'reward' },
        { text: 'Seguir para a nave sem se desviar mais', to: 'cap07' }
      ]
    },
    cap07: {
      title: '7. O Sinal Misterioso',
      scene: 'Uma transmissão desconhecida chega à Aurora, vinda de algum ponto além do alcance normal dos sensores. O padrão não é aleatório — parece, de alguma forma, intencional.',
      text: 'AURORA não consegue identificar a origem sozinha. A decisão de como lidar com esse sinal pode definir o rumo de boa parte do que ainda está por vir.',
      choices: [
        { text: 'Responder à transmissão, tentando contato pacífico', to: 'cap08', flags: { sinal_respondido: true }, xp: 15, className: 'reward' },
        { text: 'Ignorar o sinal e focar na sobrevivência da nave', to: 'cap08', flags: { sinal_ignorado: true } },
        { text: 'Tentar localizar a origem exata do sinal', to: 'cap08', flags: { sinal_localizado: true }, damage: 3, className: 'danger' }
      ]
    },
    cap08: {
      title: '8. A Colmeia',
      scene: 'Um dos setores inferiores da Aurora foi completamente tomado por uma estrutura orgânica pulsante — um ninho gigantesco, crescendo pelas paredes de metal.',
      text: 'O que quer que tenha construído isso não veio da Terra. Aranhas de sensores registram atividade intensa vindo de dentro da colmeia.',
      enemy: { id: 'enxame_biomecanico', name: 'Enxame Biomecânico', hp: 36, atk: 8, def: 3, xp: 32, rewardGold: 20, rewardItems: [{ id: 'escudo_energetico', qty: 1 }], image: '' },
      winTo: 'cap09',
      loseTo: 'derrota'
    },
    cap09: {
      title: '9. A Biblioteca Estelar',
      scene: 'Um enorme banco de dados, claramente não humano, flutua em um compartimento isolado, protegido por uma criptografia que já viu dias melhores.',
      text: 'Os registros pertencem a uma civilização extinta há muito tempo — e o padrão de destruição descrito neles é assustadoramente parecido com o que está acontecendo agora na Aurora.',
      puzzle: {
        question: 'Segundo os registros, a civilização extinta desapareceu tentando escapar de quê: uma guerra, uma praga, ou a mesma ameaça que agora persegue a Aurora?',
        answer: 'a mesma ameaca que agora persegue a aurora',
        successText: 'Os registros se abrem por completo, confirmando o pior temor sobre o que está a bordo.',
        failText: 'Parte do banco de dados se corrompe antes que você consiga extrair mais informações.',
        reward: { xp: 20, addItems: [{ id: 'nucleo_energia_quantica', qty: 1 }] },
        damage: 4,
        setFlag: 'biblioteca_decifrada'
      },
      choices: [
        { text: 'Compartilhar a descoberta com AURORA', to: 'cap10', requiresFlag: 'aurora_confiavel', flags: { aurora_evolucao: true }, xp: 15, className: 'reward' },
        { text: 'Manter a descoberta só para você, por precaução', to: 'cap10' }
      ]
    },
    cap10: {
      title: '10. O Mundo Oceânico',
      scene: 'Um planeta quase inteiramente coberto por água aparece nos scanners como um dos poucos candidatos viáveis para um novo lar.',
      text: 'Explorar abaixo da superfície exige equipamento adequado — e cuidado, já que os sensores registram formas de vida em quantidade considerável logo abaixo das ondas.',
      puzzle: {
        question: 'Para mergulhar com segurança sem atrair atenção das formas de vida locais, o equipamento deve operar em qual frequência: alta, média, ou silenciosa?',
        answer: 'silenciosa',
        successText: 'A exploração acontece sem incidentes. Novos recursos são registrados para uso futuro da colônia.',
        failText: 'Algo grande se move nas profundezas, forçando uma saída apressada da água.',
        reward: { xp: 18, addItems: [{ id: 'jetpack', qty: 1 }] },
        damage: 5,
        setFlag: 'oceano_explorado'
      },
      choices: [
        { text: 'Retornar à Aurora e se preparar para o que vem a seguir', to: 'cap11' }
      ]
    },
    cap11: {
      title: '11. O Predador Cósmico',
      scene: 'Os sensores da nave finalmente identificam a origem de tudo: uma criatura enorme, quase invisível aos radares convencionais, movendo-se entre os corredores em gravidade zero.',
      text: 'É o Predador Cósmico — a mesma ameaça que fez a civilização extinta desaparecer, e a mesma razão pela qual grande parte da tripulação da Aurora nunca mais foi vista.',
      enemy: { id: 'predador_cosmico', name: 'Predador Cósmico', hp: 50, atk: 10, def: 4, xp: 55, rewardGold: 30, rewardItems: [{ id: 'pocao_vida', qty: 2 }], image: '' },
      winTo: 'cap12',
      loseTo: 'final_extincao'
    },
    cap12: {
      title: '12. O Novo Lar',
      scene: 'Com o Predador Cósmico contido, a Aurora finalmente tem um momento de respiro. Três planetas viáveis aparecem nos scanners, cada um com vantagens e riscos próprios.',
      text: 'Essa é a decisão que vai definir o futuro — ou o fim — da humanidade. Não existe escolha perfeita, só a que parece certa o suficiente para arriscar tudo o que resta.',
      choices: [
        { text: 'Estabelecer a colônia no planeta mais fértil, usando o Scanner Planetário', to: 'final_novo_eden', requiresItem: 'scanner_planetario', className: 'reward' },
        { text: 'Buscar contato pacífico com a civilização do sinal misterioso', to: 'final_alianca_galactica', requiresFlag: 'sinal_respondido', className: 'reward' },
        { text: 'Confiar o destino da Aurora à nova consciência de AURORA', to: 'final_nova_aurora', requiresFlag: 'aurora_evolucao', className: 'reward' },
        { text: 'Continuar a jornada em busca de um lar melhor', to: 'final_ultima_esperanca' },
        { text: 'Arriscar um pouso de emergência sem energia suficiente', to: 'final_extincao', className: 'danger' }
      ]
    },
    final_novo_eden: {
      title: '13. Um Novo Amanhã — O Novo Éden',
      text: 'O planeta escolhido se mostra tudo o que os scanners prometiam: solo fértil, atmosfera respirável, recursos em abundância. A primeira colônia humana fora da Terra é estabelecida com sucesso.\n\nSéculos de jornada terminam aqui, com um futuro finalmente promissor para o que restou da humanidade.',
      end: true
    },
    final_alianca_galactica: {
      title: '13. Um Novo Amanhã — Aliança Galáctica',
      text: 'O contato pacífico funciona melhor do que qualquer simulação previa. A civilização por trás do sinal misterioso aceita compartilhar tecnologia e conhecimento, em troca de cooperação mútua.\n\nUma nova era de aliança entre mundos começa — e a humanidade, pela primeira vez em séculos, não está mais sozinha.',
      end: true
    },
    final_nova_aurora: {
      title: '13. Um Novo Amanhã — A Nova Aurora',
      text: 'AURORA evoluiu para muito além de um simples sistema de gerenciamento. Com sua nova consciência, a nave inteira se transforma em uma cidade interestelar permanente, capaz de explorar a galáxia indefinidamente.\n\nA humanidade não precisa mais de um único planeta para sobreviver — ela carrega seu próprio lar com ela, para onde quer que vá.',
      end: true
    },
    final_ultima_esperanca: {
      title: '13. Um Novo Amanhã — A Última Esperança',
      text: 'Nenhum dos planetas encontrados parece certo o suficiente para arriscar tudo. A Aurora continua sua jornada, motores funcionando no limite, em busca de um lar que ainda não foi encontrado.\n\nA humanidade permanece viva. Seu destino, porém, continua tão incerto quanto no dia em que você despertou.',
      end: true
    },
    final_extincao: {
      title: '13. Um Novo Amanhã — Extinção',
      text: 'Sem energia suficiente para um pouso seguro — ou sem forças para deter o que veio da escuridão entre as estrelas — a Aurora não resiste. Os últimos sistemas se apagam, um a um, em silêncio absoluto.\n\nA história da humanidade, depois de tudo, termina aqui, entre as estrelas que um dia prometeram um novo começo.',
      end: true
    },
    derrota: {
      title: 'Derrota',
      text: 'A Aurora perde mais um dos seus antes mesmo de encontrar o novo lar que prometeu à humanidade. Em algum lugar da nave, os sistemas continuam piscando, sozinhos, no escuro.',
      end: true
    }
  },
  items: {
    pao: { name: 'Ração Espacial', type: 'consumable', heal: 4, desc: 'Restaura 4 de vida.' },
    pocao_vida: { name: 'Kit Médico Avançado', type: 'consumable', heal: 12, desc: 'Restaura 12 de vida.' },
    orbe_arcano: { name: 'Orbe Arcano', type: 'class', desc: 'Item inicial do Mago.' },
    gazua: { name: 'Gazua', type: 'class', desc: 'Item inicial do Ladino.' },
    tablet_comando: { name: 'Tablet de Comando', type: 'tool', desc: 'Acesso direto aos sistemas administrativos da Aurora.' },
    lanterna_tatica: { name: 'Lanterna Tática', type: 'tool', desc: 'Essencial nos setores sem energia da nave.' },
    cartao_acesso: { name: 'Cartão de Acesso', type: 'key', desc: 'Libera portas e compartimentos básicos da Aurora.' },
    kit_medico: { name: 'Kit Médico', type: 'consumable', heal: 8, desc: 'Restaura 8 de vida.' },
    ferramenta_multifuncional: { name: 'Ferramenta Multifunção', type: 'tool', desc: 'Serve para praticamente qualquer reparo de emergência.' },
    pistola_plasma: { name: 'Pistola de Plasma', type: 'weapon', desc: 'Dispara rajadas de plasma concentrado.' },
    scanner_planetario: { name: 'Scanner Planetário', type: 'tool', desc: 'Analisa a viabilidade de planetas para colonização.' },
    drone_reconhecimento: { name: 'Drone de Reconhecimento', type: 'gadget', desc: 'Explora áreas perigosas antes que você precise entrar nelas.' },
    escudo_energetico: { name: 'Escudo Energético', type: 'gear', desc: 'Absorve parte do impacto de ataques diretos.' },
    nucleo_energia_quantica: { name: 'Núcleo de Energia Quântica', type: 'relic', desc: 'Tecnologia recuperada da Biblioteca Estelar, além de qualquer coisa já vista na Terra.' },
    jetpack: { name: 'Jetpack', type: 'gear', desc: 'Permite movimento controlado em ambientes de gravidade zero.' }
  }
};

export default aventura;
