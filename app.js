const express = require('express')
const app = express();
const md5 = require('md5');
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const salt = require('./config/salt');
const movieRouter = require('./router/movie')
app.use('/admin',movieRouter);
console.log(salt.salt);
var cookieSession = require('cookie-session')
const mongoose = require('mongoose');

app.use(cookieSession({ //cookie配置
    name: 'sessionId',
    keys: ["aaskdflasdfjlajsdfb"],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
mongoose.connect('mongodb://localhost/moviedb'); //连接数据库

const adminModel = mongoose.model('Admin', { username: String, password: String });//admins表模型
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static("public"))
// view engine setup    art-template配置
app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//admin/login
app.get('/admin/login',function (req,res) {
        res.render("login");
})
//admin/logout
app.get('/admin/logOut',function (req,res) {
    req.session.username = null;
    res.render("login");
})
app.post("/admin/checkLogin",function (req,res) {
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
            // console.log(data,username);
            res.render("index",{data});
        }else{
            res.render("login")
        }


    })
})


//admin/index
app.get('/admin/index',function (req,res) {
    if(!req.session.username){
        res.render("login");
        return;
    }
    // console.log(req.session.username)
    res.render("index")
})

//admin/welcome
app.get('/admin/welcome',function (req,res) {
    res.render("welcome")
})



app.get('/admin/a',function (req,res) {
    res.render("a")
})







app.listen(3000,()=> console.log(`listen to port ${port}`));