const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users.routes')

require('dotenv').config();

// Rutas

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

// Middlewares para cliente

app.use(cors());

app.use(express.json());
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Base de datos conectada');
  } catch (err) {
    console.error('No se ha podido iniciar la base de datos');
  }

  app.listen(process.env.PORT, () =>
    console.log('Servidor en ejecución en el puerto 3000')
  );
};

// Uso de rutas

startServer();
