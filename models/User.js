const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  nombre: {
    type: String,
    default: "",
  },
  correo: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("users", UserSchema);
