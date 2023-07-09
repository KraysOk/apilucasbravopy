// api/routes.js
const express = require('express');
const router = express.Router();
const { WebpayPlus } = require('transbank-sdk');

router.post('/pago', async (req, res) => {
  try {
    // Obtén los datos necesarios de la solicitud
    const { buyOrder, sessionId, amount, returnUrl } = req.body;

    // Crea una transacción utilizando el SDK de Transbank
    const createResponse = await (new WebpayPlus.Transaction()).create(
        buyOrder, 
        sessionId, 
        amount, 
        returnUrl
      );

    // Extrae el token de la respuesta de Transbank
    const { token, url } = createResponse;

    // Devuelve el token como respuesta
    res.json({ token, url });
  } catch (error) {
    console.error('Error al iniciar la transacción:', error);
    res.status(500).json({ error: 'Error al iniciar la transacción' });
  }
});

module.exports = router;
