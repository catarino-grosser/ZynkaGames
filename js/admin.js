import {
  validateAdventure,
  publishFirebaseAdventure,
  listAllFirebaseAdventures,
  deleteFirebaseAdventure
} from './firebase-service.js';

const $ = (id) => document.getElementById(id);

const exampleAdventure = {
  id: 'floresta-sombria',
  title: 'A Floresta Sombria',
  icon: '🌲',
  genre: 'Fantasia',
  desc: 'Uma floresta amaldiçoada cheia de segredos.',
  start: 'inicio',
  published: true,
  order: 1,
  chapters: {
    inicio: {
      title: 'A entrada da floresta',
      text: 'Você chega diante de árvores antigas. O vento parece sussurrar seu nome.',
      choices: [
        { text: 'Entrar pela trilha principal', to: 'trilha' },
        { text: 'Procurar sinais no chão', to: 'sinais' }
      ]
    },
    sinais: {
      title: 'Marcas na lama',
      text: 'Você encontra pegadas enormes e uma poção esquecida entre as raízes.',
      effect: { item: 'Poção de Vida', gold: 2 },
      choices: [
        { text: 'Seguir as pegadas', to: 'lobo' },
        { text: 'Voltar para a trilha', to: 'trilha' }
      ]
    },
    trilha: {
      title: 'A trilha escura',
      text: 'A mata fecha atrás de você. Um rosnado surge entre os arbustos.',
      choices: [
        { text: 'Enfrentar o perigo', to: 'lobo' },
        { text: 'Correr para uma clareira', to: 'clareira', damage: 2 }
      ]
    },
    lobo: {
      title: 'O lobo encantado',
      text: 'Um lobo com olhos brilhantes bloqueia seu caminho.',
      enemy: { name: 'Lobo Encantado', hp: 14, atk: 3, rewardGold: 8, rewardItem: 'Presa Mística' },
      winTo: 'clareira',
      loseTo: 'derrota'
    },
    clareira: {
      title: 'A clareira azul',
      text: 'No centro da floresta, uma luz azul abre um portal. Você encontrou o coração da maldição.',
      choices: [
        { text: 'Entrar no portal', to: 'final' },
        { text: 'Pegar moedas antigas antes de entrar', to: 'tesouro' }
      ]
    },
    tesouro: {
      title: 'Moedas antigas',
      text: 'Você recolhe moedas cobertas de musgo e sente a floresta aceitar sua presença.',
      effect: { gold: 12, item: 'Moeda Antiga' },
      choices: [
        { text: 'Entrar no portal', to: 'final' }
      ]
    },
    final: {
      title: 'Vitória na floresta',
      text: 'Você atravessa o portal e quebra a maldição. A floresta volta a respirar em paz.',
      end: true
    },
    derrota: {
      title: 'Fim da jornada',
      text: 'Você caiu na floresta sombria. Outro herói talvez tente novamente.',
      end: true
    }
  }
};

function setStatus(message, type = '') {
  const box = $('adminStatus');
  box.textContent = message;
  box.className = 'notice ' + type;
}

function getAdventureFromInput() {
  try {
    return JSON.parse($('jsonInput').value);
  } catch (error) {
    throw new Error('JSON inválido. Verifique vírgulas, aspas e chaves.');
  }
}

function loadExample() {
  $('jsonInput').value = JSON.stringify(exampleAdventure, null, 2);
  setStatus('Exemplo carregado. Você pode editar e publicar.', 'ok');
}

async function refreshList() {
  const list = $('firebaseList');
  list.innerHTML = '<p class="muted">Carregando aventuras...</p>';
  try {
    const adventures = await listAllFirebaseAdventures();
    if (!adventures.length) {
      list.innerHTML = '<p class="muted">Nenhuma aventura encontrada no Firebase.</p>';
      return;
    }
    list.innerHTML = adventures.map(adv => `
      <div class="admin-item">
        <div>
          <strong>${adv.icon || '📖'} ${adv.title || adv.id}</strong>
          <small>ID: ${adv.id} • ${adv.genre || 'Sem gênero'} • published: ${adv.published === true ? 'true' : 'false'} • order: ${adv.order ?? '-'}</small>
          <p>${adv.desc || ''}</p>
        </div>
        <button class="danger-btn" data-delete="${adv.id}">Excluir</button>
      </div>
    `).join('');

    document.querySelectorAll('[data-delete]').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.dataset.delete;
        const ok = confirm(`Excluir a aventura "${id}" do Firebase?`);
        if (!ok) return;
        await deleteFirebaseAdventure(id);
        setStatus(`Aventura "${id}" excluída.`, 'ok');
        refreshList();
      };
    });
  } catch (error) {
    list.innerHTML = `<p class="error-text">Erro: ${error.message}</p>`;
    setStatus('Erro ao listar aventuras. Confira as regras do Firestore e a conexão.', 'error');
  }
}

$('loadExampleBtn').onclick = loadExample;
$('validateBtn').onclick = () => {
  try {
    const adventure = getAdventureFromInput();
    validateAdventure(adventure);
    setStatus(`Aventura "${adventure.title}" validada com sucesso.`, 'ok');
  } catch (error) {
    setStatus(error.message, 'error');
  }
};

$('publishBtn').onclick = async () => {
  try {
    const adventure = getAdventureFromInput();
    validateAdventure(adventure);
    const id = await publishFirebaseAdventure(adventure);
    setStatus(`Aventura "${id}" publicada no Firebase. Abra o jogo para testar.`, 'ok');
    refreshList();
  } catch (error) {
    setStatus(error.message, 'error');
  }
};

$('refreshBtn').onclick = refreshList;

loadExample();
refreshList();
