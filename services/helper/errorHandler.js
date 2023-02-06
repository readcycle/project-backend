const funcErrorHandler = (err, req, res, next) => {
  // console.log(err);
  let code = 500;
  let message = "Internal server error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = err.errors[0].message;
  }

  if (err.name === "image_not_found") {
    code = 400;
    message = "Image is required";
  }

  if (err.name === "book_not_found") {
    code = 404;
    message = "Book not found";
  }

  if (err.name === "bid_not_found") {
    code = 404;
    message = "Bid not found";
  }

  if (err.name === "not_found") {
    code = 404;
    message = "Data not found";
  }

  if (err.name === "empty_email") {
    code = 400;
    message = "Email is required";
  }

  if (err.name === "empty_password") {
    code = 400;
    message = "Password is required";
  }

  if (err.name === "wrong_email_password") {
    code = 401;
    message = "Wrong email or password";
  }

  if (err.name === "post_not_found") {
    code = 404;
    message = "Post not found";
  }

  if (err.name === "InvalidToken" || err.name === "JsonWebTokenError") {
    code = 401;
    message = "Invalid token";
  }

  if (err.name === "user_not_found") {
    code = 404;
    message = "User not found";
  }

  if (err.name === "genre_not_found") {
    code = 404;
    message = "Genre not found";
  }

  if (err.name === "report_not_found") {
    code = 404;
    message = "Report not found";
  }

  // if (err.name === "empty_latitude") {
  //   code = 400;
  //   message = "Latitude param cannot be empty";
  // }

  // if (err.name === "empty_longitude") {
  //   code = 400;
  //   message = "Longitude param cannot be empty";
  // }

  res.status(code).json({ message });
};

module.exports = { funcErrorHandler };
