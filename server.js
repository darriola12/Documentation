const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Configuración de Sequelize
const sequelize = new Sequelize('contact_form', 'yourUsername', 'yourPassword', {
  host: '127.0.0.1',
  dialect: 'postgres'
});

// Define el modelo de Contacto
const Contact = sequelize.define('Contact', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Sincroniza el modelo con la base de datos
sequelize.sync().then(() => {
  console.log('Modelo sincronizado con la base de datos');
}).catch(err => {
  console.error('Error al sincronizar el modelo', err);
});

// Ruta para manejar los envíos de formulario
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await Contact.create({ name, email, message });
    res.status(200).json({ message: 'Contacto guardado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el contacto' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
