const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController')

//admin/login
router.get('/login',function (req,res) {
    res.render("login");
})
//admin/logout
router.get('/logOut',function (req,res) {
    req.session.username = null;
    res.render("login");
})

router.post("/checkLogin",loginController.checkLogin)

module.exports = router;