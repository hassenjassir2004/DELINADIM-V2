// context.zip/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Importación de estilos globales (Tailwind CSS)
import App from "./App.jsx"; // Importación del componente raíz de la aplicación
import { BrowserRouter } from "react-router-dom";
// 🔑 Importación CRÍTICA: Importa el CartProvider
import { CartProvider } from "./context/CartContext";

/**
 * Inicialización del árbol de componentes de React.
 * Se monta el componente App en el elemento DOM con id 'root'.
 */
createRoot(document.getElementById("root")).render(
  // StrictMode: Herramienta para destacar problemas potenciales en la aplicación.
  <StrictMode>
    <BrowserRouter>
      {/* 🔑 ENVOLVER CON EL PROVEEDOR DE CARRITO */}
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
