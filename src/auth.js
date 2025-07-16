import { showAlert } from './utils.js';
import { navigateTo } from './router.js';

// Registra un nuevo usuario si no existe y redirige al login
export async function registerUser(datosUsuario) {
  // Validación de campos vacíos
  if (datosUsuario.username === '' || datosUsuario.password === '' || datosUsuario.role === '') {
    showAlert('Por favor, llena todos los campos.');
    return;
  }
  // Verifica si el usuario ya existe en la base de datos
  let urlConsulta = 'http://localhost:3000/users?username=' + encodeURIComponent(datosUsuario.username);
  let respuesta = await fetch(urlConsulta);
  let usuariosEncontrados = await respuesta.json();
  if (usuariosEncontrados.length > 0) {
    showAlert('El usuario ya existe.');
    return;
  }
  // Si no existe, lo registra
  let urlRegistro = 'http://localhost:3000/users';
  await fetch(urlRegistro, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosUsuario)
  });
  showAlert('Registro exitoso. Ahora puedes iniciar sesión.');
  navigateTo('/login');
}

// Inicia sesión si el usuario y contraseña son correctos
export async function loginUser(datosLogin) {
  // Validación de campos vacíos
  if (datosLogin.username === '' || datosLogin.password === '') {
    showAlert('Por favor, llena todos los campos.');
    return;
  }
  // Busca el usuario en la base de datos
  let url = 'http://localhost:3000/users?username=' + encodeURIComponent(datosLogin.username) + '&password=' + encodeURIComponent(datosLogin.password);
  let respuesta = await fetch(url);
  let usuarios = await respuesta.json();
  if (usuarios.length === 1) {
    // Si existe, guarda la sesión y redirige al dashboard
    let usuario = usuarios[0];
    localStorage.setItem('user', JSON.stringify(usuario));
    showAlert('¡Bienvenido!');
    navigateTo('/dashboard');
  } else {
    showAlert('Usuario o contraseña incorrectos.');
  }
}

// Cierra la sesión y redirige al login
export function logoutUser() {
  localStorage.removeItem('user');
  navigateTo('/login');
}

// Devuelve el usuario autenticado actualmente, o null si no hay sesión
export function getCurrentUser() {
  let usuarioGuardado = localStorage.getItem('user');
  if (usuarioGuardado) {
    return JSON.parse(usuarioGuardado);
  } else {
    return null;
  }
} 