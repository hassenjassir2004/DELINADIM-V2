import React from "react";

// --- Componentes Icono (Rutas de Assets) ---
const WhatsappIcon = ({ size = "w-12 h-12" }) => (
  <img src="/assets/icono-whatsapp.svg" alt="WhatsApp" className={size} />
);

const RappiIcon = ({ size = "w-12 h-12" }) => (
  <img src="/assets/icono-rappi.webp" alt="Rappi" className={size} />
);

const InstagramIcon = ({ size = "w-12 h-12" }) => (
  <img src="/assets/icono-instagram.svg" alt="Instagram" className={size} />
);
// ----------------------------------------------------------------------

const ContactPage = () => {
  const DORADO = "#D4AF37";
  const VINO = "#5C061C";

  const links = [
    {
      name: "Hacer un Pedido por WhatsApp",
      IconComponent: WhatsappIcon,
      color: "bg-stone-900 hover:bg-emerald-700",
      url: "https://wa.me/+573102078916?text=Hola%20quiero%20hacer%20un%20pedido%20de%20Delinadim",
    },
    {
      name: "Pedir por Rappi (Entrega Rápida)",
      IconComponent: RappiIcon,
      color: "bg-stone-900 hover:bg-rose-700",
      url: "https://www.rappi.com.co/restaurantes/900450716-delinadim-arabe?csr=true",
    },
    {
      name: "Síguenos en Instagram",
      IconComponent: InstagramIcon,
      color: "bg-stone-900 hover:bg-pink-700",
      url: "https://www.instagram.com/delinadim",
    },
  ];

  return (
    <div className="py-20 bg-[#FDFBF7] min-h-screen flex flex-col items-center">
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título Principal */}
        <div className="text-center mb-16">
          <h1
            className="text-4xl sm:text-5xl font-extrabold text-stone-900 mb-4 font-serif tracking-tight pb-3 inline-block"
            style={{ borderBottom: `3px solid ${DORADO}` }}
          >
            Contacto y Pedidos
          </h1>
          <p
            className=" mt-4 text-xl max-w-2xl mx-auto font-light"
            style={{ color: VINO }}
          >
            Elige tu método preferido para conectar con Delinadim. ¡Estamos listos para atenderte!
          </p>
        </div>

        {/* Grid de Enlaces Grandes (Call-to-Action) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white ${link.color} flex-grow border border-stone-800`}
            >
              <div className="mb-4 p-3 bg-stone-800/80 rounded-2xl border border-stone-700">
                <link.IconComponent size="w-10 h-10" />
              </div>

              <h3 className="text-xl font-bold text-center tracking-tight font-serif">
                {link.name}
              </h3>
              
              <p className="mt-2 text-xs text-stone-300 font-light tracking-wide uppercase">
                {link.name.includes("WhatsApp")
                  ? "Respuesta inmediata"
                  : link.name.includes("Rappi")
                  ? "Pide a domicilio aquí"
                  : "Mira nuestro feed"}
              </p>
            </a>
          ))}
        </div>

        {/* Información Adicional (Horario, Teléfono, Ubicación) */}
        <div
          className="mt-20 text-center p-8 border-t-2 border-dashed rounded-3xl bg-stone-50/50 shadow-sm border-stone-200"
        >
          <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">
            Información de la Tienda
          </h3>
          <p className="text-stone-600 text-base mb-2 font-light">
            📍 <span className="font-medium text-stone-800">Ubicación:</span> Barranquilla, Colombia.
          </p>
          <p className="text-stone-600 text-base font-light">
            📞 <span className="font-medium text-stone-800">Número Telefónico:</span> +57 3102078916
          </p>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;