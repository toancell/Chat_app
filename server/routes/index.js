const express = require('express');
const { registerController } = require('../controller/registerController');
const {checkEmail}= require("../controller/checkEmail");
const {checkPassword}= require("../controller/checkPassword");
const {userDetail} = require('../controller/userDetail');
const updateUserDetail = require('../controller/updateUserDetail');
const logout = require('../controller/logout');
const {loginController} = require('../controller/loginController');
const searchUser = require('../controller/searchUser');
const {forgotPassword} = require('../controller/forgotPassword')
const router= express.Router();




router.post("/register", registerController)
router.post("/checkemail", checkEmail)
router.post("/checkpassword", checkPassword)
router.post("/login", loginController)
router.get("/user-detail", userDetail)
router.get("/logout",logout)
router.post("/update",updateUserDetail)
router.post("/search-user", searchUser)
router.post("/forgot-password", forgotPassword)

module.exports = router;