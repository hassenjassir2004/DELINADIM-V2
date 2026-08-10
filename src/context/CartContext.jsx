import React, { createContext, useState, useContext } from "react";

// 1. CREACIÓN DEL CONTEXTO
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Estado principal del carrito: ahora guardará { cartItemId, item, quantity, modifiers, unitPrice }
  const [cart, setCart] = useState([]);

  // --- FUNCIONES LÓGICAS DEL CARRITO ---

  /**
   * 🚀 MODIFICADO: Agrega un ítem al carrito y acepta un array de modificadores.
   * @param {object} item - El objeto del plato original.
   * @param {array} modifiers - Lista de modificaciones (ej. [{ name: "Extra pan", price: 3000 }]).
   */
  const addItem = (item, modifiers = []) => {
    // 1. Limpiamos el precio base del plato
    const basePrice = parseFloat(item.price.toString().replace(".", ""));
    
    // 2. Calculamos el precio adicional de los modificadores elegidos
    const modifiersPrice = modifiers.reduce((acc, mod) => acc + (parseFloat(mod.price) || 0), 0);
    
    // 3. Precio unitario final (Base + Modificadores)
    const finalUnitPrice = basePrice + modifiersPrice;

    // 4. 🚀 MAGIA: Creamos un ID único combinando el ID del plato y los modificadores.
    // Así, un hummus normal y un hummus con extra pan no se mezclan.
    const modifiersString = JSON.stringify(modifiers); // Convertimos a texto para comparar
    const cartItemId = `${item.id}-${modifiersString}`;

    // Buscamos si EXACTAMENTE el mismo plato con los MISMOS modificadores ya está en el carrito
    const itemIndex = cart.findIndex((cartItem) => cartItem.cartItemId === cartItemId);

    if (itemIndex > -1) {
      // Caso 1: El ítem exacto ya existe, solo incrementamos cantidad
      const newCart = [...cart];
      newCart[itemIndex].quantity += 1;
      setCart(newCart);
    } else {
      // Caso 2: Es una nueva combinación, lo agregamos como nuevo
      setCart([
        ...cart,
        { 
          cartItemId, // Usaremos este ID para borrar o incrementar en el carrito
          item: { ...item, price: basePrice }, 
          quantity: 1, 
          modifiers, 
          unitPrice: finalUnitPrice 
        },
      ]);
    }
  };

  /**
   * 🚀 MODIFICADO: Ahora usa el cartItemId (ID único) en lugar del item.id
   */
  const incrementItem = (cartItemId) => {
    const itemIndex = cart.findIndex((cartItem) => cartItem.cartItemId === cartItemId);
    if (itemIndex > -1) {
      const newCart = [...cart];
      newCart[itemIndex].quantity += 1;
      setCart(newCart);
    }
  };

  /**
   * 🚀 MODIFICADO: Ahora usa el cartItemId
   */
  const decrementItem = (cartItemId) => {
    const itemIndex = cart.findIndex((cartItem) => cartItem.cartItemId === cartItemId);

    if (itemIndex > -1) {
      const newCart = [...cart];
      if (newCart[itemIndex].quantity > 1) {
        newCart[itemIndex].quantity -= 1;
        setCart(newCart);
      } else {
        removeItem(cartItemId);
      }
    }
  };

  /**
   * 🚀 MODIFICADO: Ahora elimina basándose en el cartItemId
   */
  const removeItem = (cartItemId) => {
    const filteredCart = cart.filter((cartItem) => cartItem.cartItemId !== cartItemId);
    setCart(filteredCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, current) => acc + current.quantity, 0);

  /**
   * 🚀 MODIFICADO: Calcula el monto usando el precio unitario final (con modificadores)
   */
  const totalAmount = cart.reduce(
    (acc, current) => acc + current.unitPrice * current.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        totalItems,
        totalAmount,
        incrementItem,
        decrementItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};