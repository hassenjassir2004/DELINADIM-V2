import React from "react";
import MenuCard from "./MenuCard";
import { Link } from "react-router-dom";

// --- DATOS SIMULADOS DE LOS DESTACADOS ---
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

const FeaturedDishes = () => {
  const DORADO = "#D4AF37";
  const VINO = "#5C061C";

  return (
    <section className="py-20 bg-[#FDFBF7] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título de la Sección */}
        <h3
          className="text-3xl md:text-4xl font-extrabold text-center font-serif mb-4 pb-3"
          style={{ color: VINO, borderBottom: `2px solid ${DORADO}40` }}
        >
          Los Platos Más Pedidos
        </h3>

        {/* Subtítulo Descriptivo */}
        <p className="text-center text-stone-600 text-base sm:text-lg max-w-2xl mx-auto px-4 mb-12 font-light">
          Descubre los favoritos de nuestros clientes, preparados diariamente con ingredientes frescos y la receta familiar.
        </p>

        {/* Contenedor de las Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mx-auto max-w-6xl">
          {featuredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {/* Botón Call to Action (CTA) */}
        <div className="text-center mt-14">
          <Link
            to="/menu"
            className="inline-flex items-center justify-center font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl text-base tracking-wide"
            style={{ backgroundColor: DORADO, color: "#1c1917" }}
          >
            🍽️ Ver Menú Completo
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedDishes;