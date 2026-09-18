import { apiPost, apiGet } from './apiClient.js';

export async function registrarUsuario({ name, identityDocument, phoneNumber, email, password }) {
  return apiPost('/auth/register', { name, identityDocument, phoneNumber, email, password });
}

export async function iniciarSesion({ email, password }) {
  return apiPost('/auth/login', { email, password });
}

export async function obtenerPerfil(token) {
  return apiGet('/auth/profile', { auth: true });
}

export async function obtenerUsuarios() {
  return apiGet('/auth/users', { auth: true });
}
