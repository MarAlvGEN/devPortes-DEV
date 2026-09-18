export function renderizarFiltroDeportes(canchas, contenedorId = 'filtro-deportes', onFiltrar) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor || canchas.length === 0) return;

  const deportes = [...new Set(canchas.flatMap((c) => c.tipo))].sort();

  contenedor.innerHTML = '';

  const btnTodos = document.createElement('button');
  btnTodos.className = 'filtro-deporte-btn active';
  btnTodos.textContent = 'Todos';
  btnTodos.dataset.deporte = 'todos';
  contenedor.appendChild(btnTodos);

  deportes.forEach((deporte) => {
    const btn = document.createElement('button');
    btn.className = 'filtro-deporte-btn';
    btn.textContent = deporte;
    btn.dataset.deporte = deporte;
    contenedor.appendChild(btn);
  });

  contenedor.addEventListener('click', (e) => {
    const btn = e.target.closest('.filtro-deporte-btn');
    if (!btn) return;

    contenedor.querySelectorAll('.filtro-deporte-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const seleccion = btn.dataset.deporte;
    const filtradas = seleccion === 'todos'
      ? canchas
      : canchas.filter((c) => c.tipo.includes(seleccion));

    if (typeof onFiltrar === 'function') {
      onFiltrar(filtradas);
    }
  });
}
