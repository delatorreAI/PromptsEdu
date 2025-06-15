function calcularAlimentacionFamiliar(comidaConsumida, miembros) {
    let alimentacionTotal = 0;
    miembros.forEach(miembro => {
        const necesidadBase = miembro.edad < 12 ? 1800 : 2200;
        const consumoReal = comidaConsumida[miembro.id] || 0;
        const porcentaje = (consumoReal / necesidadBase) * 100;
        alimentacionTotal += Math.min(porcentaje, 100);
    });
    return alimentacionTotal / miembros.length;
}

function calcularSaludFamiliar(familiaEstado) {
    familiaEstado.forEach(miembro => {
        const alimentacion = miembro.alimentacionActual || 0;
        let cambio = 0;
        if (alimentacion >= 80) cambio = 2;
        else if (alimentacion >= 60) cambio = 0;
        else if (alimentacion >= 40) cambio = -5;
        else if (alimentacion >= 20) cambio = -10;
        else cambio = -20;
        if (miembro.edad < 10) cambio *= 1.5;
        if (miembro.genero === 'mujer' && miembro.edad > 25) cambio *= 1.2;
        miembro.salud = Math.max(0, Math.min(100, miembro.salud + cambio));
    });
}
