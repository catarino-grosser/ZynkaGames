const SAVE_KEY = 'zynkaRpgSaveV2';

export function saveGame(game) {
  if (game) localStorage.setItem(SAVE_KEY, JSON.stringify(game));
}

export function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function clearSave() {
  localStorage.removeItem(SAVE_KEY);
}
