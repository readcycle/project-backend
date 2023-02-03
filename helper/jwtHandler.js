const jwt = require("jsonwebtoken");

const tokenize = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY);
};

const detokenize = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports = { tokenize, detokenize };
