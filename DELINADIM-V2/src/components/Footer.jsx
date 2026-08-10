import React from "react";

/**
 * Componente que renderiza el pie de página de la aplicación.
 * Contiene información de copyright y enlaces legales/de contacto.
 */
const Footer = () => {
  // Definición de colores clave (aunque en este componente se usa la clase bg-black/70)
  const NEGRO_OSCURO = "#1A1A1A";
  const DORADO_TEXTO = "#F2CF66";

  return (
    // Estructura principal del pie de página. Usa color sólido para el fondo.
    <footer
      className="text-white mt-12 shadow-inner"
      style={{ backgroundColor: NEGRO_OSCURO }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        {/* Texto de Copyright y Marca */}
        <p
          className="text-sm mb-2 font-serif"
          // Aplica el color Dorado para el texto
          style={{ color: DORADO_TEXTO }}
        >
          © {new Date().getFullYear()} Delinadim. Auténtico Sabor del Medio
          Oriente.
        </p>

        {/* Enlaces Legales y de Contacto */}
        <div className="text-xs space-x-4" style={{ color: DORADO_TEXTO }}>
          {/* Enlace a Contacto (Debe ser manejado por React Router Link si son rutas internas) */}
          <a href="#contacto" className="transition hover:opacity-80">
            Contacto
          </a>

          {/* Separador */}
          <span>|</span>

          {/* Enlace a Política de Privacidad */}
          <a href="#politicas" className="transition hover:opacity-80">
            Política de Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
