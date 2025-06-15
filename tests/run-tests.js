const fs = require('fs');
const vm = require('vm');
const os = require('os');
const path = require('path');

function createTempStorage(dir) {
    const file = path.join(dir, 'storage.json');
    return {
        setItem: (k, v) => {
            let data = {};
            if (fs.existsSync(file)) {
                data = JSON.parse(fs.readFileSync(file, 'utf8'));
            }
            data[k] = v;
            fs.writeFileSync(file, JSON.stringify(data));
        },
        getItem: (k) => {
            if (!fs.existsSync(file)) return null;
            const data = JSON.parse(fs.readFileSync(file, 'utf8'));
            return data[k] || null;
        }
    };
}

function loadGameEngine() {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ls-'));
    const context = {
        localStorage: createTempStorage(dir),
        window: { addEventListener: () => {} },
        document: { getElementById: () => null },
        module: { exports: {} }
    };
    vm.createContext(context);
    const code = fs.readFileSync('sobrevivir-racionamiento/js/game-engine.js', 'utf8');
    vm.runInContext(code, context);
    return context.module.exports;
}

const TESTS = {
    'Archivo HTML existe': () => fs.existsSync('sobrevivir-racionamiento/index.html'),
    'Contiene game-container': () => {
        const html = fs.readFileSync('sobrevivir-racionamiento/index.html', 'utf-8');
        return html.includes('id="game-container"');
    },
    'localStorage save/load funciona': () => {
        const engine = loadGameEngine();
        engine.gameState.currentDay = 3;
        engine.saveGame();
        engine.gameState.currentDay = 1;
        const loaded = engine.loadGame();
        return loaded && loaded.currentDay === 3;
    },
    'nextDay avanza un dia': () => {
        const engine = loadGameEngine();
        const prev = engine.gameState.currentDay;
        if (typeof engine.nextDay !== 'function') return false;
        engine.nextDay();
        return engine.gameState.currentDay === prev + 1;
    },
    'index.html tiene botones de fase': () => {
        const html = fs.readFileSync('sobrevivir-racionamiento/index.html', 'utf-8');
        return html.includes('id="phase-actions"') && html.includes('<button');
    }
};

function runBasicTests() {
    const results = {};
    for (const t in TESTS) {
        try {
            results[t] = TESTS[t]();
        } catch (e) {
            results[t] = false;
        }
    }
    console.log(results);
    const failed = Object.values(results).some(v => !v);
    return failed ? 1 : 0;
}

process.exit(runBasicTests());
