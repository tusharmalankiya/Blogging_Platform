const User = require("./../models/User");
const Blog = require("../models/Blog");

const errorHandler = (err) => {
  // console.log(err);
  // console.log(err.message);
  const errors = {
    title: "",
    description: "",
  };

  if (err.message.includes("blog validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.admin_get = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(200).redirect("/admin/login");
  }
  // res.cookie('jwt','token');
  return res.status(200).render("admin/index");
};

module.exports.admin_blog_get = (req, res) => {
  res.render("admin/post_blog");
};

module.exports.admin_blog_post = (req, res) => {
  // const data = req.body;
  const id = req.id;
  Blog.create({ ...req.body, author: id })
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
    const blogs = await Blog.find({ author: id }).sort({createdAt:-1});
    res.status(200).render('admin/blogs', {blogs});
  } catch (err) {
    console.log(err);
  }
};
