const User = require("./../models/User");
const Blog = require("../models/Blog");
const errorHandler = require('./errorHandler');


// const errorHandler = (err) => {
//   // console.log(err);
//   // console.log(err.message);
//   const errors = {
//     title: "",
//     description: "",
//   };


//   return errors;
// };

module.exports.admin_get = async (req, res) => {
  // const token = req.cookies.token;
  // if (!token) {
  //   return res.status(200).redirect("/admin/login");
  // }
  const user = await User.findById(req.id);
  console.log(user);
  // res.cookie('jwt','token');
  return res
    .status(200)
    .render("admin/index", {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      phone: user.phone ? user.phone : "" ,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
};

module.exports.admin_blog_get = (req, res) => {
  res.render("admin/post_blog");
};

module.exports.admin_blog_post = (req, res) => {
  // const data = req.body;
  const id = req.id;
  Blog.create({ ...req.body, author_id: id })
    .then((blog) => {
      res.json(blog);
    })
    .catch((err) => {
      const errors = errorHandler(err);
      // console.log(err);0
      res.json(errors);
    });
};

module.exports.admin_blogs_get = async (req, res) => {
  const id = req.id;
  try {
    const blogs = await Blog.find({ author_id: id }).sort({ createdAt: -1 });
    res.status(200).render("admin/blogs", { blogs });
  } catch (err) {
    console.log(err);
  }
};

//delete-all-users
module.exports.delete_all_users = async (req, res) => {
  try {
    const users = await User.deleteMany({});
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
};

module.exports.profile_update = async (req, res )=>{
  const id = req.id;
  console.log(req.body);
  try{
    const user = await User.findById(id);
    const UpdateQueryKeys = Object.keys(req.body);
    UpdateQueryKeys.forEach(key=>{
      user[key] = req.body[key];
    });
    const newUser = await user.save();
    console.log(newUser);
    res.json({status:'success', newUser});
  }catch(err){
    const errors = errorHandler(err);
    console.log(err);
    res.json({status:"failed", errors});
  }
}

module.exports.admin_manage = async (req, res) =>{
  res.render('admin/manage');
}

module.exports.update_password = async (req, res) =>{
  const id = req.id;
  console.log(req.body);
  try{
    const user = await User.findById(id);
    user.password = req.body.password;
    const newUser = await user.save();
    // const user = await User.findByIdAndUpdate(id, req.body);
    console.log(newUser);
    res.json({status:'success', user});
  }catch(err){
    const errors = errorHandler(err);
    console.log(err);
    res.json({status:"failed", errors});
  }
}

//delete-all-blogs
module.exports.delete_all_blogs = async (req, res) => {
  try {
    const blogs = await Blog.deleteMany({});
    res.status(200).json(blogs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
};
