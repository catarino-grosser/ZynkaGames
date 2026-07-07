import { saveGame } from './storage.js';

export function createGame(adventureId, startChapter, heroName, className) {
  const base = { hp: 24, atk: 5, gold: 5, inventory: [] };
  if (className === 'Guerreiro') { base.hp += 8; base.atk += 1; }
  if (className === 'Mago') { base.hp -= 3; base.atk += 4; base.inventory.push('Orbe Arcano'); }
  if (className === 'Ladino') { base.atk += 2; base.gold += 12; base.inventory.push('Gazua'); }
  return {
    adventureId,
    chapterId: startChapter,
    hero: { name: heroName || 'Herói sem Nome', className, ...base },
    visitedEffects: []
  };
}

export function applyEffect(game, chapter) {
  if (!chapter.effect || game.visitedEffects.includes(game.chapterId)) return;
  const h = game.hero;
  if (chapter.effect.hp) h.hp += chapter.effect.hp;
  if (chapter.effect.atk) h.atk += chapter.effect.atk;
  if (chapter.effect.gold) h.gold += chapter.effect.gold;
  if (chapter.effect.item) h.inventory.push(chapter.effect.item);
  game.visitedEffects.push(game.chapterId);
  saveGame(game);
}

export function buyPotion(game) {
  const h = game.hero;
  if (h.gold < 5) return false;
  h.gold -= 5;
  h.inventory.push('Poção de Vida');
  h.hp += 8;
  saveGame(game);
  return true;
}
