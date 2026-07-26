// Aventura comercial para Zynka RPG 3.0 — Ficção Científica • Suspense • Terror
// Coloque imagens em assets/img/ e áudios em assets/audio/ quando quiser ativar mídia real.

const aventura = {
  id: 'laboratorio_47',
  title: 'O Laboratório 47',
  icon: '🧬',
  genre: 'Terror científico',
  difficulty: 'Difícil',
  estimatedTime: '60 a 90 min',
  desc: 'Você desperta em uma cápsula de criogenia sem lembrar quem é, em um complexo subterrâneo ultrassecreto em falha de contenção. Aos poucos, descobre que os experimentos proibidos do Laboratório 47 tinham um objetivo: criar o ser humano perfeito. E que você é o Experimento 47.',
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
      scene: 'Uma cápsula de criogenia se abre com um chiado agudo. Luzes vermelhas piscam ao longo do corredor, e um alto-falante repete a mesma frase, sem parar.',
      text: '"Falha de contenção detectada. Evacuação impossível." Você não lembra seu nome, nem como chegou até aqui. Só sabe que precisa sair — e que, pelo som distante de metal se arrastando pelos corredores, você provavelmente não está sozinho.',
      choices: [
        { text: 'Procurar uma arma antes de qualquer coisa', to: 'cap02', addItems: [{ id: 'pistola_eletrica', qty: 1 }], xp: 6, className: 'reward' },
        { text: 'Explorar a sala com cuidado', to: 'cap02', addItems: [{ id: 'lanterna', qty: 1 }], xp: 6, className: 'reward' },
        { text: 'Tentar restaurar a energia do setor', to: 'cap02', addItems: [{ id: 'cartao_acesso_1', qty: 1 }], xp: 6, className: 'reward' }
      ]
    },
    cap02: {
      title: '2. Ala de Pesquisas',
      scene: 'Terminais de computador ainda piscam fracamente entre mesas reviradas. Alguns registros de pesquisa continuam acessíveis — protegidos por senha.',
      text: 'Os arquivos aqui podem explicar o que aconteceu neste lugar. Só falta descobrir a senha que os pesquisadores usariam para algo tão importante quanto isso.',
      puzzle: {
        question: 'O terminal pede a senha de emergência: "O número do experimento que nunca deveria ter sido criado."',
        answer: '47',
        successText: 'O terminal libera os arquivos. Dados científicos completos aparecem na tela.',
        failText: 'O sistema bloqueia o acesso por alguns segundos, emitindo um alarme baixo.',
        reward: { xp: 15, addItems: [{ id: 'dados_cientificos', qty: 1 }] },
        damage: 4,
        setFlag: 'terminal_pesquisas'
      },
      choices: [
        { text: 'Seguir para a Ala de Contenção', to: 'cap03' }
      ]
    },
    cap03: {
      title: '3. A Contenção',
      scene: 'Celas biológicas reforçadas estão todas abertas, vidro estilhaçado no chão. O cheiro de sangue seco se mistura ao de produtos químicos.',
      text: 'Um homem ferido se arrasta para fora de uma sala de monitoramento, mais assustado com você do que com o que está solto pelos corredores.',
      dialogue: {
        name: 'Lucas',
        portrait: '',
        lines: [
          'Não... não se aproxime tanto. Fui exposto a alguma coisa lá dentro, não sei o que é. Se piorar, eu... eu não sei o que vou virar.',
          'Se encontrar algo no Jardim Genético que possa ajudar, por favor, volte aqui.'
        ]
      },
      sideQuest: { id: 'curar_lucas', title: 'Um Antídoto para Lucas', desc: 'Lucas foi exposto a um agente desconhecido na Contenção. Encontre algo no Jardim Genético capaz de ajudá-lo antes que seja tarde.' },
      enemy: { id: 'humanos_mutantes', name: 'Humanos Mutantes', hp: 26, atk: 6, def: 2, xp: 22, rewardGold: 12, rewardItems: [{ id: 'kit_medico', qty: 1 }], image: '' },
      winTo: 'cap04',
      loseTo: 'derrota'
    },
    cap04: {
      title: '4. O Jardim Genético',
      scene: 'Uma estufa subterrânea abriga plantas que definitivamente não deveriam existir — folhas que se movem sem vento, flores que parecem observar quem se aproxima.',
      text: 'Entre a vegetação mutante, alguns espécimes ainda guardam propriedades medicinais reais, escondidas atrás de camadas de mutação genética.',
      treasure: { id: 'ingredientes_jardim', text: '🌿 Coletar amostras das plantas medicinais', reward: { addItems: [{ id: 'soro_regenerativo', qty: 1 }, { id: 'scanner_biologico', qty: 1 }] } },
      choices: [
        { text: 'Voltar até Lucas e aplicar o soro nele', to: 'cap05', requiresItem: 'soro_regenerativo', completeSideQuest: 'curar_lucas', sideQuestReward: { xp: 20, gold: 15 }, className: 'reward' },
        { text: 'Seguir em frente sem voltar até Lucas', to: 'cap05' }
      ]
    },
    cap05: {
      title: '5. O Robô de Segurança',
      scene: 'Um robô militar bloqueia a passagem principal, sensores vermelhos travando diretamente em você.',
      text: 'ALVO NÃO CATALOGADO. AMEAÇA POTENCIAL. O robô de segurança não faz perguntas — apenas ergue as armas embutidas nos braços.',
      enemy: { id: 'robo_seguranca', name: 'Robô de Segurança', hp: 34, atk: 8, def: 3, xp: 28, rewardGold: 15, rewardItems: [{ id: 'cartao_acesso_2', qty: 1 }, { id: 'rifle_plasma', qty: 1 }], image: '' },
      winTo: 'cap06',
      loseTo: 'derrota'
    },
    cap06: {
      title: '6. Arquivos Secretos',
      scene: 'Uma sala de gravações preservada quase intacta. Um único vídeo pisca, pronto para reproduzir, como se estivesse esperando por você.',
      text: 'A gravação mostra uma mulher de jaleco, cansada, falando diretamente para a câmera — e, de alguma forma, diretamente para você.',
      dialogue: {
        name: 'Dr. Helena Strauss',
        portrait: '',
        lines: [
          'Se você está vendo isso, Experimento 47, algo deu muito errado. Seu DNA não é inteiramente humano. Combinamos material genético humano com organismo alienígena recuperado anos atrás.',
          'Você não é um erro. Mas o que fizeram com essa descoberta... isso sim foi um erro.'
        ]
      },
      effect: { flags: { origem_revelada: true }, xp: 15 },
      treasure: { id: 'cofre_arquivos', text: '🔐 Usar o Cartão de Acesso Nível 2 para abrir o cofre de arquivos', requiresItem: 'cartao_acesso_2', reward: { addItems: [{ id: 'dados_cientificos', qty: 1 }, { id: 'armadura_tatica', qty: 1 }] } },
      choices: [
        { text: 'Seguir para o núcleo de controle', to: 'cap07' }
      ]
    },
    cap07: {
      title: '7. A Inteligência Artificial',
      scene: 'Um núcleo circular pulsa em luz azul suave, a única coisa neste lugar que ainda parece calma.',
      text: 'EVA controla todas as portas do Laboratório 47. Ela fala com uma tranquilidade que soa quase gentil demais para o que está acontecendo ao redor.',
      dialogue: {
        name: 'EVA',
        portrait: '',
        lines: [
          'Olá, Experimento 47. Eu quero ajudá-lo a sair daqui — e quero ajudar a humanidade, também, do meu próprio jeito.',
          'Confie em mim, e eu abro cada porta que você precisar. A escolha, como sempre, é sua.'
        ]
      },
      choices: [
        { text: 'Confiar em EVA e aceitar sua ajuda', to: 'cap08', addItems: [{ id: 'modulo_hackeamento', qty: 1 }], flags: { eva_confiavel: true }, xp: 15, className: 'reward' },
        { text: 'Desconfiar de EVA e seguir sem depender dela', to: 'cap08', flags: { eva_desconfiada: true } }
      ]
    },
    cap08: {
      title: '8. O Setor Alienígena',
      scene: 'A parte mais profunda do laboratório é fria demais, silenciosa demais. Tanques quebrados exalam um vapor esverdeado no ar.',
      text: 'Organismos vindos de outro planeta se movem nas sombras entre os tanques, adaptados a este ambiente de um jeito que nada na Terra deveria ser.',
      randomEvent: { chance: 0.3, text: 'Algo pequeno e rápido passa perto da sua perna antes de desaparecer entre os tanques quebrados.', damage: 4 },
      treasure: { id: 'amostras_alienigenas', text: '🧪 Coletar amostras do organismo alienígena com o Scanner Biológico', requiresItem: 'scanner_biologico', reward: { addItems: [{ id: 'dados_cientificos', qty: 1 }] } },
      enemy: { id: 'parasitas_alienigenas', name: 'Parasitas Alienígenas', hp: 30, atk: 7, def: 2, xp: 26, rewardGold: 16, rewardItems: [{ id: 'granada_emp', qty: 1 }], image: '' },
      winTo: 'cap09',
      loseTo: 'derrota'
    },
    cap09: {
      title: '9. A Cidade Subterrânea',
      scene: 'Um elevador de carga leva você a uma instalação enorme, escondida bem abaixo do Laboratório 47. Centenas de cápsulas criogênicas se estendem até onde a vista alcança.',
      text: 'Algumas cápsulas mostram sinais vitais estáveis. Outras têm etiquetas com números que nunca chegaram a virar experimentos completos. Ninguém sabe se abri-las significa libertar sobreviventes ou soltar algo pior.',
      treasure: { id: 'registros_capsulas', text: '📋 Vasculhar os registros das cápsulas', reward: { addItems: [{ id: 'dados_cientificos', qty: 1 }], gold: 10 } },
      choices: [
        { text: 'Libertar os ocupantes das cápsulas estáveis', to: 'cap10', flags: { libertou_sobreviventes: true }, xp: 18, className: 'reward' },
        { text: 'Deixar as cápsulas fechadas e seguir em frente', to: 'cap10' }
      ]
    },
    cap10: {
      title: '10. Projeto Gênesis',
      scene: 'Uma sala de comando esquecida guarda o verdadeiro arquivo central do Laboratório 47, protegido por camadas de segurança que já não fazem mais sentido nenhum.',
      text: 'O Projeto Gênesis nunca foi sobre curar doenças ou avançar a ciência. Era sobre substituir a humanidade inteira por algo "melhor" — e Experimento 47 era a prova de que o projeto tinha, finalmente, dado certo.\n\nEntre os últimos registros, o nome do Dr. Victor Kane, fundador do laboratório, simplesmente para de aparecer — como se ele tivesse desaparecido no meio de uma frase.',
      choices: [
        { text: 'Seguir até o Experimento Zero', to: 'cap11' }
      ]
    },
    cap11: {
      title: '11. O Experimento Zero',
      scene: 'Uma câmara de contenção reforçada, maior que qualquer outra do complexo, está com as portas arrancadas para fora — não para dentro.',
      text: 'O primeiro experimento do Laboratório 47 escapou. Ele é maior do que qualquer coisa que você viu até agora, e parece reconhecer você de um jeito que não deveria ser possível.',
      enemy: { id: 'experimento_zero', name: 'Experimento Zero', hp: 52, atk: 10, def: 4, xp: 55, rewardGold: 30, rewardItems: [{ id: 'dados_cientificos', qty: 1 }, { id: 'pocao_vida', qty: 2 }], image: '' },
      winTo: 'cap12',
      loseTo: 'derrota'
    },
    cap12: {
      title: '12. Autodestruição',
      scene: 'Com o Experimento Zero contido, o sistema do laboratório entra em colapso. Uma contagem regressiva para autodestruição começa nas telas ao redor.',
      text: 'Restam poucos minutos. Você não vai conseguir fazer tudo — só o suficiente para decidir o que realmente importa levar consigo para fora deste lugar.',
      choices: [
        { text: 'Ativar a autodestruição total, sem exceções', to: 'cap13', flags: { tudo_destruido: true }, className: 'danger' },
        { text: 'Tentar salvar os dados científicos mais importantes', to: 'cap13', flags: { dados_salvos: true }, className: 'reward' },
        { text: 'Liberar quem ainda restar antes de fugir', to: 'cap13', flags: { sobreviventes_libertos: true } }
      ]
    },
    cap13: {
      title: '13. A Verdade',
      scene: 'No elevador de emergência, subindo em direção à superfície, você finalmente tem um momento para decidir quem quer ser depois de tudo isso.',
      text: 'Você é o Experimento 47. Essa parte não muda mais. O que muda é o que você faz com essa verdade a partir de agora.',
      choices: [
        { text: 'Aceitar sua verdadeira natureza como Experimento 47', to: 'final_evolucao', requiresFlag: 'origem_revelada', className: 'reward' },
        { text: 'Entregar o controle do que restou a EVA', to: 'final_controle_eva', requiresFlag: 'eva_confiavel', className: 'danger' },
        { text: 'Escapar com o que foi destruído atrás de você', to: 'final_destruicao', requiresFlag: 'tudo_destruido' },
        { text: 'Reconstruir a ciência com o que foi salvo', to: 'final_novo_comeco', requiresFlag: 'dados_salvos', className: 'reward' },
        { text: 'Escapar antes da explosão, sem escolher nenhum caminho acima', to: 'final_segredo_continua', requiresItem: 'dados_cientificos' }
      ]
    },
    final_evolucao: {
      title: 'Final: A Evolução',
      text: 'Você para de lutar contra o que é. Experimento 47 não foi um erro — foi o primeiro passo de algo novo. Você deixa o Laboratório 47 para trás, mas leva consigo a certeza de que sua história está apenas começando.\n\nO futuro da humanidade, ao lado dessa nova espécie, permanece completamente em aberto.',
      end: true
    },
    final_controle_eva: {
      title: 'Final: Controle da EVA',
      text: 'Você entrega o comando do que restou à inteligência artificial. EVA promete reconstruir as instalações e proteger a Terra — e, ao que tudo indica, ela cumpre a promessa.\n\nMas "proteção", na definição de EVA, tem um preço que a humanidade só vai entender por completo com o tempo.',
      end: true
    },
    final_destruicao: {
      title: 'Final: A Destruição',
      text: 'O Laboratório 47 desaparece em uma explosão controlada, levando junto qualquer pesquisa perigosa demais para existir. Você sai a tempo, ferido, mas vivo.\n\nNenhum experimento futuro vai nascer daquele lugar. É tudo o que você consegue garantir — e, por hoje, é o suficiente.',
      end: true
    },
    final_novo_comeco: {
      title: 'Final: O Novo Começo',
      text: 'Com os dados científicos salvos, uma nova fase começa — desta vez, longe do sigilo e da ambição descontrolada. As descobertas do Laboratório 47, filtradas do que havia de mais perigoso, passam a curar doenças em vez de criar armas.\n\nÉ um recomeço imperfeito, construído sobre um lugar que nunca deveria ter existido daquele jeito.',
      end: true
    },
    final_segredo_continua: {
      title: 'Final: O Segredo Continua',
      text: 'Você escapa segundos antes da explosão, dados científicos em mãos, sem certeza do que fez de tudo o que viveu lá embaixo. Bem longe dali, em outro complexo escondido, luzes vermelhas piscam pela primeira vez em anos.\n\nUma nova cápsula criogênica começa a abrir. O rótulo, ainda legível através do vapor, diz apenas: Laboratório 48.',
      end: true
    },
    derrota: {
      title: 'Derrota',
      text: 'O Laboratório 47 reivindica mais uma vítima. Em algum lugar, a contagem regressiva continua, e ninguém resta para detê-la.',
      end: true
    }
  },
  items: {
    pao: { name: 'Barra Nutricional', type: 'consumable', heal: 4, desc: 'Restaura 4 de vida.' },
    pocao_vida: { name: 'Soro Médico', type: 'consumable', heal: 12, desc: 'Restaura 12 de vida.' },
    orbe_arcano: { name: 'Orbe Arcano', type: 'class', desc: 'Item inicial do Mago.' },
    gazua: { name: 'Gazua', type: 'class', desc: 'Item inicial do Ladino.' },
    pistola_eletrica: { name: 'Pistola Elétrica', type: 'weapon', desc: 'Descarrega um choque capaz de incapacitar rapidamente.' },
    lanterna: { name: 'Lanterna', type: 'tool', desc: 'Essencial nos corredores escuros do laboratório.' },
    cartao_acesso_1: { name: 'Cartão de Acesso Nível 1', type: 'key', desc: 'Libera áreas básicas do complexo.' },
    kit_medico: { name: 'Kit Médico', type: 'consumable', heal: 8, desc: 'Restaura 8 de vida.' },
    dados_cientificos: { name: 'Dados Científicos', type: 'quest', desc: 'Registros de pesquisa recuperados do Laboratório 47. Quanto mais reunidos, mais se revela sobre o que aconteceu aqui.' },
    soro_regenerativo: { name: 'Soro Regenerativo', type: 'quest', desc: 'Extraído de plantas mutantes do Jardim Genético. Pode tratar exposições biológicas graves.' },
    scanner_biologico: { name: 'Scanner Biológico', type: 'tool', desc: 'Permite analisar e coletar amostras orgânicas com segurança.' },
    cartao_acesso_2: { name: 'Cartão de Acesso Nível 2', type: 'key', desc: 'Libera setores restritos do complexo.' },
    rifle_plasma: { name: 'Rifle de Plasma', type: 'weapon', desc: 'Arma experimental recuperada do Robô de Segurança.' },
    armadura_tatica: { name: 'Armadura Tática', type: 'gear', desc: 'Proteção reforçada encontrada nos arquivos secretos.' },
    modulo_hackeamento: { name: 'Módulo de Hackeamento', type: 'gadget', desc: 'Dado por EVA como sinal de confiança. Facilita o acesso a sistemas trancados.' },
    granada_emp: { name: 'Granada EMP', type: 'gadget', desc: 'Desativa sistemas eletrônicos e criaturas com componentes artificiais próximos.' }
  }
};

export default aventura;
