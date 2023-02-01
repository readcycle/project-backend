class UserController {
  static getAllUsers(req, res, next) {
    res.status(200).json({ message: "Success get all users" });
  }

  static getUserById(req, res, next) {
    res.status(200).json({ message: "Success get user" });
  }

  static userEditProfile(req, res, next) {
    res.status(200).json({ message: "Success edit user profile" });
  }

  static userIsBannedStatus(req, res, next) {
    res.status(200).json({ message: "Success update isBanned status" });
  }
}

class UserAuthenticationController {
  static userLogin(req, res, next) {
    res.status(200).json({ message: "You successfully login" });
  }

  static userRegister(req, res, next) {
    res.status(201).json({ message: "You succesfully register" });
  }
}

module.exports = { UserController, UserAuthenticationController };
