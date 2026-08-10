import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase con tus credenciales reales
const firebaseConfig = {
  apiKey: "AIzaSyA1TVU45TCJA72mN676lfw5sWS-mzMJPMY",
  authDomain: "delinadim-v2.firebaseapp.com",
  projectId: "delinadim-v2",
  storageBucket: "delinadim-v2.firebasestorage.app",
  messagingSenderId: "777965248899",
  appId: "1:777965248899:web:216fd276127b909f51d6b6",
  measurementId: "G-H7V4ZFTLF9"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar los servicios que usaremos en la app (Autenticación y Base de Datos)
export const auth = getAuth(app);
export const db = getFirestore(app);