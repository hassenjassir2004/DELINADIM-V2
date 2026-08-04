import React from "react";
import { useCart } from "../context/CartContext";

const CartModal = ({ isOpen, onClose }) => {
  const {
    cart,
    removeItem,
    clearCart,
    totalAmount,
    incrementItem,
    decrementItem,
  } = useCart();

  const DORADO = "#F2CF66";
  const VINO = "#800000";
  const NEGRO = "#1A1A1A";

  if (!isOpen) return null;

  const generateWhatsappMessage = () => {
    if (cart.length === 0)
      return "Hola, me gustaría pedir información sobre el menú de Delinadim.";

    let message =
      "Hola Delinadim, me gustaría hacer un pedido con los siguientes productos:\n\n";

    cart.forEach((cartItem) => {
      // 🚀 USAMOS EL PRECIO UNITARIO FINAL (Que ya incluye los extras)
      const formattedPrice = new Intl.NumberFormat("es-CO").format(
        cartItem.unitPrice * cartItem.quantity
      );
      
      message += `*${cartItem.quantity}x* ${cartItem.item.title} ($${formattedPrice} COP)\n`;
      
      // 🚀 AGREGAMOS LOS EXTRAS AL MENSAJE DE WHATSAPP
      if (cartItem.modifiers && cartItem.modifiers.length > 0) {
        cartItem.modifiers.forEach(mod => {
          message += `   ➕ ${mod.name}\n`;
        });
      }
    });

    const formattedTotal = new Intl.NumberFormat("es-CO").format(totalAmount);
    message += `\nTotal estimado: *$${formattedTotal} COP*.\n\nPor favor, confírmenme la disponibilidad y el costo de envío. ¡Gracias!`;

    return encodeURIComponent(message);
  };

  const whatsappLink = `https://wa.me/+573102078916?text=${generateWhatsappMessage()}`;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-md m-4 p-6 relative transform transition-all duration-300 scale-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 text-2xl"
        >
          ✕
        </button>

        <h2
          className="text-3xl font-serif font-extrabold mb-4 pb-2 text-center"
          style={{ color: VINO, borderBottom: `2px solid ${DORADO}` }}
        >
          Tu Pedido
        </h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-600 py-10">
            Tu carrito está vacío.
          </p>
        ) : (
          <>
            <div className="overflow-y-auto mb-4 border-b pb-4 pr-2 flex-grow">
              {cart.map((cartItem, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-4 border-b last:border-b-0"
                >
                  <img
                    src={cartItem.item.imageURL}
                    alt={cartItem.item.title}
                    className="w-16 h-16 object-cover rounded-lg mr-3 border"
                    style={{ borderColor: DORADO }}
                  />

                  <div className="flex-grow pr-4">
                    <p className="text-gray-900 font-semibold">
                      {cartItem.item.title}
                    </p>
                    
                    {/* 🚀 MOSTRAMOS LOS EXTRAS EN LA INTERFAZ DEL CARRITO */}
                    {cartItem.modifiers && cartItem.modifiers.length > 0 && (
                      <ul className="text-xs text-gray-500 italic mb-1">
                        {cartItem.modifiers.map((mod, idx) => (
                          <li key={idx}>+ {mod.name}</li>
                        ))}
                      </ul>
                    )}

                    <p className="text-sm text-gray-500">
                      Total:{" "}
                      <span className="font-bold">
                        $
                        {new Intl.NumberFormat("es-CO").format(
                          cartItem.unitPrice * cartItem.quantity // 🚀 Calculamos con unitPrice
                        )}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col items-end">
                    <div
                      className="flex items-center mb-2 border rounded-md overflow-hidden"
                      style={{ borderColor: DORADO }}
                    >
                      <button
                        // 🚀 CAMBIADO A cartItemId
                        onClick={() => decrementItem(cartItem.cartItemId)}
                        className="px-3 py-1 text-xl font-bold hover:bg-gray-100"
                        style={{ color: VINO }}
                      >
                        -
                      </button>

                      <input
                        type="number"
                        min="1"
                        value={cartItem.quantity}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value > 0) {
                            const diff = value - cartItem.quantity;
                            if (diff > 0) {
                              // 🚀 CAMBIADO A cartItemId
                              for (let i = 0; i < diff; i++)
                                incrementItem(cartItem.cartItemId);
                            } else {
                              for (let i = 0; i < Math.abs(diff); i++)
                                decrementItem(cartItem.cartItemId);
                            }
                          }
                        }}
                        className="w-12 text-center outline-none bg-transparent"
                      />

                      <button
                        // 🚀 CAMBIADO A cartItemId
                        onClick={() => incrementItem(cartItem.cartItemId)}
                        className="px-3 py-1 text-xl font-bold hover:bg-gray-100"
                        style={{ color: VINO }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      // 🚀 CAMBIADO A cartItemId
                      onClick={() => removeItem(cartItem.cartItemId)}
                      className="text-red-500 hover:text-red-700 text-xs mt-1 p-1 font-semibold"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-2 pt-4 border-t-2 shrink-0"
              style={{ borderColor: DORADO }}
            >
              <div className="flex justify-between items-center font-bold text-xl mb-4">
                <span>Total General:</span>
                <span style={{ color: VINO }}>
                  ${new Intl.NumberFormat("es-CO").format(totalAmount)}
                </span>
              </div>

              <div className="space-y-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={clearCart}
                  className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-lg font-extrabold text-white transition duration-300 transform hover:scale-[1.02] shadow-lg"
                  style={{ backgroundColor: "#25D366" }}
                >
                  📱 Finalizar Pedido
                </a>

                <button
                  onClick={clearCart}
                  className="w-full py-2 px-4 rounded-xl text-sm font-semibold text-gray-600 border border-gray-300 hover:bg-gray-100 transition duration-300"
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;