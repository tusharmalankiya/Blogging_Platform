const express = require('express');
const adminController = require('./../controllers/adminControllers');
const router = express.Router();
const { checkUser } = require("./../middlewares/checkUser");

//get
router.get('/login', checkUser, adminController.admin_login_get);
router.get('/logout', adminController.admin_logout);
router.get('/register', adminController.admin_register_get);

//post
router.post('/register', adminController.admin_register_post);
router.post('/login', adminController.admin_login_post);


module.exports = router;