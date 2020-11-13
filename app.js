const express = require('express')
const app = express();
const cookieSession = require('cookie-session')
const cors = require('cors');
const {sitePort} = require('./config/siteConfig');
const path = require('path');
const bodyParser = require('body-parser');

app.use(cors()); //开启允许跨域

//bodypaser cookieSession 这些配置要放在引入之前
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieSession({ //cookie配置
    name: 'sessionId',
    keys: ["aaskdflasdfjlajsdfb"],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(express.static("public"))
// view engine setup    art-template配置
app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

const movieRouter = require('./router/movie')   //电影路由
const indexRouter = require('./router/index')   //后台首页路由
const loginRouter = require('./router/login')   //登录路由
const memberRouter = require('./router/member') //后台会员路由
const movieApiRouter = require('./router/api/movie') //电影api路由
const registerApiRouter = require('./router/api/register')  //注册api路由
const frontLoginApiRouter = require('./router/api/frontLogin')  //登录api路由
const commentApiRouter = require('./router/api/comment')  //登录api路由

app.use('/admin',movieRouter);
app.use('/admin',indexRouter);
app.use('/admin',loginRouter);
app.use('/admin/member',memberRouter);
app.use('/api/v1/movie',movieApiRouter);
app.use('/api/v1/register',registerApiRouter);
app.use('/api/v1/frontLogin',frontLoginApiRouter);
app.use('/api/v1/comment',commentApiRouter);

app.listen(sitePort,()=> console.log(`listen to port ${sitePort}`));