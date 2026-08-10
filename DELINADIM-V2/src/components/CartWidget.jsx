// context.zip/components/CartWidget.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
// 🔑 Importa el nuevo Modal
import CartModal from "./CartModal";

/**
 * Componente de widget/icono de carrito flotante.
 * Muestra el número total de ítems en el carrito y abre el modal.
 */
const CartWidget = () => {
  // Obtiene la cantidad total de ítems del contexto
  const { totalItems } = useCart();

  // 🔑 Estado para controlar la apertura del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Paleta de colores para consistencia
  const DORADO = "#F2CF66";
  const NEGRO = "#1A1A1A";

  // No renderiza nada si el carrito está vacío Y el modal está cerrado
  if (totalItems === 0 && !isModalOpen) {
    return null;
  }

  return (
    <>
      {/* Botón flotante para el Carrito */}
      <div
        // 🔑 Abre el modal al hacer clic
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 left-6 p-3 rounded-full shadow-2xl z-50 transition duration-300 transform hover:scale-110 cursor-pointer flex items-center justify-center"
        style={{ backgroundColor: DORADO, color: NEGRO }}
      >
        {/* Icono de Carrito */}
        <span className="text-2xl" role="img" aria-label="Carrito de Compras">
          🛒
        </span>

        {/* Contador de Ítems */}
        {totalItems > 0 && (
          <span className="ml-2 text-lg font-extrabold">{totalItems}</span>
        )}
      </div>

      {/* 🔑 Componente Modal */}
      <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default CartWidget;
