const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        next();
      } else {
        req.id = decoded.id;
        next();
      }
    });
  } else {
    next();
  }
};
