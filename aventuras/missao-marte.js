export default {
  id: 'missao-marte',
  title: 'Missão em Marte',
  icon: '🚀',
  genre: 'Ficção científica',
  desc: 'Investigue uma base marciana, corrija sistemas e descubra um sinal misterioso.',
  start: 'base',
  chapters: {
    base: { title: 'Base Vermelha', text: 'A energia caiu. O oxigênio está baixo e um sinal pulsa sob o solo marciano.', choices: [
      { text: 'Religar gerador', to: 'gerador' },
      { text: 'Investigar o sinal', to: 'drone' }
    ]},
    gerador: { title: 'Sala do Gerador', text: 'Você religa parte da base e recupera 5 de vida com oxigênio extra.', effect: { hp: 5, item: 'Célula de Energia' }, choices: [{ text: 'Investigar o sinal', to: 'drone' }]},
    drone: { title: 'Drone Descontrolado', text: 'Um drone de mineração confunde você com uma ameaça.', enemy: { name: 'Drone', hp: 14, atk: 3, rewardGold: 10, rewardItem: 'Núcleo Alienígena' }, winTo: 'sinal', loseTo: 'derrota' },
    sinal: { title: 'O Sinal', text: 'Abaixo da base há uma estrutura que não foi criada por humanos.', choices: [
      { text: 'Transmitir descoberta à Terra', to: 'terra', className: 'reward' },
      { text: 'Entrar na estrutura', to: 'portal', className: 'danger' }
    ]},
    terra: { title: 'Final: Primeira Prova', text: 'A humanidade recebe sua primeira evidência de vida inteligente fora da Terra.', end: true },
    portal: { title: 'Final: Além de Marte', text: 'A estrutura abre um portal. Você atravessa para um céu impossível.', end: true },
    derrota: { title: 'Fim da Missão', text: 'Seu sinal vital desaparece da tela da central.', end: true }
  }
};
