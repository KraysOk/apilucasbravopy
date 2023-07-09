// api/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');

app.use(cors());
app.use(express.json());

app.use('/api', routes);

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Servidor API iniciado en el puerto ${PORT}`);
});
