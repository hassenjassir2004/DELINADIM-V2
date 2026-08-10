import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "../firebase";

const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchOrders();
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Correo o contraseña incorrectos.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "pedidos"));
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(list);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    const orderRef = doc(db, "pedidos", id);
    await updateDoc(orderRef, { status: newStatus });
    fetchOrders();
  };

  const handleDeleteOrder = async (id) => {
    if (confirm("¿Estás seguro de eliminar este pedido?")) {
      await deleteDoc(doc(db, "pedidos", id));
      fetchOrders();
    }
  };

  const totalVentasHoy = orders.reduce((acc, order) => {
    return acc + (order.total || 0);
  }, 0);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Admin - Delinadim</h2>
          <p className="text-sm text-gray-500 mb-6 text-center">Inicia sesión con tu cuenta autorizada</p>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2.5 rounded-xl font-bold hover:bg-gray-800 transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Cabecera con el título y el botón de Cerrar Sesión bien ubicado */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Panel de Administración - Delinadim</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-600 transition-colors shadow-sm"
        >
          Cerrar Sesión
        </button>
      </div>
      
      <div className="bg-gray-100 p-4 rounded-xl mb-6 shadow-sm">
        <p className="text-lg font-semibold">Total Acumulado en Pedidos: ${new Intl.NumberFormat("es-CO").format(totalVentasHoy)} COP</p>
      </div>

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

export default AdminPage;