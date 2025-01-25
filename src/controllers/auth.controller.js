import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  const {username, email, password} = req.body

  //create user
  try {
    const newUser = new User({
      username, 
      email, 
      password
    });

    const userSaved = await newUser.save();
    //devolver el dato al frontend:
    res.json(userSaved);
  } catch (error) {
    console.log(error);
  }
};

export const login = (req, res) => res.send('Login');