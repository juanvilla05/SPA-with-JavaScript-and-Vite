![logo](https://github.com/juanvilla05/SPA-with-JavaScript-and-Vite/blob/64e8f373f88a7c503937919574a3eba1148961e4/6661.jpg)
# 🚀 SPA Gestor de Eventos con Vanilla JS y Vite ✨

¡Bienvenido al repositorio de la SPA Gestor de Eventos! Esta aplicación te permite **organizar y registrarte en eventos** de una manera sencilla e intuitiva. Desarrollada con las últimas herramientas y un enfoque en la simplicidad y eficiencia, es ideal para administradores y asistentes por igual.

[SEE README IN ENGLISH](https://github.com/juanvilla05/SPA-with-JavaScript-and-Vite/blob/a7839b11dc54890f81d14f905219ac195b3814e7/README%20IN%20ENGLISH.md)
---

## 🌟 Sobre el Proyecto

Esta es una **Single Page Application (SPA)** diseñada para la gestión de eventos, construida con la ligereza y velocidad de **Vite**, y la flexibilidad de **HTML, CSS y JavaScript puro**. ¡Olvídate de frameworks complejos! Para simular una API REST, utilizamos `json-server`, lo que permite una experiencia de desarrollo fluida y realista.

**¿Qué puedes hacer?**

* **👥 Administradores:** Crea, edita y elimina eventos, gestiona los registros.
* **🙋‍♀️ Visitantes:** Explora eventos disponibles, regístrate y cancela tu inscripción.
---


## 🏗️ Estructura del proyecto

```
/
├── index.html              🏠 Página principal de la SPA
├── db.json                 💾 Base de datos simulada (json-server)
├── package.json            ⚙️ Configuración y scripts
├── README.md               📄 Este archivo
└── src/
    ├── main.js             🚦 Punto de entrada de la app
    ├── router.js           🗺️ Lógica de rutas (rutas normales, no hash)
    ├── auth.js             🔐 Lógica de autenticación y sesión
    ├── events.js           🗓️ Lógica CRUD de eventos y registros
    ├── utils.js            🧰 Utilidades generales
    └── style.css           🎨 Estilos básicos
```
---

## ▶️ ¿Cómo Correr la Aplicación? ¡Paso a Paso!

Sigue estos sencillos pasos para tener la aplicación funcionando en tu entorno local:

### 1. ⬇️ Instalar Dependencias

Asegúrate de tener [**Node.js**](https://nodejs.org/) instalado y con la ultima version actualizada en tu sistema. Si no lo tienes, ¡es un buen momento para instalarlo!

Luego, abre una terminal en la carpeta raíz del proyecto y ejecuta el siguiente comando:
```
npm install
```
### 2. 🚀 Iniciar el Servidor de la Base de Datos

En la misma terminal (o en una nueva si lo prefieres), inicia el servidor de la base de datos simulada:
```
npm run server
```
Esto levantará `json-server` en [http://localhost:3000](http://localhost:3000).
### 3. 🌐 Iniciar la Aplicación con Vite

Ahora, abre otra terminal en la carpeta del proyecto y ejecuta:
```
npm run dev
```
Esto abrirá la SPA en [http://localhost:5173](http://localhost:5173) (o el puerto que indique Vite).
 Usuarios de Prueba

---

## 🔑 Usuarios de prueba:
Para que puedas explorar la aplicación de inmediato, aquí tienes las credenciales de un usuario administrador:

**Administrador:**

  - Usuario: ```admin```
  - Contraseña: ```admin123```

## Gracias por llegar hasta aquí:
¡Espero que este proyecto te sea útil! Si tienes alguna pregunta o sugerencia, no dudes en contactarme.

**Contactame:👩‍💻**

  - Coder: ```Juan Camilo Villa Zapata```
  - Clan: ```Gosling```
  - Correo: ```cfinancieramedellin@gmail.com```
  - Documento de identidad: ```1039697486```

