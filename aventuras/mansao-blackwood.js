// Aventura comercial para Zynka RPG 3.0 — Mistério • Investigação • Terror Psicológico • Sobrenatural
// Coloque imagens em assets/img/ e áudios em assets/audio/ quando quiser ativar mídia real.

const aventura = {
  id: 'mansao_blackwood',
  title: 'O Segredo da Mansão Blackwood',
  icon: '🕯️',
  genre: 'Terror psicológico e mistério',
  difficulty: 'Média/Difícil',
  estimatedTime: '70 a 100 min',
  desc: 'A Mansão Blackwood está abandonada há mais de cem anos, desde que a família inteira desapareceu em uma única noite. Enviado para investigar o sumiço de um grupo de exploradores, você descobre que a mansão está viva — e que ninguém consegue sair dela depois que a noite cai.',
  start: 'cap01',
  maxChapters: 25,
  assets: {
    music: './assets/musicas/TrilhaTerror.mp3',
    sfx: { click: '', attack: '', victory: '', item: '', levelup: '', puzzle: '' }
  },
  chapters: {
    cap01: {
      title: '1. O Portão Principal',
      image: '',
      scene: 'O portão enferrujado da propriedade range ao ser empurrado. A mansão se ergue no topo da colina, janelas escuras observando cada passo seu.',
      text: 'Uma organização especializada em fenômenos paranormais pediu sua ajuda depois que um grupo inteiro de exploradores desapareceu aqui dentro. O sol já está baixo no horizonte — e, segundo os relatos, é exatamente à noite que a Mansão Blackwood não deixa ninguém sair.',
      effect: { addItems: [{ id: 'chave_mestra', qty: 1 }] },
      choices: [
        { text: 'Entrar pela porta principal', to: 'cap02', addItems: [{ id: 'lanterna', qty: 1 }], xp: 6, className: 'reward' },
        { text: 'Explorar os jardins antes de entrar', to: 'cap02', addItems: [{ id: 'camera_fotografica', qty: 1 }], xp: 6, className: 'reward' },
        { text: 'Investigar o antigo cemitério da família', to: 'cap02', addItems: [{ id: 'diario_investigacao', qty: 1 }], damage: 3, className: 'danger' }
      ]
    },
    cap02: {
      title: '2. O Grande Salão',
      scene: 'Dezenas de retratos da família Blackwood cobrem as paredes de um saguão empoeirado. Alguns rostos pintados parecem sutilmente diferentes toda vez que você pisca.',
      text: 'Você tem certeza de que aquele retrato ali não estava sorrindo há alguns segundos. A mansão parece reagir a cada movimento seu, de um jeito que nenhuma casa deveria conseguir.',
      randomEvent: { chance: 0.3, text: 'Um retrato particularmente antigo pisca os olhos pintados. Um arrepio gelado percorre sua espinha.', damage: 3 },
      puzzle: {
        question: 'Os retratos só mudam de expressão quando você faz o quê: fala em voz alta, olha diretamente para eles, ou vira as costas?',
        answer: 'vira as costas',
        successText: 'Ao testar a teoria, você confirma: os retratos só se movem quando ninguém está olhando diretamente para eles.',
        failText: 'Um retrato inteiro parece sair um pouco do quadro antes de voltar ao lugar, rápido demais para ter certeza do que viu.',
        reward: { xp: 15 },
        damage: 4,
        setFlag: 'retratos_resolvidos'
      },
      treasure: { id: 'diario_segunda_geracao', text: '📖 Recolher um diário caído atrás de um dos retratos', reward: { addItems: [{ id: 'diario_segunda_geracao', qty: 1 }] } },
      choices: [
        { text: 'Seguir para a Biblioteca Proibida', to: 'cap03' }
      ]
    },
    cap03: {
      title: '3. A Biblioteca Proibida',
      scene: 'Estantes altíssimas guardam livros que parecem se reorganizar sozinhos. No chão, um volume encadernado em couro escuro chama sua atenção: o diário pessoal do último mordomo da mansão.',
      text: '"Se alguém encontrar isto, saiba que fiz tudo que pude para avisar os Blackwood. Eles não me ouviram. Agora ninguém mais sai daqui depois do anoitecer — nem os vivos, nem os que deveriam estar mortos." As páginas seguintes descrevem, aos poucos, o que aconteceu naquela última noite.',
      sideQuest: { id: 'diarios_esquecidos', title: 'Os Diários Esquecidos', desc: 'Vários diários da família Blackwood estão espalhados pela mansão. Reunir o máximo possível pode revelar a verdade completa sobre o que aconteceu aqui.' },
      choices: [
        { text: 'Seguir para o Jardim Esquecido', to: 'cap04' }
      ]
    },
    cap04: {
      title: '4. O Jardim Esquecido',
      scene: 'Uma estufa escondida atrás da biblioteca abriga plantas que não deveriam existir e uma fonte de água que brilha com uma luz própria, mesmo no escuro.',
      text: 'Vultos transparentes se movem entre as plantas mutantes, reagindo à sua presença com uma hostilidade silenciosa. Este é o primeiro contato direto que você tem com o que quer que assombre a Mansão Blackwood.',
      enemy: { id: 'espiritos_perdidos', name: 'Espíritos Perdidos', hp: 26, atk: 6, def: 2, xp: 22, rewardGold: 10, rewardItems: [{ id: 'cristal_alma', qty: 1 }], image: '' },
      winTo: 'cap05',
      loseTo: 'derrota'
    },
    cap05: {
      title: '5. O Relógio da Meia-Noite',
      scene: 'Um relógio centenário domina o corredor principal, ponteiros girando devagar demais — ou rápido demais, dependendo de quanto tempo você observa.',
      text: 'Segundo o diário do mordomo, esse relógio controla boa parte do que acontece dentro da mansão. Consertar seu mecanismo pode reorganizar cômodos inteiros — para melhor, ou para pior.',
      puzzle: {
        question: 'Para restaurar o mecanismo do relógio, os ponteiros devem ser ajustados para: meio-dia, meia-noite, ou o horário atual real?',
        answer: 'meia-noite',
        successText: 'O relógio finalmente marca meia-noite de forma estável. Um estalo ecoa pela mansão inteira, como se algo tivesse se realinhado.',
        failText: 'Os ponteiros disparam para trás com força, e uma vibração violenta sacode o corredor.',
        reward: { xp: 18, addItems: [{ id: 'relogio_antigo', qty: 1 }, { id: 'chave_prata', qty: 1 }] },
        damage: 5,
        setFlag: 'relogio_restaurado'
      },
      choices: [
        { text: 'Seguir para o Quarto das Crianças', to: 'cap06' }
      ]
    },
    cap06: {
      title: '6. O Quarto das Crianças',
      scene: 'Brinquedos antigos se movem sozinhos pelo chão empoeirado. No centro do quarto, uma menina translúcida observa você com uma calma que não parece natural.',
      text: 'Ela se apresenta como Emily Blackwood. Diz que conhece todos os segredos da mansão — e que pode ajudá-lo a entender o que realmente aconteceu, se você confiar nela.',
      dialogue: {
        name: 'Emily Blackwood',
        portrait: '',
        lines: [
          'Ninguém nunca acredita em mim primeiro. Todos acham que sou só mais um espírito perdido, igual aos outros.',
          'Mas eu sei coisas que nem meu pai queria que soubessem. Se você confiar em mim, eu conto.'
        ]
      },
      choices: [
        { text: 'Confiar em Emily', to: 'cap07', addItems: [{ id: 'rosa_negra', qty: 1 }], flags: { confiou_emily: true }, xp: 15, className: 'reward' },
        { text: 'Manter distância, sem confiar totalmente', to: 'cap07', flags: { desconfiou_emily: true } }
      ]
    },
    cap07: {
      title: '7. Os Túneis Secretos',
      scene: 'Atrás de uma estante giratória, uma passagem escondida desce até um laboratório alquímico esquecido pela família há gerações.',
      text: 'Símbolos alquímicos cobrem as paredes e o chão, formando um padrão que claramente não é decorativo. Um diário manchado de produtos químicos está aberto sobre uma mesa de trabalho.',
      puzzle: {
        question: 'Segundo os símbolos alquímicos na parede, qual elemento aparece repetido no centro de todos os outros: fogo, água, ou o próprio símbolo da vida eterna?',
        answer: 'o simbolo da vida eterna',
        successText: 'O padrão finalmente faz sentido. Este laboratório inteiro foi construído em torno de uma única obsessão.',
        failText: 'Um dos símbolos no chão brilha por um instante, quente demais para ser tocado sem cuidado.',
        reward: { xp: 18, addItems: [{ id: 'diario_alquimista', qty: 1 }] },
        damage: 4,
        setFlag: 'simbolos_decifrados'
      },
      choices: [
        { text: 'Continuar explorando os túneis', to: 'cap07_batalha' }
      ]
    },
    cap07_batalha: {
      title: '7. Guardiãs Alquímicas',
      text: 'Criaturas formadas por resquícios de experimentos antigos despertam entre os equipamentos quebrados, reagindo à sua presença como se fossem parte de um sistema de segurança nunca desligado.',
      enemy: { id: 'criaturas_alquimicas', name: 'Criaturas Alquímicas', hp: 30, atk: 7, def: 3, xp: 26, rewardGold: 14, image: '' },
      winTo: 'cap08',
      loseTo: 'derrota'
    },
    cap08: {
      title: '8. O Baile Fantasma',
      scene: 'De repente, os corredores da mansão se transformam. Luzes de velas voltam a iluminar tudo, música toca de algum lugar, e convidados em trajes de cem anos atrás dançam ao seu redor.',
      text: 'Você está testemunhando o próprio Baile Fantasma — uma festa que aconteceu exatamente cem anos atrás, na noite do desaparecimento. Interagir demais com esse momento pode ser mais perigoso do que parece.',
      choices: [
        { text: 'Observar o baile em silêncio, sem interferir', to: 'cap09', xp: 15, className: 'reward' },
        { text: 'Tentar impedir uma briga que está prestes a acontecer', to: 'cap09', flags: { preso_no_passado: true }, damage: 5, className: 'danger' },
        { text: 'Se misturar aos convidados e dançar', to: 'cap09', damage: 3 }
      ]
    },
    cap09: {
      title: '9. A Ala Proibida',
      scene: 'Portas que antes pareciam seladas para sempre finalmente se abrem. Do outro lado, os aposentos particulares do patriarca da família guardam um livro encadernado em couro escuro que pulsa levemente.',
      text: 'O Livro das Sombras. Só de olhar para ele, você sente que suas páginas guardam mais do que qualquer diário encontrado até agora.',
      choices: [
        { text: 'Usar a Chave de Prata para abrir os aposentos com cuidado', to: 'cap10', requiresItem: 'chave_prata', addItems: [{ id: 'livro_sombras', qty: 1 }], xp: 15, className: 'reward' },
        { text: 'Forçar a entrada sem a chave', to: 'cap10', addItems: [{ id: 'livro_sombras', qty: 1 }], damage: 5, className: 'danger' },
        { text: 'Compartilhar os diários encontrados com Emily, confiando nela por completo', to: 'cap10', requiresItem: 'diario_alquimista', requiresFlag: 'confiou_emily', completeSideQuest: 'diarios_esquecidos', sideQuestReward: { xp: 30, gold: 20 }, flags: { verdade_emily: true }, className: 'reward' },
        { text: 'Arquivar os diários encontrados sem envolver mais ninguém', to: 'cap10', requiresItem: 'diario_alquimista', completeSideQuest: 'diarios_esquecidos', sideQuestReward: { xp: 20, gold: 10 } }
      ]
    },
    cap10: {
      title: '10. O Ritual Inacabado',
      scene: 'As últimas páginas do Livro das Sombras revelam o que realmente aconteceu naquela noite: um ritual para alcançar a imortalidade, interrompido no pior momento possível.',
      text: 'Algo deu terrivelmente errado. Em vez de vencerem a morte, os Blackwood ficaram presos entre o mundo dos vivos e dos mortos — nem uma coisa, nem outra, para sempre.',
      choices: [
        { text: 'Seguir até o patriarca da família', to: 'cap11' }
      ]
    },
    cap11: {
      title: '11. Lorde Blackwood',
      scene: 'No topo da mansão, uma figura imponente se materializa lentamente, meio sombra, meio homem. Arthur Blackwood finalmente desperta por completo.',
      text: 'Ele não parece surpreso em ver você. Pelo contrário — parece ter esperado esse momento durante cem anos inteiros.',
      dialogue: {
        name: 'Lorde Blackwood',
        portrait: '',
        lines: [
          'Você chegou até aqui por curiosidade, ou por ambição? Não importa. Junte-se a mim, e venceremos a morte juntos.',
          'Recuse, e vai descobrir exatamente por que ninguém mais saiu vivo desta mansão.'
        ]
      },
      choices: [
        { text: 'Aceitar o pacto de Arthur Blackwood', to: 'cap12', flags: { aceitou_pacto: true }, className: 'danger' },
        { text: 'Recusar e enfrentá-lo', to: 'cap11_batalha' }
      ]
    },
    cap11_batalha: {
      title: '11. O Confronto Final',
      text: 'Arthur Blackwood não aceita bem uma recusa. As sombras da mansão inteira parecem se concentrar nele enquanto o confronto começa.',
      enemy: { id: 'lorde_blackwood', name: 'Lorde Blackwood', hp: 48, atk: 9, def: 4, xp: 50, rewardGold: 28, rewardItems: [{ id: 'medalhao_familia', qty: 1 }], image: '' },
      winTo: 'cap12',
      loseTo: 'derrota'
    },
    cap12: {
      title: '12. A Última Chave',
      scene: 'Com todas as chaves da mansão reunidas, um último portal de luz fraca se abre no centro do Grande Salão, esperando por uma decisão final.',
      text: 'A Mansão Blackwood espera. Depois de tudo o que você viu e viveu aqui dentro, resta decidir o que fazer com o que descobriu — e com o que a própria mansão pode se tornar a partir de agora.',
      choices: [
        { text: 'Quebrar a maldição e libertar todas as almas presas', to: 'final_maldicao_quebrada', className: 'reward' },
        { text: 'Assumir o controle da mansão, honrando o pacto com Arthur', to: 'final_herdeiro_sombras', requiresFlag: 'aceitou_pacto', className: 'danger' },
        { text: 'Aceitar permanecer no passado, junto ao Baile Fantasma', to: 'final_prisioneiro_tempo', requiresFlag: 'preso_no_passado' },
        { text: 'Destruir o Livro das Sombras e partir sem revelar nada', to: 'final_segredo_enterrado', requiresItem: 'livro_sombras' },
        { text: 'Confiar em Emily e revelar toda a verdade sobre os Blackwood', to: 'final_verdadeiro_misterio', requiresFlag: 'verdade_emily', className: 'reward' }
      ]
    },
    final_maldicao_quebrada: {
      title: '13. Amanhecer — A Maldição Quebrada',
      text: 'O ritual inverso funciona. Uma a uma, as almas presas na Mansão Blackwood finalmente encontram paz, incluindo Arthur, cuja sombra se dissolve em silêncio.\n\nQuando o sol nasce, pela primeira vez em mais de cem anos, a Mansão Blackwood é só uma casa vazia — nada mais.',
      end: true
    },
    final_herdeiro_sombras: {
      title: '13. Amanhecer — Herdeiro das Sombras',
      text: 'Você aceita o pacto de Arthur Blackwood, tornando-se o novo senhor da mansão. O poder que herda é real — assim como a maldição que vem junto com ele.\n\nO sol nasce lá fora, mas você sabe, sem sombra de dúvida, que nunca mais vai poder atravessar aquele portão em segurança de novo.',
      end: true
    },
    final_prisioneiro_tempo: {
      title: '13. Amanhecer — Prisioneiro do Tempo',
      text: 'Ao alterar o que não devia durante o Baile Fantasma, você se torna parte irreversível daquela noite, presa em loop há cem anos.\n\nOs próximos investigadores que chegarem à Mansão Blackwood talvez encontrem seu retrato pendurado ao lado dos outros — sorrindo, sempre que ninguém estiver olhando diretamente para ele.',
      end: true
    },
    final_segredo_enterrado: {
      title: '13. Amanhecer — O Segredo Enterrado',
      text: 'Você destrói o Livro das Sombras nas chamas de uma lareira esquecida e deixa a mansão sem contar a ninguém o que realmente encontrou lá dentro.\n\nA propriedade permanece fechada, os mistérios continuam vivos, e a verdade sobre os Blackwood fica só com você.',
      end: true
    },
    final_verdadeiro_misterio: {
      title: '13. Amanhecer — O Verdadeiro Mistério',
      text: 'Com a confiança de Emily e os diários reunidos, a verdade finalmente aparece: ela nunca foi uma vítima do ritual. Foi a única que tentou impedi-lo, antes de tudo dar errado.\n\nCom sua ajuda, a alma dela finalmente descansa em paz — e o verdadeiro mistério da Mansão Blackwood, pela primeira vez em cem anos, é contado por inteiro.',
      end: true
    },
    derrota: {
      title: 'Derrota',
      text: 'A Mansão Blackwood reivindica mais um visitante que não conseguiu sair antes do amanhecer. Nos corredores, um retrato novo aparece, silenciosamente, entre os outros.',
      end: true
    }
  },
  items: {
    pao: { name: 'Provisões de Viagem', type: 'consumable', heal: 4, desc: 'Restaura 4 de vida.' },
    pocao_vida: { name: 'Kit de Primeiros Socorros', type: 'consumable', heal: 12, desc: 'Restaura 12 de vida.' },
    orbe_arcano: { name: 'Orbe Arcano', type: 'class', desc: 'Item inicial do Mago.' },
    gazua: { name: 'Gazua', type: 'class', desc: 'Item inicial do Ladino.' },
    lanterna: { name: 'Lanterna', type: 'tool', desc: 'Essencial nos corredores escuros da mansão.' },
    camera_fotografica: { name: 'Câmera Fotográfica', type: 'tool', desc: 'Registra evidências que a mente pode não confiar em lembrar sozinha.' },
    diario_investigacao: { name: 'Diário de Investigação', type: 'tool', desc: 'Onde você anota tudo o que encontra pela mansão.' },
    chave_mestra: { name: 'Chave Mestra', type: 'key', desc: 'Abre a maioria das portas comuns da propriedade.' },
    diario_segunda_geracao: { name: 'Diário da Segunda Geração', type: 'quest', desc: 'Escrito por um dos descendentes Blackwood, escondido atrás de um retrato.' },
    cristal_alma: { name: 'Cristal da Alma', type: 'relic', desc: 'Pulsa com a energia de um espírito recém-libertado.' },
    relogio_antigo: { name: 'Relógio Antigo', type: 'relic', desc: 'Restaurado do mecanismo central da mansão.' },
    chave_prata: { name: 'Chave de Prata', type: 'key', desc: 'Abre passagens que a Chave Mestra sozinha não alcança.' },
    rosa_negra: { name: 'Rosa Negra', type: 'quest', desc: 'Presente de Emily Blackwood, dado a quem ela decide confiar.' },
    diario_alquimista: { name: 'Diário do Alquimista', type: 'quest', desc: 'Encontrado no laboratório escondido, descreve o ritual em detalhes perturbadores.' },
    livro_sombras: { name: 'Livro das Sombras', type: 'relic', desc: 'Guarda os segredos mais perigosos da família Blackwood.' },
    medalhao_familia: { name: 'Medalhão da Família', type: 'relic', desc: 'Recuperado de Arthur Blackwood após o confronto final.' }
  }
};

export default aventura;
