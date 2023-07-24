const fs = require('fs');
const path = require('path');
const { v4 } = require('uuid');
const UserModel = require('../../schemes/user.scheme')

const controller = {};

// Obtener todos los usuarios
controller.allUsers = async (req, res) => {
    
    try{
        
        const users = await UserModel.find();
        res.send(users);

    }catch(err){

        res.status(500).send({ error : ' Error al leer la base de datos '});
    }
    
  
};

// Obtener un usuario por id
controller.userById = (req, res) => {
  fs.readFile(usersFile, 'utf8', (err, data) => {
    if (err) return res.send({ error: 'Error al leer el archivo de usuarios' });

    const users = JSON.parse(data);
    const user = users.find(user => user.userId === req.params.id);

    if (!user) return res.status(404).send({ error: 'Usuario no encontrado' });
    res.send(user);
  });
};

// Crear un usuario nuevo
controller.createUser = async (req, res) => {
  
    let users = await UserModel.find();

    const userExist = users.some(user => user.email === req.body.email);

    if (userExist) return res.status(409).send({ error: 'Ya existe un usuario con ese email' });

    const { name, email } = req.body;
    const newUser = UserModel({
      _id: v4(),
      name,
      email
    });

    await newUser.save()

    users = await UserModel.find();

    res.send(users)
};

controller.updateUser = async (req, res) => {

  let user = await UserModel.findById(req.params.id);

  if(!user){
   return res.status(409).send({error: 'User not exist'});
  }

  const {name , email} = req.body;

  user.name = name;
  user.email = email;

  await user.save()

  const users = await UserModel.find()

  res.send(users);

    
};

controller.deleteUser = async (req, res) => {

    let user = await UserModel.findById(req.params.id);

   if(!user){
    return res.status(409).send({error: 'User not exist'});
   }

   await user.deleteOne();

   const users = await UserModel.find();

   res.send(users);
};

module.exports = controller;
