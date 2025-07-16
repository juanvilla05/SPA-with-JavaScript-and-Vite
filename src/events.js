const API_URL = 'http://localhost:3000';

import { getCurrentUser } from './auth.js';
import { showAlert } from './utils.js';

// Trae todos los eventos de la base de datos y los muestra en pantalla
export async function fetchEventsAndRender(renderEventsList) {
  const res = await fetch(API_URL + '/events');
  const events = await res.json();
  renderEventsList(events);
}

// Crea un nuevo evento si los datos son válidos
export async function createEvent(data) {
  // Validación de campos
  if (data.name === '' || data.date === '' || !data.capacity || data.capacity < 1 || data.description === '') {
    showAlert('Por favor, llena todos los campos.');
    return;
  }
  // Guarda el evento en la base de datos
  await fetch(API_URL + '/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  showAlert('Evento creado.');
  window.location.pathname = '/dashboard';
}

// Edita un evento existente por id
export async function editEvent(id, data) {
  // Validación de campos
  if (data.name === '' || data.date === '' || !data.capacity || data.capacity < 1 || data.description === '') {
    showAlert('Por favor, llena todos los campos.');
    return;
  }
  // Actualiza el evento en la base de datos
  await fetch(API_URL + '/events/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  showAlert('Evento actualizado.');
  window.location.pathname = '/dashboard';
}

// Elimina un evento por id y actualiza la lista
export async function deleteEvent(id, fetchEventsAndRender, renderEventsList) {
  await fetch(API_URL + '/events/' + id, { method: 'DELETE' });
  showAlert('Evento eliminado.');
  fetchEventsAndRender(renderEventsList);
}

// Registra al usuario en un evento si hay cupo y no está registrado
export async function registerToEvent(id, fetchEventsAndRender, renderEventsList) {
  const user = getCurrentUser();
  if (!user) {
    showAlert('Debes iniciar sesión.');
    return;
  }
  // Verifica si el usuario ya está registrado en este evento
  const res = await fetch(API_URL + '/registrations?userId=' + user.id + '&eventId=' + id);
  const regs = await res.json();
  if (regs.length > 0) {
    showAlert('Ya estás registrado en este evento.');
    return;
  }
  // Trae el evento para verificar la capacidad
  const resEvent = await fetch(API_URL + '/events/' + id);
  const event = await resEvent.json();
  if (event.capacity <= 0) {
    showAlert('El evento ya está lleno.');
    return;
  }
  // Registra al usuario en el evento
  await fetch(API_URL + '/registrations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: Number(user.id), eventId: Number(id) })
  });
  // Resta 1 a la capacidad del evento
  const newCapacity = Math.max(0, event.capacity - 1);
  await fetch(API_URL + '/events/' + id, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ capacity: newCapacity })
  });
  showAlert('¡Registro exitoso! Capacidad restante: ' + newCapacity);
  fetchEventsAndRender(renderEventsList);
}

// Trae los eventos en los que el usuario visitante está registrado y los muestra
export async function fetchUserRegistrationsAndRender(renderUserRegistrations) {
  const user = getCurrentUser();
  if (!user || user.role !== 'visitor') return;
  // Busca los registros del usuario
  const res = await fetch(API_URL + '/registrations?userId=' + user.id);
  const regs = await res.json();
  if (regs.length === 0) {
    renderUserRegistrations([]);
    return;
  }
  // Busca los eventos correspondientes a los registros
  let ids = '';
  for (let i = 0; i < regs.length; i++) {
    if (i > 0) ids += '&';
    ids += 'id=' + regs[i].eventId;
  }
  const resEvents = await fetch(API_URL + '/events?' + ids);
  const events = await resEvents.json();
  renderUserRegistrations(events);
} 