const express = require('express');
const adminController = require('./../controllers/adminControllers');
const router = express.Router();
const { checkUser } = require("./../middlewares/checkUser");

//get
router.get('/login', checkUser, adminController.admin_login_get);
router.get('/logout', adminController.admin_logout);
router.get('/register', adminController.admin_register_get);
router.get('/reset-password', adminController.reset_password_get);


//post
router.post('/register', adminController.admin_register_post);
router.post('/login', adminController.admin_login_post);
router.post('/reset-password',adminController.reset_password);


module.exports = router;