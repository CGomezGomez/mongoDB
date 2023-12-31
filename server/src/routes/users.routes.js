const express = require('express');
const userRoutes = express.Router();
const controller = require('../controllers/users.controller');

// Obtener todos los usuarios
userRoutes.get('/', controller.allUsers);

// Crear un usuario
userRoutes.post('/', controller.createUser);

// Actualizar un usuario
userRoutes.patch('/:id', controller.updateUser);

// Eliminar un usuario
userRoutes.delete('/:id', controller.deleteUser);

module.exports = userRoutes;