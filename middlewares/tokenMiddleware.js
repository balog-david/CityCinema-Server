const { v4: uuidv4 } = require("uuid");

const tokenMiddleware = (req, res, next) => {
  let token = req.headers["x-user-token"];
  if (!token) {
    token = uuidv4();
    res.setHeader("x-user-token", token);
  }
  req.userToken = token;
  next();
};

module.exports = tokenMiddleware;
