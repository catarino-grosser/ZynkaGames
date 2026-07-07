export default {
  id: 'cidade-dos-mortos',
  title: 'A Cidade dos Mortos',
  icon: '🧟',
  genre: 'Sobrevivência',
  desc: 'Procure suprimentos, fuja dos infectados e tente chegar ao rádio da delegacia.',
  start: 'rua',
  chapters: {
    rua: { title: 'Rua Abandonada', text: 'Carros batidos bloqueiam a avenida. Você ouve gemidos vindo do mercado.', choices: [
      { text: 'Entrar no mercado', to: 'mercado' },
      { text: 'Ir direto para a delegacia', to: 'zumbi' }
    ]},
    mercado: { title: 'Mercado Escuro', text: 'Você encontra comida, uma lanterna e 6 moedas antigas no caixa.', effect: { gold: 6, item: 'Lanterna' }, choices: [{ text: 'Seguir para a delegacia', to: 'zumbi' }]},
    zumbi: { title: 'O Infectado', text: 'Um infectado bloqueia a entrada da delegacia.', enemy: { name: 'Infectado', hp: 12, atk: 4, rewardGold: 4, rewardItem: 'Chave da Delegacia' }, winTo: 'radio', loseTo: 'derrota' },
    radio: { title: 'Sala do Rádio', text: 'O rádio ainda funciona. Você pode chamar resgate ou avisar outros sobreviventes.', choices: [
      { text: 'Chamar resgate', to: 'resgate', className: 'reward' },
      { text: 'Avisar sobreviventes', to: 'heroi', className: 'reward' }
    ]},
    resgate: { title: 'Final: Evacuação', text: 'Um helicóptero responde. Você sobrevive à noite.', end: true },
    heroi: { title: 'Final: Farol na Escuridão', text: 'Sua mensagem salva dezenas de pessoas escondidas pela cidade.', end: true },
    derrota: { title: 'Silêncio', text: 'A cidade engole mais um sobrevivente.', end: true }
  }
};
