import { obtenerPosts } from '../api/gallery.js';

let postsActuales = [];
let modalVerInstance = null;

let contenedorFotos;
let galeriaLoading;
let galeriaError;
let galeriaEmpty;

document.addEventListener('DOMContentLoaded', async () => {
  inicializarElementos();
  inicializarModales();
  inicializarScrollTop();
  await cargarPublicaciones();
});

function inicializarElementos() {
  contenedorFotos = document.getElementById('contenedorFotos');
  galeriaLoading = document.getElementById('galeriaLoading');
  galeriaError = document.getElementById('galeriaError');
  galeriaEmpty = document.getElementById('galeriaEmpty');
}

function inicializarModales() {
  const modalVerEl = document.getElementById('modalVerPost');
  if (modalVerEl && window.bootstrap) {
    modalVerInstance = new window.bootstrap.Modal(modalVerEl);
  }
}

function inicializarScrollTop() {
  const btnScrollTop = document.getElementById('btnScrollTop');
  if (!btnScrollTop) return;

  window.addEventListener('scroll', () => {
    btnScrollTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
  });

  btnScrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function mostrarEstado(estado, mensajeError = '') {
  galeriaLoading?.classList.add('d-none');
  galeriaError?.classList.add('d-none');
  galeriaEmpty?.classList.add('d-none');
  contenedorFotos?.classList.add('d-none');

  switch (estado) {
    case 'cargando':
      galeriaLoading?.classList.remove('d-none');
      break;
    case 'error':
      const errorTexto = document.getElementById('errorMensajeTexto');
      if (errorTexto && mensajeError) {
        errorTexto.textContent = mensajeError;
      }
      galeriaError?.classList.remove('d-none');
      break;
    case 'vacio':
      galeriaEmpty?.classList.remove('d-none');
      break;
    case 'exito':
      contenedorFotos?.classList.remove('d-none');
      break;
  }
}

async function cargarPublicaciones() {
  mostrarEstado('cargando');

  try {
    const posts = await obtenerPosts();
    postsActuales = Array.isArray(posts) ? posts : [];

    if (postsActuales.length === 0) {
      mostrarEstado('vacio');
      return;
    }

    renderizarGrid(postsActuales);
    mostrarEstado('exito');
  } catch (error) {
    console.error('Error al cargar la galería:', error);
    mostrarEstado('error', error.message || 'Error de conexión con el servidor.');
  }
}

function renderizarGrid(posts) {
  if (!contenedorFotos) return;

  contenedorFotos.innerHTML = posts
    .map((post) => {
      const fechaFormateada = formatearFecha(post.eventDate);
      const fotoPortada =
        post.urlPictures && post.urlPictures.length > 0
          ? post.urlPictures[0]
          : 'https://raw.githubusercontent.com/CamiloBermeo/devPortes/refs/heads/main/assets/img/torneodefutbol.jpg';

      const badgeCount =
        post.urlPictures && post.urlPictures.length > 1
          ? `<span class="foto-badge-count"><i class="bi bi-images"></i> ${post.urlPictures.length}</span>`
          : '';

      return `
        <article class="foto-card" data-id="${post.id}">
          <div class="foto-img-container">
            <img src="${fotoPortada}" alt="${post.name}" loading="lazy" />
            <span class="foto-badge-fecha">
              <i class="bi bi-calendar3"></i> ${fechaFormateada}
            </span>
            ${badgeCount}
          </div>
          <div class="texto-foto">
            <h3>${post.name}</h3>
            <p>${post.description}</p>
          </div>
        </article>
      `;
    })
    .join('');

  contenedorFotos.querySelectorAll('.foto-card').forEach((card) => {
    card.addEventListener('click', () => {
      const id = Number(card.getAttribute('data-id'));
      const post = postsActuales.find((p) => Number(p.id) === id);
      if (post) abrirModalVer(post);
    });
  });
}

function abrirModalVer(post) {
  if (!modalVerInstance) return;

  const verPostTitulo = document.getElementById('verPostTitulo');
  const verPostFecha = document.getElementById('verPostFecha');
  const verPostDescripcion = document.getElementById('verPostDescripcion');
  const indicators = document.getElementById('verPostCarouselIndicators');
  const inner = document.getElementById('verPostCarouselInner');
  const prevBtn = document.getElementById('verPostCarouselPrev');
  const nextBtn = document.getElementById('verPostCarouselNext');

  if (verPostTitulo) verPostTitulo.textContent = post.name;
  if (verPostFecha) verPostFecha.textContent = formatearFechaLarga(post.eventDate);
  if (verPostDescripcion) verPostDescripcion.textContent = post.description;

  const fotos =
    post.urlPictures && post.urlPictures.length > 0
      ? post.urlPictures
      : ['https://raw.githubusercontent.com/CamiloBermeo/devPortes/refs/heads/main/assets/img/torneodefutbol.jpg'];

  if (inner && indicators) {
    indicators.innerHTML = '';
    inner.innerHTML = '';

    fotos.forEach((url, idx) => {
      const indicatorBtn = document.createElement('button');
      indicatorBtn.type = 'button';
      indicatorBtn.setAttribute('data-bs-target', '#carouselVerPost');
      indicatorBtn.setAttribute('data-bs-slide-to', String(idx));
      indicatorBtn.setAttribute('aria-label', `Slide ${idx + 1}`);
      if (idx === 0) {
        indicatorBtn.classList.add('active');
        indicatorBtn.setAttribute('aria-current', 'true');
      }
      indicators.appendChild(indicatorBtn);

      const itemDiv = document.createElement('div');
      itemDiv.className = `carousel-item ${idx === 0 ? 'active' : ''}`;
      itemDiv.innerHTML = `<img src="${url}" class="d-block w-100" alt="${post.name} - Foto ${idx + 1}" />`;
      inner.appendChild(itemDiv);
    });

    if (fotos.length <= 1) {
      indicators.classList.add('d-none');
      prevBtn?.classList.add('d-none');
      nextBtn?.classList.add('d-none');
    } else {
      indicators.classList.remove('d-none');
      prevBtn?.classList.remove('d-none');
      nextBtn?.classList.remove('d-none');
    }
  }

  modalVerInstance.show();
}

function formatearFecha(fechaStr) {
  if (!fechaStr) return '';
  try {
    const [anio, mes, dia] = fechaStr.split('-').map(Number);
    if (!anio || !mes || !dia) return fechaStr;
    const fecha = new Date(anio, mes - 1, dia);
    return fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return fechaStr;
  }
}

function formatearFechaLarga(fechaStr) {
  if (!fechaStr) return '';
  try {
    const [anio, mes, dia] = fechaStr.split('-').map(Number);
    if (!anio || !mes || !dia) return fechaStr;
    const fecha = new Date(anio, mes - 1, dia);
    return fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return fechaStr;
  }
}
