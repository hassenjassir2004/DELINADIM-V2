import React from "react";
import MenuCard from "../components/MenuCard"; // Importamos el componente de la tarjeta

// --- DATOS DEL MENÚ (Simulando una base de datos) ---
/**
 * Arreglo maestro de objetos que representan todos los platos del menú.
 * Incluye categorías, descripción, precio y estilos de color asociados.
 */
const allMenuItems = [
  // Entradas
  {
    id: 1,
    category: "Entradas (Disponible por Rappi, DIDI Food y WhatsApp!)",
    title: "Hummus Grande (12 onzas)",
    description:
      "Garbanzos molidos con tahini, limón y aceite de oliva virgen.",
    price: "15.000",
    color: "",
    imageURL: "/assets/hummus.webp",
  },

  {
    id: 2,
    category: "Entradas (Disponible por Rappi, DIDI Food y WhatsApp!)",
    title: "Chips de Pan Árabe ",
    description:
      "Crujientes trozos de pan árabe horneados con especias, perfectos para acompañar tus dips favoritos como hummus o baba ganoush.",
    price: "6.900",
    color: "1A1A1A",
    imageURL: "/assets/pan-pita.webp",
  },
  {
    id: 3,
    category: "Entradas (Disponible por Rappi, DIDI Food y WhatsApp!)",
    title: "Hummus Pequeño (8 onzas)",
    description:
      "Garbanzos molidos con tahini, limón y aceite de oliva virgen.",
    price: "12.000",
    color: "",
    imageURL: "/assets/hummus.webp",
  },
  // Aperitivos
  {
    id: 4,
    category: "Aperitivos (Disponible por Rappi, DIDI Food y WhatsApp!)",
    title: "Kibbeh Frito (x5 unidades)",
    description:
      "croqueta hecha de carne y trigo bulgur,sazonada con ajo, cebolla y pimienta, frita hasta quedar dorada y crujiente.",
    price: "40.000",
    color: "",
    imageURL: "/assets/kibbeh-frito.webp",
  },
  {
    id: 5,
    category: "Aperitivos (Disponible por Rappi, DIDI Food y WhatsApp!)",
    title: "Kibbeh Congelado(x5 unidades)",
    description:
      "croqueta hecha de carne y trigo bulgur, sazonada con ajo, cebolla y pimienta, Congelados para preparar en casa.",
    price: "35.000",
    color: "1A1A1A",
    imageURL: "/assets/Kibbeh-congelado.webp",
  },
  {
    id: 6,
    category: "Aperitivos (Disponible por Rappi, DIDI Food y WhatsApp!)",
    title: "Falafel Firito (x12 unidades)",
    description:
      "Bolitas fritas hechas de una pasta de garbanzos o habas triturados, hierbas frescas y especias.",
    price: "25.000",
    color: "",
    imageURL: "/assets/falafel.webp",
  },
  {
    id: 7,
    category: "Aperitivos (Disponible por Rappi, DIDI Food y WhatsApp!)",
    title: "Falafel Congelado (x12 unidades)",
    description:
      "Bolitas hechas de una pasta de garbanzos o habas triturados, hierbas frescas y especias congelado para preparar en casa.",
    price: "21.000",
    color: "1A1A1A",
    imageURL: "/assets/falafel.webp",
  },
  // Platos Fuertes
  {
    id: 8,
    category: "Platos Fuertes (Disponible WhatsApp!)",
    title: "Plato Mixto",
    description:
      "incluye kibbeh, hojas de parra y repollo rellenas, tabule, arroz con almendras, hummus, kibbeh y siempre acompañado de pan árabe.",
    price: "21.000",
    color: "",
    imageURL: "/assets/plato-mixto.webp",
  },
  //combos
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
  // Postres

  {
    id: 12,
    category: "Postres (Disponible por whatsapp!)",
    title: "Baklava Clásico (A encargo!)",
    description: "Masa filo, nueces y jarabe de miel.",
    price: "",
    color: "",
    imageURL: "/assets/baklava.webp",
  },
  {
    id: 13,
    category: "Postres (Disponible por whatsapp!)",
    title: "Mamoul (A encargo!)",
    description:
      "Galleta de sémola rellena de dátiles o nueces, espolvoreada con azúcar.",
    price: "",
    color: "1A1A1A",
    imageURL: "/assets/mamoul.webp",
  },
];
// ----------------------------------------------------

/**
 * Función auxiliar para agrupar los ítems del menú en un objeto,
 * donde la clave es el nombre de la categoría.
 */
const categorizedMenu = allMenuItems.reduce((acc, item) => {
  if (!acc[item.category]) {
    acc[item.category] = [];
  }
  acc[item.category].push(item);
  return acc;
}, {});

/**
 * Componente principal que renderiza el menú completo, organizado por categorías.
 */
const MenuPage = () => {
  // Definición de colores
  const DORADO = "#F2CF66";
  const VINO = "#800000";

  return (
    <div className="py-16 bg-gray-50">
      {" "}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título de la Página */}{" "}
        <h1
          className="text-5xl font-extrabold text-center text-gray-900 mb-4 border-b-4 pb-2 inline-block mx-auto font-serif" // Estilo del borde con el color dorado
          style={{ borderColor: DORADO }}
        >
          Menú Completo{" "}
        </h1>{" "}
        <p className="text-center text-gray-600 mb-12">
          Sabores auténticos de la gastronomía árabe, preparados con la receta
          familiar.  {" "}
        </p>
        {/* Itera sobre las categorías del menú agrupado */}{" "}
        {Object.keys(categorizedMenu).map((category) => (
          <section key={category} className="mb-16">
            {/* Título de la Categoría */}{" "}
            <h2
              className="text-3xl font-bold mb-6 border-b-2 pb-2 font-serif" // Estilo para el color Vino
              style={{ color: VINO, borderColor: "rgba(128, 0, 0, 0.5)" }}
            >
              {category}{" "}
            </h2>{" "}
            {/* Contenedor de las Tarjetas: Diseño responsivo en cuadrícula */} {" "}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {" "}
              {categorizedMenu[category].map(
                (
                  item // Usa el componente MenuCard para cada plato
                ) => (
                  <MenuCard key={item.id} item={item} />
                )
              )}{" "}
            </div>{" "}
          </section>
        ))}{" "}
      </div>{" "}
    </div>
  );
};

export default MenuPage;
