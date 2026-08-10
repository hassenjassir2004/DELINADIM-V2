import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = () => {
    setIsOpen(false);
  };

  const DORADO = "#D4AF37"; // Dorado elegante
  const VINO = "#5C061C";   // Vino tinto institucional

  return (
    <header className="bg-stone-900/95 backdrop-blur-md text-white sticky top-0 z-50 border-b border-stone-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* 1. Logo y Nombre de la Marca */}
          <Link
            to="/"
            onClick={handleNavigation}
            className="flex items-center gap-3 group"
          >
            <div className="p-1.5 rounded-xl bg-stone-800 border border-stone-700 group-hover:border-yellow-500/50 transition-colors">
              <img
                src="/assets/logo-delinadim.webp"
                alt="Logo Delinadim"
                className="h-10 w-10 object-contain rounded-lg"
              />
            </div>
            <span className="font-serif font-bold tracking-wider text-xl text-stone-100 group-hover:text-amber-400 transition-colors">
              DELINADIM
            </span>
          </Link>

          {/* 2. Navegación Principal para Escritorio */}
          <nav className="hidden md:flex items-center space-x-8 text-base font-medium text-stone-300">
            <Link
              to="/"
              onClick={handleNavigation}
              className="hover:text-amber-400 transition-colors duration-200"
            >
              Inicio
            </Link>
            <Link
              to="/menu"
              onClick={handleNavigation}
              className="hover:text-amber-400 transition-colors duration-200"
            >
              Menú Completo
            </Link>
            <Link
              to="/contacto"
              onClick={handleNavigation}
              className="hover:text-amber-400 transition-colors duration-200"
            >
              Contacto
            </Link>
          </nav>

          {/* 3. Botón de Pedido CTA (Escritorio) */}
          <Link
            to="/menu"
            onClick={handleNavigation}
            className="hidden sm:inline-flex items-center justify-center font-bold text-sm py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md"
            style={{ backgroundColor: DORADO, color: "#1c1917" }}
          >
            🍽️ ¡Haz tu Pedido!
          </Link>

          {/* 4. Botón de Hamburguesa para Móvil */}
          <button
            className="md:hidden text-2xl p-2 rounded-lg bg-stone-800 text-amber-400 hover:bg-stone-700 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* 5. Menú Desplegable (Móvil) */}
      {isOpen && (
        <div className="md:hidden bg-stone-900 border-t border-stone-800 px-4 pt-3 pb-5 space-y-2 shadow-2xl animate-fade-in">
          <Link
            to="/"
            onClick={handleNavigation}
            className="block px-4 py-3 rounded-xl text-base font-medium text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
          >
            Inicio
          </Link>
          <Link
            to="/menu"
            onClick={handleNavigation}
            className="block px-4 py-3 rounded-xl text-base font-medium text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
          >
            Menú Completo
          </Link>
          <Link
            to="/contacto"
            onClick={handleNavigation}
            className="block px-4 py-3 rounded-xl text-base font-medium text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
          >
            Contacto
          </Link>

          <Link
            to="/menu"
            onClick={handleNavigation}
            className="block w-full font-bold py-3.5 px-6 rounded-xl text-center text-sm shadow-md mt-3"
            style={{ backgroundColor: DORADO, color: "#1c1917" }}
          >
            ¡Haz tu Pedido!
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;