![logo](https://github.com/juanvilla05/SPA-with-JavaScript-and-Vite/blob/64e8f373f88a7c503937919574a3eba1148961e4/6661.jpg)
# 🚀 Event Management SPA with Vanilla JS and Vite ✨

Welcome to the Event Management SPA repository! This application allows you to **organize and register for events** in a simple and intuitive way. Developed with the latest tools and a focus on simplicity and efficiency, it's ideal for both administrators and attendees.

[VER README EN ESPAÑOL](https://github.com/juanvilla05/SPA-with-JavaScript-and-Vite/blob/ba20ed31e1d7056a98685c85018351f07cac4dc7/README.md)

## 🌟 About the Project

This is a **Single Page Application (SPA)** designed for event management, built with the lightness and speed of **Vite**, and the flexibility of **HTML, CSS, and pure JavaScript**. Forget complex frameworks! To simulate a REST API, we use `json-server`, which provides a fluid and realistic development experience.

**What can you do?**

* **👥 Administrators:** Create, edit, and delete events; manage registrations.
* **🙋‍♀️ Visitors:** Explore available events, register, and cancel registrations.
---
## 🏗️ Project Structure

The code organization is clear and modular, facilitating navigation and maintenance:

```
/
├── index.html            🏠 Main SPA page
├── db.json               💾 Simulated database (json-server)
├── package.json          ⚙️ Configuration and scripts
├── README.md             📄 This file
└── src/
├── main.js               🚦 App entry point
├── router.js             🗺️ Routing logic (normal routes, not hash)
├── auth.js               🔐 Authentication and session logic
├── events.js             🗓️ Event and registration CRUD logic
├── utils.js              🧰 General utilities
└── style.css             🎨 Basic styles

```
---
## ▶️ How to Run the Application? Step by Step!

Follow these simple steps to get the application running in your local environment:

### 1. ⬇️ Install Dependencies

Make sure you have [**Node.js**](https://nodejs.org/) installed and updated to the latest version on your system. If you don't have it, now's a good time to install it!

Then, open a terminal in the project's root folder and run the following command:
```
npm install
```
### 2. 🚀 Start the Database Server

In the same terminal (or in a new one if you prefer), start the simulated database server:
```
npm run server
```
This will spin up json-server at http://localhost:3000.

### 3. 🌐 Start the Application with Vite

Now, open another terminal in the project folder and run:
```
npm run dev
```
This will open the SPA at http://localhost:5173 (or the port indicated by Vite).
---
## 🔑 Test Users:

To help you explore the application immediately, here are the credentials for an administrator user:

**Administrator:**

  - User: ```admin```
  - Password: ```admin123```

## Thank you for reading!

I hope this project is useful to you! If you have any questions or suggestions, don't hesitate to contact me.

**Contact me:👩‍💻**

  - Coder: ```Juan Camilo Villa Zapata```
  - Clan: ```Gosling```
  - Email: ```cfinancieramedellin@gmail.com```
  - ID Document: ```1039697486```



