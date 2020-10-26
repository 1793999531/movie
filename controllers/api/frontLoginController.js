const  frontLoginModel = require('../../models/frontLoginModel');

//前台登录
async function frontLogin(req,res){
    let username =( req.query.username || '').trim();
    let password = (req.query.password || '').trim();

    try{
        let data = await frontLoginModel.loginCheck(username,password);
        //成功则返回数据
        res.json(data);
    }catch (e) {
        res.json(e)
    }

}
module.exports = {
    frontLogin
}