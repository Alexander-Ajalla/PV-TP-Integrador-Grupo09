# 🛒 Trabajo Integrador - Sistema de Gestión de Productos en React (Grupo 9)

---

## 📚 Descripción del Proyecto

Este proyecto es una **aplicación web SPA** desarrollada con **React** y **Vite** que permite gestionar productos de forma sencilla y eficiente. Utiliza **React Router DOM** para una navegación fluida entre vistas.

El sistema permite crear, editar, eliminar y visualizar productos, gestionando el estado global con **React Context API** o **Redux** para compartir datos entre componentes y páginas.

Además, cuenta con una interfaz responsiva y moderna gracias a **Bootstrap**.

---

## ⚙️ Funcionalidades

- 🖼️ Listado de productos en tarjetas con:
  - Imagen  
  - Nombre  
  - Precio  
  - Descripción  
  - Categoría  
- ⭐ Marcar y desmarcar productos como favoritos, con estado global accesible.  
- 📂 Página exclusiva para productos favoritos.  
- 🔍 Vista detallada de cada producto con opción de gestionar favoritos.  
- 📝 Formulario reutilizable para creación y edición de productos.

---

## 🛠 Tecnologías y Herramientas

- ⚛️ **React** + **Vite**  
- 🌐 **React Router DOM**  
- 🎨 **Bootstrap**  
- 🔄 **React Context API** o **Redux**  
- 📡 Consumo de API con **Fetch** o **Axios**

---

## 🌐 Consumo de API

Se utiliza la API pública:  
[`https://fakestoreapi.com/products`](https://fakestoreapi.com/products)  

Los datos se obtienen al inicio y se almacenan en el estado global para su gestión.

---

## 👥 Integrantes del Grupo 9

- Alexander Natanael Ajalla  
- Barrientos Lautaro Nicolás  
- Ivo Thaiel Vicencio Rosas  
- Álvarez Carlos Matías  
- Sánchez Ariel Maximiliano  

---

## 📦 Dependencias

Para instalar las dependencias necesarias, ejecutar:

```bash
npm install bootstrap
npm install bootstrap-icons
npm install react-router-dom

# Si usás Redux:
npm install @reduxjs/toolkit react-redux
