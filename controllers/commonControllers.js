//imports from files
const Blog = require("./../models/Blog");
const Comment = require("./../models/Comment");

module.exports.blogs_get = async (req, res) => {
  const data = [];
  Blog.find().sort({createdAt: -1})
    .populate("author_id")
    .then((blogs) => {
      blogs.forEach((blog) => {
        const obj = blog.toJSON();
        const dataObj = {};
        const keys = Object.keys(obj);
        keys.forEach((key) => {
          if (key !== "author_id") {
            dataObj[key] = obj[key];
          } else {
            (dataObj["firstname"] = obj.author_id["firstname"]),
              (dataObj["lastname"] = obj.author_id["lastname"]),
              (dataObj["email"] = obj.author_id["email"]),
              (dataObj["username"] = obj.author_id["username"]);
            dataObj["author_id"] = obj.author_id["_id"];
          }
        });
        // console.log(dataObj);
        data.push(dataObj);
      });
      res.status(200).render("index", { blogs: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("<h1>Something went wrong </h1>");
    });

  // Blog.find().sort({createdAt: -1})
  //   .then((blogs) => {
  //     console.log(blogs);
  //     res.status(200).render("index", { blogs });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(400).send("<h1>Something went wrong </h1>");
  //   });
};

module.exports.blog_get = async (req, res) => {
  id = req.id;
  const blog_id = req.params.blog_id;
  const comments = await get_comments(blog_id);
  // console.log(comments);
  try{
    const blog = await Blog.findById(blog_id);
    if(!blog){
      return res.render('404');
    }
    if(id){
      console.log(`********************\n${id}\n`);
      blog.this_user_id = id;
    }
    // console.log({...blog, ...comments});
    res.render('full_blog', {blog, comments});
  }catch(err){
    console.log(err);
  }
};

module.exports.author_blogs = (req, res) => {
  const author_id = req.params.author_id;
  Blog.find({ author_id })
    .then((blogs) => {
      // console.log(blogs);
      // res.json(blogs);
      res.render("author_blogs", { blogs });
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "error occured" });
    });
};


//--------------dev routes-------------------------
const get_comments = async (blog_id) => {
  // const blog_id = req.params.blog_id;
  try{
    const comments = await Comment.find({blog_id}).sort({createdAt: 1}).populate('user_id');
    const data = [];
    comments.forEach(async (comment)=>{
      const dataObj = {};
      dataObj.comment_id = comment._id;
      dataObj.user_id = comment.user_id._id;
      dataObj.comment = comment.comment;
      dataObj.firstname = comment.user_id.firstname;
      dataObj.lastname = comment.user_id.lastname;
      dataObj.createdAt = comment.createdAt;
      data.push(dataObj);
      // console.log(comment);
    });

    return data;
    // res.json(data);

  }catch(err){
    console.log(err);
  }
}
