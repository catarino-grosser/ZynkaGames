import { localAdventures } from '../aventuras/index.js';
import { loadFirebaseAdventures } from './firebase-service.js';
import { createGame, applyEffect, buyPotion } from './game-engine.js';
import { saveGame, loadGame, clearSave } from './storage.js';

let adventures = {};
let state = {
  selectedAdventure: null,
  selectedClass: 'Guerreiro',
  game: null,
  battling: null
};

const $ = (id) => document.getElementById(id);
const screens = ['homeScreen', 'characterScreen', 'gameScreen'];
const showScreen = (id) => screens.forEach(s => $(s).classList.toggle('active', s === id));

function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1800);
}

function normalizeAdventures(list) {
  return Object.fromEntries(list.filter(Boolean).map(adv => [adv.id, adv]));
}

async function loadAllAdventures() {
  const firebaseResult = await loadFirebaseAdventures();
  const source = $('dataSource');

  if (firebaseResult.enabled && firebaseResult.adventures.length) {
    adventures = normalizeAdventures(firebaseResult.adventures);
    source.textContent = `Carregando aventuras do Firebase: ${firebaseResult.adventures.length} publicada(s).`;
    return;
  }

  adventures = normalizeAdventures(localAdventures);
  if (firebaseResult.enabled && firebaseResult.error) {
    source.textContent = 'Firebase ativado, mas houve erro ao carregar. O jogo usou as aventuras locais. Veja o console para detalhes.';
  } else if (firebaseResult.enabled) {
    source.textContent = 'Firebase ativado, mas nenhuma aventura publicada foi encontrada. O jogo usou as aventuras locais.';
  } else {
    source.textContent = 'Modo local: aventuras carregadas da pasta /aventuras. Firebase está preparado, mas ainda desativado.';
  }
}

function renderAdventures() {
  const list = $('adventureList');
  list.innerHTML = '';

  const saved = loadGame();
  if (saved && adventures[saved.adventureId]) {
    const savedCard = document.createElement('button');
    savedCard.className = 'adventure-card';
    savedCard.innerHTML = `<span class="icon">💾</span><small>Progresso salvo</small><h3>Continuar: ${saved.hero.name}</h3><p>${adventures[saved.adventureId].title} — capítulo salvo neste aparelho.</p>`;
    savedCard.onclick = () => { state.game = saved; showScreen('gameScreen'); renderGame(); };
    list.appendChild(savedCard);
  }

  Object.entries(adventures).forEach(([id, adv]) => {
    const card = document.createElement('button');
    card.className = 'adventure-card';
    card.innerHTML = `<span class="icon">${adv.icon || '📖'}</span><small>${adv.genre || 'Aventura'}</small><h3>${adv.title}</h3><p>${adv.desc}</p>`;
    card.onclick = () => selectAdventure(id);
    list.appendChild(card);
  });
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
$('resetBtn').onclick = () => { clearSave(); state.game = null; state.battling = null; renderAdventures(); showScreen('homeScreen'); toast('Progresso apagado.'); };

$('startAdventureBtn').onclick = () => {
  const adv = adventures[state.selectedAdventure];
  const name = $('heroName').value.trim() || 'Herói sem Nome';
  state.game = createGame(state.selectedAdventure, adv.start, name, state.selectedClass);
  saveGame(state.game);
  showScreen('gameScreen');
  renderGame();
};

function renderGame() {
  const adv = adventures[state.game.adventureId];
  const chapter = adv.chapters[state.game.chapterId];

  applyEffect(state.game, chapter);

  $('heroDisplay').textContent = `${state.game.hero.name} • ${state.game.hero.className}`;
  $('adventureDisplay').textContent = adv.title;
  $('hpDisplay').textContent = state.game.hero.hp;
  $('atkDisplay').textContent = state.game.hero.atk;
  $('goldDisplay').textContent = state.game.hero.gold;
  $('inventoryList').innerHTML = state.game.hero.inventory.length ? state.game.hero.inventory.map(i => `<li>${i}</li>`).join('') : '<li>Vazio</li>';
  $('chapterTag').textContent = adv.genre || 'Aventura';
  $('storyTitle').textContent = chapter.title;
  $('storyText').textContent = chapter.text;
  $('battleBox').classList.add('hidden');
  $('choices').innerHTML = '';

  if (state.game.hero.hp <= 0) {
    $('choices').innerHTML = '<button class="choice danger">Você perdeu toda a vida. Apague o progresso ou escolha outra aventura.</button>';
    saveGame(state.game);
    return;
  }

  if (chapter.enemy) return startBattle(chapter);

  if (chapter.end) {
    const b = document.createElement('button');
    b.className = 'choice reward';
    b.textContent = 'Jogar outra aventura';
    b.onclick = () => { renderAdventures(); showScreen('homeScreen'); };
    $('choices').appendChild(b);
    saveGame(state.game);
    return;
  }

  chapter.choices.forEach(choice => addChoice(choice));
  saveGame(state.game);
}

function addChoice(choice) {
  const b = document.createElement('button');
  b.className = 'choice ' + (choice.className || '');
  b.textContent = choice.text;
  b.onclick = () => {
    if (choice.action === 'buyPotion') {
      const ok = buyPotion(state.game);
      toast(ok ? 'Poção comprada: +8 vida.' : 'Ouro insuficiente.');
      renderGame();
      return;
    }

    if (choice.damage) {
      state.game.hero.hp -= choice.damage;
      toast(`Você sofreu ${choice.damage} de dano.`);
    }

    state.game.chapterId = choice.to;
    renderGame();
  };
  $('choices').appendChild(b);
}

function startBattle(chapter) {
  if (!state.battling || state.battling.chapterId !== state.game.chapterId) {
    state.battling = { chapterId: state.game.chapterId, enemy: { ...chapter.enemy } };
  }
  renderBattle(chapter);
}

function renderBattle(chapter) {
  const box = $('battleBox');
  const enemy = state.battling.enemy;
  const h = state.game.hero;

  box.classList.remove('hidden');
  box.innerHTML = `<strong>Batalha: ${enemy.name}</strong><p>Vida do inimigo: ${enemy.hp} • Ataque: ${enemy.atk}</p>`;
  $('choices').innerHTML = '';

  const atk = document.createElement('button');
  atk.className = 'choice danger';
  atk.textContent = 'Atacar';
  atk.onclick = () => {
    enemy.hp -= h.atk;
    if (enemy.hp <= 0) {
      h.gold += chapter.enemy.rewardGold || 0;
      if (chapter.enemy.rewardItem) h.inventory.push(chapter.enemy.rewardItem);
      toast(`Vitória! +${chapter.enemy.rewardGold || 0} ouro.`);
      state.battling = null;
      state.game.chapterId = chapter.winTo;
      renderGame();
      return;
    }

    h.hp -= enemy.atk;
    if (h.hp <= 0) {
      state.battling = null;
      state.game.chapterId = chapter.loseTo;
      renderGame();
      return;
    }

    renderGame();
  };

  const potion = document.createElement('button');
  potion.className = 'choice reward';
  potion.textContent = 'Usar poção, se tiver';
  potion.onclick = () => {
    const idx = h.inventory.indexOf('Poção de Vida');
    if (idx === -1) return toast('Você não tem poção.');
    h.inventory.splice(idx, 1);
    h.hp += 10;
    toast('+10 vida.');
    renderGame();
  };

  $('choices').append(atk, potion);
  saveGame(state.game);
}

await loadAllAdventures();
renderAdventures();
