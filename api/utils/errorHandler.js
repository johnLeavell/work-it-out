const notFound = (req, res, next) => {
  const { originalUrl } = req;
  const error = new Error(`Not Found - ${originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const { NODE_ENV } = process.env;
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
