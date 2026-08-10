import React, { useState } from "react";
import PropTypes from "prop-types";
import { useCart } from "../context/CartContext";

const MenuCard = ({ item }) => {
  const { addItem } = useCart();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModifiers, setSelectedModifiers] = useState([]);

  const DORADO = "#D4AF37";
  const VINO = "#5C061C";

  const availableModifiers = [
    { id: "mod1", name: "Extra Pan Árabe", price: 3000 },
    { id: "mod2", name: "Salsa de Ajo Adicional", price: 2000 },
    { id: "mod3", name: "Sin Cebolla", price: 0 },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const toggleModifier = (mod) => {
    const exists = selectedModifiers.find((m) => m.id === mod.id);
    if (exists) {
      setSelectedModifiers(selectedModifiers.filter((m) => m.id !== mod.id));
    } else {
      setSelectedModifiers([...selectedModifiers, mod]);
    }
  };

  const handleConfirmAdd = () => {
    addItem(item, selectedModifiers);
    setIsModalOpen(false);
    setSelectedModifiers([]);
  };

  return (
    <>
      <div className="group bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col border border-stone-100 relative overflow-hidden">
        
        {/* Imagen con zoom sutil al hover */}
        <div className="mb-4 rounded-2xl overflow-hidden bg-stone-50 p-2">
          <img
            src={item.imageURL}
            alt={item.title}
            className="w-full h-48 object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Título */}
        <h3 className="text-xl font-bold text-stone-900 mb-2 font-serif tracking-tight">
          {item.title}
        </h3>

        {/* Descripción */}
        <p className="text-sm text-stone-500 mb-4 flex-grow font-light leading-relaxed">
          {item.description}
        </p>

        {/* Precio + Botón */}
        <div className="flex justify-between items-center pt-4 border-t border-stone-100 mt-auto">
          <span className="text-xl font-black text-stone-900">
            ${item.price}
          </span>

          <button
            onClick={handleOpenModal}
            className="font-bold py-2.5 px-5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-sm text-xs tracking-wide bg-stone-900 text-white hover:bg-stone-800"
          >
            Añadir al Carrito
          </button>
        </div>
      </div>

      {/* MODAL DE EXTRAS */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-stone-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera del Modal */}
            <div className="p-5 border-b border-stone-100 flex justify-between items-center bg-stone-900 text-white">
              <h4 className="font-serif font-bold text-lg text-amber-400">
                Personaliza tu plato
              </h4>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-white font-bold text-xl transition-colors bg-stone-800 hover:bg-stone-700 w-8 h-8 rounded-full flex items-center justify-center"
              >
                &times;
              </button>
            </div>
            
            {/* Opciones */}
            <div className="p-6 space-y-3">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                ¿Deseas agregar algo más?
              </p>
              
              {availableModifiers.map((mod) => (
                <label 
                  key={mod.id} 
                  className="flex items-center justify-between p-3.5 border border-stone-200 rounded-2xl cursor-pointer hover:bg-stone-50 transition-all shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-amber-500 accent-amber-500 rounded focus:ring-amber-500"
                      checked={!!selectedModifiers.find(m => m.id === mod.id)}
                      onChange={() => toggleModifier(mod)}
                    />
                    <span className="font-medium text-stone-800 text-sm">{mod.name}</span>
                  </div>
                  <span className="text-stone-500 text-xs font-bold">
                    {mod.price > 0 ? `+$${mod.price.toLocaleString('es-CO')}` : 'Gratis'}
                  </span>
                </label>
              ))}
            </div>

            {/* Botón Confirmar */}
            <div className="p-5 border-t border-stone-100 bg-stone-50">
              <button
                onClick={handleConfirmAdd}
                className="w-full font-bold py-3 px-4 rounded-xl transition shadow-md text-sm text-white bg-stone-900 hover:bg-stone-800"
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