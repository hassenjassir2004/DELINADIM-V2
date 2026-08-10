import React, { useState } from "react";
import PropTypes from "prop-types";
import { useCart } from "../context/CartContext";

const MenuCard = ({ item }) => {
  const { addItem } = useCart();
  
  // 🚀 NUEVO ESTADO: Controla si la ventana de extras está abierta o cerrada
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 🚀 NUEVO ESTADO: Guarda los extras que el usuario va seleccionando
  const [selectedModifiers, setSelectedModifiers] = useState([]);

  const borderColor = item.color ? `#${item.color}` : "#D4AF37";
  const priceColor = "#F2CF66";
  const NEGRO = "#1A1A1A";

  // 🚀 NUEVO: Opciones de extras simuladas (Lo ideal es que luego vengan dentro del 'item')
  const availableModifiers = [
    { id: "mod1", name: "Extra Pan Árabe", price: 3000 },
    { id: "mod2", name: "Salsa de Ajo Adicional", price: 2000 },
    { id: "mod3", name: "Sin Cebolla", price: 0 },
  ];

  // 🚀 NUEVA FUNCIÓN: Abre el modal en lugar de agregar directo
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 🚀 NUEVA FUNCIÓN: Agrega o quita un extra de la lista de seleccionados
  const toggleModifier = (mod) => {
    const exists = selectedModifiers.find((m) => m.id === mod.id);
    if (exists) {
      setSelectedModifiers(selectedModifiers.filter((m) => m.id !== mod.id));
    } else {
      setSelectedModifiers([...selectedModifiers, mod]);
    }
  };

  // 🚀 NUEVA FUNCIÓN: Confirma el pedido con los extras y cierra el modal
  const handleConfirmAdd = () => {
    addItem(item, selectedModifiers);
    setIsModalOpen(false);
    setSelectedModifiers([]); // Limpiamos para la próxima vez
  };

  return (
    <>
      <div
        className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out flex flex-col"
        style={{ borderLeft: `5px solid ${borderColor}` }}
      >
        {/* Imagen con zoom al hover */}
        <div className="mb-4 rounded-lg overflow-hidden">
          <img
            src={item.imageURL}
            alt={item.title}
            className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-110 bg-white"
          />
        </div>

        {/* Título */}
        <h3 className="text-2xl font-extrabold text-gray-900 mb-2 font-serif">
          {item.title}
        </h3>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-3 flex-grow">{item.description}</p>

        {/* Precio + Botón */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
          <span className="text-2xl font-extrabold" style={{ color: priceColor }}>
            ${item.price}
          </span>

          <button
            onClick={handleOpenModal} // 🚀 Cambiamos la función aquí
            className="font-extrabold py-2 px-4 rounded-xl transition duration-300 transform hover:scale-105 shadow-md text-sm"
            style={{ backgroundColor: NEGRO, color: priceColor }}
          >
            Añadir al Carrito
          </button>
        </div>
      </div>

      {/* 🚀 NUEVO: EL MODAL DE EXTRAS */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            {/* Cabecera del Modal */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center" style={{ backgroundColor: NEGRO }}>
              <h4 className="font-bold text-lg" style={{ color: priceColor }}>Personaliza tu {item.title}</h4>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-red-400 font-bold text-xl"
              >
                &times;
              </button>
            </div>
            
            {/* Opciones */}
            <div className="p-5 space-y-4">
              <p className="text-sm text-gray-600 font-medium">¿Deseas agregar algo más?</p>
              
              {availableModifiers.map((mod) => (
                <label key={mod.id} className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 text-yellow-500 accent-yellow-500 rounded focus:ring-yellow-500"
                      checked={!!selectedModifiers.find(m => m.id === mod.id)}
                      onChange={() => toggleModifier(mod)}
                    />
                    <span className="font-medium text-gray-800">{mod.name}</span>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {mod.price > 0 ? `+$${mod.price.toLocaleString('es-CO')}` : 'Gratis'}
                  </span>
                </label>
              ))}
            </div>

            {/* Botón Confirmar */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <button
                onClick={handleConfirmAdd}
                className="w-full font-extrabold py-3 px-4 rounded-xl transition shadow-md"
                style={{ backgroundColor: NEGRO, color: priceColor }}
              >
                Confirmar y Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

MenuCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    color: PropTypes.string,
  }).isRequired,
};

export default MenuCard;