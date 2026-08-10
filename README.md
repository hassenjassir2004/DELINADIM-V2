# 🍽️ DELINADIM - Full-Stack Gastronomic Platform & E-Commerce

> A modern, high-performance full-stack web application built for Middle Eastern food ordering, featuring a dynamic customized menu, real-time database integration, and a secure payment gateway.

[![Live Demo](https://delinadim-v2-szc3.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

---

## 🌍 Access Links / Enlaces en Vivo

* **🌐 Live Frontend Application:** delinadim-v2-szc3.vercel.app
* **⚙️ Backend API Service:** [https://delinadim-backend.onrender.com](https://delinadim-backend.onrender.com)

---

## 🚀 About the Project / Sobre el Proyecto

**[EN]** DELINADIM is designed to streamline digital orders, showcase a traditional Middle Eastern menu with interactive modifiers (extras), and provide clients with secure online checkout options (Credit Card / PSE) alongside direct WhatsApp ordering and an administrative management panel.

**[ES]** DELINADIM es una plataforma diseñada para optimizar pedidos digitales, exhibir un menú de comida árabe tradicional con modificadores interactivos (extras) y brindar a los clientes opciones de pago en línea seguras junto con pedidos directos por WhatsApp y un panel de administración.

---

## 🛠️ Tech Stack / Tecnologías

### **Frontend:**
* **React.js & Vite** (Blazing-fast frontend bundling)
* **Tailwind CSS** (Modern, responsive UI design & culinary color palettes)
* **React Router DOM** (Single Page Application routing)
* **SweetAlert2** (Interactive feedback alerts)

### **Backend & Database:**
* **Node.js & Express.js** (Microservice backend architecture)
* **Firebase Firestore** (NoSQL real-time cloud database)
* **Mercado Pago SDK** (Secure financial preference generation and payment processing)

---

## ⚙️ System Architecture & Features

* **Dynamic Modifiers:** Customize dishes with extras or special notes that dynamically update the cart total.
* **Dual Checkout Integration:** Direct WhatsApp order formatting and secure online checkout via Mercado Pago.
* **Admin Dashboard:** Real-time synchronization with Firebase to monitor incoming client requests and order statuses.
* **Responsive Culinary UI:** Tailored with a warm color palette (Warm Creams `#FDFBF7`, Deep Wines, and Rich Golds).

---

## 📦 Installation & Setup (Local Development)

To run this project locally, clone the repository and configure both environments:

```bash
git clone [https://github.com/hassenjassir2004/DELINADIM-V2.git](https://github.com/hassenjassir2004/DELINADIM-V2.git)
cd DELINADIM-V2
1. Backend Setup
Bash
cd DELINADIM-BACKEND
npm install
Create a .env file inside DELINADIM-BACKEND:

Fragmento de código
PORT=3000
MERCADOPAGO_ACCESS_TOKEN=your_mercadopago_access_token_here
Run the server:

Bash
node index.js
2. Frontend Setup
Open a new terminal:

Bash
cd DELINADIM-V2
npm install
npm run dev
👨‍💻 Author
Developed with passion by Jassir Mendoza — Technical Web Programmer.
