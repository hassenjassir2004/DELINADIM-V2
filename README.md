# 🍽️ DELINADIM - Middle Eastern Food E-Commerce & Management System

> A modern, full-stack web application built for a Middle Eastern food business, featuring a customized ordering system, database integration, and a secure international payment gateway.

![Project Banner](https://img.shields.io/badge/Status-Completed-success) ![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node.js%20%7C%20Firebase-blue) ![License](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 About the Project

**DELINADIM** is a high-performance web platform designed to streamline digital orders, showcase a traditional Middle Eastern menu with dynamic modifiers (extras), and provide clients with secure online checkout options (Credit Card / PSE) alongside direct WhatsApp ordering.

---

## 🛠️ Tech Stack

### **Frontend:**
* **React.js** (with Vite for blazing-fast bundling)
* **Tailwind CSS** (for modern, responsive UI design & Glassmorphism effects)
* **React Router DOM** (for SPA navigation)
* **SweetAlert2** (for elegant user feedback alerts)

### **Backend & Database:**
* **Node.js & Express.js** (Microservice architecture)
* **Firebase Firestore** (NoSQL real-time cloud database for order tracking)
* **Mercado Pago SDK** (Secure financial preference generation and payment processing)

---

## ⚙️ System Architecture & Features

* **Dynamic Menu & Modifiers:** Users can customize their dishes (e.g., extra pita bread, sauces, or special instructions) which dynamically updates the cart total.
* **Dual Checkout Flow:** 
  * *WhatsApp Integration:* Formats cart items into an itemized text message for direct coordination.
  * *Online Payment Gateway:* Communicates with a Node.js backend to generate secure Mercado Pago preference links opened in an independent checkout tab.
* **Admin Order Management:** Real-time synchronization with Firebase to track incoming client requests and order statuses.
* **Responsive Design:** Optimized for mobile, tablet, and desktop viewports using a custom warm culinary color palette (Warm Creams, Deep Wines, and Rich Golds).

---

## 📦 Installation & Setup

To run this project locally, clone the repository and configure both the frontend and backend environments.
