const { Router } = require("express");
const { check } = require("express-validator");
const { login, register } = require("../controller/auth");
const { validate } = require("../middlewares/validate");

const router = Router();

router.post(
  "/login",
  [
    check("correo", "Correo requerido o no valido").isEmail(),
    check("password", "La contraseña es requerida").notEmpty(),
    validate,
  ],
  login
);

router.post(
  "/register",
  [
    check("correo", "Correo requerido o no valido").isEmail(),
    check("password", "La contraseña debe tener mas de 8 caracteres").isLength({
      min: 8,
    }),
    validate,
  ],
  register
);

module.exports = router;
