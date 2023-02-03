class UserController {
  static getAllUsers(req, res, next) {
    res.status(200).json({ message: "Success get all users" });
  }

  static getUserById(req, res, next) {
    const { id } = req.params;
    res.status(200).json({ message: `Success get user with id : ${id}` });
  }

  static userEditProfile(req, res, next) {
    const { id } = req.params;
    res
      .status(200)
      .json({ message: `Success edit user profile with id : ${id}` });
  }

  static userIsBannedStatus(req, res, next) {
    const { id } = req.params;
    res
      .status(200)
      .json({
        message: `Success update isBanned status of user with id : ${id}`,
      });
  }
}

class UserAuthenticationController {
  static userLogin(req, res, next) {
    res.status(200).json({ message: "You successfully login" });
  }

  static userRegister(req, res, next) {
    res.status(201).json({ message: "You successfully register" });
  }
}

module.exports = { UserController, UserAuthenticationController };
