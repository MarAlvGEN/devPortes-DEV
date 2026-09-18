function escapeHtml(text) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

export function showConfirm(mensaje, titulo = 'Confirmar') {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    overlay.innerHTML = `
      <div class="confirm-modal">
        <button type="button" class="confirm-close" aria-label="Cerrar">
          <i class="bi bi-x-lg"></i>
        </button>
        <div class="confirm-icon">
          <i class="bi bi-question-circle-fill"></i>
        </div>
        <h3 class="confirm-titulo">${escapeHtml(titulo)}</h3>
        <p class="confirm-mensaje">${escapeHtml(mensaje)}</p>
        <div class="confirm-botones">
          <button type="button" class="confirm-btn confirm-btn-cancelar">Cancelar</button>
          <button type="button" class="confirm-btn confirm-btn-aceptar">Aceptar</button>
        </div>
      </div>
    `;

    const cerrar = (resultado) => {
      overlay.classList.add('confirm-ocultando');
      overlay.addEventListener('animationend', () => {
        overlay.remove();
        resolve(resultado);
      }, { once: true });
    };

    overlay.querySelector('.confirm-close').addEventListener('click', () => cerrar(false));
    overlay.querySelector('.confirm-btn-cancelar').addEventListener('click', () => cerrar(false));
    overlay.querySelector('.confirm-btn-aceptar').addEventListener('click', () => cerrar(true));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) cerrar(false);
    });

    document.body.appendChild(overlay);
  });
}