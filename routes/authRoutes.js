const express = require('express')
const authRoutes = require('./../controllers/authControllers');

const router = express.Router();

//get
router.get('/', authRoutes.admin_get );
router.get('/blog', authRoutes.admin_blog_get);
router.get('/blogs', authRoutes.admin_blogs_get);
router.get('/manage', authRoutes.admin_manage);

//post
router.post('/blog', authRoutes.admin_blog_post);

//update
router.patch('/update', authRoutes.profile_update);
router.patch('/update-password', authRoutes.update_password);

//delete all blogs
router.delete('/delete-users', authRoutes.delete_all_users);
router.delete('/delete-blogs', authRoutes.delete_all_blogs);

module.exports = router;