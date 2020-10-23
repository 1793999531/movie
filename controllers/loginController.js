const loginModel = require('../models/loginModel');
function  checkLogin(req,res) {
    loginModel.check(req,res)
}

module.exports = {
    checkLogin
}