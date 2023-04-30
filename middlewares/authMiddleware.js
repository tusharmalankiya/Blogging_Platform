const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports.auth = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        res.render("admin/login");
      } else {
        req.id = decoded.id;
        // console.log(decoded);
        next();
      }
    });
  } else {
    res.render("admin/login");
  }
};
