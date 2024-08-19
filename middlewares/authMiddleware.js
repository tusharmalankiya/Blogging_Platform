const jwt = require("jsonwebtoken");
const User = require("./../models/User");
require('dotenv').config();

module.exports.auth = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        res.redirect("/admin/login");
      } else {
        User.findById(decoded.id)
          .then(user => {
            console.log(user);
            if (user) {
              req.id = decoded.id;
              next();
            } else {
              res.redirect("/admin/login");
            }
          }).catch(err => {
            console.log(err);
          })
        // console.log(decoded);
      }
    });
  } else {
    res.redirect("/admin/login");
  }
};
