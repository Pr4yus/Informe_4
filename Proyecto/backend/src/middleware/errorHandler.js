
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  console.error(err.stack);

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null 
  });
};

export default errorHandler;
