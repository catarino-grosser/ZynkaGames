export default {
  id: 'reino-perdido',
  title: 'O Reino Perdido',
  icon: '🏰',
  genre: 'Fantasia medieval',
  desc: 'Explore ruínas antigas, enfrente goblins e escolha o destino de um reino esquecido.',
  start: 'inicio',
  chapters: {
    inicio: { title: 'Portões da Vila', text: 'Você chega à vila de Pedra Alta. Um mapa rasgado aponta para o Reino Perdido além da floresta.', choices: [
      { text: 'Seguir pela floresta', to: 'floresta' },
      { text: 'Comprar poção por 5 ouro', action: 'buyPotion', to: 'inicio' },
      { text: 'Perguntar ao ferreiro sobre monstros', to: 'ferreiro' }
    ]},
    ferreiro: { title: 'O Ferreiro', text: 'O ferreiro afia sua arma e aumenta seu ataque em 1.', effect: { atk: 1 }, choices: [{ text: 'Ir para a floresta', to: 'floresta' }]},
    floresta: { title: 'A Floresta Escura', text: 'Um goblin salta do mato com uma lâmina enferrujada.', enemy: { name: 'Goblin', hp: 10, atk: 3, rewardGold: 8, rewardItem: 'Dente de Goblin' }, winTo: 'ponte', loseTo: 'derrota' },
    ponte: { title: 'A Ponte Quebrada', text: 'Do outro lado está a entrada do Reino Perdido.', choices: [
      { text: 'Atravessar com cuidado', to: 'finalBom', className: 'reward' },
      { text: 'Correr pela ponte', damage: 4, to: 'finalArriscado', className: 'danger' }
    ]},
    finalBom: { title: 'Final: O Reino Revelado', text: 'Você encontra a coroa antiga e se torna o guardião do Reino Perdido.', end: true },
    finalArriscado: { title: 'Final: Vitória Ferida', text: 'Você atravessa, mas cai sobre pedras. Mesmo ferido, encontra a coroa.', end: true },
    derrota: { title: 'Fim de Jornada', text: 'Você caiu em batalha. Mas todo RPG permite tentar de novo.', end: true }
  }
};
