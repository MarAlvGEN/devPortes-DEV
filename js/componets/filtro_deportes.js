const SVG_TENIS = `<svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/><path d="M6 5.3a9 9 0 0 1 0 13.4"/><path d="M18 5.3a9 9 0 0 0 0 13.4"/></svg>`;

function obtenerIconoDeporte(nombreDeporte) {
  const nombre = nombreDeporte.toLowerCase();
  if (nombre.includes('tenis')) return SVG_TENIS;
  if (nombre.includes('futbol') || nombre.includes('fútbol')) return 'fa-solid fa-futbol';
  if (nombre.includes('balon') || nombre.includes('basket')) return 'fa-solid fa-basketball';
  if (nombre.includes('padel') || nombre.includes('pádel')) return 'fa-solid fa-table-tennis-paddle-ball';
  if (nombre.includes('voley') || nombre.includes('voleibol')) return 'fa-solid fa-volleyball';
  if (nombre.includes('indoor') || nombre.includes('cancha')) return 'bi bi-house-door';
  return 'bi bi-circle';
}

export function renderizarFiltroDeportes(canchas, contenedorId = 'filtro-deportes', onFiltrar) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor || canchas.length === 0) return;

  const deportes = [...new Set(canchas.flatMap((c) => c.tipo))].sort();

  contenedor.innerHTML = '';

  const btnTodos = document.createElement('button');
  btnTodos.className = 'filtro-deporte-btn active';
  btnTodos.innerHTML = '<i class="fa-solid fa-grip"></i><span>Todos</span>';
  btnTodos.dataset.deporte = 'todos';
  contenedor.appendChild(btnTodos);

  deportes.forEach((deporte) => {
    const btn = document.createElement('button');
    btn.className = 'filtro-deporte-btn';
    const icono = obtenerIconoDeporte(deporte);
    if (icono.startsWith('<svg')) {
      btn.innerHTML = `${icono}<span>${deporte}</span>`;
    } else {
      btn.innerHTML = `<i class="${icono}"></i><span>${deporte}</span>`;
    }
    btn.dataset.deporte = deporte;
    contenedor.appendChild(btn);
  });

  contenedor.addEventListener('click', (e) => {
    const btn = e.target.closest('.filtro-deporte-btn');
    if (!btn) return;

    contenedor.querySelectorAll('.filtro-deporte-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const seleccion = btn.dataset.deporte;
    const filtradas = seleccion === 'todos' ? canchas : canchas.filter((c) => c.tipo.includes(seleccion));

    if (typeof onFiltrar === 'function') {
      onFiltrar(filtradas);
    }
  });
}
