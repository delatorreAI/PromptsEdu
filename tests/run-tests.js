const fs = require('fs');

const TESTS = {
    'Archivo HTML existe': () => fs.existsSync('sobrevivir-racionamiento/index.html'),
    'Contiene game-container': () => {
        const html = fs.readFileSync('sobrevivir-racionamiento/index.html', 'utf-8');
        return html.includes('id="game-container"');
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
