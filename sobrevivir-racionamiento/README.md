# Sobrevivir al Racionamiento

Minijuego educativo que simula la supervivencia de una familia durante los años del hambre en el franquismo. Todo el juego funciona con HTML, CSS y JavaScript sin dependencias adicionales. La interfaz muestra el día actual, el dinero disponible y posibles eventos.

## Estructura
- `index.html` punto de entrada.
- `css/` estilos generales y tema visual de 1942.
- `js/` lógica de juego dividida en modulos.
- `assets/` espacio para imagenes y datos.

## Ejecución

En entornos con Node disponible puede lanzarse un servidor estático simple:

```bash
npx serve sobrevivir-racionamiento
```

También puede abrir `index.html` directamente en un navegador moderno y pulsar **Siguiente día** para avanzar por la semana.

## Pruebas

Ejecute `node tests/run-tests.js` para ejecutar tests básicos sobre la estructura del proyecto.
