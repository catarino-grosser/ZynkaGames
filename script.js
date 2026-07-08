/*
  Zynka RPG 3.0 - Motor de Campanhas Narrativas

  Mantém o sistema de catálogo da versão 2.1 e adiciona recursos comerciais:
  - campanhas com até 50 capítulos;
  - imagem de cenário, retratos de personagens e imagem de inimigos;
  - música global, música por capítulo e efeitos sonoros por ação;
  - diálogos com NPCs;
  - eventos aleatórios;
  - tesouros escondidos;
  - enigmas simples;
  - missões secundárias;
  - inventário, batalhas, XP, níveis e salvamento automático.
*/

const MAX_CHAPTERS = 50;
const SAVE_KEY = 'zynkaRpgV3Save';
const LEGACY_SAVE_KEY = 'zynkaRpgV2Save';

import { aventuraArquivos } from './aventuras/catalogo.js';

let adventures = {};

const state = {
  selectedAdventure: null,
  selectedClass: 'Guerreiro',
  game: null,
  battling: null
};

const $ = (id) => document.getElementById(id);
const screens = ['homeScreen', 'characterScreen', 'gameScreen'];

async function carregarAventurasDoCatalogo() {
  adventures = {};

  if (!Array.isArray(aventuraArquivos) || aventuraArquivos.length === 0) {
    throw new Error('Nenhuma aventura foi cadastrada em aventuras/catalogo.js.');
  }

  for (const arquivo of aventuraArquivos) {
    const modulo = await import(arquivo);
    const aventura = modulo.default || modulo.aventura;

    if (!aventura || !aventura.id) throw new Error(`Arquivo de aventura inválido: ${arquivo}`);
    if (adventures[aventura.id]) throw new Error(`ID de aventura duplicado: ${aventura.id}`);

    adventures[aventura.id] = aventura;
  }
}

function showScreen(id) {
  screens.forEach(s => $(s).classList.toggle('active', s === id));
}

function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

function getAdventure() {
  if (!state.game?.adventureId && !state.selectedAdventure) return null;
  return adventures[state.game?.adventureId || state.selectedAdventure];
}

function save() {
  if (state.game) localStorage.setItem(SAVE_KEY, JSON.stringify(state.game));
}

function load() {
  const raw = localStorage.getItem(SAVE_KEY) || localStorage.getItem(LEGACY_SAVE_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
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

function playMusic(chapter = null) {
  const adv = getAdventure();
  const src = chapter?.music || adv?.assets?.music;
  const player = $('musicPlayer');
  if (!src) { player.pause(); return; }
  if (player.getAttribute('src') === src) return;
  player.src = src;
  player.volume = 0.35;
  player.play().catch(() => {});
}

function createHero(name, className) {
  const hero = { name, className, hp: 26, maxHp: 26, atk: 5, def: 1, gold: 5, xp: 0, level: 1, inventory: [] };
  if (className === 'Guerreiro') { hero.hp += 10; hero.maxHp += 10; hero.atk += 1; hero.def += 2; }
  if (className === 'Mago') { hero.hp -= 4; hero.maxHp -= 4; hero.atk += 4; addItemToHero(hero, 'orbe_arcano', 1); }
  if (className === 'Ladino') { hero.atk += 2; hero.gold += 12; hero.def += 1; addItemToHero(hero, 'gazua', 1); }
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

function hasItem(id) { return state.game.hero.inventory.some(i => i.id === id && i.qty > 0); }
function itemName(id) { return getAdventure()?.items?.[id]?.name || id.replaceAll('_', ' '); }
function hasFlag(flag) { return !!state.game.flags?.[flag]; }

function renderAdventures() {
  const list = $('adventureList');
  list.innerHTML = '';

  Object.entries(adventures).forEach(([id, adv]) => {
    const count = Object.keys(adv.chapters || {}).length;
    const card = document.createElement('button');
    card.className = 'adventure-card';
    card.innerHTML = `<span class="icon">${adv.icon || '📖'}</span><small>${adv.genre || 'Aventura'} • ${adv.difficulty || 'Normal'}</small><h3>${adv.title}</h3><p>${adv.desc}</p><p><strong>${count}</strong> capítulos • ${adv.estimatedTime || 'tempo variável'}</p>`;
    card.onclick = () => selectAdventure(id);
    list.appendChild(card);
  });

  const saved = load();
  if (saved && adventures[saved.adventureId]) {
    const card = document.createElement('button');
    card.className = 'adventure-card save-card';
    card.innerHTML = `<span class="icon">💾</span><small>Progresso salvo</small><h3>Continuar: ${saved.hero.name}</h3><p>${adventures[saved.adventureId].title} — seu progresso foi salvo automaticamente neste aparelho.</p>`;
    card.onclick = () => { state.game = normalizeSave(saved); state.battling = state.game.battle || null; showScreen('gameScreen'); renderGame(); };
    list.prepend(card);
  }
}

function normalizeSave(saved) {
  saved.version = saved.version || '3.0';
  saved.flags = saved.flags || {};
  saved.completedSideQuests = saved.completedSideQuests || [];
  saved.openSideQuests = saved.openSideQuests || [];
  saved.discoveredTreasures = saved.discoveredTreasures || [];
  saved.visitedRandomEvents = saved.visitedRandomEvents || [];
  return saved;
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
  localStorage.removeItem(LEGACY_SAVE_KEY);
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
    version: '3.0', adventureId: state.selectedAdventure, chapterId: adv.start,
    hero: createHero(name, state.selectedClass), visitedEffects: [], flags: {}, battle: null, log: [],
    openSideQuests: [], completedSideQuests: [], discoveredTreasures: [], visitedRandomEvents: []
  };
  save(); showScreen('gameScreen'); renderGame();
};

function applyEffect(chapter, key) {
  if (!chapter.effect || state.game.visitedEffects.includes(key)) return;
  const h = state.game.hero, e = chapter.effect;
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
  playSfx(e.sfx || 'item');
  save();
}

function gainXp(amount, show = true) {
  const h = state.game.hero;
  h.xp += amount;
  let needed = h.level * 25, leveled = false;
  while (h.xp >= needed) {
    h.xp -= needed; h.level += 1; h.maxHp += 6; h.hp = h.maxHp; h.atk += 1;
    if (h.level % 2 === 0) h.def += 1;
    needed = h.level * 25; leveled = true;
  }
  if (leveled) { playSfx('levelup'); toast(`Você subiu para o nível ${h.level}!`); }
  else if (show) toast(`+${amount} XP`);
}

function renderStatus() {
  const adv = getAdventure(), h = state.game.hero;
  $('heroDisplay').textContent = `${h.name} • ${h.className}`;
  $('adventureDisplay').textContent = adv.title;
  $('hpDisplay').textContent = `${h.hp}/${h.maxHp}`;
  $('atkDisplay').textContent = h.atk;
  $('defDisplay').textContent = h.def;
  $('levelDisplay').textContent = h.level;
  $('xpDisplay').textContent = `${h.xp}/${h.level * 25}`;
  $('goldDisplay').textContent = h.gold;
  $('inventoryList').innerHTML = h.inventory.length ? h.inventory.map(i => `<li>${itemName(i.id)} x${i.qty}</li>`).join('') : '<li>Vazio</li>';
}

function renderGame() {
  const adv = getAdventure();
  if (!adv) return showScreen('homeScreen');
  const chapter = adv.chapters[state.game.chapterId];
  if (!chapter) { toast('Capítulo não encontrado. Voltando ao início.'); state.game.chapterId = adv.start; return renderGame(); }

  playMusic(chapter);
  applyEffect(chapter, state.game.chapterId);
  startSideQuestIfNeeded(chapter);
  renderStatus();

  const chapterIds = Object.keys(adv.chapters);
  $('chapterTag').textContent = `${adv.genre || 'Aventura'} • Capítulo ${chapterIds.indexOf(state.game.chapterId) + 1}/${chapterIds.length}`;
  $('storyTitle').textContent = chapter.title;
  $('storyText').textContent = chapter.text || '';
  renderChapterImage(chapter.image || chapter.background);
  renderScene(chapter);
  renderDialogue(chapter.dialogue);
  renderSideQuest(chapter);
  renderRandomEvent(chapter);
  $('battleBox').classList.add('hidden');
  $('choices').innerHTML = '';

  if (state.game.hero.hp <= 0) {
    $('choices').innerHTML = '<button class="choice danger">Você perdeu toda a vida. Resete ou escolha outra aventura.</button>';
    save(); return;
  }
  if (chapter.enemy) return startBattle(chapter);
  if (chapter.puzzle) renderPuzzle(chapter);
  if (chapter.treasure) renderTreasure(chapter);
  if (chapter.end) {
    localStorage.removeItem(SAVE_KEY);
    const b = document.createElement('button');
    b.className = 'choice reward'; b.textContent = 'Jogar outra aventura';
    b.onclick = () => { state.game = null; renderAdventures(); showScreen('homeScreen'); };
    $('choices').appendChild(b); return;
  }
  (chapter.choices || []).forEach(choice => addChoice(choice));
  save();
}

function renderChapterImage(src) {
  const img = $('chapterImage');
  if (!src) { img.classList.add('hidden'); img.removeAttribute('src'); return; }
  img.src = src; img.classList.remove('hidden');
}

function renderScene(chapter) {
  const box = $('sceneBox');
  if (!chapter.scene) { box.classList.add('hidden'); box.innerHTML = ''; return; }
  box.classList.remove('hidden');
  box.innerHTML = `<strong>🖼️ Cenário</strong><p>${chapter.scene}</p>`;
}

function renderDialogue(dialogue) {
  const box = $('dialogueBox');
  if (!dialogue) { box.classList.add('hidden'); box.innerHTML = ''; return; }
  const lines = Array.isArray(dialogue.lines) ? dialogue.lines : [dialogue.text || ''];
  box.classList.remove('hidden');
  box.innerHTML = `${dialogue.portrait ? `<img src="${dialogue.portrait}" alt="${dialogue.name || 'Personagem'}">` : ''}<div><strong>👤 ${dialogue.name || 'Personagem'}</strong>${lines.map(l => `<p>“${l}”</p>`).join('')}</div>`;
}

function renderSideQuest(chapter) {
  const box = $('sideQuestBox');
  const quest = chapter.sideQuest;
  if (!quest) { box.classList.add('hidden'); box.innerHTML = ''; return; }
  const completed = state.game.completedSideQuests.includes(quest.id);
  box.classList.remove('hidden');
  box.innerHTML = `<strong>⭐ Missão secundária: ${quest.title}</strong><p>${completed ? 'Concluída.' : quest.desc}</p>`;
}

function startSideQuestIfNeeded(chapter) {
  const quest = chapter.sideQuest;
  if (!quest || state.game.openSideQuests.some(q => q.id === quest.id) || state.game.completedSideQuests.includes(quest.id)) return;
  state.game.openSideQuests.push({ id: quest.id, title: quest.title });
  toast(`Missão secundária iniciada: ${quest.title}`);
}

function completeSideQuest(questId, reward = {}) {
  if (!questId || state.game.completedSideQuests.includes(questId)) return;
  state.game.completedSideQuests.push(questId);
  state.game.openSideQuests = state.game.openSideQuests.filter(q => q.id !== questId);
  applyReward(reward);
  toast('Missão secundária concluída!');
}

function renderRandomEvent(chapter) {
  const box = $('eventBox');
  const event = chapter.randomEvent;
  if (!event || state.game.visitedRandomEvents.includes(state.game.chapterId)) { box.classList.add('hidden'); box.innerHTML = ''; return; }
  const chance = event.chance ?? 0.5;
  if (Math.random() > chance) { state.game.visitedRandomEvents.push(state.game.chapterId); box.classList.add('hidden'); return; }
  state.game.visitedRandomEvents.push(state.game.chapterId);
  applyReward(event.reward || {});
  if (event.damage) state.game.hero.hp = Math.max(1, state.game.hero.hp - Math.max(1, event.damage - state.game.hero.def));
  box.classList.remove('hidden');
  box.innerHTML = `<strong>🎲 Evento aleatório</strong><p>${event.text}</p>`;
}

function renderTreasure(chapter) {
  const treasure = chapter.treasure;
  if (!treasure || state.game.discoveredTreasures.includes(treasure.id)) return;
  const b = document.createElement('button');
  b.className = 'choice reward';
  b.textContent = treasure.text || '💰 Procurar tesouro escondido';
  b.onclick = () => {
    if (treasure.requiresItem && !hasItem(treasure.requiresItem)) return toast(`Você precisa de ${itemName(treasure.requiresItem)}.`);
    state.game.discoveredTreasures.push(treasure.id);
    applyReward(treasure.reward || {});
    playSfx('item');
    renderGame();
  };
  $('choices').appendChild(b);
}

function renderPuzzle(chapter) {
  const puzzle = chapter.puzzle;
  const b = document.createElement('button');
  b.className = 'choice';
  b.textContent = `🧩 Resolver enigma: ${puzzle.question}`;
  b.onclick = () => {
    const answer = prompt(puzzle.question);
    if (!answer) return;
    const ok = answer.trim().toLowerCase() === String(puzzle.answer).trim().toLowerCase();
    if (ok) {
      toast(puzzle.successText || 'Enigma resolvido!');
      applyReward(puzzle.reward || {});
      if (puzzle.setFlag) state.game.flags[puzzle.setFlag] = true;
      state.game.chapterId = puzzle.successTo || state.game.chapterId;
    } else {
      toast(puzzle.failText || 'Resposta errada.');
      if (puzzle.damage) state.game.hero.hp -= Math.max(1, puzzle.damage - state.game.hero.def);
      if (puzzle.failTo) state.game.chapterId = puzzle.failTo;
    }
    renderGame();
  };
  $('choices').appendChild(b);
}

function applyReward(reward) {
  const h = state.game.hero;
  if (reward.hp) h.hp = Math.min(h.maxHp, h.hp + reward.hp);
  if (reward.maxHp) { h.maxHp += reward.maxHp; h.hp += reward.maxHp; }
  if (reward.atk) h.atk += reward.atk;
  if (reward.def) h.def += reward.def;
  if (reward.gold) h.gold += reward.gold;
  if (reward.xp) gainXp(reward.xp, false);
  if (Array.isArray(reward.addItems)) reward.addItems.forEach(item => addItemToHero(h, item.id, item.qty || 1));
  if (reward.flags) Object.assign(state.game.flags, reward.flags);
}

function addChoice(choice) {
  const b = document.createElement('button');
  const lockedByItem = choice.requiresItem && !hasItem(choice.requiresItem);
  const lockedByFlag = choice.requiresFlag && !hasFlag(choice.requiresFlag);
  const locked = lockedByItem || lockedByFlag;
  b.className = 'choice ' + (choice.className || '') + (locked ? ' locked' : '');
  b.textContent = choice.text + (lockedByItem ? ` 🔒 precisa de ${itemName(choice.requiresItem)}` : '') + (lockedByFlag ? ' 🔒 caminho bloqueado' : '');
  b.onclick = () => {
    if (locked) return toast('Você ainda não cumpre o requisito desta escolha.');
    playSfx(choice.sfx || 'click');
    if (choice.damage) { const damage = Math.max(1, choice.damage - state.game.hero.def); state.game.hero.hp -= damage; toast(`Você sofreu ${damage} de dano.`); }
    applyReward(choice);
    if (choice.completeSideQuest) completeSideQuest(choice.completeSideQuest, choice.sideQuestReward || {});
    state.game.chapterId = choice.to;
    state.game.battle = null; state.battling = null;
    renderGame();
  };
  $('choices').appendChild(b);
}

function startBattle(chapter) {
  if (!state.game.battle || state.game.battle.chapterId !== state.game.chapterId) {
    state.game.battle = { chapterId: state.game.chapterId, enemy: { ...chapter.enemy } };
  }
  state.battling = state.game.battle;
  renderBattle(chapter);
}

function renderBattle(chapter) {
  const box = $('battleBox'), enemy = state.game.battle.enemy, h = state.game.hero;
  box.classList.remove('hidden');
  box.innerHTML = `<strong>👹 Batalha: ${enemy.name}</strong>${enemy.image ? `<img src="${enemy.image}" alt="${enemy.name}">` : ''}<p>Vida do inimigo: ${enemy.hp} • Ataque: ${enemy.atk} • Defesa: ${enemy.def || 0}</p>`;
  $('choices').innerHTML = '';
  addBattleButton('⚔️ Atacar', 'danger', () => {
    playSfx('attack');
    enemy.hp -= Math.max(1, h.atk - (enemy.def || 0));
    if (enemy.hp <= 0) return winBattle(chapter);
    enemyTurn(enemy);
  });
  addBattleButton('🛡 Defender', '', () => { const old = h.def; h.def += 3; enemyTurn(enemy, 'Você se defendeu.'); h.def = old; });
  addBattleButton('🧪 Usar poção', 'reward', () => useConsumable('pocao_vida'));
  addBattleButton('🍞 Comer pão', 'reward', () => useConsumable('pao'));
}

function addBattleButton(text, className, handler) {
  const b = document.createElement('button'); b.className = `choice ${className}`; b.textContent = text; b.onclick = handler; $('choices').appendChild(b);
}

function enemyTurn(enemy, prefix = '') {
  const h = state.game.hero;
  const damage = Math.max(1, enemy.atk - h.def);
  h.hp -= damage;
  if (h.hp <= 0) { state.game.battle = null; state.battling = null; state.game.chapterId = getAdventure().chapters[state.game.chapterId].loseTo || 'derrota'; renderGame(); return; }
  toast(prefix ? `${prefix} Inimigo causou ${damage} de dano.` : `Inimigo causou ${damage} de dano.`);
  save(); renderStatus(); renderBattle(getAdventure().chapters[state.game.chapterId]);
}

function useConsumable(id) {
  const item = getAdventure().items[id];
  if (!hasItem(id)) return toast(`Você não tem ${itemName(id)}.`);
  if (!item?.heal) return toast('Este item não pode ser usado agora.');
  removeItemFromHero(state.game.hero, id, 1);
  state.game.hero.hp = Math.min(state.game.hero.maxHp, state.game.hero.hp + item.heal);
  playSfx('item'); toast(`${item.name}: +${item.heal} vida.`); save(); renderGame();
}

function winBattle(chapter) {
  const h = state.game.hero, enemy = chapter.enemy;
  h.gold += enemy.rewardGold || 0;
  if (Array.isArray(enemy.rewardItems)) enemy.rewardItems.forEach(item => addItemToHero(h, item.id, item.qty || 1));
  if (enemy.xp) gainXp(enemy.xp, false);
  if (enemy.setFlag) state.game.flags[enemy.setFlag] = true;
  if (enemy.completeSideQuest) completeSideQuest(enemy.completeSideQuest, enemy.sideQuestReward || {});
  playSfx('victory'); toast(`Vitória! +${enemy.rewardGold || 0} ouro, +${enemy.xp || 0} XP.`);
  state.game.battle = null; state.battling = null; state.game.chapterId = chapter.winTo; save(); renderGame();
}

async function iniciarApp() {
  try { await carregarAventurasDoCatalogo(); renderAdventures(); }
  catch (error) {
    console.error(error);
    const list = $('adventureList');
    if (list) list.innerHTML = `<div class="adventure-card error-card"><span class="icon">⚠️</span><h3>Erro ao carregar aventuras</h3><p>${error.message}</p><p>Verifique o arquivo <strong>aventuras/catalogo.js</strong>.</p></div>`;
    toast('Erro ao carregar aventuras.');
  }
}

iniciarApp();
