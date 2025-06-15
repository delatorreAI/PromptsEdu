const STORAGE_KEY = 'sobrevivir_racionamiento_v1';

const gameState = {
    version: '1.0',
    currentDay: 1,
    family: {
        padre: { salud: 100, hambre: 100, moral: 100, edad: 35, id: 'padre', genero: 'hombre' },
        madre: { salud: 100, hambre: 100, moral: 100, edad: 33, id: 'madre', genero: 'mujer' },
        hijo: { salud: 100, hambre: 100, moral: 100, edad: 12, id: 'hijo', genero: 'hombre' },
        hija: { salud: 100, hambre: 100, moral: 100, edad: 8, id: 'hija', genero: 'mujer' }
    },
    resources: {
        dinero: 12,
        comida: { pan: 3, aceite: 7, garbanzos: 1, arroz: 4, huevos: 1 }
    },
    decisions: [],
    riesgoPolicial: 15,
    history: {
        riesgo: [],
        salud: {
            padre: [],
            madre: [],
            hijo: [],
            hija: []
        }
    },
    gameCompleted: false
};

function saveGame() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch (error) {
        console.warn('No se pudo guardar progreso:', error);
    }
}

function loadGame() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
    } catch (error) {
        console.warn('No se pudo cargar progreso:', error);
        return null;
    }
}

window.addEventListener('beforeunload', saveGame);

function recordStatus() {
    gameState.history.riesgo.push(gameState.riesgoPolicial);
    Object.keys(gameState.family).forEach(id => {
        const m = gameState.family[id];
        gameState.history.salud[id].push(m.salud);
    });
}

function showEndScreen(msg) {
    const scr = document.getElementById('end-screen');
    const msgEl = document.getElementById('end-message');
    if (scr && msgEl) {
        msgEl.textContent = msg;
        scr.classList.remove('hidden');
    } else {
        alert(msg);
    }
}

function checkEndConditions() {
    const dead = Object.values(gameState.family).some(m => m.salud <= 0);
    if (dead || gameState.riesgoPolicial >= 100) {
        showEndScreen('Game Over');
        return true;
    }
    if (gameState.currentDay > 7 && !gameState.gameCompleted) {
        gameState.gameCompleted = true;
        showEndScreen('¡Victoria!');
        return true;
    }
    return false;
}

function advanceDay() {
    recordStatus();
    if (checkEndConditions()) return;
    gameState.currentDay += 1;
}

window.addEventListener('load', recordStatus);
