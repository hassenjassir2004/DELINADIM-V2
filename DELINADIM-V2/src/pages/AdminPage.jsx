import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const AdminPanel = () => {
  const [orders, setOrders] = useState([]);

  // 1. Cargar pedidos en tiempo real o al montar el componente
  const fetchOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "pedidos"));
   const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setOrders(list);
  };

  useEffect(() => {
  fetchOrders();
}, []);

  // 2. Función para cambiar el estado del pedido
  const handleUpdateStatus = async (id, newStatus) => {
    const orderRef = doc(db, "pedidos", id);
    await updateDoc(orderRef, { status: newStatus });
    fetchOrders(); // Recargar lista
  };

  // 3. Función para eliminar un pedido
  const handleDeleteOrder = async (id) => {
    if (confirm("¿Estás seguro de eliminar este pedido?")) {
      await deleteDoc(doc(db, "pedidos", id));
      fetchOrders(); // Recargar lista
    }
  };

  // 4. Calcular total de ventas del día
  const totalVentasHoy = orders.reduce((acc, order) => {
    return acc + (order.total || 0);
  }, 0);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-wine">Panel de Administración - Delinadim</h1>
      
      {/* Resumen de Ventas */}
      <div className="bg-gray-100 p-4 rounded-xl mb-6 shadow-sm">
        <p className="text-lg font-semibold">Total Acumulado en Pedidos: ${new Intl.NumberFormat("es-CO").format(totalVentasHoy)} COP</p>
      </div>

      {/* Lista de Pedidos */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-xl shadow border flex justify-between items-center">
            <div>
              <p className="font-bold">Método: {order.method.toUpperCase()}</p>
              <p className="text-sm text-gray-600">Estado: <span className="font-semibold text-amber-600">{order.status}</span></p>
              <p className="text-md font-black text-gray-800">Total: ${new Intl.NumberFormat("es-CO").format(order.total)}</p>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => handleUpdateStatus(order.id, "completado")}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold hover:bg-green-700"
              >
                Completar
              </button>
              <button 
                onClick={() => handleDeleteOrder(order.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;