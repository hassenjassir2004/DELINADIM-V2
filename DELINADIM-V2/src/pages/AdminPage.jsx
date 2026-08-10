import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
// NUEVO: Importamos las funciones de seguridad de Firebase
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "../firebase";

const AdminPage = () => {
  // Estados de la Base de Datos
  const [orders, setOrders] = useState([]);
  
  // NUEVO: Estados para manejar la sesión y el formulario
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // NUEVO: Efecto para escuchar si el dueño ya inició sesión
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  // Efecto modificado: Solo busca pedidos si el usuario está verificado
  useEffect(() => {
    if (!user) return; // Si no hay usuario, detiene la búsqueda por seguridad

    const q = query(collection(db, "pedidos"), orderBy("createdAt", "desc"));
    const unsubscribeDB = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
    });

    return () => unsubscribeDB();
  }, [user]);

  // NUEVO: Función que se ejecuta al presionar "Entrar"
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError("Credenciales incorrectas. Por favor, verifica tu correo y contraseña.");
    }
  };

  // NUEVO: Función para cerrar sesión
  const handleLogout = async () => {
    await signOut(auth);
  };

  const DORADO = "#F2CF66";
  const VINO = "#800000";

  // ---------------------------------------------------------
  // PANTALLA 1: FORMULARIO DE LOGIN (Si no ha iniciado sesión)
  // ---------------------------------------------------------
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div 
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-4" 
          style={{ borderColor: DORADO }}
        >
          <h2 className="text-3xl font-serif font-bold text-center mb-6" style={{ color: VINO }}>
            Acceso Administrativo
          </h2>
          
          {error && (
            <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm font-semibold text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Correo Electrónico</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none transition"
                style={{ focusRing: DORADO }}
                placeholder="tu@correo.com"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Contraseña</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none transition"
                placeholder="********"
                required 
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-3 rounded-lg font-extrabold text-white transition duration-300 transform hover:scale-[1.02] shadow-md mt-2"
              style={{ backgroundColor: VINO }}
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------
  // PANTALLA 2: PANEL DE CONTROL (Si ya comprobó su identidad)
  // ---------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b-4" style={{ borderColor: DORADO }}>
          <h1 className="text-3xl md:text-4xl font-serif font-extrabold" style={{ color: VINO }}>
            Panel de Control - Delinadim
          </h1>
          
          {/* NUEVO: Botón para salir de la cuenta de administrador */}
          <button 
            onClick={handleLogout}
            className="mt-4 md:mt-0 bg-red-100 text-red-700 px-5 py-2 rounded-xl font-bold hover:bg-red-200 transition shadow-sm"
          >
            Cerrar Sesión
          </button>
        </div>

        {orders.length === 0 ? (
          <p className="text-xl text-gray-600">Aún no hay pedidos registrados en la plataforma.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white p-6 rounded-2xl shadow-lg border-t-4 flex flex-col transition transform hover:-translate-y-1" 
                style={{ borderColor: DORADO }}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {order.status || "Pendiente"}
                  </span>
                  <span className="text-gray-500 text-sm font-semibold bg-gray-100 px-2 py-1 rounded-md">
                    {order.method === "whatsapp" ? "📱 WhatsApp" : "💳 Online"}
                  </span>
                </div>

                <p className="text-gray-400 text-xs mb-4 font-mono">
                  {new Date(order.createdAt).toLocaleString("es-CO")}
                </p>

                <div className="space-y-3 mb-6 flex-grow border-b pb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="text-sm">
                      <p className="font-bold text-gray-800">
                        {item.quantity}x {item.name}
                      </p>
                      {item.modifiers && item.modifiers.length > 0 && (
                        <ul className="text-xs text-gray-500 italic ml-4 mt-1">
                          {item.modifiers.map((mod, mIdx) => (
                            <li key={mIdx}>+ {mod.name}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-between items-center mt-auto">
                  <span className="text-gray-500 font-bold">Total a cobrar:</span>
                  <span className="text-2xl font-extrabold" style={{ color: VINO }}>
                    ${new Intl.NumberFormat("es-CO").format(order.total)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;