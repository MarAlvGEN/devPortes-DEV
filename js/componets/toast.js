function escapeHtml(text) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

function initToastContainer() {
  let container = document.querySelector('.dp-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'dp-toast-container';
    document.body.appendChild(container);
  }
  return container;
}

export function showToast(mensaje, tipo = 'info', duracion = 3500) {
  const container = initToastContainer();
  const toast = document.createElement('div');
  toast.className = `dp-toast dp-toast--${tipo}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');

  const iconos = {
    exito: 'bi-check-circle-fill',
    error: 'bi-x-circle-fill',
    info: 'bi-info-circle-fill',
    advertencia: 'bi-exclamation-triangle-fill',
  };

  toast.innerHTML = `
    <i class="bi ${iconos[tipo] || iconos.info}"></i>
    <span>${escapeHtml(mensaje)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('dp-toast--hiding');
    toast.addEventListener('animationend', () => toast.remove());
  }, duracion);

  return toast;
}