// App.zip/App.jsx
import React from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";

// Importación de Componentes de Layout y Páginas
import Header from "./components/Header";
import MenuPage from "./pages/MenuPage";
import Footer from "./components/Footer";
import FeaturedDishes from "./components/FeaturedDishes";
import ContactPage from "./pages/ContactPage";
// 🔑 Importación CRÍTICA: Importa el CartWidget
import CartWidget from "./components/CartWidget";

// --- Componentes Icono para Botones Flotantes (Rutas de Assets) ---
// ... (mantenemos los componentes WhatsappIcon y RappiIcon)
/**
 * Icono de WhatsApp para el botón flotante.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.size - Clases de Tailwind para el tamaño (por defecto 'w-6 h-6').
 */
const WhatsappIcon = ({ size = "w-6 h-6" }) => (
  <img src="/assets/icono-whatsapp.svg" alt="WhatsApp" className={size} />
);

/**
 * Icono de Rappi para el botón flotante.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.size - Clases de Tailwind para el tamaño (por defecto 'w-6 h-6').
 */
const RappiIcon = ({ size = "w-6 h-6" }) => (
  <img src="/assets/icono-rappi.webp" alt="Rappi" className={size} />
);
// -----------------------------------------------------------------------------------

// **Componente HomePage** (Contenido de la página de inicio)
/**
 * Renderiza la página de inicio, incluyendo la sección Hero y los Platos Destacados.
 */
const HomePage = () => (
  <div className="bg-gray-950 text-white min-h-screen">
    {/* 1. HERO SECTION: Call to Action y Fondo */}{" "}
    <div
      className="text-center py-24 md:py-36 relative"
      style={{
        backgroundImage: "url(/assets/logo-delinadim.webp)",
        backgroundSize: "200px",
        backgroundPosition: "",
      }}
    >
      {/* Overlay oscuro para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black/70"></div>{" "}
      <div className="relative z-10 max-w-3xl mx-auto px-4">
        {" "}
        <h2 className="text-5xl md:text-6xl font-serif font-extrabold text-amber-50 leading-tight">
          El Sabor del Medio Oriente, Directo a tu Puerta{" "}
        </h2>{" "}
        <p
          className="mt-4 text-xl md:text-2xl font-light"
          style={{ color: "#F2CF66" }} // Dorado
        >
          Pide fácil por Rappi, DIDI Food y WhatsApp. ¡La tradición te espera!{" "}
        </p>{" "}
        {/* Botón de Llamada a la Acción Principal */}{" "}
        <div className="flex justify-center space-x-4 mt-8">
          <Link
            to="/menu" // Navega a la página del menú
            className="font-extrabold py-3 px-8 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl text-lg uppercase"
            style={{ backgroundColor: "#F2CF66", color: "#1A1A1A" }}
          >
            ¡Ver Menú Ahora!{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
    </div>{" "}
    {/* 2. SECCIÓN DESTACADOS: Muestra un preview de los platos */}
    <FeaturedDishes />{" "}
  </div>
);
// ----------------------------------------------------

/**
 * Componente raíz de la aplicación.
 * Define la estructura de la página (Header, Main, Footer) y el ruteo.
 */
function App() {
  // Hook de React Router para obtener la ubicación actual
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Layout: Encabezado */}
      <Header /> {/* Layout: Contenido Principal (Cuerpo de la página) */}{" "}
      <main className="flex-grow">
        {/* Definición de las Rutas de la Aplicación */}{" "}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          {/* Ruta de fallback para 404 */}{" "}
          <Route
            path="*"
            element={
              <h1 className="text-4xl text-center pt-20">
                404 | Página no encontrada
              </h1>
            }
          />{" "}
        </Routes>{" "}
      </main>
      {/* 3. Botones Flotantes de Pedido */}{" "}
      {/* Se muestran SOLO si NO estamos en la página de Contacto */}{" "}
      {location.pathname !== "/contacto" && (
        <>
          {/* 🔑 Widget de Carrito Flotante (NUEVO) */}
          <CartWidget /> {/* Botón de WhatsApp Flotante */}{" "}
          <a
            href="https://wa.me/+573102078916?text=Hola%20quiero%20hacer%20un%20pedido%20de%20Delinadim"
            className="fixed bottom-6 right-6 bg-neutral-950 hover:bg-green-500 text-white p-4 rounded-full shadow-2xl z-50 transition duration-300 flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pedir por WhatsApp"
          >
            <WhatsappIcon />{" "}
          </a>
          {/* Botón de Rappi Flotante */}{" "}
          <a
            href="https://www.rappi.com.co/restaurantes/900450716-delinadim-arabe?csr=true"
            className="fixed bottom-24 right-6 bg-neutral-950 hover:bg-red-700 text-white p-4 rounded-full shadow-2xl z-50 transition duration-300 flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pedir por Rappi"
          >
            <RappiIcon />{" "}
          </a>{" "}
        </>
      )}
      {/* Layout: Pie de Página */}
      <Footer />{" "}
    </div>
  );
}

export default App;
