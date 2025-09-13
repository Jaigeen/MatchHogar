// Backend básico para procesar pagos Stripe
// ⚠️ IMPORTANTE: Para activar los pagos, pon tu clave secreta de Stripe en el archivo .env
// Ejemplo: STRIPE_SECRET_KEY=sk_test_xxx
// Nunca subas tu .env a un repositorio público.

const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
require('dotenv').config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Pon tu clave secreta en .env

app.use(cors());
app.use(express.json());

app.post('/api/pago-premium', async (req, res) => {
  const { paymentMethodId } = req.body;
  try {
    // Crea un PaymentIntent para cobrar 4,99€
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 499, // 4,99€ en céntimos
      currency: 'eur',
      payment_method: paymentMethodId,
      confirm: true,
      description: 'Suscripción premium MatchHogar',
    });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log('Servidor Stripe escuchando en puerto', PORT));
