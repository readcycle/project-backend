function errorHandler(err, req, res, next) {
  let status;
  let message;
  console.log(err);

  switch (err.name) {
    case "post_not_found":
      status = 404;
      message = "Post not found";
      break;
    case "SequelizeValidationError" || "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0].message;
      break;
    default:
      status = 500;
      message = "Internal server error";
      break;
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
