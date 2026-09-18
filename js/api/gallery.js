import { apiGet, apiMultipart, apiDelete } from './apiClient.js';
import { USE_MOCK, obtenerPostsMock, guardarPostsMock } from '../utils/mockData.js';

/**
 * Normaliza la estructura de un post del backend para asegurar consistencia
 * @param {Object} raw - Datos crudos devueltos por el backend
 * @returns {Object} Post normalizado
 */
export function normalizarPost(raw) {
  return {
    id: raw.id,
    name: raw.name || '',
    description: raw.description || '',
    urlPictures: Array.isArray(raw.urlPictures) ? raw.urlPictures : [],
    eventDate: raw.eventDate || '',
  };
}

/**
 * Obtiene todas las publicaciones de la galería (Público)
 * Endpoint: GET /api/v1/post/all
 * @returns {Promise<Array>} Lista de publicaciones
 */
export async function obtenerPosts() {
  if (USE_MOCK) {
    return obtenerPostsMock().map(normalizarPost);
  }

  try {
    const data = await apiGet('/post/all');
    const posts = Array.isArray(data) ? data : [];
    return posts.map(normalizarPost);
  } catch (error) {
    console.warn('Fallo al obtener posts desde el backend. Usando datos locales de respaldo:', error);
    return obtenerPostsMock().map(normalizarPost);
  }
}

/**
 * Crea una nueva publicación en la galería con imágenes (Requiere ADMIN)
 * Endpoint: POST /api/v1/post/new (multipart/form-data)
 * @param {Object} data - { name, description, eventDate }
 * @param {Array<File>|FileList} pictures - Archivos binarios de las fotos
 * @returns {Promise<Object>} Post creado
 */
export async function crearPost(data, pictures = []) {
  if (USE_MOCK) {
    const posts = obtenerPostsMock();
    const nuevoId = posts.length > 0 ? Math.max(...posts.map((p) => p.id || 0)) + 1 : 1;
    const urls = [];

    if (pictures && pictures.length > 0) {
      for (const pic of Array.from(pictures)) {
        urls.push(URL.createObjectURL(pic));
      }
    } else {
      urls.push('https://raw.githubusercontent.com/CamiloBermeo/devPortes/refs/heads/main/assets/img/torneodefutbol.jpg');
    }

    const nuevoPost = {
      id: nuevoId,
      name: data.name,
      description: data.description,
      urlPictures: urls,
      eventDate: data.eventDate || new Date().toISOString().split('T')[0],
    };

    posts.unshift(nuevoPost);
    guardarPostsMock(posts);
    return normalizarPost(nuevoPost);
  }

  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('eventDate', data.eventDate);

  if (pictures && pictures.length > 0) {
    Array.from(pictures).forEach((file) => {
      formData.append('pictures', file);
    });
  }

  const respuesta = await apiMultipart('/post/new', formData, { auth: true, method: 'POST' });
  return normalizarPost(respuesta);
}

/**
 * Edita una publicación existente (Requiere ADMIN)
 * Endpoint: PUT /api/v1/post/edit/{id} (multipart/form-data)
 * @param {number|string} id - Identificador de la publicación
 * @param {Object} data - { name, description, eventDate }
 * @param {Array<string>} existingUrls - URLs que se conservan de imágenes previas
 * @param {Array<File>|FileList} newPictures - Nuevas imágenes a subir
 * @returns {Promise<Object>} Post actualizado
 */
export async function editarPost(id, data, existingUrls = [], newPictures = []) {
  const numId = Number(id);

  if (USE_MOCK) {
    const posts = obtenerPostsMock();
    const idx = posts.findIndex((p) => Number(p.id) === numId);
    if (idx === -1) throw new Error('Publicación no encontrada');

    const urls = [...existingUrls];
    if (newPictures && newPictures.length > 0) {
      for (const pic of Array.from(newPictures)) {
        urls.push(URL.createObjectURL(pic));
      }
    }

    posts[idx] = {
      ...posts[idx],
      name: data.name || posts[idx].name,
      description: data.description || posts[idx].description,
      eventDate: data.eventDate || posts[idx].eventDate,
      urlPictures: urls.length > 0 ? urls : posts[idx].urlPictures,
    };

    guardarPostsMock(posts);
    return normalizarPost(posts[idx]);
  }

  const formData = new FormData();
  if (data.name) formData.append('name', data.name);
  if (data.description) formData.append('description', data.description);
  if (data.eventDate) formData.append('eventDate', data.eventDate);

  if (existingUrls && existingUrls.length > 0) {
    existingUrls.forEach((url) => {
      formData.append('urlPictures', url);
    });
  }

  if (newPictures && newPictures.length > 0) {
    Array.from(newPictures).forEach((file) => {
      formData.append('pictures', file);
    });
  }

  const respuesta = await apiMultipart(`/post/edit/${numId}`, formData, { auth: true, method: 'PUT' });
  return normalizarPost(respuesta);
}

/**
 * Elimina una publicación de la galería (Requiere ADMIN)
 * Endpoint: DELETE /api/v1/post/{id}
 * @param {number|string} id - Identificador de la publicación a eliminar
 * @returns {Promise<void>}
 */
export async function eliminarPost(id) {
  const numId = Number(id);

  if (USE_MOCK) {
    const posts = obtenerPostsMock();
    const filtrados = posts.filter((p) => Number(p.id) !== numId);
    guardarPostsMock(filtrados);
    return;
  }

  return apiDelete(`/post/${numId}`, { auth: true });
}
