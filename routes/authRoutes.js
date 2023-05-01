const express = require('express')
const authRoutes = require('./../controllers/authControllers');

const router = express.Router();

//get
router.get('/', authRoutes.admin_get );
router.get('/blog', authRoutes.admin_blog_get);
router.get('/blogs', authRoutes.admin_blogs_get);

//post
router.post('/blog', authRoutes.admin_blog_post);

//update

//delete all blogs
router.delete('/delete-users', authRoutes.delete_all_users);
router.delete('/delete-blogs', authRoutes.delete_all_blogs);

module.exports = router;