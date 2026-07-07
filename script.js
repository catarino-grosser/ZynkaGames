const adventures = {
  reino: {
    title: 'O Reino Perdido', icon: '🏰', genre: 'Fantasia medieval',
    desc: 'Explore ruínas antigas, enfrente goblins e escolha o destino de um reino esquecido.',
    start: 'inicio',
    chapters: {
      inicio: { title: 'Portões da Vila', text: 'Você chega à vila de Pedra Alta. Um mapa rasgado aponta para o Reino Perdido além da floresta.', choices: [
        { text: 'Seguir pela floresta', to: 'floresta' },
        { text: 'Comprar poção por 5 ouro', action: 'buyPotion', to: 'inicio' },
        { text: 'Perguntar ao ferreiro sobre monstros', to: 'ferreiro' }
      ]},
      ferreiro: { title: 'O Ferreiro', text: 'O ferreiro diz que goblins guardam a ponte. Ele afia sua arma e aumenta seu ataque em 1.', effect: { atk: 1 }, choices: [
        { text: 'Ir para a floresta', to: 'floresta' }
      ]},
      floresta: { title: 'A Floresta Escura', text: 'Galhos se movem como braços. Um goblin salta do mato com uma lâmina enferrujada.', enemy: { name: 'Goblin', hp: 10, atk: 3, rewardGold: 8, rewardItem: 'Dente de Goblin' }, winTo: 'ponte', loseTo: 'derrota' },
      ponte: { title: 'A Ponte Quebrada', text: 'Do outro lado está a entrada do Reino Perdido. A ponte range sob seus pés.', choices: [
        { text: 'Atravessar com cuidado', to: 'finalBom', className: 'reward' },
        { text: 'Correr pela ponte', damage: 4, to: 'finalArriscado', className: 'danger' }
      ]},
      finalBom: { title: 'Final: O Reino Revelado', text: 'Você encontra a coroa antiga e se torna o guardião do Reino Perdido.', end: true },
      finalArriscado: { title: 'Final: Vitória Ferida', text: 'Você atravessa, mas cai sobre pedras. Mesmo ferido, encontra a coroa.', end: true },
      derrota: { title: 'Fim de Jornada', text: 'Você caiu em batalha. Mas todo RPG permite tentar de novo.', end: true }
    }
  },
  zumbis: {
    title: 'A Cidade dos Mortos', icon: '🧟', genre: 'Sobrevivência',
    desc: 'Procure suprimentos, fuja dos infectados e tente chegar ao rádio da delegacia.',
    start: 'rua',
    chapters: {
      rua: { title: 'Rua Abandonada', text: 'Carros batidos bloqueiam a avenida. Você ouve gemidos vindo do mercado.', choices: [
        { text: 'Entrar no mercado', to: 'mercado' },
        { text: 'Ir direto para a delegacia', to: 'zumbi' }
      ]},
      mercado: { title: 'Mercado Escuro', text: 'Você encontra comida, uma lanterna e 6 moedas antigas no caixa.', effect: { gold: 6, item: 'Lanterna' }, choices: [
        { text: 'Seguir para a delegacia', to: 'zumbi' }
      ]},
      zumbi: { title: 'O Infectado', text: 'Um infectado bloqueia a entrada da delegacia.', enemy: { name: 'Infectado', hp: 12, atk: 4, rewardGold: 4, rewardItem: 'Chave da Delegacia' }, winTo: 'radio', loseTo: 'derrota' },
      radio: { title: 'Sala do Rádio', text: 'O rádio ainda funciona. Você pode chamar resgate ou avisar outros sobreviventes.', choices: [
        { text: 'Chamar resgate', to: 'resgate', className: 'reward' },
        { text: 'Avisar sobreviventes', to: 'heroi', className: 'reward' }
      ]},
      resgate: { title: 'Final: Evacuação', text: 'Um helicóptero responde. Você sobrevive à noite.', end: true },
      heroi: { title: 'Final: Farol na Escuridão', text: 'Sua mensagem salva dezenas de pessoas escondidas pela cidade.', end: true },
      derrota: { title: 'Silêncio', text: 'A cidade engole mais um sobrevivente.', end: true }
    }
  },
  marte: {
    title: 'Missão em Marte', icon: '🚀', genre: 'Ficção científica',
    desc: 'Investigue uma base marciana, corrija sistemas e descubra um sinal misterioso.',
    start: 'base',
    chapters: {
      base: { title: 'Base Vermelha', text: 'A energia caiu. O oxigênio está baixo e um sinal pulsa sob o solo marciano.', choices: [
        { text: 'Religar gerador', to: 'gerador' },
        { text: 'Investigar o sinal', to: 'drone' }
      ]},
      gerador: { title: 'Sala do Gerador', text: 'Você religa parte da base e recupera 5 de vida com oxigênio extra.', effect: { hp: 5, item: 'Célula de Energia' }, choices: [
        { text: 'Investigar o sinal', to: 'drone' }
      ]},
      drone: { title: 'Drone Descontrolado', text: 'Um drone de mineração confunde você com uma ameaça.', enemy: { name: 'Drone', hp: 14, atk: 3, rewardGold: 10, rewardItem: 'Núcleo Alienígena' }, winTo: 'sinal', loseTo: 'derrota' },
      sinal: { title: 'O Sinal', text: 'Abaixo da base há uma estrutura que não foi criada por humanos.', choices: [
        { text: 'Transmitir descoberta à Terra', to: 'terra', className: 'reward' },
        { text: 'Entrar na estrutura', to: 'portal', className: 'danger' }
      ]},
      terra: { title: 'Final: Primeira Prova', text: 'A humanidade recebe sua primeira evidência de vida inteligente fora da Terra.', end: true },
      portal: { title: 'Final: Além de Marte', text: 'A estrutura abre um portal. Você atravessa para um céu impossível.', end: true },
      derrota: { title: 'Fim da Missão', text: 'Seu sinal vital desaparece da tela da central.', end: true }
    }
  }
};

const state = {
  selectedAdventure: null,
  selectedClass: 'Guerreiro',
  game: null,
  battling: null
};

const $ = (id) => document.getElementById(id);
const screens = ['homeScreen', 'characterScreen', 'gameScreen'];
function showScreen(id) { screens.forEach(s => $(s).classList.toggle('active', s === id)); }
function toast(msg) { const t = document.createElement('div'); t.className='toast'; t.textContent=msg; document.body.appendChild(t); setTimeout(()=>t.remove(), 1800); }
function save() { if (state.game) localStorage.setItem('zynkaRpgSave', JSON.stringify(state.game)); }
function load() { const raw = localStorage.getItem('zynkaRpgSave'); if (!raw) return null; try { return JSON.parse(raw); } catch { return null; } }

function renderAdventures() {
  const list = $('adventureList'); list.innerHTML = '';
  Object.entries(adventures).forEach(([id, adv]) => {
    const card = document.createElement('button');
    card.className = 'adventure-card';
    card.innerHTML = `<span class="icon">${adv.icon}</span><small>${adv.genre}</small><h3>${adv.title}</h3><p>${adv.desc}</p>`;
    card.onclick = () => selectAdventure(id);
    list.appendChild(card);
  });
  const saved = load();
  if (saved && adventures[saved.adventureId]) {
    const card = document.createElement('button');
    card.className = 'adventure-card';
    card.innerHTML = `<span class="icon">💾</span><small>Progresso salvo</small><h3>Continuar: ${saved.hero.name}</h3><p>${adventures[saved.adventureId].title} — capítulo atual salvo neste aparelho.</p>`;
    card.onclick = () => { state.game = saved; showScreen('gameScreen'); renderGame(); };
    list.prepend(card);
  }
}

function selectAdventure(id) {
  state.selectedAdventure = id;
  const adv = adventures[id];
  $('selectedAdventureTitle').textContent = adv.title;
  $('selectedAdventureDesc').textContent = adv.desc;
  $('heroName').value = '';
  showScreen('characterScreen');
}

document.querySelectorAll('.class-card').forEach(btn => {
  btn.onclick = () => {
    state.selectedClass = btn.dataset.class;
    document.querySelectorAll('.class-card').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  };
});
document.querySelector('[data-class="Guerreiro"]').classList.add('selected');

document.querySelectorAll('.backBtn').forEach(b => b.onclick = () => showScreen('homeScreen'));
$('homeBtn').onclick = () => { renderAdventures(); showScreen('homeScreen'); };
$('resetBtn').onclick = () => { localStorage.removeItem('zynkaRpgSave'); state.game = null; renderAdventures(); showScreen('homeScreen'); toast('Progresso apagado.'); };

$('startAdventureBtn').onclick = () => {
  const name = $('heroName').value.trim() || 'Herói sem Nome';
  const base = { hp: 24, atk: 5, gold: 5, inventory: [] };
  if (state.selectedClass === 'Guerreiro') { base.hp += 8; base.atk += 1; }
  if (state.selectedClass === 'Mago') { base.hp -= 3; base.atk += 4; base.inventory.push('Orbe Arcano'); }
  if (state.selectedClass === 'Ladino') { base.atk += 2; base.gold += 12; base.inventory.push('Gazua'); }
  state.game = { adventureId: state.selectedAdventure, chapterId: adventures[state.selectedAdventure].start, hero: { name, className: state.selectedClass, ...base }, visitedEffects: [] };
  save(); showScreen('gameScreen'); renderGame();
};

function applyEffect(chapter, key) {
  if (!chapter.effect || state.game.visitedEffects.includes(key)) return;
  const h = state.game.hero;
  if (chapter.effect.hp) h.hp += chapter.effect.hp;
  if (chapter.effect.atk) h.atk += chapter.effect.atk;
  if (chapter.effect.gold) h.gold += chapter.effect.gold;
  if (chapter.effect.item) h.inventory.push(chapter.effect.item);
  state.game.visitedEffects.push(key);
  save();
}

function renderGame() {
  const adv = adventures[state.game.adventureId];
  const chapter = adv.chapters[state.game.chapterId];
  applyEffect(chapter, state.game.chapterId);
  $('heroDisplay').textContent = `${state.game.hero.name} • ${state.game.hero.className}`;
  $('adventureDisplay').textContent = adv.title;
  $('hpDisplay').textContent = state.game.hero.hp;
  $('atkDisplay').textContent = state.game.hero.atk;
  $('goldDisplay').textContent = state.game.hero.gold;
  $('inventoryList').innerHTML = state.game.hero.inventory.length ? state.game.hero.inventory.map(i => `<li>${i}</li>`).join('') : '<li>Vazio</li>';
  $('chapterTag').textContent = adv.genre;
  $('storyTitle').textContent = chapter.title;
  $('storyText').textContent = chapter.text;
  $('battleBox').classList.add('hidden');
  $('choices').innerHTML = '';

  if (state.game.hero.hp <= 0) {
    $('choices').innerHTML = '<button class="choice danger">Você perdeu toda a vida. Resete ou escolha outra aventura.</button>';
    save(); return;
  }
  if (chapter.enemy) return startBattle(chapter);
  if (chapter.end) {
    const b = document.createElement('button'); b.className='choice reward'; b.textContent='Jogar outra aventura'; b.onclick=()=>{ renderAdventures(); showScreen('homeScreen'); };
    $('choices').appendChild(b); save(); return;
  }
  chapter.choices.forEach(choice => addChoice(choice));
  save();
}

function addChoice(choice) {
  const b = document.createElement('button');
  b.className = 'choice ' + (choice.className || '');
  b.textContent = choice.text;
  b.onclick = () => {
    if (choice.action === 'buyPotion') return buyPotion();
    if (choice.damage) { state.game.hero.hp -= choice.damage; toast(`Você sofreu ${choice.damage} de dano.`); }
    state.game.chapterId = choice.to; renderGame();
  };
  $('choices').appendChild(b);
}

function buyPotion() {
  const h = state.game.hero;
  if (h.gold < 5) return toast('Ouro insuficiente.');
  h.gold -= 5; h.inventory.push('Poção de Vida'); h.hp += 8;
  toast('Poção comprada: +8 vida.'); renderGame();
}

function startBattle(chapter) {
  if (!state.battling || state.battling.chapterId !== state.game.chapterId) {
    state.battling = { chapterId: state.game.chapterId, enemy: { ...chapter.enemy } };
  }
  renderBattle(chapter);
}

function renderBattle(chapter) {
  const box = $('battleBox'); const enemy = state.battling.enemy; const h = state.game.hero;
  box.classList.remove('hidden');
  box.innerHTML = `<strong>Batalha: ${enemy.name}</strong><p>Vida do inimigo: ${enemy.hp} • Ataque: ${enemy.atk}</p>`;
  $('choices').innerHTML = '';
  const atk = document.createElement('button'); atk.className='choice danger'; atk.textContent='Atacar';
  atk.onclick = () => {
    enemy.hp -= h.atk;
    if (enemy.hp <= 0) {
      h.gold += chapter.enemy.rewardGold || 0;
      if (chapter.enemy.rewardItem) h.inventory.push(chapter.enemy.rewardItem);
      toast(`Vitória! +${chapter.enemy.rewardGold || 0} ouro.`);
      state.battling = null; state.game.chapterId = chapter.winTo; renderGame(); return;
    }
    h.hp -= enemy.atk;
    if (h.hp <= 0) { state.battling = null; state.game.chapterId = chapter.loseTo; renderGame(); return; }
    renderGame();
  };
  const potion = document.createElement('button'); potion.className='choice reward'; potion.textContent='Usar poção, se tiver';
  potion.onclick = () => {
    const idx = h.inventory.indexOf('Poção de Vida');
    if (idx === -1) return toast('Você não tem poção.');
    h.inventory.splice(idx, 1); h.hp += 10; toast('+10 vida.'); renderGame();
  };
  $('choices').append(atk, potion);
  save();
}

renderAdventures();
