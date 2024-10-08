const User = require("./../models/User");
const Blog = require("../models/Blog");
const Comment = require("./../models/Comment");
const errorHandler = require("./errorHandler");
const fs = require('fs').promises;

async function deleteFile(path) {
  try {
    await fs.unlink(path);
    console.log(`File ${path} deleted successfully`);
  } catch (err) {
    console.error('Error deleting file:', err);
  }
}

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
  // console.log(user);
  // res.cookie('jwt','token');
  return res.status(200).render("admin/index", {
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    phone: user.phone ? user.phone : "",
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
};

module.exports.admin_blog_get = (req, res) => {
  res.render("admin/post_blog");
};

module.exports.admin_blog_post = (req, res) => {
  // const data = req.body;
  const id = req.id;
  // console.log(req.file);
  // console.log(req.body);
  const data = {
    author_id: id,
    title: req.body.title,
    description: req.body.description,
  };

  if (req.file) {
    console.log(req.file);
    data.image = `/assets/uploads/${req.file.filename}`;
    data.imageFilepath = req.file.path;
  }

  // console.log(data);

  Blog.create(data)
    .then((blog) => {
      res.json(blog);
    })
    .catch((err) => {
      const errors = errorHandler(err);
      console.log(err);
      res.json(errors);
    });
};


module.exports.comment_post = async (req, res) =>{
  const user_id = req.id;
  const blog_id = req.params.blog_id;

  data = {
    user_id,
    blog_id,
    comment: req.body.comment
  }
  console.log(data);
  
  try{
    const comment = await Comment.create(data);
    res.json({ status: "success", comment });
  } catch (err){
    console.log(err);
  }
}

module.exports.admin_blogs_get = async (req, res) => {
  const id = req.id;
  try {
    const blogs = await Blog.find({ author_id: id }).sort({ updatedAt: -1 });
    res.status(200).render("admin/blogs", { blogs });
  } catch (err) {
    console.log(err);
  }
};

module.exports.profile_update = async (req, res) => {
  const id = req.id;
  // console.log(req.body);
  try {
    const user = await User.findById(id);
    const UpdateQueryKeys = Object.keys(req.body);
    UpdateQueryKeys.forEach((key) => {
      user[key] = req.body[key];
    });
    const newUser = await user.save();
    // console.log(newUser);
    res.json({ status: "success", newUser });
  } catch (err) {
    const errors = errorHandler(err);
    console.log(err);
    res.json({ status: "failed", errors });
  }
};

module.exports.admin_manage = async (req, res) => {
  res.render("admin/manage");
};

module.exports.update_password = async (req, res) => {
  const id = req.id;
  // console.log(req.body);
  try {
    const user = await User.findById(id);
    user.password = req.body.password;
    const newUser = await user.save();
    // const user = await User.findByIdAndUpdate(id, req.body);
    // console.log(newUser);
    res.json({ status: "success", user });
  } catch (err) {
    const errors = errorHandler(err);
    console.log(err);
    res.json({ status: "failed", errors });
  }
};

module.exports.remove_phone = async (req, res) => {
  const id = req.id;
  try {
    const user = await User.findByIdAndUpdate(id, { $unset: { phone: 1 } });
    // console.log(user);
    res.json({ status: "success" });
  } catch (err) {
    console.log(err);
    res.json({ status: "failed" });
  }
};

//edit blog
module.exports.edit_blog_get = async (req, res) => {
  const blog_id = req.params.blog_id;
  try {
    const blog = await Blog.findById(blog_id);
    if(!blog){
      return res.render('404');
    }
    // const blog = JSON.stringify(blog_data);
    // console.log(blog);
    res.render("admin/edit_blog", { blog });
  } catch (err) {
    console.log(err);
  }
};

module.exports.edit_blog = async (req, res) => {
  const blog_id = req.params.blog_id;
  data = {
    title: req.body.title,
    description: req.body.description
  };

  if(req.file){
    data.imageFilepath = req.file.path;
    data.image = `/assets/uploads/${req.file.filename}`;

    // delete old image
    const old_blog = await Blog.findById(blog_id);
    deleteFile(old_blog.imageFilepath);
  }
  // console.log(data);
  try {

    await Blog.findByIdAndUpdate(blog_id, data);

    res.setHeader('Cache-Control', 'max-age=0, must-revalidate');
    res.json({ status: "success" });
  } catch (err) {
    res.json({ status: "error occured" });
    console.log(err);
  }
};

//delete blog

module.exports.delete_blog = async (req, res) => {
  const blog_id = req.params.blog_id;
  try {
    const blog = await Blog.findByIdAndDelete(blog_id);
    console.log(blog);
    if(blog.imageFilepath){
      deleteFile(blog.imageFilepath);
    }
    const comments = await Comment.deleteMany({blog_id});
    console.log(comments);
    res.json({ status: "success", blog });
  } catch (err) {
    res.json({ status: "error occured" });
    console.log(err);
  }
};

module.exports.delete_comment = async (req, res) => {
  console.log(req.body);
  const comment_id = req.body.comment_id;
  try {
    const comment = await Comment.findByIdAndDelete(comment_id);
    console.log(comment);
   
    res.json({ status: "success" });
  } catch (err) {
    res.json({ status: "error occured" });
    console.log(err);
  }
};


module.exports.delete_account = async (req, res) =>{
  const user_id = req.id;
  try{
    const blogs = await Blog.find({author_id: user_id});
    blogs.forEach(blog=>{
      if(blog.imageFilepath){
        deleteFile(blog.imageFilepath);
      }
    });
    const deleted_blogs = await Blog.deleteMany({author_id: user_id});
    console.log(deleted_blogs);
    const comments = await Comment.deleteMany({user_id});
    console.log(comments);
    const user = await User.findByIdAndDelete(user_id);
    console.log(user);
    res.json({status: "success"});
    
  }catch(err){
    console.log(err);
  }
}

//---------------------dev-modules------------------------------------------//
//multer-test
module.exports.multer_test = (req, res) => {
  console.log(req.file);
  console.log(req.body.title);
  console.log(JSON.stringify(req.body));
  res.json(req.body);
};

//update all blogs image
module.exports.update_all_blogs_img = async (req, res) => {
  try {
    const blogs = await Blog.updateMany(
      {},
      { image: "/assets/uploads/blog_img.jpg" }
    );
    console.log(blogs);
    res.json({ blogs });
  } catch (err) {
    console.log(err);
    res.json({ msg: "error occured" });
  }
};

//delete-all-blogs
module.exports.delete_all_blogs = async (req, res) => {
  try {
    const all_blogs = await Blog.find();
    console.log(all_blogs);
    const blogs = await Blog.deleteMany({});
    console.log(blogs);
    
    // // Iterate over each filepath and delete it
    for (const blog of all_blogs) {
      // const filePath = path.join(directoryPath, file);
      if(blog.imageFilepath){
        await fs.unlink(blog.imageFilepath);
        console.log(`Deleted file: ${blog.imageFilepath}`);
      }
    }
    console.log('All files deleted successfully.');

    res.status(200).json(blogs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
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

module.exports.edit_blog_image = async (req, res) => {
  const blog_id = req.params.blog_id;
  data = {
    imageFilepath : req.file.path,
    image: `/assets/uploads/${req.file.filename}`
  }

  try {
    const old_blog = await Blog.findById(blog_id);
    deleteFile(old_blog.imageFilepath);

    const blog = await Blog.findByIdAndUpdate(blog_id, data, {new: true});
    // console.log(blog);
    res.setHeader('Cache-Control', 'max-age=0, must-revalidate');

    res.json({ status: "success", image: blog.image });
  } catch (err) {
    res.json({ status: "error occured" });
    console.log(err);
  }
};