import React from "react";
import MenuCard from "./MenuCard"; // Importa el componente para renderizar cada plato
// 🔑 Importa Link de React Router para la navegación interna a /menu
import { Link } from "react-router-dom";

// --- DATOS SIMULADOS DE LOS DESTACADOS ---
/**
 * Arreglo de objetos que representan la selección curada de platos estrella.
 * Estos datos simulan la información que normalmente vendría de una base de datos.
 */
const featuredItems = [
  {
    id: 9,
    category: "Combos (Disponible por Rappi, DIDI Food y WhatsApp!)",
    title: "Kibbeh + Coca-Cola Personal",
    description:
      "Una unidad de kibbeh frito acompañado de una Coca-Cola Personal.",
    price: "9.900",
    color: "",
    imageURL: "/assets/combo-Kibbeh-frito.webp",
  },
  {
    id: 10,
    category: "Combos (Disponible por Rappi, DIDI Food y WhatsApp!)",
    title: "Tahini + Chips de Pan Árabe ",
    description:
      "Crujientes trozos de pan árabe horneados con especias, acompañados de una porción pequeña de tahini(8 OZ).",
    price: "15.000",
    color: "1A1A1A",
    imageURL: "/assets/combo-tahini.webp",
  },
  {
    id: 11,
    category: "Combos (Disponible por Rappi, DIDI Food y WhatsApp!)",
    title: "Plato Mixto + Coca-Cola Personal",
    description: "Plato Mixto acompañado de una Coca-Cola Personal.",
    price: "24.900",
    color: "",
    imageURL: "/assets/combo-mixto.webp",
  },
];
// ----------------------------------------------------

/**
 * Componente funcional que muestra una sección de platos destacados en la página principal.
 */
const FeaturedDishes = () => {
  // Definición de la paleta de colores para los estilos inline
  const DORADO = "#F2CF66";
  const NEGRO = "#1A1A1A";
  // Color Vino definido directamente en el h3: #800000

  return (
    <section className="py-16 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título de la Sección */}
        <h3
          className="text-4xl md:text-5xl font-extrabold text-center font-serif mb-4 pb-2"
          // Color Vino con borde inferior sutil Dorado
          style={{ color: "#800000", borderBottom: `2px solid ${DORADO}CC` }}
        >
          Los Platos Mas Pedidos
        </h3>
        {/* Subtítulo Descriptivo */}
        <p className="text-center text-lg text-gray-700 max-w-4xl mx-auto px-4 mb-10">
          Descubre los favoritos de nuestros clientes: cremoso hummus y mucho
          más, preparado diariamente con ingredientes frescos y la receta
          familiar.
        </p>

        {/* Contenedor de las Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mx-auto max-w-6xl">
          {/* Mapea los ítems destacados y renderiza una MenuCard para cada uno */}
          {featuredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {/* Botón Call to Action (CTA) */}
        <div className="text-center mt-12">
          <Link
            to="/menu" // Enlace directo al menú completo
            className="font-extrabold py-3 px-8 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl text-lg uppercase"
            // Estilo Dorado y Negro para contraste
            style={{ backgroundColor: DORADO, color: NEGRO }}
          >
            Ver Menú Completo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;
