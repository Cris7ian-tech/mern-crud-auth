import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

import {createAccesToken} from '../libs/jwt.js';




export const register = async (req, res) => {
  const {username, email, password} = req.body

  //create user
  try {

    //hash password
    const passwordHash = await bcrypt.hash(password, 10); 

    const newUser = new User({
      username, 
      email, 
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token =await createAccesToken({id: userSaved._id});
    
    res.cookie("token", token);
    //devolver el dato al frontend:
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({message: "Error al registrar usuario"});
    console.log(error);
  }
};

export const login = async (req, res) => {
  const {email, password} = req.body

  //create user
  try {
    const userFound = await User.findOne({email})

    if(!userFound) return res.status(400).json({message: "Usuario no encontrado"});
    
    //si encuentra el usuario: compara
    const isMatch = await bcrypt.compare(password, userFound.password); 

    if(!isMatch) return res.status(400).json({message: "Contraseña incorrecta"});


    const token =await createAccesToken({id: userFound._id});
    
    res.cookie("token", token);
    //devolver el dato al frontend:
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({message: "Usuario no encontrado"});
    console.log(error);
  }
};

export const logout = (req, res) => {
  res.cookie = ('token', "", {
    expires: new Date(0)
  });
  return res.sendStatus(200);
}