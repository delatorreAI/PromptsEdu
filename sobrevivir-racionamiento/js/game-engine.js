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

function applyDailyConsumption() {
    Object.keys(gameState.family).forEach(key => {
        const miembro = gameState.family[key];
        if (gameState.resources.comida.pan > 0) {
            gameState.resources.comida.pan--;
            miembro.hambre = Math.min(100, miembro.hambre + 10);
            miembro.alimentacionActual = 100;
        } else {
            miembro.hambre = Math.max(0, miembro.hambre - 20);
            miembro.alimentacionActual = 0;
        }
    });
    calcularSaludFamiliar(Object.values(gameState.family));
}

function nextDay() {
    if (gameState.currentDay >= 7) {
        gameState.gameCompleted = true;
        saveGame();
        alert('Fin de la semana');
        return;
    }
    applyDailyConsumption();
    const evento = generarEventoAleatorio(gameState.currentDay, gameState);
    if (evento) {
        gameState.lastEvent = evento;
        if (evento.efectos.comida_extra) {
            gameState.resources.comida.pan += evento.efectos.comida_extra;
        }
        if (evento.efectos.riesgo) {
            gameState.riesgoPolicial += evento.efectos.riesgo;
        }
    } else {
        gameState.lastEvent = null;
    }
    gameState.currentDay++;
    saveGame();
    window.gameUI.updateUI(gameState);
}

function initGame() {
    const saved = loadGame();
    if (saved) Object.assign(gameState, saved);
    window.gameUI.updateUI(gameState);
    document.getElementById('siguiente-dia').addEventListener('click', nextDay);
}

window.addEventListener('load', () => {
    initGame();
    window.addEventListener('beforeunload', saveGame);
});
