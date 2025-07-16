import { getCurrentUser, logoutUser } from './auth.js';
import { fetchEventsAndRender, fetchUserRegistrationsAndRender } from './events.js';
import { showAlert } from './utils.js';

// Cambia la ruta de la SPA y muestra la vista correspondiente
export function navigateTo(path) {
  window.history.pushState({}, '', path);
  handleRoute();
}

// Decide qué vista mostrar según la ruta y el usuario
export function handleRoute() {
  const path = window.location.pathname;
  const user = getCurrentUser();

  // Si estamos en la raíz, redirige según si hay sesión
  if (path === '/') {
    if (user) {
      navigateTo('/dashboard');
    } else {
      navigateTo('/login');
    }
    return;
  }

  // Define las rutas protegidas y públicas
  const protectedRoutes = ['/dashboard', '/dashboard/events/create', '/dashboard/events/edit', '/enrollments'];
  const adminRoutes = ['/dashboard/events/create', '/dashboard/events/edit'];
  const publicRoutes = ['/login', '/register'];

  // Controla el acceso según el rol y la sesión
  if (!user && protectedRoutes.includes(path)) {
    renderNotFound();
    return;
  }
  if (user && publicRoutes.includes(path)) {
    navigateTo('/dashboard');
    return;
  }
  if (adminRoutes.includes(path) && (!user || user.role !== 'admin')) {
    renderNotFound();
    return;
  }

  // Muestra la vista correspondiente
  if (path === '/dashboard') renderDashboard();
  else if (path === '/dashboard/events/create') renderCreateEvent();
  else if (path === '/dashboard/events/edit') renderEditEvent();
  else if (path === '/enrollments') renderEnrollments();
  else if (path === '/login') renderLogin();
  else if (path === '/register') renderRegister();
  else renderNotFound();
}

// Muestra el dashboard principal con la lista de eventos
export function renderDashboard() {
  const user = getCurrentUser();
  document.getElementById('app').innerHTML = `
    <h1>Bienvenido al Dashboard</h1>
    <p>Usuario: <b>${user ? user.username : ''}</b> (${user ? user.role : ''})</p>
    <button id="logoutBtn">Cerrar sesión</button>
    <hr>
    <h2>Lista de eventos</h2>
    <div id="eventsList">Cargando eventos...</div>
    ${user && user.role === 'visitor' ? `<button id="goToEnrollments">Ver mis registros</button>` : ''}
  `;
  document.getElementById('logoutBtn').onclick = logoutUser;
  fetchEventsAndRender(renderEventsList);
  // Si es visitante, muestra el botón para ver sus registros
  if (user && user.role === 'visitor') {
    document.getElementById('goToEnrollments').onclick = () => navigateTo('/enrollments');
  }
}

// Muestra el formulario para crear un evento
export function renderCreateEvent() {
  document.getElementById('app').innerHTML = `
    <h1>Crear Evento</h1>
    <form id="createEventForm">
      <label for="event-name">Nombre del evento:</label><br>
      <input type="text" id="event-name" name="name" required><br><br>
      <label for="event-date">Fecha:</label><br>
      <input type="date" id="event-date" name="date" required><br><br>
      <label for="event-capacity">Capacidad:</label><br>
      <input type="number" id="event-capacity" name="capacity" min="1" required><br><br>
      <label for="event-description">Descripción:</label><br>
      <textarea id="event-description" name="description" required></textarea><br><br>
      <button type="submit">Crear evento</button>
      <button type="button" id="cancelCreate">Cancelar</button>
    </form>
  `;
  document.getElementById('cancelCreate').onclick = () => navigateTo('/dashboard');
  document.getElementById('createEventForm').onsubmit = e => {
    e.preventDefault();
    const data = {
      name: document.getElementById('event-name').value,
      date: document.getElementById('event-date').value,
      capacity: parseInt(document.getElementById('event-capacity').value, 10),
      description: document.getElementById('event-description').value
    };
    import('./events.js').then(mod => mod.createEvent(data));
  };
}

// Muestra el formulario para editar un evento
export function renderEditEvent() {
  const id = localStorage.getItem('editEventId');
  if (!id) {
    showAlert('No se ha seleccionado ningún evento para editar.');
    navigateTo('/dashboard');
    return;
  }
  fetch('http://localhost:3000/events/' + id)
    .then(res => res.json())
    .then(event => {
      document.getElementById('app').innerHTML = `
        <h1>Editar Evento</h1>
        <form id="editEventForm">
          <label for="edit-event-name">Nombre del evento:</label><br>
          <input type="text" id="edit-event-name" name="name" value="${event.name || ''}" required><br><br>
          <label for="edit-event-date">Fecha:</label><br>
          <input type="date" id="edit-event-date" name="date" value="${event.date || ''}" required><br><br>
          <label for="edit-event-capacity">Capacidad:</label><br>
          <input type="number" id="edit-event-capacity" name="capacity" min="1" value="${event.capacity || 1}" required><br><br>
          <label for="edit-event-description">Descripción:</label><br>
          <textarea id="edit-event-description" name="description" required>${event.description || ''}</textarea><br><br>
          <button type="submit">Guardar cambios</button>
          <button type="button" id="cancelEdit">Cancelar</button>
        </form>
      `;
      document.getElementById('cancelEdit').onclick = () => navigateTo('/dashboard');
      document.getElementById('editEventForm').onsubmit = e => {
        e.preventDefault();
        const data = {
          name: document.getElementById('edit-event-name').value,
          date: document.getElementById('edit-event-date').value,
          capacity: parseInt(document.getElementById('edit-event-capacity').value, 10),
          description: document.getElementById('edit-event-description').value
        };
        import('./events.js').then(mod => mod.editEvent(id, data));
      };
    })
    .catch(() => {
      showAlert('Error al cargar el evento.');
      navigateTo('/dashboard');
    });
}

// Muestra el formulario de login
export function renderLogin() {
  document.getElementById('app').innerHTML = `
    <h1>Iniciar Sesión</h1>
    <form id="loginForm">
      <label for="login-username">Usuario:</label><br>
      <input type="text" id="login-username" name="username" required><br><br>
      <label for="login-password">Contraseña:</label><br>
      <input type="password" id="login-password" name="password" required><br><br>
      <button type="submit">Entrar</button>
    </form>
    <p>¿No tienes cuenta? <a href="/register" data-link>Regístrate aquí</a></p>
  `;
  document.getElementById('loginForm').onsubmit = e => {
    e.preventDefault();
    const credentials = {
      username: document.getElementById('login-username').value,
      password: document.getElementById('login-password').value
    };
    import('./auth.js').then(mod => mod.loginUser(credentials));
  };
}

// Muestra el formulario de registro
export function renderRegister() {
  document.getElementById('app').innerHTML = `
    <h1>Registro de Usuario</h1>
    <form id="registerForm">
      <label for="register-username">Usuario:</label><br>
      <input type="text" id="register-username" name="username" required><br><br>
      <label for="register-password">Contraseña:</label><br>
      <input type="password" id="register-password" name="password" required><br><br>
      <label for="register-role">Rol:</label><br>
      <select id="register-role" name="role" required>
        <option value="visitor">Visitante</option>
        <option value="admin">Administrador</option>
      </select><br><br>
      <button type="submit">Registrarse</button>
    </form>
    <p>¿Ya tienes cuenta? <a href="/login" data-link>Inicia sesión aquí</a></p>
  `;
  document.getElementById('registerForm').onsubmit = e => {
    e.preventDefault();
    const userData = {
      username: document.getElementById('register-username').value,
      password: document.getElementById('register-password').value,
      role: document.getElementById('register-role').value
    };
    import('./auth.js').then(mod => mod.registerUser(userData));
  };
}

// Muestra la pantalla de página no encontrada
export function renderNotFound() {
  document.getElementById('app').innerHTML = '<h1>Página no encontrada</h1>';
}

// Renderiza la lista de eventos y los botones según el rol
export function renderEventsList(events) {
  const user = getCurrentUser();
  let html = '';
  if (user && user.role === 'admin') {
    html += '<button id="goCreateEvent">Crear nuevo evento</button><br><br>';
  }
  if (events.length === 0) {
    html += '<p>No hay eventos registrados.</p>';
  } else {
    html += '<ul>';
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      html += '<li><b>' + (event.name || 'Sin nombre') + '</b> - ' + (event.date || 'Sin fecha') + '<br><i>' + (event.description || 'Sin descripción') + '</i><br>Capacidad restante: <span class="event-capacity">' + (event.capacity || 0) + '</span>';
      if (user && user.role === 'admin') {
        html += ' <button class="editEventBtn" data-id="' + event.id + '">Editar</button> <button class="deleteEventBtn" data-id="' + event.id + '">Eliminar</button>';
      } else if (user && user.role === 'visitor') {
        if (event.capacity > 0) {
          html += ' <button class="registerEventBtn" data-id="' + event.id + '">Registrarse</button>';
        } else {
          html += ' <button class="registerEventBtn" data-id="' + event.id + '" disabled>Agotado</button>';
        }
      }
      html += '</li>';
    }
    html += '</ul>';
  }
  document.getElementById('eventsList').innerHTML = html;
  // Asigna los eventos a los botones según el rol
  if (user && user.role === 'admin') {
    const botonCrear = document.getElementById('goCreateEvent');
    if (botonCrear) botonCrear.onclick = () => navigateTo('/dashboard/events/create');
    const botonesEditar = document.querySelectorAll('.editEventBtn');
    for (let i = 0; i < botonesEditar.length; i++) {
      const btn = botonesEditar[i];
      btn.onclick = function() {
        localStorage.setItem('editEventId', btn.getAttribute('data-id'));
        navigateTo('/dashboard/events/edit');
      };
    }
    const botonesEliminar = document.querySelectorAll('.deleteEventBtn');
    for (let i = 0; i < botonesEliminar.length; i++) {
      const btn = botonesEliminar[i];
      btn.onclick = function() {
        const confirmacion = confirm('¿Seguro que deseas eliminar este evento?');
        if (confirmacion) {
          import('./events.js').then(mod => mod.deleteEvent(btn.getAttribute('data-id'), fetchEventsAndRender, renderEventsList));
        }
      };
    }
  } else if (user && user.role === 'visitor') {
    const botonesRegistrar = document.querySelectorAll('.registerEventBtn');
    for (let i = 0; i < botonesRegistrar.length; i++) {
      const btn = botonesRegistrar[i];
      if (!btn.disabled) {
        btn.onclick = function() {
          import('./events.js').then(mod => mod.registerToEvent(btn.getAttribute('data-id'), fetchEventsAndRender, renderEventsList));
        };
      }
    }
  }
}

// Muestra la lista de eventos en los que el usuario visitante está registrado
export function renderUserRegistrations(events) {
  if (!events || events.length === 0) {
    document.getElementById('myRegistrations').innerHTML = '<p>No estás registrado en ningún evento.</p>';
    return;
  }
  let html = '<ul>';
  for (let i = 0; i < events.length; i++) {
    html += '<li><b>' + events[i].name + '</b> - ' + events[i].date + '<br><i>' + (events[i].description || 'Sin descripción') + '</i></li>';
  }
  html += '</ul>';
  document.getElementById('myRegistrations').innerHTML = html;
}

// Muestra la vista de "Mis registros" para el visitante
export function renderEnrollments() {
  const user = getCurrentUser();
  document.getElementById('app').innerHTML = `
    <h1>Mis registros</h1>
    <button id="backToDashboard">Volver al Dashboard</button>
    <div id="myRegistrations">Cargando...</div>
  `;
  document.getElementById('backToDashboard').onclick = () => navigateTo('/dashboard');
  import('./events.js').then(mod => mod.fetchUserRegistrationsAndRender(renderUserRegistrations));
}

// Configura los listeners para la navegación interna y el historial
export function setupRouter() {
  window.addEventListener('popstate', handleRoute);
  document.body.addEventListener('click', e => {
    if (e.target.matches('a[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.getAttribute('href'));
    }
  });
} 