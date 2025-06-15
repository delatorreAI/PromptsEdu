const PRECIOS_OFICIALES = {
    pan: 0.80,
    aceite: 2.50,
    carne: 4.00,
    huevos: 0.30,
    arroz: 1.20
};

const MULTIPLICADORES_ESTRAPERLO = {
    pan: { min: 2.5, max: 4.0 },
    aceite: { min: 3.0, max: 5.0 },
    carne: { min: 3.5, max: 6.0 },
    huevos: { min: 4.0, max: 7.0 },
    arroz: { min: 2.0, max: 4.0 }
};

function calcularPrecioEstraperlo(producto, dia, riesgoPolicial, demanda) {
    const base = PRECIOS_OFICIALES[producto];
    const mult = MULTIPLICADORES_ESTRAPERLO[producto];
    let factor = mult.min + (mult.max - mult.min) * Math.random();
    factor *= (1 + (riesgoPolicial / 100) * 0.5);
    factor *= (1 + (demanda / 100) * 0.3);
    factor *= (1 + (dia / 7) * 0.2);
    return Math.round(base * factor * 100) / 100;
}
