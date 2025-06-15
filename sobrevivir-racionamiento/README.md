# Sobrevivir al Racionamiento

Minijuego educativo que simula la supervivencia de una familia durante los años del hambre en el franquismo. Todo el juego funciona con HTML, CSS y JavaScript sin dependencias adicionales.

## Estructura
- `index.html` punto de entrada.
- `css/` estilos generales y tema visual de 1942.
- `js/` lógica de juego dividida en modulos.
- `assets/` espacio para recursos del juego.
  - `assets/images/` ilustraciones y arte.
  - `assets/data/` ficheros JSON con datos historicos.

## Ejecución

En entornos con Node disponible puede lanzarse un servidor estático simple:

```bash
npx serve sobrevivir-racionamiento
```

O bien abrir `index.html` directamente en un navegador moderno.

## Pruebas

Ejecute `node tests/run-tests.js` para ejecutar tests básicos sobre la estructura del proyecto.
