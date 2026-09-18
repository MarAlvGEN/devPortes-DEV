import { obtenerCanchas } from '../api/canchas.js';
import { renderizarInstalaciones, renderizarModales } from '../componets/tarjeta_canchas.js';
import { renderizarFiltroDeportes } from '../componets/filtro_deportes.js';

document.addEventListener('DOMContentLoaded', async () => {
  const canchas = (await obtenerCanchas()).filter((c) => c.estado === 'Disponible');
  renderizarInstalaciones(canchas);
  renderizarModales(canchas);
  renderizarFiltroDeportes(canchas, 'filtro-deportes', (filtradas) => {
    renderizarInstalaciones(filtradas);
    renderizarModales(filtradas);
  });
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
