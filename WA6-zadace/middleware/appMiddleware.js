export const logger = (req, res, next) => {
  console.log(
    `[movie-server] [${new Date().toISOString()}] ${req.method} ${req.url}`,
  );
  next();
};
