export const requestLogger = (req, res, next) => {
  const date = new Date().toLocaleDateString();
  const url = req.url;
  const ip = req.ip;
  console.log(`${date} ${url} sa IPa ${ip}`);
  next();
};
