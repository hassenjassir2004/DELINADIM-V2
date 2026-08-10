import express from "express";
import cors from "cors";
import "dotenv/config"; // <--- Importante
import { MercadoPagoConfig, Preference } from "mercadopago";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Lee la llave de forma segura desde el archivo .env
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });
app.post("/create_preference", async (req, res) => {
  try {
    const { title, quantity, price } = req.body;

    const body = {
      items: [
        {
          title: title,
          quantity: Number(quantity),
          unit_price: Number(price),
          currency_id: "COP",
        },
      ]
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });

    // AQUÍ ESTÁ LA SOLUCIÓN: Le enviamos a React los links directos
    res.json({
      id: result.id,
      sandbox_init_point: result.sandbox_init_point, // Link para pruebas
      init_point: result.init_point // Link para producción
    });
    
  } catch (error) {
    console.error("Error al generar el cobro:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(port, () => {
  console.log(`¡Servidor backend de Delinadim corriendo perfectamente en http://localhost:${port}!`);
});