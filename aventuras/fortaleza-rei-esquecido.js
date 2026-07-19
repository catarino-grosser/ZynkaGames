// Aventura comercial para Zynka RPG 3.0
// Coloque imagens em assets/img/ e áudios em assets/audio/ quando quiser ativar mídia real.

const aventura = {
  id: 'fortaleza_rei_esquecido',
  title: 'A Fortaleza do Rei Esquecido',
  icon: '👑',
  genre: 'Fantasia sombria',
  difficulty: 'Média',
  estimatedTime: '25 a 40 min',
  desc: 'Uma campanha com 15 capítulos, NPCs, missões secundárias, tesouros, enigmas, eventos aleatórios e batalhas contra guardiões amaldiçoados.',
  start: 'cap01',
  maxChapters: 15,
  assets: {
    music: './assets/musicas/TrilhaAventuraEpica1.mp3',
    sfx: { click: '', attack: '', victory: '', item: '', levelup: '', puzzle: '' }
  },
  chapters: {
    cap01: {
      title: '1. A Ponte da Fortaleza',
      image: '',
      scene: 'Uma ponte de pedra rachada atravessa um abismo coberto por névoa azul. Ao fundo, a fortaleza ergue torres quebradas como dentes de um gigante morto.',
      text: 'Você chega à Fortaleza do Rei Esquecido pouco antes da meia-noite. Dizem que o rei Aldren desapareceu ali durante a última guerra contra o feiticeiro Morvath. Desde então, nenhum sino tocou, nenhuma janela acendeu e nenhum soldado voltou para casa.\n\nNo centro da ponte, um velho guarda segura uma lanterna sem chama. Ele parece vivo, mas sua sombra não toca o chão.',
      dialogue: { name: 'Velho Guarda', portrait: '', lines: ['A fortaleza abre as portas apenas para quem carrega coragem... ou culpa.', 'Se entrar, procure o Coração de Cristal antes que Morvath desperte.'] },
      effect: { gold: 8, addItems: [{ id: 'pao', qty: 1 }] },
      sideQuest: { id: 'flores_tumulo', title: 'Flores para os Caídos', desc: 'O velho guarda pede que você encontre flores lunares no jardim subterrâneo e leve ao túmulo dos soldados.' },
      choices: [
        { text: 'Atravessar a ponte com cautela', to: 'cap02' },
        { text: 'Pedir mais informações ao guarda', to: 'cap03', className: 'reward' },
        { text: 'Correr pela ponte antes que ela desabe', to: 'cap02', damage: 4, className: 'danger' }
      ]
    },
    cap02: {
      title: '2. O Pátio dos Estandartes',
      image: '',
      scene: 'Estandartes rasgados balançam sem vento. A fonte central está seca, mas seu fundo brilha com moedas antigas.',
      text: 'O pátio principal parece abandonado há séculos. Armaduras vazias estão posicionadas em fileiras, como se ainda esperassem uma ordem de batalha. Ao pisar na pedra central, você escuta um rangido metálico vindo dos muros.\n\nUma inscrição no chão diz: “Honre os mortos ou junte-se a eles.”',
      randomEvent: { chance: 0.45, text: 'Um corvo branco pousa na fonte e deixa cair uma moeda real antes de desaparecer na névoa.', reward: { gold: 6 } },
      treasure: { id: 'fonte_moedas', text: '💰 Procurar moedas no fundo da fonte', reward: { gold: 12, addItems: [{ id: 'moeda_real', qty: 1 }] } },
      choices: [
        { text: 'Entrar pelo salão principal', to: 'cap04' },
        { text: 'Investigar a porta lateral', to: 'cap05' }
      ]
    },
    cap03: {
      title: '3. O Aviso do Guarda',
      text: 'O guarda aproxima a lanterna apagada do próprio rosto. Por um instante, você vê que seus olhos são dois pontos de luz prateada. Ele serviu ao rei Aldren quando a fortaleza ainda respirava.\n\nEle conta que Morvath não morreu: apenas dorme preso no subsolo. Se o Coração de Cristal for removido sem o juramento correto, o feiticeiro acordará mais forte.',
      dialogue: { name: 'Velho Guarda', portrait: '', lines: ['Leve esta chave. Ela não abre portas comuns. Ela abre lembranças.', 'E lembre-se: a coroa pesa mais quando usada por mãos ambiciosas.'] },
      effect: { addItems: [{ id: 'chave_memoria', qty: 1 }], xp: 8 },
      choices: [
        { text: 'Agradecer e seguir para o pátio', to: 'cap02' }
      ]
    },
    cap04: {
      title: '4. O Salão das Armaduras',
      text: 'O salão principal é iluminado por raios de lua que atravessam vitrais quebrados. Cada armadura segura uma espada apontada para baixo. Quando você passa pelo tapete vermelho, uma delas ergue a cabeça vazia.\n\nO metal range como ossos. A primeira guardiã desperta.',
      enemy: { id: 'armadura_vazia', name: 'Armadura Vazia', hp: 20, atk: 5, def: 2, xp: 18, rewardGold: 10, rewardItems: [{ id: 'fragmento_ferro_real', qty: 1 }], image: '' },
      winTo: 'cap06',
      loseTo: 'derrota'
    },
    cap05: {
      title: '5. A Biblioteca Esquecida',
      scene: 'Prateleiras tortas alcançam o teto. Livros sem capa respiram poeira. Uma mesa conserva um diário aberto, embora não exista vento para virar suas páginas.',
      text: 'A biblioteca lateral guarda mapas, diários e cartas de soldados que nunca foram enviadas. Um retrato do rei Aldren observa a sala com tristeza. Ao lado dele, há uma caixa trancada marcada com o símbolo da memória.\n\nNo diário, você lê sobre três palavras usadas no juramento real: coragem, renúncia e verdade.',
      puzzle: { question: 'Qual palavra completa o juramento do rei: coragem, renúncia e ____?', answer: 'verdade', successText: 'A caixa se abre silenciosamente.', reward: { xp: 12, addItems: [{ id: 'diario_rei', qty: 1 }, { id: 'runa_verdade', qty: 1 }] }, setFlag: 'sabe_juramento' },
      treasure: { id: 'caixa_memoria', text: '💰 Abrir a caixa com a Chave da Memória', requiresItem: 'chave_memoria', reward: { gold: 15, addItems: [{ id: 'anel_memoria', qty: 1 }] } },
      choices: [
        { text: 'Voltar ao salão principal', to: 'cap04' },
        { text: 'Descer por uma escada escondida', to: 'cap07', requiresFlag: 'sabe_juramento' }
      ]
    },
    cap06: {
      title: '6. A Galeria dos Reis',
      text: 'Depois da batalha, uma porta se abre para a galeria dos antigos reis. Seus retratos cobrem as paredes, mas o quadro de Aldren está vazio, como se ele tivesse saído da própria pintura.\n\nNo fim da galeria, uma voz feminina ecoa. É a capitã Elira, última comandante da guarda real, presa entre vida e morte.',
      dialogue: { name: 'Capitã Elira', portrait: '', lines: ['Morvath corrompeu nossos juramentos. Só uma lâmina abençoada pode ferir seu verdadeiro corpo.', 'Encontre a capela caída. Lá resta uma centelha de luz.'] },
      effect: { addItems: [{ id: 'mapa_capela', qty: 1 }], flags: { conheceu_elira: true } },
      choices: [
        { text: 'Procurar a capela caída', to: 'cap08', className: 'reward' },
        { text: 'Ignorar o aviso e descer às catacumbas', to: 'cap07', className: 'danger' }
      ]
    },
    cap07: {
      title: '7. As Catacumbas Frias',
      text: 'As catacumbas respiram um ar gelado e antigo. Crânios empilhados formam pequenas torres ao longo dos corredores. Uma luz verde pulsa atrás de uma grade enferrujada.\n\nQuando você toca a grade, ossos espalhados pelo chão se juntam em uma criatura armada com uma lança partida.',
      enemy: { id: 'sentinela_ossos', name: 'Sentinela de Ossos', hp: 24, atk: 6, def: 2, xp: 22, rewardGold: 14, rewardItems: [{ id: 'osso_rúnico', qty: 1 }], image: '' },
      winTo: 'cap09',
      loseTo: 'derrota'
    },
    cap08: {
      title: '8. A Capela Caída',
      image: '',
      scene: 'A capela está semi-enterrada. O teto desabou, deixando a lua iluminar um altar quebrado e uma espada coberta por poeira branca.',
      text: 'A capela caída ainda conserva silêncio sagrado. No altar, uma espada antiga repousa sob vitrais partidos. Quando você se aproxima, uma chama pequena surge no centro da lâmina.\n\nUma inscrição diz que a arma aceita apenas quem promete proteger a fortaleza, não saqueá-la.',
      effect: { atk: 2, addItems: [{ id: 'espada_lunar', qty: 1 }], flags: { espada_abencoada: true } },
      choices: [
        { text: 'Fazer o juramento e pegar a espada', to: 'cap09', className: 'reward', xp: 10 },
        { text: 'Pegar a espada sem juramento', to: 'cap09', damage: 5, className: 'danger' }
      ]
    },
    cap09: {
      title: '9. O Jardim Subterrâneo',
      scene: 'Flores prateadas crescem sob a terra, iluminadas por raízes brilhantes. Pequenos vaga-lumes desenham símbolos no ar.',
      text: 'Você chega a um jardim impossível sob a fortaleza. A grama é macia, a água corre em silêncio e flores lunares brotam ao redor de estátuas sem rosto.\n\nNo centro do jardim, uma gárgula de pedra segura um vaso vazio. Seus olhos se acendem quando você colhe a primeira flor.',
      enemy: { id: 'gargula_jardim', name: 'Gárgula do Jardim', hp: 28, atk: 7, def: 3, xp: 28, rewardGold: 18, rewardItems: [{ id: 'flor_lunar', qty: 3 }], image: '', completeSideQuest: 'flores_tumulo', sideQuestReward: { xp: 20, gold: 10 } },
      winTo: 'cap10',
      loseTo: 'derrota'
    },
    cap10: {
      title: '10. O Túmulo dos Soldados',
      text: 'Atrás do jardim, você encontra fileiras de túmulos simples. Alguns nomes foram apagados pelo tempo. Outros parecem ter sido riscados por garras.\n\nQuando as flores lunares tocam a primeira sepultura, o ar fica mais leve. Vozes distantes sussurram agradecimentos. Entre as pedras, uma proteção antiga desperta ao seu redor.',
      effect: { def: 1, addItems: [{ id: 'bencao_soldados', qty: 1 }] },
      choices: [
        { text: 'Entrar no laboratório do alquimista', to: 'cap11' },
        { text: 'Voltar para procurar passagens secretas', to: 'cap05', className: 'reward' }
      ]
    },
    cap11: {
      title: '11. O Laboratório de Morvath',
      text: 'Frascos rachados cobrem mesas de pedra. Dentro deles, sombras pequenas se mexem como peixes presos em vidro. No quadro negro, fórmulas misturam alquimia e necromancia.\n\nUm recipiente intacto contém uma poção vermelha. Outro guarda uma chave negra. Entre os dois há um aviso: “Toda cura cobra uma lembrança.”',
      randomEvent: { chance: 0.5, text: 'Uma sombra foge de um frasco quebrado e arranha seu braço antes de desaparecer.', damage: 5 },
      choices: [
        { text: 'Pegar a poção vermelha', to: 'cap12', addItems: [{ id: 'pocao_vida', qty: 2 }], className: 'reward' },
        { text: 'Pegar a chave negra', to: 'cap12', addItems: [{ id: 'chave_negra', qty: 1 }], damage: 3 },
        { text: 'Destruir os frascos sombrios', to: 'cap12', xp: 15, flags: { laboratorio_purificado: true }, className: 'reward' }
      ]
    },
    cap12: {
      title: '12. O Salão dos Espelhos',
      scene: 'Espelhos altos refletem versões diferentes de você: herói, rei, traidor, fantasma.',
      text: 'O salão dos espelhos tenta confundir sua memória. Em um reflexo, você aparece usando a coroa de Aldren. Em outro, aparece servindo Morvath.\n\nNo espelho central, uma frase surge lentamente: “Quem procura poder encontra prisão. Quem procura verdade encontra saída.”',
      puzzle: { question: 'Segundo o espelho, o que encontra a saída?', answer: 'verdade', successText: 'O espelho se parte e revela uma passagem.', reward: { xp: 18, flags: { espelho_vencido: true } }, setFlag: 'passagem_cristal' },
      choices: [
        { text: 'Entrar pela passagem revelada', to: 'cap13', requiresFlag: 'passagem_cristal' },
        { text: 'Quebrar um espelho à força', to: 'cap13', damage: 6, className: 'danger' }
      ]
    },
    cap13: {
      title: '13. A Câmara do Coração de Cristal',
      image: '',
      text: 'A câmara final pulsa com luz azul. No centro, o Coração de Cristal flutua sobre um pedestal. Dentro dele, você vê cenas da fortaleza antes da queda: crianças correndo, soldados rindo, o rei jurando proteger seu povo.\n\nEntão a sombra de Morvath se desprende do teto e sorri. Ele estava esperando alguém forte o bastante para chegar até ali.',
      dialogue: { name: 'Morvath', portrait: '', lines: ['Obrigado por abrir o caminho.', 'Agora escolha: sirva-me com a coroa ou morra defendendo um rei esquecido.'] },
      choices: [
        { text: 'Recusar Morvath e proteger o cristal', to: 'cap14', requiresFlag: 'espada_abencoada', className: 'reward' },
        { text: 'Fingir aceitar para ganhar tempo', to: 'cap14', requiresItem: 'anel_memoria' },
        { text: 'Atacar sem preparação', to: 'cap14', damage: 8, className: 'danger' }
      ]
    },
    cap14: {
      title: '14. A Batalha Contra Morvath',
      text: 'Morvath ergue as mãos e a fortaleza inteira responde. Pedras flutuam, vitrais se recompõem em imagens de guerra e as sombras dos soldados tombados cercam a câmara.\n\nA Espada Lunar vibra em sua mão. O Coração de Cristal pulsa uma última vez, como se pedisse que você decidisse o destino do reino.',
      enemy: { id: 'morvath', name: 'Morvath, o Feiticeiro Supremo', hp: 42, atk: 9, def: 4, xp: 55, rewardGold: 35, rewardItems: [{ id: 'coracao_cristal', qty: 1 }], image: '', setFlag: 'morvath_derrotado' },
      winTo: 'cap15',
      loseTo: 'derrota'
    },
    cap15: {
      title: '15. O Novo Juramento',
      text: 'Quando Morvath cai, a fortaleza para de tremer. A névoa recua das janelas, e pela primeira vez em séculos, o amanhecer toca os salões do Rei Esquecido.\n\nO Coração de Cristal repousa diante de você. Levá-lo pode salvar vilas distantes. Deixá-lo pode restaurar a fortaleza. Destruí-lo pode impedir que outro feiticeiro tente usá-lo.',
      choices: [
        { text: 'Levar o Coração de Cristal para salvar o povo', to: 'final_povo', requiresItem: 'coracao_cristal', className: 'reward' },
        { text: 'Deixar o cristal e restaurar a fortaleza', to: 'final_fortaleza', requiresItem: 'coracao_cristal' },
        { text: 'Destruir o cristal para encerrar a maldição', to: 'final_sacrificio', requiresItem: 'coracao_cristal', className: 'danger' }
      ]
    },
    final_povo: { title: 'Final: O Salvador das Vilas', text: 'Você leva o Coração de Cristal para fora da fortaleza. As plantações voltam a crescer, os rios clareiam e seu nome passa a ser lembrado em canções simples, cantadas por pessoas que jamais saberão o quanto você quase perdeu.', end: true },
    final_fortaleza: { title: 'Final: O Guardião da Fortaleza', text: 'Você devolve o cristal ao pedestal. A fortaleza desperta como um farol no alto da montanha. O velho guarda sorri pela última vez antes de desaparecer. Um novo juramento começa.', end: true },
    final_sacrificio: { title: 'Final: O Fim da Maldição', text: 'Você quebra o Coração de Cristal. A explosão de luz consome sombras, memórias e tesouros. A fortaleza vira ruína, mas Morvath jamais voltará. Às vezes, vencer significa não levar nada consigo.', end: true },
    derrota: { title: 'Derrota', text: 'Sua jornada termina nas pedras frias da fortaleza. Mas toda lenda pode ser recontada, e todo herói pode tentar novamente.', end: true }
  },
  items: {
    pao: { name: 'Pão de Viagem', type: 'consumable', heal: 4, desc: 'Restaura 4 de vida.' },
    pocao_vida: { name: 'Poção de Vida', type: 'consumable', heal: 12, desc: 'Restaura 12 de vida.' },
    orbe_arcano: { name: 'Orbe Arcano', type: 'class', desc: 'Item inicial do Mago.' },
    gazua: { name: 'Gazua', type: 'class', desc: 'Item inicial do Ladino.' },
    chave_memoria: { name: 'Chave da Memória', type: 'key', desc: 'Abre caixas ligadas às lembranças do rei.' },
    moeda_real: { name: 'Moeda Real', type: 'treasure', desc: 'Moeda antiga da fortaleza.' },
    fragmento_ferro_real: { name: 'Fragmento de Ferro Real', type: 'quest', desc: 'Pedaço da armadura amaldiçoada.' },
    diario_rei: { name: 'Diário do Rei', type: 'quest', desc: 'Contém parte do juramento real.' },
    runa_verdade: { name: 'Runa da Verdade', type: 'quest', desc: 'Brilha diante de mentiras.' },
    anel_memoria: { name: 'Anel da Memória', type: 'relic', desc: 'Ajuda a resistir às ilusões de Morvath.' },
    mapa_capela: { name: 'Mapa da Capela', type: 'map', desc: 'Mostra a entrada da capela caída.' },
    osso_rúnico: { name: 'Osso Rúnico', type: 'quest', desc: 'Restos de um sentinela amaldiçoado.' },
    espada_lunar: { name: 'Espada Lunar', type: 'weapon', atk: 2, desc: 'Lâmina capaz de ferir sombras antigas.' },
    flor_lunar: { name: 'Flor Lunar', type: 'quest', desc: 'Flor usada para honrar os soldados mortos.' },
    bencao_soldados: { name: 'Bênção dos Soldados', type: 'blessing', def: 1, desc: 'Proteção concedida pelos antigos guardas.' },
    chave_negra: { name: 'Chave Negra', type: 'key', desc: 'Abre mecanismos sombrios no laboratório.' },
    coracao_cristal: { name: 'Coração de Cristal', type: 'relic', desc: 'Artefato principal da fortaleza.' }
  }
};

export default aventura;
