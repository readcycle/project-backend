const { Admin } = require("../models");
const { funcValidateHash } = require("../helper/bcryptHandler");
const { tokenize } = require("../helper/jwtHandler");

class Administrator {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const newAdmin = await Admin.create({ email, password });

      res.status(201).json({ id: newAdmin.id, email: newAdmin.email });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "empty_email" };
      if (!password) throw { name: "empty_password" };

      const admin = await Admin.findOne({ where: { email } });
      if (!admin) throw { name: "wrong_email_password" };

      // const validPwd = comparePwd(password, admin.password)
      const validPwd = funcValidateHash(admin.password, password);
      if (!validPwd) throw { name: "wrong_email_password" };

      res.status(200).json({
        access_token: tokenize({ id: admin.id, email: admin.email }),
        email: admin.email,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Administrator;
