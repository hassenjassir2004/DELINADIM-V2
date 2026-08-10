import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import Swal from 'sweetalert2';

const CartModal = ({ isOpen, onClose }) => {
  const {
    cart,
    removeItem,
    clearCart,
    totalAmount,
    incrementItem,
    decrementItem,
  } = useCart();

  const [isProcessing, setIsProcessing] = useState(false);

  const DORADO = "#F2CF66";
  const VINO = "#800000";

  if (!isOpen) return null;

  const generateWhatsappMessage = () => {
    if (cart.length === 0)
      return "Hola, me gustaría pedir información sobre el menú de Delinadim.";

    let message =
      "Hola Delinadim, me gustaría hacer un pedido con los siguientes productos:\n\n";

    cart.forEach((cartItem) => {
      const formattedPrice = new Intl.NumberFormat("es-CO").format(
        cartItem.unitPrice * cartItem.quantity
      );
      
      message += `*${cartItem.quantity}x* ${cartItem.item.title} ($${formattedPrice} COP)\n`;
      
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

  const handleCheckout = async (paymentMethod) => {
    setIsProcessing(true);
    try {
      const newOrder = {
        items: cart.map(cartItem => ({
          id: cartItem.item.id,
          name: cartItem.item.title,
          quantity: cartItem.quantity,
          price: cartItem.unitPrice,
          modifiers: cartItem.modifiers || []
        })),
        total: totalAmount,
        method: paymentMethod, 
        status: 'pendiente',
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, "pedidos"), newOrder);

      if (paymentMethod === "whatsapp") {
        window.open(whatsappLink, "_blank");
        clearCart();
        onClose();
        
        Swal.fire({
          title: '¡Pedido enviado!',
          text: 'Te redirigimos a WhatsApp para coordinar la entrega.',
          icon: 'success',
          confirmButtonColor: DORADO,
        });

      } else if (paymentMethod === "online") {
        const response = await fetch("https://delinadim-backend.onrender.com/create_preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: "Pedido Delinadim", 
            quantity: 1, 
            price: totalAmount
          }),
        });

        const data = await response.json();

        // AQUÍ ESTÁ LA MAGIA: Abre Mercado Pago en una pestaña separada
        if (data.sandbox_init_point) {
          window.open(data.sandbox_init_point, "_blank");
          // Opcional: cerramos el modal del carrito una vez que se van a pagar
          onClose(); 
        } else {
          Swal.fire({
            title: 'Ups...',
            text: 'Hubo un problema al generar el link de pago. Intenta de nuevo.',
            icon: 'error',
            confirmButtonColor: VINO,
          });
        }
      }
    } catch (error) {
      console.error("Error al procesar el pedido:", error);
      Swal.fire({
        title: 'Error de conexión',
        text: 'Revisa tu internet e inténtalo nuevamente.',
        icon: 'warning',
        confirmButtonColor: VINO,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900/40 backdrop-blur-md z-50 flex justify-center items-center p-4 transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md m-4 p-6 relative transform transition-all duration-300 scale-100 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-xl"
        >
          ✕
        </button>

        <h2
          className="text-3xl font-serif font-extrabold mb-5 pb-3 text-center"
          style={{ color: VINO, borderBottom: `2px solid ${DORADO}` }}
        >
          Tu Pedido
        </h2>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🛒</span>
            <p className="text-gray-500 font-medium text-lg">Tu carrito está vacío.</p>
            <p className="text-gray-400 text-sm mt-2">¡Anímate a probar algo delicioso!</p>
          </div>
        ) : (
          <>
            <div className="overflow-y-auto mb-4 border-b pb-4 pr-2 flex-grow scrollbar-thin scrollbar-thumb-gray-300">
              {cart.map((cartItem, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-4 border-b last:border-b-0"
                >
                  <img
                    src={cartItem.item.imageURL}
                    alt={cartItem.item.title}
                    className="w-16 h-16 object-cover rounded-xl mr-3 shadow-sm border border-gray-100"
                  />

                  <div className="flex-grow pr-4">
                    <p className="text-gray-900 font-bold leading-tight">
                      {cartItem.item.title}
                    </p>
                    
                    {cartItem.modifiers && cartItem.modifiers.length > 0 && (
                      <ul className="text-xs text-gray-500 italic mb-1 mt-1">
                        {cartItem.modifiers.map((mod, idx) => (
                          <li key={idx}>+ {mod.name}</li>
                        ))}
                      </ul>
                    )}

                    <p className="text-sm text-gray-500 mt-1">
                      Total:{" "}
                      <span className="font-extrabold text-gray-800">
                        ${new Intl.NumberFormat("es-CO").format(
                          cartItem.unitPrice * cartItem.quantity
                        )}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col items-end">
                    <div
                      className="flex items-center mb-2 border-2 rounded-lg overflow-hidden shadow-sm"
                      style={{ borderColor: "#f3f4f6" }}
                    >
                      <button
                        onClick={() => decrementItem(cartItem.cartItemId)}
                        className="px-3 py-1 font-bold bg-gray-50 hover:bg-gray-100 transition-colors"
                        style={{ color: VINO }}
                      >
                        -
                      </button>

                      <input
                        type="number"
                        min="1"
                        readOnly
                        value={cartItem.quantity}
                        className="w-10 text-center outline-none bg-transparent font-bold text-gray-700"
                      />

                      <button
                        onClick={() => incrementItem(cartItem.cartItemId)}
                        className="px-3 py-1 font-bold bg-gray-50 hover:bg-gray-100 transition-colors"
                        style={{ color: VINO }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(cartItem.cartItemId)}
                      className="text-red-400 hover:text-red-600 text-xs mt-1 px-2 py-1 font-bold underline transition-colors"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 pt-4 shrink-0">
              <div className="flex justify-between items-center font-black text-xl mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <span className="text-gray-800">Total General:</span>
                <span style={{ color: VINO }}>
                  ${new Intl.NumberFormat("es-CO").format(totalAmount)}
                </span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleCheckout("whatsapp")}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-md font-bold text-white transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#25D366" }}
                >
                  📱 Pedir por WhatsApp
                </button>

                <button
                  onClick={() => handleCheckout("online")}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-md font-bold text-white transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 bg-gray-900 hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Conectando pasarela...
                    </>
                  ) : (
                    "💳 Pagar con Tarjeta / PSE"
                  )}
                </button>

                <button
                  onClick={clearCart}
                  className="w-full py-2.5 mt-2 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
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