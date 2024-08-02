const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas básicas
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((err, req, res, next) => {
    console.error(err.stack); // Imprime el stack trace del error en la consola
    res.status(500).send('Something broke!'); // Envía una respuesta con un estado 500 y un mensaje de error
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
