// Aventura: O Reino Perdido
// Para adicionar novas aventuras, crie outro arquivo parecido com este.

const aventura = {
  reino: {
    id: 'reino',
    title: 'O Reino Perdido',
    icon: '🏰',
    genre: 'Fantasia medieval',
    difficulty: 'Fácil',
    estimatedTime: '15 a 25 min',
    desc: 'Uma aventura maior, com 10 capítulos, inventário, batalhas, itens, XP e múltiplos finais.',
    start: 'cap01',
    maxChapters: 10,
    assets: {
      music: './assets/musicas/TrilhaAventuraEpica1.mp3',
      sfx: {
        click: '',
        attack: '',
        victory: '',
        item: '',
        levelup: ''
      }
    },
    chapters: {
      cap01: {
        title: '1. A Vila de Pedra Alta',
        image: '',
        text: 'Você chega à pequena vila de Pedra Alta ao entardecer. As janelas estão fechadas, os moradores falam baixo e uma névoa roxa cobre a estrada ao norte. Na praça, um velho mapa aponta para o Reino Perdido, uma terra esquecida onde dizem existir uma coroa capaz de salvar a região da fome.\n\nUm sino toca três vezes. O ferreiro observa você da porta da oficina, enquanto uma curandeira acena discretamente de uma tenda iluminada por velas.',
        effect: { gold: 5, addItems: [{ id: 'pao', qty: 1 }] },
        choices: [
          { text: 'Falar com o ferreiro', to: 'cap02' },
          { text: 'Visitar a curandeira', to: 'cap03' },
          { text: 'Sair imediatamente pela estrada norte', to: 'cap04', className: 'danger' }
        ]
      },
      cap02: {
        title: '2. O Ferreiro e a Lâmina Antiga',
        text: 'O ferreiro se apresenta como Bronn. Ele diz que nenhum viajante volta inteiro da floresta, mas reconhece coragem em seu olhar. Sobre a bancada, há uma lâmina antiga coberta de ferrugem.\n\nBronn limpa a espada, aperta o cabo com couro novo e entrega a arma para você. “Não lute por glória”, ele diz. “Lute para voltar vivo.”',
        effect: { atk: 2, addItems: [{ id: 'espada_antiga', qty: 1 }] },
        choices: [
          { text: 'Agradecer e visitar a curandeira', to: 'cap03' },
          { text: 'Seguir para a floresta', to: 'cap04' }
        ]
      },
      cap03: {
        title: '3. A Tenda da Curandeira',
        text: 'A curandeira examina sua mão e percebe um corte que você nem lembrava ter sofrido. Ela mistura folhas verdes, água quente e pó de âmbar em um frasco pequeno.\n\n“Você vai precisar disso antes do amanhecer”, ela diz, entregando uma poção. Antes de sair, você nota um símbolo estranho bordado no tecido da tenda: o mesmo símbolo que aparece no mapa do Reino Perdido.',
        effect: { hp: 4, addItems: [{ id: 'pocao_vida', qty: 2 }] },
        choices: [
          { text: 'Perguntar sobre o símbolo', to: 'cap05' },
          { text: 'Ir para a floresta', to: 'cap04' }
        ]
      },
      cap04: {
        title: '4. A Floresta Escura',
        text: 'A floresta engole a luz da vila poucos passos depois da primeira árvore. Galhos secos arranham sua roupa. Você ouve risadas finas entre os arbustos.\n\nUm goblin salta diante de você carregando uma faca torta. Outros observam escondidos, esperando o resultado da luta.',
        enemy: { id: 'goblin', name: 'Goblin da Névoa', hp: 14, atk: 4, def: 1, xp: 12, rewardGold: 8, rewardItems: [{ id: 'dente_goblin', qty: 1 }], image: '' },
        winTo: 'cap05',
        loseTo: 'derrota'
      },
      cap05: {
        title: '5. O Símbolo nas Pedras',
        text: 'Depois da luta, você encontra pedras antigas marcadas com o mesmo símbolo da tenda. As marcas brilham quando você aproxima o mapa. Uma passagem escondida surge entre as raízes.\n\nDentro da passagem há uma mochila velha, uma moeda de prata e uma chave com o desenho de uma coroa.',
        effect: { gold: 10, addItems: [{ id: 'chave_coroa', qty: 1 }, { id: 'mochila_velha', qty: 1 }] },
        choices: [
          { text: 'Entrar pela passagem subterrânea', to: 'cap06', requiresItem: 'chave_coroa' },
          { text: 'Voltar e procurar outro caminho', to: 'cap07' }
        ]
      },
      cap06: {
        title: '6. As Catacumbas do Reino',
        text: 'A passagem leva a catacumbas cobertas de musgo. Escudos quebrados e bandeiras rasgadas indicam que um exército inteiro morreu ali.\n\nNo fim do corredor, ossos se levantam do chão como se obedecessem a uma ordem antiga.',
        enemy: { id: 'esqueleto', name: 'Guarda Esqueleto', hp: 18, atk: 5, def: 2, xp: 18, rewardGold: 12, rewardItems: [{ id: 'escudo_rachado', qty: 1 }], image: '' },
        winTo: 'cap08',
        loseTo: 'derrota'
      },
      cap07: {
        title: '7. A Ponte Antiga',
        text: 'Você encontra uma ponte de madeira suspensa sobre um rio escuro. A travessia parece possível, mas as cordas estão quase rompidas. Do outro lado, uma torre aponta para o céu como um dedo acusador.\n\nO vento traz uma voz: “A coroa pertence aos mortos.”',
        choices: [
          { text: 'Atravessar com cuidado', to: 'cap08' },
          { text: 'Correr pela ponte', damage: 5, to: 'cap08', className: 'danger' }
        ]
      },
      cap08: {
        title: '8. A Biblioteca Perdida',
        text: 'A torre guarda uma biblioteca destruída. Livros flutuam no ar, páginas giram sozinhas e um retrato de rei observa você em silêncio.\n\nEntre os livros, você encontra um pergaminho que explica a verdade: a coroa não concede poder. Ela escolhe um guardião para impedir que o reino desperte como uma maldição.',
        effect: { xp: 10, addItems: [{ id: 'pergaminho_real', qty: 1 }] },
        choices: [
          { text: 'Ler o pergaminho em voz alta', to: 'cap09', requiresItem: 'pergaminho_real', className: 'reward' },
          { text: 'Ignorar o aviso e procurar a coroa', to: 'cap10', className: 'danger' }
        ]
      },
      cap09: {
        title: '9. O Guardião da Coroa',
        text: 'Ao ler o pergaminho, o chão treme. Um cavaleiro de armadura negra surge diante do trono, carregando uma espada envolta em fumaça azul.\n\nEle não parece vivo nem morto. “Prove que não veio por ganância”, ordena o guardião.',
        enemy: { id: 'guardiao', name: 'Guardião da Coroa', hp: 28, atk: 7, def: 3, xp: 35, rewardGold: 25, rewardItems: [{ id: 'coroa_antiga', qty: 1 }], image: '' },
        winTo: 'final_guardiao',
        loseTo: 'derrota'
      },
      cap10: {
        title: '10. A Coroa Sem Juramento',
        text: 'Você encontra a coroa sobre um trono de pedra e a pega sem cumprir o juramento. Por um instante, tudo parece vitória. Então as sombras do salão respiram.\n\nA coroa pesa como uma montanha em suas mãos. O reino desperta, mas não para ser salvo.',
        choices: [
          { text: 'Tentar resistir à maldição', to: 'final_sombrio', className: 'danger' },
          { text: 'Voltar e cumprir o juramento', to: 'cap09', requiresItem: 'pergaminho_real' }
        ]
      },
      final_guardiao: {
        title: 'Final Bom: Guardião do Reino Perdido',
        text: 'O guardião ajoelha diante de você. A coroa brilha sem queimar suas mãos. Quando você retorna a Pedra Alta, a névoa roxa desaparece e os campos voltam a florescer.\n\nVocê não se torna rei. Torna-se guardião. E isso é muito maior.',
        end: true
      },
      final_sombrio: {
        title: 'Final Sombrio: O Rei da Névoa',
        text: 'Você resiste por alguns segundos, mas a coroa encontra sua ambição. A névoa cobre a vila, a floresta e todos os caminhos.\n\nSéculos depois, viajantes ainda contam a história do herói que venceu a masmorra, mas perdeu a própria alma.',
        end: true
      },
      derrota: {
        title: 'Fim da Jornada',
        text: 'Sua aventura termina nas sombras do Reino Perdido. Mas todo herói pode tentar novamente.',
        end: true
      }
    },
    items: {
      pao: { name: 'Pão de Viagem', type: 'consumable', heal: 4, desc: 'Restaura 4 de vida.' },
      pocao_vida: { name: 'Poção de Vida', type: 'consumable', heal: 12, desc: 'Restaura 12 de vida.' },
      espada_antiga: { name: 'Espada Antiga', type: 'weapon', atk: 2, desc: 'Lâmina entregue pelo ferreiro.' },
      dente_goblin: { name: 'Dente de Goblin', type: 'quest', desc: 'Prova de vitória contra um goblin.' },
      chave_coroa: { name: 'Chave da Coroa', type: 'key', desc: 'Abre a passagem das catacumbas.' },
      mochila_velha: { name: 'Mochila Velha', type: 'quest', desc: 'Uma mochila encontrada na floresta.' },
      escudo_rachado: { name: 'Escudo Rachado', type: 'armor', def: 1, desc: 'Mesmo rachado, ainda protege.' },
      pergaminho_real: { name: 'Pergaminho Real', type: 'quest', desc: 'Explica o juramento da coroa.' },
      coroa_antiga: { name: 'Coroa Antiga', type: 'quest', desc: 'Relíquia principal do Reino Perdido.' }
    }
  }
};

export default aventura.reino;
