const bcryptjs = require("bcryptjs");

const funcHashValue = (value) => {
  return bcryptjs.hashSync(value);
};

const funcValidateHash = (hashedValue, compared) => {
  return bcryptjs.compareSync(compared, hashedValue);
};

module.exports = { funcHashValue, funcValidateHash };
