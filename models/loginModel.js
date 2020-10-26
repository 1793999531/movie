const md5 = require('md5');
const salt = require('../config/salt');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/moviedb'); //连接数据库

const adminModel = mongoose.model('Admin', { username: String, password: String });//admins表模型
//后台登录检查
function check(req,res) {

    let username = req.body.username;
    let password = req.body.password;
    let md5pass = md5(md5(password)+salt.salt);//加盐进行双重加密，防止暴力破解
    console.log(username,password,md5pass,salt);
    adminModel.find({username:username,password:md5pass}).exec((error,data)=>{ //查找movie表的所有数据
        if(error){
            console.log("意外失败")
        }
        if(data.length){ //登录成功
            req.session.username = username; //设置登录状态
            res.render("index",{data});
        }else{
            res.render("login")
        }


    })
}

module.exports = {
    check
}