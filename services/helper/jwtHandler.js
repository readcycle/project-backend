const jwt = require("jsonwebtoken");
const secret = 'CHARLIXCX'

const tokenize = (payload) => {
  return jwt.sign(payload, secret);
};

const detokenize = (token) => {
  return jwt.verify(token, secret);
};

module.exports = { tokenize, detokenize };
