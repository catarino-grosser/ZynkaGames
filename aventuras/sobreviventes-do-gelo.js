// Aventura comercial para Zynka RPG 3.0 — Sobrevivência • Ficção Científica • Aventura
// Coloque imagens em assets/img/ e áudios em assets/audio/ quando quiser ativar mídia real.

const aventura = {
  id: 'sobreviventes_gelo',
  title: 'Sobreviventes do Gelo',
  icon: '❄️',
  genre: 'Sobrevivência sci-fi',
  difficulty: 'Difícil',
  estimatedTime: '60 a 90 min',
  desc: 'Em 2158, uma nova era glacial engoliu o planeta. Com o Núcleo Térmico da Colônia Aurora prestes a falhar, você lidera uma expedição em busca do lendário Reator Aurora antes que o inverno eterno acabe com o que resta da humanidade.',
  start: 'cap01',
  maxChapters: 25,
  assets: {
    music: './assets/musicas/trilhaficcaocientifica.mp3',
    sfx: { click: '', attack: '', victory: '', item: '', levelup: '', puzzle: '' }
  },
  chapters: {
    cap01: {
      title: '1. O Último Refúgio',
      image: '',
      scene: 'A Colônia Aurora vive sob uma cúpula de metal e vidro reforçado. Lá fora, -60°C. Lá dentro, o Núcleo Térmico começa a falhar pela terceira vez esta semana.',
      text: 'Sem o núcleo funcionando a plena carga, a colônia inteira tem, no máximo, algumas semanas antes que o frio comece a entrar pelas fresta. Helena Frost já reuniu uma pequena equipe para partir em busca do Reator Aurora — uma tecnologia perdida, capaz de reverter tudo isso.',
      dialogue: {
        name: 'Helena Frost',
        portrait: '',
        lines: [
          'Não vou mentir: as chances são péssimas. Mas ficar aqui esperando o núcleo falhar de vez também é uma escolha — só que pior.',
          'Se você vai liderar essa expedição, prepare-se bem. O gelo lá fora não perdoa erro.'
        ]
      },
      choices: [
        { text: 'Conversar com os líderes da colônia', to: 'cap02', addItems: [{ id: 'radio_comunicador', qty: 1 }], xp: 6, className: 'reward' },
        { text: 'Inspecionar o gerador do Núcleo Térmico', to: 'cap02', addItems: [{ id: 'machado_sobrevivencia', qty: 1 }], xp: 6, className: 'reward' },
        { text: 'Preparar os equipamentos de expedição', to: 'cap02', addItems: [{ id: 'casaco_termico', qty: 1 }], xp: 6, className: 'reward' }
      ]
    },
    cap02: {
      title: '2. A Tempestade Branca',
      scene: 'A equipe deixa a cúpula da colônia bem quando uma nevasca gigantesca engole o horizonte inteiro em poucos minutos.',
      text: 'Visibilidade quase nula. Vento cortante. Cada decisão agora envolve equilibrar energia, temperatura corporal e o pouco de comida que vocês carregam — gastar demais de um pode custar caro em outro.',
      randomEvent: { chance: 0.3, text: 'Uma rajada de vento gelado corta através do casaco antes que você consiga se proteger.', damage: 4 },
      choices: [
        { text: 'Gastar energia extra para manter a equipe aquecida', to: 'cap03', xp: 8 },
        { text: 'Economizar energia e enfrentar o frio com o que vocês têm', to: 'cap03', damage: 5, className: 'danger' },
        { text: 'Buscar abrigo em uma estrutura próxima antes de continuar', to: 'cap03', addItems: [{ id: 'kit_medico', qty: 1 }], xp: 5, className: 'reward' }
      ]
    },
    cap03: {
      title: '3. A Cidade Congelada',
      scene: 'Arranha-céus inteiros presos no gelo formam um cemitério de vidro e aço. Nada se move — mas você tem a sensação incômoda de estar sendo observado.',
      text: 'Suprimentos ainda podem ser encontrados aqui, mas algumas dessas ruínas abrigam criaturas que se adaptaram ao frio extremo tempo demais para serem descuidadas.',
      dialogue: {
        name: 'Noah',
        portrait: '',
        lines: [
          'Vi luz num prédio ali na esquina há dois dias. Pode ser sobrevivente, pode ser outra coisa. Melhor irmos com calma.'
        ]
      },
      randomEvent: { chance: 0.3, text: 'Um estalo alto ecoa entre os prédios congelados. Algo se move nas sombras antes de sumir de novo.', damage: 4 },
      treasure: { id: 'mascara_ruinas_geladas', text: '🎒 Vasculhar um apartamento abandonado em busca de suprimentos', reward: { addItems: [{ id: 'mascara_anticongelante', qty: 1 }], gold: 8 } },
      choices: [
        { text: 'Seguir com cuidado até o metrô subterrâneo', to: 'cap04' }
      ]
    },
    cap04: {
      title: '4. O Metrô Subterrâneo',
      scene: 'Escadas cobertas de gelo descem até túneis que, surpreendentemente, ainda têm luzes de emergência acesas. Alguma coisa aqui embaixo ainda tem energia.',
      text: 'Portas eletrônicas bloqueiam o caminho, protegidas por um painel de controle que precisa ser reativado na ordem certa — errar pode travar tudo, ou pior, atrair atenção indesejada.',
      puzzle: {
        question: 'Para reativar as portas do metrô sem disparar o alarme, o que deve ser ligado primeiro: a energia principal, o backup, ou o alarme?',
        answer: 'a energia principal',
        successText: 'As portas deslizam abertas em silêncio. Nenhum alarme disparado.',
        failText: 'Luzes vermelhas piscam ao longo do túnel inteiro. Vocês não estão mais sozinhos.',
        reward: { xp: 15, addItems: [{ id: 'machado_gelo', qty: 1 }] },
        damage: 4,
        setFlag: 'metro_silencioso'
      },
      choices: [
        { text: 'Avançar pelos túneis', to: 'cap04_batalha' }
      ]
    },
    cap04_batalha: {
      title: '4. Ninhos nos Túneis',
      text: 'O barulho do painel reativado atraiu companhia. Aranhas do Gelo, do tamanho de cães grandes, descem pelas paredes cobertas de teias congeladas.',
      enemy: { id: 'aranhas_gelo', name: 'Aranhas do Gelo', hp: 26, atk: 6, def: 2, xp: 22, rewardGold: 12, rewardItems: [{ id: 'bateria_plasma', qty: 1 }], image: '' },
      winTo: 'cap05',
      loseTo: 'derrota'
    },
    cap05: {
      title: '5. A Alcateia Branca',
      scene: 'Uma matilha de lobos brancos gigantes corta o caminho da expedição, rosnando baixo, mantendo distância — por enquanto.',
      text: 'Eles são grandes demais para serem lobos comuns, adaptados ao frio de um jeito que nenhum livro de biologia previa. Um filhote menor observa de longe, separado do resto do grupo.',
      choices: [
        { text: 'Enfrentar a alcateia diretamente', to: 'cap05_batalha' },
        { text: 'Tentar se aproximar do filhote separado, com calma', to: 'cap06', flags: { aliado_lobo: true }, xp: 15, className: 'reward' },
        { text: 'Fugir pelo gelo fino, arriscando a travessia', to: 'cap06', damage: 6, className: 'danger' }
      ]
    },
    cap05_batalha: {
      title: '5. A Fúria da Matilha',
      text: 'Não há mais espaço para negociação. A alcateia inteira avança de uma vez, cercando a expedição pelas laterais.',
      enemy: { id: 'lobos_brancos', name: 'Lobos Brancos Gigantes', hp: 30, atk: 7, def: 2, xp: 26, rewardGold: 14, rewardItems: [{ id: 'rifle_criogenico', qty: 1 }], image: '' },
      winTo: 'cap06',
      loseTo: 'derrota'
    },
    cap06: {
      title: '6. A Colônia Rival',
      scene: 'Um assentamento improvisado surge entre destroços reforçados com placas de metal. Uma mulher de expressão dura se adianta, mão próxima da arma no cinto.',
      text: 'Essa colônia rival está tão desesperada quanto a sua. Recursos escassos tornam qualquer encontro entre grupos de sobreviventes uma negociação tensa — ou pior.',
      dialogue: {
        name: 'Mira',
        portrait: '',
        lines: [
          'Não recebemos visitas boas há muito tempo. Me dê um motivo para tratar vocês diferente.'
        ]
      },
      choices: [
        { text: 'Compartilhar parte dos seus suprimentos com a colônia rival', to: 'cap07', flags: { rival_aliada: true }, xp: 15, className: 'reward' },
        { text: 'Negociar uma troca justa de recursos', to: 'cap07', flags: { rival_neutra: true }, xp: 10 },
        { text: 'Roubar suprimentos enquanto eles não percebem', to: 'cap07', addItems: [{ id: 'kit_medico', qty: 1 }], flags: { rival_inimiga: true }, damage: 5, className: 'danger' }
      ]
    },
    cap07: {
      title: '7. A Base Polar',
      scene: 'Uma instalação científica abandonada emerge do gelo, salas inteiras preservadas quase intactas pelo frio extremo.',
      text: 'Nos arquivos da base, um nome aparece repetidas vezes: Dr. Viktor Sokolov. E, para sua surpresa, ele ainda está vivo — vivendo escondido entre os laboratórios congelados.',
      dialogue: {
        name: 'Dr. Viktor Sokolov',
        portrait: '',
        lines: [
          'Vocês acham que isso foi um desastre natural? Não foi. O colapso climático foi acelerado, de propósito, por quem construiu o Reator Aurora.',
          'Os registros completos estão em um servidor protegido. Se conseguirem acessá-los, vão entender exatamente o que estão prestes a reativar.'
        ]
      },
      puzzle: {
        question: 'O servidor pede a última pergunta de segurança do projeto original: "O que a humanidade tentou controlar, e nunca conseguiu de verdade?"',
        answer: 'o clima',
        successText: 'O servidor libera os registros completos. A verdade sobre a era glacial finalmente aparece.',
        failText: 'O servidor bloqueia o acesso por alguns minutos preciosos, negando a resposta errada.',
        reward: { xp: 18 },
        damage: 3,
        setFlag: 'tecnologia_adaptativa'
      },
      choices: [
        { text: 'Seguir para o Lago Congelado', to: 'cap08' }
      ]
    },
    cap08: {
      title: '8. O Lago Congelado',
      scene: 'Um lago imenso, coberto por uma camada de gelo que range a cada passo. Sob a superfície translúcida, uma sombra enorme dorme, quieta.',
      text: 'Atravessar rápido demais pode rachar o gelo. Atravessar fazendo barulho demais pode acordar o que dorme lá embaixo. Existe um jeito certo de fazer isso — e vários jeitos errados.',
      puzzle: {
        question: 'Para atravessar sem despertar a criatura, o ritmo dos passos deve ser: constante e rápido, constante e lento, ou irregular?',
        answer: 'constante e lento',
        successText: 'A travessia termina em silêncio quase completo. A sombra sob o gelo nem se move.',
        failText: 'O gelo racha sob os pés de alguém, e a sombra lá embaixo se agita, incomodada.',
        reward: { xp: 18 },
        damage: 6,
        setFlag: 'lago_atravessado'
      },
      choices: [
        { text: 'Seguir para os trilhos abandonados', to: 'cap09' }
      ]
    },
    cap09: {
      title: '9. O Trem do Gelo',
      scene: 'Um trem movido a energia nuclear permanece parado sobre trilhos cobertos de gelo há décadas, mas os painéis internos ainda piscam fracamente.',
      text: 'Restaurar esse trem pode economizar dias inteiros de viagem a pé pelo gelo. O problema é que boa parte do sistema precisa ser reconectada manualmente, sem manual nenhum para consultar.',
      sideQuest: { id: 'restaurar_trem', title: 'Restaurar o Trem do Gelo', desc: 'O trem nuclear abandonado pode ser reativado, mas exige tempo e cuidado com os sistemas internos.' },
      choices: [
        { text: 'Reconectar o sistema com cuidado, testando cada etapa', to: 'cap10', completeSideQuest: 'restaurar_trem', sideQuestReward: { xp: 20, gold: 15 }, addItems: [{ id: 'nucleo_energia', qty: 1 }], className: 'reward' },
        { text: 'Forçar a partida do trem sem testar tudo', to: 'cap10', damage: 5, className: 'danger' }
      ]
    },
    cap10: {
      title: '10. O Reator Aurora',
      scene: 'Depois de tanto tempo no gelo, a instalação do Reator Aurora finalmente aparece no horizonte — imensa, intacta, e cercada por outro grupo que chegou primeiro.',
      text: 'Silhuetas armadas se movem ao redor da entrada principal. Seja quem for esse outro grupo de sobreviventes, eles não parecem dispostos a dividir o que encontraram.',
      choices: [
        { text: 'Negociar acesso conjunto ao reator com Mira e seu grupo', to: 'cap11', requiresFlag: 'rival_aliada', xp: 15, className: 'reward' },
        { text: 'Enfrentar o grupo rival pelo controle do reator', to: 'cap10_batalha' }
      ]
    },
    cap10_batalha: {
      title: '10. Disputa pelo Reator',
      text: 'Não há mais espaço para conversa. Mercenários sobreviventes abrem fogo assim que percebem a expedição se aproximando da entrada.',
      enemy: { id: 'mercenarios_sobreviventes', name: 'Mercenários Sobreviventes', hp: 34, atk: 8, def: 3, xp: 30, rewardGold: 20, rewardItems: [{ id: 'pocao_vida', qty: 1 }], image: '' },
      winTo: 'cap11',
      loseTo: 'derrota'
    },
    cap11: {
      title: '11. O Guardião Mecânico',
      scene: 'No coração do Reator Aurora, um robô massivo desperta de um longo período de espera, sensores vermelhos varrendo a sala em busca de intrusos.',
      text: 'O Guardião MK-9 foi construído para proteger o reator de qualquer um — inclusive de quem só quer salvar o que resta da humanidade.',
      enemy: { id: 'guardiao_mk9', name: 'Guardião MK-9', hp: 46, atk: 9, def: 4, xp: 50, rewardGold: 28, rewardItems: [{ id: 'cristal_aurora', qty: 1 }], image: '' },
      winTo: 'cap12',
      loseTo: 'derrota'
    },
    cap12: {
      title: '12. O Último Sacrifício',
      scene: 'Com o Guardião desativado, o Reator Aurora finalmente está ao alcance — mas reativá-lo por completo exige uma quantidade de energia que a expedição talvez não tenha.',
      text: 'Existem caminhos diferentes daqui em diante. Alguns exigem o que vocês conseguiram recolher pelo caminho. Outros exigem um preço que nenhum equipamento consegue pagar.',
      choices: [
        { text: 'Usar o Núcleo de Energia para reativar o reator com segurança', to: 'final_primavera', requiresItem: 'nucleo_energia', className: 'reward' },
        { text: 'Aplicar a tecnologia adaptativa descoberta na Base Polar', to: 'final_novo_mundo', requiresFlag: 'tecnologia_adaptativa', className: 'reward' },
        { text: 'Arriscar sua própria vida no núcleo, sem energia suficiente', to: 'final_inverno_eterno', className: 'danger' },
        { text: 'Recuar e proteger apenas a Colônia Aurora', to: 'final_ultimo_refugio' }
      ]
    },
    final_primavera: {
      title: '13. Um Novo Amanhecer — A Primavera Retorna',
      text: 'O Núcleo de Energia é exatamente o que faltava. O Reator Aurora desperta por completo, estabilizando o clima pouco a pouco nas semanas seguintes.\n\nA neve começa a derreter pela primeira vez em anos. A humanidade, afinal, ganha a chance de reconstruir o que perdeu.',
      end: true
    },
    final_novo_mundo: {
      title: '13. Um Novo Amanhecer — Um Novo Mundo',
      text: 'Em vez de forçar o reator a reverter o clima, vocês aplicam a tecnologia adaptativa descoberta nos registros de Sokolov. A humanidade para de lutar contra o frio extremo e aprende, finalmente, a viver em harmonia com ele.\n\nO inverno continua — mas agora é apenas mais um lugar onde as pessoas conseguem chamar de lar.',
      end: true
    },
    final_inverno_eterno: {
      title: '13. Um Novo Amanhecer — O Inverno Eterno',
      text: 'Sem energia suficiente, o núcleo do reator consome tudo o que você tem para dar e ainda assim não é o bastante. O Reator Aurora permanece inativo.\n\nAs últimas colônias, uma a uma, desaparecem sob a neve. O silêncio que resta é o único sinal de que a humanidade um dia existiu ali.',
      end: true
    },
    final_ultimo_refugio: {
      title: '13. Um Novo Amanhecer — O Último Refúgio',
      text: 'Vocês recuam antes que seja tarde demais, levando de volta o que conseguiram recolher pelo caminho. Não é a vitória que a expedição buscava, mas é o suficiente para manter a Colônia Aurora funcionando por mais um pouco.\n\nEla se torna, aos poucos, o último grande abrigo humano na Terra — pequeno, frio, mas vivo.',
      end: true
    },
    derrota: {
      title: 'Derrota',
      text: 'O frio extremo não perdoa erros. A expedição termina antes de alcançar seu objetivo, e o gelo continua avançando, silencioso, sobre o que resta do mundo.',
      end: true
    }
  },
  items: {
    pao: { name: 'Ração de Emergência', type: 'consumable', heal: 4, desc: 'Restaura 4 de vida.' },
    pocao_vida: { name: 'Kit Médico Avançado', type: 'consumable', heal: 12, desc: 'Restaura 12 de vida.' },
    orbe_arcano: { name: 'Orbe Arcano', type: 'class', desc: 'Item inicial do Mago.' },
    gazua: { name: 'Gazua', type: 'class', desc: 'Item inicial do Ladino.' },
    casaco_termico: { name: 'Casaco Térmico', type: 'gear', desc: 'Reduz o impacto do frio extremo durante a expedição.' },
    machado_sobrevivencia: { name: 'Machado de Sobrevivência', type: 'weapon', desc: 'Ferramenta e arma, útil tanto para cortar gelo quanto para lutar.' },
    radio_comunicador: { name: 'Rádio Comunicador', type: 'tool', desc: 'Mantém contato com a Colônia Aurora durante a expedição.' },
    kit_medico: { name: 'Kit Médico', type: 'consumable', heal: 8, desc: 'Restaura 8 de vida.' },
    mascara_anticongelante: { name: 'Máscara Anticongelante', type: 'gear', desc: 'Protege o rosto contra o vento gelado extremo.' },
    machado_gelo: { name: 'Machado de Gelo', type: 'weapon', desc: 'Mais afiado e resistente que ferramentas comuns, forjado para o frio.' },
    bateria_plasma: { name: 'Bateria de Plasma', type: 'tool', desc: 'Fornece energia extra para equipamentos eletrônicos.' },
    rifle_criogenico: { name: 'Rifle Criogênico', type: 'weapon', desc: 'Dispara rajadas capazes de congelar um alvo instantaneamente.' },
    nucleo_energia: { name: 'Núcleo de Energia', type: 'quest', desc: 'Extraído do Trem do Gelo restaurado. Essencial para reativar o Reator Aurora.' },
    cristal_aurora: { name: 'Cristal Aurora', type: 'relic', desc: 'Fragmento do núcleo do Guardião MK-9, ainda pulsando com energia residual.' }
  }
};

export default aventura;
