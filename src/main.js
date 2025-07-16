// main.js
// Punto de entrada de la SPA con Vite y rutas normales
import { handleRoute, setupRouter } from './router.js';

// Cuando la página carga, inicializamos el router y mostramos la vista correcta
window.addEventListener('DOMContentLoaded', () => {
  handleRoute();
  setupRouter();
});
