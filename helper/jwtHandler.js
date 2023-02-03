const jwt = require("jsonwebtoken");

export const tokenize = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY);
};

export const detokenize = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
