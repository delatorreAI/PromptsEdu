const EVENTOS_HISTORICOS = {
    redada_policial: {
        probabilidad: 0.15,
        titulo: 'Redada policial',
        efectos: { riesgo: 30 }
    },
    ayuda_familiar_pueblo: {
        probabilidad: 0.10,
        titulo: 'Ayuda desde el pueblo',
        efectos: { comida_extra: 2 }
    }
};

function generarEventoAleatorio(dia, estado) {
    const keys = Object.keys(EVENTOS_HISTORICOS);
    for (const evento of keys) {
        const cfg = EVENTOS_HISTORICOS[evento];
        let prob = cfg.probabilidad;
        if (Math.random() < prob) {
            return { tipo: evento, efectos: cfg.efectos };
        }
    }
    return null;
}
