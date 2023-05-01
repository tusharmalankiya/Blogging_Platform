const express = require('express')
const router = express.Router();
const commonControllers = require('./../controllers/commonControllers');

router.get('/', commonControllers.blogs_get);
router.get('/blogs/:blog_id', commonControllers.blog_get);
router.get('/blogs/author/:author_id', commonControllers.author_blogs);

module.exports = router;