// const { model } = require("mongoose");
const User = require("./../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const errorHandler = require('./errorHandler');
// module.exports = errorHandler;
//generate jwt token
const maxAge = Number(process.env.TOKEN_AGE);
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
};


//get requests controllers
module.exports.admin_login_get = (req, res) => {
  const id = req.id;
  // console.log(req.id);
  if (id) {
    return res.redirect("/admin/blogs");
  }
  return res.render("admin/login");
};

module.exports.admin_register_get = (req, res) =>{
  res.status(200).render('admin/register');
}


//post requests controllers
module.exports.admin_register_post = (req, res) => {
  // console.log(req.body);
  User.create(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      const errors = errorHandler(err)
      // console.log(err);
      res.status(400).json({errors});
    });
};

module.exports.admin_login_post = async (req, res) => {
  const data = req.body;
  try {
    const user = await User.login(data.email, data.password);
    const token = createToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: process.env.TOKEN_AGE * 1000,
    });
    res.status(200).json({ user: user._id });
  } catch (err) {
    console.log(err);
    const errors = errorHandler(err);
    return res.status(401).json({errors});
  }
};

module.exports.admin_logout = (req, res) =>{
  res.cookie('token', '', { maxAge: 1 });
  res.redirect('/admin/login');
  // res.json({status:"true", msg:"logged out"});
}


module.exports.reset_password_get = (req, res) =>{
  res.status(200).render('admin/reset_password');
}


module.exports.reset_password = async (req, res) =>{
  try {
    const user = await User.findOne({email:req.body.email});
    // const user = await User.findByIdAndUpdate(id, req.body);
    // console.log(newUser);
    if(user){
      user.password = req.body.password;
      await user.save();
      res.status(201).json({status: "success", user });
    }else{
      res.json({errors: {email: "Account does not exist for given email"}});
    }
  } catch (err) {
    const errors = errorHandler(err);
    console.log(err.message);
    res.json({ status: "failed", errors });
  }

}