import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importa Link para la navegación interna (React Router)

/**
 * Componente que renderiza el encabezado (Header) principal de la aplicación.
 * Maneja la navegación y el menú de hamburguesa para dispositivos móviles.
 */
const Header = () => {
  // Estado para controlar la visibilidad del menú desplegable en móvil
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Función que cierra el menú móvil después de hacer clic en un enlace.
   * Mejora la experiencia del usuario en dispositivos táctiles.
   */
  const handleNavigation = () => {
    setIsOpen(false);
  };

  // Definición de la paleta de colores para consistencia
  const DORADO = "#F2CF66";
  const NEGRO = "#1A1A1A";

  return (
    // Estructura del encabezado: sticky para fijarse en la parte superior
    <header className="bg-neutral-50 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* 1. Logo y Nombre de la Marca (Enlace a Inicio) */}
          <Link
            to="/"
            onClick={() => handleNavigation()} // Cierra el menú móvil si está abierto
            className="flex items-center cursor-pointer hover:opacity-80 transition duration-150"
          >
            <img
              src="/assets/logo-delinadim.webp" // Ruta al logo de la marca
              alt="Logo Delinadim"
              className="h-10 sm:h-12 mr-2"
            />
            <p className="text-gray-900 font-bold ">DELINADIM</p>
          </Link>

          {/* 2. Navegación Principal para Escritorio */}
          <nav className="hidden md:flex space-x-8 text-lg ml-auto mr-8 text-gray-900">
            <Link
              to="/"
              onClick={handleNavigation}
              className="hover:opacity-70 transition duration-300 ease-in-out font-medium"
            >
              Inicio
            </Link>
            <Link
              to="/menu"
              onClick={handleNavigation}
              className="hover:opacity-70 transition duration-300 ease-in-out font-medium"
            >
              Menú Completo
            </Link>
            <Link
              to="/contacto"
              onClick={handleNavigation}
              className="hover:opacity-70 transition duration-300 ease-in-out font-medium"
            >
              Contacto
            </Link>
          </nav>

          {/* 3. Botón de Pedido CTA (Visible solo en escritorio/tablet) */}
          <Link
            to="/menu"
            onClick={handleNavigation}
            className="text-lg font-extrabold py-2 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hidden sm:block"
            // Estilo Dorado y Negro para el contraste
            style={{ backgroundColor: DORADO, color: NEGRO }}
          >
            ¡Haz tu Pedido!
          </Link>

          {/* 4. Botón de Hamburguesa para Móvil */}
          <button
            className="md:hidden text-3xl ml-4"
            onClick={() => setIsOpen(!isOpen)} // Alterna el estado del menú
            aria-label="Toggle Menu"
            style={{ color: DORADO }}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* 5. Menú Desplegable (Visible solo si isOpen es true y en móvil) */}
      {isOpen && (
        <div
          className="md:hidden"
          style={{ backgroundColor: NEGRO, borderTop: `1px solid ${DORADO}` }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            {/* Enlaces del menú móvil */}
            <Link
              to="/"
              onClick={handleNavigation}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:opacity-80 hover:bg-gray-700/50"
            >
              Inicio
            </Link>
            <Link
              to="/menu"
              onClick={handleNavigation}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:opacity-80 hover:bg-gray-700/50"
            >
              Menú Completo
            </Link>
            <Link
              to="/contacto"
              onClick={handleNavigation}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:opacity-80 hover:bg-gray-700/50"
            >
              Contacto
            </Link>

            {/* Botón CTA dentro del menú móvil */}
            <Link
              to="/menu"
              onClick={handleNavigation}
              className="font-extrabold py-2 px-6 rounded-lg mt-2 text-center"
              style={{ backgroundColor: DORADO, color: NEGRO }}
            >
              ¡Pide Ahora!
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
