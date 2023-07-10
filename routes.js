// api/routes.js
const express = require('express');
const router = express.Router();
const { WebpayPlus } = require('transbank-sdk');
const { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } = require("transbank-sdk"); // CommonJS

router.post('/pago', async (req, res) => {
  try {
    // Obtén los datos necesarios de la solicitud
    const { buyOrder, sessionId, amount, returnUrl } = req.body;

    //WebpayPlus.configureForProduction('597055555530', '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C');

    // Crea una transacción utilizando el SDK de Transbank
    const createResponse = await (new WebpayPlus.Transaction(new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration))).create(
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
