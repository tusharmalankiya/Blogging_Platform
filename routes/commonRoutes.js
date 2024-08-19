const express = require("express");

const router = express.Router();
const commonControllers = require("./../controllers/commonControllers");
const { checkUser } = require("./../middlewares/checkUser");

router.get("/", commonControllers.blogs_get);
router.get("/blogs/:blog_id", checkUser, commonControllers.blog_get);
router.get("/blogs/author/:author_id", commonControllers.author_blogs);


//--------------dev-routes--------------------//
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });

const authRoutes = require("./../controllers/authControllers");

// router.get("/get-comments/:blog_id", commonControllers.get_comments);

router.post("/multer-test", upload.single("file1"), authRoutes.multer_test);

router.patch("/update-all-blogs-img", authRoutes.update_all_blogs_img);

module.exports = router;
