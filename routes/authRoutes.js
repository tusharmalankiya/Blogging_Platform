const express = require('express')

const multer = require('multer');
const upload = multer({dest: './public/uploads/'});

const authRoutes = require('./../controllers/authControllers');

const router = express.Router();

//get
router.get('/', authRoutes.admin_get );
router.get('/blog', authRoutes.admin_blog_get);
router.get('/blogs', authRoutes.admin_blogs_get);
router.get('/manage', authRoutes.admin_manage);
router.get('/edit-blog/:blog_id', authRoutes.edit_blog_get);

//post
router.post('/blog', upload.single('blog_img'), authRoutes.admin_blog_post);
router.post('/comment/:blog_id', authRoutes.comment_post);

//update
router.patch('/update', authRoutes.profile_update);
router.patch('/update-password', authRoutes.update_password);

router.patch('/edit-blog/:blog_id',upload.single('img'), authRoutes.edit_blog);


//delete
router.delete('/remove-phone', authRoutes.remove_phone);
router.delete('/delete-blog/:blog_id', authRoutes.delete_blog);
router.delete('/delete-comment',authRoutes.delete_comment);
router.delete('/delete-account', authRoutes.delete_account);


//----------------dev-routes-------------------------------//
router.delete('/delete-users', authRoutes.delete_all_users);
router.delete('/delete-blogs', authRoutes.delete_all_blogs);
router.patch('/edit-blog-image/:blog_id',upload.single('img'), authRoutes.edit_blog_image);

module.exports = router;