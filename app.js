const express = require('express')
const app = express();
const cookieSession = require('cookie-session')
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');

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

const movieRouter = require('./router/movie')
const indexRouter = require('./router/index')
const loginRouter = require('./router/login')
const memberRouter = require('./router/member')

app.use('/admin',movieRouter);
app.use('/admin',indexRouter);
app.use('/admin',loginRouter);
app.use('/admin/member',memberRouter);

app.listen(3000,()=> console.log(`listen to port ${port}`));