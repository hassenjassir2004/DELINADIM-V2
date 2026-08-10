import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; 
import App from "./App.jsx"; 
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

// 1. Importamos la función para iniciar Mercado Pago
import { initMercadoPago } from '@mercadopago/sdk-react';

// 2. Inicializamos con tu Clave Pública de prueba de Mercado Pago
initMercadoPago('TEST-46a887bc-6598-4c5a-9441-2907c2101bc9', { locale: 'es-CO' });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);