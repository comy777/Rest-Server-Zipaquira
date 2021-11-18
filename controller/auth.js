const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../helpers/jwt");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;
  const user = await User.findOne({ correo });
  if (!user) {
    return res.status(401).json({
      message: "Usuario no registrado",
    });
  }
  const validatePassword = await bcrypt.compare(password, user.password);
  if (!validatePassword) {
    return res.status(401).json({
      message: "Correo y contraseña no coinciden",
    });
  }
  const { uid } = user;
  const token = generateToken(uid);
  res.status(200).json({
    token,
  });
};

const register = async (req = request, res = response) => {
  const { correo, password } = req.body;
  let user = await User.findOne({ correo });
  if (user) {
    return res.status(401).json({
      message: "Usuario ya se encuentra registrado",
    });
  }
  user = new User(req.body);
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);
  await user.save();
  res.status(200).json({
    message: "Usuario registrado exitosamente",
  });
};

module.exports = { login, register };
