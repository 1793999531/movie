const express = require('express')
const app = express();
const router = express.Router()
const cookieSession = require('cookie-session')

app.use(cookieSession({ //cookie配置
    name: 'sessionId',
    keys: ["aaskdflasdfjlajsdfb"],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
//admin/index
router.get('/index',function (req,res) {
    if(!req.session.username){
        res.render("login");
        return;
    }
    // console.log(req.session)
    res.render("index")
})

//admin/welcome
router.get('/welcome',function (req,res) {
    res.render("welcome")
})

module.exports = router;