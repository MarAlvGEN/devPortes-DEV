import { obtenerCanchas } from '../api/canchas.js';
import { renderizarInstalaciones, renderizarModales } from '../componets/tarjeta_canchas.js';
import { renderizarFiltroDeportes } from '../componets/filtro_deportes.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const canchas = (await obtenerCanchas()).filter((c) => c.estado === 'Disponible');
    renderizarInstalaciones(canchas);
    renderizarModales(canchas);
    renderizarFiltroDeportes(canchas, 'filtro-deportes', (filtradas) => {
      renderizarInstalaciones(filtradas);
      renderizarModales(filtradas);
    });
  } catch (error) {
    const contenedor = document.getElementById('contenedor-instalaciones');
    if (contenedor) {
      contenedor.innerHTML = `
        <div class="text-center py-5 w-100">
          <i class="bi bi-exclamation-triangle text-warning fs-1 mb-3"></i>
          <p class="text-muted fw-medium">No pudimos cargar las canchas en este momento.</p>
          <button class="btn btn-outline-dark btn-sm" onclick="location.reload()">Reintentar</button>
        </div>`;
    }
  }
  inicializarScroll();
});

function inicializarScroll() {
  const btnScrollTop = document.getElementById('btnScrollTop');
  if (!btnScrollTop) return;

  window.addEventListener('scroll', () => {
    btnScrollTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
  });

  btnScrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
