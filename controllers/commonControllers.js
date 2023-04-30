//imports from files
const Blog = require("./../models/Blog");

module.exports.blogs_get = (req, res) => {
  Blog.find({}).sort({createdAt: -1})
    .then((blogs) => {
      console.log(blogs);
      res.status(200).render("index", { blogs });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("<h1>Something went wrong </h1>");
      // res.json({msg:"error occured"});
    });

  // res.status(201).send('<h1>status 200</h1>');
};

module.exports.blog_get = (req, res) => {};

module.exports.author_blogs = (req, res) => {
  const author = req.params.author;
  Blog.find({ author })
    .then((blogs) => {
      res.json(blogs);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "error occured" });
    });
};
