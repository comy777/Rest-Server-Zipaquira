const jwt = require("jsonwebtoken");

const generateToken = (uid) => {
  const payload = { uid };
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "2hr",
  });
};

module.exports = {
  generateToken,
};
