// Aventura comercial para Zynka RPG 3.0 — Espionagem • Ação • Suspense • Ficção Tecnológica
// Coloque imagens em assets/img/ e áudios em assets/audio/ quando quiser ativar mídia real.

const aventura = {
  id: 'operacao_eclipse',
  title: 'Operação Eclipse',
  icon: '🛰️',
  genre: 'Espionagem tecnológica',
  difficulty: 'Difícil',
  estimatedTime: '60 a 80 min',
  desc: 'Em 2042, a Ordem Eclipse roubou uma tecnologia capaz de controlar satélites, redes elétricas e comunicações do planeta. Como novo agente da Sentinela, você tem 72 horas para infiltrar-se, descobrir quem está por trás da operação e impedir a ativação do Projeto Eclipse.',
  start: 'cap01',
  maxChapters: 25,
  assets: {
    music: './assets/musicas/trilhaficcaocientifica.mp3',
    sfx: { click: '', attack: '', victory: '', item: '', levelup: '', puzzle: '' }
  },
  chapters: {
    cap01: {
      title: '1. Recrutamento',
      image: '',
      scene: 'Uma sala sem janelas, iluminada apenas por telas. Nenhum letreiro do lado de fora indica que este prédio existe oficialmente.',
      text: 'Você foi convocado para uma reunião que, tecnicamente, nunca aconteceu. A Ordem Eclipse roubou uma tecnologia capaz de apagar o planeta inteiro, e a Sentinela precisa de alguém disposto a desaparecer por completo para impedir isso.',
      dialogue: {
        name: 'Agente Orion',
        portrait: '',
        lines: [
          'Setenta e duas horas. É o tempo que temos antes da Ordem Eclipse ativar a arma. Depois disso, não há mais o que impedir.',
          'Você não precisa aceitar agora. Mas se aceitar, não existe meio-termo.'
        ]
      },
      choices: [
        { text: 'Aceitar a missão imediatamente', to: 'cap02', addItems: [{ id: 'comunicador_criptografado', qty: 1 }], xp: 5, className: 'reward' },
        { text: 'Pedir mais informações antes de decidir', to: 'cap02', addItems: [{ id: 'identidade_falsa', qty: 1 }], xp: 8 },
        { text: 'Investigar a Ordem Eclipse por conta própria antes de responder', to: 'cap02', addItems: [{ id: 'pistola_tranquilizante', qty: 1 }], damage: 3, className: 'danger' }
      ]
    },
    cap02: {
      title: '2. Treinamento Sentinela',
      scene: 'Um centro de treinamento subterrâneo, equipado com simuladores de combate, invasão e infiltração.',
      text: 'Antes de qualquer missão de campo, todo agente da Sentinela escolhe uma especialização. Ela vai definir como você resolve os próximos obstáculos — e quais portas se abrem, ou se fecham, ao longo do caminho.',
      dialogue: {
        name: 'Agente Orion',
        portrait: '',
        lines: [
          'Escolha bem. E fique de olho nos seus colegas — tenho motivos para acreditar que há um traidor dentro da própria Sentinela.'
        ]
      },
      sideQuest: { id: 'agente_duplo', title: 'O Agente Duplo', desc: 'Orion suspeita que alguém da Sentinela trabalha secretamente para a Ordem Eclipse. Descubra quem é.' },
      choices: [
        { text: 'Especializar-se em Infiltração', to: 'cap03', addItems: [{ id: 'oculos_visao_termica', qty: 1 }], flags: { especialidade_infiltrador: true }, className: 'reward' },
        { text: 'Especializar-se em Hackeamento', to: 'cap03', addItems: [{ id: 'kit_hack', qty: 1 }], flags: { especialidade_hacker: true }, className: 'reward' },
        { text: 'Especializar-se em Tiro de Precisão', to: 'cap03', addItems: [{ id: 'relogio_multifuncional', qty: 1 }], flags: { especialidade_atirador: true }, className: 'reward' }
      ]
    },
    cap03: {
      title: '3. Missão em Berlim',
      scene: 'Um prédio corporativo de fachada legítima esconde, no décimo andar, um dos data centers da Ordem Eclipse.',
      text: 'Sua primeira missão de campo: entrar, copiar os arquivos internos da Ordem Eclipse e sair sem deixar rastro. O terminal de acesso pede uma resposta de segurança configurada pelo próprio fundador da organização.',
      puzzle: {
        question: 'O terminal pergunta: "O que nunca dorme, mas sempre observa?"',
        answer: 'os satélites',
        successText: 'O terminal libera o acesso silenciosamente. Nenhum alarme disparado.',
        failText: 'Um alarme silencioso é acionado em algum lugar do prédio.',
        reward: { xp: 15, addItems: [{ id: 'arquivos_eclipse', qty: 1 }] },
        damage: 4,
        setFlag: 'discreto'
      },
      choices: [
        { text: 'Usar suas habilidades de hacker para copiar os arquivos sem tocar no terminal', to: 'cap04', requiresFlag: 'especialidade_hacker', addItems: [{ id: 'arquivos_eclipse', qty: 1 }], xp: 15, flags: { discreto: true }, className: 'reward' },
        { text: 'Sair do prédio antes que os seguranças cheguem', to: 'cap04' }
      ]
    },
    cap04: {
      title: '4. Perseguição em Alta Velocidade',
      scene: 'Sirenes ecoam pelas ruas de Berlim. Alguém percebeu sua saída antes do previsto, e agora é uma questão de segundos.',
      text: 'Carros de segurança da Ordem Eclipse fecham o quarteirão. Você precisa decidir agora como sumir no meio da cidade antes que cerquem toda a região.',
      choices: [
        { text: 'Roubar uma moto e acelerar pelas ruas', to: 'cap05', damage: 5, xp: 10, className: 'danger' },
        { text: 'Invadir o metrô e se misturar à multidão', to: 'cap05', xp: 8 },
        { text: 'Escapar pelos telhados da cidade', to: 'cap05', addItems: [{ id: 'gancho_magnetico', qty: 1 }], damage: 3, className: 'reward' }
      ]
    },
    cap05: {
      title: '5. O Hacker Fantasma',
      scene: 'Um apartamento apagado, iluminado apenas por telas de monitoramento. Ninguém sabe o verdadeiro nome de quem mora ali.',
      text: 'Ghost é o hacker mais procurado do planeta — e também a única pessoa fora da Sentinela que pode saber como localizar o núcleo do Projeto Eclipse. Ele não confia em ninguém por padrão. Você precisa mudar isso.',
      dialogue: {
        name: 'Ghost',
        portrait: '',
        lines: [
          'Agentes da Sentinela sempre aparecem quando algo já deu errado. O que você fez em Berlim me diz muito sobre você.',
          'Discrição é a única moeda que aceito. Provou que tem?'
        ]
      },
      choices: [
        { text: 'Mostrar que agiu com discrição em Berlim', to: 'cap06', requiresFlag: 'discreto', addItems: [{ id: 'kit_hack', qty: 1 }], flags: { ghost_aliado: true }, xp: 15, className: 'reward' },
        { text: 'Tentar convencê-lo mesmo sem provas', to: 'cap06', damage: 4, className: 'danger' },
        { text: 'Seguir sozinho, sem perder mais tempo', to: 'cap06' }
      ]
    },
    cap06: {
      title: '6. A Base Subterrânea',
      scene: 'Dutos de ventilação, câmeras giratórias e drones de patrulha protegem a entrada de uma instalação da Ordem Eclipse enterrada sob um estacionamento abandonado.',
      text: 'Quanto menos alarmes você disparar, melhor sai desta missão. Cada sensor evitado é uma vantagem que você carrega para o resto da operação.',
      randomEvent: { chance: 0.35, text: 'Um sensor de movimento pisca por um instante antes de você conseguir desviar.', damage: 5 },
      treasure: { id: 'traje_base', text: '🎒 Recolher um traje camuflado deixado por outro agente', reward: { addItems: [{ id: 'traje_camuflado', qty: 1 }] } },
      choices: [
        { text: 'Usar suas técnicas de infiltração para neutralizar os sensores', to: 'cap07', requiresFlag: 'especialidade_infiltrador', xp: 15, className: 'reward' },
        { text: 'Avançar com cautela pelos dutos de ventilação', to: 'cap07' },
        { text: 'Avançar rápido, sem se preocupar em ser visto', to: 'cap07', damage: 6, className: 'danger' }
      ]
    },
    cap07: {
      title: '7. Agente Duplo',
      scene: 'De volta à sede da Sentinela, algo não fecha. Informações que só a sua equipe deveria conhecer chegaram cedo demais até a Ordem Eclipse.',
      text: 'Existem pistas demais e provas de menos. Um bilhete anônimo, um relatório duplicado, um horário que bate exatamente com o seu — só uma dessas pistas aponta para o verdadeiro traidor.',
      puzzle: {
        question: 'Qual pista é a real: o bilhete anônimo, o relatório duplicado, ou o horário batendo exatamente com o seu?',
        answer: 'o horario batendo exatamente com o seu',
        successText: 'A peça se encaixa. Só quem monitorava você em tempo real poderia saber daquele horário.',
        failText: 'Você segue uma pista falsa e perde um tempo precioso.',
        reward: { xp: 18 },
        damage: 4,
        setFlag: 'traidor_identificado'
      },
      choices: [
        { text: 'Confrontar o agente duplo com as provas reunidas', to: 'cap08', requiresFlag: 'traidor_identificado', completeSideQuest: 'agente_duplo', sideQuestReward: { xp: 20, gold: 15 }, className: 'reward' },
        { text: 'Seguir a missão e lidar com isso depois', to: 'cap08' }
      ]
    },
    cap08: {
      title: '8. A Prisão de Gelo',
      scene: 'Uma fortaleza cinza emerge do gelo ártico, quase invisível contra a paisagem. É aqui que a Ordem Eclipse mantém o cientista responsável pela arma.',
      text: 'O Professor Elias está preso há meses, forçado a continuar aperfeiçoando uma tecnologia que ele mesmo se arrependeu de criar. Libertá-lo pode ser a chave para entender como desativar o Projeto Eclipse.',
      dialogue: {
        name: 'Professor Elias',
        portrait: '',
        lines: [
          'Eu devia ter destruído os planos assim que entendi o que criei. Se me tirarem daqui, ajudo vocês a consertar meu erro.'
        ]
      },
      enemy: { id: 'guardas_elite', name: 'Guardas de Elite', hp: 32, atk: 7, def: 3, xp: 28, rewardGold: 18, rewardItems: [{ id: 'granada_emp', qty: 1 }], image: '' },
      winTo: 'cap09',
      loseTo: 'derrota'
    },
    cap09: {
      title: '9. Projeto Eclipse',
      scene: 'Nos arquivos recuperados por Elias, os verdadeiros planos da arma finalmente aparecem — e são piores do que qualquer relatório de inteligência previu.',
      text: 'O Projeto Eclipse não foi feito para destruir cidades. Foi feito para controlar toda a infraestrutura tecnológica do planeta: satélites, redes elétricas, comunicações — tudo, de uma vez, para sempre.',
      dialogue: {
        name: 'Professor Elias',
        portrait: '',
        lines: [
          'Quem controlar o núcleo da arma não precisa destruir nada. Só precisa esperar o mundo obedecer.',
          'A estação orbital onde ela está guardada só pode ser alcançada por um elevador espacial. Vocês vão precisar de tudo o que têm.'
        ]
      },
      choices: [
        { text: 'Seguir para o elevador espacial', to: 'cap10' }
      ]
    },
    cap10: {
      title: '10. Invasão Orbital',
      scene: 'O elevador espacial sobe lentamente através das nuvens. Lá em cima, a estação orbital da Ordem Eclipse gira em silêncio absoluto.',
      text: 'A gravidade reduzida transforma até os movimentos mais simples em um desafio. Robôs Sentinela e drones de combate patrulham cada corredor da estação.',
      choices: [
        { text: 'Abater os drones de longe antes de embarcar', to: 'cap10_batalha', requiresFlag: 'especialidade_atirador', xp: 12, gold: 10, className: 'reward' },
        { text: 'Avançar com cautela pela baixa gravidade', to: 'cap10_batalha' }
      ]
    },
    cap10_batalha: {
      title: '10. Corredores em Gravidade Zero',
      text: 'Metal reflete luzes vermelhas de alerta. Robôs Sentinela avançam flutuando pelo corredor, sensores travados exatamente em você.',
      enemy: { id: 'robos_sentinela', name: 'Robôs Sentinela', hp: 30, atk: 8, def: 3, xp: 32, rewardGold: 20, rewardItems: [{ id: 'pocao_vida', qty: 1 }], image: '' },
      winTo: 'cap11',
      loseTo: 'derrota'
    },
    cap11: {
      title: '11. O Diretor',
      scene: 'No centro de comando da estação, cercado por telas mostrando cidades inteiras à espera de um comando, Viktor Drakov aguarda calmamente.',
      text: 'Ele não parece surpreso em ver você. Pelo contrário — parece que esperava exatamente esse momento.',
      dialogue: {
        name: 'Viktor Drakov',
        portrait: '',
        lines: [
          'Vocês acham que eu ajo sozinho? Metade dos governos que financiam a Sentinela também financiam a Ordem Eclipse, em segredo.',
          'Não existe mocinho nessa história. Só quem está disposto a assumir o controle, e quem prefere fingir que não sabe.'
        ]
      },
      enemy: { id: 'viktor_drakov', name: 'Viktor Drakov', hp: 44, atk: 9, def: 4, xp: 50, rewardGold: 30, rewardItems: [{ id: 'kit_hack', qty: 1 }], image: '' },
      winTo: 'cap12',
      loseTo: 'derrota'
    },
    cap12: {
      title: '12. Contagem Regressiva',
      scene: 'Com Viktor derrotado, o núcleo do Projeto Eclipse continua ativo, contando os minutos até a ativação total. Um painel simples mostra três opções — e uma quarta, mais drástica, sempre disponível.',
      text: 'Restam poucos minutos. Desligar a arma exige acesso técnico que nem todo agente possui. Reprogramá-la é possível, mas tentador demais para ser seguro. Destruí-la de vez custaria muito mais do que a arma em si.',
      choices: [
        { text: 'Usar o Kit de Hack para desligar a arma com segurança', to: 'final_missao_cumprida', requiresItem: 'kit_hack', className: 'reward' },
        { text: 'Usar o Kit de Hack para reprogramar a arma para si mesmo', to: 'final_novo_diretor', requiresItem: 'kit_hack', className: 'danger' },
        { text: 'Usar a Granada EMP e permanecer na estação até o fim', to: 'final_sacrificio', requiresItem: 'granada_emp', className: 'danger' },
        { text: 'Forçar o desligamento manual, sem preparo nem tempo de sobra', to: 'final_apagao_global', className: 'danger' }
      ]
    },
    final_missao_cumprida: {
      title: '13. O Novo Amanhã — Missão Cumprida',
      text: 'O núcleo do Projeto Eclipse se desliga sem um único ruído. Viktor Drakov é entregue à custódia internacional, e a Sentinela impede, por pouco, a maior crise tecnológica da história.\n\nEm poucos dias, o mundo volta ao normal — sem nunca saber o quão perto esteve do apagão total.',
      end: true
    },
    final_novo_diretor: {
      title: '13. O Novo Amanhã — O Novo Diretor',
      text: 'Você reprograma o núcleo, convencido de que só assim poderá proteger o mundo de verdade. No início, os resultados parecem bons: menos crimes, redes mais estáveis, governos mais obedientes.\n\nCom o tempo, porém, ninguém mais pergunta se você ainda está do lado certo — inclusive você mesmo.',
      end: true
    },
    final_apagao_global: {
      title: '13. O Novo Amanhã — O Apagão Global',
      text: 'Sem as ferramentas certas, o desligamento manual falha no pior momento possível. Satélites caem, cidades inteiras mergulham no escuro, e o Projeto Eclipse cumpre exatamente o que prometia.\n\nA Sentinela sobrevive, mas o mundo que ela jurou proteger nunca mais vai ser o mesmo.',
      end: true
    },
    final_sacrificio: {
      title: '13. O Novo Amanhã — Sacrifício Final',
      text: 'A Granada EMP destrói o núcleo por dentro, e com ele, qualquer chance de o Projeto Eclipse ser reativado. Você não tem tempo de alcançar o elevador espacial antes que a estação comece a se despedaçar.\n\nA missão é um sucesso completo. Seu destino, porém, permanece desconhecido — e seu nome se torna uma lenda sussurrada entre os agentes da Sentinela.',
      end: true
    },
    derrota: {
      title: 'Derrota',
      text: 'A missão termina antes da hora. Em algum lugar, o relógio do Projeto Eclipse continua contando os minutos, sem ninguém para pará-lo.',
      end: true
    }
  },
  items: {
    pao: { name: 'Ração de Campo', type: 'consumable', heal: 4, desc: 'Restaura 4 de vida.' },
    pocao_vida: { name: 'Kit de Primeiros Socorros', type: 'consumable', heal: 12, desc: 'Restaura 12 de vida.' },
    orbe_arcano: { name: 'Orbe Arcano', type: 'class', desc: 'Item inicial do Mago.' },
    gazua: { name: 'Gazua', type: 'class', desc: 'Item inicial do Ladino.' },
    comunicador_criptografado: { name: 'Comunicador Criptografado', type: 'tool', desc: 'Linha segura direta com a sede da Sentinela.' },
    pistola_tranquilizante: { name: 'Pistola Tranquilizante', type: 'tool', desc: 'Neutraliza alvos sem matar.' },
    identidade_falsa: { name: 'Identidade Falsa', type: 'tool', desc: 'Documentos que resistem à maioria das verificações.' },
    oculos_visao_termica: { name: 'Óculos de Visão Térmica', type: 'gadget', desc: 'Revela o que se esconde no escuro.' },
    kit_hack: { name: 'Kit de Hack', type: 'gadget', desc: 'Ferramentas para invadir praticamente qualquer sistema.' },
    relogio_multifuncional: { name: 'Relógio Multifuncional', type: 'gadget', desc: 'Combina mira de precisão, cronômetro e rastreador.' },
    gancho_magnetico: { name: 'Gancho Magnético', type: 'gadget', desc: 'Permite escaladas e fugas rápidas por telhados.' },
    traje_camuflado: { name: 'Traje Camuflado', type: 'gear', desc: 'Reduz drasticamente as chances de ser notado.' },
    granada_emp: { name: 'Granada EMP', type: 'gadget', desc: 'Desativa qualquer sistema eletrônico próximo — inclusive os mais perigosos.' },
    arquivos_eclipse: { name: 'Arquivos da Ordem Eclipse', type: 'quest', desc: 'Documentos internos roubados do data center em Berlim.' }
  }
};

export default aventura;
