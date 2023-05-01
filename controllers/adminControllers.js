const { model } = require("mongoose");
const User = require("./../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const errorHandler = (err) =>{
  console.log(err.message);
  const errors = {
    firstname:'',
    lastname: '',
    username: '',
    phone: '',
    email: '',
    password: ''
  }
  if(err.message === 'incorrect email'){
    errors.email = err.message;
  }

  if(err.message === 'incorrect password'){
    errors.password = err.message;
  }


  if(err.code === 11000){
    // console.log(err.code)
    console.log(err.keyValue);
    if(err.keyValue.email){
    errors.email = 'email is already exists';
    }
    if(err.keyValue.username){
      errors.username = 'username is already exists';
    }
    if(err.keyValue.phone){
      errors.phone = "phone numer is already exists";
    }
  }

  if(err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({properties})=>{
      errors[properties.path] = properties.message;
    })
  }

  return errors;
}

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
  console.log(req.id);
  if (id) {
    return res.redirect("/admin");
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
    const errors = errorHandler(err);
    return res.status(401).json(errors);
  }
};

module.exports.admin_logout = (req, res) =>{
  res.cookie('token', '', { maxAge: 1 });
  res.redirect('/admin/login');
  // res.json({status:"true", msg:"logged out"});
}