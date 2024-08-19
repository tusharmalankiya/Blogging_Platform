const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("./../models/User");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log(err);
        next();
      } else {
        try {
          const user = await User.findById(decoded.id);
          if (user) {
            req.id = decoded.id;
          }
          next();
        } catch (err) {
          console.log(err);
        }
      }
    });
  } else {
    next();
  }
};
