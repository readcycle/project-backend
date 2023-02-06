function errorHandler(err, req, res, next) {
  let status = 500;
  let message = "Internal Server Error";
  console.log(err);
  switch (err.name) {
    case "id_query_required":
      status = 400;
      message = "Id query is required";
      break;

    default:
      break;
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
