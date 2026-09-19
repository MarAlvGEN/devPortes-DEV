import { iniciarSesion } from '../api/auth.js';

const KEY_ADMIN_SESSION = 'devportes_admin_sesion';
const KEY_TOKEN = 'devportes_token';

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem(KEY_ADMIN_SESSION)) {
    window.location.href = 'panel-administrador.html';
    return;
  }

  const form = document.querySelector('.login-form');
  const emailInput = document.getElementById('adminEmail');
  const passwordInput = document.getElementById('adminPassword');
  const errorDiv = document.getElementById('adminLoginError');
  const btnSubmit = document.getElementById('btnAdminLogin');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorDiv.style.display = 'none';

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    if (!email || !password) {
      showError('Completa todos los campos.');
      return;
    }

    btnSubmit.classList.add('loading');

    try {
      const respuesta = await iniciarSesion({ email, password });

      const adminProfile = {
        nombre: respuesta.nameUser || 'Administrador',
        correo: email,
        rol: 'admin',
      };

      localStorage.setItem(KEY_ADMIN_SESSION, JSON.stringify(adminProfile));
      localStorage.setItem(KEY_TOKEN, respuesta.token);
      window.location.href = 'panel-administrador.html';
    } catch (error) {
      btnSubmit.classList.remove('loading');
      if (error.status === 401) {
        showError('Credenciales incorrectas. Verifica tu correo y contrasena.');
      } else {
        showError(error.message || 'Error al conectar con el servidor.');
      }
    }
  });

  function showError(msg) {
    errorDiv.textContent = msg;
    errorDiv.style.display = 'block';
  }
});
