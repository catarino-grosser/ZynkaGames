/*
  Zynka RPG 2.1 - Sistema de Catálogo
  Motor narrativo em JavaScript puro.

  Suporta:
  - aventuras com até 50 capítulos;
  - inventário com quantidade e uso de itens;
  - batalha por turno;
  - XP, nível, ouro, ataque, defesa e vida;
  - salvamento automático em localStorage;
  - imagens por capítulo e inimigo;
  - música de fundo e efeitos sonoros;
  - formato JSON rico para criar novas aventuras sem alterar o motor.
*/

const MAX_CHAPTERS = 50;
const SAVE_KEY = 'zynkaRpgV2Save';

import { aventuraArquivos } from './aventuras/catalogo.js';

let adventures = {};

async function carregarAventurasDoCatalogo() {
  adventures = {};

  if (!Array.isArray(aventuraArquivos) || aventuraArquivos.length === 0) {
    throw new Error('Nenhuma aventura foi cadastrada em aventuras/catalogo.js.');
  }

  for (const arquivo of aventuraArquivos) {
    const modulo = await import(arquivo);
    const aventura = modulo.default || modulo.aventura;

    if (!aventura || !aventura.id) {
      throw new Error(`Arquivo de aventura inválido: ${arquivo}`);
    }

    if (adventures[aventura.id]) {
      throw new Error(`ID de aventura duplicado: ${aventura.id}`);
    }

    adventures[aventura.id] = aventura;
  }
}
const state = {
  selectedAdventure: null,
  selectedClass: 'Guerreiro',
  game: null,
  battling: null
};

const $ = (id) => document.getElementById(id);
const screens = ['homeScreen', 'characterScreen', 'gameScreen'];

function showScreen(id) {
  screens.forEach(s => $(s).classList.toggle('active', s === id));
}

function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1900);
}

function playSfx(name) {
  const adv = getAdventure();
  const src = adv?.assets?.sfx?.[name];
  if (!src) return;
  const player = $('sfxPlayer');
  player.src = src;
  player.currentTime = 0;
  player.play().catch(() => {});
}

function playMusic() {
  const adv = getAdventure();
  const src = adv?.assets?.music;
  if (!src) return;
  const player = $('musicPlayer');
  if (player.src.includes(src)) return;
  player.src = src;
  player.volume = 0.35;
  player.play().catch(() => {});
}

function getAdventure() {
  if (!state.game?.adventureId && !state.selectedAdventure) return null;
  return adventures[state.game?.adventureId || state.selectedAdventure];
}

function save() {
  if (state.game) localStorage.setItem(SAVE_KEY, JSON.stringify(state.game));
}

function load() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function createHero(name, className) {
  const hero = {
    name,
    className,
    hp: 26,
    maxHp: 26,
    atk: 5,
    def: 1,
    gold: 5,
    xp: 0,
    level: 1,
    inventory: []
  };

  if (className === 'Guerreiro') {
    hero.hp += 10; hero.maxHp += 10; hero.atk += 1; hero.def += 2;
  }
  if (className === 'Mago') {
    hero.hp -= 4; hero.maxHp -= 4; hero.atk += 4;
    addItemToHero(hero, 'orbe_arcano', 1);
  }
  if (className === 'Ladino') {
    hero.atk += 2; hero.gold += 12; hero.def += 1;
    addItemToHero(hero, 'gazua', 1);
  }
  return hero;
}

function addItemToHero(hero, id, qty = 1) {
  const existing = hero.inventory.find(i => i.id === id);
  if (existing) existing.qty += qty;
  else hero.inventory.push({ id, qty });
}

function removeItemFromHero(hero, id, qty = 1) {
  const item = hero.inventory.find(i => i.id === id);
  if (!item || item.qty < qty) return false;
  item.qty -= qty;
  if (item.qty <= 0) hero.inventory = hero.inventory.filter(i => i.id !== id);
  return true;
}

function hasItem(id) {
  return state.game.hero.inventory.some(i => i.id === id && i.qty > 0);
}

function itemName(id) {
  const adv = getAdventure();
  return adv?.items?.[id]?.name || id.replaceAll('_', ' ');
}

function renderAdventures() {
  const list = $('adventureList');
  list.innerHTML = '';
  Object.entries(adventures).forEach(([id, adv]) => {
    const count = Object.keys(adv.chapters || {}).length;
    const card = document.createElement('button');
    card.className = 'adventure-card';
    card.innerHTML = `<span class="icon">${adv.icon}</span><small>${adv.genre} • ${adv.difficulty || 'Normal'}</small><h3>${adv.title}</h3><p>${adv.desc}</p><p><strong>${count}</strong> capítulos • ${adv.estimatedTime || 'tempo variável'}</p>`;
    card.onclick = () => selectAdventure(id);
    list.appendChild(card);
  });

  const saved = load();
  if (saved && adventures[saved.adventureId]) {
    const card = document.createElement('button');
    card.className = 'adventure-card';
    card.innerHTML = `<span class="icon">💾</span><small>Progresso salvo</small><h3>Continuar: ${saved.hero.name}</h3><p>${adventures[saved.adventureId].title} — seu capítulo atual foi salvo automaticamente neste aparelho.</p>`;
    card.onclick = () => { state.game = saved; state.battling = saved.battle || null; showScreen('gameScreen'); renderGame(); };
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
$('resetBtn').onclick = () => {
  localStorage.removeItem(SAVE_KEY);
  state.game = null;
  state.battling = null;
  renderAdventures();
  showScreen('homeScreen');
  toast('Progresso apagado.');
};

$('startAdventureBtn').onclick = () => {
  const adv = adventures[state.selectedAdventure];
  const chapterCount = Object.keys(adv.chapters || {}).length;
  if (chapterCount > MAX_CHAPTERS) return toast(`Esta aventura tem ${chapterCount} capítulos. O limite é ${MAX_CHAPTERS}.`);

  const name = $('heroName').value.trim() || 'Herói sem Nome';
  state.game = {
    version: '2.0',
    adventureId: state.selectedAdventure,
    chapterId: adv.start,
    hero: createHero(name, state.selectedClass),
    visitedEffects: [],
    flags: {},
    battle: null,
    log: []
  };
  save();
  showScreen('gameScreen');
  renderGame();
};

function applyEffect(chapter, key) {
  if (!chapter.effect || state.game.visitedEffects.includes(key)) return;
  const h = state.game.hero;
  const e = chapter.effect;

  if (e.hp) h.hp = Math.min(h.maxHp, h.hp + e.hp);
  if (e.maxHp) { h.maxHp += e.maxHp; h.hp += e.maxHp; }
  if (e.atk) h.atk += e.atk;
  if (e.def) h.def += e.def;
  if (e.gold) h.gold += e.gold;
  if (e.xp) gainXp(e.xp, false);
  if (Array.isArray(e.addItems)) e.addItems.forEach(item => addItemToHero(h, item.id, item.qty || 1));
  if (Array.isArray(e.removeItems)) e.removeItems.forEach(item => removeItemFromHero(h, item.id, item.qty || 1));
  if (e.flags) Object.assign(state.game.flags, e.flags);

  state.game.visitedEffects.push(key);
  playSfx('item');
  save();
}

function gainXp(amount, show = true) {
  const h = state.game.hero;
  h.xp += amount;
  let needed = h.level * 25;
  let leveled = false;
  while (h.xp >= needed) {
    h.xp -= needed;
    h.level += 1;
    h.maxHp += 6;
    h.hp = h.maxHp;
    h.atk += 1;
    if (h.level % 2 === 0) h.def += 1;
    needed = h.level * 25;
    leveled = true;
  }
  if (leveled) {
    playSfx('levelup');
    toast(`Você subiu para o nível ${h.level}!`);
  } else if (show) {
    toast(`+${amount} XP`);
  }
}

function renderStatus() {
  const adv = getAdventure();
  const h = state.game.hero;
  $('heroDisplay').textContent = `${h.name} • ${h.className}`;
  $('adventureDisplay').textContent = adv.title;
  $('hpDisplay').textContent = `${h.hp}/${h.maxHp}`;
  $('atkDisplay').textContent = h.atk;
  $('defDisplay').textContent = h.def;
  $('levelDisplay').textContent = h.level;
  $('xpDisplay').textContent = `${h.xp}/${h.level * 25}`;
  $('goldDisplay').textContent = h.gold;

  if (!h.inventory.length) {
    $('inventoryList').innerHTML = '<li>Vazio</li>';
    return;
  }

  $('inventoryList').innerHTML = h.inventory.map(i => `<li>${itemName(i.id)} x${i.qty}</li>`).join('');
}

function renderGame() {
  const adv = getAdventure();
  if (!adv) return showScreen('homeScreen');
  const chapter = adv.chapters[state.game.chapterId];
  if (!chapter) {
    toast('Capítulo não encontrado. Voltando ao início da aventura.');
    state.game.chapterId = adv.start;
    return renderGame();
  }

  playMusic();
  applyEffect(chapter, state.game.chapterId);
  renderStatus();

  $('chapterTag').textContent = `${adv.genre} • Capítulo ${Object.keys(adv.chapters).indexOf(state.game.chapterId) + 1}/${Object.keys(adv.chapters).length}`;
  $('storyTitle').textContent = chapter.title;
  $('storyText').textContent = chapter.text;
  renderChapterImage(chapter.image);
  $('battleBox').classList.add('hidden');
  $('choices').innerHTML = '';

  if (state.game.hero.hp <= 0) {
    $('choices').innerHTML = '<button class="choice danger">Você perdeu toda a vida. Resete ou escolha outra aventura.</button>';
    save();
    return;
  }

  if (chapter.enemy) return startBattle(chapter);

  if (chapter.end) {
    localStorage.removeItem(SAVE_KEY);
    const b = document.createElement('button');
    b.className = 'choice reward';
    b.textContent = 'Jogar outra aventura';
    b.onclick = () => { state.game = null; renderAdventures(); showScreen('homeScreen'); };
    $('choices').appendChild(b);
    return;
  }

  (chapter.choices || []).forEach(choice => addChoice(choice));
  save();
}

function renderChapterImage(src) {
  const img = $('chapterImage');
  if (!src) {
    img.classList.add('hidden');
    img.removeAttribute('src');
    return;
  }
  img.src = src;
  img.classList.remove('hidden');
}

function addChoice(choice) {
  const b = document.createElement('button');
  const lockedByItem = choice.requiresItem && !hasItem(choice.requiresItem);
  const lockedByFlag = choice.requiresFlag && !state.game.flags[choice.requiresFlag];
  const locked = lockedByItem || lockedByFlag;

  b.className = 'choice ' + (choice.className || '') + (locked ? ' locked' : '');
  b.textContent = choice.text + (lockedByItem ? ` 🔒 precisa de ${itemName(choice.requiresItem)}` : '');

  b.onclick = () => {
    if (locked) return toast('Você ainda não cumpre o requisito desta escolha.');
    playSfx('click');
    if (choice.damage) {
      const damage = Math.max(1, choice.damage - state.game.hero.def);
      state.game.hero.hp -= damage;
      toast(`Você sofreu ${damage} de dano.`);
    }
    if (choice.heal) state.game.hero.hp = Math.min(state.game.hero.maxHp, state.game.hero.hp + choice.heal);
    if (choice.gold) state.game.hero.gold += choice.gold;
    if (choice.xp) gainXp(choice.xp);
    if (choice.addItems) choice.addItems.forEach(item => addItemToHero(state.game.hero, item.id, item.qty || 1));
    if (choice.removeItems) choice.removeItems.forEach(item => removeItemFromHero(state.game.hero, item.id, item.qty || 1));
    if (choice.flags) Object.assign(state.game.flags, choice.flags);
    state.game.chapterId = choice.to;
    state.game.battle = null;
    state.battling = null;
    renderGame();
  };
  $('choices').appendChild(b);
}

function startBattle(chapter) {
  if (!state.game.battle || state.game.battle.chapterId !== state.game.chapterId) {
    state.game.battle = {
      chapterId: state.game.chapterId,
      enemy: { ...chapter.enemy }
    };
  }
  state.battling = state.game.battle;
  renderBattle(chapter);
}

function renderBattle(chapter) {
  const box = $('battleBox');
  const enemy = state.game.battle.enemy;
  const h = state.game.hero;
  box.classList.remove('hidden');
  box.innerHTML = `
    <strong>Batalha: ${enemy.name}</strong>
    ${enemy.image ? `<img src="${enemy.image}" alt="${enemy.name}">` : ''}
    <p>Vida do inimigo: ${enemy.hp} • Ataque: ${enemy.atk} • Defesa: ${enemy.def || 0}</p>
  `;
  $('choices').innerHTML = '';

  addBattleButton('Atacar', 'danger', () => {
    playSfx('attack');
    const playerDamage = Math.max(1, h.atk - (enemy.def || 0));
    enemy.hp -= playerDamage;

    if (enemy.hp <= 0) {
      winBattle(chapter);
      return;
    }

    enemyTurn(enemy);
  });

  addBattleButton('Defender', '', () => {
    const originalDef = h.def;
    h.def += 3;
    enemyTurn(enemy, 'Você se defendeu e reduziu o dano.');
    h.def = originalDef;
  });

  addBattleButton('Usar poção', 'reward', () => useConsumable('pocao_vida'));
  addBattleButton('Comer pão', 'reward', () => useConsumable('pao'));
}

function addBattleButton(text, className, handler) {
  const b = document.createElement('button');
  b.className = `choice ${className}`;
  b.textContent = text;
  b.onclick = handler;
  $('choices').appendChild(b);
}

function enemyTurn(enemy, prefix = '') {
  const h = state.game.hero;
  const damage = Math.max(1, enemy.atk - h.def);
  h.hp -= damage;
  if (h.hp <= 0) {
    state.game.battle = null;
    state.battling = null;
    state.game.chapterId = getAdventure().chapters[state.game.chapterId].loseTo || 'derrota';
    renderGame();
    return;
  }
  toast(prefix ? `${prefix} Inimigo causou ${damage} de dano.` : `Inimigo causou ${damage} de dano.`);
  save();
  renderStatus();
  renderBattle(getAdventure().chapters[state.game.chapterId]);
}

function useConsumable(id) {
  const adv = getAdventure();
  const item = adv.items[id];
  if (!hasItem(id)) return toast(`Você não tem ${itemName(id)}.`);
  if (!item?.heal) return toast('Este item não pode ser usado agora.');
  removeItemFromHero(state.game.hero, id, 1);
  state.game.hero.hp = Math.min(state.game.hero.maxHp, state.game.hero.hp + item.heal);
  playSfx('item');
  toast(`${item.name}: +${item.heal} vida.`);
  save();
  renderGame();
}

function winBattle(chapter) {
  const h = state.game.hero;
  const enemy = chapter.enemy;
  h.gold += enemy.rewardGold || 0;
  if (Array.isArray(enemy.rewardItems)) enemy.rewardItems.forEach(item => addItemToHero(h, item.id, item.qty || 1));
  if (enemy.xp) gainXp(enemy.xp, false);
  playSfx('victory');
  toast(`Vitória! +${enemy.rewardGold || 0} ouro, +${enemy.xp || 0} XP.`);
  state.game.battle = null;
  state.battling = null;
  state.game.chapterId = chapter.winTo;
  save();
  renderGame();
}

async function iniciarApp() {
  try {
    await carregarAventurasDoCatalogo();
    renderAdventures();
  } catch (error) {
    console.error(error);
    const list = $('adventureList');
    if (list) {
      list.innerHTML = `<div class="adventure-card error-card"><span class="icon">⚠️</span><h3>Erro ao carregar aventuras</h3><p>${error.message}</p><p>Verifique o arquivo <strong>aventuras/catalogo.js</strong>.</p></div>`;
    }
    toast('Erro ao carregar aventuras.');
  }
}

iniciarApp();
