# 🚀 Event Management SPA with Vanilla JS and Vite ✨

Welcome to the Event Management SPA repository! This application allows you to **organize and register for events** in a simple and intuitive way. Developed with the latest tools and a focus on simplicity and efficiency, it's ideal for both administrators and attendees.

## 🌟 About the Project

This is a **Single Page Application (SPA)** designed for event management, built with the lightness and speed of **Vite**, and the flexibility of **HTML, CSS, and pure JavaScript**. Forget complex frameworks! To simulate a REST API, we use `json-server`, which provides a fluid and realistic development experience.

**What can you do?**

* **👥 Administrators:** Create, edit, and delete events; manage registrations.
* **🙋‍♀️ Visitors:** Explore available events, register, and cancel registrations.

## 🏗️ Project Structure

The code organization is clear and modular, facilitating navigation and maintenance:

´´´
├── index.html              # 🏠 Main SPA page
├── db.json                 # 💾 Simulated database (json-server)
├── package.json            # ⚙️ Configuration and scripts
├── README.md               # 📄 This file
└── src/
├── main.js             # 🚦 App entry point
├── router.js           # 🗺️ Routing logic (normal routes, not hash)
├── auth.js             # 🔐 Authentication and session logic
├── events.js           # 🗓️ Event and registration CRUD logic
├── utils.js            # 🧰 General utilities
└── style.css           # 🎨 Basic styles

´´´
